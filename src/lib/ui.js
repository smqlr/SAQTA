// Общие элементы интерфейса: тост, нижний лист (модальное окно), бирки.
import { ICON } from './icons.js';
import { TAGS } from '../data.js';
import { esc } from './format.js';

export function toast(text, ms = 2600) {
  let box = document.querySelector('.toasts');
  if (!box) {
    box = document.createElement('div');
    box.className = 'toasts';
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    document.body.appendChild(box);
  }
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  box.appendChild(t);
  setTimeout(() => t.remove(), ms);
}

// Нижний лист: render(body, close) заполняет содержимое; возвращает close().
export function sheet(title, render, { onClose } = {}) {
  const back = document.createElement('div');
  back.className = 'sheet-back';
  back.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <div class="sheet-head"><h2>${esc(title)}</h2><button class="icon-btn" data-close aria-label="Закрыть">${ICON.close}</button></div>
    <div class="sheet-body"></div></div>`;
  const prevFocus = document.activeElement;
  const close = () => {
    back.remove();
    document.removeEventListener('keydown', onKey);
    onClose?.();
    prevFocus?.focus?.();
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', onKey);
  document.body.appendChild(back);
  render(back.querySelector('.sheet-body'), close);
  back.querySelector('.sheet').focus?.();
  return close;
}

export const tagChip = (tag) =>
  tag ? `<span class="tag ${tag}" title="${esc(TAGS[tag].hint)}">${TAGS[tag].label}</span>` : '<span class="tag none">ждёт триажа</span>';

export const demoMark = (text = 'пример') => `<span class="note-demo">${esc(text)}</span>`;
export const simMark = (text = 'симуляция') => `<span class="note-demo note-sim">${esc(text)}</span>`;
export const realMark = (text = 'настоящее') => `<span class="note-demo note-real">${esc(text)}</span>`;
export const tbd = (text = 'уточняется') => `<em class="tbd">${esc(text)}</em>`;
