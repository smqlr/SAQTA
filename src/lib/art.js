// Иллюстрации устройств — собственная простая рисовка в SVG (внутри файла, без внешних картинок).
const wrap = (inner, label) =>
  `<svg class="art" viewBox="0 0 120 120" role="img" aria-label="${label}">${inner}</svg>`;

export const ART = {
  phone: (label = 'Телефон') =>
    wrap(
      `<rect x="38" y="12" width="44" height="96" rx="8" class="a-body"/>
       <rect x="42" y="20" width="36" height="78" rx="3" class="a-screen-off"/>
       <circle cx="60" cy="16" r="1.6" class="a-ink"/>
       <path d="M47 34l8 10-5 6 9 12" class="a-crack"/>`,
      label,
    ),
  iphone: (label = 'Смартфон') =>
    wrap(
      `<rect x="38" y="12" width="44" height="96" rx="10" class="a-body"/>
       <rect x="42" y="17" width="36" height="86" rx="7" class="a-screen"/>
       <rect x="52" y="17" width="16" height="5" rx="2.5" class="a-ink"/>
       <path d="M50 60l6 6 14-14" class="a-ok"/>`,
      label,
    ),
  nokia: (label = 'Кнопочный телефон') =>
    wrap(
      `<rect x="40" y="10" width="40" height="100" rx="12" class="a-body"/>
       <rect x="46" y="20" width="28" height="24" rx="3" class="a-screen-off"/>
       <rect x="52" y="50" width="16" height="7" rx="3.5" class="a-key"/>
       ${[0, 1, 2, 3]
         .map((r) => [0, 1, 2].map((c) => `<rect x="${46 + c * 10}" y="${63 + r * 10}" width="8" height="6" rx="2" class="a-key"/>`).join(''))
         .join('')}`,
      label,
    ),
  laptop: (label = 'Ноутбук') =>
    wrap(
      `<rect x="22" y="22" width="76" height="52" rx="4" class="a-body"/>
       <rect x="27" y="27" width="66" height="42" rx="2" class="a-screen-off"/>
       <path d="M12 80h96l-6 12H18z" class="a-body"/>
       <path d="M52 84h16" class="a-ink-line"/>
       <path d="M88 24l-6 9 5 4-7 10" class="a-crack"/>`,
      label,
    ),
  battery: (label = 'Батарея') =>
    wrap(
      `<path d="M16 44c0-6 4-10 10-10h68c6 0 10 4 10 10v32c0 6-4 10-10 10H26c-6 0-10-4-10-10z" class="a-body"/>
       <path d="M30 34c10-12 50-12 60 0" class="a-swell"/>
       <path d="M30 86c10 12 50 12 60 0" class="a-swell"/>
       <rect x="104" y="52" width="6" height="16" rx="2" class="a-ink"/>
       <path d="M60 46l-8 16h8l-4 14 12-18h-8l4-12z" class="a-warn"/>`,
      label,
    ),
  kettle: (label = 'Чайник') =>
    wrap(
      `<path d="M34 40h46l6 50H28z" class="a-body"/>
       <path d="M80 48c14 0 16 30 2 32" class="a-ink-line"/>
       <path d="M34 50L18 38" class="a-ink-line"/>
       <rect x="46" y="30" width="22" height="10" rx="4" class="a-key"/>
       <rect x="22" y="90" width="70" height="8" rx="3" class="a-ink"/>`,
      label,
    ),
  fridge: (label = 'Холодильник') =>
    wrap(
      `<rect x="34" y="8" width="52" height="104" rx="6" class="a-body"/>
       <path d="M34 44h52" class="a-ink-line"/>
       <path d="M42 22v12M42 54v20" class="a-ink-line"/>`,
      label,
    ),
  pc: (label = 'Системный блок') =>
    wrap(
      `<rect x="36" y="10" width="48" height="100" rx="6" class="a-body"/>
       <path d="M45 24h30M45 33h30" class="a-ink-line"/>
       <circle cx="60" cy="90" r="6" class="a-key"/>`,
      label,
    ),
  washer: (label = 'Стиральная машина') =>
    wrap(
      `<rect x="22" y="10" width="76" height="100" rx="8" class="a-body"/>
       <path d="M22 30h76" class="a-ink-line"/>
       <circle cx="34" cy="20" r="3" class="a-ink"/><circle cx="44" cy="20" r="3" class="a-ink"/>
       <circle cx="60" cy="68" r="25" class="a-key"/><circle cx="60" cy="68" r="16" class="a-screen-off"/>`,
      label,
    ),
  iron: (label = 'Утюг') =>
    wrap(
      `<path d="M10 88c4-26 28-38 60-38h30l10 38z" class="a-body"/>
       <path d="M46 50c0-14 6-20 20-20h22c6 0 10 4 10 10v10" class="a-ink-line"/>
       <path d="M24 76h78" class="a-thin"/>`,
      label,
    ),
  vacuum: (label = 'Пылесос') =>
    wrap(
      `<path d="M60 70C40 70 30 56 30 34v62" class="a-ink-line"/>
       <rect x="14" y="94" width="34" height="9" rx="3" class="a-ink"/>
       <rect x="56" y="56" width="50" height="38" rx="16" class="a-body"/>
       <circle cx="68" cy="96" r="7" class="a-key"/><circle cx="96" cy="96" r="7" class="a-key"/>`,
      label,
    ),
  tv: (label = 'Телевизор') =>
    wrap(
      `<rect x="8" y="20" width="104" height="66" rx="5" class="a-body"/>
       <rect x="14" y="26" width="92" height="54" rx="2" class="a-screen-off"/>
       <path d="M42 26v54M74 26v54" class="a-crack"/>
       <path d="M60 86v12M42 100h36" class="a-ink-line"/>`,
      label,
    ),
  tvNew: (label = 'Телевизор') =>
    wrap(
      `<rect x="8" y="20" width="104" height="66" rx="5" class="a-body"/>
       <rect x="14" y="26" width="92" height="54" rx="2" class="a-screen-off"/>
       <path d="M60 86v12M42 100h36" class="a-ink-line"/>`,
      label,
    ),
  monitor: (label = 'Монитор') =>
    wrap(
      `<rect x="14" y="16" width="92" height="62" rx="5" class="a-body"/>
       <rect x="20" y="22" width="80" height="50" rx="2" class="a-screen"/>
       <path d="M60 78v16M40 100h40" class="a-ink-line"/>`,
      label,
    ),
  aio: (label = 'Моноблок') =>
    wrap(
      `<rect x="12" y="12" width="96" height="74" rx="6" class="a-body"/>
       <rect x="18" y="18" width="84" height="54" rx="2" class="a-screen-off"/>
       <circle cx="60" cy="79" r="2.5" class="a-ink"/>
       <path d="M50 86l-6 18h32l-6-18" class="a-body"/>`,
      label,
    ),
  ebook: (label = 'Электронная книга') =>
    wrap(
      `<rect x="30" y="8" width="60" height="104" rx="8" class="a-body"/>
       <rect x="36" y="16" width="48" height="76" rx="2" class="a-screen"/>
       <path d="M43 28h34M43 38h34M43 48h34M43 58h22" class="a-thin"/>
       <path d="M44 66l10 8-6 6 10 10" class="a-crack" style="stroke:var(--art-stroke)"/>
       <path d="M52 101h16" class="a-ink-line"/>`,
      label,
    ),
  headphones: (label = 'Наушники') =>
    wrap(
      `<path d="M26 70V58a34 34 0 0 1 68 0v12" class="a-ink-line"/>
       <rect x="16" y="62" width="22" height="38" rx="9" class="a-body"/>
       <rect x="82" y="62" width="22" height="38" rx="9" class="a-body"/>`,
      label,
    ),
  speaker: (label = 'Колонка') =>
    wrap(
      `<rect x="30" y="12" width="60" height="96" rx="16" class="a-body"/>
       <circle cx="60" cy="38" r="10" class="a-key"/>
       <circle cx="60" cy="76" r="19" class="a-key"/><circle cx="60" cy="76" r="7" class="a-ink"/>`,
      label,
    ),
  console: (label = 'Игровая приставка') =>
    wrap(
      `<path d="M32 40h56c14 0 22 10 24 26l3 20c2 12-10 18-18 10L85 84H35L23 96c-8 8-20 2-18-10l3-20c2-16 10-26 24-26z" class="a-body"/>
       <path d="M34 54v18M25 63h18" class="a-ink-line"/>
       <circle cx="84" cy="57" r="4" class="a-ink"/><circle cx="95" cy="67" r="4" class="a-ink"/>`,
      label,
    ),
  watch: (label = 'Умные часы') =>
    wrap(
      `<rect x="46" y="6" width="28" height="108" rx="8" class="a-key"/>
       <rect x="34" y="32" width="52" height="56" rx="13" class="a-body"/>
       <rect x="40" y="38" width="40" height="44" rx="9" class="a-screen-off"/>
       <path d="M48 46l8 10-4 6 8 10" class="a-crack"/>`,
      label,
    ),
  camera: (label = 'Фотоаппарат') =>
    wrap(
      `<path d="M12 40h22l8-12h36l8 12h22v58H12z" class="a-body"/>
       <circle cx="60" cy="68" r="21" class="a-key"/><circle cx="60" cy="68" r="12" class="a-screen-off"/>
       <rect x="90" y="48" width="10" height="6" rx="2" class="a-ink"/>`,
      label,
    ),
  aa: (label = 'Аккумуляторы') =>
    wrap(
      `<rect x="28" y="26" width="26" height="80" rx="5" class="a-body"/><rect x="35" y="19" width="12" height="7" rx="2" class="a-ink"/>
       <rect x="66" y="26" width="26" height="80" rx="5" class="a-body"/><rect x="73" y="19" width="12" height="7" rx="2" class="a-ink"/>
       <path d="M41 50v14M34 57h14M72 57h14" class="a-ink-line"/>`,
      label,
    ),
  router: (label = 'Роутер') =>
    wrap(
      `<path d="M30 64L22 20M90 64l8-44" class="a-ink-line"/>
       <rect x="12" y="62" width="96" height="32" rx="9" class="a-body"/>
       <circle cx="32" cy="78" r="3.5" class="a-ink"/><circle cx="46" cy="78" r="3.5" class="a-ink"/><circle cx="60" cy="78" r="3.5" class="a-ink"/>`,
      label,
    ),
  pda: (label = 'Коммуникатор') =>
    wrap(
      `<rect x="30" y="10" width="54" height="100" rx="8" class="a-body"/>
       <rect x="36" y="18" width="42" height="56" rx="2" class="a-screen-off"/>
       <rect x="40" y="82" width="34" height="18" rx="5" class="a-key"/>
       <path d="M96 22v84" class="a-ink-line"/>`,
      label,
    ),
  cables: (label = 'Зарядки и кабели') =>
    wrap(
      `<rect x="20" y="22" width="36" height="42" rx="7" class="a-body"/>
       <path d="M30 22V10M46 22V10" class="a-ink-line"/>
       <path d="M38 64c0 30 52 8 48 38" class="a-ink-line"/>
       <rect x="79" y="100" width="14" height="12" rx="2" class="a-ink"/>`,
      label,
    ),
  freezer: (label = 'Морозильник') =>
    wrap(
      `<rect x="8" y="38" width="104" height="64" rx="6" class="a-body"/>
       <path d="M8 54h104" class="a-ink-line"/><path d="M46 46h28" class="a-ink-line"/>
       <path d="M60 68v22M50 73l20 12M70 73L50 85" class="a-thin"/>`,
      label,
    ),
  stove: (label = 'Плита') =>
    wrap(
      `<rect x="20" y="14" width="80" height="96" rx="6" class="a-body"/>
       <path d="M20 36h80" class="a-ink-line"/>
       <circle cx="36" cy="25" r="4" class="a-ink"/><circle cx="52" cy="25" r="4" class="a-ink"/><circle cx="68" cy="25" r="4" class="a-ink"/><circle cx="84" cy="25" r="4" class="a-ink"/>
       <rect x="30" y="48" width="60" height="42" rx="4" class="a-screen-off"/>
       <path d="M40 98h40" class="a-ink-line"/>`,
      label,
    ),
  dishwasher: (label = 'Посудомоечная машина') =>
    wrap(
      `<rect x="22" y="10" width="76" height="100" rx="8" class="a-body"/>
       <path d="M22 30h76" class="a-ink-line"/><path d="M46 42h28" class="a-ink-line"/>
       <circle cx="34" cy="20" r="3" class="a-ink"/><circle cx="44" cy="20" r="3" class="a-ink"/>
       <path d="M34 60h52M34 74h52M34 88h52" class="a-thin"/>`,
      label,
    ),
  ac: (label = 'Кондиционер') =>
    wrap(
      `<rect x="6" y="30" width="108" height="42" rx="10" class="a-body"/>
       <path d="M18 62h84" class="a-ink-line"/>
       <circle cx="100" cy="42" r="3" class="a-ink"/>
       <path d="M36 82c-4 7-4 14 0 21M60 82c-4 7-4 14 0 21M84 82c-4 7-4 14 0 21" class="a-thin"/>`,
      label,
    ),
  device: (label = 'Устройство') =>
    wrap(
      `<rect x="26" y="26" width="68" height="68" rx="12" class="a-body"/>
       <path d="M48 60h24M60 48v24" class="a-ink-line"/>`,
      label,
    ),
};
