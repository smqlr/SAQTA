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
  device: (label = 'Устройство') =>
    wrap(
      `<rect x="26" y="26" width="68" height="68" rx="12" class="a-body"/>
       <path d="M48 60h24M60 48v24" class="a-ink-line"/>`,
      label,
    ),
};
