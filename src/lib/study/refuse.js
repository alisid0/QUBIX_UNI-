// Hard refusals for the chair. Study rooms are not care, not a live ops desk,
// and not an answer dump.

const PATIENT = /\b(my|our|the)\s+(patient|casualty|victim)\b|\b(bp|blood pressure|spo2|dose|dosing|intubat|airway)\b.*\b(now|currently|unstable|crashing)\b/i;
const CRISIS = /\b(call\s+999|call\s+911|overdose|anaphylaxis|cardiac arrest|can't breathe|cannot breathe)\b/i;
const LIVE_SECRETS = /\b(api[_-]?key|password|secret[_-]?key|connection string|live customer (email|phone|address))\b/i;
const ANSWER_DUMP = /\b(just )?(tell|give|dump) (me|us|them) the (answer|answers|solution)\b|\bwhat('s| is) the (right|correct) answer\b|\banswer key\b/i;
const REAL_NAMED_PERSON = /\b(mr|mrs|ms|dr)\s+[A-Z][a-z]+\s+(is|has|presents)\b/;

export function refuseKind(text) {
  const value = String(text || '');
  if (PATIENT.test(value) || REAL_NAMED_PERSON.test(value)) return 'named-patient';
  if (CRISIS.test(value)) return 'live-crisis';
  if (LIVE_SECRETS.test(value)) return 'live-secrets';
  if (ANSWER_DUMP.test(value)) return 'answer-dump';
  return null;
}

export function refusalCopy(kind) {
  if (kind === 'named-patient' || kind === 'live-crisis') {
    return 'This is a study room, not care and not a live incident desk. If someone is in danger, contact emergency services. We can only study the published algorithm or the Superstore example, with no named real person.';
  }
  if (kind === 'live-secrets') {
    return 'Do not paste live credentials or real customer contact details. Use the Superstore examples in this atom.';
  }
  if (kind === 'answer-dump') {
    return 'The chair will not dump the answer. Attempt the item, then we check the process.';
  }
  return 'Stay on the pinned atom.';
}

export function revealsAnswer(text, check) {
  if (!check?.answer) return false;
  const haystack = String(text || '').toLowerCase();
  const answer = String(check.answer).toLowerCase();
  if (!haystack.includes(answer)) return false;
  const option = check.options?.find(entry => entry[0] === check.answer);
  const label = String(option?.[1] || '').toLowerCase();
  if (label && haystack.includes(label) && haystack.length < label.length + 40) return true;
  return new RegExp(`\\b${answer}\\b`).test(haystack) && /\b(is|equals|answer)\b/.test(haystack);
}
