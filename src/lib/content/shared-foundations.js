// Volume 0, chapter by chapter.
//
// Part One was a single file the reader imported directly and the contents page
// hardcoded as "chapter 1". That worked for exactly one chapter. Adding a
// second needed a list, so this is the list: everything that consults the
// volume consults it here, and a new chapter becomes visible everywhere by
// being added once.
//
// The seven chapter titles on the contents page are the plan for the volume.
// A chapter appears here only when it has actually been written, which is what
// lets the contents page say "1 written" or "2 written" truthfully instead of
// being told a number.

import { SHARED_FOUNDATIONS_PART_ONE } from './shared-foundations-part-one.js';
import { SHARED_FOUNDATIONS_PART_TWO } from './shared-foundations-part-two.js';
import { SHARED_FOUNDATIONS_PART_THREE } from './shared-foundations-part-three.js';
import { SHARED_FOUNDATIONS_PART_FOUR } from './shared-foundations-part-four.js';
import { SHARED_FOUNDATIONS_PART_FIVE } from './shared-foundations-part-five.js';
import { SHARED_FOUNDATIONS_PART_SIX } from './shared-foundations-part-six.js';
import { SHARED_FOUNDATIONS_PART_SEVEN } from './shared-foundations-part-seven.js';

/** Keyed by the chapter number shown on the contents page, counting from 1. */
export const SHARED_FOUNDATIONS = Object.freeze([
  Object.freeze({ chapter: 1, book: SHARED_FOUNDATIONS_PART_ONE }),
  Object.freeze({ chapter: 2, book: SHARED_FOUNDATIONS_PART_TWO }),
  Object.freeze({ chapter: 3, book: SHARED_FOUNDATIONS_PART_THREE }),
  Object.freeze({ chapter: 4, book: SHARED_FOUNDATIONS_PART_FOUR }),
  Object.freeze({ chapter: 5, book: SHARED_FOUNDATIONS_PART_FIVE }),
  Object.freeze({ chapter: 6, book: SHARED_FOUNDATIONS_PART_SIX }),
  Object.freeze({ chapter: 7, book: SHARED_FOUNDATIONS_PART_SEVEN })
]);

export const bookForChapter = n => SHARED_FOUNDATIONS.find(c => c.chapter === n)?.book || null;

/** The parts of a chapter, with the time each one takes, or an empty list. */
export const partsForChapter = n => {
  const book = bookForChapter(n);
  if (!book) return [];
  return book.sessions.map((s, i) => ({
    n: i + 1,
    title: s.title,
    minutes: s.studyMinutes + s.playMinutes
  }));
};

export const writtenChapters = SHARED_FOUNDATIONS.length;
export const volumeMinutes = SHARED_FOUNDATIONS.reduce((n, c) => n + c.book.totalMinutes, 0);
