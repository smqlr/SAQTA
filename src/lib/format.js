// Форматирование чисел и дат по-русски.
const nf = new Intl.NumberFormat('ru-RU');
const nf1 = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const num = (n) => (n == null ? '—' : nf.format(n));
export const num1 = (n) => (n == null ? '—' : nf1.format(n));
export const num2 = (n) => (n == null ? '—' : nf2.format(n));
export const tenge = (n) => (n == null ? 'уточняется' : `${nf.format(n)} ₸`);
export const signed = (n) => (n > 0 ? `+${nf.format(n)}` : n < 0 ? `−${nf.format(Math.abs(n))}` : '0');
export const pct = (p) => `${nf.format(Math.round(p * 100))}%`;

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

const dtf = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const df = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' });
export const dateTime = (ts) => dtf.format(new Date(ts));
export const dateOnly = (ts) => df.format(new Date(ts));

export const DAY = 24 * 60 * 60 * 1000;
export const pad = (n, w = 6) => String(n).padStart(w, '0');
