import qrcode from 'qrcode-generator';

// QR-код как SVG-строка; цвет берётся из currentColor, чтобы работать в обеих темах.
export function qrSvg(text, { label = 'QR-код' } = {}) {
  const qr = qrcode(0, 'M');
  qr.addData(unescape(encodeURIComponent(text)));
  qr.make();
  const n = qr.getModuleCount();
  const m = 2; // поле вокруг кода
  let d = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) d += `M${c + m} ${r + m}h1v1h-1z`;
    }
  }
  const size = n + m * 2;
  return `<svg class="qr" viewBox="0 0 ${size} ${size}" role="img" aria-label="${label}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#fff"/><path d="${d}" fill="#111"/></svg>`;
}
