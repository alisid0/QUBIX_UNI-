// Factory options for "The Line That Runs Out", the second board of the
// Foundations unit. Drafted 2026-08-10 on founder suggestion.
//
// The number line is used by three boards and taught by none. The Gap Between
// Two Values draws one in its first section. The Coordinate Plane opens by
// making one fail. The decimals board zooms into one throughout. Every one of
// them assumes the learner already knows what the line is and that going left
// means less. The same fault as area, as the plane, and as decimals.
//
// It also settles P-02, "recognise negative numbers as direction or loss".
// That prerequisite was recorded yesterday as unbuildable for want of a source,
// after De Morgan turned out to treat negatives only as a computing trick with
// a bar over the numeral. The source was on the shelf the whole time: Wentworth
// chapter III, in a book already quoted for two other boards. Worth recording
// as a lesson about looking before concluding.
//
// THE SHAPE IS WENTWORTH'S, NOT OURS. He draws the line, works addition and
// subtraction along it, then asks for 2 − 5 and says plainly that the series
// comes to an end. Only then does he extend leftward. Making the tool fail
// before enlarging it is the same move the Coordinate Plane makes with one axis
// and the functions unit makes with the broken drinks machine, and finding it in
// the source rather than imposing it is the strongest thing about this board.
//
// MODERNISED, and recorded. Wentworth writes "the natural series of numbers"
// and "the algebraic series of numbers". Both are dropped: a learner meeting
// this board has no use for the phrase and it invites the idea that there are
// two different kinds of number rather than one line extended. His thermometer
// and his trader's gains and losses are kept, because they are concrete and
// still true.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Foundations unit, proposed 2026-08-10. Teaches the number line, which three live boards already draw, and settles P-02. Not yet placed in the curriculum map and nothing here has been selected.';

export const numberLine = {
  id: 'ARI-LINE-001',
  title: 'The Line That Runs Out',
  fork: 'The line is built, used, and driven into the ground before it is extended.',
  structure: 'Four sections, one line throughout.',
  sections: [
    {
      code: 'S1',
      name: 'Laying the units out',
      sources: ['WN2'],
      readings: [
        {
          code: 'S1-A',
          text: 'Mark a point and call it 0. Now step along to the right, always the same distance, and mark where you land: 1, 2, 3, 4, and on as far as you like. The numbers are not floating anywhere; each one is a place you can walk to, and the distance between any two neighbours is always one step.'
        },
        {
          code: 'S1-B',
          text: 'Start at a point marked 0 and lay off equal steps to the right. Each landing gets the next number. What matters is that the steps are equal, because that is what makes the picture honest: the gap from 3 to 4 is the same as the gap from 8 to 9.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'lay-units',
          note: 'An empty line with a single 0 on it, and a button that lays the next unit. The learner builds the line rather than being handed it, and because each step is laid at the same width, the evenness is something they watch happen. Nothing else on this board makes sense if the steps are not believed to be equal.'
        },
        {
          code: 'S1-I2', kind: 'unit-line',
          note: 'The finished line, 0 to 10, with a marker that can be dragged along it. Quicker to read and it is what the later sections use, but it hands over a line that has already been built, which is what section 1 is for.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'On this line, what is the distance from 3 to 4?',
          options: [
            { label: 'One step, the same as any two neighbours', correct: true },
            { label: 'It depends where you are on the line', feedback: 'Then the picture would lie. The steps were laid equal on purpose.' },
            { label: 'Three steps', feedback: 'Three is where you started, not how far you went.' }
          ],
          successNote: 'Equal steps everywhere. That is the one promise the line makes.',
          revealNote: 'Every neighbouring pair is one step apart.'
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'What is 0 on this line?',
          options: [
            { label: 'The point everything is measured from', correct: true },
            { label: 'The smallest number there is', feedback: 'It is the smallest so far. Section 3 finds out what lies past it.' },
            { label: 'Nothing, so it need not be marked', feedback: 'It has to be marked. Every other position is described by how far it is from 0.' }
          ],
          successNote: 'Everything on the line is described by its distance from 0.',
          revealNote: '0 is the point the units are laid off from.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'Forwards and backwards',
      sources: ['WN3'],
      readings: [
        {
          code: 'S2-A',
          text: 'Adding is walking forwards. To add 2 to 5, stand on 5, take two steps to the right, and you are on 7. Subtracting is walking backwards. To take 2 from 5, stand on 5, take two steps to the left, and you are on 3. The sum and the difference are not calculated; they are arrived at.'
        },
        {
          code: 'S2-B',
          text: 'Stand on a number and walk. Two steps right is adding 2. Two steps left is subtracting 2. Where you finish is the answer, so addition and subtraction are the same act in opposite directions.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'walk-line',
          note: 'A marker on the line with a step count and two direction buttons, and the sum written out as it is walked, 5 + 2 = 7. The arithmetic and the walk are the same thing happening once, not a picture illustrating a calculation done elsewhere. This is the stage section 3 breaks.'
        },
        {
          code: 'S2-I2', kind: 'unit-line',
          note: 'The line with a draggable marker and a readout of where it is. Lets a learner move freely, which is pleasant, but it loses the sense of taking a stated number of steps, which is what makes subtraction reverse.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'You stand on 6 and walk three steps left. Where do you finish?',
          options: [
            { label: '3', correct: true },
            { label: '9', feedback: 'That is three steps right. Left is the other way.' },
            { label: '18', feedback: 'Nothing is being multiplied. You are walking, one step at a time.' }
          ],
          successNote: 'Six take away three. You did the subtraction by walking it.',
          revealNote: 'Three steps left from 6 lands on 3.'
        },
        {
          code: 'S2-X2', kind: 'match',
          prompt: 'Match each walk to what it does.',
          bins: ['Adding', 'Subtracting'],
          items: [
            { label: 'four steps right', bin: 'Adding' },
            { label: 'one step left', bin: 'Subtracting' },
            { label: 'six steps left', bin: 'Subtracting' },
            { label: 'two steps right', bin: 'Adding' }
          ],
          successNote: 'One line, two directions. That is the whole of adding and subtracting.'
        },
        {
          code: 'S2-X3', kind: 'choice',
          prompt: 'Walk from 5 to 5 without stopping anywhere else. How?',
          options: [
            { label: 'Take no steps at all', correct: true },
            { label: 'Take one step each way', feedback: 'That works, but you stopped somewhere else on the way. Read the question again.' },
            { label: 'It cannot be done', feedback: 'Standing still is allowed. Adding nothing leaves you where you were.' }
          ],
          successNote: 'Adding nothing changes nothing, which is what 0 does when you add it.',
          revealNote: 'No steps. You are already there.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'The line comes to an end',
      sources: ['WN3'],
      readings: [
        {
          code: 'S3-A',
          text: 'Now try to take 5 from 2. Stand on 2 and walk left. One step, you are on 1. Another, you are on 0. And now there is nowhere to put your foot. Two steps have been taken and three are still owed, and the line has simply stopped. Nothing is wrong with the walking. The line is too short.'
        },
        {
          code: 'S3-B',
          text: 'Take 5 from 2 by walking. You get as far as 0 with three steps still to take, and the line ends there. The question was perfectly sensible and the method was right; there is just no ground left to walk on.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'line-runs-out',
          note: 'Section 2\'s walk, asked for 2 − 5. The marker moves to 0 and then refuses, with the steps still owed shown counting down and stuck. Founder-facing note: the refusal is the content. A learner who has been told negatives exist learns nothing here, but one who has not is now holding a question that the next section answers, which is Wentworth\'s own order and the reason this board has four sections rather than three.'
        },
        {
          code: 'S3-I2', kind: 'walk-line',
          note: 'The same walk with the line already extended leftward, so the marker sails past 0 without comment. Smoother, and it teaches nothing: the learner never notices that anything needed inventing.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Walking left from 2, you reach 0 with three steps still owed. What is the trouble?',
          options: [
            { label: 'The line has no more places to stand', correct: true },
            { label: 'The subtraction was done wrongly', feedback: 'The walking was right. You took the steps in the correct direction, and the ground ran out.' },
            { label: 'The answer is 0', feedback: '0 is where you stopped, not the answer. Three steps are still owed.' }
          ],
          successNote: 'The method held. The line was too short, and that is a different kind of problem.',
          revealNote: 'There is nowhere left of 0 to stand, yet.'
        },
        {
          code: 'S3-X2', kind: 'match',
          prompt: 'Sort each subtraction by whether this line can do it.',
          bins: ['The line can do it', 'It runs out'],
          items: [
            { label: '9 − 4', bin: 'The line can do it' },
            { label: '3 − 8', bin: 'It runs out' },
            { label: '6 − 6', bin: 'The line can do it' },
            { label: '1 − 2', bin: 'It runs out' }
          ],
          successNote: 'It fails exactly when the second number is the larger. Every one of those is about to become possible.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'Going on past nothing',
      sources: ['WN4', 'WN1'],
      readings: [
        {
          code: 'S4-A',
          text: 'So build more line. Keep the same equal steps and carry on to the left of 0. The new places need names, and they are marked with a minus: −1, −2, −3. Now 2 − 5 has an answer, −3, and it was reached by walking exactly as before. The numbers to the right may be written with a plus, +1, +2, to show which side they are on.'
        },
        {
          code: 'S4-B',
          text: 'Continue the line past 0, with the same steps, in the same way. Those positions are written with a minus in front: −1, −2, −3. Nothing about the walking changes. The only thing that was ever missing was somewhere to land.'
        },
        {
          code: 'S4-C',
          text: 'A trader\'s money goes up with gains and down with losses. A thermometer rises and falls. In each case there are two opposite directions, and the line now has both: to the right of 0 are the positive numbers, written with a plus, and to the left are the negative numbers, written with a minus. Where you are is the number, and which side you are on is its sign.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'extend-left',
          note: 'The stuck walk from section 3, with a button that lays new units leftward one at a time. The marker completes the journey it was refused, and lands on −3. Continuity is the argument: the same walk, the same steps, finished. Nothing new was learned about subtracting, only about where it can happen.'
        },
        {
          code: 'S4-I2', kind: 'both-ways',
          note: 'The full line from −5 to 5 with a draggable marker, showing the sign changing as it crosses 0. Good for reading positions and for the thermometer sense of it, but the line arrives already finished, so it does not answer section 3 so much as replace it.'
        }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'Walking left from 2, five steps. Where do you finish?',
          options: [
            { label: '−3', correct: true },
            { label: '3', feedback: 'You went left, past 0. The side you end on is what the minus records.' },
            { label: '−7', feedback: 'That is five steps from −2, not from 2. Start on the right of 0.' }
          ],
          successNote: 'The same walk that failed a minute ago, finished. Only the ground changed.',
          revealNote: 'Two steps reach 0, three more reach −3.'
        },
        {
          code: 'S4-X2', kind: 'match',
          prompt: 'Sort each by which side of 0 it lands on.',
          bins: ['Left of 0', 'Right of 0'],
          items: [
            { label: 'a loss of £4', bin: 'Left of 0' },
            { label: 'a gain of £6', bin: 'Right of 0' },
            { label: 'three degrees below freezing', bin: 'Left of 0' },
            { label: 'two steps forward', bin: 'Right of 0' }
          ],
          successNote: 'The sign is not a smaller kind of number. It is which way from nothing.'
        },
        {
          code: 'S4-X3', kind: 'order',
          prompt: 'Put these in order, leftmost first.',
          items: ['−4', '−1', '0', '3'],
          successNote: 'Reading left to right is reading smallest to largest, and that stays true across 0.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The walking bench',
      kind: 'walk-bench',
      blurb: 'A line, a marker, and steps to take. Get where you are asked to go.',
      goals: [
        { id: 'w1', text: 'Finish on 4' },
        { id: 'w2', text: 'Finish on −2' },
        { id: 'w3', text: 'Finish on 0 having been left of it first' },
        { id: 'w4', text: 'Take a walk that ends where it began' }
      ],
      note: 'Goal 3 is the one worth having. Getting back to 0 from the left means walking right while still on negative ground, which is the step learners find hardest: rightward is still adding even when the numbers look like they are shrinking. Goal 4 plants opposites cancelling, which is what the gap board later calls a change of nought.'
    }
  ]
};
