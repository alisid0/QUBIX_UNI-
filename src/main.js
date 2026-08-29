import './lib/styles/global.css';
import './lib/styles/mission-system.css';
import { inject } from '@vercel/analytics';
import App from './App.svelte';
import { cleanPathForParams, paramsForLocation } from './lib/routes/clean-paths.js';

// Privacy-friendly, cookieless usage analytics (enable "Web Analytics" in the
// Vercel project dashboard). Beacons go to /_vercel, which the gate exempts.
inject();

const app = new App({
  target: document.getElementById('app')
});

// index.html supplies homepage metadata to crawlers that do not run JavaScript.
// Once a route has mounted, add its clean canonical and reconcile the fallback
// with the route's Svelte head so the document has one description and one
// matching set of canonical/Open Graph values rather than competing versions.
function reconcileSeo() {
  const params = paramsForLocation(window.location);
  const clean = cleanPathForParams(params) || window.location.pathname;
  const canonical = new URL(clean.split('?')[0], 'https://qubix.university');

  const descriptions = [...document.querySelectorAll('meta[name="description"]')];
  const routeDescription = descriptions.find(meta => !meta.hasAttribute('data-default-seo'));
  if (routeDescription) {
    descriptions.filter(meta => meta !== routeDescription).forEach(meta => meta.remove());
  }

  const description = routeDescription?.content
    || document.querySelector('meta[name="description"]')?.content
    || '';
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  if (canonicalLink.href !== canonical.href) canonicalLink.href = canonical.href;

  const nonIndexable = params.get('mode')?.startsWith('dsa-')
    || ['review', 'factory', 'strata-factory', 'parts', 'exercises', 'assets'].includes(params.get('mode'));
  const robots = document.querySelector('meta[name="robots"]');
  if (robots) robots.content = nonIndexable ? 'noindex, follow' : 'index, follow';
  for (const [property, content] of [
    ['og:title', document.title],
    ['og:description', description],
    ['og:url', canonical.href]
  ]) {
    const meta = document.querySelector(`meta[property="${property}"]`);
    if (meta && meta.content !== content) meta.content = content;
  }
}

reconcileSeo();

// Mission views are code-split, so their <svelte:head> nodes can arrive after
// the root component mounts. Reconcile again whenever Svelte changes the head
// instead of racing those imports with a fixed timeout.
let seoQueued = false;
const seoObserver = new MutationObserver(() => {
  if (seoQueued) return;
  seoQueued = true;
  queueMicrotask(() => {
    seoQueued = false;
    reconcileSeo();
  });
});
seoObserver.observe(document.head, { childList: true, characterData: true, subtree: true });

// The static structured data describes the homepage course, not a mission or
// wiki route. Do not leave that claim in the hydrated DOM on another page.
if (window.location.pathname !== '/' || window.location.search) {
  document.querySelector('script[type="application/ld+json"]')?.remove();
}

// Remove the static SEO/splash first-paint now that the Svelte app has mounted.
document.getElementById('seo-splash')?.remove();

// Keep authoring routes on the live Vite module graph. A production service
// worker previously cached development modules on localhost, which could leave
// Factory pages on stale source and stale styles after an edit.
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  } else {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .then(() => caches.keys())
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => {});
  }
}

export default app;
