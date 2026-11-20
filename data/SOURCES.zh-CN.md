> 本项目的日历数据取自互联网上公开可访问的来源。如您认为其中的内容侵犯了您的权利，请联系我们申请删除。[联系项目维护者](https://github.com/chengsluo/world-holiday-calendar/issues/new)

# 日历数据来源与许可

[English](SOURCES.md) · **简体中文**

## Apple 数据从哪里来

- iPhone 上可通过「日历」→「日历」→「添加日历」→「添加节假日日历」查看 Apple 给该设备提供的目录。[Apple 使用手册](https://support.apple.com/zh-cn/guide/iphone/iph80d93ac49/ios)
- 节日来自 Apple 的公开 iCalendar 订阅，例如[加拿大法语版](https://calendars.icloud.com/holidays/ca_fr.ics/)和[中国大陆简体中文版](https://calendars.icloud.com/holidays/cn_zh.ics/)。同步脚本读取订阅返回的 `X-APPLE-REGION`、`X-APPLE-LANGUAGE` 和 `X-WR-CALNAME`，并展开事件的重复规则。相同数据的订阅别名只展示一次。
- 2026-11-19 的当前订阅快照收录了 52 个国家和地区、79 个版本，来自 93 个已验证的公开地址。iOS 模拟器中的日历框架使用 iCloud 的日历搜索服务请求目录。该服务在本机未返回目录，覆盖范围仍需和实际设备的「添加节假日日历」清单核对。Apple 订阅只提供有限的日期范围，具体年份显示在每本日历上。

## 2010 年起的历史记录

从 Apple 仍在托管的 47 份旧版 `32Holidays.ics` 文件及 31 份网页存档或 Apple 订阅历史镜像，补录了 46 个国家和地区的 60 个语言版本，共 15,571 条节日记录。38 个版本补到了 2010 年。可从节日详情和年份页面的来源区打开对应出处。

| 国家或地区及语言 | 历史补录年份 | 来源 |
| --- | --- | --- |
| 美国英语 | 2010–2024 | [Apple 旧版 .ics](https://files.apple.com/calendars/US32Holidays.ics)、[2021 年订阅镜像](https://github.com/hlnurse/rigpi/blob/567168378fa98453fe268984775da4faf1a0b3ad/html/scheduler/us_hol.ics)、[2022–2024 年订阅镜像](https://github.com/administrator895/iCalendarSupplement/blob/277eeb542f414d04846fa998ed5957b148e5a3cf/source_ics/apple_us.ics) |
| 日本日语及英语 | 2010–2020 | [Apple 旧版 .ics，含英语译名](https://files.apple.com/calendars/Japanese32Holidays.ics) |
| 加拿大英语及法语 | 2010–2020 | [Apple 旧版 .ics，含法语译名](https://files.apple.com/calendars/Canadian32Holidays.ics) |
| 瑞士德语、法语及意大利语 | 2010–2020 | [Apple 旧版 .ics，含法语和意大利语译名](https://files.apple.com/calendars/Swiss32Holidays.ics) |
| 中国大陆简体中文 | 2010–2017、2019–2023 | [Apple 旧版 .ics](https://files.apple.com/calendars/China32Holidays.ics)、[2019 年订阅镜像](https://github.com/mins01/php_ICalendarReader/blob/f626b529d76bce3a92b8e42c71a763099e19a819/test/ics/cn_zh.ics)、[2020 年订阅镜像](https://github.com/Lonense/holiday-cn/blob/63ddb611c1570517e7290e78133fd97362043e9e/CN_zh.ics)、[2021 年订阅镜像](https://github.com/meme-lau/apple-chinese-mainland-holidays-ex/blob/55e4b8cfdb0921a289e79b5117dd99e8c10e9751/cn_zh.ics)、[2022–2023 年订阅镜像](https://www.tidnotes.top/post/iphone-mac-add-chinese-holiday/) |
| 香港英语 | 2012–2017 | [Apple 旧版英语 .ics](https://files.apple.com/calendars/Hong32Kong32Holidays.ics) |
| 香港繁体中文 | 2010–2017 | [Apple 旧版繁体中文 .ics](https://files.apple.com/calendars/Hong32Kong32%28C%2932Holidays.ics)、[Apple 旧版 .ics 内嵌繁体中文译名](https://files.apple.com/calendars/Hong32Kong32Holidays.ics) |
| 新西兰英语 | 2010–2020 | [Apple 旧版 .ics](https://files.apple.com/calendars/New32Zealand32Holidays.ics) |
| 以色列希伯来语 | 2012–2024 | [Apple 旧版 .ics](https://files.apple.com/calendars/Israel32Holidays.ics) |
| 韩国韩语 | 2012–2017、2019–2023 | [Apple 旧版 .ics](https://files.apple.com/calendars/South32Korean32Holidays.ics)、[2019–2023 年订阅镜像](https://github.com/diagol12/kr-cld/blob/5ca51b804ea66786dec3e7b388d7aa39ba0242c8/kr_ko.ics) |
| 加拿大英语、日本日语、台湾繁体中文、英国英语 | 分别为 2021–2023、2021–2023、2019–2023、2021 | [Apple 订阅历史镜像](https://github.com/mins01/php_ICalendarReader/tree/f626b529d76bce3a92b8e42c71a763099e19a819/test/ics) |

原始历史文件保存在本地归档。公开快照通过每本日历的来源标记保留出处。旧文件中的部分语言名称来自带语言标记的 `RESOURCES` 字段，网页会标为「内嵌译名」。中国大陆 2021 年镜像只读取原始 `VCALENDAR` 块，文件末尾另行追加的事件未导入。

多数旧文件在 2020 年前后停止提供记录。已有 Apple 记录的年份也可能只收录部分事件，旧文件还可能保留当时预先排定的日期。

## 非 Apple 官方历史补录

以 2026-11-19 的 Apple 快照为基准，补齐了 2010–2026 年间完全缺档的 573 个「语言版本 × 年份」，覆盖 78 个版本。记录的 `source` 字段指向对应出处。原始补录 .ics 保存在本地归档。

- 另有七个 Apple 档案只留下少量记录的年份，按政府资料补入缺失事件。俄罗斯俄语版 2010–2011 年补入俄罗斯央行公布的非工作日，新西兰英语版 2010–2011 年补入公共假日和地方周年日，印度英语版 2012–2014 年补入德里及新德里的中央政府行政机关闭办公布表所列假日。印度择休假日和各邦额外假日另有适用范围。[俄罗斯央行历史日历](https://www.cbr.ru/StaticHtml/File/17579/holidays_2010.htm) · [新西兰政府历史日历](https://www.employment.govt.nz/leave-and-holidays/public-holidays/previous-years-public-holidays-and-anniversary-dates) · [印度 2013 年公休日公告](https://www.csir.res.in/sites/default/files/2023-04/PolicyDoc29_127.pdf)
- 中国大陆 2018 年按国务院办公厅通知收录节日、连休和调休上班。[2018 年节假日通知](https://zwgk.mct.gov.cn/zfxxgkml/scgl/202012/t20201213_919357.html)
- 香港按特区政府每年的公众假期公告收录，英国按 GOV.UK 数据收录英格兰和威尔士、苏格兰及北爱尔兰的银行假日。[香港 2023 年公告示例](https://www.info.gov.hk/gia/general/202205/13/P2022051000340p.htm) · [英国银行假日数据](https://www.gov.uk/bank-holidays.json)
- 其余地区主要使用 Vacanza Holidays v0.109。每本日历链接到对应国家或地区的数据文件，其中列有该地区的资料出处。补录以来源所列假日为主，部分版本含地方或择休假日，Apple 日历中的部分纪念日和节气可能没有补录。[Vacanza Holidays v0.109](https://github.com/vacanza/holidays/tree/v0.109)

补录日期采用对应信源，能够确认是同一节日时优先逐字复用近期 Apple 同语言版本的节日名称。本地归档中的补录文件名对应订阅目录中的版本 ID。文件头的 `X-SOURCE-NAME` 和 `X-SOURCE-URL` 记录默认来源，事件可通过 `URL` 和 `X-SOURCE-NAME` 指定原始出处。采用 Apple 名称或本地译名时，可用 `X-SOURCE-SUMMARY` 记录有差异的来源名称。


## 再分发范围

| 来源 | 核对结果 |
| --- | --- |
| Apple iCloud 公开订阅和 Apple 旧版 `.ics` | Apple 的使用手册说明可订阅节假日日历。查阅的 iCloud 条款包含对复制服务的限制，目前没有找到针对这些假日订阅文件或其派生内容的明确再分发许可。使用手册和条款分别见下方链接。 |
| 网页存档、Apple 订阅镜像和内嵌译名 | 镜像提供下载位置和时间证据。镜像站或托管仓库的其他内容有许可时，仍需确认许可覆盖其中的 Apple 材料。公开快照按版本和记录标明所采用的存档或镜像。 |
| GOV.UK 银行假日 | GOV.UK 的条款通常以 Open Government Licence v3.0 提供其有权许可的内容，并列有例外。现有补录应保留 GOV.UK 归属及 OGL v3.0 链接。 |
| 中国大陆国务院办公厅通知 | 《著作权法》第五条列出行政性质文件和历法的适用例外。现有补录保留通知出处，此规则与同一版本中的 Apple 来源记录分别适用。[中国国家版权局](https://www.ncac.gov.cn/xxfb/flfg/flfg_532/202103/t20210309_50530.html) |
| 香港公众假期公告 | 政府新闻处的一般版权告示允许符合条件的个人或教育用途。DATA.GOV.HK 的独立节假日数据集允许按开放数据条款复用。现有补录引用的是新闻公告，适用范围应按原出处核对。[新闻处告示](https://www.isd.gov.hk/eng/notices.htm) · [开放数据集](https://data.gov.hk/en-data/dataset/hk-dpo-statistic-cal) · [开放数据条款](https://data.gov.hk/en/terms-and-conditions) |
| Employment New Zealand 历史公休日 | 其网站允许有明确归属及相关告知的个人或非商业复制，第三方材料有例外。[网站版权政策](https://www.employment.govt.nz/employment-new-zealand/copyright) |
| 俄罗斯央行非工作日公告 | 央行网站条款允许注明原始链接的转载，同时另列商业用途限制和特定嵌入式使用的通知要求。[央行网站条款](https://www.cbr.ru/eng/about/) |
| 印度 CSIR 托管的行政公告 | CSIR 站点政策要求取得复制许可并署明来源。行政公告由其他机构发布时，还需区分托管文件与原发机关的内容条款。[CSIR 网站政策](https://www.csir.res.in/en/website-policies) |
| Vacanza Holidays v0.109 | 上游项目有 MIT 许可。保留此处的来源说明，并按上游许可保留版权及许可告知。该上游许可不覆盖补录中沿用的 Apple 文本。Vacanza 只出现在旧有补录的来源标记中，定时工作流仅从 Apple 订阅更新。 |

[Apple 节假日日历使用说明](https://support.apple.com/zh-cn/guide/iphone/iph80d93ac49/ios) · [Apple iCloud 条款](https://www.apple.com/legal/internet-services/icloud/en/terms.html) · [GOV.UK 条款](https://www.gov.uk/help/terms-conditions) · [OGL v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) · [Vacanza 许可](https://github.com/vacanza/holidays/blob/v0.109/LICENSE)

本仓库保留了旧有补录所用的 [Vacanza 版权告知与许可](LICENSE-vacanza.txt)。
