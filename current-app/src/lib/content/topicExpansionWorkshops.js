function S(prompt, opts, correctFeedback, incorrectFeedback) {
  return { type: 'scenario', prompt, options: opts, correctFeedback, incorrectFeedback };
}

function O(id, label, correct) {
  return { id, label, correct };
}

function cloneOption(option) {
  if (Array.isArray(option)) return [...option];
  if (option && typeof option === 'object') return { ...option };
  return option;
}

function cloneMatrixChoice(choice) {
  if (Array.isArray(choice)) return [...choice];
  if (choice && typeof choice === 'object') {
    return {
      ...choice,
      matrix: choice.matrix?.map((row) => [...row])
    };
  }
  return choice;
}

function cloneInteractions(interactions) {
  return interactions.map((interaction) => ({
    ...interaction,
    boxes: interaction.boxes?.map((box) => ({ ...box })),
    items: interaction.items?.map((item) => ({ ...item })),
    options: interaction.options?.map(cloneOption),
    choices: interaction.choices?.map(cloneMatrixChoice),
    matrices: interaction.matrices?.map(cloneMatrixChoice),
    target: Array.isArray(interaction.target) ? [...interaction.target] : interaction.target,
    labels: interaction.labels ? [...interaction.labels] : interaction.labels,
    matrix: interaction.matrix?.map((row) => [...row]),
    matrixA: interaction.matrixA?.map((row) => [...row]),
    matrixB: interaction.matrixB?.map((row) => [...row]),
    inputPoint: interaction.inputPoint ? [...interaction.inputPoint] : interaction.inputPoint
  }));
}

const TRIGONOMETRY_WORKSHOP = [
  S('The unit circle point is at angle theta. Which coordinate is cosine?',
    [O('x', 'The x-coordinate', true), O('y', 'The y-coordinate', false), O('radius', 'The radius length', false)],
    'Correct. On the unit circle, x = cos theta and y = sin theta.',
    'Not quite. Cosine is the horizontal coordinate; sine is the vertical coordinate.'),
  S('At 90 degrees on the unit circle, the point is at the top. What are cos 90 and sin 90?',
    [O('zeroone', 'cos 90 = 0, sin 90 = 1', true), O('onezero', 'cos 90 = 1, sin 90 = 0', false), O('bothone', 'both are 1', false)],
    'Yes. The top point is (0, 1), so cosine is 0 and sine is 1.',
    'Read the point as (cos theta, sin theta). The top of the circle is (0, 1).'),
  { type: 'sorting', boxes: [
    { id: 'sin', label: 'Sine facts' },
    { id: 'cos', label: 'Cosine facts' }
  ], items: [
    { id: 'height', label: 'Vertical coordinate', box: 'sin' },
    { id: 'width', label: 'Horizontal coordinate', box: 'cos' },
    { id: 'starts0', label: 'Starts at 0 on the graph', box: 'sin' },
    { id: 'starts1', label: 'Starts at 1 on the graph', box: 'cos' }
  ]},
  {
    type: 'matrixlab',
    mode: 'fill',
    prompt: 'Use the exact-value pattern. What is sin 60 degrees?',
    matrix: [['theta', '0', '30', '45', '60', '90'], ['sin', '0', '1/2', 'r2/2', null, '1']],
    blankRow: 2,
    blankCol: 5,
    options: ['r3/2', 'r2/2', '1/2', 'r3/3'],
    correctValue: 'r3/2',
    correctFeedback: 'Correct. The sine row climbs through 0, 1/2, r2/2, r3/2, 1.',
    incorrectFeedback: 'The sine row climbs as the angle rises. At 60 degrees, it is r3/2.'
  },
  {
    type: 'matrixlab',
    mode: 'fill',
    prompt: 'Cosine is the sine row reversed. What is cos 30 degrees?',
    matrix: [['theta', '0', '30', '45', '60', '90'], ['cos', '1', null, 'r2/2', '1/2', '0']],
    blankRow: 2,
    blankCol: 3,
    options: ['r3/2', 'r2/2', '1/2', '1'],
    correctValue: 'r3/2',
    correctFeedback: 'Correct. cos 30 equals r3/2, matching sin 60.',
    incorrectFeedback: 'Reverse the sine row: 1, r3/2, r2/2, 1/2, 0.'
  },
  S('A line makes a 45 degree angle with the horizontal. What is its tangent?',
    [O('one', '1', true), O('zero', '0', false), O('undefined', 'undefined', false)],
    'Correct. tan 45 = 1, so the slope is one up for one across.',
    'Tangent measures slope. At 45 degrees, rise and run match, so tan is 1.'),
  {
    type: 'wavetuner',
    prompt: 'Make a sine wave with medium height and tight crowding.',
    targetAmplitude: 3,
    targetFrequency: 4,
    correctFeedback: 'Locked. Amplitude controls height; frequency controls how crowded the cycle is.',
    incorrectFeedback: 'Match both controls: height 3 and crowding 4.'
  },
  S('A sine wave has amplitude 4. What does that 4 measure?',
    [O('height', 'Distance from the middle line to a peak', true), O('period', 'Time for one full repeat', false), O('phase', 'Horizontal starting shift', false)],
    'Exactly. Amplitude is the vertical reach from the middle line.',
    'Amplitude is height from the middle line, not the length of the cycle.'),
  {
    type: 'wavetuner',
    prompt: 'Now match a wide, calmer wave: high amplitude, low frequency.',
    targetAmplitude: 5,
    targetFrequency: 2,
    correctFeedback: 'Good. It rises high, but the cycles are spread out.',
    incorrectFeedback: 'Set the height high and the crowding low.'
  },
  S('Radians are preferred in calculus because they are:',
    [O('ratio', 'A pure circle-based ratio', true), O('calendar', 'A calendar unit from old astronomy', false), O('percent', 'A percent of a triangle', false)],
    'Right. Radians come from arc length divided by radius.',
    'Radians are built from the circle itself: arc length compared with radius.'),
  S('A full turn around a circle is:',
    [O('twopi', '2pi radians', true), O('pi', 'pi radians', false), O('one', '1 radian', false)],
    'Correct. One full revolution is 2pi radians.',
    'Half a turn is pi radians. A full turn is twice that: 2pi.'),
  S('A learner can switch between circle coordinates, wave graphs, and right-triangle ratios. What has clicked?',
    [O('unified', 'They see trigonometry as one connected system', true), O('memorised', 'They only memorised one table row', false)],
    'Exactly. The goal is not a pile of facts; it is one connected language of turning and waves.',
    'The deeper win is seeing the triangle, circle, and wave as linked versions of the same idea.')
];

const DIFFERENTIATION_WORKSHOP = [
  S('A curve has a different steepness at different places. Differentiation asks for:',
    [O('local', 'The slope at one point', true), O('average', 'Only the average height of the whole graph', false), O('area', 'The area under the graph', false)],
    'Correct. Differentiation finds the local slope, not just a broad average.',
    'Not quite. The derivative is about the slope at a point.'),
  S('For y = x², the slope at x = 3 is 6. Which rule predicts that?',
    [O('power', 'The derivative is 2x', true), O('square', 'The derivative is always x²', false), O('zero', 'The derivative is always zero', false)],
    'Yes. d(x²)/dx = 2x, and 2 times 3 is 6.',
    'Use the power rule. x² becomes 2x.'),
  {
    type: 'matrixlab',
    mode: 'fill',
    prompt: 'Power rule console: d(x⁴)/dx = ?',
    matrix: [['input', 'x²', 'x³', 'x⁴'], ['derivative', '2x', '3x²', null]],
    blankRow: 2,
    blankCol: 4,
    options: ['4x³', 'x³', '4x⁴', '3x⁴'],
    correctValue: '4x³',
    correctFeedback: 'Correct. Bring the 4 down, then reduce the power to 3.',
    incorrectFeedback: 'Power rule: n comes down, then the exponent drops by one.'
  },
  S('What is the derivative of a constant like 9?',
    [O('zero', '0', true), O('nine', '9', false), O('one', '1', false)],
    'Correct. A constant has no slope because it does not change.',
    'A flat constant line has slope zero.'),
  S('A product such as u(x)v(x) is changing because:',
    [O('both', 'Both factors can change and both contributions matter', true), O('onlyfirst', 'Only the first factor can change', false), O('neither', 'Products are always constant', false)],
    'Exactly. The product rule keeps both changing contributions.',
    'A product can change from either factor, so both terms matter.'),
  S('Which expression matches the product rule?',
    [O('uv', 'u prime v plus u v prime', true), O('short', 'u prime v prime only', false), O('minus', 'u prime v minus u v prime', false)],
    'Right. The derivative of uv is u prime v plus u v prime.',
    'The product rule is not just the product of the derivatives.'),
  S('A function is built in layers: y = (3x² + 5)⁷. Which rule handles the layers?',
    [O('chain', 'Chain rule', true), O('constant', 'Constant rule', false), O('identity', 'Identity matrix rule', false)],
    'Correct. The chain rule handles outside and inside changes together.',
    'Layered functions need the chain rule.'),
  {
    type: 'matrixlab',
    mode: 'fill',
    prompt: 'Chain rule checkpoint: derivative of (3x² + 5)⁷ includes which inside derivative?',
    matrix: [['inside', '3x² + 5'], ['inside derivative', null]],
    blankRow: 2,
    blankCol: 2,
    options: ['6x', '7x⁶', '3x', '0'],
    correctValue: '6x',
    correctFeedback: 'Correct. Differentiate the inside separately: 3x² + 5 becomes 6x.',
    incorrectFeedback: 'The inside is 3x² + 5. Its derivative is 6x.'
  },
  {
    type: 'unitcheck',
    prompt: 'If position is measured in meters and time in seconds, what unit should velocity have?',
    expression: 'd(position) / d(time)',
    target: 'Velocity is rate of change of position.',
    options: [
      { id: 'ms', label: 'm/s', note: 'meters per second' },
      { id: 'm2', label: 'm²', note: 'area' },
      { id: 's', label: 's', note: 'time only' }
    ],
    correctOption: 'ms',
    correctFeedback: 'Yes. A derivative of position with respect to time gives meters per second.',
    incorrectFeedback: 'Rate means change divided by time, so meters over seconds.'
  },
  {
    type: 'unitcheck',
    prompt: 'If velocity is m/s, what unit should acceleration have?',
    expression: 'd(velocity) / d(time)',
    target: 'Acceleration is rate of change of velocity.',
    options: [
      { id: 'ms2', label: 'm/s²', note: 'meters per second squared' },
      { id: 'ms', label: 'm/s', note: 'velocity' },
      { id: 'm', label: 'm', note: 'position' }
    ],
    correctOption: 'ms2',
    correctFeedback: 'Correct. Dividing velocity by another second gives m/s².',
    incorrectFeedback: 'Velocity already has one second in the denominator. Differentiating over time adds another.'
  },
  S('At the top of a smooth hill on a graph, the derivative is usually:',
    [O('zero', '0', true), O('infinite', 'infinite', false), O('negativeonly', 'always negative', false)],
    'Correct. At a smooth peak, the tangent is flat for an instant.',
    'A smooth maximum has a flat tangent, so the derivative is zero there.'),
  S('Why does differentiation matter beyond school graphs?',
    [O('rates', 'It measures changing quantities: speed, acceleration, cost, loss, and growth', true), O('fonts', 'It chooses better fonts for equations', false)],
    'Exactly. Derivatives are the language of rates and optimisation.',
    'The derivative is useful because it measures how fast something changes.')
];

const OPTICS_WORKSHOP = [
  S('The ray model is useful when light is being traced through:',
    [O('large', 'Objects much larger than the light wavelength', true), O('atom', 'Only single atoms', false), O('sound', 'Sound waves in air', false)],
    'Correct. Mirrors, lenses, and screens are usually large enough for ray tracing to work.',
    'The ray model works best when the objects are much larger than visible-light wavelengths.'),
  { type: 'sorting', boxes: [
    { id: 'ray', label: 'Ray model' },
    { id: 'wave', label: 'Wave model needed' }
  ], items: [
    { id: 'mirror', label: 'Tracing a mirror reflection', box: 'ray' },
    { id: 'lens', label: 'Finding a lens focus', box: 'ray' },
    { id: 'tinygap', label: 'Diffraction through a tiny slit', box: 'wave' },
    { id: 'interference', label: 'Interference pattern', box: 'wave' }
  ]},
  S('A mirror ray arrives at 35 degrees from the normal. What is the reflection angle?',
    [O('35', '35 degrees', true), O('55', '55 degrees', false), O('70', '70 degrees', false)],
    'Correct. Reflection angle equals incidence angle, measured from the normal.',
    'Measure both angles from the normal. The outgoing angle matches the incoming one.'),
  S('A rough wall does not act like a mirror because:',
    [O('normals', 'Its tiny surface normals point in many directions', true), O('nolaw', 'The law of reflection stops working', false), O('dark', 'Light refuses to touch it', false)],
    'Exactly. Each tiny patch reflects by the rule, but the patches face different ways.',
    'The law still works locally. The rough surface scatters light because its micro-surfaces vary.'),
  S('A plane mirror image is virtual because:',
    [O('behind', 'The rays only appear to come from behind the mirror', true), O('fake', 'No one can see it', false), O('smaller', 'It is always much smaller', false)],
    'Correct. The eye traces reflected rays backward and sees an apparent source.',
    'A virtual image can be seen, but the rays do not actually meet behind the mirror.'),
  { type: 'sorting', boxes: [
    { id: 'reflection', label: 'Reflection' },
    { id: 'refraction', label: 'Refraction' }
  ], items: [
    { id: 'bounce', label: 'Ray bounces off a mirror', box: 'reflection' },
    { id: 'bend', label: 'Ray bends entering glass', box: 'refraction' },
    { id: 'pool', label: 'Pool looks shallower', box: 'refraction' },
    { id: 'periscope', label: 'Periscope uses mirrors', box: 'reflection' }
  ]},
  S('Light enters glass from air at an angle. Glass has a higher refractive index. Which way does the ray bend?',
    [O('toward', 'Toward the normal', true), O('away', 'Away from the normal', false), O('none', 'It must continue straight', false)],
    'Correct. Entering a slower, higher-index medium bends the ray toward the normal.',
    'Higher refractive index means lower speed, so the ray bends toward the normal.'),
  S('Light goes from water into air at a steep angle. If Snell law would require sin theta bigger than 1, what happens?',
    [O('tir', 'Total internal reflection', true), O('freeze', 'The light freezes at the boundary', false), O('double', 'The ray splits into two equal copies', false)],
    'Exactly. There is no refracted angle available, so the light reflects internally.',
    'When Snell law asks for an impossible sine value, total internal reflection occurs.'),
  {
    type: 'unitcheck',
    prompt: 'Snell law checkpoint. Which expression is the correct relationship?',
    expression: 'boundary: medium 1 -> medium 2',
    target: 'Angles are measured from the normal.',
    options: [
      { id: 'snell', label: 'n1 sin theta1 = n2 sin theta2', note: 'Snell law' },
      { id: 'sum', label: 'n1 + theta1 = n2 + theta2', note: 'not a refraction law' },
      { id: 'same', label: 'theta1 always equals theta2', note: 'reflection, not refraction' }
    ],
    correctOption: 'snell',
    correctFeedback: 'Correct. Snell law uses refractive index multiplied by sine of the angle.',
    incorrectFeedback: 'Reflection uses equal angles. Refraction uses n1 sin theta1 = n2 sin theta2.'
  },
  S('A converging lens is usually:',
    [O('middle', 'Thicker in the middle and able to bring rays together', true), O('edge', 'Thinner in the middle and always spreading rays', false), O('mirror', 'Opaque and reflective', false)],
    'Correct. A converging lens bends parallel rays toward a focus.',
    'Converging lenses are thicker in the middle and bring rays together.'),
  S('A shorter focal length usually means the lens bends light:',
    [O('stronger', 'More strongly', true), O('weaker', 'More weakly', false), O('never', 'Not at all', false)],
    'Yes. Stronger bending brings the focus closer.',
    'Short focal length means the rays are focused over a shorter distance, so bending is stronger.'),
  S('The strongest optics learner can do what before calculating?',
    [O('sketch', 'Sketch the ray path and predict the image type', true), O('guess', 'Guess the answer from the object name', false)],
    'Exactly. Ray sketches catch sign and direction mistakes before equations begin.',
    'Optics becomes safer when a ray sketch comes before the calculation.')
];

const QUANT_CHEM_WORKSHOP = [
  S('A mole is best understood as:',
    [O('count', 'A counting unit for particles', true), O('mass', 'A special kind of chemical mass only', false), O('shape', 'The shape of a molecule', false)],
    'Correct. A mole counts particles, just as a dozen counts twelve things.',
    'A mole is a count: 6.022 x 10²³ particles.'),
  S('One mole contains approximately:',
    [O('avogadro', '6.022 x 10²³ particles', true), O('twelve', '12 particles exactly', false), O('million', '1 million particles', false)],
    'Yes. That huge count is Avogadro constant.',
    'The mole is enormous because atoms are tiny: about 6.022 x 10²³ particles.'),
  { type: 'sorting', boxes: [
    { id: 'count', label: 'Counting idea' },
    { id: 'mass', label: 'Mass idea' }
  ], items: [
    { id: 'dozen', label: 'A dozen eggs', box: 'count' },
    { id: 'mole', label: 'A mole of atoms', box: 'count' },
    { id: 'grams', label: '12 grams of carbon', box: 'mass' },
    { id: 'balance', label: 'Reading from a lab balance', box: 'mass' }
  ]},
  {
    type: 'unitcheck',
    prompt: 'Mole bridge. If n = m / M, what is n for 80 g of NaOH with M = 40 g/mol?',
    expression: '80 g / 40 g mol⁻¹',
    target: 'Mass converted into amount of substance.',
    options: [
      { id: '2', label: '2 mol', note: 'two moles' },
      { id: '40', label: '40 mol', note: 'forgot to divide' },
      { id: '3200', label: '3200 mol', note: 'multiplied instead' }
    ],
    correctOption: '2',
    correctFeedback: 'Correct. 80 divided by 40 gives 2 moles.',
    incorrectFeedback: 'Use n = m / M. Divide 80 by 40.'
  },
  {
    type: 'unitcheck',
    prompt: 'Reverse the bridge. What mass is 0.5 mol of CO2 with molar mass 44 g/mol?',
    expression: 'm = n x M = 0.5 x 44',
    target: 'Amount converted back into lab mass.',
    options: [
      { id: '22', label: '22 g', note: 'half of 44' },
      { id: '44', label: '44 g', note: 'one full mole' },
      { id: '88', label: '88 g', note: 'two moles' }
    ],
    correctOption: '22',
    correctFeedback: 'Correct. Half a mole of CO2 has half its molar mass: 22 grams.',
    incorrectFeedback: 'Mass equals moles times molar mass: 0.5 times 44 is 22.'
  },
  S('In 2H2 + O2 -> 2H2O, the large 2 in front of H2 means:',
    [O('twomoles', 'Two moles of H2 particles', true), O('twoatoms', 'Two atoms inside each H2 molecule', false), O('twograms', 'Exactly two grams of hydrogen', false)],
    'Correct. Coefficients count whole particles or moles of particles.',
    'The front coefficient scales the whole formula. It is a mole ratio, not a gram amount.'),
  S('Why should reactions be compared in moles instead of grams?',
    [O('particles', 'Equations describe particle ratios, and moles count particles', true), O('prettier', 'Moles make the page look more advanced', false)],
    'Exactly. The reaction recipe is written in particle groups.',
    'Chemical equations are particle recipes. Moles translate lab mass into particle count.'),
  {
    type: 'moleculebuilder',
    prompt: 'Read the formula before doing the mass work. Build water from H2O.',
    targetFormula: 'H2O',
    targetAtoms: { H: 2, O: 1 },
    correctFeedback: 'Correct. H2O means two hydrogens and one oxygen.',
    incorrectFeedback: 'The subscript 2 belongs to hydrogen only. Oxygen has no written subscript, so it is one.'
  },
  S('A reaction needs 2 slices of bread and 1 slice of cheese per sandwich. There is plenty of cheese but only 4 slices of bread. What limits the sandwiches?',
    [O('bread', 'Bread', true), O('cheese', 'Cheese', false), O('plate', 'The plate colour', false)],
    'Correct. Bread runs out first, so it limits production.',
    'The limiting reactant is the ingredient that runs out first.'),
  { type: 'sorting', boxes: [
    { id: 'limiting', label: 'Limiting reactant clue' },
    { id: 'excess', label: 'Excess reactant clue' }
  ], items: [
    { id: 'runsout', label: 'Runs out first', box: 'limiting' },
    { id: 'setsmax', label: 'Sets maximum product', box: 'limiting' },
    { id: 'leftover', label: 'Left over after reaction stops', box: 'excess' },
    { id: 'spare', label: 'More than the recipe needs', box: 'excess' }
  ]},
  {
    type: 'matrixlab',
    mode: 'fill',
    prompt: 'Empirical formula desk: carbon 1 mol, hydrogen 2 mol, oxygen 1 mol. What formula matches the simplest ratio?',
    matrix: [['C', 'H', 'O'], ['mole ratio', '1', '2', '1'], ['formula', 'C', null, 'O']],
    blankRow: 3,
    blankCol: 2,
    options: ['H2', 'H', 'H4', 'O2'],
    correctValue: 'H2',
    correctFeedback: 'Correct. The simplest ratio 1:2:1 gives CH2O.',
    incorrectFeedback: 'Hydrogen has ratio 2, so the formula needs H2.'
  },
  S('An empirical formula is CH2O and the real molecular mass is six times larger. What is the molecular formula?',
    [O('glucose', 'C6H12O6', true), O('same', 'CH2O', false), O('half', 'C0.5HO0.5', false)],
    'Correct. Multiply every subscript by 6: C6H12O6.',
    'If the molecular mass is six times larger, multiply the whole empirical formula by 6.')
];

export function getMathsTrigonometryWorkshop() {
  return cloneInteractions(TRIGONOMETRY_WORKSHOP);
}

export function getMathsDifferentiationWorkshop() {
  return cloneInteractions(DIFFERENTIATION_WORKSHOP);
}

export function getPhysicsOpticsWorkshop() {
  return cloneInteractions(OPTICS_WORKSHOP);
}

export function getChemistryQuantWorkshop() {
  return cloneInteractions(QUANT_CHEM_WORKSHOP);
}
