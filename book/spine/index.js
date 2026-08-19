// The coordinate spine: every concept a mathematics course can reach if the
// plane is taken as the organising object, ordered from the origin outward.
//
// This is the inventory behind the Kleinian claim — that all of school and
// early university mathematics can be hung on the function and its graph. It
// is deliberately a flat list of names, not a syllabus: sequencing, gating and
// assessment are separate decisions that need this to exist first.
//
// Stage 12 is the honest one. A course built entirely on pictures has to say
// where pictures stop working, and those terms are the vocabulary for saying it.

export const meta = {
  title: 'The Coordinate Spine',
  standfirst: 'Every concept reachable from the origin, if the plane is the organising object.',
  note: 'Ordered from the most primitive idea outward. Counts are computed from the list itself.'
};

export const stages = [
  {
    n: 1, title: 'The plane itself',
    can: 'Name a position, and say what the two numbers mean.',
    terms: ['point', 'position', 'location', 'number line', 'one dimension', 'two dimensions',
      'origin', 'axis', 'x-axis', 'y-axis', 'axes', 'coordinate plane', 'Cartesian plane',
      'ordered pair', 'coordinate', 'x-coordinate', 'y-coordinate', 'abscissa', 'ordinate',
      'plotting a point', 'reading a point', 'quadrant', 'first quadrant', 'second quadrant',
      'third quadrant', 'fourth quadrant', 'sign of a coordinate', 'positive direction',
      'negative direction', 'gridline', 'lattice point', 'tick mark', 'scale', 'unit',
      'equal scaling', 'distorted scaling', 'axis label', 'the point (0, 0)',
      'distance from an axis', 'above and below', 'left and right', 'reference frame',
      'convention (input first)', 'the pair (3, 1) against (1, 3)']
  },
  {
    n: 2, title: 'Straight lines and segments',
    can: 'Measure a line: how long, how steep, where it crosses.',
    terms: ['straight line', 'line segment', 'ray', 'endpoint', 'interior point', 'betweenness',
      'length of a segment', 'distance formula', 'Pythagoras in the plane', 'midpoint',
      'midpoint formula', 'section formula', 'internal division', 'external division',
      'ratio along a segment', 'collinear points', 'horizontal line', 'vertical line',
      'oblique line', 'slope', 'gradient', 'rise', 'run', 'rise over run', 'steepness',
      'positive slope', 'negative slope', 'zero slope', 'undefined slope', 'angle of inclination',
      'parallel lines', 'perpendicular lines', 'negative reciprocal', 'x-intercept', 'y-intercept',
      'equation of a line', 'linear equation', 'slope-intercept form', 'point-slope form',
      'two-point form', 'standard form', 'general form', 'intercept form',
      'distance from a point to a line', 'foot of the perpendicular', 'angle between two lines',
      'perpendicular bisector', 'locus of equidistant points', 'direction of travel',
      'a line as a set of points']
  },
  {
    n: 3, title: 'Regions, shapes and systems',
    can: 'Turn a picture of a region into arithmetic, and back.',
    terms: ['polygon', 'vertex', 'side', 'triangle', 'right triangle', 'isosceles triangle',
      'equilateral triangle', 'quadrilateral', 'rectangle', 'square', 'parallelogram', 'rhombus',
      'trapezium', 'perimeter', 'area of a triangle', 'shoelace formula', 'determinant form',
      'area of a polygon', 'region', 'half-plane', 'inequality', 'linear inequality',
      'strict inequality', 'boundary line', 'shaded region', 'feasible region', 'convex region',
      'bounded region', 'unbounded region', 'intersection of two lines', 'point of intersection',
      'simultaneous equations', 'system of equations', 'unique solution', 'no solution',
      'infinitely many solutions', 'consistent system', 'inconsistent system', 'dependent equations',
      'graphical solution', 'substitution method', 'elimination method', 'linear programming',
      'objective function', 'corner point', 'concurrency', 'medians', 'centroid', 'circumcentre',
      'incentre', 'orthocentre', 'Euler line']
  },
  {
    n: 4, title: 'The function idea',
    can: 'Say what a rule promises, and test whether a picture keeps it.',
    terms: ['relation', 'function', 'rule', 'input', 'output', 'domain', 'range', 'codomain',
      'image', 'preimage', 'mapping', 'arrow diagram', 'set of ordered pairs', 'well-defined',
      'one input one output', 'the fork', 'vertical line test', 'horizontal line test',
      'one-to-one', 'injective', 'many-to-one', 'onto', 'surjective', 'bijective',
      'function notation', 'f(x)', 'evaluating', 'solving for the input',
      'independent variable', 'dependent variable', 'argument', 'value of a function', 'substituting into a rule',
      'table of values', 'graph of a function', 'four representations', 'natural domain',
      'implied domain', 'contextual domain', 'restricted domain', 'excluded value',
      'division by zero', 'even root of a negative', 'interval notation', 'open interval',
      'closed interval', 'half-open interval', 'union of intervals', 'unbounded interval',
      'set-builder notation']
  },
  {
    n: 5, title: 'Families of curves',
    can: 'Recognise a shape from its rule, and a rule from its shape.',
    terms: ['constant function', 'identity function', 'linear function', 'affine function',
      'quadratic function', 'parabola', 'vertex of a parabola', 'axis of symmetry',
      'completing the square', 'vertex form', 'factored form', 'root', 'zero of a function',
      'discriminant', 'repeated root', 'cubic function', 'quartic function', 'polynomial',
      'degree', 'leading coefficient', 'end behaviour', 'turning point', 'local maximum',
      'local minimum', 'global maximum', 'global minimum', 'rational function', 'asymptote',
      'vertical asymptote', 'horizontal asymptote', 'oblique asymptote', 'hole in a graph',
      'reciprocal function', 'hyperbola (rectangular)', 'square root function', 'radical function',
      'cube root function', 'absolute value function', 'piecewise function', 'step function',
      'floor function', 'ceiling function', 'signum function', 'exponential function', 'base',
      'exponential growth', 'exponential decay', 'doubling time', 'half-life', 'the number e',
      'logarithm', 'logarithmic function', 'natural logarithm', 'common logarithm', 'log laws',
      'sine', 'cosine', 'tangent function', 'amplitude', 'period', 'phase shift', 'frequency (of a wave)',
      'radian measure', 'degree measure', 'unit circle', 'periodicity', 'sinusoid']
  },
  {
    n: 6, title: 'Moving a curve',
    can: 'Predict where a graph goes before drawing it.',
    terms: ['parent function', 'transformation', 'translation', 'horizontal shift',
      'vertical shift', 'inside the bracket', 'outside the bracket', 'shift against the sign',
      'reflection', 'reflection in the x-axis', 'reflection in the y-axis', 'reflection in y = x',
      'stretch', 'compression', 'vertical stretch', 'horizontal stretch', 'scale factor',
      'dilation', 'invariant point', 'order of transformations', 'composition of transformations',
      'even function', 'odd function', 'symmetry about the y-axis', 'symmetry about the origin',
      'rotational symmetry', 'image curve', 'mapping notation', 'transformation matrix',
      'rotation about the origin', 'shear']
  },
  {
    n: 7, title: 'Conics, loci and other coordinates',
    can: 'Describe a curve by the condition its points satisfy.',
    terms: ['locus', 'circle', 'centre', 'radius', 'equation of a circle', 'general form of a circle',
      'diameter', 'chord', 'arc', 'sector', 'segment of a circle', 'tangent to a circle',
      'secant to a circle', 'point of contact', 'conic section', 'ellipse', 'major axis',
      'minor axis', 'focus', 'foci', 'eccentricity', 'directrix', 'parabola as a conic',
      'latus rectum', 'hyperbola', 'transverse axis', 'conjugate axis', 'asymptotes of a hyperbola',
      'degenerate conic', 'parametric equation', 'parameter', 'parametrisation', 'eliminating the parameter',
      'polar coordinates', 'pole', 'polar axis', 'radial coordinate', 'angular coordinate',
      'polar to Cartesian conversion', 'polar curve', 'circle in polar form', 'rose curve',
      'cardioid', 'limaçon', 'Archimedean spiral', 'lemniscate']
  },
  {
    n: 8, title: 'Data on the plane',
    can: 'Fit a curve to measurements, and say how well it fits.',
    terms: ['scatter plot', 'bivariate data', 'explanatory variable', 'response variable',
      'trend', 'positive correlation', 'negative correlation', 'no correlation',
      'correlation coefficient', 'causation against correlation', 'line of best fit',
      'least squares', 'regression line', 'residual', 'residual plot', 'interpolation',
      'extrapolation', 'outlier', 'influential point', 'linear model', 'exponential model',
      'power model', 'logistic model', 'curve fitting', 'goodness of fit', 'time series',
      'histogram', 'frequency (of a value)', 'cumulative frequency', 'box plot', 'quartile', 'median',
      'mean', 'standard deviation', 'normal curve', 'area as probability', 'z-score',
      'probability density', 'cumulative distribution']
  },
  {
    n: 9, title: 'Change, and the bridge to limits',
    can: 'Say which two things were subtracted, and what was divided by what.',
    terms: ['difference', 'delta', 'increment', 'change', 'new minus old', 'signed change',
      'rate', 'per unit', 'rate of change', 'average rate of change', 'secant line',
      'slope of a secant', 'chord of a curve', 'interval', 'width of an interval',
      'difference quotient', 'h notation', 'shrinking the interval', 'instantaneous rate',
      'tangent line', 'slope of a tangent', 'point of tangency', 'approaching a value',
      'neighbourhood', 'arbitrarily close', 'limit', 'left-hand limit', 'right-hand limit',
      'two-sided limit', 'existence of a limit', 'limit against value', 'indeterminate form',
      'zero over zero', 'factor and cancel', 'continuity', 'continuous at a point',
      'continuous on an interval', 'discontinuity', 'removable discontinuity', 'jump discontinuity',
      'infinite discontinuity', 'limit at infinity', 'asymptotic behaviour', 'squeeze theorem',
      'intermediate value theorem', 'extreme value theorem', 'epsilon', 'delta (the tolerance)', 'epsilon-delta definition']
  },
  {
    n: 10, title: 'Derivatives',
    can: 'Measure how fast, at a point, and use it to find the best of something.',
    terms: ['derivative', 'differentiation', 'differentiable', 'derivative at a point',
      'derivative as a function', 'prime notation', 'Leibniz notation', 'dy/dx', 'operator notation',
      'differentiability implies continuity', 'non-differentiable point', 'corner', 'cusp',
      'vertical tangent', 'power rule', 'constant rule', 'constant multiple rule', 'sum rule',
      'difference rule', 'product rule', 'quotient rule', 'chain rule', 'outer and inner function',
      'implicit differentiation', 'logarithmic differentiation', 'derivative of an exponential',
      'derivative of a logarithm', 'derivatives of sine and cosine', 'derivative of an inverse function',
      'second derivative', 'higher derivatives', 'concavity', 'concave up', 'concave down',
      'point of inflection', 'critical point', 'stationary point', 'first derivative test',
      'second derivative test', 'increasing function', 'decreasing function', 'monotonic',
      'local extremum', 'global extremum', 'optimisation', 'constraint', 'related rates',
      'displacement', 'velocity', 'speed', 'acceleration', 'marginal cost', 'elasticity',
      'tangent line approximation', 'linearisation', 'differential', "Newton's method",
      "Rolle's theorem", 'mean value theorem', "L'Hopital's rule", 'Taylor polynomial',
      'Maclaurin series', 'radius of convergence']
  },
  {
    n: 11, title: 'Integrals',
    can: 'Add up a changing quantity, and know why that undoes a derivative.',
    terms: ['antiderivative', 'indefinite integral', 'constant of integration', 'integrand',
      'integral sign', 'variable of integration', 'definite integral', 'limits of integration',
      'area under a curve', 'signed area', 'net area', 'Riemann sum', 'left-hand sum',
      'right-hand sum', 'midpoint sum', 'upper sum', 'lower sum', 'partition', 'subinterval',
      'norm of a partition', 'limit of Riemann sums', 'integrability', 'trapezoidal rule',
      "Simpson's rule", 'numerical integration', 'fundamental theorem of calculus',
      'first fundamental theorem', 'second fundamental theorem', 'accumulation function',
      'net change theorem', 'substitution', 'u-substitution', 'integration by parts',
      'partial fractions', 'trigonometric substitution', 'reduction formula', 'improper integral',
      'convergent integral', 'divergent integral', 'area between two curves', 'volume of revolution',
      'disc method', 'washer method', 'shell method', 'cross-section method', 'arc length',
      'surface of revolution', 'average value of a function', 'centroid of a region', 'moment',
      'work', 'fluid pressure', 'consumer surplus', 'separable differential equation',
      'slope field', 'direction field', 'initial condition', 'particular solution',
      "Euler's method", 'exponential growth model', 'logistic growth model']
  },
  {
    n: 12, title: 'Off the page: vectors and more dimensions',
    can: 'Keep the method when the plane runs out of room.',
    terms: ['three-dimensional space', 'z-axis', 'octant', 'coordinate space', 'right-handed system',
      'vector', 'scalar', 'magnitude', 'direction', 'component', 'position vector', 'unit vector',
      'zero vector', 'vector addition', 'scalar multiplication', 'dot product', 'scalar product',
      'cross product', 'vector product', 'projection', 'angle between vectors', 'orthogonality',
      'linear combination', 'span', 'basis', 'linear independence', 'matrix', 'matrix transformation',
      'eigenvector', 'eigenvalue', 'line in space', 'vector equation of a line',
      'parametric equations in space', 'plane in space', 'normal vector', 'equation of a plane',
      'distance in three dimensions', 'sphere', 'cylinder', 'cone', 'quadric surface', 'surface',
      'level curve', 'contour', 'contour map', 'function of two variables', 'partial derivative',
      'gradient vector', 'directional derivative', 'tangent plane', 'critical point in 3D',
      'saddle point', 'Lagrange multiplier', 'double integral', 'iterated integral',
      'region of integration', 'order of integration', 'Jacobian', 'change of variables',
      'polar substitution', 'cylindrical coordinates', 'spherical coordinates', 'triple integral',
      'vector field', 'divergence', 'curl', 'line integral', 'surface integral', 'flux',
      'conservative field', 'potential function', "Green's theorem", "Stokes' theorem",
      'divergence theorem']
  },
  {
    n: 13, title: 'Where the picture stops working',
    can: 'Say when to stop trusting your eyes, and reach for a proof instead.',
    terms: ['counterexample', 'pathological function', 'Dirichlet function', 'nowhere continuous',
      'Weierstrass function', 'nowhere differentiable', 'everywhere continuous', 'fractal',
      'self-similarity', 'Koch snowflake', 'Cantor set', 'Hausdorff dimension', 'measure',
      'measure zero', 'almost everywhere', 'Riemann integrable', 'Lebesgue integral',
      'non-integrable function', 'elementary function', 'non-elementary antiderivative',
      "Liouville's theorem", 'error function', 'sine integral', 'elliptic integral', 'closed form',
      'algebraic number', 'transcendental number', 'countable set', 'uncountable set',
      'dense set', 'nowhere dense', 'completeness of the reals', 'supremum', 'infimum',
      'bounded sequence', 'convergent sequence', 'divergent sequence', 'pointwise convergence',
      'uniform convergence', 'rigour', 'formal proof', 'intuition against proof',
      'the limits of visualisation', 'higher-dimensional intuition', 'axiom', 'definition',
      'theorem', 'lemma', 'corollary', 'necessary and sufficient', 'existence proof',
      'constructive proof', 'proof by contradiction']
  }
];
