/**
 * Media manifest — maps card numbers to Manim videos and interactive diagrams.
 * Videos are from manim_anims/; diagrams use ChalkDiagram specs.
 */

// ── Manim video mapping ─────────────────────────────────────
// Card number → video URL
export const CARD_VIDEOS = {
  45: '/videos/cg08_theatre_seats.gif',     // One line can't hold everything (theatre seats)
  52: '/videos/cg15_distance_pythagoras.gif', // Distance formula (Pythagoras)
  54: '/videos/cg17_rectangle_proof.gif',   // Shapes from points (rectangle proof)
  57: '/videos/cg18_steepness_sweep.gif',   // Steepness (slope visualization)
  60: '/videos/cg21_gradient_sign.gif',     // Positive vs negative gradient
};

// ── Interactive diagram specs ───────────────────────────────
// Card number → ChalkDiagram spec
export const CARD_DIAGRAMS = {
  // Tier 0: The plane itself
  38: { type: 'numberline' },                                            // Number line
  39: { type: 'numberline', points: [{ x: 0, label: '0' }] },           // Zero
  40: { type: 'numberline', points: [{ x: -3, label: '-3', color: 'green' }, { x: 3, label: '3', color: 'yellow' }] },  // Positive/negative
  41: { type: 'numberline', points: [{ x: 1, label: '1' }, { x: 1.5, label: '1.5', color: 'green' }, { x: 2, label: '2' }] },  // Fractions
  42: { type: 'numberline', points: [{ x: -8, label: '-8' }, { x: -3, label: '-3', color: 'yellow' }] },  // Comparing
  43: { type: 'numberline', points: [{ x: 2, label: '2' }, { x: 9, label: '9' }], highlight: [2, 9] },     // Distance
  44: { type: 'numberline', points: [{ x: 2, label: '2' }, { x: 9, label: '9' }, { x: 5.5, label: '5.5', color: 'green' }] },  // Midpoint
  46: { type: 'points', pts: [] },                                       // Axes
  47: { type: 'points', pts: [{ x: 0, y: 0, label: 'origin' }] },      // Origin
  48: { type: 'points', pts: [{ x: 3, y: 4, label: '(3,4)' }] },       // Plotting
  50: { type: 'points', pts: [{ x: 3, y: 3, label: 'I' }, { x: -3, y: 3, label: 'II' }, { x: -3, y: -3, label: 'III' }, { x: 3, y: -3, label: 'IV' }] },  // Quadrants
  52: { type: 'points', pts: [{ x: 1, y: 1, label: 'A' }, { x: 5, y: 4, label: 'B' }], connect: true },   // Distance
  53: { type: 'points', pts: [{ x: 1, y: 1, label: 'A' }, { x: 5, y: 4, label: 'B' }, { x: 3, y: 2.5, label: 'M', color: 'green' }] },  // Midpoint

  // Tier 1: Lines
  57: { type: 'line', m: 0.5, c: 2 },                                  // Steepness
  58: { type: 'line', p1: [0, 0], p2: [4, 3] },                        // Delta y/x
  59: { type: 'line', m: 0.75, c: 0 },                                  // Gradient
  60: { type: 'line', m: -1.5, c: 0, color: 'green' },                 // Positive/negative
  61: { type: 'line', m: 0, c: 2 },                                     // Zero gradient
  62: { type: 'line', p1: [2, -6], p2: [2, 6] },                       // Undefined gradient
  63: { type: 'line', m: 1, c: 2 },                                     // y = mx + c
  64: { type: 'line', m: 2, c: -1 },                                    // m and c roles
  65: { type: 'line', p1: [-2, -3], p2: [3, 5] },                      // Equation from 2 points
  66: { type: 'curve', fn: '1*x+1', fn2: '1*x-2', domain: [-6, 6] },   // Parallel lines
  67: { type: 'curve', fn: '2*x', fn2: '-0.5*x', domain: [-4, 4] },    // Perpendicular
  68: { type: 'line', m: 1, c: -3 },                                    // x-intercept
  69: { type: 'line', m: 0.5, c: 2 },                                   // y-intercept
  70: { type: 'curve', fn: 'x+1', fn2: '-x+5', domain: [-2, 6] },      // Simultaneous

  // Curves (cards 30-32)
  30: { type: 'curve', fn: 'x*x', domain: [-4, 4] },                   // y = x² parabola
  31: { type: 'line', m: 2, c: 1 },                                     // y = 2x + 1
  32: { type: 'curve', fn: 'x*x', fn2: '2*x+1', domain: [-3, 3] },     // Tangent/kissing curves
};

/**
 * Get the video URL for a card, or null.
 */
export function getVideoForCard(cardNum) {
  return CARD_VIDEOS[cardNum] || null;
}

/**
 * Get the diagram spec for a card, or null.
 */
export function getDiagramForCard(cardNum) {
  return CARD_DIAGRAMS[cardNum] || null;
}
