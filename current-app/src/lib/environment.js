const environment = import.meta.env.VITE_APP_ENV || (import.meta.env.PROD ? 'production' : 'development');

export const appEnvironment = Object.freeze({
  name: environment,
  isProduction: environment === 'production',
  isStaging: environment === 'staging',
  isTest: environment !== 'production',
  testToolsEnabled: environment !== 'production' && import.meta.env.VITE_ENABLE_TEST_TOOLS === 'true',
  analyticsEnabled: environment === 'production' && import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  serviceWorkerEnabled: environment === 'production' && import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
  siteUrl: import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin
});
