// Builds the Qubix reference e-books from source in book/.
//
// Why this exists: Book 1 arrived as a PDF with no origin in the repo. A PDF
// cannot be diffed, cannot be reviewed a paragraph at a time, and drifts from
// the boards the moment either side is edited. The book is now authored as
// data here and rendered to a single self-contained HTML file that prints to
// PDF from any browser.
//
// Figures are generated as SVG from numbers, never drawn by hand and never
// rastered. That is the project media rule: technical visuals must be
// deterministic. A curve in this book is computed from its own formula, so a
// figure cannot disagree with the text above it.
//
//   node scripts/build-book.mjs            # all books
//   node scripts/build-book.mjs --open     # and open the result

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SRC = join(ROOT, 'book');
const OUT = join(ROOT, 'book', 'dist');

/* ---------------------------------------------------------------- palette */
// Taken from the Draft 1 PDF so the book keeps the identity it already has.
const C = {
  ink: '#16283f', teal: '#12897c', orange: '#e0813a', rose: '#c0504d',
  paper: '#faf7f0', rule: '#d8d3c7', mute: '#5d6b7d', faint: '#eae5d9'
};

/* ------------------------------------------------------------------- math */
// Deterministic, no dependency, no MathJax. Handles the notation this book
// actually uses; anything else passes through unchanged rather than silently
// rendering wrong.
// Letter exponents matter as much as numeric ones: this book writes 2^x and
// b^x far more often than it writes x^2. Unicode has a superscript for every
// lowercase letter except q, which nothing here uses as an exponent.
const SUP = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '-': '⁻', '+': '⁺', '−': '⁻',
  a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ',
  n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ'
};

export const math = s => String(s)
  .replace(/\bsqrt\(([^)]*)\)/g, '√($1)')
  .replace(/\^\{([^}]+)\}/g, (_, g) => [...g].map(c => SUP[c] ?? c).join(''))
  .replace(/\^(-?\d+|[a-z])/g, (_, g) => [...g].map(c => SUP[c] ?? c).join(''))
  // No word -> symbol rule here. Converting the word "delta" to Δ would eat
  // the sentence that tells a reader how to say it. Write Δ directly.
  // Both forms: prose is escaped before formatting, so "->" has already
  // become "-&gt;" by the time it arrives here.
  .replace(/--?&gt;/g, '→').replace(/-->/g, '⟶').replace(/->/g, '→')
  .replace(/\binfinity\b/g, '∞')
  .replace(/\bf-1\b/g, 'f⁻¹').replace(/\bf\^-1/g, 'f⁻¹')
  .replace(/(?<=[\s(=,])-(?=[\d.(a-z])/g, '−')   // real minus, not a hyphen
  .replace(/(?<=\d)\s*\*\s*(?=\d)/g, ' × ')
  .replace(/<=/g, '≤').replace(/>=/g, '≥').replace(/!=/g, '≠');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Inline emphasis: *italic*, **bold**, `code`. Applied after escaping.
const rich = s => math(esc(s))
  .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
  .replace(/\*([^*]+)\*/g, '<i>$1</i>')
  .replace(/`([^`]+)`/g, '<code>$1</code>');

/* ---------------------------------------------------------------- figures */
// Every figure is a pure function of numbers. Plane geometry is shared so
// that no two figures in the book use different axis conventions.

const plane = (o = {}) => {
  const s = { x0: -4, x1: 4, y0: -2, y1: 8, w: 260, h: 200, ...o };
  const pad = { l: 30, r: 12, t: 12, b: 22 };
  const iw = s.w - pad.l - pad.r, ih = s.h - pad.t - pad.b;
  const X = x => pad.l + ((x - s.x0) / (s.x1 - s.x0)) * iw;
  const Y = y => pad.t + ih - ((y - s.y0) / (s.y1 - s.y0)) * ih;
  return { ...s, X, Y, pad, iw, ih };
};

const axes = p => {
  const bits = [];
  for (let x = Math.ceil(p.x0); x <= p.x1; x++)
    bits.push(`<line x1="${p.X(x)}" y1="${p.pad.t}" x2="${p.X(x)}" y2="${p.pad.t + p.ih}" stroke="${C.rule}" stroke-width=".5"/>`);
  for (let y = Math.ceil(p.y0); y <= p.y1; y++)
    bits.push(`<line x1="${p.pad.l}" y1="${p.Y(y)}" x2="${p.pad.l + p.iw}" y2="${p.Y(y)}" stroke="${C.rule}" stroke-width=".5"/>`);
  if (p.y0 <= 0 && p.y1 >= 0) bits.push(`<line x1="${p.pad.l}" y1="${p.Y(0)}" x2="${p.pad.l + p.iw}" y2="${p.Y(0)}" stroke="${C.mute}" stroke-width="1.2"/>`);
  if (p.x0 <= 0 && p.x1 >= 0) bits.push(`<line x1="${p.X(0)}" y1="${p.pad.t}" x2="${p.X(0)}" y2="${p.pad.t + p.ih}" stroke="${C.mute}" stroke-width="1.2"/>`);
  return bits.join('');
};

// Sample a function, breaking the polyline wherever it is undefined or leaves
// the frame. Without the break, 1/x draws a false vertical line through zero.
const curve = (p, f, colour = C.teal, width = 2) => {
  const runs = [[]];
  for (let i = 0; i <= 400; i++) {
    const x = p.x0 + (i / 400) * (p.x1 - p.x0);
    const y = f(x);
    if (!Number.isFinite(y) || y < p.y0 - 2 || y > p.y1 + 2) { if (runs.at(-1).length) runs.push([]); continue; }
    runs.at(-1).push(`${p.X(x).toFixed(1)},${p.Y(y).toFixed(1)}`);
  }
  return runs.filter(r => r.length > 1)
    .map(r => `<polyline points="${r.join(' ')}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round"/>`).join('');
};

const dot = (p, x, y, colour = C.ink, r = 4) =>
  `<circle cx="${p.X(x)}" cy="${p.Y(y)}" r="${r}" fill="${colour}"/>`;
const hole = (p, x, y, colour = C.rose) =>
  `<circle cx="${p.X(x)}" cy="${p.Y(y)}" r="4.5" fill="${C.paper}" stroke="${colour}" stroke-width="2"/>`;
// Figure text goes through the same formatter as body text. Without this a
// title reads "h(x)=sqrt(x)" while the paragraph beside it reads h(x)=√(x).
const label = (x, y, t, colour = C.mute, size = 9, anchor = 'middle') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${colour}" font-family="ui-sans-serif,system-ui,sans-serif">${esc(math(t))}</text>`;

const svg = (w, h, body, cls = '') =>
  `<svg class="fig ${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">${body}</svg>`;

// Defaults shared by the drawing and the description of a figure. Duplicating
// them would let the two drift, which is the whole failure mode this file
// exists to prevent.
export const FIG_DEFAULTS = {
  secant: { f: x => 0.42 * x * x - 1.6 * x + 3.4, a: 1.4, b: 5.6, x0: 0, x1: 7, y0: 0, y1: 6 },
  secants: { f: x => 0.42 * x * x - 1.6 * x + 3.4, a: 1.4, bs: [5.6, 4.4, 3.2, 2.2], x0: 0, x1: 7, y0: 0, y1: 6 },
  rects: { f: x => 0.16 * x * x + 0.6, n: 8, x0: 0, x1: 6 },
  riemann: { f: x => x * x, n: 4, x0: 0, x1: 1, side: 'right' },
  zoom: { spans: [2, 0.5, 0.1] },
  numberline: { from: -6, to: 6 },
  graph: { x0: -4, x1: 4 },
  steps: { from: 0, to: 4 }
};

const FIG = {
  // A rule that takes something in and settles on something out.
  machine({ rule, input, output, inLabel = '', outLabel = '' }) {
    const b = [];
    b.push(`<circle cx="42" cy="60" r="26" fill="${C.orange}"/>`, label(42, 65, input, '#fff', 15));
    b.push(`<path d="M74 60 h44" stroke="${C.ink}" stroke-width="1.6" marker-end="url(#ar)"/>`);
    b.push(`<rect x="124" y="24" width="132" height="72" rx="12" fill="#eef6f4" stroke="${C.teal}" stroke-width="1.6"/>`);
    b.push(label(190, 50, 'FUNCTION', C.ink, 10));
    b.push(`<text x="190" y="72" text-anchor="middle" font-size="13" fill="${C.teal}" font-family="ui-monospace,monospace">${esc(math(rule))}</text>`);
    b.push(`<path d="M262 60 h44" stroke="${C.ink}" stroke-width="1.6" marker-end="url(#ar)"/>`);
    b.push(`<circle cx="338" cy="60" r="26" fill="${C.teal}"/>`, label(338, 65, output, '#fff', 15));
    if (inLabel) b.push(label(42, 102, inLabel));
    if (outLabel) b.push(label(338, 102, outLabel));
    return svg(380, 116, b.join(''));
  },

  // Two mappings side by side: the fork is what fails, not the repeat.
  // No `caption` here on purpose. The block renderer owns captions; a figure
  // that also drew its own would print every caption twice, once clipped
  // inside the frame. Short in-frame labels go in `tag`.
  mapping({ pairs, broken = null, tag = '' }) {
    const b = [];
    const ins = [...new Set(pairs.map(p => p[0]))];
    const outs = [...new Set(pairs.flatMap(p => p.slice(1)))];
    const yI = i => 34 + i * 38, yO = i => 34 + i * 38;
    b.push(`<ellipse cx="52" cy="${34 + (ins.length - 1) * 19}" rx="34" ry="${28 + ins.length * 14}" fill="${broken ? '#fdf2ef' : C.faint}"/>`);
    b.push(`<ellipse cx="196" cy="${34 + (outs.length - 1) * 19}" rx="34" ry="${28 + outs.length * 14}" fill="${broken ? '#fdf2ef' : C.faint}"/>`);
    b.push(label(52, 14, 'INPUT', C.mute, 8), label(196, 14, 'OUTPUT', C.mute, 8));
    pairs.forEach(([i, ...os]) => os.forEach(o => {
      const bad = broken && i === broken;
      b.push(`<line x1="72" y1="${yI(ins.indexOf(i))}" x2="176" y2="${yO(outs.indexOf(o))}" stroke="${bad ? C.rose : C.ink}" stroke-width="${bad ? 1.6 : 1.1}"/>`);
    }));
    ins.forEach((v, i) => { b.push(`<circle cx="52" cy="${yI(i)}" r="13" fill="${C.orange}"/>`, label(52, yI(i) + 4, v, '#fff', 11)); });
    outs.forEach((v, i) => { b.push(`<circle cx="196" cy="${yO(i)}" r="13" fill="${broken && pairs.find(p => p[0] === broken)?.includes(v) ? C.rose : C.teal}"/>`, label(196, yO(i) + 4, v, '#fff', 11)); });
    const h = 34 + Math.max(ins.length, outs.length) * 38 + (tag ? 18 : 6);
    if (tag) b.push(label(124, h - 5, tag, broken ? C.rose : C.teal, 9));
    return svg(248, h, b.join(''));
  },

  // A labelled graph of one formula.
  graph({ f, title, note, x0 = -4, x1 = 4, y0 = -2, y1 = 8, marks = [], holes = [], w = 250, h = 190, second = null }) {
    const p = plane({ x0, x1, y0, y1, w, h });
    const b = [`<rect width="${w}" height="${h}" fill="${C.paper}" rx="6"/>`, axes(p)];
    if (second) b.push(curve(p, second.f, C.rule, 1.5));
    b.push(curve(p, f));
    marks.forEach(([x, y, c]) => b.push(dot(p, x, y, c || C.orange)));
    holes.forEach(([x, y]) => b.push(hole(p, x, y)));
    if (title) b.push(label(10, 16, title, C.mute, 8, 'start'));
    if (note) b.push(`<text x="${w - 10}" y="${h - 7}" text-anchor="end" font-size="10" fill="${C.mute}" font-family="ui-monospace,monospace">${esc(math(note))}</text>`);
    return svg(w, h, b.join(''), 'graph');
  },

  // Secant closing on a tangent. The whole bridge to Book 2 in one picture.
  secant(o) {
    const { f, a, b: bx, x0, x1, y0, y1 } = { ...FIG_DEFAULTS.secant, ...o };
    const p = plane({ x0, x1, y0, y1, w: 330, h: 200 });
    const g = [`<rect width="330" height="200" fill="${C.paper}" rx="6"/>`, axes(p), curve(p, f)];
    const m = (f(bx) - f(a)) / (bx - a);
    const ext = t => f(a) + m * (t - a);
    g.push(`<line x1="${p.X(x0)}" y1="${p.Y(ext(x0))}" x2="${p.X(x1)}" y2="${p.Y(ext(x1))}" stroke="${C.orange}" stroke-width="1.6"/>`);
    g.push(dot(p, a, f(a)), dot(p, bx, f(bx)));
    g.push(label(p.X(a), p.Y(f(a)) - 10, 'A', C.ink, 11), label(p.X(bx), p.Y(f(bx)) - 10, 'B', C.ink, 11));
    g.push(label(p.X(bx) - 6, p.Y(f(bx)) + 20, `slope ${m.toFixed(2)}`, C.orange, 9, 'end'));
    return svg(330, 200, g.join(''), 'graph');
  },

  // Rectangles under a curve, thinning left to right.
  rects(o) {
    const { f, n, x0, x1 } = { ...FIG_DEFAULTS.rects, ...o };
    const p = plane({ x0, x1, y0: 0, y1: 7, w: 330, h: 200 });
    const g = [`<rect width="330" height="200" fill="${C.paper}" rx="6"/>`];
    const dx = (x1 - x0) / n;
    for (let i = 0; i < n; i++) {
      const xa = x0 + i * dx, y = f(xa + dx);
      g.push(`<rect x="${p.X(xa)}" y="${p.Y(y)}" width="${p.X(xa + dx) - p.X(xa) - 0.6}" height="${p.Y(0) - p.Y(y)}" fill="#d9ebe7" stroke="${C.teal}" stroke-width=".8"/>`);
    }
    g.push(curve(p, f, C.orange));
    return svg(330, 200, g.join(''), 'graph');
  },

  // A number line with shaded stretches and open/closed endpoints. Interval
  // notation is unteachable without one, and Draft 2 introduced the notation
  // with no picture anywhere in the chapter.
  numberline({ from = -6, to = 6, spans = [], marks = [], w = 420, ticks = true }) {
    const pad = 26, y = 46;
    const X = v => pad + ((v - from) / (to - from)) * (w - 2 * pad);
    const b = [`<rect width="${w}" height="76" fill="${C.paper}" rx="6"/>`];
    spans.forEach(s => {
      const a = X(Math.max(s.a ?? from, from)), z = X(Math.min(s.b ?? to, to));
      b.push(`<rect x="${a}" y="${y - 7}" width="${Math.max(0, z - a)}" height="14" fill="${s.tone === 'out' ? '#f6dfd2' : '#cfe6e1'}"/>`);
      if (s.label) b.push(label((a + z) / 2, y - 15, s.label, s.tone === 'out' ? '#a85a1d' : C.teal, 9));
    });
    b.push(`<line x1="${pad - 12}" y1="${y}" x2="${w - pad + 12}" y2="${y}" stroke="${C.ink}" stroke-width="1.3" marker-end="url(#ar)"/>`);
    if (ticks) for (let v = Math.ceil(from); v <= to; v++) {
      b.push(`<line x1="${X(v)}" y1="${y - 4}" x2="${X(v)}" y2="${y + 4}" stroke="${C.mute}" stroke-width="1"/>`);
      b.push(label(X(v), y + 17, String(v), C.mute, 9));
    }
    marks.forEach(m => {
      b.push(m.open
        ? `<circle cx="${X(m.x)}" cy="${y}" r="5.5" fill="${C.paper}" stroke="${C.rose}" stroke-width="2"/>`
        : `<circle cx="${X(m.x)}" cy="${y}" r="5.5" fill="${C.teal}"/>`);
      if (m.label) b.push(label(X(m.x), y - 13, m.label, m.open ? C.rose : C.teal, 9));
    });
    return svg(w, 76, b.join(''));
  },

  // Machines wired in series, which is what a composite actually is.
  chain({ stages, input, values, w = 460 }) {
    const b = [];
    const boxW = 96, gap = 34, x0 = 46;
    b.push(`<circle cx="22" cy="52" r="19" fill="${C.orange}"/>`, label(22, 57, input, '#fff', 13));
    stages.forEach((s, i) => {
      const x = x0 + i * (boxW + gap);
      b.push(`<path d="M${x - gap + 4} 52 h${gap - 10}" stroke="${C.ink}" stroke-width="1.5" marker-end="url(#ar)"/>`);
      b.push(`<rect x="${x}" y="26" width="${boxW}" height="52" rx="9" fill="#eef6f4" stroke="${C.teal}" stroke-width="1.5"/>`);
      b.push(`<text x="${x + boxW / 2}" y="${57}" text-anchor="middle" font-size="12" fill="${C.teal}" font-family="ui-monospace,monospace">${esc(math(s))}</text>`);
      if (values && values[i] !== undefined) {
        const vx = x + boxW + gap / 2;
        b.push(`<path d="M${x + boxW + 4} 52 h${gap - 10}" stroke="${C.ink}" stroke-width="1.5" marker-end="url(#ar)"/>`);
        b.push(label(vx, 42, String(values[i]), C.ink, 12));
      }
    });
    const last = x0 + stages.length * (boxW + gap);
    b.push(`<circle cx="${last + 4}" cy="52" r="19" fill="${C.teal}"/>`, label(last + 4, 57, String(values?.at(-1) ?? ''), '#fff', 13));
    return svg(w, 92, b.join(''));
  },

  // The rule written with a blank, so substitution is a physical act.
  blanks({ rule, sub, result, w = 420 }) {
    const b = [`<rect width="${w}" height="96" fill="${C.paper}" rx="6"/>`];
    b.push(`<text x="${w / 2}" y="40" text-anchor="middle" font-size="17" fill="${C.ink}" font-family="ui-monospace,monospace">${esc(math(rule))}</text>`);
    b.push(`<text x="${w / 2}" y="70" text-anchor="middle" font-size="17" fill="${C.teal}" font-family="ui-monospace,monospace">${esc(math(result))}</text>`);
    b.push(label(w / 2, 88, sub, C.mute, 9));
    return svg(w, 96, b.join(''));
  },

  // Several test lines swept across a graph, with every hit marked.
  linetest({ f, second = null, at = [], dir = 'v', title, note, x0 = -4, x1 = 4, y0 = -3, y1 = 6, w = 280, h = 210 }) {
    const p = plane({ x0, x1, y0, y1, w, h });
    const b = [`<rect width="${w}" height="${h}" fill="${C.paper}" rx="6"/>`, axes(p)];
    b.push(curve(p, f));
    if (second) b.push(curve(p, second, C.teal));
    at.forEach(v => {
      const hits = [];
      if (dir === 'v') {
        b.push(`<line x1="${p.X(v)}" y1="${p.pad.t}" x2="${p.X(v)}" y2="${p.pad.t + p.ih}" stroke="${C.orange}" stroke-width="1.2" stroke-dasharray="3 3"/>`);
        for (const g of [f, second].filter(Boolean)) { const y = g(v); if (Number.isFinite(y) && y >= y0 && y <= y1) hits.push([v, y]); }
      } else {
        b.push(`<line x1="${p.pad.l}" y1="${p.Y(v)}" x2="${p.pad.l + p.iw}" y2="${p.Y(v)}" stroke="${C.orange}" stroke-width="1.2" stroke-dasharray="3 3"/>`);
        for (let i = 0; i <= 600; i++) {
          const x = x0 + (i / 600) * (x1 - x0), y = f(x);
          if (Number.isFinite(y) && Math.abs(y - v) < (y1 - y0) / 300) { if (!hits.some(k => Math.abs(k[0] - x) < 0.25)) hits.push([x, y]); }
        }
      }
      hits.forEach(([hx, hy]) => b.push(dot(p, hx, hy, hits.length > 1 ? C.rose : C.teal, 4)));
    });
    if (title) b.push(label(10, 16, title, C.mute, 8, 'start'));
    if (note) b.push(`<text x="${w - 10}" y="${h - 7}" text-anchor="end" font-size="10" fill="${C.mute}" font-family="ui-monospace,monospace">${esc(math(note))}</text>`);
    return svg(w, h, b.join(''), 'graph');
  },

  // A staircase of equal input steps, showing what each one does to the output.
  steps({ f, from = 0, to = 4, title, note, x0 = -1, x1 = 5, y0 = -1, y1 = 18, w = 280, h = 210 }) {
    const p = plane({ x0, x1, y0, y1, w, h });
    const b = [`<rect width="${w}" height="${h}" fill="${C.paper}" rx="6"/>`, axes(p), curve(p, f)];
    for (let x = from; x < to; x++) {
      const ya = f(x), yb = f(x + 1);
      b.push(`<line x1="${p.X(x)}" y1="${p.Y(ya)}" x2="${p.X(x + 1)}" y2="${p.Y(ya)}" stroke="${C.mute}" stroke-width="1.1" stroke-dasharray="2 2"/>`);
      b.push(`<line x1="${p.X(x + 1)}" y1="${p.Y(ya)}" x2="${p.X(x + 1)}" y2="${p.Y(yb)}" stroke="${C.orange}" stroke-width="2"/>`);
      b.push(label(p.X(x + 1) + 12, (p.Y(ya) + p.Y(yb)) / 2 + 3, `+${+(yb - ya).toFixed(2)}`, C.orange, 9, 'start'));
      b.push(dot(p, x, ya, C.ink, 3));
    }
    b.push(dot(p, to, f(to), C.ink, 3));
    if (title) b.push(label(10, 16, title, C.mute, 8, 'start'));
    if (note) b.push(`<text x="${w - 10}" y="${h - 7}" text-anchor="end" font-size="10" fill="${C.mute}" font-family="ui-monospace,monospace">${esc(math(note))}</text>`);
    return svg(w, h, b.join(''), 'graph');
  },

  // A function, its inverse, the diagonal they mirror in, and one pair joined.
  reflect({ f, finv, pair, x0 = -6, x1 = 8, y0 = -6, y1 = 8, w = 300, h = 260, note }) {
    const p = plane({ x0, x1, y0, y1, w, h });
    const b = [`<rect width="${w}" height="${h}" fill="${C.paper}" rx="6"/>`, axes(p)];
    b.push(`<line x1="${p.X(Math.max(x0, y0))}" y1="${p.Y(Math.max(x0, y0))}" x2="${p.X(Math.min(x1, y1))}" y2="${p.Y(Math.min(x1, y1))}" stroke="${C.mute}" stroke-width="1.2" stroke-dasharray="4 3"/>`);
    b.push(label(p.X(Math.min(x1, y1)) - 6, p.Y(Math.min(x1, y1)) - 6, 'y = x', C.mute, 9, 'end'));
    b.push(curve(p, f, C.teal));
    b.push(curve(p, finv, C.orange));
    if (pair) {
      const [a, c] = pair;
      b.push(`<line x1="${p.X(a)}" y1="${p.Y(c)}" x2="${p.X(c)}" y2="${p.Y(a)}" stroke="${C.rose}" stroke-width="1.1" stroke-dasharray="2 2"/>`);
      b.push(dot(p, a, c, C.teal), dot(p, c, a, C.orange));
      b.push(label(p.X(a), p.Y(c) - 10, `(${a}, ${c})`, C.teal, 9));
      b.push(label(p.X(c) + 8, p.Y(a) + 4, `(${c}, ${a})`, C.orange, 9, 'start'));
    }
    if (note) b.push(`<text x="${w - 10}" y="${h - 7}" text-anchor="end" font-size="10" fill="${C.mute}" font-family="ui-monospace,monospace">${esc(math(note))}</text>`);
    return svg(w, h, b.join(''), 'graph');
  },

  // Several secants from a fixed point, closing on the tangent.
  secants(o) {
    const { f, a, bs, x0, x1, y0, y1, w = 340, h = 220 } = { ...FIG_DEFAULTS.secants, ...o };
    const p = plane({ x0, x1, y0, y1, w, h });
    const g = [`<rect width="${w}" height="${h}" fill="${C.paper}" rx="6"/>`, axes(p), curve(p, f)];
    const line = (m, colour, width, dash = '') =>
      `<line x1="${p.X(x0)}" y1="${p.Y(f(a) + m * (x0 - a))}" x2="${p.X(x1)}" y2="${p.Y(f(a) + m * (x1 - a))}" stroke="${colour}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
    bs.forEach((bx, i) => {
      const m = (f(bx) - f(a)) / (bx - a);
      g.push(line(m, C.orange, 1.1 + i * 0.12));
      g.push(dot(p, bx, f(bx), C.orange, 3.2));
      g.push(label(p.X(bx), p.Y(f(bx)) - 9, m.toFixed(2), C.orange, 8));
    });
    const h0 = 1e-6, mt = (f(a + h0) - f(a - h0)) / (2 * h0);
    g.push(line(mt, C.teal, 2, '5 3'));
    g.push(dot(p, a, f(a), C.ink, 4.5));
    g.push(label(p.X(a), p.Y(f(a)) + 20, `tangent ${mt.toFixed(2)}`, C.teal, 9));
    return svg(w, h, g.join(''), 'graph');
  },

  // Zooming in on one input, three times, so a limit becomes a thing you watch.
  zoom({ f, at, holeAt = null, spans = [2, 0.5, 0.1], w = 165, h = 150 }) {
    return `<span class="zoom-row">` + spans.map(s => {
      const y = f(at + s / 3);
      const p = plane({ x0: at - s, x1: at + s, y0: y - s * 1.2, y1: y + s * 1.2, w, h });
      const b = [`<rect width="${w}" height="${h}" fill="${C.paper}" rx="6"/>`, axes(p), curve(p, f)];
      if (holeAt !== null) b.push(hole(p, at, holeAt));
      b.push(label(w / 2, h - 8, `window ±${s}`, C.mute, 9));
      return svg(w, h, b.join(''), 'graph');
    }).join('') + `</span>`;
  },

  // Left and right rectangle sums side by side, so over- and under-estimate
  // are one picture rather than two claims.
  riemann(o) {
    const { f, n, x0, x1, side, w = 250, h = 190, title } = { ...FIG_DEFAULTS.riemann, ...o };
    const top = Math.max(f(x0), f(x1)) * 1.15;
    const p = plane({ x0: x0 - (x1 - x0) * 0.1, x1: x1 + (x1 - x0) * 0.1, y0: 0, y1: top, w, h });
    const g = [`<rect width="${w}" height="${h}" fill="${C.paper}" rx="6"/>`, axes(p)];
    const dx = (x1 - x0) / n;
    let total = 0;
    for (let i = 0; i < n; i++) {
      const xa = x0 + i * dx, hgt = f(side === 'right' ? xa + dx : xa);
      total += hgt * dx;
      g.push(`<rect x="${p.X(xa)}" y="${p.Y(hgt)}" width="${Math.max(0, p.X(xa + dx) - p.X(xa) - 0.5)}" height="${Math.max(0, p.Y(0) - p.Y(hgt))}" fill="${side === 'right' ? '#d9ebe7' : '#f6e3d4'}" stroke="${side === 'right' ? C.teal : C.orange}" stroke-width=".8"/>`);
    }
    g.push(curve(p, f, C.ink, 1.8));
    if (title) g.push(label(10, 16, title, C.mute, 8, 'start'));
    g.push(`<text x="${w - 10}" y="${h - 7}" text-anchor="end" font-size="10" fill="${C.mute}" font-family="ui-monospace,monospace">${n} strips = ${total.toFixed(4)}</text>`);
    return svg(w, h, g.join(''), 'graph');
  },

  // The rise-over-run triangle: two points, the horizontal leg, the vertical
  // leg, and the quotient. This is the one picture the whole of Part II rests
  // on, so it is drawn from the function rather than sketched.
  delta({ f, a, b, title, note, x0 = 0, x1 = 6, y0 = 0, y1 = 8, w = 300, h = 225, unit = '', quotient = true }) {
    const p = plane({ x0, x1, y0, y1, w, h });
    const ya = f(a), yb = f(b);
    const g = [`<rect width="${w}" height="${h}" fill="${C.paper}" rx="6"/>`, axes(p), curve(p, f)];
    // the two legs
    g.push(`<line x1="${p.X(a)}" y1="${p.Y(ya)}" x2="${p.X(b)}" y2="${p.Y(ya)}" stroke="${C.orange}" stroke-width="2"/>`);
    g.push(`<line x1="${p.X(b)}" y1="${p.Y(ya)}" x2="${p.X(b)}" y2="${p.Y(yb)}" stroke="${C.teal}" stroke-width="2"/>`);
    g.push(`<line x1="${p.X(a)}" y1="${p.Y(ya)}" x2="${p.X(b)}" y2="${p.Y(yb)}" stroke="${C.ink}" stroke-width="1.3" stroke-dasharray="4 3"/>`);
    g.push(dot(p, a, ya), dot(p, b, yb));
    const dx = +(b - a).toFixed(4), dy = +(yb - ya).toFixed(4);
    g.push(label((p.X(a) + p.X(b)) / 2, p.Y(ya) + 15, `Δx = ${dx}`, C.orange, 10));
    g.push(label(p.X(b) + 7, (p.Y(ya) + p.Y(yb)) / 2 + 3, `Δy = ${dy}`, C.teal, 10, 'start'));
    if (quotient) g.push(`<text x="${p.X(a) + 6}" y="${p.Y(yb) - 8}" font-size="11" fill="${C.ink}" font-family="ui-monospace,monospace">${esc(math(`Δy/Δx = ${+(dy / dx).toFixed(3)}${unit ? ' ' + unit : ''}`))}</text>`);
    if (title) g.push(label(10, 16, title, C.mute, 8, 'start'));
    if (note) g.push(`<text x="${w - 10}" y="${h - 7}" text-anchor="end" font-size="10" fill="${C.mute}" font-family="ui-monospace,monospace">${esc(math(note))}</text>`);
    return svg(w, h, g.join(''), 'graph');
  },

  // Division, drawn as sharing a total into equal parts. "Per one" is the
  // whole content of a rate, and it is worth seeing once as an act.
  share({ total, parts, each, unit = '', per = '', w = 420 }) {
    const H = 118, pad = 26, barY = 46, barH = 30;
    const bw = (w - 2 * pad) / parts;
    const b = [`<rect width="${w}" height="${H}" fill="${C.paper}" rx="6"/>`];
    b.push(label(w / 2, 22, `${total}${unit ? ' ' + unit : ''} altogether`, C.ink, 11));
    for (let i = 0; i < parts; i++) {
      b.push(`<rect x="${pad + i * bw}" y="${barY}" width="${bw - 2}" height="${barH}" rx="3"
        fill="${i === 0 ? '#cfe6e1' : C.faint}" stroke="${i === 0 ? C.teal : C.rule}" stroke-width="1"/>`);
      b.push(label(pad + i * bw + bw / 2 - 1, barY + 20, String(each), i === 0 ? C.teal : C.mute, 10));
    }
    b.push(`<line x1="${pad}" y1="${barY + barH + 9}" x2="${w - pad}" y2="${barY + barH + 9}" stroke="${C.mute}" stroke-width="1"/>`);
    b.push(label(w / 2, barY + barH + 24, `${parts} equal ${per || 'parts'}`, C.mute, 10));
    b.push(`<text x="${w / 2}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${C.ink}" font-family="ui-monospace,monospace">${esc(math(`${total} ÷ ${parts} = ${each}${unit ? ' ' + unit : ''} each`))}</text>`);
    return svg(w, H, b.join(''));
  },

  // Input/output table drawn as a figure so it sits beside a graph.
  table({ head, rows }) {
    return `<table class="fig-table"><thead><tr>${head.map(h => `<th scope="col">${rich(h)}</th>`).join('')}</tr></thead>`
      + `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
};

/* ------------------------------------------------------------------ drills */
// Practice at volume, without authoring each answer by hand.
//
// A chapter declares a skill and the inputs to rehearse it on; the build emits
// one practice item per input, with the answer COMPUTED from the same function
// that draws the figure. So a drill answer cannot disagree with its picture,
// and cannot be wrong unless the rule itself is. That is what makes a large
// practice set safe: nobody typed the answers.
//
// Drills are for mechanical rehearsal. Anything needing judgement stays
// hand-written above them.

const num = v => {
  if (!Number.isFinite(v)) return '—';
  const r = Math.abs(v) < 1e-9 ? 0 : +v.toFixed(4);
  return String(r).replace('-', '−');
};
const win = (f, xs, pad = 1.6) => {
  const ys = xs.map(f).filter(Number.isFinite);
  const x0 = Math.min(...xs) - pad, x1 = Math.max(...xs) + pad;
  const lo = Math.min(...ys, 0), hi = Math.max(...ys, 0);
  const m = Math.max(1, (hi - lo) * 0.25);
  return { x0, x1, y0: lo - m, y1: hi + m };
};

const DRILL = {
  // Evaluate one rule at many inputs.
  evaluate({ name = 'f', expr, f, at, view, tier = 'Warm-up' }) {
    const v = view || win(f, at);
    return at.map(x => ({
      q: `For ${name}(x) = ${expr}, find ${name}(${num(x)}).`, level: 'Calculate', tier,
      a: `${name}(${num(x)}) = ${num(f(x))}.`,
      show: { kind: 'graph', f, ...v, w: 265, h: 195, marks: [[x, f(x)]],
        title: 'READ THE HEIGHT', note: `${name}(x)=${expr}`,
        caption: `Go across to ${num(x)}, then up to the curve. The height there is ${num(f(x))}.` }
    }));
  },

  // Two readings of a quantity: both differences, then the quotient.
  rate({ what = 'The quantity', verb = 'is', unit = '', per = '', pairs, tier = 'Core' }) {
    // "at 1 hours" reads as a bug because it is one. Generated prose needs the
    // same care as written prose, so the unit agrees with its number.
    const one = per.replace(/s$/, '');
    const plural = n => `${num(n)} ${Math.abs(n) === 1 ? one : per}`;
    return pairs.map(([xa, ya, xb, yb]) => {
      const dx = xb - xa, dy = yb - ya, r = dy / dx;
      const f = t => ya + r * (t - xa);
      return {
        q: `${what} ${verb} ${num(ya)}${unit ? ' ' + unit : ''} after ${plural(xa)} and ${num(yb)}${unit ? ' ' + unit : ''} after ${plural(xb)}. Find Δy, Δx, and the rate of change.`,
        level: 'Calculate', tier,
        a: `Δy = ${num(yb)} − ${num(ya)} = ${num(dy)}${unit ? ' ' + unit : ''}; Δx = ${plural(dx)}; rate = ${num(dy)}/${num(dx)} = ${num(r)}${unit ? ' ' + unit : ''} per ${one || 'unit'}.`,
        show: { kind: 'delta', f, a: xa, b: xb, ...win(f, [xa, xb]), w: 275, h: 205,
          title: 'BOTH DIFFERENCES', note: `${unit || 'y'} against ${per || 'x'}`,
          caption: `Δx along the bottom, Δy up the side, and the quotient is what one ${one || 'unit'} gets.` }
      };
    });
  },

  // Average rate of a curve over stated intervals.
  avgrate({ name = 'f', expr, f, on, tier = 'Core' }) {
    return on.map(([a, b]) => ({
      q: `Find the average rate of change of ${name}(x) = ${expr} from x = ${num(a)} to x = ${num(b)}.`,
      level: 'Analyse change', tier,
      a: `(${num(f(b))} − ${num(f(a))})/(${num(b)} − ${num(a)}) = ${num((f(b) - f(a)) / (b - a))}.`,
      show: { kind: 'secant', f, a, b, ...win(f, [a, b], 0.8),
        caption: `The secant through (${num(a)}, ${num(f(a))}) and (${num(b)}, ${num(f(b))}). Its steepness is the average rate over that interval and no other.` }
    }));
  },

  // Identify a family from its outputs.
  family({ series, tier = 'Core' }) {
    return series.map(({ f, expr, kind, from = 0, to = 4 }) => {
      const xs = []; for (let x = from; x <= to; x++) xs.push(x);
      const out = xs.map(f);
      const d1 = out.slice(1).map((v, i) => v - out[i]);
      const d2 = d1.slice(1).map((v, i) => v - d1[i]);
      const ratio = out.slice(1).map((v, i) => v / out[i]);
      const why = kind === 'linear' ? `the first differences are all ${num(d1[0])}`
        : kind === 'quadratic' ? `the first differences ${d1.map(num).join(', ')} are not constant but the second differences are all ${num(d2[0])}`
        : `the differences settle nothing, while the ratios are all ${num(ratio[0])}`;
      return {
        q: `Outputs ${out.map(num).join(', ')} for inputs ${xs.join(', ')}. Name the family and the rule.`,
        level: 'Calculate', tier,
        a: `${kind[0].toUpperCase() + kind.slice(1)}, and the rule is ${expr}, because ${why}.`,
        show: { kind: 'steps', f, from, to, ...win(f, xs, 0.7), w: 275, h: 205,
          title: kind.toUpperCase(), note: expr,
          caption: `The rises are ${d1.map(num).join(', ')}. ${kind === 'exponential' ? 'Each is the height it started from, which is what multiplying looks like.' : kind === 'quadratic' ? 'They grow by the same amount each time.' : 'They never change.'}` }
      };
    });
  },

  // Locate the moved feature of a transformed parent.
  transform({ parent = x => x * x, parentName = 'x^2', cases, tier = 'Core' }) {
    return cases.map(({ h = 0, k = 0, expr }) => {
      const f = x => parent(x - h) + k;
      const across = h === 0 ? 'not moved sideways' : h > 0 ? `right ${num(h)}` : `left ${num(-h)}`;
      const up = k === 0 ? 'not moved vertically' : k > 0 ? `up ${num(k)}` : `down ${num(-k)}`;
      return {
        q: `Describe the change from ${parentName} to ${expr}, and give the new low point.`,
        level: 'Transform', tier,
        a: `Moved ${across} and ${up}. The low point goes from (0, 0) to (${num(h)}, ${num(k)}).`,
        show: { kind: 'graph', f, second: { f: parent }, x0: h - 5, x1: h + 5, y0: k - 3, y1: k + 9,
          w: 275, h: 205, marks: [[h, k], [0, 0]], title: 'PARENT BEHIND', note: expr,
          caption: `The bracket vanishes at x = ${num(h)}, which is where the feature lands. The number outside sets its height.` }
      };
    });
  },

  // Run a pair of machines in a stated order.
  compose({ fName, fExpr, f, gName, gExpr, g, at, tier = 'Core' }) {
    return at.flatMap(x => [
      { q: `With ${fName}(x) = ${fExpr} and ${gName}(x) = ${gExpr}, find ${fName}(${gName}(${num(x)})).`,
        level: 'Combine', tier,
        a: `${gName}(${num(x)}) = ${num(g(x))}, then ${fName}(${num(g(x))}) = ${num(f(g(x)))}.`,
        show: { kind: 'chain', stages: [`${gName}(x)=${gExpr}`, `${fName}(x)=${fExpr}`], input: num(x), values: [num(g(x)), num(f(g(x)))],
          caption: `The inner rule runs first, and the number on the wire is ${num(g(x))}.` } },
      { q: `With the same two rules, find ${gName}(${fName}(${num(x)})).`,
        level: 'Combine', tier,
        a: `${fName}(${num(x)}) = ${num(f(x))}, then ${gName}(${num(f(x))}) = ${num(g(f(x)))}.`,
        show: { kind: 'chain', stages: [`${fName}(x)=${fExpr}`, `${gName}(x)=${gExpr}`], input: num(x), values: [num(f(x)), num(g(f(x)))],
          caption: `Swapped, the wire carries ${num(f(x))} instead${g(f(x)) === f(g(x)) ? ', and here the answers happen to agree' : ', and the answer differs'}.` } }
    ]);
  },

  // Invert a linear rule, and see it mirrored.
  inverse({ cases, tier = 'Core' }) {
    return cases.map(({ m, c, expr, invExpr }) => {
      const f = x => m * x + c, fi = y => (y - c) / m;
      const a = 2, b = f(a);
      return {
        q: `Find the inverse of f(x) = ${expr}, and check it on one value.`,
        level: 'Combine', tier,
        a: `f⁻¹(x) = ${invExpr}. Check: f(${num(a)}) = ${num(b)}, and f⁻¹(${num(b)}) = ${num(fi(b))}.`,
        show: { kind: 'reflect', f, finv: fi, pair: [a, b], w: 280, h: 250,
          x0: Math.min(a, b) - 5, x1: Math.max(a, b) + 5, y0: Math.min(a, b) - 5, y1: Math.max(a, b) + 5,
          note: 'mirrors in y = x',
          caption: `f sends ${num(a)} to ${num(b)}, so the inverse sends ${num(b)} back to ${num(a)}. The two points sit either side of the dashed diagonal.` }
      };
    });
  },

  // A removable hole: factor, cancel, substitute.
  limit({ cases, tier = 'Core' }) {
    return cases.map(({ a, other, expr }) => {
      // (x^2 - a*other ... ) built as (x-a)(x+other)/(x-a) so the limit is a+other
      const f = x => ((x - a) * (x + other)) / (x - a);
      const L = a + other;
      return {
        q: `Evaluate the limit of ${expr} as x approaches ${num(a)}.`,
        level: 'Calculate', tier,
        a: `Substituting gives 0/0, so factor: the expression is x + ${num(other)} for every x except ${num(a)}. The outputs crowd around ${num(L)}.`,
        show: { kind: 'graph', f, x0: a - 3, x1: a + 3, y0: L - 3, y1: L + 3, w: 270, h: 200,
          holes: [[a, L]], title: 'A HOLE, AND A LIMIT', note: expr,
          caption: `The open circle is the point the graph does not contain. The curve reaches its edge from both sides, so the limit is ${num(L)} while the value does not exist.` }
      };
    });
  },

  // Differentiate a power or linear rule from the rule, and read it off.
  derivative({ cases, tier = 'Core' }) {
    return cases.map(({ expr, f, d, dExpr, at }) => ({
      q: `For f(x) = ${expr}, the derivative is f'(x) = ${dExpr}. Find f'(${num(at)}), and say what the curve is doing there.`,
      level: 'Analyse change', tier,
      a: `f'(${num(at)}) = ${num(d(at))}, so the curve is ${d(at) > 0 ? 'rising' : d(at) < 0 ? 'falling' : 'flat'} there.`,
      show: { kind: 'secants', f, a: at, bs: [at + 2, at + 1.2, at + 0.7, at + 0.3],
        ...win(f, [at - 0.5, at + 2.5], 0.6), w: 290, h: 215,
        caption: `Secants from x = ${num(at)} closing on the tangent. Their slopes head for ${num(d(at))}, which is what ${dExpr} returns there.` }
    }));
  }
};

// Warm-ups rehearse the worked example on fresh numbers; core is the authored
// set; stretch is where judgement is needed. Sorting here, once, means the
// practice list and the answer key can never disagree about the numbering.
const TIERS = ['Warm-up', 'Core', 'Stretch'];
const tierOf = q => TIERS.indexOf(q.hard ? 'Stretch' : (q.tier || 'Core'));

export const expandDrills = ch => {
  const made = (ch.drills || []).flatMap(d => {
    const g = DRILL[d.kind];
    if (!g) throw new Error(`ch${ch.id}: unknown drill kind "${d.kind}"`);
    return g(d);
  });
  const all = [...(ch.practice || []), ...made]
    .map((q, i) => ({ ...q, _i: i }))
    .sort((a, b) => tierOf(a) - tierOf(b) || a._i - b._i);
  return { ...ch, practice: all };
};

/* ------------------------------------------------------- interactive labs */
// The book is operated, not only read. Two rules keep that from turning into
// a pile of runtime drawing code:
//
//   1. Every state a lab can show is BUILT HERE, as a figure, from the same
//      formulas as every other figure. The browser only switches between
//      prepared frames. So an interactive figure cannot drift from a static
//      one, and nothing is computed twice in two languages.
//   2. Frame 0 is the printable state. Printing shows it and hides the
//      controls, so the PDF is still a book.

const LAB = {
  // Step through prepared frames with buttons or a slider.
  frames({ id, label, control = 'buttons', frames, hint }) {
    const body = frames.map((fr, i) => {
      return `<div class="lab-frame${i ? '' : ' on'}" data-i="${i}">${drawFigure(fr, `lab ${id} frame ${i + 1}`)}`
        + (fr.say ? `<p class="lab-say">${rich(fr.say)}</p>` : '') + `</div>`;
    }).join('');
    const ctrl = control === 'slider'
      ? `<input type="range" class="lab-range" min="0" max="${frames.length - 1}" value="0" step="1"
           aria-label="${esc(label || 'step')}" aria-valuetext="${esc(String(frames[0].pick ?? 1))}">`
      : `<div class="lab-btns" role="group" aria-label="${esc(label || 'choose')}">`
        + frames.map((fr, i) => `<button type="button" class="lab-b${i ? '' : ' on'}" data-i="${i}">${rich(fr.pick ?? String(i))}</button>`).join('')
        + `</div>`;
    // Switching a frame changes the picture and its commentary. Without a
    // status message a screen reader user presses a button and hears nothing,
    // so the new frame's line is announced once, politely.
    return `<div class="lab" data-lab="frames" id="${id}">`
      + (label ? `<div class="lab-h">${rich(label)}</div>` : '')
      + `<div class="lab-stage">${body}</div>${ctrl}`
      + `<p class="sr-only lab-status" aria-live="polite"></p>`
      + (hint ? `<p class="lab-hint">${rich(hint)}</p>` : '') + `</div>`;
  },

  // Judge each candidate, and be told why. The answer is only revealed by
  // committing to one, which is the whole point of asking.
  judge({ id, label, ask = 'Does this rule keep the promise?', yes = 'reliable', no = 'not reliable', items, hint }) {
    return `<div class="lab" data-lab="judge" id="${id}">`
      + (label ? `<div class="lab-h">${rich(label)}</div>` : '')
      + `<p class="lab-ask">${rich(ask)}</p><ul class="jd">`
      // Twelve buttons all called "reliable" are useless read aloud, so each
      // one names the rule it is judging.
      + items.map((it, i) => {
        const subject = esc(String(it.t).replace(/\*/g, '').replace(/\s+/g, ' ').trim());
        return `<li data-ok="${it.ok ? 1 : 0}">
          <span class="jd-t" id="${id}-t${i}">${rich(it.t)}</span>
          <span class="jd-c"><button type="button" data-v="1" aria-label="${esc(yes)}: ${subject}">${esc(yes)}</button><button type="button" data-v="0" aria-label="${esc(no)}: ${subject}">${esc(no)}</button></span>
          <span class="jd-w" hidden>${rich(it.why)}</span></li>`;
      }).join('')
      + `</ul><p class="lab-score" aria-live="polite"></p>`
      + (hint ? `<p class="lab-hint">${rich(hint)}</p>` : '') + `</div>`;
  }
};

// Build frames by mapping a list of inputs through a real function, so the
// numbers a reader sees are produced by the rule the caption names.
export const overInputs = (inputs, make) => inputs.map(make);

// An attached `show` is a lab if it steps through frames, a figure row if it
// carries several, and a single figure otherwise. Deciding this in one place
// keeps the worked-example and practice call sites from disagreeing.
const showType = s => s.frames ? 'lab' : s.items ? 'figures' : 'figure';

/* --------------------------------------------------- accessible names */
// Every figure carries role="img", which means a screen reader announces it as
// an image and then says nothing, because none of them had a name. That is a
// WCAG 1.1.1 failure repeated 939 times, and it is a procurement gate: no
// university buys courseware that cannot produce a VPAT.
//
// A generated name saying "a graph" would satisfy a linter and help nobody.
// These are computed from the same numbers that draw the figure, so the
// description cannot drift from the picture any more than the caption can.

// Spoken, not printed. A hyphen is announced as "dash"; the blank glyph is
// announced as "white square" or skipped entirely. Neither is what is meant.
// Spoken, not printed. Notation is formatted here too, or a screen reader
// announces "x caret 2" where a sighted reader sees x². A hyphen is announced
// as "dash" and the blank glyph as "white square"; neither is what is meant.
const say = v => math(String(v))
  .replace(/(^|[\s(])-(?=[\d.])/g, '$1−')
  .replace(/⬚/g, 'blank');
const listOf = (a, join = 'and') => a.length < 2 ? (say(a[0] ?? ''))
  : `${a.slice(0, -1).map(say).join(', ')} ${join} ${say(a.at(-1))}`;
const pt = ([x, y]) => `(${num(x)}, ${num(y)})`;
// Two samples called every symmetric curve "level overall", which describes a
// parabola as a flat line. Walk the window instead and report the shape.
const dirOf = (f, x0, x1) => {
  const n = 40, ys = [];
  let gaps = 0;
  for (let i = 0; i <= n; i++) {
    const y = f(x0 + (i / n) * (x1 - x0));
    if (Number.isFinite(y)) ys.push(y); else gaps++;
  }
  if (ys.length < 3) return 'drawn in pieces, with gaps where it has no value';
  // A break is not a turn. Walking across an asymptote otherwise reports a
  // change of direction that the curve never makes.
  if (gaps) return 'drawn as separate branches, with a break where it has no value';
  const eps = (Math.max(...ys) - Math.min(...ys)) * 1e-6 || 1e-9;
  let turns = 0, dir = 0;
  for (let i = 1; i < ys.length; i++) {
    const d = ys[i] > ys[i - 1] + eps ? 1 : ys[i] < ys[i - 1] - eps ? -1 : 0;
    if (d && dir && d !== dir) turns++;
    if (d) dir = d;
  }
  const first = ys[1] > ys[0] ? 'rising' : ys[1] < ys[0] ? 'falling' : 'level';
  if (turns === 0) return first === 'level' ? 'level throughout' : `${first} throughout`;
  if (turns === 1) return first === 'rising'
    ? 'rising to a highest point and then falling'
    : 'falling to a lowest point and then rising';
  return `changing direction ${turns} times`;
};

const DESCRIBE = {
  machine: ({ rule, input, output }) =>
    `A function machine. The input ${say(input)} enters a box labelled ${say(rule)}, and the output ${say(output)} leaves it.`,

  mapping: ({ pairs, broken }) => {
    const arrows = pairs.map(([i, ...os]) => os.length > 1
      ? `input ${say(i)} has ${os.length} arrows, to ${listOf(os)}`
      : `input ${say(i)} has one arrow, to ${say(os[0])}`);
    return `A mapping diagram: ${listOf(arrows)}.`
      + (broken ? ` The arrows from ${broken} are marked in red, because that input has more than one output.` : '');
  },

  graph: ({ f, note, title, x0 = -4, x1 = 4, marks = [], holes = [], second }) =>
    `A graph of ${say(note || title || 'a rule')}, ${dirOf(f, x0, x1)} across the window from x = ${num(x0)} to x = ${num(x1)}.`
    + (second ? ' A second, fainter curve is drawn behind it for comparison.' : '')
    + (marks.length ? ` Marked points: ${listOf(marks.map(pt))}.` : '')
    + (holes.length ? ` An open circle at ${listOf(holes.map(pt))} marks a point the graph does not contain.` : ''),

  delta: ({ f, a, b, note, unit }) => {
    const dx = b - a, dy = f(b) - f(a);
    return `A right-angled triangle on a graph of ${say(note || 'a rule')}. The horizontal leg is Δx = ${num(dx)},`
      + ` the vertical leg is Δy = ${num(dy)}, and the quotient Δy divided by Δx is ${num(dy / dx)}${unit ? ' ' + unit : ''}.`
      + ` A dashed line joins the two points ${pt([a, f(a)])} and ${pt([b, f(b)])}.`;
  },

  share: ({ total, parts, each, unit, per }) =>
    `A bar divided into ${parts} equal ${per || 'parts'}, each holding ${each}${unit ? ' ' + unit : ''},`
    + ` making ${total}${unit ? ' ' + unit : ''} in all. It shows ${total} divided by ${parts} equals ${each}.`,

  numberline: ({ from, to, spans = [], marks = [] }) =>
    `A number line from ${num(from)} to ${num(to)}.`
    + (spans.length ? ` Shaded stretches: ${listOf(spans.map(s =>
      `${num(s.a ?? from)} to ${num(s.b ?? to)}${s.label ? `, labelled ${s.label}` : ''}${s.tone === 'out' ? ', shown as refused' : ''}`))}.` : '')
    + (marks.length ? ` Endpoints: ${listOf(marks.map(m =>
      `${num(m.x)} drawn ${m.open ? 'hollow, so it is excluded' : 'filled, so it is included'}`))}.` : ''),

  chain: ({ stages, input, values = [] }) =>
    `Two machines wired in series: ${listOf(stages, 'then')}. The input ${say(input)} enters the first,`
    + (values.length > 1 ? ` the value ${values[0]} passes along the wire between them, and ${values.at(-1)} leaves the second.`
      : ` and ${values.at(-1) ?? 'a value'} leaves.`),

  blanks: ({ rule, sub, result }) => `The rule ${say(rule)}, with ${sub}, giving ${say(result)}.`,

  linetest: ({ at = [], dir = 'v', note, second }) =>
    `A graph of ${say(note || 'a rule')} with ${at.length} dashed ${dir === 'v' ? 'vertical' : 'horizontal'} test`
    + ` ${at.length === 1 ? 'line' : 'lines'} drawn across it at ${listOf(at.map(num))}.`
    + (second ? ' Two curves are drawn, so each line meets the shape twice and the crossings are marked in red.'
      : ' Each line meets the curve once, and the crossings are marked.'),

  steps: ({ f, from = 0, to = 4, note }) => {
    const r = []; for (let x = from; x < to; x++) r.push(num(f(x + 1) - f(x)));
    return `A staircase drawn on a graph of ${say(note || 'a rule')}, taking ${to - from} steps of one along the input.`
      + ` The rises are ${listOf(r)}.`;
  },

  reflect: ({ pair, note }) =>
    `A graph showing a function and its inverse as two curves mirrored in a dashed diagonal line, y equals x.`
    + (pair ? ` The point ${pt(pair)} on one curve corresponds to ${pt([pair[1], pair[0]])} on the other.` : '')
    + (note ? ` Labelled ${note}.` : ''),

  secant: o => { const { f, a, b } = { ...FIG_DEFAULTS.secant, ...o }; return (
    `A curve with a straight line drawn through the two points ${pt([a, f(a)])} and ${pt([b, f(b)])}.`
    + ` That secant line has steepness ${num((f(b) - f(a)) / (b - a))}.`); },

  secants: o => { const { f, a, bs } = { ...FIG_DEFAULTS.secants, ...o }; return (
    `A curve with ${bs.length} secant lines drawn from the fixed point ${pt([a, f(a)])} to points closing in on it.`
    + ` Their steepnesses are ${listOf(bs.map(b => num((f(b) - f(a)) / (b - a))))}, heading toward the dashed tangent line.`); },

  rects: o => { const { n } = { ...FIG_DEFAULTS.rects, ...o }; return `A curve with ${n} rectangles drawn beneath it, approximating the area under it.`; },

  riemann: o => { const { f, n, x0, x1, side, title } = { ...FIG_DEFAULTS.riemann, ...o };
    const w = (x1 - x0) / n; let s = 0;
    for (let i = 0; i < n; i++) s += f(side === 'right' ? x0 + (i + 1) * w : x0 + i * w) * w;
    return `${n} rectangles beneath a curve between x = ${num(x0)} and x = ${num(x1)}, each taking its height from the`
      + ` ${side} of its strip, so every rectangle ${side === 'right' ? 'pokes above' : 'sits under'} the curve.`
      + ` Their total is ${num(s)}.${title ? ` Titled ${say(title)}.` : ''}`;
  },

  zoom: o => { const { at, spans, holeAt } = { ...FIG_DEFAULTS.zoom, ...o }; return (
    `${spans.length} views of the same curve around x = ${num(at)}, each more magnified than the last,`
    + ` in windows of plus or minus ${listOf(spans.map(num))}.`
    + (holeAt !== null && holeAt !== undefined ? ` An open circle at height ${num(holeAt)} stays open at every magnification.` : '')); },

  table: ({ head, rows }) => `A table of ${rows.length} rows with columns ${listOf(head)}.`
};

// One place draws a figure, so the name and the picture are produced together
// and cannot be added to one without the other.
const drawFigure = (spec, where) => {
  checkFigure(spec, where);
  const describe = DESCRIBE[spec.kind];
  if (!describe) throw new Error(`${where}: figure "${spec.kind}" has no description function, so it would be unreadable to a screen reader`);
  let name = describe(spec).replace(/\s+/g, ' ').trim();
  if (!name) throw new Error(`${where}: figure "${spec.kind}" produced an empty description`);
  // The label lives on the <svg> element, not in a child <title>, because
  // identical figure bodies are later hoisted into a shared <symbol> and each
  // use site must keep its own name.
  return FIG[spec.kind](spec).replace(/<svg class="fig/g, `<svg aria-label="${esc(name)}" class="fig`);
};

// An option a figure does not read is silent: the figure draws something
// plausible and the caption describes something else. That has happened twice
// — `linetest` took its sweep direction in `kind`, which a lab frame overwrote,
// and `mapping` had a `caption` that fought the real one. Both were invisible
// until someone looked at the picture. So every option is checked against what
// the figure function actually destructures.
const ACCEPTS = Object.fromEntries(Object.entries(FIG).map(([name, fn]) => {
  const src = fn.toString();
  const keys = [];
  // Options are destructured either in the signature, or -- where a figure
  // shares its defaults with its description -- from a merge in the first line
  // of the body. Read both, or the guard silently accepts nothing.
  const sig = /^[\w$]+\(\s*\{([\s\S]*?)\}\s*(?:=\s*\{\}\s*)?\)/.exec(src);
  const merged = /const\s*\{([\s\S]*?)\}\s*=\s*\{\s*\.\.\.FIG_DEFAULTS/.exec(src);
  for (const m of [sig, merged]) if (m) keys.push(...[...m[1].matchAll(/(?:^|,)\s*([A-Za-z_$][\w$]*)/g)].map(x => x[1]));
  if (!keys.length) throw new Error(`figure "${name}" declares no options; the option guard would accept nothing`);
  return [name, new Set([...keys, 'kind', 'caption', 'pick', 'say', 't', 'id'])];
}));

const checkFigure = (spec, where) => {
  const allow = ACCEPTS[spec.kind];
  if (!allow) throw new Error(`${where}: unknown figure kind "${spec.kind}"`);
  const stray = Object.keys(spec).filter(k => !allow.has(k));
  if (stray.length) throw new Error(
    `${where}: figure "${spec.kind}" was given ${stray.map(s => `"${s}"`).join(', ')}, which it does not read.\n` +
    `  it accepts: ${[...allow].sort().join(', ')}`);
};

/* ------------------------------------------------------------ block render */
const block = (b, ctx) => {
  switch (b.t) {
    case 'p': return `<p>${rich(b.text)}</p>`;
    case 'h': return `<h3>${rich(b.text)}</h3>`;
    case 'formula': return `<div class="formula">${esc(math(b.text))}</div>`;
    case 'list': return `<${b.ordered ? 'ol' : 'ul'} class="bullets">${b.items.map(i => `<li>${rich(i)}</li>`).join('')}</${b.ordered ? 'ol' : 'ul'}>`;
    case 'table': return `<div class="tw"><table class="data"><thead><tr>${b.head.map(h => `<th scope="col">${rich(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'callout': return `<aside class="callout ${b.tone || ''}"><b>${rich(b.title)}</b><p>${rich(b.text)}</p></aside>`;
    case 'figure': {
      return `<figure>${drawFigure(b, ctx)}${b.caption ? `<figcaption>${rich(b.caption)}</figcaption>` : ''}</figure>`;
    }
    case 'figures': return `<div class="fig-row">${b.items.map(i => block({ ...i, t: 'figure' }, ctx)).join('')}</div>`;
    case 'lab': {
      const l = LAB[b.kind];
      if (!l) throw new Error(`${ctx}: unknown lab kind "${b.kind}"`);
      return `<figure class="lab-wrap">${l({ ...b, id: b.id || `${ctx}-lab${labSeq++}` })}`
        + (b.caption ? `<figcaption>${rich(b.caption)}</figcaption>` : '') + `</figure>`;
    }
    // A worked example is only half a teaching move. The parallel item that
    // follows it, answered on the spot, is where the reader finds out whether
    // they actually followed the steps or merely read them.
    // An answer stated in words is an assertion. The `show` block makes the
    // answer visible, and where it is a lab, operable: the reader can move the
    // thing the answer is about and watch the claim hold.
    case 'example': return `<div class="worked"><b class="wk-h">Worked example ${b.n}</b><p class="wk-q">${rich(b.ask)}</p>`
      + `<ol class="wk-steps">${b.steps.map(s => `<li>${rich(s)}</li>`).join('')}</ol>`
      + `<p class="wk-a"><b>Answer.</b> ${rich(b.answer)}</p>`
      + (b.show ? `<div class="wk-show">${block({ ...b.show, t: showType(b.show) }, ctx)}</div>` : '')
      + (b.note ? `<p class="wk-n">${rich(b.note)}</p>` : '')
      + (b.turn ? `<div class="turn"><b>Your turn.</b> <span>${rich(b.turn.ask)}</span>`
        + `<details><summary>answer</summary><span>${rich(b.turn.a)}</span></details></div>` : '')
      + `</div>`;
    default: throw new Error(`${ctx}: unknown block "${b.t}"`);
  }
};

/* ------------------------------------------------------------- the render */
let labSeq = 0;

const chapterHTML = (ch, i) => {
  const prac = ch.practice || [];
  const lvl = [...new Set(prac.map(p => p.level).filter(Boolean))];
  return `
<section class="chapter" id="ch${ch.id}">
  <div class="kicker">${esc(ch.part || 'PART I - FUNCTIONS')}</div>
  <h2>${ch.id}. ${rich(ch.title)}</h2>
  ${ch.standfirst ? `<p class="stand">${rich(ch.standfirst)}</p>` : ''}
  ${(ch.blocks || []).map(b => block(b, `ch${ch.id}`)).join('\n  ')}

  ${prac.length ? `
  <div class="practice">
    <div class="pr-head"><b>Practice</b><span>${prac.length} items${lvl.length ? ' · ' + lvl.join(', ') : ''}</span></div>
    <ol class="pr-list">
      ${prac.map((q, i) => `${i === 0 || tierOf(q) !== tierOf(prac[i - 1])
        ? `<li class="pr-tier"><b>${esc(TIERS[tierOf(q)])}</b><span>${esc(
            TIERS[tierOf(q)] === 'Warm-up' ? 'the worked example again, on new numbers'
            : TIERS[tierOf(q)] === 'Stretch' ? 'these need a decision, not just a method'
            : 'the standard set')}</span></li>` : ''}<li${q.hard ? ' class="hard"' : ''}>
        <div class="pr-top"><span class="pr-q">${rich(q.q)}</span>${q.level ? `<span class="pr-l">${esc(q.level)}</span>` : ''}</div>
        <details class="pr-sol"><summary>show solution</summary>
          ${q.sol ? `<ol class="pr-steps">${q.sol.map(s => `<li>${rich(s)}</li>`).join('')}</ol>` : ''}
          <p class="pr-a">${rich(q.a || '')}</p>
          ${q.show ? block({ ...q.show, t: showType(q.show), id: `ch${ch.id}-p${i}` }, `ch${ch.id} practice ${i + 1}`) : ''}
        </details></li>`).join('\n      ')}
    </ol>
  </div>` : ''}

  ${ch.misconception ? `
  <aside class="callout warn"><b>Common mistake: ${rich(ch.misconception.name)}</b>
    <p>${rich(ch.misconception.wrong)}</p>
    <p class="fix"><b>Why it is wrong.</b> ${rich(ch.misconception.why)}</p>
  </aside>` : ''}

  ${ch.review ? `<aside class="callout back"><b>Returning to earlier work</b><p>${rich(ch.review)}</p></aside>` : ''}
</section>`;
};

// The answer key is not an appendix of numbers. It is where a reader who got
// something wrong goes to find out why, which makes it the part of the book
// most in need of a picture. Each entry restates the question, answers it, and
// shows it: a set map, a number line, a graph, or a machine run on the actual
// values, drawn from the same computed figure vocabulary as the chapters.
const answersHTML = chapters => {
  const withFig = chapters.reduce((n, c) => n + (c.practice || []).filter(p => p.show).length, 0);
  const total = chapters.reduce((n, c) => n + (c.practice || []).length, 0);
  return `
<section class="chapter answers" id="answers">
  <div class="kicker">ANSWER KEY</div>
  <h2>Answers, shown</h2>
  <p class="stand">Every practice item is answered here, with the reasoning that produces it and, wherever a picture says it better than a sentence, the picture. ${withFig} of ${total} are drawn so far. A book that answers only the odd numbers teaches its reader to guess.</p>
  ${chapters.filter(c => (c.practice || []).some(p => p.a)).map(c => `
  <div class="ans-ch">
    <h3><a href="#ch${c.id}">${c.id}. ${rich(c.title)}</a></h3>
    ${(c.practice || []).map((p, i) => `
    <div class="ans${p.show ? ' has-fig' : ''}">
      <div class="ans-n">${i + 1}</div>
      <div class="ans-body">
        <p class="ans-q">${rich(p.q)}</p>
        <p class="ans-a">${p.a ? rich(p.a) : '<i class="todo">not yet answered</i>'}</p>
        ${p.show ? block({ ...p.show, t: showType(p.show), id: `key${c.id}-${i}` }, `ch${c.id} answer ${i + 1}`) : ''}
      </div>
    </div>`).join('')}
  </div>`).join('')}
</section>`;
};

// The book measures itself against its own completion gate and prints the
// result. An unfinished chapter says so in the book rather than in a note
// someone has to remember to read.
// The bar a chapter has to clear. Draft 2 set it at one worked example and six
// practice items, which every chapter cleared and which was too low to mean
// anything: 2.2 examples and 1.8 figures a chapter is a reference card, not a
// textbook. These are the numbers a chapter needs to teach rather than remind.
export const GATE = { examples: 4, figures: 4, practice: 20 };

// One figure is one drawn state, wherever it lives. A lab of four frames is
// four figures, because four were built; an illustrated answer is one. Counting
// any other way would penalise turning a static figure into an operable one,
// which is exactly the move the book is making.
const countFigs = b => {
  if (!b) return 0;
  if (b.t === 'figures' || b.items) return b.items.length;
  if (b.t === 'lab' || b.frames) return b.kind === 'judge' ? 1 : b.frames.length;
  if (b.t === 'figure' || b.kind) return b.kind === 'zoom' ? (b.spans || [0, 0, 0]).length : 1;
  return 0;
};

export const audit = c => {
  const p = (c.practice || []).length;
  const answered = (c.practice || []).filter(x => x.a).length;
  const exs = (c.blocks || []).filter(b => b.t === 'example');
  const turns = exs.filter(b => b.turn).length;
  const shown = exs.filter(b => b.show).length;
  const figs = (c.blocks || []).reduce((n, b) => n + countFigs(b) + countFigs(b.show), 0)
    + (c.practice || []).reduce((n, q) => n + countFigs(q.show), 0);
  const labs = (c.blocks || []).filter(b => b.t === 'lab').length
    + exs.filter(b => b.show && (b.show.frames || b.show.items)).length
    + (c.practice || []).filter(q => q.show && q.show.frames).length;
  const pass = exs.length >= GATE.examples && figs >= GATE.figures && p >= GATE.practice
    && answered === p && turns === exs.length && shown === exs.length
    && !!c.misconception && !!c.review;
  return { c, p, answered, ex: exs.length, turns, shown, figs, labs, pass };
};

const gateHTML = chapters => {
  const rows = chapters.map(audit);
  const done = rows.filter(r => r.pass).length;
  const sum = k => rows.reduce((n, r) => n + r[k], 0);
  return `
<section class="chapter" id="gate">
  <div class="kicker">COMPLETION</div>
  <h2>What this book still owes its reader</h2>
  <p class="stand">A chapter passes when it carries at least ${GATE.examples} worked examples, each followed by a parallel one the reader does; at least ${GATE.figures} figures; an illustrated or operable answer on every worked example; at least ${GATE.practice} practice items with an answer for every one; a named misconception; and a link back to earlier work. This table is counted from the source at build time, so it cannot flatter the book.</p>
  <div class="tw"><table class="data gate">
    <thead><tr>${['Chapter','Worked','Your turn','Shown','Labs','Figures','Practice','Answered','Mistake','Review','Gate'].map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr class="${r.pass ? 'ok' : 'no'}">
      <td>${r.c.id}. ${rich(r.c.title)}</td>
      <td${r.ex < GATE.examples ? ' class="short"' : ''}>${r.ex || '—'}</td>
      <td${r.turns < r.ex ? ' class="short"' : ''}>${r.turns || '—'}</td>
      <td${r.shown < r.ex ? ' class="short"' : ''}>${r.shown || '—'}</td>
      <td>${r.labs || '—'}</td>
      <td${r.figs < GATE.figures ? ' class="short"' : ''}>${r.figs || '—'}</td>
      <td${r.p < GATE.practice ? ' class="short"' : ''}>${r.p || '—'}</td>
      <td>${r.p ? (r.answered === r.p ? 'all' : `${r.answered} of ${r.p}`) : '—'}</td>
      <td>${r.c.misconception ? 'yes' : '—'}</td><td>${r.c.review ? 'yes' : '—'}</td>
      <td>${r.pass ? 'PASS' : 'open'}</td></tr>`).join('')}</tbody>
  </table></div>
  <p class="gate-sum"><b>${done} of ${chapters.length} chapters</b> meet the gate.
  ${sum('p')} practice items, every one with a solution you can open; ${sum('ex')} worked examples
  carrying ${sum('turns')} parallel exercises and ${sum('shown')} illustrated answers; ${sum('labs')} interactive labs;
  and ${sum('figs')} figures, every one computed at build time from the formula printed beside it.</p>
</section>`;
};

const page = (meta, chapters) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(meta.title)}</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  :root { --ink:${C.ink}; --teal:${C.teal}; --orange:${C.orange}; --rose:${C.rose};
          --paper:${C.paper}; --rule:${C.rule}; --mute:${C.mute}; --faint:${C.faint};
          /* Graphics need 3:1 and keep the identity hues above. Text needs
             4.5:1, so anything a person reads uses these instead. */
          --teal-text:#10796e; --orange-text:#a25d2a; --rose-text:#b84d4a;
          /* Three roles. Running text is a book and gets a serif; the apparatus
             around it (eyebrows, table headers, figure labels, practice tags) is
             machinery and gets the sans; formulas get the mono. All system faces,
             so there is no webfont to fail silently behind the CSP. */
          --serif: Georgia,"Iowan Old Style","Palatino Linotype",Palatino,"Times New Roman",serif;
          --sans: ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
          --mono: ui-monospace,SFMono-Regular,"Cascadia Mono",Menlo,Consolas,monospace; }
  * { box-sizing: border-box; }
  /* This page commits to one world on purpose: it is a printed book, laid out
     for A4, and it carries its own ground rather than borrowing the viewer's.
     Hence no dark palette, and an explicit background here. */
  body { margin:0; background:#fff; color:var(--ink); font:16.5px/1.66 var(--serif); }
  .skip { position:absolute; left:-9999px; top:0; background:var(--ink); color:#fff;
          padding:10px 16px; z-index:10; font-family:var(--sans); font-size:14px; border-radius:0 0 6px 0; }
  .skip:focus { left:0; }
  .sheet { max-width: 41rem; margin: 0 auto; padding: 0 22px 80px; }   /* ~72 characters */
  code, .formula { font-family: var(--mono); }
  .kicker, .pr-head, .pr-l, .wk-h, table.data th, .fig-table th, figcaption,
  nav.toc h2, .cover .series, .cover .stamp,
  .cover h1, .cover h2 { font-family: var(--sans); }   /* the jacket stays as Draft 1 set it */
  table.data, .fig-table, .gate-sum { font-variant-numeric: tabular-nums; }
  /* Wide content scrolls inside itself so the page body never moves sideways. */
  .tw { overflow-x: auto; margin: 16px 0; }
  .tw table.data { margin: 0; min-width: 30rem; }

  .cover { background:var(--ink); color:#fff; padding:64px 44px 52px; margin-bottom:44px; border-radius:0 0 18px 18px; }
  .cover .dots { display:flex; gap:10px; justify-content:flex-end; margin-bottom:34px; }
  .cover .dots i { width:34px; height:34px; border-radius:50%; display:block; }
  .cover .series { color:#7fd3c6; font-size:11px; letter-spacing:.14em; font-weight:700; }
  .cover h1 { font-size:44px; line-height:1.06; margin:16px 0 22px; letter-spacing:-.02em; }
  .cover h2 { color:#7fd3c6; font-size:19px; margin:0 0 14px; letter-spacing:.02em; }
  .cover p { color:#b9c6d6; max-width:46ch; margin:0 0 8px; font-size:14px; }
  .cover .stamp { margin-top:38px; padding-top:18px; border-top:1px solid #33475f; color:#9fb0c4; font-size:12px; }
  .cover .stamp b { color:#fff; display:block; margin-bottom:6px; letter-spacing:.06em; }

  .kicker { color:var(--teal-text); font-size:11px; font-weight:700; letter-spacing:.13em; margin-bottom:6px; }
  h2 { font-size:29px; line-height:1.16; margin:0 0 12px; letter-spacing:-.015em; }
  h3 { font-size:17px; color:var(--teal-text); margin:26px 0 8px; }
  .stand { font-size:16px; color:var(--mute); margin:0 0 20px; }
  p { margin:0 0 13px; }
  .bullets { margin:0 0 14px; padding-left:20px; } .bullets li { margin-bottom:5px; }

  .chapter { padding:34px 0 8px; border-top:1px solid var(--rule); break-before:page; }
  .chapter:first-of-type { border-top:0; break-before:auto; }

  .formula { background:var(--paper); border-left:3px solid var(--teal); padding:13px 16px;
             margin:16px 0; font-size:15px; text-align:center; border-radius:0 6px 6px 0; break-inside:avoid; }

  table.data { width:100%; border-collapse:collapse; margin:16px 0; font-size:13.5px; break-inside:avoid; }
  table.data th { background:var(--ink); color:#fff; text-align:left; padding:9px 11px; font-size:11px; letter-spacing:.05em; }
  table.data td { padding:9px 11px; border-bottom:1px solid var(--rule); vertical-align:top; }
  table.data tbody tr:nth-child(even) { background:var(--paper); }
  table.gate tr.ok td:last-child { color:var(--teal-text); font-weight:700; }
  table.gate tr.no td:last-child { color:var(--orange-text); font-weight:700; }
  table.gate td.short { color:var(--orange-text); font-weight:700; }
  .gate-sum { background:var(--paper); padding:12px 15px; border-radius:7px; font-size:14px; }

  figure { margin:20px 0; text-align:center; break-inside:avoid; }
  figcaption { color:var(--mute); font-size:12.5px; margin-top:8px; text-align:left; }
  .fig { max-width:100%; height:auto; }
  .fig-row { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; margin:20px 0; break-inside:avoid; }
  .fig-row figure { margin:0; flex:1 1 210px; }
  .fig-table { border-collapse:collapse; margin:0 auto; font-size:13px; }
  .fig-table th { background:var(--ink); color:#fff; padding:7px 14px; font-size:10.5px; }
  .fig-table td { padding:6px 14px; border-bottom:1px solid var(--rule); text-align:center; }

  .callout { background:#eef6f4; border:1px solid #cfe4df; border-radius:8px; padding:14px 16px; margin:18px 0; break-inside:avoid; }
  .callout b { display:block; margin-bottom:5px; }
  .callout p { margin:0 0 6px; font-size:14px; } .callout p:last-child { margin:0; }
  .callout.warn { background:#fdf3ec; border-color:#f0d5bf; }
  .callout.warn b { color:var(--orange-text); }
  .callout.back { background:var(--paper); border-color:var(--rule); }
  .callout .fix { color:var(--mute); }

  .worked { border:1px solid var(--rule); border-left:3px solid var(--orange); border-radius:0 8px 8px 0;
            padding:14px 16px; margin:18px 0; background:#fffdf9; break-inside:avoid; }
  .wk-h { color:var(--orange-text); font-size:11px; letter-spacing:.09em; text-transform:uppercase; display:block; margin-bottom:6px; }
  .wk-q { font-weight:600; margin-bottom:9px; }
  .wk-steps { margin:0 0 10px; padding-left:20px; font-size:14px; } .wk-steps li { margin-bottom:5px; }
  .wk-a { margin:0; padding-top:9px; border-top:1px solid var(--rule); font-size:14px; }
  .wk-n { margin:8px 0 0; font-size:13px; color:var(--mute); }
  .turn { margin:11px -16px -14px; padding:10px 16px; background:var(--paper);
          border-top:1px solid var(--rule); border-radius:0 0 8px 0; font-size:13.5px; }
  .turn > b { color:var(--teal-text); font-family:var(--sans); font-size:11px; letter-spacing:.07em;
              text-transform:uppercase; display:inline; margin-right:5px; }
  .turn details { margin-top:6px; }
  .turn summary { cursor:pointer; color:var(--teal-text); font-family:var(--sans); font-size:11.5px;
                  letter-spacing:.04em; width:max-content; }
  .turn summary:focus-visible { outline:2px solid var(--teal); outline-offset:3px; border-radius:3px; }
  .turn details[open] summary { margin-bottom:4px; }
  .sr-only { position:absolute; width:1px; height:1px; margin:-1px; padding:0;
             overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }
  .zoom-row { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }

  /* ---- interactive labs ---- */
  .lab-wrap { margin:20px 0; break-inside:avoid; }
  .lab { border:1px solid var(--rule); border-radius:9px; background:var(--paper);
         padding:13px 14px 12px; text-align:center; }
  .lab-h { font-family:var(--sans); font-size:11px; letter-spacing:.09em; text-transform:uppercase;
           color:var(--teal-text); margin-bottom:9px; text-align:left; }
  .lab-stage { min-height:1px; }
  .lab-frame { display:none; }
  .lab-frame.on { display:block; }
  .lab-say { font-size:13.5px; margin:8px auto 2px; max-width:46ch; min-height:2.9em; }
  .lab-btns { display:flex; gap:6px; flex-wrap:wrap; justify-content:center; margin-top:10px; }
  .lab-b, .jd-c button { font:600 13px/1 var(--sans); padding:7px 13px; border-radius:6px; cursor:pointer;
          border:1px solid var(--rule); background:#fff; color:var(--ink); }
  .lab-b:hover, .jd-c button:hover { border-color:var(--teal); }
  .lab-b.on { background:var(--teal-text); border-color:var(--teal-text); color:#fff; }
  .lab-b:focus-visible, .jd-c button:focus-visible, .lab-range:focus-visible,
  .pr-sol summary:focus-visible { outline:2px solid var(--teal); outline-offset:2px; }
  .lab-range { width:min(100%,300px); margin-top:12px; accent-color:var(--teal); }
  .lab-hint { font-size:12.5px; color:var(--mute); margin:9px auto 0; max-width:52ch; }

  .jd { list-style:none; margin:0; padding:0; text-align:left; }
  .jd li { display:grid; grid-template-columns:1fr auto; gap:6px 12px; align-items:center;
           padding:9px 0; border-bottom:1px solid var(--rule); }
  .jd li:last-child { border-bottom:0; }
  .jd-t { font-size:14px; }
  .jd-c { display:flex; gap:6px; }
  .jd-w { grid-column:1 / -1; font-size:13px; color:var(--mute); padding:2px 0 1px; }
  .jd li.right .jd-w { color:var(--teal-text); }
  .jd li.wrong .jd-w { color:var(--orange-text); }
  .jd li.right .jd-c button.picked { background:var(--teal-text); border-color:var(--teal-text); color:#fff; }
  .jd li.wrong .jd-c button.picked { background:var(--orange-text); border-color:var(--orange-text); color:#fff; }
  .lab-ask { font-size:13.5px; color:var(--mute); text-align:left; margin:0 0 4px; }
  .lab-score { font-family:var(--sans); font-size:12px; color:var(--teal-text); margin:10px 0 0; text-align:left; min-height:1.2em; }

  /* ---- practice solutions ---- */
  .pr-list li { display:block; }
  .pr-top { display:flex; gap:10px; justify-content:space-between; }
  .pr-sol { margin-top:6px; }
  .pr-sol summary { cursor:pointer; color:var(--teal-text); font-family:var(--sans); font-size:11px;
                    letter-spacing:.05em; text-transform:uppercase; width:max-content; }
  .pr-sol[open] summary { margin-bottom:6px; }
  .pr-steps { margin:0 0 6px; padding-left:19px; font-size:13.5px; color:#33445c; }
  .pr-steps li { display:list-item; padding:0; border:0; margin-bottom:3px; }
  .pr-steps li::before { content:none; }
  .pr-a { font-size:13.5px; margin:0; }
  .pr-sol .lab-wrap, .pr-sol figure { margin:10px 0 2px; }
  .wk-show { margin:12px 0 4px; }
  .wk-show figure, .wk-show .lab-wrap { margin:0; }

  @media (prefers-reduced-motion: reduce) { * { transition:none !important; animation:none !important; } }
  @media print { .turn details { display:block; } .turn summary { display:none; }
                 .turn details::before { content:"Answer. "; font-weight:700; } }

  .practice { margin:24px 0 6px; break-inside:avoid; }
  .pr-head { background:var(--ink); color:#fff; padding:8px 13px; border-radius:7px 7px 0 0;
             display:flex; justify-content:space-between; align-items:baseline; font-size:12px; }
  .pr-head span { color:#9fb0c4; font-size:11px; }
  .pr-list { margin:0; padding:4px 0 0 0; list-style:none; counter-reset:pr;
             border:1px solid var(--rule); border-top:0; border-radius:0 0 7px 7px; }
  .pr-list li { counter-increment:pr; padding:8px 13px 8px 40px; position:relative; font-size:14px;
                border-bottom:1px solid var(--faint); display:flex; gap:10px; justify-content:space-between; }
  .pr-list li:last-child { border-bottom:0; }
  .pr-list li.pr-tier { counter-increment:none; padding:9px 13px 6px; background:var(--paper);
                        display:flex; gap:10px; align-items:baseline; justify-content:flex-start; }
  .pr-list li.pr-tier::before { content:none; }
  .pr-list li.pr-tier b { font-family:var(--sans); font-size:11px; letter-spacing:.09em;
                          text-transform:uppercase; color:var(--teal-text); }
  .pr-list li.pr-tier span { font-size:12.5px; color:var(--mute); }
  .pr-list li::before { content:counter(pr) "."; position:absolute; left:13px; color:var(--teal-text); font-weight:700; }
  .pr-l { color:var(--mute); font-size:10.5px; letter-spacing:.05em; text-transform:uppercase; white-space:nowrap; padding-top:3px; }

  .answers .ans-ch { margin-bottom:26px; }
  .answers h3 { margin:22px 0 10px; padding-bottom:5px; border-bottom:1px solid var(--rule); }
  .answers h3 a { color:var(--teal-text); text-decoration:none; }
  .ans { display:grid; grid-template-columns:26px 1fr; gap:0 10px; padding:9px 0;
         border-bottom:1px solid var(--faint); break-inside:avoid; }
  .ans:last-child { border-bottom:0; }
  .ans-n { font-family:var(--sans); font-size:12px; font-weight:700; color:var(--teal-text);
           text-align:right; padding-top:2px; font-variant-numeric:tabular-nums; }
  .ans-q { font-size:13.5px; color:var(--mute); margin:0 0 4px; }
  .ans-a { font-size:14px; margin:0; }
  .ans.has-fig { padding-bottom:14px; }
  .ans figure, .ans .lab-wrap { margin:11px 0 0; text-align:center; }
  .ans figcaption { font-size:12px; }
  .todo { color:var(--orange-text); }

  nav.toc { background:var(--paper); border-radius:10px; padding:20px 24px; margin-bottom:34px; }
  nav.toc h2 { font-size:20px; margin-bottom:12px; }
  nav.toc ol { margin:0; padding-left:20px; columns:2; column-gap:30px; font-size:14px; }
  nav.toc li { margin-bottom:5px; break-inside:avoid; }
  nav.toc a { color:var(--ink); text-decoration:none; } nav.toc a:hover { color:var(--teal-text); }

  /* Print is still a book: every disclosure opens, the controls go, and each
     lab falls back to its first frame, which is why frame 0 is authored as the
     one that stands alone. */
  @media print {
    .chapter { break-before:page; } nav.toc ol { columns:2; } a { color:inherit; }
    .pr-sol, .turn details { display:block; }
    .pr-sol summary { display:none; }
    .pr-sol::before { content:"Solution."; font-family:var(--sans); font-size:11px;
                      letter-spacing:.05em; text-transform:uppercase; color:var(--teal-text); }
    .lab-btns, .lab-range, .lab-hint, .jd-c { display:none; }
    .lab-frame { display:none !important; }
    .lab-frame[data-i="0"] { display:block !important; }
    .jd-w { display:block; color:var(--mute) !important; }
  }
</style></head><body>
<header class="cover">
  <div class="dots"><i style="background:${C.orange}"></i><i style="background:${C.teal}"></i></div>
  <div class="series">${esc(meta.series)}</div>
  <h1>${esc(meta.title)}</h1>
  <h2>${esc(meta.subtitle)}</h2>
  <p>${esc(meta.blurb)}</p>
  <div class="stamp"><b>${esc(meta.status)}</b>${esc(meta.note)}</div>
</header>
<a class="skip" href="#contents">Skip to contents</a>
<main class="sheet">
  <nav class="toc" id="contents"><h2>Contents</h2><ol>
    ${chapters.map(c => `<li><a href="#ch${c.id}">${rich(c.title)}</a></li>`).join('')}
    <li><a href="#answers">Answers, in full</a></li>
    <li><a href="#gate">What this book still owes its reader</a></li>
  </ol></nav>
  ${chapters.map(chapterHTML).join('\n')}
  ${answersHTML(chapters)}
  ${gateHTML(chapters)}
</div>
<svg width="0" height="0"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5"
  markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${C.ink}"/></marker></defs></svg>
<script>
/* The whole runtime. It switches between frames that were drawn at build
   time and marks answers right or wrong. It computes no mathematics, which
   is why an interactive figure here can never disagree with a printed one. */
(function () {
  var show = function (lab, i) {
    var fr = lab.querySelectorAll('.lab-frame');
    for (var k = 0; k < fr.length; k++) fr[k].classList.toggle('on', k === i);
    var status = lab.querySelector('.lab-status');
    if (status) {
      var live = fr[i];
      var said = live.querySelector('.lab-say');
      var pic = live.querySelector('svg[aria-label]');
      status.textContent = (said ? said.textContent.trim() + ' ' : '')
        + (pic ? pic.getAttribute('aria-label') : '');
    }
    var range = lab.querySelector('.lab-range');
    if (range) {
      var btn = lab.querySelectorAll('.lab-b')[i];
      range.value = i;
      range.setAttribute('aria-valuetext', btn ? btn.textContent.trim() : String(i + 1));
    }
    var bs = lab.querySelectorAll('.lab-b');
    for (var k = 0; k < bs.length; k++) {
      var on = +bs[k].dataset.i === i;
      bs[k].classList.toggle('on', on);
      bs[k].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  };

  var labs = document.querySelectorAll('[data-lab="frames"]');
  for (var n = 0; n < labs.length; n++) (function (lab) {
    lab.addEventListener('click', function (e) {
      var b = e.target.closest('.lab-b');
      if (b) show(lab, +b.dataset.i);
    });
    var r = lab.querySelector('.lab-range');
    if (r) r.addEventListener('input', function () { show(lab, +r.value); });
    show(lab, 0);
  })(labs[n]);

  var judges = document.querySelectorAll('[data-lab="judge"]');
  for (var n = 0; n < judges.length; n++) (function (lab) {
    var rows = lab.querySelectorAll('.jd li');
    var score = lab.querySelector('.lab-score');
    var tally = function () {
      var done = 0, right = 0;
      for (var k = 0; k < rows.length; k++) {
        if (rows[k].dataset.done) { done++; if (rows[k].classList.contains('right')) right++; }
      }
      score.textContent = done ? right + ' of ' + done + ' judged correctly'
        + (done === rows.length ? '.' : ', ' + (rows.length - done) + ' to go.') : '';
    };
    lab.addEventListener('click', function (e) {
      var b = e.target.closest('.jd-c button');
      if (!b) return;
      var li = b.closest('li');
      var ok = b.dataset.v === li.dataset.ok;
      li.classList.remove('right', 'wrong');
      li.classList.add(ok ? 'right' : 'wrong');
      li.dataset.done = '1';
      var picked = li.querySelectorAll('.jd-c button');
      for (var k = 0; k < picked.length; k++) picked[k].classList.toggle('picked', picked[k] === b);
      li.querySelector('.jd-w').hidden = false;
      tally();
    });
  })(judges[n]);
})();
</script>
</body></html>`;

/* -------------------------------------------------------------------- run */
const books = (await readdir(SRC, { withFileTypes: true }))
  .filter(d => d.isDirectory() && d.name !== 'dist').map(d => d.name);

if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

for (const name of books) {
  const { meta, chapters: authored } = await import(`file://${join(SRC, name, 'index.js')}`);
  const chapters = authored.map(expandDrills);   // drills become real practice items here
  const seen = new Set();
  for (const c of chapters) {
    if (seen.has(c.id)) throw new Error(`${name}: two chapters numbered ${c.id}`);
    seen.add(c.id);
    for (const q of c.practice || []) if (!q.q) throw new Error(`${name} ch${c.id}: a practice item has no question`);
  }
  // Chapters cross-refer constantly, and inserting one shifts every reference
  // after it. A stale "chapter 12" still reads as a sentence, so nothing but a
  // check will catch it. Every number mentioned must be a chapter that exists.
  const ids = new Set(chapters.map(c => c.id));
  const dangling = [];
  for (const c of chapters) {
    const prose = JSON.stringify({ b: c.blocks, p: c.practice, m: c.misconception, r: c.review, s: c.standfirst });
    for (const m of prose.matchAll(/chapters?\s+(\d+)/gi))
      if (!ids.has(+m[1])) dangling.push(`ch${c.id} refers to chapter ${m[1]}, which does not exist`);
  }
  if (dangling.length) throw new Error(`${name}: broken cross-references\n  ` + [...new Set(dangling)].join('\n  '));

  let html = page(meta, chapters);

  // Every practice figure is drawn twice: once in the solution beside the
  // question, once in the answer key. Both placements earn their keep, but the
  // two copies are byte-identical, so the second one is stored rather than
  // drawn again. Identical figures become one <symbol> that each site
  // references. No script involved, so printing and no-JS reading are
  // unaffected.
  {
    const seen = new Map();
    // The accessible name sits on the element and differs between copies, so it
    // is matched separately and left in place; only the drawn body is shared.
    const TAG = /<svg aria-label="([^"]*)" class="(fig[^"]*)" viewBox="([^"]*)" width="(\d+)" height="(\d+)" role="img">([\s\S]*?)<\/svg>/g;
    const svgs = [...html.matchAll(TAG)];
    for (const m of svgs) {
      const body = m[6];
      if (!seen.has(body)) seen.set(body, { n: seen.size, count: 1, box: m[3] });
      else seen.get(body).count++;
    }
    const shared = [...seen.entries()].filter(([, v]) => v.count > 1);
    if (shared.length) {
      const ids = new Map(shared.map(([body, v], i) => [body, { id: `s${i}`, box: v.box }]));
      html = html.replace(TAG, (whole, name, cls, box, w, h, body) => {
        const hit = ids.get(body);
        return hit
          ? `<svg aria-label="${name}" class="${cls}" viewBox="${box}" width="${w}" height="${h}" role="img"><use href="#${hit.id}"/></svg>`
          : whole;
      });
      const defs = shared.map(([body], i) => `<symbol id="s${i}" viewBox="${ids.get(body).box}">${body}</symbol>`).join('');
      html = html.replace('<svg width="0" height="0"><defs>', `<svg width="0" height="0" aria-hidden="true">${defs}<defs>`);
      const saved = shared.reduce((n, [body, v]) => n + body.length * (v.count - 1), 0);
      console.log(`  ${shared.length} figures drawn more than once, stored once: ${(saved / 1024 / 1024).toFixed(1)} MB saved`);
    }
  }

  // Unformatted notation must not ship. A stray "2^x" or "sqrt(x)" in the
  // rendered text means the formatter has a gap, and the gap is invisible in
  // the source because the source is meant to be written that way. Letter
  // exponents were missed for exactly this reason once already.
  // Includes aria-labels. What is read aloud needs formatting as much as what
  // is read on screen, and they are different strings, so scanning the visible
  // text alone let raw notation into the spoken descriptions unnoticed.
  const spoken = [...html.matchAll(/aria-label="([^"]*)"/g)].map(m => m[1]).join(' ');
  const text = html.replace(/<[^>]+>/g, ' ') + ' ' + spoken;
  const raw = [...text.matchAll(/.{0,20}(\^|sqrt\(|<=|>=|\binfinity\b).{0,16}/g)].map(m => m[0].replace(/\s+/g, ' ').trim());
  if (raw.length) throw new Error(`${name}: ${raw.length} unformatted notation site(s) in the rendered book:\n  ` + raw.slice(0, 6).join('\n  '));

  // No figure may ship without an accessible name. This is a WCAG 1.1.1
  // requirement and a procurement gate, so it fails the build rather than a
  // later audit.
  {
    const all = (html.match(/<svg class="fig|<svg aria-label="[^"]*" class="fig/g) || []).length;
    const named = (html.match(/<svg aria-label="[^"]+" class="fig/g) || []).length;
    if (named !== all) throw new Error(`${name}: ${all - named} of ${all} figures have no accessible name`);
    console.log(`  ${named} figures, every one with an accessible name computed from its own data`);
  }

  const file = join(OUT, `${name}.html`);
  await writeFile(file, html, 'utf8');
  const words = chapters.reduce((n, c) => n + JSON.stringify(c).split(/\s+/).length, 0);
  const gated = chapters.filter(c => audit(c).pass).length;
  console.log(`${name}
  ${chapters.length} chapters, ${chapters.reduce((n, c) => n + (c.practice || []).length, 0)} practice items, ~${words} words
  ${gated} of ${chapters.length} chapters meet the completion gate
  -> book/dist/${name}.html  (${(html.length / 1024).toFixed(0)} kB, print to PDF from the browser)`);
}
