// Factory options for BB2. Readings and exercises are those already drafted in
// curriculum/factory/BB2-CHANGE-IN-A-VARIABLE.options.md; interaction variants
// are added here, since that file assumed the number line was fixed.
//
// Δ is not Thompson's. Searching the full transcription, the only Greek delta
// in Calculus Made Easy is ∂ for partial derivatives in ch. XVI. The concept is
// his; the notation is a modernisation and is recorded as one.

// Founder selections. Note S1 carries two exercises: the founder kept X3 and X2
// together, so a section is not limited to one check.
export const selections = {
  'S1-A': '2026-08-09',
  'S1-I2': '2026-08-09',
  'S1-X3': '2026-08-09',
  'S1-X2': '2026-08-09',
  'S2-A': '2026-08-09',
  'S2-I2': '2026-08-09',
  // All three S2 exercises kept.
  'S2-X1': '2026-08-09',
  'S2-X2': '2026-08-09',
  'S2-X3': '2026-08-09',
  // S3 reading rewritten to founder dictation: no "frightening", and Δ stated
  // as marking a subtraction. All three S3 exercises kept.
  'S3-A': '2026-08-09',
  'S3-X1': '2026-08-09',
  'S3-X2': '2026-08-09',
  'S3-X3': '2026-08-09',
  // S3 keeps both new interactions; the founder wanted the how and the what.
  'S3-I3': '2026-08-09',
  'S3-I4': '2026-08-09',
  // S4: all three checks kept. Interactions were rejected as repeats, so I3 and
  // I4 were built to replace them and await a decision.
  'S4-X1': '2026-08-09',
  'S4-X2': '2026-08-09',
  'S4-X3': '2026-08-09',
  // S5: reading B, the rebuilt signed bar, all three checks.
  'S5-B': '2026-08-09',
  'S5-I2': '2026-08-09',
  'S5-X1': '2026-08-09',
  'S5-X2': '2026-08-09',
  'S5-X3': '2026-08-09',
  // Both workshops kept.
  'W1': '2026-08-09',
  'W2': '2026-08-09'
};

// Rejected outright, recorded so the record shows what was considered and
// refused rather than merely unchosen.
export const rejected = {
  'S5-I1': 'Founder, 2026-08-09: not needed.'
};

export const finalised = {
  'S4-A': 'AI-finalised: the founder settled S4\'s checks and interactions but not its reading. S4-A states the relation both ways round, which is what the new S4-I3 shows.'
};

export const bb2 = {
  id: 'CME-CHANGE-002',
  title: 'Change in a Variable',

  workshops: [
    {
      code: 'W1',
      name: 'The change bench',
      kind: 'change-bench',
      blurb: 'Set an old value and a new one with the buttons. The change between them is worked out as you go.',
      goals: [
        { id: 'b1', text: 'Make the change exactly 0.5' },
        { id: 'b2', text: 'Make the change negative' },
        { id: 'b3', text: 'Make the change nothing at all' }
      ],
      note: 'The third goal is the one to keep. A change of zero is still a change with a value, and nothing else in BB2 makes that point.'
    },
    {
      code: 'W2',
      name: 'The delta builder',
      kind: 'delta-builder',
      blurb: 'Attach Δ to a letter and read what you have built. Shows that Δ takes whatever follows it, rather than belonging to x.',
      letters: ['x', 'y', 't'],
      goals: [
        { id: 'd1', text: 'Build the change in t' },
        { id: 'd2', text: 'Build the change in y' }
      ],
      note: 'BB2 only ever shows Δx, which quietly suggests Δ and x are one symbol. Building Δt breaks that before BB3 needs it.'
    }
  ],

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
          text: 'Quantities come in two kinds. Some hold a fixed value and are called constants. Others are able to grow or shrink, and those are called variables. x is a variable. Here it sits at 2. Move it and x takes a new value, while the symbol stays x.'
        },
        { code: 'S1-B', text: 'This is the same x you have just met. It starts at 2. Move it and x takes a new value, while the symbol stays x.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'number-line', note: 'A number line with the old position marked and the new one draggable. As built.' },
        { code: 'S1-I2', kind: 'two-bars', bars: 2, note: 'Two stacked bars, old length and new length, and nothing else. Length rather than position, which suits a quantity more than a place. The gap is visible but unnamed, which is section 2\'s job.' }
      ],
      exercises: [
        { code: 'S1-X1', kind: 'set-control', prompt: 'Move x to 2.5.', target: 2.5, tolerance: 0.05, from: 2 },
        {
          code: 'S1-X3', kind: 'stepper',
          prompt: 'Step x up to 2.5.',
          target: 2.5, min: 1.2, max: 3, step: 0.1, start: 2, unit: '',
          successNote: 'One symbol, a second value. Stepping makes the two values feel separate in a way that sliding does not.'
        },
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
        { code: 'S2-A', text: 'Think of the move as a bit added to x. That bit is a quantity in its own right, and you find its size by subtracting: new − old. From 2 to 2.5 the bit is 0.5.' },
        { code: 'S2-B', text: 'Between the old value and the new one there is a gap, and that gap has a size of its own: new − old. From 2 to 2.5, the gap is 0.5.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'number-line', note: 'The gap drawn as a bar above the line between the two points. As built.' },
        { code: 'S2-I2', kind: 'two-bars', bars: 3, note: 'The difference shown as a third bar of its own, so the change is an object rather than a distance between objects. Exactly section 1\'s stage plus the one thing section 2 adds.' }
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
        { code: 'S2-X2', kind: 'set-control', prompt: 'Move x so that the change is exactly 1.0.', target: 3, tolerance: 0.05, from: 2 },
        {
          code: 'S2-X3', kind: 'match',
          prompt: 'Sort each move by the size of its change.',
          bins: ['0.5', '1.0', '−0.5'],
          items: [
            { label: '2 → 2.5', bin: '0.5' },
            { label: '2 → 3', bin: '1.0' },
            { label: '2 → 1.5', bin: '−0.5' }
          ],
          successNote: 'Every one is new − old. The third runs the subtraction the other way, which is section 5 arriving early.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'Δ on its own',
      sources: [],
      readings: [
        { code: 'S3-A', text: 'Mathematicians write "the change in" using the Greek capital letter Δ, read "delta". On its own Δ is not a number. It does not multiply. It marks a subtraction: whatever follows it, new value minus old.' },
        { code: 'S3-B', text: 'That gap needs a name. Mathematicians write "the change in" using the Greek capital letter Δ, read "delta". On its own Δ is not a number, and it does not multiply. It is waiting for a variable to attach to.' }
      ],
      interactions: [
        {
          code: 'S3-I3', kind: 'delta-expand',
          note: 'Δx unfolds into the subtraction it stands for, live. Drag and the expansion recomputes, so Δ is seen doing something rather than being defined. Answers "how".'
        },
        {
          code: 'S3-I4', kind: 'delta-applied',
          note: 'The same Δ attached to a length, an area and a time, each with its own numbers. Answers "change in what", and shows the operation never varies while the quantity does.'
        },
        { code: 'S3-I1', kind: 'number-line', note: 'Retained but weak: the stage does not change at all in this section, so nothing on screen relates to what is being introduced.' },
        {
          code: 'S3-I2', kind: 'delta-facts',
          note: 'Rebuilt on founder note that the old card said almost nothing. Now states what Δ is not as firmly as what it is, since both misreadings, a number and a multiplier, are what the section exists to prevent.'
        }
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
          code: 'S3-X3', kind: 'match',
          prompt: 'Put each symbol with what it is.',
          bins: ['A word, written short', 'A symbol for a number', 'A fixed number'],
          items: [
            { label: 'Δ', bin: 'A word, written short' },
            { label: 'x', bin: 'A symbol for a number' },
            { label: '2', bin: 'A fixed number' }
          ],
          successNote: 'Three symbols, three different jobs. Only one of them has a value.'
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
        { code: 'S4-A', text: 'Attach Δ to x. Δx means the change in x, and you find it by subtracting: Δx = new − old. The same relation reads the other way round too: the new value is the old value plus the change, x + Δx.' },
        { code: 'S4-B', text: 'Now attach Δ to x. Δx is read "delta x" and means the change in x: Δx = new − old. Moving from 2 to 2.5 gives Δx = 0.5.' }
      ],
      interactions: [
        {
          code: 'S4-I3', kind: 'delta-rearrange',
          note: 'New. The same relation written both ways at once and both live: Δx = new − old, and new = old + Δx. That is exactly what the reading claims, shown rather than asserted.'
        },
        {
          code: 'S4-I4', kind: 'delta-token',
          note: 'New. Δx as one tile that refuses to be pulled apart, beside x which is its own tile. Attacks Δ times x by making the separation physically impossible rather than by denying it in words.'
        },
        { code: 'S4-I1', kind: 'number-line', note: 'Retained but repeated: this is S1, S2 and S3\'s stage again with a different strip.' },
        { code: 'S4-I2', kind: 'two-bars', bars: 3, note: 'Retained but repeated: identical to S2-I2 except for the label.' }
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
          code: 'S4-X3', kind: 'stepper',
          prompt: 'x starts at 2. Step the new value until Δx is 0.8.',
          target: 2.8, min: 1.2, max: 3, step: 0.1, start: 2, unit: '',
          successNote: 'Δx = 2.8 − 2 = 0.8. You had to run the subtraction backwards to know where to stop.'
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
        { code: 'S5-A', text: 'The bit added to x can be positive in one case and negative in another. Move the new value below 2 and the subtraction turns the other way. The sign records the direction of the move, not only its size.' },
        { code: 'S5-B', text: 'Δx can also be negative. Move the new value below 2 and the subtraction turns the other way. The sign records the direction of the move, not only its size.' }
      ],
      interactions: [
        {
          code: 'S5-I2', kind: 'signed-bar',
          note: 'Rebuilt to founder specification. Zero sits at the centre; the bar grows right in the accent colour for a positive change and left in red for a negative one, with the notation centred and recolouring with the sign. Direction becomes a place on the page rather than a minus sign to be noticed.'
        },
        { code: 'S5-I1', kind: 'number-line', note: 'Rejected by the founder, 2026-08-09. Kept only so the record shows it was considered.' }
      ],
      exercises: [
        { code: 'S5-X1', kind: 'set-control', prompt: 'Move the new value so that Δx becomes negative.', below: 2, from: 2.5 },
        {
          code: 'S5-X3', kind: 'match',
          prompt: 'Sort each move by the direction of its change.',
          bins: ['Δx positive', 'Δx negative'],
          items: [
            { label: '2 → 2.5', bin: 'Δx positive' },
            { label: '3 → 2.5', bin: 'Δx negative' },
            { label: '2 → 1.2', bin: 'Δx negative' },
            { label: '1.5 → 2', bin: 'Δx positive' }
          ],
          successNote: 'Direction is decided by which value is larger, not by which number looks bigger on the page.'
        },
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
