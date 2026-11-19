// Профиль жителя и карта донора. Профиль хранится отдельно от данных демо:
// «Начать с нуля» обнуляет кошелёк и сдачи, но не стирает имя и номер карты.
// Номер карты — 12 цифр с контрольной цифрой по Луну. В рабочей версии номер выдаёт сервер.
import { LEVELS, TYPE_KG, WEIGHT_KG } from '../data.js';
import { ICON } from './icons.js';
import { qrSvg } from './qr.js';
import { esc, num } from './format.js';
import { sheet } from './ui.js';

const KEY = 'saqta-profile';
let prof = null;

function luhnDigit(s) {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    let d = +s[s.length - 1 - i];
    if (i % 2 === 0) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return (10 - (sum % 10)) % 10;
}
export function newCardId() {
  const r = new Uint32Array(4);
  (globalThis.crypto || window.crypto).getRandomValues(r);
  const body = `7${Array.from(r).map((n) => String(n % 1000).padStart(3, '0')).join('').slice(0, 10)}`;
  return body + luhnDigit(body);
}
export const validCardId = (id) => /^\d{12}$/.test(id) && luhnDigit(id.slice(0, 11)) === +id[11];
export const fmtCardId = (id) => String(id).replace(/(\d{4})(?=\d)/g, '$1 ');

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(prof)); } catch { /* без хранилища работаем в памяти */ }
}
export function getProfile() {
  if (prof) return prof;
  try { prof = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { prof = null; }
  if (!prof || !validCardId(prof.cardId || '')) {
    prof = { name: '', cardId: newCardId(), issuedTs: Date.now(), onboarded: false };
    save();
  }
  return prof;
}
export function setProfile(patch) {
  prof = { ...getProfile(), ...patch };
  save();
  return prof;
}
export const displayName = (p = getProfile()) => (p.name || '').trim() || 'Житель Актобе';
export const firstName = (p = getProfile()) => displayName(p).split(/\s+/)[0];
export const initials = (p = getProfile()) => displayName(p).split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// ── Вклад и уровень ─────────────────────────────────────────────────────────
const ACCEPTED = ['checked', 'sold', 'picked'];
export function contribution(st) {
  const acc = st.donations.filter((d) => ACCEPTED.includes(d.status));
  const kg = acc.reduce((s, d) => s + (TYPE_KG[d.type] ?? WEIGHT_KG.hubAvg), 0);
  const parts = st.bank.filter((p) => p.sold && p.donationId && st.donations.some((d) => d.id === p.donationId)).length;
  const lenovoParts = st.donations.some((d) => d.exampleId === 'lenovo' && d.status === 'sold') ? 3 : 0; // док: «спас 3 устройства»
  return { items: acc.length, all: st.donations.length, kg, saved: Math.max(parts, lenovoParts) };
}
export function levelOf(st) {
  const n = contribution(st).items;
  let lv = LEVELS[0];
  for (const l of LEVELS) if (n >= l.from) lv = l;
  const next = LEVELS.find((l) => l.from > n) || null;
  return { ...lv, n, next, toNext: next ? next.from - n : 0, progress: next ? (n - lv.from) / (next.from - lv.from) : 1 };
}

// ── Узор карты: линии реки Илек (декор) ────────────────────────────────────
const PATTERN = (() => {
  const lines = [];
  for (let k = 0; k < 9; k++) {
    const y0 = 40 + k * 20;
    const a = 10 + (k % 3) * 5;
    lines.push(`<path d="M-20 ${y0} C 60 ${y0 - a}, 110 ${y0 + a * 1.4}, 190 ${y0 - a * 0.4} S 330 ${y0 + a}, 380 ${y0 - a * 0.8}" fill="none" stroke="#fff" stroke-opacity="${(0.05 + (k % 4) * 0.018).toFixed(3)}" stroke-width="${k % 3 === 0 ? 1.6 : 1}"/>`);
  }
  return `<svg viewBox="0 0 340 214" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle cx="300" cy="30" r="92" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="18"/>
    <circle cx="300" cy="30" r="46" fill="#fff" fill-opacity=".04"/>${lines.join('')}</svg>`;
})();

// Карта донора: как банковская, но это карта участника SAQTA (не платёжная)
export function donorCard(st, { mini = false, name = null, balance = null } = {}) {
  const p = getProfile();
  const lv = levelOf(st);
  const nm = name ?? displayName(p);
  const bal = balance ?? st.wallet.balance;
  return `<div class="dcard lv-${lv.id}${mini ? ' mini' : ''}" data-testid="donor-card">
    <div class="dcard-pat">${PATTERN}</div>
    <div class="dcard-top"><span class="dcard-logo">${ICON.logo}<b>SAQTA</b></span><span class="dcard-lv">${esc(lv.name)}</span></div>
    <div class="dcard-bal"><span>Бонусы · 1 бонус = 1 ₸</span><b class="num">${num(bal)}<small>Б</small></b></div>
    <div class="dcard-bottom">
      <div><div class="dcard-name">${esc(nm)}</div><div class="dcard-id">${fmtCardId(p.cardId)}</div></div>
      <button class="dcard-qr" data-card-qr aria-label="Показать QR-код карты">${ICON.qr}</button>
    </div>
  </div>`;
}

export function openCardQr() {
  const p = getProfile();
  sheet('Карта донора', (body) => {
    body.innerHTML = `<div class="card card-qr-sheet">
      ${qrSvg(`SAQTA:donor:${p.cardId}`, { label: 'QR-код карты донора' })}
      <div><b style="font-size:18px">${esc(displayName(p))}</b><div class="xs muted num" style="letter-spacing:.08em">${fmtCardId(p.cardId)}</div></div>
      <p class="small muted">Покажи этот код в пункте приёма или курьеру. Сданная вещь сразу запишется на твою карту, а бонусы придут в кошелёк.</p>
    </div>`;
  });
}
