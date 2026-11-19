// Проверка распознавания на сервере (server/recognize.js) без сети: клиент Claude подменён.
// Запуск: npm run test:server
import { recognize, toResult, RecognizeError } from '../server/recognize.js';

let failed = 0;
const ok = (cond, msg) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else { failed++; console.log(`  ✗ ${msg}`); }
};

// Поддельный клиент: отдаёт заготовленные ответы по очереди и запоминает запросы
function fakeClient(responses) {
  const calls = [];
  return {
    calls,
    beta: { messages: { create: async (req) => {
      calls.push(structuredClone(req));
      const r = responses.shift();
      if (r instanceof Error) throw r;
      return r;
    } } },
  };
}
const search = (results) => [
  { type: 'server_tool_use', id: 'srvtoolu_1', name: 'web_search', input: { query: 'Samsung Galaxy A50 SM-A505F' } },
  { type: 'web_search_tool_result', tool_use_id: 'srvtoolu_1', content: results },
];
const answer = {
  group: 'phone', type: 'phone', label: 'Смартфон', model: 'Samsung Galaxy A50 (SM-A505F)', year: '2019',
  specs: ['Экран 6,4″ Super AMOLED', '4 ГБ / 64 ГБ', 'Аккумулятор 4000 мА·ч'],
  price: { new: '', used: '45 000 ₸' }, condition: 'dead', damage: ['трещина в углу экрана'], parts: ['экран', 'камера'],
  sources: [
    { title: 'Kaspi', url: 'https://kaspi.kz/shop/p/samsung-galaxy-a50-100000001/' },
    { title: 'GSMArena', url: 'https://www.gsmarena.com/samsung_galaxy_a50-9554.php' },
    { title: 'Выдуманный магазин', url: 'https://fake-shop.example/a50' },
  ],
  confidence: 0.93,
};
const results = [
  { type: 'web_search_result', url: 'https://kaspi.kz/shop/p/samsung-galaxy-a50-100000001/', title: 'Samsung Galaxy A50 — Kaspi Магазин' },
  { type: 'web_search_result', url: 'https://www.gsmarena.com/samsung_galaxy_a50-9554.php', title: 'Samsung Galaxy A50 - Full phone specifications' },
];
const text = (o) => ({ type: 'text', text: `Нашёл модель.\n${JSON.stringify(o)}` });

console.log('1. Поиск по магазинам → модель и источники');
{
  const c = fakeClient([{ stop_reason: 'end_turn', content: [...search(results), text(answer)] }]);
  const r = await recognize(c, { image: 'AAAA', mediaType: 'image/jpeg', barcode: '8806 0903 12014' });
  const req = c.calls[0];
  ok(req.tools.length === 1 && req.tools[0].type === 'web_search_20260209' && req.tools[0].name === 'web_search', 'Claude получает инструмент веб-поиска (web_search_20260209)');
  ok(req.tools[0].user_location?.country === 'KZ', 'поиск с местными магазинами впереди: Актобе, KZ');
  ok(req.model === 'claude-opus-5-5' && req.fallbacks === 'default' && req.betas.includes('server-side-fallback-2026-07-01'), 'модель claude-opus-5-5, запасная модель на случай отказа');
  ok(req.messages[0].content[1].text.includes('8806090312014'), 'штрихкод с телефона передан Claude');
  ok(r.model === 'Samsung Galaxy A50 (SM-A505F)' && r.year === '2019' && r.specs.length === 3, `модель, год и характеристики: ${r.model}, ${r.year}`);
  ok(r.sources.length === 2 && r.sources.every((s) => !s.url.includes('fake-shop')), 'в источниках только страницы из результатов поиска, выдуманная ссылка отброшена');
  ok(r.sources[0].host === 'kaspi.kz' && r.sources[1].host === 'gsmarena.com', `домены источников: ${r.sources.map((s) => s.host).join(', ')}`);
  ok(r.price.used === '45 000 ₸' && r.price.new === '' && r.searched, 'цена б/у из источника, пустая цена не выдумана');
}

console.log('2. pause_turn: поиск продолжается');
{
  const c = fakeClient([
    { stop_reason: 'pause_turn', content: search(results) },
    { stop_reason: 'end_turn', content: [text(answer)] },
  ]);
  const r = await recognize(c, { image: 'AAAA', mediaType: 'image/jpeg' });
  ok(c.calls.length === 2, 'после pause_turn запрос отправлен ещё раз');
  ok(c.calls[1].messages.at(-1).role === 'assistant' && c.calls[1].messages.length === 2, 'продолжение: ответ отправлен обратно без лишнего «продолжай»');
  ok(r.sources.length === 2, 'источники из первого круга поиска засчитаны');
}

console.log('3. Отказ, ошибка поиска, не техника');
{
  const c = fakeClient([{ stop_reason: 'refusal', content: [] }]);
  let err = null;
  try { await recognize(c, { image: 'AAAA' }); } catch (e) { err = e; }
  ok(err instanceof RecognizeError && err.code === 'refusal', 'отказ → понятная ошибка, а не пустой ответ');

  const failedSearch = [
    { type: 'server_tool_use', id: 'srvtoolu_2', name: 'web_search', input: { query: 'x' } },
    { type: 'web_search_tool_result', tool_use_id: 'srvtoolu_2', content: { type: 'web_search_tool_result_error', error_code: 'max_uses_exceeded' } },
    text(answer),
  ];
  const r = toResult(failedSearch);
  ok(r.model && r.sources.length === 0 && !r.searched, 'поиск вернул ошибку → модель с фото, без источников');

  let err2 = null;
  try { toResult([{ type: 'text', text: '{"group":"","confidence":0}' }]); } catch (e) { err2 = e; }
  ok(err2?.code === 'not_recognized', 'не техника → not_recognized');

  let err3 = null;
  try { await recognize(fakeClient([]), { image: '' }); } catch (e) { err3 = e; }
  ok(err3?.code === 'image', 'пустое фото отклоняется до запроса к Claude');
}

console.log('4. Местоположение не принято → поиск без него');
{
  const bad = Object.assign(new Error('not a country the search provider supports'), { status: 400 });
  const c = fakeClient([bad, { stop_reason: 'end_turn', content: [...search(results), text(answer)] }]);
  const r = await recognize(c, { image: 'AAAA' });
  ok(c.calls.length === 2 && !('user_location' in c.calls[1].tools[0]) && r.model, 'повтор без user_location и ответ получен');
}

console.log(failed ? `\nПровалено проверок: ${failed}` : '\nВсе проверки сервера пройдены');
process.exit(failed ? 1 : 0);
