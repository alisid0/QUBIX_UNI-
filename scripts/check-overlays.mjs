// Anything that covers the page must be opaque.
//
// The --qx-surface family is translucent on dark by design: a card sitting in
// the page flow should pick up the radial behind it. That is right for a card
// and wrong for anything that covers the page, and the difference is invisible
// in light mode, where the same token is solid white.
//
// Ask Qubix shipped with `background: var(--qx-surface)` on its panel. On
// desktop light it looked correct. On mobile dark the panel is fixed and full
// width, the token resolves to rgba(255,255,255,0.05), and the page's own
// headline read straight through the assistant's header into its text. It was
// reported from a phone, which is the only place it was obvious.
//
// So: find every rule that covers the page, and refuse a translucent background.
//
//   node scripts/check-overlays.mjs

import { readFileSync, readdirSync } from 'node:fs';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const TOKENS = dir('../src/lib/styles/qubix-tokens.css');
const COMPONENTS = dir('../src/lib/components/');
const VIEWS = dir('../src/views/');

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
  if (!condition) failed = true;
};

/* ── which tokens are see-through, per theme ─────────────────────────────── */
const css = readFileSync(TOKENS, 'utf8');
const blocks = [...css.matchAll(/:root\[data-qx-theme="(light|dark)"\]\s*\{([\s\S]*?)\n\}/g)];
check(blocks.length === 2, 'both themes are declared in qubix-tokens.css',
  blocks.map(b => b[1] && b[0].match(/"(light|dark)"/)[1]).join(', '));

const translucent = new Set();
const values = new Map();
for (const [, theme, body] of blocks) {
  for (const [, name, value] of body.matchAll(/(--qx-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    values.set(`${theme}|${name}`, value.trim());
    const alpha = /rgba\([^)]*,\s*([\d.]+)\s*\)/.exec(value);
    if (alpha && Number(alpha[1]) < 0.95) translucent.add(name);
  }
}
check(translucent.size > 0, 'some tokens are deliberately translucent',
  [...translucent].join(', '));

/* ── the overlay tokens exist and are opaque in both themes ──────────────── */
for (const token of ['--qx-overlay', '--qx-overlay-2']) {
  const light = values.get(`light|${token}`);
  const dark = values.get(`dark|${token}`);
  check(Boolean(light && dark), `${token} is defined in both themes`, `${light} · ${dark}`);
  check(!translucent.has(token), `${token} is opaque, which is the whole point of it`);
}

/* ── no covering rule may use a translucent background ───────────────────── */
const files = [
  ...readdirSync(COMPONENTS).filter(n => n.endsWith('.svelte')).map(n => ({ n, p: COMPONENTS + n })),
  ...readdirSync(VIEWS).filter(n => n.endsWith('.svelte')).map(n => ({ n, p: VIEWS + n }))
];

// The overlay containers themselves: each is the thing painted over the page,
// rather than something sitting inside one that already is.
const CONTAINERS = /^\s*\.(assistant-panel|launcher|modal-card|modal-sheet)\s*$/;

const offenders = [];
let covering = 0;
for (const file of files) {
  const source = readFileSync(file.p, 'utf8');
  const style = source.slice(source.indexOf('<style>'));
  if (!style) continue;

  // Each rule body, with its selector.
  for (const [, selector, body] of style.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    // A descendant of an overlay does not cover the page: its container does,
    // and a tint over an opaque card is the token family working as intended.
    // .modal-number and friends were flagged on the first run and were correct,
    // because .modal-card behind them uses --qx-bg, which is opaque.
    const covers = /position\s*:\s*fixed/.test(body) || CONTAINERS.test(selector);
    if (!covers) continue;
    const background = /background(?:-color)?\s*:\s*([^;}]+)/.exec(body);
    if (!background) continue;
    covering += 1;
    const token = /var\((--qx-[a-z0-9-]+)/.exec(background[1]);
    if (token && translucent.has(token[1])) {
      offenders.push(`${file.n} ${selector.trim().slice(0, 34)} uses ${token[1]}`);
    }
  }
}

check(covering > 0, 'covering rules were found to check', `${covering} rules`);
check(offenders.length === 0,
  'nothing that covers the page has a see-through background',
  offenders.length ? offenders.join(' · ') : `${covering} covering rules are opaque`);

console.log(failed
  ? '\n  a covering surface will let the page through on dark\n'
  : '\n  every covering surface is opaque in both themes\n');
process.exit(failed ? 1 : 0);
