// Factory options for "Two Inches and Two Feet", proposed to sit immediately
// before One Change Against Another. Drafted 2026-08-17 on founder instruction:
// a small board before the rate board that uses simple subtraction to show what
// change is, what a rate is, and what a rate of change is.
//
// THE GAP IT FILLS IS REAL. The Gap Between Two Values teaches change, and One
// Change Against Another opens by dividing one change by another. Nothing in
// between teaches what a rate is. A learner arrives at Δy/Δx having never been
// told that "per" means anything, so the division is a procedure handed to them
// rather than an idea they already hold. Same fault as area being assumed by the
// square board and the plane being drawn before it was introduced.
//
// The argument is Thompson's, not ours. Chapter VIII asks which is growing at
// the greater rate, a plant that goes 12 to 14 inches in a month or a tree that
// goes 12 to 14 feet in a year, and both change by exactly 2. That single
// question does the whole job: it proves change alone cannot answer "how fast",
// and it does so without any algebra. He then defines rate as a comparison of
// something happening against the time it takes, and converts 10 yards a second
// into 600 a minute and 20 miles an hour.
//
// THE ANSWER, and it is not the obvious one. Thompson poses the question and
// never returns to it; the chapter moves straight into defining rate. So the
// conclusion is arithmetic rather than quotation, and it is that the two are
// growing at exactly the same rate: 2 inches a month, and 2 feet a year which is
// 24 inches over 12 months, also 2 inches a month. He chose those numbers, and
// the coincidence is too neat to be accidental.
//
// The first draft of this board had the plant winning "by a distance", which is
// simply wrong, and it would have shipped a false statement to learners in three
// places. It was caught by doing the sum rather than by trusting the shape of
// the story. Recorded here because the wrong version is the intuitive one and
// anyone revising this board will be tempted back towards it.
//
// It also makes a better board. A learner who answers "equal, because both
// changed by 2" reaches the right verdict by exactly the reasoning section 2
// spends its length dismantling, so S4-X2 marks that option wrong and says why.
//
// Founder asked for more interactions and exercises than the usual slate, so
// each section carries three or four figures and four or five checks.
//
// ORDER OF THE THREE IDEAS, deliberate. Change first, because subtraction is
// already known. Then rate on its own, with no change in it at all, so that
// "per one" is met as a plain comparison of two quantities. Only then the two
// combined. Teaching rate of change before rate is what makes Δy/Δx feel like a
// formula, and that is the mistake this board exists to avoid.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Proposed prerequisite for One Change Against Another, drafted 2026-08-17. Not placed in the curriculum map, nothing selected, and outside the learner build.';

export const rateBasics = {
  id: 'CME-CHANGE-013',
  title: 'Two Inches and Two Feet',
  fork: 'Change, then rate on its own, then the two combined. The puzzle is posed before any of them is named.',
  structure: 'Four sections, one puzzle running through all of them.',
  sections: [
    {
      code: 'S1',
      name: 'A change is a subtraction',
      sources: [],
      readings: [
        {
          code: 'S1-A',
          text: 'A plant was 12 inches tall. Now it is 14. How much did it change? Take the old height from the new one: 14 − 12 = 2. It grew by two inches. Every change is found the same way, by subtracting what it was from what it is.'
        },
        {
          code: 'S1-B',
          text: 'To find a change, subtract the earlier value from the later one. New take away old. A plant that was 12 inches and is now 14 has changed by 2, and nothing more complicated than subtraction was needed to say so.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'subtract-strip',
          note: 'Two readings on one line, old and new, with the subtraction written underneath and both numbers adjustable. The arithmetic is never hidden: the strip always shows new − old = change, so the learner watches the sentence stay true rather than being told a rule.'
        },
        {
          code: 'S1-I2', kind: 'grow-bars',
          note: 'The plant drawn as a bar at its old and new height with the difference shaded between them. Makes the change a visible piece of the picture rather than a third number, which is what section 2 will need when two changes are compared.'
        },
        {
          code: 'S1-I3', kind: 'change-sign',
          note: 'The same strip pushed the other way, so the new value falls below the old and the change comes out negative. Included because The Gap Between Two Values already teaches direction, and a learner who has met Δx should not find this board contradicting it by only ever going up.'
        },
        {
          code: 'S1-I4', kind: 'change-table',
          note: 'Four readings taken in turn with each change listed beside the pair that produced it. Prepares the table shape that section 4 fills in, and shows that a change belongs to an interval rather than to a single moment.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'A plant was 12 inches and is now 14. What is the change?',
          options: [
            { label: '2 inches', correct: true },
            { label: '26 inches', feedback: 'That adds the two heights. A change is the difference between them, not the total.' },
            { label: '14 inches', feedback: 'That is the new height, not how much it changed.' }
          ],
          successNote: '14 − 12 = 2. New take away old, every time.',
          revealNote: 'Subtract the old height from the new one: 2 inches.'
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'A tree was 12 feet and is now 14 feet. What is the change?',
          options: [
            { label: '2 feet', correct: true },
            { label: 'Bigger than the plant\'s change, because feet are bigger', feedback: 'The number is the same, 2. Whether that means more growth is the question this board is heading towards.' },
            { label: '2 inches', feedback: 'The tree was measured in feet, so its change is in feet.' }
          ],
          successNote: 'Also 2. Hold on to that: two different things have just changed by the same number.',
          revealNote: '14 − 12 = 2 feet.'
        },
        {
          code: 'S1-X3', kind: 'match',
          prompt: 'Match each pair of readings to its change.',
          bins: ['3', '5', '−2'],
          items: [
            { label: 'was 4, now 7', bin: '3' },
            { label: 'was 10, now 15', bin: '5' },
            { label: 'was 9, now 7', bin: '−2' }
          ],
          successNote: 'The last one fell, so its change is negative. Subtraction records direction as well as size.'
        },
        {
          code: 'S1-X4', kind: 'order',
          prompt: 'Put the steps of finding a change in order.',
          items: [
            'Write down what it was',
            'Write down what it is now',
            'Subtract the old from the new',
            'The answer is the change'
          ],
          successNote: 'Old and new first, then one subtraction. That order never varies.'
        },
        {
          code: 'S1-X5', kind: 'choice',
          prompt: 'A reading was 8 and is now 8. What is the change?',
          options: [
            { label: '0', correct: true },
            { label: 'There is no change, so the question has no answer', feedback: 'No change is itself a change of nought, and nought is a perfectly good answer.' },
            { label: '8', feedback: 'That is the value, not the difference. 8 − 8 = 0.' }
          ],
          successNote: 'Nought is an answer, not the absence of one.',
          revealNote: '8 − 8 = 0.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'The same change, and not the same growth',
      sources: ['T11'],
      readings: [
        {
          code: 'S2-A',
          text: 'Now put the two side by side. The plant went from 12 inches to 14 inches in one month. The tree went from 12 feet to 14 feet in one year. Both changed by 2. Yet nobody would say they grew equally well. Something other than the change is doing the deciding, and the change alone cannot tell you what.'
        },
        {
          code: 'S2-B',
          text: 'Both grew by 2. The plant did it in a month and the tree took a year, and the plant was measured in inches while the tree was in feet. The bare change has left out everything that would settle which grew faster.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'plant-tree',
          note: 'The two growths side by side, each showing its own +2, with the time each took visible underneath and deliberately unequal. The founder-facing point is that this stage answers nothing. It poses Thompson\'s question and stops, so the learner is holding the problem before section 3 hands them the tool.'
        },
        {
          code: 'S2-I2', kind: 'same-change-bars',
          note: 'Both changes drawn as bars of equal length, which is the trap made visual: identical on the page, unequal in fact. Sharper than the side-by-side picture at making the inadequacy felt, but it drops the units, which are half the reason the two differ.'
        },
        {
          code: 'S2-I3', kind: 'change-only-table',
          note: 'A table with only the changes in it, both reading 2, and a verdict column that stays blank however the learner looks at it. The blank column is the content. It says that the information needed is not here rather than that the learner has failed to spot it.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'The plant grew 2 inches and the tree grew 2 feet. Did they grow by the same amount?',
          options: [
            { label: 'The same number, but not the same amount', correct: true },
            { label: 'Yes, both grew by 2', feedback: 'The number is the same. Two inches and two feet are not the same length.' },
            { label: 'No, and the numbers are different too', feedback: 'The numbers are both 2. It is the units that differ.' }
          ],
          successNote: 'A number without its unit is not a quantity. This is the first of two things the bare change left out.',
          revealNote: 'Both changed by 2, but 2 inches and 2 feet are different lengths.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'What else does the change leave out?',
          options: [
            { label: 'How long it took', correct: true },
            { label: 'Where the plant was standing', feedback: 'Not something the numbers know or need.' },
            { label: 'The starting height', feedback: 'Both started at 12, so that is not what separates them.' }
          ],
          successNote: 'One took a month, the other a year. That is the second missing thing and the one section 3 is about.',
          revealNote: 'The time each took: a month against a year.'
        },
        {
          code: 'S2-X3', kind: 'match',
          prompt: 'Sort each fact by whether the change alone tells you it.',
          bins: ['The change tells you', 'It does not'],
          items: [
            { label: 'how much it grew', bin: 'The change tells you' },
            { label: 'whether it grew or shrank', bin: 'The change tells you' },
            { label: 'how long it took', bin: 'It does not' },
            { label: 'which grew faster', bin: 'It does not' }
          ],
          successNote: 'A change answers how much and which way. It is silent on how fast.'
        },
        {
          code: 'S2-X4', kind: 'choice',
          prompt: 'Which grew at the greater rate?',
          options: [
            { label: 'Not yet answerable from what has been given', correct: true },
            { label: 'The tree, because feet are larger', feedback: 'Reasonable, and still a guess. Nothing so far compares the growth with the time it took.' },
            { label: 'They are equal, because both changed by 2', feedback: 'That is exactly the trap. Equal changes over unequal times are not equal rates.' }
          ],
          successNote: 'Refusing to answer is right here. The next section supplies the missing idea, and the answer when it comes is not the one most people guess.',
          revealNote: 'The question needs a rate, which has not been defined yet.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'A rate is an amount for each one',
      sources: ['T12'],
      readings: [
        {
          code: 'S3-A',
          text: 'Set the growing aside for a moment. Six apples cost 3 pounds, so each apple costs 50 pence. That is a rate: an amount given for each one of something else. A car travelling 10 yards every second is the same idea, and because it is a rate you can restate it: 600 yards a minute, or a little over 20 miles an hour, without the car changing speed at all.'
        },
        {
          code: 'S3-B',
          text: 'A rate compares one quantity with another and reports how much of the first goes with one of the second. Pence for each apple, yards for each second, pages for each hour. The word to listen for is per, and it always means for each one.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'per-one',
          note: 'A basket whose count and total cost are both adjustable, with the price for one worked out beneath. The whole point is that the per-one figure can stay put while both the numbers above it move, which is what makes a rate a thing in its own right rather than a leftover of a division.'
        },
        {
          code: 'S3-I2', kind: 'rate-convert',
          note: 'Thompson\'s own car: 10 yards a second shown simultaneously as 600 a minute and 20 miles an hour, with one slider driving all three. One motion, three descriptions, and none of them more true than the others. This is the strongest figure on the board.'
        },
        {
          code: 'S3-I3', kind: 'rate-dial',
          note: 'A rate set by dial with the total accumulating as the seconds run. Reverses the reading: given a rate and a duration, produce the amount. Useful, but it puts time back in a section built to keep rate free of change, so it may belong in section 4 instead.'
        },
        {
          code: 'S3-I4', kind: 'rate-cards',
          note: 'Three worded rates on cards, each with its per-one value revealed on a tap. Cheap and static, and it makes the word "per" the subject, which the moving figures do not. Weakest of the four but the only one that drills the language.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Six apples cost 3 pounds. What is the rate?',
          options: [
            { label: '50 pence per apple', correct: true },
            { label: '3 pounds per apple', feedback: 'That is the cost of all six. A rate is the amount for one.' },
            { label: '6 apples per pound', feedback: 'Closer to a rate, but the wrong way round: 6 apples cost 3 pounds, so 2 apples go with each pound.' }
          ],
          successNote: '3 pounds shared over 6 apples. Per means for each one.',
          revealNote: '300 pence ÷ 6 apples = 50 pence each.'
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'A car goes 10 yards every second. How far in one minute?',
          options: [
            { label: '600 yards', correct: true },
            { label: '10 yards', feedback: 'That is one second\'s worth. A minute holds sixty of them.' },
            { label: '60 yards', feedback: 'That is one yard a second for a minute. This car does ten.' }
          ],
          successNote: 'Same speed, different description. 10 a second is 600 a minute.',
          revealNote: '10 × 60 = 600 yards.'
        },
        {
          code: 'S3-X3', kind: 'match',
          prompt: 'Sort each statement by whether it is a rate.',
          bins: ['Is a rate', 'Is not'],
          items: [
            { label: '50 pence per apple', bin: 'Is a rate' },
            { label: '3 pounds altogether', bin: 'Is not' },
            { label: '20 miles an hour', bin: 'Is a rate' },
            { label: '14 inches tall', bin: 'Is not' }
          ],
          successNote: 'A rate always names two things. A single measurement names one.'
        },
        {
          code: 'S3-X4', kind: 'choice',
          prompt: '600 yards a minute and 20 miles an hour describe the same car. How?',
          options: [
            { label: 'One speed can be written against any unit of time', correct: true },
            { label: 'The car sped up between the two', feedback: 'Nothing about the car changed. Only the way the speed was written.' },
            { label: 'One of them is an approximation of the other', feedback: 'They are the same rate, restated. The rounding in "over 20" is incidental.' }
          ],
          successNote: 'A rate is a comparison, so it can be expressed against whichever unit suits you.',
          revealNote: 'The same motion, described against a second, a minute or an hour.'
        },
        {
          code: 'S3-X5', kind: 'choice',
          prompt: 'What single word signals a rate?',
          options: [
            { label: 'Per', correct: true },
            { label: 'Total', feedback: 'A total is one quantity. A rate compares two.' },
            { label: 'Change', feedback: 'Changes can have rates, but plenty of rates have no change in them, such as pence per apple.' }
          ],
          successNote: 'Per, or one of its disguises: a, each, every. All of them mean for each one.',
          revealNote: 'Per, meaning for each one.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'Put the change over the time',
      sources: ['T11', 'T12'],
      readings: [
        {
          code: 'S4-A',
          text: 'Now the two ideas meet. Take the change and report it for each one unit of whatever it happened against. The plant changed 2 inches in 1 month, which is 2 inches per month. The tree changed 2 feet in 1 year: 2 feet is 24 inches, and a year is 12 months, so that is also 2 inches per month. They are growing at exactly the same rate, and no amount of staring at the bare changes would have told you so.'
        },
        {
          code: 'S4-B',
          text: 'A rate of change is a change reported per unit of something else, usually time. Divide the change by how long it took, and put both into the same units before comparing. Two inches a month, and two feet a year which is twenty-four inches over twelve months. The plant and the tree turn out to be growing at the same rate, which is a thing you can only find out by working it out.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'rate-of-change',
          note: 'The section 2 puzzle with the time restored and the division shown, then both rates converted to a shared unit so the comparison is honest. They come out equal, at 2 inches per month each. Thompson poses this question in ch. VIII and never answers it, so the numbers are his and the conclusion is arithmetic: 2 feet a year is 24 inches over 12 months. Continuity is the argument, and the answer is worth more than a win for either side, because a learner who guessed "equal, both changed by 2" was right for a reason that does not hold.'
        },
        {
          code: 'S4-I2', kind: 'rate-race',
          note: 'Two bars growing in real time at the rates just calculated, from equal starts, on one shared scale of inches against months. Because the rates are equal they stay level for the whole run, which is a stranger and more convincing thing to watch than one pulling away. Nothing is computed on screen. Weaker as evidence and much stronger as a memory, so it may be worth having alongside I1 rather than instead of it.'
        },
        {
          code: 'S4-I3', kind: 'change-over-time',
          note: 'A table of readings with a time column, and the rate for each interval worked out beside it. This is the shape One Change Against Another opens with, so it is the handover: a learner who has filled this table has already met Δy over Δx without the notation.'
        },
        {
          code: 'S4-I4', kind: 'unit-match',
          note: 'The two growths with the unit of time adjustable on each, so a learner can bring them onto the same footing themselves rather than being shown the converted figures. Slower, and it makes the point that a comparison is only fair once the units agree.'
        }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'The plant grew 2 inches in one month. What is its rate of growth?',
          options: [
            { label: '2 inches per month', correct: true },
            { label: '2 inches', feedback: 'That is the change. A rate says how much per unit of time.' },
            { label: '1 month per 2 inches', feedback: 'The right two quantities, upside down. Report the growth for each month, not the months for each inch.' }
          ],
          successNote: 'Change over time, and the units come along with it.',
          revealNote: '2 inches ÷ 1 month = 2 inches per month.'
        },
        {
          // The trap is a right answer reached by a wrong route. "Equal, because
          // both changed by 2" lands on the correct verdict through reasoning
          // section 2 spent its whole length dismantling, so it is marked wrong
          // and told why rather than quietly accepted.
          code: 'S4-X2', kind: 'choice',
          prompt: 'Work out both rates in inches per month. Which is growing at the greater rate?',
          options: [
            { label: 'Neither: both come to 2 inches per month', correct: true },
            { label: 'The tree, because feet are larger than inches', feedback: 'The tree does gain more length, and it takes twelve times as long. Put both per month before deciding.' },
            { label: 'They are equal, because both changed by 2', feedback: 'The verdict is right and the reason is not. Equal changes over unequal times are usually unequal rates; these two happen to agree only after 2 feet a year is turned into inches per month.' }
          ],
          successNote: '2 inches ÷ 1 month, and 24 inches ÷ 12 months. Identical, and unknowable until it was worked out.',
          revealNote: 'The plant grows 2 inches a month. The tree grows 2 feet a year, which is 24 inches over 12 months, or 2 inches a month. The same rate.'
        },
        {
          code: 'S4-X3', kind: 'match',
          prompt: 'Sort each into what it is.',
          bins: ['A change', 'A rate of change'],
          items: [
            { label: 'grew 2 inches', bin: 'A change' },
            { label: '2 inches per month', bin: 'A rate of change' },
            { label: 'fell by 5 degrees', bin: 'A change' },
            { label: '5 degrees an hour', bin: 'A rate of change' }
          ],
          successNote: 'Add "per something" to a change and you have a rate of change.'
        },
        {
          code: 'S4-X4', kind: 'choice',
          prompt: 'A tank loses 12 litres in 4 hours. What is the rate?',
          options: [
            { label: '3 litres per hour', correct: true },
            { label: '48 litres per hour', feedback: 'That multiplies. Sharing 12 litres over 4 hours means dividing.' },
            { label: '12 litres per hour', feedback: 'That is the whole loss, which took four hours rather than one.' }
          ],
          successNote: 'Change divided by time, whether the quantity is rising or falling.',
          revealNote: '12 ÷ 4 = 3 litres per hour.'
        },
        {
          code: 'S4-X5', kind: 'order',
          prompt: 'Put the three ideas in the order this board met them.',
          items: [
            'A change: subtract old from new',
            'A rate: an amount for each one',
            'A rate of change: the change for each one unit of time'
          ],
          successNote: 'Change, then rate on its own, then the two together. The next board divides one change by another, which is the same move with a second change in place of the time.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The growing bench',
      kind: 'growth-bench',
      blurb: 'Two things growing. Set how much each gains and how long it takes, and see which is really faster.',
      goals: [
        { id: 'g1', text: 'Make both change by the same amount' },
        { id: 'g2', text: 'Keep the changes equal but make one grow twice as fast' },
        { id: 'g3', text: 'Make the smaller change the faster rate' },
        { id: 'g4', text: 'Make two different changes give the same rate' }
      ],
      note: 'Goal 3 is the one worth having. A learner who still half-believes the bigger change wins has to build the counterexample themselves, and the only way to do it is to shorten the time, which is exactly the variable the whole board is about. Goal 4 is its mirror and plants the idea that many pairs share one rate, which is what makes a rate worth naming at all.'
    },
    {
      code: 'W2',
      name: 'Name that rate',
      kind: 'rate-quiz-bench',
      blurb: 'A quantity and a time. Say the rate, then check it.',
      goals: [
        { id: 'q1', text: 'Get three rates right in a row' },
        { id: 'q2', text: 'Get one right where the quantity falls' },
        { id: 'q3', text: 'Get one right where the time is not one unit' }
      ],
      note: 'Drill rather than discovery, and it says so. Goal 2 covers the negative case that S1-I3 introduced and the readings otherwise leave alone; goal 3 forces an actual division rather than reading the change straight off, which is the step learners skip when every example conveniently takes one hour.'
    }
  ]
};
