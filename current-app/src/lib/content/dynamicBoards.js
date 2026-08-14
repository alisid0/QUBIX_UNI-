import { writable, get } from 'svelte/store';
import { supabase } from '../supabase.js';
import { DECK } from './deck.js';
import { FUNCTION_BOARDS } from './functionBoards.js';
import { MATRIX_BOARDS } from './matrixBoards.js';
import { LINE_BOARDS } from './lineBoards.js';
import { MATH_DRAFT_BOARDS } from './mathDraftBoards.js';
import { PHYSICS_DRAFT_BOARDS } from './physicsDraftBoards.js';
import { CHEMISTRY_DRAFT_BOARDS } from './chemistryDraftBoards.js';
import { COMPUTING_DRAFT_BOARDS } from './computingDraftBoards.js';
import { PUBLISHABLE_TOPIC_BOARDS } from './publishableTopicBoards.js';
import { TOPIC_EXPANSION_BOARDS } from './topicExpansionBoards.js';

const KEY = 'strata-dynamic-boards-v2';

function loadCache() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

function persistCache(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (_) {}
}

// sort_order (number) -> normalized board, for every dynamic card fetched so far this session.
const dynamicBoards = writable(loadCache());

/** Normalize a `cards` table row into deck.js's C()-produced shape. */
function normalize(row) {
  const layers = (row.layers || []).map(layer => {
    if (!layer || typeof layer !== 'object') return layer;
    return {
      text: layer.text ?? layer.content ?? '',
      img: layer.img ?? layer.image ?? null,
      audio: layer.audio ?? null
    };
  });

  return {
    act: row.act,
    kicker: row.kicker,
    title: row.title,
    layers,
    img: row.img_url || null,
    tags: row.tags || null
  };
}

function bundledBoard(number) {
  return LINE_BOARDS[number]
    || FUNCTION_BOARDS[number]
    || MATRIX_BOARDS[number]
    || PUBLISHABLE_TOPIC_BOARDS[number]
    || TOPIC_EXPANSION_BOARDS[number]
    || MATH_DRAFT_BOARDS[number]
    || PHYSICS_DRAFT_BOARDS[number]
    || CHEMISTRY_DRAFT_BOARDS[number]
    || COMPUTING_DRAFT_BOARDS[number]
    || null;
}

async function refreshDynamicBoards(numbers) {
  if (numbers.length === 0) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .in('sort_order', numbers)
      .abortSignal(controller.signal);
    if (error) throw error;

    const next = { ...get(dynamicBoards) };
    for (const row of data || []) next[row.sort_order] = normalize(row);
    dynamicBoards.set(next);
    persistCache(next);
  } catch (_) {
    // Offline and unreachable backends are expected. Most curriculum is in the
    // regular bundle; older reviewed production lessons live in a separate lazy
    // snapshot so they remain available without increasing first-load cost.
    try {
      const [production, publishable] = await Promise.all([
        import('./productionLegacyBoards.js'),
        import('./publishableLegacyBoards.js')
      ]);
      const fallbackBoards = {
        ...publishable.PUBLISHABLE_LEGACY_BOARDS,
        ...production.PRODUCTION_LEGACY_BOARDS
      };
      const next = { ...get(dynamicBoards) };
      let changed = false;
      for (const number of numbers) {
        if (!next[number] && fallbackBoards[number]) {
          next[number] = fallbackBoards[number];
          changed = true;
        }
      }
      if (changed) {
        dynamicBoards.set(next);
        persistCache(next);
      }
    } catch (_) {
      // The lazy snapshot may itself be unavailable on a first-ever offline
      // visit. Existing bundle and local cache content still remain usable.
    }
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch any of the given card numbers that aren't already in the static
 * DECK or the dynamic cache, merge them in, and return the full set
 * (cache hits + freshly fetched) keyed by number.
 */
export async function fetchBoardsByNumbers(numbers) {
  // Always refresh the requested dynamic boards from Supabase so authored edits
  // (text, images, audio, even floor shape) show on the next view. A "fetch once,
  // never refresh" cache silently froze boards mid-authoring; the cache is now
  // only an offline fallback. Static deck (<= DECK.length) is bundled locally.
  const dynamicNums = numbers.filter(n => n > DECK.length);

  if (dynamicNums.length > 0) {
    const cached = get(dynamicBoards);
    const mustWaitForNetwork = dynamicNums.some((number) => !cached[number] && !bundledBoard(number));
    const refresh = refreshDynamicBoards(dynamicNums);
    // Complete bundled topics render immediately. Supabase refreshes the cache
    // for the next visit; only backend-only boards retain the guarded wait.
    if (mustWaitForNetwork) await refresh;
  }

  const result = {};
  const merged = get(dynamicBoards);
  for (const n of numbers) {
    if (n <= DECK.length) result[n] = DECK[n - 1];
    else if (merged[n]) result[n] = merged[n];
    else if (bundledBoard(n)) result[n] = bundledBoard(n);
  }
  return result;
}

/**
 * Fetch all dynamic Snippets (cards tagged kind:"snippet", above the static
 * deck range so the deck's own Card-55 snippet isn't double-counted). Returns
 * them in the same {kicker, title, layers, tags} shape DECK entries use, so the
 * Snippets view can treat static + dynamic identically.
 */
export async function fetchSnippets() {
  const { data, error } = await supabase
    .from('cards')
    .select('kicker, title, layers, tags')
    .eq('tags->>kind', 'snippet')
    .gt('sort_order', DECK.length)
    .order('sort_order');

  if (error) throw error;
  return (data || []).map(r => ({
    kicker: r.kicker,
    title: r.title,
    layers: r.layers,
    tags: r.tags
  }));
}

/** Resolve a single board by number: static DECK first, then the dynamic cache. */
export function getBoard(number) {
  if (number <= DECK.length) return DECK[number - 1];
  return get(dynamicBoards)[number] || bundledBoard(number);
}

/** Numbers currently resolvable without a fetch (static + already-cached dynamic). */
export function loadedNumbers() {
  const merged = get(dynamicBoards);
  const dynamicNums = Object.keys(merged).map(Number);
  const lineNums = Object.keys(LINE_BOARDS).map(Number);
  const functionNums = Object.keys(FUNCTION_BOARDS).map(Number);
  const matrixNums = Object.keys(MATRIX_BOARDS).map(Number);
  const publishableNums = Object.keys(PUBLISHABLE_TOPIC_BOARDS).map(Number);
  const topicExpansionNums = Object.keys(TOPIC_EXPANSION_BOARDS).map(Number);
  const mathDraftNums = Object.keys(MATH_DRAFT_BOARDS).map(Number);
  const physicsDraftNums = Object.keys(PHYSICS_DRAFT_BOARDS).map(Number);
  const chemistryDraftNums = Object.keys(CHEMISTRY_DRAFT_BOARDS).map(Number);
  const computingDraftNums = Object.keys(COMPUTING_DRAFT_BOARDS).map(Number);
  const staticNums = Array.from({ length: DECK.length }, (_, i) => i + 1);
  return [...staticNums, ...dynamicNums, ...lineNums, ...functionNums, ...matrixNums, ...publishableNums, ...topicExpansionNums, ...mathDraftNums, ...physicsDraftNums, ...chemistryDraftNums, ...computingDraftNums].sort((a, b) => a - b);
}
