// One configurable plane, drawing every glossary figure in the atlas.
//
// The chapter figures in build-book.mjs are large and each answers one
// question. An atlas entry is different: small, uniform, and read at a glance
// beside 600 others. So it gets its own renderer rather than a shrunk version
// of the other one — a thumbnail is a different object from an illustration.
//
// Everything is computed from the numbers in the spec, as everywhere else in
// this repo: no figure here was positioned by hand.

export const C = {
  ink: '#16283f', teal: '#12897c', tealText: '#10796e', orange: '#e0813a',
  orangeText: '#a25d2a', rose: '#c0504d', paper: '#faf7f0', rule: '#d8d3c7',
  mute: '#5d6b7d', faint: '#eae5d9', grid: '#e3ded2'
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const n2 = v => Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(2);
const minus = s => String(s).replace(/-/g, '−');

export const draw = (o = {}) => {
  const s = { w: 210, h: 160, x0: -5, x1: 5, y0: -5, y1: 5, grid: 'lines', ...o };
  const pad = { l: 9, r: 9, t: 9, b: 9 };
  const iw = s.w - pad.l - pad.r, ih = s.h - pad.t - pad.b;
  const X = x => pad.l + ((x - s.x0) / (s.x1 - s.x0)) * iw;
  const Y = y => pad.t + ih - ((y - s.y0) / (s.y1 - s.y0)) * ih;
  const b = [`<rect width="${s.w}" height="${s.h}" rx="6" fill="${C.paper}"/>`];

  // quadrant shading, before anything else
  const QUAD = { 1: [0, s.x1, 0, s.y1], 2: [s.x0, 0, 0, s.y1], 3: [s.x0, 0, s.y0, 0], 4: [0, s.x1, s.y0, 0] };
  for (const q of s.quads || []) {
    const [a, c, d, e] = QUAD[q];
    b.push(`<rect x="${X(a)}" y="${Y(e)}" width="${X(c) - X(a)}" height="${Y(d) - Y(e)}" fill="#cfe6e1" opacity=".55"/>`);
  }
  if (s.shade) {
    const { above, below, left, right } = s.shade;
    if (above !== undefined) b.push(`<rect x="${X(s.x0)}" y="${Y(s.y1)}" width="${iw}" height="${Y(above) - Y(s.y1)}" fill="#cfe6e1" opacity=".5"/>`);
    if (below !== undefined) b.push(`<rect x="${X(s.x0)}" y="${Y(below)}" width="${iw}" height="${Y(s.y0) - Y(below)}" fill="#f3ded0" opacity=".6"/>`);
    if (left !== undefined) b.push(`<rect x="${X(s.x0)}" y="${Y(s.y1)}" width="${X(left) - X(s.x0)}" height="${ih}" fill="#f3ded0" opacity=".6"/>`);
    if (right !== undefined) b.push(`<rect x="${X(right)}" y="${Y(s.y1)}" width="${X(s.x1) - X(right)}" height="${ih}" fill="#cfe6e1" opacity=".5"/>`);
  }
  for (const [x1, y1, x2, y2] of s.bands || [])
    b.push(`<rect x="${X(x1)}" y="${Y(y2)}" width="${X(x2) - X(x1)}" height="${Y(y1) - Y(y2)}" fill="#cfe6e1" opacity=".6"/>`);

  // grid
  if (s.grid === 'lines' || s.grid === 'dots') {
    for (let x = Math.ceil(s.x0); x <= s.x1; x++) for (let y = Math.ceil(s.y0); y <= s.y1; y++) {
      if (s.grid === 'dots') b.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="1.3" fill="${C.rule}"/>`);
    }
    if (s.grid === 'lines') {
      for (let x = Math.ceil(s.x0); x <= s.x1; x++)
        b.push(`<line x1="${X(x)}" y1="${pad.t}" x2="${X(x)}" y2="${pad.t + ih}" stroke="${s.hiGrid === x ? C.orange : C.grid}" stroke-width="${s.hiGrid === x ? 1.8 : 0.7}"/>`);
      for (let y = Math.ceil(s.y0); y <= s.y1; y++)
        b.push(`<line x1="${pad.l}" y1="${Y(y)}" x2="${pad.l + iw}" y2="${Y(y)}" stroke="${C.grid}" stroke-width="0.7"/>`);
    }
  }

  // axes, optionally with one emphasised
  const axCol = w => (s.axisHi === w || s.axisHi === 'both') ? C.orange : C.mute;
  const axW = w => (s.axisHi === w || s.axisHi === 'both') ? 2.6 : 1.2;
  if (s.axes !== false) {
    if (s.y0 <= 0 && s.y1 >= 0) b.push(`<line x1="${pad.l}" y1="${Y(0)}" x2="${pad.l + iw}" y2="${Y(0)}" stroke="${axCol('x')}" stroke-width="${axW('x')}"/>`);
    if (s.x0 <= 0 && s.x1 >= 0) b.push(`<line x1="${X(0)}" y1="${pad.t}" x2="${X(0)}" y2="${pad.t + ih}" stroke="${axCol('y')}" stroke-width="${axW('y')}"/>`);
  }
  if (s.ticks) for (let x = Math.ceil(s.x0); x <= s.x1; x++) if (x) {
    b.push(`<line x1="${X(x)}" y1="${Y(0) - 3.5}" x2="${X(x)}" y2="${Y(0) + 3.5}" stroke="${s.hiTick === x ? C.orange : C.mute}" stroke-width="${s.hiTick === x ? 2.2 : 1.1}"/>`);
  }
  if (s.arrowheads !== false) {
    b.push(`<path d="M${pad.l + iw} ${Y(0)} l-5 -3 v6 z" fill="${axCol('x')}"/>`);
    b.push(`<path d="M${X(0)} ${pad.t} l-3 5 h6 z" fill="${axCol('y')}"/>`);
  }

  // full-width lines: {m,c} sloped, {x} vertical, {y} horizontal
  for (const L of s.lines || []) {
    const col = L.c2 || C.teal, dash = L.dash ? ' stroke-dasharray="4 3"' : '';
    if (L.x !== undefined) b.push(`<line x1="${X(L.x)}" y1="${pad.t}" x2="${X(L.x)}" y2="${pad.t + ih}" stroke="${col}" stroke-width="2"${dash}/>`);
    else if (L.y !== undefined) b.push(`<line x1="${pad.l}" y1="${Y(L.y)}" x2="${pad.l + iw}" y2="${Y(L.y)}" stroke="${col}" stroke-width="2"${dash}/>`);
    else b.push(`<line x1="${X(s.x0)}" y1="${Y(L.m * s.x0 + L.c)}" x2="${X(s.x1)}" y2="${Y(L.m * s.x1 + L.c)}" stroke="${col}" stroke-width="2"${dash}/>`);
  }

  // a sampled curve, for the few atlas entries that need one
  for (const cu of s.curves || []) {
    const runs = [[]];
    for (let i = 0; i <= 240; i++) {
      const x = s.x0 + (i / 240) * (s.x1 - s.x0), y = cu.f(x);
      if (!Number.isFinite(y) || y < s.y0 - 1 || y > s.y1 + 1) { if (runs.at(-1).length) runs.push([]); continue; }
      runs.at(-1).push(`${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    }
    runs.filter(r => r.length > 1).forEach(r =>
      b.push(`<polyline points="${r.join(' ')}" fill="none" stroke="${cu.c2 || C.teal}" stroke-width="2" stroke-linecap="round"/>`));
  }

  // closed shapes, circles and conics
  for (const p of s.polys || []) {
    const d = p.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ');
    b.push(`<polygon points="${d}" fill="${p.fill || '#cfe6e1'}" fill-opacity="${p.fill === 'none' ? 0 : 0.65}"
      stroke="${p.stroke || C.tealText}" stroke-width="${p.wid || 2}"${p.dash ? ' stroke-dasharray="4 3"' : ''}/>`);
  }
  for (const c of s.circles || [])
    b.push(`<circle cx="${X(c.cx)}" cy="${Y(c.cy)}" r="${Math.abs(X(c.cx + c.r) - X(c.cx))}"
      fill="${c.fill || 'none'}" fill-opacity="${c.fill ? 0.55 : 0}" stroke="${c.stroke || C.teal}"
      stroke-width="${c.wid || 2}"${c.dash ? ' stroke-dasharray="4 3"' : ''}/>`);
  for (const e of s.ellipses || [])
    b.push(`<ellipse cx="${X(e.cx)}" cy="${Y(e.cy)}" rx="${Math.abs(X(e.cx + e.rx) - X(e.cx))}"
      ry="${Math.abs(Y(e.cy + e.ry) - Y(e.cy))}" fill="${e.fill || 'none'}" fill-opacity="${e.fill ? 0.5 : 0}"
      stroke="${e.stroke || C.teal}" stroke-width="2"${e.dash ? ' stroke-dasharray="4 3"' : ''}/>`);
  // measured data, drawn small so a cloud reads as a cloud
  for (const [x, y] of s.scatter || [])
    b.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="2.6" fill="${C.ink}" opacity=".72"/>`);
  for (const bar of s.bars || [])
    b.push(`<rect x="${X(bar[0])}" y="${Y(bar[2])}" width="${X(bar[1]) - X(bar[0]) - 1}"
      height="${Y(0) - Y(bar[2])}" fill="#cfe6e1" stroke="${C.tealText}" stroke-width="1"/>`);

  // An arbitrary path of computed points: polar curves, parametric curves,
  // anything whose shape is easier to generate than to describe.
  for (const p of s.paths || []) {
    const d = p.pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ');
    b.push(`<${p.close ? 'polygon' : 'polyline'} points="${d}" fill="${p.fill || 'none'}"
      fill-opacity="${p.fill ? 0.5 : 0}" stroke="${p.c2 || C.teal}" stroke-width="${p.wid || 2}"
      ${p.dash ? 'stroke-dasharray="4 3"' : ''} stroke-linecap="round" stroke-linejoin="round"/>`);
  }

  // segments, rays, dashed guides
  for (const g of s.segs || []) {
    const [x1, y1, x2, y2, col = C.teal, dash = false, wid = 2.4] = g;
    b.push(`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${col}" stroke-width="${wid}"${dash ? ' stroke-dasharray="4 3"' : ''} stroke-linecap="round"/>`);
  }
  for (const [x1, y1, x2, y2, col = C.teal] of s.rays || []) {
    const dx = x2 - x1, dy = y2 - y1, k = 40;
    b.push(`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x1 + dx * k)}" y2="${Y(y1 + dy * k)}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`);
  }
  for (const [x, y] of s.guides || []) {
    b.push(`<line x1="${X(x)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(0)}" stroke="${C.orange}" stroke-width="1.2" stroke-dasharray="3 3"/>`);
    b.push(`<line x1="${X(x)}" y1="${Y(y)}" x2="${X(0)}" y2="${Y(y)}" stroke="${C.orange}" stroke-width="1.2" stroke-dasharray="3 3"/>`);
  }
  // rise-and-run triangle between two points
  if (s.tri) {
    const [x1, y1, x2, y2] = s.tri;
    b.push(`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y1)}" stroke="${C.orange}" stroke-width="2.2"/>`);
    b.push(`<line x1="${X(x2)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${C.tealText}" stroke-width="2.2"/>`);
    b.push(`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="4 3"/>`);
  }
  for (const [x1, y1, x2, y2, col = C.ink] of s.arrows || [])
    b.push(`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${col}" stroke-width="1.8" marker-end="url(#atip)"/>`);

  // a small square angle marker at a corner
  if (s.right) {
    const [x, y, dx, dy] = s.right, k = 0.42;
    b.push(`<path d="M${X(x + dx * k)} ${Y(y)} L${X(x + dx * k)} ${Y(y + dy * k)} L${X(x)} ${Y(y + dy * k)}" fill="none" stroke="${C.mute}" stroke-width="1.3"/>`);
  }

  for (const [x, y] of s.open || [])
    b.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="${C.paper}" stroke="${C.rose}" stroke-width="2"/>`);
  for (const p of s.pts || []) {
    const [x, y, lab, col = C.ink] = p;
    b.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="4.2" fill="${col}"/>`);
    if (lab) b.push(`<text x="${X(x) + 7}" y="${Y(y) - 6}" font-size="9" fill="${C.ink}" font-family="ui-sans-serif,system-ui,sans-serif">${esc(minus(lab))}</text>`);
  }
  for (const [x, y, str, col = C.mute, size = 9] of s.text || [])
    b.push(`<text x="${X(x)}" y="${Y(y)}" font-size="${size}" fill="${col}" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif">${esc(minus(str))}</text>`);
  if (s.note) b.push(`<text x="${s.w - 8}" y="${s.h - 7}" text-anchor="end" font-size="9" fill="${C.mute}" font-family="ui-monospace,monospace">${esc(minus(s.note))}</text>`);

  return `<svg class="af" viewBox="0 0 ${s.w} ${s.h}" width="${s.w}" height="${s.h}" role="img" aria-label="${esc(s.alt || 'figure')}">${b.join('')}</svg>`;
};

// A number line, for the handful of one-dimensional entries.
export const line1d = (o = {}) => {
  const s = { w: 210, h: 74, from: -5, to: 5, ...o };
  const pad = 16, y = 40;
  const X = v => pad + ((v - s.from) / (s.to - s.from)) * (s.w - 2 * pad);
  const b = [`<rect width="${s.w}" height="${s.h}" rx="6" fill="${C.paper}"/>`];
  for (const sp of s.spans || [])
    b.push(`<rect x="${X(sp[0])}" y="${y - 6}" width="${X(sp[1]) - X(sp[0])}" height="12" fill="${sp[2] === 'out' ? '#f3ded0' : '#cfe6e1'}"/>`);
  b.push(`<line x1="${pad - 8}" y1="${y}" x2="${s.w - pad + 8}" y2="${y}" stroke="${C.mute}" stroke-width="1.4" marker-end="url(#atip)"/>`);
  for (let v = Math.ceil(s.from); v <= s.to; v++) {
    b.push(`<line x1="${X(v)}" y1="${y - 4}" x2="${X(v)}" y2="${y + 4}" stroke="${C.mute}" stroke-width="1"/>`);
    if (s.labels !== false) b.push(`<text x="${X(v)}" y="${y + 17}" text-anchor="middle" font-size="8.5" fill="${C.mute}" font-family="ui-sans-serif,system-ui,sans-serif">${esc(minus(String(v)))}</text>`);
  }
  for (const m of s.marks || [])
    b.push(m.open
      ? `<circle cx="${X(m.x)}" cy="${y}" r="5" fill="${C.paper}" stroke="${C.rose}" stroke-width="2"/>`
      : `<circle cx="${X(m.x)}" cy="${y}" r="5" fill="${C.tealText}"/>`);
  if (s.note) b.push(`<text x="${s.w / 2}" y="${s.h - 6}" text-anchor="middle" font-size="9" fill="${C.mute}" font-family="ui-sans-serif,system-ui,sans-serif">${esc(minus(s.note))}</text>`);
  return `<svg class="af" viewBox="0 0 ${s.w} ${s.h}" width="${s.w}" height="${s.h}" role="img" aria-label="${esc(s.alt || 'a number line')}">${b.join('')}</svg>`;
};

export const n = n2;
