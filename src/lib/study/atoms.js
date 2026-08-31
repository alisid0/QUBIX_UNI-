// Topic atoms for matched study rooms.
//
// Match on one idea, not "data science" or "math". Volume 0 already names those
// ideas as reading sessions, so the room catalogue is derived from the book
// rather than invented beside it. Adjacent atoms follow the beginner path when
// the session is on it, otherwise the chapter order.

import { SHARED_FOUNDATIONS } from '../content/shared-foundations.js';
import { BEGINNER_PATH } from '../content/beginner-path.js';

const pathOrder = BEGINNER_PATH.flatMap(part => part.sessions.map(step => `${step.chapter}:${step.session}`));

function sessionAt(chapter, sessionNumber) {
  return SHARED_FOUNDATIONS.find(entry => entry.chapter === chapter)?.book.sessions[sessionNumber - 1] || null;
}

function neighbours(chapter, sessionNumber) {
  const key = `${chapter}:${sessionNumber}`;
  const pathIndex = pathOrder.indexOf(key);
  if (pathIndex >= 0) {
    const prev = pathOrder[pathIndex - 1];
    const next = pathOrder[pathIndex + 1];
    return {
      previousId: prev ? atomIdFromKey(prev) : null,
      nextId: next ? atomIdFromKey(next) : null
    };
  }
  const previous = sessionNumber > 1
    ? atomId(chapter, sessionAt(chapter, sessionNumber - 1))
    : null;
  const following = sessionAt(chapter, sessionNumber + 1);
  return {
    previousId: previous,
    nextId: following ? atomId(chapter, following) : null
  };
}

export function atomId(chapter, session) {
  return `ch${String(chapter).padStart(2, '0')}-${session.id}`;
}

function atomIdFromKey(key) {
  const [chapter, sessionNumber] = key.split(':').map(Number);
  const session = sessionAt(chapter, sessionNumber);
  return session ? atomId(chapter, session) : null;
}

function toAtom(chapter, session, sessionNumber) {
  const { previousId, nextId } = neighbours(chapter, sessionNumber);
  return Object.freeze({
    id: atomId(chapter, session),
    chapter,
    sessionNumber,
    sessionId: session.id,
    title: session.title,
    objective: session.objective,
    opening: session.opening,
    studyMinutes: session.studyMinutes,
    playMinutes: session.playMinutes,
    readingHref: `?mode=game&mission=shared-book&chapter=${chapter}&session=${sessionNumber}`,
    practiceHref: session.practice?.href || null,
    practiceTitle: session.practice?.title || null,
    previousId,
    nextId,
    check: session.check || null,
    example: session.example || null,
    sources: session.sources || []
  });
}

export const STUDY_ATOMS = Object.freeze(
  SHARED_FOUNDATIONS.flatMap(({ chapter, book }) =>
    book.sessions.map((session, index) => toAtom(chapter, session, index + 1))
  )
);

export const atomById = id => STUDY_ATOMS.find(atom => atom.id === id) || null;

export function atomsForChapter(chapter) {
  return STUDY_ATOMS.filter(atom => atom.chapter === chapter);
}

export function defaultAtomId() {
  return STUDY_ATOMS[0]?.id || null;
}

export function atomIdForSession(chapter, sessionNumber) {
  return STUDY_ATOMS.find(atom => atom.chapter === chapter && atom.sessionNumber === sessionNumber)?.id || defaultAtomId();
}

export function adjacentAtomIds(atom) {
  if (!atom) return [];
  return [atom.previousId, atom.id, atom.nextId].filter(Boolean);
}

export function sessionRecord(atom) {
  if (!atom) return null;
  return sessionAt(atom.chapter, atom.sessionNumber);
}
