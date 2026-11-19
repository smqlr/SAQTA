// Профиль: имя и карта донора, уровень, партнёрские режимы, настройки показа (демо), о приложении.
import { LEVELS, SLOGAN, SLOGAN_KZ } from '../data.js';
import { getState, setTazaru, reset } from '../store.js';
import { donorCard, openCardQr, getProfile, setProfile, displayName, initials, fmtCardId, levelOf, contribution } from '../lib/donor.js';
import { startOnboarding } from '../lib/onboarding.js';
import { openChat } from '../lib/chat.js';
import { getApi, setApi } from '../lib/bot.js';
import { CREDITS } from '../lib/credits.js';
import { mascot } from '../lib/mascot.js';
import { ICON } from '../lib/icons.js';
import { sheet, toast } from '../lib/ui.js';
import { esc, num, num1 } from '../lib/format.js';

export function home() {}

const PARTNERS = [
  { id: 'shop', icon: ICON.shop, t: 'Магазин и экипаж доставки', s: '«Обратный рейс»: забрать старую технику при доставке новой' },
  { id: 'osi', icon: ICON.osi, t: 'ОСИ дома', s: '«Бирка у бака»: отметить выброшенную технику' },
  { id: 'hub', icon: ICON.hub, t: 'Хаб: мастер', s: 'Сортировка, «Спроси устройство», ТЕСТ-30, детали, сырьё' },
  { id: 'akimat', icon: ICON.akimat, t: 'Акимат: панель города', s: 'Тонны, деньги РОП, карта сбора, сценарии' },
];

export function render(el, st) {
  const p = getProfile();
  const lv = levelOf(st);
  const c = contribution(st);
  el.innerHTML = `<div class="phone-col">
    <div class="prof-head">
      <span class="avatar">${esc(initials(p))}</span>
      <div class="grow"><h1>${esc(displayName(p))}</h1><div class="xs muted num">Карта ${fmtCardId(p.cardId)}</div></div>
      <button class="icon-btn" data-act="name" aria-label="Изменить имя">${ICON.edit}</button>
    </div>
    ${donorCard(st)}
    <div class="card lvl">
      <div class="row between"><b>Уровень: ${esc(lv.name)}</b><span class="xs muted">${num(c.items)} принято · ${num1(c.kg)} кг</span></div>
      <div class="progress mt-8"><i style="width:${Math.round(lv.progress * 100)}%"></i></div>
      <p class="xs muted mt-8">${lv.next ? `До уровня «${esc(lv.next.name)}» — ещё ${lv.toNext}. Уровень меняет цвет карты.` : 'Высший уровень. Спасибо, что спасаешь технику Актобе!'}</p>
      <div class="row wrap mt-8" style="gap:6px">${LEVELS.map((l) => `<span class="tag ${l.id <= lv.id ? 'whole' : 'none'}">${esc(l.name)}${l.from ? ` · ${l.from}` : ''}</span>`).join('')}</div>
    </div>

    <h2 class="h-sec">Помощь</h2>
    <div class="rows">
      <button class="rowi" data-act="chat"><span class="r-ico" style="background:var(--brand-soft);color:var(--brand)">${ICON.help}</span><span class="grow">Спросить Кайтика<small>Ответит про технику, бонусы и данные</small></span>${ICON.chevron}</button>
      <button class="rowi" data-act="tour"><span class="r-ico">${ICON.info}</span><span class="grow">Пройти знакомство заново<small>Пять экранов с Кайтиком</small></span>${ICON.chevron}</button>
    </div>

    <h2 class="h-sec">Для партнёров</h2>
    <div class="rows">${PARTNERS.map((x) => `<a class="rowi" href="#${x.id}"><span class="r-ico">${x.icon}</span><span class="grow">${x.t}<small>${x.s}</small></span>${ICON.chevron}</a>`).join('')}</div>

    <h2 class="h-sec">Показ и настройки</h2>
    <div class="rows">
      <button class="rowi" data-act="tazaru" role="switch" aria-checked="${st.tazaru}"><span class="r-ico">${ICON.sun}</span><span class="grow">Неделя Тазару күні<small>Бонусы × 2 за любую сданную вещь</small></span><span class="switch ${st.tazaru ? 'on' : ''}"></span></button>
      <button class="rowi" data-act="ready"><span class="r-ico">${ICON.wallet}</span><span class="grow">Кошелёк с историей<small>1 320 бонусов: ноутбук и роялти</small></span></button>
      <button class="rowi" data-act="clean"><span class="r-ico">${ICON.reset}</span><span class="grow">Начать с нуля<small>Пустой кошелёк, без сдач. Имя и карта останутся</small></span></button>
      <button class="rowi" data-act="api"><span class="r-ico">${ICON.bolt}</span><span class="grow">Сервер ИИ<small>${getApi() ? esc(getApi()) : 'Не подключён: Кайтик отвечает из базы знаний'}</small></span>${ICON.chevron}</button>
    </div>

    <h2 class="h-sec">О QAITA</h2>
    <div class="rows">
      <button class="rowi" data-act="about"><span class="r-ico">${ICON.logo}</span><span class="grow">О приложении<small>${esc(SLOGAN)} · ${esc(SLOGAN_KZ)}</small></span>${ICON.chevron}</button>
      <button class="rowi" data-act="credits"><span class="r-ico">${ICON.doc}</span><span class="grow">Источники фото и карты<small>Wikimedia Commons, OpenStreetMap</small></span>${ICON.chevron}</button>
    </div>
    <p class="footnote center mt-16">QAITA · Hack.IT 2026 · пилот для Актобе</p>
  </div>`;

  el.onclick = (e) => {
    if (e.target.closest('[data-card-qr]')) return openCardQr();
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'chat') return openChat();
    if (act === 'tour') return startOnboarding();
    if (act === 'tazaru') { setTazaru(!getState().tazaru); toast(getState().tazaru ? 'Тазару күні: бонусы × 2' : 'Тазару күні выключен'); return; }
    if (act === 'ready' || act === 'clean') { reset(act); toast(act === 'clean' ? 'Данные очищены' : 'Кошелёк с историей загружен'); return; }
    if (act === 'name') return editName();
    if (act === 'api') return editApi();
    if (act === 'about') return about();
    if (act === 'credits') return credits();
  };
}

function editName() {
  sheet('Имя на карте', (body, close) => {
    body.innerHTML = `<form class="stack" id="nmForm"><input class="input big" id="nm" maxlength="24" value="${esc(getProfile().name)}" placeholder="Например, Айгерим"><button class="btn primary lg block">Сохранить</button></form>`;
    body.querySelector('#nmForm').onsubmit = (e) => { e.preventDefault(); setProfile({ name: body.querySelector('#nm').value.trim() }); close(); window.dispatchEvent(new Event('qaita:profile')); };
    body.querySelector('#nm').focus();
  });
}

function editApi() {
  sheet('Сервер ИИ', (body, close) => {
    body.innerHTML = `<p class="small muted">Адрес сервера QAITA (папка <code>server/</code> в репозитории). С сервером Кайтик отвечает через Claude, а фото распознаёт с моделью и поломками. Без сервера всё работает офлайн: база знаний и ИИ в телефоне.</p>
      <form class="stack mt-12" id="apiForm"><input class="input" id="api" inputmode="url" placeholder="https://qaita-ai.example.workers.dev" value="${esc(getApi())}">
      <button class="btn primary block">Сохранить</button><button class="btn block" type="button" data-off>Отключить</button></form>`;
    body.querySelector('#apiForm').onsubmit = (e) => { e.preventDefault(); setApi(body.querySelector('#api').value); close(); toast('Сервер сохранён'); window.dispatchEvent(new Event('qaita:profile')); };
    body.querySelector('[data-off]').onclick = () => { setApi(''); close(); toast('Сервер отключён'); window.dispatchEvent(new Event('qaita:profile')); };
  });
}

function about() {
  sheet('О QAITA', (body) => {
    body.innerHTML = `<div class="card stack" style="justify-items:center;text-align:center">
      <div style="width:150px">${mascot('happy')}</div>
      <h2>QAITA</h2><p class="small muted">«Қайта» по-казахски — «снова, заново». Мы забираем старую технику там, где она лежит, проверяем её в хабе и даём вторую жизнь: целиком, на детали или в переработку.</p>
      <p class="small"><b>${esc(SLOGAN)}</b><br>${esc(SLOGAN_KZ)}</p>
      <p class="xs muted">Кайтик — маскот QAITA: бывший телефон с ростком. Рисунок — собственный, внутри приложения.</p>
    </div>`;
  });
}

function credits() {
  sheet('Источники', (body) => {
    body.innerHTML = `<div class="card small"><p><b>Карта Актобе</b>: © участники OpenStreetMap, лицензия ODbL.</p>
      <p class="mt-12"><b>Фото техники</b>: Wikimedia Commons, свободные лицензии. Фон выровнен в белый, кадр обрезан.</p>
      <div class="list mt-8">${CREDITS.map((c) => `<div class="li"><div class="grow xs"><b>${esc(c.what)}</b><div class="muted">${esc(c.author || 'автор не указан')} · ${esc(c.license)}</div><a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.title)}</a></div></div>`).join('') || '<p class="xs muted">Фото ещё не добавлены</p>'}</div></div>`;
  });
}
