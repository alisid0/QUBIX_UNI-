// Factory options for "A Number In, A Number Out", the functions board of the
// proposed Functions and Coordinate Geometry pilot. Drafted 2026-08-09.
//
// The pilot proposal records this board as part-ORIGINAL on the grounds that the
// word "function" in its modern sense is not on the shelf. That is wrong, and
// reading the transcription settled it: Thompson names the word outright at ch.
// III printed page 14, gives the dependent/independent distinction on 14-15, and
// gives the F(x), f(x), φ(x) notation on 15. The board is adapted, not original.
//
// Level is carried by Wentworth rather than Thompson. Art. 40 describes exactly
// what a learner does here, in the plainest terms the shelf offers: put the
// numbers in for the letters, then perform the operations.
//
// What is genuinely new against the boards before it. The second letter board
// already teaches dependence, and already names the independent and dependent
// variables in its section 3, so neither may be retaught here. What this board
// adds is that the rule is a thing in its own right, separable from the
// quantities it joins, and can be exchanged while the inputs stand still. The
// second letter board only ever had one rule, y = x², which quietly suggests
// that depending on something and squaring it are the same idea.

// Founder pass of 2026-08-09. Sections 1 to 3 settled; section 3's interaction
// sent back and rebuilt; section 4 and both workshops still open.
//
// Both interactions were kept in sections 1 and 2 rather than one of each. That
// is deliberate on the founder's part and it doubles those sections: S1-I1 and
// S1-I2 show the same substitution twice, once as working and once as a box,
// and S2-I1 and S2-I2 show rule-swapping twice. Worth a look at length before
// the record is written.
export const selections = {
  'S1-A': '2026-08-09',
  'S1-I1': '2026-08-09',
  'S1-I2': '2026-08-09',
  'S1-X1': '2026-08-09',
  'S1-X2': '2026-08-09',
  'S1-X3': '2026-08-09',
  'S2-A': '2026-08-09',
  'S2-I1': '2026-08-09',
  'S2-I2': '2026-08-09',
  'S2-X1': '2026-08-09',
  'S2-X2': '2026-08-09',
  'S2-X3': '2026-08-09',
  // Founder: "a big revelation".
  'S3-B': '2026-08-09',
  'S3-X1': '2026-08-09',
  'S3-X2': '2026-08-09',
  'S3-X3': '2026-08-09',
  // Taken after both S3 interactions were rebuilt. The founder chose the one
  // that asks for a prediction before it reveals anything.
  'S3-I2': '2026-08-09',
  'S4-B': '2026-08-09',
  // Founder: neither S4 variant is an interaction in any real sense, and we
  // should not have interactions merely for the sake of them. S4-I2 taken as
  // the honest version: a figure, not a control. See the note on that variant.
  'S4-I2': '2026-08-09',
  'S4-X1': '2026-08-09',
  'S4-X2': '2026-08-09',
  'S4-X3': '2026-08-09',
  'W1': '2026-08-09',
  'W2': '2026-08-09'
};
export const finalised = {};

export const rejected = {
  'S1-B': 'Not selected; S1-A carries Wentworth\'s worked example rather than describing it.',
  'S2-B': 'Not selected; S2-A names the three rules and the fixed input column outright.',
  'S3-A': 'Not selected; S3-B states the definition first and uses the ladder as the illustration rather than the other way round.',
  'S3-I1': 'Not selected; S3-I2 asks the learner to commit to a prediction before the readouts are shown.',
  'S4-A': 'Not selected; S4-B states what the notation records and what F is not, without the aside about tiresome writing.',
  'S4-I1': 'Founder, 2026-08-09: not an interaction in any real sense. Cycling a letter is a control invented to fill the slot rather than something the learner needs to do.'
};
export const gated = 'Belongs to a proposed pilot that has not been approved. See PILOT-PROPOSAL-FUNCTIONS-AND-COORDINATE-GEOMETRY.md. Nothing here has been selected yet.';

export const func1 = {
  id: 'FCG-FUNC-001',
  title: 'A Number In, A Number Out',
  fork: 'The rule is made a separate object before it is given a name. Naming comes last.',
  structure: 'Four sections, one machine throughout.',
  sections: [
    {
      code: 'S1',
      name: 'Putting a number in',
      sources: ['F1'],
      readings: [
        {
          code: 'S1-A',
          text: 'An expression such as 3b² is not a number until you say what b stands for. Put a number in place of the letter, carry out the operations the signs ask for, and what comes back is a single number. Put 4 in place of b and 3b² becomes 3 × 4², which is 48.'
        },
        {
          code: 'S1-B',
          text: 'Give the letter a value and the expression turns into a number. Replace every letter by the number it stands for, then do what the signs tell you to do. That is the whole of it, and the answer that comes out is one number, not several.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'substitute-strip',
          note: 'Wentworth\'s own worked example, made operable. Step b through 1 to 6 and the three lines of working rewrite themselves: 3b², then 3 × b², then the number. The learner sees substitution as a sequence of steps rather than a single leap to an answer.'
        },
        {
          code: 'S1-I2', kind: 'machine-single',
          note: 'The machine as a box: an input at the top, a rule plate reading 3b², an output at the bottom. Simpler than I1 and it introduces the object the rest of the board uses, but it hides the working, which is the part art. 40 is actually about.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'If b = 5, what is the value of 3b²?',
          options: [
            { label: '75', correct: true },
            { label: '225', feedback: 'That is (3 × 5)², squaring after multiplying. The 2 sits on the b alone, so square first.' },
            { label: '30', feedback: 'That is 3 × 5 × 2. The little 2 means b times b, not b times 2.' }
          ],
          successNote: 'Square the 5 first, then multiply by 3. The signs decide the order, not the reading order.',
          revealNote: '3b² with b = 5 is 3 × 25 = 75.'
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'Before any value is given to b, what is 3b²?',
          options: [
            { label: 'An instruction, waiting for a number', correct: true },
            { label: 'A number we have not worked out yet', feedback: 'There is nothing to work out. Until b has a value the expression has no value either.' },
            { label: 'Zero, because b has no value', feedback: 'No value assigned is not the same as the value nought. Nought is a number; b has none yet.' }
          ],
          successNote: 'An expression is a set of instructions. It becomes a number only when a number goes in.',
          revealNote: 'It is a set of operations waiting for a value.'
        },
        {
          code: 'S1-X3', kind: 'order',
          prompt: 'Put the steps of working out 5ab² in order, for a = 2 and b = 3.',
          items: [
            'Write down what each letter stands for: a = 2, b = 3',
            'Replace the letters: 5 × 2 × 3²',
            'Carry out the operations: 5 × 2 × 9',
            'One number comes out: 90'
          ],
          successNote: 'Values in, operations performed, one number out. That order never changes.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'The rule is a thing of its own',
      sources: ['F1'],
      readings: [
        {
          code: 'S2-A',
          text: 'The instructions can be changed while the numbers going in stay exactly the same. Double it, add three, square it: three different rules, one column of inputs, three different columns of answers. The rule is not part of the numbers. It is a separate thing you can lift out and replace.'
        },
        {
          code: 'S2-B',
          text: 'So far only one rule has been used, and squaring has looked like part of what a dependence is. It is not. Feed the same numbers into a different rule and different numbers come out. The rule can be exchanged without touching either the input or the letters.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'rule-swap',
          note: 'The central interaction of the board. Three rule plates sit beside a machine with one slot. Tap a plate to load it. A fixed column of inputs 1 to 4 stays put while the output column recomputes. Nothing moves except the answers, which is the whole argument: the rule is the part that changed.'
        },
        {
          code: 'S2-I2', kind: 'two-machines',
          note: 'Two machines side by side, different plates, one shared input stepper. Makes the comparison simultaneous rather than sequential. Weaker than I1 because it shows two rules rather than one slot that rules pass through, and the slot is the idea.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'match',
          prompt: 'The input was 4 each time. Sort each answer under the rule that produced it.',
          bins: ['double it', 'add three', 'square it'],
          items: [
            { label: '8', bin: 'double it' },
            { label: '7', bin: 'add three' },
            { label: '16', bin: 'square it' }
          ],
          successNote: 'One input, three rules, three answers. The input did not decide the answer on its own.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'A rule turns 3 into 9. Which rule is it?',
          options: [
            { label: 'It cannot be decided from one pair', correct: true },
            { label: 'Square it', feedback: 'Squaring does turn 3 into 9. So does adding six, and so does trebling. One pair is not enough.' },
            { label: 'Add six', feedback: 'Adding six does turn 3 into 9. So does squaring, and so does trebling. One pair is not enough.' }
          ],
          successNote: 'Three different rules agree at 3. They part company everywhere else, which is why a rule is more than the pairs you have seen.',
          revealNote: 'Squaring, trebling and adding six all send 3 to 9.'
        },
        {
          code: 'S2-X3', kind: 'choice',
          prompt: 'The output column changed but the input column did not. What changed?',
          options: [
            { label: 'The rule', correct: true },
            { label: 'The numbers going in', feedback: 'Those are the column that stayed still. Look at what is left.' },
            { label: 'The letters', feedback: 'The letters are the same ones. They are not what does the work here.' }
          ],
          successNote: 'The rule is separable. That is the one new thing on this board.',
          revealNote: 'Only the rule changed, which is what makes it a thing in its own right.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'The word for it',
      sources: ['F2', 'F3', 'F4'],
      readings: [
        {
          code: 'S3-A',
          text: 'Not every pair of quantities is joined this way. A ladder leans on a wall. Pull its foot out and the height it reaches drops, so those two are joined. But pull its foot out and the number of bricks in the wall does not stir, nor does the year the wall was built. When two quantities are joined so that changing the first changes the second, that relation is called a function.'
        },
        {
          code: 'S3-B',
          text: 'A relation between two quantities, such that whenever the first varies the second varies too, is called a function. The word does not apply to every pair of quantities you can name. Move the foot of a ladder and the height it reaches changes; the number of bricks in the wall it leans on does not.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'relation-test',
          note: 'Rebuilt 2026-08-09 after the founder reported that section 3\'s interactions did not work. The first build had no ladder in it: a slider and three number boxes, with the two unresponsive readouts greyed to half opacity. Greying them said the machine had switched them off, when the whole point is that nothing joins them to the foot of the ladder in the first place. The ladder is now drawn against a brick wall with a date plaque, the foot slides and the top comes down the wall, the height is marked on the wall itself, and all three readouts carry equal weight so that two of them visibly failing to move is something the learner sees rather than something the styling has pre-announced.'
        },
        {
          code: 'S3-I2', kind: 'relation-guess',
          note: 'Also rebuilt. The first build was a static card with no controls at all, and its note claimed a ladder was drawn beside it when none was. Same ladder as I1, but each readout is covered until the learner has said whether it will change. Predicting before testing is a different act from watching, and it catches the learner who would have said the year changes.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'match',
          prompt: 'The foot of the ladder is pulled further from the wall. Sort each quantity by whether it changes.',
          bins: ['Changes with it', 'Does not change'],
          items: [
            { label: 'the height the ladder reaches', bin: 'Changes with it' },
            { label: 'the angle it leans at', bin: 'Changes with it' },
            { label: 'the number of bricks in the wall', bin: 'Does not change' },
            { label: 'the year the wall was built', bin: 'Does not change' }
          ],
          successNote: 'Only the first two are functions of the distance. The other two are simply other facts about the wall.'
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Why is the number of bricks not a function of how far out the ladder stands?',
          options: [
            { label: 'Moving the ladder does not change it', correct: true },
            { label: 'Bricks cannot be counted accurately', feedback: 'Counting is not the difficulty. Count them exactly and the answer is still the same after the ladder moves.' },
            { label: 'A function must be written as a formula', feedback: 'A formula is one way to state a relation. The trouble here is that there is no relation to state.' }
          ],
          successNote: 'No response, no relation, no function. The test is whether one moves when the other does.',
          revealNote: 'The two quantities are unrelated, so there is nothing for the word to describe.'
        },
        {
          code: 'S3-X3', kind: 'choice',
          prompt: 'Which of these is a function of the length of a square\'s side?',
          options: [
            { label: 'Its area', correct: true },
            { label: 'The colour it is drawn in', feedback: 'Change the side and the colour stays as it was. Nothing joins them.' },
            { label: 'The number of squares on the page', feedback: 'Making one square larger does not add or remove squares.' }
          ],
          successNote: 'Change the side and the area follows. That is the whole test, and the area board is where you first saw it.',
          revealNote: 'Area follows the side; the other two do not.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'Writing it short',
      sources: ['F5', 'F6'],
      readings: [
        {
          code: 'S4-A',
          text: 'Writing out "y is joined to x by some rule" each time is tiresome, so it is shortened to y = F(x). This does not say what the rule is. It says only that there is one, and that x is the number that goes in. The letters f and φ are used in the same way, so y = F(x), y = f(x) and y = φ(x) all say the same thing.'
        },
        {
          code: 'S4-B',
          text: 'The notation y = F(x) records that y depends on x without stating how. F is not a number and is not multiplying x; the brackets hold the number being fed in. Where the rule is not known, or is not worth writing out, this is how it is written instead.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'notation-builder',
          note: 'y = F(x) assembled a piece at a time, each piece labelled as it lands: the answer, the name of the rule, the number going in. Then a tap cycles F to f to φ while the meaning line underneath does not change, which is the point of the source sentence.'
        },
        {
          code: 'S4-I2', kind: 'notation-card',
          note: 'A figure, and deliberately so. Founder, 2026-08-09: neither variant here is an interaction in any real sense, and we should not have interactions merely for the sake of them. A notation is a convention; there is nothing in it to vary, and a control would invent work for the learner rather than give them any. The three forms sit together with the shared meaning beneath, which is all this section needs.'
        }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'In y = F(x), what does F stand for?',
          options: [
            { label: 'The rule, whatever it happens to be', correct: true },
            { label: 'A number multiplying x', feedback: 'F is not a number and nothing is being multiplied. The brackets hold what goes in, they do not mean times.' },
            { label: 'The answer', feedback: 'The answer is y. F is the name of the thing that produces it.' }
          ],
          successNote: 'F names the rule without saying what it is, which is exactly what makes the notation useful.',
          revealNote: 'F names the rule; x is what goes in; y is what comes out.'
        },
        {
          code: 'S4-X2', kind: 'match',
          prompt: 'Sort each part of y = F(x) by the job it does.',
          bins: ['What goes in', 'The rule', 'What comes out'],
          items: [
            { label: 'x', bin: 'What goes in' },
            { label: 'F', bin: 'The rule' },
            { label: 'y', bin: 'What comes out' }
          ],
          successNote: 'Three jobs, three symbols. The board began with this machine and ends with its name.'
        },
        {
          code: 'S4-X3', kind: 'choice',
          prompt: 'y = F(x), y = f(x) and y = φ(x). How do these differ?',
          options: [
            { label: 'They do not; only the letter chosen differs', correct: true },
            { label: 'They are three different rules', feedback: 'The letter is a name, and a name may be chosen freely. Nothing about the rule is stated by which letter is used.' },
            { label: 'φ is used for harder rules', feedback: 'Difficulty has nothing to do with it. The letters are interchangeable.' }
          ],
          successNote: 'The letter naming a rule is as free a choice as the letter naming a number.',
          revealNote: 'All three say the same thing: y depends on x by some rule.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The machine bench',
      kind: 'machine-bench',
      blurb: 'Four rule plates and a tray of numbers. Load a plate, feed a number, read the answer.',
      plates: ['double it', 'add three', 'square it', 'take away one'],
      inputs: [-2, -1, 0, 1, 2, 3, 4, 5],
      goals: [
        { id: 'm1', text: 'Make the answer 8' },
        { id: 'm2', text: 'Make the answer 8 again, with a different plate' },
        { id: 'm3', text: 'Find a plate and a number where the answer equals the number' },
        { id: 'm4', text: 'Find one plate where two different numbers give the same answer' }
      ],
      note: 'Goal 4 is the one worth having, and the tray carries negatives so that it can be met: only "square it" manages it, with −2 and 2 both giving 4. That plants the distinction the next board rests on, in the direction that is allowed. Several inputs may share one answer. One input may not have several. Meeting this goal here is what makes the next board\'s failure feel like a different thing rather than more of the same. Goal 3 quietly plants fixed points; double it and square it both hold 0 still, and square it also holds 1.'
    },
    {
      code: 'W2',
      name: 'Name the rule',
      kind: 'rule-guess',
      blurb: 'A hidden rule. Feed it numbers until you can say which of the four it is.',
      plates: ['double it', 'add three', 'square it', 'take away one'],
      inputs: [0, 1, 2, 3, 4, 5],
      goals: [
        { id: 'g1', text: 'Feed it at least two different numbers' },
        { id: 'g2', text: 'Name the rule correctly' }
      ],
      note: 'The inverse of the bench: the answers are visible and the rule is not. Goal 1 exists because 3 alone cannot settle it, which is exactly what S2-X2 asks in words. Smaller than the bench and it repeats the machine, so the two are unlikely both to be wanted.'
    }
  ]
};
