// The lesson content, lifted out of ChangeLab so the Home page can read
// progress against it without keeping a second copy of the section counts.
// This is the array the record-driven pipeline is meant to replace: each
// board should eventually be built from its BB record rather than declared here.

export const boards = [
    {
      id: 'CME-CHANGE-001',
      title: 'Assigning Values to Letters',
      marker: 'Variables',
      floors: [
        {
          text: 'Arithmetic uses figures to represent numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0. Algebra uses the letters of the alphabet as well.',
          exercise: {
            kind: 'choice',
            prompt: 'Which of these always stands for the same number?',
            options: [
              { label: '7', correct: true },
              { label: 'x', feedback: 'A letter has no fixed value until one is assigned to it.' },
              { label: 'y', feedback: 'A letter has no fixed value until one is assigned to it.' }
            ],
            successNote: 'Correct. A figure always represents the same number. A letter does not.',
            revealNote: '7 is a figure, so it always represents the same number. x and y are letters.'
          }
        },
        {
          text: 'Write x = 2. This assigns the number 2 to the letter x. In this lesson x now represents 2.',
          exercise: {
            kind: 'choice',
            prompt: 'x has been assigned the value 5. What does x stand for?',
            options: [
              { label: 'The number 5', correct: true },
              { label: 'The letter x', feedback: 'x is how it is written. The question is what it stands for.' },
              { label: 'Any number at all', feedback: 'That was true before a value was assigned. It is not true now.' }
            ],
            successNote: 'Correct. Once 5 is assigned to x, x represents 5.',
            revealNote: 'x stands for the number assigned to it, which here is 5.'
          }
        },
        {
          text: 'Any particular value may be assigned to a letter. Assign 3 to x and x represents 3. Assign 1.5 and x represents 1.5. The letter is not altered by this.',
          exercise: {
            kind: 'choice',
            visual: 'symbol-value',
            prompt: 'x is assigned 2, then assigned 3. What changed?',
            options: [
              { label: 'The value assigned to x', correct: true },
              { label: 'The symbol changed from x to another letter', feedback: 'The letter is written the same way both times.' },
              { label: 'The number 2 became a letter', feedback: '2 is a figure. It always represents the same number.' }
            ],
            successNote: 'Correct. The letter stayed x. The number assigned to it was replaced.',
            revealNote: 'x is the letter in both statements. The value assigned to it was replaced.'
          }
        },
        {
          text: 'A letter may represent a measured quantity. Let x be the length of the side of this square, in centimetres. The square is drawn at whatever value is assigned to x.',
          exercise: {
            kind: 'set-control',
            prompt: 'Assign x the value that makes each side 3.0 cm.',
            target: 3,
            tolerance: 0.05,
            from: 2,
            successNote: 'x = 3.0 cm. The square is drawn from the value assigned to x.'
          }
        }
      ]
    },
    {
      id: 'CME-CHANGE-002',
      title: 'Change in a Variable',
      marker: 'Change',
      floors: [
        {
          // BB2 sections 1 to 3 are founder-selected, 2026-08-09.
          text: 'Quantities come in two kinds. Some hold a fixed value and are called constants. Others are able to grow or shrink, and those are called variables. x is a variable. Here it sits at 2. Move it and x takes a new value, while the symbol stays x.',
          exercises: [
            {
              kind: 'stepper',
              prompt: 'Step x up to 2.5.',
              target: 2.5, min: 1.2, max: 3, step: 0.1, start: 2, unit: '',
              successNote: 'One symbol, a second value. Stepping makes the two values feel separate in a way that sliding does not.'
            },
            {
              kind: 'choice',
              prompt: 'Which of these is a constant?',
              options: [
                { label: '2', correct: true },
                { label: 'x', feedback: 'x has just taken a second value, so it is not of fixed value.' },
                { label: 'The value of x', feedback: 'That is the thing which changed.' }
              ],
              successNote: 'Correct. 2 always represents the same number, so it is a constant.',
              revealNote: '2 is the constant. x is the variable, and its value is what moved.'
            }
          ]
        },
        {
          text: 'Think of the move as a bit added to x. That bit is a quantity in its own right, and you find its size by subtracting: new − old. From 2 to 2.5 the bit is 0.5.',
          exercises: [
            {
              kind: 'choice',
              prompt: 'x moves from 2 to 2.75. How big is the change?',
              options: [
                { label: '0.75', correct: true },
                { label: '2.75', feedback: '2.75 is where x ended up, not how far it travelled.' },
                { label: '4.75', feedback: 'Adding gives the wrong quantity. The gap is a subtraction: new − old.' }
              ],
              successNote: 'Correct. 2.75 − 2 = 0.75. The change is a quantity in its own right.',
              revealNote: 'The change is new − old, so 2.75 − 2 = 0.75.'
            },
            {
              kind: 'set-control',
              prompt: 'Move x so that the change is exactly 1.0.',
              target: 3, tolerance: 0.05, from: 2,
              successNote: '3 − 2 = 1. You had to run the subtraction backwards to know where to stop.'
            },
            {
              kind: 'match',
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
          text: 'Mathematicians write “the change in” using the Greek capital letter Δ, read “delta”. On its own Δ is not a number. It does not multiply. It marks a subtraction: whatever follows it, new value minus old.',
          exercises: [
            {
              kind: 'choice',
              prompt: 'On its own, what does Δ mean?',
              options: [
                { label: 'The change in', correct: true },
                { label: 'Multiply by delta', feedback: 'Δ is not a quantity, so there is nothing to multiply by. It is a word, written short.' },
                { label: 'A very small amount', feedback: 'Δ says nothing about size. A change can be large or small.' }
              ],
              successNote: 'Correct. Δ is shorthand for the words “the change in”.',
              revealNote: 'Δ is shorthand for “the change in”. It is a word, not a number.'
            },
            {
              kind: 'choice',
              prompt: 'Which is true of Δ?',
              options: [
                { label: 'It is a word, written short', correct: true },
                { label: 'It is a number close to zero', feedback: 'It has no value at all on its own.' },
                { label: 'It is an instruction to multiply', feedback: 'Nothing is multiplied. Δ marks a subtraction on whatever follows it.' }
              ],
              successNote: 'Correct. It carries no value of its own.',
              revealNote: 'Δ is a word written short. Only what follows it has a value.'
            },
            {
              kind: 'match',
              prompt: 'Put each symbol with what it is.',
              bins: ['A word, written short', 'A symbol for a number', 'A fixed number'],
              items: [
                { label: 'Δ', bin: 'A word, written short' },
                { label: 'x', bin: 'A symbol for a number' },
                { label: '2', bin: 'A fixed number' }
              ],
              successNote: 'Three symbols, three different jobs. Only one of them has a value.'
            }
          ]
        },
        {
          text: 'Now attach Δ to x. Δx is read “delta x” and means the change in x: Δx = new − old. Moving from 2 to 2.5 gives Δx = 0.5.',
          exercise: {
            kind: 'choice',
            prompt: 'What does Δx mean?',
            options: [
              { label: 'The change in x', correct: true },
              { label: 'Δ multiplied by x', feedback: 'Δ is not a number, so it cannot multiply anything. Δ and x are read together as one name.' },
              { label: 'A new variable, separate from x', feedback: 'Δx is not independent. It measures how far this same x has moved.' }
            ],
            successNote: 'Correct. Δx is one name meaning the change in x.',
            revealNote: 'Δx is read as one thing: the change in x. Δ never multiplies.'
          }
        },
        {
          text: 'Δx can also be negative. Move the new value below 2 and the subtraction turns the other way. The sign records the direction of the move, not only its size.',
          exercise: {
            kind: 'set-control',
            prompt: 'Move the new value so that Δx becomes negative.',
            below: 2,
            from: 2.5,
            successNote: 'Δx is now negative. x decreased, and the minus sign is what records that.'
          }
        }
      ]
    },
    {
      id: 'CME-CHANGE-003',
      title: 'Dependent Variables',
      marker: 'Functions',
      floors: [
        {
          text: 'One letter was enough while there was one quantity to record. A square has two: the length of its side, and the area inside it. Call the side x and call the area y.',
          exercise: {
            kind: 'choice',
            prompt: 'In this square, what does y represent?',
            options: [
              { label: 'The area inside the square', correct: true },
              { label: 'The length of the side', feedback: 'That is x. y was given to the other quantity.' },
              { label: 'A second, unrelated number', feedback: 'y measures something about this same square.' }
            ],
            successNote: 'Correct. x measures the side, y measures the area inside.',
            revealNote: 'x is the side. y is the area, which is why it is written inside the square.'
          }
        },
        {
          text: 'x and y are not both yours to choose. Assign a value to x and the area is already settled: y = x². Assign 2 to x and y is 4, whether you wanted it or not.',
          exercise: {
            kind: 'set-control',
            prompt: 'Assign x so that y becomes 9.',
            target: 3,
            tolerance: 0.05,
            from: 2.1,
            successNote: 'x = 3 gives y = 9. You set x; the square settled y.'
          }
        },
        {
          text: 'The one you choose is called the independent variable. The one that follows is called the dependent variable. Here x is independent and y depends on it.',
          exercise: {
            kind: 'choice',
            prompt: 'Which variable is the dependent one?',
            options: [
              { label: 'y, the area', correct: true },
              { label: 'x, the side', feedback: 'x is the one you assign. Nothing determines it for you.' },
              { label: 'Neither; they are equal partners', feedback: 'Only one of them can be chosen freely here.' }
            ],
            successNote: 'Correct. y depends on x, so y is the dependent variable.',
            revealNote: 'x is independent because you assign it. y is dependent because the square settles it.'
          }
        },
        {
          text: 'Alter x and y alters too. From 2 to 2.5 the side gains 0.5, but the area goes from 4 to 6.25, a gain of 2.25. Δx = 0.5 and Δy = 2.25. The two changes are not the same size.',
          exercise: {
            kind: 'choice',
            prompt: 'The side gains 0.5 and the area gains 2.25. Why is the area gain bigger?',
            options: [
              { label: 'The new area adds a strip along two sides, not one length', correct: true },
              { label: 'Because 2.25 is 0.5 squared', feedback: '0.5 squared is 0.25, which is only the small corner. Most of the gain is the two strips.' },
              { label: 'Because area is always bigger than length', feedback: 'They are different kinds of quantity, so one is not simply bigger. The question is why the gains differ.' }
            ],
            successNote: 'Correct. Widening the side adds a strip down two sides plus a small corner.',
            revealNote: 'The area gain is two strips plus a corner, which is why it outruns the side gain.'
          }
        }
      ]
    },
    {
      id: 'CME-CHANGE-004',
      title: 'Average Rate of Change',
      marker: 'Rate of change',
      floors: [
        {
          text: 'Widen the side and two things change at once. The side gains Δx. The area gains Δy. There is no reason for the two to come out the same size, and they almost never do.',
          exercise: {
            kind: 'set-control',
            prompt: 'Widen the side until the area gain passes 3 cm².',
            above: 2.7,
            from: 2.1,
            successNote: 'The area gain has passed 3 cm² while the side gain is still well under 1 cm.'
          }
        },
        {
          text: 'To compare the two changes, divide one by the other: Δy/Δx. From 2 to 2.5 that is 2.25 ÷ 0.5 = 4.5. The area grew four and a half times as fast as the side.',
          exercise: {
            kind: 'choice',
            prompt: 'Δy is 2.25 and Δx is 0.5. What is Δy/Δx?',
            options: [
              { label: '4.5', correct: true },
              { label: '1.125', feedback: 'That multiplies instead of dividing.' },
              { label: '2.75', feedback: 'That adds the two changes. The comparison is a division.' }
            ],
            successNote: 'Correct. 2.25 ÷ 0.5 = 4.5.',
            revealNote: 'Dividing the area change by the side change gives 2.25 ÷ 0.5 = 4.5.'
          }
        },
        {
          text: 'The units survive the division: cm² divided by cm leaves cm² per cm. That is why 4.5 is a rate and not an area. A rate has no shape and no size of its own; it is a comparison.',
          exercise: {
            kind: 'choice',
            prompt: 'Why is 4.5 measured in cm² per cm rather than cm²?',
            options: [
              { label: 'It compares an area change with a length change', correct: true },
              { label: 'Because the square is measured in centimetres', feedback: 'The unit comes from the division, not from the square.' },
              { label: 'It should be cm²; the extra unit is a slip', feedback: 'The unit is real. Dividing cm² by cm cannot leave cm².' }
            ],
            successNote: 'Correct. A rate carries the units of both quantities it compares.',
            revealNote: 'Dividing cm² by cm leaves cm² per cm, which is what makes it a rate.'
          }
        }
      ]
    },
    {
      id: 'CME-CHANGE-005',
      title: 'Instantaneous Rate of Change',
      marker: 'A shrinking interval',
      floors: [
        {
          text: 'Keep the first point at x = 2 and put the second almost on top of it. With no gap worth speaking of, the line through the two lies flat along the curve.',
          exercise: {
            kind: 'choice',
            prompt: 'With the two points almost together, what is the average rate?',
            options: [
              { label: 'Almost exactly 4', correct: true },
              { label: 'Zero, because the gap is almost zero', feedback: 'Both Δy and Δx shrink together. Their ratio does not vanish.' },
              { label: 'Undefined', feedback: 'It would be undefined at a gap of exactly zero. Here the gap is small, not nothing.' }
            ],
            successNote: 'Correct. The readout says 4.001, and the gap is 0.001.',
            revealNote: 'Both changes shrink together, so their ratio survives. It sits just above 4.'
          }
        },
        {
          text: 'Widen the gap and the average rate climbs: 4.001, then 4.01, 4.1, 4.5, and 5. The line tilts away from the curve as it goes.',
          exercise: {
            kind: 'set-control',
            prompt: 'Open the interval until the average rate reaches 5.',
            above: 3.5,
            from: 0,
            successNote: 'At the widest interval the average rate is 5, a whole unit above the local rate.'
          }
        },
        {
          text: 'Square x + Δx and you get x² + 2x·Δx + (Δx)². Take away the original x², then divide by Δx. What is left is 2x + Δx. At x = 2 that is 4 plus the interval, so the drift is not roughly the interval. It is exactly the interval.',
          exercise: {
            kind: 'choice',
            prompt: 'The average rate is 2x + Δx. At x = 2 with an interval of 0.1, what is it?',
            options: [
              { label: '4.1', correct: true },
              { label: '4.0', feedback: 'That drops the interval term. It is only correct when the interval is nothing.' },
              { label: '2.1', feedback: '2x is 4 at x = 2, not 2.' }
            ],
            successNote: 'Correct. 2x gives 4, and the interval adds itself on top.',
            revealNote: '2x is 4 at x = 2, and the interval of 0.1 is added to it: 4.1.'
          }
        },
        {
          text: 'Take the interval to nothing and only 2x survives. At x = 2 that is 4. This is the rate right at that point rather than across a stretch, and calculus calls it the derivative.',
          exercise: {
            kind: 'choice',
            prompt: 'At x = 3, what would the rate right at that point be?',
            options: [
              { label: '6', correct: true },
              { label: '9', feedback: 'That is the area, x². The rate is 2x.' },
              { label: '4', feedback: '4 is the rate at x = 2. The rate depends on where you stand.' }
            ],
            successNote: 'Correct. The derivative of x² is 2x, so at x = 3 it is 6.',
            revealNote: 'What survives is 2x. At x = 3 that is 6, not 4.'
          }
        }
      ]
    }
  ];

