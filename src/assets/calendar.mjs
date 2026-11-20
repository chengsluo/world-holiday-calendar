export function calendarMonth(locale, region, year, month) {
  const regionalLocale = new Intl.Locale(locale, { region });
  const firstDay = regionalLocale.getWeekInfo?.().firstDay ?? regionalLocale.weekInfo?.firstDay ?? 1;
  const firstDate = new Date(Date.UTC(year, month - 1, 1));
  const offset = (firstDate.getUTCDay() - firstDay + 7) % 7;
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  const numberFormat = new Intl.NumberFormat(locale);
  const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(new Date(Date.UTC(2024, 0, firstDay + index))));
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const days = Array.from({ length: lastDay }, (_, index) => {
    const day = index + 1;
    return {
      key: new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10),
      label: numberFormat.format(day),
    };
  });
  return { weekdays, offset, days };
}

export function calendarMonthName(locale, year, month) {
  return new Intl.DateTimeFormat(locale, {
    calendar: "gregory", timeZone: "UTC", month: "long", year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}
