// Экран «Продлить жизнь» (этап 4): вещь сама говорит, сколько ей осталось, бочка Либиха показывает слабую доску,
// цена года жизни решает — продлить или сдать. Пересадка — деталью из Банка деталей, обратный билет — на конец жизни.
import { EXTEND } from '../data.js';
import { decide, CAP_YEARS, fixCost } from '../lib/extend.js';
import { staves } from '../lib/extend-staves.js';
import { decodePassport, passportTitle } from '../lib/doctor.js';
import { orderExtension, ticketStatus, getState } from '../store.js';
import { ICON } from '../lib/icons.js';
import { num, num1, tenge, esc } from '../lib/format.js';
import { toast, sheet, demoMark, realMark } from '../lib/ui.js';

const KINDS = [['laptop', 'Ноутбук'], ['phone', 'Телефон'], ['washer', 'Стиралка']];
const EXAMPLES = {
  lenovo: { kind: 'laptop', f: { model: 'Lenovo IdeaPad', age: 6, soh: 61, disk: 'hdd', slow: true, diskFail: false, src: 'example' } },
  mac: { kind: 'laptop', f: { model: 'MacBook Pro (Mac16,8)', age: 2, soh: 88.4, disk: 'ssd', slow: false, diskFail: false, src: 'chip' } },
};
const DEF = () => ({
  laptop: { ...EXAMPLES.lenovo.f },
  phone: { model: 'Смартфон', age: 3, soh: '', feel: 'evening', screen: 'ok' },
  washer: { model: 'Стиральная машина', age: 8, fault: 'pump' },
});
let ui = { kind: 'laptop', f: DEF() };
export function home() { ui = { kind: 'laptop', f: DEF() }; }

// #extend/laptop, #extend/phone, #extend/washer — с экрана «Сдать»; #extend/doctor=… — паспорт SAQTA Доктора
export function open(param) {
  const p = String(param || '');
  if (p.startsWith('doctor=')) { applyPassport(p); return; }
  if (EXTEND.kinds[p]) ui.kind = p;
}

const clampSoh = (v) => Math.min(100, Math.max(30, Number(v)));
const monthYear = (ts) => new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(new Date(ts));
// «в 3,2 раза», «в 2 раза», «в 6 раз»
const times = (v) => { const r = Math.round(v * 10) / 10; return Number.isInteger(r) ? `${num(r)} ${plural(r, 'раз', 'раза', 'раз')}` : `${num1(r)} раза`; };
const yrs = (v) => {
  if (v >= CAP_YEARS - 1e-9) return 'не ограничивает';
  const r = Math.round(v * 10) / 10;
  if (Number.isInteger(r)) return `${num(r)} ${plural(r, 'год', 'года', 'лет')}`;
  return `${num1(r)} года`;
};
function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

function inputOf(kind, f) {
  if (kind === 'laptop') {
    return { age: +f.age, soh: f.soh === '' || f.soh == null ? null : clampSoh(f.soh) / 100, disk: f.disk, slow: !!f.slow, diskFail: !!f.diskFail };
  }
  if (kind === 'phone') {
    const feel = EXTEND.feel.find((x) => x.id === f.feel);
    const soh = f.soh !== '' && f.soh != null ? clampSoh(f.soh) / 100 : feel ? feel.soh : null;
    return { age: +f.age, soh, screen: f.screen };
  }
  return { age: +f.age, fault: f.fault || null };
}
export function compute(kind = ui.kind, f = ui.f[kind]) {
  const kd = EXTEND.kinds[kind];
  const input = inputOf(kind, f);
  return { kind, kd, input, d: decide(staves(kind, input), { newPrice: kd.newPrice, life: kd.life, kg: kd.kg }) };
}
const titleOf = (kind, f) => `${f.model || EXTEND.kinds[kind].label}, ${num(+f.age)} ${plural(+f.age, 'год', 'года', 'лет')}`;

export function render(el, st) {
  el.innerHTML = `<div class="phone-col ext">
    <a class="back" href="#home">${ICON.back} Главная</a>
    <div class="screen-head"><h1>Продлить жизнь</h1>
      <p>Вещь становится мусором в тот день, когда её решили не чинить. Спроси её — сколько ей осталось и что продлит её дешевле новой.</p></div>
    <div class="seg block" role="group" aria-label="Что продлеваем">${KINDS.map(([k, l]) => `<button data-kind="${k}" aria-pressed="${k === ui.kind}">${l}</button>`).join('')}</div>
    <div class="card mt-12" id="extForm">${form()}</div>
    <div id="extResult">${result()}</div>
    ${ticketsBlock(st)}
    <p class="footnote mt-16">Цены — медианы Kaspi (Актобе) и прайсы мастерских на OLX.kz за ноябрь 2026. Сроки службы — EEB (2019) и документация команды.
      Батарея теряет ёмкость как корень из времени (Ploehn и др., 2004). Расчёт — раздел «Этап 4» в README.</p>
  </div>`;
  bind(el);
}

// ── Форма: что знаем о вещи ─────────────────────────────────────────────────
const seg = (field, val, opts) => `<span class="seg block" role="group">${opts.map(([v, l]) => `<button type="button" data-field="${field}" data-val="${v}" aria-pressed="${String(val) === String(v)}">${l}</button>`).join('')}</span>`;
const ageSel = (max, val) => `<select class="input" data-field="age" aria-label="Возраст">${Array.from({ length: max }, (_, i) => i + 1).map((y) => `<option value="${y}" ${+val === y ? 'selected' : ''}>${y} ${plural(y, 'год', 'года', 'лет')}</option>`).join('')}</select>`;

function form() {
  const f = ui.f[ui.kind];
  if (ui.kind === 'laptop') {
    const mark = f.src === 'doctor' ? realMark('чип прочитан SAQTA Доктором') : f.src === 'chip' ? realMark('чип MacBook команды, 19.11') : demoMark('пример');
    return `<div class="row between wrap" style="gap:8px"><b>${esc(f.model)}</b>${mark}</div>
      <div class="chips mt-8">
        <button class="chip" data-ex="lenovo" aria-pressed="${f.model === EXAMPLES.lenovo.f.model && f.src === 'example'}">Lenovo, 6 лет</button>
        <button class="chip" data-ex="mac" aria-pressed="${f.src === 'chip'}">MacBook, чип</button>
        <button class="chip" data-passport>${ICON.scan} Паспорт Доктора</button>
      </div>
      <div class="ext-grid mt-12">
        <div class="field"><label>Возраст</label>${ageSel(12, f.age)}</div>
        <div class="field"><label for="extSoh">Здоровье батареи, %</label><input class="input" id="extSoh" type="number" inputmode="decimal" min="30" max="100" step="0.1" data-field="soh" value="${esc(f.soh)}" placeholder="нет данных"></div>
      </div>
      <div class="field mt-12"><label>Диск</label>${seg('disk', f.disk, [['ssd', 'SSD'], ['hdd', 'HDD — механический']])}</div>
      <div class="field mt-12"><label>Тормозит?</label>${seg('slow', f.slow, [['false', 'Нет'], ['true', 'Да, долго грузится']])}</div>
      ${f.diskFail ? '<p class="small mt-12" style="color:var(--tag-danger)"><b>SMART: диск умирает</b> — паспорт Доктора</p>' : ''}
      <p class="xs muted mt-12">Здоровье батареи и диск читает SAQTA Доктор — одна команда на ноутбуке (этап 2). Возраст — с года покупки.</p>`;
  }
  if (ui.kind === 'phone') {
    return `<div class="ext-grid">
        <div class="field"><label>Возраст</label>${ageSel(10, f.age)}</div>
        <div class="field"><label for="extSoh">Здоровье батареи, %</label><input class="input" id="extSoh" type="number" inputmode="decimal" min="30" max="100" data-field="soh" value="${esc(f.soh)}" placeholder="из настроек"></div>
      </div>
      <div class="field mt-12"><label>Если процента нет — как держит заряд?</label>
        <div class="chips">${EXTEND.feel.map((x) => `<button class="chip" data-field="feel" data-val="${x.id}" aria-pressed="${f.feel === x.id && (f.soh === '' || f.soh == null)}">${x.label}</button>`).join('')}</div></div>
      <div class="field mt-12"><label>Экран</label>${seg('screen', f.screen, [['ok', 'Целый'], ['broken', 'Разбит']])}</div>
      <p class="xs muted mt-12">iPhone: Настройки → Аккумулятор → Состояние. В Актобе это число пишут ${num(EXTEND.market.iphone)}% продавцов б/у iPhone на OLX, а у Samsung — ${num1(EXTEND.market.samsung)}%: телефон его не показывает, и покупатель берёт вслепую.</p>`;
  }
  return `<div class="field"><label>Возраст</label>${ageSel(25, f.age)}</div>
    <div class="field mt-12"><label>Что случилось?</label>
      <div class="chips">${Object.entries(EXTEND.faults).map(([id, x]) => `<button class="chip" data-field="fault" data-val="${id}" aria-pressed="${f.fault === id}">${cap(x.symptom)}</button>`).join('')}
      <button class="chip" data-field="fault" data-val="" aria-pressed="${!f.fault}">Работает, просто старая</button></div></div>
    <p class="xs muted mt-12">Мастер на дом: работа и диагностика — от ${tenge(EXTEND.fixes.washerPump.work)} (прайс в Актобе). В городе ${num(EXTEND.repair.washer)} мастерских по ремонту стиральных машин (2ГИС).</p>`;
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ── Результат: бочка, вердикт, варианты ─────────────────────────────────────
function result() {
  const { kd, d } = compute();
  return `<h2 class="h-sec">Бочка: сколько проживёт каждая деталь</h2>
    <div class="card" data-testid="barrel">${barrel(d)}</div>
    ${verdict(d, kd)}
    ${options(d, kd)}`;
}

function barrel(d) {
  const best = d.verdict === 'extend' ? d.best : null;
  const fixedIds = best ? best.fixes : [];
  const endless = (v) => v >= CAP_YEARS - 1e-9; // доска не ограничивает жизнь вещи — рисуем во всю высоту
  const finite = [...d.staves.map((s) => s.rul), ...(best ? [best.T] : []), ...d.staves.filter((s) => fixedIds.includes(s.id)).map((s) => s.fix.rul)].filter((v) => !endless(v));
  const top = Math.max(2, ...finite) * 1.25;
  const h = (v) => (endless(v) ? 100 : Math.max(3, Math.min(100, (v / top) * 100)));
  const line = (v) => Math.min(100, (v / top) * 100);
  return `<div class="barrel">
    <div class="barrel-area" role="img" aria-label="Остаток жизни деталей">
      ${d.staves.map((s) => {
        const fixed = fixedIds.includes(s.id);
        const tall = Math.max(h(s.rul), fixed ? h(s.fix.rul) : 0);
        return `<div class="stave${s === d.weakest ? ' weak' : ''}${fixed ? ' fixed' : ''}">
          ${fixed ? `<i class="new" style="height:${h(s.fix.rul)}%"></i>` : ''}<i class="now" style="height:${h(s.rul)}%"></i>
          <span class="yr" style="bottom:calc(${tall}% + 4px)">${yrs(s.rul)}${fixed ? `<br><b>→ ${endless(s.fix.rul) ? 'новая' : yrs(s.fix.rul)}</b>` : ''}</span></div>`;
      }).join('')}
      <div class="water now" style="bottom:${line(d.T0)}%"></div>
      ${best ? `<div class="water new" style="bottom:${line(best.T)}%"></div>` : ''}
    </div>
    <div class="barrel-names">${d.staves.map((s) => `<span title="${esc(s.why || '')}">${esc(s.name)}</span>`).join('')}</div>
    <div class="barrel-legend"><span><i class="ln"></i>сейчас: ${d.T0 < 0.05 ? 'пора решать' : yrs(d.T0)}</span>${best ? `<span><i class="ln new"></i>после пересадки: ${yrs(best.T)}</span>` : ''}</div>
  </div>
  <p class="xs muted mt-12">Вещь живёт, пока живы все её детали, — как бочка Либиха держит воду до самой короткой доски.
    Слабое звено — <b>${esc(d.weakest.name.toLowerCase())}</b>: ${esc(d.weakest.why || '')}.</p>`;
}

function verdict(d, kd) {
  if (d.verdict === 'extend') {
    const b = d.best;
    const fixes = d.staves.filter((s) => b.fixes.includes(s.id));
    return `<div class="card verdict good mt-12" data-testid="verdict" data-verdict="extend">
      <div class="v-head"><span class="v-ico">${ICON.heart}</span><div><b>Продлить: ещё ${yrs(b.gain)} за ${tenge(b.cost)}</b>
        <span>Год жизни — ${tenge(Math.round(b.perYear))}, а новая вещь — ${tenge(Math.round(d.newPerYear))} в год (${esc(kd.newName)}): в ${times(d.ratio)} дороже.</span></div></div>
      <div class="list mt-8">${fixes.map((s) => `<div class="li"><div class="ico ${s.fix.bank ? '' : 'blue'}">${s.fix.bank ? ICON.chip : ICON.wrench}</div>
        <div class="grow"><b>${esc(s.fix.name)}</b><div class="xs muted">${esc(s.fix.where)}${s.fix.bank ? ' · проверена, QR-паспорт, гарантия 30 дней' : ''}</div></div>
        <div class="amt">${tenge(fixCost(s.fix))}</div></div>`).join('')}</div>
      <div class="kv mt-8">
        <div><span>Проживёт</span><b>${yrs(b.T)}</b></div>
        <div><span>Останется у тебя за эти годы</span><b>${tenge(d.saved)}</b></div>
        <div><span>Отходов не родится</span><b>${num1(d.kgSaved)} кг</b></div>
      </div>
      <button class="btn primary lg block mt-12" data-order>Заказать пересадку</button>
      <a class="btn plain block mt-8" href="#resident">Всё-таки сдать</a>
    </div>`;
  }
  if (d.verdict === 'ok') {
    const w = d.staves.find((s) => s.fix);
    const plan = w ? `${w.name}: ещё ${yrs(w.rul)}. Когда кончится — ${w.fix.name.toLowerCase()} за ${tenge(fixCost(w.fix))}. Слабое звено сейчас — ${d.weakest.name.toLowerCase()}.`
      : 'Менять здесь нечего: береги вещь, а когда придёт время — сдай её на детали.';
    return `<div class="card verdict mt-12" data-testid="verdict" data-verdict="ok">
      <div class="v-head"><span class="v-ico">${ICON.check}</span><div><b>Чинить ничего не нужно: проживёт ещё ≈ ${yrs(d.T0)}</b><span>${esc(plan)}</span></div></div>
      <button class="btn ghost block mt-12" data-order>Поставить на учёт — напомним за месяц</button>
    </div>`;
  }
  const b = d.best;
  const rest = d.staves.find((s) => s.id === 'rest');
  const why = b ? `Год жизни после ремонта — ${tenge(Math.round(b.perYear))}, а новая вещь — ${tenge(Math.round(d.newPerYear))} в год (${esc(kd.newName)}): ремонт дороже.`
    : `${esc(rest.name)}: в среднем ещё ${yrs(rest.rul)}, а ремонт должен добавить хотя бы год. Это честное «нет».`;
  return `<div class="card verdict bad mt-12" data-testid="verdict" data-verdict="replace">
    <div class="v-head"><span class="v-ico">${ICON.recycle}</span><div><b>Продлевать невыгодно</b><span>${why}</span></div></div>
    <a class="btn primary block mt-12" href="#resident">Сдать — живые детали продлят другие вещи</a>
  </div>`;
}

function options(d, kd) {
  if (!d.options.length) return '';
  const names = (o) => d.staves.filter((s) => o.fixes.includes(s.id)).map((s) => s.fix.name).join(' + ');
  return `<h2 class="h-sec">Все варианты</h2>
  <div class="card"><div class="table-wrap"><table class="ext-table">
    <thead><tr><th>Меняем</th><th class="r">Цена</th><th class="r">+ жизни</th><th class="r">Год жизни</th></tr></thead>
    <tbody>${d.options.map((o) => `<tr${d.verdict === 'extend' && o === d.best ? ' class="best"' : ''}><td class="small">${esc(names(o))}</td><td class="r">${tenge(o.cost)}</td>
      <td class="r">${o.gain > 0.05 ? `+${num1(Math.round(o.gain * 10) / 10)}` : '0'}</td><td class="r">${Number.isFinite(o.perYear) && o.gain >= 1 - 1e-9 ? tenge(Math.round(o.perYear)) : '—'}</td></tr>`).join('')}
      <tr class="muted"><td class="small">Новая вещь: ${esc(kd.newName)}</td><td class="r">${tenge(kd.newPrice)}</td><td class="r">${num1(kd.life)}</td><td class="r">${tenge(Math.round(d.newPerYear))}</td></tr></tbody></table></div>
    <p class="xs muted mt-8">Менять стоит только самые короткие доски, по порядку: пропустишь короткую — вещь всё равно умрёт по ней. Поэтому вариантов столько, сколько досок, а не все сочетания. «—»: ремонт добавляет меньше года.</p></div>`;
}

// ── Обратный билет: продлённые и поставленные на учёт вещи ───────────────────
function ticketsBlock(st) {
  const list = st.extend?.tickets || [];
  if (!list.length) return '';
  return `<h2 class="h-sec">Мои вещи на продлении</h2>
  <div class="card"><div class="list" data-testid="tickets">${list.map((t) => `<div class="li"><div class="ico">${t.verdict === 'extend' ? ICON.heart : ICON.clock}</div>
    <div class="grow"><b>${esc(t.title)}</b>
      <div class="xs muted">Обратный билет ${t.no} · ${t.verdict === 'extend' ? `${esc(t.fixes.join(' + ').toLowerCase())} · проживёт до: ${monthYear(t.until)}` : `напомним: ${monthYear(t.remindTs)}`}</div>
      <div class="xs" style="color:var(--brand);font-weight:600">${esc(ticketStatus(t))}</div></div></div>`).join('')}</div>
    <p class="xs muted mt-8">Когда вещь всё-таки умрёт, сдать её — один тап: она уже в системе, с паспортом, и не ляжет в ящик стола.</p>
    <a class="btn plain block" href="#resident">Сдать вещь по билету</a></div>`;
}

// ── События ─────────────────────────────────────────────────────────────────
function refresh(el) {
  const box = el.querySelector('#extResult');
  if (box) box.innerHTML = result();
}
function bind(el) {
  el.oninput = (e) => {
    const t = e.target.closest('[data-field]');
    if (!t || t.tagName === 'BUTTON') return;
    const f = ui.f[ui.kind];
    f[t.dataset.field] = t.value;
    if (t.dataset.field === 'soh' && ui.kind === 'laptop' && f.src === 'chip') f.src = 'manual';
    refresh(el);
  };
  el.onclick = (e) => {
    const k = e.target.closest('[data-kind]');
    if (k) { ui.kind = k.dataset.kind; render(el, getState()); return; }
    const ex = e.target.closest('[data-ex]');
    if (ex) { const x = EXAMPLES[ex.dataset.ex]; ui.kind = x.kind; ui.f[x.kind] = { ...x.f }; render(el, getState()); return; }
    if (e.target.closest('[data-passport]')) { askDoctor(el); return; }
    const b = e.target.closest('button[data-field]');
    if (b) {
      const f = ui.f[ui.kind];
      const v = b.dataset.val;
      f[b.dataset.field] = v === 'true' ? true : v === 'false' ? false : v;
      if (b.dataset.field === 'feel') f.soh = '';
      render(el, getState());
      return;
    }
    if (e.target.closest('[data-order]')) {
      const { kind, input, d } = compute();
      const t = orderExtension({ kind, title: titleOf(kind, ui.f[kind]), input, decision: d });
      toast(t.verdict === 'extend' ? `Пересадка заказана · обратный билет ${t.no}` : `Вещь на учёте · билет ${t.no}`);
    }
  };
}

// Паспорт SAQTA Доктора: ссылка, «doctor=…» или JSON — те же форматы, что в хабе
function applyPassport(raw) {
  const r = decodePassport(raw);
  if (!r.ok) return r;
  const disks = r.disks;
  const hdd = disks.some((x) => /^(ST\d|WDC WD|WD\d|HGST|HTS|HITACHI|TOSHIBA MQ|MQ0)/i.test(x.model || '') && x.bus !== 'nvme');
  ui.kind = 'laptop';
  ui.f.laptop = {
    ...ui.f.laptop, model: passportTitle(r), soh: r.battery ? r.battery.soh1 : '', disk: hdd ? 'hdd' : 'ssd',
    diskFail: disks.some((x) => x.smart === 'fail'), src: 'doctor',
  };
  return r;
}
function askDoctor(el) {
  sheet('Паспорт SAQTA Доктора', (body, close) => {
    body.innerHTML = `<p class="small">Запусти на ноутбуке одну команду — Доктор прочитает чип батареи и диск и даст ссылку. Вставь её сюда.</p>
      <div class="code">Mac и Linux:  sh saqta-doctor.sh\nWindows:  powershell -ExecutionPolicy Bypass -File saqta-doctor.ps1</div>
      <textarea class="input mt-12" id="extPs" rows="4" placeholder="Ссылка #hub/doctor=… или паспорт"></textarea>
      <p class="xs" id="extPsErr" style="color:var(--tag-danger)"></p>
      <button class="btn primary block mt-8" id="extPsGo">Прочитать паспорт</button>`;
    body.querySelector('#extPsGo').onclick = () => {
      const r = applyPassport(body.querySelector('#extPs').value);
      if (!r.ok) { body.querySelector('#extPsErr').textContent = r.error; return; }
      close();
      render(el, getState());
      toast(`SAQTA Доктор: ${passportTitle(r)}${r.battery ? ` · батарея ${num1(r.battery.soh1)}%` : ''}`);
    };
  });
}
