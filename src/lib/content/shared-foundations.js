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
import { SHARED_FOUNDATIONS_PART_EIGHT } from './shared-foundations-part-eight.js';
import { expansionFor } from './shared-foundations-expansion.js';

// Keep the chapter manuscripts independent from the interaction layer. An
// expansion can replace the route/rehearsal for a newly built mission, append
// open-source attribution, and add a reader exercise without mutating the
// frozen chapter object.
const expandBook = (chapter, book) => {
  const sessions = Object.freeze(book.sessions.map(session => {
    const expansion = expansionFor(chapter, session.id);
    const { sourceAdditions = [], ...fields } = expansion || {};
    const merged = expansion ? { ...session, ...fields } : session;

    // An applied exercise is time a learner actually spends, so the session's
    // declared time has to include it. This used to add the minutes only when
    // the exercise arrived through the expansion file, which meant every
    // exercise written directly on a session was invisible: seven sessions
    // told a learner ten minutes for sixteen minutes of work.
    //
    // Added from the merged session so it counts once whichever way it came.
    const exerciseMinutes = merged.exercise?.minutes || 0;

    if (!expansion && !exerciseMinutes) return session;
    return Object.freeze({
      ...merged,
      studyMinutes: session.studyMinutes + exerciseMinutes,
      sources: Object.freeze([...(session.sources || []), ...sourceAdditions])
    });
  }));
  return Object.freeze({
    ...book,
    sessions,
    totalMinutes: sessions.reduce((total, session) => total + session.studyMinutes + session.playMinutes, 0)
  });
};

/** Keyed by the chapter number shown on the contents page, counting from 1. */
export const SHARED_FOUNDATIONS = Object.freeze([
  Object.freeze({ chapter: 1, book: expandBook(1, SHARED_FOUNDATIONS_PART_ONE) }),
  Object.freeze({ chapter: 2, book: expandBook(2, SHARED_FOUNDATIONS_PART_TWO) }),
  Object.freeze({ chapter: 3, book: expandBook(3, SHARED_FOUNDATIONS_PART_THREE) }),
  Object.freeze({ chapter: 4, book: expandBook(4, SHARED_FOUNDATIONS_PART_FOUR) }),
  Object.freeze({ chapter: 5, book: expandBook(5, SHARED_FOUNDATIONS_PART_FIVE) }),
  Object.freeze({ chapter: 6, book: expandBook(6, SHARED_FOUNDATIONS_PART_SIX) }),
  Object.freeze({ chapter: 7, book: expandBook(7, SHARED_FOUNDATIONS_PART_SEVEN) }),
  Object.freeze({ chapter: 8, book: expandBook(8, SHARED_FOUNDATIONS_PART_EIGHT) })
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

// Reading and doing, separately. Every session declares both, and the volume
// total has always been their sum, so the two halves of the course could never
// be quoted apart from each other. They are the first thing somebody deciding
// whether to start wants to know.
const allSessions = SHARED_FOUNDATIONS.flatMap(c => c.book.sessions);
export const volumeStudyMinutes = allSessions.reduce((n, s) => n + s.studyMinutes, 0);
export const volumePlayMinutes = allSessions.reduce((n, s) => n + s.playMinutes, 0);
export const volumeSessions = allSessions.length;
