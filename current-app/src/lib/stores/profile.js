import { writable, get } from 'svelte/store';
import { supabase } from '../supabase.js';
import { user } from './auth.js';

const KEY = 'qubix-profile-v1';

const DEFAULT_PROFILE = {
  username: '',
  ageBand: '',
  learningGoal: '',
  dailyGoalMinutes: 10,
  selectedTopics: [],
  heardFrom: '',
  learnerType: '',
  onboardingCompleted: false
};

function normalizeUsername(value = '') {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
}

function fallbackUsername(currentUser) {
  const fromMeta = currentUser?.user_metadata?.display_name || '';
  const fromEmail = currentUser?.email?.split('@')?.[0] || '';
  const base = normalizeUsername(fromMeta || fromEmail || 'learner');
  const suffix = currentUser?.id ? `_${currentUser.id.replaceAll('-', '').slice(0, 8)}` : '';
  return `${base.length >= 3 ? base : 'learner'}${suffix}`.slice(0, 40);
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

function saveLocal(value) {
  try { localStorage.setItem(KEY, JSON.stringify(value)); } catch {}
}

function fromRemote(row) {
  if (!row) return null;
  return {
    username: row.internal_username || '',
    ageBand: row.age_band || '',
    learningGoal: row.learning_goal || '',
    dailyGoalMinutes: row.daily_goal_minutes || 10,
    selectedTopics: Array.isArray(row.selected_topics) ? row.selected_topics : [],
    heardFrom: row.heard_from || '',
    learnerType: row.learner_type || '',
    onboardingCompleted: !!row.onboarding_completed
  };
}

function toRemote(value, currentUser) {
  return {
    user_id: currentUser.id,
    internal_username: normalizeUsername(value.username) || fallbackUsername(currentUser),
    age_band: value.ageBand || null,
    learning_goal: value.learningGoal || null,
    daily_goal_minutes: value.dailyGoalMinutes || 10,
    selected_topics: value.selectedTopics || [],
    heard_from: value.heardFrom || null,
    learner_type: value.learnerType || null,
    onboarding_completed: !!value.onboardingCompleted
  };
}

function createProfileStore() {
  const { subscribe, set, update } = writable(loadLocal());

  async function save(partial) {
    const next = { ...get({ subscribe }), ...partial };
    next.username = normalizeUsername(next.username);
    set(next);
    saveLocal(next);
    await syncRemote(next);
    return next;
  }

  async function syncRemote(value) {
    const currentUser = get(user);
    if (!currentUser) return;
    try {
      await supabase
        .from('user_profiles')
        .upsert(toRemote(value, currentUser), { onConflict: 'user_id' });
    } catch (_) {
      // The secure user-data migration may not be live yet. Local data remains.
    }
  }

  return {
    subscribe,

    async init() {
      const local = loadLocal();
      const currentUser = get(user);
      if (!currentUser) {
        set(local);
        return local;
      }

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', currentUser.id)
          .maybeSingle();
        if (error) throw error;

        const merged = { ...local, ...(fromRemote(data) || {}) };
        if (!merged.username) merged.username = fallbackUsername(currentUser);
        set(merged);
        saveLocal(merged);
        return merged;
      } catch (_) {
        const fallback = { ...local, username: local.username || fallbackUsername(currentUser) };
        set(fallback);
        saveLocal(fallback);
        return fallback;
      }
    },

    save,

    async complete(partial) {
      return save({ ...partial, onboardingCompleted: true });
    },

    resetLocal() {
      const empty = { ...DEFAULT_PROFILE };
      set(empty);
      saveLocal(empty);
    }
  };
}

export const profile = createProfileStore();
