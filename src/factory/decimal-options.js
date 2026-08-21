// Factory options for "Numbers Between the Whole Ones", the first board of a
// Foundations unit. Drafted 2026-08-10 on founder instruction to extend the
// curriculum downward with basic material.
//
// This is not a new topic invented to fill space. The prerequisite map lists
// P-01 to P-08 as things a learner must already be able to do, and not one of
// them is taught anywhere in the course. P-03 is "use decimals such as 0.5 and
// 2.5; compare and subtract two decimals", and it is required by two boards that
// are live right now: A Letter for a Number puts x = 2.5 on screen in its first
// section, and The Gap Between Two Values subtracts decimals throughout. The
// course has been assuming this since its opening minute. The same fault as area
// being assumed by the square board, and the coordinate plane being drawn before
// it was introduced.
//
// Source: De Morgan, Elements of Arithmetic, 1858, Book I section VI. The shelf
// has always named this book with the role "prerequisite repair BBs" and nobody
// had opened it until now.
//
// MODERNISATION, and it must be in the record. De Morgan writes a decimal with a
// leading point and no zero: ·7, not 0.7. That was ordinary in 1858 and would be
// read as a typing slip now, so every reading here writes 0.7. His word "cipher"
// for nought is likewise replaced. What is kept is his actual argument, which is
// that the point does not change the digits, it announces where they stand.
//
// The board is built around one misconception rather than a list of facts: that
// 0.35 is larger than 0.5 because 35 is larger than 5. That is the commonest
// error with decimals, it is what P-03's evidence check tests, and section 4
// exists to walk a learner into it and out again.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Foundations unit, proposed 2026-08-10. Repairs a prerequisite the course has assumed since its first board. Not yet placed in the curriculum map and nothing here has been selected.';

export const decimal = {
  id: 'ARI-DECIMAL-001',
  title: 'Numbers Between the Whole Ones',
  fork: 'The gap between two whole numbers is opened first. Notation arrives to name what is already there.',
  structure: 'Four sections, one number line throughout.',
  sections: [
    {
      code: 'S1',
      name: 'There is room between 2 and 3',
      sources: [],
      readings: [
        {
          code: 'S1-A',
          text: 'Count along: one, two, three. It sounds as though nothing lies between them. But a jug can hold more than two litres and less than three, and a child can be taller than one metre and shorter than two. The whole numbers are marks on a line, not the whole of it. Everything in between needs a way of being written down.'
        },
        {
          code: 'S1-B',
          text: 'Whole numbers leave gaps. Between 2 and 3 there is no whole number at all, and yet a length can easily fall there. The line between the marks is not empty; it is simply unlabelled so far.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'zoom-line',
          note: 'A number line with whole marks, and a magnifier that opens the stretch between 2 and 3 until ten new marks appear inside it. Nothing is added by the zoom; the point being made is that they were always there and the first drawing was too coarse to show them. This is the object the whole board uses.'
        },
        {
          code: 'S1-I2', kind: 'jug-fill',
          note: 'A jug filling past the 2 litre mark and stopping short of 3, with the reading refusing to settle on a whole number. Concrete and immediate, and it makes the need felt rather than shown. Weaker as the board\'s spine because a jug cannot be zoomed into repeatedly the way a line can.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'How many whole numbers are there between 2 and 3?',
          options: [
            { label: 'None', correct: true },
            { label: 'One', feedback: 'Name it. There is no whole number you can put between them.' },
            { label: 'Ten', feedback: 'Ten marks can be drawn there, but none of them is a whole number.' }
          ],
          successNote: 'None at all, and yet lengths and weights land there constantly. That is the gap this board fills.',
          revealNote: 'There is no whole number between 2 and 3.'
        },
        {
          code: 'S1-X2', kind: 'match',
          prompt: 'Sort each measurement by whether a whole number can express it.',
          bins: ['A whole number will do', 'It falls between'],
          items: [
            { label: '4 apples', bin: 'A whole number will do' },
            { label: 'half a litre of milk', bin: 'It falls between' },
            { label: '7 chairs', bin: 'A whole number will do' },
            { label: 'the height of a door in metres', bin: 'It falls between' }
          ],
          successNote: 'Things you count land on whole numbers. Things you measure usually do not.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'Split the step into ten',
      sources: ['D1'],
      readings: [
        {
          code: 'S2-A',
          text: 'Take the step from 2 to 3 and cut it into ten equal parts. Each part is one tenth. Stand at the third mark past 2 and you are at two and three tenths, which is written 2.3. The dot separates the whole ones on its left from the tenths on its right.'
        },
        {
          code: 'S2-B',
          text: 'One whole, divided into ten equal parts, gives tenths. Three of them is three tenths, written 0.3. Put that after a 2 and you have 2.3, meaning two whole ones and three tenths. Everything to the left of the dot is whole; everything to the right is a part.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'split-bar',
          note: 'One unit bar that cuts into ten on a tap, with a counter filling as segments are shaded. The learner builds 0.3 by shading three parts rather than being shown it. The fraction and the decimal are written side by side as it goes, which is exactly the equivalence art. 135 sets up.'
        },
        {
          code: 'S2-I2', kind: 'zoom-line',
          note: 'Section 1\'s line again, now labelled 2.0 to 3.0 with a marker that steps along the tenths. Continuity is the argument: the same line, one thing added. It repeats S1-I1\'s apparatus, which is either the point or the objection depending on how much variety a section is meant to carry.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'A step from 0 to 1 is cut into ten equal parts. What is one part worth?',
          options: [
            { label: 'One tenth, written 0.1', correct: true },
            { label: 'One tenth, written 0.10', feedback: 'That is the same number, and both are correct. But 0.1 is how it is usually written.' },
            { label: 'Ten, written 10', feedback: 'Ten parts make the whole, so one part must be smaller than the whole, not larger.' }
          ],
          successNote: 'Ten equal parts, each one tenth. The dot marks where the whole ones stop.',
          revealNote: 'One of ten equal parts is one tenth, written 0.1.'
        },
        {
          code: 'S2-X2', kind: 'match',
          prompt: 'Match each position on the line to how it is written.',
          bins: ['0.5', '2.3', '1.0'],
          items: [
            { label: 'halfway between 0 and 1', bin: '0.5' },
            { label: 'three tenths past 2', bin: '2.3' },
            { label: 'exactly one whole', bin: '1.0' }
          ],
          successNote: 'A decimal is a position, not a new kind of thing. It is where you are standing on the line.'
        },
        {
          code: 'S2-X3', kind: 'choice',
          prompt: 'What does the dot in 2.3 do?',
          options: [
            { label: 'Separates the whole ones from the parts', correct: true },
            { label: 'Means multiply', feedback: 'Nothing is multiplied. The dot is a divider, not an operation.' },
            { label: 'Separates two different numbers', feedback: '2.3 is one number, not two. It sits between 2 and 3 on the line.' }
          ],
          successNote: 'Left of the dot, whole ones. Right of it, parts of one. That is all it announces.',
          revealNote: 'It divides the whole ones from the tenths.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'The place is what counts',
      sources: ['D2', 'D3', 'D4'],
      readings: [
        {
          code: 'S3-A',
          text: 'Cut a tenth into ten again and you have hundredths. That is why place matters: the 7 in 0.7 is seven tenths, and the 7 in 0.07 is seven hundredths, which is far smaller. The digit has not changed. Where it stands has. A nought after the dot counts as nothing itself, but it holds the place and pushes what follows further to the right.'
        },
        {
          code: 'S3-B',
          text: 'The same digit means different amounts in different places. In 0.7 the seven is tenths. In 0.07 it is hundredths, ten times smaller. The nought is not doing arithmetic; it is holding a position, and without it the seven would slide into the wrong column.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'place-columns',
          note: 'Labelled columns, wholes then tenths then hundredths, with a single digit that can be dragged between them while its value is read out. One digit, three homes, three values. The strongest version of the idea because nothing changes except position, which is the entire claim.'
        },
        {
          code: 'S3-I2', kind: 'split-bar',
          note: 'Section 2\'s bar, cut a second time so a tenth becomes ten hundredths. Shows where hundredths come from rather than asserting them, but it is slow, and the column picture is what the checks actually test.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Which is larger, 0.7 or 0.07?',
          options: [
            { label: '0.7', correct: true },
            { label: '0.07', feedback: 'Both have a 7, so look at where it stands. Tenths are ten times larger than hundredths.' },
            { label: 'They are equal', feedback: 'The digits are the same but the places are not, and the place decides the value.' }
          ],
          successNote: 'Seven tenths against seven hundredths. Same digit, different column, ten times the size.',
          revealNote: '0.7 is seven tenths; 0.07 is seven hundredths, which is ten times smaller.'
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Is 0.5 the same as 0.50?',
          options: [
            { label: 'Yes, the nought on the end adds nothing', correct: true },
            { label: 'No, 0.50 is larger', feedback: 'Nothing was added. Five tenths is fifty hundredths; the same position on the line.' },
            { label: 'No, 0.50 has two parts', feedback: 'It has two written places, but the second is empty. The value is unchanged.' }
          ],
          successNote: 'A nought on the right-hand end changes nothing. A nought between the dot and a digit changes everything.',
          revealNote: 'Both are five tenths, the same position on the line.'
        },
        {
          code: 'S3-X3', kind: 'match',
          prompt: 'Sort each number by the value of its 3.',
          bins: ['Three tenths', 'Three hundredths'],
          items: [
            { label: '0.3', bin: 'Three tenths' },
            { label: '0.03', bin: 'Three hundredths' },
            { label: '1.3', bin: 'Three tenths' },
            { label: '2.03', bin: 'Three hundredths' }
          ],
          successNote: 'Count places from the dot, not digits from the left. That is the whole skill.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'Which one is bigger',
      sources: ['D3'],
      readings: [
        {
          code: 'S4-A',
          text: 'Here is the trap. Is 0.35 bigger than 0.5? It looks it, because 35 is bigger than 5. It is not. 0.5 is five tenths, and 0.35 is three tenths and a bit, so 0.5 is ahead. Ignore how long the number looks and compare the first place after the dot, then the next, and so on until they differ.'
        },
        {
          code: 'S4-B',
          text: 'A longer decimal is not a larger one. Compare place by place, starting immediately after the dot: 0.5 has five tenths where 0.35 has three, so 0.5 is the larger and nothing further needs checking. The number of digits tells you nothing about the size.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'compare-two',
          note: 'Two markers on one line, each set by its own digits, with the line settling the argument. Founder-facing note: the learner is invited to predict which is larger before the markers are placed, so the trap is walked into deliberately. Being wrong here on 0.35 against 0.5 is worth more than being told, and the line cannot be argued with.'
        },
        {
          code: 'S4-I2', kind: 'place-columns',
          note: 'The two numbers stacked in aligned columns so the tenths sit above the tenths. Makes the comparison mechanical and correct, but it hands over the method before the learner has felt why they need one.'
        }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'Which is larger, 0.35 or 0.5?',
          options: [
            { label: '0.5', correct: true },
            { label: '0.35', feedback: 'That is the trap: 35 is a bigger figure than 5, but 0.35 is three tenths and a bit, and 0.5 is five tenths.' },
            { label: 'They are equal', feedback: 'Put both on the line. One is clearly further along.' }
          ],
          successNote: 'This is the commonest mistake anyone makes with decimals, and you have now met it on purpose.',
          revealNote: '0.5 is five tenths; 0.35 is three tenths and five hundredths. Five tenths is more.'
        },
        {
          code: 'S4-X2', kind: 'order',
          prompt: 'Put these in order, smallest first.',
          items: ['0.09', '0.2', '0.35', '0.5'],
          successNote: 'Compare the tenths first. Only when they tie does the next place matter.'
        },
        {
          code: 'S4-X3', kind: 'choice',
          prompt: 'Why is comparing the number of digits no use?',
          options: [
            { label: 'A digit\'s value depends on its place, not the count of digits', correct: true },
            { label: 'Because decimals are always less than one', feedback: '2.5 is a decimal and it is more than one. And 0.9 beats 0.1234 anyway.' },
            { label: 'Because the digits might be noughts', feedback: 'True sometimes, but 0.35 against 0.5 has no noughts and still catches people.' }
          ],
          successNote: 'Length is not size. Place is size.',
          revealNote: 'Each place is worth ten times the one after it, so position decides.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The measuring bench',
      kind: 'measure-bench',
      blurb: 'A line, a marker, and some things to measure. Read each one off and write it down.',
      goals: [
        { id: 'd1', text: 'Place a marker at 0.4' },
        { id: 'd2', text: 'Place one between 0.4 and 0.5' },
        { id: 'd3', text: 'Place a marker at exactly one half' },
        { id: 'd4', text: 'Place a marker that is larger than 0.35 but smaller than 0.4' }
      ],
      note: 'Goal 2 is the one that pays. A learner who thinks tenths are the end of the matter has nowhere to put the marker, and has to cut again to reach hundredths, which is section 3 arrived at by need rather than instruction. Goal 4 is the section 4 trap in the learner\'s own hands: it is only findable once they stop reading 0.35 as thirty-five. Goal 3 asked for two ways of writing one half in the first draft, which a marker on a line cannot express; that belongs in a check, and S3-X2 already asks it.'
    }
  ]
};
