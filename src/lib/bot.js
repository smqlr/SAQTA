// Помощник Сактик: отвечает на вопросы про приложение, технику и экологию — и не молчит на остальные.
// Без сервера — база знаний внутри файла (работает офлайн): ~150 тем с перефразировками (bot-kb.js),
// словарь из 60+ видов техники с синонимами и брендами (bot-devices.js). Понимает опечатки, падежи,
// казахские вопросы и уточнения вроде «а за ноутбук?». Если в профиле указан сервер SAQTA (server/worker.js),
// вопрос уходит в Claude через этот сервер; при ошибке сети — снова база знаний.
import { BONUS, SCHOOL_LEAGUE, EXTEND, GENERIC_PARTS, DEVICE_TYPES, PARTS } from '../data.js';
import { num } from './format.js';
import { INTENTS, OFFTOPIC, pick } from './bot-kb.js';
import { DEVICES } from './bot-devices.js';

const API_KEY = 'saqta-api';
export const getApi = () => { try { return (localStorage.getItem(API_KEY) || '').trim().replace(/\/+$/, ''); } catch { return ''; } };
export const setApi = (u) => { try { if (u) localStorage.setItem(API_KEY, u.trim()); else localStorage.removeItem(API_KEY); } catch { /* нет хранилища */ } };

export const SUGGEST = ['Куда сдать телефон?', 'Как вывести бонусы?', 'Как стереть данные?', 'Вздулась батарея', 'Что будет с вещью?', 'Заберёте холодильник?'];
const SRC = 'База знаний SAQTA';

// ── Текст: нижний регистр, ё→е, только буквы и цифры ────────────────────────
const LETTERS = 'a-zа-яәғқңөұүһі0-9';
const norm = (s) => String(s).toLowerCase().replace(/ё/g, 'е').replace(new RegExp(`[^${LETTERS}]+`, 'gi'), ' ').trim();
const tokens = (s) => norm(s).split(' ').filter(Boolean);

// Слова-паразиты и служебные слова: на смысл вопроса не влияют
const STOP = new Set('а и но или же ли бы вот ну слушай слушайте скажи скажите подскажи подскажите пожалуйста пж плиз мне меня мной я ты тебе тебя у в во на с со к ко о об обо от из это этот эта эти этих то тот так там тут здесь есть был была было были будет очень просто еще уже вообще типа короче мой моя мое мои моего моей моих свой своя свои его ее их он она оно они мы вы вас нас нам вам им ему ей тоже также все весь вся всех че чо щас ведь вообщем блин кстати либо хотя дома'.split(' '));
const PRONOUN = new Set('него нее его ее им ней нем них их он она оно это этот эту такой такую такие'.split(' '));

// ── Лёгкий стеммер русского (по мотивам Snowball, без lookbehind — для старых iPhone) ──
const VOW = /[аеиоуыэюя]/;
function cut(r, re1, re2) {
  let m = r.match(re1);
  if (m) return r.slice(0, r.length - m[0].length);
  if (re2) { m = r.match(re2); if (m) return r.slice(0, r.length - m[0].length + 1); }
  return null;
}
const PERF1 = /(ившись|ывшись|ивши|ывши|ив|ыв)$/, PERF2 = /[ая](вшись|вши|в)$/;
const REFL = /(ся|сь)$/;
const ADJ = /(ими|ыми|его|ого|ему|ому|ее|ие|ые|ое|ей|ий|ый|ой|ем|им|ым|ом|их|ых|ую|юю|ая|яя|ою|ею)$/;
const PART1 = /(ивш|ывш|ующ)$/, PART2 = /[ая](ем|нн|вш|ющ|щ)$/;
const VERB1 = /(ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|уют|ит|ыт|ены|ить|ыть|ишь|ую|ю)$/;
const VERB2 = /[ая](ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно)$/;
const NOUN = /(иями|ями|ами|ией|иям|ием|иях|ев|ов|ие|ье|еи|ии|ей|ой|ий|ям|ем|ам|ом|ах|ях|ию|ью|ия|ья|а|е|и|й|о|у|ы|ь|ю|я)$/;
const stemCache = new Map();
function stem(w) {
  if (stemCache.has(w)) return stemCache.get(w);
  let out = w;
  if (/[а-я]/.test(w) && w.length > 3) {
    const i = w.search(VOW);
    if (i >= 0 && i < w.length - 1) {
      const pre = w.slice(0, i + 1);
      let r = w.slice(i + 1);
      let t = cut(r, PERF1, PERF2);
      if (t !== null) r = t;
      else {
        r = r.replace(REFL, '');
        t = cut(r, ADJ);
        if (t !== null) { r = t; const p = cut(r, PART1, PART2); if (p !== null) r = p; }
        else { t = cut(r, VERB1, VERB2); r = t !== null ? t : (cut(r, NOUN) ?? r); }
      }
      r = r.replace(/и$/, '').replace(/ость?$/, '').replace(/ь$/, '').replace(/(ейше|ейш)$/, '').replace(/нн$/, 'н');
      out = pre + r;
    }
  }
  stemCache.set(w, out);
  return out;
}

// Расстояние Левенштейна с ранним выходом (для опечаток)
function lev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// ── Индекс базы знаний: стеммы примеров и их вес (IDF) ──────────────────────
const contentStems = (s) => tokens(s).filter((w) => !STOP.has(w)).map(stem);
const IDX = INTENTS.map((it) => ({ it, ex: it.q.map((q) => [...new Set(contentStems(q))]).filter((e) => e.length), k: (it.k || []).map(norm) }));
const DF = new Map();
for (const x of IDX) for (const s of new Set(x.ex.flat())) DF.set(s, (DF.get(s) || 0) + 1);
const NI = IDX.length;
const idf = (s) => Math.log(1 + NI / (DF.get(s) || 0.5));
for (const x of IDX) x.norms = x.ex.map((e) => Math.sqrt(e.reduce((a, s) => a + idf(s) ** 2, 0)));
const VOCAB = [...DF.keys()];

// Слово вопроса → стемм из словаря базы (точно, по началу слова или с опечаткой)
const mapCache = new Map();
function toVocab(st) {
  if (DF.has(st)) return [st, 1];
  if (mapCache.has(st)) return mapCache.get(st);
  let best = null, bestD = 9;
  if (st.length >= 4) {
    for (const v of VOCAB) {
      if (v.length >= 4 && (st.startsWith(v) || v.startsWith(st)) && Math.abs(v.length - st.length) <= (Math.min(v.length, st.length) >= 5 ? 4 : 1)) { const d = Math.abs(v.length - st.length) * 0.1; if (d < bestD) { best = v; bestD = d; } continue; }
      const max = st.length >= 8 ? 2 : st.length >= 5 ? 1 : 0;
      if (!max) continue;
      const d = lev(st, v, max);
      if (d <= max && d < bestD) { best = v; bestD = d; }
    }
  }
  const out = best ? [best, bestD < 1 ? 0.9 : 0.8] : [st, 0];
  mapCache.set(st, out);
  return out;
}

function scoreIntents(qStems, qWords) {
  const mapped = qStems.map(toVocab);
  const qNorm = Math.sqrt(mapped.reduce((a, [s, w]) => a + (w ? idf(s) ** 2 : Math.log(1 + NI) ** 2), 0)) || 1;
  const weight = new Map();
  for (const [s, w] of mapped) if (w) weight.set(s, Math.max(weight.get(s) || 0, w));
  const out = [];
  for (const x of IDX) {
    let best = 0;
    x.ex.forEach((e, i) => {
      let dot = 0;
      for (const s of e) { const w = weight.get(s); if (w) dot += w * idf(s) ** 2; }
      const c = dot / (qNorm * x.norms[i]);
      if (c > best) best = c;
    });
    if (x.k.length && qWords.some((w) => x.k.some((k) => (k.length <= 3 ? w === k : w.startsWith(k))))) best += 0.18;
    out.push({ it: x.it, s: best });
  }
  return out.sort((a, b) => b.s - a.s);
}

// ── Техника в вопросе ───────────────────────────────────────────────────────
const DEV_SYN = DEVICES.flatMap((d) => d.n.map((n) => ({ d, t: tokens(n) }))).filter((x) => x.t.length).sort((a, b) => b.t.join(' ').length - a.t.join(' ').length);
const tokMatch = (q, s, typo = true) => {
  if (q === s) return true;
  if (s.length <= 3 || q.length <= 3) return false; // короткие (тв, пк, aa) — только целым словом
  if (q.startsWith(s) && s.length >= 4) return true; // падежи и казахские окончания: телефонды, холодильникті
  if (stem(q) === stem(s)) return true;
  // опечатка — только если слово вопроса не обычное слово из базы («система» ≠ «системка»)
  return typo && s.length >= 6 && q.length >= 5 && !DF.has(stem(q)) && lev(q, s, 1) <= 1;
};
function findDevices(qt) {
  const found = [];
  const used = new Set();
  for (const { d, t } of DEV_SYN) {
    for (let i = 0; i + t.length <= qt.length; i++) {
      if (t.some((s, k) => used.has(i + k) || !tokMatch(qt[i + k], s))) continue;
      t.forEach((_, k) => used.add(i + k));
      if (!found.some((f) => f.d === d)) found.push({ d, at: i, len: t.length });
      break;
    }
  }
  found.sort((a, b) => a.at - b.at || b.len - a.len);
  return { list: found.map((f) => f.d), used };
}

// ── Ответы про конкретную вещь ──────────────────────────────────────────────
const bonusOf = (d) => DEVICE_TYPES[d.type]?.bonus ?? BONUS.small;
const WHERE = `в короб любой из ${SCHOOL_LEAGUE.schools} школ Донор-лиги, в бокс в ЦОН или вузе — или принеси в хаб`;
const TIP = {
  li: 'Если батарея вздулась — не заряжай её и положи вещь в негорючую коробку.',
  data: 'Перед сдачей выйди из аккаунтов и сделай сброс — в хабе носитель всё равно сотрут по NIST SP 800-88.',
  freon: 'Скупка-партнёр откачает фреон и выдаст акт с весом.',
  crt: 'Не разбивай кинескоп: в нём свинцовое стекло.',
  cap: 'Не разбирай её: внутри высоковольтный конденсатор, он держит заряд даже выключенным.',
  toner: 'Картриджи с тонером положи в пакет, чтобы не пылили.',
  batt: 'Батарейки вынь и сдай в отдельный отсек короба.',
  bigli: 'Это большая литиевая батарея: если она вздулась или греется, не храни её дома — сразу в хаб.',
  lead: 'Внутри свинцово-кислотный аккумулятор — не переворачивай и не вскрывай.',
};
const tipsFor = (d, n = 2) => d.f.map((f) => TIP[f]).filter(Boolean).slice(0, n).join(' ');
const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const NOT_ACCEPTED = {
  mercury: () => INTENTS.find((i) => i.id === 'mercury').a,
  car: () => INTENTS.find((i) => i.id === 'car_battery').a,
};

function bonusLine(d) {
  const b = bonusOf(d);
  if (d.type === 'big') return `За вывоз — +${num(BONUS.bigPickup)} бонусов сразу после вывоза.`;
  if (d.type === 'cable') return `Бонусов за ${d.acc} нет: в них мало ценного — немного меди и пластика. Но сдать стоит: они уйдут на переработку, а не в почву.`;
  return `За ${d.acc} — +${num(b)} бонусов (${num(b)} ₸) после проверки в хабе.`;
}

const DEV_ANSWER = {
  where(d) {
    if (d.no) return NOT_ACCEPTED[d.no]();
    if (d.type === 'big') return `${d.name} — крупная техника, нести её никуда не нужно: «Сдать» → выбери вещь → «Вызвать вывоз», укажи адрес и время. Лицензированная скупка заберёт бесплатно${d.f.includes('freon') ? ', откачает фреон' : ''} и выдаст акт с весом.\n\n${bonusLine(d)}`;
    if (d.id === 'crt') return `${d.name} лучше не нести самому: оформи вывоз — экипаж увезёт его целым. ${TIP.crt}\n\n${bonusLine(d)}`;
    const tips = d.tip || tipsFor(d);
    return `${d.name}: сдай ${WHERE}. Ближайшую точку покажет «Карта».\n\n${bonusLine(d)}${tips ? `\n\n${tips}` : ''}`;
  },
  value(d) {
    const parts = GENERIC_PARTS[d.type] || GENERIC_PARTS.small;
    const gold = d.type === 'phone' || d.type === 'laptop' ? ' В платах есть немного золота, серебра, меди и палладия — но главная ценность в живых деталях.' : '';
    return `Самое ценное в такой вещи (${lc(d.name)}) — ${parts.map(lc).join(', ')}. Их снимают под заказ мастерских и выдают с QR-паспортом и гарантией ${PARTS.warrantyDays} дней.${gold}`;
  },
  bonus(d) {
    if (d.no) return `За такую вещь бонусов нет: в пилоте SAQTA её не принимаем.\n\n${NOT_ACCEPTED[d.no]()}`;
    let t = bonusLine(d);
    if (d.type === 'phone' || d.type === 'laptop') t += ` А если детали купят мастерские, придёт ещё ${Math.round(BONUS.royaltyShare * 100)}% их цены.`;
    if (d.type !== 'cable') t += ` В неделю Тазару күні — ×${BONUS.tazaruMultiplier}.`;
    return t;
  },
  accept(d) {
    if (d.no) return NOT_ACCEPTED[d.no]();
    const how = d.type === 'big' || d.id === 'crt' ? 'Оформи вывоз — заберём бесплатно.' : `Сдай ${WHERE}.`;
    return `Да, ${d.acc} принимаем — даже в нерабочем состоянии: живые детали снимут под заказ мастерских, остальное уйдёт лицензированному переработчику. ${how}\n\n${bonusLine(d)}`;
  },
  danger(d) {
    if (d.no) return NOT_ACCEPTED[d.no]();
    const t = d.f.filter((f) => f !== 'data').map((f) => TIP[f]).filter(Boolean);
    if (d.tip) t.unshift(d.tip);
    else if (d.f.includes('li') && !d.f.includes('bigli')) t.unshift('Главная опасность — литиевая батарея: от прокола, удара или перегрева она может загореться.');
    if (d.f.includes('freon')) t.unshift('Фреон из системы охлаждения вредит озоновому слою — трубки не режь.');
    if (!t.length) return `${d.name} безопасен, пока целый: внутри платы, медь и пластик. Только не разбирай и не сжигай — дым от плат и пластика ядовит.`;
    return `${d.name}: ${t.join(' ')}`;
  },
  data(d) {
    if (!d.f.includes('data')) return `В такой вещи (${lc(d.name)}) личных данных нет — просто сдавай.`;
    const steps = {
      phone: 'iPhone: Настройки → [имя] → Выйти, затем Основные → Перенос или сброс → Стереть контент и настройки. Android: сначала удали Google-аккаунт (и Samsung или Mi, если есть) — иначе сработает защита FRP, затем Настройки → Сброс до заводских. Вынь SIM и карту памяти.',
      tablet: 'iPad: выйди из Apple ID и сделай «Стереть контент и настройки». Android-планшет: удали Google-аккаунт и сделай сброс до заводских.',
      ebook: 'Отвяжи книгу от аккаунта (Amazon, PocketBook Cloud) и сделай сброс в настройках.',
      pda: 'Сделай сброс до заводских настроек и вынь карту памяти.',
      laptop: 'Windows: Параметры → Система → Восстановление → «Вернуть компьютер в исходное состояние» → «Удалить всё». Mac: Системные настройки → Основные → Перенос или сброс → «Стереть контент и настройки».',
      pc: 'Скопируй нужное, затем Параметры → Система → Восстановление → «Удалить всё» с очисткой диска. Можно сдать и без диска — сам диск принимаем отдельно.',
      aio: 'Сделай сброс системы с очисткой диска (Windows: «Вернуть компьютер в исходное состояние» → «Удалить всё»; iMac: «Стереть контент и настройки»).',
      disk: 'Скопируй нужное и отформатируй диск с полной очисткой. Если диск не читается — ничего страшного: в хабе его сотрут или уничтожат физически.',
      watch: 'Разорви пару с телефоном в приложении часов — часы сбросятся сами. Если не выходит, сбрось их в настройках самих часов.',
      camera: 'Вынь карту памяти — снимки хранятся на ней.',
      console: 'Выйди из аккаунта PSN, Xbox или Nintendo и сделай сброс до заводских настроек.',
      router: 'Нажми и держи кнопку Reset 10 секунд — так удалятся пароль Wi-Fi и настройки.',
      printer: 'Если у принтера есть экран — сбрось настройки сети и удали историю заданий.',
      gps: 'Сделай сброс до заводских настроек.',
    }[d.id] || 'Сделай сброс до заводских настроек.';
    return `${d.name}: ${steps}\n\nВ хабе носитель всё равно сотрут по NIST SP 800-88 или уничтожат физически, а сертификат придёт в кошелёк.`;
  },
  prolong(d) {
    const F = EXTEND.fixes;
    const t = {
      phone: `Чаще всего телефон «умирает» из-за батареи: замена в мастерской Актобе — около ${num(F.phoneBattery.work)} ₸. Разбит экран? Экран из Банка деталей с работой — ${num(F.phoneScreenBank.part + F.phoneScreenBank.work)} ₸ вместо ${num(EXTEND.screenMarket)} ₸ в сервисе.`,
      laptop: `Самые короткие доски ноутбука — батарея и диск. Новая батарея — около ${num(F.lapBattery.part)} ₸ плюс работа ${num(F.lapBattery.work)} ₸. SSD из Банка деталей — ${num(F.lapSsdBank.part)} ₸ против ${num(F.lapSsdNew.part)} ₸ за новый; с ним старый ноутбук оживает. И почисти кулер от пыли.`,
      pc: `Системному блоку чаще всего помогают SSD вместо жёсткого диска (из Банка деталей — ${num(F.lapSsdBank.part)} ₸), чистка от пыли и новая термопаста.`,
      aio: `Моноблоку помогает SSD вместо жёсткого диска (из Банка деталей — ${num(F.lapSsdBank.part)} ₸) и чистка от пыли.`,
      washer: `У стиральной машины чаще всего кончаются сливной насос (новый — ${num(F.washerPump.part)} ₸), ТЭН (${num(F.washerHeater.part)} ₸) или плата управления (ремонт от ${num(F.washerBoard.work)} ₸). Мастер на дом — около ${num(F.washerPump.work)} ₸. В Актобе ${EXTEND.repair.washer} мастерских по стиральным машинам.`,
      fridge: 'Холодильник часто спасает замена реле, термостата или уплотнителя двери — это дешевле нового. Мастер на дом скажет, жив ли компрессор.',
      freezer: 'Морозильник часто спасает замена реле, термостата или уплотнителя — это дешевле нового.',
      ac: 'Кондиционеру помогают чистка фильтров и дозаправка фреоном у мастера — не выбрасывай его из-за слабого холода.',
      tablet: `Как у телефона: главная короткая доска — батарея. Замена — около ${num(F.phoneBattery.work)} ₸ в мастерской.`,
      headphones: 'У беспроводных наушников обычно умирает крошечная батарея — её меняют не во всех моделях. Проводные часто оживают после замены штекера.',
      speaker: 'Колонку часто спасает замена батареи или разъёма зарядки — это недорогой ремонт.',
    }[d.id] || (d.type === 'small' ? 'У мелкой техники чаще всего ломаются шнур, кнопка или нагреватель — ремонт обычно дешевле новой вещи.' : 'Найди деталь, которая сломается первой, и замени только её.');
    return `${t}\n\nПосчитать «ремонт или новая» и найти деталь в Банке деталей (с гарантией ${PARTS.warrantyDays} дней) можно в разделе «Продлить жизнь».`;
  },
  after(d) {
    const t = {
      phone: 'В хабе проверят экран, камеру, касание и батарею. Если телефон целый — продадим со скидкой или отдадим семье через акимат. Если нет — живой экран и камера уйдут мастерским под заказ, плата (золото, медь, палладий) — лицензированному переработчику, батарея — на проверку.',
      laptop: 'Ноутбук сам расскажет о себе через SAQTA Доктор: батарея, диск, модель. Оперативную память, SSD и ячейки батареи снимут под заказ, плату и металл — переработчику. Целый — продадим или отдадим школьнику.',
      screen: 'Матрицу, блок питания и плату управления снимут под заказ мастерских, корпус и стекло отправят переработчику.',
      big: 'Скупка-партнёр заберёт вещь целиком, откачает фреон, если он есть, и выдаст акт с весом. Металл корпуса, компрессор и мотор уйдут на переработку.',
      small: 'Если вещь целая — продадим со скидкой или отдадим семье. Если нет — мотор, нагреватель, медь и пластик уйдут переработчику, а батареи — на проверку.',
      cable: 'Медь и пластик отправим переработчику партией с паспортом.',
    }[d.type];
    return `${d.name}: ${lc(t)}`;
  },
  sell(d) {
    if (['phone', 'tablet', 'laptop', 'console', 'camera', 'aio', 'watch'].includes(d.id)) return `Если ${lc(d.name)} работает и ему меньше 3–4 лет, выгоднее продать самому (OLX, Kaspi) или сдать в trade-in. Старый или сломанный — сдай в SAQTA: детали спасут другие устройства, а тебе придут бонусы и роялти.`;
    return `Продать такую вещь (${lc(d.name)}) дорого обычно сложно. Проще сдать в SAQTA: ${lc(bonusLine(d))}`;
  },
};
const devChips = (d) => [`Сколько бонусов за ${d.acc}?`, 'Где ближайший пункт?', 'Как стереть данные?', 'Что будет с вещью?', 'Как вывести бонусы?'];

// ── Посторонние вопросы: время, дата, счёт ──────────────────────────────────
function mathAnswer(raw) {
  const t = norm(raw).replace(/плюс/g, ' + ').replace(/минус/g, ' - ').replace(/умножить на|умножь на|помножить на/g, ' * ').replace(/разделить на|делить на|подели на/g, ' / ');
  const m = String(raw).replace(/,/g, '.').match(/(-?\d+(?:\.\d+)?)\s*([+\-*/×x÷:])\s*(-?\d+(?:\.\d+)?)/) || t.match(/(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/);
  if (!m) return null;
  const a = +m[1], b = +m[3];
  const op = { 'x': '*', '×': '*', '÷': '/', ':': '/' }[m[2]] || m[2];
  const r = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : b === 0 ? NaN : a / b;
  if (!Number.isFinite(r)) return 'На ноль делить нельзя даже процессору!';
  const show = (x) => String(+x.toFixed(4)).replace('.', ',');
  return `${show(a)} ${{ '+': '+', '-': '−', '*': '×', '/': '÷' }[op]} ${show(b)} = ${show(r)}. Считать я умею — у меня же процессор! А ещё считаю бонусы: например, 5 старых телефонов — это ${5 * BONUS.phone} бонусов.`;
}
function timeAnswer(ws) {
  const s = ws.join(' ');
  const now = new Date();
  if (/который час|сколько время|сколько времени сейчас|сколько сейчас времени|какое время|текущее время|сағат неше/.test(s) && !/ждать|займет|нужно|надо|доставк|вывоз/.test(s)) {
    return `Сейчас ${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}. Самое время проверить ящики стола — вдруг там старый телефон?`;
  }
  if (/какое сегодня число|какой сегодня день|какая сегодня дата|какое число|какой день недели|сегодня какой|какой год/.test(s)) {
    return `Сегодня ${now.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}. Хороший день, чтобы сдать старую технику!`;
  }
  return null;
}
const OFF_T = OFFTOPIC.map((o) => ({ o, ws: o.w.map(tokens).filter((t) => t.length) }));
function offtopic(qt) {
  for (const { o, ws } of OFF_T) {
    for (const t of ws) {
      for (let i = 0; i + t.length <= qt.length; i++) if (t.every((s, k) => tokMatch(qt[i + k], s, false))) return o;
    }
  }
  return null;
}

// ── Казахский: по буквам и частым словам ────────────────────────────────────
const KZ_WORDS = new Set('қайда кайда қанша канша қалай калай сәлем рахмет рақмет кімсің кимсин тапсыру тапсырамын тапсырам тапсыруға керек неге үшін ушин бола болады береді алам аламын жоқ иә жақсы сау бол түсінікті'.split(' '));
const isKz = (raw, ws) => /[әғқңөұүһі]/i.test(raw) || ws.filter((w) => KZ_WORDS.has(w)).length >= 1 && ws.some((w) => /[әғқңөұүһі]|ма$|ме$|ба$|бе$|да$|ды$|ді$|ға$|ге$/.test(w));

// Контекст разговора: последняя вещь и последняя тема про вещь — для вопросов вроде «а за ноутбук?»
const ctx = { dev: null, devIntent: null };

const TH = 0.36; // уверенность, с которой отвечаем по теме
const answerText = (it, kz) => (kz && it.kz ? it.kz : typeof it.a === 'function' ? it.a() : it.a);
const titleOf = (it) => { const q = it.q.find((x) => x.split(' ').length > 1) || it.q[0]; return q.charAt(0).toUpperCase() + q.slice(1) + (/^(как|куда|где|что|сколько|почему|зачем|когда|можно|кто|чем|какие|какой)/.test(q) ? '?' : ''); };

export function localAnswer(q) {
  const raw = String(q || '').slice(0, 300);
  const qt = tokens(raw);
  if (!qt.length) return { text: 'Напиши вопрос словами — например, «куда сдать телефон?».', go: null, src: SRC, chips: SUGGEST };
  const kz = isKz(raw, qt);
  const { list: devs, used } = findDevices(qt);
  const d = devs[0] || null;
  const content = qt.filter((w) => !STOP.has(w));
  const allStems = content.map(stem);
  const noDevStems = qt.filter((w, i) => !STOP.has(w) && !used.has(i)).map(stem);
  const scoredAll = scoreIntents(allStems, qt);
  const scoredNoDev = d ? scoreIntents(noDevStems.length ? noDevStems : allStems, qt) : scoredAll;
  // темы про вещь оцениваем без названия вещи («куда сдать холодильник» = «куда сдать»)
  const devScore = new Map(scoredNoDev.filter((x) => x.it.dev).map((x) => [x.it.id, x.s]));
  const ranked = scoredAll.map((x) => ({ it: x.it, s: x.it.dev && d ? Math.max(x.s, devScore.get(x.it.id) || 0) : x.s })).sort((a, b) => b.s - a.s);
  const best = ranked[0];
  const hasPronoun = qt.some((w) => PRONOUN.has(w));
  const done = (text, extra = {}) => ({ text, go: null, src: SRC, ...extra });

  // 0) Время, дата и счёт — по точным шаблонам, раньше тем («который час» ≠ «часы работы»)
  const tm = timeAnswer(qt);
  if (tm) return done(tm, { chips: SUGGEST.slice(0, 3) });
  const mt = qt.length <= 8 ? mathAnswer(raw) : null;
  if (mt) return done(mt, { chips: ['Сколько бонусов?', 'Расскажи факт'] });

  // 1) Тема про вещь + вещь (или вещь из прошлого вопроса: «а сколько за него?»)
  // прошлую вещь берём только по местоимению («а сколько за него?»); «Как стереть данные?» — общий вопрос
  const target = d || (hasPronoun && ctx.dev) || null;
  if (best && best.s >= TH && best.it.dev && target) {
    const second = ranked.slice(1).find((x) => x.it.dev && x.it.dev !== best.it.dev && x.s >= Math.max(TH, best.s * 0.75));
    const kinds = [best.it.dev, ...(second ? [second.it.dev] : [])];
    let kind = best.it.dev;
    let text;
    if (kinds.includes('where') && kinds.includes('bonus')) { kind = 'where'; text = DEV_ANSWER.where(target); } // в «где» бонус уже есть
    else text = DEV_ANSWER[kind](target) + (second ? `\n\n${DEV_ANSWER[second.it.dev](target)}` : '');
    if (devs[1] && kind !== 'data') text += `\n\n${DEV_ANSWER[kind](devs[1])}`;
    ctx.dev = target; ctx.devIntent = kind;
    return done(text, { go: target.type === 'big' && kind !== 'data' ? ['#resident/home', 'Вызвать вывоз'] : kind === 'prolong' ? ['#extend', 'Продлить жизнь'] : ['#points', 'Пункты на карте'], chips: devChips(target) });
  }
  // 2) Посторонняя тема с явным словом (погода, игры, крипта) — если база знает тему лишь отдалённо
  const off = d ? null : offtopic(qt);
  if (off && (!best || best.s < 0.8)) return done(off.a, { chips: off.chips || SUGGEST.slice(0, 3) });
  // 3) Обычная тема (общие темы уступают названной вещи: «как сдать холодильник» — про холодильник)
  if (best && best.s >= TH && !(d && best.it.gen)) {
    if (d) { ctx.dev = d; }
    return done(answerText(best.it, kz), { go: best.it.go || null, chips: best.it.chips || null });
  }
  // 3) Только вещь: «а ноутбук?» — та же тема, что в прошлый раз; иначе — куда сдать и сколько бонусов
  if (d) {
    const intent = ctx.devIntent && content.length <= 4 ? ctx.devIntent : best && best.it.dev && best.s >= TH * 0.6 ? best.it.dev : 'where';
    ctx.dev = d; ctx.devIntent = intent;
    let text = DEV_ANSWER[intent](d);
    if (devs[1]) text += `\n\n${DEV_ANSWER[intent](devs[1])}`;
    return done(text, { go: d.type === 'big' ? ['#resident/home', 'Вызвать вывоз'] : ['#points', 'Пункты на карте'], chips: devChips(d) });
  }
  // 4) Посторонняя тема без сильного совпадения с базой
  if (off) return done(off.a, { chips: off.chips || SUGGEST.slice(0, 3) });
  // 5) Слабое совпадение — всё равно отвечаем ближайшей темой, если она заметно выше остальных
  if (best && best.s >= TH * 0.7 && best.s - (ranked[1]?.s || 0) > 0.08 && !best.it.dev) {
    return done(answerText(best.it, kz), { go: best.it.go || null, chips: best.it.chips || null });
  }
  // 6) Не понял: честно говорим и предлагаем ближайшие темы
  const near = ranked.filter((x) => x.s > 0.12 && !['hello', 'yes', 'no', 'thanks', 'bye', 'sorry', 'praise', 'insult'].includes(x.it.id)).slice(0, 3).map((x) => titleOf(x.it));
  const text = kz
    ? 'Кешір, сұрағыңды толық түсінбедім. Мен техника мен SAQTA туралы жақсы білемін. Былай сұрап көр: «телефонды қайда тапсыруға болады?» немесе «ноутбук үшін қанша бонус?»'
    : `Хм, тут я не уверен. Я лучше всего разбираюсь в старой технике и SAQTA: куда сдать вещь, сколько бонусов, как стереть данные, что опасно.${near.length ? ' Возможно, ты про одну из тем ниже?' : ' Попробуй спросить иначе — например, «куда сдать телевизор?» или «сколько бонусов за планшет?».'}`;
  return done(text, { chips: [...new Set([...near, ...SUGGEST])].slice(0, 6) });
}

// Онлайн-ответ через сервер SAQTA (Claude). history — [{ role: 'user'|'assistant', content }]
export async function ask(q, history = []) {
  const api = getApi();
  if (api) {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 20000);
      const r = await fetch(`${api}/chat`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: [...history, { role: 'user', content: q }].slice(-12) }), signal: ctl.signal });
      clearTimeout(t);
      if (r.ok) {
        const j = await r.json();
        if (j.text) return { text: j.text, go: null, src: 'Claude · онлайн' };
      }
    } catch { /* нет сети или сервер недоступен — отвечаем из базы */ }
  }
  return localAnswer(q);
}

// Для тестов: сбросить контекст разговора
export function resetChat() { ctx.dev = null; ctx.devIntent = null; }
void pick;
