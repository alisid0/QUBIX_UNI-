// The whole manuscript, on paper, for a founder read.
//
// Every word of learner-facing content that exists today, in reading order,
// with the apparatus around it made visible: the figures it calls for, the
// tables, the rehearsals, the checks and their answers, the missions, the audio
// summaries, the sources. Nothing summarised and nothing omitted.
//
// Two things are printed beside the content that are not part of it. Each
// session carries its Phase One fate, so a read is also a review of the
// rebuild. And every block carries a citation code, so a note can name exactly
// what it is about: "1.03 §2" is a paragraph, not a vague complaint.
//
//   node scripts/build-draft-book.mjs            → HTML and PDF into Downloads
//   node scripts/build-draft-book.mjs --html     → HTML only, no browser

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { homedir } from 'node:os';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { PHASE_ONE, LEAVES_PHASE_ONE } from '../src/lib/content/phase-one.js';

const OUT_DIR = join(homedir(), 'Downloads');
const NAME = 'qubix-draft-book';

/* ── helpers ─────────────────────────────────────────────────────────────── */

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const code = (c, s) => `${c}.${String(s).padStart(2, '0')}`;

/** Figures and images are real files. Inline them so the PDF is self-contained. */
const dataUri = src => {
  const path = join(process.cwd(), 'public', src.replace(/^\//, ''));
  if (!existsSync(path)) return null;
  const type = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' }[extname(path).toLowerCase()];
  if (!type) return null;
  return `data:${type};base64,${readFileSync(path).toString('base64')}`;
};

/** What happens to this live session under Phase One. */
const fateOf = (chapter, session) => {
  const carried = PHASE_ONE.find(s => s.from && s.from.chapter === chapter && s.from.session === session);
  if (carried) return { kind: 'carried', label: `becomes ${carried.id}`, detail: carried.title, claim: carried.claim };
  const left = LEAVES_PHASE_ONE.find(x => x.chapter === chapter && x.session === session);
  if (left) return { kind: 'leaving', label: 'retiring', detail: left.why };
  return { kind: 'unknown', label: 'unaccounted', detail: 'Not named in phase-one.js. This is a bug in the sequence, not in the content.' };
};

/* ── blocks ──────────────────────────────────────────────────────────────── */

const block = (ref, kind, title, body) => `
<section class="block ${kind}">
  <div class="tag"><span class="ref">${esc(ref)}</span><span class="kind">${esc(kind.replace(/-/g, ' '))}</span></div>
  ${title ? `<h4>${esc(title)}</h4>` : ''}
  ${body}
</section>`;

const paras = list => (list || []).map(p => `<p>${esc(p)}</p>`).join('\n');

const table = (headers, rows) => `
<div class="scroll"><table>
  <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
</table></div>`;

const figureBlock = (ref, fig, i, total) => {
  const label = total > 1 ? `${ref} fig${i + 1}` : `${ref} fig`;
  return block(label, 'figure', fig.caption, `
    <p class="mono-note">renders live as a deterministic <strong>${esc(fig.kind)}</strong> drawing, not a raster image</p>
    ${fig.note ? `<p>${esc(fig.note)}</p>` : ''}`);
};

const checkBlock = (ref, check) => {
  const opts = (check.options || []).map(o => {
    const [id, text] = Array.isArray(o) ? o : [o, o];
    const right = id === check.answer;
    return `<li class="${right ? 'right' : ''}"><span class="opt-id">${esc(id)}</span>${esc(text)}${right ? '<span class="mark">correct</span>' : ''}</li>`;
  }).join('\n');
  return block(`${ref} check`, 'check', null, `
    <p class="prompt">${esc(check.prompt)}</p>
    <ul class="options">${opts}</ul>
    ${check.explanation ? `<p class="why"><strong>Why.</strong> ${esc(check.explanation)}</p>` : ''}`);
};

const rehearsalBlock = (ref, r) => {
  const cases = (r.cases || []).map((c, i) => `
    <div class="case">
      <h5>case ${i + 1} · ${esc(c.caseId || '')}</h5>
      ${c.facts ? table(['', ''], c.facts) : ''}
      ${c.question ? `<p class="prompt">${esc(c.question)}</p>` : ''}
      ${c.answer ? `<p class="answer"><strong>Answer.</strong> ${esc(c.answer)}</p>` : ''}
      ${c.why ? `<p class="why"><strong>Why.</strong> ${esc(c.why)}</p>` : ''}
    </div>`).join('\n');
  return block(`${ref} rehearsal`, 'rehearsal', r.mission ? `mission: ${r.mission}` : null, `
    ${r.lead ? `<p>${esc(r.lead)}</p>` : ''}${cases}`);
};

const exerciseBlock = (ref, e) => {
  const opts = (e.options || []).map(o => {
    const [id, text] = Array.isArray(o) ? o : [o, o];
    return `<li><span class="opt-id">${esc(id)}</span>${esc(text)}</li>`;
  }).join('');
  const items = (e.items || []).map(it => `
    <div class="case">
      <p class="prompt">${esc(it.prompt)}</p>
      <p class="answer"><strong>Answer.</strong> ${esc(it.answer)}</p>
      ${it.why ? `<p class="why"><strong>Why.</strong> ${esc(it.why)}</p>` : ''}
    </div>`).join('');
  return block(`${ref} exercise`, 'exercise', e.title, `
    <p class="mono-note">${esc(e.type || '')}${e.minutes ? ` · ${e.minutes} min` : ''}</p>
    ${e.instruction ? `<p>${esc(e.instruction)}</p>` : ''}
    ${opts ? `<ul class="options">${opts}</ul>` : ''}${items}`);
};

const labBlock = (ref, lab) => block(`${ref} lab`, 'workshop', lab.title, `
  <p class="mono-note">interaction: ${esc(lab.kind || 'select')}</p>
  ${lab.mapping ? table(['In the workshop', 'In the data'], lab.mapping) : ''}
  ${paras(lab.paragraphs)}`);

/* ── a session ───────────────────────────────────────────────────────────── */

const renderSession = (chapter, session, index) => {
  const ref = code(chapter, index + 1);
  const fate = fateOf(chapter, index + 1);
  const parts = [];

  if (session.objective) parts.push(block(`${ref} obj`, 'objective', null, `<p>${esc(session.objective)}</p>`));
  if (session.opening) parts.push(`<p class="opening">${esc(session.opening)}</p>`);

  (session.sections || []).forEach((sec, i) => {
    const images = (sec.images || []).map(img => {
      const uri = dataUri(img.src);
      return `<figure class="shot">
        ${uri ? `<img src="${uri}" alt="${esc(img.alt)}">` : `<div class="missing">image not found: ${esc(img.src)}</div>`}
        ${img.caption ? `<figcaption>${esc(img.caption)}</figcaption>` : ''}
      </figure>`;
    }).join('\n');
    parts.push(`<div class="sec">
      <h3><span class="ref">${ref} §${i + 1}</span>${esc(sec.heading)}</h3>
      ${paras(sec.paragraphs)}${images}
    </div>`);
  });

  const figs = session.figures || (session.figure ? [session.figure] : []);
  figs.forEach((f, i) => parts.push(figureBlock(ref, f, i, figs.length)));

  if (session.example) parts.push(block(`${ref} table`, 'example', session.example.title, table(session.example.headers, session.example.rows)));
  if (session.workbook) parts.push(block(`${ref} workbook`, 'workbook', session.workbook.title, `
    ${session.workbook.prompt ? `<p>${esc(session.workbook.prompt)}</p>` : ''}
    <ol class="steps">${(session.workbook.steps || []).map(s => `<li>${esc(s)}</li>`).join('')}</ol>`));
  if (session.workshopLab) parts.push(labBlock(ref, session.workshopLab));
  if (session.rehearsal) parts.push(rehearsalBlock(ref, session.rehearsal));
  if (session.check) parts.push(checkBlock(ref, session.check));
  if (session.exercise) parts.push(exerciseBlock(ref, session.exercise));
  if (session.missionBriefing) parts.push(block(`${ref} briefing`, 'briefing', session.missionBriefing.title, paras(session.missionBriefing.paragraphs)));
  if (session.practice) parts.push(block(`${ref} mission`, 'mission', session.practice.title, `
    <p>${esc(session.practice.instruction)}</p>
    <p class="mono-note">${esc(session.practice.href)}</p>`));
  if (session.audioSummary) parts.push(block(`${ref} audio`, 'audio-summary', null, `<p>${esc(session.audioSummary)}</p>`));

  const foot = [];
  if (session.keywords?.length) foot.push(`<p class="foot"><strong>Keywords.</strong> ${session.keywords.map(esc).join(' · ')}</p>`);
  if (session.sources?.length) foot.push(`<p class="foot"><strong>Sources.</strong> ${session.sources.map(s => esc(s.label)).join(' · ')}</p>`);

  return `<article class="session" id="s-${ref}">
    <header class="session-head">
      <div class="num">${ref}</div>
      <div class="head-main">
        <h2>${esc(session.title)}</h2>
        <p class="meta">${session.studyMinutes} min reading · ${session.playMinutes} min doing</p>
      </div>
      <div class="fate ${fate.kind}">
        <span class="fate-label">${esc(fate.label)}</span>
        <span class="fate-detail">${esc(fate.detail)}</span>
      </div>
    </header>
    ${fate.claim ? `<p class="claim">The claim it must earn after the rewrite: <em>${esc(fate.claim)}</em></p>` : ''}
    ${parts.join('\n')}
    ${foot.join('\n')}
  </article>`;
};

/* ── the book ────────────────────────────────────────────────────────────── */

const sessions = SHARED_FOUNDATIONS.flatMap(c => c.book.sessions);
const totalMinutes = sessions.reduce((n, s) => n + s.studyMinutes + s.playMinutes, 0);
const words = JSON.stringify(SHARED_FOUNDATIONS).split(/\s+/).length;

const contents = SHARED_FOUNDATIONS.map(({ chapter, book }) => `
  <div class="toc-chapter">
    <h3>${chapter} · ${esc(book.title)}</h3>
    ${book.sessions.map((s, i) => {
      const f = fateOf(chapter, i + 1);
      return `<div class="toc-row">
        <span class="ref">${code(chapter, i + 1)}</span>
        <span class="toc-title">${esc(s.title)}</span>
        <span class="toc-min">${s.studyMinutes + s.playMinutes}m</span>
        <span class="toc-fate ${f.kind}">${esc(f.label)}</span>
      </div>`;
    }).join('')}
  </div>`).join('');

const body = SHARED_FOUNDATIONS.map(({ chapter, book }) => `
  <div class="chapter">
    <div class="chapter-open">
      <p class="chapter-eyebrow">Chapter ${chapter}</p>
      <h1>${esc(book.title)}</h1>
      ${book.subtitle ? `<p class="chapter-sub">${esc(book.subtitle)}</p>` : ''}
      <p class="chapter-meta">${book.sessions.length} sessions · ${book.totalMinutes} minutes · status ${esc(book.status || 'draft')}</p>
    </div>
    ${book.sessions.map((s, i) => renderSession(chapter, s, i)).join('\n')}
  </div>`).join('');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Qubix · The draft, entire</title>
<style>
:root{
  --ink:#171510; --canvas:#F1EDE4; --clay:#A85A34; --green:#3E9E2A; --red:#B3402E;
  --rule:rgba(23,21,16,.14); --faint:rgba(23,21,16,.055); --soft:rgba(23,21,16,.58);
  --serif:Georgia,"Iowan Old Style","Palatino Linotype",Palatino,serif;
  --sans:"Segoe UI",Inter,system-ui,-apple-system,sans-serif;
  --mono:"Cascadia Mono",Consolas,"SF Mono",monospace;
}
@page{ size:A4; margin:17mm 16mm 15mm; }
*{box-sizing:border-box}
body{margin:0;background:var(--canvas);color:var(--ink);font:13.4px/1.66 var(--serif);
  -webkit-print-color-adjust:exact;print-color-adjust:exact}
p{margin:0 0 .72em}
h1,h2,h3,h4,h5{margin:0;font-weight:600;text-wrap:balance}
em{font-style:italic}
.ref{font:600 10px/1 var(--mono);color:var(--clay);letter-spacing:.04em;white-space:nowrap}

/* ── cover ─────────────────────────────────────────────── */
.cover{height:238mm;display:flex;flex-direction:column;justify-content:space-between;page-break-after:always}
.cover h1{font-size:44px;line-height:1.04;letter-spacing:-.018em;max-width:12ch}
.cover .lede{font-size:15px;max-width:44ch;color:var(--soft);margin-top:1.2em}
.cover-rule{height:3px;background:var(--clay);width:70px;margin:0 0 26px}
.cover-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;border-top:1px solid var(--rule);padding-top:14px}
.cover-stats div{font:var(--sans)}
.cover-stats .n{display:block;font:600 26px/1 var(--sans);letter-spacing:-.02em}
.cover-stats .l{font:400 9.5px/1.4 var(--sans);color:var(--soft);text-transform:uppercase;letter-spacing:.09em}
.stamp{font:600 10px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--clay)}

/* ── front matter ──────────────────────────────────────── */
.front{page-break-after:always;padding-top:4mm}
.front h2{font:600 21px/1.2 var(--sans);letter-spacing:-.01em;margin-bottom:.7em}
.front h3{font:600 11px/1.3 var(--sans);text-transform:uppercase;letter-spacing:.1em;color:var(--clay);margin:1.9em 0 .6em}
.front p{max-width:62ch}
.how{border-left:2px solid var(--clay);padding:2px 0 2px 14px;margin:1em 0}
.how code{font:600 11px/1.5 var(--mono);color:var(--clay)}

/* ── contents ──────────────────────────────────────────── */
.toc-chapter{margin-bottom:1.25em;break-inside:avoid}
.toc-chapter h3{font:600 12.5px/1.3 var(--sans);color:var(--ink);text-transform:none;letter-spacing:0;
  border-bottom:1px solid var(--rule);padding-bottom:4px;margin:0 0 5px}
.toc-row{display:grid;grid-template-columns:44px 1fr 38px 104px;gap:9px;align-items:baseline;
  font:11.6px/1.8 var(--sans);border-bottom:1px solid var(--faint)}
.toc-min{text-align:right;color:var(--soft);font-variant-numeric:tabular-nums}
.toc-fate{font:600 9.5px/1.8 var(--sans);text-align:right;letter-spacing:.03em}
.toc-fate.carried{color:var(--green)} .toc-fate.leaving{color:var(--red)} .toc-fate.unknown{color:var(--clay)}

/* ── chapters ──────────────────────────────────────────── */
.chapter-open{page-break-before:always;padding:22mm 0 9mm;border-bottom:2px solid var(--ink);margin-bottom:9mm}
.chapter-eyebrow{font:600 10px/1 var(--sans);text-transform:uppercase;letter-spacing:.16em;color:var(--clay);margin-bottom:12px}
.chapter-open h1{font-size:31px;line-height:1.1;letter-spacing:-.015em;max-width:20ch}
.chapter-sub{margin-top:.5em;font-size:13.5px;color:var(--soft);max-width:52ch}
.chapter-meta{margin:1em 0 0;font:11px/1 var(--sans);color:var(--soft)}

/* ── session ───────────────────────────────────────────── */
.session{page-break-before:always;padding-bottom:6mm}
.session-head{display:grid;grid-template-columns:52px 1fr 128px;gap:12px;align-items:start;
  border-bottom:1px solid var(--rule);padding-bottom:9px;margin-bottom:14px}
.num{font:600 20px/1.05 var(--mono);color:var(--clay);letter-spacing:-.02em}
.session-head h2{font-size:19px;line-height:1.2;letter-spacing:-.012em}
.meta{margin:5px 0 0;font:11px/1 var(--sans);color:var(--soft)}
.fate{text-align:right;padding-left:10px;border-left:1px solid var(--rule)}
.fate-label{display:block;font:600 10px/1.3 var(--sans);text-transform:uppercase;letter-spacing:.07em}
.fate-detail{display:block;font:10.6px/1.4 var(--sans);color:var(--soft);margin-top:3px}
.fate.carried .fate-label{color:var(--green)}
.fate.leaving .fate-label{color:var(--red)}
.fate.unknown .fate-label{color:var(--clay)}
.claim{font-size:12.2px;color:var(--soft);border-left:2px solid var(--green);padding-left:11px;margin-bottom:1.3em}

.opening{font-size:15.5px;line-height:1.55;max-width:52ch;margin-bottom:1.5em}
.sec{margin:0 0 1.5em;max-width:64ch}
.sec h3{font-size:15px;line-height:1.3;margin-bottom:.55em;display:flex;gap:9px;align-items:baseline}
.sec p{max-width:62ch}

/* ── apparatus ─────────────────────────────────────────── */
.block{border-left:2px solid var(--rule);padding:1px 0 1px 13px;margin:0 0 1.25em;break-inside:avoid;max-width:64ch}
.block h4{font:600 12.8px/1.35 var(--sans);margin-bottom:.5em}
.block p{font-size:12.2px;max-width:60ch}
.tag{display:flex;gap:9px;align-items:baseline;margin-bottom:5px}
.kind{font:600 9.5px/1 var(--sans);text-transform:uppercase;letter-spacing:.13em;color:var(--soft)}
.block.check,.block.exercise{border-left-color:var(--clay)}
.block.figure,.block.workshop{border-left-color:var(--ink)}
.block.mission,.block.briefing{border-left-color:var(--green)}
.block.objective p{font:600 12.4px/1.5 var(--sans)}
.block.audio-summary p{font-style:italic;color:var(--soft)}
.mono-note{font:10.2px/1.5 var(--mono)!important;color:var(--soft)}
.prompt{font-weight:600}
.why,.answer{font-size:11.6px!important;color:var(--soft)}
.steps{margin:.4em 0 0;padding-left:1.15em;font-size:12.2px}
.steps li{margin-bottom:.28em}
.options{list-style:none;margin:.5em 0;padding:0;font:12px/1.55 var(--sans)}
.options li{padding:3px 0 3px 0;border-bottom:1px solid var(--faint);display:flex;gap:9px;align-items:baseline}
.options li.right{color:var(--green);font-weight:600}
.opt-id{font:600 10px/1.6 var(--mono);color:var(--soft);min-width:74px}
.options li.right .opt-id{color:var(--green)}
.mark{margin-left:auto;font:600 9.5px/1.6 var(--sans);text-transform:uppercase;letter-spacing:.1em}
.case{margin:.75em 0;padding-left:11px;border-left:1px solid var(--faint)}
.case h5{font:600 10px/1.4 var(--mono);color:var(--clay);margin-bottom:.4em}
.scroll{overflow-x:auto}
table{border-collapse:collapse;width:100%;font:11.6px/1.5 var(--sans);margin:.45em 0}
th{text-align:left;font-weight:600;border-bottom:1.5px solid var(--ink);padding:4px 9px 4px 0;font-size:10px;
  text-transform:uppercase;letter-spacing:.07em}
td{border-bottom:1px solid var(--faint);padding:4px 9px 4px 0;vertical-align:top}
td:first-child{font-weight:600}
.shot{margin:1.1em 0;max-width:330px}
.shot img{width:100%;display:block;border:1px solid var(--rule)}
.shot figcaption{font:11px/1.45 var(--sans);color:var(--soft);margin-top:5px}
.missing{font:10px/1.5 var(--mono);color:var(--red);border:1px dashed var(--red);padding:9px}
.foot{font:10.6px/1.5 var(--sans);color:var(--soft);margin-top:1.1em}
</style></head>
<body>

<div class="cover">
  <div>
    <p class="stamp">Qubix · internal draft · not approved</p>
  </div>
  <div>
    <div class="cover-rule"></div>
    <h1>The draft, entire</h1>
    <p class="lede">Every word of learner-facing content that exists today, in reading order, with the
    apparatus around it made visible. Nothing summarised. Nothing left out.</p>
  </div>
  <div class="cover-stats">
    <div><span class="n">${SHARED_FOUNDATIONS.length}</span><span class="l">chapters</span></div>
    <div><span class="n">${sessions.length}</span><span class="l">sessions</span></div>
    <div><span class="n">${Math.round(totalMinutes / 60 * 10) / 10}h</span><span class="l">as written</span></div>
    <div><span class="n">${(words / 1000).toFixed(1)}k</span><span class="l">words</span></div>
  </div>
</div>

<div class="front">
  <h2>How to read this, and how to send notes back</h2>
  <p>This is the manuscript as it stands, not as it is meant to end up. It was written
  before the Phase One sequence existed, so most of it is right about its subject and wrong
  about its length: sessions run five to seven minutes of reading where the new design asks
  for twenty-five, and each one carries several ideas where the new design asks for one.</p>

  <h3>Every block has an address</h3>
  <p>So a note can name what it is about rather than describe it. The address is printed in
  clay to the left of each block.</p>
  <div class="how">
    <p><code>1.03</code> the whole session &nbsp;·&nbsp; <code>1.03 §2</code> its second section &nbsp;·&nbsp;
    <code>1.03 check</code> its question &nbsp;·&nbsp; <code>1.03 fig</code> its figure</p>
  </div>
  <p>Sending back <em>"1.03 §2, the grain sentence is doing two jobs"</em> is enough for me to find it
  exactly. Three useful things to say about any block: what the concept actually is, what the
  text is trying to say, and whether those two are the same thing.</p>

  <h3>The right-hand column is the rebuild, not the content</h3>
  <p>Each session says what becomes of it under Phase One: <span class="toc-fate carried">becomes 3.1</span>
  means it is carried forward and rewritten, <span class="toc-fate leaving">retiring</span> means it leaves
  the course and why. Where a session is carried forward, the claim printed under the heading is
  what the rewrite must earn. The current text usually does not earn it yet. That gap is the work.</p>

  <h3>What is on the page and what is not</h3>
  <p>Figures are named and described but not drawn: they render live as deterministic SVG or canvas,
  never as pictures, so a printed copy would misrepresent them. Photographs and comic frames are
  printed, because those are real files. Missions are described by their briefing and instruction;
  the mission itself is software and has to be played to be judged.</p>

  <h3>Checks show their answers</h3>
  <p>Every multiple-choice answer is marked in green with its explanation, because you are reviewing
  the teaching and not sitting the test.</p>
</div>

<div class="front">
  <h2>Contents</h2>
  <p style="margin-bottom:1.6em">${sessions.length} sessions · ${totalMinutes} minutes as currently written ·
  ${PHASE_ONE.filter(s => s.from).length} carried into Phase One · ${LEAVES_PHASE_ONE.length} retiring</p>
  ${contents}
</div>

${body}
</body></html>`;

const htmlPath = join(OUT_DIR, `${NAME}.html`);
writeFileSync(htmlPath, html);
console.log(`  html  ${htmlPath}  (${(html.length / 1024).toFixed(0)} KB)`);

if (process.argv.includes('--html')) process.exit(0);

const { chromium } = await import('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
const pdfPath = join(OUT_DIR, `${NAME}.pdf`);
await page.pdf({
  path: pdfPath, format: 'A4', printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: `<div style="width:100%;font:8.5px 'Segoe UI',sans-serif;color:#171510;opacity:.5;
    padding:0 16mm;display:flex;justify-content:space-between">
    <span>Qubix · the draft, entire · internal, not approved</span>
    <span class="pageNumber"></span></div>`,
  margin: { top: '17mm', bottom: '15mm', left: '16mm', right: '16mm' }
});
await browser.close();

const { statSync } = await import('node:fs');
console.log(`  pdf   ${pdfPath}  (${(statSync(pdfPath).size / 1024 / 1024).toFixed(1)} MB)`);
console.log(`\n  ${sessions.length} sessions, ${totalMinutes} minutes as written, ${(words / 1000).toFixed(1)}k words`);
