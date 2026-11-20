// Compare spelling and typography within one edition. Keep diacritics, words,
// and parenthetical qualifiers so local holidays and substitute days stay distinct.
function titleKey(title) {
  return title.normalize("NFKC").toLowerCase().replace(/[\p{P}\s]+/gu, "");
}

const adjustmentSuffix = /(?:\s*[（(](?:observed|observado|observé|observée|congé observé|substitute day|day in lieu|vervangdag|обходен ден|почивен ден|демалыс|يوم تعويضي|مُرحّلة|cuti ganti|补假|休|班|대체 휴일|posunutý|obchodzone|נדחה|παρατηρήθηκε|перенесено|вихідний|выходной|nghỉ bù)[)）]|\s*(?:補假|補休|彈性放假|調整放假))$/iu;
const adjustmentPrefix = /^(?:วันหยุดชดเชย\s*|ชดเชย\s*|the (?:second )?day following\s+)/iu;
const traditionalAdjustment = /(?:後第二[日天]|翌日後周日|翌日)(?:補假)?$/u;
// These labels include dates, election numbers, or regional schedules.
const recurringLabels = {
  au_en: [
    [/^(?:Saturday before Easter Sunday|Easter Saturday|The Saturday before Easter Sunday|The day after Good Friday)\b/i, "Easter Saturday"],
    [/^ANZAC Day(?: Holiday \(.*\))?$/i, "ANZAC Day"],
  ],
  bg_bg: [[/^Почивен ден \(прехвърлен от /i, "Почивен ден"]],
  hu_hu: [[/^Pihenőnap \(.*-től helyettesítve\)$/i, "Pihenőnap"]],
  kr_ko: [[/^(?:제\s*)?\d*대?\s*국회의원 선거일$/u, "국회의원 선거일"]],
  kz_kk: [[/^Демалыс күні \(.* бастап ауыстырылды\)$/iu, "Демалыс күні"]],
  ru_ru: [[/^Выходной(?: день| \(перенесено с .*\))?$/iu, "Выходной день"]],
  tw_en: [[/^Day off \(substituted from /i, "Day off"]],
  tw_zh: [[/^放假日（.*補班）$/u, "放假日"]],
  ua_uk: [[/^Вихідний день \(перенесено з /iu, "Вихідний день"]],
  vn_vi: [[/^Ngày nghỉ \(thay cho ngày /iu, "Ngày nghỉ"]],
};

function splitAdjustment(title, editionId) {
  const prefix = title.match(adjustmentPrefix)?.[0] ?? "";
  const suffix = (editionId === "hk_zh" ? title.match(traditionalAdjustment)?.[0] : undefined)
    ?? title.match(adjustmentSuffix)?.[0] ?? "";
  return { prefix, base: title.slice(prefix.length, title.length - suffix.length), suffix };
}

export function curateEdition(events, editionId, aliases) {
  const preferredTitles = new Map();
  for (const year of ["2025", "2026"]) {
    for (const { date, title } of events) {
      if (date.startsWith(year)) preferredTitles.set(titleKey(title), title);
    }
  }

  const aliasTitles = new Map();
  for (const [title, variants] of Object.entries(aliases)) {
    const preferred = preferredTitles.get(titleKey(title)) ?? title;
    for (const variant of variants) aliasTitles.set(titleKey(variant), preferred);
  }

  const preferredTitle = (title) => {
    const key = titleKey(title);
    return aliasTitles.get(key) ?? preferredTitles.get(key);
  };
  const normalized = events.map((event) => {
    // Exact titles take priority over inferring a title for an adjusted date.
    const { prefix, base, suffix } = splitAdjustment(event.title, editionId);
    const title = preferredTitle(event.title) ?? (prefix + (preferredTitle(base) ?? base) + suffix);
    return title === event.title ? event : { ...event, title };
  });

  const holidayKey = (title) => {
    const { base } = splitAdjustment(title, editionId);
    const label = recurringLabels[editionId]?.find(([pattern]) => pattern.test(base))?.[1];
    return titleKey(label ?? base);
  };
  const yearsByHoliday = new Map();
  for (const event of normalized) {
    if (event.workday) continue;
    const key = holidayKey(event.title);
    if (!yearsByHoliday.has(key)) yearsByHoliday.set(key, new Set());
    yearsByHoliday.get(key).add(event.date.slice(0, 4));
  }

  const seen = new Set();
  return normalized.filter((event) => {
    if (!event.workday && yearsByHoliday.get(holidayKey(event.title)).size < 3) return false;
    const entry = JSON.stringify(event);
    if (seen.has(entry)) return false;
    seen.add(entry);
    return true;
  });
}
