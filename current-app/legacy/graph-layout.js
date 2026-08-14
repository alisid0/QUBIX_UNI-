/* ============================================================
   Force-directed graph layout — runs once to settle, not a
   perpetual animation. Classic spring-embedder: inverse-linear
   repulsion between every node pair, Hookean spring attraction
   along real edges only, a weak centering force, velocity
   damping. Pure function, no DOM access.

   nodes: [{ id, isHub }]
   edges: [{ source, target, idealLen }]
   returns: { [id]: {x, y} }
   ============================================================ */
function runForceLayout(nodes, edges, opts) {
  opts = opts || {};
  const K_REP = opts.K_REP || 600;        // repulsion strength (tune)
  const K_ATTR = opts.K_ATTR || 0.08;     // spring stiffness (tune)
  const CENTER_PULL = opts.CENTER_PULL || 0.015;
  const DAMPING = opts.DAMPING || 0.7;
  const SETTLE_THRESHOLD = opts.SETTLE_THRESHOLD || 2;
  const MAX_ITERATIONS = opts.MAX_ITERATIONS || 500;
  const HUB_RING_RADIUS = opts.HUB_RING_RADIUS || 120;
  const MIN_DIST = 1;

  const hubs = nodes.filter(function (n) { return n.isHub; });
  const state = {};
  nodes.forEach(function (n, i) {
    let x, y;
    if (n.isHub) {
      const hi = hubs.indexOf(n);
      const angle = (hi / hubs.length) * Math.PI * 2;
      x = Math.cos(angle) * HUB_RING_RADIUS;
      y = Math.sin(angle) * HUB_RING_RADIUS;
    } else {
      const angle = (i / nodes.length) * Math.PI * 2 + Math.random() * 0.5;
      const r = HUB_RING_RADIUS * 2 + Math.random() * 200;
      x = Math.cos(angle) * r;
      y = Math.sin(angle) * r;
    }
    state[n.id] = { x: x, y: y, vx: 0, vy: 0, mass: n.isHub ? 4 : 1 };
  });

  let iteration = 0;
  let totalKE = Infinity;

  while (iteration < MAX_ITERATIONS && totalKE > SETTLE_THRESHOLD) {
    const force = {};
    nodes.forEach(function (n) { force[n.id] = { fx: 0, fy: 0 }; });

    // repulsion: every pair
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = state[nodes[i].id], b = state[nodes[j].id];
        let dx = a.x - b.x, dy = a.y - b.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MIN_DIST) dist = MIN_DIST;
        const f = K_REP / dist;
        const fx = (dx / dist) * f, fy = (dy / dist) * f;
        force[nodes[i].id].fx += fx; force[nodes[i].id].fy += fy;
        force[nodes[j].id].fx -= fx; force[nodes[j].id].fy -= fy;
      }
    }

    // attraction: along edges only
    edges.forEach(function (e) {
      const a = state[e.source], b = state[e.target];
      if (!a || !b) return;
      let dx = b.x - a.x, dy = b.y - a.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MIN_DIST) dist = MIN_DIST;
      const idealLen = e.idealLen || 100;
      const f = (dist - idealLen) * K_ATTR;
      const fx = (dx / dist) * f, fy = (dy / dist) * f;
      force[e.source].fx += fx; force[e.source].fy += fy;
      force[e.target].fx -= fx; force[e.target].fy -= fy;
    });

    // centering force toward centroid
    let cx = 0, cy = 0;
    nodes.forEach(function (n) { cx += state[n.id].x; cy += state[n.id].y; });
    cx /= nodes.length; cy /= nodes.length;
    nodes.forEach(function (n) {
      const s = state[n.id];
      force[n.id].fx += (cx - s.x) * CENTER_PULL;
      force[n.id].fy += (cy - s.y) * CENTER_PULL;
    });

    // integrate with damping, track kinetic energy
    totalKE = 0;
    nodes.forEach(function (n) {
      const s = state[n.id];
      const f = force[n.id];
      s.vx = (s.vx + f.fx / s.mass) * DAMPING;
      s.vy = (s.vy + f.fy / s.mass) * DAMPING;
      s.x += s.vx;
      s.y += s.vy;
      totalKE += Math.abs(s.vx) + Math.abs(s.vy);
    });

    iteration++;
  }

  const positions = {};
  nodes.forEach(function (n) { positions[n.id] = { x: state[n.id].x, y: state[n.id].y }; });
  positions._meta = { iterations: iteration, finalKE: totalKE };
  return positions;
}
