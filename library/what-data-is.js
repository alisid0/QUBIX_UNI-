/* Runtime for What Data Is and Why People Use It. Lifted out of the page so the site's
   Content-Security-Policy can stay at script-src 'self'. */
/* The whole runtime. It switches between frames that were drawn at build
   time and marks answers right or wrong. It computes no mathematics, which
   is why an interactive figure here can never disagree with a printed one. */
(function () {
  var show = function (lab, i) {
    var fr = lab.querySelectorAll('.lab-frame');
    for (var k = 0; k < fr.length; k++) fr[k].classList.toggle('on', k === i);
    var status = lab.querySelector('.lab-status');
    if (status) {
      var live = fr[i];
      var said = live.querySelector('.lab-say');
      var pic = live.querySelector('svg[aria-label]');
      status.textContent = (said ? said.textContent.trim() + ' ' : '')
        + (pic ? pic.getAttribute('aria-label') : '');
    }
    var range = lab.querySelector('.lab-range');
    if (range) {
      var btn = lab.querySelectorAll('.lab-b')[i];
      range.value = i;
      range.setAttribute('aria-valuetext', btn ? btn.textContent.trim() : String(i + 1));
    }
    var bs = lab.querySelectorAll('.lab-b');
    for (var k = 0; k < bs.length; k++) {
      var on = +bs[k].dataset.i === i;
      bs[k].classList.toggle('on', on);
      bs[k].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  };

  var labs = document.querySelectorAll('[data-lab="frames"]');
  for (var n = 0; n < labs.length; n++) (function (lab) {
    lab.addEventListener('click', function (e) {
      var b = e.target.closest('.lab-b');
      if (b) show(lab, +b.dataset.i);
    });
    var r = lab.querySelector('.lab-range');
    if (r) r.addEventListener('input', function () { show(lab, +r.value); });
    show(lab, 0);
  })(labs[n]);

  var judges = document.querySelectorAll('[data-lab="judge"]');
  for (var n = 0; n < judges.length; n++) (function (lab) {
    var rows = lab.querySelectorAll('.jd li');
    var score = lab.querySelector('.lab-score');
    var tally = function () {
      var done = 0, right = 0;
      for (var k = 0; k < rows.length; k++) {
        if (rows[k].dataset.done) { done++; if (rows[k].classList.contains('right')) right++; }
      }
      score.textContent = done ? right + ' of ' + done + ' judged correctly'
        + (done === rows.length ? '.' : ', ' + (rows.length - done) + ' to go.') : '';
    };
    lab.addEventListener('click', function (e) {
      var b = e.target.closest('.jd-c button');
      if (!b) return;
      var li = b.closest('li');
      var ok = b.dataset.v === li.dataset.ok;
      li.classList.remove('right', 'wrong');
      li.classList.add(ok ? 'right' : 'wrong');
      li.dataset.done = '1';
      var picked = li.querySelectorAll('.jd-c button');
      for (var k = 0; k < picked.length; k++) picked[k].classList.toggle('picked', picked[k] === b);
      li.querySelector('.jd-w').hidden = false;
      tally();
    });
  })(judges[n]);
})();