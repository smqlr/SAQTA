// ТЕСТ-30 — симуляция стенда по физической модели ячейки 18650.
//
// Что меряет импульс, а что нет. За 30 секунд ёмкость не измерить: для неё нужен полный разряд с подсчётом мА·ч.
// Импульс меряет сопротивление, напряжение покоя и нагрев. Ёмкость ячейка «наследует» от чипа своего пакета:
// газомер мерил её годами (кулоновский счёт Q = ∫ I dt). Это оценка снизу — пакет ограничен самой слабой группой.
// Ячейка, чьё сопротивление выбивается из соседей по пакету, оценку не наследует: она «спорная» и идёт на полный
// цикл Lii-500. Ячейки без чипа (пауэрбанки, россыпь) — тоже. Без измеренной ёмкости грейд A или B не ставим.
//
// Протокол (README, «ТЕСТ-30»): 4 с покоя → импульс 20 с через резистор 2 Ом → 6 с восстановления.
// R = (U покоя − U через 1 с импульса) / I — по двум точкам, как метод DC в IEC 61960 (там 0,2C 10 с, затем 1C 1 с;
// у нас первая точка — покой).
// Стенд подключён двумя проводами, поэтому в показания входят провода и контакты держателя (здесь 18–32 мОм).
// Каждое утро эталонная ячейка проходит все 16 слотов: разница её показаний — поправка слота, её вычитаем.
// R в пределах ±10 мОм от порога грейда — ячейку переставляем и меряем ещё раз.
// Модель ячейки: ЭДС U0, омическое R0, поляризация R1 с постоянной τ (схема Тевенина), нагрев ΔT = I²·(R0+R1)·t / (m·c).
// Это СИМУЛЯЦИЯ: параметры ячеек случайные (с зерном), пороги грейдов — из документации, правила — из README.
import { TEST30, CHECK } from '../data.js';

function rng(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
const gauss = (rand) => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const { restSec, loadSec, readAtSec } = CHECK.pulse;
const PROTOCOL = { onAt: restSec, offAt: restSec + loadSec, readAt: readAtSec, dt: 0.25 };
const MASS_KG = 0.045; // демо: масса ячейки 18650 для модели нагрева
const HEAT_CAP = 1000; // демо: удельная теплоёмкость, Дж/(кг·К)
const INA_LSB = 0.004; // README: шаг INA219 по напряжению шины — 4 мВ (даташит TI)
const AVG = 8; // демо: замеров на точку покоя и точку «через 1 с» — шум усредняется

// Пачка на стенде — ячейки из нескольких пакетов (демо). Пакет «A» — устройство из хаба: здоровье из «Спроси устройство».
const DEMO_PACKS = [
  { id: 'A', label: 'этот ноутбук', soh: 88, n: 3 }, // демо: 88% — если устройство не выбрано
  { id: 'B', label: 'пакет HP', soh: 84, n: 6, outlier: 1 }, // демо: одна ячейка выбивается по сопротивлению
  { id: 'C', label: 'пакет Acer', soh: 71, n: 5, deep: 2 }, // демо: одна ячейка глубоко разряжена
  { id: 'D', label: 'пауэрбанк', soh: null, n: 2, heat: 0 }, // демо: у пауэрбанка нет чипа; одна ячейка греется
];

export function grade({ soh, rMilliOhm, u0, heatC }) {
  const { gradeA, gradeB, gradeC } = TEST30;
  if (u0 < gradeC.minVolt || heatC > gradeC.maxHeatC) return 'C';
  if (soh == null) return rMilliOhm > gradeB.rMilliOhm ? 'C' : '?'; // ёмкость неизвестна → полный цикл Lii-500
  if (soh >= gradeA.soh && rMilliOhm <= gradeA.rMilliOhm) return 'A';
  if (soh >= gradeB.soh && rMilliOhm <= gradeB.rMilliOhm) return 'B';
  return 'C';
}

function makeCell(rand, pack, k) {
  const base = pack.soh ?? 70 + rand() * 20; // у модели ёмкость есть всегда; стенд её не видит
  let soh = clamp(base + gauss(rand) * 1.5, 40, 100);
  let r0 = 0.034 + 0.0017 * (100 - soh) + (rand() - 0.5) * 0.006; // Ом
  let u0 = 3.62 + rand() * 0.42; // В: хранение при 30–60% заряда
  let defectHeat = 0;
  let defect = null;
  if (pack.outlier === k) { r0 *= 1.6; soh -= 10 + rand() * 4; defect = 'сопротивление выше соседей'; }
  if (pack.deep === k) { u0 = 1.7 + rand() * 0.6; defect = 'глубокий разряд'; }
  if (pack.heat === k) { defectHeat = 2.4 + rand() * 1.2; defect = 'самонагрев'; }
  const r1 = 0.012 + 0.0006 * (100 - soh) + rand() * 0.004;
  const tau = 3 + rand() * 4;
  return { trueSoh: soh, r0, r1, tau, u0, defectHeat, defect };
}

// Напряжение на стенде: ячейка минус падение на проводах и контактах слота
function voltageAt(cell, t, I, rWire) {
  const { onAt, offAt } = PROTOCOL;
  const drift = 0.0006; // В/с: ячейка разряжается под нагрузкой
  if (t < onAt) return cell.u0;
  if (t < offAt) {
    const k = 1 - Math.exp(-(t - onAt) / cell.tau);
    return cell.u0 - I * (cell.r0 + rWire) - I * cell.r1 * k - drift * (t - onAt);
  }
  const kOn = 1 - Math.exp(-(offAt - onAt) / cell.tau);
  return cell.u0 - drift * (offAt - onAt) - I * cell.r1 * kOn * Math.exp(-(t - offAt) / cell.tau);
}
const reading = (v, rand, n = 1) => Math.round((v + ((rand() - 0.5) * 0.004) / Math.sqrt(n)) / (n > 1 ? 0.001 : INA_LSB)) * (n > 1 ? 0.001 : INA_LSB);

function measure(cell, slot, rand) {
  const { onAt, offAt, readAt, dt } = PROTOCOL;
  const contact = () => Math.abs(gauss(rand)) * 0.002; // Ом: контакт меняется при каждой установке
  const once = () => {
    const rWire = slot.rFix + contact();
    const I = cell.u0 / (TEST30.loadOhm + cell.r0 + rWire);
    const uRest = reading(voltageAt(cell, onAt - 0.1, I, rWire), rand, AVG);
    const uLoad = reading(voltageAt(cell, onAt + readAt, I, rWire), rand, AVG);
    return { I, rWire, rMeas: (uRest - uLoad) / I };
  };
  const first = once();
  let rCal = first.rMeas - slot.rFixCal;
  let retested = false;
  const near = (r) => [TEST30.gradeA.rMilliOhm, TEST30.gradeB.rMilliOhm].some((th) => Math.abs(r * 1000 - th) <= CHECK.nearMOhm);
  if (near(rCal)) {
    const second = once();
    rCal = (rCal + (second.rMeas - slot.rFixCal)) / 2;
    retested = true;
  }
  const I = first.I;
  const points = [];
  for (let t = 0; t <= TEST30.seconds + 1e-9; t += dt) {
    points.push({ t: Math.round(t * 100) / 100, u: Math.round(reading(voltageAt(cell, t, I, first.rWire), rand) * 1000) / 1000 });
  }
  const heat = (I * I * (cell.r0 + cell.r1) * (offAt - onAt)) / (MASS_KG * HEAT_CAP) + cell.defectHeat;
  return { I, points, rMilliOhm: Math.max(1, Math.round(rCal * 1000)), heatC: Math.round(heat * 10) / 10, retested };
}

export function runTest30({ seed = 30, packSoh = null, packLabel = null } = {}) {
  const rand = rng(seed);
  const packs = DEMO_PACKS.map((p) => (p.id === 'A' ? { ...p, soh: packSoh ?? p.soh, label: packLabel || p.label } : p));
  const slots = Array.from({ length: TEST30.cells }, () => {
    const rFix = 0.018 + rand() * 0.014; // Ом: провода и контакты слота (двухпроводное подключение)
    return { rFix, rFixCal: rFix + (rand() - 0.5) * 0.003 }; // поправка слота по эталонной ячейке, ошибка ±1,5 мОм
  });
  const results = [];
  for (const pack of packs) {
    for (let k = 0; k < pack.n; k++) {
      const slot = slots[results.length];
      const cell = makeCell(rand, pack, k);
      const m = measure(cell, slot, rand);
      results.push({
        id: results.length + 1, pack: pack.id, packLabel: pack.label, packSoh: pack.soh, defect: cell.defect,
        points: m.points, current: Math.round(m.I * 100) / 100, uOpen: Math.round(cell.u0 * 100) / 100,
        rMilliOhm: m.rMilliOhm, heatC: m.heatC, retested: m.retested, rFixMilliOhm: Math.round(slot.rFix * 1000),
      });
    }
  }
  // Соседи по пакету: медиана сопротивления среди безопасных ячеек
  const safe = (r) => r.uOpen >= TEST30.gradeC.minVolt && r.heatC <= TEST30.gradeC.maxHeatC;
  const packSummary = packs.map((p) => {
    const rs = results.filter((r) => r.pack === p.id && safe(r)).map((r) => r.rMilliOhm);
    return { id: p.id, label: p.label, soh: p.soh, n: p.n, medianR: rs.length ? Math.round(median(rs)) : null };
  });
  for (const r of results) {
    const p = packSummary.find((x) => x.id === r.pack);
    r.rRel = p.medianR ? Math.round((r.rMilliOhm / p.medianR) * 100) / 100 : null;
    const inherits = p.soh != null && r.rRel != null && r.rRel <= CHECK.outlierRatio;
    r.soh = inherits ? Math.round(p.soh) : null;
    r.sohSrc = inherits ? 'чип пакета' : p.soh == null ? 'чипа нет' : 'выбивается из соседей';
    r.grade = grade({ soh: r.soh, rMilliOhm: r.rMilliOhm, u0: r.uOpen, heatC: r.heatC });
    r.reason = !safe(r)
      ? r.uOpen < TEST30.gradeC.minVolt ? `напряжение ${String(r.uOpen).replace('.', ',')} В < ${String(TEST30.gradeC.minVolt).replace('.', ',')} В` : `нагрев ${String(r.heatC).replace('.', ',')} °C`
      : r.grade === '?' ? 'ёмкость неизвестна → полный цикл Lii-500' : r.grade === 'C' ? 'не проходит пороги' : '';
  }
  const count = { A: 0, B: 0, C: 0, '?': 0 };
  results.forEach((r) => count[r.grade]++);
  const fix = slots.map((s) => Math.round(s.rFix * 1000));
  return { seed, results, count, packs: packSummary, protocol: PROTOCOL, slotFix: { min: Math.min(...fix), max: Math.max(...fix) } };
}
