// Factory options for "One for Each", the entry board of the Foundations unit.
// Drafted 2026-08-10.
//
// Repairs P-01, "read a number written in figures", which A Letter for a Number
// requires and nothing teaches. But the board is wider than that, because De
// Morgan's opening is wider: he builds the idea of number out of matching rather
// than out of reciting names in order. A company of horsemen, one man to every
// horse, and the notion arrives before any counting happens. Then a pebble
// dropped in a basket for each rider.
//
// That is a better first idea than "one, two, three", and it is his, not ours.
// It also does real work later: one-to-one correspondence is exactly what the
// function boards need when they say each input has one output, so the entry
// board and What a Button Does are the same idea at two ends of the course.
//
// MODERNISED, and recorded. Art. 3 begins "In this way a savage could keep an
// account of any numbers in which he was interested." The word is of its time
// and is not going in front of a learner. The reading keeps the substance, that
// tallying with pebbles is how people kept accounts before figures existed, and
// drops the framing. The full quotation stays in sources.js as N3 so the record
// shows exactly what was changed and why.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Foundations unit, proposed 2026-08-10. Repairs P-01, which the first board of the course requires and nothing teaches. Not yet placed in the curriculum map and nothing here has been selected.';

export const number = {
  id: 'ARI-NUMBER-001',
  title: 'One for Each',
  fork: 'Number arrives from matching, not from counting. Names and figures come last.',
  structure: 'Four sections, from pairing to writing it down.',
  sections: [
    {
      code: 'S1',
      name: 'One man to every horse',
      sources: ['N1'],
      readings: [
        {
          code: 'S1-A',
          text: 'A company of horsemen rides past. Without counting anything, you notice something: to each man there is a horse. Men and horses are nothing alike, and yet they go together one for one. You now know something about how many there are, and you have not said a single number.'
        },
        {
          code: 'S1-B',
          text: 'Watch a line of riders go by. There is a horse for every man and a man for every horse. That much you can see at a glance, without counting either. Two collections can be matched up one for one, and noticing that is the beginning of number.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'pair-up',
          note: 'Two rows, riders above and horses below, joined by tapping one from each. When every one is paired the rows say so. No numeral appears anywhere on this stage, deliberately: the learner is being shown that "the same amount" can be established before "how many" is asked, which is De Morgan\'s actual sequence and not the one schools use.'
        },
        {
          code: 'S1-I2', kind: 'pair-mismatch',
          note: 'The same two rows, but with one row a member short, so the pairing runs out and one is left standing. Shows what failing to match looks like, which makes the successful case mean something. Better as a second beat than an opening one, since a learner needs to see the match work before seeing it fail.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'Every rider has a horse and every horse has a rider. What do you know?',
          options: [
            { label: 'There are as many riders as horses', correct: true },
            { label: 'There are twelve of each', feedback: 'You might be right, but nothing here told you twelve. Matching gives you sameness, not the count.' },
            { label: 'Nothing, until you count them', feedback: 'You knew they matched before anyone counted. That is already knowing something.' }
          ],
          successNote: 'The same amount, established without a single number being said.',
          revealNote: 'Matching one for one tells you the amounts are equal.'
        },
        {
          code: 'S1-X2', kind: 'match',
          prompt: 'Sort each pair by whether they match one for one.',
          bins: ['Matches one for one', 'Does not'],
          items: [
            { label: 'cups and saucers on a laid table', bin: 'Matches one for one' },
            { label: 'left shoes and right shoes in a wardrobe', bin: 'Matches one for one' },
            { label: 'chairs and legs on those chairs', bin: 'Does not' },
            { label: 'people and their names', bin: 'Matches one for one' }
          ],
          successNote: 'Chairs have four legs each, so those two cannot be paired off one for one.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'A pebble for each',
      sources: ['N2', 'N3'],
      readings: [
        {
          code: 'S2-A',
          text: 'Now suppose you drop a pebble into a basket for each rider as he passes. There is no connection between pebbles and riders except this: for every rider there is a pebble. When the company has gone, the basket holds the same amount as the company did, and you can carry it home.'
        },
        {
          code: 'S2-B',
          text: 'Drop one pebble in a basket for every rider you see. Pebbles have nothing to do with horsemen, but the matching is exact, so the basket now stands for how many rode past. Long before figures were invented this is how people kept accounts of their cattle and their children.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'tally-basket',
          note: 'Riders pass one at a time and the learner drops a pebble for each. Miss one and the basket is wrong at the end, which is the point: the tally is only worth anything if the matching was honest. The count is shown at the end and not during, so the pebbles do the work rather than a running number.'
        },
        {
          code: 'S2-I2', kind: 'pair-up',
          note: 'Section 1\'s pairing again, with pebbles as the second row. Makes the continuity explicit, that a tally is the same matching with something portable on one side. Repeats the apparatus, which is either the argument or the objection.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'Why does a basket of pebbles tell you anything about riders?',
          options: [
            { label: 'Because one pebble went in for each rider', correct: true },
            { label: 'Because pebbles and riders are similar', feedback: 'They have nothing in common. That is what makes the trick work for anything at all.' },
            { label: 'Because the basket was counted', feedback: 'Nothing has been counted yet. The basket already stands for the company before anyone counts it.' }
          ],
          successNote: 'The matching is the whole of it. What the tokens are made of does not matter.',
          revealNote: 'One pebble per rider, so the pebbles carry the amount.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'You drop a pebble for each rider but miss one rider. What is the basket now?',
          options: [
            { label: 'One short, and there is no way to tell from the basket alone', correct: true },
            { label: 'Still correct', feedback: 'The matching broke, so the basket no longer stands for the company.' },
            { label: 'Useless entirely', feedback: 'It is one short, not meaningless. But nothing in the basket reveals the mistake.' }
          ],
          successNote: 'A tally is exactly as trustworthy as the matching that made it.',
          revealNote: 'It holds one fewer pebble than there were riders.'
        },
        {
          code: 'S2-X3', kind: 'order',
          prompt: 'Put the steps of keeping a tally in order.',
          items: [
            'A rider passes',
            'Drop one pebble in the basket',
            'Repeat for every rider',
            'The basket now stands for the whole company'
          ],
          successNote: 'One token, one thing, every time. Break that and the tally is worth nothing.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'The amount they share',
      sources: [],
      readings: [
        {
          code: 'S3-A',
          text: 'Riders, horses and pebbles are three different collections that all match one another. Whatever they have in common is not made of men or of stone. It is the amount, and it has a name: seven, say. A number is the thing that all matching collections share.'
        },
        {
          code: 'S3-B',
          text: 'Three baskets, three collections, all matching one for one. What is the same about them? Not the objects. The amount. That is what a number names, and it is why the same number can count sheep, coins and days without meaning anything different.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'same-count',
          note: 'Three unlike collections side by side, each addable and removable, with a shared readout that only agrees when all three match. The learner has to bring them into line themselves. The number appears once, above all three rather than under any one, which is where the idea actually lives.'
        },
        {
          code: 'S3-I2', kind: 'tally-basket',
          note: 'Section 2\'s basket with a numeral revealed at the end. Simpler, and it names the amount, but it names it for one collection only and so does not make the point that the number belongs to none of them in particular.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Seven sheep and seven coins. What is the same about them?',
          options: [
            { label: 'How many there are', correct: true },
            { label: 'What they are worth', feedback: 'Sheep and coins are worth quite different things. Only the amount matches.' },
            { label: 'Nothing at all', feedback: 'Something is shared, or we would not use the same word for both.' }
          ],
          successNote: 'Seven is not made of sheep or of silver. It is what the two collections share.',
          revealNote: 'The amount is the same, and that is all a number names.'
        },
        {
          code: 'S3-X2', kind: 'match',
          prompt: 'Sort each by whether it belongs to the collection or to the number.',
          bins: ['A fact about the objects', 'A fact about the number'],
          items: [
            { label: 'they are woolly', bin: 'A fact about the objects' },
            { label: 'there are seven', bin: 'A fact about the number' },
            { label: 'they cost money', bin: 'A fact about the objects' },
            { label: 'one more would make eight', bin: 'A fact about the number' }
          ],
          successNote: 'Facts about the amount survive when you swap sheep for coins. Facts about sheep do not.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'Writing it down',
      sources: ['N3'],
      readings: [
        {
          code: 'S4-A',
          text: 'A basket of pebbles is honest but heavy, and it cannot be sent in a letter. So we write the amount instead, with ten marks: 1, 2, 3, 4, 5, 6, 7, 8, 9 and 0. These are called figures. A figure is not the amount itself, it is a way of recording it, and it is the last step rather than the first.'
        },
        {
          code: 'S4-B',
          text: 'Carrying pebbles about is inconvenient, so the amount is written down instead. Ten figures do the whole job: 1 to 9 and 0. Reading a figure is reading a record of an amount that somebody once matched.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'pebble-to-figure',
          note: 'The basket from section 2 beside the figure that records it, both changing together as pebbles are added and removed. The pebbles stay on screen while the figure appears, so the figure is seen to be a record of them rather than a replacement for them. That ordering is the board\'s whole argument in one stage.'
        },
        {
          code: 'S4-I2', kind: 'figure-row',
          note: 'The ten figures laid out with their amounts drawn beneath as dots. A reference card more than an interaction, and it states the correspondence rather than letting the learner watch it hold.'
        }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'What is the figure 7?',
          options: [
            { label: 'A written record of an amount', correct: true },
            { label: 'The amount itself', feedback: 'Rub out the mark and seven sheep are still seven sheep. The figure records the amount; it is not the amount.' },
            { label: 'A word for counting', feedback: '"Seven" is the word. 7 is the mark used to write it.' }
          ],
          successNote: 'Amount first, matched. Figure last, written. That order is the whole of this board.',
          revealNote: 'It is a mark that records how many, not the how many itself.'
        },
        {
          code: 'S4-X2', kind: 'match',
          prompt: 'Sort each into what it is.',
          bins: ['A collection', 'A figure'],
          items: [
            { label: 'five pebbles in a basket', bin: 'A collection' },
            { label: '5', bin: 'A figure' },
            { label: 'the riders who passed', bin: 'A collection' },
            { label: '0', bin: 'A figure' }
          ],
          successNote: 'Ten figures record any amount at all, which is why pebbles were given up.'
        },
        {
          code: 'S4-X3', kind: 'choice',
          prompt: 'How many figures are there altogether?',
          options: [
            { label: 'Ten', correct: true },
            { label: 'Nine', feedback: 'Do not forget 0. It is a figure, and leaving it out breaks the whole system.' },
            { label: 'Endlessly many', feedback: 'There are endlessly many numbers, but only ten marks are used to write them all.' }
          ],
          successNote: 'Ten marks, and every number ever written is made from them. The next board is about what their position does.',
          revealNote: '1, 2, 3, 4, 5, 6, 7, 8, 9 and 0. Ten in all.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The tally bench',
      kind: 'tally-bench',
      blurb: 'Three collections and a basket. Match them, and see what they have in common.',
      goals: [
        { id: 't1', text: 'Match the pebbles to the riders exactly' },
        { id: 't2', text: 'Make all three collections the same amount' },
        { id: 't3', text: 'Make one collection larger than the other two' },
        { id: 't4', text: 'Bring them level again without counting the middle one' }
      ],
      note: 'Goal 4 is the one worth having. The middle collection is covered, so it can only be brought level by matching it against another one for one, which is the board\'s opening idea used as a tool rather than recited as a fact. Goal 3 exists to break the level state first, so that goal 4 has something to repair.'
    }
  ]
};
