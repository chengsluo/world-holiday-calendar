"""Refresh the 2026+ snapshot from the registered Apple iCloud subscriptions."""

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path
from urllib.error import URLError
import sys
from time import sleep
from zoneinfo import ZoneInfo

from snapshot import DATA, HISTORY_END, ROOT, edition_language, read, write

sys.path.insert(0, str(ROOT / "scripts"))
from sync import mark_workdays, parse_calendar, read_feed  # noqa: E402


def refresh_edition(edition, previous, today, cache):
    key = edition["id"]
    for attempt in range(3):
        try:
            _, _, payload = read_feed(edition["url"], cache)
            break
        except (URLError, TimeoutError) as error:
            if cache is not None or attempt == 2:
                raise RuntimeError(f"{key}: {error}") from error
            sleep(2 ** attempt)

    metadata, data = parse_calendar(payload, today.year)
    region = metadata["region"]
    language = edition_language(region, metadata["language"])
    if (region, language) != (edition["region"], edition["language"]):
        raise ValueError(f"Unexpected locale for {key}: {metadata}")
    groups = {}
    for event in data["events"]:
        year = int(event["date"][:4])
        if year > HISTORY_END:
            groups.setdefault(str(year), []).append(event)
    if not groups:
        print(f"{key}: no {HISTORY_END + 1}+ entries in this subscription; kept the previous snapshot.")
        return previous
    for events in groups.values():
        mark_workdays(events, edition["region"])

    # Apple feeds can drop an entire year when their rolling window advances.
    # Keep older years, and keep every year if a truncated feed fails validation.
    old_years = previous["years"]
    for year, events in groups.items():
        previously_apple = [event for event in old_years.get(year, []) if not event.get("source")]
        if len(previously_apple) >= 4 and len(events) < len(previously_apple) // 2:
            raise ValueError(f"Unexpected reduction in {key}/{year}: {len(previously_apple)} to {len(events)}")
    years = dict(sorted({**old_years, **groups}.items()))
    used = {event["source"] for events in years.values() for event in events if "source" in event}
    return {"years": years, "sources": {key: value for key, value in previous["sources"].items() if key in used}}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cache", type=Path, help="Read <feed-id>.ics files from this directory")
    args = parser.parse_args()
    today = datetime.now(ZoneInfo("America/Los_Angeles")).date()
    editions = read(DATA / "editions.json")
    target = DATA / "current.json"
    previous = read(target)
    with ThreadPoolExecutor(max_workers=8) as pool:
        values = list(pool.map(
            lambda edition: refresh_edition(
                edition, previous["editions"].get(edition["id"], {"years": {}, "sources": {}}), today, args.cache
            ),
            editions,
        ))
    updated = dict(zip((edition["id"] for edition in editions), values, strict=True))
    if updated == previous["editions"]:
        print("Apple subscription data is unchanged.")
        return
    write(target, updated, {"fetchedOn": today.isoformat()})
    print(f"Updated {len(updated)} Apple subscriptions in {target.name}.")


if __name__ == "__main__":
    main()
