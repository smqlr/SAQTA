// Установка QAITA на телефон как приложения (PWA): иконка на рабочем столе, без адресной строки.
// Android и компьютер — системное окно установки (beforeinstallprompt); iPhone — пошаговая подсказка.
import { APP_NAME, APP_URL } from '../data.js';
import { ICON } from './icons.js';
import { sheet, toast } from './ui.js';

let deferred = null;
const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());
const DISMISS_KEY = 'qaita-install-dismissed';

export const isStandalone = () =>
  matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches || navigator.standalone === true;
export const isHttp = () => /^https?:$/.test(location.protocol);
export const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isPhone = () => matchMedia('(max-width: 900px)').matches;

export const onInstallChange = (fn) => listeners.add(fn);
export const canPromptNatively = () => !!deferred;

export function initInstall() {
  const mark = () => document.documentElement.classList.toggle('standalone', isStandalone());
  mark();
  matchMedia('(display-mode: standalone)').addEventListener?.('change', () => { mark(); notify(); });
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; notify(); });
  addEventListener('appinstalled', () => {
    deferred = null;
    toast(`${APP_NAME} установлено — ищите иконку на рабочем столе`);
    notify();
  });
}

// Плашка «Установите на телефон»: только в браузере телефона, по ссылке, пока её не закрыли
export function bannerWanted() {
  if (isStandalone() || !isHttp() || !isPhone()) return false;
  try { return localStorage.getItem(DISMISS_KEY) !== '1'; } catch { return true; }
}
export function dismissBanner() {
  try { localStorage.setItem(DISMISS_KEY, '1'); } catch { /* без хранилища плашка вернётся после перезагрузки */ }
  notify();
}

export async function install() {
  if (deferred) {
    const e = deferred;
    deferred = null;
    e.prompt();
    const { outcome } = await e.userChoice.catch(() => ({ outcome: 'dismissed' }));
    if (outcome === 'accepted') dismissBanner();
    notify();
    return;
  }
  sheet(`Установить ${APP_NAME}`, (body, close) => {
    body.innerHTML = `<div class="stack">${steps()}<button class="btn primary block" data-close>Понятно</button></div>`;
  });
}

const step = (n, html) => `<div class="inst-step"><span class="inst-n">${n}</span><div>${html}</div></div>`;

function steps() {
  if (!isHttp()) {
    return `<p class="small">Это офлайн-файл с флешки — его нельзя поставить как приложение. Откройте на телефоне ссылку и установите оттуда:</p>
      <a class="link-row" href="${APP_URL}" target="_blank" rel="noopener">${ICON.install}<b class="grow">${APP_URL.replace('https://', '')}</b></a>`;
  }
  if (isIOS()) {
    return `<p class="small muted">На iPhone и iPad установка — через Safari, три шага:</p>
      ${step(1, `Откройте эту страницу в <b>Safari</b>`)}
      ${step(2, `Нажмите <b>«Поделиться»</b> <span class="inst-ico">${ICON.share}</span> внизу экрана`)}
      ${step(3, `Выберите <b>«На экран „Домой“»</b> <span class="inst-ico">${ICON.addbox}</span> и нажмите «Добавить»`)}
      <p class="xs muted">Иконка ${APP_NAME} появится на рабочем столе, приложение откроется без адресной строки и будет работать без интернета.</p>`;
  }
  return `<p class="small muted">Браузер пока не предложил окно установки. Можно поставить вручную:</p>
    ${step(1, `Откройте меню браузера <b>⋮</b>`)}
    ${step(2, `Выберите <b>«Установить приложение»</b> или <b>«Добавить на главный экран»</b>`)}
    <p class="xs muted">Иконка ${APP_NAME} появится на рабочем столе, приложение откроется без адресной строки и будет работать без интернета.</p>`;
}
