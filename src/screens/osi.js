// Экран «ОСИ»: режим «Бирка у бака» — фото, вид техники, «Отметить» → бирка → бонусы ОСИ после вывоза.
import { BONUS, APP_NAME } from '../data.js';
import { getState, osiMark, osiPickup } from '../store.js';
import { ICON } from '../lib/icons.js';
import { qrSvg } from '../lib/qr.js';
import { num, esc, dateTime } from '../lib/format.js';
import { toast } from '../lib/ui.js';

const KINDS = {
  big: { label: 'Крупная', items: ['Холодильник', 'Стиральная машина', 'Плита', 'Телевизор'], bonus: BONUS.osiBig, who: 'крупное заберёт партнёр' },
  small: { label: 'Мелкая', items: ['Чайник', 'Пылесос', 'Микроволновка', 'Роутер'], bonus: BONUS.osiSmall, who: 'мелкое — наш еженедельный маршрут' },
};
let ui = { kind: 'big', what: KINDS.big.items[0], photoUrl: null, last: null };
export function home() { if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl); ui = { kind: 'big', what: KINDS.big.items[0], photoUrl: null, last: null }; }

export function render(el, st) {
  const k = KINDS[ui.kind];
  const last = ui.last ? st.osi.tags.find((t) => t.id === ui.last) : null;
  el.innerHTML = `<div class="phone-col">
    <div class="screen-head"><div><h1>Бирка у бака</h1><p class="muted">Режим ОСИ и дворника</p></div></div>
    <section class="bank-card" aria-label="Бонусы ОСИ" style="padding:16px 20px">
      <div class="ring"></div><div class="sub">Бонусы ОСИ</div>
      <div class="bal num" style="font-size:32px">${num(st.osi.balance)}</div>
      <div class="sub">${BONUS.osiBig} за крупную вещь, ${BONUS.osiSmall} за мелкую — после фото и вывоза</div>
    </section>

    ${last ? tagView(last) : `
    <div class="section-label mt-16">Новая бирка</div>
    <div class="card stack">
      ${ui.photoUrl ? `<img class="photo-prev" src="${ui.photoUrl}" alt="Фото техники у контейнера">` : ''}
      <label class="btn ghost block" for="osiPhoto">${ICON.camera} ${ui.photoUrl ? 'Переснять' : 'Сфотографировать технику'}</label>
      <input id="osiPhoto" type="file" accept="image/*" capture="environment" class="sr-only">
      <div class="seg" role="group" aria-label="Размер">${Object.entries(KINDS).map(([id, v]) => `<button data-kind="${id}" aria-pressed="${ui.kind === id}">${v.label} · +${v.bonus}</button>`).join('')}</div>
      <div class="field"><label for="osiWhat">Вид техники</label><select class="input" id="osiWhat">${k.items.map((i) => `<option ${i === ui.what ? 'selected' : ''}>${i}</option>`).join('')}</select></div>
      <button class="btn primary block" data-mark>${ICON.tag} Отметить</button>
    </div>`}

    ${st.osi.tags.length ? `<div class="section-label mt-16">Мои бирки</div><div class="card"><div class="list">${st.osi.tags.map((t) => `<div class="li">
      <div class="ico">${ICON.tag}</div><div class="grow"><b>${t.no}</b> · ${esc(t.what)}<div class="xs muted">${t.status === 'picked' ? 'вывезено' : 'ждёт вывоза'} · ${dateTime(t.ts)}</div></div>
      <div class="amt ${t.status === 'picked' ? 'pos' : 'faint'}">+${num(t.kind === 'big' ? BONUS.osiBig : BONUS.osiSmall)}</div></div>`).join('')}</div></div>` : ''}
    <p class="xs muted mt-12">С сентября 2026 года ОСИ могут получать и выплаты от операторов РОП.</p>
  </div>`;
  bind(el);
}

function tagView(t) {
  const k = KINDS[t.kind];
  return `<div class="section-label mt-16">Бирка</div>
  <div class="card receipt">
    ${qrSvg(`${APP_NAME}:tag:${t.no}`, { label: `QR бирки ${t.no}` })}
    <div><div class="xs muted">${APP_NAME} · бирка № ${t.no}</div><h2>Эту технику заберут на переработку</h2></div>
    <p class="small">Не выбрасывайте в контейнер.<br>Вид: ${esc(t.what.toLowerCase())} · Отметил: ОСИ дома</p>
    <p class="xs muted">${k.who}</p>
    ${t.status === 'marked'
      ? `<button class="btn primary block" data-pickup="${t.id}">${ICON.truck} Партнёр забрал (демо)</button>`
      : `<p class="tag whole">вывезено · +${num(k.bonus)} бонусов ОСИ</p>`}
    <button class="btn ghost block" data-done>Новая бирка</button>
  </div>`;
}

function bind(el) {
  el.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
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
