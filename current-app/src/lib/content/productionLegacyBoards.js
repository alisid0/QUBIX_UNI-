import productionSnapshot from './data/production-legacy-boards.json';

// A deliberately lazy outage fallback for authored legacy topics that still
// live only in production Supabase. This module is dynamically imported only
// after the backend request fails, so the snapshot never increases first-load
// cost. Empty/placeholder rows are excluded rather than presented as lessons.
const authoredRows = (productionSnapshot.boards || []).filter((board) =>
  (board.layers || []).filter((floor) => floor?.text).length >= 3
);

export const PRODUCTION_LEGACY_BOARDS = Object.fromEntries(
  authoredRows.map((board) => [Number(board.id), {
    act: board.act,
    kicker: board.kicker,
    title: board.title,
    layers: board.layers,
    img: board.img || null,
    tags: board.tags || null
  }])
);
