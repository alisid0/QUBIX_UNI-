// Which sessions have something to look at, and which are text on a page.
//
// Not every session needs an interaction. Every session can carry a visual,
// and seventeen of thirty-five currently carry none: no figure, no image,
// nothing but prose and a worked-example table. This says which, and it says
// which drawn figures already exist and are being used nowhere.
//
// An audit rather than a guard. It reports and never fails the build, because
// "this session has no picture yet" is a plan, not a defect.
//
//   node scripts/audit-visuals.mjs
//   node scripts/audit-visuals.mjs --bare     only the sessions with nothing

import { readFileSync } from 'node:fs';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';

const onlyBare = process.argv.includes('--bare');

/* Every figure kind the renderer can actually draw. */
const figureSource = readFileSync(new URL('../src/lib/components/Figure.svelte', import.meta.url), 'utf8');
const KINDS = [...new Set([...figureSource.matchAll(/spec\.kind === '([a-z-]+)'/g)].map(m => m[1]))].sort();

const rows = [];
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  book.sessions.forEach((s, i) => {
    const figures = s.figures || (s.figure ? [s.figure] : []);
    const images = (s.sections || []).flatMap(x => x.images || []);
    rows.push({
      ref: `${chapter}.0${i + 1}`,
      chapter,
      title: s.title,
      figures: figures.map(f => f.kind),
      images: images.length,
      table: Boolean(s.example),
      interaction: s.exercise?.type || ''
    });
  });
}

const visualsOf = r => r.figures.length + r.images;
const bare = rows.filter(r => visualsOf(r) === 0);

console.log('\n  SESSION VISUALS\n');
for (const r of rows) {
  if (onlyBare && visualsOf(r)) continue;
  const drawn = r.figures.length ? r.figures.join(' + ') : (r.images ? `${r.images} image${r.images > 1 ? 's' : ''}` : '');
  const mark = visualsOf(r) ? ' ' : '!';
  console.log(`  ${mark} ${r.ref}  ${(drawn || 'nothing to look at').padEnd(26)}`
    + `${r.interaction ? '· ' + r.interaction : ''}`);
  if (!visualsOf(r)) console.log(`      ${r.title}`);
}

/* A chapter with nothing to look at anywhere is worth naming separately. A
   learner reads it as a wall of text however good the prose is. */
console.log('\n  BY CHAPTER\n');
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  const mine = rows.filter(r => r.chapter === chapter);
  const withVisual = mine.filter(r => visualsOf(r)).length;
  const bar = '█'.repeat(withVisual) + '·'.repeat(mine.length - withVisual);
  const note = withVisual === 0 ? '  ← nothing to look at in the whole chapter' : '';
  console.log(`  ${chapter}  ${bar.padEnd(7)} ${withVisual}/${mine.length}  ${book.title}${note}`);
}

/* Figures that exist, are drawn deterministically, and are used nowhere. The
   cheapest visual in the repository is one that is already built. */
const inUse = new Set(rows.flatMap(r => r.figures));
const idle = KINDS.filter(k => !inUse.has(k));

console.log('\n  FIGURES ALREADY BUILT AND USED NOWHERE\n');
if (idle.length) {
  for (const kind of idle) console.log(`    ${kind}`);
  console.log('\n  These need no new drawing. They need a session to sit in.');
} else {
  console.log('    none, every drawn figure is in use');
}

console.log(`\n  ${rows.length - bare.length} of ${rows.length} sessions have a visual, ${bare.length} have none.`);
console.log(`  ${KINDS.length} figure kinds exist, ${inUse.size} in use, ${idle.length} idle.`);
console.log(`  Bare: ${bare.map(r => r.ref).join(', ')}\n`);
