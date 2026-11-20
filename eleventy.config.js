import loadSite from "./src/site-data.mjs";
import editions from "./data/editions.json" with { type: "json" };

export default function (config) {
  config.addGlobalData("site", loadSite);
  config.addPassthroughCopy({
    "src/assets": "assets",
    "src/locale-data.mjs": "assets/locale-data.mjs",
    LICENSE: "legal/LICENSE.txt",
    "data/LICENSE-vacanza.txt": "legal/LICENSE-vacanza.txt",
    "node_modules/flag-icons/LICENSE": "legal/LICENSE-flag-icons.txt",
  });
  for (const region of new Set(editions.map((edition) => edition.region.toLowerCase()))) {
    config.addPassthroughCopy({ [`node_modules/flag-icons/flags/4x3/${region}.svg`]: `assets/flags/${region}.svg` });
  }
  config.addWatchTarget("data");
  config.setServerOptions({ pathPrefix: "/world-holiday-calendar/" });
  return { dir: { input: "src", output: "_site" } };
}
