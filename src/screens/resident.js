// Экран «Житель»: фото или пример → карточка с моделью, живыми деталями и ценой → способ сдачи → QR-квитанция.
import { EXAMPLES, CATEGORIES, DEVICE_TYPES, METHODS, SCHOOLS, BONUS, WALLET, TAGS, APP_NAME, DONOR_LINE, ECON } from '../data.js';
import { getState, submitDonation, residentPickupDone, suggestTag, donationsThisMonth, selectHubItem } from '../store.js';
import { ART } from '../lib/art.js';
import { ICON } from '../lib/icons.js';
import { qrSvg } from '../lib/qr.js';
import { num, tenge, esc, dateTime } from '../lib/format.js';
import { tagChip, demoMark, toast } from '../lib/ui.js';

// Локальное состояние потока (не сохраняется: это шаги одного действия)
let cat = CATEGORIES[0].id; // выбранная подтема — переживает возврат на старт
const fresh = () => ({ step: 'start', exampleId: null, manual: null, photoUrl: null, method: null, school: SCHOOLS[0], receiptId: null });
let ui = fresh();
export function home() {
  if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl);
  ui = fresh();
}

const CONDITIONS = [
  { id: 'works', label: 'Работает' },
  { id: 'dead', label: 'Не включается' },
  { id: 'broken', label: 'Разбит корпус или экран' },
  { id: 'swollen', label: 'Вздулась батарея' },
  { id: 'other', label: 'Другое' },
];

const STATUS = {
  sent: ['Едет в хаб', ''],
  checked: ['Проверено, бонусы начислены', 'ok'],
  sold: ['Детали нашли новых владельцев', 'ok'],
  'awaiting-pickup': ['Ждёт вывоза', ''],
  picked: ['Забрали, бонусы начислены', 'ok'],
};

function device() {
  if (ui.exampleId) return { ...EXAMPLES.find((e) => e.id === ui.exampleId), isExample: true };
  if (ui.manual) {
    const m = ui.manual;
    return { id: null, model: m.model, state: m.stateText, type: m.type, tag: suggestTag(m.type, m.condition), art: artFor(m.type), parts: [], isExample: false };
  }
  return null;
}
const artFor = (type) => ({ phone: 'phone', laptop: 'laptop', small: 'kettle', big: 'fridge', screen: 'monitor', cable: 'cables' })[type] || 'device';
const bonusFor = (type) => DEVICE_TYPES[type].bonus * (getState().tazaru ? BONUS.tazaruMultiplier : 1);

export function render(el, st) {
  const fn = { start, photo, manual, card, method, receipt }[ui.step] || start;
  el.innerHTML = `<div class="phone-col">${fn(st)}</div>`;
  bind(el);
}

// ── Шаг 1: старт ────────────────────────────────────────────────────────────
function start(st) {
  const left = Math.max(0, WALLET.monthlyDeviceLimit - donationsThisMonth());
  return `
  <div class="screen-head"><h1>Сдать технику</h1><p>${DONOR_LINE}</p></div>
  <a class="link-row" href="#wallet">
    <span class="mini-ico">${ICON.wallet}</span>
    <span class="grow"><span class="xs muted">Мои бонусы</span><br><b class="num">${num(st.wallet.balance)}</b></span>
    <span class="xs muted">1 бонус = 1 ₸</span>${ICON.chevron}
  </a>
  <div class="stack mt-16">
    <label class="btn primary lg block" for="photoInput">${ICON.camera} Сфотографировать устройство</label>
    <input id="photoInput" type="file" accept="image/*" capture="environment" class="sr-only">
    <button class="btn ghost block" data-go="manual">${ICON.edit} Ввести модель вручную</button>
  </div>
  <div class="section-label mt-24">Примеры</div>
  ${examplesGrid()}
  <p class="footnote">До ${WALLET.monthlyDeviceLimit} устройств в месяц на человека · осталось ${left}</p>
  ${myDonations(st)}`;
}

function examplesGrid() {
  const c = CATEGORIES.find((x) => x.id === cat);
  const items = EXAMPLES.filter((e) => e.cat === cat);
  return `<div class="cats" role="tablist" aria-label="Виды техники">${CATEGORIES.map(
    (x) => `<button class="cat" role="tab" data-cat="${x.id}" aria-selected="${x.id === cat}">${x.label}</button>`,
  ).join('')}</div>
  <p class="footnote" style="margin:8px 4px 10px">${esc(c.hint)}</p>
  <div class="examples" role="tabpanel" aria-label="${esc(c.label)}">${items.map(
    (e) => `<button class="ex" data-example="${e.id}" aria-label="${esc(e.model)}, ${esc(e.state)}, пример">${ART[e.art](e.model)}<b>${esc(e.model)}</b><span>${esc(e.state)}</span><span class="ex-bonus">+${num(bonusFor(e.type))}</span></button>`,
  ).join('')}</div>`;
}

function myDonations(st) {
  const list = [...st.donations].reverse();
  if (!list.length) return '';
  return `<div class="section-label mt-24">Мои сдачи</div>
  <div class="card"><div class="list">${list
    .map((d) => {
      const [label, kind] = STATUS[d.status] || [d.status, ''];
      return `<div class="li">
        <div class="ico ${d.type === 'big' ? 'orange' : ''}">${d.type === 'big' ? ICON.truck : ICON.box}</div>
        <div class="grow"><b>${esc(d.model)}</b> <span class="xs faint">${d.deviceNo}</span>
          <div class="xs muted">${dateTime(d.ts)}</div>
          <span class="status-pill ${kind} mt-8">${label}</span>
          ${d.status === 'awaiting-pickup' ? `<div><button class="btn sm ghost mt-8" data-pickup="${d.id}">${ICON.truck} Скупка забрала</button></div>` : ''}
        </div>
        <div class="amt ${['checked', 'sold', 'picked'].includes(d.status) ? 'pos' : 'faint'}">${d.bonus ? `+${num(d.bonus)}` : '0'}</div>
      </div>`;
    })
    .join('')}</div></div>`;
}

// ── Шаг 1б: фото ────────────────────────────────────────────────────────────
function photo() {
  return `
  <button class="back" data-go="start">${ICON.back} Назад</button>
  <h1>Фото устройства</h1>
  <img class="photo-prev mt-12" src="${ui.photoUrl}" alt="Ваше фото устройства">
  <div class="notice warn mt-12"><div class="ico">${ICON.info}</div><div class="small">
    <b>Нет связи с сервером распознавания.</b><br>Выберите похожее устройство или введите модель: техник хаба проверит её при приёмке.</div></div>
  <div class="section-label mt-24">Похожее устройство</div>
  ${examplesGrid()}
  <button class="btn ghost block mt-16" data-go="manual">${ICON.edit} Ввести модель вручную</button>`;
}

// ── Шаг 1в: ручной ввод ─────────────────────────────────────────────────────
function manual() {
  const m = ui.manual || { model: '', type: 'phone', condition: 'dead' };
  return `
  <button class="back" data-go="start">${ICON.back} Назад</button>
  <h1>Модель вручную</h1>
  <p class="muted mt-8">Техник хаба сверит модель и состояние при приёмке.</p>
  <form class="stack mt-16" id="manualForm" novalidate>
    <div class="field"><label for="mModel">Модель</label><input class="input" id="mModel" name="model" required maxlength="60" autocomplete="off" placeholder="Например, Xiaomi Redmi Note 8" value="${esc(m.model)}"></div>
    <div class="field"><label for="mType">Вид техники</label><select class="input" id="mType" name="type">
      ${Object.entries(DEVICE_TYPES).map(([k, v]) => `<option value="${k}" ${k === m.type ? 'selected' : ''}>${v.label} · ${v.bonus} бонусов</option>`).join('')}
    </select></div>
    <div class="field"><label for="mCond">Состояние</label><select class="input" id="mCond" name="condition">
      ${CONDITIONS.map((c) => `<option value="${c.id}" ${c.id === m.condition ? 'selected' : ''}>${c.label}</option>`).join('')}
    </select></div>
    <p class="error" id="mErr" hidden>Введите модель устройства</p>
    <button class="btn primary lg block" type="submit">Дальше</button>
  </form>`;
}

// ── Шаг 2: карточка устройства ──────────────────────────────────────────────
function card(st) {
  const d = device();
  const bonus = bonusFor(d.type);
  return `
  <button class="back" data-go="start">${ICON.back} Назад</button>
  <div class="card">
    <div class="row" style="align-items:flex-start;gap:14px">
      <div style="width:88px;flex:none">${ART[d.art](d.model)}</div>
      <div class="grow stack" style="gap:6px">
        <div class="row wrap" style="gap:8px">${tagChip(d.tag)}${d.isExample ? demoMark('пример') : ''}</div>
        <h2>${esc(d.model)}</h2>
        <div class="muted small">${esc(d.state)} · ${DEVICE_TYPES[d.type].label}</div>
      </div>
    </div>
    <div class="divider mt-12"></div>
    <div class="row between mt-12"><span class="muted">Бонусы за сдачу</span><b class="num" style="font-size:22px">+${num(bonus)}</b></div>
    <p class="xs muted">Придут после проверки в хабе${st.tazaru ? ' · Тазару күні, × 2' : ''}</p>
  </div>

  ${partsBlock(d)}

  <div class="notice mt-12"><div class="ico">${ICON.tag}</div><div class="small"><b>${TAGS[d.tag].label}.</b> ${cap(TAGS[d.tag].hint)}. Бирку подтвердит техник хаба.</div></div>
  ${d.tag === 'danger' ? `<div class="notice danger mt-12"><div class="ico">${ICON.bolt}</div><div class="small">Вздутая батарея может загореться. Не заряжайте её и не выбрасывайте в мусорный бак.</div></div>` : ''}
  <button class="btn primary lg block mt-16" data-go="method">Выбрать, куда сдать</button>`;
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function partsBlock(d) {
  if (d.parts?.length) {
    const priced = d.parts.filter((p) => p.price != null);
    return `<div class="section-label">Живые детали</div>
    <div class="card"><div class="list">${d.parts
      .map(
        (p) => `<div class="li"><div class="ico blue">${ICON.chip}</div>
          <div class="grow"><b>${esc(p.name)}</b>${p.goesTo ? `<div class="xs muted">может уйти ${esc(p.goesTo)}</div>` : ''}
          ${p.hasOrder ? '<div class="xs" style="color:var(--brand);font-weight:600">есть заявка мастерской</div>' : ''}</div>
          ${p.price != null ? `<div class="amt">${tenge(p.price)}</div>` : ''}</div>`,
      )
      .join('')}</div></div>
    <p class="footnote">${priced.length ? 'Цены — за проверенную деталь с гарантией. ' : ''}Когда деталь продадут, вы получите ещё ${Math.round(BONUS.royaltyShare * 100)}% её цены${d.royalty ? ` (по этому ноутбуку — +${num(d.royalty)} бонусов)` : ''}.${d.type === 'laptop' ? ` Старый ноутбук может принести до ${WALLET.laptopUpTo} бонусов.` : ''}</p>`;
  }
  if (d.wholeNote) {
    return `<div class="section-label">Вторая жизнь целиком</div><div class="card small">${esc(d.wholeNote)}.</div>`;
  }
  if (!d.isExample) {
    return `<div class="section-label">Живые детали</div><div class="card small muted">Какие детали живы, техник определит на триаже за ${ECON.triageSec} секунд.</div>`;
  }
  return '';
}

// ── Шаг 3: способ сдачи ─────────────────────────────────────────────────────
function method() {
  const d = device();
  const big = DEVICE_TYPES[d.type].big;
  const opts = big ? ['pickup'] : ['school', 'box'];
  if (!opts.includes(ui.method)) ui.method = opts[0];
  const icons = { school: ICON.school, box: ICON.box, pickup: ICON.truck };
  return `
  <button class="back" data-go="card">${ICON.back} ${esc(d.model)}</button>
  <h1>Куда сдать</h1>
  <p class="muted mt-8">+${num(bonusFor(d.type))} бонусов после ${big ? 'вывоза' : 'проверки в хабе'}</p>
  <div class="choices mt-16">${opts
    .map(
      (k) => `<button class="choice" data-method="${k}" aria-pressed="${ui.method === k}">
        <span class="ico">${icons[k]}</span><span class="grow"><b>${METHODS[k].label}</b><br><span class="small muted">${cap(METHODS[k].hint)}</span></span></button>`,
    )
    .join('')}</div>
  ${ui.method === 'school' ? `<div class="field mt-16"><label for="school">Школа ребёнка</label>
     <select class="input" id="school">${SCHOOLS.map((s) => `<option ${s === ui.school ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></div>` : ''}
  <p class="error mt-12" id="limitErr" hidden>В этом месяце уже сдано ${WALLET.monthlyDeviceLimit} устройств — это лимит на человека. Продолжить можно в следующем месяце.</p>
  <button class="btn primary lg block mt-16" data-submit>${big ? 'Вызвать вывоз' : 'Сдать и получить QR-код'}</button>`;
}

// ── Шаг 4: QR-квитанция ─────────────────────────────────────────────────────
function receipt(st) {
  const d = st.donations.find((x) => x.id === ui.receiptId);
  if (!d) return start(st);
  const big = d.type === 'big';
  const payload = `${APP_NAME}:receipt:${d.deviceNo}`;
  return `
  <div class="card receipt">
    <div class="done-line">${ICON.check}${big ? 'Заявка на вывоз создана' : 'Квитанция готова'}</div>
    ${qrSvg(payload, { label: `QR-квитанция ${d.deviceNo}` })}
    <div><div class="xs muted">Квитанция ${APP_NAME}</div><h2 class="num">${d.deviceNo}</h2></div>
    <div class="kv">
      <div><span>Устройство</span><b>${esc(d.model)}</b></div>
      <div><span>Куда</span><b>${METHODS[d.method].label}${d.school ? `, ${esc(d.school)}` : ''}</b></div>
      <div><span>Бонусы</span><b>+${num(d.bonus)} после ${big ? 'вывоза' : 'проверки'}</b></div>
    </div>
    ${['phone', 'laptop'].includes(d.type) ? `<div class="notice" style="text-align:left;width:100%;background:var(--fill-2)"><div class="ico">${ICON.shield}</div><div class="small">Данные сотрём или уничтожим носитель. Сертификат придёт сюда, в приложение.</div></div>` : ''}
    ${big ? `<div class="notice" style="text-align:left;width:100%;background:var(--fill-2)"><div class="ico">${ICON.truck}</div><div class="small">${cap(METHODS.pickup.hint)}.</div></div>` : ''}
  </div>
  <div class="stack mt-16">
    ${big ? `<button class="btn ghost block" data-pickup="${d.id}">${ICON.truck} Скупка забрала</button>` : `<button class="btn ghost block" data-to-hub="${d.deviceNo}">${ICON.hub} Открыть в хабе</button>`}
    <button class="btn primary lg block" data-go="start">Готово</button>
  </div>`;
}

// ── События ─────────────────────────────────────────────────────────────────
function bind(el) {
  el.onclick = (e) => {
    const t = e.target.closest('button, [data-go]');
    if (!t) return;
    if (t.dataset.go) {
      if (t.dataset.go === 'start') home();
      else ui.step = t.dataset.go;
      return rerender(el);
    }
    if (t.dataset.cat) {
      cat = t.dataset.cat;
      render(el, getState());
      el.querySelector(`[data-cat="${cat}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center' });
      return;
    }
    if (t.dataset.example) {
      ui.exampleId = t.dataset.example;
      ui.manual = null;
      ui.step = 'card';
      return rerender(el);
    }
    if (t.dataset.method) {
      ui.method = t.dataset.method;
      return rerender(el);
    }
    if (t.dataset.pickup) {
      residentPickupDone(t.dataset.pickup);
      toast('Технику забрали, бонусы начислены');
      return;
    }
    if (t.dataset.toHub) {
      const item = getState().hub.queue.find((q) => q.deviceNo === t.dataset.toHub);
      home();
      if (item) selectHubItem(item.id);
      location.hash = 'hub';
      return;
    }
    if (t.hasAttribute('data-submit')) {
      const school = el.querySelector('#school')?.value || ui.school;
      try {
        const d = submitDonation({ exampleId: ui.exampleId, manual: ui.manual, method: ui.method, school });
        ui.receiptId = d.id;
        ui.step = 'receipt';
        rerender(el);
      } catch (err) {
        if (err.code === 'limit') el.querySelector('#limitErr').hidden = false;
        else throw err;
      }
    }
  };
  el.onchange = (e) => {
    if (e.target.id === 'photoInput' && e.target.files?.[0]) {
      if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl);
      ui.photoUrl = URL.createObjectURL(e.target.files[0]);
      ui.step = 'photo';
      rerender(el);
    }
    if (e.target.id === 'school') ui.school = e.target.value;
  };
  const form = el.querySelector('#manualForm');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const model = String(fd.get('model') || '').trim();
      if (!model) {
        el.querySelector('#mErr').hidden = false;
        el.querySelector('#mModel').focus();
        return;
      }
      const condition = String(fd.get('condition'));
      ui.manual = { model, type: String(fd.get('type')), condition, stateText: CONDITIONS.find((c) => c.id === condition).label.toLowerCase() };
      ui.exampleId = null;
      ui.step = 'card';
      rerender(el);
    };
  }
}

function rerender(el) {
  render(el, getState());
  window.scrollTo({ top: 0 });
}
