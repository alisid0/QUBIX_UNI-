// Factory options for "A Number With No Exact Root", the fourth board of the
// Foundations unit. Drafted 2026-08-10.
//
// WHY THIS AND NOT "NUMBER SYSTEMS". The founder asked about natural numbers,
// integers and the rest. Those are a classification, and a classification is
// naming rather than mechanism: a learner who can already count, walk left of
// zero and split a unit into tenths gains nothing from being told that the
// first set is called N. Worse, the three boards already in this unit build
// those sets without labelling them. One for Each builds the counting numbers by
// matching. The Line That Runs Out builds the negatives by running out of ground
// and laying more. Numbers Between the Whole Ones builds the fractions by
// splitting a unit. A taxonomy board would put names on work three boards have
// already done.
//
// There is one member of that family that is not a naming exercise, and this is
// it. A number with no exact square root is a genuine discovery with a mechanism
// behind it, and it is the honest way into irrational quantity: not "here is
// another set" but "here is a question the numbers you have cannot answer".
//
// It also closes a loop the course opened deliberately. The Area board's tiling
// bench carries a goal that cannot be met, because 24 has no whole square root,
// and its note says the failure is there to plant square roots for later. This
// is later.
//
// Source: De Morgan Book I §VII, arts. 156 and 158. Art. 158 is the most
// dramatic sentence in the book: 5 "has no square root at all", followed
// immediately by fractions whose squares come as near to 5 as we please.
//
// SCOPE, and a caution for the record. This board does NOT prove that no
// fraction squares to 5. De Morgan does not either; he says "it is proved in
// algebra" and moves on. Claiming a proof here would be dishonest and the
// argument is far beyond the unit. The board shows the search failing and
// reports the result as something established elsewhere, which is exactly what
// the source does. Section 2's reading must not be edited into sounding like a
// demonstration.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Foundations unit, proposed 2026-08-10. Closes the square-root loop the Area board opened. Not yet placed in the curriculum map and nothing here has been selected.';

export const root = {
  id: 'ARI-ROOT-001',
  title: 'A Number With No Exact Root',
  fork: 'The search is run and allowed to fail. What cannot be found is the content.',
  structure: 'Four sections, ending back on the number line.',
  sections: [
    {
      code: 'S1',
      name: 'Undoing a square',
      sources: ['SR1'],
      readings: [
        {
          code: 'S1-A',
          text: 'A number multiplied by itself gives its square: 13 times 13 is 169. Going the other way, 13 is called the square root of 169, because it is the number which, multiplied by itself, produces it. Squaring and taking the root are the same journey in opposite directions.'
        },
        {
          code: 'S1-B',
          text: 'Multiply a number by itself and you have squared it. Ask which number was squared to give what you are looking at, and you are asking for its square root. 5 squared is 25, so the square root of 25 is 5.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'root-both-ways',
          note: 'A single number with an arrow out to its square and an arrow back, both live. Change either end and the other follows. The point is that root and square are one relationship read in two directions, not two separate procedures, and having both arrows on screen at once is what says so.'
        },
        {
          code: 'S1-I2', kind: 'square-grid',
          note: 'A square of counters, side adjustable, with the total shown. Ties the word "square" to the shape and back to the Area board, where a square of side x had area x². Slower, and it works only for whole sides, which is a limitation section 2 will want.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'What is the square root of 49?',
          options: [
            { label: '7', correct: true },
            { label: '24.5', feedback: 'That is half of 49. A root is the number multiplied by itself, not divided by two.' },
            { label: '2401', feedback: 'That is 49 squared. You went the wrong way along the arrow.' }
          ],
          successNote: '7 × 7 = 49, so 7 is what was squared.',
          revealNote: '7, because 7 multiplied by itself gives 49.'
        },
        {
          code: 'S1-X2', kind: 'match',
          prompt: 'Match each number to its square root.',
          bins: ['3', '6', '9'],
          items: [
            { label: '9', bin: '3' },
            { label: '36', bin: '6' },
            { label: '81', bin: '9' }
          ],
          successNote: 'Each of these came out exactly. The next section asks what happens when one does not.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'Some numbers have none',
      sources: ['SR2'],
      readings: [
        {
          code: 'S2-A',
          text: 'Now hunt for the square root of 5. Two gives 4, which is short. Three gives 9, which is over. There is nothing between them to try, so no whole number works. Fractions do not rescue it either: it is proved, though not here, that no fraction multiplied by itself gives a whole number. So 5 has no exact square root at all, whole or fractional.'
        },
        {
          code: 'S2-B',
          text: 'Look for a number that gives 5 when multiplied by itself. 2 × 2 is 4 and 3 × 3 is 9, and there is no whole number in between. Nor is there a fraction that will do it, which is proved elsewhere and taken on trust here. The search does not merely fail; there is nothing to find.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'root-search',
          note: 'A stepper through whole numbers with each square shown against a target of 5. The learner watches 4 and 9 close around it with nothing between. Founder-facing note: the interaction cannot prove the fractional case and must not pretend to. It runs the whole-number search honestly to exhaustion and stops, and the reading carries the rest as something established elsewhere, which is what the source does.'
        },
        {
          code: 'S2-I2', kind: 'square-grid',
          note: 'A square of counters that will not tile to exactly 5 whatever the side. Shows the failure as a shape rather than a table, which is the Area board\'s tiling bench again. That is either a welcome echo or a repeat of a puzzle already solved there.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'Why is there no whole number whose square is 5?',
          options: [
            { label: '2 gives 4 and 3 gives 9, and there is nothing between them', correct: true },
            { label: 'Because 5 is odd', feedback: '9 is odd and it has the root 3. Oddness is not the reason.' },
            { label: 'Because 5 is prime', feedback: '4 is not prime and has a root; 2 is prime and has none. That is not the test either.' }
          ],
          successNote: 'The whole numbers step straight over it. There is no room to look.',
          revealNote: '4 and 9 are the nearest squares, and no whole number lies between 2 and 3.'
        },
        {
          code: 'S2-X2', kind: 'match',
          prompt: 'Sort each by whether it has an exact whole square root.',
          bins: ['It has one', 'It has none'],
          items: [
            { label: '16', bin: 'It has one' },
            { label: '20', bin: 'It has none' },
            { label: '25', bin: 'It has one' },
            { label: '24', bin: 'It has none' }
          ],
          successNote: '24 is the one the tiling bench refused to make a square of. This is why it could not.'
        },
        {
          code: 'S2-X3', kind: 'choice',
          prompt: 'What was actually shown here about fractions and 5?',
          options: [
            { label: 'Nothing was shown; we were told it is proved elsewhere', correct: true },
            { label: 'That every fraction was tried and failed', feedback: 'There are endlessly many fractions. No search could try them all, which is why a proof is needed.' },
            { label: 'That fractions cannot be multiplied by themselves', feedback: 'They can. Half times half is a quarter. The claim is about what such a product can equal.' }
          ],
          successNote: 'Knowing which parts you have been shown and which you have been told is worth as much as the result.',
          revealNote: 'The fractional case is taken on trust here and proved in algebra.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'As near as you please',
      sources: ['SR3'],
      readings: [
        {
          code: 'S3-A',
          text: 'That is not the end of it. 2.2 squared is 4.84, a little under. 2.3 squared is 5.29, a little over. Squeeze in with 2.24, then 2.236, and the square creeps closer to 5 each time. No number in this list is the answer, and yet you can get as near to 5 as anybody could ask for.'
        },
        {
          code: 'S3-B',
          text: 'Although no exact answer exists, near ones do. Squaring 2.2 gives slightly less than 5, squaring 2.3 slightly more, and adding another decimal place narrows the gap. Carry on and the gap keeps shrinking, without ever closing.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'root-approx',
          note: 'A row of guesses, each one decimal place longer than the last, with its square and the distance from 5. Adding a place is a button, so the learner drives the closing themselves. What matters is that the gap column keeps shrinking while never reading zero, which is the whole of the idea and needs no limit language to see.'
        },
        {
          code: 'S3-I2', kind: 'root-search',
          note: 'Section 2\'s search with decimals allowed instead of whole numbers only. Continuity is the argument, the same hunt with a finer sieve, but it does not put the shrinking gap in a column where it can be watched.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: '2.236 squared is 4.999696. What does that tell you?',
          options: [
            { label: 'It is very close to 5, and still not 5', correct: true },
            { label: 'It is the square root of 5', feedback: 'Its square is not 5, it is 4.999696. Close is not the same as equal.' },
            { label: 'The calculation is wrong', feedback: 'It is right. Being right and being exact are different things here.' }
          ],
          successNote: 'Every entry in that list is wrong, and the list gets as useful as you like.',
          revealNote: 'Close, and not exact. That distinction is the section.'
        },
        {
          code: 'S3-X2', kind: 'order',
          prompt: 'Put these squares in order, smallest first.',
          items: ['2.2 × 2.2', '2.23 × 2.23', '2.236 × 2.236', '2.3 × 2.3'],
          successNote: 'They climb towards 5 and step over it at the end. The exact answer sits in a gap the list never lands on.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'It still has a place',
      sources: [],
      readings: [
        {
          code: 'S4-A',
          text: 'Go back to the line. Draw a square with each side 1, and its diagonal is a length you can see and touch. That length, laid along the line from 0, lands somewhere between 2 and 3. It has a position, exactly one, and no fraction names it. The line was always full of such places; nothing has been added to it, only noticed.'
        },
        {
          code: 'S4-B',
          text: 'The number line has room for this. Between 2.236 and 2.237 there is a single position where the square is exactly 5, and it is a real place on the line even though no fraction reaches it. Numbers like this are not defects in the line. They are most of it.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'root-on-line',
          note: 'The number line board\'s line, zoomed between 2 and 3, with the closing guesses from section 3 marked and a gap left where none of them lands. The unit\'s three earlier boards all end up in this stage: the line, the tenths, and the failed search. Nothing is asserted about what lives in the gap beyond that the guesses close on it from both sides.'
        },
        {
          code: 'S4-I2', kind: 'diagonal-square',
          note: 'A unit square with its diagonal swung down onto the line, landing between 1.41 and 1.42. This is the root of 2 rather than 5, which breaks the board\'s running example, but it is the one construction that makes such a length visible rather than approached. Worth the inconsistency or not is a founder decision.'
        }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'Is there a point on the line whose square is exactly 5?',
          options: [
            { label: 'Yes, and no fraction names it', correct: true },
            { label: 'No, because no number squares to 5', feedback: 'No fraction does. The position on the line is still there, which is the discovery.' },
            { label: 'Yes, and it is 2.236', feedback: '2.236 squared is 4.999696. It is near the place, not at it.' }
          ],
          successNote: 'A position with no fractional name. The line was always like this; you had not been shown.',
          revealNote: 'The point exists. What fails is naming it as a fraction.'
        },
        {
          code: 'S4-X2', kind: 'match',
          prompt: 'Sort each by whether a fraction can name it exactly.',
          bins: ['A fraction names it', 'No fraction does'],
          items: [
            { label: 'one half', bin: 'A fraction names it' },
            { label: 'the square root of 4', bin: 'A fraction names it' },
            { label: 'the square root of 5', bin: 'No fraction does' },
            { label: 'the square root of 2', bin: 'No fraction does' }
          ],
          successNote: 'Roots of perfect squares come out. The rest live on the line without a fractional name.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The root hunt',
      kind: 'root-bench',
      blurb: 'A target and a guess. Square the guess and see how close you got.',
      goals: [
        { id: 'k1', text: 'Find an exact root for 36' },
        { id: 'k2', text: 'Find a different target that also has an exact root' },
        { id: 'k3', text: 'Get within 0.01 of a root for 5' },
        { id: 'k4', text: 'Find an exact root for 5' }
      ],
      note: 'Goal 4 cannot be met, and is left unmarked. This is the second deliberately unreachable goal in the course after the tiling bench, and it is the same goal: that bench could not make a square of area 24, and this one cannot find a root for 5. Placing them at opposite ends of the curriculum is the point. A learner who remembers being stuck on the tiling bench has the answer handed to them here, and one who does not is simply stuck again, which is still honest. Goal 3 sits immediately before it so that the learner has just proved they can get arbitrarily close, which is what makes never arriving interesting rather than merely annoying.'
    }
  ]
};
