import { ui, isRtl, regionName, languageName, yearName, dateName, monthName } from "./locale-data.mjs";
import { apiPath, calendarPath, homePath } from "./site-data.mjs";
import { calendarMonth, calendarMonthName } from "./assets/calendar.mjs";

export const data = {
  pagination: { data: "site.pages", size: 1, alias: "record" },
  permalink: ({ record }) => record.path + "index.html",
  eleventyExcludeFromCollections: true,
};

const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[c]);
const text = (locale, key) => `<span data-message="${key}">${escape(ui[locale][key])}</span>`;
const region = (locale, code) => `<span data-region="${code}">${escape(regionName(locale, code))}</span>`;
const language = (locale, code) => `<span data-language="${code}">${escape(languageName(locale, code))}</span>`;
const date = (locale, day) => `<time data-date datetime="${day}">${escape(dateName(locale, day))}</time>`;
const month = (locale, number) => `<span data-month-name="${number}">${escape(monthName(locale, number))}</span>`;
const yearText = (locale, year) => `<span data-year-name="${year}">${escape(yearName(locale, year))}</span>`;
const safeUrl = (url) => {
  const parsed = new URL(url);
  if (!["https:", "http:"].includes(parsed.protocol)) throw new Error(`Unsupported source URL ${url}`);
  return escape(parsed.href);
};
const uiLink = (url, content, attributes = "") => `<a data-ui-link href="${url}" ${attributes}>${content}</a>`;
const icon = (name) => `<span class="icon icon-${name}" aria-hidden="true"></span>`;
const flag = (site, code, lazy = false) => `<img class="flag" src="${site.base}assets/flags/${code.toLowerCase()}.svg" alt="" width="32" height="24"${lazy ? ' loading="lazy"' : ""}>`;
const numberText = (locale, number) => `<span data-number="${number}">${new Intl.NumberFormat(locale).format(number)}</span>`;
const quickRegions = ["CN", "US", "JP", "KR", "GB"];

function downloads(site, locale, languageCode) {
  return `<div class="actions">
    ${["original", "merged"].map((mode) => `<a class="button" href="${site.base + apiPath(languageCode, mode)}" download>${icon("download")}${text(locale, mode)} <small>JSON</small></a>`).join("")}
  </div>`;
}

function featuredCalendar(site, locale) {
  const preferredId = locale === site.defaultLocale ? "cn_zh" : locale === "en" ? "us_en" : "";
  const item = site.calendars.find(({ id }) => id === preferredId) ?? site.calendars.find((entry) => entry.locale === locale);
  const year = item.preferredYear;
  const events = item.events.filter(({ date, lastDate = date, workday }) => !workday && date <= `${year}-12-31` && lastDate >= `${year}-01-01`);
  const now = new Date();
  const currentMonth = now.getUTCFullYear() === year ? now.getUTCMonth() + 1 : 12;
  const month = [...Array.from({ length: currentMonth }, (_, i) => currentMonth - i),
    ...Array.from({ length: 12 - currentMonth }, (_, i) => currentMonth + i + 1)].find((number) => {
    const prefix = `${year}-${String(number).padStart(2, "0")}`;
    return events.some(({ date, lastDate = date }) => date <= `${prefix}-31` && lastDate >= `${prefix}-01`);
  }) ?? currentMonth;
  const { weekdays, offset, days } = calendarMonth(locale, item.region, year, month);
  const caption = calendarMonthName(locale, year, month);
  return `<div class="hero-art">${uiLink(site.base + calendarPath(item, year) + `?month=${month}`, `
    <div class="preview-head">
      <div class="preview-region">${flag(site, item.region)}${region(locale, item.region)}</div>
      ${icon("arrow")}
    </div>
    <div class="preview-title" data-calendar-month="${year}-${month}">${escape(caption)}</div>
    <div class="preview-grid" aria-hidden="true">
      ${weekdays.map((label) => `<span class="preview-weekday">${escape(label)}</span>`).join("")}
      ${'<span></span>'.repeat(offset)}
      ${days.map(({ key, label }) => {
        const holiday = events.some(({ date, lastDate = date }) => key >= date && key <= lastDate);
        return `<span${holiday ? ' class="preview-holiday"' : ""}>${label}</span>`;
      }).join("")}
    </div>`, 'class="calendar-preview"')}</div>`;
}

function home(site, locale) {
  const regions = site.regionOptions(locale);
  const byLanguage = Object.groupBy(regions.flatMap(([, items]) => items), (item) => item.locale);
  const collator = new Intl.Collator(locale);
  const languages = Object.entries(byLanguage)
    .sort(([a], [b]) => collator.compare(languageName(locale, a), languageName(locale, b)));
  const searchLabels = new Map(site.calendars.map((item) => {
    const names = [...new Set([locale, "en", "zh-Hans", "zh-Hant", item.locale])];
    return [item.id, [item.id, item.title, item.region, item.locale, ...item.aliases,
      ...names.map((lang) => regionName(lang, item.region)),
      ...names.map((lang) => languageName(lang, item.locale)),
    ].join(" ")];
  }));
  const groupCard = (group, code, items, heading, label, header = "") => {
    const id = `${group}-${code}`;
    return `<article class="directory-card${items.length === 1 ? " directory-card-single" : ""}" data-directory-card>
      ${header}
      <h3 id="${id}">${heading}</h3>
      <ul>${items.map((item) => {
        const linkLabel = `${id}-${item.id}`;
        return `<li data-search="${escape(searchLabels.get(item.id))}">${uiLink(site.base + calendarPath(item, item.preferredYear),
          `<span class="edition-label" id="${linkLabel}">${label(item)}</span>${icon("arrow")}`,
          `hreflang="${item.locale}" aria-labelledby="${id} ${linkLabel}"`)}</li>`;
      }).join("")}</ul>
    </article>`;
  };
  const regionCards = regions.map(([code, items]) => groupCard("region", code, items, region(locale, code),
    (item) => `<bdi lang="${item.locale}">${escape(languageName(item.locale, item.locale))}</bdi>`,
    `<div class="country-top">${flag(site, code, true)}<span class="region-code" dir="ltr">${code}</span></div>`)).join("");
  const languageCards = languages.map(([code, items]) => groupCard("language", code, items, language(locale, code),
    (item) => flag(site, item.region, true) + region(locale, item.region))).join("");
  const shortcuts = quickRegions.map((code) => {
    const [, editions] = regions.find(([regionCode]) => regionCode === code);
    const item = editions.find((edition) => edition.locale === locale) ?? editions[0];
    return uiLink(site.base + calendarPath(item, item.preferredYear), flag(site, code) + region(locale, code));
  }).join("");
  const legacy = Object.fromEntries(site.calendars.flatMap((item) => [item.id, ...item.aliases].map((id) => [
    id, { path: calendarPath(item, item.preferredYear), years: item.years },
  ])));
  return `<section class="hero">
    <div class="hero-copy">
      <h1>${text(locale, "heading")}</h1>
      <p>${text(locale, "intro")}</p>
      <div class="search-box" hidden data-enhanced>
        ${icon("search")}
        <input id="directory-search" type="search" data-placeholder="search" aria-controls="directory-results" aria-label="${escape(ui[locale].search)}" placeholder="${escape(ui[locale].search)}" autocomplete="off">
        <kbd aria-hidden="true">/</kbd>
      </div>
      <nav class="shortcuts" aria-label="${escape(ui[locale].browse)}" data-aria="browse">${shortcuts}</nav>
    </div>
    ${featuredCalendar(site, locale)}
  </section>
  <section id="calendars">
    <div class="section-head">
      <h2 id="directory-heading">${text(locale, "browse")}</h2>
      <output id="directory-count" for="directory-search">${numberText(locale, regions.length)}</output>
      <div class="segmented directory-switch" role="radiogroup" aria-labelledby="directory-heading" hidden data-enhanced>
        <label><input type="radio" name="directory-group" value="region" checked><span>${text(locale, "byRegion")}</span></label>
        <label><input type="radio" name="directory-group" value="language"><span>${text(locale, "byLanguage")}</span></label>
      </div>
    </div>
    <p id="no-matches" class="empty-state" hidden>${icon("search")}${text(locale, "noMatches")}</p>
    <div id="directory-results">
      <div class="directory" data-directory-group="region">${regionCards}</div>
      <div class="directory" data-directory-group="language" hidden>${languageCards}</div>
    </div>
  </section>
  <section class="download-panel" id="downloads">
    <div><h2>${text(locale, "downloads")}</h2><p>${language(locale, locale)} <span aria-hidden="true">·</span> <a href="${site.base}api/v1/index.json">API / JSON</a></p></div>
    ${downloads(site, locale, locale)}
  </section>
  <script id="legacy-routes" type="application/json">${JSON.stringify(legacy).replace(/</g, "\\u003c")}</script>`;
}

function sourceLinks(events, item) {
  const sources = new Map();
  for (const event of events) {
    const source = item.sources[event.source || "current"];
    const url = event.sourceUrl || source.reference || source.url;
    sources.set(url, event.sourceName || source.title || source.kind);
  }
  return [...sources].map(([url, title]) => `<a href="${safeUrl(url)}" dir="auto">${escape(title)}</a>`).join(" · ");
}

function eventRows(events, item, locale, year, number) {
  const from = `${year}-${String(number).padStart(2, "0")}-01`;
  const to = new Date(Date.UTC(year, number, 0)).toISOString().slice(0, 10);
  const withinMonth = events.filter((event) => event.date <= to && (event.lastDate || event.date) >= from);
  return withinMonth.map((event) => {
    const last = event.lastDate || event.date;
    const startShown = event.date < from ? from : event.date;
    const endShown = last > to ? to : last;
    const dates = startShown === endShown ? date(locale, startShown) : `${date(locale, startShown)} – ${date(locale, endShown)}`;
    const originals = event.originals ?? [event];
    const descriptions = [...new Set(originals.map(({ description }) => description).filter(Boolean))];
    return `<li><details data-range-start="${startShown}" data-range-end="${endShown}">
      <summary><span class="event-date">${dates}</span><bdi lang="${item.locale}">${escape(event.title)}</bdi>${icon("chevron")}</summary>
      <div class="event-details">
        ${descriptions.map((description) => `<p lang="${item.locale}" dir="auto">${escape(description)}</p>`).join("")}
        <div class="event-source">${text(locale, "sources")} <span aria-hidden="true">·</span> ${sourceLinks(originals, item)}</div>
      </div>
    </details></li>`;
  });
}

function monthCards(events, item, locale, year) {
  return Array.from({length: 12}, (_, index) => {
    const number = index + 1;
    const rows = eventRows(events, item, locale, year, number);
    return `<section class="month-card" data-month="${number}"${rows.length ? "" : " data-empty"}>
      <div class="month-card-head"><h2>${month(locale, number)}</h2><span class="count" aria-hidden="true">${numberText(locale, rows.length)}</span></div>
      ${rows.length ? `<ol>${rows.join("")}</ol>` : `<p>${text(locale, "empty")}</p>`}
    </section>`;
  }).join("");
}

function yearPage(site, record) {
  const { item, locale, year, events, merged } = record;
  const group = site.calendars.filter((candidate) => candidate.region === item.region);
  const calendarLinks = group.map((candidate) => {
    const targetYear = candidate.years.includes(year) ? year : candidate.preferredYear;
    return uiLink(site.base + calendarPath(candidate, targetYear), language(locale, candidate.locale),
      `data-calendar-link hreflang="${candidate.locale}"${candidate.id === item.id ? ' aria-current="page"' : ""}`);
  }).join("");
  return `<div class="breadcrumbs">
    ${uiLink(site.base + homePath(locale) + "#calendars", icon("back") + text(locale, "browse"), 'data-back')}
  </div>
  <section class="year-hero">
    <div class="year-heading">
      ${flag(site, item.region)}
      <div><h1>${region(locale, item.region)} <span class="heading-year">${yearText(locale, year)}</span></h1>
      <p>${text(locale, "holidays")} <span aria-hidden="true">·</span> ${language(locale, item.locale)}</p></div>
    </div>
    ${group.length > 1 ? `<nav class="edition-links" aria-label="${escape(ui[locale].language)}" data-aria="language">${calendarLinks}</nav>` : ""}
  </section>
  <div class="calendar-toolbar">
    <div class="toolbar-row">
      <details class="year-picker">
        <summary>${icon("calendar")} ${text(locale, "year")} <strong>${yearText(locale, year)}</strong> ${icon("chevron")}</summary>
        <nav aria-label="${escape(ui[locale].year)}" data-aria="year">${item.years.map((entry) =>
          uiLink(site.base + calendarPath(item, entry), yearText(locale, entry), `data-calendar-link${entry === year ? ' aria-current="page"' : ""}`)).join("")}</nav>
      </details>
      <div class="segmented" hidden data-enhanced>
        <label><input type="radio" name="calendar-mode" value="original" checked><span>${text(locale, "original")}</span></label>
        <label><input type="radio" name="calendar-mode" value="merged"><span>${text(locale, "merged")}</span></label>
      </div>
    </div>
    <nav class="month-nav" hidden data-enhanced aria-label="${escape(ui[locale].month)}" data-aria="month">
      <button type="button" data-show-month="all" aria-pressed="true" aria-controls="calendar-view">${text(locale, "allYear")}</button>
      ${Array.from({ length: 12 }, (_, index) => `<button type="button" data-show-month="${index + 1}" aria-pressed="false" aria-controls="calendar-view">${month(locale, index + 1)}</button>`).join("")}
    </nav>
  </div>
  <div id="calendar-view">
    <section class="month-panel" id="month-panel" hidden aria-labelledby="month-heading">
      <div class="month-panel-head">
        <h2 id="month-heading"></h2>
        <div class="month-arrows">
          <button type="button" id="previous-month">${icon("back")}</button>
          <button type="button" id="next-month">${icon("forward")}</button>
        </div>
      </div>
      <div id="month-grid" class="month-grid"></div>
    </section>
    <div id="holiday-list" class="month-cards" data-year="${year}" data-calendar-region="${item.region}">${monthCards(events, item, locale, year)}</div>
    <p class="empty-state" id="empty-year" hidden>${text(locale, "empty")}</p>
    <template id="merged-holidays">${monthCards(merged, item, locale, year)}</template>
  </div>
  <section class="download-panel" id="downloads">
    <div><h2>${text(locale, "downloads")}</h2><p>${language(locale, item.locale)}</p></div>
    ${downloads(site, locale, item.locale)}
  </section>
  <section class="source-panel">
    <h2>${text(locale, "sources")}</h2>
    <p>${sourceLinks(events, item)}</p>
    <p><a href="${safeUrl(item.url)}">Apple iCloud · ICS</a></p>
  </section>`;
}

export function render({ site, record }) {
  const { locale, path, alternates } = record;
  const heading = ui[locale].heading;
  const title = record.type === "year" ? `${regionName(locale, record.item.region)} ${yearName(locale, record.year)} · ${heading}` : heading;
  const description = record.type === "year" ? `${record.item.title} · ${yearName(locale, record.year)}. ${ui[locale].intro}` : ui[locale].intro;
  const selector = `<label class="locale-select" for="interface-language">${icon("globe")}
    <select id="interface-language" aria-label="${escape(ui[locale].language)}" data-aria="language">
      ${site.localeOptions.map(([code, name]) => `<option value="${code}" lang="${code}"${code === locale ? " selected" : ""}>${escape(name)}</option>`).join("")}
    </select>
    ${icon("chevron")}
  </label>`;
  return `<!doctype html>
<html lang="${locale}" dir="${isRtl(locale) ? "rtl" : "ltr"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${site.origin + site.base + path}">
${alternates.map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${site.origin + site.base + href}">`).join("\n")}
${site.verification && path === "" ? `<meta name="google-site-verification" content="${escape(site.verification)}">` : ""}
<link rel="stylesheet" href="${site.base}assets/site.css">
<script type="module" src="${site.base}assets/site.js"></script>
</head>
<body data-base="${site.base}" data-page="${record.type}" data-archive="${site.defaultLocale}">
<header class="topbar"><div class="wrap topbar-inner">
  ${uiLink(site.base + homePath(locale), `<span class="logo-mark" aria-hidden="true">${icon("calendar")}</span>${text(locale, "heading")}`, 'class="brand" data-home')}
  <nav>${uiLink(site.base + homePath(locale) + "#calendars", text(locale, "browse"), `data-directory-link${record.type === "home" ? ' aria-current="page"' : ""}`)} <a href="#downloads">${text(locale, "downloads")}</a></nav>
  <div class="language-control" hidden data-enhanced>${selector}</div>
</div></header>
<main class="wrap" id="main">
  ${record.type === "home" ? home(site, locale) : yearPage(site, record)}
</main>
<footer class="wrap footer">
  <details class="locale-links"><summary>${text(locale, "language")}</summary><nav>
  ${site.localeOptions.map(([code, name]) => `<a href="${site.base + homePath(code)}" hreflang="${code}" lang="${code}">${escape(name)}</a>`).join("")}
  </nav></details>
  <a href="https://github.com/chengsluo/world-holiday-calendar" lang="en">GitHub ${icon("external")}</a>
</footer>
</body>
</html>
`;
}
