const DEFAULT_PREFERENCES = Object.freeze({
  cadence: 'daily',
  reminderTime: '18:00'
});

export function normalizeUpdatePreferences(value) {
  const input = value && typeof value === 'object' ? value : {};
  return {
    cadence: ['daily', 'weekdays', 'weekly'].includes(input.cadence)
      ? input.cadence
      : DEFAULT_PREFERENCES.cadence,
    reminderTime: /^([01]\d|2[0-3]):[0-5]\d$/.test(input.reminderTime || '')
      ? input.reminderTime
      : DEFAULT_PREFERENCES.reminderTime
  };
}

export function buildLearningSummary({ completion, next, origin = 'https://qubix.university' }) {
  const done = Number(completion?.done) || 0;
  const total = Number(completion?.total) || 0;
  const percent = Number(completion?.percent) || 0;
  const lines = [
    'My Qubix learning summary',
    `${done} of ${total} live steps complete (${percent}%).`
  ];

  if (next?.asset?.label) {
    const kind = next.kind === 'play' ? 'Play' : 'Read';
    lines.push(`Next: ${kind} “${next.asset.label}” in ${next.stage.title}.`);
    lines.push(new URL(next.asset.href, origin).href);
  } else {
    lines.push('Every currently available step is complete.');
    lines.push(new URL('/', origin).href);
  }

  return lines.join('\n');
}

export function whatsAppShareUrl(summary) {
  return `https://wa.me/?text=${encodeURIComponent(summary)}`;
}

export function emailShareUrl(summary) {
  return `mailto:?subject=${encodeURIComponent('My Qubix learning summary')}&body=${encodeURIComponent(summary)}`;
}

