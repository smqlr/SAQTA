// Экран «Хаб»: очередь с бирками, расчёт EV, «Спроси устройство», ТЕСТ-30, банк деталей с QR-паспортом.
import { EXAMPLES, TAGS, TEST30, PARTS, ECON, EV, APP_NAME, BATTERY_PS, BONUS } from '../data.js';
import { getState, selectHubItem, triage, askDevice, runCells, sellPart } from '../store.js';
import { expectedValue, decision, evExplain, pSell } from '../lib/ev.js';
import { parseBatteryReport, stateOfHealth } from '../lib/battery-report.js';
import { ART } from '../lib/art.js';
import { ICON } from '../lib/icons.js';
import { qrSvg } from '../lib/qr.js';
import { num, esc, tenge, DAY, dateTime } from '../lib/format.js';
import { tagChip, simMark, realMark, sheet, toast } from '../lib/ui.js';
import { makeChart, destroyCharts, cssVar } from '../lib/charts.js';

const dash = '<span class="faint">—</span>';
let ui = { pick: null, running: false, lastRun: null };
export function home() { ui = { pick: null, running: false, lastRun: ui.lastRun }; }

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
  <div class="screen-head"><h1>Хаб</h1><p>Приёмка, триаж за ${ECON.triageSec} секунд, детали только под заказ</p></div>
  <div class="kpis">
    ${kpi(tenge(ECON.deviceProcessing), 'обработка одного устройства', tenge(ECON.checkNow))}
    ${kpi(`≈ ${tenge(ECON.cellTenge)}`, `проверка ячейки, ${TEST30.seconds} с`, `${tenge(ECON.cellNowTenge)}, ${ECON.cellNowMin} мин`)}
    ${kpi(`${ECON.triageSec} с`, 'триаж устройства', '')}
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
    <section class="card span-12" aria-label="Банк деталей">${bankCard(st)}</section>
  </div>`;

  drawTestChart(el);
  bind(el, sel);
}

const kpi = (v, l, was) => `<div class="kpi"><div class="v">${v}</div><div class="l">${l}</div>${was ? `<div class="was">Было: ${was}</div>` : ''}</div>`;

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

  ${ex?.parts?.length ? evTable(ex) : ''}
  ${it.type === 'laptop' ? askBlock(it) : ''}`;
}

function evTable(ex) {
  return `
  <div class="section-label mt-16">Ожидаемая ценность деталей (EV)</div>
  <div class="formula">EV = P(работает) × цена × P(купят за ${EV.sellDays} дней) − t<sub>мин</sub> × ${EV.tengePerMinute}</div>
  <p class="xs muted mt-8">P(купят) = ${String(EV.pSellWithOrder).replace('.', ',')}, если на деталь есть заявка мастерской, и ${String(EV.pSellNoOrder).replace('.', ',')}, если нет. Деталь снимаем, только если EV больше нуля.</p>
  <div class="table-wrap mt-8"><table>
    <thead><tr><th>Деталь</th><th class="r">P(работает)</th><th class="r">Цена</th><th>Заявка</th><th class="r">P(купят)</th><th class="r">t, мин</th><th class="r">EV</th><th>Решение</th></tr></thead>
    <tbody>${ex.parts.map((p) => {
      const ev = expectedValue(p);
      const dcs = decision(ev);
      const ps = pSell(p);
      return `<tr>
        <td><b>${esc(p.name)}</b>${ev == null ? '' : `<div class="xs muted nowrap">${esc(evExplain(p, num))}</div>`}</td>
        <td class="r">${p.pWorks == null ? dash : String(p.pWorks).replace('.', ',')}</td>
        <td class="r">${p.price == null ? dash : tenge(p.price)}</td>
        <td>${p.hasOrder == null ? dash : p.hasOrder ? 'есть' : 'нет'}</td>
        <td class="r">${ps == null ? dash : String(ps).replace('.', ',')}</td>
        <td class="r">${p.minutes == null ? dash : p.minutes}</td>
        <td class="r"><b>${ev == null ? dash : `${ev > 0 ? '+' : '−'}${num(Math.abs(ev))} ₸`}</b></td>
        <td>${dcs.take == null ? (p.hasOrder ? '<b style="color:var(--tag-whole)">под заявку</b>' : '<span class="muted">ждём заявку</span>') : dcs.take ? '<b style="color:var(--tag-whole)">снимаем</b>' : '<span class="muted">оставляем</span>'}</td>
      </tr>`;
    }).join('')}</tbody></table></div>`;
}

function askBlock(it) {
  const s = it.soh;
  const ok = s && s.value >= TEST30.sohCutoff;
  return `
  <div class="section-label mt-16">«Спроси устройство»</div>
  <div class="card flat tight">
    <p class="small">Чип батареи хранит заводскую и текущую ёмкость и число циклов — читаем за секунды, разбирать ничего не нужно.</p>
    ${s ? `<div class="row wrap mt-12" style="gap:16px">
        <div><div class="counter" style="font-size:40px">${s.value}%</div><div class="xs muted">здоровье батареи (SoH)</div></div>
        <div class="grow small">
          <div>${num(s.full)} из ${num(s.design)} мВт·ч${s.cycles != null ? ` · ${num(s.cycles)} циклов` : ''}</div>
          <div class="mt-8"><b style="color:${ok ? 'var(--tag-whole)' : 'var(--tag-danger)'}">${ok ? 'Ячейки → стенд ТЕСТ-30' : 'Батарея целиком → переработка'}</b></div>
          <div class="mt-8">${s.source === 'report' ? realMark('прочитано из отчёта Windows') : '<span class="note-demo note-real">введено из PowerShell</span>'}</div>
        </div></div>` : ''}
    <div class="row wrap mt-12">
      <button class="btn ${s ? 'ghost' : 'primary'}" data-ask="${it.id}">${ICON.battery} Спроси устройство</button>
      ${ok ? `<button class="btn primary" data-run="${it.id}">${ICON.bolt} Ячейки на ТЕСТ-30</button>` : ''}
    </div>
  </div>`;
}

// ── ТЕСТ-30 ─────────────────────────────────────────────────────────────────
function test30Card(sel) {
  const r = ui.lastRun;
  const cells = Array.from({ length: TEST30.cells }, (_, i) => r?.results[i]);
  return `
  <div class="card-title"><div class="row wrap" style="gap:8px"><h2>ТЕСТ-30</h2>${simMark('симуляция по физической модели ячейки')}</div>
    <button class="btn primary sm" data-run="${sel?.type === 'laptop' && sel?.soh?.value >= TEST30.sohCutoff ? sel.id : ''}" ${ui.running ? 'disabled' : ''}>${ICON.bolt} ${ui.running ? 'Идёт тест…' : r ? 'Запустить снова' : 'Запустить'}</button></div>
  <p class="small muted">${TEST30.cells} ячеек 18650 за ${TEST30.seconds} секунд коротким импульсом нагрузки через резистор ${TEST30.loadOhm} Ом. Стенд смотрит, насколько просело напряжение: R<sub>0</sub> = (U<sub>без нагрузки</sub> − U<sub>под нагрузкой</sub>) / I. Ячейки берём только из батарей со здоровьем не ниже ${TEST30.sohCutoff}%.</p>
  <div class="dash mt-12">
    <div class="span-5">
      <div class="cells">${cells.map((c, i) => `<div class="cell ${c ? '' : 'idle'} ${ui.running ? 'running' : ''}">
        <span class="xs faint">№${i + 1}</span><span class="grade ${c ? c.grade : ''}">${c ? c.grade : '·'}</span>
        <span class="xs num">${c ? `${c.rMilliOhm} мОм` : '—'}</span><span class="xs num muted">${c ? `${c.soh}%` : ''}</span></div>`).join('')}</div>
      <div class="table-wrap mt-12"><table>
        <thead><tr><th>Грейд</th><th>Условие</th><th>Куда идёт</th><th class="r">Ячеек</th></tr></thead>
        <tbody>
          <tr><td><span class="grade A">A</span></td><td class="small">здоровье ≥ ${TEST30.gradeA.soh}%, R ≤ ${TEST30.gradeA.rMilliOhm} мОм</td><td class="small">${TEST30.use.A}</td><td class="r">${r ? r.count.A : '—'}</td></tr>
          <tr><td><span class="grade B">B</span></td><td class="small">здоровье ${TEST30.gradeB.soh}–${TEST30.gradeA.soh}%, R ≤ ${TEST30.gradeB.rMilliOhm} мОм</td><td class="small">${TEST30.use.B}</td><td class="r">${r ? r.count.B : '—'}</td></tr>
          <tr><td><span class="grade C">C</span></td><td class="small">хуже, U < ${String(TEST30.gradeC.minVolt).replace('.', ',')} В или нагрев > ${TEST30.gradeC.maxHeatC} °C</td><td class="small">${TEST30.use.C}</td><td class="r">${r ? r.count.C : '—'}</td></tr>
        </tbody></table></div>
    </div>
    <div class="span-7">
      <div class="row between"><b class="small">Кривые напряжения, В</b><div class="legend"><span><i style="background:var(--grade-a)"></i>A</span><span><i style="background:var(--grade-b)"></i>B</span><span><i style="background:var(--grade-c)"></i>C</span></div></div>
      <div class="chart-box mt-8">${r ? '<canvas id="t30chart" aria-label="Кривые напряжения 16 ячеек"></canvas>' : `<div class="empty" style="height:100%;display:grid;place-items:center">Нажмите «Запустить»: стенд даст импульс нагрузки и построит кривые</div>`}</div>
      ${r ? `<p class="xs muted mt-8">Ток импульса ≈ ${String(r.results[0].current).replace('.', ',')} А. Время теста — ${TEST30.seconds} с на все ${TEST30.cells} ячеек одновременно (вручную — ${ECON.cellNowMin} минут на одну).</p>` : ''}
    </div>
  </div>`;
}

function drawTestChart(el) {
  const r = ui.lastRun;
  const cv = el.querySelector('#t30chart');
  if (!r || !cv) return;
  const col = { A: cssVar('--grade-a'), B: cssVar('--grade-b'), C: cssVar('--grade-c') };
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
      ${p.hasOrder ? '<span class="xs" style="color:var(--brand);font-weight:600">есть заявка мастерской</span>' : ''}
      ${p.sold ? `<span class="tag whole" style="margin-top:6px;justify-self:start">продано${royalty ? ` · роялти донору +${num(royalty)}` : ''}</span>` : `${shelf(p)}<button class="btn sm ghost mt-8" style="justify-self:start" data-sell="${p.id}">Отметить продажу</button>`}
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

// ── «Спроси устройство» ─────────────────────────────────────────────────────
function openAsk(itemId) {
  sheet('Спроси устройство', (body, close) => {
    let result = null;
    const draw = () => {
      body.innerHTML = `<div class="stack">
        <p class="small">На ноутбуке с Windows выполните в PowerShell (или <code>powercfg /batteryreport</code> в командной строке):</p>
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
        ${result ? `<div class="card flat center stack" style="gap:6px">
          <div class="counter">${result.value}%</div><div class="small muted">здоровье батареи · ${num(result.full)} из ${num(result.design)} мВт·ч${result.cycles != null ? ` · ${num(result.cycles)} циклов` : ''}</div>
          <b style="color:${result.value >= TEST30.sohCutoff ? 'var(--tag-whole)' : 'var(--tag-danger)'}">${result.value >= TEST30.sohCutoff ? `Не ниже ${TEST30.sohCutoff}% — ячейки идут на стенд ТЕСТ-30` : `Ниже ${TEST30.sohCutoff}% — батарея целиком уходит на переработку`}</b>
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
      if (e.target.closest('[data-copy]')) {
        try { await navigator.clipboard.writeText(BATTERY_PS); toast('Скрипт скопирован'); } catch { toast('Скопируйте скрипт вручную'); }
      }
      if (e.target.closest('[data-save]') && result) {
        askDevice(itemId, result);
        close();
        toast(`Здоровье батареи: ${result.value}%`);
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
    toast(`ТЕСТ-30: A — ${c.A}, B — ${c.B}, C — ${c.C}`);
  }, 1800);
}

function bind(el, sel) {
  el.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.select) { ui.pick = null; return selectHubItem(b.dataset.select); }
    if (b.dataset.tag) { ui.pick = { itemId: sel.id, tag: b.dataset.tag }; return render(el, getState()); }
    if (b.dataset.confirm) {
      const tag = ui.pick?.tag || sel.suggestedTag;
      const fromResident = !!sel.donationId;
      ui.pick = null;
      triage(b.dataset.confirm, tag);
      return toast(fromResident ? `Бирка «${TAGS[tag].label}»: бонусы жителю начислены` : `Бирка «${TAGS[tag].label}» подтверждена`);
    }
    if (b.dataset.ask) return openAsk(b.dataset.ask);
    if ('run' in b.dataset) return startRun(el, b.dataset.run);
    if (b.dataset.sell) {
      const r = sellPart(b.dataset.sell);
      if (r?.royalty && r.toDonor === 'you') toast(`Роялти +${num(r.royalty)} — в кошелёк донора`);
      else if (r?.royalty) toast(`Роялти +${num(r.royalty)} — донору устройства ${r.toDonor}`);
      else toast('Деталь продана');
    }
  };
}
