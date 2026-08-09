// Factory options for BB3, built on the same principle the founder set for BB2:
// introduce each piece on its own before combining them. Here that is a second
// letter, then the tie that fixes it, then the naming, then paired movement.
//
// Thompson's ch. II Fig. 1 is the same square this course already draws, which
// means BB3's model is sourced rather than invented, and the 2x·dx term is
// where BB5's value of 4 comes from: 2x at x = 2.

export const selections = {};
export const finalised = {};

export const bb3 = {
  id: 'CME-CHANGE-003',
  title: 'Dependent Variables',
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
        { code: 'S2-B', text: 'A value may be assigned to x. No value may be assigned to y, because the square decides it. Multiplying the side by itself gives the area: y = x².' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'locked-pair', note: 'Two cards, one with a control and one without. Only x can be assigned; y follows and is visibly not adjustable.' },
        { code: 'S2-I2', kind: 'machine', note: 'x in, x² out. The tie is drawn as a step between the two rather than stated.' }
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
        { code: 'S2-X2', kind: 'set-control', prompt: 'Assign x so that y becomes 9.', target: 3, tolerance: 0.05, from: 2 }
      ]
    },
    {
      code: 'S3',
      name: 'Independent and dependent',
      sources: ['T2'],
      readings: [
        { code: 'S3-A', text: 'The one you choose is called the independent variable. The one that follows is called the dependent variable. Here x is independent and y depends on it.' },
        { code: 'S3-B', text: 'A change in one brings about a change in the other, because of this dependence. x is the independent variable. y is the dependent variable.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'locked-pair', note: 'Same pair as S2, now labelled independent and dependent.' },
        { code: 'S3-I2', kind: 'two-labels', note: 'The square again, with the two roles named on the figure itself.' }
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
        { code: 'S4-X2', kind: 'set-control', prompt: 'Assign x so that Δy is greater than 2.25.', above: 2.5, from: 2.1 }
      ]
    }
  ]
};
