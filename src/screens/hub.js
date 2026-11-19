// Экран «Хаб»: очередь с бирками, план проверки, расчёт EV и ценности проверки, «Спроси устройство» (SAQTA Доктор),
// ТЕСТ-30, банк деталей с QR-паспортом, сортировка по дереву разборки и сортировочная стена с партиями.
import { EXAMPLES, TAGS, TEST30, PARTS, ECON, EV, APP_NAME, BATTERY_PS, BONUS, RAW, CHECK, CHECK_PLAN, PART_CHECKS, SORT_BINS, SORT_FLAG } from '../data.js';
import { getState, selectHubItem, triage, askDevice, runCells, sellPart, hasOrderFor, addWorkshopOrder, cancelWorkshopOrder, importPassport, sortPlanOf, sortItem, sortAll, shipLot, setSortFlag, canSort } from '../store.js';
import { expectedValue, decision, evExplain, pSell } from '../lib/ev.js';
import { parseBatteryReport, stateOfHealth } from '../lib/battery-report.js';
import { checkValue, checkValueExplain, packChipValue, partVK } from '../lib/voi.js';
import { decodePassport } from '../lib/doctor.js';
import { ART } from '../lib/art.js';
import { ICON } from '../lib/icons.js';
import { qrSvg } from '../lib/qr.js';
import { num, esc, tenge, signed, DAY, dateTime } from '../lib/format.js';
import { tagChip, simMark, realMark, sheet, toast } from '../lib/ui.js';
import { makeChart, destroyCharts, cssVar } from '../lib/charts.js';
import { HUB, BOXES, pointById } from '../geo/points.js';
import { tour, fmtKm, fmtMin } from '../lib/map/route.js';
import { mountMap, setPins, setLine, fitTo } from '../lib/map/view.js';

const dash = '<span class="faint">—</span>';
let trip = null; // последний построенный маршрут Газели: { sig, stops, res }
let ui = { pick: null, running: false, lastRun: null };
export function home() { ui = { pick: null, running: false, lastRun: ui.lastRun }; }

// Ссылка из SAQTA Доктора: #hub/doctor=<паспорт> → новая карточка в очереди (check/doctor)
export function open(param) {
  if (!String(param).startsWith('doctor=')) return;
  const ps = decodePassport(param);
  try { history.replaceState(null, '', `${location.pathname}${location.search}#hub`); } catch { /* file:// без истории — не страшно */ }
  if (!ps.ok) { setTimeout(() => toast(ps.error), 0); return; }
  const item = importPassport(ps);
  setTimeout(() => toast(`SAQTA Доктор: ${item.model}${ps.battery ? ` · здоровье батареи ${ps.battery.soh}%` : ''}`), 0);
}

const artOf = (item) => {
  const ex = EXAMPLES.find((e) => e.id === item.exampleId);
  if (ex) return ex.art;
  return { phone: 'phone', laptop: 'laptop', small: 'kettle', screen: 'device', cable: 'device' }[item.type] || 'device';
};

export function render(el, st) {
  destroyCharts();
  const q = st.hub.queue;
  const sel = q.find((x) => x.id === st.hub.selected) || q.find((x) => x.status === 'new') || q[0];
  if (ui.pick && ui.pick.itemId !== sel?.id) ui.pick = null;

  el.innerHTML = `
  <div class="screen-head"><h1>Хаб</h1><p>Приёмка, триаж за ${ECON.triageSec} секунд, детали только под заказ, сортировка по дереву разборки</p></div>
  <div class="kpis">
    ${kpi(tenge(ECON.deviceProcessing), 'обработка одного устройства', tenge(ECON.checkNow))}
    ${kpi(`≈ ${tenge(ECON.cellTenge)}`, `проверка ячейки, ${TEST30.seconds} с`, `${tenge(ECON.cellNowTenge)}, ${ECON.cellNowMin} мин`)}
    ${kpi(`${fmtDec(CHECK.chipMachineSec)} с`, 'чип батареи прочитан (замер)', `${ECON.cellNowMin} мин на ячейку`)}
    ${kpi(`≈ ${ECON.laptopMin} мин`, 'разборка ноутбука, 3 детали под заказ', `${ECON.laptopNowMin} мин`)}
  </div>
  <div class="dash mt-16">
    <section class="card span-4" aria-label="Очередь">
      <div class="card-title"><h2>Очередь</h2><span class="xs muted">${q.filter((x) => x.status === 'new').length} ждут триажа</span></div>
      <div class="legend" style="margin-bottom:10px">${Object.keys(TAGS).map((t) => `${tagChip(t)}`).join('')}</div>
      <div class="queue">${q.map((it) => queueItem(it, sel)).join('')}</div>
    </section>
    <section class="card span-8" aria-label="Устройство">${sel ? detail(sel) : '<div class="empty">Очередь пуста</div>'}</section>
    <section class="card span-12" id="test30" aria-label="ТЕСТ-30">${test30Card(sel)}</section>
    <section class="card span-12" aria-label="Заявки мастерских">${ordersCard(st)}</section>
    <section class="card span-12" aria-label="Банк деталей">${bankCard(st)}</section>
    <section class="card span-12" id="wall" aria-label="Сортировочная стена">${wallCard(st)}</section>
    <section class="card span-12" aria-label="Маршрут сбора">${routeCard(st)}</section>
  </div>`;

  drawTestChart(el);
  attachRouteMap(el);
  bind(el, sel);
}

const kpi = (v, l, was) => `<div class="kpi"><div class="v">${v}</div><div class="l">${l}</div>${was ? `<div class="was">Было: ${was}</div>` : ''}</div>`;

// ── Этап 3: сортировочная стена ─────────────────────────────────────────────
// Свет над ящиком показывает, куда положить часть: решает дерево разборки. Ящик копит партию для своего покупателя.
const binDef = (id) => SORT_BINS.find((b) => b.id === id);
const binName = (id) => binDef(id)?.label || id;
const kgs = (v) => String(Math.round((v || 0) * 1000) / 1000).replace('.', ',');
const mins = (v) => (v > 0 && v < 1 ? `${Math.round(v * 60)} с` : `${String(Math.round(v * 100) / 100).replace('.', ',')} мин`);
const tg = (v) => `${v < 0 ? '−' : ''}${num(Math.round(Math.abs(v)))} ₸`;

function wallCard(st) {
  const bins = st.sort.bins;
  const last = st.sort.last;
  const waiting = st.hub.queue.filter(canSort).length;
  return `<div class="card-title"><h2>Сортировочная стена</h2><button class="btn ${waiting ? 'primary' : 'ghost'} sm" data-sort-all ${waiting ? '' : 'disabled'}>${ICON.check} Рассортировать всё${waiting ? ` (${waiting})` : ''}</button></div>
  <p class="small muted">Над каждым ящиком — лампа. Техник сканирует QR вещи, и загораются ящики, куда класть её части: решает дерево разборки, а не опыт. Батарея попадает только в шкаф с песком — в лом и в партии скупщиков её не положить. Ящик копит партию для своего покупателя.</p>
  ${last ? `<p class="small mt-8" data-testid="wall-last"><b>${last.many ? `Рассортировано вещей: ${last.many}` : `${esc(last.deviceNo)} рассортировано`}</b> — горят ящики: ${last.bins.map((b, i) => `${i + 1}. ${esc(binName(b))}`).join(' · ')}</p>` : ''}
  <div class="wall mt-12" data-testid="wall">${SORT_BINS.map((b) => binTile(b, bins[b.id], last)).join('')}</div>
  <div class="dash mt-16">
    <div class="span-7">${priceBoard(st)}</div>
    <div class="span-5">${lotsList(st.sort.lots)}</div>
  </div>`;
}

function binTile(def, b, last) {
  const kg = b?.kg || 0;
  const i = last ? last.bins.indexOf(def.id) : -1;
  const pct = def.lotKg ? Math.min(100, (kg / def.lotKg) * 100) : 0;
  const price = def.byType ? 'цена по виду техники' : def.price ? `${num(def.price)} ₸/кг` : 'без оплаты';
  return `<div class="bin ${i >= 0 ? 'lit' : ''} ${def.hazard ? 'hz' : ''}" data-bin="${def.id}">
    <i class="lamp" aria-hidden="true"></i>${i >= 0 ? `<span class="bin-n">${i + 1}</span>` : ''}
    <b class="small">${esc(def.label)}</b>
    <span class="xs muted">${price} · ${esc(def.buyer)}</span>
    <span class="small num"><b>${kgs(kg)} кг</b> · ≈ ${num(Math.round(b?.value || 0))} ₸${b?.liion ? ` · Li-ion: ${b.liion}` : ''}</span>
    <div class="progress" style="height:5px" title="партия ${num(def.lotKg)} кг"><i style="width:${pct}%"></i></div>
    <button class="btn sm ${kg ? 'ghost' : 'plain'}" data-lot="${def.id}" ${kg ? '' : 'disabled'}>Отгрузить партию</button>
  </div>`;
}

function priceBoard(st) {
  const flagOn = !!st.sort.flag;
  return `<b class="small">Табло цен скупщиков</b>
  <p class="xs muted">Медианы прайсов скупщиков Казахстана на OLX за 4–19.11.2026, металл — Актобе и Уральск. Цена меняется — дерево разборки само пересчитывает, что вынимать.</p>
  <div class="table-wrap mt-8"><table data-testid="price-board">
    <thead><tr><th>Ящик</th><th class="r">₸ за кг</th><th>Покупатель</th></tr></thead>
    <tbody>${SORT_BINS.filter((b) => !b.byType).map((b) => `<tr><td class="small">${esc(b.label)}</td><td class="r">${b.id === SORT_FLAG.bin && flagOn ? `<b>${num(SORT_FLAG.price)}</b>` : num(b.price)}</td><td class="xs muted">${esc(b.buyer)}</td></tr>`).join('')}
      <tr><td class="small">Целиком переработчику</td><td class="r small">${RAW.filter((r) => !r.hazard).map((r) => num(r.perKg)).join(' / ')}</td><td class="xs muted">телефоны / ноутбуки / экраны / мелкая / кабели — модель команды</td></tr>
    </tbody></table></div>
  <label class="check mt-12"><input type="checkbox" data-flag ${flagOn ? 'checked' : ''}><span class="small">Плата ноутбука «с чипом с жёлтым флажком» — ${num(SORT_FLAG.price)} ₸/кг вместо ${num(binDef(SORT_FLAG.bin).price)} (лучший прайс: Астана, 18.11). Техник видит чип — дерево пересчитывает, вынимать ли плату.</span></label>`;
}

function lotsList(lots) {
  return `<b class="small">Партии с паспортом</b>
  ${lots.length ? `<div class="stack mt-8" data-testid="lots">${lots.slice(0, 3).map(lotPassport).join('')}</div>`
    : '<p class="xs muted mt-8">Партий пока нет. «Отгрузить партию» у ящика — и партия уходит покупателю с паспортом: вес, устройства, батареи, категории РОП для выплаты по EcoQolday.</p>'}`;
}

function lotPassport(l) {
  const bat = l.bin === 'whole' ? (l.liion ? `Li-ion внутри устройств: ${l.liion} — упаковка UN3481` : 'Батарей внутри нет')
    : l.bin === 'batt' ? 'Li-ion: металлический ящик с песком, перевозка по UN3480' : 'Батарей нет: свет над ящиком не загорается, пока батарея не в шкафу';
  return `<div class="passport">
    <div class="qr-sm">${qrSvg(`${APP_NAME}:lot:${l.no}`, { label: `QR партии ${l.no}` })}</div>
    <div class="lines">
      <span class="xs muted">${APP_NAME} · партия № ${l.no} · ${dateTime(l.ts)}</span>
      <b>${esc(l.label)} · ${kgs(l.kg)} кг · ≈ ${num(l.value)} ₸</b>
      <span>Покупатель: ${esc(l.buyer)}</span>
      <span>Устройств: ${l.devices.length} (${l.devices.slice(0, 4).map(esc).join(', ')}${l.devices.length > 4 ? '…' : ''})</span>
      <span>${bat}</span>
      ${Object.entries(l.rop || {}).map(([c, kg]) => `<span class="xs muted">РОП: ${esc(c.split(':')[0])} — ${kgs(kg)} кг</span>`).join('')}
    </div></div>`;
}

// ── Сортировка в карточке устройства: дерево разборки для этой вещи ─────────
function sortRow(r) {
  const icon = r.done2 ? '✓' : r.must ? '!' : r.do ? '✓' : '✗';
  const [txt, cls] = r.done2 ? ['этап 2', 'on'] : r.must ? ['всегда', 'on'] : r.do ? ['делаем', 'on'] : ['не делаем', 'off'];
  let how;
  if (r.kind === 'open') {
    how = r.do ? `${mins(r.min)} · вскрытие даёт ${signed(Math.round(r.gain))} ₸`
      : `${mins(r.min)} · не окупается: ${signed(Math.round(r.gain))} ₸${r.threshold ? ` — окупится, если «${esc(binName(r.threshold.bin))}» дороже ${num(r.threshold.price)} ₸/кг` : ''}`;
  } else if (r.kind === 'take') {
    how = r.must ? `${mins(r.min)} · → «${esc(binName(r.to))}»${r.to === 'batt' ? ' — безопасность, вне экономики' : ''}`
      : r.do ? `${mins(r.min)} · → «${esc(binName(r.to))}» · ${signed(Math.round(r.gain))} ₸ к продаже внутри корпуса` : `${mins(r.min)} · не окупается (${signed(Math.round(r.gain))} ₸) — остаётся внутри`;
  } else {
    how = `→ «${esc(binName(r.to))}» · ${kgs(r.kg)} кг · ${tg(r.value)}`;
  }
  return `<div class="plan-row" style="margin-left:${Math.min(r.depth, 3) * 14}px"><span class="lv">${icon}</span><div class="grow"><b class="small">${esc(r.label)}</b><div class="xs muted">${how}</div></div><span class="pst ${cls}">${txt}</span></div>`;
}

function sortBlock(it) {
  const tag = it.tag || ui.pick?.tag || it.suggestedTag;
  if (tag === 'whole') {
    return `<div class="section-label mt-16">Сортировка</div><p class="small muted" data-testid="sort-plan">«Целое» не сортируем: вещь идёт на вторую жизнь — чистим и продаём или отдаём семье через акимат.</p>`;
  }
  const plan = sortPlanOf({ ...it, tag });
  if (!plan) return '';
  const kpi3 = (v, l, sub, best) => `<div class="kpi ${best ? 'best' : ''}"><div class="v num">${tg(v)}</div><div class="l">${l}</div><div class="was">${sub}</div></div>`;
  const s = it.sorted;
  const btn = s ? `<p class="small mt-12" data-testid="sorted"><b style="color:var(--tag-whole)">${ICON.check} Рассортировано</b> <span class="muted">· ${tg(s.value)} · ящики: ${s.bins.map((b) => esc(binName(b))).join(', ')}</span></p>`
    : it.status !== 'triaged' ? '<p class="xs muted mt-8">Сортировка — после подтверждения бирки.</p>'
    : `<button class="btn primary mt-12" data-sort="${it.id}">${ICON.check} Рассортировать: свет над ${new Set(plan.frags.map((f) => f.bin)).size} ящ.</button>`;
  return `
  <div class="section-label mt-16">Сортировка — разбираем, пока окупается</div>
  <div class="formula">V(узел) = max(m × цена ящика, Σ V(частей) − t × ${EV.tengePerMinute})</div>
  <p class="xs muted mt-8">Дерево разборки считается снизу вверх: каждую часть сравниваем «продать целиком» и «вскрыть». Цены — с табло скупщиков ниже. Что сняли на этапе 2, второй раз не считаем.${plan.soldered ? ' Паспорт Доктора: у MacBook память и SSD распаяны — снимать их нечего.' : ''}</p>
  <div class="kpis mt-8" style="grid-template-columns:repeat(3,1fr)" data-testid="sort-kpis">${kpi3(plan.asIs, 'продать целиком', '0 мин')}${kpi3(plan.full, 'разобрать всё', mins(plan.fullMin))}${kpi3(plan.value, 'по дереву', mins(plan.minutes), true)}</div>
  <div class="plan mt-8" data-testid="sort-plan">${plan.rows.map(sortRow).join('') || '<p class="xs muted">Вскрывать нечего: вещь целиком идёт в ящик.</p>'}</div>
  <div class="row wrap mt-8" style="gap:6px" data-testid="sort-frags">${plan.frags.map((f) => `<span class="chip-bin ${f.bin === 'batt' ? 'hz' : ''}">${esc(binName(f.bin))} · ${kgs(f.kg)} кг${f.battery && f.bin !== 'batt' ? ' · Li-ion внутри' : ''}</span>`).join('')}</div>
  ${btn}`;
}

function queueItem(it, sel) {
  return `<button class="qi" data-select="${it.id}" aria-current="${it.id === sel?.id}">
    ${ART[artOf(it)](it.model)}
    <span class="grow"><b class="small">${esc(it.model)}</b><br><span class="xs muted">${it.deviceNo}${it.demo ? '' : ' · от жителя'}</span></span>
    ${it.status === 'new' ? `<span class="stack" style="gap:2px;justify-items:end">${!it.demo ? '<span class="new">новое</span>' : ''}${tagChip(null)}</span>` : tagChip(it.tag)}
  </button>`;
}

// ── Карточка устройства ─────────────────────────────────────────────────────
function detail(it) {
  const ex = EXAMPLES.find((e) => e.id === it.exampleId);
  const chosen = ui.pick?.tag || it.suggestedTag;
  return `
  <div class="row" style="align-items:flex-start;gap:14px">
    <div style="width:84px;flex:none">${ART[artOf(it)](it.model)}</div>
    <div class="grow">
      <div class="row wrap" style="gap:8px">${tagChip(it.tag)}${it.demo ? '' : '<span class="note-demo note-real">от жителя</span>'}</div>
      <h2 class="mt-8">${esc(it.model)}</h2>
      <div class="small muted">${it.deviceNo} · ${esc(it.state || '')} · принято ${dateTime(it.ts)}</div>
    </div>
  </div>

  ${it.status === 'new' ? `
  <div class="section-label mt-16">Триаж</div>
  <p class="small muted">Бирку предлагает распознавание по фото и модели, техник подтверждает.</p>
  <div class="row wrap mt-8" role="group" aria-label="Бирка">
    ${Object.keys(TAGS).map((t) => `<button class="btn sm ${chosen === t ? 'primary' : 'ghost'}" data-tag="${t}" aria-pressed="${chosen === t}">${TAGS[t].label}${t === it.suggestedTag ? ' · предложено' : ''}</button>`).join('')}
  </div>
  <p class="small mt-8"><b>${TAGS[chosen].label}:</b> <span class="muted">${TAGS[chosen].hint}</span></p>
  <button class="btn primary mt-12" data-confirm="${it.id}">${ICON.check} Подтвердить бирку</button>
  ${it.donationId ? `<p class="xs muted mt-8">После подтверждения житель получит бонусы в кошелёк.</p>` : ''}`
  : `<p class="small mt-12"><b>${TAGS[it.tag].label}:</b> <span class="muted">${TAGS[it.tag].hint}</span></p>`}

  ${planBlock(it)}
  ${it.type === 'laptop' ? askBlock(it) : ''}
  ${ex?.parts?.length ? evTable(ex, it) : ''}
  ${sortBlock(it)}`;
}

// ── План проверки: лестница для любой вещи (README, «Матрица проверки») ─────
const fmtDec = (v) => String(v).replace('.', ',');
const isOff = (it) => /не включ|не заряж|не работает/i.test(it.state || '');
const isDanger = (it) => it.suggestedTag === 'danger' || it.tag === 'danger' || /взду/i.test(it.state || '');

function stepStatus(s, it) {
  if (s.kind === 'safety' || s.kind === 'data') return ['всегда', 'on'];
  if (s.kind === 'partner') return ['партнёр', 'muted'];
  if (s.kind === 'ask') return s.name === 'SAQTA Доктор' && it.soh ? ['готово', 'on'] : ['спросить устройство', 'ask'];
  if (/ТЕСТ-30/.test(s.name)) {
    const v = it.soh?.value;
    if (v == null) return ['после чипа', 'muted'];
    return v >= TEST30.sohCutoff && !it.soh.pf ? ['делаем', 'on'] : ['не вскрываем', 'off'];
  }
  if (/Lii-500/.test(s.name)) return ['только спорные', 'ask'];
  if (/Без проверки/.test(s.name)) return ['пропускаем: ЦП = 0', 'off'];
  if (/Розетка/.test(s.name)) return it.suggestedTag === 'raw' || it.tag === 'raw' ? ['пропускаем: нет спроса', 'off'] : ['по ценности', 'ask'];
  return ['по ценности', 'ask'];
}

function planBlock(it) {
  const off = isOff(it);
  const danger = isDanger(it);
  let steps = (CHECK_PLAN[it.type] || []).filter((s) => !s.when || s.when === (off ? 'off' : 'on'));
  if (danger) steps = steps.filter((s) => s.kind === 'safety');
  const row = (lv, name, how, [txt, cls]) => `<div class="plan-row"><span class="lv">${lv}</span><div class="grow"><b class="small">${esc(name)}</b><div class="xs muted">${esc(how)}</div></div><span class="pst ${cls}">${esc(txt)}</span></div>`;
  return `
  <div class="section-label mt-16">План проверки</div>
  <p class="xs muted">Каждая проверка — вопрос. Сначала спрашиваем само устройство, человека — только если ответ окупится. Безопасность и данные — всегда.</p>
  <div class="plan mt-8" data-testid="plan">
    ${steps.map((s) => row(s.level, s.name, s.how, stepStatus(s, it))).join('')}
    ${danger ? row('!', 'Дальше не проверяем', 'вздутая батарея может загореться: металлический шкаф с песком, потом лицензированному переработчику', ['стоп', 'off']) : ''}
  </div>`;
}

// Ценность проверки детали до снятия и что из неё следует
function partCheck(p, it) {
  const v = checkValue(p);
  if (v == null) return { v: null, text: '' };
  const pc = PART_CHECKS.find((c) => c.match.test(p.name));
  if (pc?.chip) {
    const vk = partVK(p);
    const pk = packChipValue({ pCells: vk.P, V: vk.V, K: vk.K });
    return { v: pk.value, chip: pk, text: `чип перед вскрытием: ${num(pk.chipCost)} ₸ < ${num(pk.value)} ₸ → читаем всегда` };
  }
  if (v === 0) return { v, text: 'проверка ничего не изменит' };
  if (!pc) return { v, text: 'проверяем снятую' };
  const cost = Math.round(pc.min * EV.tengePerMinute);
  if (pc.needsOn && isOff(it)) return { v, text: 'до снятия не проверить: не включается — проверяем снятую' };
  if (v > cost) return { v, text: `окупается: ${pc.name}, ${num(cost)} ₸` };
  return { v, doctor: !!pc.doctor, text: pc.doctor ? `отдельно ${num(v)} < ${num(cost)} ₸ — входит в SAQTA Доктор` : `дороже пользы (${num(cost)} ₸) — проверяем снятую` };
}

function evTable(ex, it) {
  const parts = ex.parts.map((p) => ({ ...p, hasOrder: hasOrderFor(p, ex.model, it.deviceNo) }));
  return `
  <div class="section-label mt-16">Ожидаемая ценность деталей (EV)</div>
  <div class="formula">EV = P(работает) × цена × P(купят за ${EV.sellDays} дней) − t<sub>мин</sub> × ${EV.tengePerMinute}</div>
  <p class="xs muted mt-8">P(купят) = ${String(EV.pSellWithOrder).replace('.', ',')}, если на деталь есть заявка мастерской, и ${String(EV.pSellNoOrder).replace('.', ',')}, если нет. Деталь снимаем, только если EV больше нуля.</p>
  <div class="formula mt-8">ЦП = min((1 − P) × K, P × (V − K)),  V = цена × P(купят),  K = t<sub>мин</sub> × ${EV.tengePerMinute}</div>
  <p class="xs muted mt-8">ЦП — ценность проверки до снятия. Проверка спасает от двух ошибок: снять нерабочую деталь или оставить рабочую. Мы и так выбираем меньшую, поэтому проверка окупается, только если ЦП больше её цены.</p>
  <div class="table-wrap mt-8"><table>
    <thead><tr><th>Деталь</th><th class="r">P(работает)</th><th class="r">Цена</th><th>Заявка</th><th class="r">P(купят)</th><th class="r">t, мин</th><th class="r">EV</th><th>Решение</th><th class="r">ЦП</th></tr></thead>
    <tbody>${parts.map((p) => {
      const ev = expectedValue(p);
      const dcs = decision(ev);
      const ps = pSell(p);
      const pcv = partCheck(p, it);
      return `<tr>
        <td><b>${esc(p.name)}</b>${ev == null ? '' : `<div class="xs muted nowrap">${esc(evExplain(p, num))}</div>`}</td>
        <td class="r">${p.pWorks == null ? dash : String(p.pWorks).replace('.', ',')}</td>
        <td class="r">${p.price == null ? dash : tenge(p.price)}</td>
        <td>${p.hasOrder == null ? dash : p.hasOrder ? 'есть' : 'нет'}</td>
        <td class="r">${ps == null ? dash : String(ps).replace('.', ',')}</td>
        <td class="r">${p.minutes == null ? dash : p.minutes}</td>
        <td class="r"><b>${ev == null ? dash : `${ev > 0 ? '+' : '−'}${num(Math.abs(ev))} ₸`}</b></td>
        <td>${dcs.take == null ? (p.hasOrder ? '<b style="color:var(--tag-whole)">под заявку</b>' : '<span class="muted">ждём заявку</span>') : dcs.take ? '<b style="color:var(--tag-whole)">снимаем</b>' : '<span class="muted">оставляем</span>'}</td>
        <td class="r" data-testid="cp"><b>${pcv.v == null ? dash : `${num(pcv.v)} ₸`}</b>${pcv.text ? `<div class="xs muted" style="white-space:normal;min-width:150px">${esc(pcv.text)}</div>` : ''}</td>
      </tr>`;
    }).join('')}</tbody></table></div>
    ${doctorLine(parts, it)}`;
}

// Ноутбук: SAQTA Доктор отвечает сразу за память, SSD и батарею — ценность проверки складывается
function doctorLine(parts, it) {
  if (it.type !== 'laptop') return '';
  const items = parts.map((p) => ({ p, c: partCheck(p, it) })).filter(({ p, c }) => c.v != null && PART_CHECKS.find((x) => x.match.test(p.name) && (x.doctor || x.chip)));
  if (!items.length) return '';
  const sum = items.reduce((a, { c }) => a + c.v, 0);
  const cost = Math.round(CHECK.doctorMin * EV.tengePerMinute);
  const chip = items.find(({ c }) => c.chip)?.c.chip;
  return `<p class="small mt-8" data-testid="doctor-line"><b>SAQTA Доктор</b> отвечает сразу за ${items.map(({ p }) => esc(p.name.toLowerCase())).join(', ')}: ЦП вместе ${num(sum)} ₸ ${sum > cost ? '>' : '≤'} ${num(cost)} ₸ за минуту — ${sum > cost ? '<b style="color:var(--tag-whole)">запускаем</b>' : 'не запускаем'}.${chip ? ` Пакет батареи вслепую даёт ${num(chip.blind)} ₸, с чипом — ${num(chip.withChip)} ₸.` : ''}</p>`;
}

function askBlock(it) {
  const s = it.soh;
  const ps = s?.passport || null;
  const b = ps?.battery || null;
  const hasBat = !!s && s.value != null;
  const ok = hasBat && s.value >= TEST30.sohCutoff && !s.pf;
  const verdict = !s ? '' : !hasBat ? ['Батареи нет — диск и память по паспорту', 'var(--muted)']
    : s.pf ? ['Аварийный флаг чипа — пакет не вскрываем, целиком на переработку', 'var(--tag-danger)']
    : ok ? ['Пакет годен — ячейки на стенд ТЕСТ-30', 'var(--tag-whole)'] : [`Ниже ${TEST30.sohCutoff}% — батарея целиком на переработку`, 'var(--tag-danger)'];
  const src = s?.source === 'doctor' ? realMark(`прочитано SAQTA Доктором${ps?.ms != null ? ` за ${num(ps.ms)} мс` : ''}`)
    : s?.source === 'report' ? realMark('прочитано из отчёта Windows') : '<span class="note-demo note-real">введено из PowerShell</span>';
  return `
  <div class="section-label mt-16">«Спроси устройство» — SAQTA Доктор</div>
  <div class="card flat tight" data-testid="ask">
    <p class="small">Ноутбук сам знает здоровье батареи и диска: газомер батареи считает каждый кулон (Q = ∫ I dt), SSD ведёт SMART. Читаем за секунды и ничего не разбираем. Замер на ноутбуке команды: чип — за ${fmtDec(CHECK.chipMachineSec)} с.</p>
    ${s ? `<div class="row wrap mt-12" style="gap:16px;align-items:flex-start">
        <div><div class="counter" style="font-size:40px" data-testid="soh">${hasBat ? `${s.value}%` : '—'}</div><div class="xs muted">${hasBat ? 'здоровье батареи (SoH)' : 'батареи нет'}</div></div>
        <div class="grow small">
          ${hasBat ? `<div>${num(s.full)} из ${num(s.design)} ${s.unit || 'мВт·ч'}${s.cycles != null ? ` · ${num(s.cycles)} циклов` : ''}${b?.chip ? ` · чип ${esc(b.chip)}` : ''}</div>` : ''}
          ${b?.cellsMv?.length ? `<div class="xs muted">Группы ячеек: ${b.cellsMv.map((v) => fmtDec((v / 1000).toFixed(3))).join(' / ')} В, разброс ${num(b.spreadMv)} мВ${b.groupSoh?.length ? ` · химическая ёмкость групп (Qmax): ${b.groupSoh.join(' / ')}%` : ''}</div>` : ''}
          ${b?.tMaxC != null ? `<div class="xs muted">За всю жизнь: от ${b.tMinC} до ${b.tMaxC} °C</div>` : ''}
          ${ps?.disks?.length ? `<div class="xs muted">${ps.disks.map((d) => `${esc(d.model || 'диск')}${d.gb ? ` · ${num(d.gb)} ГБ` : ''} · SMART: ${d.smart === 'ok' ? 'в норме' : d.smart === 'fail' ? '<b style="color:var(--tag-danger)">сбой</b>' : 'нет данных'}${d.wearPct != null ? ` · износ ${d.wearPct}%` : ''}${d.hours != null ? ` · ${num(d.hours)} ч` : ''}`).join('<br>')}</div>` : ''}
          ${ps?.device ? `<div class="xs muted">${[ps.device.cpu, ps.device.ramGB ? `${ps.device.ramGB} ГБ памяти` : null, ps.device.os].filter(Boolean).map(esc).join(' · ')}${ps.device.lock === 'enabled' ? ' · <b style="color:var(--tag-danger)">блокировка активации: целым не продаём</b>' : ps.device.lock === 'disabled' ? ' · блокировки активации нет' : ''}</div>` : ''}
          <div class="mt-8"><b style="color:${verdict[1]}">${verdict[0]}</b></div>
          <div class="mt-8 wrap-note">${src}</div>
        </div></div>` : ''}
    <div class="row wrap mt-12">
      <button class="btn ${s ? 'ghost' : 'primary'}" data-ask="${it.id}">${ICON.battery} Спроси устройство</button>
      ${ok ? `<button class="btn primary" data-run="${it.id}">${ICON.bolt} Ячейки на ТЕСТ-30</button>` : ''}
    </div>
  </div>`;
}

// ── ТЕСТ-30 ─────────────────────────────────────────────────────────────────
const gClass = (g) => (g === '?' ? 'Q' : g);
function test30Card(sel) {
  const r = ui.lastRun;
  const cells = Array.from({ length: TEST30.cells }, (_, i) => r?.results[i]);
  const eligible = sel?.type === 'laptop' && sel?.soh?.value >= TEST30.sohCutoff && !sel?.soh?.pf;
  return `
  <div class="card-title"><div class="row wrap" style="gap:8px"><h2>ТЕСТ-30</h2>${simMark('симуляция по физической модели ячейки')}</div>
    <button class="btn primary sm" data-run="${eligible ? sel.id : ''}" ${ui.running ? 'disabled' : ''}>${ICON.bolt} ${ui.running ? 'Идёт тест…' : r ? 'Запустить снова' : 'Запустить'}</button></div>
  <p class="small muted">${TEST30.cells} ячеек за ${TEST30.seconds} секунд: ${CHECK.pulse.restSec} с покоя → импульс ${CHECK.pulse.loadSec} с через резистор ${TEST30.loadOhm} Ом → восстановление. R = (U<sub>покоя</sub> − U<sub>через ${CHECK.pulse.readAtSec} с</sub>) / I. Импульс меряет сопротивление, напряжение и нагрев — <b>не ёмкость</b>: её ячейка наследует от чипа своего пакета. Если сопротивление выше медианы соседей по пакету больше чем в ${fmtDec(CHECK.outlierRatio)} раза или чипа нет, ячейка «спорная» и идёт на полный цикл Lii-500. Пакеты ниже ${TEST30.sohCutoff}% не вскрываем.</p>
  <div class="dash mt-12">
    <div class="span-5">
      <div class="cells" data-testid="cells">${cells.map((c, i) => `<div class="cell ${c ? '' : 'idle'} ${ui.running ? 'running' : ''}" ${c ? `title="${esc(`${c.packLabel}: ${c.sohSrc}${c.reason ? `, ${c.reason}` : ''}`)}"` : ''}>
        <span class="xs faint">№${i + 1}</span><span class="grade ${c ? gClass(c.grade) : ''}">${c ? c.grade : '·'}</span>
        <span class="xs num">${c ? `${c.rMilliOhm} мОм` : '—'}</span><span class="xs num muted">${c ? (c.soh != null ? `${c.soh}%` : c.grade === '?' ? 'Lii-500' : '—') : ''}</span></div>`).join('')}</div>
      <div class="table-wrap mt-12"><table>
        <thead><tr><th>Грейд</th><th>Условие</th><th>Куда идёт</th><th class="r">Ячеек</th></tr></thead>
        <tbody>
          <tr><td><span class="grade A">A</span></td><td class="small">здоровье ≥ ${TEST30.gradeA.soh}%, R ≤ ${TEST30.gradeA.rMilliOhm} мОм</td><td class="small">${TEST30.use.A}</td><td class="r">${r ? r.count.A : '—'}</td></tr>
          <tr><td><span class="grade B">B</span></td><td class="small">здоровье ${TEST30.gradeB.soh}–${TEST30.gradeA.soh}%, R ≤ ${TEST30.gradeB.rMilliOhm} мОм</td><td class="small">${TEST30.use.B}</td><td class="r">${r ? r.count.B : '—'}</td></tr>
          <tr><td><span class="grade C">C</span></td><td class="small">хуже, U < ${fmtDec(TEST30.gradeC.minVolt)} В или нагрев > ${TEST30.gradeC.maxHeatC} °C</td><td class="small">${TEST30.use.C}</td><td class="r">${r ? r.count.C : '—'}</td></tr>
          <tr><td><span class="grade Q">?</span></td><td class="small">ёмкость неизвестна: чипа нет или выбивается из соседей</td><td class="small">полный цикл Lii-500 (≈ ${CHECK.liiCycleH} ч), потом A, B или C</td><td class="r" data-testid="disputed">${r ? r.count['?'] : '—'}</td></tr>
        </tbody></table></div>
      ${r ? `<div class="table-wrap mt-12"><table>
        <thead><tr><th>Пакет</th><th class="r">Чип: здоровье</th><th class="r">Медиана R</th><th class="r">Ячеек</th></tr></thead>
        <tbody>${r.packs.map((p) => `<tr><td class="small">${esc(p.label)}</td><td class="r">${p.soh != null ? `${Math.round(p.soh)}%` : '<span class="muted">чипа нет</span>'}</td><td class="r">${p.medianR != null ? `${p.medianR} мОм` : dash}</td><td class="r">${p.n}</td></tr>`).join('')}</tbody></table></div>` : ''}
    </div>
    <div class="span-7">
      <div class="row between"><b class="small">Кривые напряжения, В</b><div class="legend"><span><i style="background:var(--grade-a)"></i>A</span><span><i style="background:var(--grade-b)"></i>B</span><span><i style="background:var(--grade-c)"></i>C</span><span><i style="background:var(--faint)"></i>?</span></div></div>
      <div class="chart-box mt-8">${r ? '<canvas id="t30chart" aria-label="Кривые напряжения 16 ячеек"></canvas>' : `<div class="empty" style="height:100%;display:grid;place-items:center">Нажмите «Запустить»: стенд даст импульс нагрузки и построит кривые</div>`}</div>
      ${r ? `<p class="xs muted mt-8">Ток импульса ≈ ${fmtDec(r.results[0].current)} А. Стенд подключён двумя проводами: провода и контакты слотов дают ${r.slotFix.min}–${r.slotFix.max} мОм — эти поправки измерены утром эталонной ячейкой и вычтены. R ближе ${CHECK.nearMOhm} мОм к порогу — ячейку переставили и измерили ещё раз. Время — ${TEST30.seconds} с на все ${TEST30.cells} ячеек (вручную — ${ECON.cellNowMin} минут на одну). A и B ещё ${CHECK.selfDischargeDays} дней лежат на полке: просадка больше ${fmtDec(CHECK.selfDischargeMaxV)} В — брак.</p>` : ''}
    </div>
  </div>`;
}

function drawTestChart(el) {
  const r = ui.lastRun;
  const cv = el.querySelector('#t30chart');
  if (!r || !cv) return;
  const col = { A: cssVar('--grade-a'), B: cssVar('--grade-b'), C: cssVar('--grade-c'), '?': cssVar('--faint') };
  makeChart(cv, {
    type: 'line',
    data: {
      datasets: r.results.map((c) => ({
        label: `№${c.id} · ${c.grade} · ${c.rMilliOhm} мОм`,
        data: c.points.map((p) => ({ x: p.t, y: p.u })),
        borderColor: col[c.grade],
        borderWidth: 1.6,
        pointRadius: 0,
        tension: 0.2,
      })),
    },
    options: {
      parsing: false,
      interaction: { mode: 'nearest', intersect: false },
      scales: {
        x: { type: 'linear', min: 0, max: TEST30.seconds, title: { display: true, text: 'секунды' }, grid: { display: false } },
        y: { title: { display: true, text: 'вольты' }, ticks: { callback: (v) => String(Number(v).toFixed(1)).replace('.', ',') } },
      },
      plugins: { tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${String(ctx.parsed.y).replace('.', ',')} В` } } },
    },
  });
}

// ── Банк деталей ────────────────────────────────────────────────────────────
function bankCard(st) {
  const items = st.bank;
  const groups = [];
  const seen = new Set();
  for (const p of items) {
    if (p.groupId) {
      if (seen.has(p.groupId)) continue;
      seen.add(p.groupId);
      groups.push(items.filter((x) => x.groupId === p.groupId));
    } else groups.push([p]);
  }
  return `
  <div class="card-title"><h2>Банк деталей</h2><span class="xs muted">QR-паспорт · гарантия ${PARTS.warrantyDays} дней · не продано за ${PARTS.unsoldDays} дней — на переработку</span></div>
  ${groups.length ? `<div class="dash">${groups.map((g) => `<div class="span-6">${g.length > 1 ? groupCard(g) : passport(g[0])}</div>`).join('')}</div>` : '<div class="empty">Деталей пока нет: они появляются после триажа «Доноров»</div>'}`;
}

function shelf(p) {
  const days = Math.floor((Date.now() - p.createdTs) / DAY);
  const left = Math.max(0, PARTS.unsoldDays - days);
  return `<div class="row between xs mt-8"><span class="muted">на полке ${days} дн. из ${PARTS.unsoldDays}</span><span style="color:${left < 15 ? 'var(--warn)' : 'var(--muted)'};font-weight:${left < 15 ? 600 : 400}">осталось ${left} дн.</span></div>
  <div class="progress" style="height:6px"><i style="width:${Math.min(100, (days / PARTS.unsoldDays) * 100)}%"></i></div>`;
}

function orderLine(p) {
  const o = p.orderId && getState().workshop.orders.find((x) => x.id === p.orderId);
  if (o) return `<span class="xs" style="color:var(--brand);font-weight:600">заявка №${o.no} · ${esc(o.shop)}</span>`;
  return p.hasOrder ? '<span class="xs" style="color:var(--brand);font-weight:600">есть заявка мастерской</span>' : '';
}

function passport(p) {
  const royalty = p.price != null ? Math.round(p.price * BONUS.royaltyShare) : null;
  return `<div class="passport">
    <div class="qr-sm">${qrSvg(`${APP_NAME}:part:${p.passportNo}`, { label: `QR-паспорт ${p.passportNo}` })}</div>
    <div class="lines">
      <span class="xs muted">${APP_NAME} · деталь № ${p.passportNo}</span>
      <b>${esc(p.part)} · ${esc(p.model)}</b>
      <span>Из устройства № ${p.fromDevice}, данные стёрты</span>
      <span>Проверка: ${esc(p.check)}</span>
      <span>Гарантия ${PARTS.warrantyDays} дней${p.price == null ? '' : ` · цена ${tenge(p.price)}`}</span>
      ${orderLine(p)}
      ${p.sold ? `<span class="tag whole" style="margin-top:6px;justify-self:start">${p.orderId ? 'выдана мастерской' : 'продано'}${royalty ? ` · роялти донору +${num(royalty)}` : ''}</span>` : `${shelf(p)}<button class="btn sm ${p.orderId ? 'primary' : 'ghost'} mt-8" style="justify-self:start" data-sell="${p.id}">${p.orderId ? 'Выдать мастерской' : 'Отметить продажу'}</button>`}
    </div></div>`;
}

function groupCard(g) {
  const first = g[0];
  const ex = EXAMPLES.find((e) => e.model === first.model);
  const sold = g.every((p) => p.sold);
  return `<div class="passport" style="grid-template-columns:92px 1fr">
    <div class="qr-sm">${qrSvg(`${APP_NAME}:device:${first.fromDevice}`, { label: `QR ${first.fromDevice}` })}</div>
    <div class="lines">
      <span class="xs muted">${APP_NAME} · детали устройства № ${first.fromDevice}</span>
      <b>${esc(first.model)}: ${g.length} детали под заказ</b>
      ${g.map((p) => `<span>${p.passportNo} · ${esc(p.part)}${p.goesTo ? ` → ${esc(p.goesTo)}` : ''}${p.hasOrder ? ' · <b style="color:var(--brand)">заявка</b>' : ''}</span>`).join('')}
      <span>Гарантия ${PARTS.warrantyDays} дней на каждую деталь</span>
      ${sold ? `<span class="tag whole" style="margin-top:6px;justify-self:start">продано · роялти донору +${num(ex?.royalty)}</span>` : `${shelf(first)}<button class="btn sm primary mt-8" style="justify-self:start" data-sell="${first.id}">Детали проданы</button>`}
    </div></div>`;
}

// ── Заявки мастерских ───────────────────────────────────────────────────────
// Разборка под заказ: заявка мастерской поднимает P(купят) с 0,2 до 0,9, и EV детали пересчитывается
const ORDER_STATUS = {
  open: ['ждёт деталь', ''],
  reserved: ['деталь снята и проверена', 'ok'],
  done: ['выдана мастерской', 'ok'],
  cancelled: ['отменена', ''],
};
const partModels = EXAMPLES.filter((e) => e.parts.length);
function ordersCard(st) {
  const f = ui.order || (ui.order = { model: partModels[0].id, part: 0, shop: 'Мастерская-партнёр' });
  const ex = partModels.find((e) => e.id === f.model);
  const list = [...st.workshop.orders].reverse();
  return `
  <div class="card-title"><h2>Заявки мастерских</h2><span class="xs muted">деталь снимаем, только когда её ждут</span></div>
  <div class="dash">
    <div class="span-7"><div class="list" data-testid="orders">${list.map((o) => {
      const [label, kind] = ORDER_STATUS[o.status];
      return `<div class="li"><div class="ico ${o.status === 'open' ? 'orange' : o.status === 'cancelled' ? 'gray' : ''}">${ICON.wrench}</div>
        <div class="grow"><b>№${o.no} · ${esc(o.part)}</b> <span class="small">· ${esc(o.model)}</span>
          <div class="xs muted">${esc(o.shop)} · ${dateTime(o.ts)}${o.partNo ? ` · деталь ${o.partNo}` : ''}</div>
          <span class="status-pill ${kind} mt-8">${label}</span></div>
        ${o.status === 'open' ? `<button class="btn sm plain" data-cancel-order="${o.id}">Отменить</button>` : ''}</div>`;
    }).join('')}</div></div>
    <form class="span-5 card flat stack" id="orderForm" style="align-self:start">
      <b>Новая заявка</b>
      <div class="field"><label for="oModel">Модель</label><select class="input" id="oModel">${partModels.map((e) => `<option value="${e.id}" ${e.id === f.model ? 'selected' : ''}>${esc(e.model)}</option>`).join('')}</select></div>
      <div class="field"><label for="oPart">Деталь</label><select class="input" id="oPart">${ex.parts.map((p, i) => `<option value="${i}" ${i === f.part ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></div>
      <div class="field"><label for="oShop">Мастерская</label><input class="input" id="oShop" maxlength="40" value="${esc(f.shop)}"></div>
      <button class="btn primary block" type="submit">${ICON.plus} Добавить заявку</button>
      <p class="xs muted">EV детали в карточке устройства пересчитается сразу: P(купят) станет ${String(EV.pSellWithOrder).replace('.', ',')} вместо ${String(EV.pSellNoOrder).replace('.', ',')}.</p>
    </form>
  </div>`;
}

// ── Маршрут Газели ──────────────────────────────────────────────────────────
// Раз в неделю: все боксы в ЦОН и вузах, школы с вещами в коробе и мелкая техника с «бирок у бака»
function routeStops(st) {
  const stops = BOXES.map((b) => ({ id: b.id, kind: b.kind, name: b.name, address: b.address, lat: b.lat, lon: b.lon, items: 0 }));
  for (const d of st.donations) {
    if (d.status !== 'sent' || !d.pointId) continue;
    let s = stops.find((x) => x.id === d.pointId);
    if (!s) { const p = pointById(d.pointId); s = { id: p.id, kind: p.kind, name: p.name, address: p.address, lat: p.lat, lon: p.lon, items: 0 }; stops.push(s); }
    s.items++;
  }
  for (const t of st.osi.tags) {
    if (t.kind !== 'small' || t.status !== 'marked' || t.lat == null) continue;
    let s = stops.find((x) => x.id === `osi:${t.address}`);
    if (!s) { s = { id: `osi:${t.address}`, kind: 'osi', name: `Бирка у бака: ${t.address}`, address: t.address, lat: t.lat, lon: t.lon, items: 0 }; stops.push(s); }
    s.items++;
  }
  return stops;
}
const sigOf = (stops) => stops.map((s) => `${s.id}:${s.items}`).join('|');

function routeCard(st) {
  const stops = routeStops(st);
  const fresh = trip && trip.sig === sigOf(stops) ? trip : null;
  const items = stops.reduce((a, s) => a + s.items, 0);
  return `
  <div class="card-title"><h2>Маршрут Газели</h2><button class="btn ${fresh ? 'ghost' : 'primary'} sm" data-route>${ICON.route} ${fresh ? 'Перестроить' : 'Построить маршрут'}</button></div>
  <p class="small muted">Раз в неделю из хаба по боксам в ЦОН и вузах, по школам, где в коробе есть вещи, и по «биркам у бака» с мелкой техникой. Путь — по улицам Актобе, порядок точек подбирается так, чтобы ехать меньше.</p>
  <div class="dash mt-12">
    <div class="span-7"><div class="map-card" style="height:340px"><div class="map-slot" data-map></div></div></div>
    <div class="span-5">
      ${fresh ? `<div class="kpis" style="grid-template-columns:repeat(2,1fr)">
          <div class="kpi"><div class="v" data-testid="route-km">${fmtKm(fresh.res.meters)}</div><div class="l">путь с возвратом в хаб</div></div>
          <div class="kpi"><div class="v">${fmtMin(fresh.res.seconds)}</div><div class="l">за рулём, без погрузки</div></div>
        </div>
        <div class="list mt-8" data-testid="route-stops">
          <div class="li"><div class="ico num-ico">0</div><div class="grow"><b>${esc(HUB.name)}</b><div class="xs muted">${esc(HUB.address)} · старт</div></div></div>
          ${fresh.res.order.map((i, n) => { const s = fresh.stops[i]; return `<div class="li"><div class="ico num-ico">${n + 1}</div><div class="grow"><b>${esc(s.name)}</b><div class="xs muted">${esc(s.address || '')}${s.items ? ` · вещей: ${s.items}` : ''}</div></div></div>`; }).join('')}
        </div>`
      : `<div class="empty">${stops.length} точек: ${BOXES.length} боксов${items ? `, вещей в коробах и у баков: ${items}` : ''}. Нажмите «Построить маршрут».</div>`}
    </div>
  </div>`;
}

function attachRouteMap(el) {
  const slot = el.querySelector('[aria-label="Маршрут сбора"] [data-map]');
  if (!slot) return;
  const st = getState();
  const stops = routeStops(st);
  const fresh = trip && trip.sig === sigOf(stops) ? trip : null;
  const m = mountMap(slot, 'hub-route', { zoom: 12 });
  const pins = [{ ...HUB, id: 'hub' }, ...stops.map((s) => ({ ...s, count: fresh ? fresh.res.order.indexOf(stops.indexOf(s)) + 1 : s.items || 0 }))];
  setPins(m, 'stops', pins);
  setLine(m, 'route', fresh?.res.latlngs, { color: '#5e5ce6' });
  if (ui.routeFit !== (fresh ? fresh.sig : 'none')) { ui.routeFit = fresh ? fresh.sig : 'none'; fitTo(m, [HUB, ...stops], { maxZoom: 14, padding: 24 }); }
}

function buildRoute(el) {
  const stops = routeStops(getState());
  const res = tour(HUB, stops);
  if (!res) return toast('Не удалось построить маршрут');
  trip = { sig: sigOf(stops), stops, res };
  render(el, getState());
  toast(`Маршрут: ${stops.length} точек, ${fmtKm(res.meters)}`);
}

// ── «Спроси устройство» ─────────────────────────────────────────────────────
function openAsk(itemId) {
  sheet('Спроси устройство', (body, close) => {
    let result = null;
    const draw = () => {
      body.innerHTML = `<div class="stack">
        <p class="small"><b>SAQTA Доктор</b> — одна команда на ноутбуке: читает только железо (батарею, диск, память), файлы и имена не трогает. Откроет паспорт прямо здесь или даст ссылку:</p>
        <div class="code">Mac и Linux:  sh saqta-doctor.sh\nWindows:  powershell -ExecutionPolicy Bypass -File saqta-doctor.ps1</div>
        <p class="xs muted">Скрипты — в папке <code>check/doctor</code> репозитория. Ноутбук с паролем — загрузочная флешка с тем же скриптом.</p>
        <textarea class="input" id="psPaste" rows="3" placeholder="Вставьте ссылку или паспорт из SAQTA Доктора" aria-label="Паспорт SAQTA Доктора"></textarea>
        <button class="btn primary block" data-paste>Прочитать паспорт</button>
        <div class="divider"></div>
        <p class="small">Только батарея на Windows — выполните в PowerShell (или <code>powercfg /batteryreport</code> в командной строке):</p>
        <div class="code" id="psCode">${esc(BATTERY_PS)}</div>
        <button class="btn sm ghost" data-copy style="justify-self:start">Скопировать скрипт</button>
        <div class="divider"></div>
        <label class="btn ghost block" for="brFile">${ICON.upload} Загрузить battery-report.html</label>
        <input type="file" id="brFile" accept=".html,.htm,text/html" class="sr-only">
        <p class="xs muted center">или введите два числа из PowerShell, мВт·ч</p>
        <form class="row" id="manualSoh" novalidate>
          <input class="input num" name="full" inputmode="numeric" placeholder="Текущая ёмкость" aria-label="Текущая ёмкость, мВт·ч">
          <input class="input num" name="design" inputmode="numeric" placeholder="Заводская" aria-label="Заводская ёмкость, мВт·ч">
          <button class="btn primary" type="submit">OK</button>
        </form>
        <p class="error" id="askErr" hidden></p>
        ${result ? `<div class="card flat center stack" style="gap:6px" data-testid="ask-result">
          ${result.value != null ? `<div class="counter">${result.value}%</div><div class="small muted">здоровье батареи · ${num(result.full)} из ${num(result.design)} ${result.unit || 'мВт·ч'}${result.cycles != null ? ` · ${num(result.cycles)} циклов` : ''}</div>` : '<div class="small muted">Батареи нет — системный блок: диск и память по паспорту</div>'}
          ${result.passport ? `<div class="xs muted">${esc([result.passport.device.vendor, result.passport.device.model].filter(Boolean).join(' '))}${result.passport.disks.length ? ` · SMART: ${result.passport.disks.every((d) => d.smart === 'ok') ? 'в норме' : 'проверить'}` : ''}</div>` : ''}
          ${result.value != null ? `<b style="color:${result.value >= TEST30.sohCutoff && !result.pf ? 'var(--tag-whole)' : 'var(--tag-danger)'}">${result.pf ? 'Аварийный флаг чипа — пакет не вскрываем' : result.value >= TEST30.sohCutoff ? `Не ниже ${TEST30.sohCutoff}% — ячейки идут на стенд ТЕСТ-30` : `Ниже ${TEST30.sohCutoff}% — батарея целиком уходит на переработку`}</b>` : ''}
          <button class="btn primary block mt-8" data-save>Сохранить в карточку</button></div>` : ''}
      </div>`;
    };
    const err = (m) => { const e = body.querySelector('#askErr'); e.textContent = m; e.hidden = false; };
    body.addEventListener('change', async (e) => {
      if (e.target.id !== 'brFile' || !e.target.files?.[0]) return;
      const html = await e.target.files[0].text();
      const r = parseBatteryReport(html);
      if (!r) return err('В файле не нашлись DESIGN CAPACITY и FULL CHARGE CAPACITY. Это точно battery-report.html?');
      result = { full: r.full, design: r.design, cycles: r.cycles, value: stateOfHealth(r.full, r.design), source: 'report' };
      draw();
    });
    body.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const full = Number(String(fd.get('full')).replace(/\D/g, ''));
      const design = Number(String(fd.get('design')).replace(/\D/g, ''));
      if (!full || !design) return err('Введите обе ёмкости');
      if (full > design * 1.5) return err('Текущая ёмкость не может быть сильно больше заводской — проверьте числа');
      result = { full, design, cycles: null, value: stateOfHealth(full, design), source: 'manual' };
      draw();
    });
    body.addEventListener('click', async (e) => {
      if (e.target.closest('[data-paste]')) {
        const ps = decodePassport(body.querySelector('#psPaste').value);
        if (!ps.ok) return err(ps.error);
        const bt = ps.battery;
        result = bt ? { full: bt.full, design: bt.design, cycles: bt.cycles, value: bt.soh, source: 'doctor', unit: bt.unit, pf: bt.pf, passport: ps }
          : { full: null, design: null, cycles: null, value: null, source: 'doctor', unit: null, pf: null, passport: ps };
        draw();
        return;
      }
      if (e.target.closest('[data-copy]')) {
        try { await navigator.clipboard.writeText(BATTERY_PS); toast('Скрипт скопирован'); } catch { toast('Скопируйте скрипт вручную'); }
      }
      if (e.target.closest('[data-save]') && result) {
        askDevice(itemId, result);
        close();
        toast(result.value != null ? `Здоровье батареи: ${result.value}%` : 'Паспорт сохранён: батареи нет');
      }
    });
    draw();
  });
}

// ── События ─────────────────────────────────────────────────────────────────
function startRun(el, itemId) {
  if (ui.running) return;
  ui.running = true;
  render(el, getState());
  el.querySelector('#test30')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    ui.lastRun = runCells(itemId || null);
    ui.running = false;
    render(el, getState());
    const c = ui.lastRun.count;
    toast(`ТЕСТ-30: A — ${c.A}, B — ${c.B}, C — ${c.C}, спорных — ${c['?']}`);
  }, 1800);
}

function bind(el, sel) {
  const form = el.querySelector('#orderForm');
  if (form) {
    form.onchange = (e) => {
      if (e.target.id === 'oModel') { ui.order.model = e.target.value; ui.order.part = 0; render(el, getState()); }
      if (e.target.id === 'oPart') ui.order.part = +e.target.value;
    };
    form.oninput = (e) => { if (e.target.id === 'oShop') ui.order.shop = e.target.value; };
    form.onsubmit = (e) => {
      e.preventDefault();
      const ex = partModels.find((x) => x.id === ui.order.model);
      const part = ex.parts[ui.order.part];
      const o = addWorkshopOrder({ shop: ui.order.shop.trim(), model: ex.model, part: part.name });
      toast(`Заявка №${o.no}: ${part.name.toLowerCase()} · ${ex.model}`);
    };
  }
  const flag = el.querySelector('[data-flag]');
  if (flag) flag.onchange = (e) => { setSortFlag(e.target.checked); toast(e.target.checked ? `Плата с «жёлтым флажком»: ${num(SORT_FLAG.price)} ₸/кг — дерево пересчитано` : 'Цена платы — медиана прайсов'); };
  el.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.select) { ui.pick = null; return selectHubItem(b.dataset.select); }
    if (b.dataset.sort) {
      const plan = sortItem(b.dataset.sort);
      if (plan) {
        toast(`Свет над ящиками: ${[...new Set(plan.frags.map((f) => binName(f.bin)))].join(', ')}`);
        setTimeout(() => document.querySelector('#wall')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      }
      return;
    }
    if ('sortAll' in b.dataset) {
      const n = sortAll();
      if (n) toast(`Рассортировано вещей: ${n}`);
      return;
    }
    if (b.dataset.lot) {
      const lot = shipLot(b.dataset.lot);
      if (lot) toast(`Партия ${lot.no}: ${binName(lot.bin)}, ${kgs(lot.kg)} кг — ${lot.buyer}`);
      return;
    }
    if (b.dataset.tag) { ui.pick = { itemId: sel.id, tag: b.dataset.tag }; return render(el, getState()); }
    if (b.dataset.confirm) {
      const tag = ui.pick?.tag || sel.suggestedTag;
      const fromResident = !!sel.donationId;
      ui.pick = null;
      triage(b.dataset.confirm, tag);
      return toast(fromResident ? `Бирка «${TAGS[tag].label}»: бонусы жителю начислены` : `Бирка «${TAGS[tag].label}» подтверждена`);
    }
    if (b.dataset.ask) return openAsk(b.dataset.ask);
    if ('route' in b.dataset) return buildRoute(el);
    if (b.dataset.cancelOrder) { cancelWorkshopOrder(b.dataset.cancelOrder); return toast('Заявка отменена'); }
    if ('run' in b.dataset) return startRun(el, b.dataset.run);
    if (b.dataset.sell) {
      const r = sellPart(b.dataset.sell);
      if (r?.royalty && r.toDonor === 'you') toast(`Роялти +${num(r.royalty)} — в кошелёк донора`);
      else if (r?.royalty) toast(`Роялти +${num(r.royalty)} — донору устройства ${r.toDonor}`);
      else toast('Деталь продана');
    }
  };
}
