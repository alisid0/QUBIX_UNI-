/* ============================================================
   Strata — paths manifest
   Single source of truth: subject -> path -> ordered card numbers.
   Card numbers must match the live DECK in index.html (Cards 1-70).
   PATHS.md describes the structure; this file is authoritative for
   the actual card numbers (PATHS.md's M3 range predates the
   Coordinate Geometry merge into Cards 38-70).
   ============================================================ */
const PATHS_MANIFEST = {
  P1: { subject: "physics", name: "Forces & motion", cards: [3, 4, 5, 6, 7, 8, 9], quizUrls: [] },
  P2: { subject: "physics", name: "Energy", cards: [10, 11], quizUrls: [] },
  P3: { subject: "physics", name: "Gravity", cards: [16], quizUrls: [] },
  M1: { subject: "maths", name: "Getting infinitely close", cards: [12, 13, 14, 15], quizUrls: [] },
  M3: {
    subject: "maths",
    name: "Coordinate geometry",
    cards: Array.from({ length: 70 - 38 + 1 }, (_, i) => 38 + i),
    quizUrls: ["QUIZ-TIER0.html", "QUIZ-TIER1.html"]
  },
  C1: { subject: "chemistry", name: "Into the atom", cards: [33, 34, 35, 36, 37], quizUrls: [] }
};

if (typeof module !== "undefined" && module.exports) module.exports = PATHS_MANIFEST;
