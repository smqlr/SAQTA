// Проект переименован из QAITA в SAQTA (19.11). Сохранённое в браузере лежало под ключами qaita-*:
// кошелёк, профиль и обучение, тема, адрес сервера ИИ. Переносим их в saqta-*, чтобы ничего не потерялось.
// Модуль импортируется в main.js первым — до store.js и остальных, которые читают хранилище при загрузке.
const OLD = 'qaita-';
const NEW = 'saqta-';
try {
  const old = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(OLD)) old.push(k);
  }
  for (const k of old) {
    const to = NEW + k.slice(OLD.length);
    if (localStorage.getItem(to) == null) localStorage.setItem(to, localStorage.getItem(k));
    localStorage.removeItem(k);
  }
} catch { /* нет хранилища — переносить нечего */ }
