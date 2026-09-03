import fs from 'node:fs';

// Every colour a learner reads has to be readable.
//
// This guard exists because the knowledge was already in the repository and in
// the wrong file. scripts/build-book.mjs derives --teal-text, --orange-text and
// --rose-text as separate variants of the identity hues purely so text clears
// 4.5:1, cites WCAG 1.4.11 by number, and its comments call contrast "a
// procurement gate". None of that discipline reached qubix-tokens.css, where
// --qx-text-faint sat at 2.57:1 and was used 213 times, including the .hint a
// stuck learner is reading.
//
// Nothing caught it, because each colour on its own looked deliberate. That is
// the same reason check-palette exists, and this is the same shape of answer.
//
//   node scripts/check-contrast.mjs

const AA_TEXT = 4.5;   // WCAG 1.4.3, normal-size text
const AA_LARGE = 3;    // 1.4.3 for large text, and 1.4.11 for control edges

const css = fs.readFileSync(new URL('../src/lib/styles/qubix-tokens.css', import.meta.url), 'utf8');

// Colours that are not a flat hex cannot be measured against a ground without
// compositing them first. They are surfaces built from rgba() over the page,
// so the page colour underneath is what a reader actually sees, and that is
// already covered by checking --qx-bg.
const block = selector => {
  const start = css.indexOf(selector);
  if (start === -1) return {};
  const body = css.slice(start, css.indexOf('}', start));
  const out = {};
  for (const m of body.matchAll(/--(qx-[a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) out[m[1]] = m[2];
  return out;
};

const themes = {
  light: { ...block(':root {'), ...block(':root[data-qx-theme="light"]') },
  dark: block(':root[data-qx-theme="dark"]')
};

const channel = v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
const luminance = hex => {
  const [r, g, b] = [1, 3, 5].map(i => channel(parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

// Two palettes, two grounds.
//
// The paper palette sets words on --qx-bg. The ink palette is the dark
// workbench a mission runs on, and --qx-ink-text is meant to sit on --qx-ink,
// never on paper. Measuring one against the other reports 1.06:1 and means
// nothing, so each family is judged against the surfaces it is actually used
// on. Modelling this is what lets the ink palette be checked at all; before
// today nothing measured it.
const PAPER_GROUNDS = ['qx-bg', 'qx-surface', 'qx-bg-radial'];
const INK_GROUNDS = ['qx-ink', 'qx-ink-rise', 'qx-ink-panel', 'qx-ink-well'];

const isText = name => /^qx-text/.test(name) || /-text(-[a-z0-9]+)?$/.test(name);
const isInk = name => name.startsWith('qx-ink-');
const groundsFor = name => (isInk(name) ? INK_GROUNDS : PAPER_GROUNDS);

let failed = false;
const check = (condition, label, detail) => {
  console.log(`   ${condition ? 'PASS' : 'FAIL'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

for (const [theme, tokens] of Object.entries(themes)) {
  for (const [name, value] of Object.entries(tokens)) {
    if (!isText(name)) continue;
    const grounds = groundsFor(name).filter(g => tokens[g]);
    if (!grounds.length) continue;

    // A text token is judged against the worst ground it can legally sit on.
    let worst = { ratio: Infinity, ground: null };
    for (const g of grounds) {
      const r = ratio(value, tokens[g]);
      if (r < worst.ratio) worst = { ratio: r, ground: g };
    }
    check(worst.ratio >= AA_TEXT,
      `${theme.padEnd(5)} --${name.padEnd(20)} on --${worst.ground}`,
      `${worst.ratio.toFixed(2)}:1`);
  }
}

// Named because it is the one people reach for as though it were text. It is a
// border colour and 3:1 is the right bar for it, but if it ever drops below
// that the controls it outlines stop being visible at all.
for (const [theme, tokens] of Object.entries(themes)) {
  if (!tokens['qx-danger'] || !tokens['qx-bg']) continue;
  const r = ratio(tokens['qx-danger'], tokens['qx-bg']);
  check(r >= AA_LARGE, `${theme.padEnd(5)} --qx-danger holds up as a control edge`, `${r.toFixed(2)}:1`);
}

// The declaration, not the word: this file's own comment explains why it went.
check(!/--qx-text-faintest\s*:/.test(css),
  'the removed --qx-text-faintest has not come back');

console.log(failed
  ? '\nContrast checks failed. A colour a learner reads is below 4.5:1.\n'
  : '\nevery text token clears 4.5:1 on every ground it can sit on\n');
process.exit(failed ? 1 : 0);
