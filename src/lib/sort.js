// Этап 3 «Сортировка»: дерево разборки и оптимальная глубина.
// Каждый узел дерева можно продать целиком в свой бин или вскрыть. Ценность узла считаем снизу вверх
// (динамическое программирование):
//   V(узел) = max( m × цена бина,  Σ лучших решений по частям − t × 60 ₸ )
// Для вскрытого корпуса (access) каждая часть либо снимается (её V минус время снятия), либо остаётся внутри
// и продаётся вместе с корпусом по его цене. Для разборки «всё или ничего» (split) части расходятся все.
// Батарея после вскрытия снимается всегда (must): в бин скупщика вещь с батареей не попадает.
import { SORT_BINS, SORT_TREES, SORT_TREE_OF, SORT_TREE_BY_EXAMPLE, RAW, EV, TYPE_KG, WEIGHT_KG } from '../data.js';

const r2 = (v) => Math.round(v * 100) / 100;
const r3 = (v) => Math.round(v * 1000) / 1000;

export const binOf = (id) => SORT_BINS.find((b) => b.id === id);

// Цена «целиком переработчику» — по виду техники из модели команды (RAW), для мелочи — «мелкая бытовая»
export function wholePrice(type) {
  return (RAW.find((r) => r.id === type) || RAW.find((r) => r.id === 'small')).perKg;
}

export function priceOf(binId, ctx) {
  if (binId === 'whole') return wholePrice(ctx.type);
  if (ctx.prices && ctx.prices[binId] != null) return ctx.prices[binId];
  return binOf(binId).price;
}

const openable = (n) => !!(n.access || n.split) && !!n.children?.length;
const stepOf = (n) => n.split || n.access;

// Масса узла: сумма листьев, без деталей, снятых на этапе 2
export function massOf(node, ctx) {
  if (ctx.removed?.has(node.id)) return 0;
  let m = node.typeKg ? ctx.typeKg : node.kg || 0;
  if (node.cells && ctx.cellsTaken) m -= node.cells.kg;
  for (const c of node.children || []) m += massOf(c, ctx);
  return r3(Math.max(0, m));
}

const live = (node, ctx) => (node.children || []).filter((c) => massOf(c, ctx) > 0);
const openMin = (node, ctx) => (ctx.opened?.has(node.id) ? 0 : stepOf(node).min);

export function solve(node, ctx) {
  const m = massOf(node, ctx);
  const p = priceOf(node.sell, ctx);
  const sell = r2(m * p);
  const res = { node, m, p, sell, value: sell, decision: 'sell', open: null, cost: 0, kids: [] };
  const kids = live(node, ctx);
  if (!openable(node) || !kids.length) return res;
  const cost = openMin(node, ctx) * ctx.rate;
  let open = -cost;
  let subs;
  if (node.split) {
    subs = kids.map((c) => ({ ...solve(c, ctx), taken: true, takeCost: 0 }));
    open += subs.reduce((a, s) => a + s.value, 0);
  } else {
    open += (m - kids.reduce((a, c) => a + massOf(c, ctx), 0)) * p; // то, что не делится на части, остаётся в корпусе
    subs = kids.map((c) => {
      const s = solve(c, ctx);
      const takeCost = (c.take || 0) * ctx.rate;
      const takeVal = r2(s.value - takeCost);
      const stayVal = r2(s.m * p);
      // часть без своего времени снятия (take 0) — это сам корпус: берём, если не хуже, чтобы показать его дальнейшие шаги
      const taken = !!c.must || takeVal > stayVal || (!c.take && takeVal === stayVal);
      open += taken ? takeVal : stayVal;
      return { ...s, taken, takeCost, takeVal, stayVal };
    });
  }
  res.open = r2(open);
  res.cost = cost;
  res.subs = subs;
  // уже вскрыто на этапе 2 (вскрытие бесплатно) — при равной ценности показываем следующие шаги
  if (res.open > sell || (cost === 0 && res.open >= sell)) Object.assign(res, { value: res.open, decision: 'open', kids: subs });
  return res;
}

// Что в какой бин уходит после решения
export function fragments(res, ctx, out = []) {
  if (res.decision === 'sell') {
    out.push({ bin: res.node.sell, kg: res.m, value: res.sell, name: res.node.name, battery: hasBattery(res.node, ctx) });
    return out;
  }
  let stay = res.m;
  let stayBattery = false;
  for (const k of res.kids) {
    stay -= k.m;
    if (k.taken) fragments(k, ctx, out);
    else { stay += k.m; stayBattery = stayBattery || hasBattery(k.node, ctx); }
  }
  stay = r3(stay);
  if (stay > 0.0005) out.push({ bin: res.node.sell, kg: stay, value: r2(stay * res.p), name: `${res.node.name}: остаток`, battery: stayBattery });
  return out;
}

// Есть ли в узле батарея (для паспорта партии: Li-ion внутри → упаковка UN3481)
function hasBattery(node, ctx) {
  if (massOf(node, ctx) <= 0) return false;
  if (node.sell === 'batt') return true;
  return (node.children || []).some((c) => hasBattery(c, ctx));
}

// Решения по шагам — для таблицы в карточке устройства
export function rows(res, ctx, depth = 0, out = []) {
  const n = res.node;
  if (res.open == null) return out;
  const step = stepOf(n);
  const done2 = ctx.opened?.has(n.id); // шаг уже сделан на этапе 2
  if ((step.min > 0 || n.split) && !(done2 && res.decision !== 'open')) {
    out.push({ id: n.id, kind: 'open', label: done2 ? `${step.label} — сделано на этапе 2` : step.label, min: res.cost / ctx.rate, do: res.decision === 'open', gain: r2(res.open - res.sell), depth, threshold: res.decision === 'open' ? null : threshold(res), done2 });
  }
  if (res.decision !== 'open') return out;
  for (const k of res.kids) {
    if (n.access && (k.node.take || k.node.must)) {
      out.push({
        id: k.node.id, kind: 'take', label: k.node.label || `Вынуть: ${k.node.name.toLowerCase()}`, min: k.takeCost / ctx.rate,
        do: k.taken, must: !!k.node.must, to: k.decision === 'sell' ? k.node.sell : null, value: k.taken ? k.takeVal : k.stayVal,
        gain: r2(k.takeVal - k.stayVal), depth: depth + 1, kg: k.m,
      });
    } else if (k.decision === 'sell') {
      out.push({ id: k.node.id, kind: 'part', label: k.node.name, min: 0, do: true, to: k.node.sell, value: k.sell, gain: null, depth: depth + 1, kg: k.m });
    }
    if (k.taken !== false) rows(k, ctx, depth + 1, out);
  }
  return out;
}

// Порог: при какой цене бина самой ценной части вскрытие станет выгодным (для подписи «вынимаем, если…»)
export function threshold(res) {
  const subs = res.subs || [];
  const best = subs.filter((s) => s.node.sell !== 'whole' && s.node.sell !== 'rest' && s.node.sell !== 'batt' && s.m > 0)
    .sort((a, b) => b.sell - a.sell)[0];
  if (!best || res.open == null) return null;
  const need = res.sell - res.open; // сколько не хватает
  return { bin: best.node.sell, part: best.node.name, price: Math.ceil(best.p + need / best.m) };
}

// Полная разборка: вскрыть всё, снять всё
export function fullValue(node, ctx) {
  const kids = live(node, ctx);
  const m = massOf(node, ctx);
  if (!openable(node) || !kids.length) return { value: r2(m * priceOf(node.sell, ctx)), min: 0 };
  let min = openMin(node, ctx);
  let value = -min * ctx.rate;
  if (!node.split) value += (m - kids.reduce((a, c) => a + massOf(c, ctx), 0)) * priceOf(node.sell, ctx);
  for (const c of kids) {
    const f = fullValue(c, ctx);
    const t = node.split ? 0 : c.take || 0;
    value += f.value - t * ctx.rate;
    min += f.min + t;
  }
  return { value: r2(value), min: r2(min) };
}

function minutesOf(res, rate) {
  if (res.decision !== 'open') return 0;
  let t = res.cost / rate;
  for (const k of res.kids) if (k.taken) t += k.takeCost / rate + minutesOf(k, rate);
  return t;
}

export function treeIdFor(item) {
  if (item.tag === 'danger') return 'cells';
  return SORT_TREE_BY_EXAMPLE[item.exampleId] || SORT_TREE_OF[item.type] || 'small';
}

function walk(node, fn) {
  fn(node);
  for (const c of node.children || []) walk(c, fn);
}

// План сортировки вещи: дерево по виду, детали этапа 2 уже сняты, цены — табло хаба
export function planFor(item, { bankParts = [], prices = {}, rate = EV.tengePerMinute } = {}) {
  const treeId = treeIdFor(item);
  const tree = SORT_TREES[treeId];
  const removed = new Set();
  const opened = new Set();
  let cellsTaken = false;
  const has = (re) => bankParts.some((p) => new RegExp(re, 'i').test(p));
  walk(tree, (n) => {
    if (n.part && has(n.part)) { removed.add(n.id); (n.did || []).forEach((id) => opened.add(id)); }
    if (n.cells && has(n.cells.part)) { cellsTaken = true; (n.cells.did || []).forEach((id) => opened.add(id)); }
  });
  // Паспорт QAITA Доктора знает производителя: у MacBook память и SSD распаяны на плате — снимать нечего
  const soldered = /apple/i.test(item.soh?.passport?.device?.vendor || '');
  if (soldered) ['lpRam', 'lpSsd'].forEach((id) => removed.add(id));
  const ctx = { type: item.type, prices, rate, removed, opened, cellsTaken, typeKg: TYPE_KG[item.type] ?? WEIGHT_KG.hubAvg };
  const res = solve(tree, ctx);
  const frags = fragments(res, ctx);
  const full = fullValue(tree, ctx);
  return {
    treeId, tree, ctx, res, frags,
    value: res.value, asIs: res.sell, full: full.value, fullMin: full.min,
    minutes: r2(minutesOf(res, rate)), kg: res.m,
    rows: rows(res, ctx),
    liionInside: frags.some((f) => f.bin === 'whole' && f.battery),
    stage2: removed.size + (cellsTaken ? 1 : 0), soldered,
  };
}

// Перебор всех вариантов разборки — для проверки, что динамическое программирование находит максимум
export function allValues(node, ctx) {
  const m = massOf(node, ctx);
  const p = priceOf(node.sell, ctx);
  const out = [r2(m * p)];
  const kids = live(node, ctx);
  if (!openable(node) || !kids.length) return out;
  const cost = openMin(node, ctx) * ctx.rate;
  let sums = [node.split ? -cost : -cost + (m - kids.reduce((a, c) => a + massOf(c, ctx), 0)) * p];
  for (const c of kids) {
    const vs = allValues(c, ctx);
    const opts = node.split ? vs : [...vs.map((v) => v - (c.take || 0) * ctx.rate), ...(c.must ? [] : [massOf(c, ctx) * p])];
    const next = [];
    for (const s of sums) for (const o of opts) next.push(s + o);
    sums = next;
  }
  return out.concat(sums.map(r2));
}
