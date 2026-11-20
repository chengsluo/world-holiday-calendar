> This project's calendar data comes from publicly accessible sources on the internet. If you believe any of the material infringes your rights, please contact us to request its removal. [Contact the maintainers](https://github.com/chengsluo/world-holiday-calendar/issues/new)

# Calendar Data Sources and Licensing

**English** · [简体中文](SOURCES.zh-CN.md)

## Apple calendar data

- On iPhone, open **Calendar → Calendars → Add Calendar → Add Holiday Calendar** to see the catalog Apple provides for the device. [Apple iPhone User Guide](https://support.apple.com/zh-cn/guide/iphone/iph80d93ac49/ios)
- Holiday entries come from Apple's public iCalendar subscriptions. The refresh script reads the `X-APPLE-REGION`, `X-APPLE-LANGUAGE`, and `X-WR-CALNAME` fields from each feed and expands recurring events. Subscriptions with identical data are listed once. [Canada, French](https://calendars.icloud.com/holidays/ca_fr.ics/) · [Mainland China, Simplified Chinese](https://calendars.icloud.com/holidays/cn_zh.ics/)
- The November 19, 2026 snapshot covers 52 countries and regions and 79 editions, drawn from 93 verified public URLs. The Calendar framework in the iOS Simulator queries iCloud's calendar search service for the catalog. The service returned no catalog in the local test, so coverage still needs to be checked against the Add Holiday Calendar list on a physical device. Apple subscriptions cover a limited date range, with the available years listed on each calendar.

## Historical records from 2010 onward

The historical data adds 15,571 holiday entries for 60 language editions across 46 countries and regions. It draws on 47 older `32Holidays.ics` files still hosted by Apple and 31 web archives or historical mirrors of Apple subscriptions. Records go back to 2010 for 38 editions. The holiday details and the Sources section of each year page link to the original material.

| Country or region and language | Years added | Sources |
| --- | --- | --- |
| United States, English | 2010–2024 | [Older Apple .ics file](https://files.apple.com/calendars/US32Holidays.ics) · [2021 subscription mirror](https://github.com/hlnurse/rigpi/blob/567168378fa98453fe268984775da4faf1a0b3ad/html/scheduler/us_hol.ics) · [2022–2024 subscription mirror](https://github.com/administrator895/iCalendarSupplement/blob/277eeb542f414d04846fa998ed5957b148e5a3cf/source_ics/apple_us.ics) |
| Japan, Japanese and English | 2010–2020 | [Older Apple .ics file with English translations](https://files.apple.com/calendars/Japanese32Holidays.ics) |
| Canada, English and French | 2010–2020 | [Older Apple .ics file with French translations](https://files.apple.com/calendars/Canadian32Holidays.ics) |
| Switzerland, German, French, and Italian | 2010–2020 | [Older Apple .ics file with French and Italian translations](https://files.apple.com/calendars/Swiss32Holidays.ics) |
| Mainland China, Simplified Chinese | 2010–2017, 2019–2023 | [Older Apple .ics file](https://files.apple.com/calendars/China32Holidays.ics) · [2019 subscription mirror](https://github.com/mins01/php_ICalendarReader/blob/f626b529d76bce3a92b8e42c71a763099e19a819/test/ics/cn_zh.ics) · [2020 subscription mirror](https://github.com/Lonense/holiday-cn/blob/63ddb611c1570517e7290e78133fd97362043e9e/CN_zh.ics) · [2021 subscription mirror](https://github.com/meme-lau/apple-chinese-mainland-holidays-ex/blob/55e4b8cfdb0921a289e79b5117dd99e8c10e9751/cn_zh.ics) · [2022–2023 subscription mirror](https://www.tidnotes.top/post/iphone-mac-add-chinese-holiday/) |
| Hong Kong, English | 2012–2017 | [Older Apple .ics file in English](https://files.apple.com/calendars/Hong32Kong32Holidays.ics) |
| Hong Kong, Traditional Chinese | 2010–2017 | [Older Apple .ics file in Traditional Chinese](https://files.apple.com/calendars/Hong32Kong32%28C%2932Holidays.ics) · [Traditional Chinese translations embedded in an older Apple .ics file](https://files.apple.com/calendars/Hong32Kong32Holidays.ics) |
| New Zealand, English | 2010–2020 | [Older Apple .ics file](https://files.apple.com/calendars/New32Zealand32Holidays.ics) |
| Israel, Hebrew | 2012–2024 | [Older Apple .ics file](https://files.apple.com/calendars/Israel32Holidays.ics) |
| South Korea, Korean | 2012–2017, 2019–2023 | [Older Apple .ics file](https://files.apple.com/calendars/South32Korean32Holidays.ics) · [2019–2023 subscription mirror](https://github.com/diagol12/kr-cld/blob/5ca51b804ea66786dec3e7b388d7aa39ba0242c8/kr_ko.ics) |
| Canada, English · Japan, Japanese · Taiwan, Traditional Chinese · United Kingdom, English | 2021–2023, 2021–2023, 2019–2023, and 2021, respectively | [Historical Apple subscription mirrors](https://github.com/mins01/php_ICalendarReader/tree/f626b529d76bce3a92b8e42c71a763099e19a819/test/ics) |

The original historical files are held in a local archive. The public snapshot preserves the source attribution for each calendar. Some translated holiday names in older files come from language-tagged `RESOURCES` fields and are identified on the site as embedded translations. For the 2021 mainland China mirror, the import used the original `VCALENDAR` block and omitted events appended after it.

Most older files stop around 2020. Some years with Apple records have partial coverage, and older files may retain dates that were provisionally scheduled at the time.

## Historical records from other sources

Using the November 19, 2026 Apple snapshot as a baseline, other sources filled 573 gaps where an edition had no records for a particular year. These additions cover 78 editions between 2010 and 2026. Each supplemental record identifies its source in the `source` field. The original supplemental `.ics` files are held in a local archive.

- Government sources also filled gaps in seven years where the Apple archive contained only a few records. For Russia in 2010–2011, the Russian edition adds non-working days published by the Bank of Russia. For New Zealand in 2010–2011, the English edition adds public holidays and provincial anniversary days. For India in 2012–2014, the English edition adds holidays listed for central government offices in Delhi and New Delhi. India's restricted holidays and additional state holidays have their own scope. [Bank of Russia historical calendar](https://www.cbr.ru/StaticHtml/File/17579/holidays_2010.htm) · [New Zealand government historical calendar](https://www.employment.govt.nz/leave-and-holidays/public-holidays/previous-years-public-holidays-and-anniversary-dates) · [India's 2013 public holiday notice](https://www.csir.res.in/sites/default/files/2023-04/PolicyDoc29_127.pdf)
- For mainland China in 2018, the calendar uses the State Council General Office notice for holidays, consecutive days off, and adjusted working days. [2018 holiday notice](https://zwgk.mct.gov.cn/zfxxgkml/scgl/202012/t20201213_919357.html)
- Hong Kong entries use the government's annual public holiday announcements. United Kingdom entries use GOV.UK bank holiday data for England and Wales, Scotland, and Northern Ireland. [Hong Kong's 2023 announcement](https://www.info.gov.hk/gia/general/202205/13/P2022051000340p.htm) · [UK bank holiday data](https://www.gov.uk/bank-holidays.json)
- Other regions primarily use Vacanza Holidays v0.109. Each calendar links to the relevant country or region file, which lists its sources. These additions follow the holidays listed by the source. Some editions include local or optional holidays, and some Apple observances and solar terms may be absent. [Vacanza Holidays v0.109](https://github.com/vacanza/holidays/tree/v0.109)

Supplemental dates follow the corresponding sources. When an entry can be matched to the same holiday, its name preferentially follows the wording of a recent Apple subscription in the same language. Supplemental filenames in the local archive match the edition IDs in the subscription catalog. The file headers store default attribution in `X-SOURCE-NAME` and `X-SOURCE-URL`. Individual events can identify their original source using `URL` and `X-SOURCE-NAME`. When the displayed name follows Apple or a local translation, `X-SOURCE-SUMMARY` can record a different name used by the source.

## Redistribution terms by source

| Source | Findings |
| --- | --- |
| Public Apple iCloud subscriptions and older Apple `.ics` files | Apple's user guide explains how to subscribe to holiday calendars. The iCloud terms reviewed include restrictions on reproducing the service. The review found no explicit permission to redistribute the holiday subscription files or derived content. The user guide and terms are linked below. |
| Web archives, Apple subscription mirrors, and embedded translations | Mirrors identify where and when a copy was available. A license for other content on the mirror site or in the host repository may have a different scope. The public snapshot identifies the archive or mirror used for each relevant edition and record. |
| GOV.UK bank holidays | GOV.UK generally makes content it can license available under the Open Government Licence v3.0, with exceptions. Supplemental records should retain GOV.UK attribution and the OGL v3.0 link. |
| Mainland China State Council General Office notices | Article 5 of China's Copyright Law lists exceptions for administrative documents and calendars. The supplemental records retain their notice attribution. Apple-sourced records in the same edition are assessed separately. [National Copyright Administration of China](https://www.ncac.gov.cn/xxfb/flfg/flfg_532/202103/t20210309_50530.html) |
| Hong Kong public holiday announcements | The Information Services Department's general copyright notice allows personal or educational use subject to conditions. The separate DATA.GOV.HK holiday dataset permits reuse under its open data terms. The current supplemental records cite press announcements, so the terms for those sources govern their reuse. [Information Services Department notice](https://www.isd.gov.hk/eng/notices.htm) · [Open dataset](https://data.gov.hk/en-data/dataset/hk-dpo-statistic-cal) · [Open data terms](https://data.gov.hk/en/terms-and-conditions) |
| Employment New Zealand historical public holidays | The site permits personal or non-commercial reproduction subject to attribution and notice requirements, with exceptions for third-party material. [Website copyright policy](https://www.employment.govt.nz/employment-new-zealand/copyright) |
| Bank of Russia notices on non-working days | The Bank of Russia website terms allow republication with a link to the original. They also specify restrictions on commercial use and notification requirements for certain embedded uses. [Bank of Russia website terms](https://www.cbr.ru/eng/about/) |
| Indian administrative notices hosted by CSIR | CSIR's website policy requires permission and attribution for reproduction. For notices issued by another agency, review the terms of the host site and the original issuer separately. [CSIR website policies](https://www.csir.res.in/en/website-policies) |
| Vacanza Holidays v0.109 | The upstream project uses the MIT license. Retain the source attribution and the upstream copyright and license notices. Apple wording reused in supplemental records is outside the scope of the Vacanza license. Vacanza appears in the existing supplemental records' attribution. The scheduled refresh uses Apple subscriptions. |

[Apple holiday calendar guide](https://support.apple.com/zh-cn/guide/iphone/iph80d93ac49/ios) · [Apple iCloud terms](https://www.apple.com/legal/internet-services/icloud/en/terms.html) · [GOV.UK terms](https://www.gov.uk/help/terms-conditions) · [OGL v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) · [Vacanza license](https://github.com/vacanza/holidays/blob/v0.109/LICENSE)

This repository preserves the [Vacanza copyright notice and license](LICENSE-vacanza.txt) for the existing supplemental records.
