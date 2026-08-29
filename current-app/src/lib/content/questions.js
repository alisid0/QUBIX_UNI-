/**
 * Strata — All quiz question definitions
 * Supports 5 types: mcq, truefalse, fillblank, match, typeanswer
 * Each question has a generate() function for randomized values.
 */

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/**
 * Difficulty bands — the "assessment pyramid" made learner-facing (see PYRAMIDS.md).
 * A quiz climbs these in order: confidence-building recall first, exam-level last.
 * Every question helper takes an optional difficulty (defaults to 'medium' so the
 * older, un-banded path banks keep working unchanged).
 */
export const DIFFICULTY_ORDER = { 'super-easy': 0, 'easy': 1, 'medium': 2, 'hard': 3 };
export const DIFFICULTY_LABELS = {
  'super-easy': 'Warm-up',
  'easy': 'Recall',
  'medium': 'Apply',
  'hard': 'Exam level'
};

/**
 * Question type: Multiple Choice
 */
export function mcq(generator, difficulty = 'medium') {
  return { type: 'mcq', generate: generator, difficulty };
}

/**
 * Question type: True / False
 */
export function truefalse(generator, difficulty = 'medium') {
  return { type: 'truefalse', generate: generator, difficulty };
}

/**
 * Question type: Fill in the blank
 * The question text should use ___ for the blank.
 */
export function fillblank(generator, difficulty = 'medium') {
  return { type: 'fillblank', generate: generator, difficulty };
}

/**
 * Question type: Match the following
 * Returns pairs of items to match.
 */
export function matchQuestion(generator, difficulty = 'medium') {
  return { type: 'match', generate: generator, difficulty };
}

/**
 * Question type: Type the answer
 * Numeric or short text answer.
 */
export function typeanswer(generator, difficulty = 'medium') {
  return { type: 'typeanswer', generate: generator, difficulty };
}

// ═══════════════════════════════════════════════════════════════
// QUESTION DEFINITIONS by path
// ═══════════════════════════════════════════════════════════════

export const PATH_QUESTIONS = {
  // ── M3 : Coordinate Geometry, Tier 0 ──
  M3: [
    // MCQ
    mcq(() => ({
      cg: 'CG1',
      q: 'Which statement is true about a number line?',
      opts: [
        'It only contains whole numbers',
        'Every point on it corresponds to exactly one real number',
        'It only goes in one direction',
        'It starts at 1'
      ],
      answer: 1,
      explain: 'A number line matches every point to exactly one real number, in order, extending infinitely both ways.'
    })),

    // True / False
    truefalse(() => ({
      cg: 'CG2',
      q: 'Zero on the number line is an optional marker — you could shift the whole line left or right and it would still work the same way.',
      answer: false,
      explain: 'Zero is the fixed reference point all distances and signs are measured from. Shifting it would change every number\'s meaning.'
    })),

    // Fill in the blank
    fillblank(() => ({
      cg: 'CG3',
      q: 'The sign in front of a number tells you which ___ from zero you\'re standing.',
      answer: 'direction',
      accept: ['direction', 'way', 'side'],
      distractors: ['distance', 'angle', 'value'],
      explain: 'Positive means right of zero, negative means left — the sign is directional, not about size.'
    })),

    // Type answer (numeric)
    typeanswer(() => {
      const a = randInt(-5, 10), span = randInt(3, 12), b = a + span;
      return {
        cg: 'CG6',
        q: `What is the distance between ${a} and ${b} on the number line?`,
        answer: span,
        tolerance: 0,
        explain: `Distance = |a − b| = |${a} − ${b}| = ${span}.`
      };
    }),

    // Match the following
    matchQuestion(() => ({
      cg: 'CG14',
      q: 'Match each sign combination to its quadrant.',
      pairs: [
        ['(+, +)', 'Quadrant I'],
        ['(−, +)', 'Quadrant II'],
        ['(−, −)', 'Quadrant III'],
        ['(+, −)', 'Quadrant IV']
      ],
      explain: 'Quadrants go anticlockwise from top-right: I (+,+), II (−,+), III (−,−), IV (+,−).'
    })),

    // More MCQ
    mcq(() => {
      const a = randInt(-6, 6), b = a + 1;
      return {
        cg: 'CG4',
        q: `How many numbers exist strictly between ${a} and ${b} on the number line?`,
        opts: ['0', 'Exactly 1', '10', 'Infinitely many'],
        answer: 3,
        explain: 'However finely you slice the gap between any two numbers, there\'s always another number living there.'
      };
    }),

    typeanswer(() => {
      const a = randInt(-10, 10), b = a + randInt(2, 16);
      const mid = (a + b) / 2;
      return {
        cg: 'CG7',
        q: `What is the midpoint of ${a} and ${b}?`,
        answer: mid,
        tolerance: 0.001,
        explain: `Midpoint = (${a} + ${b}) / 2 = ${mid}.`
      };
    }),

    mcq(() => ({
      cg: 'CG9',
      q: 'Which axis is conventionally the horizontal, "input" axis?',
      opts: ['The y-axis', 'The x-axis'],
      answer: 1,
      explain: 'x is horizontal and conventionally the input — you choose x first, then y comes out, as in y = f(x).'
    })),

    mcq(() => ({
      cg: 'CG10',
      q: 'What are the coordinates of the origin?',
      opts: ['(1, 1)', '(0, 0)', '(x, y)', 'It has no fixed coordinates'],
      answer: 1,
      explain: 'The origin is where both axes\' zeros line up — (0, 0).'
    })),

    fillblank(() => ({
      cg: 'CG11',
      q: 'To plot the point (3, 4), you first move ___ units along the x-axis, then 4 units up.',
      answer: '3',
      accept: ['3', 'three'],
      distractors: ['4', '7', '1'],
      explain: 'The first number in an ordered pair is always the horizontal move along x, done first.'
    })),

    typeanswer(() => {
      const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]];
      const t = pick(triples);
      const ox = randInt(-5, 5), oy = randInt(-5, 5);
      return {
        cg: 'CG15',
        q: `What is the distance between (${ox},${oy}) and (${ox + t[0]},${oy + t[1]})?`,
        answer: t[2],
        tolerance: 0.001,
        explain: `distance² = ${t[0]}² + ${t[1]}² = ${t[0] * t[0]} + ${t[1] * t[1]} = ${t[2] * t[2]}, so distance = ${t[2]}.`
      };
    }),

    // ── Tier 1 questions ──
    mcq(() => ({
      cg: 'CG18',
      q: 'A line passes through Quadrant I, cuts into II, and reaches III — never touching IV. Its steepness is:',
      opts: ['Positive', 'Negative', 'Zero', 'Undefined'],
      answer: 0,
      explain: 'To sweep through I, II, and III without ever touching IV, x and y must increase together — that\'s positive steepness.'
    })),

    typeanswer(() => {
      const x1 = randInt(0, 5), y1 = randInt(0, 5);
      const x2 = x1 + randInt(1, 6), y2 = y1 + randInt(1, 8);
      return {
        cg: 'CG19',
        q: `Between points (${x1}, ${y1}) and (${x2}, ${y2}), what is Δy (the vertical change)?`,
        answer: y2 - y1,
        tolerance: 0,
        explain: `Δy = y₂ − y₁ = ${y2} − ${y1} = ${y2 - y1}.`
      };
    }),

    typeanswer(() => {
      const dx = randInt(1, 5);
      let m = randInt(-4, 4); if (m === 0) m = 2;
      const dy = m * dx;
      const x1 = randInt(-5, 5), y1 = randInt(-5, 5);
      const x2 = x1 + dx, y2 = y1 + dy;
      return {
        cg: 'CG20',
        q: `Using points (${x1}, ${y1}) and (${x2}, ${y2}), what is the gradient (slope)?`,
        answer: m,
        tolerance: 0.001,
        explain: `m = Δy/Δx = (${y2}−${y1}) / (${x2}−${x1}) = ${dy} / ${dx} = ${m}.`
      };
    }),

    truefalse(() => ({
      cg: 'CG22',
      q: 'A perfectly horizontal line has an undefined gradient.',
      answer: false,
      explain: 'A horizontal line has Δy = 0, so its gradient is 0 — not undefined. A vertical line has undefined gradient because Δx = 0.'
    })),

    fillblank(() => ({
      cg: 'CG24',
      q: 'In the equation y = mx + c, the letter ___ controls the lean (steepness) of the line.',
      answer: 'm',
      accept: ['m', 'M'],
      distractors: ['c', 'x', 'y'],
      explain: 'm is the gradient (slope) — it controls how steep the line is. c controls where it crosses the y-axis.'
    })),
  ],

  // ── P0 : Mechanics — foundations (BB 01-07, Tier 0) ──
  P0: [
    mcq(() => ({
      cg: 'P0-1',
      q: 'Which of the following best describes what physics studies?',
      opts: [
        'Only the motion of planets',
        'Matter, motion, force, and energy, and how they interact over time',
        'Only forces, not energy',
        'Only energy, not matter'
      ],
      answer: 1,
      explain: 'Physics covers matter, motion, force, and energy together, and how they interact over time, not just one of these in isolation.'
    })),

    mcq(() => ({
      cg: 'P0-2',
      q: 'Which statement correctly distinguishes matter from mass?',
      opts: [
        'They are the same thing, just different words',
        'Matter is anything that occupies space and has mass; mass measures how much that object resists a change in motion',
        'Mass is the substance itself; matter is just its weight',
        'Matter only refers to solids'
      ],
      answer: 1,
      explain: 'Matter is the substance itself, anything occupying space and having mass. Mass is the specific property measuring an object\'s resistance to a change in motion.'
    })),

    truefalse(() => ({
      cg: 'P0-3',
      q: 'An object\'s weight changes depending on its location, but its mass does not.',
      answer: true,
      explain: 'Weight depends on the strength of the local gravitational pull. Mass measures resistance to a change in motion, which does not depend on location.'
    })),

    mcq(() => ({
      cg: 'P0-4',
      q: 'An object sliding on a frictionless surface, with no other forces acting on it, will:',
      opts: [
        'Gradually slow down',
        'Speed up over time',
        'Continue at constant velocity indefinitely',
        'Stop immediately'
      ],
      answer: 2,
      explain: 'Newton\'s first law: without a net force, an object in motion continues in a straight line at constant speed indefinitely.'
    })),

    mcq(() => ({
      cg: 'P0-5',
      q: 'Why does a hockey puck travel farther on ice than on concrete, given the same push?',
      opts: [
        'Ice is colder, which changes the puck\'s mass',
        'Concrete has more microscopic irregularities that catch against the puck, producing more friction',
        'The puck is heavier on concrete',
        'Friction does not exist on ice'
      ],
      answer: 1,
      explain: 'Friction arises from microscopic irregularities in two surfaces catching against each other. Concrete has far more of these than smooth ice, so it produces more friction and stops the puck sooner.'
    })),

    typeanswer(() => {
      const f = randInt(10, 60), m = randInt(2, 12);
      return {
        cg: 'P0-6',
        q: `A force of ${f}N acts on an object of mass ${m}kg. What is its acceleration, in m/s²? (F = ma)`,
        answer: Number((f / m).toFixed(2)),
        tolerance: 0.01,
        explain: `a = F/m = ${f}/${m} = ${(f / m).toFixed(2)} m/s².`
      };
    }),

    truefalse(() => ({
      cg: 'P0-7',
      q: 'Two cars travelling at 50 mph in opposite directions have the same velocity.',
      answer: false,
      explain: 'They have the same speed, but opposite velocities, since velocity includes direction and the two cars are heading different ways.'
    })),

    mcq(() => ({
      cg: 'P0-8',
      q: 'A car\'s speed is decreasing while it travels in a straight line. What does this say about its acceleration?',
      opts: [
        'Its acceleration is zero',
        'Its acceleration is positive, in the direction of travel',
        'Its acceleration is negative, opposite the direction of travel',
        'Acceleration only applies when speed increases'
      ],
      answer: 2,
      explain: 'A decrease in speed is still a change in velocity, so the object is still accelerating, just with a negative acceleration, opposite to its direction of travel.'
    })),

    fillblank(() => ({
      cg: 'P0-9',
      q: 'When a swimmer pushes backward against the water, the water pushes the swimmer ___ with equal force.',
      answer: 'forward',
      accept: ['forward', 'forwards'],
      explain: 'This is Newton\'s third law: every force has an equal and opposite reaction. The swimmer pushes the water backward; the water pushes the swimmer forward.'
    })),

    matchQuestion(() => ({
      cg: 'P0-10',
      q: 'Match each concept to its core idea.',
      pairs: [
        ['Inertia', 'An object resists a change in its motion'],
        ['Friction', 'Resistance between two sliding surfaces'],
        ['Newton\'s third law', 'Every force has an equal and opposite reaction'],
        ['Mass', 'Resistance to a change in an object\'s motion, independent of location']
      ],
      explain: 'Inertia, friction, mass, and Newton\'s third law are the core mechanisms behind BB 01-07.'
    })),
  ],

  // ── P0T1 : Mechanics — mathematical formulation (BB 71-77, Tier 1) ──
  P0T1: [
    mcq(() => ({
      cg: 'P0T1-1',
      q: 'A physical law expressed as an equation, such as F = ma, specifies:',
      opts: [
        'A rough description of a trend',
        'An exact relationship between measurable quantities, for any values substituted in',
        'A relationship that only holds for the specific numbers used to derive it',
        'A statement that cannot be tested'
      ],
      answer: 1,
      explain: 'An equation like F = ma holds for any valid values of force, mass, and acceleration, not just the example used to introduce it.'
    })),

    typeanswer(() => {
      const m = randInt(2, 20);
      const w = Number((m * 9.8).toFixed(1));
      return {
        cg: 'P0T1-2',
        q: `Using W = mg (g = 9.8 m/s²), what is the weight, in newtons, of a ${m} kg object?`,
        answer: w,
        tolerance: 0.5,
        explain: `W = mg = ${m} × 9.8 = ${w} N.`
      };
    }),

    truefalse(() => ({
      cg: 'P0T1-3',
      q: 'An object\'s weight is the same on Earth and on the Moon, because weight only depends on mass.',
      answer: false,
      explain: 'Weight is W = mg, so it depends on the local gravitational acceleration g as well as mass. g is smaller on the Moon, so the same object weighs less there.'
    })),

    mcq(() => ({
      cg: 'P0T1-4',
      q: 'A box on a table remains at rest. What does this imply about the net force acting on it?',
      opts: [
        'It must be zero',
        'It must equal the box\'s weight, ignoring the normal force',
        'There is no force at all acting on it',
        'The normal force must be greater than the weight'
      ],
      answer: 0,
      explain: '"At rest" means constant velocity (zero), which per ΣF = 0 ⇒ v = constant requires the net force to be zero, even though individual forces like gravity and the normal force are both nonzero.'
    })),

    typeanswer(() => {
      const m = randInt(5, 30);
      const mu = pick([0.2, 0.3, 0.4, 0.5]);
      const N = m * 9.8;
      const f = Number((mu * N).toFixed(1));
      return {
        cg: 'P0T1-5',
        q: `An object of mass ${m} kg rests on a surface with coefficient of friction μ = ${mu} (g = 9.8 m/s²). Using F = μN, what is the friction force, in newtons?`,
        answer: f,
        tolerance: 1,
        explain: `N = mg = ${m} × 9.8 = ${(m * 9.8).toFixed(1)} N. F = μN = ${mu} × ${(m * 9.8).toFixed(1)} = ${f} N.`
      };
    }),

    fillblank(() => ({
      cg: 'P0T1-6',
      q: 'In F = m·a, rearranged to solve for mass, the equation becomes m = ___.',
      answer: 'F/a',
      accept: ['F/a', 'F / a'],
      explain: 'Dividing both sides of F = ma by a isolates mass: m = F/a.'
    })),

    typeanswer(() => {
      const x1 = randInt(0, 20), dx = randInt(20, 100), t = randInt(2, 10);
      const v = Number((dx / t).toFixed(2));
      return {
        cg: 'P0T1-7',
        q: `An object moves from position ${x1} m to position ${x1 + dx} m in ${t} seconds. What is its average velocity, in m/s? (v = Δx/Δt)`,
        answer: v,
        tolerance: 0.05,
        explain: `v = Δx/Δt = ${dx} / ${t} = ${v} m/s.`
      };
    }),

    mcq(() => ({
      cg: 'P0T1-8',
      q: 'F₁₂ = −F₂₁ means:',
      opts: [
        'The two forces have different magnitudes',
        'The two forces are equal in magnitude and opposite in direction',
        'Only object 1 exerts a force',
        'The forces cancel and nothing moves'
      ],
      answer: 1,
      explain: 'The minus sign indicates opposite direction; the magnitudes on both sides of the equation are equal. Whether anything moves depends on the masses involved, not on the forces being unequal.'
    })),
  ],

  // ── P0T2 : Mechanics — numericals (BB 78-84, Tier 2) ──
  P0T2: [
    typeanswer(() => {
      const m = randInt(5, 40);
      const w = Number((m * 9.8).toFixed(1));
      return {
        cg: 'P0T2-1',
        q: `A ${m} kg object's weight near Earth's surface, in newtons (g = 9.8 m/s²), is:`,
        answer: w,
        tolerance: 0.5,
        explain: `W = mg = ${m} × 9.8 = ${w} N.`
      };
    }),

    typeanswer(() => {
      const m = randInt(5, 30);
      const mu = pick([0.2, 0.3, 0.4, 0.5]);
      const N = m * 9.8;
      const f = Number((mu * N).toFixed(1));
      return {
        cg: 'P0T2-2',
        q: `A ${m} kg crate sits on a surface with coefficient of friction μ = ${mu}. What is the maximum friction force resisting sliding, in newtons? (F = μN, N = mg, g = 9.8 m/s²)`,
        answer: f,
        tolerance: 1,
        explain: `N = mg = ${m} × 9.8 = ${N.toFixed(1)} N. F = μN = ${mu} × ${N.toFixed(1)} = ${f} N.`
      };
    }),

    typeanswer(() => {
      const f = randInt(100, 500), m = randInt(20, 100);
      const a = Number((f / m).toFixed(2));
      return {
        cg: 'P0T2-3',
        q: `An engine produces a force of ${f}N on a ${m}kg car. What is its acceleration, in m/s²? (F = ma)`,
        answer: a,
        tolerance: 0.02,
        explain: `a = F/m = ${f}/${m} = ${a} m/s².`
      };
    }),

    typeanswer(() => {
      const x1 = randInt(0, 30), dx = randInt(30, 150), t = randInt(3, 15);
      const v = Number((dx / t).toFixed(2));
      return {
        cg: 'P0T2-4',
        q: `A cyclist travels from position ${x1} m to position ${x1 + dx} m in ${t} seconds. What is their average velocity, in m/s? (v = Δx/Δt)`,
        answer: v,
        tolerance: 0.05,
        explain: `v = Δx/Δt = ${dx} / ${t} = ${v} m/s.`
      };
    }),

    typeanswer(() => {
      const v1 = randInt(1, 10), v2 = v1 + randInt(2, 10), t = randInt(2, 8);
      const a = Number(((v2 - v1) / t).toFixed(2));
      return {
        cg: 'P0T2-5',
        q: `A car's velocity increases from ${v1} m/s to ${v2} m/s over ${t} seconds. What is its acceleration, in m/s²? (a = Δv/Δt)`,
        answer: a,
        tolerance: 0.02,
        explain: `a = Δv/Δt = (${v2} − ${v1}) / ${t} = ${a} m/s².`
      };
    }),

    mcq(() => ({
      cg: 'P0T2-6',
      q: 'Two skaters push off each other with equal and opposite forces. The skater with the smaller mass will have:',
      opts: [
        'A smaller acceleration',
        'The same acceleration as the other skater',
        'A larger acceleration',
        'No acceleration at all'
      ],
      answer: 2,
      explain: 'Since a = F/m and the force is the same for both skaters, the smaller mass produces the larger acceleration.'
    })),

    typeanswer(() => {
      const m = randInt(10, 50);
      const mu = pick([0.1, 0.2, 0.3]);
      const friction = Number((mu * m * 9.8).toFixed(1));
      const applied = friction + randInt(40, 120);
      const a = Number(((applied - friction) / m).toFixed(2));
      return {
        cg: 'P0T2-7',
        q: `A ${m}kg crate has friction with μ = ${mu} (g = 9.8 m/s²) while a horizontal force of ${applied}N pushes it. What is the crate's acceleration, in m/s²? (net force = applied force − friction force; a = net force / mass)`,
        answer: a,
        tolerance: 0.05,
        explain: `Friction = μmg = ${mu} × ${m} × 9.8 = ${friction} N. Net force = ${applied} − ${friction} = ${(applied - friction).toFixed(1)} N. a = net force / mass = ${(applied - friction).toFixed(1)} / ${m} = ${a} m/s².`
      };
    }),
  ],

  // ── P1 : Forces & motion ──
  P1: [
    mcq(() => ({
      cg: 'P1-1',
      q: 'According to Newton\'s first law, what happens to a moving object if no force acts on it?',
      opts: [
        'It gradually slows down and stops',
        'It keeps moving in a straight line at constant speed',
        'It speeds up',
        'It falls to the ground'
      ],
      answer: 1,
      explain: 'Newton\'s first law says a moving object keeps moving in a straight line at constant speed unless a force acts on it.'
    })),

    truefalse(() => ({
      cg: 'P1-2',
      q: 'Friction only occurs between rough surfaces — smooth surfaces have no friction at all.',
      answer: false,
      explain: 'Even very smooth surfaces have some friction. The smoother the surfaces, the less friction — but it never disappears completely.'
    })),

    typeanswer(() => {
      const f = randInt(10, 50), m = randInt(2, 10);
      return {
        cg: 'P1-3',
        q: `A force of ${f}N is applied to a ${m}kg object. What is its acceleration? (F = ma)`,
        answer: f / m,
        tolerance: 0.01,
        explain: `a = F/m = ${f}/${m} = ${(f / m).toFixed(2)} m/s².`
      };
    }),

    fillblank(() => ({
      cg: 'P1-4',
      q: 'The force that opposes motion between two surfaces in contact is called ___.',
      answer: 'friction',
      accept: ['friction', 'Friction'],
      explain: 'Friction is the force that resists motion when two surfaces slide against each other.'
    })),
  ],

  // ── C1 : Into the atom ──
  C1: [
    mcq(() => ({
      cg: 'C1-1',
      q: 'How many naturally occurring elements are there?',
      opts: ['37', '92', '118', 'Over 200'],
      answer: 2,
      explain: 'There are 118 known elements. 92 occur naturally on Earth; the rest are man-made in laboratories.'
    })),

    truefalse(() => ({
      cg: 'C1-2',
      q: 'The word "atom" comes from the Greek word "atomos", meaning "uncuttable".',
      answer: true,
      explain: 'Greek philosophers coined "atomos" to describe the smallest possible piece of matter — something that can\'t be divided further.'
    })),

    fillblank(() => ({
      cg: 'C1-3',
      q: 'The atomic number (Z) equals the number of ___ in the nucleus.',
      answer: 'protons',
      accept: ['protons', 'proton'],
      explain: 'The atomic number is the count of protons in the nucleus — change it and you change the element itself.'
    })),

    matchQuestion(() => ({
      cg: 'C1-4',
      q: 'Match each subatomic particle to its charge.',
      pairs: [
        ['Proton', 'Positive (+)'],
        ['Neutron', 'No charge (0)'],
        ['Electron', 'Negative (−)']
      ],
      explain: 'Protons are positive, electrons are negative, and neutrons have no charge.'
    })),
  ],

  // ── P2 : Energy ──
  P2: [
    mcq(() => ({
      cg: 'P2-1',
      q: 'What is the formal definition of energy?',
      opts: [
        'The speed of an object',
        'The capacity to do work',
        'The mass of an object',
        'The temperature of a substance'
      ],
      answer: 1,
      explain: 'Energy is formally defined as the capacity to do work — a force moving something over a distance.'
    })),

    truefalse(() => ({
      cg: 'P2-2',
      q: 'Energy can be created from nothing as long as it is used immediately.',
      answer: false,
      explain: 'Energy cannot be created or destroyed. The total amount of energy in a closed system always stays the same.'
    })),

    fillblank(() => ({
      cg: 'P2-3',
      q: 'Energy is measured in ___.',
      answer: 'joules',
      accept: ['joules', 'Joules', 'joule', 'J'],
      explain: 'The joule (J) is the standard unit of energy.'
    })),

    mcq(() => ({
      cg: 'P2-4',
      q: 'A boulder at the top of a hill has what kind of energy?',
      opts: ['Kinetic energy', 'Potential energy', 'Thermal energy', 'Electrical energy'],
      answer: 1,
      explain: 'A boulder at the top of a hill has gravitational potential energy — stored energy, waiting to be released.'
    })),

    typeanswer(() => ({
      cg: 'P2-5',
      q: 'If a 2kg object is lifted 5 metres, how much gravitational potential energy does it gain? (g = 10 m/s², E = mgh)',
      answer: 100,
      tolerance: 0.5,
      explain: 'E = m × g × h = 2 × 10 × 5 = 100 joules.'
    }))
  ],

  // ── P3 : Gravity ──
  P3: [
    mcq(() => ({
      cg: 'P3-1',
      q: 'Which statement about gravity is true?',
      opts: [
        'Gravity only exists between large objects like planets',
        'Every two objects in the universe pull on each other',
        'Gravity can both attract and repel',
        'Gravity is a type of magnetism'
      ],
      answer: 1,
      explain: 'Every two objects in the universe pull on each other through gravity — you, your phone, the Earth, everything.'
    })),

    truefalse(() => ({
      cg: 'P3-2',
      q: 'The Moon is constantly falling toward the Earth, but keeps missing it.',
      answer: true,
      explain: 'The Moon is indeed falling toward Earth due to gravity, but its sideways speed means it keeps "missing" — that\'s what an orbit is.'
    })),

    fillblank(() => ({
      cg: 'P3-3',
      q: 'The force of gravity between two objects depends on their ___ and the distance between them.',
      answer: 'mass',
      accept: ['mass', 'masses', 'Mass'],
      explain: 'Gravity depends on the masses of the two objects (more mass = stronger pull) and the distance between them (farther apart = weaker pull).'
    })),

    typeanswer(() => {
      const d = pick([2, 3, 4]);
      const strength = 1 / (d * d);
      return {
        cg: 'P3-4',
        q: `If you double the distance between two objects, gravity drops to 1/4. If you triple it, gravity drops to 1/9. If you make it ${d} times farther, what fraction is gravity?`,
        answer: 1 / (d * d),
        tolerance: 0.001,
        explain: `Gravity follows an inverse square law: ${d}× farther = 1/${d * d} the strength.`
      };
    })
  ],

  // ── M1 : Getting infinitely close (calculus) ──
  M1: [
    mcq(() => ({
      cg: 'M1-1',
      q: 'What is a limit?',
      opts: [
        'A barrier that cannot be crossed',
        'A value that a number creeps closer to but never quite reaches',
        'The exact answer to any maths problem',
        'A type of equation'
      ],
      answer: 1,
      explain: 'A limit is a value that a number or sequence creeps closer and closer to, without necessarily ever landing on it exactly.'
    })),

    mcq(() => ({
      cg: 'M1-2',
      q: 'What is 1 ÷ 0?',
      opts: ['Infinity', 'Zero', 'One', 'Undefined'],
      answer: 3,
      explain: '1 ÷ 0 is undefined, not infinity. Maths simply breaks — you can never divide by zero.'
    })),

    truefalse(() => ({
      cg: 'M1-3',
      q: 'The area of a circle can be found by filling it with polygons with more and more sides, and observing where the area heads.',
      answer: true,
      explain: 'This is the classic limit approach: draw a polygon inside the circle, increase its sides toward infinity, and the polygon\'s area approaches the circle\'s true area.'
    })),

    fillblank(() => ({
      cg: 'M1-4',
      q: 'Newton and ___ independently developed calculus at around the same time.',
      answer: 'Leibniz',
      accept: ['Leibniz', 'leibniz', 'Gottfried Leibniz', 'G. Leibniz'],
      explain: 'Isaac Newton and Gottfried Leibniz independently invented calculus in the late 1600s.'
    })),

    mcq(() => ({
      cg: 'M1-5',
      q: 'A function is best described as:',
      opts: [
        'A difficult equation to solve',
        'A machine that maps each input to exactly one output',
        'A type of graph',
        'A number that never changes'
      ],
      answer: 1,
      explain: 'A function is a machine: feed it an input (x), and it reliably produces one output (f(x)). Like a vending machine.'
    })),

    typeanswer(() => ({
      cg: 'M1-6',
      q: 'If f(x) = 2x + 3, what is f(5)?',
      answer: 13,
      tolerance: 0,
      explain: 'f(5) = 2(5) + 3 = 10 + 3 = 13.'
    }))
  ],

  // ── P4 : Measurement & dimensions ──
  P4: [
    mcq(() => ({
      cg: 'P4-1',
      q: 'Why does a measurement need a unit attached to its number?',
      opts: [
        'It doesn\'t — the number alone is enough',
        'Because the number is only meaningful as a ratio to an agreed reference quantity',
        'Units are just a tradition with no real purpose',
        'Only large quantities need units'
      ],
      answer: 1,
      explain: 'A measurement is a numerical value times a unit. The number is the ratio of the measured quantity to a fixed, agreed reference — without that reference, the number means nothing.'
    })),

    truefalse(() => ({
      cg: 'P4-2',
      q: 'There are exactly seven fundamental (base) quantities, and every other quantity is derived from them.',
      answer: true,
      explain: 'Length, mass, time, electric current, temperature, amount of substance, and luminous intensity are the seven base quantities. Everything else — area, speed, force, energy — is built from these by multiplication and division.'
    })),

    fillblank(() => ({
      cg: 'P4-3',
      q: 'The SI base unit for mass is the ___.',
      answer: 'kilogram',
      accept: ['kilogram', 'Kilogram', 'kg'],
      distractors: ['newton', 'gram', 'metre'],
      explain: 'The kilogram (kg) is the SI base unit for mass, one of the seven fundamental units.'
    })),

    mcq(() => ({
      cg: 'P4-4',
      q: 'What is the dimensional formula of force?',
      opts: ['MLT⁻¹', 'MLT⁻²', 'ML²T⁻²', 'MLT'],
      answer: 1,
      explain: 'Force = mass × acceleration = mass × length/time² → MLT⁻². The exponent on mass is 1, on length is 1, and on time is −2.'
    })),

    mcq(() => ({
      cg: 'P4-5',
      q: 'A student writes F = mv (force equals mass times velocity). What does dimensional analysis reveal?',
      opts: [
        'The equation is correct',
        'The equation is dimensionally inconsistent — [F] = MLT⁻² but [mv] = MLT⁻¹',
        'It cannot be checked without doing the arithmetic',
        'The equation is correct only for large masses'
      ],
      answer: 1,
      explain: 'Force has dimensions MLT⁻², but mass × velocity has dimensions MLT⁻¹. They don\'t match, so the equation is dimensionally impossible — the homogeneity principle catches this without any calculation.'
    })),

    typeanswer(() => {
      const a = pick([1, 2, 3, 7, 8]), b = pick([4, 5, 6]);
      const order = a >= 5 ? b + 1 : b;
      return {
        cg: 'P4-6',
        q: `A quantity has the value ${a} × 10^${b}. What is its order of magnitude, as the exponent of ten? (round up if the leading digit is 5 or more)`,
        answer: order,
        tolerance: 0,
        explain: a >= 5
          ? `Since the leading digit (${a}) is 5 or more, it rounds up: the order of magnitude is 10^${order}.`
          : `Since the leading digit (${a}) is below 5, it stays as is: the order of magnitude is 10^${order}.`
      };
    }),

    matchQuestion(() => ({
      cg: 'P4-7',
      q: 'Match each object to its approximate scale.',
      pairs: [
        ['Atom', '10⁻¹⁰ m'],
        ['Proton', '10⁻¹⁵ m'],
        ['Human', '1 m'],
        ['Milky Way', '10²¹ m']
      ],
      explain: 'Reality is arranged in roughly logarithmic steps — atoms at 10⁻¹⁰ m, protons at 10⁻¹⁵ m, humans at about 1 m, and the Milky Way at roughly 10²¹ m.'
    }))
  ],

  // ── P5 : Vector products ──
  P5: [
    mcq(() => ({
      cg: 'P5-1',
      q: 'How do you add two vectors using the triangle rule?',
      opts: [
        'Add their magnitudes directly, regardless of direction',
        'Place the tail of the second vector at the head of the first; the sum runs from the start of the first to the tip of the second',
        'Multiply their magnitudes and add the angles',
        'Subtract the smaller magnitude from the larger one'
      ],
      answer: 1,
      explain: 'The triangle rule: draw the first vector, then draw the second starting from the tip of the first. The vector from the very start to the very end is the sum.'
    })),

    truefalse(() => ({
      cg: 'P5-2',
      q: 'The dot product of two perpendicular vectors is always zero.',
      answer: true,
      explain: 'a⃗ · b⃗ = |a||b| cos θ. At 90°, cos 90° = 0, so the dot product vanishes — none of one vector lies along the direction of the other.'
    })),

    fillblank(() => ({
      cg: 'P5-3',
      q: 'Unlike the dot product, the cross product of two vectors produces a ___, not a scalar.',
      answer: 'vector',
      accept: ['vector', 'Vector'],
      explain: 'The cross product a⃗ × b⃗ is itself a vector, perpendicular to both inputs, with magnitude |a||b| sin θ.'
    })),

    typeanswer(() => {
      const a = pick([4, 6, 8]), b = pick([5, 10]);
      return {
        cg: 'P5-4',
        q: `Two vectors have magnitudes ${a} and ${b}, with a 60° angle between them. What is their dot product? (cos 60° = 0.5)`,
        answer: a * b * 0.5,
        tolerance: 0.01,
        explain: `a⃗ · b⃗ = |a||b| cos θ = ${a} × ${b} × 0.5 = ${a * b * 0.5}.`
      };
    }),

    mcq(() => ({
      cg: 'P5-5',
      q: 'What does it mean that the cross product is "anti-commutative"?',
      opts: [
        'a⃗ × b⃗ always equals zero',
        'a⃗ × b⃗ = b⃗ × a⃗',
        'a⃗ × b⃗ = −(b⃗ × a⃗) — swapping the order flips the resulting vector\'s direction',
        'The cross product only works in one direction'
      ],
      answer: 2,
      explain: 'Swapping the order of a cross product reverses the sign of the result: a⃗ × b⃗ = −(b⃗ × a⃗). This is why torque and angular momentum are sensitive to the order you cross their vectors in.'
    }))
  ],

  // ── M2 : Calculus — turning points & area ──
  M2: [
    mcq(() => ({
      cg: 'M2-1',
      q: 'At a local maximum or minimum of a smooth function f(x), what is true of the derivative?',
      opts: ['It is undefined', 'It equals zero', 'It equals the function value', 'It is always negative'],
      answer: 1,
      explain: "At a turning point the tangent is horizontal, so f'(x) = 0. The second derivative then tells you whether it's a peak or a valley."
    })),
    truefalse(() => ({
      cg: 'M2-2',
      q: "If f''(x) > 0 at a point where f'(x) = 0, that point is a local maximum.",
      answer: false,
      explain: "f'' > 0 means the slope is increasing through that point — the curve bends upward, which is the signature of a local minimum, not a maximum."
    })),
    fillblank(() => ({
      cg: 'M2-3',
      q: 'The area under a speed-time graph between two times equals the ___ travelled in that interval.',
      answer: 'distance',
      accept: ['distance', 'Distance'],
      explain: 'Integration sums infinitely many thin strips of (speed × tiny time) — exactly distance — which is why the area under a v-t graph gives distance travelled.'
    })),
    typeanswer(() => {
      const a = pick([10, 20, 30]);
      const t = a / 5;
      return {
        cg: 'M2-4',
        q: `A ball's height is y = ${a}t − 5t² (g = 10 m/s²). At what time t (in seconds) does it reach its peak?`,
        answer: t,
        tolerance: 0.01,
        explain: `dy/dt = ${a} − 10t. Setting this to zero: t = ${a}/10 = ${t} s.`
      };
    }),
    mcq(() => ({
      cg: 'M2-5',
      q: 'What does the Fundamental Theorem of Calculus connect?',
      opts: [
        'Addition and subtraction',
        'Differentiation and integration — one undoes the other',
        'Vectors and scalars',
        'Probability and statistics'
      ],
      answer: 1,
      explain: 'If F\'(x) = f(x), then ∫ₐᵇ f(x)dx = F(b) − F(a). Integration is the antiderivative — the reverse operation of differentiation.'
    }))
  ],

  // ── M5 : Arithmetic foundations ──
  M5: [
    mcq(() => ({
      cg: 'M5-1',
      q: 'Which property does a(b + c) = ab + ac demonstrate?',
      opts: ['Commutative', 'Associative', 'Distributive', 'Reflexive'],
      answer: 2,
      explain: 'The distributive property links multiplication and addition — it is the engine behind every expansion and factorisation in algebra.'
    })),
    truefalse(() => ({
      cg: 'M5-2',
      q: 'Subtraction and division are commutative, just like addition and multiplication.',
      answer: false,
      explain: 'Order matters for subtraction and division (5−2 ≠ 2−5), but not for addition or multiplication (3+2 = 2+3).'
    })),
    fillblank(() => ({
      cg: 'M5-3',
      q: 'In the number 425.73, the digit 7 sits in the ___ place.',
      answer: 'tenths',
      accept: ['tenths', 'Tenths', 'tenth'],
      explain: 'Each position after the decimal point is a negative power of ten: the first is tenths (10⁻¹), the second hundredths (10⁻²).'
    })),
    typeanswer(() => {
      const n = pick([17, 18, 19]), d = 20;
      const pct = (n / d) * 100;
      return {
        cg: 'M5-4',
        q: `A score of ${n} out of ${d} — what percentage is that?`,
        answer: pct,
        tolerance: 0.1,
        explain: `${n}/${d} = ${(n/d).toFixed(2)}, and multiplying by 100 gives ${pct}%.`
      };
    }),
    mcq(() => ({
      cg: 'M5-5',
      q: 'Estimating 98 × 53 by rounding to 100 × 50 gives 5000. The exact answer is 5194. What does this demonstrate?',
      opts: [
        'Estimation is useless because it is not exact',
        'Estimation gives a fast sanity check that catches gross errors',
        'Rounding always overestimates',
        'You should never calculate the exact answer'
      ],
      answer: 1,
      explain: "The estimate landed within 4% of the true answer in seconds — exactly the kind of sanity check that catches a misplaced decimal point or a calculator typo."
    })),
    truefalse(() => ({
      cg: 'M5-6',
      q: 'Multiplying a number by 0.3 will always give a smaller result than the original number (for a positive number).',
      answer: true,
      explain: 'Multiplying by any positive number less than 1 shrinks the result — this is the kind of number sense that catches errors like writing 45 × 0.2 = 90.'
    }))
  ],

  // ── M6 : Algebra foundations ──
  M6: [
    mcq(() => ({
      cg: 'M6-1',
      q: 'In the expression 3x² + 2x − 5, what is the coefficient of x²?',
      opts: ['2', '3', '−5', 'x'],
      answer: 1,
      explain: 'The coefficient is the number multiplying the variable part — here, 3 multiplies x².'
    })),
    truefalse(() => ({
      cg: 'M6-2',
      q: '3x² and 5x are like terms and can be combined into 8x or 8x².',
      answer: false,
      explain: 'Like terms must have exactly the same variable AND exponent. 3x² and 5x have different powers of x, so they cannot be combined.'
    })),
    fillblank(() => ({
      cg: 'M6-3',
      q: 'Expanding (a + b)(a − b) always gives a² − ___.',
      answer: 'b²',
      accept: ['b²', 'b^2', 'b2'],
      explain: 'This is the "difference of two squares" pattern: (a+b)(a−b) = a² − ab + ab − b² = a² − b².'
    })),
    typeanswer(() => {
      const p = pick([2, 3, 4]), q = pick([5, 6, 7]);
      const b = p + q, c = p * q;
      return {
        cg: 'M6-4',
        q: `Factorising x² + ${b}x + ${c} gives (x + ${p})(x + ${q}). Check: what is ${p} × ${q}?`,
        answer: c,
        tolerance: 0,
        explain: `The two numbers must multiply to the constant term (${c}) and add to the x-coefficient (${b}) — here ${p} and ${q} do both.`
      };
    }),
    mcq(() => ({
      cg: 'M6-5',
      q: 'Solving −2x + 3 > 7, you divide both sides by −2. What must you do to the inequality sign?',
      opts: ['Nothing changes', 'Flip it', 'Remove it', 'Double it'],
      answer: 1,
      explain: 'Multiplying or dividing both sides of an inequality by a negative number reverses the direction of the inequality — the one rule not shared with equations.'
    })),
    mcq(() => ({
      cg: 'M6-6',
      q: 'For a quadratic ax² + bx + c = 0, what does a negative discriminant (b² − 4ac < 0) tell you?',
      opts: [
        'There are two real solutions',
        'There is exactly one real solution',
        'There are no real solutions',
        'The equation is not quadratic'
      ],
      answer: 2,
      explain: 'A negative discriminant means √(b²−4ac) involves the square root of a negative number — no real solutions exist, only complex ones.'
    })),
    fillblank(() => ({
      cg: 'M6-7',
      q: 'x⁻² is the same as 1 over x to the power ___.',
      answer: '2',
      accept: ['2', 'two'],
      explain: 'A negative exponent means "reciprocal": x⁻ᵃ = 1/xᵃ, so x⁻² = 1/x².'
    }))
  ],

  // ── M7 : Matrices ──
  M7: [
    mcq(() => ({
      cg: 'M7-1',
      q: 'A matrix has 3 rows and 4 columns. How is its size described?',
      opts: ['4 × 3', '3 × 4', '3 + 4', '12'],
      answer: 1,
      explain: 'Matrix dimensions are always given as rows × columns — 3 rows, 4 columns, so it is a 3 × 4 matrix.'
    })),
    truefalse(() => ({
      cg: 'M7-2',
      q: 'Changing one entry of a matrix automatically changes the other entries, the same way changing one term in an equation forces the rest to change.',
      answer: false,
      explain: 'This is the isolation property — a matrix holds independent entries like a ledger. Changing one cell leaves every other cell untouched, unlike a linked equation.'
    })),
    fillblank(() => ({
      cg: 'M7-3',
      q: 'You can only add two matrices if they have the same ___.',
      answer: 'dimensions',
      accept: ['dimensions', 'size', 'shape'],
      explain: 'Matrix addition is element-wise — each entry needs a matching position in the other matrix, which is only possible if both matrices have identical dimensions.'
    })),
    mcq(() => ({
      cg: 'M7-4',
      q: 'To multiply matrix A (size m × n) by matrix B, what must be true of B?',
      opts: [
        'B must also be m × n',
        'B must have n rows',
        'B must have n columns',
        'B must be square'
      ],
      answer: 1,
      explain: 'The number of columns in A must equal the number of rows in B — otherwise a row of A and a column of B have a different number of terms to pair up.'
    })),
    truefalse(() => ({
      cg: 'M7-5',
      q: 'Matrix multiplication is commutative: AB always equals BA.',
      answer: false,
      explain: 'Matrix multiplication is generally NOT commutative — AB ≠ BA in general, unlike ordinary number multiplication.'
    })),
    typeanswer(() => {
      const a = pick([2, 3, 4]);
      return {
        cg: 'M7-6',
        q: `For a 2×2 matrix [a b; c d] with a=${a}, b=1, c=1, d=${a}, the determinant is ad − bc. What is it?`,
        answer: a * a - 1,
        tolerance: 0,
        explain: `det = (${a})(${a}) − (1)(1) = ${a*a} − 1 = ${a*a-1}.`
      };
    }),
    mcq(() => ({
      cg: 'M7-7',
      q: 'What does it mean for a matrix to be "singular"?',
      opts: [
        'It has only one row',
        'Its determinant is zero, so it has no inverse',
        'It is the identity matrix',
        'It contains only positive numbers'
      ],
      answer: 1,
      explain: 'A singular matrix has determinant zero, which means it collapses the plane and cannot be undone — no inverse exists.'
    }))
  ],

  // ── M8 : Exponents & logarithms ──
  M8: [
    mcq(() => ({
      cg: 'M8-1',
      q: 'For the exponential function y = bˣ with b > 1, what happens as x → −∞?',
      opts: ['y → ∞', 'y → 0 but never reaches it', 'y → 1', 'y becomes negative'],
      answer: 1,
      explain: 'The curve hugs the x-axis on the left without ever touching it — y = 0 is a horizontal asymptote, and y is always positive.'
    })),
    truefalse(() => ({
      cg: 'M8-2',
      q: 'The number e is defined as the limit of (1 + 1/n)ⁿ as n approaches infinity.',
      answer: true,
      explain: 'This is exactly how e arises — as the limit of continuous compounding, e ≈ 2.71828...'
    })),
    fillblank(() => ({
      cg: 'M8-3',
      q: 'log_b(x) = y means that b raised to the power ___ equals x.',
      answer: 'y',
      accept: ['y', 'Y'],
      explain: 'A logarithm is just an exponent in disguise: log_b(x) = y is defined to mean bʸ = x.'
    })),
    typeanswer(() => {
      const half = pick([1, 2, 3]);
      const remaining = 100 / Math.pow(2, half);
      return {
        cg: 'M8-4',
        q: `A 100 mg radioactive sample has a half-life T. After ${half} half-lives, how many mg remain?`,
        answer: remaining,
        tolerance: 0.01,
        explain: `After n half-lives, the amount is 100 × (1/2)ⁿ = 100 × (1/2)^${half} = ${remaining} mg.`
      };
    }),
    mcq(() => ({
      cg: 'M8-5',
      q: 'log_b(MN) equals which of the following?',
      opts: ['log_b(M) × log_b(N)', 'log_b(M) + log_b(N)', 'log_b(M) − log_b(N)', 'log_b(M)/log_b(N)'],
      answer: 1,
      explain: 'The product rule of logarithms: log_b(MN) = log_b(M) + log_b(N) — multiplication becomes addition under a log.'
    })),
    truefalse(() => ({
      cg: 'M8-6',
      q: 'No matter how large the exponent n is in xⁿ, an exponential function bˣ (with b > 1) will eventually outgrow it as x → ∞.',
      answer: true,
      explain: 'lim(x→∞) xⁿ/bˣ = 0 for any fixed n and any b > 1 — exponentials always eventually overtake polynomials, no matter how big the polynomial power.'
    })),
    mcq(() => ({
      cg: 'M8-7',
      q: 'What makes the logistic curve different from pure exponential growth?',
      opts: [
        'It grows even faster than exponential',
        'It approaches a maximum carrying capacity and levels off',
        'It only applies to radioactive decay',
        'It has no real-world examples'
      ],
      answer: 1,
      explain: 'The logistic curve starts off looking exponential but slows and flattens as the quantity approaches a carrying capacity K — modelling real growth that hits limits.'
    }))
  ],

  // ── M9 : Trigonometry ──
  M9: [
    mcq(() => ({
      cg: 'M9-1',
      q: 'On the unit circle, the coordinates of the point at angle θ are:',
      opts: ['(sin θ, cos θ)', '(cos θ, sin θ)', '(tan θ, 1)', '(θ, 1)'],
      answer: 1,
      explain: 'By definition, the x-coordinate of the point on the unit circle at angle θ is cos θ, and the y-coordinate is sin θ.'
    })),
    fillblank(() => ({
      cg: 'M9-2',
      q: 'sin 30° = cos ___° (the complementary angle rule).',
      answer: '60',
      accept: ['60', '60°'],
      explain: 'Cofunction identity: sin(90°−θ) = cos θ. Since 90°−30° = 60°, sin 30° = cos 60° = ½.'
    })),
    truefalse(() => ({
      cg: 'M9-3',
      q: 'The tangent function has the same period as sine and cosine (360°).',
      answer: false,
      explain: 'Tangent has period 180° (π) — half the period of sine and cosine — because tan repeats its pattern twice as often.'
    })),
    mcq(() => ({
      cg: 'M9-4',
      q: 'In which quadrant is tan θ positive but sin θ and cos θ both negative?',
      opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      answer: 2,
      explain: 'ASTC: in Quadrant III, both x and y are negative, so sin and cos are negative — but their ratio (tan) is positive, since negative ÷ negative = positive.'
    })),
    typeanswer(() => {
      const theta = pick([15, 30, 60, 75]);
      const range = (u, g, deg) => (u*u*Math.sin(2*deg*Math.PI/180))/g;
      const u = 20, g = 10;
      const r = range(u, g, theta);
      return {
        cg: 'M9-5',
        q: `A projectile launched at u=${u} m/s at angle ${theta}° (g=${g} m/s²). Using R = u²sin(2θ)/g, what is the range in metres? (round to 1 decimal)`,
        answer: Math.round(r * 10) / 10,
        tolerance: 0.5,
        explain: `R = ${u}² × sin(${theta*2}°) / ${g} = ${u*u} × ${Math.sin(2*theta*Math.PI/180).toFixed(3)} / ${g} ≈ ${(Math.round(r*10)/10)} m.`
      };
    }),
    mcq(() => ({
      cg: 'M9-6',
      q: 'Why do a 30° and a 60° launch angle give the same projectile range (same speed)?',
      opts: [
        'They do not — this is a myth',
        'Because sin 2θ = sin(180° − 2θ), and 2(30°) and 2(60°) sum to 180°',
        'Because gravity is different at each angle',
        'Because 30 + 60 = 90'
      ],
      answer: 1,
      explain: 'sin 60° = sin 120° (since 180°−60°=120°), and 2×30°=60°, 2×60°=120° — the range formula gives the same sin 2θ value for complementary launch angles.'
    })),
    fillblank(() => ({
      cg: 'M9-7',
      q: 'The identity sin²θ + cos²θ = 1 comes directly from the equation of the unit ___.',
      answer: 'circle',
      accept: ['circle', 'Circle'],
      explain: 'The unit circle has equation x² + y² = 1. Since x = cos θ and y = sin θ, substituting gives cos²θ + sin²θ = 1.'
    }))
  ],

  // ── P6 : Measurement, errors & relative motion ──
  P6: [
    mcq(() => ({
      cg: 'P6-1',
      q: 'A balance gives readings that cluster tightly around the wrong value because it was never zeroed. What kind of error is this?',
      opts: ['Random error', 'Systematic error', 'No error — this is normal', 'Rounding error'],
      answer: 1,
      explain: 'A systematic error shifts every reading in the same direction (a calibration fault) — averaging more readings will not fix it, unlike random error.'
    })),
    truefalse(() => ({
      cg: 'P6-2',
      q: 'A measurement can be precise (tightly clustered) without being accurate (close to the true value).',
      answer: true,
      explain: 'Precision is about consistency between repeated readings; accuracy is about closeness to the true value. A tight cluster centred on the wrong number is precise but inaccurate.'
    })),
    fillblank(() => ({
      cg: 'P6-3',
      q: 'The velocity of A relative to B is written v⃗_A/B = v⃗_A − v⃗___.',
      answer: 'B',
      accept: ['B', 'b'],
      explain: 'Relative velocity is found by vector subtraction: v⃗_{A/B} = v⃗_A − v⃗_B.'
    })),
    typeanswer(() => {
      const u = pick([10, 15, 20]);
      const v = pick([2, 3, 4]);
      return {
        cg: 'P6-4',
        q: `A train moves at ${u} m/s east. A passenger walks toward the front at ${v} m/s relative to the train. What is the passenger's speed relative to the ground (m/s)?`,
        answer: u + v,
        tolerance: 0,
        explain: `Velocities in the same direction add: ${u} + ${v} = ${u+v} m/s relative to the ground.`
      };
    }),
    mcq(() => ({
      cg: 'P6-5',
      q: 'For a projectile launched at angle θ with speed u, which pair of formulas correctly gives the maximum height and range?',
      opts: [
        'H = u²sin²θ/(2g), R = u²sin(2θ)/g',
        'H = u²cosθ/g, R = u²sinθ/g',
        'H = ugsinθ, R = ugcosθ',
        'H = u²/g, R = u²sinθ/g'
      ],
      answer: 0,
      explain: 'Maximum height comes from the vertical component alone (H = u²sin²θ/2g); range combines both components via the double-angle identity (R = u²sin2θ/g).'
    }))
  ],

  // ── P7 : Newton's laws & forces ──
  P7: [
    mcq(() => ({
      cg: 'P7-1',
      q: "What is the key difference between a contact force and a field force?",
      opts: [
        'Field forces are always stronger',
        'Contact forces require physical touching; field forces act at a distance',
        'There is no real difference',
        'Contact forces only occur in space'
      ],
      answer: 1,
      explain: 'Contact forces (normal, friction, tension) arise from surfaces touching. Field forces (gravity, electric, magnetic) act without any contact, mediated by a field.'
    })),
    truefalse(() => ({
      cg: 'P7-2',
      q: 'In a free body diagram, you should include the forces the object exerts on other objects, as well as the forces acting on it.',
      answer: false,
      explain: 'A free body diagram shows ONLY the forces acting ON the isolated object — never the forces it exerts on anything else.'
    })),
    fillblank(() => ({
      cg: 'P7-3',
      q: "Newton's first law says an object in motion stays in motion unless acted on by an external ___.",
      answer: 'force',
      accept: ['force', 'Force'],
      distractors: ['motion', 'energy', 'mass'],
      explain: "This resistance to a change in velocity is inertia — Newton's first law defines it precisely."
    })),
    typeanswer(() => {
      const m = pick([1, 2, 3]), v0 = pick([2, 4, 6]);
      return {
        cg: 'P7-4',
        q: `A spring with k = 500 N/m is stretched by 0.0${v0} m by a hanging mass. What is the spring force (N)? Use F = kx.`,
        answer: 500 * (v0/100),
        tolerance: 0.1,
        explain: `F = kx = 500 × 0.0${v0} = ${500 * (v0/100)} N.`
      };
    }),
    mcq(() => ({
      cg: 'P7-5',
      q: 'Newton actually stated his second law in terms of momentum. What is the most general form?',
      opts: ['F = ma', 'F⃗ = dp⃗/dt', 'F = mg', 'F = kx'],
      answer: 1,
      explain: 'F⃗ = dp⃗/dt is the general form — it reduces to F = ma when mass is constant, but correctly handles variable-mass systems like rockets, which F=ma cannot.'
    })),
    truefalse(() => ({
      cg: 'P7-6',
      q: "A horse pulling a cart cannot move it, because by Newton's third law the cart pulls back on the horse with equal force.",
      answer: false,
      explain: "The action-reaction pair (horse↔cart) acts on different bodies and never cancels in one object's FBD. The horse also pushes the ground backward, and the ground pushes the horse forward — that net force is what actually moves the system."
    })),
    mcq(() => ({
      cg: 'P7-7',
      q: 'A body is in translational equilibrium when:',
      opts: [
        'It is not moving at all',
        'The vector sum of all external forces on it is zero',
        'Only gravity acts on it',
        'Its mass is zero'
      ],
      answer: 1,
      explain: 'Equilibrium means ΣF⃗ = 0 — zero acceleration. This includes both static equilibrium (at rest) and dynamic equilibrium (constant velocity).'
    }))
  ],

  // ── P8 : Friction & circular motion ──
  P8: [
    mcq(() => ({
      cg: 'P8-1',
      q: 'Why is it usually harder to start an object sliding than to keep it sliding?',
      opts: [
        'Static friction is usually a smaller maximum than kinetic friction',
        'Maximum static friction is usually greater than kinetic friction',
        'There is no difference between static and kinetic friction',
        'Kinetic friction increases with speed indefinitely'
      ],
      answer: 1,
      explain: 'For most material pairs, μₛ > μₖ — the maximum static friction holding something still is larger than the kinetic friction once it starts sliding.'
    })),
    fillblank(() => ({
      cg: 'P8-2',
      q: 'The angle of repose θᵣ satisfies tan θᵣ = ___ (the coefficient of static friction).',
      answer: 'μₛ',
      accept: ['μₛ', 'mu_s', 'μs', 'mus'],
      explain: 'At the angle of repose, the downhill component of weight exactly equals the maximum static friction, giving tan θᵣ = μₛ.'
    })),
    truefalse(() => ({
      cg: 'P8-3',
      q: 'An object moving in a circle at constant speed is not accelerating, since its speed never changes.',
      answer: false,
      explain: 'Acceleration is the rate of change of velocity, a vector — even at constant speed, the direction is always changing in circular motion, so it is always accelerating toward the centre.'
    })),
    typeanswer(() => {
      const v = pick([10, 20, 30]), r = pick([25, 50, 100]);
      const a = (v*v)/r;
      return {
        cg: 'P8-4',
        q: `A car takes a curve of radius ${r} m at ${v} m/s. What is its centripetal acceleration (m/s²)? Use a = v²/r.`,
        answer: a,
        tolerance: 0.1,
        explain: `a = v²/r = ${v}²/${r} = ${v*v}/${r} = ${a} m/s².`
      };
    }),
    mcq(() => ({
      cg: 'P8-5',
      q: 'What provides the centripetal force for a car turning on a flat, unbanked road?',
      opts: ['Gravity', 'The normal force', 'Friction between tyres and road', 'The engine'],
      answer: 2,
      explain: "On a flat road, friction is the only force with a component pointing toward the centre of the turn — it provides the centripetal force, F_c = μₛmg = mv²/r."
    })),
    mcq(() => ({
      cg: 'P8-6',
      q: 'Why does banking a curve help a car turn safely at higher speed?',
      opts: [
        'It increases the friction coefficient',
        'It tilts the normal force so part of it points toward the centre, supplying centripetal force without relying solely on friction',
        'It reduces the car\'s mass',
        'It eliminates the need for any centripetal force'
      ],
      answer: 1,
      explain: 'On a banked curve, the normal force is tilted inward — its horizontal component contributes to the centripetal force, reducing (or at the optimum speed, eliminating) the need for friction.'
    }))
  ],

  // ── P9 : Work, energy & momentum ──
  P9: [
    mcq(() => ({
      cg: 'P9-1',
      q: 'A person carries a box horizontally at constant speed. Why is the work done by the upward force they exert on the box zero?',
      opts: [
        'Because the box has no weight',
        'Because that force is perpendicular to the horizontal displacement',
        'Because the person is not pushing hard enough',
        'Work is never zero in physics'
      ],
      answer: 1,
      explain: 'W = Fs cos θ. When the force is perpendicular to the displacement, θ = 90° and cos 90° = 0, so the work done by that force is zero.'
    })),
    fillblank(() => ({
      cg: 'P9-2',
      q: 'The work-energy theorem states that the net work done on an object equals its change in ___ energy.',
      answer: 'kinetic',
      accept: ['kinetic', 'Kinetic'],
      explain: 'W_net = ΔK = ½mv²_f − ½mv²_i — this follows directly from integrating Newton\'s second law over a displacement.'
    })),
    typeanswer(() => {
      const m = pick([1, 2, 4]), v = pick([4, 6, 10]);
      const ke = 0.5 * m * v * v;
      return {
        cg: 'P9-3',
        q: `A ${m} kg object moves at ${v} m/s. What is its kinetic energy (J)? Use KE = ½mv².`,
        answer: ke,
        tolerance: 0.1,
        explain: `KE = ½ × ${m} × ${v}² = ½ × ${m} × ${v*v} = ${ke} J.`
      };
    }),
    truefalse(() => ({
      cg: 'P9-4',
      q: 'Doubling an object\'s speed quadruples its kinetic energy.',
      answer: true,
      explain: 'KE = ½mv² depends on the square of speed. Doubling v multiplies KE by 2² = 4 — this is why braking distance grows so fast with speed.'
    })),
    mcq(() => ({
      cg: 'P9-5',
      q: 'Why is the choice of reference level (where U = 0) for gravitational potential energy arbitrary?',
      opts: [
        'It is not arbitrary — there is only one correct choice',
        'Only changes (differences) in potential energy are physically meaningful, not absolute values',
        'Potential energy does not actually exist',
        'Gravity changes depending on the reference level'
      ],
      answer: 1,
      explain: 'The physics only ever depends on ΔU, the change in potential energy as height changes — so where you set U = 0 has no effect on predicted motion.'
    })),
    mcq(() => ({
      cg: 'P9-6',
      q: 'Two carts collide and stick together (perfectly inelastic). What is always conserved, even though kinetic energy is lost to heat and deformation?',
      opts: ['Kinetic energy', 'Total momentum', 'Speed', 'Volume'],
      answer: 1,
      explain: 'Momentum is conserved in any collision with no external force, regardless of whether kinetic energy is lost — Σp_before = Σp_after always holds.'
    })),
    typeanswer(() => {
      const m = pick([0.1, 0.15, 0.2]), dv = pick([50, 60, 70]);
      const dt = 0.01;
      const F = (m * dv) / dt;
      return {
        cg: 'P9-7',
        q: `A ${m} kg ball changes velocity by ${dv} m/s in a bat collision lasting ${dt} s. What is the average force (N)? Use F = Δp/Δt = mΔv/Δt.`,
        answer: Math.round(F),
        tolerance: 5,
        explain: `F = mΔv/Δt = (${m} × ${dv}) / ${dt} = ${(m*dv).toFixed(2)} / ${dt} = ${Math.round(F)} N.`
      };
    })
  ],

  // ── P10 : Vectors ──
  P10: [
    mcq(() => ({
      cg: 'P10-1',
      q: 'A vector is written a⃗ = 3î + 4ĵ. What does this notation mean?',
      opts: [
        'The vector has length 3+4=7',
        'The vector has an x-component of 3 and a y-component of 4',
        'î and ĵ are unknowns to be solved for',
        'The vector points only in the î direction'
      ],
      answer: 1,
      explain: 'î and ĵ are unit vectors along the x and y axes — the numbers in front of them (3 and 4) are the components, the scalar amounts along each axis.'
    })),
    typeanswer(() => {
      const x = pick([3, 6, 8]), y = pick([4, 8, 15]);
      const mag = Math.sqrt(x*x + y*y);
      return {
        cg: 'P10-2',
        q: `Find the magnitude of a⃗ = ${x}î + ${y}ĵ.`,
        answer: Math.round(mag * 100) / 100,
        tolerance: 0.05,
        explain: `|a⃗| = √(${x}² + ${y}²) = √(${x*x}+${y*y}) = √${x*x+y*y} = ${Math.round(mag*100)/100}.`
      };
    }),
    fillblank(() => ({
      cg: 'P10-3',
      q: 'A unit vector â in the direction of a⃗ is found by dividing a⃗ by its ___.',
      answer: 'magnitude',
      accept: ['magnitude', 'Magnitude', 'length'],
      explain: 'â = a⃗/|a⃗| — dividing by the magnitude strips away the "how much," leaving only the pure direction with length exactly 1.'
    })),
    truefalse(() => ({
      cg: 'P10-4',
      q: 'Displacement is independent of where you place the origin, but position is not.',
      answer: true,
      explain: 'Position is measured from a chosen origin and changes if you move the origin. Displacement, the difference between two positions, stays the same regardless of origin — it is a free vector.'
    })),
    mcq(() => ({
      cg: 'P10-5',
      q: 'Geometrically, what does a⃗ − b⃗ represent when both vectors are drawn from the same starting point?',
      opts: [
        'The midpoint between the two tips',
        'The vector from the tip of b⃗ to the tip of a⃗',
        'The sum of the two vectors',
        'It has no geometric meaning'
      ],
      answer: 1,
      explain: 'Subtraction gives the vector that takes you from the tip of b⃗ to the tip of a⃗ — exactly what relative position and relative velocity use.'
    })),
    mcq(() => ({
      cg: 'P10-6',
      q: 'What is the key difference between the dot product and the cross product of two vectors?',
      opts: [
        'The dot product gives a vector; the cross product gives a scalar',
        'The dot product gives a scalar (using cos θ); the cross product gives a vector (using sin θ)',
        'They are exactly the same operation',
        'The cross product only works in 2D'
      ],
      answer: 1,
      explain: 'a⃗·b⃗ = |a||b|cos θ is a scalar. a⃗×b⃗ = |a||b|sin θ n̂ is a vector perpendicular to both, with direction from the right-hand rule.'
    })),
    typeanswer(() => {
      const dx = pick([3,4,5]), dy = pick([2,3,4]);
      return {
        cg: 'P10-7',
        q: `A particle's position is r⃗(t) = ${dx}t·î + ${dy}t²·ĵ. What is the x-component of its velocity v⃗ = dr⃗/dt?`,
        answer: dx,
        tolerance: 0,
        explain: `Differentiate component-wise: d(${dx}t)/dt = ${dx}. (The y-component would be ${2*dy}t, which changes with time — but the x-component is constant.)`
      };
    })
  ],

  // ── P11 : Electricity & circuits ──
  P11: [
    mcq(() => ({
      cg: 'P11-1',
      q: 'What does it mean that electric charge is "quantised"?',
      opts: [
        'Charge can take any value at all',
        'All charge is an integer multiple of the elementary charge e',
        'Charge cannot be measured precisely',
        'Only protons carry charge'
      ],
      answer: 1,
      explain: 'Charge comes in indivisible lumps of e = 1.602×10⁻¹⁹ C — you cannot have half an electron\'s worth of charge.'
    })),
    fillblank(() => ({
      cg: 'P11-2',
      q: 'Current is defined as I = Q/___.',
      answer: 't',
      accept: ['t', 'T', 'time'],
      explain: 'I = Q/t — current is the rate of flow of charge, measured in amperes (coulombs per second).'
    })),
    typeanswer(() => {
      const v = pick([6, 9, 12]), r = pick([3, 4, 6]);
      return {
        cg: 'P11-3',
        q: `A ${r} Ω resistor is connected to a ${v} V battery. What current flows (A)? Use Ohm's law V=IR.`,
        answer: v / r,
        tolerance: 0.05,
        explain: `I = V/R = ${v}/${r} = ${v/r} A.`
      };
    }),
    mcq(() => ({
      cg: 'P11-4',
      q: 'In a series circuit with two resistors, what stays the same through both?',
      opts: ['Voltage', 'Current', 'Resistance', 'Power'],
      answer: 1,
      explain: 'In series, there is only one path, so the same current flows through every component. Voltage divides between them in proportion to resistance.'
    })),
    mcq(() => ({
      cg: 'P11-5',
      q: 'In a parallel circuit with two resistors, what stays the same across both branches?',
      opts: ['Current', 'Voltage', 'Resistance', 'Charge'],
      answer: 1,
      explain: 'Each parallel branch connects directly to the same two points, so each sees the full battery voltage. Current divides between branches according to their resistance.'
    })),
    truefalse(() => ({
      cg: 'P11-6',
      q: 'Power lines use very high voltage mainly to make the current smaller for the same delivered power, which greatly reduces I²R heating losses.',
      answer: true,
      explain: 'Since P = IV, raising V for fixed P lowers I. Since line losses scale as I²R, even a 10× drop in current cuts losses by 100×.'
    })),
    fillblank(() => ({
      cg: 'P11-7',
      q: "Kirchhoff's Current Law says the total current flowing into a junction equals the total current flowing ___.",
      answer: 'out',
      accept: ['out', 'Out'],
      explain: 'KCL is just conservation of charge applied to a junction — current in = current out, since charge cannot pile up at a point in steady state.'
    })),
    typeanswer(() => {
      const c = pick([2, 5, 10]), v = pick([6, 9, 12]);
      return {
        cg: 'P11-8',
        q: `A ${c} μF capacitor is charged to ${v} V. How much charge does it store (in μC)? Use Q = CV.`,
        answer: c * v,
        tolerance: 0.1,
        explain: `Q = CV = ${c} × ${v} = ${c*v} μC.`
      };
    })
  ],

  // ── C2 : Atomic structure ──
  C2: [
    mcq(() => ({
      cg: 'C2-1',
      q: 'Carbon-12 and carbon-14 are both carbon, with identical chemistry. What differs between them?',
      opts: ['Number of protons', 'Number of electrons', 'Number of neutrons', 'Atomic number'],
      answer: 2,
      explain: 'Isotopes share the same number of protons (and so the same chemistry) but differ in neutron count, giving different mass numbers.'
    })),
    fillblank(() => ({
      cg: 'C2-2',
      q: 'The atomic number Z is the number of ___ in the nucleus.',
      answer: 'protons',
      accept: ['protons', 'Protons'],
      distractors: ['neutrons', 'electrons', 'nucleons'],
      explain: 'Z, the atomic number, counts protons — it uniquely identifies the element and fixes its position on the periodic table.'
    })),
    truefalse(() => ({
      cg: 'C2-3',
      q: 'The first electron shell can hold up to 8 electrons, just like the second shell.',
      answer: false,
      explain: 'Shell 1 holds a maximum of 2 electrons. Shell 2 holds up to 8. Capacities grow as you move outward (2, 8, 18, 32...).'
    })),
    typeanswer(() => {
      const z = pick([11, 17, 12]);
      const names = {11: 'sodium (Na)', 17: 'chlorine (Cl)', 12: 'magnesium (Mg)'};
      return {
        cg: 'C2-4',
        q: `A neutral atom of ${names[z]} has Z = ${z}. How many electrons does it have?`,
        answer: z,
        tolerance: 0,
        explain: `In a neutral atom, the number of electrons equals the number of protons (Z), so it has ${z} electrons.`
      };
    }),
    mcq(() => ({
      cg: 'C2-5',
      q: 'Why does sodium (2,8,1) readily lose one electron to become Na⁺?',
      opts: [
        'Because sodium is radioactive',
        'Because losing one electron gives it the same stable full-shell configuration as neon (2,8)',
        'Because sodium has no electrons to begin with',
        'Because Na⁺ has more mass than Na'
      ],
      answer: 1,
      explain: 'Losing its one lonely valence electron leaves sodium with the configuration 2,8 — identical to neon\'s stable, full-shell arrangement.'
    })),
    mcq(() => ({
      cg: 'C2-6',
      q: 'Why are noble gases chemically inert under most conditions?',
      opts: [
        'They have no electrons at all',
        'Their outer electron shell is already completely full',
        'They are radioactive',
        'They only exist at very high temperatures'
      ],
      answer: 1,
      explain: 'A completely filled outer shell is exceptionally stable, so noble gases have nothing to gain or lose by reacting — hence they rarely form compounds.'
    }))
  ],

  // ── C3 : Chemical bonding ──
  C3: [
    mcq(() => ({
      cg: 'C3-1',
      q: 'What is the fundamental reason atoms bond together?',
      opts: [
        'To increase their mass',
        'To reach a lower, more stable energy state, usually a full outer shell',
        'Because they are forced to by external pressure',
        'Bonding has no real cause — it just happens randomly'
      ],
      answer: 1,
      explain: 'Bonding happens because the bonded configuration has lower total energy than the separated atoms — almost always by achieving a noble-gas-like full outer shell.'
    })),
    truefalse(() => ({
      cg: 'C3-2',
      q: 'In ionic bonding, individual NaCl "molecules" exist, just like individual H₂O molecules in covalent bonding.',
      answer: false,
      explain: 'Ionic compounds form an extended repeating lattice of alternating ions, not discrete molecules — there is no single "molecule" of NaCl, unlike covalent H₂O.'
    })),
    fillblank(() => ({
      cg: 'C3-3',
      q: 'In covalent bonding, atoms achieve stability by ___ electron pairs rather than transferring them.',
      answer: 'sharing',
      accept: ['sharing', 'Sharing'],
      distractors: ['transferring', 'donating', 'removing'],
      explain: 'Covalent bonding is electron sharing: both nuclei are attracted to the same shared pair, gluing the atoms together.'
    })),
    mcq(() => ({
      cg: 'C3-4',
      q: 'What gives metals their electrical conductivity, malleability, and lustre, all from the same cause?',
      opts: [
        'A rigid lattice with no free electrons',
        'Delocalised electrons that move freely throughout the metal lattice',
        'Covalent bonds between metal atoms',
        'The metal atoms are not actually bonded at all'
      ],
      answer: 1,
      explain: 'In metallic bonding, valence electrons form a mobile "sea" not tied to any one atom — this sea carries current, conducts heat, allows layers of ions to slide (malleability), and interacts with light (lustre).'
    })),
    truefalse(() => ({
      cg: 'C3-5',
      q: 'A double bond (like in O=O) involves sharing two electron pairs, and is generally stronger and shorter than a single bond.',
      answer: true,
      explain: 'Double bonds share two pairs of electrons (versus one in a single bond), making them shorter and stronger — triple bonds (sharing three pairs) are even more so.'
    }))
  ],

  // ── C4 : Reactions & molecular architecture ──
  C4: [
    typeanswer(() => {
      const m = pick([40, 60, 80, 120]);
      return {
        cg: 'C4-1',
        q: `NaOH has molar mass 40 g/mol. How many moles are in ${m} g? Use n = m/M.`,
        answer: m / 40,
        tolerance: 0.05,
        explain: `n = m/M = ${m}/40 = ${m/40} moles.`
      };
    }),
    mcq(() => ({
      cg: 'C4-2',
      q: 'Why is chlorine\'s relative atomic mass listed as 35.5, not a whole number?',
      opts: [
        'Chlorine atoms have half a neutron',
        'It is a weighted average of naturally occurring isotopes (mostly Cl-35 and Cl-37)',
        'It is a rounding error on the periodic table',
        'Chlorine does not really have a fixed mass'
      ],
      answer: 1,
      explain: 'No single atom weighs 35.5 u. The periodic table value is the weighted average across chlorine\'s naturally occurring isotopes (~75% Cl-35, ~25% Cl-37).'
    })),
    truefalse(() => ({
      cg: 'C4-3',
      q: 'In an ionic compound like NaCl, there exists a single discrete "molecule" of NaCl, just as there is a discrete molecule of H₂O.',
      answer: false,
      explain: 'Ionic compounds form a giant repeating lattice of alternating ions, not discrete molecules — there is no single NaCl unit, unlike covalent H₂O.'
    })),
    mcq(() => ({
      cg: 'C4-4',
      q: 'Diamond and graphite are both pure carbon but have opposite properties (hardest substance vs. soft enough to write with). Why?',
      opts: [
        'They are actually different elements',
        'Graphite contains impurities that diamond does not',
        'The same atoms are bonded in different patterns — diamond is a rigid 3D network, graphite is layered sheets with delocalised electrons',
        'Diamond is just compressed graphite with no structural difference'
      ],
      answer: 2,
      explain: 'Same element, different bonding pattern: diamond\'s rigid tetrahedral network makes it the hardest natural substance; graphite\'s weakly-bonded sliding sheets make it soft and conductive.'
    })),
    fillblank(() => ({
      cg: 'C4-5',
      q: 'According to VSEPR theory, molecular shape is determined by electron pairs arranging themselves to minimise ___.',
      answer: 'repulsion',
      accept: ['repulsion', 'Repulsion'],
      distractors: ['attraction', 'energy', 'distance'],
      explain: 'Electron pairs (bonding and lone) repel each other and spread out as far apart as possible — this single rule predicts linear, tetrahedral, bent, and pyramidal shapes.'
    })),
    mcq(() => ({
      cg: 'C4-6',
      q: 'CO₂ has polar C=O bonds, yet the molecule as a whole is non-polar. Why?',
      opts: [
        'Carbon dioxide does not actually have polar bonds',
        'The linear shape makes the two bond dipoles point in opposite directions and cancel exactly',
        'Oxygen is not electronegative enough to create a dipole',
        'Non-polar molecules cannot have polar bonds, by definition'
      ],
      answer: 1,
      explain: 'CO₂\'s linear geometry means the two C=O bond dipoles point in exactly opposite directions and cancel — shape determines whether bond polarities add up or cancel.'
    })),
    truefalse(() => ({
      cg: 'C4-7',
      q: 'Methane (CH₄) and water (H₂O) have similar molecular masses, yet water boils at a vastly higher temperature because of hydrogen bonding.',
      answer: true,
      explain: 'Water has strong hydrogen bonds (plus dipole-dipole and dispersion forces); methane, being non-polar, only has weak London dispersion forces — explaining the 261°C difference in boiling points.'
    })),
    mcq(() => ({
      cg: 'C4-8',
      q: 'In a balanced chemical equation, what are you allowed to change to balance atom counts?',
      opts: [
        'The subscripts within formulas',
        'The coefficients in front of formulas',
        'Either subscripts or coefficients, whichever is easier',
        'Nothing — equations are already balanced when written'
      ],
      answer: 1,
      explain: 'Only coefficients (numbers placed before formulas) may be adjusted. Changing a subscript changes which compound you\'re talking about entirely.'
    })),
    mcq(() => ({
      cg: 'C4-9',
      q: 'By the Brønsted-Lowry definition, what is an acid?',
      opts: ['A substance that tastes sour', 'A proton (H⁺) donor', 'A proton (H⁺) acceptor', 'Any substance with pH below 10'],
      answer: 1,
      explain: 'Brønsted-Lowry: an acid donates a proton (H⁺); a base accepts one. This works even without water as a solvent, unlike the older Arrhenius definition.'
    })),
    typeanswer(() => {
      const ph = pick([3, 5, 9, 11]);
      return {
        cg: 'C4-10',
        q: `A solution has pH ${ph}. Is it acidic, neutral, or alkaline? (type "acidic", "neutral", or "alkaline")`,
        answer: ph < 7 ? 'acidic' : ph === 7 ? 'neutral' : 'alkaline',
        accept: [ph < 7 ? 'acidic' : ph === 7 ? 'neutral' : 'alkaline'],
        explain: `pH < 7 is acidic, pH = 7 is neutral, pH > 7 is alkaline. pH ${ph} is ${ph < 7 ? 'acidic' : ph === 7 ? 'neutral' : 'alkaline'}.`
      };
    })
  ],

  // ── C5 : Redox, electrochemistry & kinetics ──
  C5: [
    mcq(() => ({
      cg: 'C5-1',
      q: 'Using the OIL RIG mnemonic, what is oxidation?',
      opts: ['Oxidation Is Loss of electrons', 'Oxidation Includes Lone electrons', 'Oxidation Is Largest', 'Oxidation Involves Lithium'],
      answer: 0,
      explain: 'OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons).'
    })),
    truefalse(() => ({
      cg: 'C5-2',
      q: 'In a redox reaction, the substance that loses electrons is called the reducing agent.',
      answer: true,
      explain: 'The species that loses electrons (is oxidised) is called the reducing agent, because it causes the other species to be reduced by supplying electrons.'
    })),
    fillblank(() => ({
      cg: 'C5-3',
      q: 'Oxidation is an ___ in oxidation number; reduction is a decrease.',
      answer: 'increase',
      accept: ['increase', 'Increase'],
      explain: 'Oxidation number rises when a species is oxidised (loses electrons, becomes more positive) and falls when reduced.'
    })),
    mcq(() => ({
      cg: 'C5-4',
      q: 'An exothermic reaction (ΔH < 0) means:',
      opts: [
        'The reaction absorbs energy from the surroundings',
        'The reaction releases energy to the surroundings, and the surroundings get warmer',
        'The reaction has no energy change at all',
        'The products always have more enthalpy than the reactants'
      ],
      answer: 1,
      explain: 'Exothermic = energy released to the surroundings (ΔH < 0); the products end up at lower enthalpy than the reactants.'
    })),
    mcq(() => ({
      cg: 'C5-5',
      q: "What does Hess's Law say about the enthalpy change of a reaction?",
      opts: [
        'It depends on how fast the reaction occurs',
        'It depends only on the initial and final states, not the route taken',
        'It can only be measured directly, never calculated indirectly',
        'It is always positive'
      ],
      answer: 1,
      explain: 'Hess\'s Law: total enthalpy change is independent of the pathway — a direct consequence of enthalpy being a state function. This lets you calculate ΔH for reactions you can\'t measure directly.'
    })),
    truefalse(() => ({
      cg: 'C5-6',
      q: 'Activation energy is always positive, even for a reaction that releases energy overall (exothermic).',
      answer: true,
      explain: 'Every reaction — exothermic or endothermic — must climb over an energy barrier (the transition state) before it can proceed. E_a is always positive.'
    })),
    mcq(() => ({
      cg: 'C5-7',
      q: 'According to collision theory, why does increasing temperature speed up a reaction?',
      opts: [
        'It increases the mass of the reacting particles',
        'It increases the fraction of particles with energy ≥ activation energy, and increases collision frequency',
        'It removes the need for activation energy entirely',
        'Temperature has no real effect on reaction rate'
      ],
      answer: 1,
      explain: 'Higher temperature raises the average kinetic energy of particles, increasing both the collision frequency and the fraction of collisions with enough energy to react.'
    })),
    truefalse(() => ({
      cg: 'C5-8',
      q: 'A catalyst speeds up a reaction by increasing the activation energy needed.',
      answer: false,
      explain: 'A catalyst LOWERS the activation energy by providing an alternative reaction pathway — it speeds up the reaction without being consumed, and without changing ΔH or the equilibrium position.'
    })),
    fillblank(() => ({
      cg: 'C5-9',
      q: 'In electrolysis and electrochemical cells, the electrode where oxidation occurs is called the ___.',
      answer: 'anode',
      accept: ['anode', 'Anode'],
      explain: 'Mnemonic "AN OX, RED CAT": ANode = OXidation, REDuction = CAThode.'
    }))
  ],

  // ── P12 : Force & torque — rotational dynamics ──
  P12: [
    mcq(() => ({
      cg: 'P12-1',
      q: 'Torque is the rotational analogue of force. What is the formula for its magnitude?',
      opts: ['τ = m a', 'τ = r F sin θ', 'τ = F / r', 'τ = m r²'],
      answer: 1,
      explain: 'τ = rF sin θ, where θ is the angle between the position vector (pivot to point of application) and the force. Equivalently, τ = F × d, force times the perpendicular lever arm.'
    })),
    truefalse(() => ({
      cg: 'P12-2',
      q: 'A couple (two equal, opposite, parallel forces) produces translation of the centre of mass, just like a single force.',
      answer: false,
      explain: 'A couple has zero net force, so it produces NO translation — only pure rotation. Its torque is also independent of which point you measure it about.'
    })),
    fillblank(() => ({
      cg: 'P12-3',
      q: 'A rigid body is in complete static equilibrium when ΣF = 0 AND Σ___ = 0.',
      answer: 'τ',
      accept: ['τ', 'torque', 'Torque'],
      explain: 'Equilibrium requires BOTH zero net force (no translational acceleration) and zero net torque (no angular acceleration) about any point.'
    })),
    typeanswer(() => {
      const m = pick([2, 4, 6]), r = pick([0.2, 0.3, 0.5]);
      const I = 0.5 * m * r * r;
      return {
        cg: 'P12-4',
        q: `A solid disc of mass ${m} kg and radius ${r} m rotates about its central axis. Using I = ½MR², what is its moment of inertia (kg·m²)?`,
        answer: Math.round(I * 1000) / 1000,
        tolerance: 0.01,
        explain: `I = ½MR² = ½ × ${m} × ${r}² = ½ × ${m} × ${(r*r).toFixed(2)} = ${Math.round(I*1000)/1000} kg·m².`
      };
    }),
    mcq(() => ({
      cg: 'P12-5',
      q: "Newton's second law for rotation is Στ = Iα. What plays the role of mass in this rotational analogue?",
      opts: ['Angular velocity ω', 'Angular momentum L', 'Moment of inertia I', 'Radius r'],
      answer: 2,
      explain: 'In the rotational analogue, τ↔F, I↔m, α↔a. Moment of inertia is the rotational equivalent of mass — resistance to a change in rotational motion.'
    })),
    truefalse(() => ({
      cg: 'P12-6',
      q: 'If a spinning skater pulls their arms in (decreasing their moment of inertia) with no external torque, their angular velocity must increase to conserve angular momentum.',
      answer: true,
      explain: 'L = Iω is conserved when no external torque acts. If I decreases, ω must increase proportionally to keep L constant — exactly why skaters spin faster with arms tucked in.'
    })),
    mcq(() => ({
      cg: 'P12-7',
      q: 'For an object rolling without slipping, what provides the friction at the contact point, and does it do work?',
      opts: [
        'Kinetic friction acts there and does negative work',
        'Static friction acts there (the contact point is instantaneously at rest) and does no work',
        'No friction is needed for rolling',
        'Friction does positive work, speeding up the object'
      ],
      answer: 1,
      explain: 'In rolling without slipping, the contact point is momentarily at rest, so static friction acts there. Since the contact point doesn\'t move, that friction force does zero work.'
    }))
  ],

  // ── P13 : Reflection & refraction ──
  P13: [
    mcq(() => ({
      cg: 'P13-1',
      q: 'The law of reflection states that:',
      opts: [
        'The angle of incidence is always 90°',
        'The angle of incidence equals the angle of reflection, both measured from the normal',
        'Light always reflects straight back the way it came',
        'Reflection only happens off smooth surfaces'
      ],
      answer: 1,
      explain: 'θ_incidence = θ_reflection, both measured from the normal to the surface — true for both specular (smooth) and diffuse (rough) reflection at the microscopic level.'
    })),
    truefalse(() => ({
      cg: 'P13-2',
      q: 'The image formed by a plane mirror is virtual, the same size as the object, and laterally inverted (left-right swapped).',
      answer: true,
      explain: 'A plane mirror image is virtual (can\'t be projected on a screen), erect, same size (m=+1), and laterally inverted — all standard properties.'
    })),
    typeanswer(() => {
      const v = pick([20, 30, 60]), u = pick([10, 15, 20]);
      const f = (u*v)/(u+v);
      return {
        cg: 'P13-3',
        q: `Using 1/f = 1/v + 1/u, if v = ${v} cm and u = ${u} cm, what is f (cm)? (round to 1 decimal)`,
        answer: Math.round(f * 10) / 10,
        tolerance: 0.2,
        explain: `1/f = 1/${v} + 1/${u} = ${(1/v).toFixed(4)} + ${(1/u).toFixed(4)} = ${(1/v+1/u).toFixed(4)}, so f = ${Math.round(f*10)/10} cm.`
      };
    }),
    mcq(() => ({
      cg: 'P13-4',
      q: 'Light bends toward the normal when it enters a medium that is:',
      opts: ['Optically less dense (lower refractive index)', 'Optically denser (higher refractive index)', 'Exactly the same density', 'A vacuum'],
      answer: 1,
      explain: 'Entering a denser medium slows the light down, which bends the ray toward the normal. Entering a rarer medium bends it away from the normal.'
    })),
    fillblank(() => ({
      cg: 'P13-5',
      q: "Snell's Law is written n₁ sin θ₁ = n₂ sin ___.",
      answer: 'θ₂',
      accept: ['θ2', 'θ₂', 'theta2', 'theta_2'],
      explain: 'n₁ sin θ₁ = n₂ sin θ₂ — the products of refractive index and the sine of the angle are equal on both sides of the boundary.'
    })),
    mcq(() => ({
      cg: 'P13-6',
      q: 'Total internal reflection can only occur when light travels:',
      opts: [
        'From a rarer medium into a denser medium',
        'From a denser medium into a rarer medium, at an angle beyond the critical angle',
        'Through a vacuum',
        'At exactly normal incidence'
      ],
      answer: 1,
      explain: 'TIR requires going from higher to lower refractive index (denser to rarer) AND exceeding the critical angle θ_c, where sin θ_c = n₂/n₁.'
    })),
    truefalse(() => ({
      cg: 'P13-7',
      q: 'Dispersion occurs because different wavelengths of light have slightly different refractive indices in a given material.',
      answer: true,
      explain: 'Since n varies with wavelength (violet bends more than red, generally), white light splits into its component colours when refracted through a prism — this is dispersion.'
    })),
    mcq(() => ({
      cg: 'P13-8',
      q: 'A convex (converging) lens has a positive focal length. What does a concave (diverging) lens have?',
      opts: ['Also a positive focal length', 'A negative focal length', 'No focal length at all', 'An infinite focal length always'],
      answer: 1,
      explain: 'By convention, convex/converging lenses have f > 0 (real focus); concave/diverging lenses have f < 0 (virtual focus, where diverging rays appear to come from).'
    }))
  ],

  // ── P14 : Thermodynamics ──
  P14: [
    mcq(() => ({
      cg: 'P14-1',
      q: 'What is the key difference between temperature and heat?',
      opts: [
        'They are exactly the same thing',
        'Temperature measures average particle kinetic energy (intensive); heat is energy transferred due to a temperature difference (extensive)',
        'Heat is measured in kelvin; temperature is measured in joules',
        'Temperature only applies to gases'
      ],
      answer: 1,
      explain: 'Temperature is an intensive property (independent of amount) describing average kinetic energy. Heat is energy in transit, extensive (depends on amount), measured in joules.'
    })),
    fillblank(() => ({
      cg: 'P14-2',
      q: 'Absolute zero, 0 K, is equal to ___ °C.',
      answer: '-273.15',
      accept: ['-273.15', '-273', '−273.15', '−273'],
      explain: 'T(K) = T(°C) + 273.15, so 0 K corresponds to −273.15°C — the theoretical lower limit of temperature.'
    })),
    typeanswer(() => {
      const m = pick([0.5, 1, 2]), c = 4200, dT = pick([10, 20, 30]);
      const Q = m * c * dT;
      return {
        cg: 'P14-3',
        q: `Using Q = mcΔT with m = ${m} kg, c = 4200 J/(kg·K) (water), ΔT = ${dT} K, how much heat (J) is needed?`,
        answer: Q,
        tolerance: 1,
        explain: `Q = mcΔT = ${m} × 4200 × ${dT} = ${Q} J.`
      };
    }),
    truefalse(() => ({
      cg: 'P14-4',
      q: 'During a phase change (like ice melting), temperature stays constant while heat is still being absorbed.',
      answer: true,
      explain: 'During a phase change, all the added energy goes into breaking/rearranging intermolecular bonds (latent heat, Q=mL), not into raising temperature — temperature stays flat on a heating curve during melting/boiling.'
    })),
    mcq(() => ({
      cg: 'P14-5',
      q: "Boyle's Law (constant temperature) states that pressure and volume of a gas are related how?",
      opts: ['Directly proportional (P ∝ V)', 'Inversely proportional (P ∝ 1/V), so P₁V₁ = P₂V₂', 'Unrelated', 'Proportional to the square of volume'],
      answer: 1,
      explain: "Boyle's Law: at constant temperature, P ∝ 1/V — compress a gas and its pressure rises proportionally, giving P₁V₁ = P₂V₂."
    })),
    mcq(() => ({
      cg: 'P14-6',
      q: 'The first law of thermodynamics, ΔU = Q − W, is a statement of:',
      opts: ['Conservation of momentum', 'Conservation of energy', 'The second law of motion', 'Conservation of entropy'],
      answer: 1,
      explain: 'ΔU = Q − W says the change in internal energy equals heat added minus work done by the system — energy is conserved, just redistributed between heat, work, and internal energy.'
    })),
    truefalse(() => ({
      cg: 'P14-7',
      q: 'In an adiabatic process, no heat is exchanged with the surroundings (Q = 0).',
      answer: true,
      explain: 'Adiabatic means Q = 0 by definition — any change in internal energy comes entirely from work: ΔU = −W.'
    })),
    mcq(() => ({
      cg: 'P14-8',
      q: 'The Carnot efficiency η = 1 − T_c/T_h represents:',
      opts: [
        'The efficiency of a specific real engine',
        'The maximum possible efficiency of ANY heat engine operating between two temperatures',
        'The minimum efficiency required by law',
        'An efficiency that can reach 100% if T_h is large enough'
      ],
      answer: 1,
      explain: 'The Carnot efficiency is the theoretical upper bound — no real heat engine operating between T_h and T_c can exceed it, and η = 1 only if T_c = 0 K, which is unreachable.'
    }))
  ],

  // ── M10 : Problem-solving heuristics I (Polya) ──
  M10: [
    mcq(() => ({
      cg: 'M10-1',
      q: "Polya's first step in problem-solving is to understand the problem. What three things should you identify?",
      opts: [
        'The title, the author, and the page number',
        'The unknown, the data, and the condition linking them',
        'The difficulty level, the topic, and the time limit',
        'The formula, the units, and the final answer'
      ],
      answer: 1,
      explain: 'Polya\'s Step 1: identify the unknown (what you want), the data (what you\'re given), and the condition (the relationship connecting them) — "a problem well understood is half solved."'
    })),
    truefalse(() => ({
      cg: 'M10-2',
      q: "According to Polya, 'looking back' after solving a problem (checking the result, the reasoning, and whether the method transfers) is an optional final step that can usually be skipped.",
      answer: false,
      explain: 'Polya treats "looking back" as essential, not optional — it\'s where you verify correctness AND extract a reusable method for future problems.'
    })),
    fillblank(() => ({
      cg: 'M10-3',
      q: "In Thompson's 'dodge' for differentiation, after expanding f(x+dx), you discard terms containing (dx) raised to the power of ___ or higher.",
      answer: '2',
      accept: ['2', 'two'],
      explain: 'Terms with (dx)² or higher are treated as negligibly small compared to terms with just dx — this is the core simplification in Thompson\'s method of increments.'
    })),
    mcq(() => ({
      cg: 'M10-4',
      q: 'What is the "working backwards" heuristic?',
      opts: [
        'Redoing a problem you already solved',
        'Starting from the unknown and asking what earlier quantity would determine it, repeating until you reach something known',
        'Solving the problem upside down on paper',
        'Giving up and looking up the answer'
      ],
      answer: 1,
      explain: 'Working backwards starts at the goal and chains backward ("what would give me this?") until it connects to known data — then you reverse direction and solve forward.'
    })),
    mcq(() => ({
      cg: 'M10-5',
      q: 'Why is "draw a figure" considered such a powerful heuristic across physics, optics, and algebra?',
      opts: [
        'It makes the answer automatically correct',
        'It forces you to make knowns, unknowns, and relationships explicit and visible, which often reveals the missing connection',
        'Diagrams are required by exam rules',
        'It replaces the need for any equations'
      ],
      answer: 1,
      explain: 'A figure externalises the structure of the problem — labelling knowns, unknowns, forces, or rays — often revealing relationships that are hard to see in words alone.'
    })),
    truefalse(() => ({
      cg: 'M10-6',
      q: 'The "inventor\'s paradox" observes that a more general/ambitious version of a problem can sometimes be easier to solve than the narrow special case.',
      answer: true,
      explain: 'Polya\'s inventor\'s paradox: the general problem may have more symmetry or invite a standard method, while the special case is messier because it has broken that symmetry.'
    })),
    mcq(() => ({
      cg: 'M10-7',
      q: 'If you are stuck on a problem, one of Polya\'s diagnostic questions is "did you use all the data?" Why is this useful?',
      opts: [
        'It is not useful — extra data is usually irrelevant',
        'An unused number or condition is often exactly the missing equation you need',
        'It tells you the answer directly',
        'It only applies to geometry problems'
      ],
      answer: 1,
      explain: 'If the system seems underdetermined, checking for unused data (explicit numbers or implicit conditions like "starts from rest") often reveals the missing equation.'
    }))
  ],

  // ── M11 : Problem-solving heuristics II ──
  M11: [
    mcq(() => ({
      cg: 'M11-1',
      q: 'Dimensional analysis (testing by dimension) checks an equation by:',
      opts: [
        'Plugging in random numbers',
        'Verifying both sides have identical fundamental dimensions (mass, length, time, etc.)',
        'Counting the number of terms',
        'Checking if the answer is positive'
      ],
      answer: 1,
      explain: 'Both sides of any valid physical equation must have identical dimensions — you cannot add a speed to a force. Mismatched dimensions mean the equation is definitely wrong.'
    })),
    truefalse(() => ({
      cg: 'M11-2',
      q: 'If two physical quantities have matching dimensions, the equation relating them is therefore guaranteed to be correct.',
      answer: false,
      explain: 'Matching dimensions is necessary but not sufficient — a dimensionally consistent equation can still have the wrong numerical constant or structure. It only rules out certain errors.'
    })),
    fillblank(() => ({
      cg: 'M11-3',
      q: 'Proof by contradiction (reductio ad absurdum) works by assuming the ___ of what you want to prove, then deriving a contradiction.',
      answer: 'negation',
      accept: ['negation', 'Negation', 'opposite'],
      explain: 'You assume the negation, reason validly from it, and if you reach a contradiction, the negation must be false — so the original statement must be true.'
    })),
    mcq(() => ({
      cg: 'M11-4',
      q: 'The power rule for differentiation states d(xⁿ)/dx equals:',
      opts: ['xⁿ⁺¹/(n+1)', 'nxⁿ⁻¹', 'n·x', 'xⁿ/n'],
      answer: 1,
      explain: 'The power rule: d(xⁿ)/dx = nxⁿ⁻¹, valid for any real exponent n — the atomic building block of differentiation.'
    })),
    typeanswer(() => {
      const n = pick([3, 4, 5]);
      return {
        cg: 'M11-5',
        q: `Using the power rule, what is the derivative of x^${n} with respect to x, evaluated as the coefficient (i.e., what is n in nx^(n-1))?`,
        answer: n,
        tolerance: 0,
        explain: `d(x^${n})/dx = ${n}x^${n-1} — the power rule simply brings the exponent down as a multiplying coefficient.`
      };
    }),
    mcq(() => ({
      cg: 'M11-6',
      q: 'The chain rule, dy/dx = (dy/du)(du/dx), is used when:',
      opts: [
        'Differentiating a simple polynomial term',
        'You have a function of a function, y = f(g(x))',
        'Adding two functions together',
        'Only when integrating, never when differentiating'
      ],
      answer: 1,
      explain: 'The chain rule handles "nested" functions: differentiate the outer function with respect to the inner, then multiply by the derivative of the inner function.'
    })),
    truefalse(() => ({
      cg: 'M11-7',
      q: 'According to Polya, "problems to find" and "problems to prove" require the same solving strategy.',
      answer: false,
      explain: 'Problems to find work from data toward an unknown quantity; problems to prove work from a hypothesis toward a logical conclusion — different structures, different strategies.'
    })),
    mcq(() => ({
      cg: 'M11-8',
      q: 'A Fermi estimation problem is solved by:',
      opts: [
        'Looking up the exact answer in a table',
        'Breaking the unknown into estimable pieces, rounding aggressively, and combining the estimates',
        'Refusing to answer without exact data',
        'Using only exact, never approximate, arithmetic'
      ],
      answer: 1,
      explain: 'Fermi estimation breaks a hard-to-know quantity into pieces you CAN roughly estimate (each to about one significant figure or order of magnitude), then combines them.'
    }))
  ],

  // ── M12 : Problem-solving — vectors & matrices ──
  M12: [
    mcq(() => ({
      cg: 'M12-1',
      q: 'When you need to find the angle between two vectors, which operation should you reach for?',
      opts: ['Cross product', 'Dot product, via cos θ = (a⃗·b⃗)/(|a||b|)', 'Scalar multiplication', 'Matrix inversion'],
      answer: 1,
      explain: 'The dot product directly relates to the cosine of the angle between vectors — it is the standard tool for finding angles or checking perpendicularity (dot product = 0).'
    })),
    mcq(() => ({
      cg: 'M12-2',
      q: 'A memory anchor for choosing between dot and cross product: "DOT rhymes with hot" (gives a scalar). What does "CROSS" suggest?',
      opts: [
        'It always gives zero',
        'An "X" marking a direction in space — it gives a vector, perpendicular to both inputs',
        'It only works in 2D',
        'It is the same as the dot product'
      ],
      answer: 1,
      explain: 'Cross product gives a VECTOR result (like torque or angular momentum), perpendicular to both input vectors — useful whenever the answer needs to be a direction in space, not just a magnitude.'
    })),
    truefalse(() => ({
      cg: 'M12-3',
      q: 'When choosing coordinate axes for a vector problem, the choice of axes affects the physics, not just the bookkeeping.',
      answer: false,
      explain: 'The axes are purely your choice for convenience (e.g., aligning with the slope) — the physics and the final answer don\'t change, only the components do.'
    })),
    fillblank(() => ({
      cg: 'M12-4',
      q: 'Before attempting to invert a matrix or solve a system uniquely, the heuristic is to first check the ___ — if it is zero, the matrix is singular.',
      answer: 'determinant',
      accept: ['determinant', 'Determinant'],
      explain: 'det(A) = 0 means A is singular: no unique inverse exists, and Ax=b either has no solution or infinitely many.'
    })),
    mcq(() => ({
      cg: 'M12-5',
      q: 'To verify a computed matrix inverse A⁻¹ is correct, what check should you perform?',
      opts: [
        'Check that A⁻¹ has the same entries as A',
        'Multiply A⁻¹A (and AA⁻¹) and confirm both equal the identity matrix I',
        'Check that A⁻¹ is bigger than A',
        'No check is needed if the formula was applied correctly'
      ],
      answer: 1,
      explain: 'The definitive check: A⁻¹A = AA⁻¹ = I. If this doesn\'t hold, the inverse was computed incorrectly somewhere.'
    })),
    truefalse(() => ({
      cg: 'M12-6',
      q: 'Matrix multiplication AB and BA always give the same result, just like ordinary number multiplication.',
      answer: false,
      explain: 'Matrix multiplication is generally NOT commutative — AB ≠ BA. This is a constant source of errors if not checked explicitly, especially when composing transformations.'
    })),
    mcq(() => ({
      cg: 'M12-7',
      q: 'Viewing a 2×2 matrix as a transformation, what do its two columns represent?',
      opts: [
        'Random numbers with no geometric meaning',
        'The images of the standard basis vectors î and ĵ after the transformation',
        'The eigenvalues of the matrix',
        'The rows of the inverse matrix'
      ],
      answer: 1,
      explain: 'For A = [a b; c d], the first column (a,c) is where î = (1,0) ends up, and the second column (b,d) is where ĵ = (0,1) ends up — this is the geometric heart of matrix-as-transformation.'
    }))
  ],

  // ── M13 : Lockhart's algebra — foundations ──
  M13: [
    mcq(() => ({
      cg: 'M13-1',
      q: "Lockhart's 'al-jabr' metaphor describes solving an equation as:",
      opts: [
        'Randomly guessing values until one works',
        'Untangling a knot — undoing operations in reverse order while preserving equality',
        'Memorising a list of unrelated tricks',
        'A purely mechanical process with no creative element'
      ],
      answer: 1,
      explain: '"Al-jabr" (the origin of "algebra") means "the mending of broken bones" — Lockhart frames equation-solving as systematically untangling a knot, the same operation undone in reverse on both sides.'
    })),
    truefalse(() => ({
      cg: 'M13-2',
      q: "In Lockhart's framework, a 'field' is defined by what the elements ARE (e.g., that they must be numbers) rather than how they behave.",
      answer: false,
      explain: 'The opposite is true: a field is defined entirely by STRUCTURE — two operations satisfying nine axioms. What the elements "are" metaphysically is irrelevant; only how they combine matters.'
    })),
    fillblank(() => ({
      cg: 'M13-3',
      q: 'An additive inverse exists for every element in any field by the field axioms, but being "negative" (less than zero) requires the field to also be ___.',
      answer: 'ordered',
      accept: ['ordered', 'Ordered', 'an ordered field'],
      explain: 'Lockhart distinguishes "having an additive inverse" (universal to all fields) from "being negative" (specific to ordered fields like the reals — complex numbers have additive inverses but no order).'
    })),
    mcq(() => ({
      cg: 'M13-4',
      q: 'Why can the complex numbers ℂ not be ordered the way the real numbers ℝ can?',
      opts: [
        'Because ℂ has too many elements',
        'Because there is no way to define a consistent < relation on ℂ that respects the field axioms',
        'Because complex numbers are not really numbers',
        'Because ℂ is a subset of ℝ'
      ],
      answer: 1,
      explain: 'ℂ is algebraically closed but cannot be given an order consistent with its field structure — this is one of the trade-offs in extending from ℝ to ℂ.'
    })),
    mcq(() => ({
      cg: 'M13-5',
      q: 'According to Lockhart\'s "layered" view of the real numbers, which property is logically independent of the algebraic (field) structure?',
      opts: [
        'Order — you can have algebra (like ℂ) without an order relation',
        'Addition',
        'Multiplication',
        'The number 1'
      ],
      answer: 0,
      explain: 'Order is a separate layer from the algebraic structure — ℂ is a field (algebra) with no order; ℚ has order without being complete/continuous. The layers are independent.'
    })),
    truefalse(() => ({
      cg: 'M13-6',
      q: "Lockhart's distinction between 'pedantry' and 'mastery' is that pedantry means applying rules mechanically, while mastery means understanding principles well enough to adapt to novel situations.",
      answer: true,
      explain: 'Pedantry works only for routine, template-matching problems. Mastery comes from understanding WHY a method works, which lets you adapt it when the problem deviates from the template.'
    })),
    mcq(() => ({
      cg: 'M13-7',
      q: "What is Lockhart's central claim about why mathematicians use metaphors and analogies (knots, shadows, ladders)?",
      opts: [
        'Metaphors are purely decorative and could be removed without loss',
        'Humans need imaginative connections to invent and understand proofs — the metaphor is the vehicle that gets you to the formal proof',
        'Mathematical proofs themselves require metaphorical language to be valid',
        'Only beginners need metaphors; experts work in pure symbols'
      ],
      answer: 1,
      explain: '"We make analogies in order to connect two trees with a tightrope" — Lockhart argues metaphor is how humans generate the insight needed to discover and understand proofs, not how proofs are formally validated.'
    }))
  ],

  // ── M14 : Lockhart's algebra — symmetry & roots ──
  M14: [
    mcq(() => ({
      cg: 'M14-1',
      q: "Lockhart's 'finger dance' and 'copy-machine' are kinesthetic/visual metaphors for which two fraction operations?",
      opts: ['Addition and subtraction', 'Addition and multiplication', 'Squaring and rooting', 'Rounding and estimating'],
      answer: 1,
      explain: 'The "finger dance" (criss-cross snapping) is for fraction addition a/b + c/d; the "copy-machine" (enlarge/shrink) is for fraction multiplication a/b × c/d.'
    })),
    truefalse(() => ({
      cg: 'M14-2',
      q: 'The Greek discovery that √2 cannot be written as a fraction (the commensurability crisis) showed that the rational numbers ℚ are too small to fully describe geometry.',
      answer: true,
      explain: 'The diagonal of a unit square is incommensurable with its side — no fraction equals √2 — revealing that ℚ has "gaps" that geometry needs the real numbers ℝ to fill.'
    })),
    fillblank(() => ({
      cg: 'M14-3',
      q: "The Euclidean algorithm finds the GCD of two numbers by repeated division with ___.",
      answer: 'remainder',
      accept: ['remainder', 'Remainder'],
      explain: 'Each step divides the larger number by the smaller and keeps the remainder, replacing the pair with a smaller pair that has the same GCD — repeating until the remainder is zero.'
    })),
    mcq(() => ({
      cg: 'M14-4',
      q: "What is the key distinction Lockhart draws between 'irreducible' and 'prime' elements?",
      opts: [
        'They are exactly the same thing in every number system',
        'Irreducible means it cannot be factored further; prime means it divides a product only if it divides one of the factors — these coincide in ℤ but not in every domain',
        'Prime numbers are always larger than irreducible numbers',
        'Irreducibility only applies to even numbers'
      ],
      answer: 1,
      explain: 'In ℤ, irreducible and prime coincide, but in other domains (like ℤ[√−5]) they diverge — 6 = 2×3 = (1+√−5)(1−√−5), where all four factors are irreducible but none is prime, breaking unique factorisation.'
    })),
    mcq(() => ({
      cg: 'M14-5',
      q: "In Lockhart's 'shadows on the wall' metaphor for modular arithmetic, what does ℤₙ represent?",
      opts: [
        'A completely unrelated number system',
        'A "shadow" of ℤ that preserves arithmetic structure (addition/multiplication relationships) while blurring distinctions between elements',
        'The set of all negative integers',
        'A system with no connection to divisibility'
      ],
      answer: 1,
      explain: '"Turning on the n light" casts ℤ\'s shadow onto ℤₙ — true arithmetic statements in ℤ remain true mod n, even though individual numbers become indistinguishable within their residue class.'
    })),
    truefalse(() => ({
      cg: 'M14-6',
      q: "Lockhart constructs the complex numbers ℂ by taking real polynomials ℝ[X] and treating X² + 1 as zero — no mysterious external 'imaginary number' is needed.",
      answer: true,
      explain: 'ℝ[X]/(X²+1) ≅ ℂ: every polynomial collapses to a+bX where X plays the role of i, built entirely from real polynomials with no external magic ingredient required.'
    })),
    mcq(() => ({
      cg: 'M14-7',
      q: "Lockhart's 'selling the cow for magic beans' metaphor describes the move of factoring x² − Px + Q = (x−a)(x−b) and matching coefficients. Why is this a good trade despite introducing more unknowns?",
      opts: [
        'It isn\'t a good trade — it just makes things more complicated',
        'The new system (a+b=P, ab=Q) is symmetric in a and b, and that symmetry can be exploited to solve for the roots',
        'It eliminates the need for a quadratic formula entirely',
        'It only works for equations with no real roots'
      ],
      answer: 1,
      explain: 'Trading one "lifeless" equation for a symmetric system in a and b gives you something to act on: the swap symmetry a↔b is what lets you extract a−b = ±√(P²−4Q), deriving the quadratic formula from symmetry alone.'
    })),
    mcq(() => ({
      cg: 'M14-8',
      q: 'Why does squaring the antisymmetric part ½(a−b) produce something symmetric?',
      opts: [
        'It is a coincidence with no deeper reason',
        'Because a number and its negative have the same square — swapping a and b negates (a−b), but (a−b)² is unaffected by that sign flip',
        'Because squaring always produces a smaller number',
        'Because a and b must be equal'
      ],
      answer: 1,
      explain: '(a−b) flips sign under the swap a↔b (antisymmetric), but (a−b)² does not, since (−x)² = x² — this is exactly the structural fact that lets the discriminant be expressed in terms of the symmetric P and Q.'
    }))
  ],

  // ── P15 : Gravitation & orbits ── (exemplar 4-band quiz: super-easy → hard)
  P15: [
    // ───────── SUPER-EASY (Warm-up — memorisation & confidence) ─────────
    matchQuestion(() => ({
      cg: 'P15-SE1',
      q: 'Match each gravitation symbol or term to what it means.',
      pairs: [
        ['G', 'the universal gravitational constant'],
        ['g', 'gravitational field strength (N/kg)'],
        ['weight', 'the force of gravity on a mass (mg)'],
        ['escape velocity', 'speed needed to leave a planet forever']
      ],
      explain: 'G is the same everywhere in the universe; g is the local field strength (≈9.8 N/kg at Earth\'s surface); weight = mg; escape velocity is the launch speed needed to never fall back.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P15-SE2',
      q: "Newton's law of gravitation says that every mass ___ every other mass in the universe.",
      answer: 'attracts',
      accept: ['attracts', 'pulls', 'attract', 'pulls on'],
      explain: 'Gravity is universal and always attractive — every mass pulls on every other mass, with a force given by F = Gm₁m₂/r².'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P15-SE3',
      q: "In the equation F = Gm₁m₂/r², what does the letter G stand for?",
      opts: ['Gravity on Earth (9.8)', 'The universal gravitational constant', 'The mass of the Earth', 'The distance between the masses'],
      answer: 1,
      explain: 'G is the universal gravitational constant, 6.67×10⁻¹¹ N·m²/kg² — the same value everywhere. It is not the same as little g, the local field strength.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P15-SE4',
      q: 'Gravity is always an attractive (pulling) force — it never pushes two masses apart.',
      answer: true,
      explain: 'Unlike electric charges, mass comes in only one "sign," so gravity is always attractive — it only ever pulls masses together.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P15-SE5',
      q: 'The further apart two objects are, the weaker the gravitational pull between them.',
      answer: true,
      explain: 'Gravity follows an inverse-square law (F ∝ 1/r²): as distance grows, the force drops off rapidly.'
    }), 'super-easy'),

    // ───────── EASY (Recall — confidence continues, one short step up) ─────────
    mcq(() => ({
      cg: 'P15-E1',
      q: 'Gravity follows an inverse-square law. If you double the distance between two masses, the force becomes:',
      opts: ['Twice as strong', 'Half as strong', 'One quarter as strong', 'Unchanged'],
      answer: 2,
      explain: 'F ∝ 1/r². Doubling r multiplies the force by 1/2² = 1/4 — it becomes one quarter as strong.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P15-E2',
      q: 'Mass and weight are the same thing, just measured in different units.',
      answer: false,
      explain: 'Mass (kg) is intrinsic and never changes. Weight (N) = mg is the gravitational force on that mass and depends on where you are — your weight changes on the Moon, your mass does not.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P15-E3',
      q: 'Weight is calculated as mass multiplied by ___ (the gravitational field strength).',
      answer: 'g',
      accept: ['g', 'gravity', 'gravitational field strength', 'gravitational acceleration'],
      explain: 'Weight = mg. Near Earth\'s surface g ≈ 9.8 N/kg, so a 1 kg mass weighs about 9.8 N.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P15-E4',
      q: "Match each of Kepler's three laws to what it states.",
      pairs: [
        ["Kepler's 1st law", 'orbits are ellipses, Sun at one focus'],
        ["Kepler's 2nd law", 'equal areas swept in equal times'],
        ["Kepler's 3rd law", 'T² is proportional to a³']
      ],
      explain: 'First: the shape (ellipse). Second: the speed rule (faster when closer). Third: the period–size relation, T² ∝ a³.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P15-E5',
      q: 'An astronaut floating in the International Space Station feels weightless. The main reason is:',
      opts: [
        'There is no gravity that far from Earth',
        'The station and astronaut are in continuous free fall around Earth together',
        'The station blocks the Earth\'s gravity',
        'The astronaut\'s mass becomes zero in space'
      ],
      answer: 1,
      explain: 'Gravity in orbit is still ~90% of its surface value. Weightlessness is free fall: the station and everything in it accelerate together, so there is no contact force to feel.'
    }), 'easy'),

    // ───────── MEDIUM (Apply — use the idea, not just recall it) ─────────
    mcq(() => ({
      cg: 'P15-M1',
      q: "By Kepler's Second Law, where in its elliptical orbit does a planet move fastest?",
      opts: ['At its farthest point from the Sun (aphelion)', 'At its closest point to the Sun (perihelion)', 'It moves at constant speed throughout', 'Exactly halfway along the orbit'],
      answer: 1,
      explain: 'Equal areas in equal times means the planet must sweep faster when the radius is short — so it moves fastest at perihelion (closest) and slowest at aphelion (farthest).'
    }), 'medium'),
    truefalse(() => ({
      cg: 'P15-M2',
      q: 'A heavier spacecraft needs a higher escape velocity than a light one to leave the same planet.',
      answer: false,
      explain: 'v_e = √(2GM/R) depends only on the planet\'s mass and radius — the escaping object\'s own mass cancels out. A pebble and a rocket have the same escape velocity from a given planet.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P15-M3',
      q: "Kepler's Second Law (equal areas in equal times) is a direct consequence of the conservation of ___.",
      answer: 'angular momentum',
      accept: ['angular momentum', 'angular momentum.'],
      explain: 'Gravity is a central force (always aimed at the Sun), so it exerts zero torque about the Sun — making angular momentum L = mr²ω constant, which is exactly the equal-areas rule.'
    }), 'medium'),
    typeanswer(() => ({
      cg: 'P15-M4',
      q: "Earth's surface gravity is g₀ at radius R from its centre. Using g ∝ 1/r², at a distance of 2R from the centre gravity is what fraction of g₀? (decimal, e.g. 0.50)",
      answer: 0.25,
      tolerance: 0.01,
      explain: 'g ∝ 1/r². At 2R, g = g₀ / 2² = g₀/4 = 0.25 g₀.'
    }), 'medium'),
    mcq(() => ({
      cg: 'P15-M5',
      q: 'To move a satellite from a low orbit to a higher one, then settle into the higher orbit, its orbital speed must end up:',
      opts: ['Faster than before', 'Slower than before', 'Exactly the same', 'Zero'],
      answer: 1,
      explain: 'v_orb = √(GM/r): a larger orbital radius means a slower orbital speed. (You must briefly fire engines to climb, but the final higher orbit is slower than the original lower one.)'
    }), 'medium'),

    // ───────── HARD (Exam level — SAT / competition style) ─────────
    typeanswer(() => {
      const a = pick([4, 9, 16, 25]);
      const T = Math.round(Math.pow(a, 1.5));
      return {
        cg: 'P15-H1',
        q: `A planet orbits the Sun with a semi-major axis of a = ${a} AU. Using Kepler's Third Law T² = a³ (T in years), what is its orbital period in years?`,
        answer: T,
        tolerance: 0.5,
        explain: `T = √(a³) = a^1.5 = ${a}^1.5 = ${T} years.`
      };
    }, 'hard'),
    typeanswer(() => {
      const k = pick([4, 8, 9]);
      const ratio = Math.round(Math.pow(k, 1.5));
      return {
        cg: 'P15-H2',
        q: `Satellite B orbits at ${k} times the orbital radius of satellite A around the same planet. By Kepler's Third Law (T ∝ r^1.5), B's period is how many times A's period?`,
        answer: ratio,
        tolerance: 0.5,
        explain: `T ∝ r^1.5, so the ratio is ${k}^1.5 = ${ratio}.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P15-H3',
      q: 'At a given orbital radius, how does the escape velocity compare to the circular orbital speed?',
      opts: ['They are equal', 'Escape velocity is √2 times the orbital speed', 'Escape velocity is twice the orbital speed', 'Orbital speed is larger than escape velocity'],
      answer: 1,
      explain: 'v_esc = √(2GM/r) and v_orb = √(GM/r), so v_esc = √2 · v_orb ≈ 1.41 × the orbital speed at the same radius.'
    }), 'hard'),
    mcq(() => ({
      cg: 'P15-H4',
      q: 'The total mechanical energy of a satellite in a bound circular orbit is E = −GMm/2r. The negative sign tells us that:',
      opts: [
        'The satellite has negative mass',
        'The satellite is gravitationally bound — energy must be added to free it',
        'The orbit is decaying',
        'The kinetic energy is negative'
      ],
      answer: 1,
      explain: 'Negative total energy means the orbit is bound: you would have to supply energy (to reach E = 0) for the satellite to just barely escape to infinity. KE is positive (+GMm/2r); the larger negative PE dominates.'
    }), 'hard'),
    typeanswer(() => {
      const vorb = pick([5, 6, 8, 10]);
      const vesc = Math.round(vorb * Math.SQRT2 * 100) / 100;
      return {
        cg: 'P15-H5',
        q: `A satellite's circular orbital speed at some radius is ${vorb} km/s. Escape velocity at that radius is √2 times larger. What is the escape velocity, in km/s (2 d.p.)?`,
        answer: vesc,
        tolerance: 0.1,
        explain: `v_esc = √2 · v_orb = 1.414 × ${vorb} = ${vesc} km/s.`
      };
    }, 'hard'),
    truefalse(() => ({
      cg: 'P15-H6',
      q: 'Tidal forces fall off with distance more steeply than gravity itself — as 1/r³ rather than 1/r².',
      answer: true,
      explain: 'Tidal force comes from the difference in gravity across a body. Differentiating the 1/r² force with respect to r introduces an extra factor of 1/r, giving a 1/r³ dependence — which is why the Moon raises tides but the far more massive Sun raises smaller ones.'
    }), 'hard')
  ],

  // ── P16 : Heat transfer — conduction, convection, radiation ──
  P16: [
    mcq(() => ({
      cg: 'P16-1',
      q: "Fourier's law of conduction says the rate of heat flow through a slab is proportional to:",
      opts: [
        'The volume of the slab',
        'The cross-sectional area and the temperature gradient',
        'The colour of the slab only',
        'The time elapsed only'
      ],
      answer: 1,
      explain: 'H = kA(T₁−T₂)/L — heat current is proportional to area A and the temperature difference, and inversely proportional to thickness L, scaled by the material\'s thermal conductivity k.'
    })),
    truefalse(() => ({
      cg: 'P16-2',
      q: 'Metals generally have high thermal conductivity because heat is carried efficiently by free electrons.',
      answer: true,
      explain: 'In metals, the same free electrons responsible for electrical conductivity also transport thermal energy efficiently — about 95% of heat conduction in metals is electronic, not lattice vibration.'
    })),
    typeanswer(() => {
      const k = pick([0.5, 1, 2]), A = 2, dT = pick([20, 30, 50]), L = pick([0.1, 0.2]);
      const H = k * A * dT / L;
      return {
        cg: 'P16-3',
        q: `Using H = kA(ΔT)/L with k = ${k} W/(m·K), A = ${A} m², ΔT = ${dT} K, L = ${L} m, what is the heat current H (W)?`,
        answer: H,
        tolerance: 0.5,
        explain: `H = ${k} × ${A} × ${dT} / ${L} = ${H} W.`
      };
    }),
    mcq(() => ({
      cg: 'P16-4',
      q: 'For thermal resistances arranged in series (like layers of a wall), the equivalent resistance is found by:',
      opts: [
        'Adding the resistances: R_eq = R₁ + R₂ + ...',
        'Adding the reciprocals: 1/R_eq = 1/R₁ + 1/R₂ + ...',
        'Multiplying the resistances',
        'Taking the average'
      ],
      answer: 0,
      explain: 'Series thermal resistances add directly (same heat current flows through each layer) — exactly analogous to series electrical resistors. Parallel paths use the reciprocal-sum rule instead.'
    })),
    truefalse(() => ({
      cg: 'P16-5',
      q: 'Convection requires the bulk movement of a fluid, unlike conduction which can occur in a stationary solid.',
      answer: true,
      explain: 'Convection transports heat via moving fluid (natural, driven by buoyancy, or forced, driven by a fan/pump) — it fundamentally requires fluid motion, unlike conduction which works through a stationary medium.'
    })),
    mcq(() => ({
      cg: 'P16-6',
      q: "Newton's law of cooling predicts that an object's temperature approaches ambient temperature:",
      opts: ['Linearly with time', 'Exponentially with time', 'Not at all — temperature stays constant', 'Instantaneously'],
      answer: 1,
      explain: 'T(t) = T_s + (T₀−T_s)e^(−kt) — an exponential decay toward the ambient temperature T_s, valid when the rate of heat loss is proportional to the temperature difference.'
    })),
    fillblank(() => ({
      cg: 'P16-7',
      q: 'The Stefan-Boltzmann law states that the power radiated per unit area by a black body is proportional to T raised to the power of ___.',
      answer: '4',
      accept: ['4', 'four', 'fourth'],
      explain: 'P/A = σT⁴ — radiated power depends on the FOURTH power of absolute temperature, which is why even modest temperature increases dramatically increase radiated power.'
    })),
    mcq(() => ({
      cg: 'P16-8',
      q: "Kirchhoff's law of radiation states that, at thermal equilibrium, a material's absorptivity and emissivity are:",
      opts: ['Always different', 'Equal at every wavelength', 'Unrelated to each other', 'Both equal to zero'],
      answer: 1,
      explain: 'α(λ) = ε(λ) — a good absorber at a given wavelength is necessarily a good emitter at that same wavelength, a consequence of the second law of thermodynamics.'
    })),
    truefalse(() => ({
      cg: 'P16-9',
      q: "The natural greenhouse effect (without any human influence) keeps Earth's surface about 33°C warmer than it would otherwise be.",
      answer: true,
      explain: "Without greenhouse gases, Earth's effective radiating temperature would be about 255 K (−18°C); the actual average surface temperature is ~288 K (+15°C) — a 33°C difference from selective absorption/re-emission of infrared by atmospheric gases."
    })),
    mcq(() => ({
      cg: 'P16-10',
      q: 'A vacuum (thermos) flask minimises heat loss by all three mechanisms. How does it block radiation specifically?',
      opts: [
        'It cannot block radiation at all',
        'Low-emissivity reflective coatings on the vacuum-facing surfaces',
        'By using a thick layer of metal',
        'By keeping the contents under high pressure'
      ],
      answer: 1,
      explain: 'The vacuum eliminates conduction and convection (no medium between the walls); reflective, low-emissivity coatings minimise radiative transfer across that vacuum gap.'
    }))
  ],

  // ── P17 : Magnetism & electromagnetic induction ──
  P17: [
    mcq(() => ({
      cg: 'P17-1',
      q: 'The magnetic force on a moving charge, F = qv × B, has what key property regarding work done?',
      opts: [
        'It always does positive work, speeding the charge up',
        'It does zero work, since it is always perpendicular to the velocity',
        'It does negative work, always slowing the charge down',
        'It does work proportional to the charge\'s mass'
      ],
      answer: 1,
      explain: 'F_B = qv×B is always perpendicular to v, so F⃗·v⃗ = 0 — the magnetic force can change a particle\'s direction but never its speed or kinetic energy.'
    })),
    typeanswer(() => {
      const m = pick([2,4,8]), B = pick([0.5,1,2]);
      const q = 1;
      const period = (2 * Math.PI * m) / (q * B);
      return {
        cg: 'P17-2',
        q: `For a charged particle (q=1, arbitrary units) of mass ${m} kg in a uniform field B = ${B} T, using T = 2πm/(qB), what is the cyclotron period (in seconds, to 2 decimals)? Note this is independent of speed.`,
        answer: Math.round(period * 100) / 100,
        tolerance: 0.05,
        explain: `T = 2π(${m})/(1×${B}) = ${Math.round(period*100)/100} s — independent of the particle's speed or orbit radius.`
      };
    }),
    mcq(() => ({
      cg: 'P17-3',
      q: 'In a velocity selector (crossed E and B fields), only particles with a specific velocity pass straight through. That velocity is:',
      opts: ['v = E × B', 'v = E/B', 'v = B/E', 'v = E + B'],
      answer: 1,
      explain: 'The electric and magnetic forces balance exactly when qE = qvB, giving v = E/B — independent of the particle\'s charge or mass, so it selects purely by speed.'
    })),
    truefalse(() => ({
      cg: 'P17-4',
      q: 'The force on a current-carrying wire in a magnetic field depends on the current, the field strength, and the angle between the wire and the field.',
      answer: true,
      explain: 'F = BIL sin θ — the force depends on B, current I, length L, and sin θ where θ is the angle between the wire and B; the force is zero when the wire is parallel to B.'
    })),
    mcq(() => ({
      cg: 'P17-5',
      q: 'The torque on a current loop in a magnetic field, τ = m × B, is maximised when:',
      opts: [
        'The magnetic moment m is parallel to B',
        'The magnetic moment m is perpendicular to B',
        'The current is zero',
        'The loop has no area'
      ],
      answer: 1,
      explain: 'τ = mB sin θ is maximum at θ = 90° (m perpendicular to B) and zero when m is aligned with B (θ=0, stable equilibrium) or anti-aligned (θ=180°, unstable equilibrium).'
    })),
    fillblank(() => ({
      cg: 'P17-6',
      q: 'The magnetic field from a long straight wire falls off as 1/r, while the field from a magnetic dipole (bar magnet) falls off as 1/r raised to the power ___.',
      answer: '3',
      accept: ['3', 'three', 'cubed'],
      explain: 'A long wire is essentially an infinite line source, giving B ∝ 1/r. A dipole\'s two opposite poles partially cancel at a distance, giving a steeper 1/r³ falloff.'
    })),
    mcq(() => ({
      cg: 'P17-7',
      q: "Inside an ideal long solenoid carrying current I with n turns per unit length, the magnetic field B is:",
      opts: ['Zero everywhere inside', 'Uniform: B = μ₀nI', 'Strongest at the ends, weakest in the middle', 'Equal to the field outside the solenoid'],
      answer: 1,
      explain: 'B = μ₀nI is uniform throughout the interior of an ideal (long, tightly-wound) solenoid — contributions from all the turns combine to cancel radial variation, while the field outside is essentially zero.'
    })),
    truefalse(() => ({
      cg: 'P17-8',
      q: 'Diamagnetism is present in all materials, including those with no unpaired electrons, while paramagnetism and ferromagnetism require unpaired electron spins.',
      answer: true,
      explain: 'Diamagnetism arises from Lenz\'s-law-like response of orbiting electrons and is universal. Paramagnetism and ferromagnetism additionally require unpaired electron spins that can align with an external field.'
    })),
    mcq(() => ({
      cg: 'P17-9',
      q: "Faraday's law states that the induced EMF in a loop equals:",
      opts: [
        'The magnetic flux through the loop',
        'The negative rate of change of magnetic flux through the loop',
        'The current in the loop',
        'Zero, always'
      ],
      answer: 1,
      explain: 'ε = −dΦ/dt (or −N dΦ/dt for N turns) — only a CHANGING flux induces an EMF; a steady flux, no matter how large, induces nothing.'
    })),
    mcq(() => ({
      cg: 'P17-10',
      q: "Lenz's law (the minus sign in Faraday's law) exists because:",
      opts: [
        'It is just a mathematical convention with no physical meaning',
        'Without it, induced currents would reinforce the flux change, creating a runaway energy-from-nothing feedback loop',
        'It only matters for AC circuits',
        'It describes the direction of conventional current flow only'
      ],
      answer: 1,
      explain: 'If the induced current reinforced (rather than opposed) the flux change, you\'d get unbounded positive feedback — a violation of energy conservation. The minus sign in Faraday\'s law enforces opposition, consistent with energy conservation.'
    })),
    typeanswer(() => {
      const L = pick([2,4,5]), I = pick([3,6,10]);
      const U = 0.5 * L * I * I;
      return {
        cg: 'P17-11',
        q: `Using U = ½LI² with L = ${L} H and I = ${I} A, what is the energy stored in the inductor (J)?`,
        answer: U,
        tolerance: 0.5,
        explain: `U = ½ × ${L} × ${I}² = ½ × ${L} × ${I*I} = ${U} J.`
      };
    }),
    truefalse(() => ({
      cg: 'P17-12',
      q: 'Eddy currents are deliberately exploited in induction cooktops, but considered wasteful losses in transformer cores (which is why those cores are laminated).',
      answer: true,
      explain: 'The same physical phenomenon — circulating currents induced by changing flux in a bulk conductor — is useful for induction heating but a source of energy loss (heat) in transformer cores, where lamination interrupts the current paths to reduce that loss.'
    }))
  ],

  // ── M15 : Calculus — differentiation ──
  M15: [
    mcq(() => ({
      cg: 'M15-1',
      q: 'The derivative f\'(x) is defined as the limit of which quantity as h → 0?',
      opts: ['f(x+h) + f(x)', '[f(x+h) − f(x)]/h', 'f(x+h) × f(x)', 'f(x)/h'],
      answer: 1,
      explain: "f'(x) = lim(h→0) [f(x+h)−f(x)]/h — the limit of the slope of secant lines as the interval shrinks to zero, giving the slope of the tangent at that point."
    })),
    typeanswer(() => {
      const n = pick([3, 4, 5, 6]);
      return {
        cg: 'M15-2',
        q: `Using the power rule d/dx[xⁿ] = nxⁿ⁻¹, what is the coefficient n in the derivative of x^${n}?`,
        answer: n,
        tolerance: 0,
        explain: `d(x^${n})/dx = ${n}x^${n-1} — the power rule brings the exponent down as the multiplying coefficient.`
      };
    }),
    mcq(() => ({
      cg: 'M15-3',
      q: 'The product rule for (uv)\' states:',
      opts: ["(uv)' = u'v'", "(uv)' = u'v + uv'", "(uv)' = u'v − uv'", "(uv)' = uv' only"],
      answer: 1,
      explain: "(uv)' = u'v + uv' — \"first d-second plus second d-first.\" Derived from the increment method: the cross term containing du·dv is negligible and dropped."
    })),
    truefalse(() => ({
      cg: 'M15-4',
      q: 'The quotient rule and the chain rule are independent — the quotient rule cannot be derived from the product rule and chain rule together.',
      answer: false,
      explain: "The quotient rule CAN be derived from the product rule plus chain rule: writing u/v = u·v⁻¹ and differentiating gives u'v⁻¹ + u(−1)v⁻²v' = (u'v−uv')/v² — exactly the quotient rule."
    })),
    mcq(() => ({
      cg: 'M15-5',
      q: 'The chain rule dy/dx = (dy/du)(du/dx) is used when:',
      opts: [
        'Differentiating a simple polynomial term',
        'You have a composite function, y = f(g(x))',
        'Adding two derivatives together',
        'Only when integrating'
      ],
      answer: 1,
      explain: 'The chain rule handles nested ("function of a function") expressions — differentiate the outer function with respect to the inner, then multiply by the derivative of the inner function.'
    })),
    fillblank(() => ({
      cg: 'M15-6',
      q: 'd/dx[eˣ] = ___ — this function is famous for being its own derivative.',
      answer: 'eˣ',
      accept: ['eˣ', 'e^x', 'ex'],
      explain: 'eˣ is the unique function (up to scaling) that equals its own derivative — the defining property of the exponential constant e.'
    })),
    mcq(() => ({
      cg: 'M15-7',
      q: 'At a local maximum of a smooth function, what do we know about f\'(x) and f\'\'(x)?',
      opts: [
        "f'(x) = 0 and f''(x) < 0",
        "f'(x) ≠ 0 and f''(x) > 0",
        "f'(x) = 0 and f''(x) > 0",
        "Neither derivative gives any information"
      ],
      answer: 0,
      explain: "At a local max, the tangent is horizontal (f'(x)=0, a stationary point) and the curve bends downward there (f''(x)<0) — the second derivative test."
    })),
    truefalse(() => ({
      cg: 'M15-8',
      q: 'Trigonometric derivatives like d/dx[sin x] = cos x are only valid when x is measured in radians.',
      answer: true,
      explain: 'In degrees, every trig derivative would carry an extra factor of π/180 — radians are the natural unit for calculus precisely because they make these derivatives clean.'
    })),
    mcq(() => ({
      cg: 'M15-9',
      q: "L'Hôpital's rule is used to evaluate limits that have which indeterminate form(s)?",
      opts: ['Only 0/0', 'Only ∞/∞', '0/0 and ∞/∞ (directly; others after algebraic manipulation)', 'Any limit whatsoever, with no restrictions'],
      answer: 2,
      explain: "L'Hôpital's rule applies directly to 0/0 and ∞/∞. Other indeterminate forms (0·∞, ∞−∞, 0⁰, 1^∞) must first be algebraically rearranged into one of those two forms."
    })),
    mcq(() => ({
      cg: 'M15-10',
      q: 'Implicit differentiation is used when:',
      opts: [
        'y is given explicitly as y = f(x)',
        'y is defined by an equation F(x,y) = 0 that can\'t easily be solved for y',
        'There is no y in the equation at all',
        'Only constants are involved'
      ],
      answer: 1,
      explain: 'Implicit differentiation differentiates both sides of F(x,y)=0 with respect to x, applying the chain rule to any term containing y, then solves algebraically for dy/dx.'
    }))
  ],

  // ── M16 : Calculus — integration ──
  M16: [
    mcq(() => ({
      cg: 'M16-1',
      q: 'The indefinite integral ∫ f(x) dx = F(x) + C represents:',
      opts: [
        'A single unique function',
        'An entire family of antiderivatives, differing by a constant',
        'The area under the curve only',
        'The derivative of f(x)'
      ],
      answer: 1,
      explain: 'Since the derivative of any constant is zero, infinitely many functions share the same derivative f(x) — the +C captures that entire family.'
    })),
    typeanswer(() => {
      const n = pick([2, 3, 4]);
      return {
        cg: 'M16-2',
        q: `Using ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, what is the denominator (n+1) when integrating x^${n}?`,
        answer: n + 1,
        tolerance: 0,
        explain: `∫x^${n} dx = x^${n+1}/${n+1} + C.`
      };
    }),
    mcq(() => ({
      cg: 'M16-3',
      q: 'The Fundamental Theorem of Calculus (part 2) states that ∫[a,b] f(x) dx equals:',
      opts: ['F(a) − F(b)', 'F(b) − F(a), where F is any antiderivative of f', 'f(b) − f(a)', 'F(b) + F(a)'],
      answer: 1,
      explain: 'FTC 2: the definite integral equals the net change in any antiderivative, F(b)−F(a) — this is what makes definite integrals computable without summing infinitely many rectangles directly.'
    })),
    truefalse(() => ({
      cg: 'M16-4',
      q: 'Integration by substitution (u-substitution) is essentially the chain rule used in reverse.',
      answer: true,
      explain: '∫f(g(x))g\'(x)dx = ∫f(u)du with u=g(x) — exactly undoing what the chain rule does when differentiating a composite function.'
    })),
    mcq(() => ({
      cg: 'M16-5',
      q: 'The LIATE rule helps decide which factor to call "u" in integration by parts. What does it prioritize?',
      opts: [
        'Always pick the simplest-looking factor',
        'Logarithmic, then Inverse trig, then Algebraic, then Trigonometric, then Exponential — pick u from the highest-priority category present',
        'Always pick whichever factor comes first in the integral',
        'Pick u and dv at random and try both'
      ],
      answer: 1,
      explain: 'LIATE works because logs and inverse trig simplify dramatically when differentiated, while exponentials and trig functions barely change — making the "new" integral after one application of parts simpler, not harder.'
    })),
    fillblank(() => ({
      cg: 'M16-6',
      q: 'For the disk method computing a volume of revolution, the formula is V = π∫[R(x)² − r(x)²] dx, where each slice is treated as a thin ___.',
      answer: 'disk',
      accept: ['disk', 'disc', 'washer'],
      explain: 'The disk (or washer, if hollow) method sums up the volumes of infinitesimally thin disks perpendicular to the axis of rotation.'
    })),
    mcq(() => ({
      cg: 'M16-7',
      q: 'An improper integral ∫[a,∞] f(x) dx is said to "converge" when:',
      opts: [
        'The function f(x) is always positive',
        'The limit of the partial integral as the upper bound → ∞ exists and is finite',
        'f(x) reaches zero at some finite point',
        'The integral can be computed using the power rule'
      ],
      answer: 1,
      explain: 'Convergence means lim(t→∞) ∫[a,t] f(x)dx exists and is a finite number — if that limit is infinite or doesn\'t exist, the integral diverges.'
    })),
    mcq(() => ({
      cg: 'M16-8',
      q: 'Why does computing arc length using ds = √(dx² + dy²) typically lead to integrals that are very hard to evaluate?',
      opts: [
        'Arc length integrals are always trivial to solve',
        'The square root in the integrand rarely simplifies into an elementary antiderivative, except for special cases like lines and circles',
        'Arc length cannot be computed with calculus at all',
        'The formula is wrong'
      ],
      answer: 1,
      explain: 'The square root of a sum of squared derivatives resists elementary integration techniques in most cases — arc length problems are a classic source of integrals requiring numerical methods.'
    })),
    truefalse(() => ({
      cg: 'M16-9',
      q: 'When finding the area between two curves f(x) and g(x), you should always integrate f(x) − g(x) without checking which curve is on top.',
      answer: false,
      explain: 'You must determine which function is larger on each subinterval (test a point) and integrate (top − bottom); if the curves cross, you must split the interval at each crossing point and recheck.'
    }))
  ],

  // ── P18 : Calculus in physics — differentiation applications ──
  P18: [
    mcq(() => ({
      cg: 'P18-1',
      q: 'Velocity is the derivative of position with respect to time. What is acceleration?',
      opts: ['The derivative of position', 'The derivative of velocity (the second derivative of position)', 'The integral of velocity', 'The same thing as velocity'],
      answer: 1,
      explain: 'a = dv/dt = d²s/dt² — acceleration is the rate of change of velocity, i.e. the second derivative of position with respect to time.'
    })),
    truefalse(() => ({
      cg: 'P18-2',
      q: 'The SUVAT equations are exact for any acceleration, constant or variable.',
      answer: false,
      explain: 'The SUVAT equations are derived by integrating a = dv/dt assuming a is CONSTANT. For variable acceleration, you must integrate the actual a(t) function directly.'
    })),
    mcq(() => ({
      cg: 'P18-3',
      q: 'Maximum range for a projectile launched on level ground occurs at a launch angle of:',
      opts: ['30°', '45°', '60°', '90°'],
      answer: 1,
      explain: 'R(θ) = u²sin(2θ)/g is maximised when sin(2θ)=1, i.e. 2θ=90°, so θ=45° — found by setting dR/dθ=0.'
    })),
    mcq(() => ({
      cg: 'P18-4',
      q: "Newton's second law, m(d²x/dt²) = F, is described as a differential equation because:",
      opts: [
        'It contains no derivatives at all',
        'It relates a function (position) to its own derivatives, and solving it means finding that function',
        'It can only be solved by guessing',
        'F must always be zero'
      ],
      answer: 1,
      explain: "F=ma is a second-order ODE relating x(t) to its derivatives. \"Solving Newton's equations\" means integrating this ODE — given the force law and initial position/velocity — to find x(t)."
    })),
    fillblank(() => ({
      cg: 'P18-5',
      q: "Fermat's principle states that light follows the path that minimises ___, which leads directly to Snell's law.",
      answer: 'time',
      accept: ['time', 'travel time'],
      explain: "Fermat's principle of least time, when treated as a calculus optimisation problem, yields Snell's law n₁sinθ₁ = n₂sinθ₂ as the condition for minimum travel time."
    })),
    mcq(() => ({
      cg: 'P18-6',
      q: 'In a "related rates" problem (e.g., a ladder sliding down a wall), the key technique is:',
      opts: [
        'Solving the constraint equation for each variable separately',
        'Differentiating the constraint equation that links the variables, with respect to time, using the chain rule',
        'Ignoring the constraint entirely',
        'Only algebra, no calculus'
      ],
      answer: 1,
      explain: 'Related rates problems differentiate a geometric or physical constraint equation implicitly with respect to time, then substitute known values to solve for the unknown rate.'
    })),
    truefalse(() => ({
      cg: 'P18-7',
      q: 'In a capacitor, the current I = C dV/dt means current flows only while the voltage across the capacitor is changing.',
      answer: true,
      explain: 'I = C dV/dt — if V is constant (steady state DC), dV/dt = 0 and no current flows through an ideal capacitor; current only flows during charging/discharging when voltage is changing.'
    })),
    mcq(() => ({
      cg: 'P18-8',
      q: "Differentiating sin(ωt) with respect to time produces ωcos(ωt). In AC circuit terms, this represents:",
      opts: [
        'No change at all',
        'A 90° phase advance',
        'A 180° phase reversal',
        'A doubling of frequency'
      ],
      answer: 1,
      explain: 'cos(ωt) = sin(ωt + 90°) — differentiation introduces a 90° phase ADVANCE, which is the calculus origin of capacitive/inductive reactance phase shifts in AC circuits.'
    }))
  ],

  // ── P19 : Calculus in physics — integration applications ──
  P19: [
    mcq(() => ({
      cg: 'P19-1',
      q: 'Velocity is recovered from acceleration via v(t) = v₀ + ∫a(τ)dτ. What does this integral represent graphically?',
      opts: [
        'The slope of the acceleration-time graph',
        'The area under the acceleration-time graph',
        'The y-intercept of the velocity graph',
        'Nothing physical'
      ],
      answer: 1,
      explain: 'The change in velocity equals the signed area under the a(t) curve — each thin rectangle a(τ)Δτ contributes a small change in velocity, and integration sums them all.'
    })),
    mcq(() => ({
      cg: 'P19-2',
      q: 'The work done by a variable force is W = ∫F(x)dx. The work-energy theorem then says this work equals:',
      opts: ['The total momentum', 'The change in kinetic energy, ΔKE', 'The change in mass', 'Zero, always'],
      answer: 1,
      explain: 'W_net = ΔKE = ½mv_f² − ½mv_i² — the work-energy theorem links the force integral directly to the change in kinetic energy.'
    })),
    truefalse(() => ({
      cg: 'P19-3',
      q: 'Impulse J = ∫F(t)dt is useful in collision analysis because you only need the total area under the F-t curve, not the exact shape of the force profile.',
      answer: true,
      explain: 'Impulse-momentum theorem: J = Δp. Since J is just the area under F(t), you can find the momentum change without knowing the precise (often complicated) shape of the collision force over time.'
    })),
    mcq(() => ({
      cg: 'P19-4',
      q: 'The centre of mass of a continuous body is found using x_cm = (1/M)∫x dm. What does this formula represent?',
      opts: [
        'The geometric centre regardless of mass distribution',
        'A mass-weighted average position',
        'The point of maximum density',
        'An arbitrary reference point'
      ],
      answer: 1,
      explain: 'x_cm is the mass-weighted average of position — integrating x×dm over the whole body and dividing by total mass M, generalising the discrete weighted-average formula to continuous distributions.'
    })),
    typeanswer(() => {
      const M = pick([2, 4, 6]), R = pick([0.5, 1]);
      const I = 0.5 * M * R * R;
      return {
        cg: 'P19-5',
        q: `Using I = ½MR² for a solid disk of mass ${M} kg and radius ${R} m, what is the moment of inertia (kg·m²)?`,
        answer: Math.round(I * 1000) / 1000,
        tolerance: 0.01,
        explain: `I = ½ × ${M} × ${R}² = ${Math.round(I*1000)/1000} kg·m² — this formula itself comes from integrating I=∫r²dm over the disk.`
      };
    }),
    mcq(() => ({
      cg: 'P19-6',
      q: 'The centre of pressure on a submerged vertical surface lies below the centroid because:',
      opts: [
        'Pressure is uniform with depth',
        'The centre of pressure formula weights by h² (second moment), while the centroid is weighted by h (first moment) — deeper regions, with higher pressure, pull the effective centre downward',
        'Water pressure decreases with depth',
        'There is no relationship between the two points'
      ],
      answer: 1,
      explain: 'h_cp = (∫h²dA)/(∫h dA) — the h² weighting in the numerator means deeper (higher-pressure) regions contribute disproportionately, pulling the centre of pressure below the simple area centroid.'
    })),
    truefalse(() => ({
      cg: 'P19-7',
      q: 'Computing the electric potential V from a charge distribution via integration is generally easier than computing the electric field E directly, because V is a scalar while E is a vector.',
      answer: true,
      explain: 'V = k∫dq/r involves only scalar addition (superposition of potentials), whereas E⃗ = ∫k dq r̂/r² requires vector addition — V is then differentiated (E⃗=−∇V) to recover the field, often simpler overall.'
    })),
    mcq(() => ({
      cg: 'P19-8',
      q: 'Energy from a time-varying power signal is found via E = ∫P(t)dt. What does this represent?',
      opts: [
        'The instantaneous power at one moment',
        'The accumulated total energy, i.e. the area under the power-time curve',
        'The average power only',
        'The rate of change of energy'
      ],
      answer: 1,
      explain: 'Energy is the time-integral of power — the area under the P-t curve — converting an instantaneous rate (power, J/s) into an accumulated quantity (energy, J).'
    })),
    mcq(() => ({
      cg: 'P19-9',
      q: "Maxwell's equations and Newton's second law can each be written in both differential and integral form. What is the relationship between these two forms?",
      opts: [
        'They describe completely different physical laws',
        'They are equivalent — the differential form describes behavior at a point, the integral form describes behavior over a region, linked by the Fundamental Theorem of Calculus (or its generalisations)',
        'Only the differential form is physically correct',
        'The integral form is just an approximation'
      ],
      answer: 1,
      explain: 'F=dp/dt (differential) and J=∫Fdt=Δp (integral) are the same physical law in two equivalent forms — the same duality appears throughout physics via the Fundamental Theorem of Calculus and its multivariable generalisations (Stokes\', divergence theorem).'
    }))
  ],

  // ── P20 : Applied mechanics — machines, fluids & materials (Frye) ──
  P20: [
    // ───────── SUPER-EASY (Warm-up — memorisation & confidence) ─────────
    matchQuestion(() => ({
      cg: 'P20-SE1',
      q: 'Match each simple machine to what it does.',
      pairs: [
        ['Lever', 'a rigid bar that turns about a fulcrum'],
        ['Pulley', 'a wheel that redirects or shares a rope load'],
        ['Inclined plane', 'a ramp that trades distance for force'],
        ['Hydraulic press', 'multiplies force using a confined fluid']
      ],
      explain: 'All four are force multipliers: a lever pivots on a fulcrum, a pulley shares the load across rope strands, a ramp lets you push further but easier, and a hydraulic press uses fluid pressure to multiply force.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P20-SE2',
      q: 'A machine that lets you lift a big load with a small effort multiplies your force. The number measuring this is its mechanical ___.',
      answer: 'advantage',
      accept: ['advantage', 'advantage (MA)', 'mechanical advantage'],
      explain: 'Mechanical advantage (MA) = output force ÷ input force. An MA of 4 means your effort is multiplied four times.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P20-SE3',
      q: 'In a lever, the fixed point that the bar turns around is called the:',
      opts: ['Effort', 'Load', 'Fulcrum', 'Pulley'],
      answer: 2,
      explain: 'The fulcrum is the pivot. The effort is the force you apply; the load is the weight you move; the bar rotates about the fulcrum.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P20-SE4',
      q: 'An object floats when the upward buoyant force on it is at least as large as its weight.',
      answer: true,
      explain: 'Buoyancy pushes up with a force equal to the weight of fluid displaced. If that equals or exceeds the object\'s weight, it floats.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P20-SE5',
      q: 'A real machine can be more than 100% efficient, giving out more work than you put in.',
      answer: false,
      explain: 'No machine exceeds 100% efficiency — some input work is always lost to friction as heat. Output work is always less than input work.'
    }), 'super-easy'),

    // ───────── EASY (Recall — confidence continues, one short step up) ─────────
    mcq(() => ({
      cg: 'P20-E1',
      q: "Archimedes' principle says the buoyant force on a submerged object equals:",
      opts: [
        'The weight of the object',
        'The weight of the fluid the object displaces',
        'The volume of the object',
        'The density of the object'
      ],
      answer: 1,
      explain: 'Buoyant force = weight of displaced fluid = ρ_fluid × V_displaced × g. It does not depend on the object\'s own weight.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P20-E2',
      q: 'Match each principle to what it describes.',
      pairs: [
        ["Pascal's principle", 'pressure in a confined fluid is transmitted equally'],
        ["Archimedes' principle", 'buoyant force = weight of fluid displaced'],
        ["Bernoulli's principle", 'faster-moving fluid has lower pressure'],
        ["Hooke's law", 'spring force is proportional to extension']
      ],
      explain: 'These four cover fluids at rest (Pascal, Archimedes), fluids in motion (Bernoulli), and elastic solids (Hooke).'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P20-E3',
      q: "Hooke's law states that the force in a spring is proportional to its ___ from the equilibrium position.",
      answer: 'extension',
      accept: ['extension', 'displacement', 'stretch', 'x'],
      explain: 'F = kx — the restoring force grows in direct proportion to how far the spring is stretched or compressed.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P20-E4',
      q: 'In a hydraulic press, pushing a small piston a long way lets a large piston exert a bigger force over a shorter distance.',
      answer: true,
      explain: 'The fluid conserves volume: A₁d₁ = A₂d₂. The large piston gains force in the same ratio it loses distance — work in equals work out.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P20-E5',
      q: "By Bernoulli's principle, where a fluid speeds up (for example through a narrow pipe), its pressure:",
      opts: ['Increases', 'Decreases', 'Stays the same', 'Becomes zero'],
      answer: 1,
      explain: 'P + ½ρv² + ρgh is constant along a streamline, so a rise in speed v must be paid for by a drop in pressure P.'
    }), 'easy'),

    // ───────── MEDIUM (Apply — use the idea, not just recall it) ─────────
    typeanswer(() => {
      const loadArm = pick([0.1, 0.2, 0.3]);
      const ma = Math.round((1.2 / loadArm) * 10) / 10;
      return {
        cg: 'P20-M1',
        q: `A lever has an effort arm of 1.2 m and a load arm of ${loadArm} m. What is its ideal mechanical advantage (effort arm ÷ load arm)?`,
        answer: ma,
        tolerance: 0.1,
        explain: `MA = effort arm ÷ load arm = 1.2 ÷ ${loadArm} = ${ma}.`
      };
    }, 'medium'),
    typeanswer(() => {
      const slope = pick([2.4, 3.6, 4.8]);
      const ma = Math.round((slope / 1.2) * 10) / 10;
      return {
        cg: 'P20-M2',
        q: `A ramp is 1.2 m high and its sloping surface is ${slope} m long. What is the ideal mechanical advantage (slope length ÷ height)?`,
        answer: ma,
        tolerance: 0.1,
        explain: `For an inclined plane, MA = slope ÷ height = ${slope} ÷ 1.2 = ${ma}.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P20-M3',
      q: 'A pulley system has an ideal MA of 4, yet you must pull harder than the ideal 1/4 of the load. Why?',
      opts: [
        'The pulley changes the load\'s weight',
        'Friction and rope stiffness waste some input work, so efficiency is below 100%',
        'Mechanical advantage does not apply to pulleys',
        'The rope stretches and stores all the energy'
      ],
      answer: 1,
      explain: 'Real efficiency = ideal effort ÷ actual effort < 100%. The extra force overcomes friction in the bearings and the stiffness of the rope, lost as heat.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P20-M4',
      q: 'Stress in a material is defined as force divided by the ___ over which it acts.',
      answer: 'area',
      accept: ['area', 'cross-sectional area', 'cross section area'],
      explain: 'Stress σ = F/A, measured in pascals (N/m²). The same force on a smaller area produces greater stress.'
    }), 'medium'),
    typeanswer(() => {
      const h = pick([2, 5, 10]);
      const p = Math.round(1000 * 9.8 * h);
      return {
        cg: 'P20-M5',
        q: `Find the gauge pressure at a depth of ${h} m in water (ρ = 1000 kg/m³, g = 9.8 m/s²). Use P = ρgh — give the answer in pascals.`,
        answer: p,
        tolerance: 100,
        explain: `P = ρgh = 1000 × 9.8 × ${h} = ${p} Pa. Pressure depends only on depth, not on the container's shape.`
      };
    }, 'medium'),

    // ───────── HARD (Exam level — SAT / competition style) ─────────
    typeanswer(() => {
      const F = pick([4000, 6000, 8000]);
      const stress = F / 2e-4 / 1e6;
      return {
        cg: 'P20-H1',
        q: `A cable of cross-sectional area 2.0×10⁻⁴ m² carries a tension of ${F} N. What is the tensile stress, in MPa? (1 MPa = 10⁶ Pa)`,
        answer: stress,
        tolerance: 0.5,
        explain: `σ = F/A = ${F} / 2.0×10⁻⁴ = ${F / 2e-4} Pa = ${stress} MPa.`
      };
    }, 'hard'),
    typeanswer(() => {
      const V1 = pick([2, 4, 6]);
      const P2 = 100 * V1;
      return {
        cg: 'P20-H2',
        q: `${V1} L of gas at 100 kPa is compressed isothermally to 1.0 L. By Boyle's law (P₁V₁ = P₂V₂), what is the new pressure, in kPa?`,
        answer: P2,
        tolerance: 1,
        explain: `P₂ = P₁V₁/V₂ = 100 × ${V1} / 1.0 = ${P2} kPa.`
      };
    }, 'hard'),
    typeanswer(() => {
      const Aout = pick([50, 100, 250]);
      const Fout = 200 * Aout / 5;
      return {
        cg: 'P20-H3',
        q: `In a hydraulic press the small piston (area 5 cm²) is pushed with 200 N. The large piston has area ${Aout} cm². Ignoring friction, what force (N) does the large piston exert?`,
        answer: Fout,
        tolerance: 1,
        explain: `Pressure is equal throughout: F_out = F_in × (A_out/A_in) = 200 × (${Aout}/5) = ${Fout} N.`
      };
    }, 'hard'),
    typeanswer(() => {
      const k = pick([200, 400, 800]);
      const U = Math.round(0.5 * k * 0.1 * 0.1 * 100) / 100;
      return {
        cg: 'P20-H4',
        q: `A spring of stiffness ${k} N/m is stretched by 0.10 m. The elastic energy stored is U = ½kx². How many joules are stored?`,
        answer: U,
        tolerance: 0.05,
        explain: `U = ½ × ${k} × (0.10)² = ½ × ${k} × 0.01 = ${U} J.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P20-H5',
      q: 'An I-beam resists bending far better than a solid square bar of the same weight. The main reason is that:',
      opts: [
        'It is made from a stiffer alloy',
        'Most of its material sits far from the neutral axis, where it does the most to resist bending',
        'It is hollow, so it simply weighs less',
        'Its density is lower than the bar\'s'
      ],
      answer: 1,
      explain: 'Bending stiffness depends on the second moment of area I = ∫y²dA. The y² weighting means material far from the neutral axis contributes disproportionately — so an I-beam puts its flanges out at the top and bottom.'
    }), 'hard')
  ],

  // ── P21 : Oscillations & acoustics (Frye) ──
  P21: [
    // ───────── SUPER-EASY (Warm-up — memorisation & confidence) ─────────
    matchQuestion(() => ({
      cg: 'P21-SE1',
      q: 'Match each wave term to its meaning.',
      pairs: [
        ['Amplitude', 'the size of the maximum displacement'],
        ['Frequency', 'the number of cycles per second (Hz)'],
        ['Period', 'the time for one complete cycle'],
        ['Wavelength', 'the distance between two adjacent crests']
      ],
      explain: 'Amplitude is how big, frequency is how often (Hz), period is the time per cycle (T = 1/f), and wavelength is the spatial length of one cycle.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P21-SE2',
      q: 'A motion that repeats back and forth, like a swing or a pendulum, is called an ___.',
      answer: 'oscillation',
      accept: ['oscillation', 'oscillation.', 'vibration'],
      explain: 'Any repeating to-and-fro motion is an oscillation. Simple harmonic motion is the purest kind.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P21-SE3',
      q: 'The number of complete vibrations a wave makes each second is its:',
      opts: ['Amplitude', 'Wavelength', 'Frequency', 'Speed'],
      answer: 2,
      explain: 'Frequency is cycles per second, measured in hertz (Hz). It sets the pitch of a sound.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P21-SE4',
      q: 'Sound needs a medium such as air or water to travel — it cannot pass through a vacuum.',
      answer: true,
      explain: 'Sound is a vibration of matter, so it needs a medium. In a vacuum there is nothing to compress and rarefy, so sound cannot travel.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P21-SE5',
      q: 'You see a lightning flash before you hear the thunder because light travels much faster than sound.',
      answer: true,
      explain: 'Light arrives almost instantly; sound plods along at ~340 m/s. The delay (about 3 s per km) lets you estimate the distance.'
    }), 'super-easy'),

    // ───────── EASY (Recall — confidence continues, one short step up) ─────────
    mcq(() => ({
      cg: 'P21-E1',
      q: 'In simple harmonic motion, the restoring force always points:',
      opts: [
        'In the direction of motion',
        'Back toward the equilibrium (centre) position',
        'Away from the equilibrium position',
        'Straight downward'
      ],
      answer: 1,
      explain: 'SHM is defined by F = −kx: the force is opposite to the displacement, always pulling the object back toward the centre.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P21-E2',
      q: 'Match each wave behaviour to its description.',
      pairs: [
        ['Reflection', 'bouncing back off a surface'],
        ['Refraction', 'bending when the wave speed changes'],
        ['Diffraction', 'spreading out through a gap or around an edge'],
        ['Interference', 'two overlapping waves adding together']
      ],
      explain: 'All four are signatures of wave behaviour, and all follow from Huygens\' principle that every point on a wavefront is a source of new wavelets.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P21-E3',
      q: 'The wave equation links speed, frequency and wavelength as v = f × ___.',
      answer: 'wavelength',
      accept: ['wavelength', 'λ', 'lambda', 'wavelength (λ)'],
      explain: 'v = fλ. For a fixed wave speed, higher frequency means shorter wavelength.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P21-E4',
      q: 'In a transverse wave, the medium moves perpendicular to the direction the wave travels.',
      answer: true,
      explain: 'A wave on a rope is transverse: the rope moves up and down while the wave moves sideways. In a longitudinal wave (like sound) the motion is parallel to travel.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P21-E5',
      q: "An ambulance siren sounds higher-pitched as it approaches and lower as it leaves. This change is the:",
      opts: ['Bernoulli effect', 'Doppler effect', 'Resonance effect', 'Diffraction effect'],
      answer: 1,
      explain: 'The Doppler effect: approaching motion compresses the wavefronts (higher frequency), receding motion stretches them (lower frequency).'
    }), 'easy'),

    // ───────── MEDIUM (Apply — use the idea, not just recall it) ─────────
    typeanswer(() => {
      const lam = pick([0.5, 1, 2]);
      const f = Math.round(340 / lam);
      return {
        cg: 'P21-M1',
        q: `Sound travels at 340 m/s. A note has a wavelength of ${lam} m. Using f = v/λ, what is its frequency, in Hz?`,
        answer: f,
        tolerance: 1,
        explain: `f = v/λ = 340 / ${lam} = ${f} Hz.`
      };
    }, 'medium'),
    typeanswer(() => {
      const L = pick([0.25, 1.0, 2.0]);
      const T = Math.round(2 * Math.PI * Math.sqrt(L / 9.8) * 100) / 100;
      return {
        cg: 'P21-M2',
        q: `A simple pendulum has length ${L} m. Using T = 2π√(L/g) with g = 9.8 m/s², find its period in seconds (2 d.p.).`,
        answer: T,
        tolerance: 0.05,
        explain: `T = 2π√(${L}/9.8) = ${T} s. The period depends only on length and gravity, not on the bob's mass.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P21-M3',
      q: 'A simple pendulum has period T = 2π√(L/g). If you quadruple its length, the period becomes:',
      opts: ['Unchanged', 'Twice as long', 'Four times as long', 'Half as long'],
      answer: 1,
      explain: 'T ∝ √L. Multiplying L by 4 multiplies T by √4 = 2 — the period doubles.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P21-M4',
      q: 'On a stretched string vibrating in a standing wave, the points that never move are called ___.',
      answer: 'nodes',
      accept: ['nodes', 'node', 'a node'],
      explain: 'Nodes are points of zero displacement; the points of maximum motion midway between them are antinodes.'
    }), 'medium'),
    truefalse(() => ({
      cg: 'P21-M5',
      q: 'The period of a simple pendulum depends on the mass of the bob you hang from it.',
      answer: false,
      explain: 'T = 2π√(L/g) contains no mass term. A light washer and a heavy cannonball on the same string swing with the same period — the extra restoring force on a heavier bob is exactly cancelled by its extra inertia.'
    }), 'medium'),

    // ───────── HARD (Exam level — SAT / competition style) ─────────
    typeanswer(() => {
      const vs = pick([20, 40, 60]);
      const f = Math.round(800 * 340 / (340 - vs));
      return {
        cg: 'P21-H1',
        q: `A siren emits 800 Hz and approaches you at ${vs} m/s (speed of sound 340 m/s). Using f' = f₀·c/(c − vₛ), what frequency do you hear, to the nearest Hz?`,
        answer: f,
        tolerance: 2,
        explain: `f' = 800 × 340 / (340 − ${vs}) = ${f} Hz — higher than 800 Hz because the source is approaching.`
      };
    }, 'hard'),
    typeanswer(() => {
      const L = pick([0.5, 1.0, 1.5]);
      const f1 = Math.round(300 / (2 * L));
      return {
        cg: 'P21-H2',
        q: `A string fixed at both ends has a wave speed of 300 m/s and a length of ${L} m. The fundamental frequency is f₁ = v/(2L). What is f₁, in Hz?`,
        answer: f1,
        tolerance: 1,
        explain: `f₁ = v/(2L) = 300 / (2 × ${L}) = ${f1} Hz. Higher harmonics are integer multiples of this.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P21-H3',
      q: 'A pipe closed at one end (like a clarinet) resonates with which set of harmonics?',
      opts: [
        'All harmonics: 1, 2, 3, 4, ...',
        'Only the odd harmonics: 1, 3, 5, ...',
        'Only the even harmonics: 2, 4, 6, ...',
        'Only the fundamental, with no overtones'
      ],
      answer: 1,
      explain: 'A closed end forces a displacement node and the open end an antinode, which only odd harmonics satisfy (f_n = n·v/4L, n = 1, 3, 5…). This gives the clarinet its hollow timbre and a fundamental an octave below an open pipe of the same length.'
    }), 'hard'),
    typeanswer(() => {
      const d = pick([2, 3, 5]);
      const f2 = 440 + d;
      return {
        cg: 'P21-H4',
        q: `Two tuning forks at 440 Hz and ${f2} Hz are sounded together. What beat frequency, in Hz, do you hear?`,
        answer: d,
        tolerance: 0.1,
        explain: `Beat frequency = |f₁ − f₂| = |440 − ${f2}| = ${d} Hz — the loudness throbs ${d} times per second.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P21-H5',
      q: 'An aircraft flies at Mach 2 (twice the speed of sound). The shock-wave cone behind it has a half-angle θ given by sin θ = c/v. What is θ?',
      opts: ['0°', '30°', '45°', '60°'],
      answer: 1,
      explain: 'sin θ = c/v = 1/M = 1/2, so θ = arcsin(0.5) = 30°. The faster the aircraft, the narrower the Mach cone.'
    }), 'hard')
  ],

  // ── P22 : Applied electricity — batteries, AC & radio (Frye) ──
  P22: [
    matchQuestion(() => ({
      cg: 'P22-SE1',
      q: 'Match each electrical term to its meaning.',
      pairs: [
        ['AC', 'current that periodically reverses direction'],
        ['DC', 'current that flows one way only'],
        ['Frequency', 'cycles per second, in hertz'],
        ['Battery', 'converts chemical energy into electrical energy']
      ],
      explain: 'A battery is a chemical-to-electrical converter; AC reverses while DC does not; frequency counts cycles per second.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P22-SE2',
      q: 'A battery converts ___ energy into electrical energy.',
      answer: 'chemical',
      accept: ['chemical', 'chemical energy'],
      explain: 'A voltaic cell turns the energy of a spontaneous redox reaction directly into electrical energy.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P22-SE3',
      q: 'A single standard dry cell (like a AA battery) has an EMF of about:',
      opts: ['1.5 V', '12 V', '230 V', '0.5 V'],
      answer: 0,
      explain: 'The zinc–manganese-dioxide electrode pair fixes the EMF at about 1.5 V per cell, whatever the cell\'s size.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P22-SE4',
      q: 'Alternating current (AC) periodically reverses its direction, unlike direct current (DC).',
      answer: true,
      explain: 'AC swings back and forth (a sine wave); DC flows steadily in one direction, as from a battery.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P22-SE5',
      q: 'Mains electricity runs at 50 Hz in much of the world and 60 Hz in the Americas.',
      answer: true,
      explain: 'Europe, Asia and Africa standardised on 50 Hz; the Americas and Japan largely use 60 Hz.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P22-E1',
      q: 'When mains AC is labelled "230 V", that figure is the:',
      opts: ['Peak voltage', 'RMS (root-mean-square) voltage', 'Average voltage', 'Maximum possible voltage'],
      answer: 1,
      explain: 'The quoted value is the RMS voltage — the equivalent steady voltage that delivers the same power. The peak is √2 × 230 ≈ 325 V.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P22-E2',
      q: 'Match each idea to what it does.',
      pairs: [
        ['AM', 'varies the carrier amplitude with the audio'],
        ['FM', 'varies the carrier frequency with the audio'],
        ['Radar', 'finds range from the echo of a radio pulse'],
        ['Resonance', 'occurs when X_L equals X_C']
      ],
      explain: 'AM and FM are two ways to ride audio on a carrier; radar times echoes; series resonance is the X_L = X_C condition.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P22-E3',
      q: 'For a sine wave, the RMS voltage equals the peak voltage divided by ___.',
      answer: '√2',
      accept: ['√2', 'root 2', 'sqrt(2)', '1.414', 'square root of 2', '2^0.5'],
      explain: 'V_rms = V_peak/√2 ≈ 0.707 V_peak for a sinusoid.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P22-E4',
      q: 'A capacitor blocks direct current (DC) but lets alternating current (AC) pass.',
      answer: true,
      explain: 'Capacitive reactance X_C = 1/(2πfC) is infinite at f = 0 (DC blocked) and falls as frequency rises (AC passes).'
    }), 'easy'),
    mcq(() => ({
      cg: 'P22-E5',
      q: 'FM radio is clearer than AM during a thunderstorm mainly because:',
      opts: [
        'FM uses a higher transmitter power',
        'Most noise adds amplitude variations, which FM ignores by encoding sound as frequency changes',
        'FM signals travel further',
        'AM cannot carry music'
      ],
      answer: 1,
      explain: 'Lightning and electrical noise are amplitude spikes. FM reads frequency, not amplitude, so it rejects that noise (and shows the capture effect, locking to the stronger station).'
    }), 'easy'),

    typeanswer(() => {
      const Vp = pick([100, 170, 310]);
      const v = Math.round(Vp / Math.SQRT2 * 10) / 10;
      return {
        cg: 'P22-M1',
        q: `A sine wave has a peak voltage of ${Vp} V. What is its RMS voltage (V_peak/√2), to 1 d.p.?`,
        answer: v,
        tolerance: 0.2,
        explain: `V_rms = ${Vp}/√2 = ${v} V.`
      };
    }, 'medium'),
    typeanswer(() => {
      const L = pick([0.1, 0.2, 0.5]);
      const x = Math.round(2 * Math.PI * 50 * L * 10) / 10;
      return {
        cg: 'P22-M2',
        q: `An inductor of ${L} H sits in a 50 Hz AC circuit. Inductive reactance X_L = 2πfL. Find X_L in ohms (1 d.p.).`,
        answer: x,
        tolerance: 0.3,
        explain: `X_L = 2π × 50 × ${L} = ${x} Ω. Reactance rises with frequency for an inductor.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P22-M3',
      q: 'A series RLC circuit is at resonance when:',
      opts: [
        'The resistance is zero',
        'The inductive and capacitive reactances are equal (X_L = X_C)',
        'The frequency is zero',
        'The capacitor is fully charged'
      ],
      answer: 1,
      explain: 'At resonance X_L = X_C, they cancel, impedance is just R (a minimum), and the current is a maximum.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P22-M4',
      q: 'In an AC circuit, the power that does useful work, P = V_rms I_rms cos φ, is called the ___ power.',
      answer: 'real',
      accept: ['real', 'active', 'real (active)', 'true'],
      explain: 'Real (active) power does work; reactive power is merely stored and returned each cycle by inductors and capacitors.'
    }), 'medium'),
    truefalse(() => ({
      cg: 'P22-M5',
      q: 'At resonance, a series RLC circuit has maximum impedance and minimum current.',
      answer: false,
      explain: 'It is the opposite: at series resonance impedance is a minimum (Z = R) and current is a maximum. (A parallel RLC circuit behaves the other way round.)'
    }), 'medium'),

    typeanswer(() => {
      const C = pick([1, 4, 25]);
      const f0 = Math.round(1 / (2 * Math.PI * Math.sqrt(1e-3 * C * 1e-6)));
      return {
        cg: 'P22-H1',
        q: `A series circuit has L = 1.0 mH and C = ${C} µF. Resonant frequency f₀ = 1/(2π√(LC)). Find f₀ in Hz (nearest Hz).`,
        answer: f0,
        tolerance: 5,
        explain: `f₀ = 1/(2π√(10⁻³ × ${C}×10⁻⁶)) ≈ ${f0} Hz.`
      };
    }, 'hard'),
    typeanswer(() => {
      const pf = pick([0.6, 0.8, 1.0]);
      const P = Math.round(230 * 5 * pf);
      return {
        cg: 'P22-H2',
        q: `An AC load runs at V_rms = 230 V and I_rms = 5 A with power factor cos φ = ${pf}. Real power P = V_rms·I_rms·cos φ. Find P in watts.`,
        answer: P,
        tolerance: 1,
        explain: `P = 230 × 5 × ${pf} = ${P} W. Apparent power S = 230 × 5 = 1150 VA.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P22-H3',
      q: 'Radar received power falls off as 1/R⁴. To detect a target at twice the range, the transmitter power must increase by a factor of:',
      opts: ['2', '4', '8', '16'],
      answer: 3,
      explain: 'The pulse spreads as 1/R² on the way out and the echo as 1/R² on the way back, giving 1/R⁴. Doubling R needs 2⁴ = 16× the power.'
    }), 'hard'),
    typeanswer(() => {
      const [R, X] = pick([[3, 4], [6, 8], [5, 12]]);
      const Z = Math.round(Math.sqrt(R * R + X * X));
      return {
        cg: 'P22-H4',
        q: `An AC circuit has R = ${R} Ω and a net reactance (X_L − X_C) of ${X} Ω. Impedance Z = √(R² + X²). Find Z in ohms.`,
        answer: Z,
        tolerance: 0.5,
        explain: `Z = √(${R}² + ${X}²) = √${R * R + X * X} = ${Z} Ω.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P22-H5',
      q: 'Using E = hf, which electromagnetic wave carries the most energy per photon?',
      opts: ['Radio waves', 'Infrared', 'Visible light', 'Gamma rays'],
      answer: 3,
      explain: 'Photon energy rises with frequency. Gamma rays have the highest frequency (shortest wavelength) of the listed bands, so the most energy per photon.'
    }), 'hard')
  ],

  // ── P23 : Gyroscopes, magnetism & wave optics (Frye "Refinements") ──
  P23: [
    matchQuestion(() => ({
      cg: 'P23-SE1',
      q: 'Match each phenomenon to the everyday sight it explains.',
      pairs: [
        ['Scattering', 'the blue colour of the sky'],
        ['Thin-film interference', 'the shimmering colours of a soap bubble'],
        ['Polarization', 'glare cut by polarising sunglasses'],
        ['Gyroscope', 'a spinning top that stays upright']
      ],
      explain: 'Each is a wave or rotational effect with a familiar visible consequence.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P23-SE2',
      q: 'The sky is blue because air molecules ___ blue light more strongly than red light.',
      answer: 'scatter',
      accept: ['scatter', 'scatters', 'scatter away'],
      explain: 'Rayleigh scattering is much stronger for short (blue) wavelengths, so blue light is scattered all across the sky.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P23-SE3',
      q: 'A spinning gyroscope resists changes to the direction of its axis. This property is called:',
      opts: ['Friction', 'Rigidity in space', 'Buoyancy', 'Resonance'],
      answer: 1,
      explain: 'Conservation of angular momentum keeps the spin axis pointing the same way unless an external torque acts — "rigidity in space".'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P23-SE4',
      q: 'Polarizing sunglasses work by blocking light that vibrates in a particular direction.',
      answer: true,
      explain: 'A polariser only transmits the component of the electric field along its axis, cutting glare (which is partly polarised).'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P23-SE5',
      q: 'Iron can be a permanent magnet, but it loses its magnetism if heated above a certain temperature (the Curie point).',
      answer: true,
      explain: 'Above the Curie temperature, thermal agitation overcomes the exchange interaction that aligns the magnetic domains, and ferromagnetism vanishes.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P23-E1',
      q: 'Why are sunsets red?',
      opts: [
        'The Sun emits red light only in the evening',
        'Over the long, low path through the atmosphere, blue light is scattered out, leaving red',
        'Dust turns the Sun red',
        'The atmosphere absorbs all red light'
      ],
      answer: 1,
      explain: 'At sunset, light travels a long slanted path; most of the blue has been scattered away by then, so the transmitted light looks red.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P23-E2',
      q: 'Match each magnetic class to its behaviour.',
      pairs: [
        ['Ferromagnetic', 'strongly attracted; can stay magnetised (iron)'],
        ['Paramagnetic', 'weakly attracted by a field'],
        ['Diamagnetic', 'weakly repelled by a field'],
        ['Curie temperature', 'where ferromagnetism is lost on heating']
      ],
      explain: 'Diamagnetism (weak repulsion) is universal; paramagnetism (weak attraction) needs unpaired spins; ferromagnetism (strong, retainable) needs aligned domains below T_C.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P23-E3',
      q: 'When a torque acts on a spinning gyroscope, its axis slowly sweeps around instead of toppling. This motion is called ___.',
      answer: 'precession',
      accept: ['precession', 'precess', 'precessing'],
      explain: 'The torque changes the direction of the angular momentum vector, so the axis precesses at rate Ω = τ/L.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P23-E4',
      q: 'Diamagnetism is a property of all materials — every substance is at least weakly repelled by a magnetic field.',
      answer: true,
      explain: 'By Lenz\'s law, an applied field induces opposing electron currents in any material. In substances with unpaired spins, stronger para/ferromagnetism usually masks it.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P23-E5',
      q: 'A diffraction grating spreads white light into a spectrum because:',
      opts: [
        'It absorbs some colours',
        'Different wavelengths satisfy d sin θ = mλ at different angles',
        'It heats the light',
        'It reflects only one colour'
      ],
      answer: 1,
      explain: 'The grating equation d sin θ = mλ sends each wavelength to its own angle, fanning white light into a spectrum.'
    }), 'easy'),

    typeanswer(() => {
      const th = pick([0, 30, 45, 60]);
      const I = Math.round(100 * Math.cos(th * Math.PI / 180) ** 2);
      return {
        cg: 'P23-M1',
        q: `Polarised light of intensity 100 W/m² passes through an analyser at ${th}° to its polarisation. Malus's law: I = I₀cos²θ. Find I in W/m² (nearest whole number).`,
        answer: I,
        tolerance: 1,
        explain: `I = 100 × cos²(${th}°) = ${I} W/m².`
      };
    }, 'medium'),
    typeanswer(() => {
      const lam = pick([0.4, 0.5, 0.6]);
      const s = Math.round(lam / 2 * 100) / 100;
      return {
        cg: 'P23-M2',
        q: `A diffraction grating has line spacing d = 2.0 µm. For the first order (m = 1), d sin θ = λ. If λ = ${lam} µm, what is sin θ?`,
        answer: s,
        tolerance: 0.01,
        explain: `sin θ = λ/d = ${lam}/2.0 = ${s}.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P23-M3',
      q: 'Spinning a gyroscope faster (raising its angular momentum L) makes it precess:',
      opts: ['Faster', 'More slowly', 'Not at all', 'In the opposite direction'],
      answer: 1,
      explain: 'Precession rate Ω = τ/L. A larger L for the same torque gives a slower precession — a fast top precesses lazily.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P23-M4',
      q: 'The Hall effect produces a sideways voltage across a current-carrying conductor when it sits in a ___ field.',
      answer: 'magnetic',
      accept: ['magnetic', 'magnetic field', 'a magnetic'],
      explain: 'The Lorentz force qv×B pushes carriers to one side, building a transverse Hall voltage V_H = IB/(net).'
    }), 'medium'),
    truefalse(() => ({
      cg: 'P23-M5',
      q: 'In a cyclotron, the frequency needed to keep accelerating the particles stays constant as they speed up (non-relativistic case).',
      answer: true,
      explain: 'Cyclotron frequency f = qB/(2πm) is independent of speed and radius — that is exactly why a fixed-frequency drive keeps working, until relativistic mass increase detunes it.'
    }), 'medium'),

    typeanswer(() => {
      const n = pick([1.33, 1.5]);
      const th = Math.round(Math.atan(n) * 180 / Math.PI * 10) / 10;
      return {
        cg: 'P23-H1',
        q: `Light in air reflects off a surface of refractive index n = ${n}. Brewster's angle satisfies tan θ_B = n. Find θ_B in degrees (1 d.p.).`,
        answer: th,
        tolerance: 0.5,
        explain: `θ_B = arctan(${n}) = ${th}°. Light reflected at this angle is fully polarised.`
      };
    }, 'hard'),
    typeanswer(() => {
      const B = pick([0.5, 1.0, 1.5]);
      const f = Math.round(1.6e-19 * B / (2 * Math.PI * 1.67e-27) / 1e6 * 10) / 10;
      return {
        cg: 'P23-H2',
        q: `A proton (q = 1.6×10⁻¹⁹ C, m = 1.67×10⁻²⁷ kg) circulates in a cyclotron with B = ${B} T. Cyclotron frequency f = qB/(2πm). Find f in MHz (1 d.p.).`,
        answer: f,
        tolerance: 0.3,
        explain: `f = (1.6×10⁻¹⁹ × ${B})/(2π × 1.67×10⁻²⁷) ≈ ${f} MHz.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P23-H3',
      q: "A grating's resolving power is R = mN (order × number of illuminated lines). To separate two very close spectral lines you should:",
      opts: [
        'Illuminate fewer lines',
        'Illuminate more lines or work in a higher order',
        'Use a dimmer source',
        'Tilt the grating to zero order'
      ],
      answer: 1,
      explain: 'R = mN rises with both the number of illuminated lines N and the order m, so more lines (or higher order) resolves finer wavelength differences.'
    }), 'hard'),
    typeanswer(() => {
      const lam = pick([500, 600]);
      const t = Math.round(lam / (4 * 1.25));
      return {
        cg: 'P23-H4',
        q: `A quarter-wave anti-reflection coating (n = 1.25) gives minimum reflection when its thickness t = λ/(4n). For λ = ${lam} nm, find t in nm.`,
        answer: t,
        tolerance: 1,
        explain: `t = ${lam}/(4 × 1.25) = ${t} nm.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P23-H5',
      q: 'The polarity (sign) of the Hall voltage reveals:',
      opts: [
        'The temperature of the conductor',
        'Whether the charge carriers are positive or negative',
        'The length of the conductor',
        'The frequency of the current'
      ],
      answer: 1,
      explain: 'Which side the carriers pile up on — and thus the sign of V_H — tells you the sign of the charge carriers, a key clue that some semiconductors conduct via positive "holes".'
    }), 'hard')
  ],

  // ── P24 : Newtonian mechanics (Frye) ──
  P24: [
    matchQuestion(() => ({
      cg: 'P24-SE1',
      q: "Match each of Newton's laws (and inertia) to its statement.",
      pairs: [
        ['First law', 'stays at rest or uniform motion unless a net force acts'],
        ['Second law', 'F = ma'],
        ['Third law', 'every action has an equal and opposite reaction'],
        ['Inertia', 'resistance to a change in motion']
      ],
      explain: 'First law = inertia, second = F = ma, third = action–reaction. Inertia is the underlying tendency the first law describes.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P24-SE2',
      q: "Newton's second law states that force equals mass times ___.",
      answer: 'acceleration',
      accept: ['acceleration', 'a'],
      explain: 'F = ma. The acceleration points in the direction of the net force.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P24-SE3',
      q: "A seatbelt protects you in a crash because, by Newton's first law, your body tends to:",
      opts: ['Speed up', 'Keep moving forward at constant velocity', 'Stop instantly on its own', 'Move sideways'],
      answer: 1,
      explain: 'Your body has inertia: when the car suddenly stops, you continue forward until a force (the belt) acts on you.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P24-SE4',
      q: 'For every action force there is an equal and opposite reaction force, and the two act on different objects.',
      answer: true,
      explain: "Newton's third law: F_AB = −F_BA. Because the pair acts on different bodies, they do not cancel out."
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P24-SE5',
      q: 'Momentum is calculated as mass multiplied by velocity.',
      answer: true,
      explain: 'p = mv, measured in kg·m/s. It is a vector, pointing along the velocity.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P24-E1',
      q: 'The kinetic energy of a moving object is given by:',
      opts: ['mgh', '½mv²', 'mv', 'Fd'],
      answer: 1,
      explain: 'KE = ½mv². It scales with the square of speed, so doubling speed quadruples the kinetic energy.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P24-E2',
      q: 'Match each quantity to its formula.',
      pairs: [
        ['Work', 'F·d·cos θ'],
        ['Kinetic energy', '½mv²'],
        ['Potential energy', 'mgh'],
        ['Power', 'work ÷ time']
      ],
      explain: 'Work is force along the displacement; KE is energy of motion; PE is energy of height; power is the rate of doing work.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P24-E3',
      q: 'The product of an object\'s mass and its velocity is called its ___.',
      answer: 'momentum',
      accept: ['momentum', 'linear momentum'],
      explain: 'p = mv. In a collision with no external force, total momentum is conserved.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P24-E4',
      q: 'With no air resistance, a heavy object and a light object dropped together hit the ground at the same time.',
      answer: true,
      explain: 'a = F/m = mg/m = g for both — the mass cancels, so all objects fall with the same acceleration g.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P24-E5',
      q: 'Holding a heavy box still at arm\'s length, you do no physical work on it (in the physics sense) because:',
      opts: ['The box is too heavy', 'There is no displacement (W = Fd, d = 0)', 'Gravity does the work', 'Your arm is a lever'],
      answer: 1,
      explain: 'Work needs displacement in the direction of the force. With no movement, W = F × 0 = 0, even though your muscles tire.'
    }), 'easy'),

    typeanswer(() => {
      const m = pick([2, 5, 10]);
      const a = pick([3, 4]);
      return {
        cg: 'P24-M1',
        q: `A ${m} kg object accelerates at ${a} m/s². What net force (N) acts on it? (F = ma)`,
        answer: m * a,
        tolerance: 0.1,
        explain: `F = ma = ${m} × ${a} = ${m * a} N.`
      };
    }, 'medium'),
    typeanswer(() => {
      const m = pick([2, 4]);
      const v = pick([3, 5, 10]);
      return {
        cg: 'P24-M2',
        q: `Find the kinetic energy of a ${m} kg object moving at ${v} m/s. KE = ½mv², in joules.`,
        answer: 0.5 * m * v * v,
        tolerance: 0.1,
        explain: `KE = ½ × ${m} × ${v}² = ${0.5 * m * v * v} J.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P24-M3',
      q: 'A car accelerates uniformly from rest. Using v = u + at with u = 0, doubling the time doubles the:',
      opts: ['Acceleration', 'Final velocity', 'Mass', 'Force needed'],
      answer: 1,
      explain: 'With u = 0, v = at — velocity is proportional to time, so twice the time gives twice the final speed (at constant a).'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P24-M4',
      q: 'The turning effect of a force about a pivot is called its moment, or ___.',
      answer: 'torque',
      accept: ['torque', 'moment'],
      explain: 'τ = F × d (perpendicular distance), measured in N·m — which is why a longer spanner turns a bolt more easily.'
    }), 'medium'),
    typeanswer(() => {
      const m = pick([2, 3, 5]);
      const v = pick([4, 10]);
      return {
        cg: 'P24-M5',
        q: `What is the momentum of a ${m} kg trolley moving at ${v} m/s? (p = mv, in kg·m/s)`,
        answer: m * v,
        tolerance: 0.1,
        explain: `p = mv = ${m} × ${v} = ${m * v} kg·m/s.`
      };
    }, 'medium'),

    typeanswer(() => {
      const v = pick([10, 20, 30]);
      const R = Math.round(v * v / 9.8 * 10) / 10;
      return {
        cg: 'P24-H1',
        q: `A projectile is launched at 45° with speed ${v} m/s. Range R = v²sin(2θ)/g; at 45°, sin(2θ) = 1, so R = v²/g (g = 9.8). Find R in metres (1 d.p.).`,
        answer: R,
        tolerance: 0.5,
        explain: `R = ${v}²/9.8 = ${R} m. The 45° launch gives the maximum range for a given speed.`
      };
    }, 'hard'),
    typeanswer(() => {
      const [m, v, r] = pick([[2, 10, 5], [1, 4, 2], [3, 10, 5]]);
      return {
        cg: 'P24-H2',
        q: `An object of mass ${m} kg moves in a circle of radius ${r} m at ${v} m/s. Centripetal force F = mv²/r. Find F in N.`,
        answer: m * v * v / r,
        tolerance: 0.5,
        explain: `F = ${m} × ${v}²/${r} = ${m * v * v / r} N, directed toward the centre.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P24-H3',
      q: 'In a perfectly inelastic collision (the objects stick together), which quantity is conserved?',
      opts: [
        'Both momentum and kinetic energy',
        'Momentum, but not kinetic energy',
        'Kinetic energy, but not momentum',
        'Neither'
      ],
      answer: 1,
      explain: 'Momentum is always conserved without external forces. In an inelastic collision some kinetic energy becomes heat, sound and deformation, so KE is not conserved.'
    }), 'hard'),
    typeanswer(() => {
      const a = pick([2, 4, 5]);
      const s = pick([10, 20]);
      const v = Math.round(Math.sqrt(2 * a * s) * 100) / 100;
      return {
        cg: 'P24-H4',
        q: `A car starts from rest (u = 0) and accelerates at ${a} m/s² over ${s} m. Using v² = u² + 2as, find the final speed v in m/s (2 d.p.).`,
        answer: v,
        tolerance: 0.1,
        explain: `v = √(2 × ${a} × ${s}) = ${v} m/s.`
      };
    }, 'hard'),
    typeanswer(() => {
      const F = pick([10, 20]);
      const t = pick([0.2, 0.5]);
      const J = Math.round(F * t * 100) / 100;
      return {
        cg: 'P24-H5',
        q: `A force of ${F} N acts for ${t} s. Impulse J = F·Δt. Find the impulse in N·s.`,
        answer: J,
        tolerance: 0.05,
        explain: `J = ${F} × ${t} = ${J} N·s, which equals the change in momentum it produces (J = Δp).`
      };
    }, 'hard')
  ],

  // ── P25 : Rotation, heat & thermodynamics (Frye) ──
  P25: [
    matchQuestion(() => ({
      cg: 'P25-SE1',
      q: 'Match each thermal/rotational term to its meaning.',
      pairs: [
        ['Specific heat', 'energy to raise 1 kg by 1 K'],
        ['Latent heat', 'energy for a phase change at constant temperature'],
        ['Moment of inertia', 'resistance to a change in spin'],
        ['Absolute zero', '0 K, about −273 °C']
      ],
      explain: 'Specific and latent heat describe heating and phase changes; moment of inertia is rotational "mass"; absolute zero is the bottom of the temperature scale.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P25-SE2',
      q: 'Heat always flows spontaneously from a ___ object to a colder one.',
      answer: 'hotter',
      accept: ['hotter', 'hot', 'warmer', 'warm'],
      distractors: ['colder', 'heavier', 'larger'],
      explain: 'The second law of thermodynamics: heat never flows by itself from cold to hot.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P25-SE3',
      q: 'A figure skater pulls in her arms and spins faster. This demonstrates conservation of:',
      opts: ['Energy', 'Momentum', 'Angular momentum', 'Charge'],
      answer: 2,
      explain: 'L = Iω is conserved. Pulling her arms in lowers I, so ω must rise to keep L constant.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P25-SE4',
      q: 'Energy can change form but cannot be created or destroyed.',
      answer: true,
      explain: 'Conservation of energy: the total energy of an isolated system is constant, however the forms shift.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P25-SE5',
      q: 'Absolute zero (0 K) is about −273 °C.',
      answer: true,
      explain: '0 K = −273.15 °C — the temperature at which molecular kinetic energy reaches its minimum.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P25-E1',
      q: 'The ideal gas law is:',
      opts: ['PV = nRT', 'F = ma', 'V = IR', 'E = mc²'],
      answer: 0,
      explain: 'PV = nRT links pressure, volume, amount and absolute temperature, with R = 8.314 J/mol·K.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P25-E2',
      q: 'Match each gas law to what it holds fixed.',
      pairs: [
        ["Boyle's law", 'PV constant (temperature fixed)'],
        ["Charles's law", 'V ∝ T (pressure fixed)'],
        ["Gay-Lussac's law", 'P ∝ T (volume fixed)'],
        ['Ideal gas law', 'PV = nRT (combines them all)']
      ],
      explain: 'Each simple gas law fixes one variable; together they give PV = nRT.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P25-E3',
      q: 'The energy needed to melt or boil a substance without changing its temperature is called ___ heat.',
      answer: 'latent',
      accept: ['latent', 'latent heat'],
      distractors: ['specific', 'radiant', 'kinetic'],
      explain: 'Latent heat goes into breaking intermolecular bonds, so the temperature stays put during the phase change (Q = mL).'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P25-E4',
      q: 'While a substance changes phase (for example, ice melting), its temperature stays constant even though heat is being added.',
      answer: true,
      explain: 'The added energy breaks bonds rather than raising kinetic energy, so the temperature holds steady until the phase change is complete.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P25-E5',
      q: 'Water has an unusually high specific heat capacity (4186 J/kg·K). One consequence is that:',
      opts: [
        'Water boils very easily',
        'Large bodies of water moderate the climate, warming and cooling slowly',
        'Water freezes faster than other liquids',
        'Water cannot store heat'
      ],
      answer: 1,
      explain: 'A high specific heat means water absorbs or releases a lot of energy for a small temperature change, so oceans and lakes buffer local temperatures.'
    }), 'easy'),

    typeanswer(() => {
      const m = pick([0.5, 1, 2]);
      const dT = pick([10, 20]);
      const Q = m * 4186 * dT;
      return {
        cg: 'P25-M1',
        q: `How much heat (J) raises ${m} kg of water by ${dT} °C? Use Q = mcΔT with c = 4186 J/kg·K.`,
        answer: Q,
        tolerance: 10,
        explain: `Q = ${m} × 4186 × ${dT} = ${Q} J.`
      };
    }, 'medium'),
    typeanswer(() => {
      const m = pick([0.1, 0.5, 2]);
      const Q = m * 334000;
      return {
        cg: 'P25-M2',
        q: `How much heat (J) melts ${m} kg of ice at 0 °C? Use Q = mL_f with L_f = 334000 J/kg.`,
        answer: Q,
        tolerance: 50,
        explain: `Q = ${m} × 334000 = ${Q} J — all of it going into breaking bonds, at constant temperature.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P25-M3',
      q: 'The maximum possible efficiency of a heat engine working between a hot reservoir T_H and a cold reservoir T_C (in kelvin) is:',
      opts: ['1 − T_C/T_H', 'T_C/T_H', 'T_H − T_C', '1 − T_H/T_C'],
      answer: 0,
      explain: 'The Carnot efficiency η = 1 − T_C/T_H is the ceiling no real engine between those temperatures can beat.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P25-M4',
      q: 'An object\'s resistance to a change in its rate of spin is called the moment of ___.',
      answer: 'inertia',
      accept: ['inertia'],
      distractors: ['momentum', 'torque', 'friction'],
      explain: 'Moment of inertia I = Σmr² plays the role mass plays in linear motion; for rotation, τ = Iα.'
    }), 'medium'),
    typeanswer(() => {
      const V1 = pick([3, 4, 6]);
      const P2 = 100 * V1 / 2;
      return {
        cg: 'P25-M5',
        q: `${V1} L of gas at 100 kPa is compressed to 2.0 L at constant temperature. Boyle's law P₁V₁ = P₂V₂. Find the new pressure (kPa).`,
        answer: P2,
        tolerance: 1,
        explain: `P₂ = 100 × ${V1}/2.0 = ${P2} kPa.`
      };
    }, 'medium'),

    typeanswer(() => {
      const TH = pick([400, 500, 600]);
      const e = Math.round((1 - 300 / TH) * 100) / 100;
      return {
        cg: 'P25-H1',
        q: `A Carnot engine runs between T_H = ${TH} K and T_C = 300 K. Maximum efficiency η = 1 − T_C/T_H. Find η (2 d.p.).`,
        answer: e,
        tolerance: 0.01,
        explain: `η = 1 − 300/${TH} = ${e}.`
      };
    }, 'hard'),
    typeanswer(() => {
      const V1 = pick([2, 3]);
      const T2 = pick([450, 600]);
      const V2 = Math.round(V1 * T2 / 300 * 10) / 10;
      return {
        cg: 'P25-H2',
        q: `A gas occupies ${V1} L at 300 K. At constant pressure it is heated to ${T2} K. By Charles's law V₂ = V₁T₂/T₁, find the new volume in L (1 d.p.).`,
        answer: V2,
        tolerance: 0.1,
        explain: `V₂ = ${V1} × ${T2}/300 = ${V2} L.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P25-H3',
      q: 'According to kinetic theory, the average translational kinetic energy of gas molecules depends only on:',
      opts: ['The pressure', 'The absolute temperature', 'The volume', 'The molar mass'],
      answer: 1,
      explain: 'KE_avg = (3/2)kT — it is set purely by absolute temperature, the same for every ideal gas at a given T.'
    }), 'hard'),
    typeanswer(() => {
      const L0 = pick([10, 20]);
      const dT = pick([30, 50]);
      const dL = Math.round(12e-6 * L0 * dT * 1000 * 100) / 100;
      return {
        cg: 'P25-H4',
        q: `A ${L0} m steel beam (α = 12×10⁻⁶ /°C) warms by ${dT} °C. Expansion ΔL = αL₀ΔT. Find ΔL in mm (2 d.p.).`,
        answer: dL,
        tolerance: 0.1,
        explain: `ΔL = 12×10⁻⁶ × ${L0} × ${dT} = ${dL / 1000} m = ${dL} mm — the reason bridges need expansion joints.`
      };
    }, 'hard'),
    typeanswer(() => {
      const M = pick([2, 4]);
      const R = pick([0.5, 1]);
      const I = 0.5 * M * R * R;
      return {
        cg: 'P25-H5',
        q: `A solid disk of mass M = ${M} kg and radius R = ${R} m spins about its centre. I = ½MR². Find I in kg·m².`,
        answer: I,
        tolerance: 0.01,
        explain: `I = ½ × ${M} × ${R}² = ${I} kg·m².`
      };
    }, 'hard')
  ],

  // ── P26 : Optics — light, lenses & instruments (Frye) ──
  P26: [
    matchQuestion(() => ({
      cg: 'P26-SE1',
      q: 'Match each optical effect to its description.',
      pairs: [
        ['Reflection', 'light bouncing off a surface'],
        ['Refraction', 'light bending at a boundary'],
        ['Total internal reflection', 'light trapped inside a fibre'],
        ['Dispersion', 'white light split into colours']
      ],
      explain: 'These four cover bouncing, bending, trapping and splitting of light.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P26-SE2',
      q: 'The bending of light as it passes from air into water is called ___.',
      answer: 'refraction',
      accept: ['refraction', 'refract'],
      explain: 'Light changes speed at the boundary, so it changes direction — refraction, governed by Snell\'s law.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P26-SE3',
      q: 'The law of reflection says the angle of incidence equals the angle of:',
      opts: ['Refraction', 'Reflection', 'Dispersion', 'Diffraction'],
      answer: 1,
      explain: 'θ_i = θ_r, both measured from the normal, with incident ray, reflected ray and normal in one plane.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P26-SE4',
      q: 'Light travels more slowly in glass or water than in a vacuum.',
      answer: true,
      explain: 'In a medium, v = c/n with n > 1, so light is slower (about c/1.33 in water, c/1.5 in glass).'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P26-SE5',
      q: 'A flat (plane) mirror forms an image that appears to be behind the mirror.',
      answer: true,
      explain: 'A plane mirror gives a virtual, upright image the same size, the same distance behind the mirror as the object is in front.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P26-E1',
      q: "Snell's law of refraction is:",
      opts: ['n₁ sin θ₁ = n₂ sin θ₂', '1/f = 1/u + 1/v', 'n = c/v only', 'θ_i = θ_r'],
      answer: 0,
      explain: 'n₁ sin θ₁ = n₂ sin θ₂ relates the angles on either side of a boundary to the two refractive indices.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P26-E2',
      q: 'Match each material to its approximate refractive index.',
      pairs: [
        ['Vacuum', '1.0'],
        ['Water', '1.33'],
        ['Glass', '1.5'],
        ['Diamond', '2.42']
      ],
      explain: 'Higher index means light slows more and bends more. Diamond\'s very high n gives its sparkle (and a small critical angle).'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P26-E3',
      q: 'Light refracts (bends) at a boundary because it changes ___ when it enters a new medium.',
      answer: 'speed',
      accept: ['speed', 'velocity', 'its speed'],
      explain: 'The change of speed (v = c/n) at the interface is what redirects the ray.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P26-E4',
      q: 'Total internal reflection can only occur when light travels from a denser medium toward a less dense one (e.g. glass to air).',
      answer: true,
      explain: 'Only going from high n to low n is there a critical angle θ_c = arcsin(n₂/n₁) beyond which all the light reflects.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P26-E5',
      q: 'An optical fibre carries light around bends over long distances by means of:',
      opts: ['Diffraction', 'Total internal reflection', 'Dispersion', 'Polarization'],
      answer: 1,
      explain: 'Light strikes the core–cladding boundary above the critical angle and reflects completely, again and again, staying trapped in the core.'
    }), 'easy'),

    typeanswer(() => {
      const n = pick([1.5, 2.0, 2.42]);
      const v = Math.round(3 / n * 100) / 100;
      return {
        cg: 'P26-M1',
        q: `Light enters a medium of refractive index n = ${n}. Its speed v = c/n with c = 3.0×10⁸ m/s. Find v in units of 10⁸ m/s (2 d.p.).`,
        answer: v,
        tolerance: 0.02,
        explain: `v = 3.0/${n} = ${v} (×10⁸ m/s).`
      };
    }, 'medium'),
    typeanswer(() => {
      const [f, u] = pick([[10, 15], [10, 20], [20, 30], [15, 30]]);
      const v = Math.round(1 / (1 / f - 1 / u) * 10) / 10;
      return {
        cg: 'P26-M2',
        q: `A converging lens has focal length ${f} cm. An object sits ${u} cm away. Using 1/f = 1/u + 1/v, find the image distance v in cm.`,
        answer: v,
        tolerance: 0.5,
        explain: `1/v = 1/${f} − 1/${u}, so v = ${v} cm (a real image).`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P26-M3',
      q: 'If you double your distance from a small lamp, the illuminance (brightness) on a surface becomes:',
      opts: ['Half', 'One quarter', 'Twice', 'Unchanged'],
      answer: 1,
      explain: 'Illuminance follows the inverse-square law E = I/r². Doubling r multiplies E by 1/2² = 1/4.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P26-M4',
      q: 'The power of a lens, in dioptres, is the reciprocal of its ___ (in metres).',
      answer: 'focal length',
      accept: ['focal length', 'focal-length', 'focal distance', 'f'],
      explain: 'P = 1/f. A 0.5 m focal length is a 2 dioptre lens.'
    }), 'medium'),
    truefalse(() => ({
      cg: 'P26-M5',
      q: 'A convex (converging) lens can form either a real or a virtual image, depending on where the object is.',
      answer: true,
      explain: 'Beyond the focal point it makes a real, inverted image; inside the focal point it acts as a magnifier, giving a virtual, upright, enlarged image.'
    }), 'medium'),

    typeanswer(() => {
      const n1 = pick([1.33, 1.5, 2.42]);
      const tc = Math.round(Math.asin(1 / n1) * 180 / Math.PI * 10) / 10;
      return {
        cg: 'P26-H1',
        q: `Find the critical angle for light passing from a medium of index n = ${n1} into air (n = 1). θ_c = arcsin(1/n). Answer in degrees (1 d.p.).`,
        answer: tc,
        tolerance: 0.5,
        explain: `θ_c = arcsin(1/${n1}) = ${tc}°. Beyond this angle, light is totally internally reflected.`
      };
    }, 'hard'),
    typeanswer(() => {
      const [fo, fe] = pick([[100, 10], [120, 5], [90, 2]]);
      return {
        cg: 'P26-H2',
        q: `An astronomical telescope has objective focal length f_o = ${fo} cm and eyepiece f_e = ${fe} cm. Angular magnification M = f_o/f_e. Find M.`,
        answer: fo / fe,
        tolerance: 0.5,
        explain: `M = ${fo}/${fe} = ${fo / fe}×. A long objective and short eyepiece give high magnification.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P26-H3',
      q: 'When white light passes through a glass prism, which colour is bent (refracted) the most?',
      opts: ['Red', 'Green', 'Violet', 'They all bend equally'],
      answer: 2,
      explain: 'Refractive index is higher for shorter wavelengths (normal dispersion), so violet bends most and red least — spreading white light into a spectrum.'
    }), 'hard'),
    typeanswer(() => {
      const t1 = pick([30, 45, 60]);
      const t2 = Math.round(Math.asin(Math.sin(t1 * Math.PI / 180) / 1.5) * 180 / Math.PI * 10) / 10;
      return {
        cg: 'P26-H4',
        q: `Light passes from air into glass (n = 1.5) at an angle of incidence ${t1}°. Using sin θ₁ = 1.5 sin θ₂, find the refraction angle θ₂ in degrees (1 d.p.).`,
        answer: t2,
        tolerance: 0.5,
        explain: `sin θ₂ = sin(${t1}°)/1.5, so θ₂ = ${t2}° — bent toward the normal in the denser medium.`
      };
    }, 'hard'),
    typeanswer(() => {
      const [f, D] = pick([[50, 25], [100, 50], [50, 12.5]]);
      const N = Math.round(f / D * 100) / 100;
      return {
        cg: 'P26-H5',
        q: `A camera lens has focal length f = ${f} mm and aperture diameter D = ${D} mm. The f-number is N = f/D. Find N.`,
        answer: N,
        tolerance: 0.05,
        explain: `N = ${f}/${D} = ${N} (written f/${N}). A smaller f-number means a wider aperture and more light.`
      };
    }, 'hard')
  ],

  // ── P27 : Engineering tools & electrical machines (Frye) ──
  P27: [
    matchQuestion(() => ({
      cg: 'P27-SE1',
      q: 'Match each device to what it does.',
      pairs: [
        ['Electric motor', 'turns electricity into rotation'],
        ['Generator', 'turns rotation into electricity'],
        ['Transformer', 'changes an AC voltage'],
        ['Ammeter', 'measures electric current']
      ],
      explain: 'A motor and a generator are reverses of each other; a transformer scales AC voltage; an ammeter reads current.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P27-SE2',
      q: 'An electric motor converts electrical energy into ___ energy.',
      answer: 'mechanical',
      accept: ['mechanical', 'kinetic', 'rotational', 'movement', 'motion'],
      explain: 'Current in a magnetic field feels a force (τ = NIAB), spinning the rotor — electrical energy becomes mechanical work.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P27-SE3',
      q: 'A transformer is used to:',
      opts: ['Convert AC to DC', 'Change the voltage of an AC supply', 'Store charge', 'Measure resistance'],
      answer: 1,
      explain: 'By the turns ratio V₂/V₁ = N₂/N₁, a transformer steps AC voltage up or down (it does not work on steady DC).'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P27-SE4',
      q: 'Accuracy is how close a measurement is to the true value; precision is how closely repeated measurements agree.',
      answer: true,
      explain: 'A reading can be precise (repeatable) yet inaccurate (off the true value), and vice versa.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P27-SE5',
      q: 'An ammeter is connected in series with a circuit to measure the current through it.',
      answer: true,
      explain: 'The same current must pass through the ammeter, so it goes in series — and it has very low resistance to barely disturb the circuit.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P27-E1',
      q: 'A generator (dynamo) produces electricity by:',
      opts: [
        'Heating a wire',
        'Moving a coil or magnet to induce an EMF (electromagnetic induction)',
        'Storing charge on plates',
        'Splitting atoms'
      ],
      answer: 1,
      explain: 'Faraday induction: a changing magnetic flux through a coil induces an EMF, ε = NBAω sin ωt — the reverse of a motor.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P27-E2',
      q: 'Match each physical constant to its value.',
      pairs: [
        ['Speed of light c', '3×10⁸ m/s'],
        ["Avogadro's number N_A", '6.02×10²³ /mol'],
        ['Gas constant R', '8.314 J/mol·K'],
        ['Elementary charge e', '1.6×10⁻¹⁹ C']
      ],
      explain: 'These constants recur throughout physics; since the 2019 SI redefinition, c, e (and others) are fixed exactly.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P27-E3',
      q: 'A voltmeter must have a very ___ resistance so it draws almost no current from the circuit it measures.',
      answer: 'high',
      accept: ['high', 'large', 'big'],
      explain: 'Connected in parallel, a high resistance (via a series multiplier) keeps the voltmeter from disturbing the voltage it reads.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P27-E4',
      q: 'In an ideal transformer, the power delivered to the secondary equals the power supplied to the primary.',
      answer: true,
      explain: 'P₁ = P₂ for an ideal transformer, so stepping voltage up steps current down by the same factor (V₂/V₁ = N₂/N₁ = I₁/I₂).'
    }), 'easy'),
    mcq(() => ({
      cg: 'P27-E5',
      q: 'The "weak-link principle" in measurement says a calculated result is only as precise as:',
      opts: ['Its largest input', 'Its least precise input', 'The average of the inputs', 'The final digit you write'],
      answer: 1,
      explain: 'A chain is as strong as its weakest link: the least precise measurement caps how many significant figures the answer can honestly carry.'
    }), 'easy'),

    typeanswer(() => {
      const N2 = pick([60, 2400, 300]);
      const V2 = 240 * N2 / 1200;
      return {
        cg: 'P27-M1',
        q: `A transformer has 1200 primary turns and ${N2} secondary turns, with 240 V on the primary. V₂ = V₁(N₂/N₁). Find the secondary voltage (V).`,
        answer: V2,
        tolerance: 1,
        explain: `V₂ = 240 × ${N2}/1200 = ${V2} V — a step-${N2 > 1200 ? 'up' : 'down'} transformer.`
      };
    }, 'medium'),
    typeanswer(() => {
      const [a, b] = pick([[3, 4], [6, 8], [5, 12]]);
      const c = Math.sqrt(a * a + b * b);
      return {
        cg: 'P27-M2',
        q: `A force has perpendicular components ${a} N and ${b} N. Its magnitude is √(a² + b²). Find it in N.`,
        answer: c,
        tolerance: 0.1,
        explain: `magnitude = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} N (Pythagoras — the geometry toolkit at work).`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P27-M3',
      q: 'As a DC motor speeds up, it generates a back-EMF that:',
      opts: [
        'Adds to the supply voltage',
        'Opposes the supply voltage, reducing the current drawn',
        'Has no effect',
        'Reverses the motor'
      ],
      answer: 1,
      explain: 'The spinning motor acts as a generator: ε_back = k_E ω opposes the supply, so V = IR + ε_back and the current falls as speed rises.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P27-M4',
      q: 'To turn a sensitive galvanometer into an ammeter, you connect a low-resistance ___ in parallel with it.',
      answer: 'shunt',
      accept: ['shunt', 'shunt resistor'],
      explain: 'The shunt carries most of the current, so the meter still reads full-scale on a much larger total current.'
    }), 'medium'),
    typeanswer(() => {
      const th = pick([30, 45, 60]);
      const opp = Math.round(10 * Math.sin(th * Math.PI / 180) * 100) / 100;
      return {
        cg: 'P27-M5',
        q: `In a right triangle the hypotenuse is 10 and one angle is ${th}°. The opposite side = 10 sin θ. Find it (2 d.p.).`,
        answer: opp,
        tolerance: 0.05,
        explain: `opposite = 10 × sin(${th}°) = ${opp} (the "SOH" of SOH-CAH-TOA).`
      };
    }, 'medium'),

    typeanswer(() => {
      const R2 = pick([200, 400, 300]);
      const R4 = 50 * R2 / 100;
      return {
        cg: 'P27-H1',
        q: `A Wheatstone bridge balances when R₁/R₂ = R₃/R₄. Given R₁ = 100 Ω, R₂ = ${R2} Ω, R₃ = 50 Ω, find R₄ (Ω).`,
        answer: R4,
        tolerance: 0.5,
        explain: `R₄ = R₃·R₂/R₁ = 50 × ${R2}/100 = ${R4} Ω. At balance no current flows through the galvanometer.`
      };
    }, 'hard'),
    typeanswer(() => {
      const I2 = pick([5, 10, 2]);
      const I1 = Math.round(I2 * 12 / 240 * 100) / 100;
      return {
        cg: 'P27-H2',
        q: `An ideal step-down transformer takes 240 V to 12 V. If the secondary delivers ${I2} A, then (since P₁ = P₂) I₁ = I₂·(V₂/V₁). Find the primary current in A (2 d.p.).`,
        answer: I1,
        tolerance: 0.02,
        explain: `I₁ = ${I2} × 12/240 = ${I1} A — stepping voltage down steps current up on the secondary side.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P27-H3',
      q: 'To find the third side of a triangle when you know two sides and the angle between them, you use:',
      opts: ['The sine law', 'The cosine law (c² = a² + b² − 2ab cos C)', 'Pythagoras only', "Snell's law"],
      answer: 1,
      explain: 'The cosine law generalises Pythagoras to any angle; when C = 90°, cos C = 0 and it reduces to a² + b² = c².'
    }), 'hard'),
    typeanswer(() => {
      const Pm = pick([700, 850, 900]);
      const eff = Math.round(Pm / 1000 * 100);
      return {
        cg: 'P27-H4',
        q: `A motor takes 1000 W of electrical power and delivers ${Pm} W of mechanical power. Efficiency η = (P_mech/P_elec)×100%. Find η in %.`,
        answer: eff,
        tolerance: 0.5,
        explain: `η = ${Pm}/1000 × 100% = ${eff}%. The missing ${1000 - Pm} W is lost as heat in the windings and friction.`
      };
    }, 'hard'),
    typeanswer(() => {
      const hp = pick([2, 5, 10]);
      const W = hp * 746;
      return {
        cg: 'P27-H5',
        q: `Convert ${hp} horsepower to watts, using 1 hp ≈ 746 W.`,
        answer: W,
        tolerance: 1,
        explain: `${hp} hp × 746 W/hp = ${W} W.`
      };
    }, 'hard')
  ],

  // ── P28 : Forces & motion — the basics (Micro-Frye) ──
  P28: [
    matchQuestion(() => ({
      cg: 'P28-SE1',
      q: 'Match each term to its meaning.',
      pairs: [
        ['Force', 'a push or pull, measured in newtons'],
        ['Mass', 'how much matter there is, in kilograms'],
        ['Friction', 'a force that opposes motion'],
        ['Gravity', 'the pull toward Earth']
      ],
      explain: 'Force is a push/pull; mass is the amount of matter; friction opposes sliding; gravity pulls things down.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P28-SE2',
      q: 'Force is measured in ___.',
      answer: 'newtons',
      accept: ['newtons', 'newton', 'n'],
      explain: '1 newton (N) = 1 kg·m/s² — the force that accelerates 1 kg at 1 m/s².'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P28-SE3',
      q: "Newton's first law is also called the law of:",
      opts: ['Gravity', 'Inertia', 'Friction', 'Energy'],
      answer: 1,
      explain: 'Inertia is the tendency of an object to keep doing what it is doing — at rest or moving steadily — until a net force acts.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P28-SE4',
      q: 'A force is a vector — it has both a size and a direction.',
      answer: true,
      explain: 'You must give both how strong a force is and which way it points; forces add as vectors.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P28-SE5',
      q: 'Friction always acts to oppose motion (or attempted motion).',
      answer: true,
      explain: 'Friction points opposite to the way a surface is sliding, or tending to slide — which is what lets us walk and brakes work.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P28-E1',
      q: "Newton's second law is written as:",
      opts: ['F = ma', 'E = mc²', 'V = IR', 'p = mv'],
      answer: 0,
      explain: 'F = ma: net force equals mass times acceleration, with acceleration in the direction of the net force.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P28-E2',
      q: "Match each of Newton's laws (and inertia) to its idea.",
      pairs: [
        ['First law', 'no net force ⇒ velocity stays constant'],
        ['Second law', 'F = ma'],
        ['Third law', 'equal and opposite forces'],
        ['Inertia', 'resistance to a change in motion']
      ],
      explain: 'First = inertia, second = F = ma, third = action–reaction.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P28-E3',
      q: 'The force a surface pushes back with, perpendicular to itself, is the ___ force.',
      answer: 'normal',
      accept: ['normal', 'normal force'],
      explain: 'The normal force supports objects on a surface; on a flat floor it equals the weight, N = mg.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P28-E4',
      q: 'Tension is a pulling force in a rope or cable — a rope can pull but never push.',
      answer: true,
      explain: 'A rope or cable only sustains tension (pull). Push on it and it just goes slack.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P28-E5',
      q: 'When the forces on an object are balanced (net force zero), the object:',
      opts: ['Must be at rest', 'Stays at rest or moves at constant velocity', 'Always slows down', 'Speeds up'],
      answer: 1,
      explain: 'Zero net force means zero acceleration — so a still object stays still, and a moving one keeps a constant velocity (equilibrium).'
    }), 'easy'),

    typeanswer(() => {
      const d = pick([100, 150, 200]);
      const t = pick([5, 10]);
      return {
        cg: 'P28-M1',
        q: `An object travels ${d} m in ${t} s. What is its average speed? (speed = distance ÷ time, in m/s)`,
        answer: d / t,
        tolerance: 0.1,
        explain: `speed = ${d}/${t} = ${d / t} m/s.`
      };
    }, 'medium'),
    typeanswer(() => {
      const m = pick([3, 6, 10]);
      const a = pick([2, 5]);
      return {
        cg: 'P28-M2',
        q: `A ${m} kg object accelerates at ${a} m/s². What net force acts on it? (F = ma, in N)`,
        answer: m * a,
        tolerance: 0.1,
        explain: `F = ma = ${m} × ${a} = ${m * a} N.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P28-M3',
      q: 'A skydiver falling at terminal velocity moves at constant speed. The net force on her is:',
      opts: ['Downward', 'Upward', 'Zero', 'Sideways'],
      answer: 2,
      explain: 'At terminal velocity, air resistance up equals weight down, so the net force is zero and she falls at constant velocity (dynamic equilibrium).'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P28-M4',
      q: 'Weight is calculated as mass times ___ (about 9.8 N/kg on Earth).',
      answer: 'g',
      accept: ['g', 'gravity', 'gravitational field strength', 'gravitational acceleration'],
      explain: 'Weight w = mg. The same mass weighs less on the Moon because g is smaller there.'
    }), 'medium'),
    typeanswer(() => {
      const m = pick([2, 5, 10]);
      const w = Math.round(m * 9.8 * 10) / 10;
      return {
        cg: 'P28-M5',
        q: `What is the weight of a ${m} kg object on Earth? Use w = mg with g = 9.8 N/kg. Answer in N.`,
        answer: w,
        tolerance: 0.2,
        explain: `w = ${m} × 9.8 = ${w} N.`
      };
    }, 'medium'),

    typeanswer(() => {
      const mu = pick([0.2, 0.3, 0.5]);
      const N = pick([100, 200]);
      const f = Math.round(mu * N * 10) / 10;
      return {
        cg: 'P28-H1',
        q: `A block presses on the ground with normal force ${N} N. The coefficient of friction is μ = ${mu}. Maximum friction f = μN. Find f in N.`,
        answer: f,
        tolerance: 0.5,
        explain: `f = μN = ${mu} × ${N} = ${f} N.`
      };
    }, 'hard'),
    typeanswer(() => {
      const dv = pick([20, 30]);
      const t = pick([5, 10]);
      const a = Math.round(dv / t * 100) / 100;
      return {
        cg: 'P28-H2',
        q: `A car's speed changes by ${dv} m/s over ${t} s. Acceleration a = Δv/Δt. Find a in m/s².`,
        answer: a,
        tolerance: 0.1,
        explain: `a = ${dv}/${t} = ${a} m/s².`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P28-H3',
      q: 'A 2 kg ball and a 5 kg ball are dropped together with no air resistance. They:',
      opts: ['The 5 kg ball lands first', 'The 2 kg ball lands first', 'Land at the same time', 'Never land'],
      answer: 2,
      explain: 'a = mg/m = g for both — the mass cancels, so all objects fall with the same acceleration and land together.'
    }), 'hard'),
    typeanswer(() => {
      const m = pick([10, 20]);
      const th = pick([30, 60]);
      const N = Math.round(m * 9.8 * Math.cos(th * Math.PI / 180) * 10) / 10;
      return {
        cg: 'P28-H4',
        q: `A ${m} kg block rests on a slope angled at ${th}° to the horizontal. The normal force is N = mg cos θ (g = 9.8). Find N in N (1 d.p.).`,
        answer: N,
        tolerance: 0.5,
        explain: `N = ${m} × 9.8 × cos(${th}°) = ${N} N — less than the full weight, because the slope only supports the perpendicular part.`
      };
    }, 'hard'),
    truefalse(() => ({
      cg: 'P28-H5',
      q: "Newton's third-law action and reaction forces act on different objects, so they never cancel each other out.",
      answer: true,
      explain: 'The pair acts on two different bodies (e.g. you push the wall, the wall pushes you). Since they act on different objects, they do not cancel.'
    }), 'hard')
  ],

  // ── P29 : Energy — the basics (Micro-Frye) ──
  P29: [
    matchQuestion(() => ({
      cg: 'P29-SE1',
      q: 'Match each term to its meaning.',
      pairs: [
        ['Kinetic energy', 'energy of motion'],
        ['Potential energy', 'energy of position'],
        ['Work', 'force × distance'],
        ['Power', 'energy transferred per second']
      ],
      explain: 'Motion energy, stored (position) energy, work as force over distance, and power as the rate of energy transfer.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P29-SE2',
      q: 'Energy is measured in ___.',
      answer: 'joules',
      accept: ['joules', 'joule', 'j'],
      explain: '1 joule (J) = 1 N·m = 1 kg·m²/s².'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P29-SE3',
      q: 'Energy cannot be created or destroyed, only:',
      opts: ['Used up forever', 'Changed from one form to another', 'Made into matter', 'Slowed down'],
      answer: 1,
      explain: 'Conservation of energy: the total stays constant; it just changes form (chemical → kinetic → heat, and so on).'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P29-SE4',
      q: 'Power is the rate at which energy is transferred (energy per unit time).',
      answer: true,
      explain: 'P = energy ÷ time, in watts (1 W = 1 J/s).'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P29-SE5',
      q: 'Lifting a box higher gives it more gravitational potential energy.',
      answer: true,
      explain: 'GPE = mgh rises with height h, because you do work against gravity to lift it.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P29-E1',
      q: 'Kinetic energy is given by:',
      opts: ['mgh', '½mv²', 'Fd', 'mv'],
      answer: 1,
      explain: 'KE = ½mv² — the energy of motion, scaling with the square of speed.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P29-E2',
      q: 'Match each quantity to its formula.',
      pairs: [
        ['Work', 'F·d·cos θ'],
        ['Kinetic energy', '½mv²'],
        ['Potential energy', 'mgh'],
        ['Power', 'work ÷ time']
      ],
      explain: 'These four formulas cover work, motion energy, height energy, and the rate of doing work.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P29-E3',
      q: 'No real machine is 100% efficient; the "lost" energy usually ends up as ___.',
      answer: 'heat',
      accept: ['heat', 'thermal energy', 'thermal'],
      explain: 'Friction and other losses degrade useful energy into heat spread into the surroundings (the second law of thermodynamics).'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P29-E4',
      q: 'Doing work (in the physics sense) requires that the object actually moves.',
      answer: true,
      explain: 'W = Fd. With no displacement, the work is zero — holding something still does no physical work, however tiring.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P29-E5',
      q: 'One horsepower is about:',
      opts: ['7.46 W', '74.6 W', '746 W', '7460 W'],
      answer: 2,
      explain: '1 hp ≈ 746 W — roughly the sustained output of a strong horse.'
    }), 'easy'),

    typeanswer(() => {
      const F = pick([20, 50, 100]);
      const d = pick([3, 5]);
      return {
        cg: 'P29-M1',
        q: `A force of ${F} N pushes an object ${d} m in the direction of the force. Work W = Fd. Find W in joules.`,
        answer: F * d,
        tolerance: 0.1,
        explain: `W = ${F} × ${d} = ${F * d} J.`
      };
    }, 'medium'),
    typeanswer(() => {
      const m = pick([2, 4]);
      const v = pick([3, 5, 10]);
      return {
        cg: 'P29-M2',
        q: `Find the kinetic energy of a ${m} kg object moving at ${v} m/s. KE = ½mv², in joules.`,
        answer: 0.5 * m * v * v,
        tolerance: 0.1,
        explain: `KE = ½ × ${m} × ${v}² = ${0.5 * m * v * v} J.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P29-M3',
      q: 'A motor uses 200 J of energy to do 150 J of useful work. Its efficiency is:',
      opts: ['133%', '75%', '50%', '25%'],
      answer: 1,
      explain: 'η = useful ÷ input = 150/200 = 0.75 = 75%. The other 50 J becomes heat.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P29-M4',
      q: 'Gravitational potential energy is mass × g × ___.',
      answer: 'height',
      accept: ['height', 'h', 'the height'],
      explain: 'GPE = mgh. Only the change in height matters.'
    }), 'medium'),
    typeanswer(() => {
      const m = pick([2, 5]);
      const h = pick([3, 10]);
      const E = Math.round(m * 9.8 * h * 10) / 10;
      return {
        cg: 'P29-M5',
        q: `How much gravitational potential energy does a ${m} kg object gain when lifted ${h} m? Use GPE = mgh with g = 9.8. Answer in J.`,
        answer: E,
        tolerance: 0.5,
        explain: `GPE = ${m} × 9.8 × ${h} = ${E} J.`
      };
    }, 'medium'),

    typeanswer(() => {
      const W = pick([600, 1200, 2000]);
      const t = pick([4, 10]);
      const P = Math.round(W / t * 10) / 10;
      return {
        cg: 'P29-H1',
        q: `A machine does ${W} J of work in ${t} s. Power P = W/t. Find P in watts.`,
        answer: P,
        tolerance: 0.5,
        explain: `P = ${W}/${t} = ${P} W.`
      };
    }, 'hard'),
    typeanswer(() => {
      const useful = pick([300, 400, 450]);
      const eff = Math.round(useful / 500 * 100);
      return {
        cg: 'P29-H2',
        q: `A device takes in 500 J and delivers ${useful} J of useful output. Efficiency η = (output/input)×100%. Find η in %.`,
        answer: eff,
        tolerance: 0.5,
        explain: `η = ${useful}/500 × 100% = ${eff}%.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P29-H3',
      q: 'By the work–energy theorem, if the net work done on a moving object is negative, its speed:',
      opts: ['Increases', 'Decreases', 'Stays the same', 'Becomes negative'],
      answer: 1,
      explain: 'W_net = ΔKE. Negative net work removes kinetic energy, so the object slows down.'
    }), 'hard'),
    typeanswer(() => {
      const k = pick([200, 400, 800]);
      const U = Math.round(0.5 * k * 0.1 * 0.1 * 100) / 100;
      return {
        cg: 'P29-H4',
        q: `A spring of stiffness ${k} N/m is stretched 0.10 m. Elastic energy U = ½kx². Find U in joules.`,
        answer: U,
        tolerance: 0.05,
        explain: `U = ½ × ${k} × (0.10)² = ${U} J.`
      };
    }, 'hard'),
    typeanswer(() => {
      const [m, E] = pick([[2, 100], [8, 144], [2, 64]]);
      const v = Math.round(Math.sqrt(2 * E / m) * 100) / 100;
      return {
        cg: 'P29-H5',
        q: `An object of mass ${m} kg has ${E} J of kinetic energy. From KE = ½mv², its speed v = √(2·KE/m). Find v in m/s.`,
        answer: v,
        tolerance: 0.1,
        explain: `v = √(2 × ${E}/${m}) = ${v} m/s.`
      };
    }, 'hard')
  ],

  // ── P30 : Electricity — the basics (Micro-Frye) ──
  P30: [
    matchQuestion(() => ({
      cg: 'P30-SE1',
      q: 'Match each electrical quantity to its meaning.',
      pairs: [
        ['Current', 'the flow of charge (amps)'],
        ['Voltage', 'the electrical push (volts)'],
        ['Resistance', 'opposition to current (ohms)'],
        ['Charge', 'a basic property of matter (coulombs)']
      ],
      explain: 'Current flows, voltage pushes, resistance opposes, and charge is the underlying quantity.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P30-SE2',
      q: 'Electric current is measured in ___.',
      answer: 'amperes',
      accept: ['amperes', 'amps', 'ampere', 'amp', 'a'],
      explain: '1 ampere (A) = 1 coulomb per second.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P30-SE3',
      q: "Ohm's law relates voltage, current and resistance as:",
      opts: ['V = IR', 'P = IV', 'V = I/R', 'R = IV'],
      answer: 0,
      explain: 'V = IR: voltage equals current times resistance.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P30-SE4',
      q: 'A conductor (like copper) lets current flow easily, while an insulator (like rubber) does not.',
      answer: true,
      explain: 'Conductors have many free electrons (low resistivity); insulators have almost none (very high resistivity).'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P30-SE5',
      q: 'Direct current (DC) flows one way; alternating current (AC) reverses direction periodically.',
      answer: true,
      explain: 'Batteries give DC; mains supply is AC, swinging back and forth as a sine wave.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P30-E1',
      q: 'Electric current is defined as:',
      opts: ['Voltage × resistance', 'Charge per unit time (I = Q/t)', 'Energy per charge', 'Power × time'],
      answer: 1,
      explain: 'I = Q/t — the rate at which charge flows, measured in amperes (C/s).'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P30-E2',
      q: 'Match each formula to what it gives.',
      pairs: [
        ['V = IR', "Ohm's law"],
        ['P = IV', 'electric power'],
        ['R = ρl/A', 'resistance of a wire'],
        ['I = Q/t', 'current']
      ],
      explain: 'The core electricity formulas: Ohm\'s law, power, wire resistance, and the definition of current.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P30-E3',
      q: 'In a series circuit, the current is the ___ through every component.',
      answer: 'same',
      accept: ['same', 'equal', 'identical'],
      explain: 'There is only one path, so the same current flows through each component in series.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P30-E4',
      q: 'In a parallel circuit, every branch has the same voltage across it.',
      answer: true,
      explain: 'Branches share the same two nodes, so they all see the same potential difference; the current splits between them.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P30-E5',
      q: 'A fuse protects a circuit by:',
      opts: [
        'Storing extra charge',
        'Melting and breaking the circuit when the current gets too high',
        'Increasing the voltage',
        'Cooling the wires'
      ],
      answer: 1,
      explain: 'Excess current heats the thin fuse wire (P = I²R) until it melts, cutting the circuit before damage occurs.'
    }), 'easy'),

    typeanswer(() => {
      const I = pick([2, 3, 5]);
      const R = pick([4, 10]);
      return {
        cg: 'P30-M1',
        q: `A current of ${I} A flows through a ${R} Ω resistor. Using V = IR, find the voltage across it (V).`,
        answer: I * R,
        tolerance: 0.1,
        explain: `V = IR = ${I} × ${R} = ${I * R} V.`
      };
    }, 'medium'),
    typeanswer(() => {
      const [V, R] = pick([[12, 3], [24, 6], [9, 3]]);
      return {
        cg: 'P30-M2',
        q: `A ${V} V supply drives a ${R} Ω resistor. Using I = V/R, find the current (A).`,
        answer: V / R,
        tolerance: 0.1,
        explain: `I = V/R = ${V}/${R} = ${V / R} A.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P30-M3',
      q: 'Two resistors R₁ and R₂ in series have a total resistance of:',
      opts: ['R₁ + R₂', 'R₁ × R₂', 'less than either one', '(R₁ + R₂)/2'],
      answer: 0,
      explain: 'Series resistances add directly: R_total = R₁ + R₂. (Parallel ones combine by the reciprocal rule and give less than the smallest.)'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P30-M4',
      q: 'Electric power equals current times ___ (P = IV).',
      answer: 'voltage',
      accept: ['voltage', 'v', 'the voltage'],
      explain: 'P = IV (watts). Equivalent forms are I²R and V²/R.'
    }), 'medium'),
    typeanswer(() => {
      const [I, V] = pick([[2, 12], [3, 12], [0.5, 230]]);
      return {
        cg: 'P30-M5',
        q: `A device draws ${I} A at ${V} V. Power P = IV. Find P in watts.`,
        answer: I * V,
        tolerance: 0.5,
        explain: `P = ${I} × ${V} = ${I * V} W.`
      };
    }, 'medium'),

    typeanswer(() => {
      const [R1, R2] = pick([[6, 3], [12, 4], [10, 40]]);
      const Rp = Math.round(R1 * R2 / (R1 + R2) * 100) / 100;
      return {
        cg: 'P30-H1',
        q: `Two resistors, ${R1} Ω and ${R2} Ω, are in parallel. R_total = R₁R₂/(R₁+R₂). Find the total resistance (Ω).`,
        answer: Rp,
        tolerance: 0.1,
        explain: `R = (${R1}×${R2})/(${R1}+${R2}) = ${Rp} Ω — less than the smaller resistor.`
      };
    }, 'hard'),
    typeanswer(() => {
      const I = pick([2, 3]);
      const R = pick([5, 10]);
      const P = I * I * R;
      return {
        cg: 'P30-H2',
        q: `A current of ${I} A flows through a ${R} Ω resistor. Power dissipated P = I²R. Find P in watts.`,
        answer: P,
        tolerance: 0.5,
        explain: `P = ${I}² × ${R} = ${P} W, released as heat.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P30-H3',
      q: 'Power lost as heat in a transmission wire is P = I²R. To cut these losses, power is sent long distances at:',
      opts: ['High current, low voltage', 'High voltage, low current', 'Zero voltage', 'High resistance'],
      answer: 1,
      explain: 'For a given power P = VI, raising the voltage lowers the current. Since losses go as I², a smaller current sharply cuts the heat lost in the line.'
    }), 'hard'),
    typeanswer(() => {
      const emf = pick([12, 9]);
      const I = pick([2, 3]);
      const r = pick([0.5, 1]);
      const V = Math.round((emf - I * r) * 100) / 100;
      return {
        cg: 'P30-H4',
        q: `A battery of EMF ${emf} V has internal resistance ${r} Ω. When it supplies ${I} A, the terminal voltage is V = EMF − Ir. Find V in volts.`,
        answer: V,
        tolerance: 0.05,
        explain: `V = ${emf} − ${I}×${r} = ${V} V — the terminal voltage sags below the EMF under load.`
      };
    }, 'hard'),
    truefalse(() => ({
      cg: 'P30-H5',
      q: 'Adding more resistors in parallel decreases the total resistance of that section.',
      answer: true,
      explain: 'Each extra parallel path gives current another route, so the combined resistance falls below that of any single branch.'
    }), 'hard')
  ],

  // ── P31 : Waves & oscillations — the basics (Micro-Frye) ──
  P31: [
    matchQuestion(() => ({
      cg: 'P31-SE1',
      q: 'Match each wave term to its meaning.',
      pairs: [
        ['Amplitude', 'maximum displacement from rest'],
        ['Frequency', 'cycles per second (Hz)'],
        ['Wavelength', 'distance between two crests'],
        ['Period', 'time for one full cycle']
      ],
      explain: 'Amplitude is how big, frequency is how often, wavelength is the length of a cycle, period is the time for one cycle.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P31-SE2',
      q: 'The number of complete waves passing each second is the ___.',
      answer: 'frequency',
      accept: ['frequency', 'frequency (f)'],
      explain: 'Frequency is measured in hertz (Hz); it sets the pitch of a sound.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P31-SE3',
      q: 'The wave equation linking speed, frequency and wavelength is:',
      opts: ['v = fλ', 'v = f/λ', 'v = f + λ', 'v = λ/f'],
      answer: 0,
      explain: 'v = fλ — wave speed equals frequency times wavelength.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P31-SE4',
      q: 'Sound is a wave that needs a medium and cannot travel through a vacuum.',
      answer: true,
      explain: 'Sound is a vibration of matter; with no matter to compress, it cannot travel.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P31-SE5',
      q: 'Light can travel through a vacuum, but sound cannot.',
      answer: true,
      explain: 'Light is an electromagnetic wave needing no medium; sound is mechanical and needs one.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P31-E1',
      q: "A wave's frequency f and period T are related by:",
      opts: ['f = 1/T', 'f = T', 'f = T²', 'f = 2T'],
      answer: 0,
      explain: 'Frequency is the reciprocal of the period: f = 1/T.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P31-E2',
      q: 'Match each wave behaviour to its description.',
      pairs: [
        ['Reflection', 'bouncing off a surface'],
        ['Refraction', 'bending at a boundary'],
        ['Diffraction', 'spreading through a gap'],
        ['Interference', 'waves adding or cancelling']
      ],
      explain: 'The four classic wave behaviours: bounce, bend, spread, and overlap.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P31-E3',
      q: 'Sound is a ___ wave: the air vibrates back and forth along the direction the wave travels.',
      answer: 'longitudinal',
      accept: ['longitudinal'],
      explain: 'In a longitudinal wave the oscillation is parallel to travel (compressions and rarefactions), unlike a transverse wave.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P31-E4',
      q: 'Resonance occurs when a system is driven at its natural frequency, producing large oscillations.',
      answer: true,
      explain: 'Pushing a swing in time with its natural rhythm builds a big amplitude — that is resonance.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P31-E5',
      q: 'A siren drops in pitch as it passes you. This is the:',
      opts: ['Resonance effect', 'Doppler effect', 'Reflection effect', 'Diffraction effect'],
      answer: 1,
      explain: 'Relative motion changes the observed frequency: higher pitch approaching, lower pitch receding — the Doppler effect.'
    }), 'easy'),

    typeanswer(() => {
      const f = pick([200, 500, 1000]);
      const lam = pick([0.5, 2]);
      return {
        cg: 'P31-M1',
        q: `A wave has frequency ${f} Hz and wavelength ${lam} m. Using v = fλ, find its speed in m/s.`,
        answer: f * lam,
        tolerance: 1,
        explain: `v = ${f} × ${lam} = ${f * lam} m/s.`
      };
    }, 'medium'),
    typeanswer(() => {
      const f = pick([2, 4, 5, 50]);
      const T = Math.round(1 / f * 1000) / 1000;
      return {
        cg: 'P31-M2',
        q: `A wave has a frequency of ${f} Hz. Its period T = 1/f. Find T in seconds (3 d.p.).`,
        answer: T,
        tolerance: 0.002,
        explain: `T = 1/${f} = ${T} s.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P31-M3',
      q: 'Waves spread out (diffract) the most when they pass through a gap that is:',
      opts: ['Much larger than the wavelength', 'About the same size as the wavelength', 'Perfectly square', 'Made of metal'],
      answer: 1,
      explain: 'Diffraction is strongest when the gap is comparable to (or smaller than) the wavelength.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P31-M4',
      q: 'Whole-number multiples of the fundamental frequency are called ___.',
      answer: 'harmonics',
      accept: ['harmonics', 'harmonic', 'overtones'],
      explain: 'The fundamental plus its harmonics (2f, 3f, …) and their relative strengths give an instrument its timbre.'
    }), 'medium'),
    typeanswer(() => {
      const Tc = pick([10, 20, 25]);
      const v = Math.round((331 + 0.6 * Tc) * 10) / 10;
      return {
        cg: 'P31-M5',
        q: `The speed of sound in air is about v ≈ 331 + 0.6T (T in °C). Find v at ${Tc} °C, in m/s (1 d.p.).`,
        answer: v,
        tolerance: 0.5,
        explain: `v ≈ 331 + 0.6 × ${Tc} = ${v} m/s.`
      };
    }, 'medium'),

    typeanswer(() => {
      const lam = pick([0.5, 1, 2]);
      const f = Math.round(340 / lam);
      return {
        cg: 'P31-H1',
        q: `Sound travels at 340 m/s. A note has wavelength ${lam} m. Using f = v/λ, find its frequency in Hz.`,
        answer: f,
        tolerance: 1,
        explain: `f = 340/${lam} = ${f} Hz.`
      };
    }, 'hard'),
    typeanswer(() => {
      const T = pick([50, 100, 200]);
      const v = Math.round(Math.sqrt(T / 0.02) * 10) / 10;
      return {
        cg: 'P31-H2',
        q: `A string under ${T} N of tension has mass per length 0.02 kg/m. Wave speed v = √(T/μ). Find v in m/s (1 d.p.).`,
        answer: v,
        tolerance: 0.5,
        explain: `v = √(${T}/0.02) = ${v} m/s — tighter or lighter strings carry waves faster.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P31-H3',
      q: 'Two identical waves meet exactly out of phase (a crest lines up with a trough). The result is:',
      opts: ['Constructive interference (bigger wave)', 'Destructive interference (they cancel)', 'A standing wave', 'Refraction'],
      answer: 1,
      explain: 'Out-of-phase superposition subtracts the displacements — for equal waves, they cancel. This is how noise-cancelling headphones work.'
    }), 'hard'),
    typeanswer(() => {
      const f1 = pick([256, 440]);
      const d = pick([2, 3, 4]);
      const f2 = f1 + d;
      return {
        cg: 'P31-H4',
        q: `Two notes at ${f1} Hz and ${f2} Hz are played together. The beat frequency = |f₁ − f₂|. Find it in Hz.`,
        answer: d,
        tolerance: 0.1,
        explain: `Beat frequency = |${f1} − ${f2}| = ${d} Hz — the loudness throbs ${d} times a second.`
      };
    }, 'hard'),
    truefalse(() => ({
      cg: 'P31-H5',
      q: 'All electromagnetic waves travel at the same speed c in a vacuum, regardless of their frequency.',
      answer: true,
      explain: 'Radio, light and gamma rays all move at c ≈ 3×10⁸ m/s in vacuum; only their frequency and wavelength differ.'
    }), 'hard')
  ],

  // ── P32 : Heat & matter — the basics (Micro-Frye) ──
  P32: [
    matchQuestion(() => ({
      cg: 'P32-SE1',
      q: 'Match each idea to its description.',
      pairs: [
        ['Conduction', 'heat passing through a solid by contact'],
        ['Convection', 'heat carried by moving fluid'],
        ['Radiation', 'heat as EM waves, needing no medium'],
        ['Temperature', 'average energy of the particles']
      ],
      explain: 'The three modes of heat transfer plus temperature, the measure of average particle energy.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P32-SE2',
      q: 'The SI unit of temperature is the ___.',
      answer: 'kelvin',
      accept: ['kelvin', 'kelvins', 'k'],
      explain: '0 K is absolute zero; a change of 1 K equals a change of 1 °C.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P32-SE3',
      q: 'Heat naturally flows from:',
      opts: ['Cold to hot', 'Hot to cold', 'Low to high pressure', 'Light to dark'],
      answer: 1,
      explain: 'The second law of thermodynamics: heat flows by itself only from hotter to colder.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P32-SE4',
      q: 'Most materials expand when they are heated.',
      answer: true,
      explain: 'Higher temperature makes particles vibrate more and take up more space — which is why bridges need expansion joints.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P32-SE5',
      q: 'While ice melts or water boils, the temperature stays constant even though heat is added.',
      answer: true,
      explain: 'The added latent heat breaks bonds during the phase change rather than raising the temperature.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P32-E1',
      q: 'The heat to warm an object is Q = mcΔT, where c is the:',
      opts: ['Speed of light', 'Specific heat capacity', 'Charge', 'Latent heat'],
      answer: 1,
      explain: 'Specific heat capacity c is the energy to raise 1 kg by 1 K. Water\'s is high (≈4200 J/kg·K).'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P32-E2',
      q: 'Match each formula to what it describes.',
      pairs: [
        ['Q = mcΔT', 'heating without phase change'],
        ['Q = mL', 'phase change (melting/boiling)'],
        ['Q/t = kAΔT/L', 'conduction rate'],
        ['P = εσAT⁴', 'thermal radiation']
      ],
      explain: 'These cover heating, phase change, conduction and radiation.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P32-E3',
      q: 'Energy absorbed during a phase change, with no temperature rise, is ___ heat.',
      answer: 'latent',
      accept: ['latent', 'latent heat'],
      explain: 'Q = mL. Latent heat of fusion melts a solid; latent heat of vaporisation boils a liquid.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P32-E4',
      q: 'Every object above absolute zero gives off thermal radiation.',
      answer: true,
      explain: 'By the Stefan–Boltzmann law P = εσAT⁴, any object warmer than 0 K radiates — which is how thermal cameras see in the dark.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P32-E5',
      q: 'Water has a high specific heat capacity, which is why:',
      opts: [
        'It boils almost instantly',
        'It takes a long time to heat up or cool down',
        'It cannot store heat',
        'It freezes faster than other liquids'
      ],
      answer: 1,
      explain: 'A high c means lots of energy per degree, so water (and oceans) warm and cool slowly, buffering temperature.'
    }), 'easy'),

    typeanswer(() => {
      const m = pick([0.5, 1, 2]);
      const dT = pick([10, 20]);
      const Q = m * 4200 * dT;
      return {
        cg: 'P32-M1',
        q: `How much heat (J) raises ${m} kg of water by ${dT} °C? Use Q = mcΔT with c = 4200 J/kg·K.`,
        answer: Q,
        tolerance: 10,
        explain: `Q = ${m} × 4200 × ${dT} = ${Q} J.`
      };
    }, 'medium'),
    typeanswer(() => {
      const m = pick([0.1, 0.5, 1]);
      const Q = m * 334000;
      return {
        cg: 'P32-M2',
        q: `How much heat (J) melts ${m} kg of ice at 0 °C? Use Q = mL_f with L_f = 334000 J/kg.`,
        answer: Q,
        tolerance: 50,
        explain: `Q = ${m} × 334000 = ${Q} J — going into breaking bonds at constant temperature.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P32-M3',
      q: 'The ideal gas law is:',
      opts: ['PV = nRT', 'Q = mcΔT', 'V = IR', 'F = ma'],
      answer: 0,
      explain: 'PV = nRT links pressure, volume, amount and absolute temperature (R = 8.314 J/mol·K).'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P32-M4',
      q: 'Heat carried by hot fluid physically rising and circulating is called ___.',
      answer: 'convection',
      accept: ['convection'],
      explain: 'Warm fluid is less dense and rises; cool fluid sinks — a convection current.'
    }), 'medium'),
    typeanswer(() => {
      const V1 = pick([3, 4, 6]);
      const P2 = 100 * V1 / 2;
      return {
        cg: 'P32-M5',
        q: `${V1} L of gas at 100 kPa is squeezed to 2.0 L at constant temperature. Boyle's law P₁V₁ = P₂V₂. Find the new pressure (kPa).`,
        answer: P2,
        tolerance: 1,
        explain: `P₂ = 100 × ${V1}/2.0 = ${P2} kPa.`
      };
    }, 'medium'),

    typeanswer(() => {
      const [a, metal] = pick([[12e-6, 'steel'], [23e-6, 'aluminium']]);
      const L0 = pick([5, 10]);
      const dT = pick([40, 50]);
      const dL = Math.round(a * L0 * dT * 1000 * 100) / 100;
      return {
        cg: 'P32-H1',
        q: `A ${L0} m ${metal} rod (α = ${a === 12e-6 ? '12' : '23'}×10⁻⁶ /°C) is heated by ${dT} °C. Expansion ΔL = αL₀ΔT. Find ΔL in mm (2 d.p.).`,
        answer: dL,
        tolerance: 0.1,
        explain: `ΔL = ${a === 12e-6 ? '12' : '23'}×10⁻⁶ × ${L0} × ${dT} = ${dL} mm.`
      };
    }, 'hard'),
    typeanswer(() => {
      const k = pick([0.5, 1, 2]);
      const dT = pick([20, 40]);
      const L = pick([0.1, 0.2]);
      const H = Math.round(k * 2 * dT / L);
      return {
        cg: 'P32-H2',
        q: `Heat conducts through a slab: area 2 m², conductivity k = ${k} W/m·K, temperature difference ${dT} K, thickness ${L} m. Q/t = kAΔT/L. Find the heat current in W.`,
        answer: H,
        tolerance: 1,
        explain: `Q/t = ${k} × 2 × ${dT} / ${L} = ${H} W.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P32-H3',
      q: 'Thermal radiation follows P ∝ T⁴ (absolute temperature). If you double the absolute temperature of an object, its radiated power rises by a factor of:',
      opts: ['2', '4', '8', '16'],
      answer: 3,
      explain: 'P ∝ T⁴, so doubling T multiplies the power by 2⁴ = 16.'
    }), 'hard'),
    typeanswer(() => {
      const C = pick([27, 100, -23]);
      const K = C + 273;
      return {
        cg: 'P32-H4',
        q: `Convert ${C} °C to kelvin. (K = °C + 273.)`,
        answer: K,
        tolerance: 1,
        explain: `${C} + 273 = ${K} K.`
      };
    }, 'hard'),
    truefalse(() => ({
      cg: 'P32-H5',
      q: 'In an ideal gas, the average kinetic energy of the molecules depends only on the absolute temperature.',
      answer: true,
      explain: 'KE_avg = (3/2)k_B T — at a given temperature, every ideal gas has the same average molecular kinetic energy.'
    }), 'hard')
  ],

  // ── P33 : Optics — the basics (Micro-Frye) ──
  P33: [
    matchQuestion(() => ({
      cg: 'P33-SE1',
      q: 'Match each optical idea to its description.',
      pairs: [
        ['Reflection', 'light bouncing off a mirror'],
        ['Refraction', 'light bending entering glass'],
        ['Lens', 'a shaped piece that focuses light'],
        ['Shadow', 'light blocked by an opaque object']
      ],
      explain: 'Bouncing, bending, focusing, and blocking — the basics of how light behaves.'
    }), 'super-easy'),
    fillblank(() => ({
      cg: 'P33-SE2',
      q: 'In a uniform medium, light travels in straight ___.',
      answer: 'lines',
      accept: ['lines', 'rays', 'straight lines'],
      explain: 'Rectilinear propagation — straight-line travel — explains sharp shadows and the pinhole camera.'
    }), 'super-easy'),
    mcq(() => ({
      cg: 'P33-SE3',
      q: 'The law of reflection says the angle of incidence equals the angle of:',
      opts: ['Refraction', 'Reflection', 'Diffraction', 'Dispersion'],
      answer: 1,
      explain: 'θ_i = θ_r, both measured from the normal to the surface.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P33-SE4',
      q: 'Light slows down when it enters glass or water.',
      answer: true,
      explain: 'In a medium, v = c/n with n > 1, so light is slower than in a vacuum.'
    }), 'super-easy'),
    truefalse(() => ({
      cg: 'P33-SE5',
      q: 'A plane (flat) mirror produces a virtual image that appears to be behind the mirror.',
      answer: true,
      explain: 'The image is upright, the same size, and the same distance behind the mirror as the object is in front.'
    }), 'super-easy'),

    mcq(() => ({
      cg: 'P33-E1',
      q: "Snell's law of refraction is:",
      opts: ['n₁ sin θ₁ = n₂ sin θ₂', 'θ_i = θ_r', '1/f = 1/u + 1/v', 'n = c/v'],
      answer: 0,
      explain: 'n₁ sin θ₁ = n₂ sin θ₂ relates the angles on the two sides of a boundary to the refractive indices.'
    }), 'easy'),
    matchQuestion(() => ({
      cg: 'P33-E2',
      q: 'Match each optical element to what it does to light.',
      pairs: [
        ['Convex lens', 'converges (brings rays together)'],
        ['Concave lens', 'diverges (spreads rays apart)'],
        ['Concave mirror', 'converges reflected rays'],
        ['Convex mirror', 'diverges reflected rays']
      ],
      explain: 'Convex lenses and concave mirrors converge; concave lenses and convex mirrors diverge.'
    }), 'easy'),
    fillblank(() => ({
      cg: 'P33-E3',
      q: 'The bending of light as it passes from one medium into another is called ___.',
      answer: 'refraction',
      accept: ['refraction', 'refract'],
      explain: 'The change of speed at the boundary redirects the ray — refraction, set by Snell\'s law.'
    }), 'easy'),
    truefalse(() => ({
      cg: 'P33-E4',
      q: 'Total internal reflection can only happen when light goes from a denser medium toward a less dense one.',
      answer: true,
      explain: 'Only from high n to low n is there a critical angle θ_c = arcsin(n₂/n₁) beyond which the light is fully reflected.'
    }), 'easy'),
    mcq(() => ({
      cg: 'P33-E5',
      q: 'A real image is one that:',
      opts: [
        'Can be projected onto a screen',
        'Only appears to be behind a mirror',
        'Is always upright',
        'Cannot be photographed'
      ],
      answer: 0,
      explain: 'A real image forms where light rays actually converge, so it can be caught on a screen or sensor (and is inverted).'
    }), 'easy'),

    typeanswer(() => {
      const n = pick([1.5, 2, 2.5]);
      const v = Math.round(3 / n * 100) / 100;
      return {
        cg: 'P33-M1',
        q: `Light enters a medium of refractive index n = ${n}. Its speed v = c/n with c = 3.0×10⁸ m/s. Find v in units of 10⁸ m/s (2 d.p.).`,
        answer: v,
        tolerance: 0.02,
        explain: `v = 3.0/${n} = ${v} (×10⁸ m/s).`
      };
    }, 'medium'),
    typeanswer(() => {
      const R = pick([20, 30, 50]);
      return {
        cg: 'P33-M2',
        q: `A concave mirror has radius of curvature R = ${R} cm. Its focal length f = R/2. Find f in cm.`,
        answer: R / 2,
        tolerance: 0.1,
        explain: `f = R/2 = ${R}/2 = ${R / 2} cm.`
      };
    }, 'medium'),
    mcq(() => ({
      cg: 'P33-M3',
      q: 'Optical fibres carry light around bends using:',
      opts: ['Dispersion', 'Total internal reflection', 'Diffraction', 'Polarization'],
      answer: 1,
      explain: 'Light hits the core boundary above the critical angle and reflects completely, staying trapped as it travels.'
    }), 'medium'),
    fillblank(() => ({
      cg: 'P33-M4',
      q: 'A lens that brings parallel rays together to a focus is a ___ lens.',
      answer: 'converging',
      accept: ['converging', 'convex', 'convex (converging)'],
      explain: 'A convex (converging) lens has a positive focal length and can form real images.'
    }), 'medium'),
    typeanswer(() => {
      const [f, u] = pick([[10, 15], [10, 20], [20, 30]]);
      const v = Math.round(1 / (1 / f - 1 / u) * 10) / 10;
      return {
        cg: 'P33-M5',
        q: `A converging lens has focal length ${f} cm; an object is ${u} cm away. Using 1/f = 1/u + 1/v, find the image distance v in cm.`,
        answer: v,
        tolerance: 0.5,
        explain: `1/v = 1/${f} − 1/${u}, so v = ${v} cm.`
      };
    }, 'medium'),

    typeanswer(() => {
      const n = pick([1.33, 1.5, 2]);
      const tc = Math.round(Math.asin(1 / n) * 180 / Math.PI * 10) / 10;
      return {
        cg: 'P33-H1',
        q: `Find the critical angle for light going from a medium of index n = ${n} into air (n = 1). θ_c = arcsin(1/n). Answer in degrees (1 d.p.).`,
        answer: tc,
        tolerance: 0.5,
        explain: `θ_c = arcsin(1/${n}) = ${tc}°. Beyond this, light is totally internally reflected.`
      };
    }, 'hard'),
    typeanswer(() => {
      const [fo, fe] = pick([[80, 10], [120, 20], [90, 30]]);
      return {
        cg: 'P33-H2',
        q: `A telescope has objective focal length f_o = ${fo} cm and eyepiece f_e = ${fe} cm. Magnification M = f_o/f_e. Find M.`,
        answer: fo / fe,
        tolerance: 0.2,
        explain: `M = ${fo}/${fe} = ${fo / fe}×.`
      };
    }, 'hard'),
    mcq(() => ({
      cg: 'P33-H3',
      q: 'When white light passes through a prism, which colour bends the most?',
      opts: ['Red', 'Yellow', 'Violet', 'They bend equally'],
      answer: 2,
      explain: 'Shorter wavelengths have a higher refractive index (dispersion), so violet bends most and red least — splitting white light into a spectrum.'
    }), 'hard'),
    typeanswer(() => {
      const t1 = pick([30, 40, 50]);
      const t2 = Math.round(Math.asin(Math.sin(t1 * Math.PI / 180) / 1.33) * 180 / Math.PI * 10) / 10;
      return {
        cg: 'P33-H4',
        q: `Light passes from air into water (n = 1.33) at an angle of incidence ${t1}°. Using sin θ₁ = 1.33 sin θ₂, find the refraction angle θ₂ in degrees (1 d.p.).`,
        answer: t2,
        tolerance: 0.5,
        explain: `sin θ₂ = sin(${t1}°)/1.33, so θ₂ = ${t2}° — bent toward the normal in the denser water.`
      };
    }, 'hard'),
    typeanswer(() => {
      const f = pick([0.5, 0.25, 0.2]);
      const P = Math.round(1 / f);
      return {
        cg: 'P33-H5',
        q: `A lens has focal length ${f} m. Its power P = 1/f, in dioptres. Find P.`,
        answer: P,
        tolerance: 0.1,
        explain: `P = 1/${f} = ${P} D.`
      };
    }, 'hard')
  ],
};

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Get questions for a specific path.
 *
 * Banded paths (questions tagged with >1 difficulty) return a quiz that climbs
 * super-easy → easy → medium → hard: `count` is distributed across the bands so
 * every band is represented every run, shuffled within each band, then ordered by
 * difficulty. Un-banded paths (everything still on the default 'medium') keep the
 * original behaviour: a single shuffled slice.
 */
// Launch topics (paths.js) reuse the question pools authored under the old path
// ids. Only tight subject matches are aliased; topics without an entry simply
// have no quiz (PathView hides the CTA via the quizUrls gate).
const PATH_ALIAS = {
  PHY_THERMO: 'P25',   // Thermodynamics & heat
  PHY_UNITS: 'P4',     // Units & dimensions  ← Measurement & dimensions pool
  PHY_FORCES: 'P7',    // Forces & Newton's laws ← Newton's laws & forces pool
  MATH_COORD: 'M3',    // Coordinate geometry ← Coordinate geometry pool
  CHEM_ATOMIC: 'C2',   // Atomic structure
  CHEM_BONDING: 'C3',  // Chemical bonding
  CHEM_MOLE: 'C4'      // Reactions & the mole ← Reactions & molecular architecture pool
};

// All fill-in-the-blank answers defined for a path, used to build plausible
// same-topic tap-to-answer distractors in the quiz (mobile: tap, don't type).
export function getFillBankAnswers(pathId) {
  const pool = PATH_QUESTIONS[pathId] || PATH_QUESTIONS[PATH_ALIAS[pathId]];
  if (!pool) return [];
  const out = [];
  for (const def of pool) {
    if (def.type !== 'fillblank') continue;
    let inst;
    try { inst = def.generate(); } catch { continue; }
    if (inst && inst.answer != null) out.push(String(inst.answer).trim());
  }
  return out;
}

export function getPathQuestions(pathId, count = 10) {
  const pool = PATH_QUESTIONS[pathId] || PATH_QUESTIONS[PATH_ALIAS[pathId]];
  if (!pool) return [];

  const generated = pool.map(def => ({
    type: def.type,
    difficulty: def.difficulty || 'medium',
    ...def.generate()
  }));

  // Group by band, shuffle within each.
  const bands = { 'super-easy': [], 'easy': [], 'medium': [], 'hard': [] };
  for (const q of generated) (bands[q.difficulty] || bands['medium']).push(q);
  for (const k in bands) shuffleInPlace(bands[k]);

  const usedBands = Object.keys(DIFFICULTY_ORDER).filter(k => bands[k].length > 0);

  // Legacy / single-band path: original shuffle-and-slice.
  if (usedBands.length <= 1) {
    return shuffleInPlace(generated).slice(0, Math.min(count, generated.length));
  }

  // Banded path: spread `count` across the bands as evenly as possible, giving the
  // earlier (easier) bands the remainder so the quiz opens gently.
  const base = Math.floor(count / usedBands.length);
  let remainder = count % usedBands.length;
  const selected = [];
  for (const k of usedBands) {
    const take = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    selected.push(...bands[k].slice(0, take));
  }
  selected.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
  return selected;
}

export { randInt, pick };
