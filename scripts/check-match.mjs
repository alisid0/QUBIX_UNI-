// A match-the-following round must be winnable, and winnable without a mouse.
//
// Why this exists: drag and drop is the first interaction in this product that
// can be built in a way that locks people out. A drag-only implementation is
// unusable by keyboard and awkward on a phone, and nothing else in the suite
// would notice. So this checks the interaction itself, not only the data.
//
// It also checks the obvious content faults a round can ship with: an item
// whose answer names a group that does not exist, a group nothing belongs to,
// or a wrong-answer message that says only that you were wrong.
//
//   node scripts/check-match.mjs

import { readFileSync } from 'node:fs';
import { matchRounds, MATCH_TARGETS, whyNot } from '../src/lib/game/classify-match.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const rounds = matchRounds();
ok('there are rounds to play', rounds.length > 0, `${rounds.length} rounds`);

const targetIds = new Set(MATCH_TARGETS.map(t => t.id));
ok('every group is named and described',
  MATCH_TARGETS.every(t => t.id && t.label && t.blurb && t.blurb.length > 12),
  `${MATCH_TARGETS.length} groups`);

for (const round of rounds) {
  const where = `match:${round.id}`;

  ok(`${where} has items`, round.items.length >= 4, `${round.items.length} items`);

  const strays = round.items.filter(i => !targetIds.has(i.answer));
  ok(`${where} every item belongs to a real group`, strays.length === 0,
    strays.length ? strays.map(i => `${i.id} wants "${i.answer}"`).join(', ') : '');

  // A group nothing can go in is a decoration that makes the round look harder
  // than it is, and teaches the wrong lesson about the categories.
  const used = new Set(round.items.map(i => i.answer));
  const empty = MATCH_TARGETS.filter(t => !used.has(t.id));
  ok(`${where} every group is reachable`, empty.length === 0,
    empty.length ? `nothing belongs in: ${empty.map(t => t.label).join(', ')}` : `${used.size} groups used`);

  ok(`${where} every item shows a real example`,
    round.items.every(i => i.hint && String(i.hint).length > 0));

  ok(`${where} no two items share an id`,
    new Set(round.items.map(i => i.id)).size === round.items.length);

  // The wrong-answer message has to teach. "Wrong" is not a message.
  const messages = round.items.map(item => {
    const wrongTarget = MATCH_TARGETS.find(t => t.id !== item.answer);
    return whyNot(item, wrongTarget.id);
  });
  ok(`${where} a wrong placement explains itself`,
    messages.every(m => m.length > 60 && /\./.test(m)),
    `shortest ${Math.min(...messages.map(m => m.length))} chars`);
  ok(`${where} the explanation names the right group`,
    round.items.every((item, n) => {
      const right = MATCH_TARGETS.find(t => t.id === item.answer);
      return messages[n].includes(right.label);
    }));
}

/* ── the interaction, not the data ───────────────────────────────────────── */
const component = readFileSync(new URL('../src/lib/components/DragMatch.svelte', import.meta.url), 'utf8');

ok('items can be placed without dragging', /on:click=\{\(\) => pick\(item\)\}/.test(component),
  'select-then-place is the primary path');
ok('groups can be chosen without dragging', /on:click=\{\(\) => place\(target\)\}/.test(component));
ok('items and groups are real buttons, so they are keyboard reachable',
  /<button\s+class="chip"/.test(component) && /<button\s+class="group"/.test(component));
ok('the held state is exposed to assistive technology',
  /aria-pressed=\{held\?\.id === item\.id\}/.test(component));
ok('placements are announced', /aria-live="polite"/.test(component));
ok('dragging is an addition, not the only route',
  /on:dragstart/.test(component) && /on:drop/.test(component) && /on:click/.test(component));
ok('a wrong placement returns the item rather than locking it away',
  /miss = \{ itemId/.test(component) && /held = null;/.test(component));
ok('motion is dropped when the reader asks for that',
  /prefers-reduced-motion/.test(component));
ok('focus is visible on both items and groups',
  (component.match(/:focus-visible/g) || []).length >= 2);

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, ${rounds.length} match round(s), ${rounds.reduce((n, r) => n + r.items.length, 0)} items`);
process.exit(bad ? 1 : 0);
