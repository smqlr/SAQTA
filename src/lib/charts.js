// Chart.js (только нужные части — для небольшого офлайн-файла). Цвета берутся из CSS-токенов темы.
import {
  Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale,
  BarController, BarElement, Tooltip, Legend,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, BarController, BarElement, Tooltip, Legend);

export const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const live = new Set();
export function destroyCharts() {
  live.forEach((c) => c.destroy());
  live.clear();
}

export function makeChart(canvas, config) {
  const text = cssVar('--muted');
  const grid = cssVar('--border');
  Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = text;
  Chart.defaults.borderColor = grid;
  const c = new Chart(canvas, {
    ...config,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 500 },
      ...config.options,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: cssVar('--text'), titleColor: cssVar('--bg'), bodyColor: cssVar('--bg'), padding: 10, cornerRadius: 8, boxPadding: 4 },
        ...(config.options?.plugins || {}),
      },
    },
  });
  live.add(c);
  return c;
}
