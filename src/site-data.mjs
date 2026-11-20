import { readFile } from "node:fs/promises";
import { ui, regionName, languageName } from "./locale-data.mjs";
import { mergeHolidays, overlapsYear } from "./holidays.mjs";

const origin = "https://chengsluo.github.io";
const base = "/world-holiday-calendar/";
const defaultLocale = "zh-Hans";
const read = async (name) => JSON.parse(await readFile(new URL(`../data/${name}.json`, import.meta.url), "utf8"));
export const calendarPath = (item, year) => `calendars/${item.region.toLowerCase()}/${item.id.split("_")[1]}/${year}/`;
export const homePath = (locale) => locale === defaultLocale ? "" : `languages/${locale.toLowerCase()}/`;
export const apiPath = (language, mode) => `api/v1/languages/${language.toLowerCase()}${mode === "merged" ? ".merged" : ""}.json`;

export default async function () {
  const [editions, history, current] = await Promise.all(["editions", "history", "current"].map(read));
  const yearNow = new Date().getUTCFullYear();
  const calendars = editions.map((edition) => {
    if (!ui[edition.locale]) throw new Error(`Missing interface language ${edition.locale}`);
    const archive = history.editions[edition.id];
    const live = current.editions[edition.id];
    const events = [...Object.values(archive?.years ?? {}), ...Object.values(live?.years ?? {})].flat();
    if (!events.length) throw new Error(`Empty edition ${edition.id}`);
    const years = [...new Set(events.flatMap(({date, lastDate = date}) => {
      const first = Number(date.slice(0, 4));
      return Array.from({ length: Number(lastDate.slice(0, 4)) - first + 1 }, (_, index) => first + index);
    }))].sort((a, b) => b - a);
    const preferredYear = years.find((year) => year <= yearNow) ?? years.at(-1);
    const sources = { current: { kind: "current", title: "Apple iCloud", url: edition.url }, ...archive?.sources, ...live?.sources };
    return { ...edition, events, years, preferredYear, sources, merged: mergeHolidays(events) };
  });

  const locales = [...new Set(editions.map(({ locale }) => locale))].sort();
  const languages = [...new Set(editions.flatMap(({ language, locale }) => [language, locale]))].sort();
  const notices = {
    sources: "https://github.com/chengsluo/world-holiday-calendar/blob/main/data/SOURCES.md",
    vacanza: base + "legal/LICENSE-vacanza.txt",
    ukOpenGovernmentLicence: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  };
  const homes = locales.map((locale) => ({
    type: "home", locale, path: homePath(locale),
    alternates: locales.map((lang) => [lang, homePath(lang)]).concat([["x-default", homePath(defaultLocale)]]),
  }));
  const pages = homes.concat(calendars.flatMap((item) => item.years.map((year) => ({
    type: "year", locale: item.locale, path: calendarPath(item, year), item, year,
    events: item.events.filter((event) => overlapsYear(event, year)),
    merged: item.merged.filter((event) => overlapsYear(event, year)),
    alternates: calendars
      .filter((candidate) => candidate.region === item.region && candidate.years.includes(year))
      .map((candidate) => [candidate.locale, calendarPath(candidate, year)]),
  }))));
  const dataFiles = languages.flatMap((language) => ["original", "merged"].map((mode) => {
    const regions = {};
    for (const item of calendars.filter((item) => item.language === language || item.locale === language)) {
      (regions[item.region] ??= []).push({
        id: item.id, locale: item.locale, title: item.title, subscription: item.url,
        sources: item.sources,
        events: mode === "merged" ? item.merged : item.events,
      });
    }
    return {
      path: apiPath(language, mode),
      content: { schemaVersion: 1, language, mode, historyThrough: 2025, appleFetchedOn: current.fetchedOn, notices, regions },
    };
  }));
  dataFiles.push({
    path: "api/v1/index.json",
    content: {
      schemaVersion: 1,
      notices,
      languages: Object.fromEntries(languages.map((language) => [language,
        Object.fromEntries(["original", "merged"].map((mode) => [mode, base + apiPath(language, mode)])),
      ])),
    },
  });

  return {
    origin, base, defaultLocale, calendars, pages, locales, dataFiles,
    localeOptions: locales.map((locale) => [locale, languageName(locale, locale)])
      .sort((a, b) => a[1].localeCompare(b[1])),
    regionOptions(locale) {
      const groups = Object.groupBy(calendars, ({ region }) => region);
      const collator = new Intl.Collator(locale);
      return Object.entries(groups).sort(([a], [b]) => collator.compare(regionName(locale, a), regionName(locale, b)));
    },
    verification: process.env.GOOGLE_SITE_VERIFICATION,
  };
}
