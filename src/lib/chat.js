// Окно помощника Кайтика: чат в нижнем листе, подсказки-темы, ответы из базы знаний или от Claude через сервер.
import { sheet } from './ui.js';
import { ask, SUGGEST, getApi } from './bot.js';
import { mascotFace } from './mascot.js';
import { firstName } from './donor.js';
import { ICON } from './icons.js';
import { esc } from './format.js';

const log = []; // переписка живёт, пока открыто приложение
let busy = false;

export function openChat(question = '') {
  if (!log.length) {
    log.push({ from: 'bot', text: `Сәлем, ${firstName()}! Я Кайтик. Спрашивай про технику и QAITA: куда сдать, сколько бонусов, как стереть данные, что опасно.`, chips: SUGGEST });
  }
  sheet('Кайтик — помощник QAITA', (body, close) => {
    body.closest('.sheet').classList.add('chat-sheet');
    body.closest('.sheet').querySelector('.sheet-head h2').innerHTML = `<span class="row" style="gap:10px"><span style="width:40px;height:40px;display:block">${mascotFace('talk')}</span><span><b style="font-size:16px">Кайтик</b><small class="xs muted" style="display:block;font-weight:500">${getApi() ? 'ИИ-помощник · Claude онлайн' : 'ИИ-помощник · база знаний QAITA'}</small></span></span>`;
    body.innerHTML = `<div class="chat">
      <div></div>
      <div class="chat-log" id="chatLog" aria-live="polite"></div>
      <div><div class="chat-sugg" id="chatSugg"></div>
        <form class="chat-form" id="chatForm" autocomplete="off">
          <input class="input" id="chatIn" maxlength="300" placeholder="Спроси про технику или бонусы" aria-label="Вопрос Кайтику">
          <button class="chat-send" type="submit" aria-label="Отправить">${ICON.arrow}</button>
        </form></div>
    </div>`;
    const logEl = body.querySelector('#chatLog');
    const suggEl = body.querySelector('#chatSugg');
    const input = body.querySelector('#chatIn');

    const paint = (typing = false) => {
      logEl.innerHTML = log.map((m) => `<div class="msg ${m.from}">${esc(m.text)}${m.go ? `<div><button class="btn sm ghost mt-8" data-go="${m.go[0]}">${esc(m.go[1])}</button></div>` : ''}${m.src ? `<span class="src">${esc(m.src)}</span>` : ''}</div>`).join('')
        + (typing ? '<div class="msg bot typing" aria-label="Кайтик печатает"><i></i><i></i><i></i></div>' : '');
      const chips = [...log].reverse().find((m) => m.chips)?.chips || SUGGEST;
      suggEl.innerHTML = chips.map((c) => `<button class="chip" data-q="${esc(c)}">${esc(c)}</button>`).join('');
      logEl.scrollTop = logEl.scrollHeight;
    };

    const send = async (q) => {
      q = q.trim();
      if (!q || busy) return;
      busy = true;
      log.push({ from: 'me', text: q });
      input.value = '';
      paint(true);
      const history = log.filter((m) => m.from === 'me' || m.from === 'bot').slice(-10, -1).map((m) => ({ role: m.from === 'me' ? 'user' : 'assistant', content: m.text }));
      const [a] = await Promise.all([ask(q, history), new Promise((r) => setTimeout(r, 450))]);
      log.push({ from: 'bot', text: a.text, go: a.go, src: a.src, chips: a.chips });
      busy = false;
      paint();
    };

    body.addEventListener('click', (e) => {
      const g = e.target.closest('[data-go]');
      if (g) { close(); location.hash = g.dataset.go.slice(1); return; }
      const c = e.target.closest('[data-q]');
      if (c) send(c.dataset.q);
    });
    body.querySelector('#chatForm').addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });
    paint();
    if (question) send(question);
    setTimeout(() => input.focus(), 50);
  });
}
