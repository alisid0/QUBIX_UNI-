import { writable, get } from 'svelte/store';

const KEY = 'qubix-theme';

function loadInitial() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    if (stored === 'paper') return 'light'; // migrate the retired 'paper' theme
  } catch (_) {}
  // First visit — show the warm light theme. Dark-theme users with a stored
  // preference are respected; this only affects brand-new visitors.
  return 'light';
}

function createThemeStore() {
  const { subscribe, set, update } = writable(loadInitial());

  function apply(value) {
    try { localStorage.setItem(KEY, value); } catch (_) {}
    if (typeof document !== 'undefined') document.documentElement.dataset.qxTheme = value;
  }

  const cycle = ['dark', 'light'];

  return {
    subscribe,
    set(value) { apply(value); set(value); },
    toggle() {
      update(v => {
        const idx = cycle.indexOf(v);
        const next = cycle[(idx + 1) % cycle.length];
        apply(next);
        return next;
      });
    }
  };
}

export const theme = createThemeStore();

if (typeof document !== 'undefined') {
  document.documentElement.dataset.qxTheme = get(theme);
}
