// Measure the whole project and write the status page.
//
// Why this is generated: there are more planning documents in this repo than
// source files, and they disagree with each other. One said the library held
// two volumes while the shelf served four. A written status is out of date the
// day after it is written, so this one is counted from the repo every time,
// the same way every figure in the books is computed rather than drawn.
//
// It reports what is built, what is approved, and what is actually reachable,
// because those are three different numbers and only the third is a product.
//
//   npm run state          measure and write
//   npm run state -- --live   also ask the two live URLs what they serve

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const url = p => `file://${join(ROOT, p).replace(/\\/g, '/')}`;
const sh = c => { try { return execSync(c, { cwd: ROOT, encoding: 'utf8' }).trim(); } catch { return ''; } };
const count = c => Number(sh(c) || 0);
const LIVE = process.argv.includes('--live');

/* ------------------------------------------------------------ the sheet -- */
const { stages } = await import(url('book/spine/index.js'));
const { EXPLAIN } = await import(url('book/spine/explain.js'));
const atlases = await Promise.all(['atlas-1-2', 'atlas-3-5', 'atlas-6-8', 'atlas-9-10']
  .map(f => import(url(`book/spine/${f}.js`))));
const ATLAS = Object.assign({}, ...atlases.map(m => Object.values(m)[0]));

const spine = stages.map(s => {
  const drawn = s.terms.filter(t => ATLAS[t]);
  const explained = s.terms.filter(t => EXPLAIN[t]);
  const frames = explained.reduce((n, t) => n + (EXPLAIN[t].frames?.length || 0), 0);
  return { n: s.n, title: s.title, terms: s.terms.length, drawn: drawn.length, explained: explained.length, frames };
});
const sum = k => spine.reduce((a, r) => a + r[k], 0);

/* ------------------------------------------------------------- the books -- */
const books = readdirSync(join(ROOT, 'book'), { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'dist' && d.name !== 'spine')
  .map(d => {
    const files = readdirSync(join(ROOT, 'book', d.name));
    const chapters = files.filter(f => /^ch\d+/.test(f)).length;
    return { name: d.name, chapters: chapters || 1 };
  });

/* ----------------------------------------------------- the data-science -- */
const { superstoreTopics, superstoreTopicCount } = await import(url('src/factory/superstore-topics.js'));
const missions = readdirSync(join(ROOT, 'src/lib/game')).filter(f => f.endsWith('.js'));
const { THREE_ASSET_REGISTRY } = await import(url('src/lib/three/assets/index.js'));

/* -------------------------------------------------------- the review gate -- */
// Counted by reading the files, not by shelling out. The first version of this
// used `git grep` with a bracket pattern, which is a regex, so "- [x]" matched
// "- x" and found nothing; and `-c` returns "file:count", which parses as NaN.
// It then reported its own source as the only approval in the repo.
const boards = sh('git ls-files "curriculum/**/*.md" "docs/**/*.md" "*.md"').split('\n').filter(Boolean);
const tally = needle => boards.reduce((n, f) => {
  const body = existsSync(join(ROOT, f)) ? readFileSync(join(ROOT, f), 'utf8') : '';
  return n + body.split(needle).length - 1;
}, 0);
const approved = tally('- [x] Founder marks');
const awaiting = tally('- [ ] Founder marks');
const drafts = sh('git grep -l "AI_DRAFT"').split('\n').filter(Boolean).length;

/* ------------------------------------------------------------- the build -- */
// The book suite is asked for its own total rather than having its assertions
// counted, because one eq() call can check more than one thing.
const bookTotal = Number((sh('node scripts/check-book-maths.mjs').match(/all (\d+) checks pass/) || [])[1] || 0);
const assertions = file => (readFileSync(join(ROOT, file), 'utf8').match(/\bok\(/g) || []).length;
const checks = {
  'book arithmetic': bookTotal,
  'asset contract': assertions('scripts/check-assets.mjs'),
  'live mirror': assertions('scripts/verify-pages.mjs')
};

/* ------------------------------------------------------------ what ships -- */
const shipping = [];
if (LIVE) {
  const probe = async (label, u, want) => {
    try {
      const r = await fetch(u, { signal: AbortSignal.timeout(30000) });
      const body = r.ok ? await r.text() : '';
      shipping.push({ label, url: u, status: r.status, ok: r.ok && want.test(body) });
    } catch { shipping.push({ label, url: u, status: 0, ok: false }); }
  };
  await probe('Pages mirror', 'https://alisid0.github.io/QUBIX_UNI-/library/big-sheet-of-graphs.html', /Big Sheet/);
  await probe('qubix.university', 'https://qubix.university/library/', /Qubix Library/);
}

const state = {
  generated: new Date().toISOString().slice(0, 10),
  commit: sh('git rev-parse --short HEAD'),
  branch: sh('git rev-parse --abbrev-ref HEAD'),
  commits14: count(`git rev-list --count --since="14 days ago" HEAD`),
  planningDocs: count(`git ls-files "*.md" | wc -l`),
  sourceFiles: count(`git ls-files src book | wc -l`),
  spine, books,
  spineTotals: { terms: sum('terms'), drawn: sum('drawn'), explained: sum('explained'), frames: sum('frames') },
  topics: superstoreTopicCount ?? superstoreTopics.reduce((a, p) => a + p.topics, 0),
  phases: superstoreTopics.length,
  missions: missions.length,
  assets: THREE_ASSET_REGISTRY.length,
  approved, awaiting, drafts, checks, shipping
};

writeFileSync(join(ROOT, 'STATE.json'), JSON.stringify(state, null, 2) + '\n');

/* ------------------------------------------------------------ the report -- */
const pct = (a, b) => Math.round((100 * a) / b);
const md = `# Qubix, measured

Generated ${state.generated} from ${state.commit} on ${state.branch}.
Do not edit: run \`npm run state\`.

## The coordinate spine

${state.spineTotals.terms} concepts in ${spine.length} stages.
${state.spineTotals.drawn} have a plate (${pct(state.spineTotals.drawn, state.spineTotals.terms)}%),
${state.spineTotals.explained} explain themselves and move (${pct(state.spineTotals.explained, state.spineTotals.terms)}%),
across ${state.spineTotals.frames} frames.

| Stage | | Concepts | Drawn | Moving |
|---:|---|---:|---:|---:|
${spine.map(s => `| ${s.n} | ${s.title} | ${s.terms} | ${s.drawn} | ${s.explained} |`).join('\n')}

## Books

${books.map(b => `- ${b.name}: ${b.chapters} chapter${b.chapters === 1 ? '' : 's'}`).join('\n')}

## Data science

${state.topics} topics planned across ${state.phases} phases.
${state.missions} missions built. ${state.assets} Three.js assets.

## The review gate

**${approved} approved. ${awaiting} boards waiting. ${drafts} files marked AI_DRAFT.**

The declaration allows one board through at a time and requires the founder to
read, test, amend and approve each one. Nothing has passed it yet.

## What the build checks

${Object.entries(state.checks).map(([k, v]) => `- ${k}: ${v} assertions`).join('\n')}

## What actually ships

${shipping.length
  ? shipping.map(s => `- ${s.ok ? 'live' : 'NOT SERVING'}: ${s.label} (${s.status}) ${s.url}`).join('\n')
  : 'Not measured. Run `npm run state -- --live`.'}

${state.commits14} commits in the last fortnight.
${state.planningDocs} planning documents against ${state.sourceFiles} source files.
`;

writeFileSync(join(ROOT, 'STATE.md'), md);
console.log(md.split('\n').slice(0, 4).join('\n'));
console.log(`\n  wrote STATE.md and STATE.json`);
console.log(`  spine ${state.spineTotals.explained}/${state.spineTotals.terms} moving · ${state.missions} missions · ${state.assets} assets · ${approved} approved`);
