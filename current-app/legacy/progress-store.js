/* ============================================================
   Strata — local progress store
   localStorage-backed event log. Stores raw events with timestamps,
   not flags - the six mastery states (PATHS.md §4) are derived on
   read via getPathState(). Single-device only (no auth yet).
   ============================================================ */
const ProgressStore = (function () {
  const KEY = "strata-progress-v1";
  const DAY_MS = 24 * 60 * 60 * 1000;
  const WELL_READ_RATIO = 0.7;   // matches quiz-engine.js's own "partial" pass bar
  const MASTERED_RATIO = 0.9;    // 9/10-equivalent
  const RECALL_GAP_DAYS = 6.5;   // ~7 days, floored to forgive clock skew
  const MASTERED_TWICE_GAP_DAYS = 27.5; // ~28 days

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { version: 1, boards: {}, paths: {} };
      const data = JSON.parse(raw);
      if (!data.boards) data.boards = {};
      if (!data.paths) data.paths = {};
      return data;
    } catch (e) {
      return { version: 1, boards: {}, paths: {} };
    }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function pathsForCard(cardNumber) {
    const ids = [];
    for (const id in PATHS_MANIFEST) {
      if (PATHS_MANIFEST[id].cards.includes(cardNumber)) ids.push(id);
    }
    return ids;
  }

  function recordBoardOpen(cardNumber) {
    const data = load();
    const now = new Date().toISOString();
    const b = data.boards[cardNumber] || { firstOpenedAt: now, lastOpenedAt: now, openCount: 0 };
    if (!b.firstOpenedAt) b.firstOpenedAt = now;
    b.lastOpenedAt = now;
    b.openCount = (b.openCount || 0) + 1;
    data.boards[cardNumber] = b;

    pathsForCard(Number(cardNumber)).forEach((pathId) => {
      const p = data.paths[pathId] || { firstOpenedAt: null, lastOpenedAt: null, quiz: {} };
      if (!p.firstOpenedAt) p.firstOpenedAt = now;
      p.lastOpenedAt = now;
      if (!p.quiz) p.quiz = {};
      data.paths[pathId] = p;
    });

    save(data);
  }

  function recordQuizResult(pathId, score, total) {
    const data = load();
    const now = new Date().toISOString();
    const p = data.paths[pathId] || { firstOpenedAt: now, lastOpenedAt: now, quiz: {} };
    if (!p.quiz) p.quiz = {};
    const q = p.quiz;
    const ratio = total > 0 ? score / total : 0;

    if (q.bestScore == null || score / Math.max(total, 1) > q.bestScore / Math.max(q.bestTotal || 1, 1)) {
      q.bestScore = score;
      q.bestTotal = total;
    }
    if (ratio >= WELL_READ_RATIO) {
      if (!q.firstPassAt) q.firstPassAt = now;
      q.lastPassAt = now;
    }
    if (ratio >= MASTERED_RATIO && !q.masteredOnceAt) {
      q.masteredOnceAt = now;
    }
    // Mastered x2: recalled (gap since first open) AND already mastered once AND this pass meets the bar.
    if (ratio >= MASTERED_RATIO && p.firstOpenedAt) {
      const gapDays = (new Date(now) - new Date(p.firstOpenedAt)) / DAY_MS;
      if (gapDays >= MASTERED_TWICE_GAP_DAYS && !q.recalledMasteredTwiceAt) {
        q.recalledMasteredTwiceAt = now;
      }
    }

    p.quiz = q;
    if (!p.lastOpenedAt) p.lastOpenedAt = now;
    data.paths[pathId] = p;
    save(data);
  }

  function getPathState(pathId) {
    const manifest = PATHS_MANIFEST[pathId];
    if (!manifest) return { state: "unknown", label: "Unknown path" };
    const data = load();
    const p = data.paths[pathId];

    if (!p || !p.firstOpenedAt) {
      return {
        state: "unwandered", label: "Not started",
        boardsRead: 0, boardsTotal: manifest.cards.length,
        allRead: false, recalled: false, wellRead: false, masteredOnce: false, masteredTwice: false,
        bestScore: null, bestTotal: null
      };
    }

    const allRead = manifest.cards.every((n) => data.boards[n] && data.boards[n].firstOpenedAt);
    const gapDays = (new Date(p.lastOpenedAt) - new Date(p.firstOpenedAt)) / DAY_MS;
    const recalled = gapDays >= RECALL_GAP_DAYS;
    const q = p.quiz || {};
    const hasQuiz = manifest.quizUrls && manifest.quizUrls.length > 0;
    const wellRead = hasQuiz && !!q.firstPassAt;
    const masteredOnce = hasQuiz && !!q.masteredOnceAt;
    const masteredTwice = hasQuiz && !!q.recalledMasteredTwiceAt;

    let state = "wandered";
    let label = "Wandered";
    if (allRead) { state = "checked"; label = "Checked"; }
    if (wellRead) { state = "well_read"; label = "Well read"; }
    if (recalled) { state = "recalled"; label = "Recalled"; }
    if (masteredOnce) { state = "mastered_1"; label = "Mastered ×1"; }
    if (masteredTwice) { state = "mastered_2"; label = "Mastered ×2"; }

    const boardsRead = manifest.cards.filter((n) => data.boards[n] && data.boards[n].firstOpenedAt).length;

    return {
      state, label,
      boardsRead, boardsTotal: manifest.cards.length,
      allRead, recalled, wellRead, masteredOnce, masteredTwice,
      bestScore: q.bestScore ?? null, bestTotal: q.bestTotal ?? null
    };
  }

  function getOverallProgress() {
    const data = load();
    const readCards = Object.keys(data.boards).filter((n) => data.boards[n] && data.boards[n].firstOpenedAt);
    return { read: readCards.length };
  }

  return { recordBoardOpen, recordQuizResult, getPathState, getOverallProgress, pathsForCard, _load: load };
})();
