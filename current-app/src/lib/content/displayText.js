/**
 * Convert internal content-pipeline terminology into learner-facing language.
 * "BB" remains valid in storage, tooling, references, and media paths; it must
 * never leak into copy shown by the app.
 */
export function learnerText(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/\bBBs\b/gi, 'boards')
    .replace(/\bBB\b/gi, 'Board');
}

function learnerKicker(value) {
  if (typeof value !== 'string') return value;
  // Pipeline identifiers are useful internally but add no meaning for learners.
  // Also catch already-normalized values that may exist in the offline cache.
  if (/^\s*(?:BB|Board)(?:-NEW)?(?:\s*[-–—]\s*|\s+)\d+\s*$/i.test(value)) return '';
  return learnerText(value);
}

function learnerLayer(layer) {
  if (typeof layer === 'string') return learnerText(layer);
  if (!layer || typeof layer !== 'object') return layer;

  // Only transform copy fields. In particular, leave audio/image URLs alone:
  // their internal filenames can legitimately contain "bb".
  const copy = { ...layer };
  for (const key of ['text', 'content', 'caption', 'alt', 'label', 'title']) {
    if (typeof copy[key] === 'string') copy[key] = learnerText(copy[key]);
  }
  return copy;
}

export function learnerBoard(board) {
  if (!board) return board;
  return {
    ...board,
    kicker: learnerKicker(board.kicker),
    title: learnerText(board.title),
    layers: Array.isArray(board.layers) ? board.layers.map(learnerLayer) : board.layers
  };
}

/** Use the first floor's summary as the short line beneath a board title. */
export function boardDescription(board) {
  const floor = board?.layers?.[0];
  const html = typeof floor === 'string' ? floor : floor?.text ?? floor?.content ?? '';
  return learnerText(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}
