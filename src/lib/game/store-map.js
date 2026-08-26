// The Qubix Superstore, as a floor plan.
//
// The missions had no place. They sat in a list, each one opening
// cold, none of them anywhere in particular, though every one is set somewhere
// specific: a till, a stock room, a goods-in bay, a reporting desk.
//
// This is a building rather than a world. Deterministic SVG, no engine, no
// traversal: you look at a plan and click the room you want. A walkable version
// would cost months and add seconds of transit per minute of thinking, and the
// media rule in CLAUDE.md asks for exactly this anyway, since a floor plan is
// structural geometry rather than a picture of one.
//
// Rooms hold placed missions and nothing else: a slug, and where on the art it
// sits. Titles, XP and completion are read
// from the roster at render time, so a renamed or removed mission cannot leave a
// stale label on the map, and check-store-map refuses a room naming a mission
// that does not exist or a mission belonging to no room.

/** Grid units. The view projects these; nothing here is pixels. */
export const GRID = Object.freeze({ w: 13, h: 6 });

/**
 * Isometric projection. Every solid on the plan is a box in grid space, drawn as
 * three flat-shaded faces, which is why the scene needs no art assets and cannot
 * drift: the same eight corners produce the same picture every time.
 */
export const ISO = Object.freeze({ tw: 34, th: 17, zh: 26 });

export const project = (x, y, z = 0) => [
  (x - y) * ISO.tw,
  (x + y) * ISO.th - z * ISO.zh
];

/** The three visible faces of a box, as SVG point strings, in paint order. */
export function box(x, y, w, d, h, z0 = 0) {
  const p = (a, b, c) => project(a, b, c).join(',');
  const t = z0 + h;
  return {
    left:  [p(x, y + d, t), p(x, y + d, z0), p(x + w, y + d, z0), p(x + w, y + d, t)].join(' '),
    right: [p(x + w, y, t), p(x + w, y, z0), p(x + w, y + d, z0), p(x + w, y + d, t)].join(' '),
    top:   [p(x, y, t), p(x + w, y, t), p(x + w, y + d, t), p(x, y + d, t)].join(' '),
    // Painter's algorithm: further from the camera is drawn first.
    depth: x + y + z0 * 0.01
  };
}

export const WINGS = Object.freeze([
  Object.freeze({ id: 'shop', label: 'SHOP FLOOR', x: 0, y: 0, w: 6, h: 6 }),
  Object.freeze({ id: 'offices', label: 'OFFICES', x: 7, y: 0, w: 6, h: 6 })
]);

export const ROOMS = Object.freeze([
  Object.freeze({
    id: 'goods-in', name: 'Goods In', wing: 'shop', x: 0, y: 0, w: 3, h: 2,
    blurb: 'Where a delivery becomes a number, in whatever unit the supplier chose.',
    spots: Object.freeze([Object.freeze({ slug: 'units-measurement', x: 58, y: 77, at: 'the platform scale' })])
  }),
  Object.freeze({
    id: 'stock-room', name: 'Stock Room', wing: 'shop', x: 3, y: 0, w: 3, h: 2,
    blurb: 'Counts, and the gaps where a count was never taken.',
    spots: Object.freeze([
      Object.freeze({ slug: 'missing-data', x: 24, y: 42, at: 'the left shelving bay' }),
      Object.freeze({ slug: 'table-grain', x: 77, y: 40, at: 'the right shelving bay' })
    ])
  }),
  Object.freeze({
    id: 'customer-desk', name: 'Customer Desk', wing: 'shop', x: 0, y: 2, w: 3, h: 2,
    blurb: 'The same person, entered three times, three different ways.',
    spots: Object.freeze([Object.freeze({ slug: 'duplicate-records', x: 58, y: 44, at: 'the service counter' })])
  }),
  Object.freeze({
    id: 'aisles', name: 'Aisles', wing: 'shop', x: 3, y: 2, w: 3, h: 2,
    blurb: 'Every SKU the store sells. Nothing to do here yet.',
    spots: Object.freeze([])
  }),
  Object.freeze({
    id: 'tills', name: 'Tills', wing: 'shop', x: 0, y: 4, w: 6, h: 2,
    blurb: 'Where the data starts. Every row in every table begins as something that happened here.',
    spots: Object.freeze([
      Object.freeze({ slug: 'checkout', x: 17, y: 45, at: 'lane one' }),
      Object.freeze({ slug: 'classify-data', x: 37, y: 43, at: 'lane two' })
    ])
  }),

  Object.freeze({
    id: 'data-office', name: 'Data Office', wing: 'offices', x: 7, y: 0, w: 3, h: 2,
    blurb: 'Queries and programs, and what each one does to a row.',
    spots: Object.freeze([
      Object.freeze({ slug: 'sql-console', x: 22, y: 56, at: 'the near desk' }),
      Object.freeze({ slug: 'join-grain', x: 50, y: 38, at: 'the back desk' }),
      Object.freeze({ slug: 'python-trace', x: 79, y: 50, at: 'the dual-monitor desk' }),
      Object.freeze({ slug: 'result-checkpoint', x: 50, y: 76, at: 'the release terminal' })
    ])
  }),
  Object.freeze({
    id: 'reporting', name: 'Reporting', wing: 'offices', x: 10, y: 0, w: 3, h: 2,
    blurb: 'Figures leave the building from here, so they had better be the right ones.',
    spots: Object.freeze([
      Object.freeze({ slug: 'rate-desk', x: 20, y: 44, at: 'the monitor desk' }),
      Object.freeze({ slug: 'distribution-desk', x: 54, y: 63, at: 'the collation table' }),
      Object.freeze({ slug: 'data-lineage', x: 77, y: 42, at: 'the standing desk' }),
      Object.freeze({ slug: 'sampling-desk', x: 78, y: 76, at: 'the sampling desk' })
    ])
  }),
  Object.freeze({
    id: 'boardroom', name: 'Boardroom', wing: 'offices', x: 7, y: 2, w: 6, h: 2,
    blurb: 'Somebody asks an unclear question and expects a defensible answer.',
    spots: Object.freeze([
      Object.freeze({ slug: 'analyst-desk', x: 35, y: 54, at: 'the meeting table' }),
      Object.freeze({ slug: 'handover-pack', x: 68, y: 54, at: 'the handover review seat' })
    ])
  }),
  Object.freeze({
    // Named honestly. The role volumes are advertised on the landing page and
    // nothing behind them is built, so the floor they would occupy is drawn
    // empty rather than left off the plan.
    id: 'role-floors', name: 'Role Floors', wing: 'offices', x: 7, y: 4, w: 6, h: 2,
    blurb: 'Analyst, Data Engineer, Data Scientist, Machine Learning Engineer. Planned, not built.',
    spots: Object.freeze([]), planned: true
  })
]);

/** Doors, as grid coordinates. Drawn as gaps in the walls between rooms. */
export const DOORS = Object.freeze([
  Object.freeze({ x: 1.5, y: 2 }), Object.freeze({ x: 4.5, y: 2 }),
  Object.freeze({ x: 3, y: 1 }), Object.freeze({ x: 1.5, y: 4 }),
  Object.freeze({ x: 4.5, y: 4 }), Object.freeze({ x: 10, y: 1 }),
  Object.freeze({ x: 8.5, y: 2 }), Object.freeze({ x: 11.5, y: 2 }),
  Object.freeze({ x: 10, y: 4 })
]);

/**
 * The plan, with live state folded in. `statuses` is what statusOf() returns, so
 * every title and XP figure on the map comes from the roster rather than from
 * anything written here.
 */
export function planWith(statuses) {
  const by = new Map(statuses.map(s => [s.slug, s]));
  return ROOMS.map(room => {
    const missions = room.spots.map(s => by.get(s.slug)).filter(Boolean);
    const done = missions.filter(m => m.done).length;
    const open = missions.some(m => m.open && !m.done);
    return {
      ...room,
      missions,
      done,
      total: missions.length,
      xp: missions.reduce((n, m) => n + m.xp, 0),
      state: room.planned ? 'planned'
        : !missions.length ? 'empty'
        : done === missions.length ? 'done'
        : open ? 'open' : 'locked'
    };
  });
}

/** Which room a learner should walk into next. */
export const nextRoom = plan =>
  plan.find(r => r.state === 'open') || plan.find(r => r.state !== 'done' && r.total) || null;

/**
 * Which room a chapter is set in, worked out from where its missions stand
 * rather than declared. A chapter whose missions are spread over several rooms
 * takes the room holding the most of them; ties go to the earliest room on the
 * plan, so the answer is stable.
 *
 * This is what lets the reader open a chapter on the place you will practise it,
 * without a second list to keep in step with the first.
 */
export function roomForChapter(chapter, missions) {
  const here = new Set(missions.filter(m => m.reading?.chapter === chapter).map(m => m.slug));
  if (!here.size) return null;
  let best = null, bestCount = 0;
  for (const room of ROOMS) {
    const n = room.spots.filter(s => here.has(s.slug)).length;
    if (n > bestCount) { best = room; bestCount = n; }
  }
  return best;
}
