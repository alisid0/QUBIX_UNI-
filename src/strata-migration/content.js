// Complete Strata migration inventory, refreshed from origin/main and the
// public production catalogue on 2026-08-11. Recommendations are authoring
// proposals only; browser review records founder intent, not curriculum status.

export const audit = {
  refreshed: '2026-08-11', commit: '77d077b',
  boards: 429, floors: 1957, supabaseBoards: 361, fallbackBoards: 68,
  subjects: { physics:121, maths:109, chemistry:99, computing:100 },
  subjectFloors: { physics:512, maths:517, chemistry:437, computing:491 },
  paths: 40, namedWorkshopCollections:43, additionalWorkshopModules:56,
  workshopRoutes:99, interactionTypes:36, challengeGenerators:46,
  resolvedMediaBoards:249, resolvedMediaFloors:620,
  svelteComponents:88, assessmentComponents:61, mediaComponents:8,
  contentModules:33, publicMediaFiles:85
};

export const decisions = ['migrate','adapt','defer','reject','infrastructure'];
export const decisionLabels = { migrate:'Migrate', adapt:'Adapt', defer:'Defer', reject:'Reject', infrastructure:'Infrastructure only' };

const path = ([id,subject,name,boards,workshops,recommendation,alignment,target,reason]) => ({
  key:`path:${id}`, kind:'path', id, subject, name, boards, workshops, workshopCount:workshops.length,
  recommendation, alignment, target, reason
});

export const paths = [
  ['PHYS_001','physics','Physics',10,['unit-forge','forces-waves','waves-2'],'adapt','later','Physics prerequisites','A broad starting point. Split reusable unit and wave mechanics; do not import it as one Qubix board.'],
  ['PHY_ENERGY_MOMENTUM','physics','Energy and momentum',5,['momentum','momentum-2','momentum-3'],'defer','future','After force and motion','Strong Collision Lab and momentum practice, but the present strand has not reached momentum or energy.'],
  ['PHY_SI_SCALE','physics','SI units and scale',10,['si-scale','si-2'],'adapt','next','Physics prerequisite shelf','Unit cancellation and prefix games are useful prerequisite repairs; rewrite as narrow boards.'],
  ['PHY_MOTION_FOUNDATIONS','physics','Motion foundations',21,['motion','motion-2','motion-3'],'adapt','now','Speed and Velocity / Vectors','Directly aligned. Mine scalar/vector checks and adapt Motion Lab after comparing it with the current animations.'],
  ['PHY_MEASUREMENT_LIMITS','physics','Measurement limits',8,['measurement-limits','measure-2'],'defer','future','Experimental physics','Good random/systematic-error sorting, but no current experimental-measurement sequence exists.'],
  ['PHY_UNITS','physics','Units and dimensions',13,['units-dimensions','units-2'],'adapt','next','Physics prerequisite shelf','Useful unit algebra and dimensional checks. Too broad and advanced to migrate as one sequence.'],
  ['PHY_SCALE','physics','Scale, estimation and errors',6,['scale-estimation','estimation-2'],'defer','future','Number and measurement extension','Estimation and significant-figure games are useful later; not required by the current physics opening.'],
  ['PHY_INTRO','physics','Foundations and frontiers',3,['foundations','foundations-2'],'defer','future','Physics orientation','Narrative survey rather than a prerequisite. Retain the scale-sorting mechanics only.'],
  ['PHY_FORCES','physics',"Forces and Newton's laws",14,['forces','forces-2'],'adapt','now','Force and Acceleration extension','Direct alignment. Force Balance and same-force/different-mass checks fit; the 14-board prose sequence needs narrowing.'],
  ['PHY_ELECTRICITY','physics','Electricity and circuits',10,['electricity','electricity-2','electricity-3'],'defer','future','Later physics','Circuit Bench is a strong signature lab, but electricity is outside the current plan. Preserve as a future package.'],
  ['PHY_THERMO','physics','Thermodynamics and heat',15,['thermodynamics','thermo-2'],'defer','future','Later physics','Thermo Lab and gas-law interactions are substantial but presently unsequenced.'],
  ['PHY_OPTICS','physics','Optics',6,['optics','optics-2'],'defer','future','Later physics','Ray and lens benches are reusable future technical media; no current optics prerequisites exist.'],
  ['LINE_001','maths','The Line',21,['line-core','line-2'],'adapt','now','Foundations / Plot / Line slope','Number-line, plotting and rate ideas align strongly, but the path mixes several Qubix boards and must be decomposed.'],
  ['MATH_COORD_MAPS','maths','Coordinate maps',13,['coord-maps','coord-maps-2'],'adapt','now','Coordinate Plane / Vectors','Coordinate and vector-arrow material aligns. High-dimensional data-vector floors should be deferred.'],
  ['MATH_COORD','maths','Coordinate geometry',15,['coord-geometry','coord-geometry-2','coord-geometry-3'],'adapt','now','Coordinate Plane / Plot / Line slope','Coordinate Drill and Workbook are strong reusable practice systems. Split plotting, distance, midpoint and line work.'],
  ['MATH_FUNCTIONS','maths','Functions',10,['functions-basics','functions-or-not','functions','transformation-lab','functions-2','functions-3'],'adapt','now','Button / Machine / One Answer','Highest current overlap. Compare engines with existing function boards; migrate only mechanics that add genuine practice.'],
  ['MATH_EXP_LOGS','maths','Exponents and logarithms',10,['exp-logs','exp-logs-2','exp-logs-3'],'defer','future','Later algebra','Useful exponential and inverse-operation practice, but it is not in the latest mapped sequence.'],
  ['MATH_MATRICES','maths','Matrices',8,['matrices','matrices-2'],'defer','future','Later mathematics','Matrix Cell, Transform and Lab are coherent future assets with no current prerequisite position.'],
  ['MATH_LINEAR_GRAPHS','maths','Lines and gradients',10,['linear-graphs','linear-graphs-2'],'adapt','now','Plot / Line slope','Direct overlap with y = mx + c and rise/run. Reuse drills selectively after terminology and scope review.'],
  ['MATH_TRIG_ADV','maths','Trigonometry',6,['trigonometry','trig-2','trig-3'],'adapt','next','After circles, right triangles and ratios','Unit Circle Lab and exact-value challenges are valuable, but remain gated behind missing prerequisites.'],
  ['MATH_LIMITS','maths','Limits',8,['limits','asymptote-lab','limits-2','limits-3'],'adapt','later','Two Points / later calculus','Limit and Asymptote engines align with the calculus pathway, but current boards and prerequisites remain unapproved.'],
  ['MATH_DIFF','maths','Differentiation',8,['differentiation','rate-interval','local-linearity','secant-tangent','differentiation-2'],'adapt','later','Rates and derivatives','Rate Interval, Local Linearity and Secant–Tangent directly align. Treat as later interaction candidates, not imported curriculum.'],
  ['ATOM_001','chemistry','The Atom',17,['atom-foundry','chemistry-core'],'defer','future','Future chemistry','Atom Foundry is a rich gamified system; chemistry is outside the latest plan. Preserve code and exercises as a future package.'],
  ['CHEM_NUCLEUS_ISOTOPES','chemistry','Nucleus and isotopes',8,['nucleus-isotopes','isotopes-2'],'defer','future','Future chemistry','Atom-builder variation is coherent but depends on an atomic-structure sequence.'],
  ['CHEM_BONDING_TYPES','chemistry','Bonding types',4,['bonding-types','bonding-types-2'],'defer','future','Future chemistry','Sorting mechanic is reusable; subject content remains future.'],
  ['CHEM_MOLE_COUNTING','chemistry','Counting atoms',9,['counting-atoms','counting-2','counting-3'],'defer','future','Future chemistry','Formula-counting practice is complete but has no current curriculum position.'],
  ['CHEM_BIOMOLECULES','chemistry','Biomolecules',18,['biomolecules','biomolecules-2'],'defer','future','Future chemistry','Large topic set; retain molecule-builder exercises but do not bulk-migrate prose.'],
  ['BIT_001','computing','The Bit',16,['bit-machine','binary-data','logic-gates','binary-2','logic-2','binary-3','logic-3'],'defer','future','Future computing','Bit Machine, binary and logic challenges form a strong future gamified route outside the latest plan.'],
  ['COMP_CODE_COMMAND','computing','Code and command line',21,['code-algorithms','code-2'],'defer','future','Future computing','Broad computing sequence; command-line content needs platform and safety review before reuse.'],
  ['COMP_HARDWARE','computing','Hardware and memory',16,['hardware-memory','hardware-2'],'defer','future','Future computing','Hardware sorting and memory interactions are future material.'],
  ['COMP_NETWORKS_SECURITY','computing','Machines talk',13,['networks-cloud','networks-2','networks-3'],'defer','future','Future computing','Network scenarios and games are useful later; factual freshness review will be required.'],
  ['COMP_SYSTEM_DESIGN','computing','System design basics',13,['security-architecture','security-2'],'defer','future','Future computing','Security exercises are temporally sensitive and require a fresh source audit.'],
  ['COMP_AI_ERA','computing','AI-era computing',20,['ai-era','ai-era-2','ai-era-3'],'defer','future','Future computing','Emerging-topic content needs continuous factual review; preserve interactions, not current claims.'],
  ['COMP_AI_BEHIND','computing','AI Behind the Curtain',1,['ai-behind','ai-behind-2'],'defer','future','Future computing','Compact future module; terminology and model claims require fresh verification.'],
  ['CHEM_ATOMIC','chemistry','Atomic structure',10,['atomic-structure','atomic-2','atomic-3'],'defer','future','Future chemistry','Complete practice route but outside the latest curriculum.'],
  ['CHEM_BONDING','chemistry','Chemical bonding',5,['chem-bonding','bonding-2','bonding-3'],'defer','future','Future chemistry','Bond Lab is promising; preserve as a future technical interaction.'],
  ['CHEM_MOLE','chemistry','Reactions and the mole',4,['mole-reactions','mole-2','mole-3'],'defer','future','Future chemistry','Molecule and ratio exercises are coherent but presently unplaced.'],
  ['CHEM_ARCH','chemistry','Molecular architecture',8,['molecular-arch','arch-2'],'defer','future','Future chemistry','Three-dimensional molecule work depends on prior bonding content.'],
  ['CHEM_STRUCTURE_REACTIONS','chemistry','Structure and reactions',10,['bond-lab','equation-balancer','chemistry-structure','structure-2'],'defer','future','Future chemistry','Equation Balancer and Bond Lab are strong engines; subject migration waits.'],
  ['CHEM_QUANT','chemistry','Quantitative chemistry',6,['quant-chem','quant-2'],'defer','future','Future chemistry','Useful mole/ratio bench, but it requires a complete chemistry prerequisite chain.']
].map(path);

const engine = ([type,component,family,recommendation,alignment,dependency,reason]) => ({
  key:`engine:${type}`, kind:'engine', id:type, type, component, family, recommendation, alignment, dependency, reason
});

export const engines = [
  ['sorting','SortingDesk.svelte','generic','migrate','now','low','Reusable classification engine with clear transfer value across subjects.'],
  ['taperase','TapErase.svelte','generic','adapt','now','low','Useful misconception correction; rename and restyle to match Qubix checks.'],
  ['scenario','Workshop.svelte','generic','migrate','now','low','Core multiple-choice scenario shell; preserve feedback and accessibility behaviour.'],
  ['coorddrill','CoordinateDrill.svelte','mathematics','adapt','now','medium','Direct fit for Coordinate Plane and Plot; reconcile axes, ranges and terminology.'],
  ['coordworkbook','CoordinateWorkbook.svelte','mathematics','adapt','now','medium','Strong multi-mode coordinate practice; split modes into narrow Qubix review candidates.'],
  ['functionmachine','FunctionMachineLab.svelte','mathematics','adapt','now','medium','Compare with current Button/Machine interactions and retain only distinct practice.'],
  ['functionlab','FunctionLab.svelte','mathematics','adapt','now','medium','Advanced function manipulation; parts may support later function boards.'],
  ['matrixcell','MatrixCellFinder.svelte','mathematics','defer','future','low','Portable but curriculum is not yet mapped.'],
  ['matrixtransform','MatrixTransform.svelte','mathematics','defer','future','medium','Technical SVG transform engine; preserve for later matrices.'],
  ['matrixlab','MatrixLab.svelte','mathematics','defer','future','medium','Substantial lab, presently unsequenced.'],
  ['unitcircle','UnitCircleLab.svelte','mathematics','adapt','next','medium','High-value signature lab; split stations after circle and triangle prerequisites.'],
  ['asymptotelab','AsymptoteLab.svelte','mathematics','adapt','later','medium','Strong limits visual, gated behind the current calculus sequence.'],
  ['rateinterval','RateIntervalBench.svelte','mathematics','adapt','later','medium','Direct conceptual fit for average rate and secant slope.'],
  ['locallinearity','LocalLinearityStudio.svelte','mathematics','adapt','later','medium','Direct fit for zooming a curve; preserve corner counterexample.'],
  ['secanttangent','SecantTangentStudio.svelte','mathematics','adapt','later','medium','Strong fit for Two Points and derivative graph; requires careful scope split.'],
  ['probability','ProbabilityLab.svelte','mathematics','defer','future','medium','Reusable simulation but probability is not in the latest plan.'],
  ['forcebalance','ForceBalance.svelte','physics','adapt','now','low','Direct extension of Force and Acceleration; preserve balance/unbalance goals.'],
  ['motionlab','MotionLab.svelte','physics','adapt','now','medium','Direct fit for speed/velocity; compare animation truthfulness with the current draft.'],
  ['momentumlab','MomentumLab.svelte','physics','defer','future','medium','Strong collision lab after force and motion prerequisites.'],
  ['wavetuner','WaveTuner.svelte','physics','defer','future','medium','Useful wave model; no current wave sequence.'],
  ['thermolab','ThermoLab.svelte','physics','defer','future','medium','Preserve for later thermodynamics.'],
  ['circuitbench','CircuitBenchLab.svelte','physics','defer','future','medium','High-value circuit system outside current scope.'],
  ['unitcheck','UnitDimensionCheck.svelte','physics','adapt','next','low','Portable unit-cancellation exercise for physics prerequisites.'],
  ['unitforge','UnitForgeLab.svelte','physics','adapt','next','medium','Gamified unit construction; split into narrow prerequisite boards.'],
  ['atombuilder','AtomBuilder.svelte','chemistry','defer','future','medium','Preserve complete builder; current curriculum has no chemistry strand.'],
  ['atomfoundry','AtomFoundryLab.svelte','chemistry','defer','future','medium','Rich gamified signature lab; future shelf only.'],
  ['moleculebuilder','MoleculeBuilder.svelte','chemistry','defer','future','medium','Reusable future chemistry builder.'],
  ['bondlab','BondLab.svelte','chemistry','defer','future','medium','Strong technical interaction after atomic prerequisites.'],
  ['equationbalancer','EquationBalancer.svelte','chemistry','defer','future','medium','High-value conservation mechanic, presently unsequenced.'],
  ['bitpattern','BitPattern.svelte','computing','defer','future','low','Portable binary pattern task.'],
  ['pixelgrid','PixelGrid.svelte','computing','defer','future','low','Portable data representation task.'],
  ['bitsnumber','BitsToNumber.svelte','computing','defer','future','low','Future binary conversion practice.'],
  ['bitsword','BitsToWord.svelte','computing','defer','future','low','Future text encoding practice.'],
  ['gatebuilder','GateBuilder.svelte','computing','defer','future','medium','Strong logic-circuit engine outside current scope.'],
  ['bitmachine','BitMachineLab.svelte','computing','defer','future','medium','Rich future computing lab.'],
  ['pixiscene','PixiSceneChoice.svelte','rendering','infrastructure','future','high','Rendering adapter depends on Pixi scenes; migrate only with a selected lesson that needs it.']
].map(engine);

const system = ([id,name,scope,recommendation,alignment,dependency,reason]) => ({
  key:`system:${id}`, kind:'system', id, name, scope, recommendation, alignment, dependency, reason
});

export const systems = [
  ['workshop-shell','Workshop renderer','assessment','adapt','now','medium','Transfer the interaction dispatch pattern and feedback loop, not Strata progress coupling.'],
  ['workshop-lab','WorkshopLab route and catalogue','assessment','adapt','now','high','Useful catalogue architecture; rebuild against Qubix authoring data rather than copying route state.'],
  ['challenge-generators','46 challenge generators','assessment','adapt','now','medium','Preserve algorithms and distractor logic after correctness and determinism tests.'],
  ['reader','Swipe Reader and floor model','learner-ui','defer','future','high','Qubix uses a different board model. Mine interaction framing only; do not replace the current learner shell.'],
  ['paths','PATHS manifest','content','infrastructure','now','low','Use as migration provenance and coverage inventory, not as the new curriculum order.'],
  ['dynamic-content','Supabase dynamic board loader','content','reject','none','high','Explicitly prohibited inherited infrastructure. Extract approved content only; do not connect old databases.'],
  ['fallback-content','Bundled fallback board hierarchy','content','infrastructure','now','medium','Evidence source for missing production rows; do not create a second live inventory.'],
  ['media-registry','boardMedia and media resolver','media','adapt','now','medium','Migrate mappings only with selected boards; preserve deterministic technical-media rule.'],
  ['three-pixi','Three.js and Pixi renderers','media','defer','future','high','Both libraries exist in Qubix, but scenes move only with an approved interaction.'],
  ['public-assets','85 public media files','media','adapt','now','medium','Audit copyright, relevance and orphan status file by file before copying.'],
  ['progress','Progress, recall, streak and workshop scoring','gamification','defer','future','high','Concepts may be valuable, but Qubix governance and data model differ. Rebuild; never copy user data.'],
  ['daily-workout','Daily workout and spaced recall','gamification','defer','future','high','Promising product loop after curriculum approval and a new progress model.'],
  ['leaderboard','WScore, leagues and social progress','gamification','reject','none','Not required for the latest learning plan and risks rewarding volume over understanding.'],
  ['auth-profile','Auth, onboarding and profiles','infrastructure','reject','none','Do not migrate inherited Supabase auth or personal-data systems.'],
  ['author-view','Legacy Author view','authoring','reject','none','The present Qubix Factory supersedes it.'],
  ['pwa-mobile','Service worker, PWA and mobile shell','platform','infrastructure','now','high','Qubix already has its own deployment/mobile path; compare settings only and avoid duplicate registration.'],
  ['analytics-deploy','Analytics and deployment scripts','platform','reject','none','Project-specific infrastructure must not cross repositories.'],
  ['theme-design','Strata visual tokens and shell','design','reject','none','Keep the locked current Qubix five-colour system. Migrate interaction behaviour, not old chrome.'],
  ['sanitization','Board HTML sanitizer','security','infrastructure','future','medium','Keep as reference if dynamic HTML ever returns; current static authoring does not need wholesale transfer.']
].map(system);

export const media = [
  { key:'media:resolved', kind:'media', id:'resolved', name:'Reader-resolved media', count:620, recommendation:'adapt', alignment:'now', dependency:'medium', reason:'Resolved across 249 live boards. Migrate only assets attached to selected content and verify each licence.' },
  { key:'media:technical', kind:'media', id:'technical', name:'Technical SVG/canvas/Three media candidates', count:808, recommendation:'adapt', alignment:'now', dependency:'medium', reason:'333 animation and 475 static candidates. Recreate or transfer code-native technical media selectively.' },
  { key:'media:real-world', kind:'media', id:'real-world', name:'Narrative scene candidates', count:44, recommendation:'defer', alignment:'future', dependency:'medium', reason:'12 photo archive, 8 scene-GIF and 24 static-scene candidates; require asset provenance and topic selection.' },
  { key:'media:public-files', kind:'media', id:'public-files', name:'Public repository media files', count:85, recommendation:'adapt', alignment:'now', dependency:'medium', reason:'25 GIF, 53 raster, 1 SVG and 6 video files. Audit individually before copying.' },
  { key:'media:uncovered', kind:'media', id:'uncovered', name:'Floors without resolved media', count:1337, recommendation:'reject', alignment:'none', dependency:'low', reason:'Absence of media is not a migration task. Never generate filler to satisfy coverage.' }
];

export const allItems = [...paths, ...engines, ...systems, ...media];

export const reviewPrinciples = [
  'Curriculum content, interaction engines, media and infrastructure receive separate decisions.',
  'Adapt is the default for aligned content because current Qubix boards are narrower than Strata paths.',
  'Defer preserves future value without silently expanding the latest curriculum plan.',
  'No Supabase schema, auth, progress, users, deployment linkage or service credentials migrate.',
  'Founder review of this manifest records migration intent only; it does not approve a learner BB.'
];
