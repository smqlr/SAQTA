// Обучение при первом запуске: его ведёт Кайтик. В конце житель вводит имя и получает карту донора.
import { BONUS, WALLET, SCHOOL_LEAGUE } from '../data.js';
import { getState } from '../store.js';
import { ART } from './art.js';
import { mascot } from './mascot.js';
import { donorCard, getProfile, setProfile, fmtCardId, firstName } from './donor.js';
import { esc, num } from './format.js';

const collage = (keys, pill) => `<div class="onb-collage" aria-hidden="true">
  <div class="c c1">${ART[keys[0]]('')}</div><div class="c c2">${ART[keys[1]]('')}</div><div class="c c3">${ART[keys[2]]('')}</div>
  ${pill ? `<span class="pill">${pill}</span>` : ''}</div>`;

const STEPS = [
  {
    mood: 'happy',
    say: 'Сәлем! Я Кайтик. Раньше я был старым телефоном: меня сдали, и мои детали спасли ещё троих.',
    title: 'Старая техника — не мусор',
    lead: 'В ней ещё живут экран, память и батарея. QAITA находит им новых хозяев, а остальное отдаёт на переработку.',
    art: () => collage(['laptop', 'phone', 'kettle'], `+${BONUS.laptop} бонусов`),
  },
  {
    mood: 'scan',
    say: 'Сфотографируй вещь, и я подскажу, что это и что в ней ещё пригодится.',
    title: 'Сфотографируй — ИИ подскажет',
    lead: 'Распознавание работает прямо в телефоне, даже без интернета. Точно всё проверит мастер в хабе.',
    art: () => collage(['iphone', 'camera', 'console'], 'ИИ: «Это ноутбук»'),
  },
  {
    mood: 'talk',
    say: 'Неси в короб своей школы или в бокс в ЦОН. А холодильник мы заберём из дома бесплатно!',
    title: 'Сдай рядом или вызови вывоз',
    lead: `${SCHOOL_LEAGUE.schools} школ, ${SCHOOL_LEAGUE.boxes} боксов в ЦОН и вузах, вывоз крупной техники по адресу.`,
    art: () => collage(['fridge', 'washer', 'tv'], 'Вывоз бесплатно'),
  },
  {
    mood: 'wink',
    say: `За каждую вещь — бонусы. 1 бонус = 1 ₸, выводи на карту любого банка от ${num(WALLET.withdrawMin)}.`,
    title: 'Бонусы — почти деньги',
    lead: `Телефон — ${BONUS.phone}, ноутбук — ${BONUS.laptop}, вывоз холодильника — ${BONUS.bigPickup}. А когда твою деталь купят, придут ещё ${Math.round(BONUS.royaltyShare * 100)}% её цены.`,
    art: () => `<div style="width:min(330px,84vw)">${donorCard(getState(), { name: 'Твоё имя', balance: 1320 })}</div>`,
  },
  { name: true, mood: 'talk', say: 'Как тебя зовут? Я выпущу тебе карту донора.' },
  { done: true, mood: 'party' },
];

let step = 0;
let root = null;

export function maybeOnboard() {
  if (!getProfile().onboarded) startOnboarding();
}

export function startOnboarding() {
  step = 0;
  root?.remove();
  root = document.createElement('div');
  root.className = 'onb';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Знакомство с QAITA');
  document.body.appendChild(root);
  paint();
  root.addEventListener('click', onClick);
  root.addEventListener('submit', (e) => { e.preventDefault(); issue(); });
}

function guide(s) {
  return `<div class="onb-guide">${mascot(s.mood, { cls: 'onb-m', label: 'Кайтик' })}<div class="bubble">${esc(s.say)}</div></div>`;
}

function paint() {
  const s = STEPS[step];
  const dots = STEPS.slice(0, 4).map((_, i) => `<i class="${i === Math.min(step, 3) ? 'on' : ''}"></i>`).join('');
  let body = '';
  let foot = '';
  if (s.done) {
    const p = getProfile();
    body = `<div class="onb-art" style="padding-top:22px">${donorCard(getState())}</div>
      <div class="onb-guide">${mascot('party', { label: 'Кайтик радуется' })}<div class="bubble">Готово, ${esc(firstName(p))}! Это твоя карта донора № ${fmtCardId(p.cardId)}. Покажи её в пункте приёма — вещь запишется на тебя.</div></div>`;
    foot = `<button class="btn primary lg block" data-onb="done">Начать</button>`;
  } else if (s.name) {
    body = `<div style="padding-top:12px">${guide(s)}
      <form class="stack" id="onbForm" novalidate>
        <label class="label" for="onbName">Имя на карте</label>
        <input class="input big" id="onbName" maxlength="24" autocomplete="given-name" placeholder="Например, Айгерим" value="${esc(getProfile().name)}">
        <p class="hint">Можно на казахском или русском. Фамилия не нужна.</p>
      </form></div>`;
    foot = `<button class="btn primary lg block" data-onb="issue">Выпустить карту</button>`;
  } else {
    body = `<div class="onb-art">${s.art()}</div>
      <div>${guide(s)}<h1>${esc(s.title)}</h1><p class="lead">${esc(s.lead)}</p></div>`;
    foot = `<div class="onb-dots" aria-hidden="true">${dots}</div><button class="btn primary lg block" data-onb="next">${step === 3 ? 'Выпустить свою карту' : 'Дальше'}</button>`;
  }
  root.innerHTML = `<div class="onb-in">
      <div class="onb-top"><b style="letter-spacing:.14em;font-size:16px">QAITA</b>
        ${s.done ? '' : '<button class="onb-skip" data-onb="skip">Пропустить</button>'}</div>
      ${body}<div></div></div>
    <div class="onb-foot">${foot}</div>`;
  root.querySelector('#onbName')?.focus();
}

function issue() {
  const v = (root.querySelector('#onbName')?.value || '').trim().replace(/\s+/g, ' ');
  setProfile({ name: v });
  step = STEPS.length - 1;
  paint();
}

function finish() {
  setProfile({ onboarded: true });
  root?.remove();
  root = null;
  if (!location.hash || location.hash === '#') location.hash = 'home';
  window.dispatchEvent(new Event('qaita:onboarded'));
}

function onClick(e) {
  const b = e.target.closest('[data-onb]');
  if (!b) return;
  const act = b.dataset.onb;
  if (act === 'next') { step = Math.min(step + 1, STEPS.length - 2); paint(); }
  if (act === 'issue') issue();
  if (act === 'skip') { if (!getProfile().name) setProfile({ name: '' }); finish(); }
  if (act === 'done') finish();
}
