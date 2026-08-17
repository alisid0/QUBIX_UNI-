// The exercise bank: questions that are answered by doing, not by choosing.
//
// Founder direction, 2026-08-17. An exercise here is not a prompt with three
// options beneath it. It is a thing the learner operates, where operating it is
// the act of answering. "Apply the limit as x tends to 0" stops being a question
// about a limit and becomes a limit being taken, by hand, with the answer
// emerging rather than being selected.
//
// And each one is shown from more than one side. The same question is put
// numerically, graphically and algebraically, and the learner can move between
// them freely. That is the point of the format: not three exercises but one
// exercise with three faces, so a learner who only ever sees the algebra never
// finds out what they were doing.
//
// ON INSPIRATION AND ON LICENCE, because the founder named 3Blue1Brown.
//
// A pedagogical stance is not ownable and we are free to adopt one: showing an
// idea from several representations at once, letting the picture lead, treating
// a limit as something you watch settle. Those approaches belong to nobody.
//
// The videos, scripts, phrasings and worked examples are copyrighted, and none
// of them is used here. Nothing in this file is adapted from that work, and
// nothing may be recorded as though it were: this project's whole discipline is
// that every learner-facing passage traces to a public-domain or openly licensed
// source with a citation, and a copyrighted explanation cannot enter that chain.
// If a future exercise does draw on a specific modern explanation, it must be
// licensed and cited like any other source, or not used.
//
// What that leaves is plenty: the functions below are the standard cases every
// calculus text has carried for a century, and the shelf already holds Thompson
// and Hardy for the ideas behind them.
//
// The bank is deliberately not a board. It has no sections, no readings and no
// place in the curriculum map. It is a pool to draw from once a board needs
// exercises, and drawing from it is a separate decision.

// Each entry is one question, one operable answer, and three views of it.
// `f` is the function under test, `at` the value approached, `limit` the answer,
// and `oneSided` records that the two sides disagree, which is not a defect to
// be smoothed over but the case worth meeting.
export const LIMIT_EXERCISES = [
  {
    code: 'E-LIM-001',
    topic: 'Limits',
    ask: 'What does (x² − 1) ÷ (x − 1) approach as x approaches 1?',
    expr: '(x² − 1) / (x − 1)',
    f: x => (x * x - 1) / (x - 1),
    at: 1, limit: 2,
    hole: true,
    algebra: [
      '(x² − 1) / (x − 1)',
      '(x + 1)(x − 1) / (x − 1)',
      'x + 1,  provided x ≠ 1',
      'so as x → 1 the value → 2'
    ],
    note: 'The opening case, and the one that shows why limits are needed at all. At x = 1 the expression is 0/0 and has no value, yet everywhere around it the value is plainly heading for 2. The learner drags x towards 1 and watches it settle without ever arriving, which is the whole idea in one gesture.'
  },
  {
    code: 'E-LIM-002',
    topic: 'Limits',
    ask: 'What does (x² − 4) ÷ (x − 2) approach as x approaches 2?',
    expr: '(x² − 4) / (x − 2)',
    f: x => (x * x - 4) / (x - 2),
    at: 2, limit: 4,
    hole: true,
    algebra: [
      '(x² − 4) / (x − 2)',
      '(x + 2)(x − 2) / (x − 2)',
      'x + 2,  provided x ≠ 2',
      'so as x → 2 the value → 4'
    ],
    note: 'The same shape with different numbers, so the learner can see the method rather than remember one answer. Worth pairing with E-LIM-001 rather than using alone.'
  },
  {
    code: 'E-LIM-003',
    topic: 'Limits',
    ask: 'What does x² approach as x approaches 3?',
    expr: 'x²',
    f: x => x * x,
    at: 3, limit: 9,
    hole: false,
    algebra: ['x²', 'at x = 3 the value is 9', 'and nothing special happens on the way'],
    note: 'The dull case, included on purpose. Most limits are simply the value, and a learner who only meets the awkward ones comes away thinking a limit is a trick for repairing broken expressions rather than an ordinary question about where something is heading.'
  },
  {
    code: 'E-LIM-004',
    topic: 'Limits',
    ask: 'What does 1 ÷ x approach as x approaches 0?',
    expr: '1 / x',
    f: x => 1 / x,
    at: 0, limit: null, oneSided: true,
    hole: true,
    algebra: [
      '1 / x',
      'from the right the values grow without bound',
      'from the left they fall without bound',
      'the two sides disagree, so there is no limit'
    ],
    note: 'The first case with no answer, and the reason the format earns its keep. A multiple-choice question would have to offer "no limit" as an option and give the game away. Here the learner approaches from each side and watches the two disagree, which is the actual evidence.'
  },
  {
    code: 'E-LIM-005',
    topic: 'Limits',
    ask: 'What does |x| ÷ x approach as x approaches 0?',
    expr: '|x| / x',
    f: x => Math.abs(x) / x,
    at: 0, limit: null, oneSided: true,
    hole: true,
    algebra: [
      '|x| / x',
      'for x > 0 this is 1',
      'for x < 0 this is −1',
      'the sides disagree, so there is no limit'
    ],
    note: 'A jump rather than a blow-up. Included because E-LIM-004 might teach that "no limit" means "runs off to infinity", and this one has both sides perfectly finite and still no limit.'
  },
  {
    code: 'E-LIM-006',
    topic: 'Limits and the derivative',
    ask: 'For y = x², what does (change in y) ÷ (change in x) approach as the gap closes at x = 2?',
    expr: '((2+h)² − 2²) / h',
    f: h => (((2 + h) * (2 + h)) - 4) / h,
    at: 0, limit: 4,
    hole: true,
    algebra: [
      '((2 + h)² − 4) / h',
      '(4 + 4h + h² − 4) / h',
      '(4h + h²) / h',
      '4 + h,  provided h ≠ 0',
      'so as h → 0 the value → 4'
    ],
    note: 'The one that ties the bank to the course. Two Points, Almost Touching already makes 4 appear at x = 2 by shrinking an interval, and Thompson gets the same 4 from 2x·dx in ch. II. This is that number arriving a third way, as a limit taken by hand, and it is the exercise to use if only one from this bank is ever adopted.'
  }
];

// Function types worth putting on the plane, so the same question can be asked
// of shapes that behave differently. Kept separate from the limit exercises
// because these are about recognising a function from its graph rather than
// about approaching a value.
export const FUNCTION_GALLERY = [
  { code: 'E-FN-001', name: 'straight line', expr: 'y = 2x + 1', f: x => 2 * x + 1,
    note: 'Constant slope everywhere, which is what makes it the reference every other shape is described against.' },
  { code: 'E-FN-002', name: 'parabola', expr: 'y = x²', f: x => x * x,
    note: 'The course already draws this. Slope changes with position, which is the observation the whole derivative strand rests on.' },
  { code: 'E-FN-003', name: 'cubic', expr: 'y = x³', f: x => x * x * x,
    note: 'Passes through the origin flat and then steepens both ways. The first shape where the slope is zero without a maximum or minimum, which is a case Where a Curve Turns needs and does not have.' },
  { code: 'E-FN-004', name: 'reciprocal', expr: 'y = 1 / x', f: x => 1 / x,
    note: 'Two separate branches and nothing at x = 0. Pairs with E-LIM-004: the same fact seen as a shape rather than as a pair of disagreeing approaches.' },
  { code: 'E-FN-005', name: 'square root', expr: 'y = √x', f: x => Math.sqrt(x),
    note: 'Exists only from 0 rightwards, so it is the graphical form of the domain question the roots board raises.' },
  { code: 'E-FN-006', name: 'absolute value', expr: 'y = |x|', f: x => Math.abs(x),
    note: 'Continuous everywhere and smooth nowhere at the origin. The corner is the point: a function can be perfectly well behaved and still have no slope at one place.' }
];

export const VIEWS = [
  { key: 'numeric', name: 'Numerically', hint: 'Values from both sides, closing in.' },
  { key: 'graph', name: 'On the plane', hint: 'The shape, and what happens at the point.' },
  { key: 'algebra', name: 'Algebraically', hint: 'The manipulation, one line at a time.' }
];
