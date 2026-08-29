// Atlas figures for stages 9 and 10: change and the bridge to limits, and
// derivatives.
//
// This is where the classification starts mattering. A concept marked `frames`
// gets several prepared pictures and a control to step through them, because a
// limit shown as one still is exactly the lie the classification exists to
// catch. Nothing here is animated by script: every frame is drawn at build
// time and the browser only switches between them.

const P = { grid: 'lines', ticks: true };
const B = { grid: 'none', ticks: false, axes: false, arrowheads: false, x0: -5, x1: 5, y0: -4, y1: 4 };
const sq = x => x * x;
const faint = '#d8d3c7';
const par = x => 0.35 * sq(x) - 1.6;            // the working curve for this stage
const sec = (f, a, b) => ({ m: (f(b) - f(a)) / (b - a), c: f(a) - (f(b) - f(a)) / (b - a) * a });
// A secant frame: two points, the chord between them, and its slope written out.
const chord = (f, a, b, pick) => ({
  pick, curves: [{ f }], lines: [{ ...sec(f, a, b), c2: '#e0813a' }],
  pts: [[a, f(a)], [b, f(b)]], note: `slope ${((f(b) - f(a)) / (b - a)).toFixed(2)}`
});
const tangentAt = (f, a, h = 1e-6) => (f(a + h) - f(a - h)) / (2 * h);

export const ATLAS_9_10 = {
  /* -------------------------------- 9. change, and the bridge to limits ---- */
  'difference': { line: true, spans: [[12, 30]], from: 8, to: 34, marks: [{ x: 12 }, { x: 30 }], note: '30 − 12 = 18', alt: 'The gap between two readings on a scale.' },
  'delta': { ...P, tri: [-2, par(-2), 2, par(2)], curves: [{ f: par }], pts: [[-2, par(-2)], [2, par(2)]], note: 'Δx and Δy', alt: 'Two changes drawn as the legs of a triangle between two points.' },
  'increment': { line: true, from: -1, to: 9, spans: [[2, 5]], marks: [{ x: 2 }, { x: 5 }], note: 'a step of 3', alt: 'One step along a scale, of a stated size.' },
  'change': { line: true, from: -1, to: 9, spans: [[2, 7]], marks: [{ x: 2 }, { x: 7 }], note: 'from 2 to 7', alt: 'The move from an old reading to a new one.' },
  'new minus old': { line: true, from: -1, to: 9, spans: [[2, 7]], marks: [{ x: 2 }, { x: 7 }], note: '7 − 2, not 2 − 7', alt: 'The order that makes a change positive when the quantity grew.' },
  'signed change': {
    frames: [
      { pick: 'rise', ...P, curves: [{ f: x => 0.7 * x }], tri: [-2, -1.4, 2, 1.4], note: 'Δy = +2.8' },
      { pick: 'fall', ...P, curves: [{ f: x => -0.7 * x }], tri: [-2, 1.4, 2, -1.4], note: 'Δy = −2.8' }
    ], alt: 'The same size of change, once upward and once downward, with the sign carrying the direction.'
  },
  'rate': { ...P, x0: -1, x1: 9, y0: -1, y1: 9, curves: [{ f: x => 0.8 * x }], tri: [1, 0.8, 6, 4.8], note: '4 over 5', alt: 'A change divided by the change that caused it.' },
  'per unit': { ...P, x0: -1, x1: 9, y0: -1, y1: 9, curves: [{ f: x => 0.8 * x }], tri: [2, 1.6, 3, 2.4], note: 'one across, 0.8 up', alt: 'The rise for a single step of one.' },
  'rate of change': { ...P, curves: [{ f: par }], tri: [-2, par(-2), 2, par(2)], note: 'Δy ÷ Δx', alt: 'One difference divided by another.' },
  'average rate of change': { ...P, curves: [{ f: par }], lines: [{ ...sec(par, -2, 3), c2: '#e0813a' }], pts: [[-2, par(-2)], [3, par(3)]], note: 'the steady rate that matches', alt: 'The slope of the chord between two points on a curve.' },
  'secant line': { ...P, curves: [{ f: par }], lines: [{ ...sec(par, -2.5, 3), c2: '#e0813a' }], pts: [[-2.5, par(-2.5)], [3, par(3)]], alt: 'A straight line cutting a curve at two points.' },
  'slope of a secant': { ...P, curves: [{ f: par }], lines: [{ ...sec(par, -2, 3), c2: faint }], tri: [-2, par(-2), 3, par(3)], note: 'rise over run again', alt: 'The steepness of a chord, measured as rise over run.' },
  'chord of a curve': { ...P, curves: [{ f: par }], segs: [[-2.5, par(-2.5), 3, par(3), '#e0813a', false, 2.6]], pts: [[-2.5, par(-2.5)], [3, par(3)]], alt: 'The segment joining two points of a curve.' },
  'interval': { line: true, spans: [[-1, 3]], marks: [{ x: -1 }, { x: 3 }], note: 'from −1 to 3', alt: 'A stretch of inputs, with two ends.' },
  'width of an interval': { line: true, spans: [[-1, 3]], marks: [{ x: -1 }, { x: 3 }], note: 'Δx = 4', alt: 'How far apart the two ends of an interval are.' },
  'difference quotient': { ...P, curves: [{ f: par }], tri: [1, par(1), 3, par(3)], pts: [[1, par(1)], [3, par(3)]], note: '[f(a+h) − f(a)] ÷ h', alt: 'The chord slope written with one endpoint and a step h.' },
  'h notation': { ...B, text: [[0, 1, '[ f(a + h) − f(a) ] ÷ h', '#16283f', 14], [0, -1, 'one endpoint, and a step of h']], alt: 'The difference quotient written so the interval width can be shrunk on purpose.' },
  'shrinking the interval': {
    frames: [chord(par, 1, 4, 'h = 3'), chord(par, 1, 3, 'h = 2'), chord(par, 1, 2, 'h = 1'), chord(par, 1, 1.4, 'h = 0.4')],
    alt: 'A chord from a fixed point, redrawn with the far end brought closer four times, its slope changing each time.'
  },
  'instantaneous rate': {
    frames: [chord(par, 1, 4, 'far'), chord(par, 1, 2.2, 'closer'), chord(par, 1, 1.3, 'closer still'),
      { pick: 'the limit', ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1), c: par(1) - tangentAt(par, 1) * 1, c2: '#12897c', dash: true }], pts: [[1, par(1)]], note: `slope ${tangentAt(par, 1).toFixed(2)}` }],
    alt: 'Chords closing on a single point until only the tangent is left, and its slope is the rate there.'
  },
  'tangent line': { ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1.5), c: par(1.5) - tangentAt(par, 1.5) * 1.5, c2: '#e0813a' }], pts: [[1.5, par(1.5)]], alt: 'A line touching a curve at one point and matching its direction there.' },
  'slope of a tangent': { ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1.5), c: par(1.5) - tangentAt(par, 1.5) * 1.5, c2: faint }], tri: [1.5, par(1.5), 3.5, par(1.5) + tangentAt(par, 1.5) * 2], pts: [[1.5, par(1.5)]], note: 'the local steepness', alt: 'The steepness of a tangent, drawn as a rise over a run.' },
  'point of tangency': { ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1.5), c: par(1.5) - tangentAt(par, 1.5) * 1.5, c2: faint }], pts: [[1.5, par(1.5), 'touches here', '#e0813a']], alt: 'The single point where a tangent meets its curve.' },
  'approaching a value': {
    frames: [
      { pick: 'far', ...P, curves: [{ f: x => x + 1 }], open: [[1, 2]], pts: [[2.4, 3.4, '', '#e0813a'], [-0.4, 0.6, '', '#e0813a']] },
      { pick: 'nearer', ...P, curves: [{ f: x => x + 1 }], open: [[1, 2]], pts: [[1.6, 2.6, '', '#e0813a'], [0.4, 1.4, '', '#e0813a']] },
      { pick: 'nearer still', ...P, curves: [{ f: x => x + 1 }], open: [[1, 2]], pts: [[1.15, 2.15, '', '#e0813a'], [0.85, 1.85, '', '#e0813a']], note: 'crowding around 2' }
    ], alt: 'Two probes moving toward a hole from either side, their heights closing on the same value.'
  },
  'arbitrarily close': {
    frames: [
      { pick: '±1', ...P, curves: [{ f: x => x + 1 }], open: [[1, 2]], bands: [[0, 1, 2, 3]] },
      { pick: '±0.5', ...P, curves: [{ f: x => x + 1 }], open: [[1, 2]], bands: [[0.5, 1.5, 1.5, 2.5]] },
      { pick: '±0.2', ...P, curves: [{ f: x => x + 1 }], open: [[1, 2]], bands: [[0.8, 1.8, 1.2, 2.2]], note: 'as close as demanded' }
    ], alt: 'A shrinking box around a hole, showing outputs can be forced as near the limit as anyone asks.'
  },
  'neighbourhood': { ...P, curves: [{ f: x => x + 1 }], bands: [[0.4, 1.4, 1.6, 2.6]], open: [[1, 2]], note: 'near the point, not at it', alt: 'A small region around a point, with the point itself hollow.' },
  'limit': {
    frames: [
      { pick: 'the hole', ...P, curves: [{ f: x => x === 1 ? NaN : x + 1 }], open: [[1, 2]], note: 'no value at x = 1' },
      { pick: 'approach', ...P, curves: [{ f: x => x === 1 ? NaN : x + 1 }], open: [[1, 2]], pts: [[1.5, 2.5, '', '#e0813a'], [0.5, 1.5, '', '#e0813a']] },
      { pick: 'the answer', ...P, curves: [{ f: x => x === 1 ? NaN : x + 1 }], open: [[1, 2]], lines: [{ y: 2, dash: true, c2: '#12897c' }], note: 'the limit is 2' }
    ], alt: 'A curve with a hole, probes closing on it, and the height they settle at.'
  },
  'left-hand limit': { ...P, curves: [{ f: x => x < 1 ? x + 1 : NaN }], open: [[1, 2]], arrows: [[-0.5, 0.5, 0.8, 1.8, '#e0813a']], note: 'from below only', alt: 'The value approached coming from the left alone.' },
  'right-hand limit': { ...P, curves: [{ f: x => x > 1 ? x + 1 : NaN }], open: [[1, 2]], arrows: [[3, 4, 1.2, 2.2, '#e0813a']], note: 'from above only', alt: 'The value approached coming from the right alone.' },
  'two-sided limit': { ...P, curves: [{ f: x => x === 1 ? NaN : x + 1 }], open: [[1, 2]], arrows: [[-0.5, 0.5, 0.7, 1.7, '#e0813a'], [3, 4, 1.3, 2.3, '#e0813a']], note: 'both sides agree', alt: 'Both sides heading for the same height, which is what a limit needs.' },
  'existence of a limit': {
    frames: [
      { pick: 'exists', ...P, curves: [{ f: x => x === 1 ? NaN : x + 1 }], open: [[1, 2]], note: 'both sides give 2' },
      { pick: 'does not', ...P, curves: [{ f: x => x < 1 ? 0.5 : 3 }], open: [[1, 0.5]], pts: [[1, 3]], note: 'one side 0.5, the other 3' }
    ], alt: 'Two curves at the same input: one where the sides agree and one where they do not.'
  },
  'limit against value': { ...P, curves: [{ f: x => x === 1 ? NaN : x + 1 }], open: [[1, 2]], pts: [[1, 3.5, 'the value', '#c0504d']], lines: [{ y: 2, dash: true, c2: '#12897c' }], note: 'they can disagree', alt: 'A curve heading for one height while the function is defined at another.' },
  'indeterminate form': { ...B, text: [[0, 0.8, '0 ÷ 0', '#16283f', 22], [0, -1.2, 'decides nothing on its own']], alt: 'The form substitution can produce, which settles no answer by itself.' },
  'zero over zero': {
    frames: [
      { pick: 'gives 4', ...P, curves: [{ f: x => x === 2 ? NaN : x + 2 }], open: [[2, 4]], note: '(x²−4)/(x−2)' },
      { pick: 'gives 1/2', ...P, y0: -1, y1: 2, curves: [{ f: x => x === 1 ? NaN : 1 / (x + 1) }], open: [[1, 0.5]], note: '(x−1)/(x²−1)' },
      { pick: 'gives none', ...P, curves: [{ f: x => 1 / x }], note: '1/x at 0' }
    ], alt: 'Three expressions all substituting to zero over zero, with three different outcomes.'
  },
  'factor and cancel': { ...B, text: [[0, 1.2, '(x² − 4) ÷ (x − 2)', '#16283f', 14], [0, -0.1, '= (x−2)(x+2) ÷ (x−2)', '#5d6b7d', 13], [0, -1.5, '= x + 2,  for every x but 2', '#10796e', 13]], alt: 'The algebra that removes a common factor, legal everywhere except at the point removed.' },
  'continuity': { ...P, curves: [{ f: x => 0.6 * x + 1 }], pts: [[1, 1.6]], note: 'no break at all', alt: 'A curve drawn through a point without lifting the pen.' },
  'continuous at a point': { ...P, curves: [{ f: x => 0.5 * sq(x) - 2 }], pts: [[1, -1.5, 'value = limit', '#e0813a']], alt: 'A point where the curve arrives at exactly the height it is defined to have.' },
  'continuous on an interval': { ...P, curves: [{ f: x => 0.5 * sq(x) - 2 }], bands: [[-2, -4.5, 2, 4.5]], note: 'unbroken throughout', alt: 'A stretch over which a curve has no break anywhere.' },
  'discontinuity': { ...P, curves: [{ f: x => x < 1 ? 0.5 : 3 }], open: [[1, 0.5]], pts: [[1, 3]], alt: 'A place where a curve cannot be drawn without lifting the pen.' },
  'removable discontinuity': { ...P, curves: [{ f: x => x === 1 ? NaN : x + 1 }], open: [[1, 2]], note: 'one point missing', alt: 'A single hole that could be filled by defining one value.' },
  'jump discontinuity': { ...P, curves: [{ f: x => x < 1 ? 0.5 : 3 }], open: [[1, 0.5]], pts: [[1, 3]], note: 'the sides disagree', alt: 'A step where the two sides head for different heights.' },
  'infinite discontinuity': { ...P, curves: [{ f: x => 1 / (x - 1) }], lines: [{ x: 1, dash: true, c2: '#c0504d' }], note: 'no bound either side', alt: 'A break where the curve runs off without limit.' },
  'limit at infinity': {
    frames: [
      { pick: 'near', ...P, x0: -1, x1: 6, curves: [{ f: x => 2 + 3 / x }], lines: [{ y: 2, dash: true, c2: faint }] },
      { pick: 'further', ...P, x0: -2, x1: 24, y0: -1, y1: 6, curves: [{ f: x => 2 + 3 / x }], lines: [{ y: 2, dash: true, c2: faint }] },
      { pick: 'far out', ...P, x0: -5, x1: 120, y0: -1, y1: 6, curves: [{ f: x => 2 + 3 / x }], lines: [{ y: 2, dash: true, c2: '#12897c' }], note: 'settles at 2' }
    ], alt: 'The window widening three times, with the curve flattening toward a level it never reaches.'
  },
  'asymptotic behaviour': { ...P, x0: -1, x1: 9, curves: [{ f: x => 2 + 3 / x }], lines: [{ y: 2, dash: true, c2: '#c0504d' }], alt: 'How a curve behaves far from the origin.' },
  'squeeze theorem': { ...P, x0: -3.2, x1: 3.2, y0: -2, y1: 3, curves: [{ f: x => sq(x), c2: faint }, { f: x => -sq(x), c2: faint }, { f: x => sq(x) * Math.cos(6 / (Math.abs(x) < 0.05 ? 0.05 : x)) }], pts: [[0, 0, '', '#e0813a']], note: 'trapped between two', alt: 'A wobbling curve caught between two others that meet at a point, forcing it through.' },
  'intermediate value theorem': { ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.6 * x }], lines: [{ y: 1, dash: true, c2: '#e0813a' }], pts: [[-3, -1.44], [3, 1.44], [2.66, 1, '', '#e0813a']], note: 'it must cross', alt: 'A continuous curve running from below a level to above it, so it meets that level somewhere.' },
  'extreme value theorem': { ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.9 * x }], bands: [[-3, -4.5, 3, 4.5]], pts: [[-1.58, 0.95, '', '#e0813a'], [1.58, -0.95, '', '#e0813a']], note: 'a highest and a lowest', alt: 'A continuous curve on a closed interval, with its highest and lowest points marked.' },
  'epsilon': { ...P, curves: [{ f: x => x + 1 }], bands: [[-5, 1.6, 5, 2.4]], lines: [{ y: 2, dash: true, c2: '#12897c' }], note: 'a tolerance on the output', alt: 'A horizontal band of allowed output, as narrow as anyone demands.' },
  'delta (the tolerance)': { ...P, curves: [{ f: x => x + 1 }], bands: [[0.6, -5, 1.4, 5]], lines: [{ x: 1, dash: true, c2: '#e0813a' }], note: 'the input room it buys', alt: 'A vertical band of input wide enough to keep the output inside its own band.' },
  'epsilon-delta definition': { ...P, curves: [{ f: x => x + 1 }], bands: [[-5, 1.6, 5, 2.4], [0.6, -5, 1.4, 5]], open: [[1, 2]], note: 'for every ε there is a δ', alt: 'The two bands crossing at the point, one on the output and one on the input.' },

  /* ------------------------------------------------------ 10. derivatives -- */
  'derivative': {
    frames: [chord(par, 1, 4, 'chord'), chord(par, 1, 2.2, 'closer'), chord(par, 1, 1.4, 'closer still'),
      { pick: 'derivative', ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1), c: par(1) - tangentAt(par, 1), c2: '#12897c', dash: true }], pts: [[1, par(1)]], note: `f'(1) = ${tangentAt(par, 1).toFixed(2)}` }],
    alt: 'Chord slopes closing on one number, which is the derivative at that point.'
  },
  'differentiation': { ...P, curves: [{ f: par, c2: faint }, { f: x => 0.7 * x }], note: 'curve above, slopes below', alt: 'A rule and the rule giving its slope, drawn together.' },
  'differentiable': { ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1), c: par(1) - tangentAt(par, 1), c2: '#e0813a' }], pts: [[1, par(1)]], note: 'a tangent exists here', alt: 'A smooth point where a single tangent line fits.' },
  'derivative at a point': { ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 2), c: par(2) - tangentAt(par, 2) * 2, c2: '#e0813a' }], pts: [[2, par(2)]], note: `f'(2) = ${tangentAt(par, 2).toFixed(1)}`, alt: 'One number: the slope of the tangent at a stated input.' },
  'derivative as a function': { ...P, curves: [{ f: par, c2: faint }, { f: x => 0.7 * x }], pts: [[2, 1.4, '', '#e0813a'], [-2, -1.4, '', '#e0813a']], note: 'a slope for every input', alt: 'The slope plotted as a rule in its own right, beside the curve it came from.' },
  'prime notation': { ...B, text: [[0, 0.8, "f'(x)", '#16283f', 22], [0, -1.2, 'the slope rule of f']], alt: 'A dash marking the derivative of a named rule.' },
  'Leibniz notation': { ...B, text: [[0, 0.8, 'dy / dx', '#16283f', 20], [0, -1.2, 'Δy/Δx with the interval shrunk']], alt: 'The derivative written to keep the shape of a fraction.' },
  'dy/dx': { ...B, text: [[0, 0.8, 'dy / dx', '#16283f', 20], [0, -1.2, 'not a fraction, but it remembers being one']], alt: 'Leibniz notation for the derivative.' },
  'operator notation': { ...B, text: [[0, 0.8, 'd/dx [ f(x) ]', '#16283f', 17], [0, -1.2, 'an instruction to differentiate']], alt: 'The derivative written as something done to a rule.' },
  'differentiability implies continuity': { ...P, curves: [{ f: x => Math.abs(x) - 1 }], pts: [[0, -1, 'no tangent', '#c0504d']], note: 'unbroken, still not smooth', alt: 'A corner: the curve is unbroken there, yet no single tangent fits, so the reverse does not hold.' },
  'non-differentiable point': { ...P, curves: [{ f: x => Math.abs(x) - 1 }], pts: [[0, -1, '', '#c0504d']], lines: [{ m: 1, c: -1, dash: true, c2: faint }, { m: -1, c: -1, dash: true, c2: faint }], note: 'two candidate slopes', alt: 'A point where the two sides suggest different slopes, so there is no derivative.' },
  'corner': { ...P, curves: [{ f: x => Math.abs(x) - 1 }], pts: [[0, -1, 'corner', '#c0504d']], alt: 'A sharp turn where two straight pieces meet.' },
  'cusp': { ...P, curves: [{ f: x => 2 * Math.pow(Math.abs(x), 2 / 3) - 2 }], pts: [[0, -2, 'cusp', '#c0504d']], alt: 'A point where the curve turns back on itself and the slope runs off both ways.' },
  'vertical tangent': { ...P, curves: [{ f: x => 2 * Math.cbrt(x) }], lines: [{ x: 0, dash: true, c2: '#c0504d' }], pts: [[0, 0]], note: 'slope with no number', alt: 'A point where the tangent is upright, so its slope is undefined.' },
  'power rule': { ...P, curves: [{ f: x => 0.3 * sq(x) - 2, c2: faint }, { f: x => 0.6 * x }], note: 'xⁿ becomes n·xⁿ⁻¹', alt: 'A squared rule and the linear rule that gives its slope.' },
  'constant rule': { ...P, curves: [{ f: () => 2, c2: faint }, { f: () => 0 }], note: 'flat has no slope', alt: 'A level rule whose slope is zero everywhere.' },
  'constant multiple rule': { ...P, curves: [{ f: x => 0.3 * sq(x) - 2, c2: faint }, { f: x => 0.9 * sq(x) - 2 }], note: 'triple the rule, triple the slope', alt: 'Two curves, one three times as tall, with slopes in the same ratio.' },
  'sum rule': { ...P, curves: [{ f: x => 0.5 * x, c2: faint }, { f: x => 0.2 * sq(x) - 1, c2: faint }, { f: x => 0.5 * x + 0.2 * sq(x) - 1 }], note: 'add the curves, add the slopes', alt: 'Two faint curves and their sum, whose slope is the sum of theirs.' },
  'difference rule': { ...P, curves: [{ f: x => 0.2 * sq(x), c2: faint }, { f: x => 0.5 * x, c2: faint }, { f: x => 0.2 * sq(x) - 0.5 * x }], note: 'the same, subtracted', alt: 'One curve taken from another, with the slopes subtracting too.' },
  'product rule': { ...P, x0: -0.6, x1: 5, y0: -0.6, y1: 4.4, grid: 'lines',
    bands: [[0, 0, 3, 2.4]],
    polys: [{ pts: [[3, 0], [4.2, 0], [4.2, 2.4], [3, 2.4]], fill: '#f3ded0', stroke: '#a25d2a', wid: 1.4 },
            { pts: [[0, 2.4], [3, 2.4], [3, 3.4], [0, 3.4]], fill: '#f3ded0', stroke: '#a25d2a', wid: 1.4 },
            { pts: [[3, 2.4], [4.2, 2.4], [4.2, 3.4], [3, 3.4]], fill: 'none', stroke: '#c0504d', dash: true, wid: 1.4 }],
    text: [[1.5, 1.1, 'uv'], [3.6, 1.1, "u'v"], [1.5, 2.85, "uv'"]],
    note: "u'v + uv'", alt: 'A rectangle of area u times v, with the two strips added when each side grows, and the tiny corner that vanishes.' },
  'quotient rule': { ...B, text: [[0, 1, "(u/v)' = (u'v − uv') ÷ v²", '#16283f', 13], [0, -1.2, 'no picture; it is algebra']], alt: 'The rule for differentiating one rule divided by another, stated symbolically.' },
  'chain rule': { ...B, pts: [[-3.4, 0, 'x', '#e0813a'], [0, 0, 'u'], [3.4, 0, 'y', '#12897c']], arrows: [[-3, 0, -0.5, 0], [0.5, 0, 3, 0]], text: [[-1.7, 0.9, 'du/dx'], [1.7, 0.9, 'dy/du'], [0, -1.6, 'rates multiply along the chain']], alt: 'Two rules in series, with their rates multiplying along the chain.' },
  'outer and inner function': { ...B, text: [[0, 1, '( 4x + 1 )³', '#16283f', 18], [-1.4, -0.6, 'inner', '#a25d2a'], [1.6, -0.6, 'outer', '#10796e'], [0, -2.1, 'what is done first, and last']], alt: 'A composite rule with its inner and outer parts labelled.' },
  'implicit differentiation': { ...P, circles: [{ cx: 0, cy: 0, r: 3 }], lines: [{ m: 3 / 4, c: -25 / 8, c2: '#e0813a' }], pts: [[2.4, -1.8]], note: 'a tangent without solving for y', alt: 'A tangent to a circle, found without ever writing y as a rule in x.' },
  'logarithmic differentiation': { ...B, text: [[0, 1, 'take logs, then differentiate', '#16283f', 13], [0, -0.4, 'turns products into sums', '#5d6b7d', 12]], alt: 'A technique using log laws to simplify before differentiating.' },
  'derivative of an exponential': { ...P, x0: -3, x1: 2.6, y0: -1, y1: 6, curves: [{ f: x => Math.exp(x), c2: faint }, { f: x => Math.exp(x) }], note: 'its own slope', alt: 'The exponential curve, whose slope rule is the same curve.' },
  'derivative of a logarithm': { ...P, x0: -0.5, x1: 5, y0: -2, y1: 3, curves: [{ f: x => Math.log(x), c2: faint }, { f: x => 1 / x }], note: 'ln x gives 1/x', alt: 'A logarithm and the reciprocal curve that gives its slope.' },
  'derivatives of sine and cosine': { ...P, x0: -6.5, x1: 6.5, y0: -2.5, y1: 2.5, curves: [{ f: Math.sin, c2: faint }, { f: Math.cos }], note: 'sine gives cosine', alt: 'A sine wave and the cosine wave that gives its slope.' },
  'derivative of an inverse function': { ...P, curves: [{ f: x => 0.5 * x + 1, c2: faint }, { f: x => 2 * x - 2 }], lines: [{ m: 1, c: 0, dash: true, c2: '#5d6b7d' }], note: 'slopes are reciprocal', alt: 'A line and its inverse mirrored in the diagonal, with reciprocal slopes.' },
  'second derivative': { ...P, curves: [{ f: par, c2: faint }, { f: x => 0.7 * x, c2: '#5d6b7d' }, { f: () => 0.7 }], note: 'the slope of the slope', alt: 'A curve, its slope rule, and the slope of that.' },
  'higher derivatives': { ...P, curves: [{ f: x => 0.1 * x * sq(x), c2: faint }, { f: x => 0.3 * sq(x), c2: '#5d6b7d' }, { f: x => 0.6 * x }], note: 'differentiate again, and again', alt: 'A cubic and the two rules got by differentiating it twice.' },
  'concavity': { ...P, curves: [{ f: x => 0.12 * x * sq(x) }], pts: [[0, 0, 'switches here', '#e0813a']], note: 'which way it bends', alt: 'A curve bending one way then the other.' },
  'concave up': { ...P, curves: [{ f: x => 0.4 * sq(x) - 2 }], note: 'holds water', alt: 'A curve bending upward, like a bowl.' },
  'concave down': { ...P, curves: [{ f: x => -0.4 * sq(x) + 2 }], note: 'spills it', alt: 'A curve bending downward, like a dome.' },
  'point of inflection': { ...P, curves: [{ f: x => 0.12 * x * sq(x) }], pts: [[0, 0, '', '#e0813a']], lines: [{ m: 0, c: 0, dash: true, c2: faint }], note: 'bending changes sides', alt: 'The point where a curve stops bending one way and starts bending the other.' },
  'critical point': { ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.9 * x }], pts: [[-1.58, 0.95, '', '#e0813a'], [1.58, -0.95, '', '#e0813a']], note: "f' = 0 or undefined", alt: 'Points where the slope is zero or fails to exist.' },
  'stationary point': { ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.9 * x }], lines: [{ y: 0.95, dash: true, c2: faint }, { y: -0.95, dash: true, c2: faint }], pts: [[-1.58, 0.95, '', '#e0813a'], [1.58, -0.95, '', '#e0813a']], note: 'flat for an instant', alt: 'Points where the tangent is horizontal.' },
  'first derivative test': {
    frames: [
      { pick: 'rising', ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.9 * x }], pts: [[-2.6, -0.77]], lines: [{ m: 1.53, c: 3.21, c2: '#12897c' }], note: "f' > 0" },
      { pick: 'flat', ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.9 * x }], pts: [[-1.58, 0.95]], lines: [{ y: 0.95, c2: '#e0813a' }], note: "f' = 0" },
      { pick: 'falling', ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.9 * x }], pts: [[-0.5, 0.435]], lines: [{ m: -0.81, c: 0.03, c2: '#c0504d' }], note: "f' < 0" }
    ], alt: 'The slope before, at, and after a turning point, which is how its kind is decided.'
  },
  'second derivative test': { ...P, curves: [{ f: x => 0.4 * sq(x) - 2 }], pts: [[0, -2, '', '#e0813a']], note: "f'' > 0 means a minimum", alt: 'A curve bending upward at a flat point, which makes that point a minimum.' },
  'increasing function': { ...P, curves: [{ f: x => 0.7 * x }], arrows: [[-3, -2.1, 3, 2.1, '#12897c']], note: "f' > 0", alt: 'A rule rising throughout.' },
  'decreasing function': { ...P, curves: [{ f: x => -0.7 * x }], arrows: [[-3, 2.1, 3, -2.1, '#c0504d']], note: "f' < 0", alt: 'A rule falling throughout.' },
  'monotonic': { ...P, curves: [{ f: x => 0.12 * x * sq(x) + 0.6 * x }], note: 'never turns back', alt: 'A rule that only ever rises, or only ever falls.' },
  'local extremum': { ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.9 * x }], pts: [[-1.58, 0.95, 'max', '#e0813a'], [1.58, -0.95, 'min', '#e0813a']], alt: 'A high or low point compared with its immediate neighbours.' },
  'global extremum': { ...P, curves: [{ f: x => -0.4 * sq(x) + 3 }], pts: [[0, 3, 'the highest', '#e0813a']], alt: 'The highest or lowest the rule ever goes.' },
  'optimisation': {
    frames: [
      { pick: 'try', ...P, curves: [{ f: x => -0.4 * sq(x) + 3 }], pts: [[-2, 1.4]], lines: [{ m: 1.6, c: 4.6, c2: '#5d6b7d' }], note: 'still climbing' },
      { pick: 'try again', ...P, curves: [{ f: x => -0.4 * sq(x) + 3 }], pts: [[-0.8, 2.74]], lines: [{ m: 0.64, c: 3.25, c2: '#5d6b7d' }], note: 'nearly there' },
      { pick: 'the best', ...P, curves: [{ f: x => -0.4 * sq(x) + 3 }], pts: [[0, 3, '', '#e0813a']], lines: [{ y: 3, c2: '#e0813a' }], note: "f' = 0" }
    ], alt: 'The tangent flattening as the search moves toward the best value.'
  },
  'constraint': { ...P, curves: [{ f: x => -0.4 * sq(x) + 3 }], bands: [[-3.5, -4.5, -1, 4.5]], pts: [[-1, 2.6, 'best allowed', '#e0813a']], note: 'the peak is out of bounds', alt: 'A rule restricted to part of its domain, so the best allowed point is at the edge.' },
  'related rates': { ...B, pts: [[-3, 0, '', '#e0813a'], [3, 0, '', '#12897c']], arrows: [[-2.5, 0, 2.5, 0]], text: [[0, 0.9, 'dV/dt = dV/dr · dr/dt'], [0, -1.6, 'one rate drives another']], alt: 'One changing quantity driving another through a chain of rates.' },
  'displacement': { ...P, x0: -0.5, x1: 5, y0: -3, y1: 4, curves: [{ f: t => 0.5 * sq(t) - 2 }], note: 'position against time', alt: 'Where something is, plotted against when.' },
  'velocity': { ...P, x0: -0.5, x1: 5, y0: -3, y1: 4, curves: [{ f: t => 0.5 * sq(t) - 2, c2: faint }, { f: t => t }], note: 'the slope of position', alt: 'The slope of a position graph, which is a speed with a direction.' },
  'speed': { ...P, x0: -0.5, x1: 5, y0: -0.5, y1: 4, curves: [{ f: t => Math.abs(t - 2) }], note: 'velocity without its sign', alt: 'The size of a velocity, never negative.' },
  'acceleration': { ...P, x0: -0.5, x1: 5, y0: -3, y1: 4, curves: [{ f: t => 0.5 * sq(t) - 2, c2: faint }, { f: t => t, c2: '#5d6b7d' }, { f: () => 1 }], note: 'the slope of velocity', alt: 'Position, velocity and acceleration drawn together.' },
  'marginal cost': { ...P, x0: -0.5, x1: 6, y0: -0.5, y1: 6, curves: [{ f: q => 0.15 * sq(q) + 1 }], tri: [3, 2.35, 4, 3.4], note: 'the cost of one more', alt: 'The extra cost of producing one further unit, as a slope.' },
  'elasticity': { ...B, text: [[0, 1, 'percentage change in one', '#16283f', 12], [0, -0.2, 'per percentage change in the other', '#16283f', 12], [0, -1.7, 'a rate of relative changes', '#5d6b7d']], alt: 'A rate comparing proportional changes rather than absolute ones.' },
  'tangent line approximation': { ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1), c: par(1) - tangentAt(par, 1), c2: '#e0813a' }], pts: [[1, par(1)]], bands: [[0.4, -3, 1.6, 3]], note: 'near enough, near the point', alt: 'A tangent standing in for the curve close to where they touch.' },
  'linearisation': {
    frames: [
      { pick: 'wide', ...P, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1), c: par(1) - tangentAt(par, 1), c2: '#e0813a' }], pts: [[1, par(1)]] },
      { pick: 'closer', ...P, x0: -1, x1: 3, y0: -2.5, y1: 0.5, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1), c: par(1) - tangentAt(par, 1), c2: '#e0813a' }], pts: [[1, par(1)]] },
      { pick: 'very close', ...P, x0: 0.5, x1: 1.5, y0: -1.6, y1: -1, curves: [{ f: par }], lines: [{ m: tangentAt(par, 1), c: par(1) - tangentAt(par, 1), c2: '#e0813a' }], pts: [[1, par(1)]], note: 'indistinguishable' }
    ], alt: 'Zooming in on a tangent point until the curve and its tangent cannot be told apart.'
  },
  'differential': { ...P, curves: [{ f: par }], tri: [1, par(1), 2, par(1) + tangentAt(par, 1)], pts: [[1, par(1)], [2, par(2)]], note: 'dy along the tangent', alt: 'The rise along the tangent for a small step, beside the true rise of the curve.' },
  "Newton's method": {
    frames: [
      { pick: 'guess', ...P, curves: [{ f: x => 0.4 * sq(x) - 2 }], pts: [[3, 1.6]], lines: [{ m: 2.4, c: -5.6, c2: '#e0813a' }] },
      { pick: 'again', ...P, curves: [{ f: x => 0.4 * sq(x) - 2 }], pts: [[2.33, 0.17]], lines: [{ m: 1.87, c: -4.18, c2: '#e0813a' }] },
      { pick: 'again', ...P, curves: [{ f: x => 0.4 * sq(x) - 2 }], pts: [[2.24, 0.007]], lines: [{ m: 1.79, c: -4.02, c2: '#e0813a' }], note: 'closing on √5' }
    ], alt: 'A tangent used to slide a guess toward a root, three times.'
  },
  "Rolle's theorem": { ...P, curves: [{ f: x => -0.4 * sq(x) + 2 }], pts: [[-2.24, 0], [2.24, 0], [0, 2, '', '#e0813a']], lines: [{ y: 2, dash: true, c2: '#e0813a' }], note: 'equal ends force a flat point', alt: 'A curve returning to the same height, which forces a horizontal tangent between.' },
  'mean value theorem': { ...P, curves: [{ f: par }], lines: [{ ...sec(par, -2.5, 3), c2: faint }, { m: tangentAt(par, 0.25), c: par(0.25) - tangentAt(par, 0.25) * 0.25, c2: '#e0813a' }], pts: [[-2.5, par(-2.5)], [3, par(3)], [0.25, par(0.25), '', '#e0813a']], note: 'some tangent matches the chord', alt: 'A chord and a parallel tangent somewhere between its two ends.' },
  "L'Hopital's rule": { ...B, text: [[0, 1, 'lim f/g  =  lim f′/g′', '#16283f', 15], [0, -1.2, 'when both go to zero together']], alt: 'A rule replacing a limit of a quotient with the limit of the quotient of slopes.' },
  'Taylor polynomial': {
    frames: [
      { pick: 'degree 1', ...P, x0: -3.4, x1: 3.4, y0: -2, y1: 2.4, curves: [{ f: Math.sin, c2: faint }, { f: x => x }] },
      { pick: 'degree 3', ...P, x0: -3.4, x1: 3.4, y0: -2, y1: 2.4, curves: [{ f: Math.sin, c2: faint }, { f: x => x - x * sq(x) / 6 }] },
      { pick: 'degree 5', ...P, x0: -3.4, x1: 3.4, y0: -2, y1: 2.4, curves: [{ f: Math.sin, c2: faint }, { f: x => x - x * sq(x) / 6 + x * sq(sq(x)) / 120 }], note: 'hugging further out' }
    ], alt: 'Polynomials of rising degree fitting a sine wave over a widening stretch.'
  },
  'Maclaurin series': { ...P, x0: -3.4, x1: 3.4, y0: -2, y1: 2.4, curves: [{ f: Math.sin, c2: faint }, { f: x => x - x * sq(x) / 6 + x * sq(sq(x)) / 120 }], pts: [[0, 0, 'built at 0', '#e0813a']], alt: 'A Taylor polynomial built at the origin.' },
  'radius of convergence': { ...P, x0: -4.5, x1: 4.5, y0: -2, y1: 2.4, curves: [{ f: Math.sin, c2: faint }, { f: x => x - x * sq(x) / 6 + x * sq(sq(x)) / 120 }], bands: [[-3, -2, 3, 2.4]], note: 'useful only inside', alt: 'The stretch within which an approximation stays close, shaded.' }
};
