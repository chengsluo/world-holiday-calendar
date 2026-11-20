// Compact UI messages. Use Intl for country names, dates and calendar labels.
const keys = ["heading", "intro", "browse", "search", "language", "year", "month", "allYear", "downloads", "original", "merged", "sources", "empty", "noMatches", "home"];
const messages = {
  en: ["World Holiday Calendar", "Browse holidays by country, language and year.", "Calendars", "Search countries or languages", "Language", "Year", "Month", "Full year", "Download JSON", "Original", "Merged", "Sources", "No records for this period.", "No matching calendars.", "Home"],
  "zh-Hans": ["全球节假日日历", "按国家、地区、语言和年份查阅节假日。", "日历目录", "搜索国家、地区或语言", "语言", "年份", "月份", "全年", "下载 JSON", "原始版", "合并版", "数据来源", "这段时间没有记录。", "没有匹配的日历。", "首页"],
  "zh-Hant": ["全球節假日日曆", "依國家、地區、語言和年份查詢節假日。", "日曆目錄", "搜尋國家、地區或語言", "語言", "年份", "月份", "全年", "下載 JSON", "原始版", "合併版", "資料來源", "這段時間沒有紀錄。", "找不到符合的日曆。", "首頁"],
  ar: ["تقويم العطلات حول العالم", "تصفّح العطلات حسب البلد واللغة والسنة.", "التقاويم", "ابحث عن بلد أو لغة", "اللغة", "السنة", "الشهر", "السنة كاملة", "تنزيل JSON", "الأصلية", "المدمجة", "المصادر", "لا توجد سجلات لهذه الفترة.", "لا توجد تقاويم مطابقة.", "الرئيسية"],
  bg: ["Световен календар на празниците", "Вижте празниците по държава, език и година.", "Календари", "Търсене по държава или език", "Език", "Година", "Месец", "Цялата година", "Изтегляне на JSON", "Оригинални", "Обединени", "Източници", "Няма записи за този период.", "Няма подходящи календари.", "Начало"],
  bn: ["বিশ্বের ছুটির দিনপঞ্জি", "দেশ, ভাষা ও বছর অনুযায়ী ছুটির দিন দেখুন।", "দিনপঞ্জি", "দেশ বা ভাষা খুঁজুন", "ভাষা", "বছর", "মাস", "পুরো বছর", "JSON ডাউনলোড", "মূল", "একত্রিত", "উৎস", "এই সময়ের কোনো তথ্য নেই।", "মিল আছে এমন দিনপঞ্জি পাওয়া যায়নি।", "প্রচ্ছদ"],
  ca: ["Calendari mundial de festius", "Consulta els festius per país, idioma i any.", "Calendaris", "Cerca per país o idioma", "Idioma", "Any", "Mes", "Tot l’any", "Baixa el JSON", "Original", "Agrupat", "Fonts", "No hi ha dades per a aquest període.", "No s’ha trobat cap calendari.", "Inici"],
  cs: ["Světový kalendář svátků", "Prohlédněte si svátky podle země, jazyka a roku.", "Kalendáře", "Hledat zemi nebo jazyk", "Jazyk", "Rok", "Měsíc", "Celý rok", "Stáhnout JSON", "Původní", "Sloučené", "Zdroje", "Pro toto období nejsou žádné záznamy.", "Žádné odpovídající kalendáře.", "Úvod"],
  da: ["Helligdage i hele verden", "Find helligdage efter land, sprog og år.", "Kalendere", "Søg efter land eller sprog", "Sprog", "År", "Måned", "Hele året", "Hent JSON", "Original", "Samlet", "Kilder", "Ingen oplysninger for denne periode.", "Ingen kalendere matcher.", "Forside"],
  de: ["Feiertage weltweit", "Feiertage nach Land, Sprache und Jahr entdecken.", "Kalender", "Land oder Sprache suchen", "Sprache", "Jahr", "Monat", "Ganzes Jahr", "JSON herunterladen", "Original", "Zusammengefasst", "Quellen", "Für diesen Zeitraum liegen keine Einträge vor.", "Keine passenden Kalender gefunden.", "Startseite"],
  el: ["Εορτολόγιο αργιών ανά τον κόσμο", "Βρείτε αργίες ανά χώρα, γλώσσα και έτος.", "Ημερολόγια", "Αναζήτηση χώρας ή γλώσσας", "Γλώσσα", "Έτος", "Μήνας", "Όλο το έτος", "Λήψη JSON", "Αρχικά", "Συγχωνευμένα", "Πηγές", "Δεν υπάρχουν καταχωρίσεις για αυτήν την περίοδο.", "Δεν βρέθηκαν ημερολόγια.", "Αρχική"],
  es: ["Calendario mundial de festivos", "Consulta los días festivos por país, idioma y año.", "Calendarios", "Busca un país o idioma", "Idioma", "Año", "Mes", "Todo el año", "Descargar JSON", "Original", "Agrupado", "Fuentes", "No hay registros para este periodo.", "No se encontraron calendarios.", "Inicio"],
  fi: ["Maailman juhlapäivät", "Selaa juhlapäiviä maan, kielen ja vuoden mukaan.", "Kalenterit", "Hae maata tai kieltä", "Kieli", "Vuosi", "Kuukausi", "Koko vuosi", "Lataa JSON", "Alkuperäinen", "Yhdistetty", "Lähteet", "Tältä ajalta ei ole tietoja.", "Hakua vastaavia kalentereita ei löytynyt.", "Etusivu"],
  fr: ["Calendrier mondial des jours fériés", "Consultez les jours fériés par pays, langue et année.", "Calendriers", "Rechercher un pays ou une langue", "Langue", "Année", "Mois", "Année entière", "Télécharger le JSON", "Original", "Regroupé", "Sources", "Aucune donnée pour cette période.", "Aucun calendrier ne correspond.", "Accueil"],
  gu: ["વિશ્વની રજાઓનું કૅલેન્ડર", "દેશ, ભાષા અને વર્ષ પ્રમાણે રજાઓ જુઓ.", "કૅલેન્ડર", "દેશ અથવા ભાષા શોધો", "ભાષા", "વર્ષ", "મહિનો", "આખું વર્ષ", "JSON ડાઉનલોડ કરો", "મૂળ", "ભેગી કરેલી", "સ્રોત", "આ સમયગાળા માટે કોઈ નોંધ નથી.", "મેળ ખાતું કૅલેન્ડર મળ્યું નથી.", "મુખપૃષ્ઠ"],
  he: ["לוח חגים עולמי", "עיינו בחגים לפי מדינה, שפה ושנה.", "לוחות שנה", "חיפוש מדינה או שפה", "שפה", "שנה", "חודש", "שנה שלמה", "הורדת JSON", "מקורי", "מאוחד", "מקורות", "אין רשומות לתקופה הזו.", "לא נמצאו לוחות שנה תואמים.", "דף הבית"],
  hi: ["विश्व अवकाश कैलेंडर", "देश, भाषा और साल के हिसाब से छुट्टियाँ देखें।", "कैलेंडर", "देश या भाषा खोजें", "भाषा", "साल", "महीना", "पूरा साल", "JSON डाउनलोड करें", "मूल", "समेकित", "स्रोत", "इस अवधि का कोई रिकॉर्ड नहीं है।", "कोई मिलता-जुलता कैलेंडर नहीं मिला।", "होम"],
  hr: ["Svjetski kalendar blagdana", "Pregledajte blagdane po zemlji, jeziku i godini.", "Kalendari", "Potražite zemlju ili jezik", "Jezik", "Godina", "Mjesec", "Cijela godina", "Preuzmi JSON", "Izvorno", "Objedinjeno", "Izvori", "Nema zapisa za ovo razdoblje.", "Nema odgovarajućih kalendara.", "Početna"],
  hu: ["Világünnepnapok naptára", "Böngéssz az ünnepnapok között ország, nyelv és év szerint.", "Naptárak", "Ország vagy nyelv keresése", "Nyelv", "Év", "Hónap", "Egész év", "JSON letöltése", "Eredeti", "Összevont", "Források", "Erre az időszakra nincs adat.", "Nincs találat.", "Kezdőlap"],
  id: ["Kalender Hari Libur Dunia", "Lihat hari libur menurut negara, bahasa, dan tahun.", "Kalender", "Cari negara atau bahasa", "Bahasa", "Tahun", "Bulan", "Setahun penuh", "Unduh JSON", "Asli", "Gabungan", "Sumber", "Tidak ada data untuk periode ini.", "Tidak ada kalender yang cocok.", "Beranda"],
  it: ["Calendario mondiale delle festività", "Consulta le festività per paese, lingua e anno.", "Calendari", "Cerca un paese o una lingua", "Lingua", "Anno", "Mese", "Tutto l’anno", "Scarica il JSON", "Originale", "Raggruppato", "Fonti", "Nessun dato per questo periodo.", "Nessun calendario corrispondente.", "Pagina iniziale"],
  ja: ["世界の祝日カレンダー", "国・地域、言語、年を選んで祝日を調べられます。", "カレンダー一覧", "国・地域や言語で検索", "言語", "年", "月", "年間", "JSONをダウンロード", "元データ", "統合版", "出典", "この期間の記録はありません。", "該当するカレンダーはありません。", "ホーム"],
  kk: ["Әлемнің мереке күнтізбесі", "Мерекелерді ел, тіл және жыл бойынша қараңыз.", "Күнтізбелер", "Елді немесе тілді іздеу", "Тіл", "Жыл", "Ай", "Толық жыл", "JSON жүктеп алу", "Түпнұсқа", "Біріктірілген", "Дереккөздер", "Бұл кезең бойынша дерек жоқ.", "Сәйкес күнтізбе табылмады.", "Басты бет"],
  kn: ["ವಿಶ್ವ ರಜಾದಿನಗಳ ಕ್ಯಾಲೆಂಡರ್", "ದೇಶ, ಭಾಷೆ ಮತ್ತು ವರ್ಷದ ಪ್ರಕಾರ ರಜಾದಿನಗಳನ್ನು ನೋಡಿ.", "ಕ್ಯಾಲೆಂಡರ್‌ಗಳು", "ದೇಶ ಅಥವಾ ಭಾಷೆ ಹುಡುಕಿ", "ಭಾಷೆ", "ವರ್ಷ", "ತಿಂಗಳು", "ಪೂರ್ಣ ವರ್ಷ", "JSON ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ", "ಮೂಲ", "ಒಗ್ಗೂಡಿಸಿದ", "ಮೂಲಗಳು", "ಈ ಅವಧಿಗೆ ಯಾವುದೇ ದಾಖಲೆಗಳಿಲ್ಲ.", "ಹೊಂದುವ ಕ್ಯಾಲೆಂಡರ್ ಸಿಗಲಿಲ್ಲ.", "ಮುಖಪುಟ"],
  ko: ["세계 공휴일 달력", "국가·지역, 언어, 연도별로 공휴일을 확인하세요.", "달력 목록", "국가·지역 또는 언어 검색", "언어", "연도", "월", "연간", "JSON 다운로드", "원본", "통합본", "출처", "이 기간의 기록이 없습니다.", "일치하는 달력이 없습니다.", "홈"],
  ml: ["ലോക അവധിദിന കലണ്ടർ", "രാജ്യം, ഭാഷ, വർഷം എന്നിവ അനുസരിച്ച് അവധിദിനങ്ങൾ കാണുക.", "കലണ്ടറുകൾ", "രാജ്യമോ ഭാഷയോ തിരയുക", "ഭാഷ", "വർഷം", "മാസം", "വർഷം മുഴുവൻ", "JSON ഡൗൺലോഡ്", "യഥാർഥം", "സംയോജിപ്പിച്ചത്", "ഉറവിടങ്ങൾ", "ഈ കാലയളവിൽ രേഖകളില്ല.", "പൊരുത്തപ്പെടുന്ന കലണ്ടറുകളില്ല.", "മുഖപ്പ്"],
  mr: ["जगातील सुट्ट्यांची दिनदर्शिका", "देश, भाषा आणि वर्षानुसार सुट्ट्या पाहा.", "दिनदर्शिका", "देश किंवा भाषा शोधा", "भाषा", "वर्ष", "महिना", "संपूर्ण वर्ष", "JSON डाउनलोड करा", "मूळ", "एकत्रित", "स्रोत", "या कालावधीसाठी नोंदी नाहीत.", "जुळणारी दिनदर्शिका सापडली नाही.", "मुखपृष्ठ"],
  ms: ["Kalendar Cuti Sedunia", "Semak cuti umum mengikut negara, bahasa dan tahun.", "Kalendar", "Cari negara atau bahasa", "Bahasa", "Tahun", "Bulan", "Setahun penuh", "Muat turun JSON", "Asal", "Digabungkan", "Sumber", "Tiada rekod bagi tempoh ini.", "Tiada kalendar yang sepadan.", "Laman utama"],
  nb: ["Helligdager i hele verden", "Finn helligdager etter land, språk og år.", "Kalendere", "Søk etter land eller språk", "Språk", "År", "Måned", "Hele året", "Last ned JSON", "Original", "Slått sammen", "Kilder", "Ingen oppføringer for denne perioden.", "Ingen kalendere passer søket.", "Forside"],
  nl: ["Feestdagenkalender wereldwijd", "Bekijk feestdagen per land, taal en jaar.", "Kalenders", "Zoek een land of taal", "Taal", "Jaar", "Maand", "Hele jaar", "JSON downloaden", "Origineel", "Samengevoegd", "Bronnen", "Er zijn geen gegevens voor deze periode.", "Geen passende kalenders gevonden.", "Startpagina"],
  or: ["ବିଶ୍ୱ ଛୁଟିଦିନ ପଞ୍ଜିକା", "ଦେଶ, ଭାଷା ଓ ବର୍ଷ ଅନୁସାରେ ଛୁଟିଦିନ ଦେଖନ୍ତୁ।", "ପଞ୍ଜିକା", "ଦେଶ କିମ୍ବା ଭାଷା ଖୋଜନ୍ତୁ", "ଭାଷା", "ବର୍ଷ", "ମାସ", "ପୂରା ବର୍ଷ", "JSON ଡାଉନଲୋଡ୍ କରନ୍ତୁ", "ମୂଳ", "ଏକତ୍ରିତ", "ଉତ୍ସ", "ଏହି ସମୟ ପାଇଁ କୌଣସି ତଥ୍ୟ ନାହିଁ।", "ମେଳ ଖାଉଥିବା ପଞ୍ଜିକା ମିଳିଲା ନାହିଁ।", "ମୂଳପୃଷ୍ଠା"],
  pa: ["ਵਿਸ਼ਵ ਛੁੱਟੀਆਂ ਦਾ ਕੈਲੰਡਰ", "ਦੇਸ਼, ਭਾਸ਼ਾ ਅਤੇ ਸਾਲ ਮੁਤਾਬਕ ਛੁੱਟੀਆਂ ਵੇਖੋ।", "ਕੈਲੰਡਰ", "ਦੇਸ਼ ਜਾਂ ਭਾਸ਼ਾ ਲੱਭੋ", "ਭਾਸ਼ਾ", "ਸਾਲ", "ਮਹੀਨਾ", "ਪੂਰਾ ਸਾਲ", "JSON ਡਾਊਨਲੋਡ ਕਰੋ", "ਮੂਲ", "ਇਕੱਠੇ ਕੀਤੇ", "ਸਰੋਤ", "ਇਸ ਮਿਆਦ ਲਈ ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਹੈ।", "ਕੋਈ ਮੇਲ ਖਾਂਦਾ ਕੈਲੰਡਰ ਨਹੀਂ ਮਿਲਿਆ।", "ਮੁੱਖ ਸਫ਼ਾ"],
  pl: ["Światowy kalendarz świąt", "Sprawdź dni świąteczne według kraju, języka i roku.", "Kalendarze", "Wyszukaj kraj lub język", "Język", "Rok", "Miesiąc", "Cały rok", "Pobierz JSON", "Oryginalne", "Połączone", "Źródła", "Brak wpisów w tym okresie.", "Nie znaleziono pasujących kalendarzy.", "Strona główna"],
  pt: ["Calendário mundial de feriados", "Consulte os feriados por país, idioma e ano.", "Calendários", "Pesquise por país ou idioma", "Idioma", "Ano", "Mês", "Ano inteiro", "Baixar JSON", "Original", "Agrupado", "Fontes", "Não há registros para este período.", "Nenhum calendário encontrado.", "Início"],
  ro: ["Calendarul sărbătorilor din lume", "Consultă sărbătorile după țară, limbă și an.", "Calendare", "Caută o țară sau o limbă", "Limbă", "An", "Lună", "Tot anul", "Descarcă JSON", "Original", "Comasat", "Surse", "Nu există înregistrări pentru această perioadă.", "Nu s-au găsit calendare.", "Acasă"],
  ru: ["Календарь праздников мира", "Смотрите праздники по странам, языкам и годам.", "Календари", "Найти страну или язык", "Язык", "Год", "Месяц", "Весь год", "Скачать JSON", "Исходные", "Объединённые", "Источники", "За этот период записей нет.", "Подходящих календарей нет.", "Главная"],
  sk: ["Svetový kalendár sviatkov", "Prezrite si sviatky podľa krajiny, jazyka a roka.", "Kalendáre", "Hľadať krajinu alebo jazyk", "Jazyk", "Rok", "Mesiac", "Celý rok", "Stiahnuť JSON", "Pôvodné", "Zlúčené", "Zdroje", "Za toto obdobie nie sú žiadne záznamy.", "Nenašli sa žiadne vyhovujúce kalendáre.", "Úvod"],
  sv: ["Helgdagar i hela världen", "Hitta helgdagar efter land, språk och år.", "Kalendrar", "Sök land eller språk", "Språk", "År", "Månad", "Hela året", "Ladda ned JSON", "Original", "Sammanslaget", "Källor", "Inga uppgifter för den här perioden.", "Inga kalendrar matchar sökningen.", "Startsida"],
  ta: ["உலக விடுமுறை நாள்காட்டி", "நாடு, மொழி, ஆண்டு வாரியாக விடுமுறை நாட்களைப் பாருங்கள்.", "நாள்காட்டிகள்", "நாடு அல்லது மொழியைத் தேடுங்கள்", "மொழி", "ஆண்டு", "மாதம்", "முழு ஆண்டு", "JSON பதிவிறக்கம்", "அசல்", "ஒருங்கிணைந்தது", "ஆதாரங்கள்", "இந்தக் காலத்திற்குப் பதிவுகள் இல்லை.", "பொருந்தும் நாள்காட்டி கிடைக்கவில்லை.", "முகப்பு"],
  te: ["ప్రపంచ సెలవుల క్యాలెండర్", "దేశం, భాష, సంవత్సరం వారీగా సెలవులను చూడండి.", "క్యాలెండర్లు", "దేశం లేదా భాషను వెతకండి", "భాష", "సంవత్సరం", "నెల", "పూర్తి సంవత్సరం", "JSON డౌన్‌లోడ్", "అసలు", "కలిపినవి", "మూలాలు", "ఈ కాలానికి రికార్డులు లేవు.", "సరిపోలే క్యాలెండర్లు లేవు.", "ముఖపుట"],
  th: ["ปฏิทินวันหยุดทั่วโลก", "ดูวันหยุดแยกตามประเทศ ภาษา และปี", "ปฏิทิน", "ค้นหาประเทศหรือภาษา", "ภาษา", "ปี", "เดือน", "ทั้งปี", "ดาวน์โหลด JSON", "ต้นฉบับ", "รวมรายการ", "แหล่งข้อมูล", "ไม่มีข้อมูลในช่วงนี้", "ไม่พบปฏิทินที่ตรงกัน", "หน้าแรก"],
  tr: ["Dünya Tatil Takvimi", "Tatil günlerine ülke, dil ve yıla göre göz atın.", "Takvimler", "Ülke veya dil ara", "Dil", "Yıl", "Ay", "Tüm yıl", "JSON indir", "Özgün", "Birleştirilmiş", "Kaynaklar", "Bu dönem için kayıt yok.", "Eşleşen takvim bulunamadı.", "Ana sayfa"],
  uk: ["Світовий календар свят", "Переглядайте свята за країною, мовою та роком.", "Календарі", "Знайти країну або мову", "Мова", "Рік", "Місяць", "Увесь рік", "Завантажити JSON", "Вихідні дані", "Об’єднані дані", "Джерела", "За цей період записів немає.", "Відповідних календарів не знайдено.", "Головна"],
  ur: ["دنیا بھر کی تعطیلات کا کیلنڈر", "ملک، زبان اور سال کے لحاظ سے تعطیلات دیکھیں۔", "کیلنڈر", "ملک یا زبان تلاش کریں", "زبان", "سال", "مہینہ", "پورا سال", "JSON ڈاؤن لوڈ کریں", "اصل", "یکجا", "ماخذ", "اس مدت کا کوئی ریکارڈ نہیں ہے۔", "کوئی مماثل کیلنڈر نہیں ملا۔", "صفحۂ اول"],
  vi: ["Lịch ngày lễ thế giới", "Tra cứu ngày lễ theo quốc gia, ngôn ngữ và năm.", "Lịch", "Tìm quốc gia hoặc ngôn ngữ", "Ngôn ngữ", "Năm", "Tháng", "Cả năm", "Tải JSON", "Bản gốc", "Bản gộp", "Nguồn dữ liệu", "Không có dữ liệu trong thời gian này.", "Không tìm thấy lịch phù hợp.", "Trang chủ"],
};
messages.no = messages.nb;

export const ui = Object.fromEntries(Object.entries(messages).map(([locale, values]) => {
  if (values.length !== keys.length || values.some((value) => !value)) throw new Error(`Incomplete UI for ${locale}`);
  return [locale, Object.fromEntries(keys.map((key, index) => [key, values[index]]))];
}));
function byLocale(create) {
  const cache = new Map();
  return (locale) => {
    if (!cache.has(locale)) cache.set(locale, create(locale));
    return cache.get(locale);
  };
}

const regions = byLocale((locale) => new Intl.DisplayNames(locale, { type: "region" }));
const languages = byLocale((locale) => new Intl.DisplayNames(locale, { type: "language" }));
const years = byLocale((locale) => new Intl.NumberFormat(locale, { useGrouping: false }));
const dates = byLocale((locale) => new Intl.DateTimeFormat(locale, {
  calendar: "gregory", timeZone: "UTC", month: "short", day: "numeric",
}));
const months = byLocale((locale) => new Intl.DateTimeFormat(locale, {
  calendar: "gregory", timeZone: "UTC", month: "long",
}));

export const isRtl = (locale) => ["ar", "he", "ur"].includes(locale);
export const regionName = (locale, code) => regions(locale).of(code);
export const languageName = (locale, code) => languages(locale).of(code);
export const yearName = (locale, year) => years(locale).format(year);
export const dateName = (locale, date) => dates(locale).format(new Date(`${date}T00:00:00Z`));
export const monthName = (locale, month) => months(locale).format(new Date(Date.UTC(2024, month - 1, 1)));
