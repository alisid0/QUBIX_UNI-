// The learner's connection to the Superstore.
//
// Until now every SQL surface in Qubix was a simulation: the console scored
// multiple-choice answers against twelve hardcoded rows, and the workshop moved
// four sales between two branches. A learner could finish the SQL chapter
// without a query ever having run.
//
// This opens the real thing. 54 tables, 147,166 rows, in SQLite, in the browser,
// with no server and no network beyond fetching the file once.
//
// Everything is lazy. sql.js and the database are only fetched when somebody
// actually opens a SQL surface, so a learner reading chapter 1 pays nothing for
// them. The download is about 3.7 MB the first time and cached after that.
//
//   import { query, openSuperstore } from '$lib/data/superstore.js';
//   const rows = await query('SELECT branch_id, COUNT(*) FROM sale GROUP BY 1');

const base = import.meta.env.BASE_URL || '/';
const DB_GZ = `${base}data/qubix-sample.db.gz`;
const DB_RAW = `${base}data/qubix-sample.db`;

let opening = null;

// gzip starts 1f 8b; a SQLite file starts "SQLite format 3\0".
const isGzip = bytes => bytes[0] === 0x1f && bytes[1] === 0x8b;

/**
 * Fetch the database and inflate it only if it actually arrived compressed.
 *
 * Whether it does is not ours to decide. A `.gz` file is served by Vite, and by
 * most static hosts, with `Content-Encoding: gzip`, which means the browser
 * inflates it before we ever see it; inflating again aborts the request and the
 * only symptom is "Failed to fetch". Other hosts hand the bytes over untouched.
 * Reading the first two bytes settles it and works on both.
 */
async function fetchDatabase() {
  const response = await fetch(DB_GZ);
  if (response.ok) {
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!isGzip(bytes)) return bytes;                    // the host already inflated it
    if (typeof DecompressionStream === 'function') {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
  }
  // Safari before 16.4, or a host that would not serve the compressed file.
  const plain = await fetch(DB_RAW);
  if (!plain.ok) throw new Error(`Could not load the Superstore database (${plain.status}).`);
  return new Uint8Array(await plain.arrayBuffer());
}

/**
 * Open the database, once. Concurrent callers share the same promise, so three
 * components mounting together do not fetch three copies.
 */
export function openSuperstore() {
  if (!opening) {
    opening = (async () => {
      const [{ default: initSqlJs }, wasmUrl, bytes] = await Promise.all([
        import('sql.js'),
        import('sql.js/dist/sql-wasm.wasm?url').then(m => m.default),
        fetchDatabase()
      ]);
      const SQL = await initSqlJs({ locateFile: () => wasmUrl });
      return new SQL.Database(bytes);
    })().catch(error => {
      opening = null;             // a failed open must not poison every retry
      throw error;
    });
  }
  return opening;
}

/**
 * Run a query and get back plain objects.
 *
 * Errors are returned rather than thrown for the console to display: a learner
 * writing SQL will get it wrong, and "no such column: braches" is the lesson,
 * not a crash.
 */
export async function query(sql) {
  const db = await openSuperstore();
  const started = performance.now();
  try {
    const results = db.exec(sql);
    const first = results[0];
    return {
      ok: true,
      columns: first ? first.columns : [],
      rows: first ? first.values.map(row =>
        Object.fromEntries(first.columns.map((c, i) => [c, row[i]]))) : [],
      rowCount: first ? first.values.length : 0,
      statements: results.length,
      ms: Math.round(performance.now() - started)
    };
  } catch (error) {
    return { ok: false, error: String(error.message || error), columns: [], rows: [], rowCount: 0 };
  }
}

/** Every table, with its row count. Useful for a schema panel. */
export async function tables() {
  const db = await openSuperstore();
  const names = db.exec(
    "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name"
  )[0]?.values.map(([n]) => n) ?? [];
  return names.map(name => ({
    name,
    rows: db.exec(`SELECT COUNT(*) FROM "${name}"`)[0].values[0][0]
  }));
}

/** The columns of one table, in order, with the type the database gave them. */
export async function columnsOf(table) {
  const db = await openSuperstore();
  const info = db.exec(`PRAGMA table_info("${table}")`)[0];
  if (!info) return [];
  const at = name => info.columns.indexOf(name);
  return info.values.map(row => ({ name: row[at('name')], type: row[at('type')] }));
}
