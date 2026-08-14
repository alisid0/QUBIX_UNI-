// api/csp-report.js — Vercel serverless collector for CSP violation reports.
//
// See docs/engineering/CSP-REPORTING.md for the full design.
//
// DORMANT until vercel.json references it. Nothing sends reports here yet:
// the CSP in vercel.json has no `report-to` / `report-uri` directive. This
// endpoint deploys as a no-op that simply 204s, so it is safe to ship ahead of
// the header change. Wire it only after confirming it responds.
//
// Design constraints (a CSP endpoint is public and spam-heavy by nature):
//   - Accept POST only.
//   - Cap body size; reject oversized payloads without parsing them.
//   - Never throw on bad input — malformed reports get 204, never a 5xx that
//     would trigger browser retry storms.
//   - Drop browser/extension noise (chrome-extension:, moz-extension:, about,
//     data) that floods every CSP endpoint.
//   - Log a TRIMMED summary only. document-uri is personal data (it reveals
//     which board a user viewed); log its path, not its query string, and never
//     log the client IP. The log is a diagnostic tail, not a data store.
//   - Always respond fast.

const MAX_BODY_BYTES = 8 * 1024;

const NOISE_PREFIXES = [
  'chrome-extension:',
  'moz-extension:',
  'safari-extension:',
  'about',
  'data:',
  'blob:'
];

function pathOnly(uri) {
  if (typeof uri !== 'string' || !uri) return '';
  try {
    return new URL(uri).pathname;
  } catch (_) {
    // Relative or malformed — strip any query/fragment by hand.
    return uri.split('?')[0].split('#')[0].slice(0, 200);
  }
}

function isNoise(blockedUri) {
  if (typeof blockedUri !== 'string') return false;
  return NOISE_PREFIXES.some((p) => blockedUri.startsWith(p));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end();
    return;
  }

  // Vercel may pre-parse JSON; tolerate both parsed and raw bodies without
  // ever throwing.
  let report;
  try {
    let body = req.body;

    if (typeof body === 'string') {
      if (body.length > MAX_BODY_BYTES) {
        res.status(204).end();
        return;
      }
      body = JSON.parse(body);
    }

    // Both the legacy report-uri shape ({ "csp-report": {...} }) and the
    // Reporting-API shape (an array of { type, body }) are accepted.
    if (Array.isArray(body)) {
      report = body.find((r) => r?.type === 'csp-violation')?.body
        || body[0]?.body
        || {};
    } else {
      report = body?.['csp-report'] || body?.body || body || {};
    }
  } catch (_) {
    // Malformed — acknowledge and drop. Do not error.
    res.status(204).end();
    return;
  }

  const blockedUri = report['blocked-uri'] || report.blockedURL || '';

  if (!isNoise(blockedUri)) {
    // Trimmed, non-identifying summary. No full URLs, no IP.
    console.log('[csp-report]', JSON.stringify({
      directive: report['violated-directive'] || report.effectiveDirective || '',
      blocked: pathOnly(blockedUri) || String(blockedUri).slice(0, 120),
      documentPath: pathOnly(report['document-uri'] || report.documentURL || '')
    }));
  }

  res.status(204).end();
}
