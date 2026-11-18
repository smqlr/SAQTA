// Поле адреса с подсказками из адресов Актобе (OpenStreetMap). Работает без интернета.
import { search } from './map/address.js';
import { ICON } from './icons.js';
import { esc } from './format.js';

// st — объект состояния экрана: { q — набранный текст, addr — выбранный адрес { label, lat, lon } }
export function addressField(id, st, { label = 'Адрес', placeholder = 'Улица и дом, например Тургенева 109' } = {}) {
  const value = st.q != null ? st.q : st.addr ? st.addr.label : '';
  return `<div class="addr">
    <div class="field"><label for="${id}">${label}</label>
      <div class="addr-in">${ICON.search}<input class="input" id="${id}" type="search" autocomplete="off" enterkeyhint="search" placeholder="${esc(placeholder)}" value="${esc(value)}" aria-autocomplete="list" aria-controls="${id}-list"></div>
    </div>
    <div class="sugg" id="${id}-list" role="listbox" hidden></div>
  </div>`;
}

export function bindAddress(root, id, st, onPick) {
  const input = root.querySelector(`#${id}`);
  if (!input) return;
  const box = root.querySelector(`#${id}-list`);
  let cur = [];
  const show = (list) => {
    cur = list;
    box.innerHTML = list.length
      ? list.map((a, i) => `<button type="button" class="sugg-i" role="option" data-i="${i}">${ICON.pin}<span>${esc(a.label)}</span></button>`).join('')
      : '<div class="sugg-empty">Не нашли такой адрес в Актобе. Попробуйте «улица, дом» или поставьте точку на карте</div>';
    box.hidden = false;
  };
  const pick = (a) => { st.q = null; box.hidden = true; onPick(a); };
  input.addEventListener('input', () => {
    st.q = input.value;
    if (input.value.trim().length < 2) { box.hidden = true; return; }
    show(search(input.value));
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (cur[0]) pick(cur[0]); }
    if (e.key === 'Escape') box.hidden = true;
  });
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (b) pick(cur[+b.dataset.i]);
  });
}
