export function simplifyTitle(title) {
  const parentheses = /\([^()（）]*\)|（[^()（）]*）/g;
  let result = title;
  while (result.search(parentheses) !== -1) result = result.replace(parentheses, "");
  return result.replace(/\s{2,}/g, " ").trim() || title;
}

// Preserve the original lookup rule: only overlapping occurrences with the
// same simplified name merge. Adjacent dates remain separate.
export function mergeHolidays(events) {
  const merged = [];
  const latest = new Map();
  for (const event of events) {
    if (event.workday) continue;
    const title = simplifyTitle(event.title);
    const last = event.lastDate || event.date;
    const candidate = latest.get(title);
    if (candidate && event.date <= (candidate.lastDate || candidate.date)) {
      if (last > (candidate.lastDate || candidate.date)) candidate.lastDate = last;
      candidate.originals.push(event);
      continue;
    }
    const group = { date: event.date, title, originals: [event] };
    if (event.lastDate) group.lastDate = last;
    merged.push(group);
    latest.set(title, group);
  }
  return merged;
}

export function overlapsYear(event, year) {
  return event.date <= `${year}-12-31` && (event.lastDate || event.date) >= `${year}-01-01`;
}
