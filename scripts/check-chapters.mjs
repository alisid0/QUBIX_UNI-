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

import { readFileSync } from 'node:fs';
import { SHARED_FOUNDATIONS, volumeMinutes } from '../src/lib/content/shared-foundations.js';

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

    // Prose that is present but empty is the failure this is really guarding.
    // Measured per section, not per paragraph: the first version flagged any
    // paragraph under 25 words and so rejected deliberate one-sentence closers
    // like "This is the first habit of trustworthy data work", which are the
    // opposite of a stub.
    const thin = (s.sections || []).filter(sec => sec.paragraphs.reduce((n, p) => n + words(p), 0) < 60);
    ok(`${where} sections are written, not stubbed`, thin.length === 0,
      thin.length ? `${thin.length} thin section(s)` : `${(s.sections || []).length} sections`);

    ok(`${where} cites over https`,
      (s.sources || []).every(src => /^https:\/\//.test(src.url) && src.label));
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
const OWN = { 5: 'sql-console' };  // chapters with a mission written for them
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
