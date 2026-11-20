// Сайт SAQTA: калькуляторы считают тем же кодом, что и приложение (src/lib, src/data.js).
import { planFor, binOf } from '../../src/lib/sort.js';
import { decide, batteryEnd, SOH_END, CAP_YEARS } from '../../src/lib/extend.js';
import { staves } from '../../src/lib/extend-staves.js';
import { EXTEND, SORT_BINS } from '../../src/data.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const nf0 = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });
const MINUS = '−';
const r1 = (v) => Math.round(v * 10) / 10;

// 596.5 → «596,5 ₸», −775.2 → «−775,2 ₸»
function tg(v, { sign = false } = {}) {
  const x = r1(v);
  const s = x < 0 ? MINUS : sign && x > 0 ? '+' : '';
  return `${s}${nf1.format(Math.abs(x))} ₸`;
}
function plural(n, one, few, many) {
  if (!Number.isInteger(n)) return few;
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b === 1) return one;
  if (b >= 2 && b <= 4) return few;
  return many;
}
const years = (y) => {
  const x = r1(y);
  return `${nf1.format(x)} ${plural(x, 'год', 'года', 'лет')}`;
};
const times = (k) => {
  const x = r1(k);
  return `в ${nf1.format(x)} ${plural(x, 'раз', 'раза', 'раз')}`;
};
const minutes = (m) => (m < 1 ? `${Math.round(m * 60)} с` : `${nf2.format(m)} мин`);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/* ——— меню и активный раздел ——— */
function initNav() {
  const top = $('#top');
  const btn = $('.menu-btn', top);
  const nav = $('#nav');
  const close = () => { top.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => {
    const open = !top.classList.contains('open');
    top.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', (e) => { if (!top.contains(e.target)) close(); });

  if (!('IntersectionObserver' in window)) return;
  const links = $$('a[href^="#"]', nav);
  const map = new Map();
  // этапы 1–4 подсвечивают пункт «Этапы»
  const alias = { collect: 'stages', check: 'stages', sort: 'stages', extend: 'stages', results: 'budget', risks: 'budget', sources: 'team' };
  for (const a of links) map.set(a.getAttribute('href').slice(1), a);
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const id = alias[en.target.id] || en.target.id;
      for (const a of links) a.classList.toggle('on', a === map.get(id));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => io.observe(s));
}

/* ——— этап 2: ценность проверки ——— */
// Числа деталей — из документации и README (раздел «Ценность проверки»)
const PARTS = [
  { name: 'Экран A50', note: 'есть заявка', P: 0.7, price: 4000, min: 6, order: true },
  { name: 'Камера A50', note: 'без заявки', P: 0.8, price: 900, min: 3, order: false },
  { name: 'Память Lenovo', note: '1 мин', P: 0.9, price: 4000, min: 1, order: true },
  { name: 'SSD Lenovo', note: '2 мин', P: 0.85, price: 6000, min: 2, order: true },
  { name: '3 ячейки Lenovo', note: '6 мин', P: 0.8, price: 1200, min: 6, order: true },
];
const RATE = 60; // ₸ в минуту: 900 ₸ за 15 минут из кейса

export function voi({ P, price, min, order }) {
  const ps = order ? 0.9 : 0.2;
  const V = price * ps;
  const K = min * RATE;
  const ev = P * V - K;
  const errTake = (1 - P) * K; // сняли нерабочую
  const errLeave = P * (V - K); // оставили рабочую
  const cp = V <= K ? 0 : Math.round(Math.min(errTake, errLeave));
  return { ps, V, K, ev: r1(ev), cp, errTake: r1(errTake), errLeave: r1(errLeave) };
}

function initVoi() {
  const root = $('#voi');
  if (!root) return;
  const box = $('[data-voi-presets]', root);
  box.innerHTML = PARTS.map((p, i) => `<button type="button" class="chip" data-i="${i}" aria-pressed="false">${esc(p.name)}<small>${esc(p.note)}</small></button>`).join('');
  const inP = $('#voiP'), inPrice = $('#voiPrice'), inMin = $('#voiMin'), inOrder = $('#voiOrder');
  const pick = (i) => {
    const p = PARTS[i];
    inP.value = p.P; inPrice.value = p.price; inMin.value = p.min; inOrder.checked = p.order;
    $$('.chip', box).forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
    calc();
  };
  function calc() {
    const s = { P: +inP.value, price: +inPrice.value, min: +inMin.value, order: inOrder.checked };
    const r = voi(s);
    $('#voiPo').textContent = nf2.format(s.P);
    $('#voiPriceo').textContent = `${nf0.format(s.price)} ₸`;
    $('#voiMino').textContent = minutes(s.min);
    const ev = $('#voiEv');
    ev.textContent = tg(r.ev, { sign: true });
    ev.className = `out-big ${r.ev > 0 ? 'pos' : 'neg'}`;
    $('#voiCp').textContent = tg(r.cp);
    $('#voiCp').className = 'out-big';
    const V = nf1.format(r1(r.V)), K = nf1.format(r1(r.K));
    $('#voiCalc').innerHTML =
      `EV = ${nf2.format(s.P)} × ${nf0.format(s.price)} × ${nf1.format(r.ps)} − ${nf2.format(s.min)} × 60 = ${tg(r.ev, { sign: true })}<br>` +
      `V = ${V} ₸, K = ${K} ₸ · ` +
      (r.V <= r.K
        ? `V ≤ K: даже рабочая деталь не окупает работу → ЦП = 0`
        : `снять нерабочую: ${tg(r.errTake)} · оставить рабочую: ${tg(r.errLeave)} → ЦП = ${tg(r.cp)}`);
    const v = $('#voiVerdict');
    const act = r.ev > 0 ? 'Снимаем деталь.' : 'Не снимаем: деталь не окупает минуты работы.';
    if (r.cp === 0) {
      v.className = r.ev > 0 ? 'verdict ok' : 'verdict no';
      v.textContent = `${act} Проверка до снятия ничего не изменит — не тратим на неё ни секунды.`;
    } else {
      v.className = 'verdict';
      v.textContent = `${act} Проверка до снятия окупится, только если стоит меньше ${nf0.format(r.cp)} ₸ — это ${nf0.format(r.cp)} ${plural(r.cp, 'секунда', 'секунды', 'секунд')} работы по ставке кейса (60 ₸ в минуту).`;
    }
  }
  box.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) pick(+b.dataset.i); });
  [inP, inPrice, inMin].forEach((el) => el.addEventListener('input', () => { $$('.chip', box).forEach((b) => b.setAttribute('aria-pressed', 'false')); calc(); }));
  inOrder.addEventListener('change', () => { $$('.chip', box).forEach((b) => b.setAttribute('aria-pressed', 'false')); calc(); });
  pick(0);
}

/* ——— этап 3: дерево разборки ——— */
function initTree() {
  const root = $('#tree');
  if (!root) return;
  const price = $('#treePrice');
  const st2 = $('#treeStage2');
  const wall = $('#wall');
  wall.innerHTML = SORT_BINS.map((b) => {
    const p = b.byType ? 'цена по виду' : b.price ? `${nf0.format(b.price)} ₸/кг` : b.hazard ? 'шкаф с песком' : 'без оплаты';
    return `<div class="bin${b.hazard ? ' hz' : ''}" data-bin="${b.id}"><span class="lamp"></span><b>${esc(b.label)}</b><span>${p}</span></div>`;
  }).join('');

  function calc() {
    const p = +price.value;
    const plan = planFor({ type: 'laptop' }, { bankParts: st2.checked ? ['Память', 'SSD', 'Ячейки'] : [], prices: { boardLaptop: p } });
    $('#treePriceo').textContent = `${nf0.format(p)} ₸/кг`;
    $('#treeWhole').textContent = tg(plan.asIs);
    $('#treeFull').innerHTML = `${tg(plan.full)} <span class="t">за ${minutes(plan.fullMin)}</span>`;
    $('#treeBest').innerHTML = `${tg(plan.value)} <span class="t">за ${minutes(plan.minutes)}</span>`;
    $('#treeFull').style.color = plan.full < 0 ? 'var(--hazard)' : '';
    $$('.chip[data-price]', root).forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.price === p)));

    const nodes = new Map();
    (function walk(n) { nodes.set(n.id, n); (n.children || []).forEach(walk); })(plan.tree);
    const items = plan.rows.map((r) => {
      const pad = r.depth > 1 ? ' d2' : r.depth === 1 ? ' d1' : '';
      const node = nodes.get(r.id);
      // «Вынуть: озу» → «Вынуть: ОЗУ»: аббревиатуры оставляем заглавными
      if (r.kind === 'take' && node && !node.label) r = { ...r, label: `Вынуть: ${node.name === node.name.toUpperCase() ? node.name : node.name.toLowerCase()}` };
      const bin = r.to ? binOf(r.to) : null;
      let cls, right, sub = '';
      if (r.kind === 'open') {
        cls = r.do ? 'do' : 'skip';
        right = r.do ? `<span class="r">${r.done2 ? 'уже вскрыт' : minutes(r.min)}</span>` : `<span class="r neg">${tg(r.gain)}</span>`;
        if (!r.do && r.threshold) sub = `не делаем: окупится, если ${esc(r.threshold.part.toLowerCase())} дороже ${nf0.format(r.threshold.price)} ₸/кг`;
        else if (!r.do) sub = 'не делаем: минуты работы дороже частей';
      } else if (r.kind === 'take') {
        cls = r.must ? 'must' : r.do ? 'do' : 'skip';
        right = r.must ? '<span class="r">всегда</span>' : r.do ? `<span class="r pos">${tg(r.gain, { sign: true })}</span>` : `<span class="r neg">${tg(r.gain, { sign: true })}</span>`;
        sub = r.must ? 'безопасность — вне экономики' : `${minutes(r.min)}${bin ? ` → ${esc(bin.label.toLowerCase())}` : ''}${r.do ? '' : ' · оставляем в корпусе'}`;
      } else {
        cls = 'do';
        right = `<span class="r">${tg(r.value)}</span>`;
        sub = bin ? `→ ${esc(bin.label.toLowerCase())}` : '';
      }
      return `<li class="${cls}${pad}"><span class="mark"></span><span class="what">${esc(r.label)}${sub ? `<span class="sub">${sub}</span>` : ''}</span>${right}</li>`;
    });
    if (plan.res.decision !== 'open') items.push('<li class="do"><span class="mark"></span><span class="what">Остальное целиком — лицензированному переработчику</span><span class="r"></span></li>');
    $('#treeSteps').innerHTML = items.join('');

    const used = new Set(plan.frags.map((f) => f.bin));
    $$('.bin', wall).forEach((b) => b.classList.toggle('lit', used.has(b.dataset.bin)));
    const gain = plan.value - plan.asIs;
    $('#treeNote').textContent = gain > 0.05
      ? `Дерево приносит ${tg(gain, { sign: true })} к цене целого ноутбука за ${minutes(plan.minutes)} работы, а полная разборка теряет ${tg(plan.asIs - plan.full)}.`
      : `Вскрывать дальше не окупается: ноутбук выгоднее отдать как есть. Полная разборка потеряла бы ${tg(plan.asIs - plan.full)}.`;
  }
  price.addEventListener('input', calc);
  st2.addEventListener('change', calc);
  $$('.chip[data-price]', root).forEach((b) => b.addEventListener('click', () => { price.value = b.dataset.price; calc(); }));
  calc();
}

/* ——— этап 4: продлить или сдать ——— */
// Те же примеры, что в README (раздел «Что бочка решила для каждой вещи»)
const CASES = [
  { name: 'Ноутбук, 6 лет', note: 'тормозит, батарея 61%', kind: 'laptop', input: { age: 6, soh: 0.61, disk: 'hdd', slow: true } },
  { name: 'MacBook Pro, 2 года', note: 'чип: 88,4%, 239 циклов', kind: 'laptop', input: { age: 2, soh: 0.884, disk: 'ssd' } },
  { name: 'Смартфон, 3 года', note: 'батарея ≈ 78%', kind: 'phone', input: { age: 3, soh: 0.78 } },
  { name: 'Смартфон, 7 лет', note: 'разбит экран, 65%', kind: 'phone', input: { age: 7, soh: 0.65, screen: 'broken' } },
  { name: 'Стиралка, 8 лет', note: 'не сливает воду', kind: 'washer', input: { age: 8, fault: 'pump' } },
  { name: 'Стиралка, 14 лет', note: 'не включается', kind: 'washer', input: { age: 14, fault: 'board' } },
];

export function lifeVerdict(kind, input) {
  const kd = EXTEND.kinds[kind];
  return { kd, d: decide(staves(kind, input), { newPrice: kd.newPrice, life: kd.life, kg: kd.kg }) };
}

function drawCurve(svg, soh, age) {
  const W = 320, H = 150, L = 34, R = 10, T = 10, B = 26;
  const tEnd = batteryEnd(soh, age, SOH_END);
  const tMax = Math.min(16, Math.max(age * 1.6, Number.isFinite(tEnd) ? tEnd * 1.15 : age * 2, 4));
  const yMin = 0.5;
  const x = (t) => L + (t / tMax) * (W - L - R);
  const y = (s) => T + ((1 - s) / (1 - yMin)) * (H - T - B);
  const b = (1 - soh) / Math.sqrt(age);
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const t = (tMax * i) / 60;
    const s = Math.max(yMin, 1 - b * Math.sqrt(t));
    pts.push(`${x(t).toFixed(1)},${y(s).toFixed(1)}`);
  }
  const ticks = [];
  const step = tMax > 10 ? 4 : tMax > 6 ? 2 : 1;
  for (let t = 0; t <= tMax + 1e-9; t += step) ticks.push(`<text x="${x(t).toFixed(1)}" y="${H - 8}" text-anchor="middle">${nf0.format(t)}</text>`);
  const end = Number.isFinite(tEnd) && tEnd <= tMax
    ? `<line x1="${x(tEnd)}" x2="${x(tEnd)}" y1="${y(SOH_END)}" y2="${H - B}" stroke="#b93d0d" stroke-dasharray="3 3"/><circle cx="${x(tEnd)}" cy="${y(SOH_END)}" r="4" fill="#b93d0d"/>`
    : '';
  svg.innerHTML = `
    <g font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10" fill="#6c675d">
      <text x="${L - 6}" y="${y(1) + 4}" text-anchor="end">100%</text>
      <text x="${L - 6}" y="${y(SOH_END) + 4}" text-anchor="end">80%</text>
      <text x="${L - 6}" y="${y(yMin) + 4}" text-anchor="end">50%</text>
      ${ticks.join('')}
      <text x="${W - R}" y="${H - 8}" text-anchor="end" opacity="0">лет</text>
    </g>
    <line x1="${L}" x2="${W - R}" y1="${y(SOH_END)}" y2="${y(SOH_END)}" stroke="#b93d0d" stroke-width="1"/>
    <line x1="${L}" x2="${L}" y1="${T}" y2="${H - B}" stroke="#161614"/>
    <line x1="${L}" x2="${W - R}" y1="${H - B}" y2="${H - B}" stroke="#161614"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="#161614" stroke-width="2"/>
    ${end}
    <circle cx="${x(age)}" cy="${y(soh)}" r="5" fill="#1d8a4a" stroke="#fff" stroke-width="1.5"/>`;
}

function initLife() {
  const root = $('#life');
  if (!root) return;
  const box = $('[data-life-cases]', root);
  box.innerHTML = CASES.map((c, i) => `<button type="button" class="chip" data-i="${i}" aria-pressed="false">${esc(c.name)}<small>${esc(c.note)}</small></button>`).join('');
  const inAge = $('#lifeAge'), inSoh = $('#lifeSoh'), sohField = $('#lifeSohField'), curve = $('#lifeCurve');
  let cur = CASES[0];

  function pick(i) {
    cur = CASES[i];
    inAge.value = cur.input.age;
    const hasBat = cur.input.soh != null;
    sohField.hidden = !hasBat;
    curve.hidden = !hasBat;
    if (hasBat) inSoh.value = (cur.input.soh * 100).toFixed(1);
    $$('.chip', box).forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
    calc();
  }

  function calc() {
    const input = { ...cur.input, age: +inAge.value };
    if (cur.input.soh != null) input.soh = +inSoh.value / 100;
    $('#lifeAgeo').textContent = years(input.age);
    if (input.soh != null) {
      $('#lifeSoho').textContent = `${nf1.format(+inSoh.value)}%`;
      drawCurve($('svg', curve), input.soh, input.age);
    }
    const { kd, d } = lifeVerdict(cur.kind, input);
    const fixed = new Set(d.best && d.verdict === 'extend' ? d.best.fixes : []);
    $('#lifeStaves').innerHTML = d.staves.map((s, idx) => {
      const w = (Math.min(CAP_YEARS, s.rul) / CAP_YEARS) * 100;
      const after = fixed.has(s.id) && s.fix ? `<span class="after" style="width:${(Math.min(CAP_YEARS, s.fix.rul) / CAP_YEARS) * 100}%"></span>` : '';
      const fixLine = fixed.has(s.id) && s.fix ? `<div class="fixline">${esc(s.fix.name)}: ${tg(s.fix.cost)} → ${years(s.fix.rul)}</div>` : '';
      return `<li class="${idx === 0 && d.T0 < CAP_YEARS ? 'weak' : ''}"><div class="top-line"><b>${esc(s.name)}</b><span class="mono">${years(s.rul)}</span></div>${s.why ? `<div class="why">${esc(s.why)}</div>` : ''}<div class="track"><span class="now" style="width:${w}%"></span>${after}</div>${fixLine}</li>`;
    }).join('');

    const v = $('#lifeVerdict');
    const perYear = (v) => tg(Math.round(v));
    const newLine = `Новая вещь (${esc(kd.newName)}): ${tg(kd.newPrice)} на ${years(kd.life)} — ${perYear(d.newPerYear)} за год.`;
    if (d.verdict === 'ok') {
      v.className = 'verdict ok';
      v.innerHTML = `<b>Чинить не нужно.</b> Вещь проживёт ещё ${years(d.T0)} без ремонта — ставим её на учёт с обратным билетом.`;
    } else if (d.verdict === 'extend') {
      const b = d.best;
      v.className = 'verdict';
      v.innerHTML = `<b>Продлить: ${tg(b.cost)} за +${years(b.gain)}.</b> Год жизни — ${perYear(b.perYear)}, ${times(d.ratio)} дешевле новой. ${newLine}` +
        (d.kgSaved > 0 ? ` Отходов не родится: ${nf1.format(d.kgSaved)} кг.` : '');
    } else {
      v.className = 'verdict no';
      v.innerHTML = d.best
        ? `<b>Не продлевать:</b> год жизни после ремонта (${perYear(d.best.perYear)}) не дешевле новой вещи. ${newLine} Сдать — детали продлят другие вещи.`
        : `<b>Не продлевать:</b> ремонт добавит меньше года. Сдать — детали из неё продлят другие вещи.`;
    }
  }

  box.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) pick(+b.dataset.i); });
  inAge.addEventListener('input', calc);
  inSoh.addEventListener('input', calc);
  pick(0);
}

/* ——— экономика: сценарии ——— */
const SCEN = {
  pess: { dev: 10000, rev: 2653328, ret: 27, note: 'Сбор 50% плана, продажи деталей 50%, цены 70%.' },
  care: { dev: 15000, rev: 4735642, ret: 47, note: 'Сбор 75% плана, продажи деталей 75%, цены 85%.' },
  base: { dev: 20000, rev: 7657918, ret: 77, note: 'Сбор 100% плана, продажи деталей 100%, цены 100%.' },
};
function initScen() {
  const seg = $('#scenSeg');
  if (!seg) return;
  seg.addEventListener('click', (e) => {
    const b = e.target.closest('[data-s]');
    if (!b) return;
    const s = SCEN[b.dataset.s];
    $$('[data-s]', seg).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $('#scDev').textContent = nf0.format(s.dev);
    $('#scRev').textContent = `${nf0.format(s.rev)} ₸`;
    $('#scRet').textContent = `${s.ret}%`;
    $('#scNote').textContent = s.note;
  });
}

/* ——— прототип прямо на странице ——— */
function initLive() {
  const btn = $('#liveBtn');
  const live = $('#live');
  if (!btn || !live) return;
  const APP = 'https://smqlr.github.io/SAQTA/';
  btn.addEventListener('click', () => {
    if (window.innerWidth < 760) { window.open(APP, '_blank', 'noopener'); return; }
    if (!live.classList.contains('on')) {
      const f = document.createElement('iframe');
      f.title = 'Приложение SAQTA';
      f.src = '../docs/index.html';
      f.loading = 'eager';
      $('.device', live).replaceChildren(f);
      live.classList.add('on');
      btn.textContent = 'Свернуть';
      live.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      live.classList.remove('on');
      $('.device', live).replaceChildren();
      btn.textContent = 'Запустить прямо здесь';
    }
  });
}

function init() {
  initNav();
  initVoi();
  initTree();
  initLife();
  initScen();
  initLive();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
