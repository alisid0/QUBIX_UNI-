const CACHE = 'qubix-university-v1';

const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-180.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(CORE.map((u) => cache.add(u)))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isFontHost(url) {
  return url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
}

async function cacheFirst(req) {
  const cached = await caches.match(req, { ignoreVary: true });
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    return cached || Response.error();
  }
}

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const cached = await caches.match(req, { ignoreVary: true });
    return cached || (await caches.match('./index.html')) || Response.error();
  }
}

const CONCEPT_PATH_RE = /^\/(physics|maths|chemistry|compare)\/[a-z0-9-]+/;

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (isFontHost(url)) {
    e.respondWith(cacheFirst(req));
    return;
  }

  if (url.origin !== self.location.origin) return;

  // SEO concept pages: never serve the app shell for these paths;
  // let the network deliver the static HTML directly.
  if (req.mode === 'navigate' && CONCEPT_PATH_RE.test(url.pathname)) {
    e.respondWith(fetch(req));
    return;
  }

  if (req.mode === 'navigate') {
    e.respondWith(networkFirst(req));
    return;
  }

  // Floor media (GIFs/PNGs/audio in /videos/) iterates frequently under the
  // same filename — network-first so a rebuilt asset shows up on next load,
  // with the cached copy as the offline fallback.
  if (url.pathname.startsWith('/videos/')) {
    e.respondWith(networkFirst(req));
    return;
  }

  e.respondWith(cacheFirst(req));
});
