// Factory options for "Area on the Grid", the first board of the proposed
// Functions and Coordinate Geometry pilot.
//
// Numbering is deliberately absent. The proposal that places this board has not
// been approved, and the existing BB6 to BB12 would need renumbering if it were,
// so this carries an identifier and no board number until the map is settled.
//
// Designed with the founder in session on 2026-08-09. One object carries the
// whole board: a single rectangle on a grid, grown, counted, then pulled square.
// Nothing is replaced between sections.
//
// Wentworth's scholium only holds when the sides are whole numbers of units, so
// the grid snaps to whole units. That is the source's own caveat, not a
// simplification, and it leaves a real door open: BB3 has used x = 2.5 for three
// boards, and a learner who notices they cannot count 2.5 by 2.5 has found
// something rather than hit a bug.

export const selections = {
  'S1-I1': '2026-08-09',
  'S1-X1': '2026-08-09',
  'S1-X2': '2026-08-09',
  'S2-I1': '2026-08-09',
  'S2-X1': '2026-08-09',
  'S2-X2': '2026-08-09',
  // S3-B rewritten to founder dictation: count along the base, count up the
  // altitude, multiply the two.
  'S3-B': '2026-08-09',
  'S3-X1': '2026-08-09',
  'S3-X2': '2026-08-09',
  'S3-X3': '2026-08-09',
  // Section 4 settled in full: the reading, the stage and all three checks.
  'S4-A': '2026-08-09',
  'S4-I1': '2026-08-09',
  'S4-X1': '2026-08-09',
  'S4-X2': '2026-08-09',
  'S4-X3': '2026-08-09',
  'W1': '2026-08-09'
};
export const finalised = {};
export const rejected = {};
export const gated = 'Belongs to a proposed pilot that has not been approved. See PILOT-PROPOSAL-FUNCTIONS-AND-COORDINATE-GEOMETRY.md.';

export const area = {
  id: 'FCG-AREA-001',
  title: 'Area on the Grid',
  fork: 'Area is counted before it is calculated. The formula arrives as confirmation.',
  structure: 'Four sections, one object throughout.',
  sections: [
    {
      code: 'S1',
      name: 'The unit of surface',
      sources: ['G1', 'G2'],
      readings: [
        {
          code: 'S1-A',
          text: 'Before anything can be measured, there has to be something to measure with. For surfaces that something is a square, one unit long on every side. It is called the unit of surface, and everything from here is counted in these.'
        },
        {
          code: 'S1-B',
          text: 'A length is measured against a unit of length. A surface is measured against a unit of surface: a square whose side is one unit. The area of a surface is simply how many of these it contains.'
        }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'unit-square', note: 'One square, its sides marked 1, and nothing else on screen. It does not move, and it is not supposed to: a unit that could be any size would measure nothing. The whole board is counted in this shape.' },
        {
          code: 'S1-I2', kind: 'unit-square-fixed',
          note: 'The same square, but it invites you to resize it and then refuses, saying why. Founder asked why the square does not move; this makes the answer something felt rather than something asserted, using the refusal pattern already proven in BB3.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'What is a unit of surface?',
          options: [
            { label: 'A square one unit long on every side', correct: true },
            { label: 'A line one unit long', feedback: 'That is a unit of length. A surface needs a shape, not a line.' },
            { label: 'Any square of any size', feedback: 'Its side has to be one unit, or counting them would measure nothing in particular.' }
          ],
          successNote: 'Correct. One square, one unit each way, and everything else is counted in it.',
          revealNote: 'The unit of surface is a square whose side is one unit of length.'
        },
        {
          code: 'S1-X2', kind: 'match',
          prompt: 'Sort each into what it measures.',
          bins: ['Measures length', 'Measures surface'],
          items: [
            { label: 'a line 1 unit long', bin: 'Measures length' },
            { label: 'a square 1 unit each side', bin: 'Measures surface' },
            { label: '5 cm', bin: 'Measures length' },
            { label: '5 cm²', bin: 'Measures surface' }
          ],
          successNote: 'A length is measured against a length, a surface against a surface. The little raised two is doing that work.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'Area is a count',
      sources: ['G2'],
      readings: [
        {
          code: 'S2-A',
          text: 'Pull the corner and the shape fills with unit squares. Its area is not a formula to be applied. It is the number of squares inside it, and you can count them.'
        },
        {
          code: 'S2-B',
          text: 'The area of a surface is the number of units of surface it contains. Nothing more is meant by the word. Drag the corner and watch the count rise as more squares fit inside.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'count-grid', snap: true, showProduct: false,
          note: 'Drag the corner out from the origin and the unit squares fill in, counting live. The product is deliberately withheld here: counting has to come first, or the formula is just asserted again.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'What does the area of a shape mean?',
          options: [
            { label: 'How many unit squares fit inside it', correct: true },
            { label: 'How long its sides are', feedback: 'That is its lengths. Area is about what is inside, not the edges.' },
            { label: 'A formula you apply to the sides', feedback: 'A formula is a shortcut to the count. The count is the meaning.' }
          ],
          successNote: 'Correct. The formula comes later and only because it agrees with counting.',
          revealNote: 'Area is the number of units of surface a shape contains.'
        },
        { code: 'S2-X2', kind: 'set-grid', prompt: 'Build a shape holding exactly 12 squares.', targetArea: 12 }
      ]
    },
    {
      code: 'S3',
      name: 'Counting and multiplying agree',
      sources: ['G3', 'G4'],
      readings: [
        {
          code: 'S3-A',
          text: 'Seven along the base and four up the side gives twenty-eight squares. You can count them one by one, or notice there are four rows of seven. The area of a rectangle is its base multiplied by its altitude, and it is only a shortcut for the counting you have already done.'
        },
        {
          code: 'S3-B',
          text: 'It would take a long time to count twenty-eight squares one by one. There is a shorter way. Count the squares along the base, count the squares up the altitude, and multiply those two numbers together. That is all the rule base times altitude asks you to do.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'count-grid', snap: true, showProduct: true,
          note: 'The same shape, with the product now shown beside the count so the learner can watch the two agree at every size. Same object as S2, one thing added.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Seven along the base, four up the side. How many unit squares?',
          options: [
            { label: '28', correct: true },
            { label: '11', feedback: 'That adds the sides. Adding gives a length, not a count of squares.' },
            { label: '14', feedback: 'That is two rows of seven. There are four rows.' }
          ],
          successNote: 'Four rows of seven. Counting and multiplying give the same answer because they are the same operation.',
          revealNote: 'Four rows with seven squares in each is twenty-eight.'
        },
        { code: 'S3-X2', kind: 'set-grid', prompt: 'Build a shape whose base is 6 and whose area is 18.', targetArea: 18, requireBase: 6 },
        {
          code: 'S3-X3', kind: 'choice',
          prompt: 'Why does multiplying the sides give the number of squares?',
          options: [
            { label: 'The squares sit in rows, and each row holds the same number', correct: true },
            { label: 'Because that is the formula for area', feedback: 'The formula is what we are trying to explain, so it cannot be the explanation.' },
            { label: 'Because area is always bigger than length', feedback: 'Size is not the reason. The reason is that the squares are arranged in equal rows.' }
          ],
          successNote: 'Rows of equal length is exactly what multiplication counts.',
          revealNote: 'Multiplication counts equal rows, and that is how the squares are arranged.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'A square is the special case',
      sources: ['G3'],
      readings: [
        {
          code: 'S4-A',
          text: 'Pull the shape until its base and its altitude are the same. It is now a square, and its area is a side multiplied by itself. That is written x², and it is what y has meant since the board where a square first appeared.'
        },
        {
          code: 'S4-B',
          text: 'A square is a rectangle whose sides agree. Base times altitude becomes side times side, which is written x². Nothing new has happened; the general rule has simply been given equal sides.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'count-grid', snap: true, showProduct: true, requireSquare: true,
          note: 'The same object again, with a marker that appears when base and altitude agree. Continuity is the argument here: one shape has carried the whole board, and the square is what it becomes rather than a new figure introduced to make a point.'
        }
      ],
      exercises: [
        { code: 'S4-X1', kind: 'set-grid', prompt: 'Make a square holding 16 squares.', targetArea: 16, requireSquare: true },
        {
          code: 'S4-X2', kind: 'choice',
          prompt: 'A square has a side of 5. What is its area?',
          options: [
            { label: '25', correct: true },
            { label: '10', feedback: 'That adds the sides, or doubles one. Area counts squares, so it multiplies.' },
            { label: '20', feedback: 'That is four fives. A square of side 5 has five rows of five.' }
          ],
          successNote: 'Five rows of five. Written x², with x standing for the side.',
          revealNote: '5 × 5 = 25, which is why a side times itself is written x².'
        },
        {
          code: 'S4-X3', kind: 'choice',
          prompt: 'Why is a side multiplied by itself written x² rather than 2x?',
          options: [
            { label: '2x is the side counted twice; x² is x rows of x', correct: true },
            { label: 'They mean the same thing', feedback: 'For a side of 5 they give 10 and 25. Only one of them counts the squares.' },
            { label: 'x² is just shorter to write', feedback: 'They are different quantities, not two spellings of one.' }
          ],
          successNote: 'One adds a length to itself; the other fills a surface. This is the commonest mistake in the whole subject.',
          revealNote: '2x doubles a length. x² counts x rows of x squares.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The tiling bench',
      kind: 'tiling-bench',
      blurb: 'A target area, and a grid to reach it on. Several rectangles will do; not every target will make a square.',
      goals: [
        { id: 'a1', text: 'Reach an area of 24 three different ways' },
        { id: 'a2', text: 'Make one of them a square' },
        { id: 'a3', text: 'Change the target so that a square is possible' }
      ],
      note: 'The second goal cannot be met and is left unmarked. 24 gives 1×24, 2×12, 3×8 and 4×6, and no square. The learner has to fail at it before the third goal offers the way out. Perfect squares met as an obstacle rather than as a definition, and square roots quietly planted for later.'
    }
  ]
};
