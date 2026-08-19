// 8. Chaining functions
//
// The benchmark asked for domains, verification and one-to-one tests to be
// deepened. Domains of composites are the part most often skipped and the part
// that actually bites, so the chapter builds to it rather than mentioning it.

export default {
  id: 8,
  title: 'Chaining functions',
  standfirst: 'Put one machine\'s output into the next machine\'s input, and the pair becomes a single rule.',

  blocks: [
    { t: 'figure', kind: 'machine', rule: 'g(x)=x+1', input: '3', output: '4' },
    { t: 'figure', kind: 'machine', rule: 'f(x)=2x', input: '4', output: '8',
      caption: 'The 4 leaving the first machine is the 4 entering the second. Nothing else connects them.' },

    { t: 'p', text: 'When the output of g becomes the input of f, the result is the **composite** function, written f(g(x)) or (f ∘ g)(x). Both notations name the same thing: run g, then hand the answer to f.' },
    { t: 'formula', text: 'g(x) = x + 1,  f(x) = 2x:   f(g(3)) = f(4) = 8' },

    { t: 'callout', title: 'Read from the inside out',
      text: 'f(g(x)) is written with f on the left but g runs first. The brackets say so: g is nearest to x, so it gets x first. Work outward from whatever is innermost, exactly as you would with ordinary arithmetic brackets.' },

    { t: 'h', text: 'Order changes the answer' },
    { t: 'p', text: 'Reverse the two machines and the result is generally different. With the same f and g as above, g(f(3)) = g(6) = 7, against f(g(3)) = 8. Same input, same two rules, different answer.' },
    { t: 'table', head: ['Composite', 'What runs first', 'At x = 3', 'As a formula'],
      rows: [
        ['f(g(x))', 'add one, then double', '8', '2(x + 1) = 2x + 2'],
        ['g(f(x))', 'double, then add one', '7', '2x + 1']
      ] },
    { t: 'p', text: 'The two formulas differ by 1 at every input, which is why the answers differ at x = 3 and everywhere else. Composition is not commutative, and no amount of algebra will make it so.' },

    { t: 'example', n: 1,
      ask: 'Let f(x) = x^2 and g(x) = x − 3. Find f(g(5)) and g(f(5)).',
      steps: [
        'For f(g(5)), start inside: g(5) = 5 − 3 = 2.',
        'Hand 2 to f: f(2) = 2² = 4.',
        'For g(f(5)), start inside again, but now the inner rule is f: f(5) = 25.',
        'Hand 25 to g: g(25) = 25 − 3 = 22.'
      ],
      answer: 'f(g(5)) = 4 and g(f(5)) = 22.',
      note: 'The gap between 4 and 22 is a useful shock. Squaring after subtracting is a very different instruction from subtracting after squaring.',
      show: { kind: 'frames', label: 'Run the pair in each order',
        frames: [
          { kind: 'chain', stages: ['g(x)=x-3', 'f(x)=x^2'], input: '5', values: [2, 4], pick: 'f(g(5))',
            say: 'Subtract first, then square: 5 becomes 2, and 2 squared is 4.' },
          { kind: 'chain', stages: ['f(x)=x^2', 'g(x)=x-3'], input: '5', values: [25, 22], pick: 'g(f(5))',
            say: 'Square first, then subtract: 5 becomes 25, and 25 minus 3 is 22. Watch the number on the wire.' }
        ] },
      turn: { ask: 'With the same f and g, find f(g(1)) and g(f(1)).', a: 'f(g(1)) = f(−2) = 4; g(f(1)) = g(1) = −2.' } },

    { t: 'example', n: 2,
      ask: 'For the same f and g, write formulas for f(g(x)) and g(f(x)).',
      steps: [
        'f(g(x)): the input to f is the whole of g(x), which is x − 3. So square that: (x − 3)².',
        'g(f(x)): the input to g is x², and g subtracts 3 from whatever it receives: x² − 3.',
        'Check at x = 5 against the previous example: (5 − 3)² = 4, and 5² − 3 = 22. Both agree.'
      ],
      answer: 'f(g(x)) = (x − 3)² and g(f(x)) = x² − 3.',
      note: 'Chapter 7 met (x − 3)² as a shift of the parent x². It is the same expression, now arrived at from a different direction.',
      show: { kind: 'graph', f: x => (x - 3) * (x - 3), second: { f: x => x * x - 3 }, title: 'THE TWO COMPOSITES', note: '(x-3)^2 and x^2-3', x0: -3, x1: 7, y0: -5, y1: 10, w: 290, h: 215,
        caption: 'Same two rules, opposite orders, and plainly different curves. The teal one is (x \u2212 3)\u00b2, which chapter 7 would call the parent shifted right 3.' },
      turn: { ask: 'For f(x) = x + 4 and g(x) = 2x, write f(g(x)) and g(f(x)).', a: 'f(g(x)) = 2x + 4; g(f(x)) = 2x + 8.' } },

    { t: 'h', text: 'The domain of a composite' },
    { t: 'p', text: 'An input is allowed into f(g(x)) only if it clears two gates. It must be acceptable to g, and the value g produces must then be acceptable to f. A composite can therefore refuse inputs that neither rule would refuse on its own.' },

    { t: 'example', n: 3,
      ask: 'Let f(x) = sqrt(x) and g(x) = x − 4. What inputs are allowed for f(g(x))?',
      steps: [
        'First gate: g accepts every real number, so it refuses nothing.',
        'Second gate: f is a square root, so it needs a non-negative input. Its input here is g(x) = x − 4.',
        'Demand x − 4 at least 0, giving x at least 4.',
        'Sanity check with x = 1: g(1) = −3, and f cannot take −3. Correctly refused.'
      ],
      answer: 'x at least 4, that is [4, infinity).',
      note: 'Neither rule alone bars x = 1. The chain does. This is why the domain of a composite must be worked out from the chain, not inherited from either link.',
      show: { kind: 'numberline', from: -2, to: 10, spans: [{ a: -2, b: 4, tone: 'out', label: 'g gives f a negative' }, { a: 4, b: 10, label: 'allowed' }], marks: [{ x: 4, label: 'included' }],
        caption: 'Neither rule alone refuses x = 1. The chain does, because g hands f the number \u22123 and f will not take it.' },
      turn: { ask: 'For f(x) = sqrt(x) and g(x) = x + 7, what inputs are allowed for f(g(x))?', a: '[−7, infinity), since x + 7 must be non-negative.' } },

    { t: 'h', text: 'The chain, drawn as one machine' },
    { t: 'p', text: 'Two machines wired in series behave as a single machine, and the composite is nothing more than the name for that single machine. Below is the same pair run in each order.' },

    { t: 'figure', kind: 'chain', stages: ['g(x)=x+1', 'f(x)=2x'], input: '3', values: [4, 8],
      caption: 'f(g(3)): the 3 meets g first, becomes 4, and that 4 is what f doubles.' },
    { t: 'figure', kind: 'chain', stages: ['f(x)=2x', 'g(x)=x+1'], input: '3', values: [6, 7],
      caption: 'g(f(3)): the same two machines, swapped. The value on the wire between them differs, and so does the answer.' },

    { t: 'p', text: 'The number on the wire is the part worth watching. It is an output and an input at the same moment, and every question about the domain of a composite is a question about whether the second machine will accept it.' },

    { t: 'example', n: 4,
      ask: 'Write h(x) = sqrt(3x - 5) as f(g(x)) with two simpler rules, then find its domain.',
      steps: [
        'Ask what is done last. The square root is applied to everything else, so f is the root.',
        'Ask what is done first. The expression 3x − 5 is built before the root sees it, so g(x) = 3x − 5.',
        'Check: f(g(x)) = sqrt(3x − 5), which is h.',
        'For the domain, g accepts everything but f needs a non-negative input, so demand 3x − 5 at least 0, giving x at least 5/3.'
      ],
      answer: 'f(x) = sqrt(x) and g(x) = 3x − 5, with domain [5/3, infinity).',
      note: 'Decomposing like this, outer rule and inner rule, is the exact preparation the chain rule needs in Book 3. There the question is always "what is the outer function, and what is the inner one?"',
      show: { kind: 'chain', stages: ['g(x)=3x-5', 'f(x)=sqrt(x)'], input: '7', values: [16, 4],
        caption: 'The decomposition, run on one input. Recognising an outer rule and an inner rule like this is the whole preparation for the chain rule in Book 3.' },
      turn: { ask: 'Write h(x) = (4x + 1)^3 as f(g(x)) and state its domain.',
        a: 'f(x) = x³ and g(x) = 4x + 1. Both accept every real number, so the domain is all real numbers.' } }
  ],

  practice: [
    { q: 'Let f(x) = x^2 and g(x) = x − 3. Find f(g(5)) and g(f(5)).', level: 'Combine',
      a: 'f(g(5)) = 4 and g(f(5)) = 22.' },
    { q: 'Write formulas for f(g(x)) and g(f(x)) for those same rules.', level: 'Combine',
      a: 'f(g(x)) = (x − 3)²; g(f(x)) = x² − 3.' },
    { q: 'Let f(x) = sqrt(x) and g(x) = x − 4. What inputs are allowed for f(g(x))?', level: 'Combine',
      a: '[4, infinity), because the square root needs x − 4 to be non-negative.' },
    { q: 'With f(x) = 2x and g(x) = x + 1, evaluate f(g(0)) and g(f(0)).', level: 'Combine',
      a: 'f(g(0)) = f(1) = 2; g(f(0)) = g(0) = 1.' },
    { q: 'With f(x) = 3x − 1 and g(x) = x^2, write f(g(x)) and g(f(x)).', level: 'Combine',
      a: 'f(g(x)) = 3x² − 1; g(f(x)) = (3x − 1)², which expands to 9x² − 6x + 1.' },
    { q: 'Explain in one sentence why f(g(x)) means g runs first.', level: 'Recognise',
      a: 'Because g is inside the brackets nearest to x, so x reaches g before anything else, exactly as with arithmetic brackets.' },
    { q: 'A shop takes 20% off, then adds 10% tax. Write both steps as functions and compose them. Does the order matter to the final price?', level: 'Combine', hard: true,
      a: 'd(p) = 0.8p and t(p) = 1.1p, so t(d(p)) = 0.88p and d(t(p)) = 0.88p. Here the order does not matter, because both rules are multiplications and multiplication commutes. This is a special case, not the general rule.' },
    { q: 'A shop takes £5 off, then adds 10% tax. Does the order matter now?', level: 'Combine', hard: true,
      a: 'Yes. t(d(p)) = 1.1(p − 5) = 1.1p − 5.5, while d(t(p)) = 1.1p − 5. The customer is 50p better off if the discount is applied last. Mixing an addition with a multiplication breaks the symmetry of the previous question.' },
    { q: 'With f(x) = 1/x and g(x) = x − 2, state the domain of f(g(x)).', level: 'Combine', hard: true,
      a: 'g accepts everything; f refuses 0, so x − 2 must not be 0. The domain is every real number except 2.' },
    { q: 'Find a function h so that h(x) = (x + 1)^3 can be written as f(g(x)) with two simpler rules.', level: 'Combine',
      a: 'Take g(x) = x + 1 and f(x) = x³. Then f(g(x)) = (x + 1)³. Recognising an outer and an inner rule like this is the whole preparation for the chain rule in Book 3.' },
    { q: 'If f(g(x)) = x for every x, what does that say about the two rules?', level: 'Combine', hard: true,
      a: 'That f undoes whatever g did, returning every input unchanged. Chapter 9 gives the pair a name: they are inverses.' },
    { q: 'Let f(x) = x^2 and g(x) = sqrt(x). Find f(g(x)) and g(f(x)), and say why they are not the same rule.', level: 'Combine', hard: true,
      a: 'f(g(x)) = x, on the domain [0, infinity) that the root demands. g(f(x)) = sqrt(x²), which equals x for non-negative x but equals −x for negative x, so at x = −3 it returns 3. They agree only where x is non-negative, which is exactly the restriction chapter 9 needs.' }
  ],

  misconception: {
    name: 'applying the outer function first',
    wrong: 'f(g(x)) is read left to right, so f is applied to x and then g is applied to the result.',
    why: 'The brackets settle it. In f(g(x)) the symbol x sits inside g\'s brackets, so g receives it first, and f receives whatever g returns. Example 1 shows the cost of getting this backwards: 4 against 22 from the same rules and the same input.'
  },

  review: 'Chapter 4 worked out domains from a single formula by scanning for three causes. Example 3 does the same scan twice, once for each link, and question 9 shows a composite refusing an input that neither rule would refuse alone.'
};
