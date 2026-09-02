// Public URLs are words, not implementation instructions.
//
// The application originally exposed its router as query parameters such as
// `?mode=game&mission=checkout`. Those addresses remain compatible, but every
// learner-facing state now has one descriptive path used by links, canonicals
// and the sitemap. Parameters remain appropriate for non-page input such as a
// wiki search term.

const pathParts = pathname => pathname.split('/').filter(Boolean).map(decodeURIComponent);

export function paramsForPath(pathname) {
  const parts = pathParts(pathname);
  const params = new URLSearchParams();

  if (!parts.length) return params;
  if (parts[0] === 'builder') { params.set('mode', 'builder'); return params; }
  if (parts[0] === 'updates') { params.set('mode', 'updates'); return params; }
  // The learning floor. One segment, no state in the path: where a learner is
  // comes from their own progress, not from the URL.
  if (parts[0] === 'start') { params.set('mode', 'start'); return params; }
  // One stage of the floor on its own page. The whole floor is 27 pairs and a
  // long scroll; a stage is the unit a learner is actually working through.
  if (parts[0] === 'floor' && parts[1]) {
    params.set('mode', 'start'); params.set('stage', parts[1]); return params;
  }
  if (parts[0] === 'showcase') {
    params.set('mode', parts[1] === 'demo' ? 'showcase-demo' : 'showcase'); return params;
  }
  if (parts[0] === 'academy') {
    params.set('mode', 'game');
    if (parts[1] === 'missions' && parts[2]) {
      params.set('mission', parts[2]);
      if (parts[2] === 'classify-data' && parts[3] === 'variations' && parts[4]) params.set('variation', parts[4]);
      if (parts[2] === 'campaign' && parts[3] === 'complete') params.set('screen', 'complete');
      if (parts[2] === 'role-game' && parts[3]) params.set('role', parts[3]);
    }
    if (parts[1] === 'campaign') params.set('mission', 'campaign');
    if (parts[1] === 'roles') params.set('mission', 'role-game');
    return params;
  }
  if (parts[0] === 'learn' && parts[1] === 'foundations') {
    params.set('mode', 'game'); params.set('mission', 'foundations'); return params;
  }
  if (parts[0] === 'learn' && parts[1] === 'data-foundations') {
    params.set('mode', 'game'); params.set('mission', 'shared-book');
    if (parts[2] === 'chapter' && parts[3]) params.set('chapter', parts[3]);
    if (parts[4] === 'session' && parts[5]) params.set('session', parts[5]);
    return params;
  }
  if (parts[0] === 'superstore') {
    params.set('mode', 'game'); params.set('mission', 'store');
    if (parts[1] === 'rooms' && parts[2]) params.set('room', parts[2]);
    return params;
  }
  if (parts[0] === 'wiki') {
    params.set('mode', 'wiki');
    if (parts[1] === 'terms' && parts[2]) params.set('term', parts[2]);
    if (parts[1] === 'books' || parts[1] === 'world') params.set('section', parts[1]);
    if (parts[1] === 'phase' && parts[2]) params.set('phase', parts[2]);
    return params;
  }
  if (parts[0] === 'dsa') {
    const mode = {
      introduction: 'dsa-introduction-preview',
      sequences: 'dsa-sequence-preview',
      'arrays/insertion': 'dsa-array-insertion-preview',
      'arrays/growth': 'dsa-array-growth-preview'
    }[parts.slice(1).join('/')];
    if (mode) params.set('mode', mode);
    return params;
  }
  if (parts.join('/') === 'tools/data-console') params.set('lab', 'sql');
  if (parts.join('/') === 'pilot/variables-and-rates') params.set('prototype', 'variables-and-rates');
  return params;
}

export function paramsForLocation(location) {
  const params = paramsForPath(location.pathname);
  for (const [key, value] of new URLSearchParams(location.search)) params.set(key, value);
  return params;
}

const finish = (path, params) => {
  const rest = params.toString();
  return `${path}${rest ? `?${rest}` : ''}`;
};

export function cleanPathForParams(input) {
  const params = new URLSearchParams(input);
  const mode = params.get('mode');
  const mission = params.get('mission');
  let path = null;

  if (params.get('lab') === 'sql') {
    params.delete('lab'); path = '/tools/data-console';
  } else if (mode === 'builder') {
    params.delete('mode'); path = '/builder';
  } else if (mode === 'updates') {
    params.delete('mode'); path = '/updates';
  } else if (mode === 'start') {
    const stage = params.get('stage');
    params.delete('mode');
    if (stage) { params.delete('stage'); path = `/floor/${stage}`; }
    else path = '/start';
  } else if (mode === 'showcase') {
    params.delete('mode'); path = '/showcase';
  } else if (mode === 'showcase-demo') {
    params.delete('mode'); path = '/showcase/demo';
  } else if (['variables-and-rates', 'change-lab'].includes(params.get('prototype')) || mode === 'learner') {
    params.delete('prototype'); params.delete('mode'); path = '/pilot/variables-and-rates';
  } else if (mode === 'wiki') {
    params.delete('mode');
    const section = params.get('section');
    const phase = params.get('phase');
    const term = params.get('term');
    if (term) { params.delete('term'); path = `/wiki/terms/${term}`; }
    else if (section) { params.delete('section'); path = `/wiki/${section}`; }
    else if (phase !== null) { params.delete('phase'); path = `/wiki/phase/${phase}`; }
    else path = '/wiki';
  } else if (mode?.startsWith('dsa-')) {
    params.delete('mode');
    path = {
      'dsa-introduction-preview': '/dsa/introduction',
      'dsa-sequence-preview': '/dsa/sequences',
      'dsa-array-insertion-preview': '/dsa/arrays/insertion',
      'dsa-array-growth-preview': '/dsa/arrays/growth'
    }[mode] || null;
  } else if (mode === 'game') {
    params.delete('mode'); params.delete('mission');
    if (!mission) path = '/academy';
    else if (mission === 'foundations') path = '/learn/foundations';
    else if (mission === 'shared-book') {
      const chapter = params.get('chapter');
      const session = params.get('session');
      params.delete('chapter'); params.delete('session');
      path = chapter && session
        ? `/learn/data-foundations/chapter/${chapter}/session/${session}`
        : '/learn/data-foundations';
    } else if (mission === 'store') {
      const room = params.get('room'); params.delete('room');
      path = room ? `/superstore/rooms/${room}` : '/superstore';
    } else if (mission === 'classify-data' && params.get('variation')) {
      const variation = params.get('variation'); params.delete('variation');
      path = `/academy/missions/classify-data/variations/${variation}`;
    } else if (mission === 'campaign' && params.get('screen') === 'complete') {
      params.delete('screen'); path = '/academy/missions/campaign/complete';
    } else if (mission === 'role-game' && params.get('role')) {
      const role = params.get('role'); params.delete('role');
      path = `/academy/missions/role-game/${role}`;
    } else if (mission === 'campaign') path = '/academy/campaign';
    else if (mission === 'role-game') path = '/academy/roles';
    else path = `/academy/missions/${mission}`;
  }

  return path ? finish(path, params) : null;
}

export function cleanPathForHref(href) {
  const url = new URL(href, 'https://qubix.university');
  const clean = cleanPathForParams(paramsForLocation(url));
  return clean || `${url.pathname}${url.search}`;
}

export function installCleanLinkRewriter(root = document) {
  const rewrite = node => {
    const anchors = node.matches?.('a[href]') ? [node] : [...(node.querySelectorAll?.('a[href]') || [])];
    for (const anchor of anchors) {
      const raw = anchor.getAttribute('href');
      if (!raw || /^(?:https?:|mailto:|tel:|#)/i.test(raw)) continue;
      const clean = cleanPathForHref(raw);
      if (clean !== raw) anchor.setAttribute('href', clean);
    }
  };
  rewrite(root);
  const observer = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(rewrite)));
  observer.observe(root, { childList: true, subtree: true });
  return () => observer.disconnect();
}
