// Factory options for "The Coordinate Plane", second board of the proposed
// Functions and Coordinate Geometry pilot. Designed with the founder in session
// on 2026-08-09.
//
// This board has no source. Gutenberg holds nothing in English on coordinate
// geometry: the search returns no records, and analytic geometry returns only
// French and German works. Thompson sidesteps it, writing in ch. X that every
// schoolboy is familiar with curve-plotting and moving on. Descartes' La
// Géométrie of 1637 is the historical origin and is named as such, but it is
// French and untranslated, so it is not a source we are adapting.
//
// The board is therefore ORIGINAL, built on the number line BB2 already put on
// screen. That status does not yet exist in the declaration; see the pilot
// proposal.

export const selections = {
  'S1-A': '2026-08-09',
  'S1-I1': '2026-08-09',
  'S1-X1': '2026-08-09',
  'S1-X2': '2026-08-09',
  'S2-A': '2026-08-09',
  'S2-I1': '2026-08-09',
  'S2-X1': '2026-08-09',
  'S2-X2': '2026-08-09',
  'S3-A': '2026-08-09',
  'S3-I1': '2026-08-09',
  'S3-X1': '2026-08-09',
  'S3-X2': '2026-08-09',
  'S3-X3': '2026-08-09',
  'S4-A': '2026-08-09',
  'S4-I1': '2026-08-09',
  'S4-X1': '2026-08-09',
  'S4-X2': '2026-08-09',
  'W1': '2026-08-09'
};

export const finalised = {
  'S2-A': 'Taken on the founder\'s pattern: A was named for S1, S3 and S4 and S2 was left unstated. Reversible.'
};

export const rejected = {
  'S1-B': 'Not selected; S1-A states the failure more directly.',
  'S2-B': 'Not selected; S2-A names the axes and the origin in one pass.',
  'S3-B': 'Not selected; S3-A gives the worked example (3, 4) against (4, 3).',
  'S4-B': 'Not selected; S4-A states the sign rule for each direction separately.'
};
export const gated = 'Belongs to a proposed pilot that has not been approved, and uses an ORIGINAL source status the declaration does not yet have.';

export const plane = {
  id: 'FCG-PLANE-001',
  title: 'The Coordinate Plane',
  fork: 'The number line is shown to fail before the second axis is offered.',
  structure: 'Four sections.',
  sections: [
    {
      code: 'S1',
      name: 'One line is not enough',
      sources: [],
      readings: [
        {
          code: 'S1-A',
          text: 'A number line can say where something is, so long as it sits on the line. Here are two points. The line reports both of them as 3, and they are plainly not in the same place. One number is not enough to fix a position.'
        },
        {
          code: 'S1-B',
          text: 'Everything so far has been a single number on a single line. That works while there is only one direction to move in. These two points are not in the same place, yet the line has only one answer for both of them.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'line-fails',
          note: 'BB2\'s number line returns with two points above the same mark at different heights, and the readout gives 3 for both. The line is shown to be wrong rather than merely limited, which is a stronger motivation for the second axis than being told one is needed.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'Why can the number line not tell these two points apart?',
          options: [
            { label: 'It only records one direction', correct: true },
            { label: 'The points are too close together', feedback: 'Move them further apart vertically and the line still gives the same answer.' },
            { label: 'The line is not long enough', feedback: 'Length is not the problem. The line has no way to record height at all.' }
          ],
          successNote: 'One line, one direction, one number. Anything off the line is invisible to it.',
          revealNote: 'The line records how far along, and nothing else.'
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'What is missing from the description "at 3"?',
          options: [
            { label: 'How far up or down', correct: true },
            { label: 'Which line is meant', feedback: 'There is only one line here, so that is not the gap.' },
            { label: 'The units', feedback: 'Units would help, but two points with the same units are still confused.' }
          ],
          successNote: 'A second direction needs a second number.',
          revealNote: 'Along is recorded. Up is not.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'Two lines, crossed',
      sources: [],
      readings: [
        {
          code: 'S2-A',
          text: 'Lay one number line flat and stand a second one upright, crossing it at a right angle. The flat one is called the x-axis and the upright one the y-axis. The point where they cross is called the origin, and it is zero on both at once.'
        },
        {
          code: 'S2-B',
          text: 'Add a second number line at a right angle to the first. Together the two record how far along and how far up. Where they cross, both read zero; that point is the origin, and every position is measured from it.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'axes-build',
          note: 'The flat line is already there from section 1. The upright one arrives, the crossing point is marked, and the two earlier points separate as soon as the second reading exists. The fix is seen to fix the specific failure just shown.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'What is the origin?',
          options: [
            { label: 'The point where the two axes cross', correct: true },
            { label: 'The start of the x-axis', feedback: 'The x-axis runs both ways from the origin, so it has no start.' },
            { label: 'The bottom left corner of the grid', feedback: 'That is only where the drawing stops. The origin is where both readings are zero.' }
          ],
          successNote: 'Zero on both lines at once, and everything is measured from it.',
          revealNote: 'The origin is the crossing point, where both axes read zero.'
        },
        {
          code: 'S2-X2', kind: 'match',
          prompt: 'Sort each into which axis records it.',
          bins: ['x-axis', 'y-axis'],
          items: [
            { label: 'how far along', bin: 'x-axis' },
            { label: 'how far up', bin: 'y-axis' },
            { label: 'the flat one', bin: 'x-axis' },
            { label: 'the upright one', bin: 'y-axis' }
          ],
          successNote: 'One axis for each direction, which is why two numbers are needed.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'Every place has an address',
      sources: [],
      readings: [
        {
          code: 'S3-A',
          text: 'A position is written as a pair of numbers in brackets: the reading along first, then the reading up. So (3, 4) means three along and four up. The order is fixed, and it matters: (4, 3) is somewhere else entirely.'
        },
        {
          code: 'S3-B',
          text: 'Two readings make an address, written (3, 4). Along comes first and up comes second, always. Swap them and you have named a different place, so the order is part of the address rather than a convention you may ignore.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'find-place',
          note: 'An address is given and the learner taps the cell. Founder chose reading over writing. Because the two orderings never appear together in this form, order-matters is taught by the task sequence instead: (3,4) is asked for, then immediately (4,3), so the learner places two different points themselves rather than watching a swap.'
        }
      ],
      exercises: [
        { code: 'S3-X1', kind: 'find-target', prompt: 'Find (3, 4).', tx: 3, ty: 4 },
        { code: 'S3-X2', kind: 'find-target', prompt: 'Now find (4, 3).', tx: 4, ty: 3 },
        {
          code: 'S3-X3', kind: 'choice',
          prompt: 'You have just placed (3, 4) and (4, 3). What does that show?',
          options: [
            { label: 'The order of the two numbers changes the place', correct: true },
            { label: 'They are the same place written two ways', feedback: 'You placed them in different cells. They cannot be the same place.' },
            { label: 'Brackets are needed to tell them apart', feedback: 'The brackets group the pair. It is the order inside them that decides where.' }
          ],
          successNote: 'Along first, up second, always. The order carries meaning.',
          revealNote: '(3, 4) is three along and four up. (4, 3) is four along and three up.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'Four quarters, and what the signs say',
      sources: [],
      readings: [
        {
          code: 'S4-A',
          text: 'The two axes cut the plane into four quarters. Right of the origin the first number is positive and left of it negative; above the origin the second is positive and below it negative. The pair of signs alone tells you which quarter a point is in.'
        },
        {
          code: 'S4-B',
          text: 'Each axis runs both ways from the origin, so a reading can be negative as well as positive. That gives four quarters. Reading the two signs is enough to say which quarter a point lies in, without knowing the numbers themselves.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'quadrants',
          note: 'The full plane with all four quarters drawn and the sign pair shown for whichever the point is in. The sign pair updates as the point moves, so the rule is read off the screen rather than memorised from a table.'
        }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'A point has a negative first number and a positive second. Where is it?',
          options: [
            { label: 'Left of the origin and above it', correct: true },
            { label: 'Right of the origin and below it', feedback: 'That would be positive then negative, the other way round.' },
            { label: 'Left of the origin and below it', feedback: 'Negative on both, that one. Here the second reading is positive.' }
          ],
          successNote: 'The first sign says left or right, the second says up or down.',
          revealNote: 'Negative first means left; positive second means above.'
        },
        {
          code: 'S4-X2', kind: 'match',
          prompt: 'Sort each pair of signs by where it puts a point.',
          bins: ['Above the axis', 'Below the axis'],
          items: [
            { label: '(+, +)', bin: 'Above the axis' },
            { label: '(−, +)', bin: 'Above the axis' },
            { label: '(+, −)', bin: 'Below the axis' },
            { label: '(−, −)', bin: 'Below the axis' }
          ],
          successNote: 'Only the second sign decides up or down. The first has nothing to say about it.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The diagonal discovery',
      kind: 'diagonal-bench',
      blurb: 'Place points wherever you like. Three of the goals ask for particular ones.',
      goals: [
        { id: 'p1', text: 'Place (2, 2)' },
        { id: 'p2', text: 'Place (3, 3)' },
        { id: 'p3', text: 'Place (4, 4)' },
        { id: 'p4', text: 'Place a fourth point on the same line' }
      ],
      note: 'The goals never say the points will line up. Once three are placed the pattern is visible and the fourth goal asks the learner to continue it, which can only be done by noticing that both readings are equal. A rule making a shape, planted here so that board 8 has something to build on, in the same way the tiling bench planted square roots.'
    }
  ]
};
