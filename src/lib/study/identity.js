// A seat needs a name. It does not need a social profile.
//
// Cross-device accounts stay gated until the founder authorises a Qubix session
// store. This identity lives on the device so a learner can take a seat, rebook,
// and export or delete their notebook without sending chat text anywhere.

const KEY = 'qx.study.identity.v1';

const blank = () => ({
  id: null,
  displayName: '',
  ageBand: null,
  createdAt: null
});

export function loadIdentity() {
  if (typeof localStorage === 'undefined') return blank();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!raw || typeof raw !== 'object') return blank();
    return {
      id: typeof raw.id === 'string' ? raw.id : null,
      displayName: typeof raw.displayName === 'string' ? raw.displayName : '',
      ageBand: raw.ageBand === '18+' || raw.ageBand === '13-17' ? raw.ageBand : null,
      createdAt: raw.createdAt || null
    };
  } catch {
    return blank();
  }
}

export function saveIdentity(patch) {
  const next = { ...loadIdentity(), ...patch };
  if (!next.id) next.id = makeLearnerId();
  if (!next.createdAt) next.createdAt = new Date().toISOString();
  if (typeof localStorage !== 'undefined') {
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode */ }
  }
  return next;
}

export function canStrangerMatch(identity = loadIdentity()) {
  return identity.ageBand === '18+';
}

export function makeLearnerId() {
  return `lrn_${randomCode(8)}`;
}

export function randomCode(length = 6) {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789';
  let out = '';
  const bytes = typeof crypto !== 'undefined' && crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(length))
    : Array.from({ length }, (_, i) => (Date.now() + i * 17) % 256);
  for (let i = 0; i < length; i += 1) out += alphabet[bytes[i] % alphabet.length];
  return out;
}
