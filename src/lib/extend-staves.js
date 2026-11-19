// Доски бочки для вида техники: из замера (чип батареи, SMART, ответы хозяина) — остаток жизни каждой доски
// и замена, которая её продлит. Цены и сроки — src/data.js (EXTEND), формулы — src/lib/extend.js.
import { EXTEND } from '../data.js';
import { restLife, batteryLeft, batteryFresh, CAP_YEARS } from './extend.js';

const F = EXTEND.fixes;
const REST = {
  laptop: 'Остальное: плата, экран, корпус',
  phone: 'Остальное: плата, корпус',
  washer: 'Остальное: мотор, барабан, корпус',
};
const one = (v) => String(Math.round(v * 10) / 10).replace('.', ',');

// input: { age (лет), soh (0–1, здоровье батареи), disk: 'ssd' | 'hdd', slow, diskFail, screen: 'broken', fault: 'pump' | 'heater' | 'board' }
export function staves(kind, input) {
  const kd = EXTEND.kinds[kind];
  const age = Math.max(0, Number(input.age) || 0);
  const out = [];
  if ((kind === 'laptop' || kind === 'phone') && input.soh != null && age > 0) {
    const fix = kind === 'laptop' ? F.lapBattery : F.phoneBattery;
    out.push({
      id: 'battery', name: 'Батарея', rul: batteryLeft(input.soh, age),
      why: `${one(input.soh * 100)}% за ${one(age)} г. — ёмкость падает как корень из времени, порог ${Math.round(EXTEND.sohEnd * 100)}%`,
      fix: { ...fix, rul: batteryFresh(input.soh, age) },
    });
  }
  if (kind === 'laptop' && input.diskFail) {
    out.push({ id: 'disk', name: 'Диск', rul: 0, why: 'SMART: диск умирает', fix: { ...F.lapSsdBank, rul: CAP_YEARS } });
  } else if (kind === 'laptop' && input.disk === 'hdd') {
    // Тормозит, и диск механический — эта доска уже кончилась для хозяина; SSD из Банка деталей её чинит
    out.push({
      id: 'speed', name: 'Скорость: диск HDD', rul: input.slow ? 0 : CAP_YEARS,
      why: input.slow ? 'хозяин говорит «тормозит», диск механический' : 'диск механический, но скорость устраивает',
      fix: { ...F.lapSsdBank, rul: CAP_YEARS },
    });
  }
  if (kind === 'phone' && input.screen === 'broken') {
    out.push({ id: 'screen', name: 'Экран', rul: 0, why: 'разбит', fix: { ...F.phoneScreenBank, rul: CAP_YEARS } });
  }
  if (kind === 'washer' && input.fault && EXTEND.faults[input.fault]) {
    const f = EXTEND.faults[input.fault];
    out.push({ id: input.fault, name: f.name, rul: 0, why: f.symptom, fix: { ...F[f.fix], rul: CAP_YEARS } });
  }
  out.push({ id: 'rest', name: REST[kind], rul: restLife(age, kd.life), why: `средний срок службы — ${one(kd.life)} г., вещи ${one(age)} г.` });
  return out;
}
