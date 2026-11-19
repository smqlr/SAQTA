// Паспорт QAITA Доктора — то, что устройство рассказало о себе (check/doctor/qaita-doctor.sh и .ps1).
// Скрипт кладёт паспорт в ссылку: <приложение>#hub/doctor=<base64url(JSON)>. Хаб принимает ссылку, «doctor=…»,
// голый base64url или JSON. Формат v1 описан в check/README.md.

const b64urlToText = (s) => {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
};

export function decodePassport(input) {
  const raw = String(input || '').trim();
  if (!raw) return { ok: false, error: 'Пусто: вставьте ссылку или паспорт из QAITA Доктора' };
  let json;
  try {
    if (raw.startsWith('{')) json = JSON.parse(raw);
    else {
      const m = raw.match(/doctor=([A-Za-z0-9_-]+)/);
      const token = m ? m[1] : /^[A-Za-z0-9_-]+$/.test(raw) ? raw : null;
      if (!token) return { ok: false, error: 'Это не паспорт QAITA Доктора' };
      json = JSON.parse(b64urlToText(token));
    }
  } catch {
    return { ok: false, error: 'Паспорт повреждён: скопируйте ссылку целиком' };
  }
  return normalizePassport(json);
}

const n = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : typeof v === 'string' && v.trim() !== '' && Number.isFinite(+v) ? +v : null);
const nums = (a) => (Array.isArray(a) ? a.map(n).filter((v) => v != null) : []);
const str = (v, max = 80) => (v == null ? null : String(v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max) || null);

export function normalizePassport(p) {
  if (!p || typeof p !== 'object' || p.qaita !== 1) return { ok: false, error: 'Это не паспорт QAITA Доктора (нет метки qaita: 1)' };
  const d = p.device || {};
  const device = {
    kind: ['laptop', 'desktop'].includes(d.kind) ? d.kind : 'laptop',
    vendor: str(d.vendor), model: str(d.model), cpu: str(d.cpu), ramGB: n(d.ramGB),
    serial: str(d.serial, 24), os: str(d.os), lock: ['enabled', 'disabled'].includes(d.lock) ? d.lock : null,
  };
  let battery = null;
  const b = p.battery;
  if (b && typeof b === 'object') {
    const design = n(b.design);
    const full = n(b.full);
    if (!design || !full || design <= 0 || full <= 0) return { ok: false, error: 'В паспорте нет двух ёмкостей батареи' };
    if (full > design * 1.5) return { ok: false, error: 'Текущая ёмкость больше заводской в 1,5 раза — паспорт неверный' };
    const cellsMv = nums(b.cellsMv);
    const qmax = nums(b.qmax);
    battery = {
      design, full, unit: b.unit === 'mAh' ? 'мА·ч' : 'мВт·ч', cycles: n(b.cycles), chip: str(b.chip, 32),
      soh: Math.round((full / design) * 100), soh1: Math.round((full / design) * 1000) / 10,
      cellsMv, spreadMv: cellsMv.length > 1 ? Math.max(...cellsMv) - Math.min(...cellsMv) : null,
      qmax, groupSoh: qmax.map((q) => Math.round((q / design) * 100)),
      tMaxC: n(b.tMaxC), tMinC: n(b.tMinC), pf: n(b.pf), src: str(b.src, 24),
    };
  }
  const disks = (Array.isArray(p.disks) ? p.disks : []).slice(0, 4).map((x) => ({
    model: str(x.model, 48), bus: str(x.bus, 12), gb: n(x.gb),
    smart: ['ok', 'fail'].includes(x.smart) ? x.smart : 'unknown', wearPct: n(x.wearPct), hours: n(x.hours),
  }));
  return { ok: true, tool: str(p.tool, 60), ms: n(p.ms), device, battery, disks };
}

// Подсказка бирки по паспорту: устройство уже загрузилось и ответило; целым — только если всё здорово и нет блокировки
export function suggestFromPassport(ps) {
  const bat = ps.battery;
  const diskOk = ps.disks.length > 0 && ps.disks.every((x) => x.smart === 'ok');
  const batOk = !bat || (bat.soh >= 80 && !bat.pf);
  return ps.device.lock !== 'enabled' && diskOk && batOk ? 'whole' : 'donor';
}

export const passportTitle = (ps) => [ps.device.vendor, ps.device.model].filter(Boolean).join(' ') || 'Ноутбук';
