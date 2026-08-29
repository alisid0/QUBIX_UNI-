/* ============================================================
   Strata — subject mark icons (rough pass, no chalk-roughen filter)
   Simple inline SVGs for physics/maths/chem. Polish later.
   ============================================================ */
function renderSubjectMark(container, opts) {
  opts = opts || {};
  const subject = opts.subject || "physics";
  const accent = opts.accent || "currentColor";
  const size = opts.size || 32;

  let inner = "";
  if (subject === "physics") {
    inner =
      '<ellipse cx="32" cy="32" rx="26" ry="10.5" stroke="currentColor" stroke-width="2.4"/>' +
      '<ellipse cx="32" cy="32" rx="26" ry="10.5" stroke="currentColor" stroke-width="2.4" transform="rotate(60 32 32)"/>' +
      '<ellipse cx="32" cy="32" rx="26" ry="10.5" stroke="currentColor" stroke-width="2.4" transform="rotate(120 32 32)"/>' +
      '<circle cx="32" cy="32" r="4.6" fill="' + accent + '"/>';
  } else if (subject === "maths") {
    inner =
      '<path d="M14 11 L14 50 L53 50" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M20 45 Q32 5 44 45" stroke="' + accent + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  } else {
    inner =
      '<path d="M25 11 L25 27 L13 49 Q12 54 17 54 L47 54 Q52 54 51 49 L39 27 L39 11" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="M22 11 L42 11" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M17.5 45 L46.5 45" stroke="' + accent + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<circle cx="27" cy="49.5" r="2" fill="' + accent + '"/>' +
      '<circle cx="35" cy="41" r="1.5" fill="currentColor"/>';
  }

  container.innerHTML =
    '<svg viewBox="0 0 64 64" width="' + size + '" height="' + size + '" fill="none" style="display:block">' + inner + "</svg>";
}
