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
      { kind: 'mapping', pairs: [['1', '3'], ['2', '4'], ['3', '5']], caption: 'a function' },
      { kind: 'mapping', pairs: [['1', '3'], ['2', '4', '9'], ['3', '5']], broken: '2', caption: 'not a function' }
    ] },

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
      answer: 'Yes. A repeated output is not a defect.' },

    { t: 'h', text: 'Two rules that look like counterexamples' },
    { t: 'p', text: 'Two familiar rules are usually offered as objections, and both survive on close reading.' },

    { t: 'table', head: ['Rule', 'The objection', 'What is actually true'],
      rows: [
        ['1/x', 'It has no value at x = 0, so it cannot be a function.', 'Zero is simply not an allowed input. A function is entitled to refuse inputs; it is not entitled to give two answers to one it accepts.'],
        ['sqrt(x)', 'The square roots of 9 are 3 and −3, so it forks.', 'The symbol sqrt(x) is defined to mean the *principal*, non-negative root. sqrt(9) is 3 and nothing else. The rule "a square root of x" does fork, and is not a function; the rule sqrt(x) does not.']
      ] },

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
      answer: 'Squaring is a function. "A square root of x" is not, unless the principal root is specified, at which point it becomes sqrt(x) and is.' }
  ],

  practice: [
    { q: 'Is {(−1, 2), (0, 2), (1, 2)} a function? Explain.', level: 'Recognise',
      a: 'Yes. No input repeats at all, so no input can have two outputs. The shared output 2 is permitted.' },
    { q: 'Is {(1, 3), (1, 4), (2, 5)} a function? Identify the breaking input.', level: 'Recognise',
      a: 'No. The input 1 has both 3 and 4.' },
    { q: 'Is {(0, 0), (1, 1), (2, 4), (−1, 1), (−2, 4)} a function?', level: 'Recognise',
      a: 'Yes. The first entries 0, 1, 2, −1, −2 are all different. This is squaring, listed on five inputs.' },
    { q: 'Does "the square of x" define a function? Does "a square root of x" define one over the real numbers?', level: 'Recognise',
      a: 'Squaring does. "A square root of x" does not, because a positive input has two roots and the phrase does not choose. Fixing the principal root repairs it.' },
    { q: 'Draw a mapping diagram with inputs 1, 2, 3 and outputs 5, 6 that is a function.', level: 'Represent',
      a: 'Answers vary; one arrow must leave each of 1, 2, 3. For example 1 → 5, 2 → 5, 3 → 6. With three inputs and two outputs some sharing is unavoidable, which is fine.' },
    { q: 'Draw a mapping diagram with inputs 1, 2, 3 and outputs 5, 6 that is not a function, and say which input breaks it.', level: 'Represent',
      a: 'Answers vary; some input must send arrows to both 5 and 6. For example 2 → 5 and 2 → 6, so 2 breaks it.' },
    { q: 'Is 1/x a function? What happens at x = 0?', level: 'Recognise',
      a: 'Yes. At x = 0 it has no value, because 0 is not an allowed input. Refusing an input does not break the promise.' },
    { q: 'A rule pairs each person with their date of birth. Function? Now reverse it: each date with the people born on it. Function?', level: 'Recognise',
      a: 'The first is a function: one person has exactly one date of birth. The reverse is not, because one date pairs with many people. Chapter 9 shows this is exactly the condition for having an inverse.' },
    { q: 'Solve x² = 25. Then evaluate f(5) for f(x) = x². Explain why one has two answers and the other has one.', level: 'Calculate', hard: true,
      a: 'x = 5 or x = −5. f(5) = 25. Solving asks which inputs produce a given output, and two inputs may; evaluating asks what one input produces, and only one thing may. The two-ness lives on the input side, where it is legal.' },
    { q: 'The equation x² + y² = 9 describes a circle. Treating x as input and y as output, is it a function?', level: 'Recognise', hard: true,
      a: 'No. Take x = 0: then y² = 9, so y is 3 or −3. One input, two outputs. Chapter 5 turns this into a test you can perform by eye.' },
    { q: 'Is "the mother of x" a function on the set of people? Is "the child of x"?', level: 'Recognise',
      a: 'The first is: each person has exactly one biological mother. The second is not: a person may have several children, or none, so some inputs fork and some have no output at all.' },
    { q: 'A machine returns the input unchanged on weekdays and doubles it at weekends. Is the output a function of the number typed in?', level: 'Recognise', hard: true,
      a: 'Not of the number alone: 5 gives 5 on Tuesday and 10 on Sunday, so that input forks. It is a function of the pair (number, day). When a rule seems to break the promise, the usual repair is that the real input has more parts than you were counting.' }
  ],

  misconception: {
    name: 'two answers means two outputs',
    wrong: 'Solving x² = 4 gives x = 2 and x = −2. Students often conclude that squaring must therefore produce two outputs and cannot be a function.',
    why: 'The two answers are two **inputs**, not two outputs. Solving asks which inputs land on 4, and the definition places no limit on how many may. Evaluating asks what a single input produces, and there the limit is exactly one. Keep track of which side of the arrow the plural is on and the confusion dissolves.'
  },

  review: 'Chapter 1 claimed that different inputs are free to share an output. Question 3 here is that claim made concrete, and question 9 is the reason it matters: without it, every quadratic equation in the rest of the book would look like a broken function.'
};
