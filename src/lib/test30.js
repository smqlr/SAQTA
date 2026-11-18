// ТЕСТ-30 — симуляция стенда по физической модели ячейки 18650.
// Стенд даёт короткий импульс нагрузки через резистор 2 Ом и смотрит просадку напряжения:
// R0 = (U без нагрузки − U под нагрузкой) / I   (формула из документации).
// Модель ячейки: ЭДС U0, омическое сопротивление R0, поляризация R1 с постоянной времени τ,
// нагрев ΔT = I²·(R0+R1)·t / (m·c) плюс дефектный нагрев у плохих ячеек.
// Это СИМУЛЯЦИЯ: параметры ячеек случайные (с зерном), пороги грейдов — из документации.
import { TEST30 } from '../data.js';

function rng(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const PROTOCOL = { onAt: 4, offAt: 24, dt: 0.25 }; // демо: импульс 20 с внутри окна 30 с
const MASS_KG = 0.045; // демо: масса ячейки 18650 для модели нагрева
const HEAT_CAP = 1000; // демо: удельная теплоёмкость, Дж/(кг·К)

export function grade({ soh, rMilliOhm, u0, heatC }) {
  const { gradeA, gradeB, gradeC } = TEST30;
  if (u0 < gradeC.minVolt || heatC > gradeC.maxHeatC) return 'C';
  if (soh >= gradeA.soh && rMilliOhm <= gradeA.rMilliOhm) return 'A';
  if (soh >= gradeB.soh && rMilliOhm <= gradeB.rMilliOhm) return 'B';
  return 'C';
}

function makeCell(rand, i) {
  // Большинство ячеек из батареи с SoH ≥ 60% — рабочие; несколько дефектных для реализма.
  const roll = rand();
  let soh = 62 + rand() * 34;
  let r0 = 0.035 + (100 - soh) * 0.0022 + (rand() - 0.5) * 0.012; // Ом
  let u0 = 3.55 + rand() * 0.55;
  let defectHeat = 0;
  if (roll < 0.08) { r0 += 0.09 + rand() * 0.08; soh -= 8 + rand() * 6; } // высокое сопротивление
  else if (roll < 0.13) { u0 = 1.6 + rand() * 0.8; } // глубокий разряд
  else if (roll < 0.17) { defectHeat = 2.2 + rand() * 1.5; } // самонагрев
  const r1 = 0.012 + (100 - soh) * 0.0006 + rand() * 0.006;
  const tau = 3 + rand() * 4;
  return { id: i + 1, trueSoh: soh, r0, r1, tau, u0, defectHeat };
}

function simulate(cell, rand) {
  const { onAt, offAt, dt } = PROTOCOL;
  const R = TEST30.loadOhm;
  const I = cell.u0 / (R + cell.r0 + cell.r1);
  const points = [];
  let heat = 0;
  for (let t = 0; t <= TEST30.seconds + 1e-9; t += dt) {
    let u;
    if (t < onAt) u = cell.u0;
    else if (t < offAt) {
      const k = 1 - Math.exp(-(t - onAt) / cell.tau);
      u = cell.u0 - I * cell.r0 - I * cell.r1 * k - 0.0006 * (t - onAt);
      heat += (I * I * (cell.r0 + cell.r1) * dt) / (MASS_KG * HEAT_CAP);
    } else {
      const kOn = 1 - Math.exp(-(offAt - onAt) / cell.tau);
      const k = kOn * Math.exp(-(t - offAt) / cell.tau);
      u = cell.u0 - 0.0006 * (offAt - onAt) - I * cell.r1 * k;
    }
    const noise = (rand() - 0.5) * 0.002;
    points.push({ t: Math.round(t * 100) / 100, u: Math.round((u + noise) * 1000) / 1000 });
  }
  const before = points.find((p) => p.t >= onAt - PROTOCOL.dt).u;
  const after = points.find((p) => p.t >= onAt).u;
  const rMilliOhm = Math.max(1, Math.round(((before - after) / I) * 1000));
  const soh = Math.round(Math.min(100, Math.max(0, cell.trueSoh + (rand() - 0.5) * 3)));
  const heatC = Math.round((heat + cell.defectHeat) * 10) / 10;
  const res = { id: cell.id, points, current: Math.round(I * 100) / 100, uOpen: Math.round(cell.u0 * 100) / 100, rMilliOhm, soh, heatC };
  res.grade = grade({ soh, rMilliOhm, u0: cell.u0, heatC });
  return res;
}

export function runTest30(seed = 30) {
  const rand = rng(seed);
  const cells = Array.from({ length: TEST30.cells }, (_, i) => makeCell(rand, i));
  const results = cells.map((c) => simulate(c, rand));
  const count = { A: 0, B: 0, C: 0 };
  results.forEach((r) => count[r.grade]++);
  return { seed, results, count, protocol: PROTOCOL };
}
