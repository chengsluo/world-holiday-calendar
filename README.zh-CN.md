# 全球节假日日历

[English](README.md) · **简体中文**

按国家、地区、语言和年份浏览、下载节假日。Eleventy 用 Node.js 将日历和下载接口一起生成静态文件。当前目录保留 52 个国家和地区、79 个日历版本，界面支持 46 个语言和文字版本，包括简体、繁体中文和从右到左的排版。

正式站点为 [全球节假日日历](https://chengsluo.github.io/world-holiday-calendar/)。年份页面使用独立路径，例如 `/world-holiday-calendar/calendars/jp/ja/2010/`。

## 支持的语言

网站提供以下 46 个界面语言及文字版本。点击语言名称即可打开对应首页。

| 语言 | 本地名称 | 语言代码 |
| --- | --- | --- |
| [阿拉伯语](https://chengsluo.github.io/world-holiday-calendar/languages/ar/) | العربية | `ar` |
| [保加利亚语](https://chengsluo.github.io/world-holiday-calendar/languages/bg/) | български | `bg` |
| [孟加拉语](https://chengsluo.github.io/world-holiday-calendar/languages/bn/) | বাংলা | `bn` |
| [加泰罗尼亚语](https://chengsluo.github.io/world-holiday-calendar/languages/ca/) | català | `ca` |
| [捷克语](https://chengsluo.github.io/world-holiday-calendar/languages/cs/) | čeština | `cs` |
| [丹麦语](https://chengsluo.github.io/world-holiday-calendar/languages/da/) | dansk | `da` |
| [德语](https://chengsluo.github.io/world-holiday-calendar/languages/de/) | Deutsch | `de` |
| [希腊语](https://chengsluo.github.io/world-holiday-calendar/languages/el/) | Ελληνικά | `el` |
| [英语](https://chengsluo.github.io/world-holiday-calendar/languages/en/) | English | `en` |
| [西班牙语](https://chengsluo.github.io/world-holiday-calendar/languages/es/) | español | `es` |
| [芬兰语](https://chengsluo.github.io/world-holiday-calendar/languages/fi/) | suomi | `fi` |
| [法语](https://chengsluo.github.io/world-holiday-calendar/languages/fr/) | français | `fr` |
| [古吉拉特语](https://chengsluo.github.io/world-holiday-calendar/languages/gu/) | ગુજરાતી | `gu` |
| [希伯来语](https://chengsluo.github.io/world-holiday-calendar/languages/he/) | עברית | `he` |
| [印地语](https://chengsluo.github.io/world-holiday-calendar/languages/hi/) | हिन्दी | `hi` |
| [克罗地亚语](https://chengsluo.github.io/world-holiday-calendar/languages/hr/) | hrvatski | `hr` |
| [匈牙利语](https://chengsluo.github.io/world-holiday-calendar/languages/hu/) | magyar | `hu` |
| [印度尼西亚语](https://chengsluo.github.io/world-holiday-calendar/languages/id/) | Indonesia | `id` |
| [意大利语](https://chengsluo.github.io/world-holiday-calendar/languages/it/) | italiano | `it` |
| [日语](https://chengsluo.github.io/world-holiday-calendar/languages/ja/) | 日本語 | `ja` |
| [哈萨克语](https://chengsluo.github.io/world-holiday-calendar/languages/kk/) | қазақ тілі | `kk` |
| [卡纳达语](https://chengsluo.github.io/world-holiday-calendar/languages/kn/) | ಕನ್ನಡ | `kn` |
| [韩语](https://chengsluo.github.io/world-holiday-calendar/languages/ko/) | 한국어 | `ko` |
| [马拉雅拉姆语](https://chengsluo.github.io/world-holiday-calendar/languages/ml/) | മലയാളം | `ml` |
| [马拉地语](https://chengsluo.github.io/world-holiday-calendar/languages/mr/) | मराठी | `mr` |
| [马来语](https://chengsluo.github.io/world-holiday-calendar/languages/ms/) | Melayu | `ms` |
| [挪威语（博克马尔）](https://chengsluo.github.io/world-holiday-calendar/languages/nb/) | norsk bokmål | `nb` |
| [荷兰语](https://chengsluo.github.io/world-holiday-calendar/languages/nl/) | Nederlands | `nl` |
| [挪威语](https://chengsluo.github.io/world-holiday-calendar/languages/no/) | norsk | `no` |
| [奥里亚语](https://chengsluo.github.io/world-holiday-calendar/languages/or/) | ଓଡ଼ିଆ | `or` |
| [旁遮普语](https://chengsluo.github.io/world-holiday-calendar/languages/pa/) | ਪੰਜਾਬੀ | `pa` |
| [波兰语](https://chengsluo.github.io/world-holiday-calendar/languages/pl/) | polski | `pl` |
| [葡萄牙语](https://chengsluo.github.io/world-holiday-calendar/languages/pt/) | português | `pt` |
| [罗马尼亚语](https://chengsluo.github.io/world-holiday-calendar/languages/ro/) | română | `ro` |
| [俄语](https://chengsluo.github.io/world-holiday-calendar/languages/ru/) | русский | `ru` |
| [斯洛伐克语](https://chengsluo.github.io/world-holiday-calendar/languages/sk/) | slovenčina | `sk` |
| [瑞典语](https://chengsluo.github.io/world-holiday-calendar/languages/sv/) | svenska | `sv` |
| [泰米尔语](https://chengsluo.github.io/world-holiday-calendar/languages/ta/) | தமிழ் | `ta` |
| [泰卢固语](https://chengsluo.github.io/world-holiday-calendar/languages/te/) | తెలుగు | `te` |
| [泰语](https://chengsluo.github.io/world-holiday-calendar/languages/th/) | ไทย | `th` |
| [土耳其语](https://chengsluo.github.io/world-holiday-calendar/languages/tr/) | Türkçe | `tr` |
| [乌克兰语](https://chengsluo.github.io/world-holiday-calendar/languages/uk/) | українська | `uk` |
| [乌尔都语](https://chengsluo.github.io/world-holiday-calendar/languages/ur/) | اردو | `ur` |
| [越南语](https://chengsluo.github.io/world-holiday-calendar/languages/vi/) | Tiếng Việt | `vi` |
| [简体中文](https://chengsluo.github.io/world-holiday-calendar/) | 简体中文 | `zh-Hans` |
| [繁體中文](https://chengsluo.github.io/world-holiday-calendar/languages/zh-hant/) | 繁體中文 | `zh-Hant` |

## 本地运行

使用 Node.js 22 或更高版本。构建使用已保存的快照，离线浏览页面时也能读取节日列表。

```sh
npm ci
npm run dev
```

打开 <http://localhost:8080/world-holiday-calendar/>。独立构建和校验使用以下命令。

```sh
npm run build
npm run check
```

`src/` 保存网页模板、样式和界面文案，`data/` 保存日历数据。Eleventy 输出到 `_site/`。Pages 工作流仅上传 `_site/`。

## 数据与更新

- `data/editions.json` 保存订阅地址、地区和语言。
- `data/history.json` 是按事件开始日期划分的固定快照，收录 2025 年及以前的现有记录。历史修订直接编辑对应地区、语言和年份，并在改动中说明来源。
- `data/current.json` 保存 2026 年起的记录。`tools/refresh.py` 拉取已登记的 Apple iCloud 公开订阅，只刷新这一份文件。某个年份从滚动订阅窗口退出后，已保存的记录会保留。现有快照内的非 Apple 补录按原出处保留，Apple 重新覆盖相应年份时，以该订阅为准。

GitHub Actions 每周一自动同步，也支持从 **Actions → Refresh calendars and deploy Pages → Run workflow** 手动刷新。同步和构建都通过才会保存更新后的快照并部署。订阅下载或校验失败时，现有发布版本继续可用。推送到 `main` 时使用已提交的快照构建。若对 `main` 启用了屏蔽机器人推送的保护规则，需要通过正常审查流程提交快照。公开仓库连续 60 天无活动时，GitHub 可能停用定时任务。[GitHub Actions 调度说明](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)

本地手动刷新使用以下命令。

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements.txt
.venv/bin/python tools/refresh.py
npm run build
npm run check
```

## HTTPS JSON 下载

部署后，数据由 GitHub Pages 以静态 JSON 提供。每个语言文件按 ISO 国家及地区代码归档，包含该语言所有已收录的日历版本和年份。简体和繁体中文可单独下载，`zh.json` 同时收录两者。

| 用途 | 站点相对路径 |
| --- | --- |
| 查询所有语言和下载地址 | `api/v1/index.json` |
| 原始记录 | `api/v1/languages/{language}.json` |
| 与网页合并模式一致的记录 | `api/v1/languages/{language}.merged.json` |
| 中文示例 | `api/v1/languages/zh-hans.json` |
| 日语合并版示例 | `api/v1/languages/ja.merged.json` |

返回对象包含 `schemaVersion`、`language`、`mode`、`historyThrough`、`appleFetchedOn`、`notices`、`regions`。例如 `regions.JP` 是该语言的日本日历版本数组。版本包含 `id`、`locale`、`title`、`subscription`、`sources` 和 `events`。

- `date` 是本地日历日期（`YYYY-MM-DD`）。多日事件的 `lastDate` 含当天，单日事件可省略该字段。
- `source` 指向同版本的 `sources`，省略时用 `sources.current`。如有 `sourceUrl` 和 `sourceName`，可用它们作为更细的记录出处。
- 原始版保留原名称、说明和 `workday` 标志。合并版去除括号备注，合并日期重叠的同名条目，排除标记为工作日的条目，并在 `originals` 保留原始记录。网页切换和合并下载使用同一份合并结果。

## 许可和发布

根目录的 [MIT 许可](LICENSE) 适用于项目贡献者有权授权的原创代码和文档。日历记录、原始 `.ics`、历史镜像、补录及其派生 JSON 按各自来源的条款处理。[数据出处与许可](data/SOURCES.zh-CN.md)

此仓库发布网站代码和构建所用的日历快照。原始归档由各来源提供。GitHub Pages 从 `main` 分支通过 GitHub Actions 发布。

**贡献**：如果发现任何错误，欢迎[提交 Issue](https://github.com/chengsluo/world-holiday-calendar/issues/new) 或[提交 PR](https://github.com/chengsluo/world-holiday-calendar/pulls)。
