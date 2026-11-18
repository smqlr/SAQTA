// Ожидаемая ценность детали — формула из документации («Экономика одного устройства»):
// EV = P(работает) × цена × P(купят за 60 дней) − t_мин × 60. Деталь снимаем, только если EV > 0.
import { EV } from '../data.js';

export function pSell(part) {
  if (part.hasOrder == null) return null;
  return part.hasOrder ? EV.pSellWithOrder : EV.pSellNoOrder;
}

export function expectedValue(part) {
  const ps = pSell(part);
  if (part.pWorks == null || part.price == null || part.minutes == null || ps == null) return null;
  return Math.round(part.pWorks * part.price * ps - part.minutes * EV.tengePerMinute);
}

export function decision(ev) {
  if (ev == null) return { take: null, label: 'уточняется' };
  return ev > 0 ? { take: true, label: 'снимаем' } : { take: false, label: 'оставляем' };
}

// Строка расчёта для показа на экране: «0,7 × 4 000 × 0,9 − 6 × 60 = +2 160 ₸»
export function evExplain(part, num) {
  const ps = pSell(part);
  const f = (v) => (v == null ? '?' : String(v).replace('.', ','));
  const ev = expectedValue(part);
  const left = `${f(part.pWorks)} × ${part.price == null ? '?' : num(part.price)} × ${f(ps)} − ${f(part.minutes)} × ${EV.tengePerMinute}`;
  if (ev == null) return `${left} = уточняется`;
  return `${left} = ${ev > 0 ? '+' : '−'}${num(Math.abs(ev))} ₸`;
}
