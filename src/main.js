// Оболочка SAQTA: приложение жителя (нижнее меню) и партнёрские режимы (магазин, ОСИ, хаб, акимат).
import './lib/migrate.js'; // первым: перенос сохранённого из ключей qaita-* до чтения хранилища
import { APP_NAME, SLOGAN } from './data.js';
import { ICON } from './lib/icons.js';
import { getState, subscribe, reset, setTazaru, unreadCount } from './store.js';
import * as homeScr from './screens/home.js';
import * as points from './screens/points.js';
import * as resident from './screens/resident.js';
import * as wallet from './screens/wallet.js';
import * as profile from './screens/profile.js';
import * as shop from './screens/shop.js';
import * as osi from './screens/osi.js';
import * as hub from './screens/hub.js';
import * as akimat from './screens/akimat.js';
import { toast, sheet } from './lib/ui.js';
import { maybeOnboard, startOnboarding } from './lib/onboarding.js';
import { mascotFace } from './lib/mascot.js';
import { openChat } from './lib/chat.js';
import { esc } from './lib/format.js';
import { initInstall, install, isStandalone, bannerWanted, dismissBanner, onInstallChange } from './lib/install.js';
import { refreshMaps } from './lib/map/view.js';

// Приложение жителя — нижнее меню; «Сдать» — большая кнопка по центру
const RESIDENT = [
  { id: 'home', label: 'Главная', icon: ICON.home, mod: homeScr },
  { id: 'points', label: 'Карта', icon: ICON.map, mod: points },
  { id: 'resident', label: 'Сдать', icon: ICON.camera, mod: resident, main: true },
  { id: 'wallet', label: 'Кошелёк', icon: ICON.wallet, mod: wallet },
  { id: 'profile', label: 'Профиль', icon: ICON.resident, mod: profile },
];
// Партнёрские режимы: у каждого свой экран, переключение — чипами сверху
const PARTNERS = [
  { id: 'shop', label: 'Магазин', sub: 'Экипаж: «Обратный рейс»', icon: ICON.shop, mod: shop },
  { id: 'osi', label: 'ОСИ', sub: '«Бирка у бака»', icon: ICON.osi, mod: osi },
  { id: 'hub', label: 'Хаб', sub: 'Мастер: проверка, детали, сырьё', icon: ICON.hub, mod: hub, wide: true },
  { id: 'akimat', label: 'Акимат', sub: 'Панель города', icon: ICON.akimat, mod: akimat, wide: true },
];
const ALL = [...RESIDENT, ...PARTNERS];
const isPartner = (s) => PARTNERS.includes(s);

// ── Тема: по умолчанию как в системе (телефон или браузер); в меню «Житель ▾ → Показ» можно выбрать светлую или тёмную ──
const THEME_KEY = 'saqta-theme-mode';
const THEME_MODES = [['system', 'Системная'], ['light', 'Светлая'], ['dark', 'Тёмная']];
const THEME_BAR = { light: '#f9f9fb', dark: '#161618' };
const systemDark = matchMedia('(prefers-color-scheme: dark)');
try { localStorage.removeItem('saqta-theme'); } catch { /* старый переключатель: все начинают с системной темы */ }
let mode = (() => {
  try { const v = localStorage.getItem(THEME_KEY); return v === 'light' || v === 'dark' ? v : 'system'; } catch { return 'system'; }
})();
const themeMode = () => mode;
const resolvedTheme = () => (mode === 'system' ? (systemDark.matches ? 'dark' : 'light') : mode);
function applyTheme() {
  const t = resolvedTheme();
  if (document.documentElement.dataset.theme === (t === 'dark' ? 'dark' : undefined)) return false;
  if (t === 'dark') document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_BAR[t]);
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', t);
  return true;
}
applyTheme();

document.title = APP_NAME;
const app = document.getElementById('app');
app.innerHTML = `
  <header class="topbar" id="topbar"><div class="topbar-in" id="topIn"></div></header>
  <main class="view" id="view" tabindex="-1"></main>
  <div class="install-slot"></div>
  <nav class="tabbar" id="tabbar" aria-label="Разделы"><div class="tabbar-in">
    ${RESIDENT.map((s) => `<a class="tb${s.main ? ' main' : ''}" href="#${s.id}" data-screen="${s.id}">${s.main ? `<span class="main-btn">${s.icon}</span>` : s.icon}<span>${s.label}</span></a>`).join('')}
  </div></nav>`;

const view = document.getElementById('view');
const topIn = document.getElementById('topIn');
const tabbar = document.getElementById('tabbar');
let current = null;

function topbarHtml(s) {
  if (isPartner(s)) {
    return `<a class="brand" href="#home" aria-label="В приложение жителя"><span class="brand-mark">${ICON.logo}</span></a>
      <nav class="mode-chips" aria-label="Партнёрские режимы">${PARTNERS.map((p) => `<a class="mode-chip" href="#${p.id}" ${p === s ? 'aria-current="page"' : ''}>${p.icon}${p.label}</a>`).join('')}</nav>
      <button class="role-btn" id="menuBtn" aria-haspopup="dialog">Режим ${ICON.chevDown}</button>`;
  }
  const unread = unreadCount();
  return `<a class="brand" href="#home"><span class="brand-mark">${ICON.logo}</span><span class="brand-name">${APP_NAME}</span></a>
    <span class="top-grow"></span>
    <button class="ask-btn" id="askBtn" aria-label="Спросить Сактика">${mascotFace('happy')}</button>
    <a class="icon-btn bell" href="#wallet" aria-label="Уведомления${unread ? `: ${unread} новых` : ''}">${ICON.bell}${unread ? '<i class="dot"></i>' : ''}</a>
    <button class="role-btn" id="menuBtn" aria-haspopup="dialog">Житель ${ICON.chevDown}</button>`;
}

function route() {
  const [id, param] = (location.hash || '#home').slice(1).split('/');
  const s = ALL.find((x) => x.id === id) || RESIDENT[0];
  const changed = current !== s;
  if (changed && current?.mod.leave) current.mod.leave();
  current = s;
  if (param != null && s.mod.open) s.mod.open(decodeURIComponent(param));
  document.getElementById('topbar').classList.toggle('wide', !!s.wide);
  view.classList.toggle('wide', !!s.wide);
  tabbar.hidden = isPartner(s);
  tabbar.querySelectorAll('.tb').forEach((b) => (b.dataset.screen === s.id ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
  renderCurrent(changed);
  if (changed) { // мягкое появление экрана, как при переходе в приложении
    view.classList.remove('enter');
    void view.offsetWidth;
    view.classList.add('enter');
  }
}

function renderCurrent(scrollTop = false) {
  const st = getState();
  topIn.innerHTML = topbarHtml(current);
  const wTab = tabbar.querySelector('.tb[data-screen="wallet"]');
  wTab.querySelector('.dot')?.remove();
  if (unreadCount() && current.id !== 'wallet') wTab.insertAdjacentHTML('beforeend', '<i class="dot" aria-label="новое уведомление"></i>');
  current.mod.render(view, st);
  if (scrollTop) window.scrollTo({ top: 0 });
}

// Нажатие на текущую вкладку возвращает раздел в начало
tabbar.addEventListener('click', (e) => {
  const b = e.target.closest('.tb');
  if (!b) return;
  if (location.hash.slice(1).split('/')[0] === b.dataset.screen) { current.mod.home?.(); renderCurrent(true); }
});
window.addEventListener('hashchange', route);
window.addEventListener('saqta:onboarded', () => renderCurrent(true));
window.addEventListener('saqta:profile', () => renderCurrent(false));
subscribe(() => renderCurrent(false));

// Смена темы: графики и плитки карты берут цвета темы при отрисовке, поэтому перерисовываем их
function themeChanged() {
  if (!applyTheme()) return;
  renderCurrent();
  refreshMaps();
}
function setThemeMode(next) {
  mode = next;
  try {
    if (next === 'system') localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, next);
  } catch { /* без хранилища выбор живёт до перезагрузки */ }
  themeChanged();
}
// Телефон перешёл в ночной режим — при «Системной» приложение меняет тему сразу
systemDark.addEventListener?.('change', () => { if (themeMode() === 'system') themeChanged(); });

// ── Режим: житель или партнёр, плюс настройки показа ───────────────────────
topIn.addEventListener('click', (e) => {
  if (e.target.closest('#askBtn')) return openChat();
  if (!e.target.closest('#menuBtn')) return;
  const st = getState();
  sheet('Кто ты сегодня?', (body, close) => {
    body.innerHTML = `<div class="menu">
      <div class="rows">
        <a class="rowi" href="#home" data-close-go><span class="r-ico" style="background:var(--brand-soft);color:var(--brand)">${ICON.resident}</span><span class="grow">Житель<small>Приложение SAQTA: сдать технику, бонусы</small></span>${current && !isPartner(current) ? ICON.check : ''}</a>
        ${PARTNERS.map((p) => `<a class="rowi" href="#${p.id}" data-close-go><span class="r-ico">${p.icon}</span><span class="grow">${p.label}<small>${esc(p.sub)}</small></span>${current === p ? ICON.check : ''}</a>`).join('')}
      </div>
      <div class="section-label mt-16">Показ</div>
      <div class="rows">
        <button class="rowi" data-act="tazaru" role="menuitemcheckbox" aria-checked="${st.tazaru}"><span class="r-ico">${ICON.sun}</span><span class="grow">Неделя Тазару күні<small>Бонусы × 2 за сданную технику</small></span><span class="switch ${st.tazaru ? 'on' : ''}"></span></button>
        <div class="rowi theme-row"><span class="r-ico">${ICON.moon}</span><span class="grow">Оформление<small>Системная — как в телефоне или браузере</small>
          <span class="seg block mt-8" role="group" aria-label="Оформление">${THEME_MODES.map(([v, l]) => `<button data-theme-mode="${v}" aria-pressed="${themeMode() === v}">${l}</button>`).join('')}</span></span></div>
        ${isStandalone() ? '' : `<button class="rowi" data-act="install"><span class="r-ico">${ICON.install}</span><span class="grow">Установить на телефон<small>Иконка на рабочем столе, без адресной строки</small></span></button>`}
        <button class="rowi" data-act="ready"><span class="r-ico">${ICON.wallet}</span><span class="grow">Кошелёк с историей<small>1 320 бонусов: ноутбук и роялти</small></span></button>
        <button class="rowi" data-act="clean"><span class="r-ico">${ICON.reset}</span><span class="grow">Начать с нуля<small>Пустой кошелёк, без заявок</small></span></button>
        <button class="rowi" data-act="tour"><span class="r-ico">${ICON.info}</span><span class="grow">Знакомство с Сактиком<small>Показать обучение заново</small></span></button>
      </div>
      <p class="footnote center">${APP_NAME} · ${SLOGAN}</p>
    </div>`;
    body.addEventListener('click', (ev) => {
      if (ev.target.closest('[data-close-go]')) { close(); return; }
      const tm = ev.target.closest('[data-theme-mode]');
      if (tm) { // лист остаётся открытым: видно, как меняется оформление
        setThemeMode(tm.dataset.themeMode);
        body.querySelectorAll('[data-theme-mode]').forEach((x) => x.setAttribute('aria-pressed', String(x === tm)));
        return;
      }
      const b = ev.target.closest('[data-act]');
      if (!b) return;
      const act = b.dataset.act;
      if (act === 'tazaru') { setTazaru(!getState().tazaru); toast(getState().tazaru ? 'Тазару күні: бонусы × 2' : 'Тазару күні выключен'); }
      if (act === 'clean' || act === 'ready') {
        ALL.forEach((s) => s.mod.home?.());
        reset(act);
        toast(act === 'clean' ? 'Данные очищены' : 'Кошелёк с историей загружен');
      }
      close();
      if (act === 'tour') startOnboarding();
      if (act === 'install') install(); // своё окно: Android — системная установка, iPhone и офлайн-файл — шаги
    });
  });
});

// ── Установка как приложения: плашка над нижним меню и пункт в меню ─────────
initInstall();
function renderInstallBar() {
  const slot = document.querySelector('.install-slot');
  slot.innerHTML = bannerWanted()
    ? `<div class="install-bar" role="region" aria-label="Установка приложения">
        <span class="brand-mark">${ICON.logo}</span>
        <div class="grow"><b>Установите ${APP_NAME}</b><div class="xs muted">Как приложение, без интернета</div></div>
        <button class="btn primary sm" data-install>Установить</button>
        <button class="icon-btn" data-dismiss aria-label="Скрыть">${ICON.close}</button>
      </div>`
    : '';
  document.documentElement.classList.toggle('has-install-bar', !!slot.firstElementChild);
}
document.querySelector('.install-slot').addEventListener('click', (e) => {
  if (e.target.closest('[data-install]')) install();
  if (e.target.closest('[data-dismiss]')) dismissBanner();
});
onInstallChange(renderInstallBar);
matchMedia('(max-width: 900px)').addEventListener?.('change', renderInstallBar);
renderInstallBar();

route();
// Партнёрский режим по прямой ссылке (например, паспорт SAQTA Доктора в хабе) открываем без обучения жителя
if (!/^#(shop|osi|hub|akimat)(\/|$)/.test(location.hash)) maybeOnboard();

// PWA: только когда открыто по http(s) (GitHub Pages). Офлайн-файл с флешки работает без этого.
if (/^https?:$/.test(location.protocol)) {
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = 'manifest.webmanifest';
  document.head.appendChild(link);
  // Иконка для iPhone (рабочий стол iOS берёт её, а не manifest)
  const touch = document.createElement('link');
  touch.rel = 'apple-touch-icon';
  touch.href = 'apple-touch-icon.png';
  document.head.appendChild(touch);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
