// Виды техники SAQTA, которые узнаёт ИИ в телефоне (голова MobileCLIP / MobileNet, src/ai/head-*.json),
// плюс виды, которые называет сервер с Claude (server/recognize.js). type — вид техники для бонусов (DEVICE_TYPES),
// art — фото/рисунок, cat — подтема каталога.
export const GROUPS = {
  phone: { label: 'Телефон', type: 'phone', art: 'phone', cat: 'digital' },
  tablet: { label: 'Планшет', type: 'phone', art: 'phone', cat: 'digital' },
  ebook: { label: 'Электронная книга', type: 'phone', art: 'ebook', cat: 'screens' },
  pda: { label: 'Карманный компьютер', type: 'phone', art: 'pda', cat: 'other' },
  laptop: { label: 'Ноутбук', type: 'laptop', art: 'laptop', cat: 'digital' },
  pc: { label: 'Системный блок', type: 'laptop', art: 'pc', cat: 'digital' },
  monitor: { label: 'Монитор', type: 'screen', art: 'monitor', cat: 'screens' },
  tv: { label: 'Телевизор', type: 'screen', art: 'tv', cat: 'screens' },
  fridge: { label: 'Холодильник', type: 'big', art: 'fridge', cat: 'home' },
  washer: { label: 'Стиральная машина', type: 'big', art: 'washer', cat: 'home' },
  dishwasher: { label: 'Посудомоечная машина', type: 'big', art: 'dishwasher', cat: 'home' },
  stove: { label: 'Плита или духовка', type: 'big', art: 'stove', cat: 'home' },
  ac: { label: 'Кондиционер', type: 'big', art: 'ac', cat: 'home' },
  microwave: { label: 'Микроволновка', type: 'small', art: 'stove', cat: 'home' },
  kettle: { label: 'Чайник', type: 'small', art: 'kettle', cat: 'home' },
  coffee: { label: 'Кофеварка или кофемашина', type: 'small', art: 'kettle', cat: 'home' },
  blender: { label: 'Блендер или миксер', type: 'small', art: 'kettle', cat: 'home' },
  toaster: { label: 'Тостер или вафельница', type: 'small', art: 'kettle', cat: 'home' },
  multicooker: { label: 'Мультиварка или скороварка', type: 'small', art: 'kettle', cat: 'home' },
  iron: { label: 'Утюг', type: 'small', art: 'iron', cat: 'home' },
  vacuum: { label: 'Пылесос', type: 'small', art: 'vacuum', cat: 'home' },
  dryer: { label: 'Фен', type: 'small', art: 'device', cat: 'home' },
  fan: { label: 'Вентилятор', type: 'small', art: 'device', cat: 'home' },
  heater: { label: 'Обогреватель или увлажнитель', type: 'small', art: 'device', cat: 'home' },
  sewing: { label: 'Швейная машинка', type: 'small', art: 'device', cat: 'home' },
  headphones: { label: 'Наушники', type: 'small', art: 'headphones', cat: 'gadgets' },
  speaker: { label: 'Колонка или радио', type: 'small', art: 'speaker', cat: 'gadgets' },
  player: { label: 'Плеер или магнитофон', type: 'small', art: 'speaker', cat: 'gadgets' },
  watch: { label: 'Часы или фитнес-браслет', type: 'small', art: 'watch', cat: 'gadgets' },
  clock: { label: 'Будильник или настенные часы', type: 'small', art: 'watch', cat: 'gadgets' },
  camera: { label: 'Фотоаппарат или камера', type: 'small', art: 'camera', cat: 'gadgets' },
  console: { label: 'Приставка или джойстик', type: 'small', art: 'console', cat: 'gadgets' },
  remote: { label: 'Пульт', type: 'small', art: 'device', cat: 'gadgets' },
  calculator: { label: 'Калькулятор', type: 'small', art: 'device', cat: 'gadgets' },
  microphone: { label: 'Микрофон', type: 'small', art: 'device', cat: 'gadgets' },
  synth: { label: 'Синтезатор', type: 'small', art: 'device', cat: 'gadgets' },
  landline: { label: 'Домашний телефон', type: 'small', art: 'nokia', cat: 'other' },
  router: { label: 'Роутер или модем', type: 'small', art: 'router', cat: 'other' },
  peripheral: { label: 'Клавиатура или мышь', type: 'small', art: 'device', cat: 'other' },
  printer: { label: 'Принтер или МФУ', type: 'small', art: 'device', cat: 'other' },
  projector: { label: 'Проектор', type: 'small', art: 'device', cat: 'other' },
  disk: { label: 'Жёсткий диск или флешка', type: 'small', art: 'device', cat: 'other' },
  tool: { label: 'Электроинструмент', type: 'small', art: 'device', cat: 'other' },
  lamp: { label: 'Светильник', type: 'small', art: 'device', cat: 'other' },
  flashlight: { label: 'Фонарик', type: 'small', art: 'device', cat: 'other' },
  battery: { label: 'Батарейки или аккумулятор', type: 'small', art: 'battery', cat: 'other' },
  charger: { label: 'Зарядка или кабель', type: 'cable', art: 'cables', cat: 'other' },
};

// Классы головы, которые в приложении — один вид (клавиатура и мышь — «Клавиатура или мышь»)
const CLASS_GROUP = { keyboard: 'peripheral', mouse: 'peripheral' };

// probs — вероятности классов головы (classes — их имена, «other» = не техника).
// Возвращает до n видов техники по убыванию вероятности и «насколько это вообще техника» (1 − P(не техника)).
export function headGroups(probs, classes, n = 3) {
  const by = {};
  let other = 0;
  classes.forEach((c, i) => {
    if (c === 'other') { other += probs[i]; return; }
    const id = CLASS_GROUP[c] || c;
    if (GROUPS[id]) by[id] = (by[id] || 0) + probs[i];
  });
  const out = Object.entries(by).map(([id, p]) => ({ id, ...GROUPS[id], prob: p })).sort((a, b) => b.prob - a.prob);
  return { guesses: out.slice(0, n).filter((g, i) => i === 0 || g.prob >= 0.03), techness: 1 - other };
}

// Название или категория товара из базы (штрихкод) → вид техники SAQTA.
// Порядок важен: сначала узкие слова («посудомоечная», «наушники», «часы»), потом широкие («машина», «телефон»).
const WORDS = [
  ['dishwasher', /dishwasher|посудомо/],
  ['washer', /washing machine|washer|стиральн/],
  ['microwave', /microwave|микроволн|свч/],
  ['fridge', /refrigerator|fridge|freezer|холодильн|морозильн/],
  ['stove', /\b(oven|stove|cooker|hob|range)\b|плит[аы]|духов/],
  ['dryer', /hair ?dryer|(^|[^а-яё])фен([^а-яё]|$)/],
  ['headphones', /headphone|earbud|earphone|headset|наушник|гарнитур/],
  ['player', /\bmp3\b|\bipod\b|media player|плеер|магнитофон/],
  ['watch', /smart ?watch|\bwatch\b|fitness (band|tracker)|часы|фитнес-?браслет/],
  ['console', /playstation|xbox|nintendo|game console|gamepad|joystick|приставк|джойстик|геймпад/],
  ['tv', /\btv\b|television|телевизор|smart tv/],
  ['monitor', /monitor|монитор|\bdisplay\b/],
  ['laptop', /laptop|notebook|macbook|chromebook|ultrabook|ноутбук/],
  ['pc', /desktop|all-in-one|\bpc\b|системный блок|моноблок|компьютер/],
  ['ebook', /e-?book|e-?reader|kindle|pocketbook|электронн(ая|ую) книг/],
  ['tablet', /\bipad\b|tablet|планшет/],
  ['phone', /smartphone|mobile phone|cell ?phone|\biphone\b|смартфон|телефон|galaxy|redmi|xiaomi|honor|huawei|pixel/],
  ['camera', /camera|camcorder|фотоаппарат|видеокамер|экшн-камер/],
  ['speaker', /speaker|soundbar|radio|колонк|саундбар|радио/],
  ['router', /router|modem|wi-?fi|access point|роутер|маршрутизатор|модем/],
  ['peripheral', /keyboard|\bmouse\b|клавиатур|(^|[^а-яё])мыш/],
  ['printer', /printer|scanner|mfp|принтер|сканер|(^|[^а-яё])мфу([^а-яё]|$)/],
  ['projector', /projector|проектор/],
  ['disk', /hard drive|\bssd\b|\bhdd\b|flash drive|usb drive|memory card|жёстк|жестк|флешк|накопител/],
  ['vacuum', /vacuum|пылесос/],
  ['coffee', /coffee|espresso|кофе/],
  ['toaster', /toaster|waffle|тостер|вафельниц/],
  ['blender', /blender|mixer|juicer|food processor|блендер|миксер|соковыжим/],
  ['multicooker', /multicooker|slow cooker|pressure cooker|мультивар|скоровар/],
  ['kettle', /kettle|чайник/],
  ['iron', /\biron\b|steamer|утюг|отпаривател/],
  ['fan', /\bfan\b|вентилятор/],
  ['heater', /heater|air purifier|humidifier|обогреват|увлажнител/],
  ['ac', /air condition|кондиционер/],
  ['charger', /charger|adapter|cable|зарядн|зарядк|адаптер|кабель/],
  ['battery', /battery|batteries|батаре|аккумулятор/],
  ['calculator', /calculator|калькулятор/],
  ['tool', /drill|screwdriver|grinder|\bsaw\b|power tool|дрель|шуруповёрт|шуруповерт|болгарк|перфоратор/],
  ['lamp', /\blamp\b|light bulb|lighting|светильник|ламп/],
];
export function groupFromText(...parts) {
  const t = parts.filter(Boolean).join(' ').toLowerCase();
  if (!t) return null;
  for (const [id, re] of WORDS) if (re.test(t)) return id;
  return null;
}
