export const DSA_ARRAY_INSERTION_PREVIEW = Object.freeze({
  id: 'DSA-ARR-002',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'Making room in an array',
  promise: 'Insert one item without losing the order—or overwriting what is already there.',
  objective: 'Move existing items safely to create a requested array position, then predict how insertion work changes with position and sequence size.',
  learnerObjective: 'Insert an item at a chosen position without losing data, and explain why some insertion positions require more work than others.',
  prerequisites: ['DSA-SEQ-001 approved index lesson', 'Count positions from zero', 'Recognise that array order matters'],
  initialItems: Object.freeze(['TIN-204', 'LMP-018', 'PAD-330', 'BAG-042', 'PEN-611', 'CUP-907', null]),
  insertion: Object.freeze({ index: 2, item: 'MAP-440', moveOrder: Object.freeze([5, 4, 3, 2]) }),
  prediction: Object.freeze({
    prompt: 'With six items and one empty slot, which insertion position can require the most items to move?',
    answers: Object.freeze([
      Object.freeze({ id: 'start', label: 'Position 0 — the beginning' }),
      Object.freeze({ id: 'middle', label: 'Position 3 — the middle' }),
      Object.freeze({ id: 'end', label: 'Position 6 — the empty end slot' })
    ]),
    correct: 'start'
  })
});

export function itemsMovedForInsert(length, index) {
  if (!Number.isInteger(length) || !Number.isInteger(index) || index < 0 || index > length) return null;
  return length - index;
}

