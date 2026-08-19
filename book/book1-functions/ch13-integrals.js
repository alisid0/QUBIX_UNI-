// 13. Integrals: how much accumulates
//
// The closing chapter. The rectangle sums are computed rather than described,
// because a reader who has watched 0.625 fall to 0.398 will believe the limit,
// and because the Fundamental Theorem is worth meeting as a surprise that can
// be checked by hand rather than as an announcement.

export default {
  id: 13,
  part: 'PART II - THE NEXT BOOKS',
  title: 'Integrals: how much accumulates',
  standfirst: 'Add up a changing contribution, then let the pieces get thin.',

  blocks: [
    { t: 'p', text: 'A car travelling at a steady 60 mph for two hours covers 120 miles, and the arithmetic is a multiplication. Draw speed against time and that multiplication is the area of a rectangle: 60 tall, 2 wide.' },
    { t: 'p', text: 'Now let the speed vary. There is no single number to multiply by, and the same difficulty arises that chapter 6 met with the quadratic. The response is the same in spirit: chop the interval into pieces small enough that the quantity is nearly constant on each, total them, and then let the pieces shrink.' },

    { t: 'figure', kind: 'rects', n: 8,
      caption: 'Eight rectangles under a curve. Each is honest about its own width and only approximately right about its height, and the error is the sliver between the tops and the curve.' },

    { t: 'formula', text: 'accumulated change = integral from a to b of f(x) dx' },

    { t: 'h', text: 'Watching the approximation improve' },
    { t: 'p', text: 'Take f(x) = x² from 0 to 1, using the right-hand height of each strip. The numbers below are the totals as the strips get thinner.' },
    { t: 'table', head: ['Strips', 'Width', 'Total', 'Error against 1/3'],
      rows: [
        ['2', '0.5', '0.625', '0.292'],
        ['4', '0.25', '0.46875', '0.135'],
        ['8', '0.125', '0.3984', '0.065'],
        ['100', '0.01', '0.33835', '0.005'],
        ['shrinking to nothing', '—', '1/3', '0']
      ] },
    { t: 'p', text: 'Every one of these totals is too big, because each rectangle is drawn at the height the curve reaches by the end of its strip and the curve is climbing. The overshoot halves as the strips halve, and the totals close on 1/3.' },

    { t: 'callout', title: 'The same move, twice',
      text: 'Chapter 12 shrank an interval to find a rate. This chapter shrinks a strip to find a total. Both are limits, and the fact that these two shrinkings undo one another is the deepest result in the subject.' },

    { t: 'h', text: 'The Fundamental Theorem, checked by geometry' },
    { t: 'p', text: 'Differentiation measures local change; integration accumulates it. The Fundamental Theorem of Calculus says that, under suitable conditions, each undoes the other. The cleanest way to believe it the first time is to take a case whose answer you already know without any calculus at all.' },

    { t: 'example', n: 1,
      ask: 'A car\'s speed is v(t) = 2t metres per second, from t = 0 to t = 3. How far does it travel?',
      steps: [
        'Draw it. Speed against time is a straight line from (0, 0) up to (3, 6).',
        'The region beneath is a triangle with base 3 and height 6, so its area is (1/2)(3)(6) = 9. No calculus was used.',
        'Now approach it the other way. Ask which rule has 2t as its derivative: chapter 12 showed that t² does.',
        'Evaluate that rule at the two ends and subtract: 3² − 0² = 9.'
      ],
      answer: '9 metres, by both routes.',
      note: 'The triangle knew nothing about derivatives, and the antiderivative knew nothing about area, and they agree. That agreement is the Fundamental Theorem doing its work in a case simple enough to check.',
      turn: { ask: 'A car\'s speed is v(t) = 4t metres per second from t = 0 to t = 3. Find the distance by triangle and by antiderivative.',
        a: '18 metres. The triangle has base 3 and height 12; the antiderivative 2t² gives 18 − 0.' } },

    { t: 'example', n: 2,
      ask: 'Use the same idea to find the area under f(x) = x^2 from 0 to 1.',
      steps: [
        'Ask which rule has x² as its derivative. Trying x³ gives 3x², which is three times too big.',
        'So take a third of it: x³/3, whose derivative is x².',
        'Evaluate at the ends and subtract: 1³/3 − 0³/3 = 1/3.',
        'Compare with the table above, where the rectangle totals were closing on exactly that.'
      ],
      answer: '1/3.',
      note: 'The rectangles took a hundred strips to get within 0.005. The antiderivative took one line. That saving is why Book 4 exists.',
      turn: { ask: 'Find the area under f(x) = x^2 from 0 to 3 using the antiderivative x^3/3.', a: '27/3 − 0 = 9.' } },

    { t: 'table', head: ['Question', 'Integral of', 'Interpretation'],
      rows: [
        ['How far did a changing speed carry us?', 'speed against time', 'distance travelled'],
        ['How much water entered at a changing rate?', 'flow against time', 'volume delivered'],
        ['What is the area under a curve?', 'height against position', 'the limit of rectangle totals']
      ] },

    { t: 'h', text: 'What Book 4 does with this' },
    { t: 'p', text: 'Accumulation from rectangles, then the definite integral written properly, then antiderivatives, then the Fundamental Theorem stated and proved, then substitution, areas between curves, and applications to motion. At which point the four books close on each other: functions describe what changes, limits describe what is approached, derivatives measure change, and integrals put it back together.' },

    { t: 'h', text: 'Trapping the answer between two estimates' },
    { t: 'p', text: 'Taking each rectangle at the right of its strip overshoots a rising curve. Taking it at the left undershoots. Doing both traps the true answer between two numbers you can compute.' },

    { t: 'figures', items: [
      { kind: 'riemann', f: x => x * x, n: 4, x0: 0, x1: 1, side: 'left', title: 'LEFT HEIGHTS: TOO SMALL', w: 245, h: 190,
        caption: 'Every rectangle sits under the curve, so the total is below the truth.' },
      { kind: 'riemann', f: x => x * x, n: 4, x0: 0, x1: 1, side: 'right', title: 'RIGHT HEIGHTS: TOO BIG', w: 245, h: 190,
        caption: 'Every rectangle pokes above the curve, so the total is above the truth.' }
    ] },

    { t: 'p', text: 'With four strips the two totals are 0.21875 and 0.46875, so the area lies somewhere between them. The gap is 0.25, which is nothing to boast about, but it is a guarantee rather than a guess. Doubling the strips halves the gap, and the true value 1/3 sits inside every such pair.' },

    { t: 'example', n: 3,
      ask: 'A tap runs at a rate that rises steadily from 0 to 6 litres per minute over 4 minutes. How much water is delivered?',
      steps: [
        'Draw rate against time. It is a straight line from (0, 0) to (4, 6).',
        'The region beneath is a triangle with base 4 and height 6.',
        'Its area is (1/2)(4)(6) = 12.',
        'Check the units: litres per minute multiplied by minutes gives litres, so the answer is a volume rather than a rate.'
      ],
      answer: '12 litres.',
      note: 'Checking units is the fastest way to know whether an integral has been set up correctly. The area under a rate graph always has the units of the quantity that rate was changing.',
      turn: { ask: 'A tap rises steadily from 0 to 10 litres per minute over 6 minutes. How much is delivered?',
        a: '30 litres, the area of a triangle with base 6 and height 10.' } },

    { t: 'example', n: 4,
      ask: 'Find the area under f(x) = 2x + 1 from x = 0 to x = 3, by geometry and by antiderivative.',
      steps: [
        'By geometry: the region is a trapezium with parallel sides f(0) = 1 and f(3) = 7, and width 3.',
        'Its area is the average of the parallel sides times the width: ((1 + 7)/2)(3) = 12.',
        'By antiderivative: something whose derivative is 2x + 1. The x² gives 2x and the x gives 1, so try x² + x.',
        'Evaluate at the ends and subtract: (9 + 3) − (0 + 0) = 12.'
      ],
      answer: '12, by both routes.',
      note: 'The trapezium formula and the antiderivative have nothing in common as procedures, and they agree exactly. Every such agreement is another instance of the Fundamental Theorem, which is why it is worth checking against geometry whenever the geometry is available.',
      turn: { ask: 'Find the area under f(x) = 4x + 2 from x = 0 to x = 2, both ways.',
        a: '12. The trapezium has parallel sides 2 and 10 over a width of 2; the antiderivative 2x² + 2x gives (8 + 4) − 0 = 12.' } },

    { t: 'p', text: 'Sixteen strips instead of four, on the same curve and the same interval:' },

    { t: 'figures', items: [
      { kind: 'riemann', f: x => x * x, n: 16, x0: 0, x1: 1, side: 'left', title: 'LEFT, 16 STRIPS', w: 245, h: 190,
        caption: 'Still below the truth, but by far less.' },
      { kind: 'riemann', f: x => x * x, n: 16, x0: 0, x1: 1, side: 'right', title: 'RIGHT, 16 STRIPS', w: 245, h: 190,
        caption: 'Still above it, and by the same far less.' }
    ] },

    { t: 'p', text: 'The two totals are now 0.302734 and 0.365234, a gap of 0.0625 where four strips left a gap of 0.25. Quadrupling the strips quartered the gap, and 1/3 still sits between them. That is what it means for the estimates to converge: not that either one becomes right, but that the room left for the answer to hide in shrinks to nothing.' }
  ],

  practice: [
    { q: 'A car travels at a steady 40 mph for 3 hours. Find the distance as an area.', level: 'Analyse change',
      a: '120 miles: a rectangle 40 tall and 3 wide.' },
    { q: 'Speed is v(t) = 2t from t = 0 to t = 5. Find the distance using the area of a triangle.', level: 'Analyse change',
      a: 'The triangle has base 5 and height 10, so the distance is 25 metres.' },
    { q: 'Check question 2 using an antiderivative of 2t.', level: 'Calculate',
      a: 'The antiderivative is t². Evaluating at the ends gives 5² − 0² = 25, which agrees.' },
    { q: 'Which rule has 3x^2 as its derivative? Use it to find the area under 3x^2 from 0 to 2.', level: 'Calculate',
      a: 'x³. The area is 2³ − 0³ = 8.' },
    { q: 'Why do the rectangle totals in the table all overestimate the true answer?', level: 'Recognise',
      a: 'Because each rectangle takes its height from the right-hand end of its strip and the curve is rising, so every rectangle overshoots the curve across its whole width.' },
    { q: 'Estimate the area under f(x) = x^2 from 0 to 1 with two strips, using left-hand heights instead.', level: 'Calculate', hard: true,
      a: 'Heights f(0) = 0 and f(0.5) = 0.25, each of width 0.5, giving 0.125. This underestimates, as the right-hand version overestimated, so the true answer is trapped between 0.125 and 0.625.' },
    { q: 'A tank fills at a constant 3 litres per minute for 10 minutes. Sketch the rate against time and find the volume.', level: 'Analyse change',
      a: 'A horizontal line at height 3. The volume is the rectangle beneath it: 30 litres.' },
    { q: 'Explain in one sentence what the Fundamental Theorem connects.', level: 'Recognise',
      a: 'That accumulating a rate over an interval and undoing a derivative give the same answer, so differentiation and integration reverse each other.' },
    { q: 'Find the area under f(x) = x from 0 to 4, first by geometry and then by antiderivative.', level: 'Calculate', hard: true,
      a: 'A triangle of base 4 and height 4 has area 8. The antiderivative of x is x²/2, and 4²/2 − 0 = 8.' },
    { q: 'A speed of −5 metres per second is recorded for 2 seconds. What does the "area" come to, and what does the sign mean?', level: 'Analyse change', hard: true,
      a: '−10. The region lies below the axis and counts as negative, meaning the object moved 10 metres in the opposite direction. The integral gives displacement rather than distance travelled.' },
    { q: 'Why does making the strips thinner reduce the error, rather than just changing it?', level: 'Recognise', hard: true,
      a: 'Because the error on each strip is the sliver between the flat top and the curve, and over a narrower strip the curve has less room to depart from the height chosen. There are more slivers but each shrinks faster than the count grows.' },
    { q: 'Chapter 12 found the derivative of x^3/3. What is it, and why does that make example 2 work?', level: 'Analyse change', hard: true,
      a: 'It is x², by the same method that gave 3x² for x³ and then dividing by 3. Example 2 works because finding an area was converted into finding a rule whose derivative is the curve, which is what the Fundamental Theorem licenses.' }
  ],

  misconception: {
    name: 'an integral is the same thing as an area',
    wrong: 'Integrals compute areas, so an integral can never come out negative.',
    why: 'Area is the picture that makes integration intelligible, not its definition. Regions below the horizontal axis contribute negatively, as question 10 shows, so an integral reports net accumulation and can be negative or zero. When genuine area is wanted regardless of sign, the negative parts must be handled separately, which Book 4 does explicitly.'
  },

  review: 'Chapter 10 divided an output change by an input change to get a rate. This chapter multiplies a rate by an input change to get an output change, strip by strip, and then adds them up. The two operations have been inverse to each other since chapter 10, and the Fundamental Theorem is the statement that they still are in the limit.'
};
