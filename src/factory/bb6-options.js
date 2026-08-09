// BB6 drafts. GATED: the curriculum declaration keeps BB6 locked until BB1–BB5
// are individually approved and the move to Thompson's notation is agreed.
// Drafted on founder instruction of 2026-08-09 so selections can be made later.
// Nothing here may reach a learner while that gate stands.
//
// BB6 does with d what BB5 did with Δ. It is the same derivation, which is the
// point: the learner has already done this arithmetic once and is now being
// handed the notation the rest of mathematics uses for it.

export const selections = {};
export const finalised = {};
export const gated = 'Locked by 02-MAIN-CURRICULUM-MAP until BB1–BB5 are approved.';

export const bb6 = {
  id: 'CME-CHANGE-006',
  title: 'Derivative Language',
  fork: 'Retell BB5 in Thompson’s own notation rather than teaching a new idea.',
  structure: 'Four sections.',
  sections: [
    {
      code: 'S1',
      name: 'What d means',
      sources: ['T4'],
      readings: [
        {
          code: 'S1-A',
          text: 'The letter d placed in front of a variable means a little bit of it. dx is a little bit of x. du is a little bit of u.'
        },
        { code: 'S1-B', text: 'The letter d in front of a variable means a little bit of that variable. dx is a little bit of x. It is not d multiplied by x, in the same way that Δx was never Δ multiplied by x.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'glyph-card', note: 'd alone on a card with its plain reading beneath, matching the Δ card in BB2 so the learner recognises the move.' },
        { code: 'S1-I2', kind: 'two-cards', note: 'dx and Δx side by side, both labelled "a bit of x", so the new notation lands on the old one.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'What does dx mean?',
          options: [
            { label: 'A little bit of x', correct: true },
            { label: 'd multiplied by x', feedback: 'Same trap as Δx. d is a word written short, not a number.' },
            { label: 'The value of x', feedback: 'That is x itself. dx is a bit added to it.' }
          ]
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'Thompson says these little bits "may be considered to be indefinitely small." What does that rule out?',
          options: [
            { label: 'Treating dx as a fixed quantity you could measure', correct: true },
            { label: 'Using dx in arithmetic at all', feedback: 'He does arithmetic with it throughout. It is the fixed size that is ruled out.' },
            { label: 'Letting dx be negative', feedback: 'A bit can be negative. Smallness and sign are different questions.' }
          ]
        }
      ]
    },
    {
      code: 'S2',
      name: 'A bit of each',
      sources: ['T3'],
      readings: [
        { code: 'S2-A', text: 'Add a bit to x and it becomes x + dx. Because y depends on x, y gains a bit too and becomes y + dy. Two bits, one for each variable, exactly as Δx and Δy were.' },
        { code: 'S2-B', text: 'dx is the bit added to x. dy is the bit that arrives in y as a consequence. The second is caused by the first, and the two are not the same size.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'locked-pair', note: 'x with its control and y following, now labelled with dx and dy rather than Δ.' },
        { code: 'S2-I2', kind: 'growth-decomposition', note: 'The Fig. 1 square again, with the added region labelled in d notation.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'Which bit is the consequence of the other?',
          options: [
            { label: 'dy follows from dx', correct: true },
            { label: 'dx follows from dy', feedback: 'x is the one assigned. y is determined by it.' },
            { label: 'Neither; they are independent', feedback: 'y depends on x, so their bits cannot be independent.' }
          ]
        },
        { code: 'S2-X2', kind: 'set-control', prompt: 'Add a bit to x and watch dy arrive.', above: 2.3, from: 2 }
      ]
    },
    {
      code: 'S3',
      name: 'The ratio being hunted',
      sources: ['T6'],
      readings: [
        {
          code: 'S3-A',
          text: 'The whole of the differential calculus is hunting one thing, and it is a ratio. Not dy, and not dx, but the proportion between them as both are made indefinitely small.'
        },
        { code: 'S3-B', text: 'What the calculus wants is not dy and not dx but the proportion between them, written dy/dx, as both are made indefinitely small. That proportion is the thing BB5 measured as 4.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'rate-formula', note: 'dy/dx displayed with the measured value beside it, so the notation attaches to a number already familiar.' },
        { code: 'S3-I2', kind: 'curve-secant', note: 'The BB5 picture, relabelled: the line through two points a bit apart, with dy and dx marked on it.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Thompson calls dy/dx "a mere ratio". Why does that matter?',
          options: [
            { label: 'The two bits vanish, but their proportion survives', correct: true },
            { label: 'Because ratios are easier than subtraction', feedback: 'Ease is not the point. The point is what is left when both bits go.' },
            { label: 'Because dy and dx are always equal', feedback: 'They are not, except by a miracle, as Thompson puts it.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'In BB5 the rate settled on 4 at x = 2. In this notation that number is…',
          options: [
            { label: 'dy/dx at x = 2', correct: true },
            { label: 'dy at x = 2', feedback: 'dy alone is a bit of y, and it vanishes. The ratio does not.' },
            { label: 'dx at x = 2', feedback: 'dx is the bit you add to x, not the answer.' }
          ]
        }
      ]
    },
    {
      code: 'S4',
      name: 'The same derivation, in d',
      sources: ['T7', 'T8'],
      readings: [
        { code: 'S4-A', text: 'y + dy = (x + dx)² = x² + 2x·dx + (dx)². Discard (dx)² as a bit of a bit, too small to count. Subtracting y = x² leaves dy = 2x·dx, and dividing by dx gives dy/dx = 2x. At x = 2 that is 4, which is the number the last board arrived at by dragging.' },
        { code: 'S4-B', text: 'The working is the one already done with Δ. Square x + dx, throw away the corner term, subtract the original square, divide by the bit. What is left is dy/dx = 2x.' }
      ],
      interactions: [
        { code: 'S4-I1', kind: 'growth-decomposition', note: 'Fig. 1 with the corner square greyed out, showing exactly which term Thompson discards and why it is the smallest.' },
        { code: 'S4-I2', kind: 'rate-formula', note: 'The line of algebra with each step revealed in turn.' }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'Why may (dx)² be discarded?',
          options: [
            { label: 'It is a bit of a bit: small of the second order', correct: true },
            { label: 'It equals zero', feedback: 'It is not zero. It is negligible beside the other terms, which is a different claim.' },
            { label: 'It cancels with 2x·dx', feedback: 'Nothing cancels it. It is dropped because of its size.' }
          ]
        },
        {
          code: 'S4-X2', kind: 'choice',
          prompt: 'For y = x², what is dy/dx?',
          options: [
            { label: '2x', correct: true },
            { label: 'x²', feedback: 'That is y itself, not the ratio of the bits.' },
            { label: '2', feedback: '2x depends on where you stand. 2 would be the same everywhere.' }
          ]
        }
      ]
    }
  ]
};
