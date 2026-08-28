export const DSA_SEQUENCE_PREVIEW = Object.freeze({
  id: 'DSA-SEQ-001',
  status: 'APPROVED · AUTHORING ONLY',
  title: 'Sequences and indexed access',
  promise: 'Find out why knowing where an item is changes the work completely.',
  objective: 'Distinguish accessing an item by a known index from searching for an item by value, and predict how each operation’s work changes as the sequence grows.',
  learnerObjective: 'Use a position to retrieve an item directly, explain when a search is still necessary, and choose the approach that avoids wasted work.',
  prerequisites: ['Count positions from zero', 'Recognise a Python list', 'Compare two labels'],
  direct: Object.freeze({ prompt: 'Dispatch ticket: collect the item at position 5.', targetIndex: 5 }),
  search: Object.freeze({ prompt: 'Dispatch ticket: collect the item labelled MUG-118. Its position is not written down.', target: 'MUG-118' }),
  items: Object.freeze([
    'TIN-204', 'LMP-018', 'PAD-330', 'BAG-042', 'PEN-611', 'CUP-907', 'BOX-145', 'CAP-266',
    'TAG-503', 'JAR-714', 'MUG-118', 'MAP-821', 'KIT-439', 'MAT-052', 'KEY-310', 'TAP-995'
  ]),
  prediction: Object.freeze({
    prompt: 'If the worst-case shelf grows from 8 items to 16, what happens to a step-by-step search?',
    answers: Object.freeze([
      Object.freeze({ id: 'same', label: 'It takes the same work' }),
      Object.freeze({ id: 'double', label: 'It can take about twice the work' }),
      Object.freeze({ id: 'one', label: 'It always takes one step' })
    ]),
    correct: 'double'
  })
});

export function inspectionsToFind(items, target) {
  const foundAt = items.indexOf(target);
  return foundAt < 0 ? items.length : foundAt + 1;
}
