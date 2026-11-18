// Экран «ОСИ»: режим «Бирка у бака» — адрес дома, фото, вид техники, «Отметить» → бирка → бонусы ОСИ после вывоза.
import { BONUS, APP_NAME } from '../data.js';
import { getState, osiMark, osiPickup, osiSetHome } from '../store.js';
import { ICON } from '../lib/icons.js';
import { qrSvg } from '../lib/qr.js';
import { num, esc, dateTime } from '../lib/format.js';
import { toast } from '../lib/ui.js';
import { addressField, bindAddress } from '../lib/addr-ui.js';
import { reverse } from '../lib/map/address.js';
import { mountMap, setPins, panTo, fitTo } from '../lib/map/view.js';
import { geo } from '../lib/map/geo.js';

const KINDS = {
  big: { label: 'Крупная', items: ['Холодильник', 'Стиральная машина', 'Плита', 'Телевизор'], bonus: BONUS.osiBig, who: 'партнёр' },
  small: { label: 'Мелкая', items: ['Чайник', 'Пылесос', 'Микроволновка', 'Роутер'], bonus: BONUS.osiSmall, who: 'маршрут хаба, раз в неделю' },
};
const fresh = () => ({ kind: 'big', what: KINDS.big.items[0], photoUrl: null, last: null, homeEdit: false, home: { q: null, addr: null }, fitted: '' });
let ui = fresh();
export function home() { if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl); ui = fresh(); }

export function render(el, st) {
  const k = KINDS[ui.kind];
  const last = ui.last ? st.osi.tags.find((t) => t.id === ui.last) : null;
  const h = st.osi.home;
  const editing = !h || ui.homeEdit;
  el.innerHTML = `<div class="phone-col">
    <div class="screen-head"><h1>Бирка у бака</h1><p>Для ОСИ и дворников: отметьте технику у контейнера</p></div>
    <section class="bank-card" aria-label="Бонусы ОСИ" data-testid="osi-balance">
      <div class="sub">Бонусы ОСИ</div>
      <div class="bal num mt-8" style="font-size:34px">${num(st.osi.balance)}</div>
      <div class="sub mt-8">${BONUS.osiBig} за крупную вещь, ${BONUS.osiSmall} за мелкую — после фото и вывоза</div>
    </section>

    ${editing ? `
    <div class="section-label mt-24">Дом ОСИ</div>
    <div class="card stack">
      ${addressField('hAddr', ui.home, { label: 'Адрес дома' })}
      <div class="map-card" style="height:220px"><div class="map-slot" data-map></div></div>
      <button class="btn primary block" data-save-home ${ui.home.addr ? '' : 'disabled'}>Сохранить адрес</button>
    </div>` : `
    <button class="link-row mt-16" data-edit-home>
      <span class="mini-ico" style="background:var(--warn)">${ICON.osi}</span>
      <span class="grow" style="text-align:left"><span class="xs muted">Дом ОСИ</span><br><b data-testid="osi-home">${esc(h.label)}</b></span>
      <span class="xs muted">Изменить</span>${ICON.chevron}
    </button>`}

    ${editing ? '' : last ? tagView(last) : `
    <div class="section-label mt-24">Новая бирка</div>
    <div class="card stack">
      ${ui.photoUrl ? `<img class="photo-prev" src="${ui.photoUrl}" alt="Фото техники у контейнера">` : ''}
      <label class="btn ghost block" for="osiPhoto">${ICON.camera} ${ui.photoUrl ? 'Переснять' : 'Сфотографировать технику'}</label>
      <input id="osiPhoto" type="file" accept="image/*" capture="environment" class="sr-only">
      <div class="seg block" role="group" aria-label="Размер">${Object.entries(KINDS).map(([id, v]) => `<button data-kind="${id}" aria-pressed="${ui.kind === id}">${v.label} · +${v.bonus}</button>`).join('')}</div>
      <div class="field"><label for="osiWhat">Вид техники</label><select class="input" id="osiWhat">${k.items.map((i) => `<option ${i === ui.what ? 'selected' : ''}>${i}</option>`).join('')}</select></div>
      <button class="btn primary lg block" data-mark>${ICON.tag} Отметить</button>
    </div>`}

    ${st.osi.tags.length ? `<div class="section-label mt-24">Мои бирки</div><div class="card"><div class="list">${st.osi.tags.map((t) => `<div class="li">
      <div class="ico ${t.status === 'picked' ? '' : 'orange'}">${ICON.tag}</div><div class="grow"><b>${t.no}</b> · ${esc(t.what)}<div class="xs muted">${t.status === 'picked' ? 'вывезено' : 'ждёт вывоза'} · ${dateTime(t.ts)}</div></div>
      <div class="amt ${t.status === 'picked' ? 'pos' : 'faint'}">+${num(t.kind === 'big' ? BONUS.osiBig : BONUS.osiSmall)}</div></div>`).join('')}</div></div>` : ''}
    <p class="footnote">С сентября 2026 года ОСИ могут получать и выплаты от операторов РОП.</p>
  </div>`;
  bind(el);
  if (editing) attachHomeMap(el, h);
}

function attachHomeMap(el, saved) {
  const slot = el.querySelector('[data-map]');
  if (!slot) return;
  if (!ui.home.addr && saved) ui.home.addr = saved;
  const setAddr = (a) => { ui.home.addr = a; ui.home.q = null; render(el, getState()); };
  const m = mountMap(slot, 'osi', { zoom: 12, onMapClick: (p) => setAddr(reverse(p.lat, p.lon)), onLocate: (p) => p && !p.outside && setAddr(reverse(p.lat, p.lon)) });
  const a = ui.home.addr;
  setPins(m, 'home', a ? [{ id: 'home', kind: 'osi', name: a.label, lat: a.lat, lon: a.lon }] : [], { selectedId: 'home' });
  const view = a ? `${a.lat},${a.lon}` : 'none';
  if (ui.fitted !== view) { ui.fitted = view; if (a) panTo(m, a, 16); else fitTo(m, [geo().center], { maxZoom: 12 }); }
  bindAddress(el, 'hAddr', ui.home, setAddr);
}

function tagView(t) {
  const k = KINDS[t.kind];
  return `<div class="section-label mt-24">Бирка № ${t.no}</div>
  <div class="card receipt">
    ${qrSvg(`${APP_NAME}:tag:${t.no}`, { label: `QR бирки ${t.no}` })}
    <div><div class="xs muted">${APP_NAME} · бирка № ${t.no}</div><h2>Эту технику заберут на переработку</h2></div>
    <p class="small">Не выбрасывайте в контейнер.</p>
    <div class="kv">
      <div><span>Вид</span><b>${esc(t.what)}</b></div>
      <div><span>Где</span><b>${esc(t.address || 'у дома ОСИ')}</b></div>
      <div><span>Отметил</span><b>ОСИ дома</b></div>
      <div><span>Кто заберёт</span><b>${k.who}</b></div>
    </div>
    ${t.status === 'marked'
      ? `<button class="btn primary block" data-pickup="${t.id}">${ICON.truck} Партнёр забрал</button>`
      : `<div class="done-line">${ICON.check}Вывезено · +${num(k.bonus)} бонусов ОСИ</div>`}
    <button class="btn ghost block" data-done>Новая бирка</button>
  </div>`;
}

function bind(el) {
  el.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if ('editHome' in b.dataset) { ui.homeEdit = true; ui.home = { q: null, addr: getState().osi.home }; ui.fitted = ''; return render(el, getState()); }
    if ('saveHome' in b.dataset) {
      if (!ui.home.addr) return;
      ui.homeEdit = false;
      ui.fitted = '';
      osiSetHome(ui.home.addr);
      return toast('Адрес дома сохранён');
    }
    if (b.dataset.kind) { ui.kind = b.dataset.kind; ui.what = KINDS[ui.kind].items[0]; return render(el, getState()); }
    if ('mark' in b.dataset) {
      const t = osiMark({ kind: ui.kind, what: ui.what, photo: !!ui.photoUrl });
      ui.last = t.id;
      if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl);
      ui.photoUrl = null;
      return render(el, getState());
    }
    if (b.dataset.pickup) {
      const t = getState().osi.tags.find((x) => x.id === b.dataset.pickup);
      osiPickup(b.dataset.pickup);
      toast(`Вывезено: +${num(t.kind === 'big' ? BONUS.osiBig : BONUS.osiSmall)} бонусов ОСИ`);
    }
    if ('done' in b.dataset) { ui.last = null; render(el, getState()); }
  };
  el.onchange = (e) => {
    if (e.target.id === 'osiWhat') ui.what = e.target.value;
    if (e.target.id === 'osiPhoto' && e.target.files?.[0]) {
      if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl);
      ui.photoUrl = URL.createObjectURL(e.target.files[0]);
      render(el, getState());
    }
  };
}
