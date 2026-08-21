/* ============================================================
   Ambient particle field — shared with index.html's inline version,
   minus the per-act tint (no DECK/idx concept outside the reader).
   ============================================================ */
function initAmbientField(canvasId, tint) {
  tint = tint || [225, 228, 218];
  const cv = document.getElementById(canvasId);
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, parts;
  function size() { W = cv.width = innerWidth * devicePixelRatio; H = cv.height = innerHeight * devicePixelRatio; }
  size();
  addEventListener('resize', size);
  function seed() {
    parts = [];
    const n = Math.min(90, Math.floor(innerWidth / 14));
    for (let i = 0; i < n; i++) {
      parts.push({
        x: Math.random() * W, y: Math.random() * H,
        r: (Math.random() * 1.6 + 0.3) * devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.12 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.12 * devicePixelRatio,
        a: Math.random() * 0.5 + 0.15
      });
    }
  }
  seed();
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fill();
    }
    if (!reduce) requestAnimationFrame(tick);
  }
  tick();
}
