// Сервер SAQTA для Claude (Cloudflare Worker). Ключ API хранится только здесь, в секрете ANTHROPIC_API_KEY,
// и никогда не попадает в код страницы. Два адреса:
//   POST /chat       { messages: [{ role, content }] }        → { text }   — помощник Сактик
//   POST /recognize  { image: base64, mediaType }             → { group, type, label, model, condition, damage, parts, confidence }
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-5-5';

const SYSTEM_CHAT = `Ты — Сактик, помощник приложения SAQTA (Актобе, Казахстан). SAQTA («сақта» — «сохрани») забирает старую технику там, где она лежит, проверяет её в хабе и даёт вторую жизнь: целиком, на детали или в переработку.
Отвечай по-русски (если спросили по-казахски — по-казахски), коротко, дружелюбно, на «ты», 2–6 предложений. Только про технику, электронные отходы, безопасность и приложение SAQTA. На другие темы мягко возвращай к технике.
Факты SAQTA (не выдумывай других цифр):
- Сдать малую технику: короба в 40 школах Донор-лиги, 5 боксов в ЦОН и вузах, хаб. Крупную (холодильник, стиральная машина, плита) — вывоз из дома бесплатно, скупка-партнёр откачивает фреон и выдаёт акт с весом.
- Бонусы: телефон или планшет 50, ноутбук или системный блок 200, монитор или ТВ 100, мелкая бытовая, роутер, аккумулятор 20, вывоз крупной техники 300, зарядки и кабели 0. Роялти — 10% цены проданных деталей. Неделя Тазару күні — бонусы × 2.
- 1 бонус = 1 ₸. Вывод на карту любого банка от 1 000 бонусов, раз в неделю в пределах фонда. Юридически это выплата за сданное вторсырьё, как в EcoQolday.
- Карта донора — номер участника (не банковская карта). Уровни: Донор, Спасатель (5 вещей), Герой Актобе (20 вещей).
- Лимит 10 устройств в месяц на человека. Организации — «Амнистия складов» по договору.
- Данные: перед сдачей выйти из аккаунтов и сделать сброс; в хабе носитель стирают по NIST SP 800-88 или уничтожают, сертификат приходит в приложение.
- Вздутая батарея: не заряжать, не прокалывать, не выбрасывать в бак; негорючая коробка, сдать в бокс или хаб.
- В хабе: сортировка за 45 секунд (бирки Целое, Донор, Опасно, Сырьё), детали снимают только под заказ мастерских, QR-паспорт и гарантия 30 дней, стенд ТЕСТ-30 проверяет 16 ячеек 18650 за 30 секунд. Сами не перерабатываем: сырьё отгружаем лицензированным переработчикам.
- Город: около 4 000 т электроотходов в год, перерабатывается 20%. Пилот (январь–июнь 2027) уберёт около 230 т.
Если не знаешь — честно скажи и предложи спросить на горячей линии.`;

const GROUPS = 'phone, pda, laptop, pc, monitor, tv, fridge, washer, dishwasher, stove, microwave, kettle, iron, vacuum, dryer, heater, speaker, player, watch, camera, console, remote, router, peripheral, printer, projector, disk, tool, lamp';
const SYSTEM_VISION = `Ты распознаёшь технику на фото для пункта приёма SAQTA. Ответь ТОЛЬКО одним JSON-объектом без пояснений:
{"group": одно из [${GROUPS}], "type": "phone"|"laptop"|"screen"|"small"|"cable"|"big", "label": "вид техники по-русски", "model": "бренд и модель, если видно, иначе пустая строка", "condition": "works"|"dead"|"broken"|"swollen"|null, "damage": ["видимые повреждения по-русски"], "parts": ["детали, которые обычно можно снять с такой вещи"], "confidence": число 0..1}
type: phone — телефоны и планшеты, laptop — ноутбуки и компьютеры, screen — мониторы и ТВ, big — холодильник, стиральная или посудомоечная машина, плита, кондиционер, cable — зарядки и кабели, small — всё остальное. Если на фото не техника — group "", confidence 0.`;

const json = (o, status, headers) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...headers } });
const textOf = (r) => r.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOW_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return json({ error: 'POST only' }, 405, cors);
    if (!env.ANTHROPIC_API_KEY) return json({ error: 'no key' }, 500, cors);
    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    const model = env.MODEL || MODEL;
    const { pathname } = new URL(request.url);
    try {
      const body = await request.json();
      if (pathname === '/chat') {
        const messages = (Array.isArray(body.messages) ? body.messages : [])
          .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
          .slice(-12)
          .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
        while (messages.length && messages[0].role !== 'user') messages.shift();
        if (!messages.length) return json({ error: 'empty' }, 400, cors);
        const r = await client.messages.create({ model, max_tokens: 1024, system: SYSTEM_CHAT, messages });
        return json({ text: textOf(r) }, 200, cors);
      }
      if (pathname === '/recognize') {
        if (typeof body.image !== 'string' || !body.image || body.image.length > 6000000) return json({ error: 'image' }, 400, cors);
        const r = await client.messages.create({
          model,
          max_tokens: 1024,
          system: SYSTEM_VISION,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: body.mediaType === 'image/png' ? 'image/png' : 'image/jpeg', data: body.image } },
              { type: 'text', text: 'Что это за вещь и в каком она состоянии? Ответь JSON.' },
            ],
          }],
        });
        const m = textOf(r).match(/\{[\s\S]*\}/);
        let out = null;
        try { out = m ? JSON.parse(m[0]) : null; } catch { out = null; }
        if (!out || !out.group) return json({ error: 'not recognized' }, 422, cors);
        return json(out, 200, cors);
      }
      return json({ error: 'not found' }, 404, cors);
    } catch (e) {
      return json({ error: 'server' }, 502, cors);
    }
  },
};
