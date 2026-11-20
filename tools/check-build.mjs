import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { parse } from "parse5";
import loadSite from "../src/site-data.mjs";
import { mergeHolidays } from "../src/holidays.mjs";
import { isRtl } from "../src/locale-data.mjs";

const site = await loadSite();
const output = "_site";
const read = (name) => readFile(resolve(output, name), "utf8");
const snapshot = async (name) => JSON.parse(await readFile(`data/${name}.json`, "utf8"));
const [historical, current] = await Promise.all(["history", "current"].map(snapshot));

for (const [data, isHistory] of [[historical, true], [current, false]]) {
  for (const [key, { years, sources }] of Object.entries(data.editions)) {
    for (const [year, events] of Object.entries(years)) {
      assert.equal(Number(year) <= 2025, isHistory, `${key}/${year} is in the wrong snapshot`);
      for (const event of events) {
        assert.equal(event.date.slice(0, 4), year);
        assert.ok(!event.lastDate || event.lastDate >= event.date, `${key} has an invalid date range`);
        assert.ok(!event.source || Object.hasOwn(sources, event.source), `${key} has a missing source`);
      }
    }
  }
}

const mergedSample = mergeHolidays([
  { date: "2025-12-31", title: "Holiday (start)", lastDate: "2026-01-01" },
  { date: "2026-01-01", title: "Holiday（observed）", lastDate: "2026-01-02" },
  { date: "2026-01-01", title: "Work", workday: true },
  { date: "2026-01-03", title: "Holiday" },
]);
assert.deepEqual(mergedSample.map(({title, date, lastDate, originals}) => [title, date, lastDate ?? date, originals.length]), [
  ["Holiday", "2025-12-31", "2026-01-02", 2],
  ["Holiday", "2026-01-03", "2026-01-03", 1],
]);

const sitemap = await read("sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(new Set(urls), new Set(site.pages.map(({ path }) => site.origin + site.base + path)));

function* nodes(root) {
  yield root;
  for (const child of root.childNodes ?? []) yield* nodes(child);
}
const attribute = (node, name) => node.attrs?.find((entry) => entry.name === name)?.value;
const paths = new Set([
  ...site.pages.map(({ path }) => path),
  ...site.dataFiles.map(({ path }) => path),
  "assets/site.css", "assets/site.js", "assets/calendar.mjs", "assets/locale-data.mjs",
  ...site.calendars.map(({ region }) => `assets/flags/${region.toLowerCase()}.svg`),
  "legal/LICENSE.txt", "legal/LICENSE-vacanza.txt", "legal/LICENSE-flag-icons.txt",
]);
for (const asset of [...paths].filter((path) => path.startsWith("assets/") || path.startsWith("legal/"))) {
  await access(resolve(output, asset));
}
for (const record of site.pages) {
  const html = await read(record.path + "index.html");
  const tree = [...nodes(parse(html))];
  const root = tree.find((node) => node.tagName === "html");
  assert.equal(attribute(root, "lang"), record.locale, record.path);
  assert.equal(attribute(root, "dir"), isRtl(record.locale) ? "rtl" : "ltr");
  const canonical = tree.find((node) => attribute(node, "rel") === "canonical");
  assert.equal(attribute(canonical, "href"), site.origin + site.base + record.path);
  for (const node of tree) {
    const url = attribute(node, "href") ?? attribute(node, "src");
    if (url?.startsWith(site.base)) assert.ok(paths.has(new URL(url, site.origin).pathname.slice(site.base.length)), `Broken internal link ${url} from ${record.path}`);
  }
  if (record.type === "year") {
    assert.ok(tree.some((node) => node.tagName === "time" && attribute(node, "datetime")), record.path);
  }
}
for (const { path, content } of site.dataFiles) assert.deepEqual(JSON.parse(await read(path)), content, path);

const home = await read("index.html");
if (process.env.GOOGLE_SITE_VERIFICATION) {
  const verification = [...nodes(parse(home))].find((node) => attribute(node, "name") === "google-site-verification");
  assert.equal(attribute(verification, "content"), process.env.GOOGLE_SITE_VERIFICATION);
}

console.log(`Verified ${site.pages.length} HTML pages (${site.locales.length} interface locales), ${site.dataFiles.length} JSON files and the sitemap.`);
