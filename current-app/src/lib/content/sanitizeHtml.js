/**
 * Allowlist sanitiser for board content rendered with {@html}.
 *
 * Addresses F-01 in docs/engineering/2026-07-21-security-audit.md.
 *
 * WHY THIS EXISTS
 * ---------------
 * `cards.layers` is jsonb fetched from Supabase and rendered as raw HTML in
 * Reader.svelte and Snippets.svelte. `mathFormat.js` deliberately passes markup
 * through — it only rewrites text between tags. Nothing else in the render path
 * inspected that HTML, so anything in the column executed as script in every
 * user's browser. Sessions use persistSession:true, so an injected script could
 * read the access token out of localStorage.
 *
 * Only service_role can write `cards`, so this was never reachable by an
 * ordinary user. The realistic path is the authoring pipeline: ten scripts
 * write that column, several fed by AI drafting tools. A stray <script> or
 * onerror= in a draft becomes live JavaScript with no attacker involved.
 *
 * APPROACH
 * --------
 * Parse with the browser's own HTML parser, then walk the resulting tree and
 * delete anything not explicitly allowed. Regex-based HTML sanitisers are a
 * well-known source of bypasses; the parser is the part that must be correct,
 * and the browser's is far better tested than anything written here.
 *
 * DOMParser.parseFromString(html, 'text/html') does not execute scripts, does
 * not run inline event handlers, and does not fetch subresources. It builds an
 * inert document. Elements are then removed by name, and every attribute not on
 * the allowlist is stripped — which covers on* handlers, style, href, src,
 * srcset, formaction and anything else, present or future, without needing to
 * enumerate them.
 *
 * ALLOWLIST
 * ---------
 * Derived from what the content actually uses. Across deck.js, functionBoards,
 * matrixBoards, publishableTopicBoards and topicExpansionBoards:
 *
 *   p 838, strong 53, span 33, div 33, sup 24, sub 9, li 9, em 8, br 5, ul 1
 *
 * The only attribute used anywhere is `class`, and the only value is `vec`
 * (emitted by mathFormat.js for vector notation). `ol` and `h3`/`h4` are
 * included as headroom for authoring; everything else is dropped.
 *
 * FAIL-SAFE
 * ---------
 * If DOMParser is unavailable (SSR, a test runner without a DOM), the input is
 * HTML-escaped and returned as text. Degrading to plain text is safe; degrading
 * to unsanitised markup is not.
 */

/** Elements permitted in board content. */
const ALLOWED_TAGS = new Set([
  'p', 'br', 'span', 'div',
  'strong', 'b', 'em', 'i',
  'sup', 'sub',
  'ul', 'ol', 'li',
  'h3', 'h4',
  'code'
]);

/**
 * Attributes permitted, per tag. `class` is allowed only where content uses it,
 * and only with a known value — an open `class` attribute lets injected markup
 * borrow app styling to impersonate UI.
 */
const ALLOWED_ATTRS = {
  span: ['class'],
  div: ['class'],
  p: ['class'],
  code: ['class']
};

/** Class values the design system actually defines for board content. */
const ALLOWED_CLASSES = new Set([
  'vec',        // mathFormat.js vector notation
  'formula',
  'note',
  'caption',
  'term'
]);

/**
 * Elements whose entire subtree is discarded rather than unwrapped.
 *
 * For most disallowed tags we keep the children — a stray <font> should lose
 * the tag but keep its text. For these, the content is the payload, so dropping
 * the tag while keeping its text would leave script source rendered as visible
 * text at best, and re-parsed at worst.
 */
const DROP_SUBTREE = new Set([
  'script', 'style', 'iframe', 'object', 'embed', 'template',
  'noscript', 'svg', 'math', 'link', 'meta', 'base', 'form'
]);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitise a fragment of board HTML.
 *
 * @param {string} html untrusted markup, typically from cards.layers
 * @param {object} [options]
 * @param {typeof DOMParser} [options.DOMParserImpl] injectable for tests
 * @returns {string} markup containing only allowlisted tags and attributes
 */
export function sanitizeBoardHtml(html, options = {}) {
  if (html == null || html === '') return '';
  const input = String(html);

  const Parser = options.DOMParserImpl
    || (typeof DOMParser !== 'undefined' ? DOMParser : null);

  // No parser available — return escaped text rather than raw markup.
  if (!Parser) return escapeHtml(input);

  let doc;
  try {
    doc = new Parser().parseFromString(`<body>${input}</body>`, 'text/html');
  } catch (_) {
    return escapeHtml(input);
  }
  if (!doc?.body) return escapeHtml(input);

  clean(doc.body, doc);
  return doc.body.innerHTML;
}

/** Depth-first walk, mutating in place. Iterates backwards so removal is safe. */
function clean(node, doc) {
  const children = Array.from(node.childNodes);

  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];

    // Text nodes are inert — the parser has already decoded entities and the
    // serializer will re-encode them.
    if (child.nodeType === 3) continue;

    // Comments can carry payloads for conditional-comment style tricks, and
    // board content has no use for them.
    if (child.nodeType === 8) {
      child.remove();
      continue;
    }

    if (child.nodeType !== 1) {
      child.remove();
      continue;
    }

    const tag = child.tagName.toLowerCase();

    if (DROP_SUBTREE.has(tag)) {
      child.remove();
      continue;
    }

    if (!ALLOWED_TAGS.has(tag)) {
      // Unwrap: keep the text, discard the element. Recurse first so the
      // children are clean before they are promoted.
      clean(child, doc);
      const parent = child.parentNode;
      while (child.firstChild) parent.insertBefore(child.firstChild, child);
      child.remove();
      continue;
    }

    stripAttributes(child, tag);
    clean(child, doc);
  }
}

function stripAttributes(el, tag) {
  const permitted = ALLOWED_ATTRS[tag] || [];

  for (const attr of Array.from(el.attributes)) {
    const name = attr.name.toLowerCase();

    if (!permitted.includes(name)) {
      el.removeAttribute(attr.name);
      continue;
    }

    if (name === 'class') {
      const kept = attr.value
        .split(/\s+/)
        .filter((c) => ALLOWED_CLASSES.has(c));
      if (kept.length) el.setAttribute('class', kept.join(' '));
      else el.removeAttribute('class');
    }
  }
}

export const __testing = { ALLOWED_TAGS, ALLOWED_ATTRS, ALLOWED_CLASSES, DROP_SUBTREE, escapeHtml };
