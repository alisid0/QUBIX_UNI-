// The match-the-following round for Classify Store Data.
//
// No new content: every item here is a variable the mission already carries,
// with its own samples and its own written reason. This only reshapes them into
// the items-and-targets form DragMatch expects, so the drag round and the
// existing classification round can never disagree about what a field is.

import { CLASSIFICATION_MISSION } from './data-classification-mission.js';

export const MATCH_TARGETS = Object.freeze([
  Object.freeze({ id: 'nominal', label: 'Nominal', blurb: 'Named groups, no natural order' }),
  Object.freeze({ id: 'ordinal', label: 'Ordinal', blurb: 'Ordered, but the gaps are not measurable' }),
  Object.freeze({ id: 'discrete', label: 'Discrete', blurb: 'Counted whole things' }),
  Object.freeze({ id: 'continuous', label: 'Continuous', blurb: 'Measured, and can fall between two values' })
]);

/** Every variation the mission offers, as a round of match-the-following. */
export function matchRounds() {
  return CLASSIFICATION_MISSION.variations.map(variation => ({
    id: variation.id,
    title: variation.title,
    shortTitle: variation.shortTitle || variation.title,
    description: variation.description,
    targets: MATCH_TARGETS,
    items: variation.variables.map(v => ({
      id: v.id,
      label: v.name,
      hint: v.samples?.[0] ?? '',
      answer: v.subtype,
      reason: v.reason
    }))
  }));
}

export function matchRound(id) {
  return matchRounds().find(round => round.id === id) || null;
}

/**
 * What to say when an item lands in the wrong group.
 *
 * It names the group the field actually belongs to and gives the mission's own
 * reason, because the reason is the part worth learning. Telling somebody only
 * that they were wrong teaches them nothing they can use on the next field.
 */
export function whyNot(item, targetId) {
  const right = MATCH_TARGETS.find(t => t.id === item.answer);
  const chosen = MATCH_TARGETS.find(t => t.id === targetId);
  if (!right) return item.reason || '';
  const opening = chosen
    ? `${item.label} is not ${chosen.label}, it is ${right.label}.`
    : `${item.label} is ${right.label}.`;
  return `${opening} ${item.reason}`;
}
