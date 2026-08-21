// Puts the library on qubix.university.
//
// The generated pages are self-contained so they can travel as single files.
// The site cannot serve them that way: its Content-Security-Policy is
// script-src 'self', which blocks inline script, and weakening that policy to
// ship two documents would be a bad trade. So this step lifts each page's
// inline runtime into a sibling .js file and points the page at it. Same
// bytes, same behaviour, and the policy stays as strict as it was.
//
// Everything lands in public/, which Vite copies verbatim into the deploy.
//
//   node scripts/publish-library.mjs        # after build:book and build:spine

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'book', 'dist');
const OUT = join(ROOT, 'public', 'library');

// What the library holds, and how each piece is named on the site.
const SHELF = [
  { file: 'preintern-001-what-data-is.html', slug: 'what-data-is',
    title: 'What Data Is and Why People Use It',
    sub: 'Pre-Intern 001 · Data Foundations',
    blurb: 'Start from zero. Follow a Superstore sale from a real-world event to a recorded fact, an organised table and a decision. Twenty practice questions, all explained.' },
  { file: 'preintern-002-what-a-program-does.html', slug: 'what-a-program-does',
    title: 'What a Computer Program Does',
    sub: 'Pre-Intern 002 · Digital Foundations',
    blurb: 'See a program as precise stored instructions: input enters, steps transform it, and output or an action follows. Superstore examples, four worked cases and twenty explained questions.' },
  { file: 'book1-functions.html', slug: 'functions',
    title: 'Calculus From The Ground Up',
    sub: 'Book 1: Functions',
    blurb: 'Fourteen chapters from what a function is to the Fundamental Theorem. Every practice item answered, every answer drawn, every figure computed from the formula beside it.' },
  { file: 'coordinate-spine.html', slug: 'big-sheet-of-graphs',
    title: 'The Big Sheet of Graphs',
    sub: 'Every idea, drawn',
    blurb: 'The whole of mathematics that can be reached from the origin, as one sheet: 681 concepts in thirteen stages, each classified by what a picture can honestly do for it.' }
];

if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stats = [];

for (const item of SHELF) {
  const from = join(SRC, item.file);
  if (!existsSync(from)) throw new Error(`${item.file} has not been built. Run build:book and build:spine first.`);
  let html = await readFile(from, 'utf8');

  // Lift every inline <script> into one sibling file, in document order.
  const parts = [];
  html = html.replace(/<script>([\s\S]*?)<\/script>/g, (_, body) => { parts.push(body.trim()); return ''; });
  if (parts.length) {
    const js = `/* Runtime for ${item.title}. Lifted out of the page so the site's\n`
      + `   Content-Security-Policy can stay at script-src 'self'. */\n` + parts.join('\n\n');
    await writeFile(join(OUT, `${item.slug}.js`), js, 'utf8');
    html = html.replace('</body>', `<script src="./${item.slug}.js" defer></script>\n</body>`);
  }

  await writeFile(join(OUT, `${item.slug}.html`), html, 'utf8');
  stats.push({ ...item, kb: Math.round(html.length / 1024), js: parts.length });
}

/* A shelf page, so /library is a place rather than two loose URLs. */
const index = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Qubix Library</title>
<style>
  :root { --ink:#16283f; --teal:#12897c; --teal-text:#10796e; --paper:#faf7f0; --rule:#d8d3c7;
          --mute:#5d6b7d; --edge:#918d85;
          --serif:Georgia,"Iowan Old Style","Palatino Linotype",Palatino,serif;
          --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; }
  * { box-sizing:border-box; }
  body { margin:0; background:#fff; color:var(--ink); font:16px/1.65 var(--serif); }
  a.skip { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); }
  a.skip:focus { position:fixed; left:0; top:0; width:auto; height:auto; clip:auto; z-index:9;
                 background:var(--ink); color:#fff; padding:10px 16px; font-family:var(--sans); }
  header { background:var(--ink); color:#fff; padding:60px 44px 52px; border-radius:0 0 20px 20px;
           max-width:1080px; margin:0 auto 44px; }
  header .kick { color:#7fd3c6; font-family:var(--sans); font-size:11px; letter-spacing:.16em; font-weight:700; }
  header h1 { font-size:clamp(32px,5vw,46px); line-height:1.04; margin:14px 0 16px; letter-spacing:-.022em; }
  header p { color:#c2cedd; max-width:52ch; margin:0; font-size:15px; }
  main { max-width:56rem; margin:0 auto; padding:0 22px 90px; }
  .shelf { display:grid; gap:20px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); }
  .vol { border:1px solid var(--rule); border-radius:12px; padding:22px 24px 20px; background:var(--paper);
         display:flex; flex-direction:column; gap:9px; }
  .vol h2 { font-size:22px; margin:0; letter-spacing:-.015em; text-wrap:balance; }
  .vol .sub { font-family:var(--sans); font-size:12px; letter-spacing:.05em; text-transform:uppercase;
              color:var(--teal-text); }
  .vol p { margin:0; font-size:14.5px; color:#33445c; }
  .vol a { margin-top:6px; align-self:flex-start; font-family:var(--sans); font-size:13px; font-weight:600;
           text-decoration:none; color:#fff; background:var(--teal-text); padding:9px 16px; border-radius:7px;
           min-height:24px; }
  .vol a:hover { background:var(--ink); }
  .vol a:focus-visible { outline:2px solid var(--ink); outline-offset:2px; }
  .note { margin-top:34px; font-size:14px; color:var(--mute); border-top:1px solid var(--rule); padding-top:18px; }
  .note a { color:var(--teal-text); }
</style></head><body>
<a class="skip" href="#shelf">Skip to the library</a>
<header>
  <div class="kick">QUBIX UNIVERSITY</div>
  <h1>The Library</h1>
  <p>Source-first ebooks and reference sheets, generated from reviewable files and rebuilt on every release. Data foundations begin with plain language and synthetic Superstore evidence; technical figures are computed from their own data.</p>
</header>
<main>
  <div class="shelf" id="shelf">
    ${stats.map(v => `<article class="vol">
      <div class="sub">${esc(v.sub)}</div>
      <h2>${esc(v.title)}</h2>
      <p>${esc(v.blurb)}</p>
      <a href="./${v.slug}.html">Open</a>
    </article>`).join('')}
  </div>
  <!-- Absolute, because the library is served from two places: the site itself,
       and a Pages mirror on a different host where "/" is not Qubix. -->
  <p class="note">Both open as ordinary web pages and print to PDF from any browser.
    <a href="https://qubix.university/">Back to Qubix</a></p>
</main>
</body></html>`;
await writeFile(join(OUT, 'index.html'), index, 'utf8');

console.log('library published to public/library');
for (const v of stats) console.log(`  /library/${v.slug}.html`.padEnd(38) + `${v.kb} kB` + (v.js ? `  + ${v.slug}.js` : '  (no script)'));
console.log('  /library/'.padEnd(38) + 'shelf page');
console.log(`\n  ${(await readdir(OUT)).length} files. Vite copies public/ verbatim, so these ship with the next deploy.`);
