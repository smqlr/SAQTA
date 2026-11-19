// Классы ImageNet (MobileNet) → виды техники QAITA. Индексы — без «фона» (0…999).
// type — вид техники для бонусов (DEVICE_TYPES), art — фото/рисунок, cat — подтема каталога.
export const GROUPS = {
  phone: { label: 'Телефон', type: 'phone', art: 'phone', cat: 'digital', ids: [487, 707, 528] },
  pda: { label: 'Карманный компьютер', type: 'phone', art: 'pda', cat: 'other', ids: [590] },
  laptop: { label: 'Ноутбук', type: 'laptop', art: 'laptop', cat: 'digital', ids: [620, 681] },
  pc: { label: 'Компьютер', type: 'laptop', art: 'pc', cat: 'digital', ids: [527] },
  monitor: { label: 'Монитор', type: 'screen', art: 'monitor', cat: 'screens', ids: [664, 782, 916] },
  tv: { label: 'Телевизор', type: 'screen', art: 'tv', cat: 'screens', ids: [851] },
  fridge: { label: 'Холодильник', type: 'big', art: 'fridge', cat: 'home', ids: [760] },
  washer: { label: 'Стиральная машина', type: 'big', art: 'washer', cat: 'home', ids: [897] },
  dishwasher: { label: 'Посудомоечная машина', type: 'big', art: 'dishwasher', cat: 'home', ids: [534] },
  stove: { label: 'Плита или духовка', type: 'big', art: 'stove', cat: 'home', ids: [827, 766] },
  microwave: { label: 'Микроволновка', type: 'small', art: 'stove', cat: 'home', ids: [651] },
  kettle: { label: 'Чайник или кофеварка', type: 'small', art: 'kettle', cat: 'home', ids: [849, 899, 725, 505, 550, 859, 891, 521] },
  iron: { label: 'Утюг', type: 'small', art: 'iron', cat: 'home', ids: [606] },
  vacuum: { label: 'Пылесос', type: 'small', art: 'vacuum', cat: 'home', ids: [882] },
  dryer: { label: 'Фен', type: 'small', art: 'device', cat: 'home', ids: [589] },
  heater: { label: 'Вентилятор или обогреватель', type: 'small', art: 'device', cat: 'home', ids: [545, 811] },
  speaker: { label: 'Колонка или радио', type: 'small', art: 'speaker', cat: 'gadgets', ids: [632, 754, 482, 485, 848] },
  player: { label: 'Плеер', type: 'small', art: 'headphones', cat: 'gadgets', ids: [605] },
  watch: { label: 'Часы', type: 'small', art: 'watch', cat: 'gadgets', ids: [531, 826] },
  camera: { label: 'Фотоаппарат', type: 'small', art: 'camera', cat: 'gadgets', ids: [759, 732] },
  console: { label: 'Приставка или джойстик', type: 'small', art: 'console', cat: 'gadgets', ids: [613] },
  remote: { label: 'Пульт', type: 'small', art: 'device', cat: 'gadgets', ids: [761] },
  router: { label: 'Роутер или модем', type: 'small', art: 'router', cat: 'other', ids: [662] },
  peripheral: { label: 'Клавиатура или мышь', type: 'small', art: 'device', cat: 'other', ids: [508, 673] },
  printer: { label: 'Принтер', type: 'small', art: 'device', cat: 'other', ids: [742] },
  projector: { label: 'Проектор', type: 'small', art: 'device', cat: 'other', ids: [745] },
  disk: { label: 'Жёсткий диск', type: 'small', art: 'device', cat: 'other', ids: [592] },
  tool: { label: 'Электроинструмент', type: 'small', art: 'device', cat: 'other', ids: [740, 786] },
  lamp: { label: 'Светильник', type: 'small', art: 'device', cat: 'other', ids: [846, 619] },
};

// probs — вероятности 1000 классов. Возвращает до n видов техники с суммарной вероятностью.
export function topGroups(probs, n = 3) {
  const out = [];
  for (const [id, g] of Object.entries(GROUPS)) {
    let p = 0;
    for (const i of g.ids) p += probs[i];
    out.push({ id, ...g, prob: p });
  }
  out.sort((a, b) => b.prob - a.prob);
  // Насколько вообще похоже на технику: сумма по всем видам
  const techness = out.reduce((s, g) => s + g.prob, 0);
  return { guesses: out.slice(0, n).filter((g) => g.prob >= 0.02), techness };
}
