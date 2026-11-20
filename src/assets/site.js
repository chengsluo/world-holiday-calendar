import { ui, isRtl, regionName, languageName, yearName, dateName, monthName } from "./locale-data.mjs";
import { calendarMonth, calendarMonthName } from "./calendar.mjs";

const { base, page, archive: defaultLocale } = document.body.dataset;
const query = new URLSearchParams(location.search);
const selector = document.querySelector("#interface-language");
const calendar = document.querySelector("#holiday-list");
const initialLocale = document.documentElement.lang;
let locale = Object.hasOwn(ui, query.get("ui")) ? query.get("ui") : initialLocale;

function homePath(language) {
  return base + (language === defaultLocale ? "" : `languages/${language.toLowerCase()}/`);
}

function updateLinks() {
  const home = homePath(locale);
  document.querySelector("[data-home]").href = home;
  document.querySelectorAll("[data-directory-link], [data-back]").forEach((link) => {
    link.href = home + "#calendars";
  });
  document.querySelectorAll("[data-ui-link]:not([data-home], [data-directory-link], [data-back])").forEach((link) => {
    const url = new URL(link.href);
    const keys = link.hasAttribute("data-calendar-link") ? ["ui", "month", "mode"] : ["ui"];
    for (const key of keys) {
      if (query.has(key)) url.searchParams.set(key, query.get(key));
      else url.searchParams.delete(key);
    }
    link.href = url.href;
  });
}

function updateQuery() {
  history.replaceState(null, "", location.pathname + (query.size ? `?${query}` : "") + location.hash);
  updateLinks();
}

function localize(root) {
  const numbers = new Intl.NumberFormat(locale);
  const bindings = {
    message: (key) => ui[locale][key],
    region: (code) => regionName(locale, code),
    language: (code) => languageName(locale, code),
    monthName: (number) => monthName(locale, Number(number)),
    yearName: (year) => yearName(locale, Number(year)),
    number: (number) => numbers.format(Number(number)),
    date: (_, node) => dateName(locale, node.dateTime),
    calendarMonth: (value) => calendarMonthName(locale, ...value.split("-").map(Number)),
  };
  for (const [key, format] of Object.entries(bindings)) {
    const attribute = key.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
    root.querySelectorAll(`[data-${attribute}]`).forEach((node) => {
      node.textContent = format(node.dataset[key], node);
    });
  }
  root.querySelectorAll("[data-placeholder]").forEach((node) => {
    node.placeholder = ui[locale][node.dataset.placeholder];
    node.setAttribute("aria-label", node.placeholder);
  });
  root.querySelectorAll("[data-aria]").forEach((node) => node.setAttribute("aria-label", ui[locale][node.dataset.aria]));
}

function localizePage() {
  document.documentElement.lang = locale;
  document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  selector.value = locale;
  localize(document);
  if (calendar) {
    const { calendarRegion, year } = calendar.dataset;
    document.title = `${regionName(locale, calendarRegion)} ${yearName(locale, Number(year))} · ${ui[locale].heading}`;
  } else document.title = ui[locale].heading;
  updateLinks();
}

document.querySelectorAll("[data-enhanced]").forEach((node) => { node.hidden = false; });
selector.addEventListener("change", () => {
  locale = selector.value;
  if (page === "home") {
    location.assign(homePath(locale) + location.hash);
    return;
  }
  if (locale === initialLocale) query.delete("ui");
  else query.set("ui", locale);
  updateQuery();
  localizePage();
  renderMonth();
});
if (locale !== initialLocale) localizePage();
else updateLinks();

const search = document.querySelector("#directory-search");
if (search) {
  const cards = [...document.querySelectorAll(".country")];
  const normalize = (text) => text.normalize("NFKD").replace(/\p{M}/gu, "").toLocaleLowerCase(locale);
  const labels = cards.map((card) => normalize(card.dataset.search + " " + card.textContent));
  const count = document.querySelector("#directory-count");
  const noMatches = document.querySelector("#no-matches");
  const hero = search.closest(".hero");
  const formatter = new Intl.NumberFormat(locale);
  const filterDirectory = () => {
    const value = search.value.trim();
    const terms = normalize(value).split(/\s+/);
    let visible = 0;
    cards.forEach((card, index) => {
      card.hidden = !terms.every((term) => labels[index].includes(term));
      if (!card.hidden) visible++;
    });
    count.value = formatter.format(visible);
    noMatches.hidden = visible !== 0;
    hero.toggleAttribute("data-searching", Boolean(value));
  };
  search.addEventListener("input", filterDirectory);
  window.addEventListener("pageshow", filterDirectory);
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !event.ctrlKey && !event.altKey && !event.metaKey &&
        !event.target.closest("input, textarea, select, [contenteditable]")) {
      event.preventDefault();
      search.focus();
    }
  });

  const match = /^#([a-z0-9_-]+)(?:\/(\d{4}))?$/i.exec(location.hash);
  const routes = JSON.parse(document.querySelector("#legacy-routes").textContent);
  const entry = match && Object.hasOwn(routes, match[1]) ? routes[match[1]] : undefined;
  if (entry) {
    const year = Number(match[2]);
    const target = entry.years.includes(year) ? entry.path.replace(/\d{4}\/$/, `${year}/`) : entry.path;
    location.replace(base + target);
  }
}

const monthButtons = [...document.querySelectorAll("[data-show-month]")];
let activeMonth = /^(?:[1-9]|1[0-2])$/.test(query.get("month")) ? Number(query.get("month")) : 0;

function changeMonth(month) {
  activeMonth = month;
  if (month) query.set("month", month);
  else query.delete("month");
  updateQuery();
  renderMonth();
}

function renderMonth() {
  if (!calendar) return;
  const panel = document.querySelector("#month-panel");
  const cards = [...calendar.querySelectorAll("[data-month]")];
  const selected = cards[activeMonth - 1];
  cards.forEach((card) => {
    card.hidden = selected ? card !== selected : card.hasAttribute("data-empty");
  });
  document.querySelector("#empty-year").hidden = Boolean(selected) || cards.some((card) => !card.hidden);
  monthButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.showMonth === (selected ? String(activeMonth) : "all")));
  });
  panel.hidden = !selected;
  if (!selected) return;

  const year = Number(calendar.dataset.year);
  document.querySelector("#month-heading").textContent = calendarMonthName(locale, year, activeMonth);
  for (const [id, month] of [["previous-month", activeMonth - 1], ["next-month", activeMonth + 1]]) {
    const button = document.getElementById(id);
    button.disabled = month < 1 || month > 12;
    button.setAttribute("aria-label", calendarMonthName(locale, year, month));
  }

  const { weekdays, offset, days } = calendarMonth(locale, calendar.dataset.calendarRegion, year, activeMonth);
  const eventRows = [...selected.querySelectorAll("[data-range-start]")];
  const fullDate = new Intl.DateTimeFormat(locale, { calendar: "gregory", timeZone: "UTC", dateStyle: "full" });
  const today = new Date();
  const cells = weekdays.map((label) => {
    const cell = document.createElement("span");
    cell.className = "weekday";
    cell.textContent = label;
    return cell;
  });
  for (let index = 0; index < offset; index++) {
    const gap = document.createElement("span");
    gap.setAttribute("aria-hidden", "true");
    cells.push(gap);
  }
  for (const { key, label } of days) {
    const matching = eventRows.filter(({ dataset }) => key >= dataset.rangeStart && key <= dataset.rangeEnd);
    const time = document.createElement("time");
    time.dateTime = key;
    time.textContent = label;
    const cell = matching.length ? document.createElement("button") : time;
    cell.className = "grid-day";
    if (matching.length) {
      cell.type = "button";
      cell.append(time);
      const titles = [...new Set(matching.map((row) => row.querySelector("bdi").textContent))];
      cell.setAttribute("aria-label", [fullDate.format(new Date(key)), ...titles].join(" · "));
      cell.addEventListener("click", () => {
        matching.forEach((row) => { row.open = true; });
        matching[0].querySelector("summary").focus();
      });
    }
    if (year === today.getFullYear() && activeMonth === today.getMonth() + 1 && Number(key.slice(-2)) === today.getDate()) {
      cell.setAttribute("aria-current", "date");
    }
    cells.push(cell);
  }
  document.querySelector("#month-grid").replaceChildren(...cells);
}

if (calendar) {
  const original = document.createDocumentFragment();
  const merged = document.querySelector("#merged-holidays").content;
  const modes = document.querySelectorAll("[name=calendar-mode]");
  const picker = document.querySelector(".year-picker");

  const changeMode = (mode) => {
    const [save, show] = mode === "merged" ? [original, merged] : [merged, original];
    save.append(...calendar.childNodes);
    calendar.append(show);
    localize(calendar);
    renderMonth();
  };

  for (const radio of modes) {
    radio.addEventListener("change", () => {
      if (radio.value === "merged") query.set("mode", "merged");
      else query.delete("mode");
      updateQuery();
      changeMode(radio.value);
    });
  }
  if (query.get("mode") === "merged") {
    modes[1].checked = true;
    changeMode("merged");
  } else {
    modes[0].checked = true;
    renderMonth();
  }

  for (const button of monthButtons) {
    button.addEventListener("click", () => changeMonth(Number(button.dataset.showMonth) || 0));
  }
  document.querySelector("#previous-month").addEventListener("click", () => changeMonth(activeMonth - 1));
  document.querySelector("#next-month").addEventListener("click", () => changeMonth(activeMonth + 1));
  document.addEventListener("click", (event) => {
    if (picker.open && !picker.contains(event.target)) picker.open = false;
  });
  picker.addEventListener("keydown", (event) => {
    if (picker.open && event.key === "Escape") {
      picker.open = false;
      picker.querySelector("summary").focus();
    }
  });
}
