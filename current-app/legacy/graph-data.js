/* ============================================================
   Graph data — the 50-topic curriculum spine (CURRICULUM.md),
   the 6 hub concepts (HUBS.md), and the 11 pairwise bridge
   edges (BRIDGES.md), as a hand-authored data set.

   Two corrections beyond CURRICULUM.md's literal table, both
   because that doc predates work done later in the same session:
   - Topics 6 (Trigonometry) and 9 (Vectors): CURRICULUM.md marks
     these "started" citing old card numbers that predate the
     Coordinate Geometry expansion. Those old cards still exist
     but were never wired into PATHS_MANIFEST/ProgressStore, so
     there is no real progress tracking for them - marked
     "partial" here, not "built".
   - Topics 17 (Matrices), 28 (Electricity & circuits), and 29
     (Electric fields & potential): CURRICULUM.md says "not
     started" for all three, but MATRICES.md (15 drafted BBs)
     and ELECTRICITY.md (EL1/EL2/EL3 locked via the real Loop,
     EL3 specifically covers electric potential - topic 29's
     exact territory - EL5-16 drafted) now exist. Marked
     "partial" here.
   ============================================================ */

const CURRICULUM_TOPICS = {
  1: { name: "Arithmetic fluency & estimation", subject: "maths", phase: 1, status: "unbuilt" },
  2: { name: "Algebraic manipulation", subject: "maths", phase: 1, status: "unbuilt" },
  3: { name: "Equations & inequalities", subject: "maths", phase: 1, status: "unbuilt" },
  4: { name: "Functions and graphs", subject: "maths", phase: 1, status: "partial" },
  5: { name: "Coordinate geometry", subject: "maths", phase: 1, status: "built", pathId: "M3" },
  6: { name: "Trigonometry", subject: "maths", phase: 1, status: "partial" },
  7: { name: "Exponentials & logarithms", subject: "maths", phase: 1, status: "unbuilt" },
  8: { name: "Sequences & series", subject: "maths", phase: 1, status: "unbuilt" },
  9: { name: "Vectors (2D → 3D)", subject: "maths", phase: 1, status: "partial" },
  10: { name: "Mathematical proof & logic", subject: "maths", phase: 1, status: "unbuilt" },

  11: { name: "Limits & continuity", subject: "maths", phase: 2, status: "partial", pathId: "M1" },
  12: { name: "Differentiation", subject: "maths", phase: 2, status: "unbuilt" },
  13: { name: "Applications of derivatives", subject: "maths", phase: 2, status: "unbuilt" },
  14: { name: "Integration", subject: "maths", phase: 2, status: "unbuilt" },
  15: { name: "Differential equations (basic ODEs)", subject: "maths", phase: 2, status: "unbuilt" },
  16: { name: "Complex numbers", subject: "maths", phase: 2, status: "unbuilt" },
  17: { name: "Matrices & linear transformations", subject: "maths", phase: 2, status: "partial" },
  18: { name: "Probability & statistics", subject: "maths", phase: 2, status: "unbuilt" },

  19: { name: "Measurement, units & dimensional analysis", subject: "physics", phase: 3, status: "partial" },
  20: { name: "Kinematics", subject: "physics", phase: 3, status: "built", pathId: "P1" },
  21: { name: "Newtonian mechanics", subject: "physics", phase: 3, status: "built", pathId: "P1" },
  22: { name: "Work, energy & power", subject: "physics", phase: 3, status: "partial", pathId: "P2" },
  23: { name: "Momentum & collisions", subject: "physics", phase: 3, status: "unbuilt" },
  24: { name: "Circular motion", subject: "physics", phase: 3, status: "unbuilt" },
  25: { name: "Gravitation", subject: "physics", phase: 3, status: "partial", pathId: "P3" },
  26: { name: "Oscillations & SHM", subject: "physics", phase: 3, status: "unbuilt" },
  27: { name: "Waves & sound", subject: "physics", phase: 3, status: "unbuilt" },
  28: { name: "Electricity & circuits", subject: "physics", phase: 3, status: "partial" },
  29: { name: "Electric fields & potential", subject: "physics", phase: 3, status: "partial" },
  30: { name: "Magnetism & electromagnetism", subject: "physics", phase: 3, status: "unbuilt" },
  31: { name: "Thermodynamics", subject: "physics", phase: 3, status: "unbuilt" },
  32: { name: "Optics", subject: "physics", phase: 3, status: "unbuilt" },

  33: { name: "Electromagnetic induction", subject: "physics", phase: 4, status: "unbuilt" },
  34: { name: "AC circuits & resonance", subject: "physics", phase: 4, status: "unbuilt" },
  35: { name: "Quantum foundations", subject: "physics", phase: 4, status: "unbuilt" },
  36: { name: "Atomic & nuclear physics", subject: "physics", phase: 4, status: "partial" },
  37: { name: "Special relativity (intro)", subject: "physics", phase: 4, status: "unbuilt" },
  38: { name: "Experimental physics & uncertainty", subject: "physics", phase: 4, status: "unbuilt" },

  39: { name: "Atomic structure", subject: "chemistry", phase: 5, status: "built", pathId: "C1" },
  40: { name: "Periodicity", subject: "chemistry", phase: 5, status: "partial" },
  41: { name: "Chemical bonding", subject: "chemistry", phase: 5, status: "unbuilt" },
  42: { name: "Molecular geometry & intermolecular forces", subject: "chemistry", phase: 5, status: "unbuilt" },
  43: { name: "Stoichiometry", subject: "chemistry", phase: 5, status: "partial" },
  44: { name: "Thermochemistry", subject: "chemistry", phase: 5, status: "unbuilt" },
  45: { name: "Chemical equilibrium", subject: "chemistry", phase: 5, status: "unbuilt" },
  46: { name: "Acids, bases & buffers", subject: "chemistry", phase: 5, status: "unbuilt" },
  47: { name: "Redox & electrochemistry", subject: "chemistry", phase: 5, status: "unbuilt" },
  48: { name: "Chemical kinetics", subject: "chemistry", phase: 5, status: "unbuilt" },
  49: { name: "Organic chemistry fundamentals", subject: "chemistry", phase: 5, status: "unbuilt" },
  50: { name: "Analytical chemistry & spectroscopy", subject: "chemistry", phase: 5, status: "unbuilt" }
};

const HUB_NODES = [
  {
    id: "hub-orthogonal",
    name: "Orthogonal decomposition",
    description: "Any quantity can be split into independent pieces along perpendicular axes, and those pieces behave independently.",
    topics: [6, 9, 5, 20, 21, 22, 24, 25, 26, 27, 29, 30, 34, 16, 17, 28]
  },
  {
    id: "hub-rate",
    name: "Instantaneous rate of change",
    description: "Zoom in on a smooth change until a tiny interval looks straight; the slope at that point is the instantaneous rate of change.",
    topics: [11, 12, 13, 14, 15, 5, 20, 21, 24, 26, 27, 31, 48]
  },
  {
    id: "hub-proportional",
    name: "Proportional reasoning",
    description: "When two quantities are proportional, their ratio never changes; doubling one doubles the other.",
    topics: [1, 2, 3, 4, 5, 19, 43, 28, 48, 31, 22]
  },
  {
    id: "hub-conservation",
    name: "Conservation",
    description: "In a closed system, certain quantities transfer or change form, but their total stays unchanged.",
    topics: [22, 23, 28, 31, 36, 45, 47, 50, 20]
  },
  {
    id: "hub-exponential",
    name: "The exponential process",
    description: "When a quantity's rate of change is proportional to the quantity itself, the result is exponential growth or decay.",
    topics: [7, 8, 15, 36, 48, 34, 31]
  },
  {
    id: "hub-field",
    name: "The field concept",
    description: "Instead of action-at-a-distance, a source creates a field throughout space, and another object feels a force because it sits in that field.",
    topics: [25, 29, 30, 33, 27, 32, 39]
  }
];

const BRIDGE_EDGES = [
  { from: 4, to: 5, builtStatus: "new" },
  { from: 4, to: 20, builtStatus: "new" },
  { from: 20, to: 21, builtStatus: "built" },
  { from: 21, to: 22, builtStatus: "built" },
  { from: 22, to: 28, builtStatus: "built" },
  { from: 28, to: 39, builtStatus: "built" },
  { from: 39, to: 21, builtStatus: "new" },
  { from: 5, to: 17, builtStatus: "new" },
  { from: 4, to: 17, builtStatus: "new" },
  { from: 20, to: 11, builtStatus: "new" },
  { from: 11, to: 5, builtStatus: "new" }
];
