// DSA-ARR-003 — When the array runs out of room.
//
// DSA-ARR-002 ends with a precision note promising this lesson: it gave the
// array one spare slot so that shifting could be studied on its own, and said
// the resize deserved its own model. This is that model.
//
// Every number the reading and the bench quote is computed here, so the prose
// cannot drift away from the mechanism. check-dsa-preview asserts the totals.

export const DSA_ARRAY_GROWTH_PREVIEW = Object.freeze({
  id: 'DSA-ARR-003',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'When the array runs out of room',
  promise: 'Adding one more item is usually instant. Once in a while it copies everything. That is still the better deal.',
  objective: 'Explain why a full array must be copied into a larger one, and predict why doubling the capacity keeps the average cost of an append low.',
  learnerObjective: 'Predict which appends are expensive, and explain why doubling beats adding one slot at a time even though both finish at the same size.',
  prerequisites: [
    'DSA-ARR-002 approved insertion lesson',
    'Count positions from zero',
    'An array holds a fixed number of slots'
  ],

  startCapacity: 4,
  appendTarget: 32,

  // The moment the lesson turns on: the array is full and another item is waiting.
  full: Object.freeze({
    items: Object.freeze(['TIN-204', 'LMP-018', 'PAD-330', 'BAG-042']),
    waiting: 'MAP-440',
    prompt: 'Four slots, four items, and a fifth item waiting. What should the program do?',
    choices: Object.freeze([
      Object.freeze({
        id: 'overwrite',
        label: 'Write MAP-440 into position 0',
        cost: 'TIN-204 is destroyed. The array still holds four items, and one of them is gone.'
      }),
      Object.freeze({
        id: 'refuse',
        label: 'Refuse MAP-440; the array is full',
        cost: 'Nothing is lost, but the collection can never grow past four. A list that cannot grow is not a list.'
      }),
      Object.freeze({
        id: 'copy',
        label: 'Claim a larger array and copy every item across',
        cost: 'Every existing item is copied once. Nothing is lost, and there is room to continue.'
      })
    ]),
    correct: 'copy'
  }),

  strategies: Object.freeze([
    Object.freeze({
      id: 'one',
      label: 'Grow by one slot',
      blurb: 'Ask for exactly one more slot each time the array fills. No space is ever wasted.'
    }),
    Object.freeze({
      id: 'double',
      label: 'Double the capacity',
      blurb: 'Ask for twice the room each time the array fills. Some slots sit empty for a while.'
    })
  ]),

  prediction: Object.freeze({
    prompt: 'Both strategies finish holding 32 items. How much copying does each do on the way there?',
    answers: Object.freeze([
      Object.freeze({ id: 'same', label: 'About the same, because both end at the same size' }),
      Object.freeze({ id: 'oneLess', label: 'Growing by one copies less, because it never asks for spare room' }),
      Object.freeze({ id: 'doubleLess', label: 'Doubling copies far less' })
    ]),
    correct: 'doubleLess'
  }),

  // Transfer, not recall: the bench has already shown 32 appends, so this asks
  // what happens at a size the learner never watched.
  transferAppends: 1000,
  transfer: Object.freeze({
    prompt: 'You append 1,000 items instead of 32, still doubling. How many times does the array grow?',
    answers: Object.freeze([
      Object.freeze({ id: 'perItem', label: 'About 1,000 times, once for each item' }),
      Object.freeze({ id: 'quarter', label: 'About 250 times' }),
      Object.freeze({ id: 'few', label: 'About 8 times' })
    ]),
    correct: 'few'
  })
});

/** The capacity an array asks for when it is full, under each strategy. */
export function nextCapacity(strategyId, capacity) {
  if (!Number.isInteger(capacity) || capacity < 1) return null;
  if (strategyId === 'one') return capacity + 1;
  if (strategyId === 'double') return capacity * 2;
  return null;
}

/**
 * One entry per append. `copied` is the work this particular append paid for:
 * zero when there was spare room, and the whole array when there was not.
 */
export function growthTrace(strategyId, appends, startCapacity) {
  if (!Number.isInteger(appends) || appends < 1) return null;
  if (nextCapacity(strategyId, startCapacity) === null) return null;

  const steps = [];
  let capacity = startCapacity;
  let size = 0;
  let totalCopies = 0;

  for (let n = 1; n <= appends; n += 1) {
    let copied = 0;
    if (size === capacity) {
      copied = size;
      capacity = nextCapacity(strategyId, capacity);
      totalCopies += copied;
    }
    size += 1;
    steps.push(Object.freeze({ n, size, capacity, copied, grew: copied > 0, totalCopies }));
  }
  return steps;
}

/** What the bench and the reading both quote. Derived, never typed in by hand. */
export function growthSummary(strategyId, appends, startCapacity) {
  const steps = growthTrace(strategyId, appends, startCapacity);
  if (!steps) return null;
  const last = steps[steps.length - 1];
  const growth = steps.filter(step => step.grew);
  return Object.freeze({
    totalCopies: last.totalCopies,
    finalCapacity: last.capacity,
    growEvents: growth.length,
    worstAppend: growth.reduce((most, step) => Math.max(most, step.copied), 0),
    copiesPerAppend: last.totalCopies / appends,
    wastedSlots: last.capacity - last.size
  });
}
