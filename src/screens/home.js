// Главная жителя: приветствие, карта донора, две главные кнопки, пункты рядом, вклад, что можно сдать.
import { BONUS, CATEGORIES, EXAMPLES, DEVICE_TYPES, SCHOOL_LEAGUE, CITY_CENTER, WALLET } from '../data.js';
import { LEAGUE, BOXES } from '../geo/points.js';
import { byDistance, fmtDist } from '../lib/map/view.js';
import { donorCard, openCardQr, firstName, initials, contribution, levelOf } from '../lib/donor.js';
import { mascotFace } from '../lib/mascot.js';
import { openChat } from '../lib/chat.js';
import { ART } from '../lib/art.js';
import { ICON } from '../lib/icons.js';
import { hscroll } from '../lib/ui.js';
import { num, num1, esc } from '../lib/format.js';

export function home() {}

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Доброй ночи';
  if (h < 12) return 'Қайырлы таң · доброе утро';
  if (h < 18) return 'Сәлем · добрый день';
  return 'Қайырлы кеш · добрый вечер';
}

// Плитки «Что можно сдать»: по одной вещи на подтему + крупная техника
const TILES = [
  { id: 'a50', cat: 'digital', label: 'Телефоны' },
  { id: 'lenovo', cat: 'digital', label: 'Ноутбуки' },
  { id: 'kettle', cat: 'home', label: 'Чайники и мелочь' },
  { id: 'fridge', cat: 'home', label: 'Холодильники' },
  { id: 'tv', cat: 'screens', label: 'Телевизоры' },
  { id: 'headphones', cat: 'gadgets', label: 'Наушники' },
  { id: 'aa', cat: 'other', label: 'Батарейки' },
];

export function render(el, st) {
  const c = contribution(st);
  const lv = levelOf(st);
  const near = byDistance(CITY_CENTER, [...LEAGUE, ...BOXES]).slice(0, 2);
  el.innerHTML = `<div class="phone-col">
    <div class="hello">
      <div><div class="xs muted">${greeting()}</div><h1>${esc(firstName())}</h1></div>
      <a class="avatar" href="#profile" aria-label="Профиль">${esc(initials())}</a>
    </div>

    <a href="#wallet" style="display:block;text-decoration:none" aria-label="Кошелёк">${donorCard(st, { mini: true })}</a>
    ${lv.next ? `<p class="footnote" style="margin:8px 4px 0">До уровня «${esc(lv.next.name)}» — ещё ${lv.toNext} ${plural(lv.toNext, 'вещь', 'вещи', 'вещей')}</p>` : ''}

    <div class="cta-row">
      <a class="cta primary" href="#resident" data-testid="cta-give">
        <span class="cta-ico">${ICON.camera}</span>
        <div><b>Сдать технику</b><span>Сфотографируй — ИИ подскажет, что это</span></div>
      </a>
      <a class="cta" href="#resident/home">
        <span class="cta-ico">${ICON.truck}</span>
        <div><b>Вывоз</b><span>Холодильник, стиралка — бесплатно, +${BONUS.bigPickup}</span></div>
      </a>
    </div>

    <a class="banner green" href="#extend" data-testid="cta-extend"><span class="b-ico">${ICON.heart}</span><div><b>Не выбрасывай — продли</b><span>Сколько вещи осталось жить и что продлит её дешевле новой</span></div></a>

    ${st.tazaru
      ? `<a class="banner" href="#resident"><span class="b-ico">${ICON.sun}</span><div><b>Неделя Тазару күні</b><span>Бонусы × 2 за любую сданную вещь</span></div></a>`
      : `<button class="banner mascot" data-chat><span class="m-face">${mascotFace('talk')}</span><div><b>Спроси Сактика</b><span>Куда сдать, как стереть данные, сколько бонусов — отвечу на любой вопрос</span></div></button>`}

    <h2 class="h-sec">Рядом с тобой <a href="#points">Все на карте</a></h2>
    ${near.map((p) => `<a class="pt-row" href="#points/${p.id}">
      <span class="pt-ico" style="background:${p.kind === 'school' ? 'var(--brand)' : 'var(--blue)'}">${p.kind === 'school' ? ICON.school : ICON.box}</span>
      <span class="grow"><b>${esc(p.name)}</b><span class="xs muted">${esc(p.address || '')}</span></span>
      <span class="dist">${fmtDist(p.dist)}</span></a>`).join('')}

    <h2 class="h-sec">Твой вклад</h2>
    <div class="stats">
      <div class="stat"><b>${num(c.items)}</b><span>${plural(c.items, 'вещь сдана', 'вещи сданы', 'вещей сдано')}</span></div>
      <div class="stat"><b>${num1(c.kg)}</b><span>кг не попали на полигон</span></div>
      <div class="stat"><b>${num(c.saved)}</b><span>${plural(c.saved, 'деталь нашла', 'детали нашли', 'деталей нашли')} хозяев</span></div>
    </div>

    <h2 class="h-sec">Что можно сдать <a href="#resident">Все</a></h2>
    <div class="hscroll">${TILES.map((t) => {
      const ex = EXAMPLES.find((e) => e.id === t.id);
      const bonus = DEVICE_TYPES[ex.type].bonus * (st.tazaru ? BONUS.tazaruMultiplier : 1);
      return `<a class="cat-tile" href="#resident/${t.cat}"><div class="ph">${ART[ex.art](t.label)}</div><b>${esc(t.label)}</b><span>${bonus ? `+${num(bonus)} бонусов` : 'бесплатно'}</span></a>`;
    }).join('')}</div>

    <h2 class="h-sec">Как это работает</h2>
    <div class="how">
      <div class="how-i"><span class="n">1</span><div><b>Сфотографируй или выбери вещь</b><span>ИИ узнает, что это, и покажет, что в ней ещё может жить</span></div></div>
      <div class="how-i"><span class="n">2</span><div><b>Сдай рядом</b><span>${SCHOOL_LEAGUE.schools} школ и ${SCHOOL_LEAGUE.boxes} боксов. Крупную технику заберём из дома</span></div></div>
      <div class="how-i"><span class="n">3</span><div><b>Получи бонусы</b><span>После проверки в хабе. Вывод на карту любого банка от ${num(WALLET.withdrawMin)}</span></div></div>
    </div>
    <p class="footnote center mt-16">SAQTA · пилот акимата Актобе · «Собери. Спроси. Спаси.»</p>
  </div>`;

  hscroll(el.querySelector('.hscroll')); // «Что можно сдать»: ползунок, колесо, мягкий край
  el.onclick = (e) => {
    if (e.target.closest('[data-card-qr]')) { e.preventDefault(); openCardQr(); return; }
    if (e.target.closest('[data-chat]')) { openChat(); }
  };
}

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
export { plural };
export const CATS = CATEGORIES;
