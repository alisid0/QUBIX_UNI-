// 7. Transforming a function
//
// Draft 1 called this "the largest missing textbook bridge in the current Qubix
// chapter" and then spent one page on it. The inside/outside distinction gets
// the full treatment here, because every later shift of a graph relies on it
// and because the minus sign inside the bracket is the single most reliable
// place for a reader to go wrong.

export default {
  id: 7,
  title: 'Transforming a function',
  standfirst: 'One rule, moved. Changes outside the function act on outputs; changes inside act on inputs, and act backwards.',

  blocks: [
    { t: 'p', text: 'Start with a familiar rule and call it the **parent function**. Everything in this chapter is that parent, relocated or restretched, with its shape intact. Recognising the parent inside a complicated formula is most of the skill.' },

    { t: 'table', head: ['Rule', 'Effect', 'From f(x) = x^2'],
      rows: [
        ['f(x) + k', 'shift up by k', 'x^2 + 3 sits three higher'],
        ['f(x − h)', 'shift right by h', '(x − 2)^2 sits two to the right'],
        ['a·f(x)', 'stretch vertically by a; flip if a is negative', '−2x^2 is flipped and twice as steep'],
        ['f(bx)', 'squeeze horizontally by 1/b; flip if b is negative', '(2x)^2 is half as wide']
      ] },

    { t: 'h', text: 'Outside is forwards, inside is backwards' },
    { t: 'p', text: 'A change written outside the brackets happens to the answer after the rule has run, so it does what it says: add 3 and the graph rises 3. A change written inside happens to the input before the rule runs, and that reverses its apparent sense.' },
    { t: 'p', text: 'Here is why, in one line. To draw y = f(x − 2) at the position x = 5, you must evaluate f at 3. So the height that the parent had at 3 now appears at 5. Every height has moved **two to the right**, even though the formula says minus two.' },

    { t: 'formula', text: 'f(x - 2) at x = 5   uses   f(3)   so the picture moves right' },

    { t: 'callout', title: 'The one sentence to keep',
      text: 'Inside the bracket, the graph moves opposite to the sign. Minus moves right, plus moves left. If you ever doubt it, put in one number and see which input the rule actually reaches for.' },

    { t: 'figures', items: [
      { kind: 'graph', f: x => x * x, second: { f: x => x * x }, title: 'PARENT', note: 'f(x)=x^2', x0: -5, x1: 5, y0: -3, y1: 9, w: 230, h: 180 },
      { kind: 'graph', f: x => x * x + 3, second: { f: x => x * x }, title: 'OUTSIDE: UP 3', note: 'f(x)+3', x0: -5, x1: 5, y0: -3, y1: 9, w: 230, h: 180 },
      { kind: 'graph', f: x => (x - 2) * (x - 2), second: { f: x => x * x }, title: 'INSIDE: RIGHT 2', note: 'f(x-2)', x0: -5, x1: 5, y0: -3, y1: 9, w: 230, h: 180 }
    ] },
    { t: 'p', text: 'The parent is drawn faintly behind each transformation. A transformation is always a comparison, never a shape to be memorised on its own.' },

    { t: 'figures', items: [
      { kind: 'graph', f: x => -2 * x * x, second: { f: x => x * x }, title: 'FLIPPED AND STRETCHED', note: '-2f(x)', x0: -4, x1: 4, y0: -8, y1: 6, w: 250, h: 190 },
      { kind: 'graph', f: x => (2 * x) * (2 * x), second: { f: x => x * x }, title: 'SQUEEZED', note: 'f(2x)', x0: -4, x1: 4, y0: -2, y1: 9, w: 250, h: 190 }
    ] },

    { t: 'example', n: 1,
      ask: 'Describe the change from x^2 to (x + 4)^2 − 1.',
      steps: [
        'Find the parent: it is x², with the whole thing squared, so nothing has been stretched.',
        'The + 4 is inside the bracket, so it moves horizontally and it moves against its sign: four to the left.',
        'The − 1 is outside, so it moves vertically and does what it says: one down.',
        'Check with a point. The parent has its low point at (0, 0). The new rule has its low point where the bracket is zero, at x = −4, with height −1.'
      ],
      answer: 'Left 4, and down 1. The low point moves from (0, 0) to (−4, −1).' },

    { t: 'example', n: 2,
      ask: 'Write a square function shifted right 3 and up 5.',
      steps: [
        'Right 3 is horizontal, so it goes inside the bracket, against its sign: (x − 3).',
        'Up 5 is vertical, so it goes outside: + 5.',
        'Assemble: (x − 3)² + 5.',
        'Check: at x = 3 the bracket is 0 and the height is 5, so the low point sits at (3, 5), which is three right and five up from the origin.'
      ],
      answer: '(x − 3)² + 5.' },

    { t: 'callout', title: 'Where this returns',
      text: 'A transformation moves a graph without changing its shape, so it cannot change how steep the curve is at corresponding points. Shifting is the reason a derivative in chapter 12 never depends on where the curve sits, only on how it bends.' }
  ],

  practice: [
    { q: 'Describe the change from x^2 to (x + 4)^2 − 1.', level: 'Transform',
      a: 'Left 4 and down 1; the low point moves to (−4, −1).' },
    { q: 'Write a transformed square function shifted right 3 and up 5.', level: 'Transform',
      a: '(x − 3)² + 5.' },
    { q: 'What does y = −f(x) do to a graph?', level: 'Transform',
      a: 'Reflects it across the horizontal axis. Every output changes sign; inputs are untouched.' },
    { q: 'What does y = f(−x) do to a graph?', level: 'Transform',
      a: 'Reflects it across the vertical axis, because the minus is inside and so acts on inputs.' },
    { q: 'Describe the change from x^2 to 3x^2, and to 0.5x^2.', level: 'Transform',
      a: 'Stretched vertically by 3, so it is three times as tall at every input and looks narrower. Then squashed to half height, so it looks wider. Neither moves.' },
    { q: 'Starting from f(x) = x^2, write the rule shifted left 2 and reflected in the horizontal axis.', level: 'Transform',
      a: '−(x + 2)². The bracket comes first because the reflection is applied to the shifted rule; writing (−x + 2)² would reflect the input instead.' },
    { q: 'The point (2, 5) lies on y = f(x). Where does it move on y = f(x) + 3? On y = f(x − 1)?', level: 'Transform',
      a: 'To (2, 8), since only the height changed. Then to (3, 5), since the graph moves right by 1.' },
    { q: 'The parent has its low point at the origin. Where is the low point of y = (x − 6)^2 + 2?', level: 'Transform',
      a: '(6, 2).' },
    { q: 'Explain, using one substituted number, why f(x − 2) moves the graph right rather than left.', level: 'Recognise', hard: true,
      a: 'At x = 5 the rule evaluates f(3), so whatever height the parent had at 3 now appears at 5. Heights land two further along, which is a shift right.' },
    { q: 'Does y = f(x) + 3 change how steep the curve is anywhere? Does y = 3f(x)?', level: 'Transform', hard: true,
      a: 'The first does not: sliding a curve up leaves every slope untouched. The second does: tripling every height triples every slope. This is the distinction chapter 12 relies on.' },
    { q: 'Write the rule for y = x^2 squeezed horizontally to half width and moved up 1. Then expand it.', level: 'Transform', hard: true,
      a: 'y = (2x)² + 1, which expands to 4x² + 1. Note that a horizontal squeeze on a parabola is indistinguishable from a vertical stretch, which is a peculiarity of this parent and not a general rule.' },
    { q: 'A graph is shifted right 3, then reflected in the vertical axis. Is the result the same as reflecting first, then shifting right 3?', level: 'Transform', hard: true,
      a: 'No. Shifting then reflecting gives f(−x − 3), whose feature sits at x = −3. Reflecting then shifting gives f(−(x − 3)) = f(3 − x), whose feature sits at x = 3. Order matters, which is the same lesson chapter 8 draws about composition.' }
  ],

  misconception: {
    name: 'the minus inside moves the graph left',
    wrong: 'f(x − 2) contains a minus, so the graph must move two to the left.',
    why: 'The sign inside the bracket describes what happens to the input before the rule runs, not to the picture. Substituting settles it in one line: at x = 5 the rule reaches for f(3), so the parent height at 3 is now displayed at 5, and the picture has moved right. Outside the bracket there is no such reversal, which is why + 3 really does mean up 3.'
  },

  review: 'Chapter 5 asked you to read where a graph rises, falls and flattens. Every transformation here preserves those readings and merely relocates them, which is why question 10 can ask about steepness without any new machinery.'
};
