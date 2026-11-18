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
    <hr>
    <button data-act="ready" role="menuitem">${ICON.wallet}<div><b>Кошелёк с историей</b><div class="xs muted">1 320 бонусов: ноутбук и роялти</div></div></button>
    <button data-act="clean" role="menuitem">${ICON.reset}<div><b>Начать с нуля</b><div class="xs muted">Пустой кошелёк, без заявок</div></div></button>`;
  document.querySelector('.topbar').appendChild(m);
  menuBtn.setAttribute('aria-expanded', 'true');
  m.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b) return;
    ev.stopPropagation();
    const act = b.dataset.act;
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

route();

// PWA: только когда открыто по http(s) (GitHub Pages). Офлайн-файл с флешки работает без этого.
if (/^https?:$/.test(location.protocol)) {
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = 'manifest.webmanifest';
  document.head.appendChild(link);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
