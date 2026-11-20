# World Holiday Calendar

**English** · [简体中文](README.zh-CN.md)

Browse and download holidays by country, region, language, and year. Eleventy uses Node.js to build the site and its JSON downloads as static files. The calendar covers 52 countries and regions across 79 editions. The interface offers 46 language and script options, including Simplified and Traditional Chinese and right-to-left layouts.

Calendar years have their own pages, such as [Japan in 2010](https://chengsluo.github.io/world-holiday-calendar/calendars/jp/ja/2010/). [Visit World Holiday Calendar](https://chengsluo.github.io/world-holiday-calendar/).

## Supported languages

Select any of the 46 interface languages and script options below to open its homepage.

| Language | Native name | Language code |
| --- | --- | --- |
| [Arabic](https://chengsluo.github.io/world-holiday-calendar/languages/ar/) | العربية | `ar` |
| [Bulgarian](https://chengsluo.github.io/world-holiday-calendar/languages/bg/) | български | `bg` |
| [Bangla](https://chengsluo.github.io/world-holiday-calendar/languages/bn/) | বাংলা | `bn` |
| [Catalan](https://chengsluo.github.io/world-holiday-calendar/languages/ca/) | català | `ca` |
| [Czech](https://chengsluo.github.io/world-holiday-calendar/languages/cs/) | čeština | `cs` |
| [Danish](https://chengsluo.github.io/world-holiday-calendar/languages/da/) | dansk | `da` |
| [German](https://chengsluo.github.io/world-holiday-calendar/languages/de/) | Deutsch | `de` |
| [Greek](https://chengsluo.github.io/world-holiday-calendar/languages/el/) | Ελληνικά | `el` |
| [English](https://chengsluo.github.io/world-holiday-calendar/languages/en/) | English | `en` |
| [Spanish](https://chengsluo.github.io/world-holiday-calendar/languages/es/) | español | `es` |
| [Finnish](https://chengsluo.github.io/world-holiday-calendar/languages/fi/) | suomi | `fi` |
| [French](https://chengsluo.github.io/world-holiday-calendar/languages/fr/) | français | `fr` |
| [Gujarati](https://chengsluo.github.io/world-holiday-calendar/languages/gu/) | ગુજરાતી | `gu` |
| [Hebrew](https://chengsluo.github.io/world-holiday-calendar/languages/he/) | עברית | `he` |
| [Hindi](https://chengsluo.github.io/world-holiday-calendar/languages/hi/) | हिन्दी | `hi` |
| [Croatian](https://chengsluo.github.io/world-holiday-calendar/languages/hr/) | hrvatski | `hr` |
| [Hungarian](https://chengsluo.github.io/world-holiday-calendar/languages/hu/) | magyar | `hu` |
| [Indonesian](https://chengsluo.github.io/world-holiday-calendar/languages/id/) | Indonesia | `id` |
| [Italian](https://chengsluo.github.io/world-holiday-calendar/languages/it/) | italiano | `it` |
| [Japanese](https://chengsluo.github.io/world-holiday-calendar/languages/ja/) | 日本語 | `ja` |
| [Kazakh](https://chengsluo.github.io/world-holiday-calendar/languages/kk/) | қазақ тілі | `kk` |
| [Kannada](https://chengsluo.github.io/world-holiday-calendar/languages/kn/) | ಕನ್ನಡ | `kn` |
| [Korean](https://chengsluo.github.io/world-holiday-calendar/languages/ko/) | 한국어 | `ko` |
| [Malayalam](https://chengsluo.github.io/world-holiday-calendar/languages/ml/) | മലയാളം | `ml` |
| [Marathi](https://chengsluo.github.io/world-holiday-calendar/languages/mr/) | मराठी | `mr` |
| [Malay](https://chengsluo.github.io/world-holiday-calendar/languages/ms/) | Melayu | `ms` |
| [Norwegian Bokmål](https://chengsluo.github.io/world-holiday-calendar/languages/nb/) | norsk bokmål | `nb` |
| [Dutch](https://chengsluo.github.io/world-holiday-calendar/languages/nl/) | Nederlands | `nl` |
| [Norwegian](https://chengsluo.github.io/world-holiday-calendar/languages/no/) | norsk | `no` |
| [Odia](https://chengsluo.github.io/world-holiday-calendar/languages/or/) | ଓଡ଼ିଆ | `or` |
| [Punjabi](https://chengsluo.github.io/world-holiday-calendar/languages/pa/) | ਪੰਜਾਬੀ | `pa` |
| [Polish](https://chengsluo.github.io/world-holiday-calendar/languages/pl/) | polski | `pl` |
| [Portuguese](https://chengsluo.github.io/world-holiday-calendar/languages/pt/) | português | `pt` |
| [Romanian](https://chengsluo.github.io/world-holiday-calendar/languages/ro/) | română | `ro` |
| [Russian](https://chengsluo.github.io/world-holiday-calendar/languages/ru/) | русский | `ru` |
| [Slovak](https://chengsluo.github.io/world-holiday-calendar/languages/sk/) | slovenčina | `sk` |
| [Swedish](https://chengsluo.github.io/world-holiday-calendar/languages/sv/) | svenska | `sv` |
| [Tamil](https://chengsluo.github.io/world-holiday-calendar/languages/ta/) | தமிழ் | `ta` |
| [Telugu](https://chengsluo.github.io/world-holiday-calendar/languages/te/) | తెలుగు | `te` |
| [Thai](https://chengsluo.github.io/world-holiday-calendar/languages/th/) | ไทย | `th` |
| [Turkish](https://chengsluo.github.io/world-holiday-calendar/languages/tr/) | Türkçe | `tr` |
| [Ukrainian](https://chengsluo.github.io/world-holiday-calendar/languages/uk/) | українська | `uk` |
| [Urdu](https://chengsluo.github.io/world-holiday-calendar/languages/ur/) | اردو | `ur` |
| [Vietnamese](https://chengsluo.github.io/world-holiday-calendar/languages/vi/) | Tiếng Việt | `vi` |
| [Simplified Chinese](https://chengsluo.github.io/world-holiday-calendar/) | 简体中文 | `zh-Hans` |
| [Traditional Chinese](https://chengsluo.github.io/world-holiday-calendar/languages/zh-hant/) | 繁體中文 | `zh-Hant` |

## Run locally

Use Node.js 22 or later. The build uses saved calendar snapshots, so browsing the built pages locally does not require live holiday feeds.

```sh
npm ci
npm run dev
```

Open <http://localhost:8080/world-holiday-calendar/>. To build and verify the site, run:

```sh
npm run build
npm run check
```

`src/` contains page templates, styles, and interface text. `data/` holds the calendar data. Eleventy writes the static site to `_site/`, which the Pages workflow uploads.

## Data and updates

- `data/editions.json` lists subscription URLs, regions, and languages.
- `data/history.json` holds the fixed snapshot of events that start in 2025 or earlier. To correct a historical record, edit the affected edition and year and cite the source in the change.
- `data/current.json` holds events from 2026 onward. `tools/refresh.py` refreshes this snapshot from the registered public Apple iCloud subscriptions. Years that fall outside the subscription window remain in the snapshot. Supplemental entries retain their original attribution until the Apple feed covers that year again.

GitHub Actions refreshes the data every Monday. To refresh it manually, open **Actions → Refresh calendars and deploy Pages → Run workflow**. The workflow saves the refreshed snapshot and deploys after synchronization, build, and validation succeed. If a feed download or validation fails, the existing deployment stays live. Pushes to `main` build from the committed snapshots. If branch protection blocks bot pushes, submit snapshot updates through the repository's review process. GitHub may disable scheduled workflows in public repositories after 60 days of inactivity. [GitHub Actions scheduling documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)

To refresh locally, run:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements.txt
.venv/bin/python tools/refresh.py
npm run build
npm run check
```

## JSON downloads over HTTPS

GitHub Pages serves static JSON. Each language file groups calendar editions by ISO country or region code and includes all available years for those editions. Separate Simplified and Traditional Chinese downloads are available, and `zh.json` includes both.

| Purpose | Site-relative path |
| --- | --- |
| List all languages and download URLs | `api/v1/index.json` |
| Original records | `api/v1/languages/{language}.json` |
| Records matching the site's merged view | `api/v1/languages/{language}.merged.json` |
| Simplified Chinese example | `api/v1/languages/zh-hans.json` |
| Merged Japanese example | `api/v1/languages/ja.merged.json` |

The response includes `schemaVersion`, `language`, `mode`, `historyThrough`, `appleFetchedOn`, `notices`, and `regions`. For example, `regions.JP` is an array of Japanese calendar editions available in the requested language. Each edition includes `id`, `locale`, `title`, `subscription`, `sources`, and `events`.

- `date` is the local calendar date in `YYYY-MM-DD` format. The `lastDate` of a multi-day event is inclusive. Single-day events may omit it.
- `source` identifies an entry in the edition's `sources` object and defaults to `sources.current`. Optional `sourceUrl` and `sourceName` fields provide attribution for individual records.
- Original records preserve their names, descriptions, and `workday` flags. The merged view removes parenthetical notes, combines overlapping events with the same name, excludes entries marked as workdays, and preserves the source records in `originals`. The site and the merged downloads use the same result.

## Deploy by Yourself

The public JSON download endpoints come with no guarantees of continued availability or reliability. If you expect high request volumes or depend on a stable endpoint, fork this repository and serve the JSON from your own GitHub Pages site.

1. Fork the repository and keep the name `world-holiday-calendar`.
2. In [`src/site-data.mjs`](src/site-data.mjs), change `origin` to your Pages origin, such as `https://YOUR-ACCOUNT.github.io`. This updates canonical URLs and the sitemap for your deployment.
3. In your fork, select **Settings → Pages → Source → GitHub Actions**, then enable workflows under **Actions**. Commit the origin change to `main` to publish the existing snapshot. To fetch updated data and redeploy manually, run **Refresh calendars and deploy Pages** from the Actions tab. [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) · [Actions in forks](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflows-in-forked-repositories)
4. Point your application to `https://YOUR-ACCOUNT.github.io/world-holiday-calendar/api/v1/index.json` for the list of available downloads.

## License and deployment

The root [MIT license](LICENSE) applies to original code and documentation that project contributors have the right to license. Calendar records, original `.ics` files, archived mirrors, supplemental records, and derived JSON are subject to the terms of their respective sources. [Data sources and licensing](data/SOURCES.md)

This repository publishes the site code and the snapshots used to build it. The original archives are available from their respective sources. GitHub Actions deploys the `main` branch to GitHub Pages.

**Contributing** — If you spot an error, please [open an issue](https://github.com/chengsluo/world-holiday-calendar/issues/new) or [submit a pull request](https://github.com/chengsluo/world-holiday-calendar/pulls).
