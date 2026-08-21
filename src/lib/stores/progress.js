import { writable, derived, get } from 'svelte/store';
import { boards } from '../content/course.js';
import { supabase } from '../supabase.js';

// The founder introduced XPs on 2026-08-10. Rewards are derived from factual
// progress so refreshing, replaying or migrating cannot duplicate them. There
// is still no streak or league: XPs signify learning progress, not social rank.
// The underlying record stays factual — what was cleared, when, and whether it
// took more than one attempt — so a recall view can be built later without
// having to invent history that was never captured.
//
// Recall intervals borrowed from Strata's model. Nothing is copied from that
// repo and nothing here syncs to Supabase, which AGENTS.md gates behind
// explicit founder authorisation.

const KEY = 'qubix-university-progress-v1';
const LEGACY_KEY = 'qubix-university-variables-rates-v3';
const DAY_MS = 24 * 60 * 60 * 1000;
export const RECALL_INTERVALS_DAYS = [1, 7, 21];

export const cloudProgressStatus = writable({ state: supabase ? 'connecting' : 'local', message: '' });

let replaceFromCloud = () => {};
let cloudUser = null;
let cloudReady = false;
let cloudSaveTimer = null;

export const TOTAL_SECTIONS = boards.reduce((n, b) => n + b.floors.length, 0);
export const XP_RULES = Object.freeze({ section: 10, firstTry: 5, subtopic: 20, course: 50 });

const TOTAL_CHECKS = boards.reduce((boardTotal, board) =>
  boardTotal + board.floors.reduce((floorTotal, floor) =>
    floorTotal + (floor.exercises?.length || (floor.exercise ? 1 : 0)), 0), 0);

function empty() {
  return { boardIndex: 0, floorIndex: 0, completed: {}, attempts: {}, startedAt: null, updatedAt: 0 };
}

function normalize(state) {
  const base = empty();
  const value = state && typeof state === 'object' ? state : {};
  return {
    ...base,
    ...value,
    boardIndex: Number.isInteger(value.boardIndex) ? value.boardIndex : 0,
    floorIndex: Number.isInteger(value.floorIndex) ? value.floorIndex : 0,
    completed: value.completed && typeof value.completed === 'object' ? value.completed : {},
    attempts: value.attempts && typeof value.attempts === 'object' ? value.attempts : {},
    updatedAt: Number.isFinite(value.updatedAt) ? value.updatedAt : 0
  };
}

function load() {
  const base = empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return normalize(JSON.parse(raw));
    // One-time migration from the lesson's own key, so nobody loses their place.
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const l = JSON.parse(legacy) || {};
      return normalize({
        ...base,
        boardIndex: Number.isInteger(l.boardIndex) ? l.boardIndex : 0,
        floorIndex: Number.isInteger(l.floorIndex) ? l.floorIndex : 0,
        completed: l.completed && typeof l.completed === 'object' ? l.completed : {}
      });
    }
  } catch (_) {}
  return base;
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (_) {}
}

function create() {
  const { subscribe, update, set } = writable(load());
  subscribe(state => {
    save(state);
    queueCloudSave(state);
  });

  replaceFromCloud = state => set(normalize(state));

  return {
    subscribe,
    setPosition(boardIndex, floorIndex) {
      update(s => ({ ...s, boardIndex, floorIndex, startedAt: s.startedAt ?? Date.now(), updatedAt: Date.now() }));
    },
    setCompleted(completed) {
      update(s => ({ ...s, completed: { ...completed }, updatedAt: Date.now() }));
    },
    // Called once per answered check. firstTime records whether it was cleared
    // without a wrong attempt, which is the only quality signal being kept.
    recordAttempt(key, { tries, firstTime }) {
      update(s => ({
        ...s,
        attempts: { ...s.attempts, [key]: { tries, firstTime, at: Date.now() } },
        updatedAt: Date.now()
      }));
    },
    reset() {
      set({ ...empty(), updatedAt: Date.now() });
      try {
        localStorage.removeItem(LEGACY_KEY);
      } catch (_) {}
    }
  };
}

export const progress = createIfBrowser();

function chooseNewest(localState, remoteState) {
  const local = normalize(localState);
  const remote = normalize(remoteState);
  if (remote.updatedAt > local.updatedAt) return remote;
  if (local.updatedAt > remote.updatedAt) return local;

  const localDone = Object.values(local.completed).filter(Boolean).length;
  const remoteDone = Object.values(remote.completed).filter(Boolean).length;
  return remoteDone > localDone ? remote : local;
}

async function writeCloud(state) {
  if (!supabase || !cloudUser) return false;
  const { error } = await supabase
    .from('learner_progress')
    .upsert({ user_id: cloudUser.id, state: normalize(state) }, { onConflict: 'user_id' });

  if (error) {
    cloudProgressStatus.set({ state: 'error', message: 'Progress is safe on this device, but cloud sync is unavailable.' });
    return false;
  }

  cloudProgressStatus.set({ state: 'synced', message: 'Progress synced.' });
  return true;
}

function queueCloudSave(state) {
  if (!cloudReady || !cloudUser || !supabase) return;
  clearTimeout(cloudSaveTimer);
  cloudProgressStatus.set({ state: 'syncing', message: 'Syncing progress…' });
  cloudSaveTimer = setTimeout(() => writeCloud(state), 350);
}

async function syncSession(session) {
  clearTimeout(cloudSaveTimer);
  cloudReady = false;
  cloudUser = session?.user || null;

  if (!supabase || !cloudUser) {
    cloudProgressStatus.set({ state: 'local', message: '' });
    return;
  }

  cloudProgressStatus.set({ state: 'syncing', message: 'Loading cloud progress…' });
  const localState = get(progress);
  const { data, error } = await supabase
    .from('learner_progress')
    .select('state')
    .eq('user_id', cloudUser.id)
    .maybeSingle();

  if (error) {
    cloudProgressStatus.set({ state: 'error', message: 'Progress is safe on this device, but cloud sync is unavailable.' });
    return;
  }

  const chosen = data?.state ? chooseNewest(localState, data.state) : normalize(localState);
  replaceFromCloud(chosen);
  cloudReady = true;
  await writeCloud(chosen);
}

if (typeof window !== 'undefined' && supabase) {
  supabase.auth.getSession().then(({ data }) => syncSession(data?.session));
  supabase.auth.onAuthStateChange((_event, session) => {
    setTimeout(() => syncSession(session), 0);
  });
}

function createIfBrowser() {
  if (typeof localStorage === 'undefined') {
    const { subscribe } = writable(empty());
    return { subscribe, setPosition() {}, setCompleted() {}, recordAttempt() {}, reset() {} };
  }
  return create();
}

// Facts about where the learner is, kept separate from the XP reward summary.
export const summary = derived(progress, s => {
  const doneCount = Object.keys(s.completed).filter(k => s.completed[k]).length;
  const perBoard = boards.map((b, i) => {
    const total = b.floors.length;
    const done = b.floors.filter((_, f) => s.completed[`${i}:${f}`]).length;
    return { id: b.id, title: b.title, marker: b.marker, total, done, complete: done === total };
  });
  const started = s.startedAt != null || doneCount > 0 || s.boardIndex > 0 || s.floorIndex > 0;
  const board = boards[s.boardIndex] || boards[0];
  return {
    started,
    boardIndex: s.boardIndex,
    floorIndex: s.floorIndex,
    boardTitle: board.title,
    boardMarker: board.marker,
    sectionNumber: s.floorIndex + 1,
    sectionCount: board.floors.length,
    boardNumber: s.boardIndex + 1,
    boardCount: boards.length,
    doneCount,
    totalSections: TOTAL_SECTIONS,
    percent: Math.round((doneCount / TOTAL_SECTIONS) * 100),
    perBoard
  };
});

// One stable score computed from completion facts. Attempt keys are
// board:section:check; a first-try bonus counts only after its section is also
// complete, so backing out of a solved check cannot award partial XP.
export const xpSummary = derived(progress, s => {
  const completedSections = Object.keys(s.completed).filter(key => s.completed[key]);
  const completedSet = new Set(completedSections);
  const firstTryChecks = Object.entries(s.attempts).filter(([key, attempt]) => {
    const [boardIndex, floorIndex] = key.split(':');
    return attempt?.firstTime && completedSet.has(`${boardIndex}:${floorIndex}`);
  }).length;
  const completedSubtopics = boards.filter((board, boardIndex) =>
    board.floors.every((_, floorIndex) => s.completed[`${boardIndex}:${floorIndex}`])).length;
  const courseComplete = completedSections.length === TOTAL_SECTIONS;

  const sectionXP = completedSections.length * XP_RULES.section;
  const masteryXP = firstTryChecks * XP_RULES.firstTry;
  const milestoneXP = completedSubtopics * XP_RULES.subtopic;
  const courseXP = courseComplete ? XP_RULES.course : 0;
  const total = sectionXP + masteryXP + milestoneXP + courseXP;
  const maximum = TOTAL_SECTIONS * XP_RULES.section
    + TOTAL_CHECKS * XP_RULES.firstTry
    + boards.length * XP_RULES.subtopic
    + XP_RULES.course;

  return {
    total,
    maximum,
    sectionXP,
    masteryXP,
    milestoneXP,
    courseXP,
    firstTryChecks,
    completedSubtopics,
    nextReward: courseComplete ? null : XP_RULES.section
  };
});

// What a recall view will need when it is built. Computed now so the data is
// there rather than invented later; nothing displays it yet.
export const dueForRecall = derived(progress, s => {
  const now = Date.now();
  return Object.entries(s.attempts)
    .map(([key, a]) => {
      const elapsedDays = (now - a.at) / DAY_MS;
      const nextInterval = RECALL_INTERVALS_DAYS.find(d => elapsedDays < d) ?? null;
      return { key, ...a, elapsedDays, due: nextInterval === null };
    })
    .filter(r => r.due);
});
