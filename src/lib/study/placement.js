// 60–90 second placement snack before the first matched room on an atom.
//
// One easy item, one at the target atom, one stretch from the next atom.
// Trust the demonstrated answers over a self-report.

import { atomById, sessionRecord, STUDY_ATOMS } from './atoms.js';

function fromCheck(check, difficulty, sourceId) {
  if (!check?.prompt || !check.options?.length) return null;
  return Object.freeze({
    id: `${sourceId}-${difficulty}`,
    difficulty,
    prompt: check.prompt,
    options: Object.freeze(check.options.map(option => Object.freeze([...option]))),
    answer: check.answer,
    explanation: check.explanation || ''
  });
}

function easyItem(atom, session) {
  const heading = session?.sections?.[0]?.heading;
  if (!heading) return fromCheck(atom.check, 'easy', atom.id);
  const decoys = STUDY_ATOMS
    .filter(item => item.id !== atom.id && item.chapter === atom.chapter)
    .slice(0, 2)
    .map(item => item.title);
  while (decoys.length < 2) decoys.push('A later Superstore reporting rule');
  return Object.freeze({
    id: `${atom.id}-easy`,
    difficulty: 'easy',
    prompt: `Which idea does “${atom.title}” ask you to hold still first?`,
    options: Object.freeze([
      Object.freeze(['target', heading]),
      Object.freeze(['decoy-a', decoys[0]]),
      Object.freeze(['decoy-b', decoys[1]])
    ]),
    answer: 'target',
    explanation: `The session opens on this claim: ${heading}.`
  });
}

export function placementItemsFor(atomId) {
  const atom = atomById(atomId);
  if (!atom) return [];
  const session = sessionRecord(atom);
  const stretchAtom = atomById(atom.nextId);
  const items = [
    easyItem(atom, session),
    fromCheck(atom.check, 'target', atom.id),
    fromCheck(stretchAtom?.check, 'stretch', stretchAtom?.id || `${atom.id}-stretch`)
  ].filter(Boolean);
  return Object.freeze(items.slice(0, 3));
}

export function scorePlacement(items, answers) {
  let correct = 0;
  const detail = items.map(item => {
    const picked = answers[item.id];
    const ok = picked === item.answer;
    if (ok) correct += 1;
    return Object.freeze({ id: item.id, correct: ok, picked: picked || null });
  });
  return Object.freeze({ correct, total: items.length, detail: Object.freeze(detail) });
}
