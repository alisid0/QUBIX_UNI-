import { writable, get } from 'svelte/store';

// Reader-comfort text size (like a book/reading app's A- / A+). Overrides the
// --qx-fs-body token on the root, so it scales the reading body everywhere.
const KEY = 'qubix-text-size';
const SIZES = { s: 15.5, m: 17.5, l: 19.5, xl: 21.5 };
const ORDER = ['s', 'm', 'l', 'xl'];

function loadInitial() {
  try {
    const v = localStorage.getItem(KEY);
    if (v && SIZES[v]) return v;
  } catch (_) {}
  return 'm';
}

function apply(level) {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--qx-fs-body', SIZES[level] + 'px');
  }
  try { localStorage.setItem(KEY, level); } catch (_) {}
}

function createTextSize() {
  const { subscribe, set } = writable(loadInitial());
  const step = (dir) => {
    const i = ORDER.indexOf(get({ subscribe }));
    const next = ORDER[Math.max(0, Math.min(ORDER.length - 1, i + dir))];
    apply(next);
    set(next);
  };
  return {
    subscribe,
    set(v) { if (SIZES[v]) { apply(v); set(v); } },
    inc() { step(1); },
    dec() { step(-1); },
    ORDER
  };
}

export const textSize = createTextSize();

// Apply the persisted size on load.
if (typeof document !== 'undefined') apply(get(textSize));
