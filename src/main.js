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

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

export default app;
