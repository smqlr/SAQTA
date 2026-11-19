// Этап 4 «Продли»: сколько вещи осталось жить, какая деталь убьёт её первой и стоит ли эту деталь менять.
// Формулы и источники — README, раздел «Этап 4. Сокращение»; цифры — extend/model/extend-model.mjs.
//
// Вещь живёт, пока живы все её «доски» (бочка Либиха; в теории надёжности — последовательная система): T = min Tᵢ.
// Доска — батарея, диск, экран, насос… и «остальное» (плата, корпус), у которого замены нет.
// Менять имеет смысл только самые короткие доски, по порядку: пропустить короткую и заменить длинную — заплатить
// и не получить ни дня. Из этих вариантов берём самый дешёвый год жизни и сравниваем с годом жизни новой вещи.

export const CAP_YEARS = 10; // README: ни одной доске не обещаем больше 10 лет
export const SOH_END = 0.8; // README: батарея рассчитана до 80% ёмкости (Apple: 80% после 500 или 1 000 циклов; чип MacBook сам хранит 1 000)
export const MIN_GAIN = 1; // README: ремонт, который добавляет меньше года, — не продление

const HALF_SQRT_PI = Math.sqrt(Math.PI) / 2; // Γ(1,5)
export const capYears = (t) => Math.min(CAP_YEARS, Math.max(0, t));

// erfcx(x) = e^(x²)·erfc(x). Приближение erfcc из Numerical Recipes (ошибка < 1,2·10⁻⁷); e^(−x²) сокращается,
// поэтому переполнения нет при любом возрасте вещи.
export function erfcx(x) {
  if (x < 0) return 2 * Math.exp(x * x) - erfcx(-x);
  const t = 1 / (1 + 0.5 * x);
  return t * Math.exp(-1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806
    + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
}

// «Остальное» вещи возраста age, если средний срок службы вида — L лет. Срок службы — распределение Вейбулла формы 2
// (износ растёт с возрастом). Средний остаток жизни: L · erfcx(age/λ), λ = L / Γ(1,5). Новой вещи — ровно L,
// старой — меньше, но не ноль: вещь, дожившая до 8 лет, в среднем живёт ещё сколько-то.
export function restLife(age, L) {
  if (!(L > 0)) return 0;
  return capYears(L * erfcx((Math.max(0, age || 0) * HALF_SQRT_PI) / L));
}

// Батарея: потеря ёмкости растёт как корень из времени — плёнка SEI на аноде толстеет как √t (Ploehn, Ramadass, White, 2004).
// 1 − SoH = b·√t, поэтому по одному замеру (здоровье и возраст) видно, когда батарея ЭТОГО хозяина дойдёт до 80%.
export function batteryEnd(soh, age, end = SOH_END) {
  if (!(age > 0) || !(soh > 0)) return null;
  if (soh >= 1) return Infinity;
  return age * ((1 - end) / (1 - soh)) ** 2;
}
export function batteryLeft(soh, age, end = SOH_END) {
  const t = batteryEnd(soh, age, end);
  return t == null ? null : capYears(t - age);
}
// Новая батарея у того же хозяина (та же нагрузка) дойдёт до 80% за то же время tEnd.
// Пакет из Банка деталей со здоровьем p уже прошёл часть пути: ему остаётся tEnd · (1 − ((1 − p)/(1 − 0,8))²).
export function batteryFresh(soh, age, { donorSoh = 1, end = SOH_END } = {}) {
  const t = batteryEnd(soh, age, end);
  if (t == null) return null;
  const used = donorSoh >= 1 ? 0 : ((1 - donorSoh) / (1 - end)) ** 2;
  return capYears(t * Math.max(0, 1 - used));
}

const r2 = (v) => Math.round(v * 100) / 100;
export const fixCost = (f) => (f ? (f.part || 0) + (f.work || 0) : 0);

// Решение бочки. stave: { id, name, rul (лет), fix?: { name, part, work, rul, kg } }.
// Вариант k — заменить k самых коротких досок: T = min(новые доски, оставшиеся старые), прибавка = T − T₀,
// цена года = сумма замен / прибавка. Лучший вариант — самый дешёвый год среди тех, что дают не меньше minGain.
// Вердикт: «ok» — вещь проживёт год и больше без ремонта; «extend» — продление дешевле нового;
// «replace» — продлевать нечем или невыгодно: тогда вещь сдаём, и её детали продлевают другие вещи.
export function decide(staves, { newPrice, life, kg = 0, minGain = MIN_GAIN } = {}) {
  const list = staves
    .map((s) => ({ ...s, rul: capYears(s.rul), fix: s.fix ? { ...s.fix, rul: capYears(s.fix.rul), cost: fixCost(s.fix) } : null }))
    .sort((a, b) => a.rul - b.rul || (a.fix ? 0 : 1) - (b.fix ? 0 : 1));
  const T0 = list.length ? list[0].rul : 0;
  const options = [];
  let cost = 0;
  for (let k = 0; k < list.length && list[k].fix; k++) {
    cost += list[k].fix.cost;
    const done = list.slice(0, k + 1);
    const T = Math.min(...done.map((s) => s.fix.rul), ...list.slice(k + 1).map((s) => s.rul));
    const gain = T - T0;
    options.push({ k: k + 1, fixes: done.map((s) => s.id), cost, T, gain, perYear: gain > 1e-9 ? cost / gain : Infinity });
  }
  const valid = options.filter((o) => o.gain >= minGain - 1e-9);
  const best = valid.reduce((a, o) => (!a || o.perYear < a.perYear - 1e-9 ? o : a), null);
  const newPerYear = newPrice > 0 && life > 0 ? newPrice / life : null;
  const verdict = T0 >= minGain ? 'ok' : best && newPerYear != null && best.perYear < newPerYear ? 'extend' : 'replace';
  const removedKg = best ? list.filter((s) => best.fixes.includes(s.id)).reduce((a, s) => a + (s.fix.kg || 0), 0) : 0;
  return {
    staves: list, T0, weakest: list[0] || null, options, best, newPerYear, verdict,
    ratio: verdict === 'extend' ? newPerYear / best.perYear : null,
    // Отходы, которые не родятся: вещь массой m живёт на ΔL дольше → её замена сдвигается, навсегда это m·ΔL/L, минус снятые детали
    kgSaved: verdict === 'extend' && life > 0 ? Math.max(0, r2((kg * best.gain) / life - removedKg)) : 0,
    // Сколько хозяин сохранит за добавленные годы: год жизни новой минус год жизни продлённой
    saved: verdict === 'extend' ? Math.round((newPerYear - best.perYear) * best.gain) : 0,
  };
}

// Закон минимума (Либих) для парка одинаковых вещей — класс ноутбуков одной закупки.
// Детали одного вида взаимозаменяемы, поэтому без покупок собирается столько рабочих вещей, сколько живых деталей
// самого редкого вида. Каждая следующая требует купить недостающие детали: её цена растёт ступеньками.
// Собираем, пока год жизни очередной вещи дешевле года новой. part: { id, name, alive, price } — price null:
// деталь не покупаем (плата — сама вещь), поэтому вещей не больше, чем таких деталей.
export function fleet({ n, parts, perUnit = 0, years, newPrice, life }) {
  const hard = parts.filter((p) => p.price == null);
  const maxUnits = Math.min(n, ...hard.map((p) => p.alive));
  const free = Math.max(0, Math.min(maxUnits, ...parts.map((p) => p.alive)));
  const scarce = parts.reduce((a, p) => (p.alive < a.alive ? p : a), parts[0]);
  const newPerYear = newPrice / life;
  const units = [];
  for (let u = 1; u <= maxUnits; u++) {
    const buy = parts.filter((p) => p.price != null && u > p.alive);
    const marginal = perUnit + buy.reduce((a, p) => a + p.price, 0);
    units.push({ u, buy: buy.map((p) => p.id), marginal, perYear: years > 0 ? marginal / years : Infinity });
  }
  const built = [];
  for (const x of units) { if (x.perYear < newPerYear) built.push(x); else break; } // цена ступенькой растёт — дальше только дороже
  const cost = built.reduce((a, x) => a + x.marginal, 0);
  const missing = Object.fromEntries(parts.filter((p) => p.price != null).map((p) => [p.id, Math.max(0, built.length - p.alive)]));
  return {
    n, maxUnits, free, scarce, units, built: built.length, cost,
    perYear: built.length ? cost / built.length / years : null, newPerYear, missing,
    donors: n - built.length, // несобранные — доноры: их живые детали идут в Банк деталей
  };
}

// Город: отходов в год W = N·m/L. Если вся техника живёт на долю x дольше, отходов в год становится W·x/(1+x) меньше.
export const lessWaste = (W, x) => (W * x) / (1 + x);
