// Кайтик — маскот QAITA: бывший телефон, которого сдали, и у него вырос росток (вторая жизнь техники).
// Своя рисовка в SVG, без внешних картинок. Настроения: happy, talk, wink, wow, think, scan, party.
let seq = 0;

const EYE = {
  open: (x) => `<rect x="${x - 4.6}" y="46" width="9.2" height="14" rx="4.6" fill="url(#ke${seq})"/><circle cx="${x + 1.6}" cy="49.5" r="1.9" fill="#fff"/>`,
  happy: (x) => `<path d="M${x - 5} 55 Q${x} 47.5 ${x + 5} 55" stroke="url(#ke${seq})" stroke-width="3.6" fill="none" stroke-linecap="round"/>`,
  big: (x) => `<circle cx="${x}" cy="53" r="7" fill="url(#ke${seq})"/><circle cx="${x + 2.4}" cy="50.2" r="2.4" fill="#fff"/><circle cx="${x - 2.2}" cy="56" r="1" fill="#fff"/>`,
  up: (x) => `<rect x="${x - 3.6}" y="44" width="8" height="12" rx="4" fill="url(#ke${seq})"/><circle cx="${x + 2.4}" cy="46.5" r="1.7" fill="#fff"/>`,
  scan: (x) => `<rect x="${x - 6}" y="50" width="12" height="5" rx="2.5" fill="url(#ke${seq})"/>`,
};
const MOUTH = {
  smile: '<path d="M52.5 68 Q60 75.5 67.5 68" stroke="#7df2c6" stroke-width="3.2" fill="none" stroke-linecap="round"/>',
  open: '<path d="M52 67 Q60 80 68 67 Z" fill="#7df2c6"/><path d="M55.5 72.5 Q60 76 64.5 72.5" stroke="#ff8fa3" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>',
  o: '<ellipse cx="60" cy="71" rx="4.2" ry="5" fill="#7df2c6"/>',
  flat: '<path d="M55 70.5 H65" stroke="#7df2c6" stroke-width="3.2" stroke-linecap="round"/>',
  grin: '<path d="M51 66.5 Q60 79 69 66.5 Q60 71 51 66.5 Z" fill="#7df2c6"/>',
};
const FACES = {
  happy: ['open', 'open', 'smile'],
  talk: ['open', 'open', 'open'],
  wink: ['happy', 'open', 'grin'],
  wow: ['big', 'big', 'o'],
  think: ['up', 'up', 'flat'],
  scan: ['scan', 'scan', 'flat'],
  party: ['happy', 'happy', 'grin'],
};

const ARM_L_DOWN = '<path d="M29 78 C19 81 16 90 20 97" stroke="#0e8a5f" stroke-width="9" fill="none" stroke-linecap="round"/>';
const ARM_L_UP = '<path d="M29 74 C19 70 15 60 18 52" stroke="#0e8a5f" stroke-width="9" fill="none" stroke-linecap="round"/>';
const ARM_R_WAVE = '<g class="m-wave"><path d="M91 76 C101 72 105 62 102 53" stroke="#0e8a5f" stroke-width="9" fill="none" stroke-linecap="round"/></g>';
const ARM_R_UP = '<path d="M91 74 C101 70 105 60 102 52" stroke="#0e8a5f" stroke-width="9" fill="none" stroke-linecap="round"/>';
const ARM_R_DOWN = '<path d="M91 78 C101 81 104 90 100 97" stroke="#0e8a5f" stroke-width="9" fill="none" stroke-linecap="round"/>';
const ARM_R_POINT = '<path d="M91 76 C100 76 106 72 110 66" stroke="#0e8a5f" stroke-width="9" fill="none" stroke-linecap="round"/>';
const MAGNIFIER = `<g><path d="M91 78 C99 78 103 74 105 68" stroke="#0e8a5f" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M106 66 L112 58" stroke="#0a5f42" stroke-width="4.5" stroke-linecap="round"/>
  <circle cx="116" cy="50" r="10" fill="#d8f6ff" fill-opacity=".55" stroke="#0a5f42" stroke-width="3.6"/>
  <path d="M111 46 Q114 43 118 44" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
const CONFETTI = `<g><rect x="8" y="22" width="5" height="9" rx="1.5" fill="#ffc94d" transform="rotate(-20 10 26)"/><circle cx="108" cy="20" r="3.5" fill="#ff8fa3"/>
  <rect x="100" y="34" width="5" height="9" rx="1.5" fill="#5ac8fa" transform="rotate(25 102 38)"/><circle cx="16" cy="44" r="3" fill="#7df2c6"/><path d="M22 12 l3 3 m0 -3 l-3 3" stroke="#ffc94d" stroke-width="2.4" stroke-linecap="round"/></g>`;

function parts(mood) {
  if (mood === 'party') return { left: ARM_L_UP, right: ARM_R_UP, extra: CONFETTI };
  if (mood === 'scan') return { left: ARM_L_DOWN, right: MAGNIFIER, extra: '' };
  if (mood === 'talk' || mood === 'think') return { left: ARM_L_DOWN, right: ARM_R_POINT, extra: mood === 'think' ? '<g fill="#9aa1ad"><circle cx="104" cy="30" r="3"/><circle cx="112" cy="22" r="4"/><circle cx="96" cy="38" r="2"/></g>' : '' };
  if (mood === 'wow') return { left: ARM_L_UP, right: ARM_R_UP, extra: '' };
  if (mood === 'wink') return { left: ARM_L_DOWN, right: ARM_R_DOWN, extra: '' };
  return { left: ARM_L_DOWN, right: ARM_R_WAVE, extra: '' };
}

function svg(mood, { viewBox, cls = '', label = 'Кайтик', float = true } = {}) {
  seq += 1;
  const [l, r, m] = FACES[mood] || FACES.happy;
  const p = parts(mood);
  return `<svg class="m-body ${cls}" viewBox="${viewBox}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="kb${seq}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26c98c"/><stop offset=".55" stop-color="#13a06d"/><stop offset="1" stop-color="#0b7350"/></linearGradient>
    <linearGradient id="ks${seq}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#173a30"/><stop offset="1" stop-color="#0a1b16"/></linearGradient>
    <radialGradient id="ke${seq}" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#e6fff5"/><stop offset="1" stop-color="#6eeebd"/></radialGradient>
    <linearGradient id="kl${seq}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b3f5c9"/><stop offset="1" stop-color="#2fbf74"/></linearGradient>
  </defs>
  <ellipse cx="60" cy="133" rx="30" ry="5" fill="#0a1b16" opacity=".1"/>
  <g class="${float ? 'm-float' : ''}">
    ${p.extra}
    <g class="m-leaf">
      <path d="M60 28 C60 20 61 14 64.5 9" stroke="#0b7350" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M64.5 10 C71 0.5 85 2 89 6.5 C82.5 15 72 17 64.5 10 Z" fill="url(#kl${seq})"/>
      <path d="M68 9.5 C74 7 80 6.5 85 7" stroke="#fff" stroke-opacity=".45" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M64.5 10 C59 2.5 48 2.5 44.5 6.5 C49.5 13 58 14.5 64.5 10 Z" fill="#59d48f"/>
    </g>
    ${p.left}${p.right}
    <rect x="40" y="111" width="16" height="13" rx="6.5" fill="#0a5f42"/>
    <rect x="64" y="111" width="16" height="13" rx="6.5" fill="#0a5f42"/>
    <rect x="25" y="25" width="70" height="93" rx="25" fill="url(#kb${seq})"/>
    <path d="M37 31.5 C32.5 35.5 30.5 43 30.5 51" stroke="#fff" stroke-opacity=".38" stroke-width="4" stroke-linecap="round" fill="none"/>
    <rect x="32.5" y="35" width="55" height="51" rx="17" fill="url(#ks${seq})"/>
    <rect x="32.5" y="35" width="55" height="51" rx="17" fill="none" stroke="#7df2c6" stroke-opacity=".22" stroke-width="1.5"/>
    <g class="m-eyes">${EYE[l](46.5)}${EYE[r](73.5)}</g>
    ${MOUTH[m]}
    <ellipse cx="40.5" cy="71" rx="4.6" ry="2.7" fill="#ff8fa3" opacity=".5"/>
    <ellipse cx="79.5" cy="71" rx="4.6" ry="2.7" fill="#ff8fa3" opacity=".5"/>
    <rect x="49" y="94" width="22" height="13" rx="6.5" fill="#fff" fill-opacity=".2"/>
    <path d="M56.5 100.5 a3.6 3.6 0 1 0 1.2-2.7 M56 96.8 v2.8 h2.8" stroke="#fff" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}

// Весь Кайтик (для обучения, пустых экранов, успеха)
export const mascot = (mood = 'happy', opts = {}) => svg(mood, { viewBox: '-6 -2 134 142', ...opts });
// Только голова с ростком (аватар помощника, кнопки)
export const mascotFace = (mood = 'happy', opts = {}) => svg(mood, { viewBox: '25 1 70 90', float: false, cls: `m-face ${opts.cls || ''}`, ...opts });
export const MASCOT_NAME = 'Кайтик';
