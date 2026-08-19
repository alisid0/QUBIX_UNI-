// Renders the coordinate spine to a readable page.
//
// Counts are computed from the list, never typed. If a term is added the
// totals move by themselves, and the build fails on a duplicate — a concept
// inventory with the same name twice is a inventory nobody can trust.
//
//   node scripts/build-spine.mjs

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { meta, stages } = await import(`file://${join(ROOT, 'book', 'spine', 'index.js')}`);
const { HOW, LEGEND } = await import(`file://${join(ROOT, 'book', 'spine', 'drawable.js')}`);
const { ATLAS: A12 } = await import(`file://${join(ROOT, 'book', 'spine', 'atlas-1-2.js')}`);
const { ATLAS_3_5 } = await import(`file://${join(ROOT, 'book', 'spine', 'atlas-3-5.js')}`);
const { ATLAS_6_8 } = await import(`file://${join(ROOT, 'book', 'spine', 'atlas-6-8.js')}`);
const ATLAS = { ...A12, ...ATLAS_3_5, ...ATLAS_6_8 };
const { draw, line1d } = await import(`file://${join(ROOT, 'scripts', 'atlas-figures.mjs')}`);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* A duplicate term means two stages claim the same idea. Fail loudly. */
const seen = new Map();
const dupes = [];
for (const st of stages) for (const t of st.terms) {
  const k = t.toLowerCase();
  if (seen.has(k)) dupes.push(`"${t}" in stage ${seen.get(k)} and again in stage ${st.n}`);
  else seen.set(k, st.n);
}
if (dupes.length) throw new Error('duplicate terms in the spine:\n  ' + dupes.join('\n  '));

const total = stages.reduce((n, s) => n + s.terms.length, 0);

/* Anything the classification does not mention is drawable as itself. A name
   in HOW that matches no term would be a silent lie about coverage. */
const stray = Object.keys(HOW).filter(k => !seen.has(k.toLowerCase()));
if (stray.length) throw new Error('classified terms that are not in the spine:\n  ' + stray.join('\n  '));

/* Every drawn entry must name a concept that exists, for the same reason the
   classification must. */
const strayFig = Object.keys(ATLAS).filter(k => !seen.has(k.toLowerCase()));
if (strayFig.length) throw new Error('atlas figures for concepts not in the spine:\n  ' + strayFig.join('\n  '));

const how = t => HOW[t] || 'direct';
const figure = t => {
  const spec = ATLAS[t];
  if (!spec) return '';
  return spec.line ? line1d(spec) : draw(spec);
};
const drawn = stages.flatMap(s => s.terms).filter(t => ATLAS[t]).length;
const tally = ks => Object.fromEntries(LEGEND.map(([k]) => [k, ks.filter(x => x === k).length]));
const overall = tally(stages.flatMap(s => s.terms.map(how)));
const drawableAtAll = total - overall.none;
const C = { ink: '#16283f', teal: '#12897c', tealText: '#10796e', paper: '#faf7f0',
  rule: '#d8d3c7', mute: '#5d6b7d', edge: '#918d85' };

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(meta.title)}</title>
<style>
  @page { size: A4; margin: 16mm; }
  :root { --ink:${C.ink}; --teal:${C.teal}; --teal-text:${C.tealText}; --paper:${C.paper};
          --rule:${C.rule}; --mute:${C.mute}; --edge:${C.edge};
          --serif:Georgia,"Iowan Old Style","Palatino Linotype",Palatino,serif;
          --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; }
  * { box-sizing:border-box; }
  body { margin:0; background:#fff; color:var(--ink); font:16px/1.6 var(--serif); }
  .wrap { max-width:60rem; margin:0 auto; padding:0 22px 90px; }
  header.top { background:var(--ink); color:#fff; padding:56px 44px 44px; margin-bottom:40px;
               border-radius:0 0 20px 20px; max-width:1080px; margin-inline:auto; }
  header.top .kick { color:#7fd3c6; font-family:var(--sans); font-size:11px; letter-spacing:.16em;
                     font-weight:700; }
  header.top h1 { font-size:clamp(30px,4.6vw,44px); line-height:1.05; margin:14px 0 14px;
                  letter-spacing:-.02em; text-wrap:balance; }
  header.top p { color:#c2cedd; max-width:52ch; margin:0; font-size:15px; }
  .counts { display:flex; flex-wrap:wrap; gap:10px 34px; margin:28px 0 0; }
  .counts b { font-family:var(--sans); font-size:26px; display:block; line-height:1; }
  .counts span { font-family:var(--sans); font-size:11.5px; color:#8fa2b8; letter-spacing:.04em;
                 display:block; margin-top:5px; }
  .stage { border-top:1px solid var(--rule); padding:26px 0 8px; break-inside:avoid; }
  .stage-h { display:flex; gap:12px; align-items:baseline; flex-wrap:wrap; }
  .stage-n { font-family:var(--sans); font-size:11px; font-weight:700; color:#fff;
             background:var(--teal-text); width:26px; height:26px; border-radius:7px;
             display:inline-flex; align-items:center; justify-content:center; flex:0 0 auto; }
  .stage h2 { font-size:23px; margin:0; letter-spacing:-.01em; text-wrap:balance; }
  .stage-c { font-family:var(--sans); font-size:11.5px; color:var(--mute); margin-left:auto;
             white-space:nowrap; }
  .can { color:var(--mute); font-size:14.5px; margin:8px 0 16px; max-width:64ch; }
  .can b { font-family:var(--sans); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase;
           color:var(--teal-text); display:block; margin-bottom:3px; }
  ol.terms { margin:0; padding:0; list-style:none; columns:280px; column-gap:26px; font-size:14px; }
  ol.terms li { break-inside:avoid; padding:3px 0 3px 34px; position:relative; }
  ol.terms li span { position:absolute; left:0; top:3px; width:28px; text-align:right;
                     font-family:var(--sans); font-size:10.5px; color:var(--mute);
                     font-variant-numeric:tabular-nums; }
  .key { background:var(--paper); border-radius:12px; padding:24px 26px 20px; margin-bottom:36px; }
  .key h2 { font-size:22px; margin:0 0 10px; }
  .key-lead { font-size:14.5px; color:var(--mute); margin:0 0 18px; max-width:66ch; }
  .key table { width:100%; border-collapse:collapse; font-size:14px; }
  .key th { text-align:left; font-family:var(--sans); font-size:10.5px; letter-spacing:.09em;
            text-transform:uppercase; color:var(--mute); padding:0 10px 7px 0;
            border-bottom:1px solid var(--rule); }
  .key td { padding:9px 10px 9px 0; border-bottom:1px solid var(--rule); vertical-align:top; }
  .key .n { text-align:right; font-variant-numeric:tabular-nums; white-space:nowrap; }
  .key .why { color:var(--mute); font-size:13.5px; }
  .key-note { font-size:14.5px; margin:16px 0 0; max-width:70ch; }
  .chip { display:inline-block; font-family:var(--sans); font-size:10.5px; letter-spacing:.06em;
          text-transform:uppercase; padding:3px 9px; border-radius:999px; }
  /* The same four colours mark the terms themselves, so a stage can be read
     at a glance for how much of it a picture can carry. */
  .h-direct   { background:#e4f3ef; color:#0d6b61; }
  .h-frames   { background:#e8eef7; color:#2f4d78; }
  .h-instance { background:#fbf3eb; color:#8c5024; }
  .h-none     { background:#f8e9e8; color:#9c3f3c; }
  ol.terms li.h-frames   { color:#2f4d78; }
  ol.terms li.h-instance { color:#8c5024; }
  ol.terms li.h-none     { color:#9c3f3c; text-decoration:underline; text-decoration-style:dotted;
                           text-underline-offset:3px; }
  .plates { display:grid; gap:16px; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }
  .plate { margin:0; position:relative; }
  .plate svg.af { width:100%; height:auto; display:block; border:1px solid var(--rule);
                  border-radius:7px; }
  .plate-n { position:absolute; top:6px; left:8px; font-family:var(--sans); font-size:9.5px;
             color:var(--mute); font-variant-numeric:tabular-nums; }
  .plate figcaption { font-family:var(--sans); font-size:12px; margin-top:6px; color:var(--ink);
                      line-height:1.35; }
  footer { margin-top:40px; padding:16px 18px; background:var(--paper); border-radius:9px;
           font-size:14px; color:var(--mute); }
  @media print { .stage { break-inside:auto; } ol.terms { columns:2; } }
  @media print { .plates { grid-template-columns:repeat(3,1fr); } }
</style></head><body>
<svg width="0" height="0" aria-hidden="true"><defs><marker id="atip" viewBox="0 0 10 10" refX="9" refY="5"
  markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#16283f"/></marker></defs></svg>
<header class="top">
  <div class="kick">QUBIX UNIVERSITY · CURRICULUM SOURCE</div>
  <h1>${esc(meta.title)}</h1>
  <p>${esc(meta.standfirst)}</p>
  <div class="counts">
    <div><b>${total}</b><span>concepts</span></div>
    <div><b>${stages.length}</b><span>stages</span></div>
    <div><b>${drawableAtAll}</b><span>can be drawn, ${Math.round(drawableAtAll / total * 100)}%</span></div>
    <div><b>${drawn}</b><span>drawn so far</span></div>
  </div>
</header>
<div class="wrap">
<section class="key">
  <h2>How much of this can be drawn?</h2>
  <p class="key-lead">Every concept is classified by what a picture can honestly do for it. The counts
    below are computed from that classification, and the build refuses to run if it names a concept
    the spine does not contain.</p>
  <table>
    <thead><tr><th scope="col">Verdict</th><th scope="col" class="n">Concepts</th><th scope="col" class="n">Share</th><th scope="col">What it means</th></tr></thead>
    <tbody>${LEGEND.map(([k, why]) => `<tr>
      <td><span class="chip h-${k}">${k}</span></td>
      <td class="n">${overall[k]}</td>
      <td class="n">${Math.round(overall[k] / total * 100)}%</td>
      <td class="why">${esc(why)}</td></tr>`).join('')}</tbody>
  </table>
  <p class="key-note"><b>${drawableAtAll} of ${total}</b> concepts can be shown by some picture, and
    <b>${overall.direct}</b> of those are a picture in themselves. The remaining <b>${overall.none}</b> cannot be
    drawn at all, and ${Math.round(tally(stages.at(-1).terms.map(how)).none / overall.none * 100)}% of those
    sit in the last stage — which is the argument for having a last stage.</p>
</section>
${stages.map(st => {
  let i = stages.slice(0, st.n - 1).reduce((n, s) => n + s.terms.length, 0);
  return `<section class="stage">
    <div class="stage-h"><span class="stage-n">${st.n}</span><h2>${esc(st.title)}</h2>
      <span class="stage-c">${st.terms.length} concepts · ${st.terms.length - tally(st.terms.map(how)).none} drawable</span></div>
    <p class="can"><b>By the end</b>${esc(st.can)}</p>
    ${st.terms.some(t => ATLAS[t]) ? `<div class="plates">${st.terms.map(t => {
      const j = ++i;
      return ATLAS[t] ? `<figure class="plate"><div class="plate-n">${j}</div>${figure(t)}
        <figcaption>${esc(t)}</figcaption></figure>` : '';
    }).join('')}</div>` : `<ol class="terms">${st.terms.map(t => `<li class="h-${how(t)}"><span>${++i}</span>${esc(t)}</li>`).join('')}</ol>`}
  </section>`;
}).join('\n')}
<footer>${esc(meta.note)} Every term is listed once: the build refuses to run if two stages claim the same concept.</footer>
</div></body></html>`;

const OUT = join(ROOT, 'book', 'dist');
if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, 'coordinate-spine.html'), html, 'utf8');

console.log(`the coordinate spine
  ${total} concepts across ${stages.length} stages, no duplicates
${stages.map(s => `  ${String(s.n).padStart(2)}. ${s.title.padEnd(44)} ${String(s.terms.length).padStart(3)}`).join('\n')}
  -> book/dist/coordinate-spine.html`);
