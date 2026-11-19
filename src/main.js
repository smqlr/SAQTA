import { APP_NAME, SLOGAN } from './data.js';
import { ICON } from './lib/icons.js';
import { getState, subscribe, reset, setTazaru, unreadCount } from './store.js';
import * as resident from './screens/resident.js';
import * as wallet from './screens/wallet.js';
import * as shop from './screens/shop.js';
import * as osi from './screens/osi.js';
import * as hub from './screens/hub.js';
import * as akimat from './screens/akimat.js';
import { toast } from './lib/ui.js';
import { initInstall, install, isStandalone, bannerWanted, dismissBanner, onInstallChange } from './lib/install.js';
import { refreshMaps } from './lib/map/view.js';

// Порядок экранов — из плана команды: Житель · Кошелёк · Магазин · ОСИ · Хаб · Акимат
const SCREENS = [
  { id: 'resident', label: 'Житель', icon: ICON.resident, mod: resident },
  { id: 'wallet', label: 'Кошелёк', icon: ICON.wallet, mod: wallet },
  { id: 'shop', label: 'Магазин', icon: ICON.shop, mod: shop },
  { id: 'osi', label: 'ОСИ', icon: ICON.osi, mod: osi },
  { id: 'hub', label: 'Хаб', icon: ICON.hub, mod: hub },
  { id: 'akimat', label: 'Акимат', icon: ICON.akimat, mod: akimat },
];

// ── Тема: по умолчанию как в системе (телефон или браузер); в меню ⋯ можно выбрать светлую или тёмную ──
const THEME_KEY = 'qaita-theme-mode';
const THEME_MODES = [['system', 'Системная'], ['light', 'Светлая'], ['dark', 'Тёмная']];
const THEME_BAR = { light: '#f9f9fb', dark: '#161618' };
const systemDark = matchMedia('(prefers-color-scheme: dark)');
try { localStorage.removeItem('qaita-theme'); } catch { /* старый переключатель: все начинают с системной темы */ }
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
  <header class="topbar">
    <div class="topbar-in">
      <div class="brand"><span class="brand-mark">${ICON.logo}</span><span class="brand-name">${APP_NAME}</span></div>
      <nav class="tabs" aria-label="Разделы"><div class="tabs-track" role="tablist">
        ${SCREENS.map((s) => `<button class="tab" role="tab" data-screen="${s.id}" aria-selected="false">${s.icon}<span>${s.label}</span></button>`).join('')}
      </div></nav>
      <button class="icon-btn" id="menuBtn" aria-label="Настройки" aria-haspopup="true" aria-expanded="false">${ICON.more}</button>
    </div>
  </header>
  <main class="view" id="view" tabindex="-1"></main>
  <div class="install-slot"></div>
  <nav class="tabbar" aria-label="Разделы"><div class="tabbar-in" role="tablist">
    ${SCREENS.map((s) => `<button class="tab" role="tab" data-screen="${s.id}" aria-selected="false">${s.icon}<span>${s.label}</span></button>`).join('')}
  </div></nav>`;
// На телефоне вкладки внизу, как в приложении (.tabbar); на компьютере — сверху (.tabs). CSS показывает одну из них.

const view = document.getElementById('view');
let current = null;

function route() {
  const id = (location.hash || '#resident').slice(1).split('/')[0];
  const s = SCREENS.find((x) => x.id === id) || SCREENS[0];
  const changed = current !== s;
  current = s;
  document.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.screen === s.id)));
  renderCurrent(changed);
  if (changed) { // мягкое появление экрана, как при переходе в приложении
    view.classList.remove('enter');
    void view.offsetWidth;
    view.classList.add('enter');
  }
}

function renderCurrent(scrollTop = false) {
  const st = getState();
  // точка на вкладке «Кошелёк», если есть непрочитанные уведомления
  document.querySelectorAll('.tab[data-screen="wallet"]').forEach((wTab) => {
    wTab.querySelector('.dot')?.remove();
    if (unreadCount() && current.id !== 'wallet') wTab.insertAdjacentHTML('beforeend', '<i class="dot" aria-label="новое уведомление"></i>');
  });
  current.mod.render(view, st);
  if (scrollTop) window.scrollTo({ top: 0 });
}

document.querySelectorAll('.tabs, .tabbar').forEach((nav) => nav.addEventListener('click', (e) => {
  const b = e.target.closest('.tab');
  if (!b) return;
  if (location.hash.slice(1).split('/')[0] === b.dataset.screen) current.mod.home?.();
  location.hash = b.dataset.screen;
  if (current?.id === b.dataset.screen) renderCurrent(true);
}));
window.addEventListener('hashchange', route);
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

// ── Меню настроек ──────────────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
function closeMenu() { document.querySelector('.menu')?.remove(); menuBtn.setAttribute('aria-expanded', 'false'); }
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (document.querySelector('.menu')) return closeMenu();
  const st = getState();
  const m = document.createElement('div');
  m.className = 'menu';
  m.setAttribute('role', 'menu');
  m.innerHTML = `
    <div class="menu-cap">${APP_NAME} · ${SLOGAN}</div>
    <button data-act="tazaru" role="menuitemcheckbox" aria-checked="${st.tazaru}"><div class="grow"><b>Неделя Тазару күні</b><div class="xs muted">Бонусы × 2 за сданную технику</div></div><span class="switch ${st.tazaru ? 'on' : ''}"></span></button>
    <div class="menu-theme">
      <div><b>Оформление</b><div class="xs muted">Системная — как в телефоне или браузере</div></div>
      <div class="seg block" role="group" aria-label="Оформление">${THEME_MODES.map(([v, l]) => `<button data-theme-mode="${v}" aria-pressed="${themeMode() === v}">${l}</button>`).join('')}</div>
    </div>
    ${isStandalone() ? '' : `<hr>
    <button data-act="install" role="menuitem">${ICON.install}<div><b>Установить на телефон</b><div class="xs muted">Иконка на рабочем столе, без адресной строки</div></div></button>`}
    <hr>
    <button data-act="ready" role="menuitem">${ICON.wallet}<div><b>Кошелёк с историей</b><div class="xs muted">1 320 бонусов: ноутбук и роялти</div></div></button>
    <button data-act="clean" role="menuitem">${ICON.reset}<div><b>Начать с нуля</b><div class="xs muted">Пустой кошелёк, без заявок</div></div></button>`;
  document.querySelector('.topbar').appendChild(m);
  menuBtn.setAttribute('aria-expanded', 'true');
  m.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b) return;
    ev.stopPropagation();
    if (b.dataset.themeMode) { // меню остаётся открытым: видно, как меняется оформление
      setThemeMode(b.dataset.themeMode);
      m.querySelectorAll('[data-theme-mode]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      return;
    }
    const act = b.dataset.act;
    if (act === 'install') install();
    if (act === 'tazaru') { setTazaru(!getState().tazaru); toast(getState().tazaru ? 'Тазару күні: бонусы × 2' : 'Тазару күні выключен'); }
    if (act === 'clean' || act === 'ready') {
      SCREENS.forEach((s) => s.mod.home?.());
      reset(act);
      toast(act === 'clean' ? 'Данные очищены' : 'Кошелёк с историей загружен');
    }
    closeMenu();
  });
});
document.addEventListener('click', (e) => { if (!e.target.closest('.menu')) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// ── Установка как приложения ───────────────────────────────────────────
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
