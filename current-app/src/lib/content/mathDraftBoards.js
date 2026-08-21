import finalMathDrafts from '../../../content-drafts/mathematics-final-drafts-2026-07-14.json';
import { PATHS, SUBJECT_PATHS } from './paths.js';

// The reviewed mathematics draft contains one board for every card in the
// launch Maths path, in curriculum order. Keep it as the last-resort bundle so
// learners still receive the complete lesson when Supabase is unavailable,
// while the more deliberately packaged topic bundles remain free to override
// individual boards.
const mathNumbers = SUBJECT_PATHS.maths.flatMap((pathId) => PATHS[pathId]?.cards || []);
const drafts = finalMathDrafts?.boards || [];

if (drafts.length !== mathNumbers.length) {
  throw new Error(`Mathematics fallback mismatch: ${drafts.length} drafts for ${mathNumbers.length} boards`);
}

export const MATH_DRAFT_BOARDS = Object.fromEntries(
  mathNumbers.map((number, index) => {
    const draft = drafts[index];
    return [number, {
      act: draft.act || 'I',
      kicker: draft.kicker || `BB ${number}`,
      title: draft.title,
      tags: draft.tags || { subject: 'maths' },
      layers: (draft.floors || draft.layers || []).map((floor) => ({
        text: floor?.content ?? floor?.text ?? '',
        img: floor?.img ?? floor?.image ?? null,
        audio: floor?.audio ?? null
      }))
    }];
  })
);
