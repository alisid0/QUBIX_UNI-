// Atlas figures for stages 6, 7 and 8: moving a curve, conics and other
// coordinates, and data on the plane.
//
// Polar and parametric shapes are generated as point lists rather than
// described, so a rose curve has the number of petals its formula gives it and
// not the number someone drew.

const P = { grid: 'lines', ticks: true };
const B = { grid: 'none', ticks: false, axes: false, arrowheads: false, x0: -5, x1: 5, y0: -4, y1: 4 };
const sq = x => x * x;
const faint = '#d8d3c7';

// Sample any parametric pair over a range.
const path = (fx, fy, t0, t1, n = 260) => {
  const pts = [];
  for (let i = 0; i <= n; i++) { const t = t0 + (i / n) * (t1 - t0); pts.push([fx(t), fy(t)]); }
  return pts;
};
const polar = (r, t0 = 0, t1 = 2 * Math.PI, n = 300) =>
  path(t => r(t) * Math.cos(t), t => r(t) * Math.sin(t), t0, t1, n);

// One fixed cloud of measurements, reused so every data plate describes the
// same experiment rather than a fresh random one each build.
const CLOUD = [[-3.6, -2.4], [-3, -1.6], [-2.4, -2.1], [-1.8, -0.7], [-1.2, -1.1], [-0.6, 0.2],
  [0, -0.3], [0.6, 0.9], [1.2, 0.5], [1.8, 1.6], [2.4, 1.2], [3, 2.3], [3.6, 1.9]];
const FLAT = CLOUD.map(([x, y], i) => [x, (i % 3) - 1 + (i % 2) * 0.4]);
const FALL = CLOUD.map(([x, y]) => [x, -y]);

export const ATLAS_6_8 = {
  /* ------------------------------------------------------ 6. moving a curve */
  'parent function': { ...P, curves: [{ f: x => sq(x) - 2 }], note: 'the shape before it moves', alt: 'The plain curve a family of transformations starts from.' },
  'transformation': { ...P, curves: [{ f: x => sq(x) - 2, c2: faint }, { f: x => sq(x - 2) + 0.5 }], arrows: [[0, -2, 2, 0.5, '#e0813a']], alt: 'A parent curve and its moved copy, with an arrow between the two matching points.' },
  'translation': { ...P, curves: [{ f: x => sq(x) - 2, c2: faint }, { f: x => sq(x - 2) - 2 }], arrows: [[0, -2, 2, -2, '#e0813a']], note: 'slid, not reshaped', alt: 'A curve slid sideways without changing shape.' },
  'horizontal shift': { ...P, curves: [{ f: x => sq(x) - 2, c2: faint }, { f: x => sq(x - 2) - 2 }], pts: [[0, -2, '', faint], [2, -2, '', '#e0813a']], note: 'f(x − 2)', alt: 'A curve moved two to the right, its lowest point moving with it.' },
  'vertical shift': { ...P, curves: [{ f: x => sq(x) - 2, c2: faint }, { f: x => sq(x) + 1 }], pts: [[0, -2, '', faint], [0, 1, '', '#e0813a']], note: 'f(x) + 3', alt: 'A curve lifted three, its lowest point rising with it.' },
  'inside the bracket': { ...P, curves: [{ f: x => sq(x) - 2, c2: faint }, { f: x => sq(x - 2) - 2 }], note: 'acts on the input', alt: 'A change written inside the brackets, which moves the curve sideways.' },
  'outside the bracket': { ...P, curves: [{ f: x => sq(x) - 2, c2: faint }, { f: x => sq(x) + 1 }], note: 'acts on the output', alt: 'A change written outside the brackets, which moves the curve up or down.' },
  'shift against the sign': { ...P, curves: [{ f: x => sq(x) - 2, c2: faint }, { f: x => sq(x - 2) - 2 }], arrows: [[0, -3.4, 2, -3.4, '#e0813a']], note: 'minus two moves right', alt: 'A minus inside the bracket moving the curve to the right, opposite to its sign.' },
  'reflection': { ...P, curves: [{ f: x => sq(x) - 2, c2: faint }, { f: x => -(sq(x) - 2) }], alt: 'A curve and its mirror image.' },
  'reflection in the x-axis': { ...P, curves: [{ f: x => 0.6 * sq(x) - 1, c2: faint }, { f: x => -(0.6 * sq(x) - 1) }], axisHi: 'x', note: 'y becomes −y', alt: 'A curve flipped over the horizontal axis; every height changes sign.' },
  'reflection in the y-axis': { ...P, curves: [{ f: x => Math.sqrt(Math.max(0, x)) * 2 - 1, c2: faint }, { f: x => Math.sqrt(Math.max(0, -x)) * 2 - 1 }], axisHi: 'y', note: 'x becomes −x', alt: 'A curve flipped over the vertical axis; every input changes sign.' },
  'reflection in y = x': { ...P, curves: [{ f: x => 2 * x + 1, c2: faint }, { f: x => (x - 1) / 2 }], lines: [{ m: 1, c: 0, dash: true, c2: '#5d6b7d' }], note: 'coordinates swap', alt: 'A line and its inverse, mirrored in the dashed diagonal.' },
  'stretch': { ...P, curves: [{ f: x => 0.4 * sq(x) - 1, c2: faint }, { f: x => 1.2 * sq(x) - 3 }], alt: 'A curve pulled taller.' },
  'compression': { ...P, curves: [{ f: x => 1.2 * sq(x) - 3, c2: faint }, { f: x => 0.4 * sq(x) - 1 }], alt: 'A curve squashed flatter.' },
  'vertical stretch': { ...P, curves: [{ f: x => 0.4 * sq(x) - 2, c2: faint }, { f: x => 1.2 * sq(x) - 2 }], segs: [[2, -2, 2, -0.4, faint, false, 2], [2, -2, 2, 2.8, '#e0813a', false, 2]], note: 'heights tripled', alt: 'Every height multiplied by three, so the curve looks narrower.' },
  'horizontal stretch': { ...P, curves: [{ f: x => sq(x / 2) - 2, c2: faint }, { f: x => sq(x * 1.4) - 2 }], note: 'widths divided', alt: 'A curve squeezed toward the vertical axis.' },
  'scale factor': { ...P, curves: [{ f: x => 0.4 * sq(x) - 2, c2: faint }, { f: x => 0.8 * sq(x) - 2 }, { f: x => 1.6 * sq(x) - 2, c2: '#e0813a' }], note: '×1, ×2, ×4', alt: 'The same parent stretched by three different factors.' },
  'dilation': { ...P, curves: [{ f: x => 0.5 * sq(x) - 2, c2: faint }, { f: x => 1.5 * sq(x) - 2 }], pts: [[0, -2, 'fixed', '#e0813a']], alt: 'A curve scaled away from a fixed point that does not move.' },
  'invariant point': { ...P, curves: [{ f: x => 0.5 * sq(x) - 2, c2: faint }, { f: x => 1.5 * sq(x) - 2 }], pts: [[0, -2, 'stays put', '#e0813a']], alt: 'The one point a transformation leaves exactly where it was.' },
  'order of transformations': { ...P, curves: [{ f: x => -(sq(x + 2)) + 1, c2: faint }, { f: x => -(sq(x - 2)) + 1 }], note: 'shift then flip ≠ flip then shift', alt: 'Two curves from the same two operations applied in opposite orders.' },
  'composition of transformations': { ...P, curves: [{ f: x => sq(x) - 3, c2: faint }, { f: x => 1.5 * sq(x - 2) - 1 }], arrows: [[0, -3, 2, -1, '#e0813a']], note: 'moved and stretched', alt: 'Several transformations applied one after another.' },
  'even function': { ...P, curves: [{ f: x => 0.4 * sq(x) - 2 }], lines: [{ x: 0, dash: true, c2: '#e0813a' }], pts: [[2, -0.4], [-2, -0.4]], note: 'f(−x) = f(x)', alt: 'A curve that is its own mirror image in the vertical axis.' },
  'odd function': { ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.3 * x }], pts: [[2, 0.36], [-2, -0.36]], note: 'f(−x) = −f(x)', alt: 'A curve unchanged by turning it half a turn about the origin.' },
  'symmetry about the y-axis': { ...P, curves: [{ f: x => 0.4 * sq(x) - 2 }], lines: [{ x: 0, dash: true, c2: '#e0813a' }], alt: 'A curve folding onto itself along the vertical axis.' },
  'symmetry about the origin': { ...P, curves: [{ f: x => 0.12 * x * sq(x) - 0.3 * x }], pts: [[0, 0, '', '#e0813a'], [2.4, 0.94], [-2.4, -0.94]], alt: 'A curve carried onto itself by a half turn about the origin.' },
  'rotational symmetry': { ...P, x0: -3.4, x1: 3.4, y0: -3.4, y1: 3.4, paths: [{ pts: polar(t => 2 + 0.7 * Math.cos(4 * t)), close: true, fill: '#cfe6e1' }], pts: [[0, 0, '', '#e0813a']], note: 'four-fold', alt: 'A shape unchanged by turning it a quarter turn about its centre.' },
  'image curve': { ...P, curves: [{ f: x => sq(x) - 3, c2: faint }, { f: x => sq(x - 2) - 1 }], note: 'the result, not the original', alt: 'The curve a transformation produces, with the original faint behind it.' },
  'mapping notation': { ...B, text: [[0, 0.8, '(x, y) ↦ (x + 2, y − 1)', '#16283f', 15], [0, -1.2, 'where each point goes']], alt: 'A transformation written as the rule sending each point to its image.' },
  'transformation matrix': { ...B, text: [[0, 1.2, '⎡ 0  −1 ⎤', '#16283f', 15], [0, 0, '⎣ 1   0 ⎦', '#16283f', 15], [0, -1.6, 'a quarter turn, as four numbers']], alt: 'A transformation written as a grid of numbers.' },
  'rotation about the origin': { ...P, polys: [{ pts: [[1, 0.5], [3, 0.5], [3, 1.5], [1, 1.5]], stroke: faint, fill: 'none' }, { pts: [[-0.5, 1], [-0.5, 3], [-1.5, 3], [-1.5, 1]] }], pts: [[0, 0, '', '#e0813a']], note: 'a quarter turn', alt: 'A shape turned about the origin, with the original faint.' },
  'shear': { ...P, polys: [{ pts: [[-2, -1], [2, -1], [2, 2], [-2, 2]], stroke: faint, fill: 'none' }, { pts: [[-2, -1], [2, -1], [3.5, 2], [-0.5, 2]] }], note: 'slid, not turned', alt: 'A square pushed sideways at the top, keeping its base and area.' },

  /* ------------------------------------------- 7. conics, loci, other coordinates */
  'locus': { ...P, circles: [{ cx: 0, cy: 0, r: 2.5, dash: true, stroke: '#e0813a' }], pts: [[0, 0], [2.5, 0], [0, 2.5], [-1.77, 1.77]], note: 'all points 2.5 from the centre', alt: 'The set of every point satisfying one stated condition.' },
  'circle': { ...P, circles: [{ cx: 0, cy: 0, r: 3, fill: '#cfe6e1' }], alt: 'Every point at the same distance from a centre.' },
  'centre': { ...P, circles: [{ cx: 0.5, cy: 0.5, r: 2.6 }], pts: [[0.5, 0.5, 'centre', '#e0813a']], alt: 'The fixed point a circle is measured from.' },
  'radius': { ...P, circles: [{ cx: 0, cy: 0, r: 3 }], segs: [[0, 0, 3, 0, '#e0813a', false, 3]], pts: [[0, 0]], alt: 'The distance from the centre to the circle.' },
  'equation of a circle': { ...P, circles: [{ cx: 0, cy: 0, r: 3 }], note: 'x² + y² = 9', alt: 'A circle of radius three centred at the origin.' },
  'general form of a circle': { ...P, circles: [{ cx: 1, cy: -1, r: 2.5 }], pts: [[1, -1]], note: 'x² + y² − 2x + 2y − 4 = 0', alt: 'A circle away from the origin, written with everything expanded.' },
  'diameter': { ...P, circles: [{ cx: 0, cy: 0, r: 3 }], segs: [[-3, 0, 3, 0, '#e0813a', false, 3]], pts: [[0, 0]], alt: 'A chord through the centre, twice the radius.' },
  'chord': { ...P, circles: [{ cx: 0, cy: 0, r: 3 }], segs: [[-2.6, 1.5, 1.5, 2.6, '#e0813a', false, 3]], alt: 'A segment joining two points of a circle.' },
  'arc': { ...P, circles: [{ cx: 0, cy: 0, r: 3, stroke: faint }], paths: [{ pts: polar(() => 3, 0.4, 2.2), c2: '#e0813a', wid: 3.4 }], alt: 'A piece of the circle itself.' },
  'sector': { ...P, circles: [{ cx: 0, cy: 0, r: 3, stroke: faint }], paths: [{ pts: [[0, 0], ...polar(() => 3, 0.4, 2.2)], close: true, fill: '#cfe6e1' }], alt: 'A wedge cut from the centre between two radii.' },
  'segment of a circle': { ...P, circles: [{ cx: 0, cy: 0, r: 3, stroke: faint }], paths: [{ pts: polar(() => 3, 0.4, 2.2), close: true, fill: '#cfe6e1' }], alt: 'The region between a chord and the arc it cuts off.' },
  'tangent to a circle': { ...P, circles: [{ cx: 0, cy: 0, r: 2.5 }], lines: [{ y: 2.5, c2: '#e0813a' }], pts: [[0, 2.5]], right: [0, 2.5, 1, -1], alt: 'A line touching a circle once, at right angles to the radius there.' },
  'secant to a circle': { ...P, circles: [{ cx: 0, cy: 0, r: 2.5 }], lines: [{ y: 1.4, c2: '#e0813a' }], pts: [[2.07, 1.4], [-2.07, 1.4]], alt: 'A line cutting a circle at two points.' },
  'point of contact': { ...P, circles: [{ cx: 0, cy: 0, r: 2.5 }], lines: [{ y: 2.5, c2: faint }], pts: [[0, 2.5, 'touches here', '#e0813a']], alt: 'The single point where a tangent meets a circle.' },
  'conic section': { ...P, circles: [{ cx: 0, cy: 0, r: 1.4, stroke: faint }], ellipses: [{ cx: 0, cy: 0, rx: 3.4, ry: 2.1, stroke: '#5d6b7d' }], curves: [{ f: x => 0.35 * sq(x) - 3.6, c2: '#e0813a' }], note: 'circle, ellipse, parabola', alt: 'Three curves from the same family, cut from a cone at different angles.' },
  'ellipse': { ...P, ellipses: [{ cx: 0, cy: 0, rx: 3.6, ry: 2, fill: '#cfe6e1' }], alt: 'A closed oval, stretched more one way than the other.' },
  'major axis': { ...P, ellipses: [{ cx: 0, cy: 0, rx: 3.6, ry: 2 }], segs: [[-3.6, 0, 3.6, 0, '#e0813a', false, 3]], alt: 'The longer way across an ellipse, through its centre.' },
  'minor axis': { ...P, ellipses: [{ cx: 0, cy: 0, rx: 3.6, ry: 2 }], segs: [[0, -2, 0, 2, '#e0813a', false, 3]], alt: 'The shorter way across an ellipse, through its centre.' },
  'focus': { ...P, ellipses: [{ cx: 0, cy: 0, rx: 3.6, ry: 2 }], pts: [[2.99, 0, 'focus', '#e0813a']], alt: 'One of two special interior points that define an ellipse.' },
  'foci': { ...P, ellipses: [{ cx: 0, cy: 0, rx: 3.6, ry: 2 }], pts: [[2.99, 0], [-2.99, 0], [1.4, 1.84, '', '#5d6b7d']], segs: [[2.99, 0, 1.4, 1.84, '#e0813a', true, 1.5], [-2.99, 0, 1.4, 1.84, '#e0813a', true, 1.5]], note: 'the two distances add to a constant', alt: 'Both focal points, with the two distances to a point on the curve drawn.' },
  'eccentricity': { ...P, circles: [{ cx: 0, cy: 0, r: 2, stroke: faint }], ellipses: [{ cx: 0, cy: 0, rx: 3.8, ry: 1.2 }], note: '0 is a circle, nearer 1 is flatter', alt: 'A near-circle and a flattened ellipse, showing how far from round each is.' },
  'directrix': { ...P, curves: [{ f: x => 0.25 * sq(x) - 2 }], lines: [{ y: -3, c2: '#e0813a', dash: true }], pts: [[0, -1]], note: 'equal distance to point and line', alt: 'A parabola with its focus and the line every point is equally far from.' },
  'parabola as a conic': { ...P, curves: [{ f: x => 0.3 * sq(x) - 2.5 }], pts: [[0, -1.67, 'focus', '#e0813a']], lines: [{ y: -3.33, dash: true, c2: '#e0813a' }], alt: 'A parabola defined by one point and one line rather than by an equation.' },
  'latus rectum': { ...P, curves: [{ f: x => 0.25 * sq(x) - 2 }], pts: [[0, -1]], segs: [[-2, -1, 2, -1, '#e0813a', false, 3]], alt: 'The chord through the focus at right angles to the axis.' },
  'hyperbola': { ...P, paths: [{ pts: path(t => 2 * Math.cosh(t), t => 1.4 * Math.sinh(t), -1.6, 1.6) }, { pts: path(t => -2 * Math.cosh(t), t => 1.4 * Math.sinh(t), -1.6, 1.6) }], alt: 'Two separate branches curving away from each other.' },
  'transverse axis': { ...P, paths: [{ pts: path(t => 2 * Math.cosh(t), t => 1.4 * Math.sinh(t), -1.4, 1.4) }, { pts: path(t => -2 * Math.cosh(t), t => 1.4 * Math.sinh(t), -1.4, 1.4) }], segs: [[-2, 0, 2, 0, '#e0813a', false, 3]], pts: [[2, 0], [-2, 0]], alt: 'The axis joining the two vertices of a hyperbola.' },
  'conjugate axis': { ...P, paths: [{ pts: path(t => 2 * Math.cosh(t), t => 1.4 * Math.sinh(t), -1.4, 1.4) }, { pts: path(t => -2 * Math.cosh(t), t => 1.4 * Math.sinh(t), -1.4, 1.4) }], segs: [[0, -1.4, 0, 1.4, '#e0813a', false, 3]], alt: 'The axis at right angles to the transverse one, meeting no branch.' },
  'asymptotes of a hyperbola': { ...P, paths: [{ pts: path(t => 2 * Math.cosh(t), t => 1.4 * Math.sinh(t), -1.6, 1.6) }, { pts: path(t => -2 * Math.cosh(t), t => 1.4 * Math.sinh(t), -1.6, 1.6) }], lines: [{ m: 0.7, c: 0, dash: true, c2: '#c0504d' }, { m: -0.7, c: 0, dash: true, c2: '#c0504d' }], alt: 'Two lines the branches approach without ever meeting.' },
  'degenerate conic': { ...P, lines: [{ m: 0.7, c: 0, c2: '#e0813a' }, { m: -0.7, c: 0, c2: '#e0813a' }], pts: [[0, 0]], note: 'the cone cut through its tip', alt: 'A conic collapsed to a pair of crossing lines.' },
  'parametric equation': { ...P, paths: [{ pts: path(t => 3 * Math.cos(t), t => 2 * Math.sin(t), 0, 2 * Math.PI) }], pts: [[3, 0, 't = 0', '#e0813a']], note: 'x = 3cos t, y = 2sin t', alt: 'A curve given by two rules driven by a third quantity.' },
  'parameter': { ...P, paths: [{ pts: path(t => 3 * Math.cos(t), t => 2 * Math.sin(t), 0, 2 * Math.PI), c2: faint }, { pts: path(t => 3 * Math.cos(t), t => 2 * Math.sin(t), 0, 2) }], pts: [[3, 0], [3 * Math.cos(2), 2 * Math.sin(2), 't = 2', '#e0813a']], alt: 'The quantity that decides how far along a curve a point sits.' },
  'parametrisation': { ...P, paths: [{ pts: path(t => t, t => 0.4 * sq(t) - 2, -3.5, 3.5) }], pts: [[-2, -0.4], [0, -2], [2, -0.4]], note: 'the same curve, walked', alt: 'A familiar curve rewritten as a journey along it.' },
  'eliminating the parameter': { ...B, text: [[0, 1.2, 'x = 3cos t,  y = 2sin t', '#16283f', 13], [0, -0.2, '(x/3)² + (y/2)² = 1', '#10796e', 14], [0, -1.7, 'the third quantity removed']], alt: 'Two parametric rules combined into a single equation in x and y.' },
  'polar coordinates': { ...P, x0: -4.5, x1: 4.5, y0: -4.5, y1: 4.5, circles: [{ cx: 0, cy: 0, r: 1.5, stroke: faint }, { cx: 0, cy: 0, r: 3, stroke: faint }], segs: [[0, 0, 2.1, 2.1, '#e0813a', false, 2.4]], pts: [[2.1, 2.1, '(3, 45°)']], alt: 'A point fixed by a distance and a direction instead of two lengths.' },
  'pole': { ...P, circles: [{ cx: 0, cy: 0, r: 1.5, stroke: faint }, { cx: 0, cy: 0, r: 3, stroke: faint }], pts: [[0, 0, 'pole', '#e0813a']], alt: 'The centre that polar distances are measured from.' },
  'polar axis': { ...P, circles: [{ cx: 0, cy: 0, r: 2.5, stroke: faint }], segs: [[0, 0, 4, 0, '#e0813a', false, 3]], note: 'angles measured from here', alt: 'The reference direction polar angles are measured from.' },
  'radial coordinate': { ...P, circles: [{ cx: 0, cy: 0, r: 3, stroke: faint }], segs: [[0, 0, 2.1, 2.1, '#e0813a', false, 3]], text: [[1.4, 1.0, 'r', '#a25d2a', 11]], alt: 'How far a point lies from the pole.' },
  'angular coordinate': { ...P, circles: [{ cx: 0, cy: 0, r: 1.2, stroke: faint }], segs: [[0, 0, 4, 0, '#5d6b7d', false, 1.6], [0, 0, 2.1, 2.1, '#e0813a', false, 2.4]], text: [[1.9, 0.55, 'θ', '#a25d2a', 11]], alt: 'Which direction a point lies in from the pole.' },
  'polar to Cartesian conversion': { ...P, segs: [[0, 0, 2.6, 1.8, '#e0813a', false, 2.4], [2.6, 0, 2.6, 1.8, '#12897c', true, 1.6], [0, 0, 2.6, 0, '#12897c', true, 1.6]], pts: [[2.6, 1.8]], right: [2.6, 0, -1, 1], note: 'x = r cos θ, y = r sin θ', alt: 'A polar point with its two rectangular measurements drawn as a right triangle.' },
  'polar curve': { ...P, x0: -4.5, x1: 4.5, y0: -4.5, y1: 4.5, paths: [{ pts: polar(t => 2 + 1.4 * Math.cos(3 * t)) }], alt: 'A curve whose distance from the pole depends on its direction.' },
  'circle in polar form': { ...P, paths: [{ pts: polar(t => 3 * Math.cos(t), -Math.PI / 2, Math.PI / 2) }], pts: [[0, 0]], note: 'r = 3cos θ', alt: 'A circle through the pole, written in polar form.' },
  'rose curve': { ...P, x0: -4, x1: 4, y0: -4, y1: 4, paths: [{ pts: polar(t => 3 * Math.cos(3 * t)), close: true, fill: '#cfe6e1' }], note: 'r = 3cos 3θ', alt: 'A flower of three petals, the count set by the multiplier inside.' },
  'cardioid': { ...P, x0: -5, x1: 3, y0: -4, y1: 4, paths: [{ pts: polar(t => 1.8 * (1 - Math.cos(t))), close: true, fill: '#cfe6e1' }], note: 'r = a(1 − cos θ)', alt: 'A heart-shaped curve with a single cusp at the pole.' },
  'limaçon': { ...P, x0: -5, x1: 3.5, y0: -4, y1: 4, paths: [{ pts: polar(t => 1.2 + 2.4 * Math.cos(t + Math.PI)), close: true }], note: 'an inner loop', alt: 'A curve like a cardioid but with a loop inside it.' },
  'Archimedean spiral': { ...P, x0: -5, x1: 5, y0: -5, y1: 5, paths: [{ pts: polar(t => 0.42 * t, 0, 7 * Math.PI, 500) }], note: 'r = aθ', alt: 'A spiral whose turns are equally spaced.' },
  'lemniscate': { ...P, paths: [{ pts: polar(t => Math.abs(Math.cos(2 * t)) < 1e-9 ? 0 : 3 * Math.sqrt(Math.max(0, Math.cos(2 * t))), -Math.PI / 4, Math.PI / 4) }, { pts: polar(t => 3 * Math.sqrt(Math.max(0, Math.cos(2 * t))), 3 * Math.PI / 4, 5 * Math.PI / 4) }], note: 'a figure of eight', alt: 'Two loops meeting at the pole, shaped like an eight on its side.' },

  /* ------------------------------------------------- 8. data on the plane */
  'scatter plot': { ...P, scatter: CLOUD, alt: 'Measured pairs plotted as a cloud of dots.' },
  'bivariate data': { ...P, scatter: CLOUD, note: 'two numbers per case', alt: 'Data where each case carries two measurements.' },
  'explanatory variable': { ...P, scatter: CLOUD, axisHi: 'x', note: 'the one you set', alt: 'The measurement plotted across, thought of as the cause.' },
  'response variable': { ...P, scatter: CLOUD, axisHi: 'y', note: 'the one you watch', alt: 'The measurement plotted up, thought of as the effect.' },
  'trend': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, dash: true, c2: '#e0813a' }], alt: 'The general direction a cloud of points leans.' },
  'positive correlation': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, c2: '#e0813a' }], note: 'both rise together', alt: 'A cloud leaning upward from left to right.' },
  'negative correlation': { ...P, scatter: FALL, lines: [{ m: -0.6, c: 0, c2: '#e0813a' }], note: 'one rises, one falls', alt: 'A cloud leaning downward from left to right.' },
  'no correlation': { ...P, scatter: FLAT, note: 'no lean at all', alt: 'A shapeless cloud with no direction.' },
  'correlation coefficient': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, c2: '#e0813a' }], note: 'r near 1 means tight', alt: 'A number measuring how closely a cloud hugs a straight line.' },
  'causation against correlation': { ...P, scatter: CLOUD, text: [[0, -3.4, 'leaning together is not causing', '#9c3f3c']], alt: 'A cloud with a clear trend, and a warning that a trend explains nothing by itself.' },
  'line of best fit': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, c2: '#e0813a' }], alt: 'A straight line drawn to pass as close as possible to every point.' },
  'least squares': { ...P, scatter: CLOUD.slice(0, 7), lines: [{ m: 0.6, c: 0, c2: '#e0813a' }], segs: CLOUD.slice(0, 7).map(([x, y]) => [x, y, x, 0.6 * x, '#5d6b7d', true, 1.2]), note: 'these gaps, squared, made small', alt: 'The vertical gaps from each point to the line, which the method makes as small as possible.' },
  'regression line': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, c2: '#e0813a' }], note: 'y = 0.6x', alt: 'The fitted line together with its equation.' },
  'residual': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, c2: faint }], segs: [[1.8, 1.08, 1.8, 1.6, '#c0504d', false, 3]], pts: [[1.8, 1.6, '', '#c0504d']], note: 'observed minus predicted', alt: 'The vertical distance from one point to the fitted line.' },
  'residual plot': { ...P, y0: -3, y1: 3, scatter: CLOUD.map(([x, y]) => [x, y - 0.6 * x]), lines: [{ y: 0, c2: '#e0813a' }], note: 'no pattern left is good', alt: 'The residuals plotted alone, to check nothing systematic remains.' },
  'interpolation': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, c2: faint }], bands: [[-3.6, -4.5, 3.6, 4.5]], pts: [[1, 0.6, 'inside', '#12897c']], note: 'between the data', alt: 'Reading a prediction from inside the range the data covers.' },
  'extrapolation': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, c2: faint }], pts: [[4.6, 2.76, 'outside', '#c0504d']], note: 'beyond the data', alt: 'Reading a prediction from beyond where any measurement was taken.' },
  'outlier': { ...P, scatter: CLOUD, pts: [[-2, 3.4, 'outlier', '#c0504d']], lines: [{ m: 0.6, c: 0, c2: faint }], alt: 'A point lying far from the pattern the rest follow.' },
  'influential point': { ...P, scatter: CLOUD, pts: [[4.6, -3, '', '#c0504d']], lines: [{ m: 0.6, c: 0, c2: faint }, { m: 0.28, c: -0.3, c2: '#c0504d' }], note: 'one point drags the line', alt: 'A single point far out that changes the fitted line noticeably.' },
  'linear model': { ...P, scatter: CLOUD, curves: [{ f: x => 0.6 * x, c2: '#e0813a' }], alt: 'A straight-line rule fitted to data.' },
  'exponential model': { ...P, x0: -0.5, x1: 5, y0: -0.5, y1: 9, scatter: [[0.5, 1.2], [1, 1.6], [1.5, 2.2], [2, 3.1], [2.5, 4.1], [3, 5.6], [3.5, 7.4]], curves: [{ f: x => Math.pow(1.6, x), c2: '#e0813a' }], alt: 'Data curving upward ever more steeply, fitted by a multiplying rule.' },
  'power model': { ...P, x0: -0.5, x1: 5, y0: -0.5, y1: 9, scatter: [[0.5, 0.4], [1, 1], [1.5, 1.9], [2, 3.2], [2.5, 4.7], [3, 6.6], [3.5, 8.6]], curves: [{ f: x => Math.pow(x, 1.6), c2: '#e0813a' }], alt: 'Data fitted by a rule raising the input to a fixed power.' },
  'logistic model': { ...P, x0: -0.5, x1: 9, y0: -0.5, y1: 5, scatter: [[0.5, 0.4], [1.5, 0.8], [2.5, 1.6], [3.5, 2.6], [4.5, 3.4], [5.5, 3.9], [7, 4.2]], curves: [{ f: x => 4.4 / (1 + Math.exp(-(x - 3.4))), c2: '#e0813a' }], note: 'growth that levels off', alt: 'An S-shaped curve rising then flattening toward a ceiling.' },
  'curve fitting': { ...P, scatter: CLOUD, curves: [{ f: x => 0.6 * x, c2: faint }, { f: x => 0.1 * sq(x) + 0.5 * x - 0.4, c2: '#e0813a' }], note: 'which shape suits?', alt: 'The same data with two candidate rules drawn through it.' },
  'goodness of fit': { ...P, scatter: CLOUD, lines: [{ m: 0.6, c: 0, c2: '#e0813a' }], segs: CLOUD.map(([x, y]) => [x, y, x, 0.6 * x, '#5d6b7d', true, 1]), note: 'how much is left over', alt: 'Every gap between a point and the fitted line, taken together as a measure.' },
  'time series': { ...P, x0: -0.5, x1: 9, y0: -0.5, y1: 5, paths: [{ pts: [[0, 1], [1, 1.6], [2, 1.3], [3, 2.2], [4, 2], [5, 3], [6, 2.7], [7, 3.6], [8, 3.3]], c2: '#12897c' }], scatter: [[0, 1], [1, 1.6], [2, 1.3], [3, 2.2], [4, 2], [5, 3], [6, 2.7], [7, 3.6], [8, 3.3]], note: 'measured in order', alt: 'Measurements taken one after another, joined in order.' },
  'histogram': { ...P, x0: -0.5, x1: 7, y0: -0.5, y1: 6, bars: [[0, 1, 1], [1, 2, 3], [2, 3, 5], [3, 4, 4], [4, 5, 2], [5, 6, 1]], alt: 'Bars whose heights count how many values fall in each band.' },
  'frequency (of a value)': { ...P, x0: -0.5, x1: 7, y0: -0.5, y1: 6, bars: [[0, 1, 1], [1, 2, 3], [2, 3, 5], [3, 4, 4], [4, 5, 2], [5, 6, 1]], axisHi: 'y', note: 'how many, not how much', alt: 'The height of a bar, counting cases rather than measuring them.' },
  'cumulative frequency': { ...P, x0: -0.5, x1: 7, y0: -0.5, y1: 18, paths: [{ pts: [[0, 0], [1, 1], [2, 4], [3, 9], [4, 13], [5, 15], [6, 16]] }], scatter: [[1, 1], [2, 4], [3, 9], [4, 13], [5, 15], [6, 16]], note: 'a running total', alt: 'A rising curve totalling the counts so far.' },
  'box plot': { ...P, x0: -0.5, x1: 10, y0: -2.5, y1: 2.5, bands: [[3, -1, 7, 1]], segs: [[1, 0, 3, 0, '#5d6b7d', false, 1.6], [7, 0, 9, 0, '#5d6b7d', false, 1.6], [1, -0.6, 1, 0.6, '#5d6b7d', false, 1.6], [9, -0.6, 9, 0.6, '#5d6b7d', false, 1.6], [5, -1, 5, 1, '#e0813a', false, 3]], alt: 'A box from the lower to the upper quartile, split at the median, with whiskers to the extremes.' },
  'quartile': { ...P, x0: -0.5, x1: 10, y0: -2.5, y1: 2.5, bands: [[3, -1, 7, 1]], segs: [[3, -1.6, 3, 1.6, '#e0813a', false, 2.4], [7, -1.6, 7, 1.6, '#e0813a', false, 2.4]], note: 'a quarter each side', alt: 'The two values cutting off the bottom and top quarters of the data.' },
  'median': { ...P, x0: -0.5, x1: 10, y0: -2.5, y1: 2.5, bands: [[3, -1, 7, 1]], segs: [[5, -1.6, 5, 1.6, '#e0813a', false, 3]], note: 'half above, half below', alt: 'The middle value, with as many cases either side.' },
  'mean': { ...P, x0: -0.5, x1: 10, y0: -2.5, y1: 2.5, scatter: [[1, 0], [2, 0], [3, 0], [5, 0], [9, 0]], segs: [[4, -1.4, 4, 1.4, '#e0813a', false, 3]], note: 'the balance point', alt: 'The value the data would balance on, pulled by the far point.' },
  'standard deviation': { ...P, x0: -4.5, x1: 4.5, y0: -0.5, y1: 2.2, curves: [{ f: x => 1.8 * Math.exp(-sq(x) / 2) }], segs: [[-1, 0, -1, 1.09, '#e0813a', true, 1.6], [1, 0, 1, 1.09, '#e0813a', true, 1.6]], note: 'the usual distance from the middle', alt: 'A bell curve with the marks one typical distance either side of the centre.' },
  'normal curve': { ...P, x0: -4.5, x1: 4.5, y0: -0.5, y1: 2.2, curves: [{ f: x => 1.8 * Math.exp(-sq(x) / 2) }], alt: 'The symmetric bell shape many measurements fall into.' },
  'area as probability': { ...P, x0: -4.5, x1: 4.5, y0: -0.5, y1: 2.2, curves: [{ f: x => 1.8 * Math.exp(-sq(x) / 2) }], paths: [{ pts: [[-1, 0], ...path(t => t, t => 1.8 * Math.exp(-sq(t) / 2), -1, 1, 60), [1, 0]], close: true, fill: '#cfe6e1', c2: 'none' }], note: 'the chance is the area', alt: 'A shaded strip under a bell curve, whose area is the probability of landing there.' },
  'z-score': { ...P, x0: -4.5, x1: 4.5, y0: -0.5, y1: 2.2, curves: [{ f: x => 1.8 * Math.exp(-sq(x) / 2) }], segs: [[1.5, 0, 1.5, 0.6, '#e0813a', false, 2.4]], text: [[1.5, -0.35, 'z = 1.5', '#a25d2a']], note: 'how many deviations out', alt: 'A value marked by how many typical distances it sits from the mean.' },
  'probability density': { ...P, x0: -4.5, x1: 4.5, y0: -0.5, y1: 2.2, curves: [{ f: x => 1.8 * Math.exp(-sq(x) / 2) }], axisHi: 'y', note: 'height is density, not chance', alt: 'A curve whose height gives density, so only areas under it are probabilities.' },
  'cumulative distribution': { ...P, x0: -4.5, x1: 4.5, y0: -0.5, y1: 2.4, curves: [{ f: x => 2 / (1 + Math.exp(-1.7 * x)) }], lines: [{ y: 2, dash: true, c2: faint }], note: 'the running total of chance', alt: 'An S-shaped curve rising from nothing to certainty.' },
  'sampling': { ...P, scatter: CLOUD.map(([x, y]) => [x, y]), pts: [[-3, -1.6, '', '#e0813a'], [-0.6, 0.2, '', '#e0813a'], [1.8, 1.6, '', '#e0813a'], [3.6, 1.9, '', '#e0813a']], note: 'a few chosen from many', alt: 'A few points picked out of a larger cloud.' },
  'sample size': { ...P, scatter: CLOUD.slice(0, 4), lines: [{ m: 0.75, c: 0.3, c2: '#c0504d', dash: true }, { m: 0.6, c: 0, c2: faint }], note: 'few points, unstable line', alt: 'A line fitted to only four points, sitting noticeably away from the line the full data gives.' }
};
