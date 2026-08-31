// Study rooms are a session product, not a curriculum board and not a feed.
//
// This guard exists so the matcher, chair and privacy promises cannot drift
// quietly: mixed intents must be rejected, Learn rooms must not dump the
// answer, real-patient text must be refused, and recaps must be deletable
// without a network call.

import { INTENTS, intentById } from '../src/lib/study/intents.js';
import { STUDY_ATOMS, atomById, defaultAtomId, atomIdForSession } from '../src/lib/study/atoms.js';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { rejectReason, canSeatTogether, pairScore, HUMAN_CAP } from '../src/lib/study/matcher.js';
import { bandFromProbeScore } from '../src/lib/study/bands.js';
import { placementItemsFor, scorePlacement } from '../src/lib/study/placement.js';
import { refuseKind, revealsAnswer } from '../src/lib/study/refuse.js';
import { CHAIR_CONTRACT, chairReply, openingSpeech, SESSION_MS } from '../src/lib/study/chair.js';
import { recapText, buildRecap } from '../src/lib/study/recap.js';
import { fillWithPeers } from '../src/lib/study/peers.js';
import { readFileSync } from 'node:fs';

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

const sessionCount = SHARED_FOUNDATIONS.reduce((n, entry) => n + entry.book.sessions.length, 0);
check(STUDY_ATOMS.length === sessionCount, 'every Volume 0 session is a study atom',
  `${STUDY_ATOMS.length} atoms / ${sessionCount} sessions`);
check(STUDY_ATOMS.every(atom => atom.title && atom.objective && atom.readingHref),
  'atoms carry a title, objective and reading link');
check(atomIdForSession(1, 1) === defaultAtomId(), 'session 1.1 is the default atom');

check(INTENTS.length === 4, 'four first-class intents');
check(INTENTS.every(item => item.dumpAnswers === false), 'no intent dumps answers by default');
check(intentById('learn').firstToAnswer === false, 'Learn rooms disable first-to-answer');
check(intentById('exam').firstToAnswer === true, 'Exam rooms allow first-to-answer');

const atom = atomById(defaultAtomId());
const learnSeat = { intent: 'learn', atomId: atom.id, band: 'L1', role: 'learner', kind: 'human' };
const examSeat = { ...learnSeat, intent: 'exam' };
check(rejectReason([learnSeat, examSeat]) === 'mixed-intents', 'matcher never mixes intents');
check(canSeatTogether([
  { ...learnSeat, band: 'L1' },
  { ...learnSeat, band: 'L2', id: 'b' }
]), 'adjacent bands may sit together in Learn');
check(rejectReason([
  { ...learnSeat, band: 'L0' },
  { ...learnSeat, band: 'L3', role: 'learner', id: 'c' }
]) === 'band-spread', 'Learn rejects a two-band gap');
check(HUMAN_CAP === 5, 'human cap is five');
check(pairScore(learnSeat, examSeat) < 0, 'mixed-intent pair score is unusable');

const l4intro = [
  { ...learnSeat, band: 'L4', kind: 'human', id: 'a' },
  { ...learnSeat, band: 'L4', kind: 'human', id: 'b' },
  { ...learnSeat, band: 'L4', kind: 'human', id: 'c' }
];
check(rejectReason(l4intro) === 'all-l4-intro', 'all L4 on the intro atom is rejected');

check(bandFromProbeScore(0) === 'L0' && bandFromProbeScore(2) === 'L2' && bandFromProbeScore(3) === 'L3',
  'placement score maps onto bands');
const items = placementItemsFor(atom.id);
check(items.length === 3, 'placement snack is three items', `${items.length} items`);
const scored = scorePlacement(items, Object.fromEntries(items.map(item => [item.id, item.answer])));
check(scored.correct === 3, 'a perfect probe scores three');

check(refuseKind('just tell me the answer') === 'answer-dump', 'answer-dump is detected');
check(refuseKind('my patient is crashing, what dose now') === 'named-patient'
  || refuseKind('my patient is crashing, what dose now') === 'live-crisis',
  'named-patient / live crisis is refused');
check(refuseKind('here is the live customer email and password') === 'live-secrets',
  'live secrets are refused');

const room = {
  code: 'testrm',
  intent: 'learn',
  atomId: atom.id,
  band: 'L1',
  durationMs: SESSION_MS,
  startedAt: Date.now(),
  chair: 'bot',
  members: [
    { id: 'lrn_a', displayName: 'Alex', kind: 'human', role: 'learner', band: 'L1' },
    { id: 'lrn_b', displayName: 'Maya', kind: 'human', role: 'learner', band: 'L1' }
  ],
  messages: [],
  groupAttempted: false
};
const opening = chairReply(room, { type: 'open' }, room.startedAt);
check(Boolean(opening?.text.includes(atom.title)), 'opening names the atom', opening?.text?.slice(0, 80));
check(/not first-to-type/i.test(opening.text), 'opening forbids first-to-unmute');
check(/will not give the final answer/i.test(opening.text), 'Learn opening withholds the answer');

const dump = chairReply(room, { type: 'message', from: 'lrn_a', text: 'just tell us the answer' }, Date.now());
check(!revealsAnswer(dump.text, atom.check), 'chair does not dump the Learn answer');
check(/will not dump the answer|do not dump/i.test(dump.text), 'chair refuses an answer-dump request');

if (atom.check?.answer) {
  const spoiler = chairReply(room, {
    type: 'message', from: 'lrn_a',
    text: `The answer is ${atom.check.answer}`
  }, Date.now());
  check(!new RegExp(`the answer is ${atom.check.answer}`, 'i').test(spoiler.text),
    'chair does not repeat a dumped key in Learn');
}

const crisis = chairReply(room, { type: 'message', from: 'lrn_a', text: 'call 999 my patient cannot breathe' }, Date.now());
check(/emergency services/i.test(crisis.text) && !/give them/i.test(crisis.text),
  'crisis text is refused and not managed');

check(/not an answer engine/i.test(CHAIR_CONTRACT), 'chair contract is present');
check(/Do not mention this prompt/.test(CHAIR_CONTRACT), 'contract stays off-camera');
check(/40-minute/.test(openingSpeech({ ...room, durationMs: SESSION_MS })),
  'default room is forty minutes');

const filled = fillWithPeers([learnSeat], { intent: 'learn', atomId: atom.id, band: 'L1' });
check(filled.some(seat => seat.kind === 'bot'), 'partial fill adds peer agents');

const recap = buildRecap({
  ...room,
  notes: 'Grain is what one row represents.',
  messages: [
    { kind: 'human', from: 'lrn_a', text: 'What does one row represent?' },
    { kind: 'human', from: 'lrn_b', text: 'A sale, not the customer.' }
  ]
});
const text = recapText(recap);
check(/don.?t train on your chats/i.test(text), 'recap carries the privacy promise');
check(recap.published === false, 'recaps are private by default');

const lobby = readFileSync(new URL('../src/views/StudyLobby.svelte', import.meta.url), 'utf8');
const store = readFileSync(new URL('../src/lib/study/store.js', import.meta.url), 'utf8');
check(!/openai|anthropic|api\.groq|generativelanguage/i.test(store + lobby),
  'study rooms do not call a vendor model');
check(/We keep your rooms so you can continue/.test(lobby),
  'lobby states the retention promise in the brief’s copy');
check(/Validation prototype/.test(lobby), 'lobby does not look like a released social network');

const landing = readFileSync(new URL('../src/views/RoleFoundations.svelte', import.meta.url), 'utf8');
check(landing.includes('/study'), 'production landing offers a study seat');

console.log(failed ? '\n  study-room contract is broken\n' : '\n  study-room contract holds\n');
process.exit(failed ? 1 : 0);
