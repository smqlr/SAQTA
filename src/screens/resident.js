// Экран «Житель»: фото или пример → карточка с моделью, живыми деталями и ценой → способ сдачи → QR-квитанция.
import { EXAMPLES, DEVICE_TYPES, METHODS, SCHOOLS, BONUS, WALLET, TAGS, APP_NAME, DONOR_LINE, ECON } from '../data.js';
import { getState, submitDonation, residentPickupDone, suggestTag, donationsThisMonth, selectHubItem } from '../store.js';
import { ART } from '../lib/art.js';
import { ICON } from '../lib/icons.js';
import { qrSvg } from '../lib/qr.js';
import { num, tenge, esc, dateTime } from '../lib/format.js';
import { tagChip, demoMark, tbd, toast } from '../lib/ui.js';

// Локальное состояние потока (не сохраняется: это шаги одного действия)
let ui = { step: 'start', exampleId: null, manual: null, photoUrl: null, method: null, school: SCHOOLS[0], receiptId: null };
export function home() {
  if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl);
  ui = { step: 'start', exampleId: null, manual: null, photoUrl: null, method: null, school: SCHOOLS[0], receiptId: null };
}

const CONDITIONS = [
  { id: 'works', label: 'Работает' },
  { id: 'dead', label: 'Не включается' },
  { id: 'broken', label: 'Разбит корпус или экран' },
  { id: 'swollen', label: 'Вздулась батарея' },
  { id: 'other', label: 'Другое' },
];

const STATUS = {
  sent: 'Едет в хаб',
  checked: 'Проверено, бонусы начислены',
  sold: 'Детали нашли новых владельцев',
  'awaiting-pickup': 'Ждёт вывоза',
  picked: 'Забрали, бонусы начислены',
};

function device() {
  if (ui.exampleId) return { ...EXAMPLES.find((e) => e.id === ui.exampleId), isExample: true };
  if (ui.manual) {
    const m = ui.manual;
    return { id: null, model: m.model, state: m.stateText, type: m.type, tag: suggestTag(m.type, m.condition), art: artFor(m.type), parts: [], isExample: false };
  }
  return null;
}
const artFor = (type) => ({ phone: 'phone', laptop: 'laptop', small: 'kettle', big: 'fridge' })[type] || 'device';
const bonusFor = (type) => DEVICE_TYPES[type].bonus * (getState().tazaru ? BONUS.tazaruMultiplier : 1);

export function render(el, st) {
  const fn = { start, photo, manual, card, method, receipt }[ui.step] || start;
  el.innerHTML = `<div class="phone-col">${fn(st)}</div>`;
  bind(el);
}

// ── Шаг 1: старт ────────────────────────────────────────────────────────────
function start(st) {
  const left = WALLET.monthlyDeviceLimit - donationsThisMonth();
  return `
  <div class="screen-head">
    <div><h1>Сдать технику</h1><p class="muted">${DONOR_LINE}</p></div>
  </div>
  <a class="card tight row between" href="#wallet" style="text-decoration:none;color:inherit;margin-bottom:16px">
    <span class="row"><span class="mini-ico">${ICON.wallet}</span><span><span class="xs muted">Мои бонусы</span><br><b class="num">${num(st.wallet.balance)}</b></span></span>
    <span class="xs muted">1 бонус = 1 ₸ →</span>
  </a>
  <div class="stack">
    <label class="btn primary block" for="photoInput">${ICON.camera} Сфотографировать устройство</label>
    <input id="photoInput" type="file" accept="image/*" capture="environment" class="sr-only">
    <button class="btn ghost block" data-go="manual">${ICON.edit} Ввести модель вручную</button>
  </div>
  <div class="row between mt-16"><div class="section-label">Или выберите пример</div>${demoMark('офлайн-примеры')}</div>
  ${examplesGrid()}
  <p class="xs muted mt-8">Лимит — ${WALLET.monthlyDeviceLimit} устройств в месяц на человека. В этом месяце осталось: ${Math.max(0, left)}.</p>
  ${myDonations(st)}`;
}

function examplesGrid() {
  return `<div class="examples">${EXAMPLES.map(
    (e) => `<button class="ex" data-example="${e.id}" aria-label="${esc(e.model)}, ${esc(e.state)} — пример">${demoMark()}${ART[e.art](e.model)}<b>${esc(e.model)}</b><span>${esc(e.state)}</span></button>`,
  ).join('')}</div>`;
}

function myDonations(st) {
  const list = [...st.donations].reverse();
  if (!list.length) return '';
  return `<div class="section-label mt-16">Мои сдачи</div>
  <div class="card"><div class="list">${list
    .map(
      (d) => `<div class="li">
        <div class="ico">${d.type === 'big' ? ICON.truck : ICON.box}</div>
        <div class="grow"><b>${esc(d.model)}</b> <span class="xs faint">${d.deviceNo}</span>
          <div class="xs muted">${STATUS[d.status] || d.status} · ${dateTime(d.ts)}</div>
          ${d.status === 'awaiting-pickup' ? `<button class="btn sm ghost mt-8" data-pickup="${d.id}">${ICON.truck} Скупка забрала</button>` : ''}
        </div>
        <div class="amt ${['checked', 'sold', 'picked'].includes(d.status) ? 'pos' : 'faint'}">${d.bonus ? `+${num(d.bonus)}` : '0'}</div>
      </div>`,
    )
    .join('')}</div></div>`;
}

// ── Шаг 1б: фото ────────────────────────────────────────────────────────────
function photo() {
  return `
  <button class="back" data-go="start">${ICON.back} Назад</button>
  <h1>Фото устройства</h1>
  <img class="photo-prev mt-12" src="${ui.photoUrl}" alt="Ваше фото устройства">
  <div class="notice warn mt-12"><div class="ico">${ICON.info}</div><div class="small">
    <b>Распознавание по фото недоступно без подключения к серверу.</b><br>
    Выберите похожий пример или введите модель вручную — техник хаба подтвердит.</div></div>
  <div class="row between mt-16"><div class="section-label">Похожий пример</div>${demoMark('офлайн-примеры')}</div>
  ${examplesGrid()}
  <button class="btn ghost block mt-12" data-go="manual">${ICON.edit} Ввести модель вручную</button>`;
}

// ── Шаг 1в: ручной ввод ─────────────────────────────────────────────────────
function manual() {
  const m = ui.manual || { model: '', type: 'phone', condition: 'dead' };
  return `
  <button class="back" data-go="start">${ICON.back} Назад</button>
  <h1>Модель вручную</h1>
  <p class="muted mt-8">Без интернета модель вводится вручную, бирку подтвердит техник хаба.</p>
  <form class="stack mt-16" id="manualForm" novalidate>
    <div class="field"><label for="mModel">Модель</label><input class="input" id="mModel" name="model" required maxlength="60" placeholder="Например, Xiaomi Redmi Note 8" value="${esc(m.model)}"></div>
    <div class="field"><label for="mType">Вид техники</label><select class="input" id="mType" name="type">
      ${Object.entries(DEVICE_TYPES).map(([k, v]) => `<option value="${k}" ${k === m.type ? 'selected' : ''}>${v.label} — ${v.bonus} бонусов</option>`).join('')}
    </select></div>
    <div class="field"><label for="mCond">Состояние</label><select class="input" id="mCond" name="condition">
      ${CONDITIONS.map((c) => `<option value="${c.id}" ${c.id === m.condition ? 'selected' : ''}>${c.label}</option>`).join('')}
    </select></div>
    <p class="error" id="mErr" hidden>Введите модель устройства</p>
    <button class="btn primary block" type="submit">Дальше</button>
  </form>`;
}

// ── Шаг 2: карточка устройства ──────────────────────────────────────────────
function card(st) {
  const d = device();
  const bonus = bonusFor(d.type);
  const parts = d.parts || [];
  return `
  <button class="back" data-go="start">${ICON.back} Назад</button>
  <div class="card">
    <div class="row" style="align-items:flex-start">
      <div style="width:96px;flex:none">${ART[d.art](d.model)}</div>
      <div class="grow stack" style="gap:6px">
        <div class="row wrap" style="gap:6px">${tagChip(d.tag)}${d.isExample ? demoMark() : ''}</div>
        <h2>${esc(d.model)}</h2>
        <div class="muted small">${esc(d.state)} · ${DEVICE_TYPES[d.type].label}</div>
      </div>
    </div>
    <div class="divider mt-12"></div>
    <div class="row between mt-12"><span class="muted">Бонусы за сдачу</span><b class="num" style="font-size:20px">+${num(bonus)}</b></div>
    <p class="xs muted">Начисляются после проверки в хабе${st.tazaru ? ' · Тазару күні: × 2' : ''}. 1 бонус = 1 ₸.</p>
  </div>

  ${partsBlock(d)}

  <div class="notice mt-12"><div class="ico">${ICON.tag}</div><div class="small"><b>${TAGS[d.tag].label}:</b> ${TAGS[d.tag].hint}. Итоговую бирку подтвердит техник хаба.</div></div>
  ${d.tag === 'danger' ? `<div class="notice warn mt-12"><div class="ico">${ICON.bolt}</div><div class="small">Вздутая батарея — риск пожара. Не заряжайте её и не выбрасывайте в мусорный бак.</div></div>` : ''}
  <button class="btn primary block mt-16" data-go="method">Выбрать, куда сдать</button>
  ${parts.length ? '' : '<div class="mt-8"></div>'}`;
}

function partsBlock(d) {
  if (d.parts?.length) {
    return `<div class="section-label mt-16">Живые детали</div>
    <div class="card"><div class="list">${d.parts
      .map(
        (p) => `<div class="li"><div class="ico">${ICON.heart}</div>
          <div class="grow"><b>${esc(p.name)}</b>${p.goesTo ? `<div class="xs muted">может уйти ${esc(p.goesTo)}</div>` : ''}
          ${p.hasOrder ? '<div class="xs" style="color:var(--brand);font-weight:600">есть заявка мастерской</div>' : ''}</div>
          <div class="amt">${p.price == null ? tbd() : tenge(p.price)}</div></div>`,
      )
      .join('')}</div>
      <p class="xs muted mt-8">Когда деталь продадут, вы получите ещё ${Math.round(BONUS.royaltyShare * 100)}% её цены и уведомление, кого спасло ваше устройство.${d.type === 'laptop' ? ` Старый ноутбук может принести до ${WALLET.laptopUpTo} бонусов.` : ''}</p>
    </div>`;
  }
  if (d.wholeNote) {
    return `<div class="section-label mt-16">Вторая жизнь целиком</div><div class="card small">${esc(d.wholeNote)}. Цена: ${tbd()}.</div>`;
  }
  if (!d.isExample) {
    return `<div class="section-label mt-16">Живые детали</div><div class="card small muted">Какие детали живы, определит техник хаба на триаже за ${ECON.triageSec} секунд.</div>`;
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
  <button class="back" data-go="card">${ICON.back} Назад</button>
  <h1>Куда сдать</h1>
  <p class="muted mt-8">${esc(d.model)} · +${num(bonusFor(d.type))} бонусов</p>
  <div class="choices mt-16">${opts
    .map(
      (k) => `<button class="choice" data-method="${k}" aria-pressed="${ui.method === k}">
        <span class="ico">${icons[k]}</span><span class="grow"><b>${METHODS[k].label}</b><br><span class="small muted">${METHODS[k].hint}</span></span></button>`,
    )
    .join('')}</div>
  ${ui.method === 'school' ? `<div class="field mt-16"><label for="school">Школа ребёнка</label>
     <select class="input" id="school">${SCHOOLS.map((s) => `<option ${s === ui.school ? 'selected' : ''}>${s}</option>`).join('')}</select>
     <span class="hint">Названия школ — пример: список Донор-лиги появится после договоров.</span></div>` : ''}
  <p class="error mt-12" id="limitErr" hidden>Лимит — ${WALLET.monthlyDeviceLimit} устройств в месяц на человека. Попробуйте в следующем месяце.</p>
  <button class="btn primary block mt-16" data-submit>${big ? 'Вызвать вывоз' : 'Сдать и получить QR'}</button>`;
}

// ── Шаг 4: QR-квитанция ─────────────────────────────────────────────────────
function receipt(st) {
  const d = st.donations.find((x) => x.id === ui.receiptId);
  if (!d) return start(st);
  const big = d.type === 'big';
  const payload = `${APP_NAME}:receipt:${d.deviceNo}`;
  return `
  <div class="card receipt">
    <div class="row" style="justify-content:center;gap:8px;color:var(--brand)">${ICON.check}<b>${big ? 'Заявка на вывоз создана' : 'Готово к сдаче'}</b></div>
    ${qrSvg(payload, { label: `QR-квитанция ${d.deviceNo}` })}
    <div><div class="xs muted">${APP_NAME} · квитанция</div><h2 class="num">${d.deviceNo}</h2></div>
    <div class="small">${esc(d.model)} · ${METHODS[d.method].label}${d.school ? ` · ${esc(d.school)}` : ''}</div>
    <div class="divider" style="width:100%"></div>
    <div class="row between" style="width:100%"><span class="muted small">Бонусы</span><b>+${num(d.bonus)} после ${big ? 'вывоза' : 'проверки в хабе'}</b></div>
    ${['phone', 'laptop'].includes(d.type) ? `<div class="notice" style="text-align:left;width:100%"><div class="ico">${ICON.info}</div><div class="small">Данные будут стёрты или носитель уничтожен. Сертификат придёт в приложение.</div></div>` : ''}
    ${big ? `<div class="notice" style="text-align:left;width:100%"><div class="ico">${ICON.truck}</div><div class="small">${METHODS.pickup.hint}.</div></div>` : ''}
  </div>
  <div class="stack mt-16">
    ${big ? `<button class="btn ghost block" data-pickup="${d.id}">${ICON.truck} Скупка забрала</button>` : `<button class="btn ghost block" data-to-hub="${d.deviceNo}">${ICON.hub} Посмотреть в хабе</button>`}
    <button class="btn primary block" data-go="start">Готово</button>
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
      toast('Скупка забрала технику: бонусы начислены');
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
        const d = submitDonation({
          exampleId: ui.exampleId,
          manual: ui.manual,
          method: ui.method,
          school,
        });
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
