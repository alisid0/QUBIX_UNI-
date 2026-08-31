// Optional same-band peer agents. They sit in bot-seminar and partial-fill
// rooms so a 2am learner is not alone. They make productive mistakes. They do
// not dump answers.

import { atomById } from './atoms.js';

export const PEER_AGENTS = Object.freeze([
  Object.freeze({
    id: 'peer-sam',
    displayName: 'Sam',
    kind: 'bot',
    role: 'learner',
    band: 'L1',
    style: 'follows, then gets stuck on the distinction'
  }),
  Object.freeze({
    id: 'peer-riley',
    displayName: 'Riley',
    kind: 'bot',
    role: 'drill',
    band: 'L2',
    style: 'attempts the standard item and names the wrong cut'
  })
]);

export function peerForBand(band) {
  if (band === 'L0' || band === 'L1') return PEER_AGENTS[0];
  return PEER_AGENTS[1];
}

export function fillWithPeers(seats, { intent, atomId, band }) {
  const humans = seats.filter(seat => seat.kind === 'human');
  if (humans.length >= 3) return seats;
  const needed = Math.min(2, 3 - humans.length);
  const extras = PEER_AGENTS.slice(0, needed).map(agent => ({
    ...agent,
    intent,
    atomId,
    band: agent.band === 'L1' && band === 'L0' ? 'L0' : agent.band
  }));
  return [...seats, ...extras];
}

export function peerLine(agent, atomId, turn) {
  const atom = atomById(atomId);
  const title = atom?.title || 'this idea';
  if (agent.id === 'peer-sam') {
    return turn === 0
      ? `I think I follow “${title}”, but I keep mixing up the thing that happened with the row that got written down. Can someone say that in one Superstore case?`
      : `If I had to teach this back I would probably get the labels right and the consequence wrong. What breaks if I do that?`;
  }
  return turn === 0
    ? `Quick attempt on “${title}”: I would jump to the summary number first. That is probably the productive mistake. What should I look at before the summary?`
    : `I can do the standard item with a nudge. Where do people usually skip a step on this one?`;
}
