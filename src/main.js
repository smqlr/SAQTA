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

// Порядок экранов — из плана команды: Житель · Кошелёк · Магазин · ОСИ · Хаб · Акимат
const SCREENS = [
  { id: 'resident', label: 'Житель', icon: ICON.resident, mod: resident },
  { id: 'wallet', label: 'Кошелёк', icon: ICON.wallet, mod: wallet },
  { id: 'shop', label: 'Магазин', icon: ICON.shop, mod: shop },
  { id: 'osi', label: 'ОСИ', icon: ICON.osi, mod: osi },
  { id: 'hub', label: 'Хаб', icon: ICON.hub, mod: hub },
  { id: 'akimat', label: 'Акимат', icon: ICON.akimat, mod: akimat },
];

const THEME_KEY = 'unknown-theme';
function applyTheme(t) {
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
}
function savedTheme() { try { return localStorage.getItem(THEME_KEY) || 'auto'; } catch { return 'auto'; } }
function saveTheme(t) { try { localStorage.setItem(THEME_KEY, t); } catch { /* нет хранилища */ } }
applyTheme(savedTheme());

document.title = `${APP_NAME} — прототип`;
const app = document.getElementById('app');
app.innerHTML = `
  <header class="topbar">
    <div class="topbar-in">
      <div class="brand"><span class="brand-mark">${ICON.logo}</span><span class="brand-name">${APP_NAME}</span><span class="proto">прототип</span></div>
      <nav class="tabs" role="tablist" aria-label="Экраны">
        ${SCREENS.map((s) => `<button class="tab" role="tab" data-screen="${s.id}" aria-selected="false">${s.icon}<span>${s.label}</span></button>`).join('')}
      </nav>
      <button class="icon-btn" id="menuBtn" aria-label="Меню демо" aria-haspopup="true" aria-expanded="false">${ICON.more}</button>
    </div>
  </header>
  <main class="view" id="view" tabindex="-1"></main>`;

const view = document.getElementById('view');
let current = null;

function route() {
  const id = (location.hash || '#resident').slice(1).split('/')[0];
  const s = SCREENS.find((x) => x.id === id) || SCREENS[0];
  const changed = current !== s;
  current = s;
  document.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.screen === s.id)));
  renderCurrent(changed);
}

function renderCurrent(scrollTop = false) {
  const st = getState();
  // точка на вкладке «Кошелёк», если есть непрочитанные уведомления
  const wTab = document.querySelector('.tab[data-screen="wallet"]');
  wTab.querySelector('.dot')?.remove();
  if (unreadCount() && current.id !== 'wallet') wTab.insertAdjacentHTML('beforeend', '<i class="dot" aria-label="новое уведомление"></i>');
  current.mod.render(view, st);
  if (scrollTop) window.scrollTo({ top: 0 });
}

document.querySelector('.tabs').addEventListener('click', (e) => {
  const b = e.target.closest('.tab');
  if (!b) return;
  if (location.hash.slice(1).split('/')[0] === b.dataset.screen) current.mod.home?.();
  location.hash = b.dataset.screen;
  if (current?.id === b.dataset.screen) renderCurrent(true);
});
window.addEventListener('hashchange', route);
subscribe(() => renderCurrent(false));

// ── Меню демо ───────────────────────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
function closeMenu() { document.querySelector('.menu')?.remove(); menuBtn.setAttribute('aria-expanded', 'false'); }
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (document.querySelector('.menu')) return closeMenu();
  const st = getState();
  const theme = savedTheme();
  const m = document.createElement('div');
  m.className = 'menu';
  m.innerHTML = `
    <div class="xs muted" style="padding:6px 10px">${SLOGAN}</div>
    <button data-act="tazaru"><div class="grow"><b>Неделя Тазару күні</b><div class="xs muted">бонусы × 2 за сдачу</div></div><span class="switch ${st.tazaru ? 'on' : ''}"></span></button>
    <button data-act="theme"><div class="grow"><b>Тема</b><div class="xs muted">${theme === 'auto' ? 'как в системе' : theme === 'dark' ? 'тёмная' : 'светлая'}</div></div>${ICON.sun}</button>
    <hr>
    <button data-act="clean">${ICON.reset}<div><b>Сбросить демо: чистый старт</b><div class="xs muted">кошелёк 0 — для сквозного сценария на видео</div></div></button>
    <button data-act="ready">${ICON.wallet}<div><b>Сбросить демо: готовый кошелёк</b><div class="xs muted">+200 и +1 120 из документации, баланс 1 320</div></div></button>`;
  document.querySelector('.topbar').appendChild(m);
  menuBtn.setAttribute('aria-expanded', 'true');
  m.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b) return;
    ev.stopPropagation();
    const act = b.dataset.act;
    if (act === 'tazaru') { setTazaru(!getState().tazaru); toast(getState().tazaru ? 'Тазару күні: бонусы × 2' : 'Тазару күні выключен'); }
    if (act === 'theme') { const next = { auto: 'light', light: 'dark', dark: 'auto' }[savedTheme()]; saveTheme(next); applyTheme(next); renderCurrent(); }
    if (act === 'clean' || act === 'ready') {
      SCREENS.forEach((s) => s.mod.home?.());
      reset(act);
      toast(act === 'clean' ? 'Демо сброшено: чистый старт' : 'Демо сброшено: готовый кошелёк');
    }
    closeMenu();
  });
});
document.addEventListener('click', (e) => { if (!e.target.closest('.menu')) closeMenu(); });

route();

// PWA: только когда открыто по http(s) (GitHub Pages). Офлайн-файл с флешки работает без этого.
if (/^https?:$/.test(location.protocol)) {
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = 'manifest.webmanifest';
  document.head.appendChild(link);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
