// Factory options for BB2. Readings and exercises are those already drafted in
// curriculum/factory/BB2-CHANGE-IN-A-VARIABLE.options.md; interaction variants
// are added here, since that file assumed the number line was fixed.
//
// Δ is not Thompson's. Searching the full transcription, the only Greek delta
// in Calculus Made Easy is ∂ for partial derivatives in ch. XVI. The concept is
// his; the notation is a modernisation and is recorded as one.

export const selections = {};
export const finalised = {};

export const bb2 = {
  id: 'CME-CHANGE-002',
  title: 'Change in a Variable',
  fork: 'x, then Δ, then Δx. Founder ordering of 2026-08-09.',
  structure: 'Five sections.',
  sections: [
    {
      code: 'S1',
      name: 'x takes a new value',
      sources: ['T1', 'T3'],
      readings: [
        {
          code: 'S1-A',
          verbatim: 'T1',
          text: 'We classify all quantities into two classes: constants and variables. Those which we regard as of fixed value, and call constants … while those which we consider as capable of growing, or (as mathematicians say) of "varying," we denote by letters from the end of the alphabet.'
        },
        { code: 'S1-B', text: 'This is the same x you have just met. It starts at 2. Move it and x takes a new value, while the symbol stays x.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'number-line', note: 'A number line with the old position marked and the new one draggable. As built.' },
        { code: 'S1-I2', kind: 'two-bars', note: 'Two stacked bars, old length and new length. Length rather than position, which suits a quantity more than a place.' }
      ],
      exercises: [
        { code: 'S1-X1', kind: 'set-control', prompt: 'Move x to 2.5.', target: 2.5, tolerance: 0.05, from: 2 },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'Which of these is a constant?',
          options: [
            { label: '2', correct: true },
            { label: 'x', feedback: 'x has just taken a second value, so it is not of fixed value.' },
            { label: 'The value of x', feedback: 'That is the thing which changed.' }
          ]
        }
      ]
    },
    {
      code: 'S2',
      name: 'The change is its own quantity',
      sources: ['T3'],
      readings: [
        { code: 'S2-A', text: 'Thompson describes the move as adding a bit to x. That bit is a quantity in its own right, and you find its size by subtracting: new − old. From 2 to 2.5 the bit is 0.5.' },
        { code: 'S2-B', text: 'Between the old value and the new one there is a gap, and that gap has a size of its own: new − old. From 2 to 2.5, the gap is 0.5.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'number-line', note: 'The gap drawn as a bar above the line between the two points. As built.' },
        { code: 'S2-I2', kind: 'two-bars', note: 'The difference shown as a third bar of its own, so the change is an object rather than a distance between objects.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'x moves from 2 to 2.75. How big is the change?',
          options: [
            { label: '0.75', correct: true },
            { label: '2.75', feedback: '2.75 is where x ended up, not how far it travelled.' },
            { label: '4.75', feedback: 'Adding gives the wrong quantity. The gap is a subtraction: new − old.' }
          ]
        },
        { code: 'S2-X2', kind: 'set-control', prompt: 'Move x so that the change is exactly 1.0.', target: 3, tolerance: 0.05, from: 2 }
      ]
    },
    {
      code: 'S3',
      name: 'Δ on its own',
      sources: [],
      readings: [
        { code: 'S3-A', text: 'Thompson defuses a symbol by saying plainly what it means: d, he writes, "merely means a little bit of". Do the same for Δ. The Greek capital letter Δ, read "delta", is shorthand for the words "the change in". It is not a number, and it does not multiply.' },
        { code: 'S3-B', text: 'That gap needs a name. Mathematicians write "the change in" using the Greek capital letter Δ, read "delta". On its own Δ is not a number, and it does not multiply. It is waiting for a variable to attach to.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'number-line', note: 'Unchanged stage, with the strip still naming the change in words rather than notation. As built.' },
        { code: 'S3-I2', kind: 'glyph-card', note: 'Δ alone on a card, with its plain-English reading beneath it. Nothing to drag, because there is nothing to vary yet.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'On its own, what does Δ mean?',
          options: [
            { label: 'The change in', correct: true },
            { label: 'Multiply by delta', feedback: 'Δ is not a quantity, so there is nothing to multiply by. It is a word, written short.' },
            { label: 'A very small amount', feedback: 'Δ says nothing about size. A change can be large or small.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Which is true of Δ?',
          options: [
            { label: 'It is a word, written short', correct: true },
            { label: 'It is a number close to zero', feedback: 'It has no value at all on its own.' },
            { label: 'It is an instruction to multiply', feedback: 'Nothing is multiplied. Δ names the change in whatever follows it.' }
          ]
        }
      ]
    },
    {
      code: 'S4',
      name: 'Δx',
      sources: ['T3'],
      readings: [
        { code: 'S4-A', text: 'Attach Δ to x. Δx means the change in x, and you find it by subtracting: Δx = new − old. Thompson writes the same relation the other way round, causing x to become x + dx: the new value is the old value plus the change.' },
        { code: 'S4-B', text: 'Now attach Δ to x. Δx is read "delta x" and means the change in x: Δx = new − old. Moving from 2 to 2.5 gives Δx = 0.5.' }
      ],
      interactions: [
        { code: 'S4-I1', kind: 'number-line', note: 'The strip now reads Δx = new − old. As built.' },
        { code: 'S4-I2', kind: 'two-bars', note: 'Old bar, new bar, and the difference bar labelled Δx, so the notation lands on a shape already established.' }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'What does Δx mean?',
          options: [
            { label: 'The change in x', correct: true },
            { label: 'Δ multiplied by x', feedback: 'Δ is not a number, so it cannot multiply anything. Δ and x are read together as one name.' },
            { label: 'A new variable, separate from x', feedback: 'Δx is not independent. It measures how far this same x has moved.' }
          ]
        },
        {
          code: 'S4-X2', kind: 'choice',
          prompt: 'x is 2 and Δx is 0.5. What is the new value of x?',
          options: [
            { label: '2.5', correct: true },
            { label: '0.5', feedback: 'That is the change itself, not the value after it.' },
            { label: '1.0', feedback: 'The change is added to the old value, not multiplied by it.' }
          ]
        }
      ]
    },
    {
      code: 'S5',
      name: 'A change has direction',
      sources: ['T3'],
      readings: [
        { code: 'S5-A', text: 'Thompson notes that the bit may be in some cases positive, in others negative. Move the new value below 2 and the subtraction turns the other way. The sign records the direction of the move, not only its size.' },
        { code: 'S5-B', text: 'Δx can also be negative. Move the new value below 2 and the subtraction turns the other way. The sign records the direction of the move, not only its size.' }
      ],
      interactions: [
        { code: 'S5-I1', kind: 'number-line', note: 'The new point can sit either side of the old one. As built.' },
        { code: 'S5-I2', kind: 'two-bars', note: 'The difference bar flips to the other side of the baseline when the move is negative.' }
      ],
      exercises: [
        { code: 'S5-X1', kind: 'set-control', prompt: 'Move the new value so that Δx becomes negative.', below: 2, from: 2.5 },
        {
          code: 'S5-X2', kind: 'choice',
          prompt: 'x moves from 3 to 2.5. What is Δx?',
          options: [
            { label: '−0.5', correct: true },
            { label: '0.5', feedback: 'That is the size of the move but not its direction. x decreased.' },
            { label: '5.5', feedback: 'Adding gives the wrong quantity. Δx is new − old.' }
          ]
        }
      ]
    }
  ]
};
