// test-sanitize-html.mjs — adversarial tests for the F-01 board sanitiser.
//
// No database, no network, no staging. Pure function tests against a real DOM.
//
// RUN:
//   npm install --no-save jsdom
//   node scripts/test-sanitize-html.mjs
//
// Exits non-zero on any failure.
//
// The attack cases are the point. A sanitiser that only passes its happy path
// is worthless — every case below is a technique that defeats naive regex-based
// sanitisers, which is why this implementation parses with a real HTML parser
// and walks the tree instead.

import { sanitizeBoardHtml } from '../src/lib/content/sanitizeHtml.js';

let JSDOM;
try {
  ({ JSDOM } = await import('jsdom'));
} catch (_) {
  try {
    ({ JSDOM } = await import('/tmp/node_modules/jsdom/lib/api.js'));
  } catch (e) {
    console.error('jsdom is required. Run: npm install --no-save jsdom');
    process.exit(2);
  }
}

const { window } = new JSDOM('');
const DOMParserImpl = window.DOMParser;
const s = (html) => sanitizeBoardHtml(html, { DOMParserImpl });

let failures = 0;
let checks = 0;

function check(label, actual, predicate, detail) {
  checks++;
  if (predicate(actual)) {
    console.log(`  ok    ${label}`);
  } else {
    failures++;
    console.log(`  FAIL  ${label}`);
    console.log(`        got: ${JSON.stringify(actual)}`);
    if (detail) console.log(`        ${detail}`);
  }
}

const noScript = (out) => !/<script|javascript:|onerror|onload|onclick|onmouseover|<iframe|<svg|<object|<embed/i.test(out);
const eq = (expected) => (out) => out === expected;
const has = (needle) => (out) => out.includes(needle);
const lacks = (needle) => (out) => !out.includes(needle);

console.log('\n--- Content that must survive unchanged ---');
check('plain paragraph', s('<p>Force equals mass times acceleration.</p>'),
  eq('<p>Force equals mass times acceleration.</p>'));
check('superscript from mathFormat', s('x<sup>2</sup>'), eq('x<sup>2</sup>'));
check('subscript from mathFormat', s('F<sub>net</sub>'), eq('F<sub>net</sub>'));
check('vector span from mathFormat', s('<span class="vec">F</span>'),
  eq('<span class="vec">F</span>'));
check('emphasis and strong', s('<p><strong>Bold</strong> and <em>italic</em>.</p>'),
  eq('<p><strong>Bold</strong> and <em>italic</em>.</p>'));
check('list', s('<ul><li>one</li><li>two</li></ul>'),
  eq('<ul><li>one</li><li>two</li></ul>'));
check('line break', s('a<br>b'), has('<br>'));
check('div wrapper', s('<div class="note">Careful here.</div>'),
  eq('<div class="note">Careful here.</div>'));
check('entities preserved', s('<p>5 &lt; 10 &amp; 10 &gt; 5</p>'),
  (o) => o.includes('&lt;') && o.includes('&amp;') && o.includes('&gt;'));
check('empty input', s(''), eq(''));
check('null input', s(null), eq(''));

console.log('\n--- Script injection ---');
check('bare script tag', s('<p>hi</p><script>alert(1)</script>'), noScript);
check('script with src', s('<script src="https://evil.test/x.js"></script>'), noScript);
check('script content is dropped, not unwrapped', s('<script>alert(1)</script>'),
  lacks('alert(1)'), 'subtree must be discarded, not turned into visible text');
check('nested script in allowed tag', s('<p>text<script>alert(1)</script></p>'), noScript);
check('uppercase SCRIPT', s('<SCRIPT>alert(1)</SCRIPT>'), noScript);
check('mixed case ScRiPt', s('<ScRiPt>alert(1)</ScRiPt>'), noScript);

console.log('\n--- Event handler attributes ---');
check('onerror on img', s('<img src=x onerror="alert(1)">'), noScript);
check('onclick on allowed tag', s('<p onclick="alert(1)">text</p>'),
  eq('<p>text</p>'));
check('onmouseover on span', s('<span class="vec" onmouseover="alert(1)">F</span>'),
  eq('<span class="vec">F</span>'));
check('onload on body-ish tag', s('<div onload="alert(1)">x</div>'), noScript);
check('uppercase ONERROR', s('<p ONERROR="alert(1)">x</p>'), eq('<p>x</p>'));
check('onfocus + autofocus', s('<p onfocus="alert(1)" autofocus>x</p>'), eq('<p>x</p>'));

console.log('\n--- URL-based vectors ---');
check('javascript: href', s('<a href="javascript:alert(1)">click</a>'), noScript);
check('anchor unwrapped, text kept', s('<a href="https://evil.test">click</a>'),
  eq('click'));
check('data: URI in iframe', s('<iframe src="data:text/html,<script>alert(1)</script>"></iframe>'),
  noScript);
check('img with data URI', s('<img src="data:image/svg+xml,<svg onload=alert(1)>">'), noScript);

console.log('\n--- Parser-confusion techniques ---');
check('malformed nesting', s('<p><script>alert(1)</p></script>'), noScript);
check('unclosed script', s('<script>alert(1)'), noScript);
check('null byte in tag name', s('<scr\0ipt>alert(1)</scr\0ipt>'), noScript);
check('comment-wrapped script', s('<!--<script>alert(1)</script>-->'), noScript);
check('svg with onload', s('<svg onload="alert(1)"><circle/></svg>'), noScript);
check('math ns injection', s('<math><mtext><script>alert(1)</script></mtext></math>'), noScript);
check('style tag dropped', s('<style>body{display:none}</style><p>ok</p>'),
  (o) => !o.includes('display:none') && o.includes('<p>ok</p>'));
check('style attribute stripped', s('<p style="position:fixed;top:0">x</p>'),
  eq('<p>x</p>'));
check('form + formaction', s('<form action="https://evil.test"><button formaction="javascript:alert(1)">x</button></form>'),
  noScript);
check('base tag dropped', s('<base href="https://evil.test/">'), lacks('evil.test'));
check('meta refresh dropped', s('<meta http-equiv="refresh" content="0;url=https://evil.test">'),
  lacks('evil.test'));

console.log('\n--- Class allowlist ---');
check('unknown class removed', s('<span class="qx-danger-button">Delete</span>'),
  eq('<span>Delete</span>'), 'injected markup must not borrow app styling');
check('known class kept', s('<span class="vec">v</span>'), eq('<span class="vec">v</span>'));
check('mixed known/unknown', s('<span class="vec evil-overlay">v</span>'),
  eq('<span class="vec">v</span>'));
check('class on disallowed tag', s('<section class="vec">x</section>'), eq('x'));

console.log('\n--- Unwrap vs drop semantics ---');
check('unknown tag unwrapped, text kept', s('<marquee>important text</marquee>'),
  eq('important text'));
check('nested unknown tags unwrapped', s('<font><center>text</center></font>'),
  eq('text'));
check('allowed inside unknown is preserved', s('<section><p>kept</p></section>'),
  eq('<p>kept</p>'));

console.log('\n--- Fail-safe path ---');
{
  const out = sanitizeBoardHtml('<script>alert(1)</script>', { DOMParserImpl: null });
  check('no DOMParser: escapes rather than passing through', out,
    (o) => o.includes('&lt;script&gt;') && !o.includes('<script>'),
    'degrading to text is safe; degrading to raw markup is not');
}

console.log('\n--- Idempotence ---');
{
  const once = s('<p onclick="x()">a<script>b</script><span class="vec">c</span></p>');
  const twice = s(once);
  check('sanitising twice changes nothing', twice, eq(once));
}

console.log(`\n${checks - failures}/${checks} checks passed`);
if (failures) {
  console.log(`${failures} FAILURE(S)\n`);
  process.exit(1);
}
console.log('Sanitiser holds against all cases.\n');
