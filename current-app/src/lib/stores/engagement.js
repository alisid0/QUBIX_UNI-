import { writable, get } from 'svelte/store';
import { supabase } from '../supabase.js';
import { user } from './auth.js';

const KEY = 'qubix-engagement-v1';
const FLUSH_MS = 30 * 1000;

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { totalActiveSeconds: 0, sessions: [] };
  } catch {
    return { totalActiveSeconds: 0, sessions: [] };
  }
}

function saveLocal(value) {
  try { localStorage.setItem(KEY, JSON.stringify(value)); } catch {}
}

function createEngagementStore() {
  const { subscribe, set, update } = writable(loadLocal());
  let startedAt = null;
  let lastTick = null;
  let activeSeconds = 0;
  let route = 'home';
  let timer = null;
  let getRoute = () => route;

  function isActive() {
    return typeof document === 'undefined' || document.visibilityState === 'visible';
  }

  function tick() {
    const now = Date.now();
    if (!startedAt) {
      startedAt = now;
      lastTick = now;
      return;
    }
    if (isActive() && lastTick) activeSeconds += Math.max(0, Math.round((now - lastTick) / 1000));
    lastTick = now;
    route = getRoute?.() || route;
  }

  async function uploadSession(session) {
    const currentUser = get(user);
    if (!currentUser || !session.activeSeconds) return false;
    try {
      const { error } = await supabase.from('user_engagement_sessions').insert({
        user_id: currentUser.id,
        started_at: session.startedAt,
        ended_at: session.endedAt,
        active_seconds: session.activeSeconds,
        route: session.route,
        metadata: session.metadata || {}
      });
      if (error) throw error;
      return true;
    } catch (_) {
      return false;
    }
  }

  async function flush() {
    tick();
    if (!startedAt || activeSeconds < 5) return;

    const session = {
      startedAt: new Date(startedAt).toISOString(),
      endedAt: new Date().toISOString(),
      activeSeconds,
      route,
      metadata: {
        visibility: typeof document !== 'undefined' ? document.visibilityState : 'unknown'
      }
    };

    const uploaded = await uploadSession(session);
    update((data) => {
      const next = {
        totalActiveSeconds: (data.totalActiveSeconds || 0) + activeSeconds,
        sessions: uploaded ? data.sessions || [] : [...(data.sessions || []), session].slice(-50)
      };
      saveLocal(next);
      return next;
    });

    startedAt = Date.now();
    lastTick = startedAt;
    activeSeconds = 0;
  }

  async function retryQueued() {
    const currentUser = get(user);
    if (!currentUser) return;
    const data = get({ subscribe });
    const queued = data.sessions || [];
    if (!queued.length) return;

    const remaining = [];
    for (const session of queued) {
      const uploaded = await uploadSession(session);
      if (!uploaded) remaining.push(session);
    }

    const next = { ...data, sessions: remaining };
    set(next);
    saveLocal(next);
  }

  return {
    subscribe,

    start(routeGetter = () => 'home') {
      getRoute = routeGetter;
      startedAt = Date.now();
      lastTick = startedAt;
      activeSeconds = 0;
      route = getRoute();
      timer = setInterval(flush, FLUSH_MS);
      if (typeof window !== 'undefined') {
        window.addEventListener('pagehide', flush);
        window.addEventListener('beforeunload', flush);
      }
      if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') flush();
          else lastTick = Date.now();
        });
      }
      retryQueued();
      return () => this.stop();
    },

    async stop() {
      if (timer) clearInterval(timer);
      timer = null;
      await flush();
    },

    retryQueued,

    getTotalMinutes() {
      const data = get({ subscribe });
      return Math.floor((data.totalActiveSeconds || 0) / 60);
    }
  };
}

export const engagement = createEngagementStore();

