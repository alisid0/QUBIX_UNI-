// Every written chapter must actually be written.
//
// Volume 0 plans seven chapters and the contents page counts how many exist, so
// the pressure from here on is to add chapters. The cheapest way to add one is
// to leave out the parts nobody sees immediately: the worked example, the
// workbook, the sources. This refuses that.
//
// It also checks the arithmetic the pages print, in the same way the book suite
// checks what the prose asserts: declared totals must equal the sum of their
// parts, and a check's stated answer must be one of the options offered.
//
//   npm run check:chapters

import { existsSync, readFileSync } from 'node:fs';
import { SHARED_FOUNDATIONS, volumeMinutes } from '../src/lib/content/shared-foundations.js';
import { keywordFor } from '../src/lib/content/learning-keywords.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

console.log(`volume 0 (${SHARED_FOUNDATIONS.length} chapters written)\n`);

const words = s => String(s).trim().split(/\s+/).length;

for (const { chapter, book } of SHARED_FOUNDATIONS) {
  const tag = `ch${String(chapter).padStart(2, '0')}`;

  ok(`${tag} declares a title, subtitle and status`,
    Boolean(book.id && book.title && book.subtitle && book.status), book.title);

  // The number the contents page and the reader both print.
  const summed = book.sessions.reduce((n, s) => n + s.studyMinutes + s.playMinutes, 0);
  ok(`${tag} totalMinutes equals the sum of its sessions`, summed === book.totalMinutes,
    `${summed} summed against ${book.totalMinutes} declared`);

  for (const s of book.sessions) {
    const where = `${tag}.${s.number}`;
    const missing = [
      !s.objective && 'objective',
      !s.opening && 'opening',
      (s.sections || []).length < 2 && 'two sections',
      !s.example?.rows?.length && 'worked example',
      !s.workbook?.steps?.length && 'workbook steps',
      !s.check?.prompt && 'check',
      !s.practice?.href && 'practice link',
      !(s.sources || []).length && 'sources'
    ].filter(Boolean);
    ok(`${where} is complete`, missing.length === 0, missing.join(', ') || s.title);

    if (s.check?.options) {
      // The options are [value, label] pairs; the answer names a value.
      const values = s.check.options.map(o => (Array.isArray(o) ? o[0] : o.value ?? o));
      ok(`${where} check answer is among its options`, values.includes(s.check.answer),
        `answer "${s.check.answer}" against ${values.join(', ')}`);
      ok(`${where} check explains itself`, words(s.check.explanation) >= 8,
        `${words(s.check.explanation)} words`);
    }

    // A section must carry prose. It does not have to carry a particular amount.
    //
    // This was a word count: 60 words per section, then 40. Dropped entirely on
    // 2026-08-29 on founder direction, on the grounds that how much a section
    // needs to say depends on what it is saying, and no threshold can know that.
    // The humanize pass had already produced a 58-word section that was spare
    // rather than unfinished, and padding it to satisfy a number would have been
    // the guard writing the curriculum.
    //
    // What survives is the structural half: a heading with nothing under it is a
    // defect in any voice. Whether the prose is enough is a reading judgement and
    // belongs to the founder.
    const empty = (s.sections || []).filter(sec =>
      !sec.paragraphs?.length || sec.paragraphs.every(p => !String(p).trim()));
    ok(`${where} sections carry prose`, empty.length === 0,
      empty.length ? `${empty.length} empty section(s)` : `${(s.sections || []).length} sections`);

    // Illustrations sit inside a section now, so a broken path or a missing alt
    // would ship quietly: nothing else reads them and the page still renders.
    for (const sec of s.sections || []) {
      for (const art of sec.images || []) {
        const file = 'public' + art.src;
        ok(`${where} illustration exists: ${art.src}`, existsSync(file));
        ok(`${where} illustration describes itself`, Boolean(art.alt) && art.alt.length > 25,
          art.alt ? `${art.alt.length} chars`: 'no alt text');
      }
    }

    ok(`${where} cites over https`,
      (s.sources || []).every(src => /^https:\/\//.test(src.url) && src.label));

    if (s.keywords?.length) {
      const keywordIds = [...s.keywords];
      const entries = keywordIds.map(keywordFor);
      const prose = (s.sections || []).flatMap(section => section.paragraphs).join(' ').toLowerCase();
      const absent = entries.filter(Boolean).filter(entry =>
        !entry.aliases.some(alias => prose.includes(alias.toLowerCase())));
      ok(`${where} uses no more than four distinct Wiki terms`,
        keywordIds.length <= 4 && new Set(keywordIds).size === keywordIds.length,
        keywordIds.join(', '));
      ok(`${where} Wiki terms exist and occur in the reading`,
        entries.every(Boolean) && absent.length === 0,
        entries.some(entry => !entry)
          ? `unknown: ${keywordIds.filter(id => !keywordFor(id)).join(', ')}`
          : absent.length ? `not in prose: ${absent.map(entry => entry.slug).join(', ')}` : `${entries.length} linked terms`);
    }
  }
  console.log('');
}

// Every session ends by sending the learner somewhere. A practice link that
// names a mission the app does not route is a dead end that looks like a
// destination, and only the router knows what exists.
const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');
const routed = new Set([...app.matchAll(/mission === '([a-z-]+)'/g)].map(m => m[1]));
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  for (const s of book.sessions) {
    const href = s.practice.href;
    const named = (href.match(/mission=([a-z-]+)/) || [])[1];
    const fine = href.startsWith('/library/') || (named && routed.has(named));
    ok(`ch${String(chapter).padStart(2, '0')}.${s.number} practice link is routed`, fine,
      fine ? href : `${href} names "${named}", which App.svelte does not route`);
  }
}
console.log('');

// Reading and playing are meant to run in parallel, so the balance is measured
// rather than asserted. A chapter whose four sessions all borrow missions
// written for other chapters has no game of its own, and this says so by name
// instead of letting it look covered.
const { MISSIONS } = await import('../src/lib/game/progress.js');
// Worked out rather than listed. A hand-kept map said four chapters owned a
// game when six did, and hid that the Analyst Decision Desk names chapter 07
// as its home while chapter 07 linked elsewhere.
const OWN = Object.fromEntries(SHARED_FOUNDATIONS.map(({ chapter, book }) => {
  const slug = book.sessions
    .map(s => (s.practice.href.match(/mission=([a-z-]+)/) || [])[1])
    .find(sl => sl && MISSIONS.some(m => m.slug === sl && m.reading?.chapter === chapter));
  return [chapter, slug];
}).filter(([, slug]) => slug));
console.log('reading and playing\n');
let owned = 0;
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  const links = [...new Set(book.sessions.map(s => (s.practice.href.match(/mission=([a-z-]+)/) || [])[1]).filter(Boolean))];
  const own = OWN[chapter];
  if (own) owned += 1;
  console.log(`   ch${String(chapter).padStart(2, '0')}  ${book.title.padEnd(28)}`
    + `${own ? `own game: ${own}` : `borrows ${links.length}: ${links.join(', ')}`}`);
}
ok('every chapter sends the learner to a game', SHARED_FOUNDATIONS.every(
  ({ book }) => book.sessions.every(s => /mission=|\/library\//.test(s.practice.href))));
console.log(`   ${MISSIONS.length} missions against `
  + `${SHARED_FOUNDATIONS.reduce((n, c) => n + c.book.sessions.length, 0)} reading sessions, `
  + `${owned} chapter(s) with a game of their own\n`);

// No two chapters may claim the same storage key, or finishing one would mark
// the other as read.
const ids = SHARED_FOUNDATIONS.map(c => c.book.id);
ok('every chapter has a distinct id', new Set(ids).size === ids.length, ids.join(', '));
ok('the volume total is the sum of its chapters',
  volumeMinutes === SHARED_FOUNDATIONS.reduce((n, c) => n + c.book.totalMinutes, 0),
  `${Math.floor(volumeMinutes / 60)} h ${volumeMinutes % 60} min`);

console.log(`\n${bad ? `${bad} check(s) FAILED` : `all checks pass, ${SHARED_FOUNDATIONS.reduce((n, c) => n + c.book.sessions.length, 0)} sessions`}`);
process.exit(bad ? 1 : 0);
