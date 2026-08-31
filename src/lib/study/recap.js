// Session recap: the artifact, not a feed item.
//
// Kept so participants can reopen the room. Never used to train a model, build
// a wall of posts, or recommend people from confusion-talk.

import { atomById } from './atoms.js';
import { intentById } from './intents.js';
import { fiveChecks, talkShare } from './chair.js';

export function buildRecap(room, now = Date.now()) {
  const atom = atomById(room.atomId);
  const intent = intentById(room.intent);
  const share = talkShare(room);
  const humanMessages = (room.messages || []).filter(message => message.kind === 'human');
  const workingQuestions = humanMessages
    .filter(message => /\?/.test(message.text || ''))
    .map(message => message.text.trim())
    .slice(0, 6);
  return Object.freeze({
    roomCode: room.code,
    atomId: room.atomId,
    atomTitle: atom?.title || room.atomId,
    intent: room.intent,
    intentLabel: intent?.label || room.intent,
    band: room.band,
    startedAt: room.startedAt,
    endedAt: now,
    durationMin: Math.round((now - room.startedAt) / 60000),
    members: Object.freeze((room.members || []).map(member => Object.freeze({
      id: member.id,
      displayName: member.displayName,
      kind: member.kind,
      role: member.role,
      band: member.band
    }))),
    talkShare: Object.freeze(share),
    outline: Object.freeze([
      atom?.objective,
      `Intent: ${intent?.job || room.intent}`,
      room.notes ? `Notes: ${String(room.notes).slice(0, 280)}` : 'No shared notes saved.'
    ].filter(Boolean)),
    workingQuestions: Object.freeze(workingQuestions),
    exitItems: Object.freeze(fiveChecks(atom)),
    nextAtomId: atom?.nextId || null,
    nextAtomTitle: atomById(atom?.nextId)?.title || null,
    published: false
  });
}

export function recapText(recap) {
  const people = recap.members.map(member => member.displayName).join(', ');
  return [
    `Qubix study recap — ${recap.atomTitle}`,
    `Intent: ${recap.intentLabel}`,
    `Who: ${people}`,
    `Length: ${recap.durationMin} min`,
    '',
    'Outline',
    ...recap.outline.map(line => `- ${line}`),
    '',
    'Working questions',
    ...(recap.workingQuestions.length ? recap.workingQuestions.map(line => `- ${line}`) : ['- (none captured)']),
    '',
    'Exit checks',
    ...recap.exitItems.map((line, i) => `${i + 1}. ${line}`),
    '',
    recap.nextAtomTitle ? `Next atom: ${recap.nextAtomTitle}` : 'No next atom on this path.',
    '',
    'We keep your rooms so you can continue. We don’t train on your chats, don’t put them in a feed, and don’t advertise what you got wrong.'
  ].join('\n');
}

export function studyAgainContract(recap) {
  return {
    intent: recap.intent,
    atomId: recap.atomId,
    roster: recap.members.filter(member => member.kind === 'human').map(member => member.displayName)
  };
}
