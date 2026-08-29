import './lib/styles/global.css';
import { inject } from '@vercel/analytics';
import App from './App.svelte';
import { appEnvironment } from './lib/environment.js';

// Privacy-friendly, cookieless usage analytics (enable "Web Analytics" in the
// Vercel project dashboard). Beacons go to /_vercel, which the gate exempts.
if (appEnvironment.analyticsEnabled) inject();

if (appEnvironment.isTest) {
  document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, nofollow');
}

const app = new App({
  target: document.getElementById('app')
});

// Remove the static SEO/splash first-paint now that the Svelte app has mounted.
document.getElementById('seo-splash')?.remove();

// Register service worker
if (appEnvironment.serviceWorkerEnabled && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
} else if ('serviceWorker' in navigator) {
  // Preview deployments should never be masked by an old production cache.
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
    .catch(() => {});
}

export default app;
