<script>
  import { onDestroy } from 'svelte';
  import { theme } from '../lib/stores/theme.js';
  import { registry, byUnit, UNITS, entryFor, sources } from '../factory/index.js';
  import SquareScene from '../lib/components/SquareScene.svelte';
  $: rejected = entry.rejected || {};

  const slots = [['readings', 'reading'], ['interactions', 'interaction'], ['exercises', 'exercise']];

  // Founder, 2026-08-09: we should not have interactions merely for the sake of
  // them. Some ideas have nothing to vary. A notation is a convention, a unit
  // square is a unit by definition, and putting a control on either invents work
  // for the learner rather than giving them any.
  //
  // These kinds are figures, not interactions, and are labelled as such so that
  // choosing one is a decision rather than something that looks like a failed
  // control. Determined by counting the controls each stage actually renders,
  // not by intention: every one of these draws zero.
  const STATIC_KINDS = ['delta-facts', 'notation-card', 'square-back', 'accepted-list',
    'unit-square', 'axes-build', 'glyph-card'];
  const isFigure = kind => STATIC_KINDS.includes(kind);
  // sel and fin are passed in rather than read from scope. Svelte tracks
  // dependencies where they are read, and a helper reaching into the closure
  // would leave this heading frozen; that fault has caught four interactions in
  // this file already.
  const keptIsFigure = (section, sel, fin) => {
    const chosen = section.interactions.find(i => sel[i.code] || fin[i.code]);
    return !!chosen && isFigure(chosen.kind);
  };

  // Interaction kinds that carry their own controls or are deliberately fixed.
  const NO_CONTROL = ['line-fails', 'axes-build', 'find-place', 'quadrants', 'diagonal-bench-stage', 'unit-square', 'unit-square-fixed', 'unit-scale', 'count-grid', 'sorter', 'glyph-card', 'delta-facts', 'delta-token', 'statement-match',
    // The functions boards. Every one of these carries its own stepper, plate
    // picker or number line, so the shared x slider would be dead under them.
    'substitute-strip', 'machine-single', 'rule-swap', 'two-machines', 'relation-test', 'function-word',
    'relation-guess',
    'notation-builder', 'notation-card', 'two-answers', 'square-back', 'function-or-not', 'verdict-strip',
    'accepted-line', 'accepted-list',
    // Foundations. Each carries its own line, bar or columns.
    'zoom-line', 'jug-fill', 'split-bar', 'place-columns', 'compare-two',
    'pair-up', 'pair-mismatch', 'tally-basket', 'same-count', 'pebble-to-figure', 'figure-row',
    'case-focus', 'case-row', 'variable-focus', 'variable-sort', 'dataset-grid', 'dataset-repair',
    'lay-units', 'unit-line', 'walk-line', 'line-runs-out', 'extend-left', 'both-ways',
    'root-both-ways', 'square-grid', 'root-search', 'root-approx', 'root-on-line', 'diagonal-square',
    'table-plot-step', 'table-plot-predict', 'table-plot-sprint', 'table-rule-switch',
    'table-points', 'table-points-order', 'point-target-drill', 'point-target-shuffle',
    'curve-from-points', 'curve-rule-compare', 'curve-plot-drill', 'curve-point-check',
    'rise-run-line', 'rise-run-ghost',
    'slope-ratio', 'slope-triangles', 'slope-sign', 'slope-target',
    'angle-turn', 'angle-benchmarks', 'angle-length', 'angle-length-compare', 'angle-right-compare', 'angle-sort',
    'triangle-shape', 'triangle-presets', 'triangle-corners', 'triangle-sum-strip', 'triangle-corners-sum', 'triangle-missing', 'triangle-target',
    'motion-rate', 'motion-race', 'velocity-direction', 'velocity-twins', 'motion-round-trip', 'motion-trip-builder',
    'circle-displacement', 'circle-journey', 'compass-direction', 'direction-angle', 'vector-builder', 'vector-compare',
    'vector-translate', 'vector-copy-test', 'vector-head-tail', 'vector-route-order', 'vector-resultant', 'vector-cancel',
    'force-push', 'force-vector', 'force-compare', 'force-bars', 'mass-push', 'mass-race',
    'variable-ticker',
    'subtract-strip', 'grow-bars', 'change-sign', 'change-table',
    'plant-tree', 'same-change-bars', 'change-only-table',
    'per-one', 'rate-convert', 'rate-dial', 'rate-cards',
    'rate-of-change', 'rate-race', 'change-over-time', 'unit-match',
    'switch-toggle', 'switch-plain', 'tap-valve', 'tap-piston', 'machine-panel', 'machine-labels',
    'forked-button', 'flaky-button'];

  // The kept sheet: the board as chosen, with everything unselected and rejected
  // hidden. A last read before approval is asked for.
  let keptOnly = new URLSearchParams(window.location.search).get('kept') === '1';
  function setKept(on) {
    keptOnly = on;
    const url = new URL(window.location.href);
    if (on) url.searchParams.set('kept', '1');
    else url.searchParams.delete('kept');
    history.replaceState({}, '', url);
  }

  let active = new URLSearchParams(window.location.search).get('bb') || 'letter';
  $: entry = entryFor(active);
  $: bb1 = entry.bb;
  $: unitOf = UNITS.find(u => u.key === entry.unit);
  $: unitBoards = registry.filter(e => e.unit === entry.unit);
  $: unitPos = unitBoards.findIndex(e => e.key === entry.key) + 1;
  $: selections = entry.selections;
  $: finalised = entry.finalised;

  function show(key) {
    active = key;
    const url = new URL(window.location.href);
    url.searchParams.set('bb', key);
    history.replaceState({}, '', url);
    values = bb1.sections.map(() => 2);
  }

  // What is still open, so the remaining decisions are visible at a glance.
  $: outstanding = bb1.sections.map(section => ({
    code: section.code,
    name: section.name,
    missing: slots
      .filter(([key]) => !section[key].some(v => selections[v.code] || finalised[v.code]))
      .map(([, label]) => label)
  })).filter(s => s.missing.length);

  // One live control value per section, so every interaction variant in a
  // section is driven by the same number and can be compared side by side.
  let values = entryFor(new URLSearchParams(window.location.search).get('bb') || 'letter').bb.sections.map(() => 2);

  // Sorter state for S1-I2: each chip cycles pool -> fixed -> varies -> pool.
  const bins = ['unfiled', 'fixed', 'can vary'];
  let sorted = { '2': 0, x: 0, '7': 0, y: 0 };

  // ---- Functions boards -------------------------------------------------
  // One table of rules, shared by both boards, so a rule cannot mean one thing
  // in the machine and another in the inspector.
  const RULES = {
    'double it': v => v * 2,
    'add three': v => v + 3,
    'square it': v => v * v,
    'take away one': v => v - 1
  };
  const PLATES = Object.keys(RULES);
  const run = (name, v) => RULES[name](v);

  let sub = { b: 4 };                       // substitute-strip
  let plate = 0;                            // rule-swap: which plate is loaded
  let mach = { x: 3 };                      // machine-single, two-machines
  // Foundations: roots.
  let rootN = 3;                            // root-both-ways, square-grid
  let searchTo = 2;                         // root-search
  let places = 2;                           // root-approx
  // Root bench. Goal k4 is unreachable on purpose; 5 has no exact root.
  let rootBench = { target: 36, guess: 6, hits: [] };
  function rootTry() {
    const sq = Number((rootBench.guess * rootBench.guess).toFixed(6));
    rootBench = { ...rootBench, hits: [...rootBench.hits, { t: rootBench.target, g: rootBench.guess, sq, off: Math.abs(sq - rootBench.target) }] };
  }
  function rootGoal(id, s) {
    const exact = s.hits.filter(h => h.off === 0);
    if (id === 'k1') return exact.some(h => h.t === 36);
    // Was "a target between 30 and 40", which is impossible: 36 is the only
    // perfect square in that range and the goal excluded it. Third accidental
    // unreachable goal caught by driving a bench rather than reading it.
    if (id === 'k2') return exact.some(h => h.t !== 36);
    if (id === 'k3') return s.hits.some(h => h.t === 5 && h.off <= 0.01);
    // k4 asks for an exact root of 5. There is none.
    if (id === 'k4') return false;
    return false;
  }

  // Foundations: the number line.
  let laid = 0;                             // lay-units
  let walkAt = 2;                           // walk-line, line-runs-out, extend-left, unit-line
  let leftUnits = 0;                        // extend-left: how much line exists below 0
  let bothAt = 0;                           // both-ways

  // Walking bench. Goals stick, and goal 3 needs evidence of having been left of
  // 0 before returning, which a snapshot of the present position cannot show.
  let benchAt = 0, walkFrom = 0;
  let walkSeen = { at4: false, atMinus2: false, wasLeft: false, backTo0: false, returned: false, started: 0 };
  function stepBench(d) {
    const next = Math.max(-5, Math.min(5, benchAt + d));
    const seen = { ...walkSeen };
    if (next === 4) seen.at4 = true;
    if (next === -2) seen.atMinus2 = true;
    if (next < 0) seen.wasLeft = true;
    if (next === 0 && seen.wasLeft) seen.backTo0 = true;
    // A walk that ends where it began: moved away and came back.
    if (next === walkFrom && benchAt !== walkFrom) seen.returned = true;
    benchAt = next;
    walkSeen = seen;
  }
  function walkGoal(id, s) {
    if (id === 'w1') return s.at4;
    if (id === 'w2') return s.atMinus2;
    if (id === 'w3') return s.backTo0;
    if (id === 'w4') return s.returned;
    return false;
  }

  // Foundations: number.
  let pairs = 0;                            // pair-up, pair-mismatch
  let tallied = 0;                          // tally-basket
  let counts = [5, 3, 4];                   // same-count
  let pebbles = 5;                          // pebble-to-figure
  // Statistics: observations and variables. This is a deliberately tiny,
  // synthetic branch-day feed from the fictional Qubix Superstore. It contains
  // no user, customer, employee, Walmart or other retailer operational data.
  const DATA_CASES = [
    { name: 'B-014', region: 'North', transactions: 1248, stockouts: 6 },
    { name: 'B-027', region: 'Central', transactions: 1536, stockouts: 3 },
    { name: 'B-031', region: 'East', transactions: 1104, stockouts: 8 },
    { name: 'B-044', region: 'West', transactions: 1389, stockouts: 4 }
  ];
  const DATA_VARIABLES = [
    { key: 'region', label: 'region', type: 'categorical' },
    { key: 'transactions', label: 'transactions', type: 'quantitative' },
    { key: 'stockouts', label: 'stockouts', type: 'quantitative' }
  ];
  let dataRow = 0;
  let dataColumn = 'region';
  let dataSort = { region: 'unfiled', transactions: 'unfiled', stockouts: 'unfiled' };
  let dataAxis = 'row';
  let dataGuess = null;
  const dataCycle = key => {
    const order = ['unfiled', 'categorical', 'quantitative'];
    dataSort = { ...dataSort, [key]: order[(order.indexOf(dataSort[key]) + 1) % order.length] };
  };
  // Reactive declaration: hiding the dataSort read inside a helper leaves the
  // completion message frozen even though the cards themselves update.
  $: dataSortComplete = DATA_VARIABLES.every(v => dataSort[v.key] === v.type);
  // Tally bench. benchSeen records that the collections were once uneven, so
  // goal 4 asks for a repair rather than being satisfied by never breaking them.
  // Goals here stick once reached. Goal 2 wants all three level and goal 3 wants
  // one of them larger, which cannot both be true at the same instant, so
  // checking the present state alone made "all four" unreachable. The tiling
  // bench had the same problem and solved it the same way.
  let bench3 = [5, 3, 4];
  let benchSeen = { matched: false, levelled: false, oneLarger: false, relevelled: false };
  $: {
    const level = bench3[0] === bench3[1] && bench3[1] === bench3[2];
    const top = Math.max(...bench3);
    const next = { ...benchSeen };
    if (bench3[0] === bench3[1]) next.matched = true;
    if (level) { next.levelled = true; if (benchSeen.oneLarger) next.relevelled = true; }
    if (!level && bench3.filter(v => v === top).length === 1) next.oneLarger = true;
    if (JSON.stringify(next) !== JSON.stringify(benchSeen)) benchSeen = next;
  }
  function tallyGoal(id, b, seen) {
    if (id === 't1') return seen.matched;
    if (id === 't2') return seen.levelled;
    if (id === 't3') return seen.oneLarger;
    if (id === 't4') return seen.relevelled;
    return false;
  }

  // Foundations: decimals.
  let zoomed = false;                       // zoom-line
  let jug = 2.4;                            // jug-fill
  let shaded = 3;                           // split-bar
  let digitCol = 1;                         // place-columns
  let cmpA = 0.35, cmpB = 0.5;              // compare-two
  // `marks`, not `placed`: that name already belongs to the match exercises.
  let mark = 0.4, marks = [];               // measure-bench
  function placeMark(v) {
    mark = v;
    if (!marks.some(p => Math.abs(p - v) < 0.001)) marks = [...marks, v];
  }
  // State passed in, not read from scope, for the reason in the note above.
  function measureGoal(id, list) {
    const near = t => list.some(v => Math.abs(v - t) < 0.005);
    if (id === 'd1') return near(0.4);
    if (id === 'd2') return list.some(v => v > 0.4005 && v < 0.4995);
    // Two ways to write one half: any two distinct placements that are both 0.5.
    if (id === 'd3') return near(0.5);
    if (id === 'd4') return list.some(v => v > 0.3505 && v < 0.3995);
    return false;
  }

  let lad = { d: 3 };                       // relation-test: foot of the ladder
  let guessed = {};                         // relation-guess: which readouts are revealed
  let nota = 0;                             // notation-builder: F, f or phi
  let fork = { x: 4 };                      // two-answers
  let verdicts = {};                        // function-or-not, verdict-strip
  let testedRules = {};                     // which rules have been run
  let accept = { x: 4 };                    // accepted-line

  // ---- Plotting and straight-line slope --------------------------------
  // These states power the two bridge boards added for founder selection on
  // 2026-08-10. Their controls are intentionally shared across variants so the
  // founder can compare representations at the same mathematical state.
  const GRAPH_X = [-3, -2, -1, 0, 1, 2, 3];
  const GRAPH_RULES = {
    'square it': v => v * v,
    'double it': v => v * 2,
    'add three': v => v + 3
  };
  let graph = { count: 1, rule: 'square it', guess: null };
  const graphY = (x, state = graph) => GRAPH_RULES[state.rule](x);
  const predictionChoices = (x, state = graph) => {
    const correct = graphY(x, state);
    const distractors = [
      ...Object.values(GRAPH_RULES).map(rule => rule(x)),
      x,
      Math.abs(x),
      correct - 1,
      correct + 1
    ].filter((value, index, values) => value !== correct && values.indexOf(value) === index);
    return [...distractors.slice(0, 2), correct];
  };
  const graphOrder = kind => kind === 'table-points-order' ? [2, -1, 3, 0, -2, 1, -3] : GRAPH_X;
  const graphPoint = (x, y) => ({ x: 150 + x * 32, y: 124 - y * 13 });
  // ---- Plotting drills, rebuilt 2026-08-17 --------------------------------
  // Founder: these needed major changes, and asked for sample points that
  // activate on touch or cursor so the stage is an accurate Cartesian plane.
  //
  // What was wrong. The old version was a 7x9 grid of buttons, so a learner
  // clicked a *cell* rather than a *point*, and cells are small targets on a
  // phone. Worse, y ran 0 to 8 with no negative half, so the thing being called
  // a coordinate plane was a quadrant with the axes drawn on its edge. A learner
  // could finish the drill without ever meeting a negative ordinate.
  //
  // What it is now. A real plane, x and y both running negative through zero to
  // positive, with a small set of candidate points offered on it. Each candidate
  // carries an oversized transparent hit circle so a fingertip lands reliably
  // while the drawn dot stays small enough to sit at one coordinate.
  //
  // The decoys are the teaching. Each one is a specific error rather than a
  // random wrong answer, and each says which mistake it is when tapped, so a
  // learner who swaps x and y is told that rather than just marked wrong.
  // One unit is the same length on both axes. The first rebuild had 27px per
  // unit across and 15px up, which is not a Cartesian plane: a square drawn on
  // it would not be square, and y = x would not leave the origin at 45°. Equal
  // scaling is most of what "accurate representation" means here.
  //
  // UNIT also sets the hit radius. Candidates are whole coordinates, so the
  // closest two can ever be is one unit; a hit circle must therefore stay under
  // half a unit or neighbouring points swallow each other. The first build used
  // r=15 against a 15px unit and made every vertically adjacent point
  // unreachable, which the drill only revealed when driven.
  // ---- Two Inches and Two Feet -------------------------------------------
  // Thompson's plant and tree. Both change by 2, and both come to 2 inches a
  // month, which is the board's payoff and is computed here rather than written
  // into any string, so the figures cannot drift from the arithmetic.
  let rbOld = 12, rbNew = 14;                    // subtract-strip, change-sign
  let rbRows = [12, 14, 13, 17];                 // change-table
  let rbApples = 6, rbCost = 300;                // per-one, in pence
  let rbYps = 10;                                // rate-convert, yards per second
  let rbDial = 3, rbSecs = 4;                    // rate-dial
  let rbUnit = 'month';                          // unit-match
  // A reactive declaration, not a helper. `const rbChange = () => rbNew - rbOld`
  // reads both values inside the function body, so Svelte cannot see that the
  // markup depends on them and never marks it dirty: the strip showed 10 − 12 = 2
  // and called it a rise. Sixth time this exact fault has appeared in this file.
  // Read state at the call site, or declare it reactively as here.
  $: rbDelta = rbNew - rbOld;
  const PLANT = { name: 'plant', from: 12, to: 14, unit: 'inches', per: 1, perUnit: 'month' };
  const TREE = { name: 'tree', from: 12, to: 14, unit: 'feet', per: 12, perUnit: 'months' };
  // Everything reduced to inches per month so the two are actually comparable.
  const inchesPerMonth = o => ((o.to - o.from) * (o.unit === 'feet' ? 12 : 1)) / o.per;
  const rbSame = Math.abs(inchesPerMonth(PLANT) - inchesPerMonth(TREE)) < 1e-9;

  // Growing bench. Goals stick, for the reason the tally bench needed them to.
  let gb = { aChange: 2, aTime: 1, bChange: 2, bTime: 1 };
  let gbSeen = { equalChange: false, twiceAsFast: false, smallerFaster: false, sameRate: false };
  const gbRate = (c, t) => t === 0 ? null : c / t;
  $: {
    const ra = gbRate(gb.aChange, gb.aTime), rb2 = gbRate(gb.bChange, gb.bTime);
    const next = { ...gbSeen };
    if (gb.aChange === gb.bChange) next.equalChange = true;
    if (gb.aChange === gb.bChange && ra !== null && rb2 !== null && ra !== 0 &&
        (Math.abs(ra / rb2 - 2) < 1e-9 || Math.abs(rb2 / ra - 2) < 1e-9)) next.twiceAsFast = true;
    if (ra !== null && rb2 !== null) {
      if ((gb.aChange < gb.bChange && ra > rb2) || (gb.bChange < gb.aChange && rb2 > ra)) next.smallerFaster = true;
      if (gb.aChange !== gb.bChange && Math.abs(ra - rb2) < 1e-9) next.sameRate = true;
    }
    if (JSON.stringify(next) !== JSON.stringify(gbSeen)) gbSeen = next;
  }
  const gbGoal = (id, s) => ({ g1: s.equalChange, g2: s.twiceAsFast, g3: s.smallerFaster, g4: s.sameRate }[id] || false);

  // Rate quiz bench.
  const RQ = [
    { q: 'grew 6 cm in 2 hours', a: 3, unit: 'cm per hour' },
    { q: 'fell 12 degrees in 4 hours', a: -3, unit: 'degrees per hour' },
    { q: 'gained 20 pages in 5 days', a: 4, unit: 'pages per day' },
    { q: 'lost 9 litres in 3 minutes', a: -3, unit: 'litres per minute' },
    { q: 'rose 15 metres in 5 seconds', a: 3, unit: 'metres per second' }
  ];
  let rq = { i: 0, guess: 0, streak: 0, seen: { run3: false, negative: false, multiUnit: false } };
  function rqCheck() {
    const item = RQ[rq.i % RQ.length];
    const right = rq.guess === item.a;
    const seen = { ...rq.seen };
    const streak = right ? rq.streak + 1 : 0;
    if (streak >= 3) seen.run3 = true;
    if (right && item.a < 0) seen.negative = true;
    if (right && !/ 1 /.test(item.q)) seen.multiUnit = true;
    rq = { i: rq.i + (right ? 1 : 0), guess: 0, streak, seen };
  }
  const rqGoal = (id, s) => ({ q1: s.run3, q2: s.negative, q3: s.multiUnit }[id] || false);

  const UNIT = 22;
  const HIT_R = 10;            // < UNIT / 2, so adjacent targets never overlap
  const PLANE = { minX: -4, maxX: 4, minY: -4, maxY: 6, pad: 28, top: 14 };
  const planePt = (x, y) => ({
    px: PLANE.pad + (x - PLANE.minX) * UNIT,
    py: PLANE.top + (PLANE.maxY - y) * UNIT
  });
  const PLANE_W = PLANE.pad + (PLANE.maxX - PLANE.minX) * UNIT + 20;
  const PLANE_H = PLANE.top + (PLANE.maxY - PLANE.minY) * UNIT + 22;
  const SWAP = 'x and y the wrong way round';
  const SIGNX = 'the sign of x is wrong';
  const SIGNY = 'the sign of y is wrong';
  const OFF = 'not on this rule';
  const PLOT_DRILLS = {
    'point-target-drill': { rule: null, rounds: [
      { t: [-2, 4], d: [[4, -2, SWAP], [2, 4, SIGNX], [-2, -4, SIGNY]] },
      { t: [3, -1], d: [[-1, 3, SWAP], [3, 1, SIGNY], [-3, -1, SIGNX]] },
      { t: [0, -3], d: [[-3, 0, SWAP], [0, 3, SIGNY], [3, 0, SWAP]] },
      { t: [-4, -2], d: [[-2, -4, SWAP], [4, -2, SIGNX], [-4, 2, SIGNY]] }
    ]},
    'point-target-shuffle': { rule: null, rounds: [
      { t: [1, 5], d: [[5, 1, SWAP], [1, -5, SIGNY], [-1, 5, SIGNX]] },
      { t: [-3, 2], d: [[2, -3, SWAP], [3, 2, SIGNX], [-3, -2, SIGNY]] },
      { t: [4, 0], d: [[0, 4, SWAP], [-4, 0, SIGNX], [4, 4, SIGNY]] },
      { t: [-1, -4], d: [[-4, -1, SWAP], [1, -4, SIGNX], [-1, 4, SIGNY]] }
    ]},
    'curve-plot-drill': { rule: 'square it', label: 'y = x²', rounds: [
      { t: [-2, 4], d: [[-2, -4, SIGNY], [4, -2, SWAP], [-2, 2, OFF]] },
      { t: [-1, 1], d: [[-1, -1, SIGNY], [1, -1, OFF], [-1, 2, OFF]] },
      { t: [0, 0], d: [[0, 1, OFF], [1, 0, SWAP], [0, -1, OFF]] },
      { t: [2, 4], d: [[4, 2, SWAP], [2, -4, SIGNY], [2, 2, OFF]] }
    ]},
    'curve-point-check': { rule: 'add three', label: 'y = x + 3', rounds: [
      { t: [-3, 0], d: [[0, -3, SWAP], [-3, 3, OFF], [3, 0, SIGNX]] },
      { t: [0, 3], d: [[3, 0, SWAP], [0, -3, SIGNY], [0, 0, OFF]] },
      { t: [2, 5], d: [[5, 2, SWAP], [2, -5, SIGNY], [2, 3, OFF]] },
      { t: [-1, 2], d: [[2, -1, SWAP], [-1, -2, SIGNY], [-1, 4, OFF]] }
    ]}
  };
  let plotDrill = { kind: '', step: 0, hits: [], misses: 0, said: '' };
  const drillState = (kind, s) => s.kind === kind ? s : { kind, step: 0, hits: [], misses: 0, said: '' };
  // Candidates for the current round, in a fixed order so they do not jump
  // around under the learner's finger between renders.
  function planeChoices(kind, step) {
    const round = PLOT_DRILLS[kind].rounds[step];
    if (!round) return [];
    return [{ x: round.t[0], y: round.t[1], ok: true }, ...round.d.map(([x, y, why]) => ({ x, y, ok: false, why }))]
      .sort((a, b) => (a.x - b.x) || (a.y - b.y));
  }
  function pickPoint(kind, choice) {
    const s = drillState(kind, plotDrill);
    if (s.step >= PLOT_DRILLS[kind].rounds.length) return;
    plotDrill = choice.ok
      ? { ...s, step: s.step + 1, hits: [...s.hits, [choice.x, choice.y]], said: '' }
      : { ...s, misses: s.misses + 1, said: `( ${choice.x}, ${choice.y} ) has ${choice.why}.` };
  }
  function resetDrill(kind) {
    plotDrill = { kind, step: 0, hits: [], misses: 0, said: '' };
  }

  let line = { run: 3, rise: 2, previousRise: 2, target: 1 };
  const slopeValue = state => state.run === 0 ? null : state.rise / state.run;
  function changeLine(which, delta) {
    const limits = which === 'run' ? [1, 5] : [-4, 4];
    line = {
      ...line,
      previousRise: line.rise,
      [which]: Math.max(limits[0], Math.min(limits[1], line[which] + delta))
    };
  }

  // ---- Plane geometry: angles -----------------------------------------
  // A single state lets the founder compare candidates at the same turn.
  // The arm-length candidate changes only `arm`, making the invariant explicit.
  const ANGLE_BENCHMARKS = [30, 60, 90, 120, 180];
  const ANGLE_SORT = [35, 90, 125, 70, 150, 45];
  let angle = { s1: 60, s3: 60, arm: 92, sortIndex: 0, guess: '', revealed: false };
  const angleName = degrees => degrees < 90 ? 'acute' : degrees === 90 ? 'right' : degrees < 180 ? 'obtuse' : 'straight';
  const anglePoint = (degrees, length = angle.arm, ox = 140, oy = 126) => ({
    x: ox + Math.cos(degrees * Math.PI / 180) * length,
    y: oy - Math.sin(degrees * Math.PI / 180) * length
  });
  const angleArc = (degrees, radius = 34, ox = 140, oy = 126) => {
    const end = anglePoint(degrees, radius, ox, oy);
    return `M ${ox + radius} ${oy} A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`;
  };
  const sectionAngle = kind => kind === 'angle-length' ? 60 : kind === 'angle-right-compare' ? angle.s3 : angle.s1;
  function setAngle(kind, degrees) {
    const key = kind === 'angle-right-compare' ? 's3' : 's1';
    angle = { ...angle, [key]: degrees, revealed: false };
  }
  function stepAngle(kind, delta) { setAngle(kind, Math.max(15, Math.min(180, sectionAngle(kind) + delta))); }
  function nextSort() { angle = { ...angle, sortIndex: (angle.sortIndex + 1) % ANGLE_SORT.length, guess: '', revealed: false }; }
  function guessAngle(name) { angle = { ...angle, guess: name, revealed: true }; }

  // ---- Plane geometry: triangle angle sum ------------------------------
  // The apex moves inside a fixed base. The angle labels are calculated from
  // that geometry, then the final rounded angle absorbs rounding so the shown
  // total is always exactly 180 rather than occasionally displaying 179/181.
  const TRI_PRESETS = [
    { name: 'wide', x: 140, h: 50 },
    { name: 'tall', x: 140, h: 106 },
    { name: 'leaning', x: 94, h: 78 },
    { name: 'right', x: 50, h: 92 }
  ];
  let triangle = {
    shape: { x: 140, h: 78 },
    torn: { simple: false, combined: false },
    missing: { a: 50, b: 60, revealed: false },
    target: { a: 50, b: 60, goal: 70 }
  };
  const triangleMeasures = (x, h) => {
    const a = Math.round(Math.atan2(h, Math.max(0, x - 50)) * 180 / Math.PI);
    const b = Math.round(Math.atan2(h, Math.max(0, 230 - x)) * 180 / Math.PI);
    return { a, b, c: 180 - a - b };
  };
  const triangleFromAngles = (a, b) => {
    const ar = a * Math.PI / 180, br = b * Math.PI / 180;
    const h = 180 / (1 / Math.tan(ar) + 1 / Math.tan(br));
    return { x: 50 + h / Math.tan(ar), h };
  };
  function setTriangleShape(patch) { triangle = { ...triangle, shape: { ...triangle.shape, ...patch } }; }
  function setTrianglePreset(preset) { triangle = { ...triangle, shape: { x: preset.x, h: preset.h } }; }
  function toggleCorners(kind) {
    const key = kind === 'triangle-corners-sum' ? 'combined' : 'simple';
    triangle = { ...triangle, torn: { ...triangle.torn, [key]: !triangle.torn[key] } };
  }
  function changeKnown(mode, which, delta) {
    const current = triangle[mode];
    const next = Math.max(20, Math.min(130, current[which] + delta));
    if (next + current[which === 'a' ? 'b' : 'a'] > 160) return;
    triangle = { ...triangle, [mode]: { ...current, [which]: next, ...(mode === 'missing' ? { revealed: false } : {}) } };
  }

  // ---- Introductory motion --------------------------------------------
  let movement = { distance: 40, time: 10, raceTime: 5, direction: 1, roundDone: false, roundRunning: false, rateRun: 0, raceRun: 0, directionRun: 0, twinsRun: 0, steps: [] };
  const motionTimers = {};
  const movementSpeed = state => Number((state.distance / state.time).toFixed(1));
  const tripDistance = steps => steps.length * 10;
  const tripDisplacement = steps => steps.reduce((sum, step) => sum + step * 10, 0);
  function addTripStep(direction) { movement = { ...movement, steps: [...movement.steps, direction] }; }
  function runRoundTrip() {
    if (movement.roundRunning) return;
    window.clearTimeout(motionTimers.round);
    movement = { ...movement, roundRunning: true, roundDone: false };
    motionTimers.round = window.setTimeout(() => (movement = { ...movement, roundRunning: false, roundDone: true }), 1550);
  }

  // ---- Vectors and displacement ---------------------------------------
  const VECTOR_DIRS = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
  let vectorState = { turn: 90, orbitRun: 0, direction: 0, magnitude: 5, direction2: 90, magnitude2: 5 };
  const vectorPoint = (degrees, length = 78, ox = 150, oy = 110) => ({ x: ox + Math.cos(degrees * Math.PI / 180) * length, y: oy - Math.sin(degrees * Math.PI / 180) * length });
  const circleDistance = degrees => Number((2 * Math.PI * 10 * degrees / 360).toFixed(1));
  const circleDisplacement = degrees => Number((20 * Math.sin(degrees * Math.PI / 360)).toFixed(1));
  const compassName = degrees => VECTOR_DIRS[(Math.round(degrees / 45) % 8 + 8) % 8];

  // ---- Vector addition -------------------------------------------------
  let vectorAdd = { east: 4, north: 3, shift: 0, copy: 'same', order: 'east-first', west: 4 };
  const vectorGridPoint = (x, y) => ({ x: 55 + x * 30, y: 180 - y * 30 });
  const resultantMagnitude = (east, north) => Number(Math.hypot(east, north).toFixed(1));

  // ---- Force and acceleration -----------------------------------------
  // S1 and S2 keep a 2 kg mass fixed while force changes. S3 keeps a 6 N
  // force fixed while mass changes. Every push lasts one second, so each
  // experiment changes one cause only. Friction belongs to a later board.
  const FORCE_VALUES = [2, 4, 6];
  const MASS_VALUES = [2, 4, 6];
  const FORCE_MASS = 2;
  const MASS_FORCE = 6;
  const FORCE_TIME = 1;
  const forceAcceleration = (force, mass = FORCE_MASS) => Number((force / mass).toFixed(2));
  const forceDistance = (force, mass = FORCE_MASS) => Number((0.5 * forceAcceleration(force, mass) * FORCE_TIME * FORCE_TIME).toFixed(2));
  let physics = {};
  const physicsTimers = {};
  const physicsFrames = {};

  const initialPhysics = kind => ({
    force: kind === 'mass-push' || kind === 'mass-race' ? MASS_FORCE : 2,
    mass: FORCE_MASS,
    running: false,
    travel: 0,
    trials: [],
    result: null
  });
  const physicsState = (kind, state = physics) => state[kind] || initialPhysics(kind);
  function updatePhysics(kind, patch) {
    physics = { ...physics, [kind]: { ...physicsState(kind, physics), ...patch } };
  }
  function chooseForce(kind, force) {
    const state = physicsState(kind, physics);
    if (state.running) return;
    updatePhysics(kind, { force, result: null, travel: 0 });
  }
  function chooseMass(kind, mass) {
    const state = physicsState(kind, physics);
    if (state.running) return;
    updatePhysics(kind, { mass, result: null, travel: 0 });
  }
  function runForce(kind) {
    const state = physicsState(kind, physics);
    if (state.running) return;
    window.clearTimeout(physicsTimers[kind]);
    window.cancelAnimationFrame(physicsFrames[kind]);
    updatePhysics(kind, { running: false, travel: 0, result: null });
    physicsFrames[kind] = window.requestAnimationFrame(() => {
      const current = physicsState(kind, physics);
      const force = current.force;
      const mass = current.mass;
      const acceleration = forceAcceleration(force, mass);
      const distance = forceDistance(force, mass);
      updatePhysics(kind, { running: true, travel: kind === 'mass-race' ? 1 : distance });
      physicsTimers[kind] = window.setTimeout(() => {
        const current = physicsState(kind, physics);
        const result = kind === 'mass-race'
          ? { force, race: true }
          : { force, mass, acceleration, distance };
        const trialKey = kind === 'mass-push' ? 'mass' : 'force';
        const trials = [...current.trials.filter(t => t[trialKey] !== result[trialKey]), result]
          .sort((a, b) => a[trialKey] - b[trialKey]);
        updatePhysics(kind, {
          running: false,
          trials,
          result
        });
      }, 950);
    });
  }
  onDestroy(() => {
    Object.values(motionTimers).forEach(window.clearTimeout);
    Object.values(physicsTimers).forEach(window.clearTimeout);
    Object.values(physicsFrames).forEach(window.cancelAnimationFrame);
  });

  const NOTATION = ['F', 'f', 'φ'];
  // The ladder is 5 units long, so the height it reaches falls as the foot goes
  // out. The other two readouts are constants and are meant to sit dead.
  const ladHeight = d => Math.sqrt(Math.max(0, 25 - d * d));
  const FORK_RULE = 'a number whose square is x';
  const forkAnswers = x => x < 0 ? [] : (x === 0 ? [0] : [Math.sqrt(x), -Math.sqrt(x)]);
  const fmt2 = n => Number(n.toFixed(2)).toString().replace('-', '−');

  function judge(name, v) {
    verdicts = { ...verdicts, [name]: v };
  }
  function testRule(name) {
    testedRules = { ...testedRules, [name]: true };
  }

  // Workshop state. Kept separate from the goal checkers above so a new
  // workshop cannot inherit another one's success conditions.
  let fm = { plate: 0, seen: [] };          // machine bench
  let rg = { hidden: 'add three', fed: [], guess: null };
  let ri = { verdicts: {} };                // rule inspector

  // ---- What a Button Does ----------------------------------------------
  let sw = { up: false, tally: { up: 0, down: 0 } };
  let tap = { turn: 3, visited: {} };
  let panel = { log: [] };
  const PANEL = ['tea', 'coffee', 'soup', 'coffee'];
  let broken = { log: [] };
  const SOUND = ['tea', 'coffee', 'soup', 'water'];
  const FORKED = ['tea', 'coffee', ['tea', 'coffee'], 'water'];

  function flick(up) {
    sw = { up, tally: { ...sw.tally, [up ? 'up' : 'down']: sw.tally[up ? 'up' : 'down'] + 1 } };
  }
  function turnTap(v) {
    tap = { turn: v, visited: { ...tap.visited, [v]: (tap.visited[v] || 0) + 1 } };
  }
  const flow = t => Number((t * 0.4).toFixed(1));
  function press(i) {
    panel = { log: [...panel.log, { button: i + 1, out: PANEL[i] }] };
  }
  function pressBroken(which, i) {
    const out = which === 'sound' ? SOUND[i] : FORKED[i];
    broken = { log: [...broken.log, { which, button: i + 1, out: Array.isArray(out) ? out.join(' and ') : out, forked: Array.isArray(out) }] };
  }

  // Repair bench. Verdicts and presses are tracked per machine.
  let rb = { pressed: {}, verdicts: {} };
  function rbPress(mi, bi, label) {
    rb = { ...rb, pressed: { ...rb.pressed, [`${mi}:${bi}`]: label } };
  }
  function rbJudge(mi, v) {
    rb = { ...rb, verdicts: { ...rb.verdicts, [mi]: v } };
  }
  function benchGoal(id, s, machines) {
    if (id === 'b1') {
      return machines.every((m, mi) => m.buttons.every((_, bi) => s.pressed[`${mi}:${bi}`] !== undefined));
    }
    if (id === 'b2') return Object.values(s.pressed).some(v => typeof v === 'string' && v.includes(' and '));
    if (id === 'b3') return machines.every((m, mi) => m.kind !== 'sound' || s.verdicts[mi] === 'pass');
    if (id === 'b4') return machines.every((m, mi) => m.kind !== 'forked' || s.verdicts[mi] === 'fail');
    return false;
  }

  function fmFeed(input) {
    const name = PLATES[fm.plate];
    const out = run(name, input);
    fm = { ...fm, seen: [...fm.seen, { plate: name, input, out }] };
  }
  function rgFeed(v) {
    if (rg.fed.some(f => f.input === v)) return;
    rg = { ...rg, fed: [...rg.fed, { input: v, out: run(rg.hidden, v) }] };
  }

  // State is passed in rather than read from scope. Svelte tracks dependencies
  // where they are read, so a checker that reached into the closure would leave
  // the goal list frozen; that fault has caught four interactions in this file.
  function machineGoal(id, s) {
    const eights = s.seen.filter(r => r.out === 8);
    if (id === 'm1') return eights.length > 0;
    if (id === 'm2') return new Set(eights.map(r => r.plate)).size > 1;
    if (id === 'm3') return s.seen.some(r => r.out === r.input);
    if (id === 'm4') {
      return PLATES.some(p => {
        const rows = s.seen.filter(r => r.plate === p);
        return rows.some(a => rows.some(b => a.input !== b.input && a.out === b.out));
      });
    }
    return false;
  }
  function guessGoal(id, s) {
    if (id === 'g1') return s.fed.length >= 2;
    if (id === 'g2') return s.guess === s.hidden;
    return false;
  }
  function inspectorGoal(id, s, rules) {
    const v = s.verdicts;
    if (id === 'r1') return v['a number whose square is x'] === 'fail';
    if (id === 'r2') return v['1 divided by it'] === 'pass';
    if (id === 'r3') return v['a number bigger than x'] === 'fail';
    if (id === 'r4') return rules.filter(r => r.ok).every(r => v[r.name] === 'pass');
    return false;
  }

  // Exercise preview state, keyed by exercise code.
  let picked = {};
  let stepped = {};   // stepper current values
  let placed = {};    // match: item label -> bin
  let held = {};      // match/workshop: what is currently picked up
  let ordered = {};   // order: current arrangement
  let bench = { assigned: {}, held: null };

  function stepBy(ex, delta) {
    const cur = stepped[ex.code] ?? ex.start ?? ex.min;
    const next = Math.min(ex.max, Math.max(ex.min, Number((cur + delta * ex.step).toFixed(4))));
    stepped = { ...stepped, [ex.code]: next };
  }
  const stepValue = (ex, s) => s[ex.code] ?? ex.start ?? ex.min;
  const stepHit = (ex, s) => Math.abs(stepValue(ex, s) - ex.target) < ex.step / 2;

  // Tap to pick up, tap to place. Works with a mouse and with a thumb, which
  // HTML5 drag-and-drop does not.
  function takeItem(code, label) {
    held = { ...held, [code]: held[code] === label ? null : label };
  }
  function placeItem(code, bin) {
    const label = held[code];
    if (!label) return;
    placed = { ...placed, [code]: { ...(placed[code] || {}), [label]: bin } };
    held = { ...held, [code]: null };
  }
  const matchDone = (ex, p) => ex.items.every(i => (p[ex.code] || {})[i.label] === i.bin);

  function orderList(ex, state = ordered) {
    return state[ex.code] || ex.startOrder || ex.items.map((_, i) => i);
  }
  function moveItem(ex, from, dir) {
    const list = [...orderList(ex, ordered)];
    const to = from + dir;
    if (to < 0 || to >= list.length) return;
    [list[from], list[to]] = [list[to], list[from]];
    ordered = { ...ordered, [ex.code]: list };
  }
  const orderDone = (ex, o) => !!o[ex.code] && o[ex.code].every((v, i) => v === i);

  function benchTake(v) {
    bench = { ...bench, held: bench.held === v ? null : v };
  }
  function benchDrop(letter) {
    if (bench.held === null) return;
    bench = { assigned: { ...bench.assigned, [letter]: bench.held }, held: null };
  }
  function benchClear(letter) {
    const next = { ...bench.assigned };
    delete next[letter];
    bench = { ...bench, assigned: next };
  }
  // Change bench (BB2 W1) and delta builder (BB2 W2).
  let cb = { oldV: 2, newV: 2 };
  let db = { letter: null };
  const cbDelta = s => Number((s.newV - s.oldV).toFixed(2));
  function cbStep(which, delta) {
    const next = Number(Math.min(4, Math.max(0, cb[which] + delta * 0.1)).toFixed(2));
    cb = { ...cb, [which]: next };
  }

  // Goals are checked per workshop kind rather than by a global id lookup, so a
  // new workshop cannot silently inherit another one's success conditions.
  // The three states are passed in rather than read from scope: Svelte tracks
  // dependencies at the call site, so reading them inside the body would leave
  // the goal list frozen.
  function goalMet(kind, id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) {
    if (kind === 'assignment-bench') {
      const a = bench.assigned;
      if (id === 'g1') return a.x === 7;
      if (id === 'g2') return a.y !== undefined && a.x !== undefined && a.y !== a.x;
      if (id === 'g3') return a.z === undefined;
    }
    if (kind === 'change-bench') {
      const d = cbDelta(cb);
      if (id === 'b1') return Math.abs(d - 0.5) < 0.001;
      if (id === 'b2') return d < -0.001;
      if (id === 'b3') return Math.abs(d) < 0.001 && (cb.oldV !== 2 || cb.newV !== 2);
    }
    if (kind === 'delta-builder') {
      if (id === 'd1') return db.letter === 't';
      if (id === 'd2') return db.letter === 'y';
    }
    if (kind === 'square-builder') {
      const a = sb.side ** 2;
      if (id === 's1') return Math.abs(a - 9) < 0.001;
      if (id === 's2') return a > 20;
      if (id === 's3') return sb.side > 0 && a < sb.side;
    }
    if (kind === 'dependence-tester') {
      if (id === 't1') return Math.abs(dt.x - 4) < 0.001;
      if (id === 't2') return dt.refused;
    }
    if (kind === 'span-explorer') {
      if (id === 'p1') return sp.a !== sp.b && Math.abs(sp.a + sp.b - 5) < 0.001;
      if (id === 'p2') return sp.hits.length > 1;
      if (id === 'p3') return sp.a === sp.b;
    }
    if (kind === 'tiling-bench') {
      // a2 is unreachable on purpose: 24 has no whole-number square root.
      if (id === 'a2') return false;
      return bench24.done.includes(id);
    }
    if (kind === 'diagonal-bench') {
      if (id === 'p1') return placed3.includes('2,2');
      if (id === 'p2') return placed3.includes('3,3');
      if (id === 'p3') return placed3.includes('4,4');
      // A fourth point where both readings agree, which can only be found by
      // noticing the pattern the first three make.
      if (id === 'p4') return placed3.some(k => { const [a, b] = k.split(',').map(Number); return a === b && ![2, 3, 4].includes(a); });
    }
    if (kind === 'derivative-dial') {
      const r = 2 * dd.x;
      if (id === 'r1') return Math.abs(r - 6) < 0.001;
      if (id === 'r2') return Math.abs(r - 1) < 0.001;
      if (id === 'r3') return Math.abs(r - dd.x ** 2) < 0.001 && dd.x > 0;
    }
    return false;
  }

  // Span explorer: the average rate from a to b works out to a + b, so many
  // different spans share one rate. hits records which pairs reached 5, which
  // is how the second goal knows a *different* pair was used.
  // Countable grid. Snapped to whole units, because Wentworth's scholium only
  // holds when the sides contain the unit an integral number of times.
  const GRID_W = 8, GRID_H = 6;
  let grids = {};        // per interaction code: { b, a }
  let gridDrag = false;
  const gridOf = (code, g) => g[code] || { b: 3, a: 2 };
  function setGrid(code, b, a) {
    grids = { ...grids, [code]: { b: Math.max(1, Math.min(GRID_W, b)), a: Math.max(1, Math.min(GRID_H, a)) } };
  }

  // Exercise-side grid, one shared cell since only one check shows at a time.
  let exGrid = { b: 1, a: 1 };
  const exGridOk = (ex, g) =>
    g.b * g.a === ex.targetArea
    && (!ex.requireBase || g.b === ex.requireBase)
    && (!ex.requireSquare || g.b === g.a);

  // Tiling bench: which distinct rectangles of area 24 have been built.
  // Goals stick once reached. Goal a1 is about the target 24 and a3 is about any
  // other target, so without this, meeting one would un-tick the other and the
  // list would read as current state rather than as things achieved.
  let bench24 = { b: 1, a: 1, found: [], target: 24, done: [] };
  function benchSet(b, a) {
    const next = { ...bench24, b: Math.max(1, Math.min(GRID_W, b)), a: Math.max(1, Math.min(GRID_H, a)) };
    if (next.b * next.a === next.target) {
      const key = `${next.b}×${next.a}`;
      if (!next.found.includes(key)) next.found = [...next.found, key];
    }
    const hit = [];
    if (next.target === 24 && next.found.length >= 3) hit.push('a1');
    if (next.target !== 24 && next.b === next.a && next.b * next.a === next.target) hit.push('a3');
    next.done = [...new Set([...next.done, ...hit])];
    bench24 = next;
  }
  function benchTarget(t) {
    bench24 = { ...bench24, target: t, found: [] };
  }

  let unitRefused = false;
  let unitSide = 1;

  // Coordinate plane board. One shared point, since only one stage shows at once.
  const PX = 6, PY = 5;                 // grid extent each side of the origin
  let pt = { x: 3, y: 4 };
  let axesOn = false;
  let placed3 = [];                     // diagonal workshop
  const quadName = p =>
    p.x === 0 || p.y === 0 ? 'on an axis'
      : `(${p.x > 0 ? '+' : '−'}, ${p.y > 0 ? '+' : '−'})`;
  function placeDiag(x, y) {
    pt = { x, y };
    const key = `${x},${y}`;
    if (!placed3.includes(key)) placed3 = [...placed3, key];
  }
  // Note for future work: do not wrap these lookups in helper functions and call
  // them from the template. Svelte tracks dependencies where they are read, so a
  // helper that reads placed3 inside its body leaves the markup frozen. This has
  // now caught four separate interactions in this file; read the state directly.
  let splitTried = false;
  let sp = { a: 1, b: 2, hits: [] };
  function spStep(which, delta) {
    const next = Number(Math.min(5, Math.max(0.5, sp[which] + delta * 0.5)).toFixed(1));
    const s = { ...sp, [which]: next };
    if (s.a !== s.b && Math.abs(s.a + s.b - 5) < 0.001) {
      const key = [s.a, s.b].sort((m, n) => m - n).join('/');
      if (!s.hits.includes(key)) s.hits = [...s.hits, key];
    }
    sp = s;
  }
  const spRate = s => (s.a === s.b ? null : Number((s.a + s.b).toFixed(2)));

  let dd = { x: 1 };
  function ddStep(delta) {
    dd = { x: Number(Math.min(5, Math.max(0.5, dd.x + delta * 0.5)).toFixed(1)) };
  }

  // Square builder: a deliberately wider range than the lesson uses, so the
  // area can be driven below the side, which only happens under 1.
  let sb = { side: 2 };
  function sbStep(delta) {
    sb = { side: Number(Math.min(5, Math.max(0.5, sb.side + delta * 0.1)).toFixed(2)) };
  }

  // Dependence tester: the y buttons are live but refuse, and say why.
  let dt = { x: 2, refused: false };
  function dtStep(delta) {
    dt = { ...dt, x: Number(Math.min(6, Math.max(1, dt.x + delta)).toFixed(0)) };
  }
  function dtRefuse() {
    dt = { ...dt, refused: true };
  }

  const squareSize = v => 74 + (v - 1.5) * 39; // 1.5 -> 74px, 3.5 -> 152px, no cap
  const fmt = v => Number(v).toFixed(1);
  const tickerMin = 0;
  const tickerMax = 6;
  const clampTicker = value => Math.max(tickerMin, Math.min(tickerMax, Math.round(value)));
  const tickerOutput = value => 2 * value + 1;
  const counterDigits = value => String(value).padStart(2, '0');
  function stepVariableTicker(sectionIndex, delta) {
    const next = clampTicker(clampTicker(values[sectionIndex]) + delta);
    values = values.map((value, index) => index === sectionIndex ? next : value);
  }
  function tickerKey(event, sectionIndex) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      event.preventDefault();
      stepVariableTicker(sectionIndex, 1);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      event.preventDefault();
      stepVariableTicker(sectionIndex, -1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      values = values.map((value, index) => index === sectionIndex ? tickerMin : value);
    } else if (event.key === 'End') {
      event.preventDefault();
      values = values.map((value, index) => index === sectionIndex ? tickerMax : value);
    }
  }

  function cycle(chip) {
    sorted = { ...sorted, [chip]: (sorted[chip] + 1) % 3 };
  }

  function choose(exCode, option) {
    picked = { ...picked, [exCode]: option.label };
  }
</script>

<div class="factory-shell">
  <header class="factory-header">
    <div class="identity">
      <span class="mark">F</span>
      <span class="stack">
        <b>QUBIX UNIVERSITY</b>
        <small>Factory · authoring options</small>
      </span>
    </div>
    <div class="header-actions">
      <span class="pill">AI_DRAFT · NOT SELECTED</span>
      <button class="icon-btn" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>
        {#if $theme === 'dark'}◑{:else}◐{/if}
      </button>
    </div>
  </header>

  <main class="factory-body">
    <nav class="mode-switch" aria-label="Choose a view">
      <button class:on={!keptOnly} on:click={() => setKept(false)}>
        All variants<em>everything drafted, chosen or not</em>
      </button>
      <button class:on={keptOnly} on:click={() => setKept(true)}>
        Kept sheet<em>the board as chosen, for a last read</em>
      </button>
    </nav>

    <details class="curriculum-drawer" open={entry.unit !== 'statistics'}>
      <summary>Curriculum board drawer <span>{registry.length} authoring boards · current: {bb1.title}</span></summary>
      <div class="curriculum-drawer-body">
        {#each byUnit as unit}
          <section class="unit">
            <div class="unit-head">
              <h3>{unit.name}</h3>
              <em>{unit.blurb}</em>
            </div>
            <nav class="bb-switch" class:sequence={unit.key === 'functions'} aria-label={`Boards in ${unit.name}`}>
              {#each unit.boards as item, i}
                <button class:on={item.key === active} on:click={() => show(item.key)}>
                  {#if unit.key === 'functions'}<i class="step">{i + 1}</i>{/if}
                  {item.label}<em>{item.bb.title}</em>
                </button>
              {/each}
            </nav>
          </section>
        {/each}
      </div>
    </details>

    <section class="intro">
      <span class="micro">{bb1.id}{#if unitOf}&nbsp;· {unitOf.name}, {unitPos} of {unitBoards.length}{/if}</span>
      <h1>{bb1.title}</h1>
      {#if bb1.world}
        <section class="world-console" aria-label={`${bb1.world.company} learning world`}>
          <header class="world-head">
            <div><span>Persistent learning world</span><h2>{bb1.world.company}</h2><p>{bb1.world.tagline}</p></div>
            <small>{bb1.world.disclaimer}</small>
          </header>

          <div class="world-footprint" aria-label="Company footprint">
            {#each bb1.world.footprint as fact}<span><b>{fact.value}</b><small>{fact.label}</small></span>{/each}
          </div>

          <section class="learning-loop" aria-label="Mission learning sequence">
            <div class="world-subhead"><span>Learning process</span><b>Theory immediately earns a practical action, then the cycle repeats</b></div>
            <div class="learning-loop-track">
              {#each bb1.world.learningCycles as cycle, i}
                <article><span>Theory {i + 1}</span><b>{cycle.theory}</b></article>
                <i aria-hidden="true">→</i>
                <article class="practical"><span>Practical {i + 1}</span><b>{cycle.practical}</b></article>
                {#if i < bb1.world.learningCycles.length - 1}<i aria-hidden="true">→</i>{/if}
              {/each}
            </div>
          </section>

          <div class="world-primary">
            <article class="mission-brief">
              <span class="mission-role">Current role · {bb1.world.currentMission.role}</span>
              <h3>{bb1.world.currentMission.title}</h3>
              <p><b>{bb1.world.currentMission.team}</b> · {bb1.world.currentMission.location}</p>
              <p>{bb1.world.currentMission.brief}</p>
              <small>Business outcome · {bb1.world.currentMission.outcome}</small>
            </article>

            <div class="world-flow" aria-label="How superstore data moves">
              {#each bb1.world.network as node, i}
                {#if i}<span class="world-arrow" aria-hidden="true">→</span>{/if}
                <article><b>{node.name}</b><small>{node.detail}</small></article>
              {/each}
            </div>
          </div>

          <section class="world-schema">
            <div class="world-subhead"><span>Relational superstore</span><b>One connected company, not isolated toy datasets</b></div>
            <div class="schema-grid">
              {#each bb1.world.schema as table}
                <article><b>{table.table}</b><span>PK · {table.key}</span><small>{table.fields}</small></article>
              {/each}
            </div>
          </section>

          <section class="promotion-map">
            <div class="world-subhead"><span>Promotion path</span><b>No assumed knowledge: every role is earned through a visible competency gate</b></div>
            <div class="promotion-track">
              {#each bb1.world.promotionPath as step, i}
                <article class:current={i === 0}><span>{i}</span><div><b>{step.role}</b><small>{step.gate}</small></div></article>
                {#if i < bb1.world.promotionPath.length - 1}<i aria-hidden="true">→</i>{/if}
              {/each}
            </div>
          </section>

          <section class="career-map">
            <div class="world-subhead"><span>Career routes</span><b>Start as an intern; specialise without leaving the same enterprise</b></div>
            <div class="career-grid">
              {#each bb1.world.careerRoutes as route}
                <article><h3>{route.name}</h3><div>{#each route.roles as role}<span class:current={role === bb1.world.currentMission.role}>{role}</span>{/each}</div></article>
              {/each}
            </div>
          </section>

          <details class="topic-catalog">
            <summary>
              <span><b>Complete learning topic catalogue</b><small>{bb1.world.topicCount} ordered topics · {bb1.world.topicCatalog.length} phases · Pre-Intern to Lead Data Scientist</small></span>
              <em>Open the list</em>
            </summary>
            <div class="topic-phase-grid">
              {#each bb1.world.topicCatalog as phase}
                <article class:current={phase.phase === 3}>
                  <header><span>Phase {phase.phase}</span><small>{phase.role}</small></header>
                  <h3>{phase.title}</h3>
                  <ol>{#each phase.topics as topic}<li>{topic}</li>{/each}</ol>
                  <p><b>Practical</b>{phase.practical}</p>
                </article>
              {/each}
            </div>
          </details>
        </section>
      {/if}
      {#if entry.unit === 'functions'}
        <!-- Founder direction: these three are one thing. The chain is drawn on
             every one of them so it cannot be read as a standalone board. -->
        <div class="chain">
          {#each unitBoards as u, i}
            {#if i}<span class="chain-arrow">→</span>{/if}
            <button class="chain-link" class:here={u.key === entry.key} on:click={() => show(u.key)}>
              <i>{i + 1}</i>{u.bb.title}
            </button>
          {/each}
        </div>
      {/if}
      <p class="lede">
        {#if keptOnly}
          This is the board as chosen. Everything rejected or still undecided is
          hidden. Read it through and touch the interactions as a learner would;
          nothing here is live in the Viewer.
        {:else}
          Every variant below is a candidate. Touch the interactions, play the
          exercises, then send me the codes you want kept. Nothing here is live in
          the Viewer.
        {/if}
      </p>
      {#if entry.gated}
        <p class="gate">Gated · {entry.gated} These are drafts for later selection. They must not reach a learner while the gate stands.</p>
      {/if}

      <!-- Authoring metadata. Nothing here reaches a learner, so the kept sheet
           hides it: that sheet shows what goes into the app and nothing else. -->
      <div class="fork-note" class:hidden={keptOnly}>
        {#if bb1.objective}<div><b>Learning objective</b><span>{bb1.objective}</span></div>{/if}
        {#if bb1.prerequisites}<div><b>Prerequisites</b><span>{bb1.prerequisites}</span></div>{/if}
        {#if bb1.misconception}<div><b>Misconception to watch</b><span>{bb1.misconception}</span></div>{/if}
        <div><b>Fork</b><span>{bb1.fork}</span></div>
        <div><b>Structure</b><span>{bb1.structure}</span></div>
      </div>
      {#if !keptOnly && bb1.sourceMatrix?.length}
        <section class="source-matrix" aria-label="Source remix matrix">
          <h2>Source remix</h2>
          <p>No source controls the wording, example, diagram and interaction together.</p>
          <div class="source-matrix-grid">
            {#each bb1.sourceMatrix as row}
              <article>
                <b>{row.work}</b>
                <span>{row.role}</span>
                <em>{row.treatment}</em>
                {#if row.url}<a href={row.url} target="_blank" rel="noreferrer">Source record ↗</a>{/if}
              </article>
            {/each}
          </div>
        </section>
      {/if}
    </section>

    {#each bb1.sections as section, si}
      <section class="section-block">
        <div class="section-head">
          <span class="section-code">Cycle {si + 1} · {section.code}</span>
          <h2>{section.name}</h2>
        </div>

        {#if !keptOnly}
          <div class="sources">
            {#each section.sources as key}
              <blockquote>
                <p>{sources[key].quote}</p>
                <cite>
                  {key} · {sources[key].ref}
                  {#if sources[key].url}
                    · <a href={sources[key].url} target="_blank" rel="noreferrer">source revision</a>
                  {/if}
                  {#if sources[key].licenseUrl}
                    · <a href={sources[key].licenseUrl} target="_blank" rel="noreferrer">{sources[key].license}</a>
                  {/if}
                </cite>
                {#if sources[key].changes}<small class="source-change">Changes: {sources[key].changes}</small>{/if}
              </blockquote>
            {/each}
          </div>
        {/if}

        <h3>{bb1.world ? `Theory ${si + 1}` : 'Reading'} {#if bb1.world}<em>— understand the idea before touching the system</em>{/if}</h3>
        <div class="variant-grid">
          {#each (keptOnly ? section.readings.filter(r => selections[r.code] || finalised[r.code]) : section.readings) as reading}
            <article class="variant" class:selected={selections[reading.code] && !keptOnly} class:finalised={finalised[reading.code]} class:rejected={rejected[reading.code]}>
              <span class="code">{reading.code}{#if selections[reading.code] && !keptOnly} · SELECTED{:else if finalised[reading.code]} · FINALISED{:else if rejected[reading.code]} · REJECTED{/if}</span>
              <p class="reading-text" class:verbatim={reading.verbatim}>{reading.text}</p>
              {#if reading.verbatim}
                <p class="verbatim-tag">Author's own words, unaltered · {sources[reading.verbatim].ref}</p>
              {/if}
              {#if finalised[reading.code]}<p class="why">{finalised[reading.code]}</p>{/if}
            </article>
          {/each}
        </div>

        <h3>{bb1.world ? `Practical ${si + 1} · Guided lab` : (keptOnly && keptIsFigure(section, selections, finalised) ? 'Figure' : 'Interaction')} {#if !keptOnly}<em>— {bb1.world ? 'apply the theory immediately' : 'or a figure, where there is nothing to vary'}</em>{/if}</h3>
        <div class="variant-grid">
          {#each (keptOnly ? section.interactions.filter(i => selections[i.code] || finalised[i.code]) : section.interactions) as interaction}
            <article class="variant" class:selected={selections[interaction.code] && !keptOnly} class:finalised={finalised[interaction.code]} class:rejected={rejected[interaction.code]}>
              <span class="code">{interaction.code}{#if selections[interaction.code] && !keptOnly} · SELECTED{:else if finalised[interaction.code]} · FINALISED{:else if rejected[interaction.code]} · REJECTED{/if}</span>
              {#if isFigure(interaction.kind)}<span class="tag-figure">figure · nothing to move</span>{/if}
              <div class="stage">
                {#if interaction.kind === 'figures-letters'}
                  <div class="rows">
                    <div class="row"><small>FIGURES</small>{#each ['1', '2', '3', '7'] as f}<span class="chip fig">{f}</span>{/each}</div>
                    <div class="row"><small>LETTERS</small>{#each ['x', 'y', 'z'] as l}<span class="chip let">{l}</span>{/each}</div>
                    <p class="stage-note">A figure shows its number. A letter shows nothing until a value is assigned.</p>
                  </div>

                {:else if interaction.kind === 'sorter'}
                  <div class="rows">
                    <p class="stage-note">Click a chip to file it.</p>
                    <div class="row wrap">
                      {#each Object.keys(sorted) as chip}
                        <button class="chip sortable" class:fixed={sorted[chip] === 1} class:varies={sorted[chip] === 2} on:click={() => cycle(chip)}>
                          {chip}<em>{bins[sorted[chip]]}</em>
                        </button>
                      {/each}
                    </div>
                  </div>

                {:else if interaction.kind === 'value-card'}
                  <div class="rows centre">
                    <div class="value-card">x = {fmt(values[si])}</div>
                  </div>

                {:else if interaction.kind === 'symbol-value-pair'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="card sym">x</span>
                      <span class="joiner"></span>
                      <span class="card val">{fmt(values[si])}</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'assign-slider'}
                  <div class="rows centre">
                    <div class="ghost-wrap">
                      <div class="value-card ghost">x = 2.0</div>
                      <div class="value-card">x = {fmt(values[si])}</div>
                    </div>
                    <p class="stage-note">The faded card is the value you replaced.</p>
                  </div>

                {:else if interaction.kind === 'number-line'}
                  <div class="rows centre">
                    <svg viewBox="0 0 320 110" class="mini-svg" role="img" aria-label={`Number line, new value ${fmt(values[si])}`}>
                      <path class="ax" d="M28 64H292"/>
                      {#each [1.5, 2, 2.5, 3, 3.5] as tick}
                        <path class="ax" d={`M${28 + (tick - 1.5) * 132} 58v12`}/>
                        <text x={28 + (tick - 1.5) * 132} y="88">{tick}</text>
                      {/each}
                      <path class="gap" d={`M160 40 H${28 + (values[si] - 1.5) * 132}`}/>
                      <circle class="old" cx="160" cy="64" r="5"/>
                      <circle class="new" cx={28 + (values[si] - 1.5) * 132} cy="64" r="7"/>
                    </svg>
                  </div>

                {:else if interaction.kind === 'two-bars'}
                  <!-- bars: 2 shows only the two lengths; 3 adds the difference as
                       an object of its own. Without this the variants are identical. -->
                  <div class="rows">
                    <div class="bar-row"><small>OLD</small><span class="bar" style="width:96px"></span><b>2.0</b></div>
                    <div class="bar-row"><small>NEW</small><span class="bar" style={`width:${values[si] * 48}px`}></span><b>{fmt(values[si])}</b></div>
                    {#if (interaction.bars ?? 3) >= 3}
                      <div class="bar-row"><small>CHANGE</small><span class="bar diff" style={`width:${Math.abs(values[si] - 2) * 48}px`}></span><b>{(values[si] - 2).toFixed(1).replace('-', '−')}</b></div>
                    {/if}
                  </div>

                {:else if interaction.kind === 'delta-expand'}
                  <div class="rows centre">
                    <div class="expand-top"><span class="glyph-sm">Δ</span><span class="glyph-sm let">x</span></div>
                    <span class="expand-arrow" aria-hidden="true">↓</span>
                    <div class="expand-sum">
                      <b>{fmt(values[si])}</b><i>−</i><b>2.0</b><i>=</i>
                      <b class="accent">{(values[si] - 2).toFixed(1).replace('-', '−')}</b>
                    </div>
                    <p class="stage-note">Δ is not a value. It is an instruction to take the new figure and subtract the old.</p>
                  </div>

                {:else if interaction.kind === 'unit-square'}
                  <div class="rows centre">
                    <div class="unit-fig">
                      <span class="side-mark">1</span>
                      <span class="unit-sq"></span>
                      <span class="side-mark under">1</span>
                    </div>
                    <p class="stage-note">The unit of surface. Everything on this board is counted in these.</p>
                  </div>

                {:else if interaction.kind === 'unit-square-fixed'}
                  <div class="rows centre">
                    <div class="unit-fig">
                      <span class="side-mark">1</span>
                      <button class="unit-sq live" class:refused={unitRefused} on:click={() => (unitRefused = true)}
                        aria-label="Try to resize the unit square"></button>
                      <span class="side-mark under">1</span>
                    </div>
                    {#if unitRefused}
                      <p class="refusal">It will not resize. A unit that could be any size would measure nothing, so this one is fixed at one by one and everything else is counted against it.</p>
                    {:else}
                      <p class="stage-note">Try to make it bigger.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'line-fails' || interaction.kind === 'axes-build'}
                  {@const showY = interaction.kind === 'axes-build' || axesOn}
                  <div class="rows centre">
                    <svg viewBox="0 0 300 190" class="mini-svg" role="img"
                      aria-label={showY ? 'Two axes crossed at a right angle' : 'A number line with two points above the same mark'}>
                      <path class="ax" d="M20 150H280"/>
                      {#each [1, 2, 3, 4, 5] as t}
                        <path class="ax" d={`M${20 + t * 44} 144v12`}/>
                        <text x={20 + t * 44} y="172">{t}</text>
                      {/each}
                      {#if showY}
                        <path class="ax" d="M152 20V178"/>
                        {#each [1, 2, 3, 4] as t}
                          <path class="ax" d={`M146 ${150 - t * 30}h12`}/>
                          <text x="138" y={154 - t * 30} text-anchor="end">{t}</text>
                        {/each}
                        <circle class="new" cx="152" cy="150" r="5"/>
                        <text x="168" y="166" text-anchor="start">origin</text>
                      {/if}
                      <circle class="old" cx={20 + 3 * 44} cy="60" r="7"/>
                      <text x={20 + 3 * 44 + 16} y="65" text-anchor="start">A</text>
                      <circle class="old" cx={20 + 3 * 44} cy="110" r="7"/>
                      <text x={20 + 3 * 44 + 16} y="115" text-anchor="start">B</text>
                    </svg>
                    {#if showY}
                      <p class="ok">With a second reading, A is (3, 3) and B is (3, 1). Two different places, told apart at last.</p>
                    {:else}
                      <div class="fails-read"><span>A is at 3</span><span>B is at 3</span></div>
                      <p class="stage-note">The line gives the same answer for both, and they are not the same place.</p>
                      <button class="reveal-btn" on:click={() => (axesOn = true)}>Add a second line</button>
                    {/if}
                  </div>

                {:else if interaction.kind === 'find-place' || interaction.kind === 'quadrants' || interaction.kind === 'diagonal-bench-stage'}
                  {@const full = interaction.kind !== 'find-place'}
                  <div class="rows centre">
                    <div class="plane" style={`--cols:${full ? PX * 2 + 1 : PX + 1}`}>
                      {#each Array(full ? PY * 2 + 1 : PY + 1) as _, r}
                        {#each Array(full ? PX * 2 + 1 : PX + 1) as _, c}
                          {@const gx = full ? c - PX : c}
                          {@const gy = full ? PY - r : PY - r}
                          <button class="pcell"
                            class:axis={gx === 0 || gy === 0}
                            class:here={pt.x === gx && pt.y === gy}
                            on:click={() => (pt = { x: gx, y: gy })}
                            aria-label={`Place at ${gx}, ${gy}`}></button>
                        {/each}
                      {/each}
                    </div>
                    <div class="plane-read">
                      <span>( {pt.x} , {pt.y} )</span>
                      {#if interaction.kind === 'quadrants'}<em>{quadName(pt)}</em>{/if}
                    </div>
                  </div>

                {:else if interaction.kind === 'unit-scale'}
                  {@const n = unitSide}
                  <div class="rows centre">
                    <div class="unit-fig">
                      <span class="side-mark">{n}</span>
                      <span class="unit-stack" style={`--n:${n}`}>
                        {#each Array(n * n) as _}<i></i>{/each}
                      </span>
                      <span class="side-mark under">{n}</span>
                    </div>
                    <div class="stepper">
                      <button aria-label="Shorter side" disabled={n <= 1} on:click={() => (unitSide = Math.max(1, n - 1))}>−</button>
                      <span class="stepper-value">side {n}<em>{n * n} unit {n * n === 1 ? 'square' : 'squares'}</em></span>
                      <button aria-label="Longer side" disabled={n >= 4} on:click={() => (unitSide = Math.min(4, n + 1))}>+</button>
                    </div>
                    <p class="stage-note">
                      {n === 1 ? 'At a side of one this is the unit itself: the square everything else is counted in.' : `A side of ${n} holds ${n * n} of the unit square.`}
                    </p>
                  </div>

                {:else if interaction.kind === 'count-grid'}
                  {@const g = gridOf(interaction.code, grids)}
                  <div class="rows centre">
                    <div class="grid-wrap"
                      on:pointerdown={() => (gridDrag = true)}
                      on:pointerup={() => (gridDrag = false)}
                      on:pointerleave={() => (gridDrag = false)}>
                      {#each Array(GRID_H) as _, r}
                        <div class="grid-row">
                          {#each Array(GRID_W) as _, c}
                            <button class="cell"
                              class:on={c < g.b && (GRID_H - 1 - r) < g.a}
                              class:sq={interaction.requireSquare && g.b === g.a && c < g.b && (GRID_H - 1 - r) < g.a}
                              on:pointerdown={() => setGrid(interaction.code, c + 1, GRID_H - r)}
                              on:pointerenter={() => gridDrag && setGrid(interaction.code, c + 1, GRID_H - r)}
                              aria-label={`Set ${c + 1} by ${GRID_H - r}`}></button>
                          {/each}
                        </div>
                      {/each}
                    </div>
                    <div class="grid-read">
                      <span><small>BASE</small><b>{g.b}</b></span>
                      <span><small>ALTITUDE</small><b>{g.a}</b></span>
                      <span><small>SQUARES COUNTED</small><b class="accent">{g.b * g.a}</b></span>
                    </div>
                    {#if interaction.showProduct}
                      <div class="grid-product">{g.b} × {g.a} = {g.b * g.a}</div>
                    {/if}
                    {#if interaction.requireSquare && g.b === g.a}
                      <p class="ok">Base and altitude agree, so this is a square. Its area is a side times itself, written x².</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'delta-facts'}
                  <div class="rows">
                    <div class="facts-head"><span class="glyph-sm">Δ</span></div>
                    <div class="fact no">✗<span>is not a number</span></div>
                    <div class="fact no">✗<span>does not multiply</span></div>
                    <div class="fact yes">✓<span>is a word, written short: the change in</span></div>
                    <div class="fact yes">✓<span>marks a subtraction: new − old</span></div>
                  </div>

                {:else if interaction.kind === 'delta-rearrange'}
                  <div class="rows">
                    <div class="rearrange">
                      <b>Δx</b><i>=</i><span>{fmt(values[si])} − 2.0</span><i>=</i><b class="accent">{(values[si] - 2).toFixed(1)}</b>
                    </div>
                    <div class="rearrange">
                      <b>{fmt(values[si])}</b><i>=</i><span>2.0 + {(values[si] - 2).toFixed(1)}</span>
                    </div>
                    <p class="stage-note">One relation, written two ways. Subtract to find the change; add to find where you land.</p>
                  </div>

                {:else if interaction.kind === 'delta-token'}
                  <div class="rows centre">
                    <div class="tokens">
                      <button class="token joined" on:click={() => splitTried = true}>Δx</button>
                      <button class="token">x</button>
                    </div>
                    {#if splitTried}
                      <p class="refusal">Δx will not come apart. Δ and x are read together as one name, so there is no Δ to multiply by.</p>
                    {:else}
                      <p class="stage-note">Try pulling Δx apart.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'signed-bar'}
                  <div class="rows centre">
                    <div class="signed">
                      <span class="axis-line"></span>
                      <span class="zero-tick"></span>
                      <span class="signed-fill" class:neg={values[si] < 2}
                        style={`width:${Math.min(48, Math.abs(values[si] - 2) * 46)}%; ${values[si] < 2 ? 'right:50%' : 'left:50%'}`}></span>
                    </div>
                    <div class="signed-read" class:neg={values[si] < 2}>
                      Δx = {fmt(values[si])} − 2.0 = {(values[si] - 2).toFixed(1).replace('-', '−')}
                    </div>
                    <p class="stage-note">Zero is the middle. A change to the left of it is negative.</p>
                  </div>

                {:else if interaction.kind === 'delta-applied'}
                  <div class="rows">
                    <div class="applied-row">
                      <b>Δx</b><span>{fmt(values[si])} − 2.0 = {(values[si] - 2).toFixed(1).replace('-', '−')}</span><em>a length, cm</em>
                    </div>
                    <div class="applied-row">
                      <b>Δy</b><span>{(values[si] ** 2).toFixed(2)} − 4.00 = {(values[si] ** 2 - 4).toFixed(2).replace('-', '−')}</span><em>an area, cm²</em>
                    </div>
                    <div class="applied-row">
                      <b>Δt</b><span>9 − 4 = 5</span><em>a time, seconds</em>
                    </div>
                    <p class="stage-note">One symbol, three different quantities. The subtraction never changes; only what it is applied to.</p>
                  </div>

                {:else if interaction.kind === 'glyph-card'}
                  <div class="rows centre">
                    <div class="glyph">Δ<em>the change in</em></div>
                  </div>

                {:else if interaction.kind === 'square-3d'}
                  <div class="rows">
                    <SquareScene side={values[si]} height={190} />
                    <div class="bar-row"><small>SIDE x</small><b>{fmt(values[si])}</b></div>
                    <div class="bar-row"><small>AREA y</small><b>{(values[si] ** 2).toFixed(2)}</b></div>
                  </div>

                {:else if interaction.kind === 'role-flow'}
                  <div class="rows centre">
                    <div class="flow">
                      <span class="flow-card">x = {fmt(values[si])}<em>you set this</em></span>
                      <span class="flow-arrow">{#key values[si]}<i></i>{/key}→</span>
                      <span class="flow-card dep">y = {(values[si] ** 2).toFixed(2)}<em>this follows</em></span>
                    </div>
                    <p class="stage-note">Move the control and the pulse runs one way only. Nothing travels back from y to x.</p>
                  </div>

                {:else if interaction.kind === 'two-labels'}
                  <div class="rows centre">
                    <div class="square-figure">
                      <div class="square area" style={`width:${squareSize(values[si])}px;height:${squareSize(values[si])}px`}>
                        <span>y = {(values[si] * values[si]).toFixed(2)}</span>
                      </div>
                      <span class="edge-label sm" style={`width:${squareSize(values[si])}px`}>x = {fmt(values[si])}</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'two-cards'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="card sym">x = {fmt(values[si])}</span>
                      <span class="card sym">y = {(values[si] * values[si]).toFixed(2)}</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'locked-pair'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="card sym">x = {fmt(values[si])}<em>assign</em></span>
                      <span class="card val locked">y = {(values[si] * values[si]).toFixed(2)}<em>follows</em></span>
                    </div>
                  </div>

                {:else if interaction.kind === 'machine'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="card sym">{interaction.labelled ? `x = ${fmt(values[si])}` : fmt(values[si])}</span>
                      <span class="machine-box">× itself</span>
                      <span class="card val">{interaction.labelled ? `y = ${(values[si] * values[si]).toFixed(2)}` : (values[si] * values[si]).toFixed(2)}</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'variable-ticker'}
                  {@const xValue = clampTicker(values[si])}
                  {@const yValue = tickerOutput(xValue)}
                  <div class="rows centre ticker-demo">
                    <div class="counter-shell">
                      <div class="counter-header">
                        <span class="counter-live"><i></i>LINKED</span>
                        <strong>VARIABLE COUNTER</strong>
                        <span class="counter-model">RULE 01</span>
                      </div>
                      <div class="ticker-pair">
                        <section class="ticker-unit independent">
                          <div class="counter-label"><b>x</b><small>INPUT · SET</small></div>
                          <button class="ticker-button" aria-label="Increase x" disabled={xValue >= tickerMax} on:click={() => stepVariableTicker(si, 1)}><span>▲</span></button>
                          <div class="number-ticker" role="spinbutton" tabindex="0"
                            aria-label="Value assigned to x" aria-valuemin={tickerMin} aria-valuemax={tickerMax} aria-valuenow={xValue}
                            on:wheel|preventDefault={(event) => stepVariableTicker(si, event.deltaY < 0 ? 1 : -1)}
                            on:keydown={(event) => tickerKey(event, si)}>
                            {#key xValue}
                              <div class="ticker-stack">
                                <span>{xValue < tickerMax ? counterDigits(xValue + 1) : '··'}</span>
                                <strong>{counterDigits(xValue)}</strong>
                                <span>{xValue > tickerMin ? counterDigits(xValue - 1) : '··'}</span>
                              </div>
                            {/key}
                          </div>
                          <button class="ticker-button" aria-label="Decrease x" disabled={xValue <= tickerMin} on:click={() => stepVariableTicker(si, -1)}><span>▼</span></button>
                          <em>scroll to assign</em>
                        </section>

                        <div class="ticker-rule" aria-label="The rule is y equals two x plus one">
                          <small>FIXED RULE</small>
                          <span>y = 2x + 1</span>
                          <i aria-hidden="true">→</i>
                        </div>

                        <section class="ticker-unit dependent">
                          <div class="counter-label"><b>y</b><small>OUTPUT · AUTO</small></div>
                          <span class="ticker-button spacer" aria-hidden="true"><span>▲</span></span>
                          <div class="number-ticker locked" aria-live="polite">
                            {#key yValue}
                              <div class="ticker-stack">
                                <span>{xValue < tickerMax ? counterDigits(tickerOutput(xValue + 1)) : '··'}</span>
                                <strong>{counterDigits(yValue)}</strong>
                                <span>{xValue > tickerMin ? counterDigits(tickerOutput(xValue - 1)) : '··'}</span>
                              </div>
                            {/key}
                          </div>
                          <span class="ticker-button spacer" aria-hidden="true"><span>▼</span></span>
                          <em>follows the rule</em>
                        </section>
                      </div>
                      <div class="counter-legend"><span><i class="input-light"></i>x is adjustable</span><span><i></i>y is linked</span></div>
                    </div>
                    <div class="ticker-equation" aria-live="polite">
                      <span>y = 2x + 1</span><i>→</i><span>y = 2({xValue}) + 1</span><i>→</i><b>y = {yValue}</b>
                    </div>
                    <p class="stage-note">Scroll the x counter or use its buttons. x receives a new value; the linked y counter changes through a different relationship from the square above.</p>
                  </div>

                {:else if interaction.kind === 'two-squares'}
                  <div class="rows centre">
                    <div class="pair">
                      <span class="square area small" style="width:64px;height:64px"><span>4</span></span>
                      <span class="square area" style={`width:${squareSize(values[si])}px;height:${squareSize(values[si])}px`}>
                        <span>{(values[si] * values[si]).toFixed(2)}</span>
                      </span>
                    </div>
                  </div>

                {:else if interaction.kind === 'power-table'}
                  <div class="rows">
                    {#each [2, 3, 4, 5] as n, ni}
                      <div class="ladder-row" class:on={Math.round((values[si] - 1.5) / 0.667) === ni}>
                        <small>y = x{['²', '³', '⁴', '⁵'][ni]}</small>
                        <b>dy/dx = {n}x{['', '²', '³', '⁴'][ni]}</b>
                      </div>
                    {/each}
                  </div>

                {:else if interaction.kind === 'speed-track'}
                  <div class="rows">
                    <svg viewBox="0 0 280 70" class="mini-svg" role="img" aria-label={`Train at time ${fmt(values[si])}`}>
                      <path class="ax" d="M14 52H266"/>
                      <rect class="train" x={14 + (values[si] - 1.5) * 118} y="30" width="26" height="15" rx="3"/>
                    </svg>
                    <div class="bar-row"><small>TIME t</small><b>{fmt(values[si] - 1.5)} s</b></div>
                    <div class="bar-row"><small>DISTANCE s</small><b>{((values[si] - 1.5) * 10).toFixed(1)} m</b></div>
                  </div>

                {:else if interaction.kind === 'ratio-plain'}
                  <div class="rows centre">
                    <div class="ratio">
                      <div class="frac">
                        <span><small>AREA CHANGE</small><b>{(values[si] * values[si] - 4).toFixed(2)}</b></span>
                        <i></i>
                        <span><small>SIDE CHANGE</small><b>{(values[si] - 2).toFixed(2)}</b></span>
                      </div>
                      <span class="eq">=</span>
                      <div class="ratio-out">
                        <b>{values[si] > 2.001 ? (2 + values[si]).toFixed(2) : '—'}</b>
                        <small>cm² per cm</small>
                      </div>
                    </div>
                  </div>

                {:else if interaction.kind === 'rate-formula'}
                  <div class="rows centre">
                    <div class="formula">
                      <span>Δy/Δx</span><i>=</i><span>2x + Δx</span><i>=</i>
                      <span>4 + {(values[si] - 2).toFixed(2)}</span><i>=</i>
                      <b>{values[si] > 2.001 ? (2 + values[si]).toFixed(2) : '4.00'}</b>
                    </div>
                    <p class="stage-note">2x depends only on where you stand. Δx is the gap itself.</p>
                  </div>

                {:else if interaction.kind === 'rate-ladder'}
                  <div class="rows">
                    {#each [1, 0.5, 0.1, 0.01, 0.001] as gap}
                      <div class="ladder-row" class:on={Math.abs((values[si] - 1.5) / 0.5 - [1, 0.5, 0.1, 0.01, 0.001].indexOf(gap)) < 0.5}>
                        <small>Δx = {gap}</small><b>rate {(4 + gap).toFixed(3)}</b>
                      </div>
                    {/each}
                  </div>

                {:else if interaction.kind === 'curve-secant'}
                  <div class="rows centre">
                    <svg viewBox="0 0 260 170" class="mini-svg" role="img" aria-label="Parabola with a line through two points">
                      <path class="ax" d="M30 148H244M30 148V18"/>
                      <polyline class="curve" points={Array.from({ length: 49 }, (_, i) => { const x = i / 16; return `${30 + x * 62},${148 - x * x * 9}`; }).join(' ')}/>
                      {#key values[si]}
                        <path class="sec" d={`M60 ${(148 - 36 + (4 + (values[si] - 2)) * 9 * 0.8).toFixed(1)} L220 ${(148 - 36 - (4 + (values[si] - 2)) * 9 * 1.7).toFixed(1)}`}/>
                      {/key}
                      <circle class="old" cx="154" cy="112" r="5"/>
                      <circle class="new" cx={154 + (values[si] - 2) * 62} cy={148 - (2 + (values[si] - 2)) * (2 + (values[si] - 2)) * 9} r="6"/>
                    </svg>
                  </div>

                {:else if interaction.kind === 'growth-decomposition'}
                  <div class="rows centre">
                    <svg viewBox="0 0 180 180" class="mini-svg decomp" role="img" aria-label="Square of side x growing by a bit, showing two rectangles and a corner square">
                      <rect class="grow" x="20" y={180 - 20 - (values[si] * 44)} width={values[si] * 44} height={values[si] * 44}/>
                      <rect class="base" x="20" y="72" width="88" height="88"/>
                      <text x="60" y="122">x²</text>
                      <text x={20 + 88 + (values[si] * 44 - 88) / 2} y="122">x·dx</text>
                      <text x="60" y={180 - 20 - (values[si] * 44) + (values[si] * 44 - 88) / 2 + 4}>x·dx</text>
                    </svg>
                    <p class="stage-note">The gain is two rectangles plus a small corner, which is why the area outruns the side.</p>
                  </div>

                {:else if interaction.kind === 'square-edge' || interaction.kind === 'square-ghost'}
                  <div class="rows centre">
                    <div class="square-figure">
                      {#if interaction.kind === 'square-ghost'}
                        <div class="square ghost-square" style={`width:${squareSize(2)}px;height:${squareSize(2)}px`}></div>
                      {/if}
                      <div class="square" style={`width:${squareSize(values[si])}px;height:${squareSize(values[si])}px`}></div>
                      <span class="edge-label" style={`width:${squareSize(values[si])}px`}>x</span>
                    </div>
                  </div>

                {:else if interaction.kind === 'root-both-ways'}
                  <div class="rows centre">
                    <div class="both-arrows">
                      <span class="node"><small>number</small><b>{rootN}</b></span>
                      <span class="arrows"><em>squared →</em><em>← root of</em></span>
                      <span class="node"><small>its square</small><b>{rootN * rootN}</b></span>
                    </div>
                    <div class="pm">
                      <button on:click={() => (rootN = Math.max(1, rootN - 1))} aria-label="Smaller">−</button>
                      <button on:click={() => (rootN = Math.min(15, rootN + 1))} aria-label="Larger">+</button>
                    </div>
                    <p class="stage-note">{rootN} × {rootN} = {rootN * rootN}, so the square root of {rootN * rootN} is {rootN}.</p>
                  </div>

                {:else if interaction.kind === 'square-grid'}
                  <div class="rows">
                    <div class="grid" style={`--w:${rootN}`}>{#each Array(rootN * rootN) as _}<i></i>{/each}</div>
                    <div class="row"><small>SIDE</small>
                      <button on:click={() => (rootN = Math.max(1, rootN - 1))} aria-label="Shorter side">−</button>
                      <b>{rootN}</b>
                      <button on:click={() => (rootN = Math.min(8, rootN + 1))} aria-label="Longer side">+</button>
                    </div>
                    <div class="big"><b>{rootN * rootN}</b><small>counters in the square</small></div>
                  </div>

                {:else if interaction.kind === 'root-search'}
                  <div class="rows">
                    <table class="io-table">
                      <thead><tr><th>guess</th><th>squared</th><th>against 5</th></tr></thead>
                      <tbody>
                        {#each Array(searchTo) as _, i}
                          {@const g = i + 1}
                          <tr><td>{g}</td><td><b>{g * g}</b></td>
                            <td>{g * g < 5 ? 'under' : g * g > 5 ? 'over' : 'exact'}</td></tr>
                        {/each}
                      </tbody>
                    </table>
                    <button class="chip" on:click={() => (searchTo = Math.min(6, searchTo + 1))} disabled={searchTo >= 6}>try the next whole number</button>
                    <p class="stage-note">
                      {searchTo < 3 ? 'Keep going.' : 'Two is under and three is over, and there is no whole number between them. The whole numbers step straight over 5.'}
                    </p>
                  </div>

                {:else if interaction.kind === 'root-approx'}
                  {@const guesses = [2.2, 2.23, 2.236, 2.2360, 2.23606].slice(0, places)}
                  <div class="rows">
                    <table class="io-table">
                      <thead><tr><th>guess</th><th>squared</th><th>short of 5 by</th></tr></thead>
                      <tbody>
                        {#each guesses as g}
                          <tr><td>{g}</td><td>{(g * g).toFixed(6)}</td><td><b>{(5 - g * g).toFixed(6)}</b></td></tr>
                        {/each}
                      </tbody>
                    </table>
                    <button class="chip" on:click={() => (places = Math.min(5, places + 1))} disabled={places >= 5}>add another decimal place</button>
                    <p class="stage-note">The last column shrinks every time and never reaches nought.</p>
                  </div>

                {:else if interaction.kind === 'root-on-line' || interaction.kind === 'diagonal-square'}
                  {@const target = interaction.kind === 'diagonal-square' ? Math.SQRT2 : Math.sqrt(5)}
                  {@const lo = interaction.kind === 'diagonal-square' ? 1 : 2}
                  <div class="rows">
                    {#if interaction.kind === 'diagonal-square'}
                      <svg class="ladder" viewBox="0 0 210 120" role="img" aria-label="A unit square with its diagonal swung down onto the line">
                        <rect class="wall" x="20" y="20" width="50" height="50"/>
                        <line class="rung" x1="20" y1="70" x2="70" y2="20"/>
                        <path class="hmark" d="M70 20 A 70.7 70.7 0 0 1 90.7 70" fill="none"/>
                        <line class="floor" x1="10" y1="70" x2="200" y2="70"/>
                        <circle class="foot" cx="90.7" cy="70" r="3.5"/>
                        <text class="htext" x="86" y="86">√2</text>
                      </svg>
                    {/if}
                    <div class="numline walk">
                      {#each Array(11) as _, i}
                        {@const v = lo + i / 10}
                        <span class="tick" class:whole={i % 5 === 0}><i></i><small>{i % 5 === 0 ? v.toFixed(1) : ''}</small></span>
                      {/each}
                      <em class="mk a" style={`left:${(target - lo) * 100}%`}>here</em>
                    </div>
                    <p class="stage-note">
                      Between {target.toFixed(3).slice(0, 5)} and {(Math.floor(target * 1000 + 1) / 1000).toFixed(3)}, at one position, and no fraction names it.
                    </p>
                  </div>

                {:else if interaction.kind === 'lay-units' || interaction.kind === 'unit-line'
                        || interaction.kind === 'walk-line' || interaction.kind === 'line-runs-out'
                        || interaction.kind === 'extend-left' || interaction.kind === 'both-ways'}
                  {@const k = interaction.kind}
                  {@const lo = k === 'both-ways' ? -5 : (k === 'extend-left' ? -leftUnits : 0)}
                  {@const hi = k === 'lay-units' ? laid : (k === 'both-ways' ? 5 : 10)}
                  {@const owed = k === 'line-runs-out' ? Math.max(0, 5 - (2 - walkAt))
                               : (k === 'extend-left' ? Math.max(0, 5 - (2 - walkAt)) : 0)}
                  <div class="rows">
                    <div class="numline walk">
                      {#each Array(hi - lo + 1) as _, i}
                        {@const v = lo + i}
                        <span class="tick" class:whole={true} class:neg={v < 0} class:zero={v === 0}>
                          <i></i><small>{v < 0 ? '−' + Math.abs(v) : v}</small>
                          {#if (k === 'walk-line' || k === 'line-runs-out' || k === 'extend-left') && v === walkAt}
                            <em class="walker">▲</em>
                          {/if}
                          {#if k === 'both-ways' && v === bothAt}<em class="walker">▲</em>{/if}
                          {#if k === 'unit-line' && v === walkAt}<em class="walker">▲</em>{/if}
                        </span>
                      {/each}
                    </div>

                    {#if k === 'lay-units'}
                      <button class="chip" on:click={() => (laid = Math.min(10, laid + 1))} disabled={laid >= 10}>lay the next unit</button>
                      <p class="stage-note">{laid === 0 ? 'Only 0 so far. Every step is the same width.' : `${laid} unit${laid === 1 ? '' : 's'} laid, each the same length as the last.`}</p>

                    {:else if k === 'unit-line' || k === 'both-ways'}
                      <label class="range-row"><span>{k === 'both-ways' ? '−5' : '0'}</span>
                        <input type="range" min={lo} max={hi} step="1"
                          value={k === 'both-ways' ? bothAt : walkAt}
                          on:input={e => k === 'both-ways' ? (bothAt = Number(e.target.value)) : (walkAt = Number(e.target.value))}
                          aria-label="Move along the line"/>
                        <span>{hi}</span></label>
                      <div class="big"><b>{(k === 'both-ways' ? bothAt : walkAt) < 0 ? '−' + Math.abs(k === 'both-ways' ? bothAt : walkAt) : (k === 'both-ways' ? bothAt : walkAt)}</b>
                        {#if k === 'both-ways'}<small>{bothAt > 0 ? 'right of 0, positive' : bothAt < 0 ? 'left of 0, negative' : 'at 0, neither'}</small>{/if}</div>

                    {:else}
                      <div class="row">
                        <button on:click={() => walkAt = Math.max(lo, walkAt - 1)} aria-label="One step left">←</button>
                        <b>{walkAt < 0 ? '−' + Math.abs(walkAt) : walkAt}</b>
                        <button on:click={() => walkAt = Math.min(hi, walkAt + 1)} aria-label="One step right">→</button>
                        <button class="chip" on:click={() => { walkAt = 2; leftUnits = 0; }}>back to 2</button>
                      </div>
                      {#if k === 'extend-left'}
                        <button class="chip" on:click={() => (leftUnits = Math.min(5, leftUnits + 1))} disabled={leftUnits >= 5}>lay a unit left of 0</button>
                      {/if}
                      <p class="stage-note">
                        {#if k === 'line-runs-out'}
                          {walkAt === 0 && owed > 0
                            ? `Nowhere left to stand, and ${owed} step${owed === 1 ? '' : 's'} still owed. The walking was right; the line is too short.`
                            : `Taking 5 from 2. ${owed} step${owed === 1 ? '' : 's'} still to take.`}
                        {:else if k === 'extend-left'}
                          {walkAt === -3
                            ? 'Finished. 2 − 5 = −3, walked exactly as before.'
                            : leftUnits === 0
                              ? 'The line still stops at 0. Lay some more of it.'
                              : `Ground now reaches −${leftUnits}. ${owed} step${owed === 1 ? '' : 's'} still owed.`}
                        {:else}
                          Standing on {walkAt}. Right adds, left subtracts.
                        {/if}
                      </p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'case-focus' || interaction.kind === 'case-row'}
                  <div class="rows data-stage">
                    <div class="data-picks" aria-label="Choose one observed case">
                      {#each DATA_CASES as item, ri}
                        <button class="chip" class:up={dataRow === ri} on:click={() => (dataRow = ri)}>{item.name}</button>
                      {/each}
                    </div>
                    {#if interaction.kind === 'case-focus'}
                      {@const item = DATA_CASES[dataRow]}
                      <div class="data-card" aria-live="polite">
                        <strong>{item.name}</strong>
                        {#each DATA_VARIABLES as variable}<span><small>{variable.label}</small>{item[variable.key]}</span>{/each}
                      </div>
                      <p class="stage-note">One branch-day case carries its complete close-of-day record together.</p>
                    {:else}
                      <table class="io-table data-grid">
                        <thead><tr><th>branch-day</th>{#each DATA_VARIABLES as variable}<th>{variable.label}</th>{/each}</tr></thead>
                        <tbody>{#each DATA_CASES as item, ri}
                          <tr class:active={dataRow === ri}><th>{item.name}</th>{#each DATA_VARIABLES as variable}<td>{item[variable.key]}</td>{/each}</tr>
                        {/each}</tbody>
                      </table>
                      <p class="stage-note">The highlighted row is one complete observation.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'variable-focus'}
                  <div class="rows data-stage">
                    <div class="data-picks" aria-label="Choose one variable">
                      {#each DATA_VARIABLES as variable}
                        <button class="chip" class:up={dataColumn === variable.key} on:click={() => (dataColumn = variable.key)}>{variable.label}</button>
                      {/each}
                    </div>
                    <table class="io-table data-grid">
                      <thead><tr><th>branch-day</th>{#each DATA_VARIABLES as variable}<th class:active={dataColumn === variable.key}>{variable.label}</th>{/each}</tr></thead>
                      <tbody>{#each DATA_CASES as item}<tr><th>{item.name}</th>{#each DATA_VARIABLES as variable}<td class:active={dataColumn === variable.key}>{item[variable.key]}</td>{/each}</tr>{/each}</tbody>
                    </table>
                    <p class="stage-note">Read down: {DATA_CASES.map(item => item[dataColumn]).join(', ')}. One question, asked of every case.</p>
                  </div>

                {:else if interaction.kind === 'variable-sort'}
                  <div class="rows data-stage">
                    <div class="data-sort">
                      {#each DATA_VARIABLES as variable}
                        <button class="data-sort-card" class:right={dataSort[variable.key] === variable.type} on:click={() => dataCycle(variable.key)}>
                          <b>{variable.label}</b><small>{dataSort[variable.key]}</small>
                        </button>
                      {/each}
                    </div>
                    <p class="stage-note" class:success={dataSortComplete}>{dataSortComplete ? 'All three variables classified. Labels are categorical; counts and measurements are quantitative.' : 'Tap each card until its type is right.'}</p>
                  </div>

                {:else if interaction.kind === 'dataset-grid'}
                  <div class="rows data-stage">
                    <div class="data-picks">
                      <button class="chip" class:up={dataAxis === 'row'} on:click={() => (dataAxis = 'row')}>read a case →</button>
                      <button class="chip" class:up={dataAxis === 'column'} on:click={() => (dataAxis = 'column')}>read a variable ↓</button>
                    </div>
                    {#if dataAxis === 'row'}
                      <div class="data-picks">{#each DATA_CASES as item, ri}<button class="chip" class:up={dataRow === ri} on:click={() => (dataRow = ri)}>{item.name}</button>{/each}</div>
                    {:else}
                      <div class="data-picks">{#each DATA_VARIABLES as variable}<button class="chip" class:up={dataColumn === variable.key} on:click={() => (dataColumn = variable.key)}>{variable.label}</button>{/each}</div>
                    {/if}
                    <table class="io-table data-grid">
                      <thead><tr><th>branch-day</th>{#each DATA_VARIABLES as variable}<th class:active={dataAxis === 'column' && dataColumn === variable.key}>{variable.label}</th>{/each}</tr></thead>
                      <tbody>{#each DATA_CASES as item, ri}<tr class:active={dataAxis === 'row' && dataRow === ri}><th>{item.name}</th>{#each DATA_VARIABLES as variable}<td class:active={dataAxis === 'column' && dataColumn === variable.key}>{item[variable.key]}</td>{/each}</tr>{/each}</tbody>
                    </table>
                    <p class="stage-note">Across reconstructs one case. Down compares one variable.</p>
                  </div>

                {:else if interaction.kind === 'dataset-repair'}
                  <div class="rows data-stage">
                    <table class="io-table data-grid">
                      <thead><tr><th>branch-day</th><th>region</th><th>transactions</th><th>stockouts</th></tr></thead>
                      <tbody>{#each DATA_CASES as item}<tr><th>{item.name}</th><td>{item.region}</td><td>{item.transactions}</td><td class:missing={item.name === 'B-044'}>{item.name === 'B-044' ? (dataGuess ?? '?') : item.stockouts}</td></tr>{/each}</tbody>
                    </table>
                    <div class="data-picks" aria-label="Restore B-044's recorded stockout count">
                      {#each [2, 4, 7] as guess}<button class="chip" class:up={dataGuess === guess} on:click={() => (dataGuess = guess)}>{guess}</button>{/each}
                    </div>
                    <p class="stage-note" class:success={dataGuess === 4}>{dataGuess === null ? 'Return B-044\'s detached count to the cell where B-044 crosses stockouts.' : dataGuess === 4 ? 'Feed repaired: 4 belongs to B-044’s row and the stockouts column.' : 'That value does not match the branch close record. Do not invent data to fill a blank.'}</p>
                  </div>

                {:else if interaction.kind === 'pair-up' || interaction.kind === 'pair-mismatch'}
                  {@const horses = interaction.kind === 'pair-mismatch' ? 4 : 5}
                  <div class="rows">
                    <div class="pair-rows">
                      <div class="prow">{#each Array(5) as _, i}
                        <button class="tok rider" class:linked={i < pairs} on:click={() => (pairs = Math.min(Math.min(5, horses), pairs + 1))} aria-label={`Rider ${i + 1}`}>🧍</button>
                      {/each}</div>
                      <div class="prow">{#each Array(horses) as _, i}
                        <span class="tok horse" class:linked={i < pairs}>🐴</span>
                      {/each}</div>
                    </div>
                    <p class="stage-note">
                      {pairs === 0 ? 'Tap a rider to pair it with a horse.'
                        : pairs < 5 && pairs === horses ? 'The horses have run out. One rider is left standing, so they do not match.'
                        : pairs === 5 ? 'Every rider has a horse and every horse has a rider. The same amount, and nothing counted.'
                        : `${pairs} paired so far.`}
                    </p>
                  </div>

                {:else if interaction.kind === 'tally-basket'}
                  <div class="rows">
                    <div class="prow">{#each Array(7) as _, i}<span class="tok" class:faded={i < tallied}>🧍</span>{/each}</div>
                    <button class="chip" on:click={() => (tallied = Math.min(7, tallied + 1))} disabled={tallied >= 7}>a rider passes · drop a pebble</button>
                    <div class="basket">{#each Array(tallied) as _}<i></i>{/each}</div>
                    <p class="stage-note">
                      {tallied < 7 ? `${tallied} in the basket, ${7 - tallied} still to pass.`
                        : 'The company has gone. The basket holds what it held.'}
                      {#if tallied === 7}<b> {tallied}</b>{/if}
                    </p>
                  </div>

                {:else if interaction.kind === 'same-count'}
                  <div class="rows">
                    {#each [['sheep', '🐑'], ['coins', '🪙'], ['pebbles', '⬤']] as [name, glyph], ci}
                      <div class="coll">
                        <small>{name}</small>
                        <div class="prow">{#each Array(counts[ci]) as _}<span class="tok sm">{glyph}</span>{/each}</div>
                        <span class="pm">
                          <button on:click={() => counts = counts.map((v, i) => i === ci ? Math.max(0, v - 1) : v)} aria-label={`Fewer ${name}`}>−</button>
                          <button on:click={() => counts = counts.map((v, i) => i === ci ? Math.min(8, v + 1) : v)} aria-label={`More ${name}`}>+</button>
                        </span>
                      </div>
                    {/each}
                    <div class="shared" class:agreed={counts[0] === counts[1] && counts[1] === counts[2]}>
                      {counts[0] === counts[1] && counts[1] === counts[2]
                        ? `All three match. The amount they share is ${counts[0]}.`
                        : 'They do not match, so there is no one amount to name.'}
                    </div>
                  </div>

                {:else if interaction.kind === 'pebble-to-figure'}
                  <div class="rows centre">
                    <div class="basket">{#each Array(pebbles) as _}<i></i>{/each}</div>
                    <div class="pm">
                      <button on:click={() => (pebbles = Math.max(0, pebbles - 1))} aria-label="Remove a pebble">−</button>
                      <button on:click={() => (pebbles = Math.min(9, pebbles + 1))} aria-label="Add a pebble">+</button>
                    </div>
                    <div class="figure-big">{pebbles}</div>
                    <p class="stage-note">The pebbles are still there. The figure only records them.</p>
                  </div>

                {:else if interaction.kind === 'figure-row'}
                  <div class="rows">
                    <div class="fig-row">
                      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as f}
                        <span class="fig"><b>{f}</b><em>{'•'.repeat(f)}</em></span>
                      {/each}
                    </div>
                    <p class="stage-note">Ten marks, and every number ever written is made from them.</p>
                  </div>

                {:else if interaction.kind === 'zoom-line'}
                  <div class="rows">
                    <div class="numline" class:open={zoomed}>
                      {#each (zoomed ? Array.from({ length: 11 }, (_, i) => 2 + i / 10) : [0, 1, 2, 3, 4]) as v}
                        <span class="tick" class:whole={Number.isInteger(v)}>
                          <i></i><small>{zoomed ? v.toFixed(1) : v}</small>
                        </span>
                      {/each}
                    </div>
                    <button class="chip" on:click={() => (zoomed = !zoomed)}>
                      {zoomed ? 'zoom back out' : 'look between 2 and 3'}
                    </button>
                    <p class="stage-note">
                      {zoomed
                        ? 'Ten marks, and none of them was added. The first drawing was too coarse to show them.'
                        : 'Whole marks only. Nothing appears to lie between them.'}
                    </p>
                  </div>

                {:else if interaction.kind === 'jug-fill'}
                  <div class="rows centre">
                    <div class="jug"><i style={`height:${(jug / 3) * 100}%`}></i>
                      {#each [1, 2, 3] as m}<span class="jug-mark" style={`bottom:${(m / 3) * 100}%`}><small>{m}</small></span>{/each}
                    </div>
                    <label class="range-row">
                      <span>empty</span>
                      <input type="range" min="0" max="3" step="0.1" bind:value={jug} aria-label="Litres in the jug"/>
                      <span>3 L</span>
                    </label>
                    <p class="stage-note">{jug.toFixed(1)} litres{Number.isInteger(jug) ? '' : ', which is not a whole number of litres'}</p>
                  </div>

                {:else if interaction.kind === 'split-bar'}
                  <div class="rows">
                    <div class="unit-bar">
                      {#each Array(10) as _, i}
                        <button class="seg" class:on={i < shaded} on:click={() => (shaded = i + 1 === shaded ? i : i + 1)}
                          aria-label={`Shade ${i + 1} tenths`}></button>
                      {/each}
                    </div>
                    <div class="big"><b>{(shaded / 10).toFixed(1)}</b><small>= {shaded}/10, {shaded === 1 ? 'one tenth' : shaded + ' tenths'}</small></div>
                    <p class="stage-note">One whole, cut into ten. Tap to shade.</p>
                  </div>

                {:else if interaction.kind === 'place-columns'}
                  <div class="rows">
                    <div class="cols">
                      {#each ['wholes', 'tenths', 'hundredths'] as name, i}
                        <button class="col" class:here={digitCol === i} on:click={() => (digitCol = i)}>
                          <small>{name}</small>
                          <b>{digitCol === i ? '7' : '0'}</b>
                        </button>
                      {/each}
                    </div>
                    <div class="big">
                      <b>{['7', '0.7', '0.07'][digitCol]}</b>
                      <small>seven {['wholes', 'tenths', 'hundredths'][digitCol]}</small>
                    </div>
                    <p class="stage-note">The digit never changes. Only where it stands.</p>
                  </div>

                {:else if interaction.kind === 'compare-two'}
                  <div class="rows">
                    <div class="numline compare">
                      {#each [0, 0.25, 0.5, 0.75, 1] as v}<span class="tick whole"><i></i><small>{v}</small></span>{/each}
                      <em class="mk a" style={`left:${cmpA * 100}%`}>{cmpA.toFixed(2)}</em>
                      <em class="mk b" style={`left:${cmpB * 100}%`}>{cmpB.toFixed(2)}</em>
                    </div>
                    <label class="range-row"><span>A</span>
                      <input type="range" min="0" max="1" step="0.01" bind:value={cmpA} aria-label="First number"/></label>
                    <label class="range-row"><span>B</span>
                      <input type="range" min="0" max="1" step="0.01" bind:value={cmpB} aria-label="Second number"/></label>
                    <p class="stage-note">
                      {cmpA === cmpB ? 'Both in the same place.' : `${(cmpA > cmpB ? cmpA : cmpB).toFixed(2)} is further along, so it is the larger.`}
                    </p>
                  </div>

                {:else if interaction.kind === 'subtract-strip' || interaction.kind === 'change-sign'}
                  
                  <div class="rows">
                    <div class="row"><small>WAS</small>
                      <button on:click={() => (rbOld = Math.max(0, rbOld - 1))} aria-label="Lower old value">−</button>
                      <b>{rbOld}</b>
                      <button on:click={() => (rbOld = rbOld + 1)} aria-label="Raise old value">+</button>
                    </div>
                    <div class="row"><small>NOW</small>
                      <button on:click={() => (rbNew = Math.max(0, rbNew - 1))} aria-label="Lower new value">−</button>
                      <b>{rbNew}</b>
                      <button on:click={() => (rbNew = rbNew + 1)} aria-label="Raise new value">+</button>
                    </div>
                    <div class="work-lines">
                      <span>new − old</span>
                      <span>{rbNew} − {rbOld}</span>
                      <b class:falling={rbDelta < 0}>{rbDelta < 0 ? '−' + Math.abs(rbDelta) : rbDelta}</b>
                    </div>
                    <p class="stage-note">
                      {rbDelta > 0 ? 'It rose, so the change is positive.'
                        : rbDelta < 0 ? 'It fell, so the change is negative. The subtraction records direction as well as size.'
                        : 'No change at all, which is a change of nought.'}
                    </p>
                  </div>

                {:else if interaction.kind === 'grow-bars' || interaction.kind === 'same-change-bars'}
                  {@const pair = interaction.kind === 'same-change-bars' ? [PLANT, TREE] : [PLANT]}
                  <div class="rows">
                    {#each pair as o}
                      <div class="grow-row">
                        <small>{o.name}</small>
                        <span class="gbar"><i style={`width:${(o.from / 20) * 100}%`}></i><em style={`left:${(o.from / 20) * 100}%;width:${((o.to - o.from) / 20) * 100}%`}></em></span>
                        <b>+{o.to - o.from} {o.unit}</b>
                      </div>
                    {/each}
                    <p class="stage-note">
                      {interaction.kind === 'same-change-bars'
                        ? 'Both shaded pieces are the same length on the page. One is inches and the other is feet, and one took a month while the other took a year.'
                        : `From ${PLANT.from} to ${PLANT.to}. The shaded piece is the change.`}
                    </p>
                  </div>

                {:else if interaction.kind === 'change-table' || interaction.kind === 'change-only-table' || interaction.kind === 'change-over-time'}
                  <div class="rows">
                    {#if interaction.kind === 'change-table'}
                      <table class="io-table">
                        <thead><tr><th>reading</th><th>was</th><th>now</th><th>change</th></tr></thead>
                        <tbody>
                          {#each rbRows.slice(0, -1) as v, i}
                            <tr><td>{i + 1} → {i + 2}</td><td>{v}</td><td>{rbRows[i + 1]}</td><td><b>{rbRows[i + 1] - v > 0 ? '+' : ''}{rbRows[i + 1] - v}</b></td></tr>
                          {/each}
                        </tbody>
                      </table>
                      <p class="stage-note">A change belongs to a pair of readings, not to one of them.</p>
                    {:else if interaction.kind === 'change-only-table'}
                      <table class="io-table">
                        <thead><tr><th></th><th>change</th><th>which grew faster?</th></tr></thead>
                        <tbody>
                          <tr><td>plant</td><td><b>2</b></td><td class="blank">—</td></tr>
                          <tr><td>tree</td><td><b>2</b></td><td class="blank">—</td></tr>
                        </tbody>
                      </table>
                      <p class="stage-note">The last column cannot be filled from this table. What is missing is not hidden; it was never collected.</p>
                    {:else}
                      <table class="io-table">
                        <thead><tr><th></th><th>change</th><th>over</th><th>rate</th></tr></thead>
                        <tbody>
                          {#each [PLANT, TREE] as o}
                            <tr><td>{o.name}</td><td>{o.to - o.from} {o.unit}</td><td>{o.per} {o.perUnit}</td>
                              <td><b>{inchesPerMonth(o)} in/month</b></td></tr>
                          {/each}
                        </tbody>
                      </table>
                      <p class="stage-note">The same table the next board opens with, before any notation is put on it.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'plant-tree' || interaction.kind === 'rate-of-change' || interaction.kind === 'rate-race' || interaction.kind === 'unit-match'}
                  {@const showRate = interaction.kind !== 'plant-tree'}
                  <div class="rows">
                    <div class="pt-pair">
                      {#each [PLANT, TREE] as o}
                        <div class="pt-one">
                          <small>{o.name}</small>
                          <span class="pt-bar"><i class:racing={interaction.kind === 'rate-race'}
                            style={`height:${(o.from / 20) * 100}%`}></i></span>
                          <b>{o.from} → {o.to} {o.unit}</b>
                          <em>in {o.per} {o.perUnit}</em>
                          {#if showRate}<strong>{inchesPerMonth(o)} inches per month</strong>{/if}
                        </div>
                      {/each}
                    </div>
                    {#if interaction.kind === 'unit-match'}
                      <div class="plates">
                        {#each ['month', 'year'] as u}
                          <button class="chip" class:on={rbUnit === u} on:click={() => (rbUnit = u)}>compare per {u}</button>
                        {/each}
                      </div>
                      <p class="stage-note">
                        Per {rbUnit}: plant {inchesPerMonth(PLANT) * (rbUnit === 'year' ? 12 : 1)} inches,
                        tree {inchesPerMonth(TREE) * (rbUnit === 'year' ? 12 : 1)} inches. Same verdict either way, once the units agree.
                      </p>
                    {:else}
                      <p class="stage-note">
                        {#if !showRate}
                          Both grew by 2. One took a month and the other a year, and one is measured in inches and the other in feet. Nothing here settles which grew faster.
                        {:else if rbSame}
                          Both come to {inchesPerMonth(PLANT)} inches a month. They are growing at exactly the same rate, which the bare changes could not have told you.
                        {:else}
                          The rates differ.
                        {/if}
                      </p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'per-one' || interaction.kind === 'rate-cards'}
                  {#if interaction.kind === 'per-one'}
                    <div class="rows">
                      <div class="row"><small>APPLES</small>
                        <button on:click={() => (rbApples = Math.max(1, rbApples - 1))} aria-label="Fewer apples">−</button>
                        <b>{rbApples}</b>
                        <button on:click={() => (rbApples = rbApples + 1)} aria-label="More apples">+</button>
                      </div>
                      <div class="row"><small>COST</small>
                        <button on:click={() => (rbCost = Math.max(0, rbCost - 50))} aria-label="Lower cost">−</button>
                        <b>{(rbCost / 100).toFixed(2)}</b>
                        <button on:click={() => (rbCost = rbCost + 50)} aria-label="Raise cost">+</button>
                      </div>
                      <div class="big"><b>{(rbCost / rbApples).toFixed(0)}p</b><small>for each apple</small></div>
                      <p class="stage-note">Move both and the per-one figure can stay where it is. That is what makes it a thing of its own.</p>
                    </div>
                  {:else}
                    <div class="rows">
                      {#each [['3 pounds for 6 apples', '50p per apple'], ['120 miles in 2 hours', '60 miles per hour'], ['40 pages in 5 days', '8 pages per day']] as [said, means]}
                        <div class="rule-card"><b>{said}</b><em>{means}</em></div>
                      {/each}
                      <p class="stage-note">Each says the same thing twice. The right-hand form is the rate.</p>
                    </div>
                  {/if}

                {:else if interaction.kind === 'rate-convert'}
                  <div class="rows">
                    <label class="range-row"><span>1</span>
                      <input type="range" min="1" max="20" step="1" bind:value={rbYps} aria-label="Yards per second"/>
                      <span>20</span></label>
                    <div class="readouts">
                      <div class="readout live"><small>per second</small><b>{rbYps} yd</b></div>
                      <div class="readout live"><small>per minute</small><b>{rbYps * 60} yd</b></div>
                      <div class="readout live"><small>per hour</small><b>{((rbYps * 3600) / 1760).toFixed(1)} mi</b></div>
                    </div>
                    <p class="stage-note">One motion, three descriptions. Nothing about the car changes when the unit does.</p>
                  </div>

                {:else if interaction.kind === 'rate-dial'}
                  <div class="rows">
                    <div class="row"><small>RATE</small>
                      <button on:click={() => (rbDial = Math.max(0, rbDial - 1))} aria-label="Lower rate">−</button>
                      <b>{rbDial}</b>
                      <button on:click={() => (rbDial = rbDial + 1)} aria-label="Raise rate">+</button>
                      <small>per second</small>
                    </div>
                    <div class="row"><small>FOR</small>
                      <button on:click={() => (rbSecs = Math.max(0, rbSecs - 1))} aria-label="Fewer seconds">−</button>
                      <b>{rbSecs}</b>
                      <button on:click={() => (rbSecs = rbSecs + 1)} aria-label="More seconds">+</button>
                      <small>seconds</small>
                    </div>
                    <div class="big"><b>{rbDial * rbSecs}</b><small>altogether</small></div>
                    <p class="stage-note">Read the other way: given a rate and a time, the amount follows.</p>
                  </div>

                {:else if interaction.kind === 'switch-toggle' || interaction.kind === 'switch-plain'}
                  <div class="rows centre">
                    <div class="lamp" class:lit={sw.up}>{sw.up ? 'ON' : 'OFF'}</div>
                    <button
                      class="switch-body"
                      class:on={sw.up}
                      type="button"
                      role="switch"
                      aria-checked={sw.up}
                      aria-label={`Light switch is ${sw.up ? 'up and the lamp is on' : 'down and the lamp is off'}. Press to move it ${sw.up ? 'down' : 'up'}.`}
                      on:click={() => flick(!sw.up)}
                    >
                      <img
                        src={sw.up ? '/media/functions/function-switch-on.png' : '/media/functions/function-switch-off.png'}
                        alt=""
                        draggable="false"
                      />
                      <small>{sw.up ? 'UP · ON' : 'DOWN · OFF'}</small>
                    </button>
                    {#if interaction.kind === 'switch-toggle'}
                      <p class="stage-note">
                        up chosen {sw.tally.up} {sw.tally.up === 1 ? 'time' : 'times'}, light came on {sw.tally.up} {sw.tally.up === 1 ? 'time' : 'times'}.
                        down chosen {sw.tally.down} {sw.tally.down === 1 ? 'time' : 'times'}, light went off {sw.tally.down} {sw.tally.down === 1 ? 'time' : 'times'}.
                      </p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'tap-valve' || interaction.kind === 'tap-piston'}
                  <div class="rows">
                    <label class="range-row">
                      <span>shut</span>
                      <input type="range" min="0" max="10" step="1" value={tap.turn}
                        on:input={e => turnTap(Number(e.target.value))} aria-label="Tap setting"/>
                      <span>open</span>
                    </label>
                    {#if interaction.kind === 'tap-valve'}
                      <div class="flow-row">
                        <b>{flow(tap.turn)}</b><small>litres a minute</small>
                      </div>
                      <div class="flow-bar"><i style={`width:${tap.turn * 10}%`}></i></div>
                      {#if tap.visited[tap.turn] > 1}
                        <p class="stage-note">You have been at this setting {tap.visited[tap.turn]} times. The flow was {flow(tap.turn)} every time.</p>
                      {/if}
                    {:else}
                      <div class="readouts">
                        <div class="readout live"><small>volume</small><b>{(12 - tap.turn).toFixed(0)}</b></div>
                        <div class="readout live"><small>pressure</small><b>{(24 / Math.max(1, 12 - tap.turn)).toFixed(1)}</b></div>
                      </div>
                      <p class="stage-note">Weight on the piston. The volume falls as the pressure rises.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'machine-panel' || interaction.kind === 'machine-labels'}
                  <div class="rows">
                    <div class="panel">
                      {#each PANEL as drink, bi}
                        <button class="panel-btn" on:click={() => press(bi)}>
                          <b>{bi + 1}</b>
                          {#if interaction.kind === 'machine-labels'}<em>{drink}</em>{/if}
                        </button>
                      {/each}
                    </div>
                    {#if interaction.kind === 'machine-panel'}
                      {#if panel.log.length}
                        <table class="io-table">
                          <thead><tr><th>pressed</th><th>arrived</th></tr></thead>
                          <tbody>
                            {#each panel.log.slice(-6) as r}<tr><td>{r.button}</td><td><b>{r.out}</b></td></tr>{/each}
                          </tbody>
                        </table>
                      {:else}
                        <p class="stage-note">Press a button. What arrives is recorded below it.</p>
                      {/if}
                    {/if}
                  </div>

                {:else if interaction.kind === 'forked-button' || interaction.kind === 'flaky-button'}
                  <div class="rows">
                    <div class="machine-row">
                      {#each [['sound', 'Machine A'], ['broken', interaction.kind === 'forked-button' ? 'Machine B, one button wired twice' : 'Machine B, will not settle']] as [which, label]}
                        <div class="machine">
                          <span class="plate">{label}</span>
                          <div class="panel">
                            {#each SOUND as _, bi}
                              <button class="panel-btn" on:click={() => pressBroken(which, bi)}><b>{bi + 1}</b></button>
                            {/each}
                          </div>
                        </div>
                      {/each}
                    </div>
                    {#if broken.log.length}
                      <table class="io-table">
                        <thead><tr><th>machine</th><th>button</th><th>arrived</th></tr></thead>
                        <tbody>
                          {#each broken.log.slice(-6) as r}
                            <tr><td>{r.which === 'sound' ? 'A' : 'B'}</td><td>{r.button}</td><td><b class:two={r.forked}>{r.out}</b></td></tr>
                          {/each}
                        </tbody>
                      </table>
                    {/if}
                    <p class="stage-note">
                      {interaction.kind === 'forked-button'
                        ? 'Button 3 on machine B sends out both, every time. Predictable, and still no answer to "which".'
                        : 'Machine B is drafted here as forking too. Built as written, its button would vary between presses instead.'}
                    </p>
                  </div>

                {:else if interaction.kind === 'substitute-strip'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>b</small>
                      <button on:click={() => sub = { b: Math.max(1, sub.b - 1) }} aria-label="Decrease b">−</button>
                      <b>{sub.b}</b>
                      <button on:click={() => sub = { b: Math.min(6, sub.b + 1) }} aria-label="Increase b">+</button>
                    </div>
                    <div class="work-lines">
                      <span>3b²</span>
                      <span>3 × {sub.b}²</span>
                      <span>3 × {sub.b * sub.b}</span>
                      <b>{3 * sub.b * sub.b}</b>
                    </div>
                  </div>

                {:else if interaction.kind === 'machine-single' || interaction.kind === 'two-machines'}
                  {@const names = interaction.kind === 'two-machines' ? ['double it', 'square it'] : ['square it']}
                  <div class="rows">
                    <div class="bench-row">
                      <small>IN</small>
                      <button on:click={() => mach = { x: Math.max(0, mach.x - 1) }} aria-label="Decrease input">−</button>
                      <b>{mach.x}</b>
                      <button on:click={() => mach = { x: Math.min(6, mach.x + 1) }} aria-label="Increase input">+</button>
                    </div>
                    <div class="machine-row">
                      {#each names as nm}
                        <div class="machine">
                          <span class="port">{mach.x}</span>
                          <span class="plate">{nm}</span>
                          <b class="port out">{run(nm, mach.x)}</b>
                        </div>
                      {/each}
                    </div>
                  </div>

                {:else if interaction.kind === 'rule-swap'}
                  <div class="rows">
                    <div class="plates">
                      {#each PLATES.slice(0, 3) as nm, pi}
                        <button class="chip plate-pick" class:up={plate === pi} on:click={() => plate = pi}>{nm}</button>
                      {/each}
                    </div>
                    <table class="io-table">
                      <thead><tr><th>in</th><th>out</th></tr></thead>
                      <tbody>
                        {#each [1, 2, 3, 4] as v}
                          <tr><td>{v}</td><td><b>{run(PLATES[plate], v)}</b></td></tr>
                        {/each}
                      </tbody>
                    </table>
                    <p class="stage-note">The left column never moves. Only the plate does.</p>
                  </div>

                {:else if interaction.kind === 'relation-test' || interaction.kind === 'relation-guess'}
                  {@const h = ladHeight(lad.d)}
                  {@const footX = 40 + lad.d * 25}
                  {@const topY = 136 - h * 25}
                  <div class="rows">
                    <svg class="ladder-svg" viewBox="0 0 210 150" role="img" aria-label={`A ladder with its foot ${fmt2(lad.d)} from the wall, reaching ${fmt2(h)} up it`}>
                      <!-- The wall, with courses of brick, and a date plaque. The
                           two quantities that will not respond have to be visibly
                           present, or their not responding says nothing. -->
                      <rect class="wall" x="6" y="6" width="34" height="130"/>
                      {#each [20, 34, 48, 62, 76, 90, 104, 118, 132] as by}
                        <line class="brick" x1="6" y1={by} x2="40" y2={by}/>
                      {/each}
                      {#each [20, 48, 76, 104] as by}<line class="brick" x1="23" y1={by} x2="23" y2={by + 14}/>{/each}
                      {#each [34, 62, 90, 118] as by}<line class="brick" x1="14" y1={by} x2="14" y2={by + 14}/>{/each}
                      {#each [34, 62, 90, 118] as by}<line class="brick" x1="32" y1={by} x2="32" y2={by + 14}/>{/each}
                      <rect class="plaque" x="12" y="120" width="22" height="11" rx="2"/>
                      <text class="plaque-text" x="23" y="128">1908</text>
                      <line class="floor" x1="0" y1="136" x2="210" y2="136"/>
                      <!-- Height reached, marked on the wall itself. -->
                      <line class="hmark" x1="40" y1={topY} x2="52" y2={topY}/>
                      <text class="hmark-text" x="55" y={topY + 4}>{fmt2(h)}</text>
                      <line class="ladder" x1={footX} y1="136" x2="40" y2={topY}/>
                      <line class="ladder rail" x1={footX - 7} y1="136" x2="33" y2={topY}/>
                      <circle class="foot" cx={footX} cy="136" r="4"/>
                    </svg>
                    <label class="range-row">
                      <span>at the wall</span>
                      <input type="range" min="0" max="5" step="0.5" bind:value={lad.d} aria-label="Distance of the foot of the ladder from the wall"/>
                      <span>far out</span>
                    </label>

                    {#if interaction.kind === 'relation-test'}
                      <!-- All three carry equal weight. Greying the two that do
                           not move would say the machine had switched them off,
                           when the point is that nothing joins them to the foot
                           of the ladder in the first place. -->
                      <div class="readouts">
                        <div class="readout"><small>height reached</small><b>{fmt2(h)}</b></div>
                        <div class="readout"><small>bricks in the wall</small><b>1,240</b></div>
                        <div class="readout"><small>year it was built</small><b>1908</b></div>
                      </div>
                    {:else}
                      <div class="readouts">
                        {#each [['height reached', fmt2(h)], ['bricks in the wall', '1,240'], ['year it was built', '1908']] as [name, val], qi}
                          <div class="readout" class:revealed={guessed[qi]}>
                            <small>{name}</small>
                            {#if guessed[qi]}
                              <b>{val}</b>
                            {:else}
                              <div class="guess">
                                <button class="chip" on:click={() => guessed = { ...guessed, [qi]: 1 }}>changes</button>
                                <button class="chip" on:click={() => guessed = { ...guessed, [qi]: 1 }}>does not</button>
                              </div>
                            {/if}
                          </div>
                        {/each}
                      </div>
                      <p class="stage-note">Say what each one will do, then move the ladder and find out.</p>
                    {/if}
                  </div>

                {:else if interaction.kind === 'notation-builder'}
                  <div class="rows centre">
                    <div class="build-line">
                      <span class="card val">y<em>what comes out</em></span>
                      <span class="card sym">=</span>
                      <button class="card sym cycle" on:click={() => nota = (nota + 1) % NOTATION.length}>{NOTATION[nota]}<em>the rule</em></button>
                      <span class="card sym">(</span>
                      <span class="card val">x<em>what goes in</em></span>
                      <span class="card sym">)</span>
                    </div>
                    <p class="stage-note">Tap the letter. The meaning underneath does not change.</p>
                  </div>

                {:else if interaction.kind === 'notation-card'}
                  <div class="rows centre">
                    <div class="build-line">
                      {#each NOTATION as L}<span class="card sym">y = {L}(x)</span>{/each}
                    </div>
                    <p class="stage-note">All three say that y depends on x by some rule.</p>
                  </div>

                {:else if interaction.kind === 'two-answers'}
                  {@const outs = forkAnswers(fork.x)}
                  <div class="rows">
                    <div class="bench-row">
                      <small>IN</small>
                      <button on:click={() => fork = { x: fork.x - 1 }} aria-label="Decrease input">−</button>
                      <b>{fmt2(fork.x)}</b>
                      <button on:click={() => fork = { x: fork.x + 1 }} aria-label="Increase input">+</button>
                    </div>
                    <div class="machine">
                      <span class="plate">{FORK_RULE}</span>
                      <div class="fork">
                        {#if outs.length === 0}
                          <span class="port empty">nothing comes out</span>
                        {:else}
                          {#each outs as o}<b class="port out">{fmt2(o)}</b>{/each}
                        {/if}
                      </div>
                    </div>
                    <p class="stage-note">
                      {outs.length === 0 ? 'No number multiplied by itself gives a negative.'
                        : outs.length === 1 ? 'Only here do the two answers land on top of each other.'
                        : 'Two answers, and both are right.'}
                    </p>
                  </div>

                {:else if interaction.kind === 'square-back'}
                  <div class="rows">
                    <table class="io-table">
                      <thead><tr><th>n</th><th>n²</th></tr></thead>
                      <tbody>
                        {#each [-3, -2, -1, 0, 1, 2, 3] as n}
                          <tr><td>{fmt2(n)}</td><td><b>{n * n}</b></td></tr>
                        {/each}
                      </tbody>
                    </table>
                    <p class="stage-note">Read the right column backwards and 9 has two rows pointing at it.</p>
                  </div>

                {:else if interaction.kind === 'function-or-not' || interaction.kind === 'verdict-strip'}
                  {@const cards = [
                    { name: 'double it', runs: '2 → 4, 3 → 6, 4 → 8' },
                    { name: 'square it', runs: '−2 → 4, 0 → 0, 2 → 4' },
                    { name: 'a number whose square is x', runs: '9 → 3 and −3' },
                    { name: '1 divided by it', runs: '2 → 0.5, 0 → refused' },
                    { name: 'a number bigger than x', runs: '3 → 4, 5, 6, …' }
                  ]}
                  {@const shown = interaction.kind === 'verdict-strip' ? cards.slice(0, 3) : cards}
                  <div class="rows">
                    {#each shown as c}
                      <div class="rule-card" class:passed={verdicts[c.name] === 'pass'} class:failed={verdicts[c.name] === 'fail'}>
                        <b>{c.name}</b>
                        {#if testedRules[c.name]}
                          <em>{c.runs}</em>
                        {:else}
                          <button class="chip" on:click={() => testRule(c.name)}>test it</button>
                        {/if}
                        <div class="verdict">
                          <button class="chip" on:click={() => judge(c.name, 'pass')}>function</button>
                          <button class="chip" on:click={() => judge(c.name, 'fail')}>not</button>
                        </div>
                      </div>
                    {/each}
                  </div>

                {:else if interaction.kind === 'accepted-line'}
                  {@const ok = accept.x >= 0}
                  <div class="rows">
                    <label class="range-row">
                      <span>−9</span>
                      <input type="range" min="-9" max="9" step="1" bind:value={accept.x} aria-label="Number offered to the rule"/>
                      <span>9</span>
                    </label>
                    <div class="accept-strip" class:ok>
                      <span>{fmt2(accept.x)}</span>
                      <b>{ok ? `accepted → ${fmt2(Math.sqrt(accept.x))} and ${fmt2(-Math.sqrt(accept.x))}` : 'refused'}</b>
                    </div>
                    <p class="stage-note">Drag across nought and watch where the refusal starts.</p>
                  </div>

                {:else if interaction.kind === 'accepted-list'}
                  <div class="rows">
                    <table class="io-table">
                      <thead><tr><th>input</th><th>verdict</th></tr></thead>
                      <tbody>
                        {#each [-4, -1, 0, 1, 4, 9] as n}
                          <tr><td>{fmt2(n)}</td><td><b>{n < 0 ? 'refused' : 'accepted'}</b></td></tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>

                {:else if interaction.kind === 'table-plot-step' || interaction.kind === 'table-plot-predict' || interaction.kind === 'table-plot-sprint' || interaction.kind === 'table-rule-switch'}
                  {@const rows = GRAPH_X.slice(0, graph.count)}
                  <div class="rows">
                    {#if interaction.kind === 'table-rule-switch'}
                      <div class="plates">
                        {#each Object.keys(GRAPH_RULES) as rule}
                          <button class="chip" class:on={graph.rule === rule} on:click={() => (graph = { ...graph, rule, count: 1, guess: null })}>{rule}</button>
                        {/each}
                      </div>
                    {/if}
                    <table class="io-table graph-table">
                      <thead><tr><th>x</th><th>rule</th><th>y</th><th>pair</th></tr></thead>
                      <tbody>
                        {#each rows as x, i}
                          {@const hideLast = interaction.kind === 'table-plot-predict' && i === rows.length - 1 && graph.guess === null}
                          <tr>
                            <td>{x}</td><td>{graph.rule}</td><td><b>{hideLast ? '?' : graphY(x)}</b></td>
                            <td>{hideLast ? '( ?, ? )' : `( ${x}, ${graphY(x)} )`}</td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                    {#if interaction.kind === 'table-plot-predict' && graph.count < GRAPH_X.length && graph.guess === null}
                      <div class="predict-row">
                        <span>For x = {GRAPH_X[graph.count - 1]}, predict y:</span>
                        {#each predictionChoices(GRAPH_X[graph.count - 1]) as answer}<button on:click={() => (graph = { ...graph, guess: answer })}>{answer}</button>{/each}
                      </div>
                    {/if}
                    <button class="reveal-btn" disabled={graph.count >= GRAPH_X.length}
                      on:click={() => (graph = { ...graph, count: Math.min(GRAPH_X.length, graph.count + (interaction.kind === 'table-plot-sprint' ? 3 : 1)), guess: null })}>
                      {interaction.kind === 'table-plot-sprint' ? 'Add three rows' : 'Add the next row'}
                    </button>
                    <p class="stage-note">The rule stays fixed while the input and output form each new pair.</p>
                  </div>

                {:else if interaction.kind === 'table-points' || interaction.kind === 'table-points-order' || interaction.kind === 'curve-from-points' || interaction.kind === 'curve-rule-compare'}
                  {@const xs = graphOrder(interaction.kind).slice(0, graph.count)}
                  {@const curveReady = graph.count >= 5}
                  <div class="rows centre">
                    {#if interaction.kind === 'curve-rule-compare'}
                      <div class="plates">
                        {#each Object.keys(GRAPH_RULES) as rule}
                          <button class="chip" class:on={graph.rule === rule} on:click={() => (graph = { ...graph, rule, count: Math.max(graph.count, 5) })}>{rule}</button>
                        {/each}
                      </div>
                    {/if}
                    <div class="graph-layout">
                      <table class="io-table graph-table compact">
                        <thead><tr><th>x</th><th>y</th></tr></thead>
                        <tbody>{#each xs as x}<tr><td>{x}</td><td><b>{graphY(x)}</b></td></tr>{/each}</tbody>
                      </table>
                      <svg class="plot-svg" viewBox="0 0 300 170" role="img" aria-label="Coordinate plane with points generated by a rule">
                        <path class="plot-axis" d="M22 124H282M150 12V158"/>
                        {#each [-3, -2, -1, 0, 1, 2, 3] as x}<line class="plot-grid" x1={150 + x * 32} y1="16" x2={150 + x * 32} y2="154"/>{/each}
                        {#each [0, 2, 4, 6, 8] as y}<line class="plot-grid" x1="24" y1={124 - y * 13} x2="280" y2={124 - y * 13}/>{/each}
                        {#if (interaction.kind === 'curve-from-points' || interaction.kind === 'curve-rule-compare') && curveReady}
                          <polyline class="plot-curve" points={Array.from({ length: 49 }, (_, i) => { const x = -3 + i / 8; const p = graphPoint(x, graphY(x)); return `${p.x},${p.y}`; }).join(' ')}/>
                        {/if}
                        {#each xs as x}
                          {@const p = graphPoint(x, graphY(x))}
                          <circle class="plot-dot" cx={p.x} cy={p.y} r="5"/>
                        {/each}
                      </svg>
                    </div>
                    <button class="reveal-btn" disabled={graph.count >= GRAPH_X.length}
                      on:click={() => (graph = { ...graph, count: Math.min(GRAPH_X.length, graph.count + 1) })}>
                      Plot another pair
                    </button>
                    <p class="stage-note">{curveReady ? 'Enough points are present to expose the shape.' : 'The curve is withheld until the points begin to establish it.'}</p>
                  </div>

                {:else if interaction.kind === 'point-target-drill' || interaction.kind === 'point-target-shuffle' || interaction.kind === 'curve-plot-drill' || interaction.kind === 'curve-point-check'}
                  {@const drill = drillState(interaction.kind, plotDrill)}
                  {@const spec = PLOT_DRILLS[interaction.kind]}
                  {@const rounds = spec.rounds}
                  {@const round = rounds[drill.step]}
                  {@const done = drill.step >= rounds.length}
                  {@const choices = planeChoices(interaction.kind, drill.step)}
                  <div class="rows centre">
                    <div class="drill-status">
                      {#if round}
                        <span>Select <b>( {round.t[0]}, {round.t[1]} )</b>{#if spec.label} on <em>{spec.label}</em>{/if}</span>
                      {:else}
                        <strong>Round complete · {rounds.length}/{rounds.length}</strong>
                      {/if}
                      <small>{drill.misses === 0 ? 'No wrong selections' : `${drill.misses} wrong so far`}</small>
                    </div>

                    <svg class="plane-svg" viewBox={`0 0 ${PLANE_W} ${PLANE_H}`} role="group"
                      aria-label="Cartesian plane with candidate points to select">
                      <!-- Grid, then both axes through zero, so all four
                           quadrants are present rather than implied. -->
                      {#each Array(PLANE.maxX - PLANE.minX + 1) as _, i}
                        {@const gx = planePt(PLANE.minX + i, 0).px}
                        <line class="pl-grid" x1={gx} y1={planePt(0, PLANE.maxY).py} x2={gx} y2={planePt(0, PLANE.minY).py}/>
                      {/each}
                      {#each Array(PLANE.maxY - PLANE.minY + 1) as _, i}
                        {@const gy = planePt(0, PLANE.minY + i).py}
                        <line class="pl-grid" x1={planePt(PLANE.minX, 0).px} y1={gy} x2={planePt(PLANE.maxX, 0).px} y2={gy}/>
                      {/each}
                      <line class="pl-axis" x1={planePt(PLANE.minX, 0).px} y1={planePt(0, 0).py} x2={planePt(PLANE.maxX, 0).px} y2={planePt(0, 0).py}/>
                      <line class="pl-axis" x1={planePt(0, 0).px} y1={planePt(0, PLANE.maxY).py} x2={planePt(0, 0).px} y2={planePt(0, PLANE.minY).py}/>
                      {#each [-4, -2, 2, 4] as t}
                        <text class="pl-tick" x={planePt(t, 0).px} y={planePt(0, 0).py + 13}>{t < 0 ? '−' + Math.abs(t) : t}</text>
                        <text class="pl-tick" x={planePt(0, 0).px - 9} y={planePt(0, t).py + 3.5}>{t < 0 ? '−' + Math.abs(t) : t}</text>
                      {/each}

                      <!-- Points already placed stay on the plane. -->
                      {#each drill.hits as [hx, hy]}
                        {@const h = planePt(hx, hy)}
                        <circle class="pl-placed" cx={h.px} cy={h.py} r="4.5"/>
                      {/each}

                      <!-- Candidates. The drawn dot is small so it sits at one
                           coordinate; the hit circle is 15px so a fingertip
                           lands on it. -->
                      {#if !done}
                        {#each choices as c (`${c.x},${c.y}`)}
                          {@const pt = planePt(c.x, c.y)}
                          <g class="pl-choice">
                            <circle class="pl-dot" cx={pt.px} cy={pt.py} r="5.5"/>
                            <text class="pl-label" x={pt.px + 9} y={pt.py - 7}>{c.x},{c.y}</text>
                            <circle class="pl-hit" cx={pt.px} cy={pt.py} r={HIT_R} role="button" tabindex="0"
                              aria-label={`Select the point ${c.x}, ${c.y}`}
                              on:click={() => pickPoint(interaction.kind, c)}
                              on:keydown={e => (e.key === 'Enter' || e.key === ' ') && pickPoint(interaction.kind, c)}/>
                          </g>
                        {/each}
                      {/if}

                      <!-- The curve is drawn only once every point is placed, so
                           it confirms the work rather than giving it away. -->
                      {#if done && spec.rule}
                        <polyline class="pl-curve" points={Array.from({ length: 65 }, (_, i) => {
                          const x = PLANE.minX + i * (PLANE.maxX - PLANE.minX) / 64;
                          const y = GRAPH_RULES[spec.rule](x);
                          if (y < PLANE.minY || y > PLANE.maxY) return null;
                          const p = planePt(x, y);
                          return `${p.px},${p.py}`;
                        }).filter(Boolean).join(' ')}/>
                      {/if}
                    </svg>

                    {#if drill.said}<p class="pl-said">{drill.said}</p>{/if}
                    <div class="row">
                      <p class="stage-note">{drill.step} of {rounds.length} placed{#if done && spec.label} — the points lie on {spec.label}{/if}</p>
                      <button class="chip" on:click={() => resetDrill(interaction.kind)}>start again</button>
                    </div>
                  </div>

                {:else if interaction.kind === 'circle-displacement' || interaction.kind === 'circle-journey' || interaction.kind === 'compass-direction' || interaction.kind === 'direction-angle' || interaction.kind === 'vector-builder' || interaction.kind === 'vector-compare'}
                  {@const circleEnd = vectorPoint(vectorState.turn)}
                  {@const vectorEnd = vectorPoint(vectorState.direction, vectorState.magnitude * 10)}
                  <div class="rows centre vector-experiment">
                    {#if interaction.kind === 'circle-displacement' || interaction.kind === 'circle-journey'}
                      <svg class="vector-circle" viewBox="0 0 300 225" role="img" aria-label={`${vectorState.turn} degree journey: distance ${circleDistance(vectorState.turn)} metres and displacement ${circleDisplacement(vectorState.turn)} metres`}>
                        <circle class="orbit" cx="150" cy="110" r="78"/><path class="travel-arc" pathLength="360" stroke-dasharray={`${vectorState.turn} 360`} d="M228 110A78 78 0 1 0 72 110A78 78 0 1 0 228 110"/>
                        <line class="displacement-vector" x1="228" y1="110" x2={circleEnd.x} y2={circleEnd.y}/><polygon class="vector-head" points={`${circleEnd.x},${circleEnd.y} ${circleEnd.x+8},${circleEnd.y+3} ${circleEnd.x+3},${circleEnd.y+9}`}/>
                        <circle class="start-dot" cx="228" cy="110" r="5"/>
                        {#if interaction.kind === 'circle-journey'}{#key vectorState.orbitRun}<circle class:running={vectorState.orbitRun>0} class="orbit-marker" style={`--turn:${vectorState.turn}deg`} cx="228" cy="110" r="7"/>{/key}{:else}<circle class="orbit-marker" cx={circleEnd.x} cy={circleEnd.y} r="7"/>{/if}
                        <text x="239" y="105">start</text>
                      </svg>
                      <div class="vector-picks">{#each [90,180,270,360] as turn}<button class:on={vectorState.turn===turn} on:click={()=>vectorState={...vectorState,turn}}>{turn/360} lap</button>{/each}</div>
                      {#if interaction.kind === 'circle-journey'}<button class="vector-action" on:click={()=>vectorState={...vectorState,orbitRun:vectorState.orbitRun+1}}>TRAVEL THE ARC</button>{/if}
                      <div class="vector-readouts"><span><small>PATH DISTANCE</small><b>{circleDistance(vectorState.turn)} m</b></span><span><small>DISPLACEMENT</small><b>{circleDisplacement(vectorState.turn)} m</b></span></div>
                    {:else if interaction.kind === 'compass-direction' || interaction.kind === 'direction-angle'}
                      <svg class="vector-compass" viewBox="0 0 300 220" role="img" aria-label={`Five metre vector ${compassName(vectorState.direction)}, ${vectorState.direction} degrees from east`}><circle cx="150" cy="110" r="82"/><path d="M150 18V202M58 110H242"/><line class="vector-line" x1="150" y1="110" x2={vectorEnd.x} y2={vectorEnd.y}/><circle class="vector-tip" cx={vectorEnd.x} cy={vectorEnd.y} r="7"/><text x="150" y="15">N</text><text x="250" y="114">E</text><text x="150" y="215">S</text><text x="50" y="114">W</text></svg>
                      <div class="vector-picks">{#each [0,45,90,135,180,225,270,315] as direction}<button class:on={vectorState.direction===direction} on:click={()=>vectorState={...vectorState,direction}}>{interaction.kind==='compass-direction'?compassName(direction):`${direction}°`}</button>{/each}</div>
                      <p class="vector-result">5 m {compassName(vectorState.direction)} · {vectorState.direction}° from east</p>
                    {:else}
                      <svg class="vector-builder" viewBox="0 0 300 220" role="img" aria-label={`Vector magnitude ${vectorState.magnitude}, direction ${vectorState.direction} degrees`}><circle cx="150" cy="110" r="4"/><line class="vector-line" x1="150" y1="110" x2={vectorEnd.x} y2={vectorEnd.y}/><circle class="vector-tip" cx={vectorEnd.x} cy={vectorEnd.y} r="7"/>{#if interaction.kind==='vector-compare'}{@const end2=vectorPoint(vectorState.direction2,vectorState.magnitude2*10)}<line class="vector-line second" x1="150" y1="110" x2={end2.x} y2={end2.y}/><circle class="vector-tip second" cx={end2.x} cy={end2.y} r="6"/>{/if}</svg>
                      <div class="vector-controls"><label>MAGNITUDE <input type="range" min="1" max="8" step="1" value={vectorState.magnitude} on:input={e=>vectorState={...vectorState,magnitude:+e.currentTarget.value}}/><b>{vectorState.magnitude}</b></label><label>DIRECTION <input type="range" min="0" max="315" step="45" value={vectorState.direction} on:input={e=>vectorState={...vectorState,direction:+e.currentTarget.value}}/><b>{vectorState.direction}°</b></label></div>
                      {#if interaction.kind==='vector-compare'}<div class="vector-picks"><button on:click={()=>vectorState={...vectorState,magnitude2:vectorState.magnitude}}>MATCH LENGTH</button><button on:click={()=>vectorState={...vectorState,direction2:vectorState.direction}}>MATCH DIRECTION</button></div><p class="vector-result">{vectorState.magnitude===vectorState.magnitude2&&vectorState.direction===vectorState.direction2?'Equal vectors':'Not equal yet: both parts must match.'}</p>{:else}<p class="vector-result">magnitude {vectorState.magnitude} · direction {compassName(vectorState.direction)}</p>{/if}
                    {/if}
                  </div>

                {:else if interaction.kind === 'vector-translate' || interaction.kind === 'vector-copy-test' || interaction.kind === 'vector-head-tail' || interaction.kind === 'vector-route-order' || interaction.kind === 'vector-resultant' || interaction.kind === 'vector-cancel'}
                  {@const start = vectorGridPoint(0, 0)}
                  {@const eastEnd = vectorGridPoint(vectorAdd.east, 0)}
                  {@const northEnd = vectorGridPoint(0, vectorAdd.north)}
                  {@const finalEnd = vectorGridPoint(vectorAdd.east, vectorAdd.north)}
                  <div class="rows centre vector-experiment vector-addition-experiment">
                    {#if interaction.kind === 'vector-translate'}
                      {@const translatedStart = { x: 40 + vectorAdd.shift, y: 165 - vectorAdd.shift * .35 }}
                      {@const translatedEnd = { x: translatedStart.x + 120, y: translatedStart.y - 75 }}
                      <svg class="vector-add-stage" viewBox="0 0 300 220" role="img" aria-label="The same vector translated to a different starting position">
                        <path class="vector-grid" d="M20 180H280M40 20V205"/>
                        <line class="vector-line" x1={translatedStart.x} y1={translatedStart.y} x2={translatedEnd.x} y2={translatedEnd.y}/><circle class="vector-tip" cx={translatedEnd.x} cy={translatedEnd.y} r="7"/>
                      </svg>
                      <div class="vector-picks">{#each [0,55,105] as shift, i}<button class:on={vectorAdd.shift===shift} on:click={()=>vectorAdd={...vectorAdd,shift}}>{['LEFT','CENTRE','RIGHT'][i]}</button>{/each}</div>
                      <p class="vector-result">magnitude 5 · direction NE — unchanged</p>
                    {:else if interaction.kind === 'vector-copy-test'}
                      {@const copyEnd = vectorAdd.copy==='same' ? {x:250,y:80} : vectorAdd.copy==='turned' ? {x:150,y:45} : {x:212,y:107}}
                      <svg class="vector-add-stage" viewBox="0 0 300 220" role="img" aria-label={`Vector copy comparison: ${vectorAdd.copy}`}>
                        <line class="vector-line muted" x1="35" y1="180" x2="135" y2="110"/><circle class="vector-tip muted" cx="135" cy="110" r="7"/>
                        <line class="vector-line second" x1="150" y1="150" x2={copyEnd.x} y2={copyEnd.y}/><circle class="vector-tip second" cx={copyEnd.x} cy={copyEnd.y} r="7"/>
                      </svg>
                      <div class="vector-picks"><button class:on={vectorAdd.copy==='same'} on:click={()=>vectorAdd={...vectorAdd,copy:'same'}}>TRANSLATED</button><button class:on={vectorAdd.copy==='turned'} on:click={()=>vectorAdd={...vectorAdd,copy:'turned'}}>ROTATED</button><button class:on={vectorAdd.copy==='short'} on:click={()=>vectorAdd={...vectorAdd,copy:'short'}}>SHORTENED</button></div>
                      <p class="vector-result">{vectorAdd.copy==='same'?'Same vector':'Different vector'}</p>
                    {:else if interaction.kind === 'vector-cancel'}
                      {@const cancelStart = 70}
                      {@const cancelMiddle = cancelStart + vectorAdd.east * 24}
                      {@const cancelEnd = cancelMiddle - vectorAdd.west * 24}
                      {@const net = vectorAdd.east-vectorAdd.west}
                      <svg class="vector-add-stage" viewBox="0 0 300 220" role="img" aria-label={`${vectorAdd.east} units east plus ${vectorAdd.west} units west gives ${Math.abs(net)} units ${net===0?'resultant':net>0?'east':'west'}`}>
                        <path class="vector-grid" d="M25 120H275"/><line class="vector-line" x1={cancelStart} y1="105" x2={cancelMiddle} y2="105"/><circle class="vector-tip" cx={cancelMiddle} cy="105" r="7"/><line class="vector-line second" x1={cancelMiddle} y1="135" x2={cancelEnd} y2="135"/><circle class="vector-tip second" cx={cancelEnd} cy="135" r="7"/>
                        {#if net!==0}<line class="resultant-line" x1={cancelStart} y1="175" x2={cancelEnd} y2="175"/><circle class="resultant-tip" cx={cancelEnd} cy="175" r="7"/>{:else}<circle class="zero-result" cx={cancelStart} cy="175" r="9"/> {/if}
                        <text x="150" y="205">resultant</text>
                      </svg>
                      <div class="vector-controls"><label>EAST <input aria-label="East magnitude" type="range" min="1" max="6" step="1" value={vectorAdd.east} on:input={e=>vectorAdd={...vectorAdd,east:+e.currentTarget.value}}/><b>{vectorAdd.east}</b></label><label>WEST <input aria-label="West magnitude" type="range" min="1" max="6" step="1" value={vectorAdd.west} on:input={e=>vectorAdd={...vectorAdd,west:+e.currentTarget.value}}/><b>{vectorAdd.west}</b></label></div>
                      <p class="vector-result">resultant: {Math.abs(net)}{net===0?'':` units ${net>0?'east':'west'}`}</p>
                    {:else}
                      {@const eastFirst = interaction.kind==='vector-head-tail' || interaction.kind==='vector-resultant' || vectorAdd.order==='east-first'}
                      {@const middle = eastFirst ? eastEnd : northEnd}
                      <svg class="vector-add-stage" viewBox="0 0 300 220" role="img" aria-label={`${vectorAdd.east} units east plus ${vectorAdd.north} units north; resultant ${resultantMagnitude(vectorAdd.east,vectorAdd.north)} units`}>
                        <path class="vector-grid" d="M25 180H275M55 20V205"/>
                        {#if eastFirst}<line class="vector-line" x1={start.x} y1={start.y} x2={middle.x} y2={middle.y}/><circle class="vector-tip" cx={middle.x} cy={middle.y} r="7"/><line class="vector-line second" x1={middle.x} y1={middle.y} x2={finalEnd.x} y2={finalEnd.y}/>{:else}<line class="vector-line second" x1={start.x} y1={start.y} x2={middle.x} y2={middle.y}/><circle class="vector-tip second" cx={middle.x} cy={middle.y} r="7"/><line class="vector-line" x1={middle.x} y1={middle.y} x2={finalEnd.x} y2={finalEnd.y}/>{/if}<circle class="vector-tip second" cx={finalEnd.x} cy={finalEnd.y} r="7"/>
                        {#if interaction.kind==='vector-resultant' || interaction.kind==='vector-route-order'}<line class="resultant-line" x1={start.x} y1={start.y} x2={finalEnd.x} y2={finalEnd.y}/><circle class="resultant-tip" cx={finalEnd.x} cy={finalEnd.y} r="6"/>{/if}
                        <text x="165" y="211">east</text><text x="25" y="95">north</text>
                      </svg>
                      <div class="vector-controls"><label>EAST <input aria-label="East magnitude" type="range" min="1" max="6" step="1" value={vectorAdd.east} on:input={e=>vectorAdd={...vectorAdd,east:+e.currentTarget.value}}/><b>{vectorAdd.east}</b></label><label>NORTH <input aria-label="North magnitude" type="range" min="1" max="5" step="1" value={vectorAdd.north} on:input={e=>vectorAdd={...vectorAdd,north:+e.currentTarget.value}}/><b>{vectorAdd.north}</b></label></div>
                      {#if interaction.kind==='vector-route-order'}<div class="vector-picks"><button class:on={vectorAdd.order==='east-first'} on:click={()=>vectorAdd={...vectorAdd,order:'east-first'}}>EAST THEN NORTH</button><button class:on={vectorAdd.order==='north-first'} on:click={()=>vectorAdd={...vectorAdd,order:'north-first'}}>NORTH THEN EAST</button></div><p class="vector-result">same finish · same resultant</p>{:else if interaction.kind==='vector-resultant'}<p class="vector-result">resultant: {resultantMagnitude(vectorAdd.east,vectorAdd.north)} units</p>{:else}<p class="vector-result">head A meets tail B</p>{/if}
                    {/if}
                  </div>

                {:else if interaction.kind === 'motion-rate' || interaction.kind === 'motion-race' || interaction.kind === 'velocity-direction' || interaction.kind === 'velocity-twins' || interaction.kind === 'motion-round-trip' || interaction.kind === 'motion-trip-builder'}
                  {@const speedNow = movementSpeed(movement)}
                  {@const travelled = tripDistance(movement.steps)}
                  {@const displaced = tripDisplacement(movement.steps)}
                  <div class="rows centre motion-experiment">
                    {#if interaction.kind === 'motion-rate'}
                      <div class="motion-track" style={`--motion:${Math.min(96, movement.distance)}%;--motion-duration:${Math.max(.6, Math.min(2.4, movement.time * .12))}s`}><span class="motion-distance"></span>{#key movement.rateRun}<i class:running={movement.rateRun > 0}></i>{/key}<b>{movement.distance} m</b></div>
                      <div class="motion-sliders">
                        <label><span>DISTANCE</span><input type="range" min="10" max="100" step="10" value={movement.distance} on:input={e => (movement = { ...movement, distance: +e.currentTarget.value })}/><b>{movement.distance} m</b></label>
                        <label><span>TIME</span><input type="range" min="2" max="20" step="1" value={movement.time} on:input={e => (movement = { ...movement, time: +e.currentTarget.value })}/><b>{movement.time} s</b></label>
                      </div>
                      <div class="motion-equation"><span>{movement.distance} m</span><i>÷</i><span>{movement.time} s</span><i>=</i><b>{speedNow} m/s</b></div>
                      <button class="motion-action" on:click={() => (movement = { ...movement, rateRun: movement.rateRun + 1 })}>WATCH THE JOURNEY</button>
                    {:else if interaction.kind === 'motion-race'}
                      <div class="motion-race" style={`--race-duration:${Math.max(.7, Math.min(2.2, movement.raceTime * .22))}s`}>{#each [2, 4, 6] as speed}<div><span>{speed} m/s</span><i>{#key movement.raceRun}<b class:running={movement.raceRun > 0} style={`--race:${speed / 6 * 92}%`}></b>{/key}</i><em>{speed * movement.raceTime} m</em></div>{/each}</div>
                      <div class="motion-picks"><span>SAME TIME</span>{#each [3, 5, 8] as seconds}<button class:on={movement.raceTime === seconds} on:click={() => (movement = { ...movement, raceTime: seconds })}>{seconds} s</button>{/each}</div>
                      <button class="motion-action" on:click={() => (movement = { ...movement, raceRun: movement.raceRun + 1 })}>START ALL THREE TOGETHER</button>
                    {:else if interaction.kind === 'velocity-direction'}
                      {#key movement.directionRun}<div class="velocity-stage" class:running={movement.directionRun > 0} class:left={movement.direction < 0}><div class="velocity-arrow">{movement.direction > 0 ? '→' : '←'}</div><div class="velocity-block">4 m/s</div></div>{/key}
                      <div class="motion-picks"><button class:on={movement.direction < 0} on:click={() => (movement = { ...movement, direction: -1 })}>LEFT</button><button class:on={movement.direction > 0} on:click={() => (movement = { ...movement, direction: 1 })}>RIGHT</button></div>
                      <button class="motion-action" on:click={() => (movement = { ...movement, directionRun: movement.directionRun + 1 })}>MOVE AT 4 m/s</button>
                      <div class="motion-readouts"><span><small>SPEED</small><b>4 m/s</b></span><span><small>VELOCITY</small><b>4 m/s {movement.direction > 0 ? 'right' : 'left'}</b></span></div>
                    {:else if interaction.kind === 'velocity-twins'}
                      <div class="velocity-twins">{#each [-1, 1] as direction}<div><i>{direction < 0 ? '←' : '→'}</i><b>5 m/s</b><span>velocity {direction < 0 ? 'left' : 'right'}</span>{#key movement.twinsRun}<em class:running={movement.twinsRun > 0} class:left={direction < 0}></em>{/key}</div>{/each}</div>
                      <button class="motion-action" on:click={() => (movement = { ...movement, twinsRun: movement.twinsRun + 1 })}>MOVE TOGETHER</button>
                      <p class="motion-note">Equal speed · opposite velocity</p>
                    {:else if interaction.kind === 'motion-round-trip'}
                      <div class="round-track"><span>START</span><i class:running={movement.roundRunning}></i><b>20 m OUT + 20 m BACK</b></div>
                      <button class="motion-action" disabled={movement.roundRunning} on:click={() => movement.roundDone ? (movement = { ...movement, roundDone: false }) : runRoundTrip()}>{movement.roundRunning ? 'TRAVELLING…' : movement.roundDone ? 'RESET TRIP' : 'RUN THE ROUND TRIP'}</button>
                      <div class="motion-readouts"><span><small>DISTANCE</small><b>{movement.roundDone ? 40 : 0} m</b></span><span><small>DISPLACEMENT</small><b>0 m</b></span><span><small>AVERAGE VELOCITY</small><b>0 m/s</b></span></div>
                    {:else}
                      <div class="trip-line"><i></i><b style={`--position:${Math.max(0, Math.min(100, 50 + displaced))}%`}></b><span>start</span></div>
                      <div class="motion-picks"><button on:click={() => addTripStep(-1)}>← 10 m · 1 s</button><button on:click={() => addTripStep(1)}>10 m · 1 s →</button><button on:click={() => (movement = { ...movement, steps: [] })}>RESET</button></div>
                      <div class="motion-readouts four"><span><small>DISTANCE</small><b>{travelled} m</b></span><span><small>DISPLACEMENT</small><b>{displaced} m</b></span><span><small>AVG SPEED</small><b>{movement.steps.length ? 10 : 0} m/s</b></span><span><small>AVG VELOCITY</small><b>{movement.steps.length ? Number((displaced / movement.steps.length).toFixed(1)) : 0} m/s</b></span></div>
                    {/if}
                  </div>

                {:else if interaction.kind === 'triangle-shape' || interaction.kind === 'triangle-presets' || interaction.kind === 'triangle-corners' || interaction.kind === 'triangle-sum-strip' || interaction.kind === 'triangle-corners-sum' || interaction.kind === 'triangle-missing' || interaction.kind === 'triangle-target'}
                  {@const shapeM = triangleMeasures(triangle.shape.x, triangle.shape.h)}
                  <div class="rows centre triangle-experiment">
                    {#if interaction.kind === 'triangle-shape' || interaction.kind === 'triangle-presets'}
                      <svg class="triangle-svg" viewBox="0 0 280 155" role="img" aria-label={`Triangle with interior angles ${shapeM.a}, ${shapeM.b} and ${shapeM.c} degrees`}>
                        <path class="triangle-face" d={`M50 126L230 126L${triangle.shape.x} ${126 - triangle.shape.h}Z`}/>
                        {#if shapeM.a === 90}<path class="triangle-right" d="M50 108H68V126"/>{/if}
                        <circle class="triangle-corner a" cx="50" cy="126" r="5"/><circle class="triangle-corner b" cx="230" cy="126" r="5"/><circle class="triangle-corner c" cx={triangle.shape.x} cy={126 - triangle.shape.h} r="5"/>
                        <text x="71" y="118">A {shapeM.a}°</text><text x="208" y="118">B {shapeM.b}°</text><text x={triangle.shape.x} y={Math.max(18, 116 - triangle.shape.h)}>C {shapeM.c}°</text>
                      </svg>
                      {#if interaction.kind === 'triangle-shape'}
                        <div class="triangle-sliders">
                          <label><span>lean</span><input type="range" min="50" max="210" step="2" value={triangle.shape.x} on:input={e => setTriangleShape({ x: +e.currentTarget.value })} aria-label="Move the top vertex sideways"/></label>
                          <label><span>height</span><input type="range" min="45" max="108" step="1" value={triangle.shape.h} on:input={e => setTriangleShape({ h: +e.currentTarget.value })} aria-label="Move the top vertex up or down"/></label>
                        </div>
                      {:else}
                        <div class="triangle-controls">{#each TRI_PRESETS as preset}<button class:on={triangle.shape.x === preset.x && triangle.shape.h === preset.h} on:click={() => setTrianglePreset(preset)}>{preset.name}</button>{/each}</div>
                      {/if}
                      <div class="triangle-total"><span>{shapeM.a}°</span><i>+</i><span>{shapeM.b}°</span><i>+</i><span>{shapeM.c}°</span><i>=</i><b>180°</b></div>

                    {:else if interaction.kind === 'triangle-corners' || interaction.kind === 'triangle-sum-strip' || interaction.kind === 'triangle-corners-sum'}
                      {@const lined = interaction.kind === 'triangle-corners-sum' ? triangle.torn.combined : triangle.torn.simple}
                      {#if (interaction.kind === 'triangle-corners' || interaction.kind === 'triangle-corners-sum') && !lined}
                        <svg class="triangle-svg" viewBox="0 0 280 155" role="img" aria-label={`Assembled triangle with angles ${shapeM.a}, ${shapeM.b} and ${shapeM.c} degrees`}>
                          <path class="triangle-face" d={`M50 126L230 126L${triangle.shape.x} ${126 - triangle.shape.h}Z`}/>
                          <circle class="triangle-corner a" cx="50" cy="126" r="8"/><circle class="triangle-corner b" cx="230" cy="126" r="8"/><circle class="triangle-corner c" cx={triangle.shape.x} cy={126 - triangle.shape.h} r="8"/>
                          <text x="72" y="117">A</text><text x="208" y="117">B</text><text x={triangle.shape.x} y={Math.max(18, 113 - triangle.shape.h)}>C</text>
                        </svg>
                      {:else}
                        <div class="triangle-lineup" role="img" aria-label={`A straight angle partitioned into ${shapeM.a}, ${shapeM.b} and ${shapeM.c} degrees`}>
                          <div class="triangle-sum-bar"><span class="a" style={`--part:${shapeM.a}`}><b>A</b><em>{shapeM.a}°</em></span><span class="b" style={`--part:${shapeM.b}`}><b>B</b><em>{shapeM.b}°</em></span><span class="c" style={`--part:${shapeM.c}`}><b>C</b><em>{shapeM.c}°</em></span></div>
                          <div class="triangle-straight"><i></i><b>180° · one straight angle</b><i></i></div>
                        </div>
                      {/if}
                      {#if interaction.kind === 'triangle-corners'}
                        <button class="triangle-action" on:click={() => toggleCorners(interaction.kind)}>{lined ? 'PUT CORNERS BACK' : 'LINE UP THE THREE CORNERS'}</button>
                      {:else if interaction.kind === 'triangle-corners-sum'}
                        <button class="triangle-action" on:click={() => toggleCorners(interaction.kind)}>{lined ? 'PUT CORNERS BACK' : 'LINE UP THE THREE CORNERS'}</button>
                        {#if lined}
                          <div class="triangle-controls">{#each TRI_PRESETS as preset}<button class:on={triangle.shape.x === preset.x && triangle.shape.h === preset.h} on:click={() => setTrianglePreset(preset)}>{preset.name}</button>{/each}</div>
                          <p class="triangle-proof">Now change the triangle. A, B and C redistribute, but the straight angle remains complete.</p>
                        {/if}
                      {:else}
                        <div class="triangle-controls">{#each TRI_PRESETS as preset}<button class:on={triangle.shape.x === preset.x && triangle.shape.h === preset.h} on:click={() => setTrianglePreset(preset)}>{preset.name}</button>{/each}</div>
                        <p class="triangle-proof">The parts change width. The bar never gains a gap or exceeds 180°.</p>
                      {/if}

                    {:else if interaction.kind === 'triangle-missing' || interaction.kind === 'triangle-target'}
                      {@const known = interaction.kind === 'triangle-missing' ? triangle.missing : triangle.target}
                      {@const missingC = 180 - known.a - known.b}
                      {@const knownShape = triangleFromAngles(known.a, known.b)}
                      {@const showC = interaction.kind === 'triangle-target' || known.revealed}
                      <svg class="triangle-svg missing" viewBox="0 0 280 155" role="img" aria-label={`Triangle with angles ${known.a}, ${known.b} and ${showC ? missingC : 'unknown'} degrees`}>
                        <path class="triangle-face" d={`M50 126L230 126L${knownShape.x} ${126 - knownShape.h}Z`}/>
                        {#if known.a === 90}<path class="triangle-right" d="M50 108H68V126"/>{/if}
                        {#if known.b === 90}<path class="triangle-right" d="M230 108H212V126"/>{/if}
                        <text x="72" y="118">A {known.a}°</text><text x="207" y="118">B {known.b}°</text><text class:unknown={!showC} x={knownShape.x} y={Math.max(18, 115 - knownShape.h)}>C {showC ? `${missingC}°` : '?'}</text>
                      </svg>
                      <div class="triangle-known-controls">
                        {#each ['a', 'b'] as which}<span><small>ANGLE {which.toUpperCase()}</small><button aria-label={`Decrease angle ${which.toUpperCase()}`} on:click={() => changeKnown(interaction.kind === 'triangle-missing' ? 'missing' : 'target', which, -5)}>−</button><b>{known[which]}°</b><button aria-label={`Increase angle ${which.toUpperCase()}`} on:click={() => changeKnown(interaction.kind === 'triangle-missing' ? 'missing' : 'target', which, 5)}>+</button></span>{/each}
                      </div>
                      {#if interaction.kind === 'triangle-missing'}
                        <button class="triangle-action" on:click={() => (triangle = { ...triangle, missing: { ...triangle.missing, revealed: !triangle.missing.revealed } })}>{triangle.missing.revealed ? 'HIDE THE REMAINDER' : 'REVEAL THE REMAINDER'}</button>
                        {#if triangle.missing.revealed}<div class="triangle-total"><b>180°</b><i>−</i><span>{known.a}°</span><i>−</i><span>{known.b}°</span><i>=</i><b>{missingC}°</b></div>{/if}
                      {:else}
                        <div class="triangle-targets"><span>TARGET C</span>{#each [40, 60, 70, 90] as goal}<button class:on={known.goal === goal} on:click={() => (triangle = { ...triangle, target: { ...triangle.target, goal } })}>{goal}°</button>{/each}</div>
                        <p class="triangle-proof" class:hit={missingC === known.goal}>{missingC === known.goal ? `Target reached: C is ${known.goal}°.` : `Adjust A and B until C is ${known.goal}°.`}</p>
                      {/if}
                    {/if}
                  </div>

                {:else if interaction.kind === 'angle-turn' || interaction.kind === 'angle-benchmarks' || interaction.kind === 'angle-length' || interaction.kind === 'angle-right-compare' || interaction.kind === 'angle-sort' || interaction.kind === 'angle-length-compare'}
                  {@const sortDegrees = ANGLE_SORT[angle.sortIndex]}
                  {@const shownDegrees = interaction.kind === 'angle-sort' ? sortDegrees : sectionAngle(interaction.kind)}
                  {@const endpoint = anglePoint(shownDegrees, interaction.kind === 'angle-length' ? angle.arm : 104)}
                  <div class="rows centre angle-experiment">
                    {#if interaction.kind === 'angle-length-compare'}
                      <div class="angle-pair">
                        <div><svg viewBox="0 0 180 145" role="img" aria-label="Long armed 50 degree angle"><path class="angle-ray" d="M20 120H165"/><path class="angle-ray moving" d={`M20 120L${20 + Math.cos(50 * Math.PI / 180) * 135} ${120 - Math.sin(50 * Math.PI / 180) * 135}`}/><text x="25" y="110">50°</text></svg><b>long arms · 50°</b></div>
                        <div><svg viewBox="0 0 180 145" role="img" aria-label="Short armed 100 degree angle"><path class="angle-ray" d="M80 120H145"/><path class="angle-ray moving" d={`M80 120L${80 + Math.cos(100 * Math.PI / 180) * 62} ${120 - Math.sin(100 * Math.PI / 180) * 62}`}/><text x="84" y="110">100°</text></svg><b>short arms · 100°</b></div>
                      </div>
                      <button class="angle-reveal" on:click={() => (angle = { ...angle, revealed: !angle.revealed })}>{angle.revealed ? 'HIDE COMPARISON' : 'WHICH IS LARGER?'}</button>
                      {#if angle.revealed}<p class="angle-result hit">100° is larger. Its arms are shorter, but its turn is twice as great.</p>{/if}
                    {:else}
                      <svg class="angle-svg" viewBox="0 0 280 155" role="img" aria-label={`${shownDegrees} degree ${angleName(shownDegrees)} angle`}>
                        {#if interaction.kind === 'angle-right-compare'}
                          <path class="angle-reference" d="M140 126H230M140 126V36"/>
                          <path class="right-box" d="M162 126V104H140"/>
                        {/if}
                        <path class="angle-ray" d={`M140 126H${140 + (interaction.kind === 'angle-length' ? angle.arm : 104)}`}/>
                        <path class="angle-ray moving" d={`M140 126L${endpoint.x} ${endpoint.y}`}/>
                        {#if shownDegrees === 90}
                          {#if interaction.kind !== 'angle-right-compare'}<path class="right-box current" d="M162 126V104H140"/>{/if}
                        {:else}
                          <path class="angle-arc" d={angleArc(shownDegrees)}/>
                        {/if}
                        <circle class="angle-vertex" cx="140" cy="126" r="4"/>
                        <text class="angle-degree" x="140" y="21">{shownDegrees}°</text>
                      </svg>

                      {#if interaction.kind === 'angle-turn' || interaction.kind === 'angle-right-compare'}
                        <div class="angle-controls"><button aria-label="Decrease angle by 15 degrees" on:click={() => stepAngle(interaction.kind, -15)}>−15°</button><b>{shownDegrees}°</b><button aria-label="Increase angle by 15 degrees" on:click={() => stepAngle(interaction.kind, 15)}>+15°</button></div>
                        <p class="angle-result">{angleName(shownDegrees)}</p>
                      {:else if interaction.kind === 'angle-benchmarks'}
                        <div class="angle-controls benchmarks">{#each ANGLE_BENCHMARKS as degrees}<button class:on={angle.s1 === degrees} on:click={() => setAngle(interaction.kind, degrees)}>{degrees}°</button>{/each}</div>
                      {:else if interaction.kind === 'angle-length'}
                        <label class="angle-length-control"><span>arm length</span><input type="range" min="55" max="112" step="1" bind:value={angle.arm} aria-label="Change both arm lengths"/><b>60° stays fixed</b></label>
                      {:else if interaction.kind === 'angle-sort'}
                        <div class="angle-controls benchmarks">{#each ['acute', 'right', 'obtuse'] as name}<button class:on={angle.guess === name} on:click={() => guessAngle(name)}>{name}</button>{/each}</div>
                        {#if angle.revealed}<p class="angle-result" class:hit={angle.guess === angleName(sortDegrees)}>{angle.guess === angleName(sortDegrees) ? 'Correct' : `Not yet — ${sortDegrees}° is ${angleName(sortDegrees)}.`}</p>{/if}
                        <button class="angle-reveal" on:click={nextSort}>NEXT ANGLE</button>
                      {/if}
                    {/if}
                  </div>

                {:else if interaction.kind === 'mass-race'}
                  {@const p = physicsState(interaction.kind, physics)}
                  <div class="rows centre force-experiment mass-race-experiment">
                    <div class="force-target-card">
                      <small>CONSTANT FORCE</small><b>6 N</b><em>same one-second push</em>
                    </div>
                    <div class="mass-race-track">
                      {#each MASS_VALUES as mass}
                        {@const acceleration = forceAcceleration(MASS_FORCE, mass)}
                        {@const distance = forceDistance(MASS_FORCE, mass)}
                        <div class="mass-race-lane" role="img" aria-label={`${mass} kilogram block accelerating at ${acceleration} metres per second squared under a 6 newton force`}>
                          <span class="mass-race-label">{mass} kg</span>
                          <div class="mass-race-line"><i class="mass-race-arrow">6 N →</i></div>
                          <div class:moved={p.running || p.result} class="mass-race-block" style={`--race-travel:${distance * 34}%;--mass-width:${38 + mass * 4}px`}><b>{mass} kg</b></div>
                          <span class="mass-race-acceleration">{acceleration} m/s²</span>
                        </div>
                      {/each}
                    </div>
                    <button class="force-push-button" disabled={p.running} on:click={() => runForce(interaction.kind)}>{p.running ? 'APPLYING 6 N FOR 1 SECOND…' : 'APPLY 6 N TO ALL THREE'}</button>
                    {#if p.result}
                      <p class="force-result hit">Same force, different result: the 2 kg block accelerates most and travels farthest.</p>
                    {/if}
                    <p class="stage-note">Each block receives the same 6 N force for exactly one second. Only the mass changes. Friction is off.</p>
                  </div>

                {:else if interaction.kind === 'force-push' || interaction.kind === 'force-vector' || interaction.kind === 'force-compare' || interaction.kind === 'force-bars' || interaction.kind === 'mass-push'}
                  {@const p = physicsState(interaction.kind, physics)}
                  {@const isMassExperiment = interaction.kind === 'mass-push'}
                  <div class="rows centre force-experiment">
                    {#if isMassExperiment}
                      <div class="force-target-card"><small>CONSTANT FORCE</small><b>6 N</b><em>choose the mass</em></div>
                    {/if}
                    <div class="force-track" role="img" aria-label={`A stick figure applying ${p.force} newtons to a ${p.mass} kilogram block`} style={`--travel:${p.travel * 36}%`}>
                      <div class="force-ground"></div>
                      <div class:push-pose={p.running} class="force-person" aria-hidden="true">
                        <i class="force-head"></i><i class="force-body"></i><i class="force-arm"></i><i class="force-leg one"></i><i class="force-leg two"></i>
                      </div>
                      <div class="force-arrow" class:strong={interaction.kind === 'force-vector'} style={`--arrow:${34 + p.force * 7}px`}><span>F = {p.force} N</span></div>
                      <div class:running={p.running} class="force-block"><b>{p.mass} kg</b></div>
                      <div class="force-start">START</div>
                    </div>
                    {#if isMassExperiment}
                      <div class="force-picks" aria-label="Choose the block mass">
                        {#each MASS_VALUES as mass}
                          <button class:on={p.mass === mass} disabled={p.running} on:click={() => chooseMass(interaction.kind, mass)}>{mass} kg</button>
                        {/each}
                      </div>
                    {:else}
                      <div class="force-picks" aria-label="Choose the applied force">
                        {#each FORCE_VALUES as force}
                          <button class:on={p.force === force} disabled={p.running} on:click={() => chooseForce(interaction.kind, force)}>{force} N</button>
                        {/each}
                      </div>
                    {/if}
                    <button class="force-push-button" disabled={p.running} on:click={() => runForce(interaction.kind)}>{p.running ? 'PUSHING FOR 1 SECOND…' : 'PUSH FOR 1 SECOND'}</button>
                    <div class="force-readouts">
                      <span><small>FORCE</small><b>{p.force} N</b></span>
                      <span><small>MASS</small><b>{p.mass} kg</b></span>
                      <span><small>ACCELERATION</small><b>{forceAcceleration(p.force, p.mass)} m/s²</b></span>
                    </div>
                    {#if interaction.kind === 'force-bars'}
                      <div class="force-proportion">
                        <span><small>force</small><i style={`width:${p.force * 13}%`}></i><b>{p.force} N</b></span>
                        <span><small>acceleration</small><i style={`width:${forceAcceleration(p.force) * 26}%`}></i><b>{forceAcceleration(p.force)} m/s²</b></span>
                      </div>
                    {/if}
                    {#if p.result}
                      <p class="force-result">
                        {isMassExperiment ? `The same ${p.result.force} N force accelerated the ${p.result.mass} kg block at ${p.result.acceleration} m/s², covering ${p.result.distance} m during the push.` : `${p.result.force} N produced ${p.result.acceleration} m/s² and ${p.result.distance} m of travel during the push.`}
                      </p>
                    {/if}
                    {#if (interaction.kind === 'force-compare' || interaction.kind === 'force-bars' || interaction.kind === 'mass-push') && p.trials.length}
                      <div class="force-trials">
                        {#each p.trials as trial}
                          <span><b>{isMassExperiment ? `${trial.mass} kg` : `${trial.force} N`}</b><i>{trial.acceleration} m/s²</i><small>{trial.distance} m</small></span>
                        {/each}
                      </div>
                    {/if}
                    <p class="stage-note">{isMassExperiment ? 'The force is 6 N. Every push lasts exactly one second. Only the mass changes. Friction is off.' : 'The mass is 2 kg. Every force acts for exactly one second. Friction is off.'}</p>
                  </div>

                {:else if interaction.kind === 'rise-run-line' || interaction.kind === 'rise-run-ghost' || interaction.kind === 'slope-ratio' || interaction.kind === 'slope-triangles' || interaction.kind === 'slope-sign' || interaction.kind === 'slope-target'}
                  {@const slope = slopeValue(line)}
                  {@const pts = { x0: 54, y0: 124, x1: 54 + line.run * 38, y1: 124 - line.rise * 22 }}
                  <div class="rows centre">
                    {#if interaction.kind === 'slope-target'}
                      <div class="slope-target">TARGET SLOPE <b>{line.target}</b></div>
                    {/if}
                    <svg class="slope-svg" viewBox="0 0 300 170" role="img" aria-label={`Line with run ${line.run}, rise ${line.rise}, slope ${slope}`}>
                      <path class="plot-axis" d="M20 146H282M36 12V158"/>
                      {#each [0, 1, 2, 3, 4, 5, 6] as n}<line class="plot-grid" x1={36 + n * 38} y1="14" x2={36 + n * 38} y2="154"/>{/each}
                      {#each [24, 46, 68, 90, 112, 134] as y}<line class="plot-grid" x1="24" y1={y} x2="280" y2={y}/>{/each}
                      {#if interaction.kind === 'rise-run-ghost'}
                        <line class="slope-ghost" x1={pts.x0} y1={pts.y0} x2={pts.x1} y2={pts.y0 - line.previousRise * 22}/>
                      {/if}
                      <line class="slope-line" x1={pts.x0} y1={pts.y0} x2={pts.x1} y2={pts.y1}/>
                      <line class="slope-run" x1={pts.x0} y1={pts.y0} x2={pts.x1} y2={pts.y0}/>
                      <line class="slope-rise" x1={pts.x1} y1={pts.y0} x2={pts.x1} y2={pts.y1}/>
                      {#if interaction.kind === 'slope-triangles'}
                        <path class="slope-small" d={`M${pts.x0} ${pts.y0} H${pts.x0 + (pts.x1-pts.x0)/2} V${pts.y0 - line.rise * 11}`}/>
                      {/if}
                      <circle class="plot-dot" cx={pts.x0} cy={pts.y0} r="5"/><circle class="plot-dot" cx={pts.x1} cy={pts.y1} r="5"/>
                    </svg>
                    <div class="slope-controls">
                      <span><small>RUN Δx</small><button aria-label="Decrease run" on:click={() => changeLine('run', -1)}>−</button><b>{line.run}</b><button aria-label="Increase run" on:click={() => changeLine('run', 1)}>+</button></span>
                      <span><small>RISE Δy</small><button aria-label="Decrease rise" on:click={() => changeLine('rise', -1)}>−</button><b>{line.rise}</b><button aria-label="Increase rise" on:click={() => changeLine('rise', 1)}>+</button></span>
                    </div>
                    <div class="slope-read"><span>{line.rise}</span><i>÷</i><span>{line.run}</span><i>=</i><b class:hit={interaction.kind === 'slope-target' && slope === line.target}>{slope === null ? 'undefined' : Number(slope.toFixed(2))}</b></div>
                    {#if interaction.kind === 'slope-sign'}<p class="stage-note">{line.rise > 0 ? 'Rises left to right · positive' : line.rise < 0 ? 'Falls left to right · negative' : 'Level · zero'}</p>{/if}
                  </div>
                {/if}

                <!-- Only the kinds that actually read the section value get a
                     control. The harness used to add one to every preview,
                     which put a dead slider under the grids. -->
                {#if !NO_CONTROL.includes(interaction.kind)}
                  <label class="range-row">
                    <span>1.5</span>
                    <input type="range" min="1.5" max="3.5" step="0.1" bind:value={values[si]} aria-label={`Assign x for ${interaction.code}`}/>
                    <span>3.5</span>
                  </label>
                {/if}
              </div>
              {#if !keptOnly}
                <p class="note">{interaction.note}</p>
                {#if finalised[interaction.code]}<p class="why">{finalised[interaction.code]}</p>{/if}
              {/if}
            </article>
          {/each}
        </div>

        <h3>{bb1.world ? `Practical ${si + 1} · Independent check` : (keptOnly ? 'Checks' : 'Exercise')} {#if !keptOnly}<em>— {bb1.world ? 'prove the skill without guidance' : 'clickable, answers reveal'}</em>{/if}</h3>
        <div class="variant-grid">
          {#each (keptOnly ? section.exercises.filter(e => selections[e.code] || finalised[e.code]) : section.exercises) as ex}
            <article class="variant" class:selected={selections[ex.code] && !keptOnly} class:finalised={finalised[ex.code]}>
              <span class="code">{ex.code}{#if selections[ex.code] && !keptOnly} · SELECTED{:else if finalised[ex.code]} · FINALISED{/if}</span>
              <p class="prompt">{ex.prompt}</p>
              {#if ex.kind === 'choice'}
                <div class="options">
                  {#each ex.options as option}
                    <button
                      class:correct={picked[ex.code] && option.correct}
                      class:wrong={picked[ex.code] === option.label && !option.correct}
                      on:click={() => choose(ex.code, option)}>
                      {option.label}
                    </button>
                  {/each}
                </div>
                {#if picked[ex.code]}
                  {#each ex.options.filter(o => o.label === picked[ex.code] && o.feedback) as o}
                    <p class="fb">{o.feedback}</p>
                  {/each}
                {/if}
              {:else if ex.kind === 'find-target'}
                <div class="plane" style={`--cols:${PX + 1}`}>
                  {#each Array(PY + 1) as _, r}
                    {#each Array(PX + 1) as _, c}
                      <button class="pcell"
                        class:axis={c === 0 || PY - r === 0}
                        class:here={pt.x === c && pt.y === PY - r}
                        on:click={() => (pt = { x: c, y: PY - r })}
                        aria-label={`Place at ${c}, ${PY - r}`}></button>
                    {/each}
                  {/each}
                </div>
                <p class="kind-note">
                  you placed ( {pt.x} , {pt.y} ) ·
                  <b class:hit={pt.x === ex.tx && pt.y === ex.ty}>{pt.x === ex.tx && pt.y === ex.ty ? 'that is it' : 'not yet'}</b>
                </p>

              {:else if ex.kind === 'set-grid'}
                <div class="grid-wrap small"
                  on:pointerdown={() => (gridDrag = true)}
                  on:pointerup={() => (gridDrag = false)}
                  on:pointerleave={() => (gridDrag = false)}>
                  {#each Array(GRID_H) as _, r}
                    <div class="grid-row">
                      {#each Array(GRID_W) as _, c}
                        <button class="cell"
                          class:on={c < exGrid.b && (GRID_H - 1 - r) < exGrid.a}
                          on:pointerdown={() => (exGrid = { b: c + 1, a: GRID_H - r })}
                          on:pointerenter={() => gridDrag && (exGrid = { b: c + 1, a: GRID_H - r })}
                          aria-label={`Set ${c + 1} by ${GRID_H - r}`}></button>
                      {/each}
                    </div>
                  {/each}
                </div>
                <p class="kind-note">
                  {exGrid.b} × {exGrid.a} = {exGrid.b * exGrid.a} ·
                  <b class:hit={exGridOk(ex, exGrid)}>{exGridOk(ex, exGrid) ? 'that is it' : 'not yet'}</b>
                </p>

              {:else if ex.kind === 'stepper'}
                <div class="stepper">
                  <button aria-label="Decrease" on:click={() => stepBy(ex, -1)}>−</button>
                  <span class="stepper-value">
                    x = {stepValue(ex, stepped).toFixed(ex.step < 1 ? 1 : 0)}{ex.unit ? ' ' + ex.unit : ''}
                    {#if ex.derive === 'square'}
                      <em>y = {(stepValue(ex, stepped) ** 2).toFixed(2)}</em>
                    {:else if ex.derive === 'delta-pair'}
                      <em>Δx = {(stepValue(ex, stepped) - 2).toFixed(2)} · Δy = {(stepValue(ex, stepped) ** 2 - 4).toFixed(2)}</em>
                    {:else if ex.derive === 'interval-rate'}
                      <em>Δx = {[0.001, 0.01, 0.1, 0.5, 1][stepValue(ex, stepped)]} · rate {(4 + [0.001, 0.01, 0.1, 0.5, 1][stepValue(ex, stepped)]).toFixed(3)}</em>
                    {/if}
                  </span>
                  <button aria-label="Increase" on:click={() => stepBy(ex, 1)}>+</button>
                </div>
                <p class="kind-note">Target {ex.target}{ex.unit ? ' ' + ex.unit : ''} ·
                  <b class:hit={stepHit(ex, stepped)}>{stepHit(ex, stepped) ? 'reached' : 'not yet'}</b></p>
                {#if stepHit(ex, stepped) && ex.successNote}<p class="ok">{ex.successNote}</p>{/if}

              {:else if ex.kind === 'match'}
                <div class="tray">
                  {#each ex.items as item}
                    {#if !(placed[ex.code] || {})[item.label]}
                      <button class="chip pick" class:up={held[ex.code] === item.label}
                        on:click={() => takeItem(ex.code, item.label)}>{item.label}</button>
                    {/if}
                  {/each}
                  {#if !ex.items.some(i => !(placed[ex.code] || {})[i.label])}
                    <span class="tray-empty">tray empty</span>
                  {/if}
                </div>
                <div class="bins">
                  {#each ex.bins as bin}
                    <button class="bin" class:armed={held[ex.code]} on:click={() => placeItem(ex.code, bin)}>
                      <small>{bin}</small>
                      <span class="bin-items">
                        {#each ex.items.filter(i => (placed[ex.code] || {})[i.label] === bin) as i}
                          <em class:wrong={i.bin !== bin}>{i.label}</em>
                        {/each}
                      </span>
                    </button>
                  {/each}
                </div>
                <p class="kind-note">Tap a symbol, then tap a box ·
                  <b class:hit={matchDone(ex, placed)}>{matchDone(ex, placed) ? 'all correct' : 'in progress'}</b></p>
                {#if matchDone(ex, placed) && ex.successNote}<p class="ok">{ex.successNote}</p>{/if}

              {:else if ex.kind === 'order'}
                <div class="order-list">
                  {#each orderList(ex, ordered) as idx, pos}
                    <div class="order-row">
                      <span>{ex.items[idx]}</span>
                      <span class="order-btns">
                        <button aria-label="Move up" disabled={pos === 0} on:click={() => moveItem(ex, pos, -1)}>↑</button>
                        <button aria-label="Move down" disabled={pos === orderList(ex, ordered).length - 1} on:click={() => moveItem(ex, pos, 1)}>↓</button>
                      </span>
                    </div>
                  {/each}
                </div>
                <p class="kind-note">Reorder with the arrows ·
                  <b class:hit={orderDone(ex, ordered)}>{orderDone(ex, ordered) ? 'correct order' : 'not yet'}</b></p>
                {#if orderDone(ex, ordered) && ex.successNote}<p class="ok">{ex.successNote}</p>{/if}

              {:else}
                <p class="kind-note">
                  Slider task · target x = {ex.target}. Answered with the section's own control,
                  currently at {fmt(values[si])}.
                  <b class:hit={Math.abs(values[si] - ex.target) <= (ex.tolerance ?? 0.05)}>
                    {Math.abs(values[si] - ex.target) <= (ex.tolerance ?? 0.05) ? 'satisfied' : 'not yet'}
                  </b>
                </p>
              {/if}
            </article>
          {/each}
        </div>
      </section>
    {/each}

    {#if bb1.workshops}
      <section class="section-block">
        <div class="section-head">
          <span class="section-code">W</span>
          <h2>Workshops <em>— larger than a check: several objects, a few goals</em></h2>
        </div>
        <div class="variant-grid">
          {#each (keptOnly ? bb1.workshops.filter(w => selections[w.code] || finalised[w.code]) : bb1.workshops) as w}
            <article class="variant" class:selected={selections[w.code] && !keptOnly} class:finalised={finalised[w.code]} class:rejected={rejected[w.code]}>
              <span class="code">{w.code}{#if selections[w.code] && !keptOnly} · SELECTED{:else if finalised[w.code]} · FINALISED{:else if rejected[w.code]} · REJECTED{/if}</span>
              <p class="prompt">{w.name}</p>
              <p class="reading-text">{w.blurb}</p>
              {#if keptOnly}<span class="spacer"></span>{/if}

              <div class="stage">
                {#if w.kind === 'assignment-bench'}
                  <div class="rows">
                    <div class="tray">
                      {#each w.values as v}
                        <button class="chip pick" class:up={bench.held === v} on:click={() => benchTake(v)}>{v}</button>
                      {/each}
                    </div>
                    <div class="letters">
                      {#each w.letters as L}
                        <div class="letter-slot" class:armed={bench.held !== null} class:filled={bench.assigned[L] !== undefined}>
                          <button class="slot-hit" on:click={() => benchDrop(L)}>
                            <b>{L}</b>
                            <span>{bench.assigned[L] !== undefined ? '= ' + bench.assigned[L] : 'no value'}</span>
                          </button>
                          {#if bench.assigned[L] !== undefined}
                            <button class="clear" aria-label={`Clear ${L}`} on:click={() => benchClear(L)}>×</button>
                          {/if}
                        </div>
                      {/each}
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'change-bench'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>OLD</small>
                      <button on:click={() => cbStep('oldV', -1)} aria-label="Decrease old">−</button>
                      <b>{cb.oldV.toFixed(1)}</b>
                      <button on:click={() => cbStep('oldV', 1)} aria-label="Increase old">+</button>
                    </div>
                    <div class="bench-row">
                      <small>NEW</small>
                      <button on:click={() => cbStep('newV', -1)} aria-label="Decrease new">−</button>
                      <b>{cb.newV.toFixed(1)}</b>
                      <button on:click={() => cbStep('newV', 1)} aria-label="Increase new">+</button>
                    </div>
                    <div class="equation-strip">
                      <span>Δx</span>
                      <strong>= {cb.newV.toFixed(1)} − {cb.oldV.toFixed(1)}</strong>
                      <b>= {cbDelta(cb).toFixed(1).replace('-', '−')}</b>
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'delta-builder'}
                  <div class="rows centre">
                    <div class="build-line">
                      <span class="glyph-sm">Δ</span>
                      {#if db.letter}
                        <span class="glyph-sm let">{db.letter}</span>
                      {:else}
                        <span class="glyph-sm empty">?</span>
                      {/if}
                    </div>
                    <p class="build-read">
                      {db.letter ? `the change in ${db.letter}` : 'attach a letter'}
                    </p>
                    <div class="tray">
                      {#each w.letters as L}
                        <button class="chip pick" class:up={db.letter === L} on:click={() => db = { letter: db.letter === L ? null : L }}>{L}</button>
                      {/each}
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'square-builder'}
                  <div class="rows centre">
                    <div class="square-figure">
                      <div class="square area" style={`width:${Math.min(150, sb.side * 34)}px;height:${Math.min(150, sb.side * 34)}px`}>
                        <span>{(sb.side ** 2).toFixed(2)}</span>
                      </div>
                      <span class="edge-label sm" style={`width:${Math.min(150, sb.side * 34)}px`}>x = {sb.side.toFixed(1)}</span>
                    </div>
                    <div class="bench-row">
                      <small>SIDE</small>
                      <button on:click={() => sbStep(-1)} aria-label="Decrease side">−</button>
                      <b>{sb.side.toFixed(1)}</b>
                      <button on:click={() => sbStep(1)} aria-label="Increase side">+</button>
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'dependence-tester'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>x</small>
                      <button on:click={() => dtStep(-1)} aria-label="Decrease x">−</button>
                      <b>{dt.x}</b>
                      <button on:click={() => dtStep(1)} aria-label="Increase x">+</button>
                    </div>
                    <div class="bench-row locked">
                      <small>y</small>
                      <button on:click={dtRefuse} aria-label="Try to decrease y">−</button>
                      <b>{dt.x ** 2}</b>
                      <button on:click={dtRefuse} aria-label="Try to increase y">+</button>
                    </div>
                    {#if dt.refused}
                      <p class="refusal">y cannot be set on its own. It is whatever x² comes to, so the only way to move it is to move x.</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'span-explorer'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>FROM a</small>
                      <button on:click={() => spStep('a', -1)} aria-label="Decrease a">−</button>
                      <b>{sp.a.toFixed(1)}</b>
                      <button on:click={() => spStep('a', 1)} aria-label="Increase a">+</button>
                    </div>
                    <div class="bench-row">
                      <small>TO b</small>
                      <button on:click={() => spStep('b', -1)} aria-label="Decrease b">−</button>
                      <b>{sp.b.toFixed(1)}</b>
                      <button on:click={() => spStep('b', 1)} aria-label="Increase b">+</button>
                    </div>
                    <div class="ratio">
                      <div class="frac">
                        <span><small>Δy</small><b>{sp.a === sp.b ? '0' : (sp.b ** 2 - sp.a ** 2).toFixed(2)}</b></span>
                        <i></i>
                        <span><small>Δx</small><b>{(sp.b - sp.a).toFixed(2)}</b></span>
                      </div>
                      <span class="eq">=</span>
                      <div class="ratio-out">
                        <b>{spRate(sp) === null ? 'undefined' : spRate(sp).toFixed(2)}</b>
                        <small>{sp.a === sp.b ? 'both ends are the same point' : 'cm² per cm'}</small>
                      </div>
                    </div>
                    {#if sp.hits.length}
                      <p class="stage-note">Pairs reaching 5 so far: {sp.hits.join(', ')}</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'derivative-dial'}
                  <div class="rows">
                    <div class="bench-row">
                      <small>x</small>
                      <button on:click={() => ddStep(-1)} aria-label="Decrease x">−</button>
                      <b>{dd.x.toFixed(1)}</b>
                      <button on:click={() => ddStep(1)} aria-label="Increase x">+</button>
                    </div>
                    <div class="dial-out">
                      <span><small>AREA x²</small><b>{(dd.x ** 2).toFixed(2)}</b></span>
                      <span><small>RATE 2x</small><b class="accent">{(2 * dd.x).toFixed(2)}</b></span>
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'diagonal-bench'}
                  <div class="rows centre">
                    <div class="plane" style={`--cols:${PX + 1}`}>
                      {#each Array(PY + 1) as _, r}
                        {#each Array(PX + 1) as _, c}
                          <button class="pcell"
                            class:axis={c === 0 || PY - r === 0}
                            class:dot={placed3.includes(`${c},${PY - r}`)}
                            class:here={pt.x === c && pt.y === PY - r}
                            on:click={() => placeDiag(c, PY - r)}
                            aria-label={`Place at ${c}, ${PY - r}`}></button>
                        {/each}
                      {/each}
                    </div>
                    <div class="plane-read"><span>( {pt.x} , {pt.y} )</span></div>
                    {#if placed3.length}
                      <p class="stage-note">Placed: {placed3.map(k => '(' + k.replace(',', ', ') + ')').join('  ')}</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'tiling-bench'}
                  <div class="rows">
                    <div class="bench-target">TARGET AREA <b>{bench24.target}</b></div>
                    <div class="grid-wrap"
                      on:pointerdown={() => (gridDrag = true)}
                      on:pointerup={() => (gridDrag = false)}
                      on:pointerleave={() => (gridDrag = false)}>
                      {#each Array(GRID_H) as _, r}
                        <div class="grid-row">
                          {#each Array(GRID_W) as _, c}
                            <button class="cell"
                              class:on={c < bench24.b && (GRID_H - 1 - r) < bench24.a}
                              class:hitarea={bench24.b * bench24.a === bench24.target && c < bench24.b && (GRID_H - 1 - r) < bench24.a}
                              on:pointerdown={() => benchSet(c + 1, GRID_H - r)}
                              on:pointerenter={() => gridDrag && benchSet(c + 1, GRID_H - r)}
                              aria-label={`Set ${c + 1} by ${GRID_H - r}`}></button>
                          {/each}
                        </div>
                      {/each}
                    </div>
                    <div class="grid-product">{bench24.b} × {bench24.a} = {bench24.b * bench24.a}</div>
                    <div class="bench-targets">
                      <button class:on={bench24.target === 24} on:click={() => benchTarget(24)}>24</button>
                      <button class:on={bench24.target === 16} on:click={() => benchTarget(16)}>16</button>
                      <button class:on={bench24.target === 25} on:click={() => benchTarget(25)}>25</button>
                    </div>
                    {#if bench24.found.length}
                      <p class="stage-note">Found so far: {bench24.found.join(', ')}</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3)}>
                          <i>{goalMet(w.kind, g.id, bench, cb, db, sb, dt, sp, dd, bench24, placed3) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'root-bench'}
                  <div class="rows">
                    <div class="row"><small>TARGET</small>
                      <button on:click={() => rootBench = { ...rootBench, target: Math.max(1, rootBench.target - 1) }} aria-label="Lower target">−</button>
                      <b>{rootBench.target}</b>
                      <button on:click={() => rootBench = { ...rootBench, target: rootBench.target + 1 }} aria-label="Raise target">+</button>
                    </div>
                    <div class="row"><small>GUESS</small>
                      <button on:click={() => rootBench = { ...rootBench, guess: Number(Math.max(0, rootBench.guess - 0.001).toFixed(3)) }} aria-label="Lower guess">−</button>
                      <b>{rootBench.guess}</b>
                      <button on:click={() => rootBench = { ...rootBench, guess: Number((rootBench.guess + 0.001).toFixed(3)) }} aria-label="Raise guess">+</button>
                    </div>
                    <label class="range-row"><span>0</span>
                      <input type="range" min="0" max="10" step="0.001" value={rootBench.guess}
                        on:input={e => rootBench = { ...rootBench, guess: Number(e.target.value) }} aria-label="Guess"/>
                      <span>10</span></label>
                    <button class="chip" on:click={rootTry}>square it and compare</button>
                    {#if rootBench.hits.length}
                      <p class="stage-note">
                        {rootBench.hits.slice(-3).map(h => `${h.g}² = ${h.sq}, off ${h.t} by ${h.off.toFixed(6)}`).join('   ')}
                      </p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={rootGoal(g.id, rootBench)}>
                          <i>{rootGoal(g.id, rootBench) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'growth-bench'}
                  <div class="rows">
                    {#each [['A', 'aChange', 'aTime'], ['B', 'bChange', 'bTime']] as [label, ck, tk]}
                      <div class="coll">
                        <small>{label}</small>
                        <span class="pm">
                          <button on:click={() => gb = { ...gb, [ck]: gb[ck] - 1 }} aria-label={`Less change for ${label}`}>−</button>
                          <b class="gb-num">{gb[ck]}</b>
                          <button on:click={() => gb = { ...gb, [ck]: gb[ck] + 1 }} aria-label={`More change for ${label}`}>+</button>
                        </span>
                        <small>in</small>
                        <span class="pm">
                          <button on:click={() => gb = { ...gb, [tk]: Math.max(1, gb[tk] - 1) }} aria-label={`Less time for ${label}`}>−</button>
                          <b class="gb-num">{gb[tk]}</b>
                          <button on:click={() => gb = { ...gb, [tk]: gb[tk] + 1 }} aria-label={`More time for ${label}`}>+</button>
                        </span>
                        <strong class="gb-rate">{gbRate(gb[ck], gb[tk])} per unit</strong>
                      </div>
                    {/each}
                    <p class="stage-note">
                      {gbRate(gb.aChange, gb.aTime) === gbRate(gb.bChange, gb.bTime)
                        ? 'Same rate.'
                        : gbRate(gb.aChange, gb.aTime) > gbRate(gb.bChange, gb.bTime) ? 'A is faster.' : 'B is faster.'}
                    </p>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={gbGoal(g.id, gbSeen)}><i>{gbGoal(g.id, gbSeen) ? '✓' : '○'}</i>{g.text}</li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'rate-quiz-bench'}
                  {@const item = RQ[rq.i % RQ.length]}
                  <div class="rows">
                    <div class="drill-status"><span>Something <b>{item.q}</b></span><small>streak {rq.streak}</small></div>
                    <div class="row"><small>RATE</small>
                      <button on:click={() => rq = { ...rq, guess: rq.guess - 1 }} aria-label="Lower guess">−</button>
                      <b>{rq.guess}</b>
                      <button on:click={() => rq = { ...rq, guess: rq.guess + 1 }} aria-label="Raise guess">+</button>
                      <small>{item.unit}</small>
                    </div>
                    <button class="chip" on:click={rqCheck}>check</button>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={rqGoal(g.id, rq.seen)}><i>{rqGoal(g.id, rq.seen) ? '✓' : '○'}</i>{g.text}</li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'walk-bench'}
                  <div class="rows">
                    <div class="numline walk">
                      {#each Array(11) as _, i}
                        {@const v = i - 5}
                        <span class="tick whole" class:neg={v < 0} class:zero={v === 0}>
                          <i></i><small>{v < 0 ? '−' + Math.abs(v) : v}</small>
                          {#if v === benchAt}<em class="walker">▲</em>{/if}
                        </span>
                      {/each}
                    </div>
                    <div class="row">
                      <button on:click={() => stepBench(-1)} aria-label="One step left">←</button>
                      <b>{benchAt < 0 ? '−' + Math.abs(benchAt) : benchAt}</b>
                      <button on:click={() => stepBench(1)} aria-label="One step right">→</button>
                      <button class="chip" on:click={() => { benchAt = 0; walkFrom = 0; walkSeen = { ...walkSeen, started: 0 }; }}>reset to 0</button>
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={walkGoal(g.id, walkSeen)}>
                          <i>{walkGoal(g.id, walkSeen) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'tally-bench'}
                  <div class="rows">
                    {#each [['riders', '🧍'], ['pebbles', '⬤'], ['coins', '🪙']] as [name, glyph], ci}
                      <div class="coll">
                        <small>{name}{ci === 1 ? ' · covered' : ''}</small>
                        <div class="prow">
                          {#each Array(bench3[ci]) as _}<span class="tok sm">{ci === 1 ? '▪' : glyph}</span>{/each}
                        </div>
                        <span class="pm">
                          <button on:click={() => bench3 = bench3.map((v, i) => i === ci ? Math.max(0, v - 1) : v)} aria-label={`Fewer ${name}`}>−</button>
                          <button on:click={() => bench3 = bench3.map((v, i) => i === ci ? Math.min(8, v + 1) : v)} aria-label={`More ${name}`}>+</button>
                        </span>
                      </div>
                    {/each}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={tallyGoal(g.id, bench3, benchSeen)}>
                          <i>{tallyGoal(g.id, bench3, benchSeen) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'measure-bench'}
                  <div class="rows">
                    <div class="numline compare">
                      {#each [0, 0.25, 0.5, 0.75, 1] as v}<span class="tick whole"><i></i><small>{v}</small></span>{/each}
                      <em class="mk a" style={`left:${mark * 100}%`}>{mark.toFixed(2)}</em>
                    </div>
                    <label class="range-row">
                      <span>0</span>
                      <input type="range" min="0" max="1" step="0.01" value={mark}
                        on:input={e => placeMark(Number(e.target.value))} aria-label="Place the marker"/>
                      <span>1</span>
                    </label>
                    {#if marks.length}
                      <p class="stage-note">Placed: {marks.map(v => v.toFixed(2)).join('  ')}</p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={measureGoal(g.id, marks)}>
                          <i>{measureGoal(g.id, marks) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'repair-bench'}
                  <div class="rows">
                    {#each w.machines as m, mi}
                      <div class="rule-card" class:passed={rb.verdicts[mi] === 'pass'} class:failed={rb.verdicts[mi] === 'fail'}>
                        <b>{m.name}</b>
                        <div class="panel">
                          {#each m.buttons as label, bi}
                            <button class="panel-btn sm" on:click={() => rbPress(mi, bi, label)}>
                              <b>{bi + 1}</b>
                              {#if rb.pressed[`${mi}:${bi}`]}<em>{rb.pressed[`${mi}:${bi}`]}</em>{/if}
                            </button>
                          {/each}
                        </div>
                        <div class="verdict">
                          <button class="chip" on:click={() => rbJudge(mi, 'pass')}>can be relied on</button>
                          <button class="chip" on:click={() => rbJudge(mi, 'fail')}>cannot</button>
                        </div>
                      </div>
                    {/each}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={benchGoal(g.id, rb, w.machines)}>
                          <i>{benchGoal(g.id, rb, w.machines) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'machine-bench'}
                  <div class="rows">
                    <div class="plates">
                      {#each w.plates as nm, pi}
                        <button class="chip plate-pick" class:up={fm.plate === pi} on:click={() => fm = { ...fm, plate: pi }}>{nm}</button>
                      {/each}
                    </div>
                    <div class="tray">
                      {#each w.inputs as v}
                        <button class="chip pick" on:click={() => fmFeed(v)}>{fmt2(v)}</button>
                      {/each}
                    </div>
                    {#if fm.seen.length}
                      <p class="stage-note">
                        {fm.seen.slice(-6).map(r => `${fmt2(r.input)} → ${fmt2(r.out)}`).join('   ')}
                      </p>
                    {/if}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={machineGoal(g.id, fm)}>
                          <i>{machineGoal(g.id, fm) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'rule-guess'}
                  <div class="rows">
                    <div class="tray">
                      {#each w.inputs as v}
                        <button class="chip pick" on:click={() => rgFeed(v)}>{fmt2(v)}</button>
                      {/each}
                    </div>
                    <table class="io-table">
                      <thead><tr><th>in</th><th>out</th></tr></thead>
                      <tbody>
                        {#each rg.fed as f}<tr><td>{fmt2(f.input)}</td><td><b>{fmt2(f.out)}</b></td></tr>{/each}
                      </tbody>
                    </table>
                    <div class="plates">
                      {#each w.plates as nm}
                        <button class="chip plate-pick" class:up={rg.guess === nm} on:click={() => rg = { ...rg, guess: nm }}>{nm}</button>
                      {/each}
                    </div>
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={guessGoal(g.id, rg)}>
                          <i>{guessGoal(g.id, rg) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'rule-inspector'}
                  <div class="rows">
                    {#each w.rules as r}
                      <div class="rule-card" class:passed={ri.verdicts[r.name] === 'pass'} class:failed={ri.verdicts[r.name] === 'fail'}>
                        <b>{r.name}</b>
                        <div class="verdict">
                          <button class="chip" on:click={() => ri = { verdicts: { ...ri.verdicts, [r.name]: 'pass' } }}>function</button>
                          <button class="chip" on:click={() => ri = { verdicts: { ...ri.verdicts, [r.name]: 'fail' } }}>not</button>
                        </div>
                      </div>
                    {/each}
                    <ul class="goals">
                      {#each w.goals as g}
                        <li class:met={inspectorGoal(g.id, ri, w.rules)}>
                          <i>{inspectorGoal(g.id, ri, w.rules) ? '✓' : '○'}</i>{g.text}
                        </li>
                      {/each}
                    </ul>
                  </div>

                {:else if w.kind === 'statement-match'}
                  <div class="rows">
                    {#each w.pairs as p}
                      <div class="pair-row"><b>{p.left}</b><i>→</i><span>{p.right}</span></div>
                    {/each}
                    <p class="stage-note">Shown paired here. Built, the right column would be shuffled and tapped into place.</p>
                  </div>
                {/if}
              </div>

              {#if !keptOnly}<p class="note">{w.note}</p>{/if}
            </article>
          {/each}
        </div>
      </section>
    {/if}

    <section class="closing">
      {#if keptOnly}
        <h2>Ready to approve?</h2>
        {#if outstanding.length}
          <p class="warn">
            Not yet. {outstanding.length} section{outstanding.length === 1 ? '' : 's'} still
            {outstanding.length === 1 ? 'has' : 'have'} an empty slot, so this sheet is showing an
            incomplete board. Switch back to all variants and fill them.
          </p>
          <ul class="outstanding">
            {#each outstanding as row}
              <li><b>{row.code}</b> {row.name}<span>{row.missing.join(', ')}</span></li>
            {/each}
          </ul>
        {:else}
          <p>
            Every slot is filled. This is {bb1.title} as chosen, with nothing
            rejected or undecided on screen. Read it through, and if it stands, say
            so and I will write the approval into the record and the status page
            with your name and today's date.
          </p>
          <p class="note">
            Approval is a sentence to me, not a button here. This page cannot write
            to the repository, which is deliberate: nothing should be able to change
            curriculum status without passing through a person.
          </p>
        {/if}
      {:else}
        <h2>Still open</h2>
        {#if outstanding.length}
          <ul class="outstanding">
            {#each outstanding as row}
              <li><b>{row.code}</b> {row.name}<span>{row.missing.join(', ')}</span></li>
            {/each}
          </ul>
        {:else}
          <p>Every slot is filled. Switch to the kept sheet for a last read before approval.</p>
        {/if}

        <h2>Sending your selection</h2>
        <p>
          Reply with one reading, one interaction and one exercise per section, for
          example <code>S1-A, S1-I1, S1-X2, S2-B, S2-I1, S2-X1 …</code>. Anything you
          leave out I will choose and record as a finalised conclusion. Anything you
          want reworded stays here rather than graduating to the record.
        </p>
      {/if}
    </section>
  </main>
</div>

<style>
  /* scroll: internal. A dev workbench, not a document: the panes are meant to
     scroll independently inside a fixed frame, the way an editor does. No
     learner reaches these. */
  .factory-shell { height: 100%; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; background: var(--qx-bg); color: var(--qx-text); font-family: var(--qx-font); }
  .factory-header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px clamp(16px, 4vw, 48px); border-bottom: 1px solid var(--qx-border); background: color-mix(in srgb, var(--qx-bg) 88%, transparent); backdrop-filter: blur(14px); }
  .identity { display: flex; align-items: center; gap: 11px; }
  .mark { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--qx-accent); display: grid; place-items: center; color: var(--qx-accent-text); font: 800 18px/1 Georgia, serif; }
  .stack { display: flex; flex-direction: column; gap: 2px; }
  .stack b { font-size: 13px; letter-spacing: .17em; }
  .stack small { color: var(--qx-text-dim); font-size: 13.5px; }
  .header-actions { display: flex; align-items: center; gap: 10px; }
  .pill { border: 1px solid var(--qx-border-2); border-radius: 999px; padding: 5px 11px; font-size: 12px; font-weight: 900; letter-spacing: .12em; color: var(--qx-text-dim); }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); cursor: pointer; }

  .factory-body { max-width: 1180px; margin: 0 auto; padding: 26px clamp(16px, 4vw, 48px) 80px; display: flex; flex-direction: column; gap: 34px; }
  .micro { color: var(--qx-accent-text); font-size: 13px; letter-spacing: .14em; font-weight: 900; }
  .intro h1 { font-size: clamp(28px, 4vw, 42px); margin: 6px 0 10px; }
  .world-console { margin: 18px 0 22px; border: 1px solid var(--qx-border-2); border-radius: 22px; padding: clamp(16px, 3vw, 28px); background: linear-gradient(145deg, var(--qx-surface), var(--qx-surface-2)); box-shadow: 0 18px 55px rgba(38, 31, 22, .08); display: grid; gap: 18px; overflow: hidden; }
  .world-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }
  .world-head > div { display: grid; gap: 4px; }
  .world-head span, .world-subhead span { color: var(--qx-accent-text); font-size: 12px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }
  .world-head h2 { margin: 0; font-size: clamp(24px, 4vw, 38px); letter-spacing: -.03em; }
  .world-head p { margin: 0; max-width: 65ch; color: var(--qx-text-2); font-size: 15px; line-height: 1.5; }
  .world-head > small { max-width: 260px; border: 1px solid var(--qx-green); border-radius: 999px; padding: 6px 10px; background: var(--qx-green-soft); color: var(--qx-green-text); font-size: 11.5px; line-height: 1.35; font-weight: 900; text-align: center; }
  .world-footprint { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .world-footprint span { border: 1px solid var(--qx-border); border-radius: 12px; padding: 10px 12px; background: var(--qx-surface); display: grid; gap: 1px; }
  .world-footprint b { color: var(--qx-accent-text); font-size: 24px; }
  .world-footprint small { color: var(--qx-text-faint); font-size: 11.5px; letter-spacing: .09em; font-weight: 900; text-transform: uppercase; }
  .learning-loop { display: grid; gap: 9px; }
  .learning-loop-track { display: flex; align-items: stretch; gap: 6px; }
  .learning-loop-track article { flex: 1 1 0; min-width: 0; border: 1px solid var(--qx-accent); border-radius: 11px; padding: 9px; background: var(--qx-accent-soft); display: grid; gap: 4px; align-content: start; }
  .learning-loop-track article.practical { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .learning-loop-track article span { color: var(--qx-accent-text); font-size: 11.5px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .learning-loop-track article.practical span { color: var(--qx-green-text); }
  .learning-loop-track article b { color: var(--qx-text); font-size: 12px; line-height: 1.35; }
  .learning-loop-track > i { align-self: center; color: var(--qx-text-faint); font-size: 14.5px; font-style: normal; font-weight: 900; }
  .world-primary { display: grid; grid-template-columns: minmax(260px, .85fr) minmax(420px, 1.4fr); gap: 12px; }
  .mission-brief { border: 1px solid var(--qx-accent); border-radius: 16px; padding: 16px; background: var(--qx-accent-soft); display: grid; gap: 8px; align-content: start; }
  .mission-role { color: var(--qx-accent-text); font-size: 12px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
  .mission-brief h3 { margin: 0; color: var(--qx-text); font-size: 19px; letter-spacing: -.01em; text-transform: none; }
  .mission-brief p { margin: 0; color: var(--qx-text-2); font-size: 14.5px; line-height: 1.5; }
  .mission-brief small { border-top: 1px solid var(--qx-border-2); padding-top: 8px; color: var(--qx-accent-text); font-size: 13px; line-height: 1.45; font-weight: 800; }
  .world-flow { border: 1px solid var(--qx-border); border-radius: 16px; padding: 12px; background: var(--qx-surface); display: flex; align-items: stretch; gap: 7px; }
  .world-flow article { flex: 1 1 0; min-width: 0; border: 1px solid var(--qx-border); border-radius: 11px; padding: 10px; display: grid; gap: 4px; align-content: start; }
  .world-flow b { color: var(--qx-text); font-size: 13.5px; }
  .world-flow small { color: var(--qx-text-faint); font-size: 11.5px; line-height: 1.4; }
  .world-arrow { align-self: center; color: var(--qx-accent-text); font-weight: 900; }
  .world-schema, .career-map { display: grid; gap: 9px; }
  .world-subhead { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; }
  .world-subhead b { color: var(--qx-text-dim); font-size: 13.5px; }
  .schema-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 7px; }
  .schema-grid article { min-width: 0; border: 1px solid var(--qx-border); border-radius: 11px; padding: 10px; background: var(--qx-surface); display: grid; gap: 4px; }
  .schema-grid b { color: var(--qx-accent-text); font-size: 13.5px; overflow-wrap: anywhere; }
  .schema-grid span { color: var(--qx-text); font-size: 11.5px; font-weight: 900; overflow-wrap: anywhere; }
  .schema-grid small { color: var(--qx-text-faint); font-size: 11.5px; line-height: 1.35; overflow-wrap: anywhere; }
  .promotion-map { display: grid; gap: 9px; }
  .promotion-track { display: flex; align-items: stretch; gap: 5px; }
  .promotion-track article { flex: 1 1 0; min-width: 0; border: 1px solid var(--qx-border); border-radius: 11px; padding: 8px; background: var(--qx-surface); display: flex; gap: 7px; align-items: flex-start; }
  .promotion-track article.current { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .promotion-track article > span { flex: 0 0 20px; height: 20px; border-radius: 50%; background: var(--qx-accent-soft); color: var(--qx-accent-text); display: grid; place-items: center; font-size: 11.5px; font-weight: 900; }
  .promotion-track article.current > span { background: var(--qx-green); color: #fff; }
  .promotion-track article div { min-width: 0; display: grid; gap: 3px; }
  .promotion-track article b { color: var(--qx-text); font-size: 12px; line-height: 1.25; }
  .promotion-track article small { color: var(--qx-text-faint); font-size: 11px; line-height: 1.35; }
  .promotion-track > i { align-self: center; color: var(--qx-text-faint); font-size: 13.5px; font-style: normal; font-weight: 900; }
  .career-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 7px; }
  .career-grid article { min-width: 0; border: 1px solid var(--qx-border); border-radius: 12px; padding: 10px; background: var(--qx-surface); }
  .career-grid h3 { margin: 0 0 7px; color: var(--qx-text-dim); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
  .career-grid article div { display: flex; flex-wrap: wrap; gap: 4px; }
  .career-grid span { border: 1px solid var(--qx-border); border-radius: 999px; padding: 4px 7px; color: var(--qx-text-2); font-size: 11.5px; line-height: 1.25; font-weight: 800; }
  .career-grid span.current { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .topic-catalog { border: 1px solid var(--qx-border-2); border-radius: 14px; background: var(--qx-surface); }
  .topic-catalog > summary { min-height: 52px; padding: 10px 13px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; list-style-position: inside; }
  .topic-catalog > summary > span { display: grid; gap: 2px; }
  .topic-catalog > summary b { color: var(--qx-text); font-size: 14.5px; }
  .topic-catalog > summary small { color: var(--qx-text-faint); font-size: 12px; line-height: 1.4; }
  .topic-catalog > summary em { border: 1px solid var(--qx-accent); border-radius: 999px; padding: 5px 9px; color: var(--qx-accent-text); font-size: 11.5px; font-style: normal; font-weight: 900; white-space: nowrap; }
  .topic-phase-grid { border-top: 1px solid var(--qx-border); padding: 12px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
  .topic-phase-grid > article { min-width: 0; border: 1px solid var(--qx-border); border-radius: 12px; padding: 11px; background: var(--qx-surface-2); display: grid; gap: 8px; align-content: start; }
  .topic-phase-grid > article.current { border-color: var(--qx-green); box-shadow: inset 0 3px 0 var(--qx-green); }
  .topic-phase-grid header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .topic-phase-grid header span { color: var(--qx-accent-text); font-size: 11.5px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .topic-phase-grid header small { color: var(--qx-text-faint); font-size: 11.5px; text-align: right; }
  .topic-phase-grid h3 { margin: 0; color: var(--qx-text); font-size: 14px; letter-spacing: 0; line-height: 1.25; text-transform: none; }
  .topic-phase-grid ol { margin: 0; padding-left: 18px; display: grid; gap: 3px; }
  .topic-phase-grid li { color: var(--qx-text-2); font-size: 12px; line-height: 1.35; }
  .topic-phase-grid p { margin: 0; border-top: 1px solid var(--qx-border); padding-top: 7px; color: var(--qx-text-dim); font-size: 12px; line-height: 1.4; }
  .topic-phase-grid p b { display: block; margin-bottom: 2px; color: var(--qx-green-text); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
  .lede { color: var(--qx-text-2); font-size: 16px; line-height: 1.6; max-width: 62ch; }
  .fork-note { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
  .fork-note div { flex: 1 1 260px; border: 1px solid var(--qx-border); border-radius: 12px; padding: 11px 13px; background: var(--qx-surface-2); display: flex; flex-direction: column; gap: 3px; }
  .fork-note b { font-size: 12px; letter-spacing: .13em; color: var(--qx-accent-text); }
  .fork-note span { font-size: 15px; color: var(--qx-text-2); }
  .source-matrix { margin-top: 14px; border-top: 1px solid var(--qx-border); padding-top: 14px; }
  .source-matrix h2 { margin: 0 0 4px; font-size: 15px; letter-spacing: .08em; text-transform: uppercase; }
  .source-matrix > p { margin: 0 0 10px; color: var(--qx-text-faint); font-size: 13.5px; }
  .source-matrix-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 8px; }
  .source-matrix article { display: flex; flex-direction: column; gap: 5px; border: 1px solid var(--qx-border); border-radius: 11px; padding: 10px 11px; background: var(--qx-surface); }
  .source-matrix article b { font-size: 13.5px; line-height: 1.4; color: var(--qx-text); }
  .source-matrix article span { font-size: 13.5px; line-height: 1.45; color: var(--qx-text-2); }
  .source-matrix article em { font-style: normal; font-size: 13px; line-height: 1.4; color: var(--qx-accent-text); border-top: 1px dashed var(--qx-border-2); padding-top: 5px; }
  .source-matrix article a { color: var(--qx-accent-text); font-size: 13px; font-weight: 800; text-decoration: none; }
  .source-matrix article a:hover, .source-matrix article a:focus { text-decoration: underline; }

  .force-experiment { width: 100%; }
  .vector-experiment { width:100%; min-height:290px; }
  .vector-circle,.vector-compass,.vector-builder { width:min(100%,360px); height:220px; overflow:visible; }
  .vector-circle .orbit,.vector-compass circle,.vector-builder circle { fill:none; stroke:var(--qx-border-2); stroke-width:2; }
  .vector-circle .travel-arc { fill:none; stroke:var(--qx-accent); stroke-width:5; stroke-linecap:round; }
  .displacement-vector,.vector-line { stroke:var(--qx-green); stroke-width:4; stroke-linecap:round; }
  .vector-line.second { stroke:var(--qx-danger); stroke-dasharray:6 4; }
  .vector-head,.vector-tip { fill:var(--qx-green); }
  .vector-tip.second { fill:var(--qx-danger); }
  .start-dot { fill:var(--qx-text); }
  .orbit-marker { fill:var(--qx-accent); transform-origin:150px 110px; }
  .orbit-marker.running { animation:vector-orbit 1.5s linear forwards; }
  @keyframes vector-orbit { to { transform:rotate(calc(-1 * var(--turn))); } }
  .vector-circle text,.vector-compass text { fill:var(--qx-text-faint); font-size:13.5px; font-weight:900; text-anchor:middle; }
  .vector-compass>circle { fill:var(--qx-surface-2); }
  .vector-compass path { stroke:var(--qx-border-2); stroke-width:1; stroke-dasharray:4 5; }
  .vector-picks { display:flex; justify-content:center; gap:6px; flex-wrap:wrap; }
  .vector-picks button,.vector-action { min-height:42px; border:1px solid var(--qx-border-2); border-radius:10px; background:var(--qx-surface); color:var(--qx-text); padding:8px 11px; font-weight:900; cursor:pointer; }
  .vector-picks button.on { border-color:var(--qx-accent); background:var(--qx-accent-soft); color:var(--qx-accent-text); }
  .vector-readouts { display:grid; grid-template-columns:1fr 1fr; gap:8px; width:min(100%,370px); }
  .vector-readouts span { display:flex; flex-direction:column; align-items:center; border:1px solid var(--qx-border); border-radius:10px; padding:9px; }
  .vector-readouts small { color:var(--qx-text-faint); font-size:11.5px; font-weight:900; }
  .vector-readouts b,.vector-result { color:var(--qx-accent-text); font-weight:900; }
  .vector-result { margin:0; text-align:center; }
  .vector-controls { width:min(100%,390px); display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .vector-controls label { display:grid; grid-template-columns:1fr auto; gap:5px; color:var(--qx-text-faint); font-size:12px; font-weight:900; }
  .vector-controls input { grid-column:1/-1; }
  .vector-controls b { color:var(--qx-accent-text); }
  .vector-add-stage { width:min(100%,390px); height:220px; overflow:visible; }
  .vector-add-stage .vector-grid { fill:none; stroke:var(--qx-border-2); stroke-width:1.5; stroke-dasharray:4 5; }
  .vector-add-stage text { fill:var(--qx-text-faint); font-size:13px; font-weight:900; text-anchor:middle; }
  .vector-line.muted { stroke:var(--qx-text-dim); }
  .vector-tip.muted { fill:var(--qx-text-dim); }
  .resultant-line { stroke:var(--qx-accent); stroke-width:5; stroke-linecap:round; }
  .resultant-tip { fill:var(--qx-accent); }
  .zero-result { fill:none; stroke:var(--qx-accent); stroke-width:5; }
  .motion-experiment { width: 100%; min-height: 260px; }
  .motion-track { position: relative; width: min(100%, 390px); height: 42px; border-bottom: 3px solid var(--qx-text-dim); }
  .motion-distance { position: absolute; left: 0; bottom: 0; width: var(--motion); height: 8px; background: var(--qx-accent-soft); border-top: 1px dashed var(--qx-accent); }
  .motion-track i { position: absolute; left: 0; bottom: 7px; width: 19px; height: 19px; background: var(--qx-accent); border-radius: 6px; }
  .motion-track i.running { animation: motion-journey var(--motion-duration) linear forwards; }
  @keyframes motion-journey { to { left: calc(var(--motion) - 19px); } }
  .motion-track b { position: absolute; right: 0; top: 0; color: var(--qx-accent-text); }
  .motion-sliders { width: min(100%, 390px); display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .motion-sliders label { display: grid; grid-template-columns: 1fr auto; gap: 5px; color: var(--qx-text-faint); font-size: 12px; font-weight: 900; }
  .motion-sliders input { grid-column: 1 / -1; }
  .motion-sliders b { color: var(--qx-text); font-size: 14.5px; }
  .motion-equation { display: flex; align-items: center; gap: 8px; font-weight: 900; flex-wrap: wrap; justify-content: center; }
  .motion-equation i { font-style: normal; color: var(--qx-text-faint); }
  .motion-equation b { color: var(--qx-accent-text); font-size: 20px; }
  .motion-race { width: min(100%, 430px); display: grid; gap: 10px; }
  .motion-race div { display: grid; grid-template-columns: 58px 1fr 45px; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 900; }
  .motion-race i { position: relative; height: 22px; background: var(--qx-surface-2); border-radius: 5px; overflow: hidden; border-bottom: 2px solid var(--qx-border-2); }
  .motion-race i b { position: absolute; left: 0; bottom: 2px; width: 17px; height: 17px; background: var(--qx-accent); border-radius: 5px; }
  .motion-race i b.running { animation: motion-race var(--race-duration) linear forwards; }
  @keyframes motion-race { to { left: calc(var(--race) - 17px); } }
  .motion-race em { font-style: normal; color: var(--qx-accent-text); }
  .motion-picks { display: flex; gap: 7px; align-items: center; justify-content: center; flex-wrap: wrap; }
  .motion-picks span { color: var(--qx-text-faint); font-size: 12px; font-weight: 900; letter-spacing: .08em; }
  .motion-picks button, .motion-action { min-height: 42px; border: 1px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); padding: 8px 12px; font-weight: 900; cursor: pointer; }
  .motion-picks button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .velocity-stage { display: flex; align-items: center; justify-content: center; gap: 12px; width: min(100%, 370px); min-height: 72px; }
  .velocity-stage.running { animation: velocity-right 1.2s linear forwards; }
  .velocity-stage.running.left { animation-name: velocity-left; }
  @keyframes velocity-right { from { transform: translateX(-28%); } to { transform: translateX(28%); } }
  @keyframes velocity-left { from { transform: translateX(28%); } to { transform: translateX(-28%); } }
  .velocity-arrow { color: var(--qx-accent-text); font-size: 64px; line-height: 1; }
  .velocity-block { border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); border-radius: 12px; padding: 19px 25px; font-weight: 900; }
  .motion-readouts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; width: min(100%, 430px); }
  .motion-readouts.four { grid-template-columns: repeat(4, 1fr); }
  .motion-readouts span { display: flex; flex-direction: column; align-items: center; gap: 3px; border: 1px solid var(--qx-border); border-radius: 9px; padding: 8px 5px; text-align: center; }
  .motion-readouts small { color: var(--qx-text-faint); font-size: 11.5px; font-weight: 900; letter-spacing: .06em; }
  .motion-readouts b { color: var(--qx-accent-text); font-size: 15px; }
  .velocity-twins { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: min(100%, 410px); }
  .velocity-twins div { position: relative; display: grid; place-items: center; gap: 5px; border: 1px solid var(--qx-border); border-radius: 12px; padding: 15px 15px 39px; overflow: hidden; }
  .velocity-twins i { font-style: normal; color: var(--qx-accent-text); font-size: 44px; line-height: 1; }
  .velocity-twins span { color: var(--qx-text-faint); font-size: 13px; font-weight: 800; }
  .velocity-twins em { position: absolute; left: calc(50% - 9px); bottom: 8px; width: 18px; height: 18px; border-radius: 5px; background: var(--qx-accent); }
  .velocity-twins em.running { animation: twin-right 1.2s linear forwards; }
  .velocity-twins em.running.left { animation-name: twin-left; }
  @keyframes twin-right { to { left: calc(100% - 27px); } }
  @keyframes twin-left { to { left: 9px; } }
  .motion-note { margin: 0; color: var(--qx-green-text); font-weight: 900; }
  .round-track, .trip-line { position: relative; width: min(100%, 420px); height: 80px; border-bottom: 3px solid var(--qx-text-dim); }
  .round-track span { position: absolute; left: 0; bottom: 7px; font-size: 12px; font-weight: 900; }
  .round-track b { position: absolute; right: 0; top: 0; color: var(--qx-text-faint); font-size: 13px; }
  .round-track i { position: absolute; left: 4px; bottom: 12px; width: 22px; height: 22px; border-radius: 6px; background: var(--qx-accent); }
  .round-track i.running { animation: round-home 1.5s ease-in-out forwards; }
  @keyframes round-home { 0% { left: 4px; } 50% { left: calc(100% - 26px); } 100% { left: 4px; } }
  @media (prefers-reduced-motion: reduce) {
    .motion-track i.running, .motion-race i b.running, .velocity-stage.running, .velocity-twins em.running, .round-track i.running { animation-duration: .01s; }
  }
  .trip-line i { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--qx-border-2); }
  .trip-line b { position: absolute; left: var(--position); bottom: 8px; width: 20px; height: 20px; border-radius: 6px; background: var(--qx-accent); transform: translateX(-50%); transition: left .2s; }
  .trip-line span { position: absolute; left: 50%; bottom: -19px; transform: translateX(-50%); color: var(--qx-text-faint); font-size: 12px; }
  .triangle-experiment { width: 100%; min-height: 270px; }
  .triangle-svg { width: min(100%, 390px); height: 185px; overflow: visible; }
  .triangle-face { fill: var(--qx-accent-soft); stroke: var(--qx-text-dim); stroke-width: 3; stroke-linejoin: round; }
  .triangle-svg text { fill: var(--qx-text); font-size: 15px; font-weight: 900; text-anchor: middle; }
  .triangle-svg text.unknown { fill: var(--qx-danger-text); font-size: 20px; }
  .triangle-corner { stroke: var(--qx-surface); stroke-width: 2; }
  .triangle-corner.a { fill: var(--qx-accent); }
  .triangle-corner.b { fill: var(--qx-green); }
  .triangle-corner.c { fill: var(--qx-danger); }
  .triangle-right { fill: none; stroke: var(--qx-green); stroke-width: 2.5; }
  .triangle-sliders { width: min(100%, 390px); display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .triangle-sliders label { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 8px; color: var(--qx-text-faint); font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .triangle-controls, .triangle-targets { display: flex; justify-content: center; align-items: center; gap: 7px; flex-wrap: wrap; }
  .triangle-controls button, .triangle-targets button, .triangle-action, .triangle-known-controls button { min-height: 42px; border: 1px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); padding: 8px 12px; font-weight: 900; cursor: pointer; }
  .triangle-controls button.on, .triangle-targets button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .triangle-action { border-color: var(--qx-accent); color: var(--qx-accent-text); }
  .triangle-total { display: flex; justify-content: center; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 15px; font-weight: 900; }
  .triangle-total i { font-style: normal; color: var(--qx-text-faint); }
  .triangle-total b { color: var(--qx-accent-text); font-size: 19px; }
  .triangle-lineup { width: min(100%, 430px); display: flex; flex-direction: column; gap: 12px; }
  .triangle-sum-bar { display: flex; width: 100%; min-height: 76px; align-items: stretch; border-bottom: 3px solid var(--qx-text-dim); }
  .triangle-sum-bar span { flex: var(--part); min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; border: 1px solid var(--qx-border-2); border-bottom: 0; }
  .triangle-sum-bar span.a { background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .triangle-sum-bar span.b { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .triangle-sum-bar span.c { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .triangle-sum-bar b { font-size: 14.5px; }
  .triangle-sum-bar em { font-style: normal; font-size: 13.5px; font-weight: 900; }
  .triangle-straight { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 8px; color: var(--qx-text-dim); font-size: 13.5px; }
  .triangle-straight i { height: 2px; background: var(--qx-text-dim); }
  .triangle-proof { margin: 0; color: var(--qx-text-dim); font-size: 14.5px; font-weight: 800; text-align: center; }
  .triangle-proof.hit { color: var(--qx-green-text); }
  .triangle-known-controls { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .triangle-known-controls span { display: grid; grid-template-columns: auto auto auto; grid-template-rows: auto auto; align-items: center; gap: 4px 8px; border: 1px solid var(--qx-border); border-radius: 11px; padding: 8px 10px; }
  .triangle-known-controls small { grid-column: 1 / -1; text-align: center; color: var(--qx-text-faint); font-size: 12px; font-weight: 900; letter-spacing: .08em; }
  .triangle-known-controls button { min-width: 42px; padding: 5px 9px; }
  .triangle-known-controls b { min-width: 42px; text-align: center; color: var(--qx-accent-text); font-size: 17px; }
  .triangle-targets > span { color: var(--qx-text-faint); font-size: 12px; font-weight: 900; letter-spacing: .09em; }
  .angle-experiment { width: 100%; min-height: 260px; }
  .angle-svg { width: min(100%, 340px); height: 178px; overflow: visible; }
  .angle-ray { fill: none; stroke: var(--qx-text-dim); stroke-width: 4; stroke-linecap: round; }
  .angle-ray.moving { stroke: var(--qx-accent); }
  .angle-arc { fill: none; stroke: var(--qx-green); stroke-width: 3; stroke-linecap: round; }
  .angle-vertex { fill: var(--qx-text); }
  .angle-degree { fill: var(--qx-accent-text); font-size: 19px; font-weight: 900; text-anchor: middle; }
  .angle-reference { fill: none; stroke: var(--qx-border-2); stroke-width: 2; stroke-dasharray: 5 5; }
  .right-box { fill: none; stroke: var(--qx-green); stroke-width: 2; }
  .angle-controls { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; }
  .angle-controls button, .angle-reveal { min-height: 42px; border: 1px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); padding: 8px 13px; font-weight: 900; cursor: pointer; }
  .angle-controls button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .angle-controls b { min-width: 62px; text-align: center; color: var(--qx-accent-text); font-size: 19px; }
  .angle-result { margin: 0; font-size: 15px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; color: var(--qx-text-dim); }
  .angle-result.hit { color: var(--qx-green-text); }
  .angle-length-control { width: min(100%, 310px); display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 9px; font-size: 13.5px; font-weight: 900; color: var(--qx-text-faint); }
  .angle-length-control b { color: var(--qx-green-text); }
  .angle-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
  .angle-pair > div { display: flex; flex-direction: column; align-items: center; border: 1px solid var(--qx-border); border-radius: 12px; padding: 8px; }
  .angle-pair svg { width: 100%; max-width: 180px; }
  .angle-pair text { fill: var(--qx-accent-text); font-size: 15px; font-weight: 900; }
  .angle-pair b { font-size: 13.5px; color: var(--qx-text-dim); }
  .force-track { position: relative; width: min(100%, 560px); height: 170px; overflow: hidden; border: 1px solid var(--qx-border-2); border-radius: 14px; background: linear-gradient(to bottom, var(--qx-surface-2) 0 71%, var(--qx-surface-3) 71% 100%); }
  .force-ground { position: absolute; left: 0; right: 0; top: 121px; height: 2px; background: var(--qx-text-faint); }
  .force-start { position: absolute; left: 18%; top: 129px; color: var(--qx-text-faint); font-size: 11.5px; letter-spacing: .1em; font-weight: 900; transform: translateX(-50%); }
  .force-person { position: absolute; left: 4%; top: 51px; width: 54px; height: 72px; transition: transform .15s ease; }
  .force-person i { position: absolute; display: block; background: var(--qx-accent); transform-origin: left center; }
  .force-person .force-head { left: 16px; top: 0; width: 19px; height: 19px; border: 3px solid var(--qx-accent); border-radius: 50%; background: transparent; }
  .force-person .force-body { left: 26px; top: 22px; width: 3px; height: 31px; }
  .force-person .force-arm { left: 27px; top: 29px; width: 33px; height: 3px; transform: rotate(8deg); }
  .force-person .force-leg { left: 27px; top: 51px; width: 29px; height: 3px; }
  .force-person .force-leg.one { transform: rotate(55deg); }
  .force-person .force-leg.two { transform: rotate(125deg); }
  .force-person.push-pose { transform: translateX(4px) rotate(3deg); }
  .force-person.push-pose .force-arm { animation: force-arm-pulse .3s ease-in-out infinite alternate; }
  @keyframes force-arm-pulse { from { transform: rotate(4deg); } to { transform: rotate(12deg); } }
  .force-arrow { position: absolute; left: 11%; top: 40px; height: 3px; width: var(--arrow); background: var(--qx-accent); transition: width .15s ease; }
  .force-arrow::after { content: ''; position: absolute; right: -1px; top: -4px; border-left: 8px solid var(--qx-accent); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
  .force-arrow span { position: absolute; left: 50%; bottom: 7px; white-space: nowrap; transform: translateX(-50%); color: var(--qx-accent-text); font-size: 13px; font-weight: 900; }
  .force-arrow.strong { height: 5px; }
  .force-block { position: absolute; left: calc(18% + var(--travel)); top: 76px; width: 48px; height: 46px; display: grid; place-items: center; border: 2px solid var(--qx-accent); border-radius: 5px; background: var(--qx-accent-soft); color: var(--qx-accent-text); transition: left .9s cubic-bezier(.55,.05,.92,.45); }
  .force-block b { font-size: 14.5px; }
  .force-picks { display: flex; gap: 7px; flex-wrap: wrap; justify-content: center; }
  .force-picks button { min-width: 64px; min-height: 44px; border: 1px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); font-weight: 900; cursor: pointer; }
  .force-picks button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .force-push-button { min-height: 44px; border: 0; border-radius: 11px; padding: 9px 17px; background: var(--qx-accent); color: #fff; font-size: 13.5px; letter-spacing: .06em; font-weight: 900; cursor: pointer; }
  .force-push-button:disabled { opacity: .65; cursor: default; }
  .force-readouts { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .force-readouts span { min-width: 82px; border: 1px solid var(--qx-border); border-radius: 9px; padding: 7px 9px; display: flex; flex-direction: column; gap: 2px; background: var(--qx-surface-2); }
  .force-readouts small { color: var(--qx-text-faint); font-size: 11px; letter-spacing: .08em; font-weight: 900; }
  .force-readouts b { color: var(--qx-text); font-size: 15px; }
  .force-target-card { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; border: 1px solid var(--qx-green); border-radius: 11px; padding: 8px 11px; background: var(--qx-green-soft); }
  .force-target-card small { color: var(--qx-green-text); font-size: 11.5px; letter-spacing: .09em; font-weight: 900; }
  .force-target-card b { color: var(--qx-green-text); font-size: 19px; }
  .force-target-card em { font-style: normal; color: var(--qx-text-dim); font-size: 13px; }
  .mass-race-track { width: min(100%, 560px); display: grid; gap: 8px; border: 1px solid var(--qx-border-2); border-radius: 14px; padding: 10px; background: var(--qx-surface-2); }
  .mass-race-lane { position: relative; min-height: 88px; overflow: hidden; border-radius: 9px; background: var(--qx-surface); }
  .mass-race-line { position: absolute; left: 64px; right: 12px; top: 59px; height: 2px; background: var(--qx-text-faint); }
  .mass-race-label { position: absolute; left: 10px; top: 35px; color: var(--qx-accent-text); font-size: 14.5px; font-weight: 900; }
  .mass-race-arrow { position: absolute; left: 7px; bottom: 7px; color: var(--qx-accent-text); font-size: 12px; font-style: normal; font-weight: 900; }
  .mass-race-block { position: absolute; left: 64px; top: 28px; width: var(--mass-width); height: 32px; display: grid; place-items: center; border: 2px solid var(--qx-accent); border-radius: 5px; background: var(--qx-accent-soft); color: var(--qx-accent-text); transition: left .9s cubic-bezier(.55,.05,.92,.45); }
  .mass-race-block.moved { left: calc(64px + var(--race-travel)); }
  .mass-race-block b { font-size: 13px; }
  .mass-race-acceleration { position: absolute; right: 9px; top: 7px; color: var(--qx-text-dim); font-size: 13px; font-weight: 900; }
  .force-result { margin: 0; border-radius: 9px; padding: 7px 10px; background: var(--qx-surface-2); color: var(--qx-text-2); font-size: 14.5px; font-weight: 800; }
  .force-result.hit { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .force-trials { display: flex; gap: 7px; flex-wrap: wrap; justify-content: center; }
  .force-trials span { display: grid; grid-template-columns: auto auto; gap: 2px 7px; border: 1px solid var(--qx-border-2); border-radius: 9px; padding: 6px 9px; }
  .force-trials b { color: var(--qx-accent-text); font-size: 14.5px; }
  .force-trials i { color: var(--qx-text); font-size: 13.5px; font-style: normal; }
  .force-trials small { grid-column: 1 / -1; color: var(--qx-text-faint); font-size: 12px; }
  .force-proportion { width: min(100%, 390px); display: flex; flex-direction: column; gap: 6px; }
  .force-proportion span { display: grid; grid-template-columns: 76px 1fr 58px; align-items: center; gap: 7px; }
  .force-proportion small { color: var(--qx-text-faint); font-size: 12px; font-weight: 800; }
  .force-proportion i { display: block; height: 10px; max-width: 100%; border-radius: 5px; background: var(--qx-accent); }
  .force-proportion span + span i { background: var(--qx-green); }
  .force-proportion b { color: var(--qx-text); font-size: 13px; }

  .graph-layout { display: flex; align-items: flex-start; justify-content: center; gap: 16px; width: 100%; flex-wrap: wrap; }
  .graph-table.compact { min-width: 72px; }
  .plot-svg, .slope-svg { width: min(100%, 390px); height: auto; }
  .plot-axis { fill: none; stroke: var(--qx-text-dim); stroke-width: 1.7; }
  .plot-grid { stroke: var(--qx-border); stroke-width: .7; }
  .plot-dot { fill: var(--qx-accent); }
  /* Plotting drills, rebuilt 2026-08-17. A real plane with selectable sample
     points: the drawn dot is 5px so it reads as one coordinate, and the hit
     circle over it is 15px so a fingertip lands reliably. */
  .plane-svg { width: 100%; max-width: 340px; height: auto; touch-action: manipulation; }
  .plane-svg .pl-grid { stroke: var(--qx-border-2); stroke-width: .5; opacity: .5; }
  .plane-svg .pl-axis { stroke: var(--qx-text-dim); stroke-width: 1.4; }
  .plane-svg .pl-tick { fill: var(--qx-text-faint); font-size: 11.5px; font-weight: 700; text-anchor: middle; }
  .plane-svg .pl-placed { fill: var(--qx-green, #3E9E2A); }
  .plane-svg .pl-dot { fill: var(--qx-surface); stroke: var(--qx-accent); stroke-width: 2; transition: fill .12s; }
  .plane-svg .pl-label { fill: var(--qx-text-faint); font-size: 11.5px; font-weight: 800; }
  .plane-svg .pl-hit { fill: transparent; cursor: pointer; outline: none; }
  .plane-svg .pl-choice:hover .pl-dot,
  .plane-svg .pl-hit:focus-visible + .pl-dot { fill: var(--qx-accent); }
  .plane-svg .pl-choice:hover .pl-label { fill: var(--qx-accent-text); }
  .plane-svg .pl-hit:focus-visible { outline: 2px solid var(--qx-accent); outline-offset: 1px; border-radius: 50%; }
  .plane-svg .pl-curve { fill: none; stroke: var(--qx-accent); stroke-width: 2; opacity: .75; }
  .pl-said { margin: 0; font-size: 13.5px; font-weight: 700; color: var(--qx-accent-text); background: var(--qx-accent-soft); border-radius: 8px; padding: 7px 10px; }

  .coordinate-grid { display: grid; grid-template-columns: repeat(7, 1fr); position: relative; width: min(100%, 390px); margin-bottom: 18px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); }
  .coordinate-grid button { position: relative; min-width: 0; height: 44px; padding: 0; border: 0; border-right: 1px solid var(--qx-border); border-bottom: 1px solid var(--qx-border); border-radius: 0; background: transparent; color: var(--qx-accent-text); cursor: crosshair; font-size: 15px; }
  .coordinate-grid button:hover, .coordinate-grid button:focus { background: var(--qx-accent-soft); outline: 2px solid var(--qx-accent); outline-offset: -2px; }
  .coordinate-grid button.x-axis { border-bottom: 2px solid var(--qx-text); }
  .coordinate-grid button.y-axis { border-right: 2px solid var(--qx-text); }
  .coordinate-grid button.hit { background: var(--qx-accent-soft); font-weight: 900; }
  .coordinate-grid button small { position: absolute; left: 3px; top: 3px; color: var(--qx-text-faint); font-size: 11.5px; }
  .coordinate-labels { position: absolute; left: 0; right: 0; bottom: -16px; display: grid; grid-template-columns: repeat(7, 1fr); color: var(--qx-text-faint); font-size: 11.5px; text-align: center; }
  .drill-result { margin-top: 16px; }
  .drill-status { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; width: min(100%, 390px); }
  .drill-status span, .drill-status strong { color: var(--qx-text); font-size: 15px; }
  .drill-status small { color: var(--qx-text-faint); font-size: 13px; }
  .plot-curve { fill: none; stroke: var(--qx-green); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  .predict-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; font-size: 14.5px; color: var(--qx-text-2); }
  .predict-row button { min-width: 34px; height: 30px; border: 1px solid var(--qx-border-2); border-radius: 8px; background: var(--qx-surface); color: var(--qx-text); font-weight: 800; cursor: pointer; }
  .slope-line { stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .slope-ghost { stroke: var(--qx-text-faint); stroke-width: 2; stroke-dasharray: 5 4; }
  .slope-run { stroke: var(--qx-green); stroke-width: 2; }
  .slope-rise { stroke: var(--qx-danger); stroke-width: 2; }
  .slope-small { fill: none; stroke: var(--qx-text-faint); stroke-width: 1.5; stroke-dasharray: 4 3; }
  .slope-controls { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
  .slope-controls span { display: flex; align-items: center; gap: 6px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 6px 8px; }
  .slope-controls small { font-size: 11.5px; letter-spacing: .08em; color: var(--qx-text-faint); font-weight: 900; }
  .slope-controls button { width: 28px; height: 28px; border: 1px solid var(--qx-border-2); border-radius: 7px; background: transparent; color: var(--qx-text); cursor: pointer; }
  .slope-controls b { min-width: 18px; text-align: center; color: var(--qx-accent-text); }
  .slope-read { display: flex; align-items: center; gap: 8px; font-size: 18px; }
  .slope-read i { font-style: normal; color: var(--qx-text-faint); }
  .slope-read b { color: var(--qx-accent-text); font-size: 24px; }
  .slope-read b.hit { color: var(--qx-green-text); }
  .slope-target { font-size: 12px; letter-spacing: .1em; color: var(--qx-text-faint); font-weight: 900; }
  .slope-target b { color: var(--qx-accent-text); font-size: 18px; margin-left: 6px; }

  .section-block { border-top: 1px solid var(--qx-border); padding-top: 22px; display: flex; flex-direction: column; gap: 14px; }
  .section-head { display: flex; align-items: baseline; gap: 11px; }
  .section-code { color: var(--qx-accent-text); font-size: 13.5px; font-weight: 900; letter-spacing: .1em; }
  .section-head h2 { font-size: 23px; }
  h3 { font-size: 13.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--qx-text-dim); margin-top: 6px; }
  h3 em { text-transform: none; letter-spacing: 0; font-style: normal; color: var(--qx-text-faint); font-weight: 600; }

  .sources blockquote { border-left: 2px solid var(--qx-accent); padding: 2px 0 2px 13px; margin-bottom: 9px; }
  .sources p { color: var(--qx-text-2); font-size: 14px; line-height: 1.55; font-style: italic; }
  .sources cite { display: block; margin-top: 5px; font-size: 13px; color: var(--qx-text-faint); font-style: normal; font-weight: 700; }
  .sources cite a { color: var(--qx-accent-text); text-underline-offset: 2px; }
  .source-change { display: block; margin-top: 4px; color: var(--qx-text-faint); font-size: 12px; line-height: 1.4; }

  .variant-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 12px; }
  .variant { border: 1px solid var(--qx-border); border-radius: 15px; background: var(--qx-surface); padding: 13px; display: flex; flex-direction: column; gap: 9px; }
  .code { align-self: flex-start; border: 1px solid var(--qx-border-2); border-radius: 7px; padding: 3px 8px; font-size: 13px; font-weight: 900; letter-spacing: .07em; color: var(--qx-accent-text); }
  .reading-text { color: var(--qx-text-2); font-size: 15px; line-height: 1.55; }
  .note { color: var(--qx-text-faint); font-size: 13.5px; line-height: 1.45; }
  .reading-text.verbatim { font-style: italic; border-left: 2px solid var(--qx-accent); padding-left: 12px; }
  .verbatim-tag { font-size: 13px; letter-spacing: .06em; font-weight: 800; color: var(--qx-accent-text); }

  .stage { border: 1px solid var(--qx-border); border-radius: 13px; background: var(--qx-surface-2); padding: 13px; display: flex; flex-direction: column; gap: 11px; min-height: 210px; justify-content: center; }
  .rows { display: flex; flex-direction: column; gap: 9px; }
  .rows.centre { align-items: center; justify-content: center; flex: 1; }
  .row { display: flex; align-items: center; gap: 7px; }
  .row.wrap { flex-wrap: wrap; }
  .row small { font-size: 12px; letter-spacing: .1em; color: var(--qx-text-faint); width: 56px; font-weight: 900; }
  .stage-note { font-size: 13.5px; color: var(--qx-text-faint); line-height: 1.4; }

  .chip { min-width: 34px; height: 34px; padding: 0 9px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); }
  .chip.let { font-style: italic; font-family: Georgia, serif; color: var(--qx-accent-text); }
  .chip.sortable { flex-direction: column; height: auto; padding: 6px 11px; gap: 2px; cursor: pointer; color: var(--qx-text); }
  .chip.sortable em { font-style: normal; font-size: 12px; letter-spacing: .08em; color: var(--qx-text-faint); font-weight: 700; }
  .chip.sortable.fixed { border-color: var(--qx-text-dim); }
  .chip.sortable.varies { border-color: var(--qx-accent); background: var(--qx-accent-soft); }

  .value-card { border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); border-radius: 12px; padding: 15px 22px; font-size: 25px; font-weight: 900; }
  .value-card.ghost { border-style: dashed; border-color: var(--qx-border-2); background: transparent; color: var(--qx-text-faint); font-size: 17px; padding: 9px 15px; }
  .ghost-wrap { display: flex; align-items: center; gap: 11px; }
  .pair { display: flex; align-items: center; gap: 9px; }
  .card { border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 13px 19px; font-size: 22px; font-weight: 900; background: var(--qx-surface); }
  .card.sym { font-family: Georgia, serif; font-style: italic; color: var(--qx-accent-text); }
  .joiner { width: 26px; height: 1px; background: var(--qx-border-2); }

  .square-figure { display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; }
  .square { border: 3px solid var(--qx-accent); background: var(--qx-accent-soft); border-radius: 5px; transition: width .12s, height .12s; }
  .ghost-square { position: absolute; top: 0; border-style: dashed; border-color: var(--qx-border-2); background: transparent; }
  .edge-label { display: flex; align-items: center; justify-content: center; gap: 9px; font: italic 800 24px/1 Georgia, serif; color: var(--qx-accent-text); transition: width .12s; }
  .edge-label::before, .edge-label::after { content: ''; flex: 1; height: 1px; background: var(--qx-border-2); }

  .range-row { display: grid; grid-template-columns: 30px 1fr 30px; align-items: center; gap: 8px; font-size: 13px; color: var(--qx-text-faint); font-weight: 800; }
  .range-row span:last-child { text-align: right; }
  input[type='range'] { width: 100%; accent-color: var(--qx-accent); cursor: pointer; }

  .prompt { font-size: 15px; font-weight: 800; line-height: 1.45; }
  .options { display: grid; gap: 7px; }
  .options button { min-height: 44px; border-radius: 11px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 14px; font-weight: 800; cursor: pointer; padding: 8px 12px; text-align: left; }
  .options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .options button.wrong { border-color: var(--qx-danger); }
  .fb { font-size: 14.5px; line-height: 1.45; color: var(--qx-danger-text); background: var(--qx-danger-soft); border-radius: 9px; padding: 9px 11px; }
  .stepper { display: flex; align-items: center; gap: 10px; }
  .stepper button { width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); font-size: 22px; font-weight: 900; cursor: pointer; }
  .stepper button:active { background: var(--qx-accent-soft); }
  .stepper-value { flex: 1; text-align: center; font-size: 20px; font-weight: 900; color: var(--qx-accent-text); }

  .tray { display: flex; flex-wrap: wrap; gap: 7px; min-height: 44px; align-items: center; }
  .tray-empty { font-size: 13.5px; color: var(--qx-text-faint); font-weight: 700; }
  .chip.pick { min-width: 44px; min-height: 44px; height: auto; padding: 8px 12px; border-radius: 10px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); font-size: 17px; line-height: 1.25; text-align: center; font-weight: 900; cursor: pointer; }
  .chip.pick.up { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); transform: translateY(-3px); }
  .bins { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
  .bin { min-height: 74px; border: 1px dashed var(--qx-border-2); border-radius: 12px; background: var(--qx-surface-2); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; cursor: pointer; padding: 9px; }
  .bin.armed { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .bin small { font-size: 12px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .bin-items { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .bin-items em { font-style: normal; font-weight: 900; font-size: 15px; color: var(--qx-green-text); }
  .bin-items em.wrong { color: var(--qx-danger-text); text-decoration: line-through; }

  .order-list { display: flex; flex-direction: column; gap: 6px; }
  .order-row { display: flex; align-items: center; gap: 9px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 8px 10px; background: var(--qx-surface-2); font-size: 15px; font-weight: 700; }
  .order-row span:first-child { flex: 1; }
  .order-btns { display: flex; gap: 5px; }
  .order-btns button { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); cursor: pointer; font-weight: 900; }
  .order-btns button:disabled { opacity: .3; cursor: default; }

  .letters { display: flex; gap: 9px; flex-wrap: wrap; }
  .letter-slot { position: relative; flex: 1 1 84px; }
  .letter-slot .slot-hit { width: 100%; min-height: 66px; border: 1px dashed var(--qx-border-2); border-radius: 12px; background: var(--qx-surface-2); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; cursor: pointer; color: var(--qx-text); }
  .letter-slot.armed .slot-hit { border-color: var(--qx-accent); }
  .letter-slot.filled .slot-hit { border-style: solid; border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .letter-slot b { font: italic 800 22px/1 Georgia, serif; color: var(--qx-accent-text); }
  .letter-slot span { font-size: 13.5px; font-weight: 800; color: var(--qx-text-dim); }
  .clear { position: absolute; top: -6px; right: -6px; width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); cursor: pointer; font-size: 14.5px; line-height: 1; }
  .goals { list-style: none; display: flex; flex-direction: column; gap: 5px; }
  .goals li { display: flex; align-items: center; gap: 8px; font-size: 14.5px; color: var(--qx-text-2); }
  .goals li i { font-style: normal; color: var(--qx-text-faint); font-weight: 900; }
  .goals li.met { color: var(--qx-green-text); }
  .goals li.met i { color: var(--qx-green); }
  .bench-row { display: flex; align-items: center; gap: 9px; }
  .bench-row small { width: 44px; font-size: 12px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .bench-row button { width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); font-size: 19px; font-weight: 900; cursor: pointer; }
  .bench-row b { flex: 1; text-align: center; font-size: 19px; }
  .bench-row.locked button { border-style: dashed; color: var(--qx-text-faint); }
  .bench-row.locked b { color: var(--qx-text-dim); }
  .dial-out { display: flex; gap: 10px; }
  .dial-out span { flex: 1; display: flex; flex-direction: column; gap: 3px; border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 9px 12px; background: var(--qx-surface); }
  .dial-out small { font-size: 11.5px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .dial-out b { font-size: 20px; }
  .dial-out b.accent { color: var(--qx-accent-text); }
  .refusal { font-size: 14.5px; line-height: 1.5; color: var(--qx-danger-text); background: var(--qx-danger-soft); border-radius: 9px; padding: 9px 11px; font-weight: 700; }
  .stepper-value em { display: block; font-style: normal; font-size: 14.5px; font-weight: 800; color: var(--qx-text-dim); margin-top: 2px; }
  .expand-top { display: flex; align-items: center; gap: 4px; }
  .expand-arrow { color: var(--qx-text-faint); font-size: 20px; }
  .expand-sum { display: flex; align-items: center; gap: 8px; font-size: 21px; font-weight: 900; }
  .expand-sum i { font-style: normal; color: var(--qx-text-faint); font-weight: 700; }
  .expand-sum b.accent { color: var(--qx-accent-text); }
  .applied-row { display: flex; align-items: center; gap: 10px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 9px 11px; background: var(--qx-surface); }
  .applied-row b { min-width: 34px; font-size: 17px; color: var(--qx-accent-text); }
  .applied-row span { flex: 1; font-size: 14px; font-weight: 800; }
  .applied-row em { font-style: normal; font-size: 12px; letter-spacing: .07em; font-weight: 800; color: var(--qx-text-faint); }
  .build-line { display: flex; align-items: center; gap: 4px; }
  .glyph-sm { min-width: 46px; height: 56px; border: 2px solid var(--qx-accent); border-radius: 11px; background: var(--qx-accent-soft); color: var(--qx-accent-text); display: grid; place-items: center; font-size: 28px; font-weight: 900; padding: 0 10px; }
  .glyph-sm.let { font: italic 800 28px/1 Georgia, serif; }
  .glyph-sm.empty { border-style: dashed; border-color: var(--qx-border-2); background: transparent; color: var(--qx-text-faint); }
  .build-read { font-size: 15px; font-weight: 800; color: var(--qx-text-2); }
  .pair-row { display: flex; align-items: center; gap: 9px; font-size: 15px; }
  .pair-row b { min-width: 52px; font-size: 15px; color: var(--qx-accent-text); }
  .pair-row i { font-style: normal; color: var(--qx-text-faint); }
  .ok { font-size: 14.5px; line-height: 1.45; color: var(--qx-green-text); background: var(--qx-green-soft); border-radius: 9px; padding: 8px 11px; }

  /* Functions boards. */
  .work-lines { display: flex; flex-direction: column; gap: 5px; font-size: 14px; color: var(--qx-text-2); }
  .work-lines b { font-size: 19px; color: var(--qx-accent-text); }
  .machine-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .machine { flex: 1; min-width: 128px; display: flex; flex-direction: column; align-items: center; gap: 7px; border: 1px solid var(--qx-border-2); border-radius: 12px; padding: 11px 9px; }
  .machine .port { font-size: 16px; font-weight: 800; color: var(--qx-text-2); }
  .machine .port.out { font-size: 21px; color: var(--qx-accent-text); }
  .machine .port.empty { font-size: 14.5px; font-weight: 700; color: var(--qx-text-faint); }
  .machine .plate { font-size: 13.5px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: var(--qx-text-dim); border-top: 1px dashed var(--qx-border-2); border-bottom: 1px dashed var(--qx-border-2); padding: 5px 0; width: 100%; text-align: center; }
  .fork { display: flex; gap: 14px; align-items: center; }
  .plates { display: flex; gap: 6px; flex-wrap: wrap; }
  .plate-pick { font-size: 13.5px; }
  .io-table { border-collapse: collapse; font-size: 15px; align-self: flex-start; }
  .io-table th { font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--qx-text-faint); text-align: left; padding: 0 16px 4px 0; font-weight: 800; }
  .io-table td { padding: 2px 16px 2px 0; color: var(--qx-text-2); }
  .io-table b { color: var(--qx-accent-text); font-size: 15px; }
  .readouts { display: flex; gap: 8px; flex-wrap: wrap; }
  .readout { flex: 1; min-width: 96px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 8px 9px; }
  .readout.live { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .readout.revealed { border-color: var(--qx-accent); }
  .guess { display: flex; gap: 4px; margin-top: 3px; }
  .guess .chip { font-size: 13px; padding: 3px 7px; }

  .ladder-svg { width: 100%; max-width: 300px; height: auto; }
  .ladder-svg .wall { fill: var(--qx-surface-2); stroke: var(--qx-border-2); stroke-width: 1; }
  .ladder-svg .brick { stroke: var(--qx-text-faint); stroke-width: .6; opacity: .55; }
  .ladder-svg .floor { stroke: var(--qx-text-dim); stroke-width: 2; }
  .ladder-svg .plaque { fill: var(--qx-surface); stroke: var(--qx-text-faint); stroke-width: .8; }
  .ladder-svg .plaque-text { fill: var(--qx-text-dim); font-size: 11px; font-weight: 800; text-anchor: middle; }
  .ladder-svg .ladder { stroke: var(--qx-accent); stroke-width: 3.5; stroke-linecap: round; }
  .ladder-svg .ladder.rail { stroke-width: 2; opacity: .55; }
  .ladder-svg .foot { fill: var(--qx-accent); }
  .ladder-svg .hmark { stroke: var(--qx-accent); stroke-width: 1.5; stroke-dasharray: 3 2; }
  .ladder-svg .hmark-text { fill: var(--qx-accent-text); font-size: 12px; font-weight: 800; }
  .readout small { display: block; font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .readout b { font-size: 18px; color: var(--qx-accent-text); }
  .cycle { cursor: pointer; }
  .rule-card { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 9px 11px; }
  .rule-card b { font-size: 15px; flex: 1; min-width: 132px; }
  .rule-card em { font-style: normal; font-size: 13.5px; color: var(--qx-text-faint); }
  .rule-card.passed { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .rule-card.failed { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .verdict { display: flex; gap: 5px; }
  .accept-strip { display: flex; align-items: center; gap: 11px; border: 1px dashed var(--qx-border-2); border-radius: 10px; padding: 9px 11px; font-size: 15px; }
  .accept-strip span { font-size: 18px; font-weight: 800; min-width: 34px; }
  .accept-strip b { color: var(--qx-text-faint); }
  .accept-strip.ok { border-style: solid; border-color: var(--qx-green); }
  .accept-strip.ok b { color: var(--qx-green-text); }

  /* Foundations: roots. */
  .both-arrows { display: flex; align-items: center; gap: 13px; }
  .both-arrows .node { display: flex; flex-direction: column; align-items: center; gap: 3px; border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 9px 15px; }
  .both-arrows .node small { font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .both-arrows .node b { font-size: 25px; color: var(--qx-accent-text); }
  .both-arrows .arrows { display: flex; flex-direction: column; gap: 3px; }
  .both-arrows .arrows em { font-style: normal; font-size: 13px; font-weight: 800; color: var(--qx-text-faint); }

  /* Two Inches and Two Feet. */
  .work-lines b.falling { color: var(--qx-accent-text); }
  .grow-row { display: flex; align-items: center; gap: 10px; }
  .grow-row small { min-width: 42px; font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .grow-row b { font-size: 15px; color: var(--qx-accent-text); min-width: 78px; }
  .gbar { position: relative; flex: 1; height: 18px; border-radius: 4px; background: var(--qx-surface-2); overflow: hidden; }
  .gbar i { position: absolute; left: 0; top: 0; bottom: 0; background: var(--qx-border-2); }
  .gbar em { position: absolute; top: 0; bottom: 0; background: var(--qx-accent); }
  .pt-pair { display: flex; gap: 14px; }
  .pt-one { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; border: 1px solid var(--qx-border-2); border-radius: 12px; padding: 10px 8px; }
  .pt-one small { font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .pt-one b { font-size: 14.5px; color: var(--qx-text-2); }
  .pt-one em { font-style: normal; font-size: 13px; color: var(--qx-text-faint); }
  .pt-one strong { font-size: 15px; color: var(--qx-accent-text); }
  .pt-bar { width: 26px; height: 76px; display: flex; align-items: flex-end; border-bottom: 2px solid var(--qx-text-dim); }
  .pt-bar i { width: 100%; background: var(--qx-accent-soft); border-top: 2px solid var(--qx-accent); transition: height .5s ease; }
  .pt-bar i.racing { animation: grow-race 2.6s ease-in-out infinite alternate; }
  @keyframes grow-race { from { height: 30%; } to { height: 78%; } }
  .io-table td.blank { color: var(--qx-text-faint); }
  .gb-num { min-width: 26px; text-align: center; }
  .gb-rate { font-size: 14.5px; color: var(--qx-accent-text); }

  /* Foundations: the number line. */
  .numline.walk { padding-top: 26px; }
  .numline .tick.neg small { color: var(--qx-accent-text); }
  .numline .tick.zero i { height: 20px; background: var(--qx-accent); width: 2px; }
  .numline .tick.zero small { color: var(--qx-accent-text); font-weight: 900; }
  .numline .walker { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-style: normal; font-size: 15px; color: var(--qx-accent); }
  .numline .tick { position: relative; }

  /* Foundations: number. */
  .pair-rows { display: flex; flex-direction: column; gap: 14px; }
  .prow { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .tok { font-size: 24px; line-height: 1; border: 0; background: transparent; padding: 2px; cursor: default; opacity: .45; transition: opacity .12s; }
  .tok.rider { cursor: pointer; }
  .tok.linked { opacity: 1; }
  .tok.faded { opacity: .3; }
  .tok.sm { font-size: 17px; opacity: 1; }
  .basket { display: flex; gap: 5px; flex-wrap: wrap; min-height: 26px; border: 1px dashed var(--qx-border-2); border-radius: 10px; padding: 7px 9px; }
  .basket i { width: 13px; height: 13px; border-radius: 50%; background: var(--qx-accent); }
  .coll { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
  .coll small { font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; min-width: 58px; }
  .pm { display: flex; gap: 5px; }
  .pm button { width: 26px; height: 26px; border-radius: 7px; border: 1px solid var(--qx-border-2); background: transparent; color: var(--qx-text); cursor: pointer; }
  .shared { font-size: 14.5px; font-weight: 700; color: var(--qx-text-faint); border-top: 1px dashed var(--qx-border-2); padding-top: 9px; }
  .shared.agreed { color: var(--qx-green-text); }
  .figure-big { font-size: 54px; font-weight: 900; color: var(--qx-accent-text); line-height: 1; }
  .fig-row { display: flex; gap: 7px; flex-wrap: wrap; }
  .fig { display: flex; flex-direction: column; align-items: center; gap: 2px; border: 1px solid var(--qx-border-2); border-radius: 8px; padding: 6px 8px; min-width: 30px; }
  .fig b { font-size: 17px; color: var(--qx-accent-text); }
  .fig em { font-style: normal; font-size: 11px; color: var(--qx-text-faint); letter-spacing: -1px; max-width: 26px; text-align: center; line-height: 1; }

  /* Foundations: decimals. */
  .numline { position: relative; display: flex; justify-content: space-between; align-items: flex-end; padding: 18px 6px 4px; border-bottom: 2px solid var(--qx-text-dim); }
  .numline .tick { display: flex; flex-direction: column; align-items: center; gap: 3px; }
  .numline .tick i { width: 1px; height: 8px; background: var(--qx-border-2); }
  .numline .tick.whole i { width: 2px; height: 14px; background: var(--qx-text-dim); }
  .numline .tick small { font-size: 12px; color: var(--qx-text-faint); font-weight: 700; }
  .numline .tick.whole small { color: var(--qx-text-2); font-weight: 800; }
  .numline.compare { padding-top: 34px; }
  .numline .mk { position: absolute; top: 4px; transform: translateX(-50%); font-style: normal; font-size: 13px; font-weight: 800; padding: 2px 5px; border-radius: 5px; }
  .numline .mk.a { background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .numline .mk.b { background: var(--qx-green-soft); color: var(--qx-green-text); top: 20px; }
  .jug { position: relative; width: 78px; height: 130px; border: 2px solid var(--qx-text-dim); border-top: 0; border-radius: 0 0 12px 12px; display: flex; align-items: flex-end; }
  .jug i { display: block; width: 100%; background: var(--qx-accent-soft); border-top: 2px solid var(--qx-accent); }
  .jug-mark { position: absolute; left: 100%; transform: translateY(50%); padding-left: 5px; }
  .jug-mark small { font-size: 12px; color: var(--qx-text-faint); font-weight: 800; }
  .unit-bar { display: flex; border: 2px solid var(--qx-accent); border-radius: 8px; overflow: hidden; }
  .unit-bar .seg { flex: 1; height: 40px; border: 0; border-right: 1px solid var(--qx-accent); background: transparent; cursor: pointer; padding: 0; }
  .unit-bar .seg:last-child { border-right: 0; }
  .unit-bar .seg.on { background: var(--qx-accent); }
  .cols { display: flex; gap: 7px; }
  .cols .col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 9px 6px; background: transparent; cursor: pointer; }
  .cols .col small { font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .cols .col b { font-size: 24px; color: var(--qx-text-faint); }
  .cols .col.here { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .cols .col.here b { color: var(--qx-accent-text); }

  /* What a Button Does. */
  .lamp { width: 74px; height: 74px; border-radius: 50%; display: grid; place-items: center; font-size: 14.5px; font-weight: 900; letter-spacing: .08em; border: 2px solid var(--qx-border-2); color: var(--qx-text-faint); transition: background .12s, color .12s, border-color .12s; }
  .lamp.lit { background: var(--qx-accent-soft); border-color: var(--qx-accent); color: var(--qx-accent-text); box-shadow: 0 0 0 7px var(--qx-accent-soft); }
  .switch-body {
    width: 112px;
    min-height: 164px;
    padding: 5px 6px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    border: 1px solid transparent;
    border-radius: 14px;
    background: transparent;
    color: var(--qx-text-dim);
    cursor: pointer;
    touch-action: manipulation;
    transition: transform .12s ease, border-color .12s ease, background .12s ease;
  }
  .switch-body:hover { background: var(--qx-surface-2); }
  .switch-body:active { transform: scale(.97); }
  .switch-body:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }
  .switch-body.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .switch-body img {
    width: 96px;
    height: 138px;
    display: block;
    object-fit: contain;
    image-rendering: pixelated;
    pointer-events: none;
    user-select: none;
  }
  .switch-body small {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .07em;
    color: var(--qx-text-faint);
  }
  .switch-body.on small { color: var(--qx-accent-text); }
  .flow-row { display: flex; align-items: baseline; gap: 7px; }
  .flow-row b { font-size: 25px; color: var(--qx-accent-text); }
  .flow-row small { font-size: 13.5px; color: var(--qx-text-faint); }
  .flow-bar { height: 9px; border-radius: 5px; background: var(--qx-surface-2); overflow: hidden; }
  .flow-bar i { display: block; height: 100%; background: var(--qx-accent); }
  .panel { display: flex; gap: 6px; flex-wrap: wrap; }
  .panel-btn { min-width: 46px; padding: 8px 9px; border: 1px solid var(--qx-border-2); border-radius: 9px; background: transparent; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .panel-btn b { font-size: 15px; color: var(--qx-accent-text); }
  .panel-btn em { font-style: normal; font-size: 13px; color: var(--qx-text-faint); }
  .panel-btn.sm { min-width: 40px; padding: 6px 7px; }
  .io-table b.two { color: var(--qx-accent-text); background: var(--qx-accent-soft); border-radius: 5px; padding: 1px 5px; }

  @media (prefers-reduced-motion: reduce) {
    .switch-body { transition: none; }
  }

  .kind-note { font-size: 14.5px; color: var(--qx-text-dim); line-height: 1.5; }
  .kind-note b { color: var(--qx-text-dim); }
  .kind-note b.hit { color: var(--qx-green-text); }

  .gate { border: 1px dashed var(--qx-danger); border-radius: 11px; padding: 11px 13px; background: var(--qx-danger-soft); color: var(--qx-danger-text); font-size: 14.5px; line-height: 1.5; font-weight: 700; margin-top: 14px; }
  .mini-svg .train { fill: var(--qx-accent); }
  .mode-switch { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
  .mode-switch button { display: flex; flex-direction: column; gap: 3px; align-items: flex-start; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); border-radius: 12px; padding: 10px 15px; cursor: pointer; font-weight: 900; font-size: 15px; }
  .mode-switch button em { font-style: normal; font-size: 13px; font-weight: 700; color: var(--qx-text-faint); }
  .mode-switch button.on { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .curriculum-drawer { border: 1px solid var(--qx-border); border-radius: 14px; background: var(--qx-surface-2); }
  .curriculum-drawer > summary { min-height: 44px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; color: var(--qx-text); cursor: pointer; font-size: 13.5px; font-weight: 900; letter-spacing: .06em; list-style-position: inside; }
  .curriculum-drawer > summary span { color: var(--qx-text-faint); font-size: 12px; font-weight: 700; letter-spacing: 0; text-align: right; }
  .curriculum-drawer-body { border-top: 1px solid var(--qx-border); padding: 14px; display: grid; gap: 18px; }
  .warn { color: var(--qx-danger-text); background: var(--qx-danger-soft); border: 1px solid var(--qx-danger); border-radius: 11px; padding: 11px 13px; font-size: 15px; line-height: 1.55; font-weight: 700; margin-bottom: 12px; }
  .bb-switch { display: flex; gap: 8px; flex-wrap: wrap; }
  .bb-switch button { display: flex; flex-direction: column; gap: 3px; align-items: flex-start; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); border-radius: 12px; padding: 9px 14px; cursor: pointer; font-weight: 900; font-size: 14.5px; }
  .bb-switch button em { font-style: normal; font-size: 13px; font-weight: 700; color: var(--qx-text-faint); }
  .bb-switch button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  /* Units. A unit is a group of boards that may not be reordered or split. */
  .tag-figure { align-self: flex-start; font-size: 12px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; color: var(--qx-text-faint); border: 1px dashed var(--qx-border-2); border-radius: 6px; padding: 2px 6px; margin-top: -4px; }

  .unit { display: flex; flex-direction: column; gap: 8px; }
  .unit-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
  .unit-head h3 { font-size: 13.5px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: var(--qx-text-2); margin: 0; }
  .unit-head em { font-style: normal; font-size: 13.5px; color: var(--qx-text-faint); }
  .bb-switch.sequence { position: relative; padding-left: 11px; border-left: 2px solid var(--qx-accent); }
  .bb-switch button .step { font-style: normal; position: absolute; margin: -3px 0 0 -26px; width: 16px; height: 16px; border-radius: 50%; background: var(--qx-accent); color: #fff; font-size: 12px; display: grid; place-items: center; }
  .bb-switch.sequence button { position: relative; margin-left: 12px; }

  .chain { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; margin: 2px 0 4px; }
  .chain-arrow { color: var(--qx-text-faint); font-size: 15px; }
  .chain-link { display: flex; align-items: center; gap: 6px; border: 1px solid var(--qx-border-2); background: transparent; color: var(--qx-text-dim); border-radius: 999px; padding: 4px 11px 4px 4px; font-size: 13.5px; font-weight: 800; cursor: pointer; }
  .chain-link i { font-style: normal; width: 17px; height: 17px; border-radius: 50%; background: var(--qx-surface-2); color: var(--qx-text-2); font-size: 12px; display: grid; place-items: center; }
  .chain-link.here { border-color: var(--qx-accent); color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .chain-link.here i { background: var(--qx-accent); color: #fff; }

  .mini-svg { width: 100%; max-width: 300px; height: auto; }
  .mini-svg .ax { fill: none; stroke: var(--qx-text-dim); stroke-width: 2; stroke-linecap: round; }
  .mini-svg text { fill: var(--qx-text-faint); font-size: 13.5px; text-anchor: middle; font-weight: 700; }
  .mini-svg .gap { fill: none; stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .mini-svg .old { fill: var(--qx-text-faint); }
  .mini-svg .new { fill: var(--qx-accent); }
  .decomp .base { fill: var(--qx-accent-soft); stroke: var(--qx-accent); stroke-width: 2; }
  .decomp .grow { fill: none; stroke: var(--qx-green); stroke-width: 2; stroke-dasharray: 5 4; }

  .mini-svg .curve { fill: none; stroke: var(--qx-text-dim); stroke-width: 2.5; }
  .mini-svg .sec { fill: none; stroke: var(--qx-accent); stroke-width: 2.5; stroke-linecap: round; }

  .ratio { display: flex; align-items: center; gap: 13px; }
  .frac { display: flex; flex-direction: column; gap: 5px; }
  .frac span { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  .frac small { font-size: 11.5px; letter-spacing: .1em; color: var(--qx-text-faint); font-weight: 900; }
  .frac b { font-size: 19px; }
  .frac i { height: 1px; background: var(--qx-text-dim); display: block; }
  .eq { font-size: 19px; color: var(--qx-text-dim); font-weight: 900; }
  .ratio-out { display: flex; flex-direction: column; align-items: flex-start; border-left: 1px solid var(--qx-border-2); padding-left: 13px; }
  .ratio-out b { font-size: 26px; color: var(--qx-accent-text); }
  .ratio-out small { font-size: 12px; letter-spacing: .09em; color: var(--qx-text-faint); font-weight: 900; }

  .formula { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center; font-size: 15px; font-weight: 800; }
  .formula i { font-style: normal; color: var(--qx-text-faint); }
  .formula b { font-size: 21px; color: var(--qx-accent-text); }
  .ladder-row { display: flex; justify-content: space-between; gap: 12px; border: 1px solid var(--qx-border); border-radius: 9px; padding: 7px 11px; font-size: 14.5px; }
  .ladder-row small { color: var(--qx-text-faint); font-weight: 900; letter-spacing: .07em; }
  .ladder-row.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .bar-row { display: flex; align-items: center; gap: 9px; }
  .bar-row small { width: 54px; font-size: 12px; letter-spacing: .1em; color: var(--qx-text-faint); font-weight: 900; }
  .bar-row b { font-size: 15px; }
  .bar { height: 15px; border-radius: 5px; background: var(--qx-accent); display: inline-block; min-width: 2px; }
  .bar.diff { background: var(--qx-green); }
  .glyph { display: flex; flex-direction: column; align-items: center; gap: 7px; border: 2px solid var(--qx-accent); border-radius: 14px; padding: 18px 30px; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 40px; font-weight: 900; }
  .glyph em { font-style: normal; font-size: 13.5px; letter-spacing: .1em; font-weight: 800; }
  .card em { display: block; font-style: normal; font-size: 12px; letter-spacing: .1em; color: var(--qx-text-faint); font-weight: 800; margin-top: 3px; }
  .card.locked { opacity: .82; }
  .machine-box { border: 1px dashed var(--qx-border-2); border-radius: 9px; padding: 9px 12px; font-size: 13.5px; font-weight: 800; color: var(--qx-text-dim); }
  .square.area { display: grid; place-items: center; }
  .square.area span { font-size: 14px; font-weight: 900; color: var(--qx-accent-text); }
  .square.area.small { border-color: var(--qx-text-faint); background: transparent; }
  .edge-label.sm { font: italic 800 14px/1 Georgia, serif; gap: 6px; }

  .variant.selected { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .data-stage { width: 100%; }
  .data-picks { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; }
  .data-picks .chip { min-width: 44px; min-height: 44px; height: auto; }
  .data-card { display: grid; grid-template-columns: repeat(3, minmax(70px, 1fr)); gap: 8px; width: min(100%, 430px); }
  .data-card strong { grid-column: 1 / -1; color: var(--qx-accent-text); font-size: 20px; }
  .data-card span { display: grid; gap: 3px; border: 1px solid var(--qx-border); border-radius: 9px; padding: 9px; background: var(--qx-surface); font-weight: 900; text-align: center; }
  .data-card small { color: var(--qx-text-faint); font-size: 11.5px; letter-spacing: .09em; text-transform: uppercase; }
  .data-grid { width: min(100%, 520px); }
  .data-grid tr.active > *, .data-grid .active { background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .data-grid td.missing { border: 2px dashed var(--qx-accent); color: var(--qx-accent-text); font-weight: 900; }
  .data-sort { display: grid; grid-template-columns: repeat(3, minmax(90px, 1fr)); gap: 8px; width: min(100%, 430px); }
  .data-sort-card { display: grid; gap: 5px; border: 1px solid var(--qx-border-2); border-radius: 11px; padding: 12px 8px; background: var(--qx-surface); color: var(--qx-text); cursor: pointer; }
  .data-sort-card b { font-size: 15px; }
  .data-sort-card small { color: var(--qx-text-faint); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
  .data-sort-card.right { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .stage-note.success { color: var(--qx-green-text); font-weight: 800; }
  .variant.selected .code { border-color: var(--qx-green); color: var(--qx-green-text); }
  .flow { display: flex; align-items: center; gap: 10px; }
  .flow-card { display: flex; flex-direction: column; gap: 3px; border: 2px solid var(--qx-accent); border-radius: 12px; padding: 11px 15px; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 17px; font-weight: 900; }
  .flow-card.dep { border-style: dashed; border-color: var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); }
  .flow-card em { font-style: normal; font-size: 11.5px; letter-spacing: .09em; color: var(--qx-text-faint); font-weight: 800; }
  .flow-arrow { position: relative; color: var(--qx-text-faint); font-size: 22px; width: 42px; text-align: center; }
  .flow-arrow i { position: absolute; left: 0; top: 50%; width: 9px; height: 9px; border-radius: 50%; background: var(--qx-accent); transform: translateY(-50%); animation: pulse-right .55s ease-out; }
  @keyframes pulse-right { from { left: 0; opacity: 1; } to { left: 34px; opacity: 0; } }
  .ticker-demo { gap: 16px; }
  .counter-shell { width: min(100%, 440px); padding: 12px 14px 10px; border: 1px solid #171819; border-radius: 18px; background: linear-gradient(145deg, #45423d 0%, #292a2a 48%, #1d1f20 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(0,0,0,.7), 0 15px 28px rgba(24,19,14,.2); }
  .counter-header { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 8px; padding: 0 2px 10px; color: #e9e1d3; }
  .counter-header > strong { font-size: 12px; letter-spacing: .16em; text-align: center; }
  .counter-live, .counter-model { font-size: 11px; letter-spacing: .12em; font-weight: 900; color: #aaa49b; }
  .counter-live { display: flex; align-items: center; gap: 5px; }
  .counter-live i { width: 6px; height: 6px; border-radius: 50%; background: #8db65e; box-shadow: 0 0 7px rgba(141,182,94,.85); }
  .counter-model { text-align: right; }
  .ticker-pair { display: grid; grid-template-columns: minmax(96px, 1fr) minmax(72px, auto) minmax(96px, 1fr); align-items: center; gap: 10px; width: 100%; }
  .ticker-unit { display: grid; justify-items: center; gap: 6px; min-width: 0; border: 1px solid #8c8579; border-radius: 12px; padding: 10px 9px 9px; background: linear-gradient(145deg, #e7dfd1, #bbb2a4); box-shadow: inset 0 1px 0 rgba(255,255,255,.85), inset 0 -2px 5px rgba(45,38,31,.15), 0 5px 10px rgba(0,0,0,.25); }
  .ticker-unit.independent { border-color: #bb765b; box-shadow: inset 0 1px 0 rgba(255,255,255,.85), inset 0 -2px 5px rgba(45,38,31,.15), 0 0 0 1px rgba(187,118,91,.3), 0 5px 10px rgba(0,0,0,.25); }
  .counter-label { width: 100%; display: flex; align-items: baseline; justify-content: space-between; gap: 5px; color: #38342e; }
  .counter-label b { font-family: Georgia, serif; font-style: italic; font-size: 23px; line-height: 1; color: #703c2d; }
  .counter-label small { font-size: 11px; letter-spacing: .1em; font-weight: 900; color: #686158; white-space: nowrap; }
  .ticker-unit em { font-size: 11px; letter-spacing: .06em; font-style: normal; font-weight: 900; color: #625b52; text-transform: uppercase; }
  .ticker-button { width: 42px; height: 25px; display: grid; place-items: center; border: 1px solid #777067; border-radius: 6px; background: linear-gradient(#f6efe3, #b8aea0); box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 2px 2px rgba(35,31,27,.25); color: #513b33; cursor: pointer; font-size: 13px; }
  .ticker-button span { transform: translateY(-1px); }
  .ticker-button:hover:not(:disabled), .ticker-button:focus-visible { border-color: #9e513b; background: linear-gradient(#fff5e8, #cf9b86); color: #6e2f20; outline: 2px solid rgba(187,118,91,.35); outline-offset: 2px; }
  .ticker-button:active:not(:disabled) { transform: translateY(1px); box-shadow: inset 0 1px 2px rgba(35,31,27,.25); }
  .ticker-button:disabled { opacity: .32; cursor: default; }
  .ticker-button.spacer { visibility: hidden; }
  .number-ticker { position: relative; width: 82px; height: 96px; overflow: hidden; border: 3px solid #57534d; border-radius: 7px; background: #101214; box-shadow: inset 0 12px 15px rgba(0,0,0,.85), inset 0 -12px 15px rgba(0,0,0,.85), 0 1px 0 rgba(255,255,255,.55); cursor: ns-resize; }
  .number-ticker::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(rgba(0,0,0,.72), transparent 31%, transparent 69%, rgba(0,0,0,.72)); }
  .number-ticker:focus-visible { outline: 3px solid rgba(202,129,100,.55); border-color: #c77e61; }
  .number-ticker.locked { cursor: default; border-color: #6b675f; }
  .ticker-stack { height: 96px; display: grid; grid-template-rows: 26px 44px 26px; align-items: center; justify-items: center; animation: ticker-settle .24s ease-out; font-family: 'Courier New', monospace; font-variant-numeric: tabular-nums; }
  .ticker-stack span { color: #827f77; font-size: 14px; letter-spacing: .08em; opacity: .55; }
  .ticker-stack strong { width: 100%; padding: 7px 0; border-top: 1px solid #504d47; border-bottom: 1px solid #504d47; color: #f2ead8; text-shadow: 0 0 8px rgba(255,236,191,.2); font-size: 28px; letter-spacing: .08em; text-align: center; }
  .ticker-rule { display: grid; justify-items: center; gap: 7px; color: #e9e1d3; font-weight: 900; }
  .ticker-rule small { font-size: 11px; letter-spacing: .14em; color: #9c978f; }
  .ticker-rule span { padding: 8px 9px; border: 1px solid #5b5d5d; border-radius: 6px; background: #151718; box-shadow: inset 0 1px 4px rgba(0,0,0,.8); color: #f0d9c2; font-family: Georgia, serif; font-size: 15px; white-space: nowrap; }
  .ticker-rule i { font-style: normal; font-size: 19px; color: #c77e61; }
  .counter-legend { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,.1); color: #aaa49b; font-size: 11px; letter-spacing: .08em; font-weight: 800; text-transform: uppercase; }
  .counter-legend span { display: flex; align-items: center; gap: 5px; }
  .counter-legend i { width: 5px; height: 5px; border-radius: 50%; background: #76736e; }
  .counter-legend .input-light { background: #c77e61; box-shadow: 0 0 5px rgba(199,126,97,.7); }
  .ticker-equation { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 7px; padding: 9px 12px; border-radius: 11px; background: var(--qx-surface); font-family: Georgia, serif; font-size: 17px; }
  .ticker-equation i { font-style: normal; color: var(--qx-text-faint); }
  .ticker-equation b { color: var(--qx-accent-text); }
  @keyframes ticker-settle { from { transform: translateY(-9px); opacity: .45; } to { transform: translateY(0); opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .ticker-stack { animation: none; } }
  @media (max-width: 540px) {
    .counter-shell { padding: 10px 9px 8px; }
    .counter-header > strong { letter-spacing: .1em; }
    .ticker-pair { grid-template-columns: minmax(88px, 1fr) minmax(62px, auto) minmax(88px, 1fr); gap: 6px; }
    .ticker-unit { padding: 8px 5px; }
    .number-ticker { width: 68px; }
    .ticker-rule span { padding: 7px 5px; font-size: 13.5px; }
    .counter-label { justify-content: center; }
    .counter-label small { display: none; }
    .ticker-unit em { font-size: 11px; }
  }
  .unit-fig { display: grid; grid-template-columns: auto auto; grid-template-rows: auto auto; align-items: center; justify-items: center; gap: 7px; }
  .unit-sq { width: 62px; height: 62px; border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); border-radius: 3px; padding: 0; }
  .unit-sq.live { cursor: pointer; }
  .unit-sq.refused { border-style: dashed; }
  .unit-stack { display: grid; grid-template-columns: repeat(var(--n), 30px); grid-template-rows: repeat(var(--n), 30px); gap: 2px; }
  .unit-stack i { border: 1px solid var(--qx-accent); background: var(--qx-accent-soft); border-radius: 2px; }

  .plane { display: grid; grid-template-columns: repeat(var(--cols), 26px); gap: 1px; touch-action: none; }
  .pcell { width: 26px; height: 26px; border: 1px solid var(--qx-border); background: var(--qx-surface); border-radius: 2px; padding: 0; cursor: pointer; }
  .pcell.axis { background: var(--qx-surface-3); }
  .pcell.dot { background: var(--qx-green); border-color: var(--qx-green); }
  .pcell.here { background: var(--qx-accent); border-color: var(--qx-accent); }
  .plane-read { display: flex; align-items: baseline; gap: 10px; font-size: 19px; font-weight: 900; color: var(--qx-accent-text); }
  .plane-read em { font-style: normal; font-size: 13.5px; letter-spacing: .08em; font-weight: 800; color: var(--qx-text-faint); }
  .fails-read { display: flex; gap: 14px; }
  .fails-read span { border: 1px solid var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); border-radius: 9px; padding: 7px 12px; font-size: 15px; font-weight: 800; }
  .reveal-btn { border: 1px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); border-radius: 11px; padding: 9px 14px; font-weight: 900; font-size: 14.5px; cursor: pointer; }
  .side-mark { font-size: 15px; font-weight: 900; color: var(--qx-accent-text); }
  .side-mark.under { grid-column: 2; }

  .grid-wrap { display: flex; flex-direction: column; gap: 2px; touch-action: none; user-select: none; }
  .grid-wrap.small { transform: scale(.86); transform-origin: left top; }
  .grid-row { display: flex; gap: 2px; }
  .cell { width: 30px; height: 30px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); border-radius: 2px; cursor: pointer; padding: 0; }
  .cell.on { background: var(--qx-accent-soft); border-color: var(--qx-accent); }
  .cell.sq { background: var(--qx-green-soft); border-color: var(--qx-green); }
  .cell.hitarea { background: var(--qx-green-soft); border-color: var(--qx-green); }
  .grid-read { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .grid-read span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .grid-read small { font-size: 11.5px; letter-spacing: .1em; font-weight: 900; color: var(--qx-text-faint); }
  .grid-read b { font-size: 19px; }
  .grid-read b.accent { color: var(--qx-accent-text); }
  .grid-product { font-size: 18px; font-weight: 900; color: var(--qx-accent-text); }
  .bench-target { font-size: 13px; letter-spacing: .12em; font-weight: 900; color: var(--qx-text-faint); }
  .bench-target b { font-size: 18px; color: var(--qx-accent-text); margin-left: 6px; }
  .bench-targets { display: flex; gap: 7px; }
  .bench-targets button { min-width: 44px; height: 36px; border-radius: 10px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); font-weight: 900; cursor: pointer; }
  .bench-targets button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .hidden { display: none; }
  .spacer { display: none; }
  .variant.rejected { opacity: .55; }
  .variant.rejected .code { border-color: var(--qx-danger); color: var(--qx-danger-text); }
  .facts-head { display: flex; justify-content: center; margin-bottom: 4px; }
  .fact { display: flex; align-items: center; gap: 9px; font-size: 15px; font-weight: 700; border: 1px solid var(--qx-border); border-radius: 9px; padding: 8px 11px; }
  .fact.no { color: var(--qx-danger-text); background: var(--qx-danger-soft); border-color: var(--qx-danger); }
  .fact.yes { color: var(--qx-green-text); background: var(--qx-green-soft); border-color: var(--qx-green); }
  .rearrange { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 800; border: 1px solid var(--qx-border-2); border-radius: 10px; padding: 10px 12px; background: var(--qx-surface); }
  .rearrange i { font-style: normal; color: var(--qx-text-faint); }
  .rearrange b.accent { color: var(--qx-accent-text); }
  .tokens { display: flex; gap: 12px; }
  .token { min-width: 62px; height: 58px; border-radius: 13px; border: 2px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); font: italic 800 26px/1 Georgia, serif; cursor: pointer; }
  .token.joined { letter-spacing: -1px; }
  .signed { position: relative; width: 100%; max-width: 300px; height: 46px; }
  .signed .axis-line { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--qx-text-dim); }
  .signed .zero-tick { position: absolute; left: 50%; top: 8px; bottom: 8px; width: 2px; background: var(--qx-text-dim); }
  .signed-fill { position: absolute; top: 50%; transform: translateY(-50%); height: 18px; border-radius: 4px; background: var(--qx-accent); transition: width .12s; }
  .signed-fill.neg { background: var(--qx-danger); }
  .signed-read { font-size: 16px; font-weight: 900; color: var(--qx-accent-text); }
  .signed-read.neg { color: var(--qx-danger-text); }
  .variant.finalised { border-color: var(--qx-accent); border-style: dashed; }
  .variant.finalised .code { border-color: var(--qx-accent); border-style: dashed; }
  .why { font-size: 13.5px; line-height: 1.45; color: var(--qx-accent-text); border-top: 1px dashed var(--qx-border-2); padding-top: 7px; }
  .outstanding { list-style: none; display: flex; flex-direction: column; gap: 6px; margin-bottom: 22px; }
  .outstanding li { display: flex; align-items: baseline; gap: 9px; font-size: 15px; color: var(--qx-text-2); border: 1px solid var(--qx-border); border-radius: 10px; padding: 9px 12px; background: var(--qx-surface); }
  .outstanding b { color: var(--qx-accent-text); font-size: 13.5px; letter-spacing: .08em; }
  .outstanding span { margin-left: auto; color: var(--qx-text-faint); font-size: 13.5px; font-weight: 800; }

  .closing { border-top: 1px solid var(--qx-border); padding-top: 20px; }
  .closing h2 { font-size: 18px; margin-bottom: 8px; }
  .closing p { color: var(--qx-text-2); font-size: 14px; line-height: 1.6; max-width: 70ch; }
  code { background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 6px; padding: 2px 6px; font-size: 14.5px; }

  @media (max-width: 900px) {
    .world-primary { grid-template-columns: 1fr; }
    .schema-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .career-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .topic-phase-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 560px) {
    .factory-body { gap: 26px; }
    .world-head { flex-direction: column; }
    .world-head > small { max-width: none; }
    .world-footprint { grid-template-columns: 1fr 1fr; }
    .world-primary { grid-template-columns: 1fr; }
    .world-flow { flex-direction: column; }
    .world-arrow { transform: rotate(90deg); }
    .learning-loop-track { flex-direction: column; }
    .learning-loop-track > i { transform: rotate(90deg); }
    .promotion-track { flex-direction: column; }
    .promotion-track > i { transform: rotate(90deg); }
    .schema-grid { grid-template-columns: 1fr 1fr; }
    .career-grid { grid-template-columns: 1fr; }
    .topic-phase-grid { grid-template-columns: 1fr; }
    .topic-catalog > summary { align-items: flex-start; flex-direction: column; }
    .world-subhead { align-items: flex-start; flex-direction: column; gap: 3px; }
    .curriculum-drawer > summary { align-items: flex-start; flex-direction: column; }
    .curriculum-drawer > summary span { text-align: left; }
    .variant-grid { grid-template-columns: 1fr; }
    .triangle-sliders { grid-template-columns: 1fr; }
    .motion-sliders, .motion-readouts.four { grid-template-columns: 1fr 1fr; }
    .vector-controls { grid-template-columns:1fr; }
  }
</style>
