/**
 * Guard for math expression strings that are evaluated with `new Function`
 * in the plotting components (ChalkDiagram, CoordinatePlane).
 *
 * Those components turn an authored string like "x*x" or "sin(x)" into a
 * function via `new Function('x', 'with(Math){return (' + s + ')}')`. The
 * strings come from curriculum content (service_role / AI drafting pipeline),
 * the same trust boundary as the sanitised {@html} board path. This validator
 * keeps that eval sink from running anything but arithmetic.
 *
 * The site CSP keeps 'unsafe-eval' (a bundled dependency needs it), so this is
 * the layer that actually constrains what our own eval accepts.
 *
 * Strategy: two gates.
 *   1. Character allowlist — no quotes, brackets, semicolons, equals, backticks
 *      or angle brackets, so a string literal, member-index or second statement
 *      cannot be formed.
 *   2. Identifier allowlist — every name that appears must be the variable `x`
 *      or a known Math member. A denylist is not enough (bare `alert(1)` slips
 *      one); requiring names to be on the list rejects any unknown identifier,
 *      which also covers `constructor`, DOM globals and the like as property
 *      names, since a member name is itself an identifier token.
 */

// Numbers, letters (for names), decimal point, comma, arithmetic operators,
// parentheses, whitespace. Nothing that could build a string or index a member.
const ALLOWED_CHARS = /^[\s0-9a-zA-Z_.,+\-*/()%^]+$/;

// Numeric literals, including scientific notation, removed before name checks
// so exponents like 1e3 are not mistaken for an identifier.
const NUMBER = /(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;

const IDENTIFIER = /[a-zA-Z_]\w*/g;

// The variable plus the Math members the curriculum plots actually use.
const ALLOWED_NAMES = new Set([
  'x', 'math',
  'pi', 'e', 'ln2', 'ln10', 'log2e', 'log10e', 'sqrt2',
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2',
  'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
  'exp', 'expm1', 'log', 'log2', 'log10', 'log1p', 'ln',
  'sqrt', 'cbrt', 'pow', 'hypot',
  'abs', 'sign', 'floor', 'ceil', 'round', 'trunc', 'fround',
  'min', 'max'
]);

/**
 * @param {unknown} expr candidate expression
 * @returns {boolean} true if safe to pass to `new Function`
 */
export function isSafeMathExpr(expr) {
  if (typeof expr !== 'string' || expr.length === 0 || expr.length > 200) return false;
  if (!ALLOWED_CHARS.test(expr)) return false;
  const names = expr.replace(NUMBER, ' ').match(IDENTIFIER) || [];
  return names.every((name) => ALLOWED_NAMES.has(name.toLowerCase()));
}
