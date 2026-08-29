// Draw the app, from the app.
//
// There was no map. Routes are `?param` conditions in App.svelte, missions are a
// roster in progress.js, readings are eight chapter files, and the only way to
// know what a learner can actually reach was to read all three and hold it in
// your head. That is also how a console got built that nothing linked to and an
// assistant got mounted on a page production does not serve.
//
// So this reads the code and emits a page: every route, what serves it, whether
// a learner is meant to find it, and the order the course unlocks in. The flow
// diagram is deterministic SVG computed from the roster, not drawn by hand,
// which is both the media rule in CLAUDE.md and the only way it stays true.
//
//   npm run map        then open docs/site-map.html

import { readFileSync, writeFileSync } from 'node:fs';
import { MISSIONS } from '../src/lib/game/progress.js';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const app = readFileSync(dir('../src/App.svelte'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Trim to a whole word, then mark that it was trimmed. */
const clip = (text, max) => {
  const t = String(text);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return (space > max * 0.55 ? cut.slice(0, space) : cut).replace(/[,:;]$/, '') + '…';
};

/* ── routes, read out of App.svelte ──────────────────────────────────────── */
const ROUTES = [
  { q: '/', what: 'The landing page a visitor meets', view: 'RoleFoundations', who: 'learner' },
  { q: '?mode=game', what: 'The academy: every mission, locked and unlocked', view: 'GameHub', who: 'learner' },
  { q: '?mode=game&mission=shared-book&chapter=N&session=N', what: 'The reader: one session of Volume 0', view: 'SharedFoundationsBook', who: 'learner' },
  { q: '?lab=sql', what: 'The data console: real SQL over 54 tables', view: 'DataConsole', who: 'learner' },
  { q: '?mode=game&mission=store', what: 'The floor plan: missions placed in rooms', view: 'StoreMap', who: 'learner' },
  { q: '?mode=game&mission=campaign', what: 'The data-quality rotation, as a story', view: 'DataQualityCampaign', who: 'learner' },
  { q: '?mode=game&mission=role-game', what: 'Role tracks. Advertised as planned, not built', view: 'RoleGameHub', who: 'learner' },
  { q: '?mode=wiki', what: 'The wiki', view: 'WikiMode', who: 'learner' },
  { q: '?mode=learner', what: 'Learner preview of the change lab', view: 'ChangeLab', who: 'learner' },
  { q: '?mode=review', what: 'The approver. Where curriculum is marked', view: 'ReviewMode', who: 'founder' },
  { q: '?mode=factory', what: 'Authoring factory. Dev builds only', view: 'FactoryMode', who: 'authoring' },
  { q: '?mode=parts', what: 'Cross-board interaction listing', view: 'PartsSheet', who: 'authoring' },
  { q: '?mode=exercises', what: 'Exercise factory', view: 'ExerciseFactory', who: 'authoring' },
  { q: '?mode=assets', what: 'Three.js asset workshop', view: 'AssetShowcase', who: 'authoring' },
  { q: '?mode=strata-factory', what: 'Migration surface for inherited material', view: 'StrataMigrationFactory', who: 'authoring' }
];

for (const r of ROUTES) {
  const key = r.q.replace(/^\?/, '').split('&')[0];
  r.present = r.q === '/' ? true : app.includes(key.split('=')[0]);
}

/* ── the ordered path a learner actually walks ───────────────────────────── */
const chapterTitle = new Map(SHARED_FOUNDATIONS.map(c => [c.chapter, c.book.title]));
const steps = MISSIONS.map((m, i) => ({
  n: i + 1,
  slug: m.slug,
  title: m.mission.title,
  xp: m.xp,
  chapter: m.reading.chapter,
  session: m.reading.session,
  reading: m.reading.label,
  chapterTitle: chapterTitle.get(m.reading.chapter) || ''
}));

/* ── which readings hand you to which mission ────────────────────────────── */
const handoff = [];
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  for (const s of book.sessions) {
    const via = (s.practice.href.match(/mission=([a-z-]+)/) || [])[1];
    handoff.push({
      chapter, number: s.number, title: s.title,
      mission: via || null,
      rehearses: s.rehearsal?.mission || null,
      minutes: s.studyMinutes + s.playMinutes
    });
  }
}
const reached = new Set(handoff.flatMap(h => [h.mission, h.rehearses]).filter(Boolean));
const unreached = MISSIONS.filter(m => !reached.has(m.slug)).map(m => m.slug);

/* ── the flow diagram, computed ──────────────────────────────────────────────
   A column per chapter, a node per mission, drawn in unlock order. Nothing is
   positioned by hand: move a mission in the roster and the diagram moves. */
function diagram() {
  const byChapter = new Map();
  for (const s of steps) {
    if (!byChapter.has(s.chapter)) byChapter.set(s.chapter, []);
    byChapter.get(s.chapter).push(s);
  }
  const chapters = [...byChapter.keys()].sort((a, b) => a - b);

  // Wide enough for a real mission title. Clipping mid-word looked like a bug
  // even when the geometry was right.
  const COL = 208, ROW = 62, PAD = 28, TOP = 74, BOX_W = 182, BOX_H = 44;
  const height = TOP + Math.max(...chapters.map(c => byChapter.get(c).length)) * ROW + PAD;
  const width = PAD * 2 + chapters.length * COL;

  const at = new Map();
  chapters.forEach((c, ci) => {
    byChapter.get(c).forEach((s, ri) => {
      at.set(s.slug, { x: PAD + ci * COL, y: TOP + ri * ROW, ci, ri });
    });
  });

  const parts = [];
  parts.push(`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Mission unlock order by chapter" xmlns="http://www.w3.org/2000/svg">`);
  parts.push('<defs><marker id="a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">'
    + '<path d="M0 0 L8 4 L0 8 z" fill="var(--line-strong)"/></marker></defs>');

  // chapter columns
  chapters.forEach((c, ci) => {
    const x = PAD + ci * COL;
    parts.push(`<rect x="${x - 8}" y="52" width="${BOX_W + 16}" height="${height - 52 - PAD + 8}" rx="8" class="col"/>`);
    parts.push(`<text x="${x}" y="30" class="ch">CHAPTER ${String(c).padStart(2, '0')}</text>`);
    parts.push(`<text x="${x}" y="45" class="cht">${esc(clip(chapterTitle.get(c) || '', 26))}</text>`);
  });

  // arrows in unlock order
  for (let i = 1; i < steps.length; i++) {
    const a = at.get(steps[i - 1].slug), b = at.get(steps[i].slug);
    if (!a || !b) continue;
    if (a.ci === b.ci) {
      parts.push(`<line x1="${a.x + BOX_W / 2}" y1="${a.y + BOX_H}" x2="${b.x + BOX_W / 2}" y2="${b.y - 3}" class="arrow" marker-end="url(#a)"/>`);
    } else {
      const midY = a.y + BOX_H / 2;
      parts.push(`<path d="M ${a.x + BOX_W} ${midY} H ${b.x - 10} V ${b.y + BOX_H / 2 - 3}" class="arrow" marker-end="url(#a)" fill="none"/>`);
    }
  }

  // nodes
  for (const s of steps) {
    const p = at.get(s.slug);
    parts.push(`<g class="node"><rect x="${p.x}" y="${p.y}" width="${BOX_W}" height="${BOX_H}" rx="7"/>`
      + `<text x="${p.x + 9}" y="${p.y + 18}" class="nt">${esc(clip(s.title, 30))}</text>`
      + `<text x="${p.x + 9}" y="${p.y + 33}" class="nm">${s.n}. ${esc(s.slug)} · ${s.xp} XP</text></g>`);
  }

  parts.push('</svg>');
  return parts.join('\n');
}

/* ── page ────────────────────────────────────────────────────────────────── */
const rows = list => list.join('\n');

const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Qubix site map</title>
<style>
  :root {
    --canvas:#F1EDE4; --card:#fff; --ink:#171510; --muted:#6B6152;
    --clay:#A85A34; --clay-text:#8C4C2E; --clay-soft:#F2E4DA;
    --olive-soft:#E7EFDC; --olive-text:#3C6427; --red-soft:#F6E3DF; --red:#B3402E;
    --line:#D8D0BE; --line-soft:#E6DFD0; --line-strong:#A89E8D;
    --sans:"Mulish",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
    --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root { --canvas:#141310; --card:#1C1A15; --ink:#ECE7DC; --muted:#9A9084;
      --clay:#D28A5E; --clay-text:#DDA079; --clay-soft:rgba(210,138,94,.15);
      --olive-soft:rgba(127,184,106,.15); --olive-text:#96C982;
      --red-soft:rgba(224,136,119,.15); --red:#E08877;
      --line:rgba(255,255,255,.14); --line-soft:rgba(255,255,255,.08); --line-strong:#766D5B; }
  }
  *{box-sizing:border-box} body{margin:0;padding:0 1.2rem 4rem;background:var(--canvas);color:var(--ink);
    font:16px/1.6 var(--sans);-webkit-font-smoothing:antialiased}
  .wrap{max-width:64rem;margin:0 auto}
  header{padding:3rem 0 1.6rem;border-bottom:2px solid var(--ink)}
  h1{margin:0 0 .4rem;font-size:2.2rem;font-weight:900;letter-spacing:-.025em}
  h2{margin:0 0 .3rem;font-size:1.35rem;font-weight:800;letter-spacing:-.012em}
  p{margin:0}
  .eyebrow{font:900 .7rem/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay-text);margin-bottom:.5rem}
  .lede{color:var(--muted);max-width:40rem}
  section{padding:2.6rem 0 0}
  .head{display:flex;flex-direction:column;gap:.4rem;padding-bottom:1.1rem}
  .scroll{overflow-x:auto;border:1px solid var(--line);background:var(--card)}
  table{border-collapse:collapse;width:100%;min-width:38rem;font-size:.88rem}
  th,td{text-align:left;padding:.6rem .8rem;vertical-align:top}
  thead th{font:900 .68rem/1 var(--sans);letter-spacing:.09em;text-transform:uppercase;color:var(--muted);
    border-bottom:1.5px solid var(--ink);white-space:nowrap}
  tbody tr+tr td{border-top:1px solid var(--line-soft)}
  code,.mono{font-family:var(--mono);font-size:.85em}
  td code{background:var(--canvas);padding:.1em .35em;border-radius:4px;color:var(--clay-text)}
  .who{display:inline-block;padding:.13rem .45rem;border-radius:3px;font:900 .62rem/1.5 var(--sans);
    letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
  .learner{background:var(--olive-soft);color:var(--olive-text)}
  .founder{background:var(--clay-soft);color:var(--clay-text)}
  .authoring{background:var(--red-soft);color:var(--red)}
  .figure{overflow-x:auto;border:1px solid var(--line);background:var(--card);padding:1rem}
  svg{display:block;min-width:1180px;width:100%;height:auto}
  .col{fill:var(--canvas);stroke:var(--line-soft)}
  .ch{font:900 9px var(--sans);letter-spacing:.1em;fill:var(--clay-text)}
  .cht{font:700 9.5px var(--sans);fill:var(--muted)}
  .node rect{fill:var(--card);stroke:var(--line);stroke-width:1.2}
  .nt{font:800 11px var(--sans);fill:var(--ink)}
  .nm{font:600 8.5px var(--mono);fill:var(--muted)}
  .arrow{stroke:var(--line-strong);stroke-width:1.3;fill:none}
  ol.walk{margin:0;padding-left:1.3rem;display:flex;flex-direction:column;gap:.5rem;font-size:.93rem}
  .note{margin-top:.8rem;font-size:.86rem;color:var(--muted)}
  footer{margin-top:3rem;padding-top:1.2rem;border-top:2px solid var(--ink);font-size:.83rem;color:var(--muted)}
</style></head><body><div class="wrap">

<header>
  <p class="eyebrow">Generated from the code · npm run map</p>
  <h1>Qubix site map</h1>
  <p class="lede">Every route the app serves, the order the course unlocks in, and
  what to click when walking it. Read out of App.svelte, progress.js and the eight
  chapter files, so it cannot describe an app that no longer exists.</p>
</header>

<section>
  <div class="head"><p class="eyebrow">Routes</p><h2>Everything the app serves</h2></div>
  <div class="scroll"><table>
    <thead><tr><th>URL</th><th>Who it is for</th><th>What it is</th><th>View</th></tr></thead>
    <tbody>
${rows(ROUTES.map(r => `      <tr><td><code>${esc(r.q)}</code></td>`
  + `<td><span class="who ${r.who}">${r.who}</span></td>`
  + `<td>${esc(r.what)}</td><td class="mono">${esc(r.view)}</td></tr>`))}
    </tbody>
  </table></div>
  <p class="note">Authoring routes are gated to development builds and are deliberately
  unreachable in production. The approver is reached only by asking for it.</p>
</section>

<section>
  <div class="head"><p class="eyebrow">The learner path</p><h2>${steps.length} missions, in unlock order</h2></div>
  <div class="figure">${diagram()}</div>
  <p class="note">Columns are chapters, arrows are the unlock sequence. Positions are
  computed from the roster: move a mission and the diagram moves with it.</p>
</section>

<section>
  <div class="head"><p class="eyebrow">Reading to mission</p><h2>What hands you to what</h2></div>
  <div class="scroll"><table>
    <thead><tr><th>Session</th><th>Title</th><th>Sends you to</th><th>Rehearses</th><th>Min</th></tr></thead>
    <tbody>
${rows(handoff.map(h => `      <tr><td class="mono">ch${String(h.chapter).padStart(2, '0')}.${h.number}</td>`
  + `<td>${esc(h.title)}</td>`
  + `<td class="mono">${h.mission ? esc(h.mission) : '<span style="color:var(--muted)">library</span>'}</td>`
  + `<td class="mono">${h.rehearses ? esc(h.rehearses) : '<span style="color:var(--muted)">—</span>'}</td>`
  + `<td>${h.minutes}</td></tr>`))}
    </tbody>
  </table></div>
  ${unreached.length ? `<p class="note"><strong>No reading hands you to:</strong> <code>${unreached.map(esc).join('</code>, <code>')}</code>. Reachable from the academy and the floor plan only.</p>` : '<p class="note">Every mission has a reading that hands you to it.</p>'}
</section>

<section>
  <div class="head"><p class="eyebrow">Walking it</p><h2>The order to click, to see everything once</h2></div>
  <ol class="walk">
    <li>Open <code>/</code>. That is the landing production serves. Open <strong>Ask Qubix</strong> bottom right and ask it where to start, how long it takes, and whether it is finished.</li>
    <li>Go to <code>?mode=game</code>. Note which missions are locked: the sequence is enforced, so a fresh browser can only open the first.</li>
    <li>Open <code>?mode=game&amp;mission=store</code> for the floor plan, and find the rooms the new missions sit in.</li>
    <li>Read <code>?mode=game&amp;mission=shared-book&amp;chapter=1&amp;session=1</code> and walk forward. Every session has an Ask Qubix of its own.</li>
    <li>Play the missions in roster order. To reach a later one without playing everything, run this in the browser console first:<br>
      <code>localStorage.setItem('qx.superstore.progress.v1', JSON.stringify({completed:['checkout','classify-data','table-grain','missing-data','units-measurement','uom','rate-desk','duplicate-records','data-lineage','distribution-desk','zone-price','sampling-desk','sql-console','region-grain','join-grain'],xp:0}))</code></li>
    <li>Finish <strong>sql-console</strong> and take the link it offers at the end. That is the only in-course route to the data console.</li>
    <li>In <code>?lab=sql</code>, run the five starter queries, then break one deliberately and check the error is readable.</li>
    <li>Come back through each of the three links in the console header and confirm they land where they say.</li>
  </ol>
  <p class="note">Watch for the things guards cannot see: prose that reads badly, a
  step that is obvious in the code and confusing on screen, and any moment where you
  do not know what to do next.</p>
</section>

<footer>
  <p>Generated ${new Date().toISOString().slice(0, 10)} by <code>scripts/build-site-map.mjs</code> from
  ${ROUTES.length} routes, ${steps.length} missions and ${handoff.length} reading sessions.
  Regenerate with <code>npm run map</code>. Nothing here is approved curriculum.</p>
</footer>

</div></body></html>`;

writeFileSync(dir('../docs/site-map.html'), html);
console.log(`\n  docs/site-map.html`);
console.log(`   ${ROUTES.length} routes · ${steps.length} missions · ${handoff.length} sessions`);
console.log(unreached.length
  ? `   no reading hands you to: ${unreached.join(', ')}\n`
  : '   every mission has a reading that hands you to it\n');
