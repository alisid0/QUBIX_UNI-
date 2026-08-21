/**
 * Hash routes for SPA view restore on refresh.
 *
 * Examples:
 *   #/home
 *   #/path
 *   #/workshop
 *   #/workshop/functions
 *   #/workshop/functions/solve-first
 *   #/topic/MATH_FUNCTIONS
 *   #/subject/line
 *   #/reader/MATH_FUNCTIONS/1219
 *   #/reader/bb/1219
 *   #/quiz/MATH_FUNCTIONS
 *   #/wscore
 *   #/workout
 *   #/snippets
 *   #/author
 */

const TAB_VIEWS = new Set(['home', 'path', 'workshop', 'wscore']);
const SIMPLE_VIEWS = new Set(['home', 'path', 'wscore', 'workout', 'author', 'snippetMode']);

export function viewToHash({
  view,
  pathId = '',
  subjectId = 'line',
  workshopTarget = null,
  readerStart = 1
} = {}) {
  if (!view || view === 'loading' || view === 'auth' || view === 'onboarding') return '';

  if (view === 'topicDetail' && pathId) return `#/topic/${encodeURIComponent(pathId)}`;
  if (view === 'subject') return `#/subject/${encodeURIComponent(subjectId || 'line')}`;
  if (view === 'quiz' && pathId) return `#/quiz/${encodeURIComponent(pathId)}`;
  if (view === 'snippetMode') return '#/snippets';

  if (view === 'workshop') {
    const moduleId = typeof workshopTarget === 'string'
      ? workshopTarget
      : workshopTarget?.moduleId;
    const mode = typeof workshopTarget === 'object' ? workshopTarget?.mode : null;
    if (moduleId && mode && mode !== 'learn-first') {
      return `#/workshop/${encodeURIComponent(moduleId)}/${encodeURIComponent(mode)}`;
    }
    if (moduleId) return `#/workshop/${encodeURIComponent(moduleId)}`;
    return '#/workshop';
  }

  if (view === 'reader') {
    if (pathId) return `#/reader/${encodeURIComponent(pathId)}/${encodeURIComponent(String(readerStart))}`;
    return `#/reader/bb/${encodeURIComponent(String(readerStart))}`;
  }

  if (SIMPLE_VIEWS.has(view) || TAB_VIEWS.has(view)) return `#/${view}`;
  return '#/home';
}

export function parseHash(hash = typeof location !== 'undefined' ? location.hash : '', PATHS = {}) {
  const raw = String(hash || '').replace(/^#/, '').replace(/^\/+/, '').trim();
  if (!raw) return null;

  const parts = raw.split('/').map((p) => {
    try { return decodeURIComponent(p); } catch { return p; }
  }).filter(Boolean);

  const [head, a, b] = parts;
  if (!head) return null;

  if (head === 'home' || head === 'path' || head === 'wscore' || head === 'workout' || head === 'author') {
    return { view: head };
  }
  if (head === 'snippets') return { view: 'snippetMode' };

  if (head === 'topic' && a && PATHS[a]) {
    return { view: 'topicDetail', pathId: a };
  }
  if (head === 'subject' && a) {
    return { view: 'subject', subjectId: a };
  }
  if (head === 'quiz' && a && PATHS[a]) {
    return { view: 'quiz', pathId: a };
  }

  if (head === 'workshop') {
    if (!a) return { view: 'workshop', workshopTarget: null };
    if (b && b !== 'learn-first') {
      return { view: 'workshop', workshopTarget: { moduleId: a, mode: b } };
    }
    return { view: 'workshop', workshopTarget: a };
  }

  if (head === 'reader') {
    if (a === 'bb' && b) {
      const n = Number(b);
      if (!Number.isFinite(n)) return null;
      return { view: 'reader', pathId: '', numbers: [n], start: n };
    }
    if (a && PATHS[a]) {
      const cards = PATHS[a].cards || [];
      const start = b ? Number(b) : cards[0];
      if (!Number.isFinite(start)) return null;
      return {
        view: 'reader',
        pathId: a,
        numbers: cards.length ? cards : [start],
        start: cards.includes(start) ? start : (cards[0] || start)
      };
    }
  }

  return null;
}

export function stripAuthQuery() {
  if (typeof location === 'undefined' || typeof history === 'undefined') return;
  if (!location.search) return;
  const params = new URLSearchParams(location.search);
  if (!params.has('auth') && !params.has('path')) return;
  params.delete('auth');
  // Keep path query only if we have not moved it into the hash yet.
  const qs = params.toString();
  history.replaceState({}, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash || ''}`);
}
