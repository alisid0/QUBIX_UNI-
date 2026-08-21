/**
 * Lightweight render-time math & chemistry typography — no LaTeX engine.
 *
 * Conventions upgraded to clean HTML at render time:
 *
 *   F_net    → F<sub>net</sub>           x^{n+1} → x<sup>n+1</sup>
 *   F⃗ a⃗ v⃗   → <span class="vec">F</span>   ^{12}_6C → ¹²₆C (isotope)
 *   Na^+     → Na<sup>+</sup>           Ca^{2+}  → Ca<sup>2+</sup>
 *
 * It only touches text *between* tags (never tag names or attributes).
 * Existing Unicode super/subscripts (², ₀, ⁻¹, ²³₁₁Na) are left untouched.
 */

// Combining over-arrows: U+20D7 (right), U+20D6 (left).
const VEC = /([A-Za-z])[⃗⃖]/g;

const PRE = 'A-Za-z0-9)\\]>°℃πΩμ';

const SUP = new RegExp(`([${PRE}])\\^(\\{[^}]{1,16}\\}|-?[A-Za-z0-9.]{1,8})`, 'g');
const SUB = new RegExp(`([${PRE}])_(\\{[^}]{1,18}\\}|[A-Za-z0-9]{1,14})`, 'g');

// Isotope: ^{A}_{Z}Symbol  →  <sup>A</sup><sub>Z</sub>Symbol
const ISOTOPE = /\^\{(\d{1,3})\}_\{(\d{1,3})\}([A-Z][a-z]?)/g;

// Standalone charge superscript: Na^+, Ca^{2+}, SO_4^{2-}
const CHARGE = /([A-Z][a-z]?(?:_\d+)?)\^\{(\d*[-+])\}/g;
const SIMPLE_CHARGE = /([A-Z][a-z]?(?:_\d+)?)\^(\d*[-+])/g;

function vectors(t) {
  return t.replace(VEC, '<span class="vec">$1</span>');
}
function chemistry(t) {
  // Isotope: ^{12}_{6}C → <sup>12</sup><sub>6</sub>C
  t = t.replace(ISOTOPE, '<sup>$1</sup><sub>$2</sub>$3');
  // Charge with braces: Ca^{2+} → Ca<sup>2+</sup>
  t = t.replace(CHARGE, '$1<sup>$2</sup>');
  // Simple charge: Na^+ → Na<sup>+</sup>
  t = t.replace(SIMPLE_CHARGE, '$1<sup>$2</sup>');
  return t;
}
function subsup(t) {
  t = t.replace(SUP, (_m, a, b) => `${a}<sup>${b.replace(/[{}]/g, '')}</sup>`);
  t = t.replace(SUB, (_m, a, b) => `${a}<sub>${b.replace(/[{}]/g, '')}</sub>`);
  return t;
}

function onTextNodes(html, fn) {
  return html.replace(/<[^>]+>|[^<]+/g, (chunk) => (chunk[0] === '<' ? chunk : fn(chunk)));
}

export function formatMath(html) {
  if (!html) return html;
  return onTextNodes(html, (t) => chemistry(subsup(vectors(t))));
}

export function formatMathText(text) {
  if (text == null) return '';
  const escaped = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return chemistry(subsup(vectors(escaped)));
}
