"""Refresh the Apple holiday data and merge historical supplements."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, time, timedelta
from gzip import decompress
from hashlib import sha256
import json
from pathlib import Path
import re
from urllib.parse import urlsplit
from urllib.request import urlopen
from zoneinfo import ZoneInfo

from dateutil.rrule import rruleset, rrulestr
from icalendar import Calendar


ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "dist" / "data"
FEED_URL = re.compile(r"(?:https|webcal)://(?:p\d+-)?calendars\.icloud\.com/holidays/([a-z0-9_-]+)\.ics/?")
MAX_FEED_SIZE = 2_000_000
ONE_DAY = timedelta(days=1)
HISTORY_START = 2010
HISTORY = ROOT / "scripts" / "history"
SUPPLEMENTS = ROOT / "dist" / "supplements"


def instant(value, tzinfo=None):
    if isinstance(value, datetime):
        return value if value.tzinfo else value.replace(tzinfo=tzinfo)
    return datetime.combine(value, time.min, tzinfo)


def civil_day(value):
    return value.date() if isinstance(value, datetime) else value


def as_list(value):
    if value is None:
        return []
    return value if isinstance(value, list) else [value]


def occurrence_starts(component, start, through_year):
    if not any(key in component for key in ("RRULE", "RDATE", "EXDATE")):
        return [start]
    repeat = rruleset()
    anchor = instant(start)
    repeat.rdate(anchor)
    for rule in as_list(component.get("RRULE")):
        repeat.rrule(rrulestr(rule.to_ical().decode("ascii"), dtstart=anchor))
    for values in as_list(component.get("RDATE")):
        for value in values.dts:
            repeat.rdate(instant(value.dt, anchor.tzinfo))
    for values in as_list(component.get("EXDATE")):
        for value in values.dts:
            repeat.exdate(instant(value.dt, anchor.tzinfo))
    end = datetime(through_year + 1, 1, 1, tzinfo=anchor.tzinfo)
    return (value for value in repeat.between(anchor, end, inc=True) if value < end)


def event_sort_key(event):
    return event["date"], event["title"], event.get("description", ""), event.get("lastDate", "")


def parse_events(calendar, through_year, translation=None, *, include_source_url=False):
    overridden = {
        (str(item["UID"]), civil_day(item.decoded("RECURRENCE-ID")))
        for item in calendar.events if "RECURRENCE-ID" in item
    }
    events = []
    for component in calendar.events:
        if component.get("STATUS") == "CANCELLED":
            continue
        start = component.start
        first = civil_day(start)
        last = civil_day(component.end - (timedelta(microseconds=1) if isinstance(start, datetime) else ONE_DAY))
        span = max(last - first, timedelta())
        name = component["SUMMARY"]
        description = component.get("DESCRIPTION", "")
        if translation:
            name = next(value for value in as_list(component.get("RESOURCES"))
                        if value.params.get("LANGUAGE") == translation)
            description = ""
        for occurrence in occurrence_starts(component, start, through_year):
            day = civil_day(occurrence)
            if "RECURRENCE-ID" not in component and (str(component["UID"]), day) in overridden:
                continue
            event = {"date": day.isoformat(), "title": str(name)}
            if span:
                event["lastDate"] = (day + span).isoformat()
            if description:
                event["description"] = str(description)
            if component.get("X-APPLE-SPECIAL-DAY") == "ALTERNATE-WORKDAY":
                event["workday"] = True
            if include_source_url and "URL" in component:
                event["sourceUrl"] = str(component["URL"])
                if "X-SOURCE-NAME" in component:
                    event["sourceName"] = str(component["X-SOURCE-NAME"])
            events.append(event)
    return sorted(events, key=event_sort_key)


def event_years(event):
    first = int(event["date"][:4])
    last = int(event.get("lastDate", event["date"])[:4])
    return range(first, last + 1)


def event_days(event):
    day = date.fromisoformat(event["date"])
    last = date.fromisoformat(event.get("lastDate", event["date"]))
    while day <= last:
        yield day
        day += ONE_DAY


def coverage(events):
    years = sorted({year for event in events for year in event_years(event)})
    return {"from": years[0], "to": years[-1], "years": years, "events": events}


def parse_calendar(payload, snapshot_year):
    calendar = Calendar.from_ical(payload)
    region = str(calendar["X-APPLE-REGION"]).upper()
    language = str(calendar["X-APPLE-LANGUAGE"]).lower()
    title = str(calendar["X-WR-CALNAME"])
    if not re.fullmatch(r"[A-Z]{2}", region) or not re.fullmatch(r"[a-z]{2,3}(?:-[a-z0-9]+)*", language):
        raise ValueError(f"Unexpected Apple locale {region}/{language}")
    events = parse_events(calendar, snapshot_year + 10)
    if not events:
        raise ValueError(f"No events in {region}/{language}")
    return {"region": region, "language": language, "title": title}, coverage(events)


def load_history():
    archives = {}
    manifest = json.loads((HISTORY / "sources.json").read_text(encoding="utf-8"))
    for entry in manifest:
        path = HISTORY / entry["file"]
        payload = path.read_bytes()
        if sha256(payload).hexdigest() != entry["sha256"]:
            raise ValueError(f"Unexpected contents of {path}")
        if entry.get("firstCalendarOnly"):
            # This mirror appends an event outside the original VCALENDAR.
            calendar = Calendar.from_ical(payload, multiple=True)[0]
        else:
            calendar = Calendar.from_ical(payload)
        for language, translation in entry["languages"].items():
            source = {
                "url": entry["url"],
                "kind": "translation" if translation else entry["kind"],
                "title": str(calendar["X-WR-CALNAME"]),
            }
            if "reference" in entry:
                source["reference"] = entry["reference"]
            years = range(max(HISTORY_START, entry.get("from", HISTORY_START)), entry["through"] + 1)
            events = []
            for event in parse_events(calendar, entry["through"], translation):
                if next(iter(event_years(event))) in years:
                    events.append(dict(event, source=path.stem))
            archive = (path.stem, source, events, set(entry.get("includeWithLive", ())),
                       entry.get("fillMissingDates", False))
            archives.setdefault((entry["region"], language), []).append(archive)
    return archives


def merge_history(live, archives):
    events = list(live["events"])
    occupied = set(live["years"])
    seen = {event_sort_key(event) for event in events}
    sources = {}
    live_years = set(live["years"])
    # The manifest lists lower-priority editions first. Snapshot occupied days
    # before each supplement so two distinct holidays in that edition can coincide.
    for key, source, archive_events, include_with_live, fill_dates in reversed(archives):
        occupied_days = {day for event in events for day in event_days(event)} if fill_dates else set()
        protected_years = live_years - include_with_live
        added_years = set()
        for event in archive_events:
            year = int(event["date"][:4])
            identity = event_sort_key(event)
            if identity in seen:
                continue
            if fill_dates:
                if protected_years.intersection(event_years(event)):
                    continue
                if not occupied_days.isdisjoint(event_days(event)):
                    continue
            elif year in occupied and year not in include_with_live:
                continue
            seen.add(identity)
            events.append(event)
            added_years.add(year)
        if added_years:
            sources[key] = source
            occupied.update(added_years)
    if not sources:
        return live
    return {**coverage(sorted(events, key=event_sort_key)), "sources": sources}


def merge_supplement(apple, key):
    path = SUPPLEMENTS / f"{key}.ics"
    if not path.is_file():
        return apple
    calendar = Calendar.from_ical(path.read_bytes())
    apple_years = set(apple["years"])
    partial_years = {int(year) for year in str(calendar.get("X-SUPPLEMENT-PARTIAL-YEARS", "")).split(",") if year}
    live_years = {year for event in apple["events"] if "source" not in event for year in event_years(event)}
    protected_years = (apple_years - partial_years) | live_years
    apple_holidays = {(event["date"], event["title"]) for event in apple["events"]}
    default_url = str(calendar["X-SOURCE-URL"])
    title = str(calendar["X-SOURCE-NAME"])
    sources = {}
    supplements = []
    for event in parse_events(calendar, max(apple_years), include_source_url=True):
        if not protected_years.isdisjoint(event_years(event)) or (event["date"], event["title"]) in apple_holidays:
            continue
        url = event.pop("sourceUrl", default_url)
        if urlsplit(url).scheme != "https" or not urlsplit(url).hostname:
            raise ValueError(f"Invalid supplement source URL in {path}")
        source_key = f"supplement-{sha256(url.encode()).hexdigest()[:16]}"
        sources[source_key] = {"kind": "supplement", "url": url, "title": event.pop("sourceName", title)}
        supplements.append(dict(event, source=source_key))
    if not supplements:
        return apple
    return {
        **coverage(sorted(apple["events"] + supplements, key=event_sort_key)),
        "sources": {**apple.get("sources", {}), **sources},
    }


def mark_workdays(events, region):
    for event in events:
        title = event["title"].strip()
        if (
            (region == "CN" and title.endswith(("(班)", "（班）")))
            or (region == "TW" and title in {"調整上班", "Adjusts to work"})
            or (region == "RU" and title == "Рабочий день")
            or (region == "UA" and event.get("description") == "戒严期间的节日纪念日期。")
        ):
            event["workday"] = True


def read_feed(url, cache):
    match = FEED_URL.fullmatch(url)
    if not match:
        raise ValueError(f"Unsupported Apple subscription URL: {url}")
    key = match.group(1)
    https_url = url.replace("webcal:", "https:", 1) if url.startswith("webcal:") else url
    if cache is not None:
        payload = (cache / f"{key}.ics").read_bytes()
    else:
        with urlopen(https_url, timeout=20) as response:
            if not FEED_URL.fullmatch(response.url):
                raise ValueError(f"Unexpected redirect from {https_url}")
            payload = response.read(MAX_FEED_SIZE + 1)
    if payload.startswith(b"\x1f\x8b"):
        payload = decompress(payload)
    if len(payload) > MAX_FEED_SIZE:
        raise ValueError("Calendar data exceeds the size limit")
    return key, https_url, payload


def write_json(path, value):
    temporary = path.with_suffix(".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--catalog", type=Path, default=ROOT / "scripts" / "subscriptions.json")
    parser.add_argument("--cache", type=Path, help="Read downloaded <feed-id>.ics files instead of fetching them")
    args = parser.parse_args()
    source = json.loads(args.catalog.read_text(encoding="utf-8"))
    urls = source["urls"]
    if not urls:
        parser.error("The catalog contains no subscription URLs")
    today = datetime.now(ZoneInfo("America/Los_Angeles")).date()

    def fetch(url):
        try:
            key, https_url, payload = read_feed(url, args.cache)
            metadata, events = parse_calendar(payload, today.year)
            return key, https_url, metadata, events
        except Exception as error:
            raise RuntimeError(f"Could not load {url}: {error}") from error

    with ThreadPoolExecutor(max_workers=8) as pool:
        feeds = list(pool.map(fetch, urls))
    feeds.sort(key=lambda feed: (len(feed[0]), feed[0], feed[1]))
    groups = {}
    data = {}
    for key, url, metadata, events in feeds:
        locale = metadata["region"], metadata["language"]
        variants = groups.setdefault(locale, [])
        existing = next((item for item in variants if item["title"] == metadata["title"] and data[item["id"]] == events), None)
        if existing:
            if key != existing["id"] and key not in existing["aliases"]:
                existing["aliases"].append(key)
            continue
        if key in data:
            raise ValueError(f"Conflicting feeds for {key}")
        variants.append(dict(metadata, id=key, url=url, aliases=[]))
        data[key] = events
    entries = [entry for locale in sorted(groups) for entry in groups[locale]]
    history = load_history()
    for entry in entries:
        key = entry["id"]
        locale = entry["region"], entry["language"]
        apple = merge_history(data[key], history.get(locale, ()))
        data[key] = merge_supplement(apple, key)
        mark_workdays(data[key]["events"], entry["region"])
    DESTINATION.mkdir(parents=True, exist_ok=True)
    for key, events in data.items():
        write_json(DESTINATION / f"{key}.json", events)
    write_json(DESTINATION / "catalog.json", {
        "fetchedOn": today.isoformat(),
        "method": source.get("method", "public-feeds"),
        "calendars": entries,
    })
    print(f"Saved {len(entries)} calendars across {len({item['region'] for item in entries})} regions")


if __name__ == "__main__":
    main()
