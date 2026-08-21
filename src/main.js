import './lib/styles/global.css';
import { inject } from '@vercel/analytics';
import App from './App.svelte';

// Privacy-friendly, cookieless usage analytics (enable "Web Analytics" in the
// Vercel project dashboard). Beacons go to /_vercel, which the gate exempts.
inject();

const app = new App({
  target: document.getElementById('app')
});

// Remove the static SEO/splash first-paint now that the Svelte app has mounted.
document.getElementById('seo-splash')?.remove();

// Keep authoring routes on the live Vite module graph. A production service
// worker previously cached development modules on localhost, which could leave
// Factory pages on stale source and stale styles after an edit.
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  } else {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .then(() => caches.keys())
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => {});
  }
}

export default app;
