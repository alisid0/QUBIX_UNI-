// Factory options for BB3, built on the same principle the founder set for BB2:
// introduce each piece on its own before combining them. Here that is a second
// letter, then the tie that fixes it, then the naming, then paired movement.
//
// Thompson's ch. II Fig. 1 is the same square this course already draws, which
// means BB3's model is sourced rather than invented, and the 2x·dx term is
// where BB5's value of 4 comes from: 2x at x = 2.

export const selections = {
  'S1-A': '2026-08-09',
  'S1-I1': '2026-08-09',
  'S1-X1': '2026-08-09',
  'S1-X2': '2026-08-09',
  'S1-X3': '2026-08-09',
  // S2-B rewritten to founder note: a value is settled by a relationship
  // between two variables, not by a second choice.
  'S2-B': '2026-08-09',
  'S2-I1': '2026-08-09',
  'S2-I2': '2026-08-09',
  'S2-X1': '2026-08-09',
  'S2-X2': '2026-08-09',
  'S2-X3': '2026-08-09',
  'S2-X4': '2026-08-09',
  'S2-X5': '2026-08-09',
  // S3: exercises kept, reading and interaction replaced as repetitive.
  'S3-I3': '2026-08-09',
  'S3-X1': '2026-08-09',
  'S3-X2': '2026-08-09',
  'S3-X3': '2026-08-09',
  // S4 settled in full.
  'S4-A': '2026-08-09',
  'S4-I2': '2026-08-09',
  'S4-X1': '2026-08-09',
  'S4-X2': '2026-08-09',
  // Both workshops kept.
  'W1': '2026-08-09',
  'W2': '2026-08-09'
};

export const rejected = {
  'S2-I3': 'Founder, 2026-08-09: dropped. The three.js slab is not wanted here.',
  'S3-A': 'Founder, 2026-08-09: repeats S2.',
  'S3-B': 'Founder, 2026-08-09: repeats S2.',
  'S3-I1': 'Founder, 2026-08-09: repeats S2\'s stage.',
  'S3-I2': 'Founder, 2026-08-09: repeats S1\'s stage.'
};

export const finalised = {
  'S3-C': 'Written to replace the rejected readings: adds that working backwards is arithmetic you do, not control the square has.'
};

export const bb3 = {
  id: 'CME-CHANGE-003',
  title: 'A Second Letter, Tied to the First',

  workshops: [
    {
      code: 'W1',
      name: 'The square builder',
      kind: 'square-builder',
      blurb: 'Step the side and the square is drawn from it. The area is never set directly, only arrived at.',
      goals: [
        { id: 's1', text: 'Make the area exactly 9' },
        { id: 's2', text: 'Make the area larger than 20' },
        { id: 's3', text: 'Find a side where the area is smaller than the side' }
      ],
      note: 'The third goal is the reason to build this. Below a side of 1 the area falls under the side, which contradicts what everyone assumes about squares and cannot be met by guessing. It also needs a range wider than the lesson uses.'
    },
    {
      code: 'W2',
      name: 'The dependence tester',
      kind: 'dependence-tester',
      blurb: 'Two sets of buttons, one for x and one for y. Only one of them works, and finding out which is the exercise.',
      goals: [
        { id: 't1', text: 'Set x to 4 and watch y follow' },
        { id: 't2', text: 'Try to set y on its own' }
      ],
      note: 'Being told y is dependent is weak. Pressing a button that refuses is not. The refusal explains itself rather than just failing.'
    }
  ],

  fork: 'Pieces separately: y as a second letter, then the tie, then the naming, then paired movement.',
  structure: 'Four sections.',
  sections: [
    {
      code: 'S1',
      name: 'A second letter',
      sources: ['T2'],
      readings: [
        { code: 'S1-A', text: 'One letter was enough while there was one quantity to record. A square has two: the length of its side, and the area inside it. Call the side x and call the area y.' },
        { code: 'S1-B', text: 'Two quantities need two letters. Let x be the side of this square. Let y be its area. Both are letters, and each represents a number.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'two-labels', note: 'One square, x labelling the edge and y labelling the interior. The two letters are visibly measuring different things.' },
        { code: 'S1-I2', kind: 'two-cards', note: 'x and y as separate value cards beside the square, so they read as two quantities before any tie is drawn between them.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'In this square, what does y represent?',
          options: [
            { label: 'The area inside the square', correct: true },
            { label: 'The length of the side', feedback: 'That is x. y was given to the other quantity.' },
            { label: 'A second, unrelated number', feedback: 'y measures something about this same square.' }
          ]
        },
        {
          code: 'S1-X3', kind: 'match',
          prompt: 'Sort each description under the letter it belongs to.',
          bins: ['x', 'y'],
          items: [
            { label: 'the length of one side', bin: 'x' },
            { label: '2 cm', bin: 'x' },
            { label: 'the space inside', bin: 'y' },
            { label: '4 cm²', bin: 'y' }
          ],
          successNote: 'The units separate them as firmly as the words do: one is a length, the other an area.'
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'Why does this square need two letters?',
          options: [
            { label: 'It has two quantities worth recording', correct: true },
            { label: 'Because x was already used', feedback: 'Running out of letters is not the reason. There are two different things to measure.' },
            { label: 'Because the square can change size', feedback: 'A changing size is not why a second letter is needed. A fixed square still has both a side and an area.' }
          ]
        }
      ]
    },
    {
      code: 'S2',
      name: 'y is not free',
      sources: ['T2'],
      readings: [
        { code: 'S2-A', text: 'x and y are not both yours to choose. Assign a value to x and the area is already settled: y = x². Assign 2 to x and y is 4, whether you wanted it or not.' },
        {
          code: 'S2-B',
          text: 'A value may be assigned to x. No value may be assigned to y, because the square decides it. What settles y is not a second choice but a relationship between the two letters, and here that relationship is multiplying the side by itself: y = x². Once such a rule exists between two variables, only one of them is left free.'
        }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'locked-pair', note: 'Two cards, one with a control and one without. Only x can be assigned; y follows and is visibly not adjustable.' },
        {
          code: 'S2-I2', kind: 'machine', labelled: true,
          note: 'x in, x² out, with both ends now named rather than shown as bare figures: a learner should not have to work out which number is which. The tie is drawn as a step between the two rather than stated.'
        },
        {
          code: 'S2-I4', kind: 'variable-ticker',
          note: 'Founder-proposed scrolling relationship counter, amended 2026-08-16. Scroll or step x through whole-number assignments. The separate rule y = 2x + 1 avoids repeating the square already shown in S2-I1 and S2-I2; the y counter and substitution update together while only x remains adjustable. Unselected Factory candidate.'
        },
        {
          code: 'S2-I3', kind: 'square-3d',
          note: 'Rejected by the founder, 2026-08-09. A three.js slab, lit and inert, growing with x. Kept in the Factory as a candidate for a later board; a genuine cube belongs in BB7, where x³ arrives.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'x is assigned 3. What is y?',
          options: [
            { label: '9', correct: true },
            { label: '6', feedback: 'That is 3 added to itself. Area multiplies the side by itself.' },
            { label: '3', feedback: 'That is x again. y is the area.' }
          ]
        },
        { code: 'S2-X2', kind: 'set-control', prompt: 'Assign x so that y becomes 9.', target: 3, tolerance: 0.05, from: 2 },
        {
          code: 'S2-X3', kind: 'stepper',
          prompt: 'Step x until the area reaches 9.',
          target: 3, min: 1, max: 5, step: 0.5, start: 1.5, unit: '', derive: 'square',
          successNote: 'You never touched the area. You set the side, and the area was settled for you.'
        },
        {
          code: 'S2-X4', kind: 'match',
          prompt: 'Put each side with the area it produces.',
          bins: ['4', '9', '25'],
          items: [
            { label: 'x = 2', bin: '4' },
            { label: 'x = 3', bin: '9' },
            { label: 'x = 5', bin: '25' }
          ],
          successNote: 'One rule, applied three times. Nothing was chosen on the area side.'
        },
        {
          code: 'S2-X5', kind: 'choice',
          prompt: 'x doubles from 2 to 4. Does the area double as well?',
          options: [
            { label: 'No, it goes from 4 to 16', correct: true },
            { label: 'Yes, it goes from 4 to 8', feedback: 'The area is the side multiplied by itself, so doubling the side multiplies the area by four.' },
            { label: 'No, it goes from 4 to 6', feedback: '4 × 4 is 16. The relationship is a multiplication, not an addition.' }
          ],
          successNote: 'Doubling the side quadruples the area. A relationship between two variables need not treat them alike.',
          revealNote: '2² is 4 and 4² is 16, so the area multiplies by four when the side doubles.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'Independent and dependent',
      sources: ['T2'],
      readings: [
        {
          code: 'S3-C',
          text: 'Both names come from who does the choosing. You set x, so x is called the independent variable. y is settled by the rule, so y is called the dependent one. You can still work out a side from an area, but that is arithmetic done by you; the square itself never chooses its own side.'
        },
        { code: 'S3-A', text: 'Repetitive: says what S2 already said, with two names attached. The one you choose is called the independent variable. The one that follows is called the dependent variable.' },
        { code: 'S3-B', text: 'Repetitive: a change in one brings about a change in the other, because of this dependence. x is the independent variable. y is the dependent variable.' }
      ],
      interactions: [
        {
          code: 'S3-I3', kind: 'role-flow',
          note: 'The one-way arrow made visible as motion: change x and a pulse travels to y, never the other way. Direction is shown as something that happens rather than a label placed on a diagram.'
        },
        { code: 'S3-I1', kind: 'locked-pair', note: 'Repetitive: S2\'s exact stage with two words added.' },
        { code: 'S3-I2', kind: 'two-labels', note: 'Repetitive: S1\'s exact stage with two words added.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Which variable is the dependent one?',
          options: [
            { label: 'y, the area', correct: true },
            { label: 'x, the side', feedback: 'x is the one you assign. Nothing determines it for you.' },
            { label: 'Neither; they are equal partners', feedback: 'Only one of them can be chosen freely here.' }
          ]
        },
        {
          code: 'S3-X3', kind: 'order',
          prompt: 'Put these in the order they happen.',
          items: [
            'You assign a value to x',
            'The side takes that length',
            'The area is settled by the side',
            'y takes that value'
          ],
          successNote: 'Nothing in this chain runs backwards. That one-way direction is what independent and dependent mean.'
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'A square has area 25. What must its side be?',
          options: [
            { label: '5', correct: true },
            { label: '12.5', feedback: 'That halves the area. The side multiplied by itself must give 25.' },
            { label: '625', feedback: 'That squares the area instead of the side.' }
          ]
        }
      ]
    },
    {
      code: 'S4',
      name: 'Both move, by different amounts',
      sources: ['T3', 'T4', 'T5'],
      readings: [
        { code: 'S4-A', text: 'Alter x and y alters too. From 2 to 2.5 the side gains 0.5, but the area goes from 4 to 6.25, a gain of 2.25. Δx = 0.5 and Δy = 2.25. The two changes are not the same size.' },
        { code: 'S4-B', text: 'There is no reason for the bit added to y to match the bit added to x, and it almost never does. Widen the side by 0.5 and the area gains 2.25.' }
      ],
      interactions: [
        { code: 'S4-I1', kind: 'two-squares', note: 'Old and new square side by side, y inside and x on the edge, with Δx and Δy below. As built.' },
        { code: 'S4-I2', kind: 'growth-decomposition', note: 'Thompson Fig. 1: one square growing, with the added L-shaped region shaded and split into the two rectangles and the small corner square. Shows why the area gain outruns the side gain.' }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'The side gains 0.5 and the area gains 2.25. Why is the area gain bigger?',
          options: [
            { label: 'The new area adds a strip along two sides, not one length', correct: true },
            { label: 'Because 2.25 is 0.5 squared', feedback: '0.5 squared is 0.25, which is only the small corner. Most of the gain is the two strips.' },
            { label: 'Because area is always bigger than length', feedback: 'They are different kinds of quantity, so one is not simply bigger. The question is why the gain differs.' }
          ]
        },
        { code: 'S4-X2', kind: 'set-control', prompt: 'Assign x so that Δy is greater than 2.25.', above: 2.5, from: 2.1 },
        {
          code: 'S4-X3', kind: 'match',
          prompt: 'x moves from 2 to 2.5. Put each quantity with its value.',
          bins: ['0.5', '2.25', '2.5', '6.25'],
          items: [
            { label: 'Δx', bin: '0.5' },
            { label: 'Δy', bin: '2.25' },
            { label: 'the new x', bin: '2.5' },
            { label: 'the new y', bin: '6.25' }
          ],
          successNote: 'Four numbers from one move. Telling the changes apart from the values is most of the work in BB4.'
        }
      ]
    }
  ]
};
