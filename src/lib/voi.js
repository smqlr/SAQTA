// Ценность проверки (ЦП) — сколько в среднем может сэкономить проверка детали до снятия.
// Без проверки мы и так выбираем лучшее из двух: снять деталь (EV) или оставить (0).
// Проверка спасает только от двух ошибок:
//   снять нерабочую деталь — теряем (1 − P) × K;
//   оставить рабочую       — теряем P × (V − K).
// Мы уже выбираем меньшую из них, поэтому даже идеальная проверка стоит не больше:
//   ЦП = min((1 − P) × K, P × (V − K)), если V > K; иначе 0 — рабочая деталь всё равно не окупается.
// Здесь V = цена × P(купят), K = минуты × 60 ₸ — те же числа, что в формуле EV из документации.
// Проверку делаем, только если ЦП больше её цены. Безопасность и стирание данных — вне этой экономики.
import { EV, CHECK } from '../data.js';
import { pSell } from './ev.js';

const rate = () => EV.tengePerMinute;

// V и K детали; null, если данных нет (в документации цифры нет → не показываем)
export function partVK(part) {
  const ps = pSell(part);
  if (part.pWorks == null || part.price == null || part.minutes == null || ps == null) return null;
  return { P: part.pWorks, V: part.price * ps, K: part.minutes * rate() };
}

export function checkValue(part) {
  const vk = partVK(part);
  if (!vk) return null;
  const { P, V, K } = vk;
  if (V <= K) return 0;
  return Math.round(Math.min((1 - P) * K, P * (V - K)));
}

// Какая из двух ошибок меньше — для подписи на экране
export function checkValueExplain(part, num) {
  const vk = partVK(part);
  if (!vk) return null;
  const { P, V, K } = vk;
  const f = (v) => String(Math.round(v * 100) / 100).replace('.', ',');
  if (V <= K) return `рабочая деталь даёт ${num(Math.round(V))} ₸ при работе на ${num(K)} ₸ — не окупается при любом ответе`;
  const lossTake = (1 - P) * K;
  const lossLeave = P * (V - K);
  return lossTake <= lossLeave
    ? `снимаем в любом случае; проверка спасла бы только от снятия нерабочей: (1 − ${f(P)}) × ${num(K)} = ${num(Math.round(lossTake))} ₸`
    : `оставляем в любом случае; проверка спасла бы только рабочую: ${f(P)} × (${num(Math.round(V))} − ${num(K)}) = ${num(Math.round(lossLeave))} ₸`;
}

// Решение о проверке: ЦП против её цены в минутах человека
export function checkDecision(part, checkMin) {
  const v = checkValue(part);
  if (v == null) return { run: null, value: null, cost: null };
  const cost = Math.round(checkMin * rate());
  return { run: v > cost, value: v, cost };
}

// Чип батареи перед вскрытием пакета.
// Вслепую: вскрываем, если в среднем окупается: P(пакет годен) × P(ячейки живы) × V − K.
// С чипом: негодный пакет (SoH < 60%) не вскрываем, годный вскрываем — платим только за чтение чипа.
export function packChipValue({ pGood = CHECK.packGoodShare, pCells, V, K, chipMin = CHECK.chipMin }) {
  const blind = Math.max(0, pGood * pCells * V - K);
  const good = Math.max(0, pCells * V - K);
  const chipCost = chipMin * rate();
  const withChip = pGood * good - chipCost;
  return {
    blind: Math.round(blind),
    withChip: Math.round(withChip),
    value: Math.round(pGood * good - blind),
    chipCost: Math.round(chipCost),
    run: pGood * good - blind > chipCost,
  };
}
