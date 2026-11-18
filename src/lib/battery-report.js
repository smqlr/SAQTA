// «Спроси устройство»: разбор отчёта Windows `powercfg /batteryreport` (battery-report.html).
// Ищем DESIGN CAPACITY, FULL CHARGE CAPACITY и CYCLE COUNT в таблице «Installed batteries».
// Отчёт может быть на английском или русском, поэтому проверяем оба набора подписей.
const LABELS = {
  design: ['DESIGN CAPACITY', 'РАСЧЕТНАЯ ЕМКОСТЬ', 'РАСЧЁТНАЯ ЁМКОСТЬ', 'ПРОЕКТНАЯ ЕМКОСТЬ'],
  full: ['FULL CHARGE CAPACITY', 'ЕМКОСТЬ ПОЛНОЙ ЗАРЯДКИ', 'ЁМКОСТЬ ПОЛНОЙ ЗАРЯДКИ', 'ЕМКОСТЬ ПРИ ПОЛНОЙ ЗАРЯДКЕ'],
  cycles: ['CYCLE COUNT', 'СЧЕТЧИК ЦИКЛОВ', 'СЧЁТЧИК ЦИКЛОВ', 'КОЛИЧЕСТВО ЦИКЛОВ'],
  name: ['NAME', 'ИМЯ'],
  maker: ['MANUFACTURER', 'ИЗГОТОВИТЕЛЬ', 'ПРОИЗВОДИТЕЛЬ'],
};

const toNumber = (s) => {
  const digits = String(s).replace(/[^\d]/g, '');
  return digits ? Number(digits) : null;
};

export function parseBatteryReport(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const out = { design: null, full: null, cycles: null, name: null, maker: null };
  for (const row of doc.querySelectorAll('tr')) {
    const cells = row.querySelectorAll('td');
    if (cells.length < 2) continue;
    const label = cells[0].textContent.replace(/\s+/g, ' ').trim().toUpperCase();
    const value = cells[cells.length - 1].textContent.replace(/\s+/g, ' ').trim();
    for (const [key, names] of Object.entries(LABELS)) {
      if (out[key] != null) continue;
      if (names.some((n) => label === n || label.startsWith(n))) {
        out[key] = key === 'name' || key === 'maker' ? value : toNumber(value);
      }
    }
  }
  if (!out.design || !out.full) {
    // Запасной путь для локализованных отчётов: первые две ёмкости в mWh / мВт·ч —
    // в отчёте сначала идёт заводская (design), потом полная (full charge).
    const caps = [...doc.querySelectorAll('td')]
      .map((td) => td.textContent.replace(/\s+/g, ' ').trim())
      .filter((t) => /^\d[\d\s.,\u00a0]*\s*(mWh|мВт·?ч|мВтч)$/i.test(t))
      .map(toNumber);
    if (caps.length >= 2) { out.design = caps[0]; out.full = caps[1]; }
  }
  if (!out.design || !out.full) return null;
  return out;
}

export function stateOfHealth(full, design) {
  if (!full || !design) return null;
  return Math.round((full / design) * 100);
}
