// 2. One answer, not two
//
// Draft 1 got the essential sentence right: the fork is the failure, not the
// repeat. What it lacked was the confusion that actually costs learners marks,
// which is between solving an equation and evaluating a function. That is the
// misconception this chapter is built around.

export default {
  id: 2,
  title: 'One answer, not two',
  standfirst: 'Two different inputs may share an output. One input may not split into two. That distinction is the definition, not a special case.',

  blocks: [
    { t: 'figures', items: [
      { kind: 'mapping', pairs: [['1', '3'], ['2', '4'], ['3', '5']], tag: 'a function' },
      { kind: 'mapping', pairs: [['1', '3'], ['2', '4', '9'], ['3', '5']], broken: '2', tag: 'not a function' }
    ] },

{ t: 'lab', kind: 'frames', id: 'fork',
      label: 'Add one arrow and watch it break',
      frames: [
        { kind: 'mapping', pairs: [['1', '3'], ['2', '4'], ['3', '5']], pick: 'one each',
          say: 'Every input has exactly one arrow leaving it. This is a function.' },
        { kind: 'mapping', pairs: [['1', '7'], ['2', '7'], ['3', '7']], pick: 'all share',
          say: 'Three inputs, one shared output, and nothing broken. This is the rule "ignore the input and say 7". Sharing is allowed.' },
        { kind: 'mapping', pairs: [['1', '3'], ['2', '4', '9'], ['3', '5']], broken: '2', pick: 'add a fork',
          say: 'One extra arrow, and it is no longer a function. Ask it for its value at 2 and it offers a choice.' },
        { kind: 'mapping', pairs: [['1', '3'], ['3', '5']], pick: 'remove an input',
          say: 'The fork is gone, repaired by refusing the input 2 rather than by changing the arrows. Chapter 4 calls the surviving set the domain.' }
      ],
      hint: 'Only the third frame fails, and it fails for a reason no other frame shares: one input, two arrows.',
      caption: 'Four relations. Compare the second with the third: repeated outputs are harmless, a repeated input is fatal.' },

    { t: 'p', text: 'On the left, every input has exactly one arrow leaving it. On the right, the input 2 points at both 4 and 9. Ask that rule for its value at 2 and it offers you a choice, which is precisely what a function may never do.' },

    { t: 'p', text: 'Now change the left picture so that 1, 2, and 3 all point at 7. Nothing breaks. Every input still has one arrow, so it is still a function, and a very ordinary one: it is the rule "ignore the input and say 7". Repetition among outputs is not a fault. **Only a fork among the outputs of a single input is a fault.**' },

    { t: 'figure', kind: 'mapping', pairs: [['1', '7'], ['2', '7'], ['3', '7']],
      caption: 'Three inputs, one shared output, and no rule broken. Sharing is allowed; splitting is not.' },

    { t: 'h', text: 'Written as pairs' },
    { t: 'p', text: 'A function can be recorded as a set of ordered pairs, each pair naming an input and the output it receives. Reading such a set is then a single check: does any first entry appear twice with different second entries?' },
    { t: 'formula', text: '{(-1, 2), (0, 2), (1, 2)}   is a function' },
    { t: 'formula', text: '{(1, 3), (1, 4), (2, 5)}   is not' },
    { t: 'p', text: 'In the second set the input 1 appears with 3 and with 4. That single collision is enough; the rest of the set is irrelevant to the verdict.' },

    { t: 'example', n: 1,
      ask: 'Is {(4, 1), (5, 2), (6, 1), (7, 3)} a function?',
      steps: [
        'List the first entries: 4, 5, 6, 7.',
        'Check for a repeat. There is none, so no input can possibly have two outputs.',
        'The outputs 1 and 1 repeat, but they belong to the different inputs 4 and 6.'
      ],
      answer: 'Yes. A repeated output is not a defect.',
      show: { kind: 'mapping', pairs: [['4', '1'], ['5', '2'], ['6', '1'], ['7', '3']],
        caption: 'The set drawn. The output 1 arrives twice, from 4 and from 6, and no input has more than one arrow leaving it.' },
      turn: { ask: 'Is {(2, 8), (3, 9), (2, 7)} a function?',
        a: 'No. The first entry 2 appears twice, with 8 and with 7.' } },

    { t: 'h', text: 'Two rules that look like counterexamples' },
    { t: 'p', text: 'Two familiar rules are usually offered as objections, and both survive on close reading.' },

    { t: 'table', head: ['Rule', 'The objection', 'What is actually true'],
      rows: [
        ['1/x', 'It has no value at x = 0, so it cannot be a function.', 'Zero is simply not an allowed input. A function is entitled to refuse inputs; it is not entitled to give two answers to one it accepts.'],
        ['sqrt(x)', 'The square roots of 9 are 3 and −3, so it forks.', 'The symbol sqrt(x) is defined to mean the *principal*, non-negative root. sqrt(9) is 3 and nothing else. The rule "a square root of x" does fork, and is not a function; the rule sqrt(x) does not.']
      ] },

{ t: 'lab', kind: 'frames', id: 'squarer',
      label: 'Squaring, and trying to undo it',
      frames: [
        { kind: 'mapping', pairs: [['3', '9']], pick: 'square 3',
          say: 'Three goes in, nine comes out. One answer.' },
        { kind: 'mapping', pairs: [['3', '9'], ['-3', '9']], pick: 'square −3 too',
          say: 'Minus three also gives nine. Two inputs, one shared output, and the promise is intact: ask either input and you get one answer.' },
        { kind: 'mapping', pairs: [['9', '3', '-3']], broken: '9', pick: 'now reverse it',
          say: '"A square root of 9" points at both 3 and −3. Read backwards, the sharing has become a fork, and this is not a function.' },
        { kind: 'mapping', pairs: [['9', '3'], ['4', '2'], ['1', '1']], pick: 'principal root',
          say: 'The symbol sqrt(x) is defined to take the non-negative root only. One arrow each, and it is a function again.' }
      ],
      hint: 'Frames 2 and 3 are the same two facts read in opposite directions. Which direction you read decides whether there is a fault.',
      caption: 'Why "the square of x" is a function and "a square root of x" is not, in four presses. Chapter 9 turns frame 3 into a general rule about reversing.' },

    { t: 'callout', title: 'The edge case worth remembering',
      text: 'Refusing an input is legal. Giving an accepted input two answers is not. Chapter 4 gives the refused inputs a name: they lie outside the domain.' },

    { t: 'example', n: 2,
      ask: 'Does "the square of x" define a function? Does "a square root of x" define one over the real numbers?',
      steps: [
        'Squaring: give it 3 and it returns 9; give it −3 and it returns 9. Each single input returns exactly one number.',
        'That two inputs share the output 9 is sharing, not splitting.',
        '"A square root of x": give it 9 and it returns 3, or −3, without deciding.',
        'One input, two candidate outputs, no rule to choose between them.'
      ],
      answer: 'Squaring is a function. "A square root of x" is not, unless the principal root is specified, at which point it becomes sqrt(x) and is.',
      show: { kind: 'frames', label: 'The two rules, side by side',
        frames: [
          { kind: 'mapping', pairs: [['3', '9'], ['-3', '9']], pick: 'the square of x',
            say: 'Each input has one arrow. A function.' },
          { kind: 'mapping', pairs: [['9', '3', '-3']], broken: '9', pick: 'a square root of x',
            say: 'One input, two arrows. Not a function, until the principal root is specified.' }
        ] },
      turn: { ask: 'Does "the cube of x" define a function? Does "a cube root of x" over the real numbers?',
        a: 'Both do. Cubing gives one answer, and over the real numbers a number has exactly one cube root, because cubing preserves sign. The ambiguity that spoils square roots simply does not arise.' } },

    { t: 'h', text: 'A third way to fail' },
    { t: 'p', text: 'So far a rule has failed by forking. It can also fail by staying silent. If some input in the stated set of inputs gets no output at all, the first demand of chapter 1 is broken rather than the second.' },

    { t: 'figure', kind: 'mapping', pairs: [['1', '4'], ['2', '5'], ['3', '3']],
      caption: 'Every input served exactly once. Compare this with a diagram in which the input 3 has no arrow at all: that is not a fork, but it is still not a function on this set of inputs.' },
    { t: 'p', text: 'The usual repair for silence is not to change the rule but to change the stated inputs. Chapter 4 does exactly that, and calls the surviving set the domain. So of the two ways to fail, one is fatal and one is bookkeeping.' },

    { t: 'example', n: 3,
      ask: 'A rule pairs each pupil in a class with a sport they play. Is it a function?',
      steps: [
        'Ask whether any pupil could be paired with two sports. A pupil who plays both hockey and tennis has two outputs.',
        'Ask whether any pupil could be paired with none. A pupil who plays no sport has no output.',
        'Both failures are available, and which one occurs depends on the class rather than on the wording.',
        'The rule is only a function if every pupil plays exactly one sport.'
      ],
      answer: 'Not in general. It is a function only when each pupil plays exactly one sport.',
      note: 'Rules stated in English very often hide this. "A sport they play" quietly assumes there is exactly one, and the assumption is doing all the work.',
      show: { kind: 'mapping', pairs: [['Ann', 'hockey', 'tennis'], ['Ben', 'chess']], broken: 'Ann',
        caption: 'Ann plays two sports, so the rule forks at her. The repair in the turn below changes what is being asked, not who plays what.' },
      turn: { ask: 'Repair the rule so it is a function whatever the class turns out to be.',
        a: 'Answers vary. "The number of sports the pupil plays" works: every pupil has exactly one such number, and a pupil who plays none has the perfectly good output 0.' } },

    { t: 'example', n: 4,
      ask: 'Two students disagree. One says {(1, 5), (2, 5), (3, 5)} cannot be a function because the outputs are all identical. Settle it.',
      steps: [
        'Check the demand that actually exists: does any single input have two outputs?',
        'Input 1 has only 5. Input 2 has only 5. Input 3 has only 5.',
        'No input forks, so the rule is a function.',
        'What the student has noticed is that it is not one-to-one, which is a real property with real consequences, but a different one.'
      ],
      answer: 'It is a function. The student has confused sharing with splitting.',
      note: 'The property they were reaching for matters in chapter 9: a rule whose outputs are shared cannot be run backwards. So the observation was worth making and the conclusion was wrong.',
      show: { kind: 'mapping', pairs: [['1', '5'], ['2', '5'], ['3', '5']],
        caption: 'Every input served once, by the same output. A function, and a very ordinary one: the rule is "say 5".' },
      turn: { ask: 'Give a set of three pairs that is a function but has only two different outputs.',
        a: 'Answers vary; for example {(1, 7), (2, 7), (3, 9)}. The inputs must all differ; the outputs may repeat freely.' } }
  ],

  practice: [
    { q: 'Is {(−1, 2), (0, 2), (1, 2)} a function? Explain.', level: 'Recognise',
      a: 'Yes. No input repeats at all, so no input can have two outputs. The shared output 2 is permitted.',
      show: { kind: 'mapping', pairs: [['-1', '2'], ['0', '2'], ['1', '2']],
        caption: 'No first entry repeats, so no input can have two outputs. The shared 2 is the constant rule, drawn.' } },
    { q: 'Is {(1, 3), (1, 4), (2, 5)} a function? Identify the breaking input.', level: 'Recognise',
      a: 'No. The input 1 has both 3 and 4.',
      show: { kind: 'mapping', pairs: [['1', '3', '4'], ['2', '5']], broken: '1',
        caption: 'The fork at 1 is the whole fault. Everything else in the set is irrelevant to the verdict.' } },
    { q: 'Is {(0, 0), (1, 1), (2, 4), (−1, 1), (−2, 4)} a function?', level: 'Recognise',
      a: 'Yes. The first entries 0, 1, 2, −1, −2 are all different. This is squaring, listed on five inputs.',
      show: { kind: 'graph', f: x => x * x, title: 'THE FIVE PAIRS', note: 'squaring', x0: -3, x1: 3, y0: -1, y1: 6, w: 265, h: 195,
        marks: [[0, 0], [1, 1], [2, 4], [-1, 1], [-2, 4]],
        caption: 'Squaring, listed on five inputs. Pairs at the same height come from different inputs, which is sharing rather than splitting.' } },
    { q: 'Does "the square of x" define a function? Does "a square root of x" define one over the real numbers?', level: 'Recognise',
      a: 'Squaring does. "A square root of x" does not, because a positive input has two roots and the phrase does not choose. Fixing the principal root repairs it.',
      show: { kind: 'frames', label: 'Read it each way',
        frames: [
          { kind: 'mapping', pairs: [['3', '9'], ['-3', '9']], pick: 'the square of x',
            say: 'One arrow out of each input. A function.' },
          { kind: 'mapping', pairs: [['9', '3', '-3']], broken: '9', pick: 'a square root of x',
            say: 'The same two facts, reversed. Now one input has two arrows, and it is not a function.' }
        ] } },
    { q: 'Draw a mapping diagram with inputs 1, 2, 3 and outputs 5, 6 that is a function.', level: 'Represent',
      a: 'Answers vary; one arrow must leave each of 1, 2, 3. For example 1 → 5, 2 → 5, 3 → 6. With three inputs and two outputs some sharing is unavoidable, which is fine.',
      show: { kind: 'mapping', pairs: [['1', '5'], ['2', '5'], ['3', '6']],
        caption: 'One valid answer. Three inputs and two outputs make some sharing unavoidable, and sharing was never the problem.' } },
    { q: 'Draw a mapping diagram with inputs 1, 2, 3 and outputs 5, 6 that is not a function, and say which input breaks it.', level: 'Represent',
      a: 'Answers vary; some input must send arrows to both 5 and 6. For example 2 → 5 and 2 → 6, so 2 breaks it.',
      show: { kind: 'mapping', pairs: [['1', '5'], ['2', '5', '6'], ['3', '6']], broken: '2',
        caption: 'One valid answer. The input 2 sends arrows to both outputs, and that alone is the failure.' } },
    { q: 'Is 1/x a function? What happens at x = 0?', level: 'Recognise',
      a: 'Yes. At x = 0 it has no value, because 0 is not an allowed input. Refusing an input does not break the promise.',
      show: { kind: 'graph', f: x => 1 / x, title: 'A REFUSED INPUT', note: '1/x', x0: -4, x1: 4, y0: -4, y1: 4, w: 265, h: 205,
        caption: 'The curve never crosses the vertical axis, because zero is not an allowed input. Refusing an input is legal; answering one twice is not.' } },
    { q: 'A rule pairs each person with their date of birth. Function? Now reverse it: each date with the people born on it. Function?', level: 'Recognise',
      a: 'The first is a function: one person has exactly one date of birth. The reverse is not, because one date pairs with many people. Chapter 9 shows this is exactly the condition for having an inverse.',
      show: { kind: 'frames', label: 'Forwards, then backwards',
        frames: [
          { kind: 'mapping', pairs: [['Ann', '3 May'], ['Ben', '3 May'], ['Cal', '9 Jul']], pick: 'person to date',
            say: 'Each person has exactly one date of birth. A function, with two people sharing a date.' },
          { kind: 'mapping', pairs: [['3 May', 'Ann', 'Ben'], ['9 Jul', 'Cal']], broken: '3 May', pick: 'date to person',
            say: 'Reversed, the shared date forks. This is exactly the condition chapter 9 needs for an inverse.' }
        ] } },
    { q: 'Solve x² = 25. Then evaluate f(5) for f(x) = x². Explain why one has two answers and the other has one.', level: 'Calculate', hard: true,
      a: 'x = 5 or x = −5. f(5) = 25. Solving asks which inputs produce a given output, and two inputs may; evaluating asks what one input produces, and only one thing may. The two-ness lives on the input side, where it is legal.',
      show: { kind: 'frames', label: 'Which side is the plural on?',
        frames: [
          { kind: 'mapping', pairs: [['5', '25']], pick: 'evaluate f(5)',
            say: 'One input, one output. Evaluating can only ever give one answer.' },
          { kind: 'mapping', pairs: [['5', '25'], ['-5', '25']], pick: 'solve x^2 = 25',
            say: 'Two inputs land on 25. The two-ness lives on the input side, where the definition permits it.' }
        ] } },
    { q: 'The equation x² + y² = 9 describes a circle. Treating x as input and y as output, is it a function?', level: 'Recognise', hard: true,
      a: 'No. Take x = 0: then y² = 9, so y is 3 or −3. One input, two outputs. Chapter 5 turns this into a test you can perform by eye.',
      show: { kind: 'linetest', f: x => Math.sqrt(Math.max(0, 9 - x * x)), second: x => -Math.sqrt(Math.max(0, 9 - x * x)),
        at: [0, 2], title: 'TWO HITS PER LINE', note: 'x^2+y^2=9', x0: -4, x1: 4, y0: -4, y1: 4, w: 265, h: 205,
        caption: 'At x = 0 the outputs are 3 and −3; at x = 2 they are about 2.24 and −2.24. Chapter 5 turns this into a test you perform by eye.' } },
    { q: 'Is "the mother of x" a function on the set of people? Is "the child of x"?', level: 'Recognise',
      a: 'The first is: each person has exactly one biological mother. The second is not: a person may have several children, or none, so some inputs fork and some have no output at all.',
      show: { kind: 'frames', label: 'One direction works',
        frames: [
          { kind: 'mapping', pairs: [['Ann', 'Eve'], ['Ben', 'Eve'], ['Cal', 'Ida']], pick: 'the mother of',
            say: 'Each person has exactly one biological mother. Siblings share theirs, which is permitted.' },
          { kind: 'mapping', pairs: [['Eve', 'Ann', 'Ben'], ['Ida', 'Cal']], broken: 'Eve', pick: 'the child of',
            say: 'Eve has two children, so the rule forks. A childless person would have no output at all, which fails the other demand.' }
        ] } },
    { q: 'A machine returns the input unchanged on weekdays and doubles it at weekends. Is the output a function of the number typed in?', level: 'Recognise', hard: true,
      a: 'Not of the number alone: 5 gives 5 on Tuesday and 10 on Sunday, so that input forks. It is a function of the pair (number, day). When a rule seems to break the promise, the usual repair is that the real input has more parts than you were counting.',
      show: { kind: 'frames', label: 'Widen the input',
        frames: [
          { kind: 'mapping', pairs: [['5', '5', '10']], broken: '5', pick: 'number alone',
            say: 'The input 5 gives 5 on Tuesday and 10 on Sunday. As a function of the number, it forks.' },
          { kind: 'mapping', pairs: [['5,Tue', '5'], ['5,Sun', '10']], pick: 'number and day',
            say: 'Count the day as part of the input and the fork disappears. The usual repair for a broken promise.' }
        ] } },
  ],

  misconception: {
    name: 'two answers means two outputs',
    wrong: 'Solving x² = 4 gives x = 2 and x = −2. Students often conclude that squaring must therefore produce two outputs and cannot be a function.',
    why: 'The two answers are two **inputs**, not two outputs. Solving asks which inputs land on 4, and the definition places no limit on how many may. Evaluating asks what a single input produces, and there the limit is exactly one. Keep track of which side of the arrow the plural is on and the confusion dissolves.'
  },

  review: 'Chapter 1 claimed that different inputs are free to share an output. Question 3 here is that claim made concrete, and question 9 is the reason it matters: without it, every quadratic equation in the rest of the book would look like a broken function.'
};
