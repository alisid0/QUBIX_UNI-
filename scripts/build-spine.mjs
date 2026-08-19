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
  footer { margin-top:40px; padding:16px 18px; background:var(--paper); border-radius:9px;
           font-size:14px; color:var(--mute); }
  @media print { .stage { break-inside:auto; } ol.terms { columns:2; } }
</style></head><body>
<header class="top">
  <div class="kick">QUBIX UNIVERSITY · CURRICULUM SOURCE</div>
  <h1>${esc(meta.title)}</h1>
  <p>${esc(meta.standfirst)}</p>
  <div class="counts">
    <div><b>${total}</b><span>concepts</span></div>
    <div><b>${stages.length}</b><span>stages</span></div>
    <div><b>${stages[0].terms.length}</b><span>before a curve appears</span></div>
    <div><b>${stages.at(-1).terms.length}</b><span>for saying where it fails</span></div>
  </div>
</header>
<div class="wrap">
${stages.map(st => {
  let i = stages.slice(0, st.n - 1).reduce((n, s) => n + s.terms.length, 0);
  return `<section class="stage">
    <div class="stage-h"><span class="stage-n">${st.n}</span><h2>${esc(st.title)}</h2>
      <span class="stage-c">${st.terms.length} concepts</span></div>
    <p class="can"><b>By the end</b>${esc(st.can)}</p>
    <ol class="terms">${st.terms.map(t => `<li><span>${++i}</span>${esc(t)}</li>`).join('')}</ol>
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
