// Factory options for BB1, cut for fork F-2 (assignment, Wentworth-led) and
// structure ST-B (four sections). Authoring material for founder selection.
// Nothing here is approved, and nothing here is what the Viewer currently shows.

// Founder selections, by variant code. A code listed here is chosen and will be
// written into the record. Everything else is still a candidate.
//
// Founder pass of 2026-08-09 settled every slot but one: S1-I1, all of S1's
// checks, S2-I2, all of S2's checks, S3-B, all of S3's and S4's checks, and both
// workshops. The readings S1-A, S2-B and S4-A and the interaction S4-I1 had
// already been chosen earlier the same day.
export const selections = {
  'S1-A': '2026-08-09',
  'S1-I1': '2026-08-09',
  'S1-X1': '2026-08-09',
  'S1-X2': '2026-08-09',
  'S1-X3': '2026-08-09',
  'S2-B': '2026-08-09',
  'S2-I2': '2026-08-09',
  'S2-X1': '2026-08-09',
  'S2-X2': '2026-08-09',
  'S2-X3': '2026-08-09',
  'S3-B': '2026-08-09',
  'S3-X1': '2026-08-09',
  'S3-X2': '2026-08-09',
  'S3-X3': '2026-08-09',
  'S4-A': '2026-08-09',
  'S4-I1': '2026-08-09',
  'S4-X1': '2026-08-09',
  'S4-X2': '2026-08-09',
  'S4-X3': '2026-08-09',
  // Both kept, deliberately. The bench and the statement match are different
  // sizes of the same idea and the founder wanted to compare them in place.
  'W1': '2026-08-09',
  'W2': '2026-08-09'
};

// The one slot the founder's pass did not reach. Section 3 got a reading and all
// three checks but no interaction, so this still stands on my judgement under the
// standing no-repeat instruction. Reversible.
export const finalised = {
  'S3-I1': 'not chosen by the founder: section 3 was settled except for its interaction. Kept because it is the only variant that leaves the replaced value visible, which is the section\'s whole subject.'
};

export const rejected = {
  'S1-B': 'Not selected; S1-A is the shorter statement of the same contrast.',
  'S1-C': 'Not selected; S1-A carries the source\'s own list of figures.',
  'S1-I2': 'Not selected; S1-I1 kept. The sorter would repeat the match check S1-X3 immediately below it.',
  'S2-A': 'Not selected; S2-B states the assignment without a preamble.',
  'S2-C': 'Not selected; S2-B avoids the phrase "general symbol", which S1-X2 already tests.',
  'S2-I1': 'Not selected; S2-I2 kept, which reads symbol and value as two things rather than one card.',
  'S3-A': 'Superseded. I had finalised this for carrying Wentworth\'s own phrase; the founder chose S3-B on 2026-08-09.',
  'S3-I2': 'Not selected; it is the S2 card again with no ghost, so a replacement is hard to notice.',
  'S4-B': 'Not selected; S4-A names the unit, which S4-X1 and S4-X3 both depend on.',
  'S4-I2': 'Not selected; S4-I1 kept. The ghost outline is S3-I1\'s device and would repeat it.'
};

export const bb1 = {
  id: 'CME-CHANGE-001',
  title: 'A Letter for a Number',

  // A workshop is larger than a section check: several objects on one screen and
  // a short list of goals, so the learner works rather than answers. Adapted from
  // W2, not copied: the source states the idea, the bench makes you do it.
  workshops: [
    {
      code: 'W1',
      name: 'The assignment bench',
      kind: 'assignment-bench',
      blurb: 'Three letters and a tray of numbers. Drop a number onto a letter and the letter represents it until you change your mind.',
      letters: ['x', 'y', 'z'],
      values: [0, 1, 2, 3, 5, 7],
      goals: [
        { id: 'g1', text: 'Make x represent 7' },
        { id: 'g2', text: 'Give y a different value from x' },
        { id: 'g3', text: 'Clear z so it represents nothing again' }
      ],
      note: 'Goal 3 is the one worth having. It shows a letter can go back to being general, which no multiple-choice question makes you feel.'
    },
    {
      code: 'W2',
      name: 'Match the statement',
      kind: 'statement-match',
      blurb: 'Pair each written statement with what it means in words. Tests reading of notation rather than arithmetic.',
      pairs: [
        { left: 'x = 2', right: 'The value 2 is assigned to x' },
        { left: '2', right: 'A figure, always the same number' },
        { left: 'x', right: 'A letter, no value assigned yet' }
      ],
      note: 'Smaller than the bench and closer to a check. Worth comparing before deciding what a workshop should be.'
    }
  ],

  fork: 'F-2 — assignment, Wentworth-led. Movement is deferred to BB2.',
  structure: 'ST-B — four sections.',
  sections: [
    {
      code: 'S1',
      name: 'Figures and letters',
      sources: ['W1', 'W2'],
      readings: [
        {
          code: 'S1-A',
          text: 'Arithmetic uses figures to represent numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0. Algebra uses the letters of the alphabet as well.'
        },
        {
          code: 'S1-B',
          text: 'Numbers are written with figures: 1, 2, 3. Algebra also writes numbers with letters: x, y, z. A figure always represents the same number. A letter does not.'
        },
        {
          code: 'S1-C',
          text: 'In arithmetic a number is written with figures. In algebra it may also be written with a letter. The figures are the ten symbols 1 to 9 and 0. The letters are the ordinary letters of the alphabet.'
        }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'figures-letters', note: 'Two rows. Figures show their value at once; letters stay blank until assigned.' },
        { code: 'S1-I2', kind: 'sorter', note: 'Click each chip to file it as fixed or able to vary. The definition becomes something you do.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'Which of these always stands for the same number?',
          options: [
            { label: '7', correct: true },
            { label: 'x', feedback: 'A letter has no fixed value until one is assigned to it.' },
            { label: 'y', feedback: 'A letter has no fixed value until one is assigned to it.' }
          ]
        },
        {
          code: 'S1-X3', kind: 'match',
          prompt: 'Put each symbol where it belongs.',
          bins: ['Figure', 'Letter'],
          items: [
            { label: '7', bin: 'Figure' },
            { label: '0', bin: 'Figure' },
            { label: 'x', bin: 'Letter' },
            { label: 'n', bin: 'Letter' }
          ],
          successNote: 'Figures are the ten symbols of arithmetic. Letters are what algebra adds.'
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'A letter is called a general symbol. What does general mean here?',
          options: [
            { label: 'Any particular value may be assigned to it', correct: true },
            { label: 'It is always unknown', feedback: 'It is not unknown once you assign it. Before that it is simply uncommitted.' },
            { label: 'It stands for a large number', feedback: 'Size has nothing to do with it.' }
          ]
        }
      ]
    },
    {
      code: 'S2',
      name: 'A letter stands for a number',
      sources: ['W2'],
      readings: [
        {
          code: 'S2-A',
          text: 'A letter represents a number. Which number it represents is not fixed by the letter itself. It is assigned. Here the value 2 has been assigned to x, and this is written x = 2.'
        },
        {
          code: 'S2-B',
          text: 'Write x = 2. This assigns the number 2 to the letter x. In this lesson x now represents 2.'
        },
        {
          code: 'S2-C',
          text: 'A letter is a general symbol for a number. It is general because no particular value belongs to it until one is assigned. Assign 2 to x and write x = 2.'
        }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'value-card', note: 'A card reading x = 2, with the slider that assigns the value. No geometry yet.' },
        { code: 'S2-I2', kind: 'symbol-value-pair', note: 'Symbol and value as two separate cards joined by a line, so they read as distinct things.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'x has been assigned the value 5. What does x stand for?',
          options: [
            { label: 'The number 5', correct: true },
            { label: 'The letter x', feedback: 'x is how we write it. The question is what it stands for.' },
            { label: 'Any number at all', feedback: 'That was true before a value was assigned. It is not true now.' }
          ]
        },
        { code: 'S2-X2', kind: 'set-control', prompt: 'Assign x the value 3.', target: 3, tolerance: 0.05 },
        {
          code: 'S2-X3', kind: 'stepper',
          prompt: 'Step the value up until x represents 5.',
          target: 5, min: 0, max: 9, step: 1, start: 2, unit: '',
          successNote: 'x now represents 5. The letter did not change while you were stepping.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'Any particular value may be assigned',
      sources: ['W2'],
      readings: [
        {
          code: 'S3-A',
          text: 'Any particular value may be assigned to a letter. Assign 3 to x and x represents 3. Assign 1.5 and x represents 1.5. The letter is not altered by this.'
        },
        {
          code: 'S3-B',
          text: 'x is not fixed at 2. A different value may be assigned to it. The letter written on the page stays the same. The number assigned to it does not.'
        }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'assign-slider', note: 'Slider plus card, with the previous assignment left behind as a ghost so a replacement is visible.' },
        { code: 'S3-I2', kind: 'value-card', note: 'Same card as S2, no ghost. Simpler, but a replacement is harder to notice.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'x is assigned 2, then assigned 3. What changed?',
          options: [
            { label: 'The value assigned to x', correct: true },
            { label: 'The symbol changed from x to another letter', feedback: 'The letter is written the same way both times.' },
            { label: 'The number 2 became a letter', feedback: '2 is a figure. It always stands for the same number.' }
          ]
        },
        { code: 'S3-X2', kind: 'set-control', prompt: 'x is at 2. Assign it the value 3 instead.', target: 3, tolerance: 0.05 },
        {
          code: 'S3-X3', kind: 'order',
          prompt: 'Put an assignment in the order it happens.',
          items: [
            'Choose a letter: x',
            'Choose a number: 5',
            'Write x = 5',
            'x now represents 5'
          ],
          successNote: 'The letter comes first and is never altered. Only the number attached to it is chosen.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'A letter can label a quantity',
      sources: ['W2'],
      readings: [
        {
          code: 'S4-A',
          text: 'A letter may represent a measured quantity. Let x be the length of the side of this square, in centimetres. The square is drawn at whatever value is assigned to x.'
        },
        {
          code: 'S4-B',
          text: 'So far x has represented a bare number. It may also represent a measurement. Let x be the side of this square in centimetres.'
        }
      ],
      interactions: [
        { code: 'S4-I1', kind: 'square-edge', note: 'Square with x labelling the edge, as built. Growth rescaled so 3.5 no longer hits the cap.' },
        { code: 'S4-I2', kind: 'square-ghost', note: 'Same, with the previous size outlined behind it.' }
      ],
      exercises: [
        { code: 'S4-X1', kind: 'set-control', prompt: 'Assign x the value that makes each side 3.0 cm.', target: 3, tolerance: 0.05 },
        {
          code: 'S4-X3', kind: 'stepper',
          prompt: 'Step x up until each side of the square is 3.0 cm.',
          target: 3, min: 1.5, max: 3.5, step: 0.1, start: 2, unit: 'cm',
          successNote: 'The square follows the value you assigned. Nothing about the letter changed.'
        },
        {
          code: 'S4-X2', kind: 'choice',
          prompt: 'The square is drawn larger than before. What did you change?',
          options: [
            { label: 'The value assigned to x', correct: true },
            { label: 'The square itself', feedback: 'The square only follows. You changed the number it was drawn from.' },
            { label: 'The letter x', feedback: 'The letter is the one thing that stayed the same.' }
          ]
        }
      ]
    }
  ]
};
