import { writable, get } from 'svelte/store';
import { supabase } from '../supabase.js';
import { user } from './auth.js';
import { PATHS } from '../content/paths.js';
import { getAllSolveFirst } from '../content/solveFirst.js';
import { buildExpansionSummary, buildPairedJourneyStates, PAIR_RECALL_INTERVALS_DAYS } from '../content/expansion.js';
import { notifyW } from './wtoast.js';

const KEY = 'strata-progress-v2';
const DAY_MS = 24 * 60 * 60 * 1000;
const SYNC_DEBOUNCE_MS = 1200;
const RECALL_INTERVALS = [1, 7, 21];

const WELL_READ_RATIO = 0.7;
const MASTERED_RATIO = 0.9;
const RECALL_GAP_DAYS = 6.5;
const MASTERED_TWICE_GAP_DAYS = 27.5;

function weekStart(dt = new Date()) {
  const d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const dow = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dow);
  return d;
}

function weekKey(dt = new Date()) {
  const ws = weekStart(dt);
  return `${ws.getFullYear()}-${String(ws.getMonth() + 1).padStart(2, '0')}-${String(ws.getDate()).padStart(2, '0')}`;
}

function dayKey(dt = new Date()) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function computeStreak(activity) {
  if (!activity) return 0;
  let streak = 0;
  const d = new Date();
  if (!activity[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (activity[dayKey(d)]) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function emptyState() {
  return {
    version: 3,
    boards: {},
    paths: {},
    quizzes: {},
    discoveries: {},
    activity: {},
    ws: { total: 0, events: [], granted: {}, week: { key: weekKey(), earned: 0 } },
    sync: { attempts: [] }
  };
}

function normalizeState(data) {
  const fallback = emptyState();
  if (!data || typeof data !== 'object') data = {};
  data.version = 3;
  data.boards = data.boards || {};
  data.paths = data.paths || {};
  data.quizzes = data.quizzes || {};
  // Solve First discovery records. Added defensively so saved progress from
  // before the Solve First port loads unchanged.
  data.discoveries = data.discoveries || {};
  data.activity = data.activity || {};
  data.ws = data.ws || fallback.ws;
  data.ws.total = data.ws.total || 0;
  data.ws.events = Array.isArray(data.ws.events) ? data.ws.events : [];
  data.ws.granted = data.ws.granted || {};
  data.ws.week = data.ws.week || { key: weekKey(), earned: 0 };
  data.sync = data.sync || { attempts: [] };
  data.sync.attempts = Array.isArray(data.sync.attempts) ? data.sync.attempts : [];
  return data;
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return emptyState();
  }
}

function saveLocal(data) {
  try { localStorage.setItem(KEY, JSON.stringify(normalizeState(data))); } catch {}
}

function safeRandomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function latestIso(a, b) {
  return [a, b].filter(Boolean).sort().at(-1) || null;
}

function earliestIso(a, b) {
  return [a, b].filter(Boolean).sort()[0] || null;
}

function isDuplicateError(error) {
  return error?.code === '23505' || String(error?.message || '').toLowerCase().includes('duplicate');
}

function hasProgress(data) {
  return !!(
    Object.keys(data.boards || {}).length ||
    Object.keys(data.paths || {}).length ||
    Object.keys(data.activity || {}).length ||
    Object.keys(data.discoveries || {}).length ||
    (data.ws?.events || []).length ||
    (data.sync?.attempts || []).length
  );
}

function mergeBoard(local = {}, remote = {}) {
  return {
    ...remote,
    ...local,
    firstOpenedAt: earliestIso(local.firstOpenedAt, remote.firstOpenedAt),
    lastOpenedAt: latestIso(local.lastOpenedAt, remote.lastOpenedAt),
    openCount: Math.max(local.openCount || 0, remote.openCount || 0),
    deepestFloorReached: Math.max(local.deepestFloorReached || 0, remote.deepestFloorReached || 0),
    deepestFloorCompletedAt: local.deepestFloorCompletedAt || remote.deepestFloorCompletedAt || null,
    recall: local.recall || remote.recall || null
  };
}

function mergePath(local = {}, remote = {}) {
  const lq = local.quiz || {};
  const rq = remote.quiz || {};
  const localRatio = (lq.bestScore || 0) / Math.max(lq.bestTotal || 1, 1);
  const remoteRatio = (rq.bestScore || 0) / Math.max(rq.bestTotal || 1, 1);
  const best = localRatio >= remoteRatio ? lq : rq;

  return {
    ...remote,
    ...local,
    firstOpenedAt: earliestIso(local.firstOpenedAt, remote.firstOpenedAt),
    lastOpenedAt: latestIso(local.lastOpenedAt, remote.lastOpenedAt),
    quiz: {
      ...rq,
      ...lq,
      bestScore: best.bestScore ?? null,
      bestTotal: best.bestTotal ?? null,
      firstPassAt: lq.firstPassAt || rq.firstPassAt || null,
      masteredOnceAt: lq.masteredOnceAt || rq.masteredOnceAt || null,
      recalledMasteredTwiceAt: lq.recalledMasteredTwiceAt || rq.recalledMasteredTwiceAt || null
    }
  };
}

function mergeStates(localState, remoteState) {
  const local = normalizeState(localState);
  const remote = normalizeState(remoteState);
  const merged = emptyState();

  merged.boards = { ...remote.boards };
  for (const [bbid, board] of Object.entries(local.boards || {})) {
    merged.boards[bbid] = mergeBoard(board, merged.boards[bbid]);
  }

  merged.paths = { ...remote.paths };
  for (const [pathId, path] of Object.entries(local.paths || {})) {
    merged.paths[pathId] = mergePath(path, merged.paths[pathId]);
  }

  merged.activity = { ...remote.activity };
  for (const [date, count] of Object.entries(local.activity || {})) {
    merged.activity[date] = Math.max(merged.activity[date] || 0, count || 0);
  }

  merged.quizzes = { ...remote.quizzes };
  for (const [pathId, attempts] of Object.entries(local.quizzes || {})) {
    const existing = merged.quizzes[pathId] || [];
    const seen = new Set(existing.map(a => `${a.completedAt}:${a.score}:${a.total}`));
    merged.quizzes[pathId] = [...existing];
    for (const attempt of attempts || []) {
      const key = `${attempt.completedAt}:${attempt.score}:${attempt.total}`;
      if (!seen.has(key)) merged.quizzes[pathId].push(attempt);
    }
  }

  // Discoveries: keep the strongest record on each side. There is no remote
  // discoveries table yet, so `remote.discoveries` is normally empty — taking
  // the max on every field means a cloud pull can never erase local Solve First
  // progress.
  merged.discoveries = { ...(remote.discoveries || {}) };
  for (const [id, rec] of Object.entries(local.discoveries || {})) {
    const other = merged.discoveries[id];
    if (!other) { merged.discoveries[id] = rec; continue; }
    merged.discoveries[id] = {
      firstCompletedAt: [other.firstCompletedAt, rec.firstCompletedAt].filter(Boolean).sort()[0] || rec.firstCompletedAt,
      lastCompletedAt: [other.lastCompletedAt, rec.lastCompletedAt].filter(Boolean).sort().pop() || rec.lastCompletedAt,
      attempts: Math.max(other.attempts || 0, rec.attempts || 0),
      bestReasoningScore: Math.max(other.bestReasoningScore || 0, rec.bestReasoningScore || 0),
      evidenceCount: Math.max(other.evidenceCount || 0, rec.evidenceCount || 0),
      explained: !!(other.explained || rec.explained),
      patternFound: !!(other.patternFound || rec.patternFound),
      compared: !!(other.compared || rec.compared),
      transferFirstTry: !!(other.transferFirstTry || rec.transferFirstTry),
      independent: !!(other.independent || rec.independent)
    };
  }

  const eventMap = new Map();
  for (const event of [...(remote.ws.events || []), ...(local.ws.events || [])]) {
    eventMap.set(`${event.type}:${event.ref}:${event.t || ''}:${event.amount}`, event);
  }
  const events = [...eventMap.values()]
    .sort((a, b) => new Date(a.t || 0) - new Date(b.t || 0))
    .slice(-200);

  const granted = {};
  let total = 0;
  let weekEarned = 0;
  const wk = weekKey();
  for (const event of events) {
    total += event.amount || 0;
    if (!event.repeatable) granted[`${event.type}:${event.ref}`] = event.amount || 0;
    if (weekKey(new Date(event.t || Date.now())) === wk) weekEarned += event.amount || 0;
  }
  merged.ws = { total, events, granted, week: { key: wk, earned: weekEarned } };
  merged.sync = { attempts: [...(remote.sync?.attempts || []), ...(local.sync?.attempts || [])] };

  return normalizeState(merged);
}

function createProgressStore() {
  const { subscribe, set, update } = writable(loadFromStorage());
  let currentUser = null;
  let syncTimer = null;
  let syncInFlight = false;
  let hasHydratedRemote = false;

  function persist(data, { sync = true } = {}) {
    normalizeState(data);
    saveLocal(data);
    if (sync) scheduleSync();
  }

  function scheduleSync(delay = SYNC_DEBOUNCE_MS) {
    if (!currentUser) return;
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      syncTimer = null;
      flushRemote();
    }, delay);
  }

  function enqueueAttempt(data, kind, payload) {
    data.sync.attempts.push({
      id: safeRandomId(),
      kind,
      payload,
      createdAt: new Date().toISOString()
    });
  }

  function grantWs(data, type, ref, amount, { repeatable = false, bonus = false } = {}) {
    if (!amount || amount <= 0) return 0;
    const key = `${type}:${ref}`;
    if (!repeatable && data.ws.granted[key]) return 0;
    if (!repeatable) data.ws.granted[key] = amount;

    data.ws.total += amount;
    data.ws.events.push({ t: new Date().toISOString(), type, amount, ref: String(ref), bonus, repeatable });
    if (data.ws.events.length > 200) data.ws.events = data.ws.events.slice(-200);

    const wk = weekKey();
    if (data.ws.week.key !== wk) data.ws.week = { key: wk, earned: 0 };
    data.ws.week.earned += amount;

    notifyW(amount, { bonus });
    return amount;
  }

  async function loadRemoteState(forUser) {
    const remote = emptyState();
    const [boardsResult, pathsResult, quizResult, activityResult, wResult] = await Promise.all([
      supabase.from('user_board_progress').select('*').eq('user_id', forUser.id),
      supabase.from('user_path_progress').select('*').eq('user_id', forUser.id),
      supabase.from('user_quiz_attempts').select('*').eq('user_id', forUser.id).order('completed_at', { ascending: true }).limit(200),
      supabase.from('user_daily_activity').select('*').eq('user_id', forUser.id),
      supabase.from('user_w_events').select('*').eq('user_id', forUser.id).order('created_at', { ascending: true }).limit(200)
    ]);

    for (const result of [boardsResult, pathsResult, quizResult, activityResult, wResult]) {
      if (result.error) throw result.error;
    }

    for (const row of boardsResult.data || []) {
      remote.boards[row.bbid] = {
        firstOpenedAt: row.first_opened_at,
        lastOpenedAt: row.last_opened_at,
        openCount: row.open_count || 0,
        deepestFloorReached: row.deepest_floor_reached || 0,
        deepestFloorCompletedAt: row.deepest_floor_completed_at,
        recall: row.recall_due_at ? {
          dueAt: row.recall_due_at,
          stage: row.recall_stage || 0,
          passes: row.recall_passes || 0
        } : null
      };
    }

    for (const row of pathsResult.data || []) {
      remote.paths[row.path_id] = {
        firstOpenedAt: row.first_opened_at,
        lastOpenedAt: row.last_opened_at,
        quiz: {
          bestScore: row.best_score,
          bestTotal: row.best_total,
          firstPassAt: row.first_pass_at,
          masteredOnceAt: row.mastered_once_at,
          recalledMasteredTwiceAt: row.recalled_mastered_twice_at
        }
      };
    }

    for (const row of quizResult.data || []) {
      const attempts = remote.quizzes[row.path_id] || [];
      attempts.push({ score: row.score, total: row.total, completedAt: row.completed_at });
      remote.quizzes[row.path_id] = attempts;
    }

    for (const row of activityResult.data || []) {
      remote.activity[row.activity_date] = row.event_count || 0;
    }

    for (const row of wResult.data || []) {
      remote.ws.events.push({
        t: row.created_at,
        type: row.event_type,
        amount: row.amount,
        ref: row.event_ref,
        bonus: row.bonus,
        repeatable: row.repeatable
      });
    }

    return normalizeState(remote);
  }

  async function hydrateRemote(forUser) {
    if (!forUser || hasHydratedRemote) return;
    hasHydratedRemote = true;
    try {
      const remote = await loadRemoteState(forUser);
      const local = get({ subscribe });
      const merged = hasProgress(local) ? mergeStates(local, remote) : remote;
      set(merged);
      persist(merged, { sync: false });
      scheduleSync(50);
    } catch (_) {
      // The secure migration may not be live yet. Local progress remains intact.
    }
  }

  async function insertWEvent(forUser, event) {
    const { error } = await supabase.from('user_w_events').insert({
      user_id: forUser.id,
      event_type: event.type,
      event_ref: String(event.ref),
      amount: event.amount,
      bonus: !!event.bonus,
      repeatable: !!event.repeatable,
      created_at: event.t,
      metadata: {}
    });
    if (error && !isDuplicateError(error)) throw error;
  }

  async function insertAttempt(forUser, attempt) {
    if (attempt.kind === 'quiz') {
      const { error } = await supabase.from('user_quiz_attempts').insert({
        user_id: forUser.id,
        path_id: attempt.payload.pathId,
        score: attempt.payload.score,
        total: attempt.payload.total,
        completed_at: attempt.payload.completedAt,
        metadata: attempt.payload.metadata || {}
      });
      if (error) throw error;
      return;
    }

    if (attempt.kind === 'workshop') {
      const { error } = await supabase.from('user_workshop_attempts').insert({
        user_id: forUser.id,
        module_id: attempt.payload.moduleId,
        score: attempt.payload.score,
        total: attempt.payload.total,
        best_streak: attempt.payload.bestStreak || 0,
        is_challenge: !!attempt.payload.isChallenge,
        completed_at: attempt.payload.completedAt,
        metadata: attempt.payload.metadata || {}
      });
      if (error) throw error;
    }
  }

  async function flushRemote() {
    const forUser = currentUser;
    if (!forUser || syncInFlight) return;
    syncInFlight = true;
    try {
      const data = normalizeState(get({ subscribe }));

      const boardRows = Object.entries(data.boards || {}).map(([bbid, board]) => ({
        user_id: forUser.id,
        bbid: Number(bbid),
        first_opened_at: board.firstOpenedAt || null,
        last_opened_at: board.lastOpenedAt || null,
        open_count: board.openCount || 0,
        deepest_floor_reached: board.deepestFloorReached || 0,
        deepest_floor_completed_at: board.deepestFloorCompletedAt || null,
        recall_due_at: board.recall?.dueAt || null,
        recall_stage: board.recall?.stage || 0,
        recall_passes: board.recall?.passes || 0
      }));
      if (boardRows.length) {
        const { error } = await supabase.from('user_board_progress').upsert(boardRows, { onConflict: 'user_id,bbid' });
        if (error) throw error;
      }

      const pathRows = Object.entries(data.paths || {}).map(([pathId, path]) => ({
        user_id: forUser.id,
        path_id: pathId,
        first_opened_at: path.firstOpenedAt || null,
        last_opened_at: path.lastOpenedAt || null,
        best_score: path.quiz?.bestScore ?? null,
        best_total: path.quiz?.bestTotal ?? null,
        first_pass_at: path.quiz?.firstPassAt || null,
        mastered_once_at: path.quiz?.masteredOnceAt || null,
        recalled_mastered_twice_at: path.quiz?.recalledMasteredTwiceAt || null
      }));
      if (pathRows.length) {
        const { error } = await supabase.from('user_path_progress').upsert(pathRows, { onConflict: 'user_id,path_id' });
        if (error) throw error;
      }

      const activityRows = Object.entries(data.activity || {}).map(([date, count]) => ({
        user_id: forUser.id,
        activity_date: date,
        event_count: count || 0
      }));
      if (activityRows.length) {
        const { error } = await supabase.from('user_daily_activity').upsert(activityRows, { onConflict: 'user_id,activity_date' });
        if (error) throw error;
      }

      for (const event of data.ws.events || []) {
        await insertWEvent(forUser, event);
      }

      const remainingAttempts = [];
      for (const attempt of data.sync.attempts || []) {
        try {
          await insertAttempt(forUser, attempt);
        } catch (_) {
          remainingAttempts.push(attempt);
        }
      }

      const latest = normalizeState(get({ subscribe }));
      latest.sync.attempts = remainingAttempts;
      set(latest);
      persist(latest, { sync: false });
    } catch (_) {
      // Retry later; local progress remains the source of immediate truth.
    } finally {
      syncInFlight = false;
    }
  }

  user.subscribe((nextUser) => {
    currentUser = nextUser;
    if (!nextUser) {
      hasHydratedRemote = false;
      if (syncTimer) clearTimeout(syncTimer);
      syncTimer = null;
      return;
    }
    hydrateRemote(nextUser);
  });

  return {
    subscribe,

    init() {
      const signedIn = get(user);
      if (signedIn) hydrateRemote(signedIn);
    },

    recordBoardOpen(cardNumber, pathIds = []) {
      update(data => {
        normalizeState(data);
        const now = new Date().toISOString();
        const isFirst = !data.boards[cardNumber]?.firstOpenedAt;
        const b = data.boards[cardNumber] || { firstOpenedAt: now, lastOpenedAt: now, openCount: 0 };
        if (!b.firstOpenedAt) b.firstOpenedAt = now;
        b.lastOpenedAt = now;
        b.openCount = (b.openCount || 0) + 1;

        if (isFirst) {
          grantWs(data, 'board_open', cardNumber, 1);
          b.recall = { dueAt: new Date(Date.now() + RECALL_INTERVALS[0] * DAY_MS).toISOString(), stage: 0, passes: 0 };
        }
        data.boards[cardNumber] = b;

        data.activity[dayKey()] = (data.activity[dayKey()] || 0) + 1;

        pathIds.forEach(pid => {
          const p = data.paths[pid] || { firstOpenedAt: null, lastOpenedAt: null, quiz: {} };
          if (!p.firstOpenedAt) p.firstOpenedAt = now;
          p.lastOpenedAt = now;
          if (!p.quiz) p.quiz = {};
          data.paths[pid] = p;
        });

        persist(data);
        return data;
      });
    },

    recordDeepestFloor(cardNumber) {
      update(data => {
        normalizeState(data);
        const now = new Date().toISOString();
        const b = data.boards[cardNumber] || { firstOpenedAt: now, lastOpenedAt: now, openCount: 0 };
        b.deepestFloorReached = Math.max(b.deepestFloorReached || 0, 1);
        b.deepestFloorCompletedAt = b.deepestFloorCompletedAt || now;
        data.boards[cardNumber] = b;
        grantWs(data, 'deep_floor', cardNumber, 2);
        persist(data);
        return data;
      });
    },

    /** Solve First completion.
     * Rewards careful evidence, explanation and transfer, not speed. The W
     * award is one-time (grantWs dedupes by ref) while the learner's best
     * reasoning record can improve on a replay. */
    recordDiscoveryComplete(discoveryId, result = {}) {
      update(data => {
        if (!discoveryId) return data;
        normalizeState(data);
        const now = new Date().toISOString();
        const previous = data.discoveries[discoveryId] || {};
        const reasoningScore =
          Math.min(result.evidenceCount || 0, 4) +
          (result.patternFound || result.explained ? 2 : 0) +
          (result.compared ? 1 : 0) +
          (result.transferFirstTry ? 2 : result.transferred ? 1 : 0) +
          (result.usedHint ? 0 : 1);

        data.discoveries[discoveryId] = {
          firstCompletedAt: previous.firstCompletedAt || now,
          lastCompletedAt: now,
          attempts: (previous.attempts || 0) + 1,
          bestReasoningScore: Math.max(previous.bestReasoningScore || 0, reasoningScore),
          evidenceCount: Math.max(previous.evidenceCount || 0, result.evidenceCount || 0),
          explained: previous.explained || !!result.explained,
          patternFound: previous.patternFound || !!result.patternFound,
          compared: previous.compared || !!result.compared,
          transferFirstTry: previous.transferFirstTry || !!result.transferFirstTry,
          independent: previous.independent || !result.usedHint
        };

        data.activity[dayKey()] = (data.activity[dayKey()] || 0) + 1;
        grantWs(data, 'discovery', discoveryId, result.reward || 0, { bonus: true });
        persist(data);
        return data;
      });
    },

    recordWorkshopComplete(moduleId, score, total, options = {}) {
      update(data => {
        normalizeState(data);
        const now = new Date().toISOString();
        data.activity[dayKey()] = (data.activity[dayKey()] || 0) + 1;
        if (moduleId && total > 0) {
          grantWs(data, 'workshop', moduleId, score + 3, { bonus: true });
          enqueueAttempt(data, 'workshop', {
            moduleId,
            score,
            total,
            bestStreak: options.bestStreak || 0,
            isChallenge: !!options.isChallenge,
            completedAt: now,
            metadata: options.metadata || {}
          });
        }
        persist(data);
        return data;
      });
    },

    /** +1 W per correct answer — called live from Quiz / Checkpoint as each
     *  answer lands, so the toast fires immediately. Repeatable so retakes
     *  earn again (the real anti-farming gate is the 200-event cap). */
    grantCorrectAnswer() {
      update(data => {
        normalizeState(data);
        grantWs(data, 'quiz_correct', `${Date.now()}:${Math.random().toString(16).slice(2, 6)}`, 1, { repeatable: true });
        persist(data);
        return data;
      });
    },

    /** +1 W per correct checkpoint answer (non-repeatable per board boundary). */
    grantCheckpointCorrect(boardIndex) {
      update(data => {
        normalizeState(data);
        grantWs(data, 'checkpoint_correct', `cp:${boardIndex}`, 1);
        persist(data);
        return data;
      });
    },

    /** +2 W bonus when all 3 checkpoint answers are correct. */
    grantCheckpointPerfect(boardIndex) {
      update(data => {
        normalizeState(data);
        grantWs(data, 'checkpoint_perfect', `cp_perfect:${boardIndex}`, 2, { bonus: true });
        persist(data);
        return data;
      });
    },

    /** Daily Workout finished: activity tick + one W bundle per day (score+5,
     *  keyed by day so repeat rounds are for love, not farming). */
    recordWorkoutComplete(score, total) {
      update(data => {
        normalizeState(data);
        data.activity[dayKey()] = (data.activity[dayKey()] || 0) + 1;
        if (total > 0) grantWs(data, 'workout', dayKey(), score + 5, { bonus: true });
        persist(data);
        return data;
      });
    },

    /**
     * A short, honest check after both directions of a concept are complete.
     * The event reference carries the next recall stage, allowing the existing
     * W-event sync to preserve the schedule without a new database table.
     */
    recordPairedRecallResult(moduleId, passed) {
      update(data => {
        normalizeState(data);
        const pairs = getAllSolveFirst();
        const journey = buildPairedJourneyStates(pairs, data)
          .find((item) => item.moduleId === moduleId);
        if (!journey?.completed || !journey.recallDue) return data;

        const nextStage = passed
          ? Math.min(journey.recallStage + 1, PAIR_RECALL_INTERVALS_DAYS.length - 1)
          : 0;
        const now = Date.now();
        const type = passed ? 'pair_recall_pass' : 'pair_recall_retry';
        const reward = passed ? 5 : 1;

        data.activity[dayKey()] = (data.activity[dayKey()] || 0) + 1;
        grantWs(data, type, `${moduleId}|${nextStage}|${now}`, reward, { bonus: passed });
        persist(data);
        return data;
      });
    },

    recordQuizResult(pathId, score, total) {
      update(data => {
        normalizeState(data);
        const now = new Date().toISOString();
        data.activity[dayKey()] = (data.activity[dayKey()] || 0) + 1;
        const p = data.paths[pathId] || { firstOpenedAt: now, lastOpenedAt: now, quiz: {} };
        if (!p.quiz) p.quiz = {};
        const q = p.quiz;
        const ratio = total > 0 ? score / total : 0;

        // Per-correct-answer Ws are now granted live via grantCorrectAnswer() —
        // only bonuses remain here.
        if (ratio >= 0.6) grantWs(data, 'quiz_first_pass', pathId, 5, { bonus: true });
        if (total > 0 && score === total) grantWs(data, 'quiz_perfect', pathId, 10, { bonus: true });

        if (q.bestScore == null || score / Math.max(total, 1) > (q.bestScore || 0) / Math.max(q.bestTotal || 1, 1)) {
          q.bestScore = score;
          q.bestTotal = total;
        }
        if (ratio >= WELL_READ_RATIO && !q.firstPassAt) q.firstPassAt = now;
        if (ratio >= MASTERED_RATIO && !q.masteredOnceAt) q.masteredOnceAt = now;
        if (ratio >= MASTERED_RATIO && p.firstOpenedAt) {
          const gapDays = (new Date(now) - new Date(p.firstOpenedAt)) / DAY_MS;
          if (gapDays >= MASTERED_TWICE_GAP_DAYS && !q.recalledMasteredTwiceAt) {
            q.recalledMasteredTwiceAt = now;
          }
        }

        p.quiz = q;
        p.lastOpenedAt = now;
        data.paths[pathId] = p;

        const qh = data.quizzes[pathId] || [];
        qh.push({ score, total, completedAt: now });
        data.quizzes[pathId] = qh;
        enqueueAttempt(data, 'quiz', { pathId, score, total, completedAt: now });

        persist(data);
        return data;
      });
    },

    getPathState(pathId, manifest) {
      const data = get({ subscribe });
      const p = data.paths[pathId];
      if (!manifest) return { state: 'unknown', label: 'Unknown' };
      if (!p || !p.firstOpenedAt) {
        return { state: 'unwandered', label: 'Not started', boardsRead: 0, boardsTotal: manifest.cards?.length || 0 };
      }

      const allRead = manifest.cards.every(n => data.boards[n] && data.boards[n].firstOpenedAt);
      const gapDays = (new Date(p.lastOpenedAt) - new Date(p.firstOpenedAt)) / DAY_MS;
      const recalled = gapDays >= RECALL_GAP_DAYS;
      const q = p.quiz || {};
      const hasQuiz = manifest.quizUrls && manifest.quizUrls.length > 0;
      const wellRead = hasQuiz && !!q.firstPassAt;
      const masteredOnce = hasQuiz && !!q.masteredOnceAt;
      const masteredTwice = hasQuiz && !!q.recalledMasteredTwiceAt;

      let state = 'wandered', label = 'In progress';
      if (allRead) { state = 'checked'; label = 'Checked'; }
      if (wellRead) { state = 'well_read'; label = 'Well read'; }
      if (recalled) { state = 'recalled'; label = 'Recalled'; }
      if (masteredOnce) { state = 'mastered_1'; label = 'Mastered x1'; }
      if (masteredTwice) { state = 'mastered_2'; label = 'Mastered x2'; }

      const boardsRead = manifest.cards.filter(n => data.boards[n] && data.boards[n].firstOpenedAt).length;

      return {
        state, label, boardsRead, boardsTotal: manifest.cards.length,
        allRead, recalled, wellRead, masteredOnce, masteredTwice,
        bestScore: q.bestScore ?? null, bestTotal: q.bestTotal ?? null
      };
    },

    getBoardState(cardNumber) {
      const data = get({ subscribe });
      const b = data.boards[cardNumber];
      return { state: b && b.firstOpenedAt ? 'checked' : 'unwandered' };
    },

    getOverall() {
      const data = get({ subscribe });
      return { read: Object.keys(data.boards).length };
    },

    getStreak() {
      return computeStreak(get({ subscribe }).activity || {});
    },

    getWs() {
      return get({ subscribe }).ws?.total || 0;
    },

    getWeeklyPoints() {
      const data = get({ subscribe });
      const wk = weekKey();
      const earned = data.ws?.week?.key === wk ? data.ws.week.earned : 0;
      const monday = weekStart();
      let activeDays = 0;
      for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(d.getDate() + i);
        if (d > new Date()) break;
        if (data.activity?.[dayKey(d)]) activeDays++;
      }
      return earned + 10 * activeDays;
    },

    getPairedJourneys() {
      return buildPairedJourneyStates(getAllSolveFirst(), get({ subscribe }));
    },

    getExpansionSummary() {
      return buildExpansionSummary(getAllSolveFirst(), get({ subscribe }));
    },

    getDueBoards(limit = 10) {
      const data = get({ subscribe });
      const now = Date.now();
      return Object.entries(data.boards)
        .filter(([, b]) => b.recall?.dueAt && new Date(b.recall.dueAt).getTime() <= now)
        .sort((a, b) => new Date(a[1].recall.dueAt) - new Date(b[1].recall.dueAt))
        .slice(0, limit)
        .map(([n, b]) => ({ cardNumber: +n, dueAt: b.recall.dueAt, stage: b.recall.stage }));
    },

    getDueCount() {
      const data = get({ subscribe });
      const now = Date.now();
      return Object.values(data.boards)
        .filter(b => b.recall?.dueAt && new Date(b.recall.dueAt).getTime() <= now).length;
    },

    recordRecallResult(cardNumber, passed) {
      update(data => {
        normalizeState(data);
        const b = data.boards[cardNumber];
        if (!b?.recall) return data;
        const wasDue = new Date(b.recall.dueAt).getTime() <= Date.now();
        data.activity[dayKey()] = (data.activity[dayKey()] || 0) + 1;

        if (passed) {
          const nextStage = Math.min((b.recall.stage || 0) + 1, RECALL_INTERVALS.length - 1);
          b.recall = {
            stage: nextStage,
            passes: (b.recall.passes || 0) + 1,
            dueAt: new Date(Date.now() + RECALL_INTERVALS[nextStage] * DAY_MS).toISOString(),
          };
          if (wasDue) grantWs(data, 'recall', `${cardNumber}:${b.recall.dueAt}`, 5, { repeatable: true, bonus: true });
        } else {
          b.recall = {
            stage: 0,
            passes: b.recall.passes || 0,
            dueAt: new Date(Date.now() + RECALL_INTERVALS[0] * DAY_MS).toISOString(),
          };
        }
        data.boards[cardNumber] = b;
        persist(data);
        return data;
      });
    },

    getActivity(n = 7) {
      const act = get({ subscribe }).activity || {};
      const out = [];
      for (let i = n - 1; i >= 0; i--) {
        const dt = new Date();
        dt.setDate(dt.getDate() - i);
        const key = dayKey(dt);
        out.push({ key, weekday: 'SMTWTFS'[dt.getDay()], count: act[key] || 0, active: !!act[key] });
      }
      return out;
    },

    getPace() {
      const data = get({ subscribe });
      const since = Date.now() - 7 * DAY_MS;
      let n = 0;
      for (const k in data.boards) {
        const t = data.boards[k].firstOpenedAt;
        if (t && new Date(t).getTime() >= since) n++;
      }
      return n;
    },

    getMedals() {
      const data = get({ subscribe });
      const boardCount = Object.keys(data.boards).length;
      const quizzes = Object.values(data.quizzes || {});
      const quizCount = quizzes.reduce((a, arr) => a + (arr ? arr.length : 0), 0);
      const perfect = quizzes.some(arr => (arr || []).some(q => q.total > 0 && q.score === q.total));
      const topicComplete = Object.values(PATHS).some(m => m.cards.every(n => data.boards[n] && data.boards[n].firstOpenedAt));
      return [
        { key: 'first_board', label: 'First board', earned: boardCount >= 1 },
        { key: 'first_quiz', label: 'First check', earned: quizCount >= 1 },
        { key: 'streak_7', label: '7-day streak', earned: computeStreak(data.activity || {}) >= 7 },
        { key: 'topic_complete', label: 'Topic complete', earned: topicComplete },
        { key: 'perfect_quiz', label: 'Perfect check', earned: perfect }
      ];
    },

    reset() {
      const empty = emptyState();
      set(empty);
      persist(empty);
    }
  };
}

export const progress = createProgressStore();
