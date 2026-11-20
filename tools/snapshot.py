"""Migrate the existing calendar data into independent history and update snapshots."""

import argparse
from collections import defaultdict
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
HISTORY_END = 2025


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write(path, value, prefix=None):
    prefix = prefix or {}
    lines = [json.dumps(prefix, ensure_ascii=False)[:-1] + (',' if prefix else '') + '"editions":{']
    for index, (key, edition) in enumerate(value.items()):
        lines.append("  " + json.dumps(key) + ':{"years":{')
        lines.extend(
            f'    "{year}":{json.dumps(events, ensure_ascii=False, separators=(",", ":"))}'
            + ("," if year_index + 1 < len(edition["years"]) else "")
            for year_index, (year, events) in enumerate(edition["years"].items())
        )
        suffix = json.dumps(edition["sources"], ensure_ascii=False, separators=(",", ":"))
        lines.append('  },"sources":' + suffix + "}" + ("," if index + 1 < len(value) else ""))
    lines.append("}}")
    temporary = path.with_suffix(".tmp")
    temporary.write_text("\n".join(lines) + "\n", encoding="utf-8")
    temporary.replace(path)


def split(source):
    catalog = read(source / "catalog.json")
    editions = []
    archive = {}
    live = {}
    for item in catalog["calendars"]:
        item = dict(item)
        language = item["language"]
        locale = ("zh-Hant" if item["region"] in {"HK", "TW", "MO"} else "zh-Hans") if language == "zh" else language
        item["locale"] = locale
        key = item["id"]
        editions.append(item)
        original = read(source / f"{key}.json")
        groups = defaultdict(list)
        for event in original["events"]:
            groups[int(event["date"][:4])].append(event)
        for destination, predicate in ((archive, lambda year: year <= HISTORY_END), (live, lambda year: year > HISTORY_END)):
            years = {year: events for year, events in sorted(groups.items()) if predicate(year)}
            used = {event["source"] for events in years.values() for event in events if "source" in event}
            destination[key] = {
                "years": years,
                "sources": {key: value for key, value in original.get("sources", {}).items() if key in used},
            }
    return editions, archive, live


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Legacy data directory containing catalog.json")
    args = parser.parse_args()
    targets = [DATA / name for name in ("editions.json", "history.json", "current.json")]
    if any(target.exists() for target in targets):
        parser.error("The snapshots already exist. Apply reviewed corrections directly to the relevant snapshot.")
    editions, archive, live = split(args.source)
    catalog = read(args.source / "catalog.json")
    targets[0].write_text(json.dumps(editions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    write(targets[1], archive)
    write(targets[2], live, {"fetchedOn": catalog["fetchedOn"]})


if __name__ == "__main__":
    main()
