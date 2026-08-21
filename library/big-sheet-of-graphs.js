/* Runtime for The Big Sheet of Graphs. Lifted out of the page so the site's
   Content-Security-Policy can stay at script-src 'self'. */
/* Switches between frames that were drawn at build time. It computes nothing,
   for the same reason the book's runtime computes nothing. */
document.querySelectorAll('.afr').forEach(function (r) {
  r.addEventListener('click', function (e) {
    var b = e.target.closest('.afr-x'); if (!b) return;
    var i = +b.dataset.i;
    r.querySelectorAll('.afr-f').forEach(function (f, k) { f.classList.toggle('on', k === i); });
    r.querySelectorAll('.afr-x').forEach(function (x, k) {
      x.classList.toggle('on', k === i);
      x.setAttribute('aria-pressed', k === i ? 'true' : 'false');
    });
  });
});