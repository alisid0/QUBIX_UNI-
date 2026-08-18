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
  .replace(/\bdelta\b/g, 'Δ').replace(/\bDelta\b/g, 'Δ')
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
  mapping({ pairs, broken = null, caption = '' }) {
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
    const h = 34 + Math.max(ins.length, outs.length) * 38 + (caption ? 18 : 6);
    if (caption) b.push(label(124, h - 5, caption, broken ? C.rose : C.teal, 9));
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
  secant({ f = x => 0.42 * x * x - 1.6 * x + 3.4, a = 1.4, b: bx = 5.6, x0 = 0, x1 = 7, y0 = 0, y1 = 6 }) {
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
  rects({ f = x => 0.16 * x * x + 0.6, n = 8, x0 = 0, x1 = 6 }) {
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

  // Input/output table drawn as a figure so it sits beside a graph.
  table({ head, rows }) {
    return `<table class="fig-table"><thead><tr>${head.map(h => `<th>${rich(h)}</th>`).join('')}</tr></thead>`
      + `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
};

/* ------------------------------------------------------------ block render */
const block = (b, ctx) => {
  switch (b.t) {
    case 'p': return `<p>${rich(b.text)}</p>`;
    case 'h': return `<h3>${rich(b.text)}</h3>`;
    case 'formula': return `<div class="formula">${esc(math(b.text))}</div>`;
    case 'list': return `<${b.ordered ? 'ol' : 'ul'} class="bullets">${b.items.map(i => `<li>${rich(i)}</li>`).join('')}</${b.ordered ? 'ol' : 'ul'}>`;
    case 'table': return `<div class="tw"><table class="data"><thead><tr>${b.head.map(h => `<th>${rich(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'callout': return `<aside class="callout ${b.tone || ''}"><b>${rich(b.title)}</b><p>${rich(b.text)}</p></aside>`;
    case 'figure': {
      const f = FIG[b.kind];
      if (!f) throw new Error(`${ctx}: unknown figure kind "${b.kind}"`);
      return `<figure>${f(b)}${b.caption ? `<figcaption>${rich(b.caption)}</figcaption>` : ''}</figure>`;
    }
    case 'figures': return `<div class="fig-row">${b.items.map(i => block({ ...i, t: 'figure' }, ctx)).join('')}</div>`;
    case 'example': return `<div class="worked"><b class="wk-h">Worked example ${b.n}</b><p class="wk-q">${rich(b.ask)}</p>`
      + `<ol class="wk-steps">${b.steps.map(s => `<li>${rich(s)}</li>`).join('')}</ol>`
      + `<p class="wk-a"><b>Answer.</b> ${rich(b.answer)}</p>`
      + (b.note ? `<p class="wk-n">${rich(b.note)}</p>` : '') + `</div>`;
    default: throw new Error(`${ctx}: unknown block "${b.t}"`);
  }
};

/* ------------------------------------------------------------- the render */
const LEVELS = ['Recognise', 'Represent', 'Calculate', 'Transform', 'Combine', 'Analyse change'];

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
      ${prac.map(q => `<li${q.hard ? ' class="hard"' : ''}><span class="pr-q">${rich(q.q)}</span>${q.level ? `<span class="pr-l">${esc(q.level)}</span>` : ''}</li>`).join('\n      ')}
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

const answersHTML = chapters => `
<section class="chapter answers" id="answers">
  <div class="kicker">ANSWER KEY</div>
  <h2>Answers, in full</h2>
  <p class="stand">Every practice item is answered here, with the reasoning that produces it. A book that answers only the odd numbers teaches its reader to guess.</p>
  ${chapters.filter(c => (c.practice || []).some(p => p.a)).map(c => `
  <div class="ans-ch">
    <h3>${c.id}. ${rich(c.title)}</h3>
    <ol class="ans-list">
      ${(c.practice || []).map(p => `<li>${p.a ? rich(p.a) : '<i class="todo">not yet answered</i>'}</li>`).join('')}
    </ol>
  </div>`).join('')}
</section>`;

// The book measures itself against its own completion gate and prints the
// result. An unfinished chapter says so in the book rather than in a note
// someone has to remember to read.
const gateHTML = chapters => {
  const rows = chapters.map(c => {
    const p = (c.practice || []).length;
    const answered = (c.practice || []).filter(x => x.a).length;
    const ex = (c.blocks || []).filter(b => b.t === 'example').length;
    const pass = ex >= 1 && p >= 6 && answered === p && !!c.misconception && !!c.review;
    return { c, p, answered, ex, pass };
  });
  const done = rows.filter(r => r.pass).length;
  return `
<section class="chapter" id="gate">
  <div class="kicker">COMPLETION</div>
  <h2>What this book still owes its reader</h2>
  <p class="stand">The gate below is the standard set in Draft 1: every chapter needs a worked example, at least six practice items, an answer for every one of them, a named misconception, and a link back to earlier work. This table is generated from the source at build time, so it cannot flatter the book.</p>
  <div class="tw"><table class="data gate">
    <thead><tr><th>Chapter</th><th>Worked</th><th>Practice</th><th>Answered</th><th>Mistake</th><th>Review</th><th>Gate</th></tr></thead>
    <tbody>${rows.map(r => `<tr class="${r.pass ? 'ok' : 'no'}">
      <td>${r.c.id}. ${rich(r.c.title)}</td>
      <td>${r.ex || '—'}</td><td>${r.p || '—'}</td>
      <td>${r.p ? (r.answered === r.p ? 'all' : `${r.answered} of ${r.p}`) : '—'}</td>
      <td>${r.c.misconception ? 'yes' : '—'}</td><td>${r.c.review ? 'yes' : '—'}</td>
      <td>${r.pass ? 'PASS' : 'open'}</td></tr>`).join('')}</tbody>
  </table></div>
  <p class="gate-sum"><b>${done} of ${chapters.length} chapters</b> meet the gate.
  ${chapters.reduce((n, c) => n + (c.practice || []).length, 0)} practice items,
  ${chapters.reduce((n, c) => n + (c.blocks || []).filter(b => b.t === 'example').length, 0)} worked examples,
  ${chapters.reduce((n, c) => n + (c.blocks || []).filter(b => b.t === 'figure' || b.t === 'figures').length, 0)} figures.</p>
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

  .kicker { color:var(--teal); font-size:11px; font-weight:700; letter-spacing:.13em; margin-bottom:6px; }
  h2 { font-size:29px; line-height:1.16; margin:0 0 12px; letter-spacing:-.015em; }
  h3 { font-size:17px; color:var(--teal); margin:26px 0 8px; }
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
  table.gate tr.ok td:last-child { color:var(--teal); font-weight:700; }
  table.gate tr.no td:last-child { color:var(--orange); font-weight:700; }
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
  .callout.warn b { color:#a85a1d; }
  .callout.back { background:var(--paper); border-color:var(--rule); }
  .callout .fix { color:var(--mute); }

  .worked { border:1px solid var(--rule); border-left:3px solid var(--orange); border-radius:0 8px 8px 0;
            padding:14px 16px; margin:18px 0; background:#fffdf9; break-inside:avoid; }
  .wk-h { color:var(--orange); font-size:11px; letter-spacing:.09em; text-transform:uppercase; display:block; margin-bottom:6px; }
  .wk-q { font-weight:600; margin-bottom:9px; }
  .wk-steps { margin:0 0 10px; padding-left:20px; font-size:14px; } .wk-steps li { margin-bottom:5px; }
  .wk-a { margin:0; padding-top:9px; border-top:1px solid var(--rule); font-size:14px; }
  .wk-n { margin:8px 0 0; font-size:13px; color:var(--mute); }

  .practice { margin:24px 0 6px; break-inside:avoid; }
  .pr-head { background:var(--ink); color:#fff; padding:8px 13px; border-radius:7px 7px 0 0;
             display:flex; justify-content:space-between; align-items:baseline; font-size:12px; }
  .pr-head span { color:#9fb0c4; font-size:11px; }
  .pr-list { margin:0; padding:4px 0 0 0; list-style:none; counter-reset:pr;
             border:1px solid var(--rule); border-top:0; border-radius:0 0 7px 7px; }
  .pr-list li { counter-increment:pr; padding:8px 13px 8px 40px; position:relative; font-size:14px;
                border-bottom:1px solid var(--faint); display:flex; gap:10px; justify-content:space-between; }
  .pr-list li:last-child { border-bottom:0; }
  .pr-list li::before { content:counter(pr) "."; position:absolute; left:13px; color:var(--teal); font-weight:700; }
  .pr-list li.hard::after { content:"harder"; }
  .pr-l { color:var(--mute); font-size:10.5px; letter-spacing:.05em; text-transform:uppercase; white-space:nowrap; padding-top:3px; }

  .answers .ans-ch { margin-bottom:20px; break-inside:avoid; }
  .answers h3 { margin:0 0 6px; }
  .ans-list { margin:0; padding-left:22px; font-size:13.5px; color:#2c3e55; }
  .ans-list li { margin-bottom:5px; }
  .todo { color:var(--orange); }

  nav.toc { background:var(--paper); border-radius:10px; padding:20px 24px; margin-bottom:34px; }
  nav.toc h2 { font-size:20px; margin-bottom:12px; }
  nav.toc ol { margin:0; padding-left:20px; columns:2; column-gap:30px; font-size:14px; }
  nav.toc li { margin-bottom:5px; break-inside:avoid; }
  nav.toc a { color:var(--ink); text-decoration:none; } nav.toc a:hover { color:var(--teal); }

  @media print { .chapter { break-before:page; } nav.toc ol { columns:2; } a { color:inherit; } }
</style></head><body>
<header class="cover">
  <div class="dots"><i style="background:${C.orange}"></i><i style="background:${C.teal}"></i></div>
  <div class="series">${esc(meta.series)}</div>
  <h1>${esc(meta.title)}</h1>
  <h2>${esc(meta.subtitle)}</h2>
  <p>${esc(meta.blurb)}</p>
  <div class="stamp"><b>${esc(meta.status)}</b>${esc(meta.note)}</div>
</header>
<div class="sheet">
  <nav class="toc"><h2>Contents</h2><ol>
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
</body></html>`;

/* -------------------------------------------------------------------- run */
const books = (await readdir(SRC, { withFileTypes: true }))
  .filter(d => d.isDirectory() && d.name !== 'dist').map(d => d.name);

if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

for (const name of books) {
  const { meta, chapters } = await import(`file://${join(SRC, name, 'index.js')}`);
  const seen = new Set();
  for (const c of chapters) {
    if (seen.has(c.id)) throw new Error(`${name}: two chapters numbered ${c.id}`);
    seen.add(c.id);
    for (const q of c.practice || []) if (!q.q) throw new Error(`${name} ch${c.id}: a practice item has no question`);
  }
  const html = page(meta, chapters);

  // Unformatted notation must not ship. A stray "2^x" or "sqrt(x)" in the
  // rendered text means the formatter has a gap, and the gap is invisible in
  // the source because the source is meant to be written that way. Letter
  // exponents were missed for exactly this reason once already.
  const text = html.replace(/<[^>]+>/g, ' ');
  const raw = [...text.matchAll(/.{0,20}(\^|sqrt\(|<=|>=|\binfinity\b).{0,16}/g)].map(m => m[0].replace(/\s+/g, ' ').trim());
  if (raw.length) throw new Error(`${name}: ${raw.length} unformatted notation site(s) in the rendered book:\n  ` + raw.slice(0, 6).join('\n  '));

  const file = join(OUT, `${name}.html`);
  await writeFile(file, html, 'utf8');
  const words = chapters.reduce((n, c) => n + JSON.stringify(c).split(/\s+/).length, 0);
  const gated = chapters.filter(c => (c.blocks || []).some(b => b.t === 'example')
    && (c.practice || []).length >= 6 && (c.practice || []).every(p => p.a) && c.misconception && c.review).length;
  console.log(`${name}
  ${chapters.length} chapters, ${chapters.reduce((n, c) => n + (c.practice || []).length, 0)} practice items, ~${words} words
  ${gated} of ${chapters.length} chapters meet the completion gate
  -> book/dist/${name}.html  (${(html.length / 1024).toFixed(0)} kB, print to PDF from the browser)`);
}
