// Local session store. Rooms, notes, recaps.
//
// Live chat across two tabs uses BroadcastChannel. There is no authorised
// network session store yet, so a remote friend opening the same invite gets
// the same contract (intent, atom, timer, chair) on their device, not a shared
// message pipe. That is the validation product: the session, not a network.

import { randomCode } from './identity.js';
import { atomById } from './atoms.js';
import { intentById } from './intents.js';
import { fillWithPeers } from './peers.js';
import { HUMAN_CAP } from './matcher.js';
import { SESSION_MS, chairReply, shouldEnd, openingSpeech } from './chair.js';
import { buildRecap } from './recap.js';

const ROOMS_KEY = 'qx.study.rooms.v1';
const RECAPS_KEY = 'qx.study.recaps.v1';
const QUEUE_KEY = 'qx.study.queue.v1';
const CHANNEL = 'qx-study-rooms';

function read(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function write(key, value) {
  if (typeof localStorage === 'undefined') return value;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ }
  return value;
}

export function loadRooms() {
  const rows = read(ROOMS_KEY, {});
  return rows && typeof rows === 'object' ? rows : {};
}

export function loadRecaps() {
  const rows = read(RECAPS_KEY, []);
  return Array.isArray(rows) ? rows : [];
}

export function saveRoom(room) {
  const rooms = loadRooms();
  rooms[room.code] = room;
  write(ROOMS_KEY, rooms);
  broadcast({ type: 'room', room });
  return room;
}

export function getRoom(code) {
  if (!code) return null;
  return loadRooms()[code] || null;
}

export function deleteRoom(code) {
  const rooms = loadRooms();
  delete rooms[code];
  write(ROOMS_KEY, rooms);
  const recaps = loadRecaps().filter(row => row.roomCode !== code);
  write(RECAPS_KEY, recaps);
}

export function deleteRecap(roomCode) {
  write(RECAPS_KEY, loadRecaps().filter(row => row.roomCode !== roomCode));
}

export function exportRecap(recap) {
  return JSON.stringify(recap, null, 2);
}

function makeMember(person, extras) {
  return {
    id: person.id,
    displayName: person.displayName,
    kind: person.kind || 'human',
    role: extras.role || person.role || 'learner',
    band: extras.band || person.band || 'L1',
    intent: extras.intent,
    atomId: extras.atomId
  };
}

export function createRoom({
  kind = 'seminar',
  intent,
  atomId,
  band = 'L1',
  role = 'learner',
  host,
  durationMs = SESSION_MS,
  mutedChair = false,
  code
}) {
  if (!intentById(intent)) throw new Error('Unknown intent');
  if (!atomById(atomId)) throw new Error('Unknown atom');
  const hostMember = makeMember({ ...host, kind: 'human' }, { intent, atomId, band, role });
  let members = [hostMember];
  if (kind !== 'friends') members = fillWithPeers(members, { intent, atomId, band });
  const room = {
    code: code || randomCode(6),
    kind,
    intent,
    atomId,
    band,
    durationMs,
    createdAt: Date.now(),
    startedAt: Date.now(),
    status: 'live',
    chair: mutedChair ? 'muted' : 'bot',
    mutedChair,
    members,
    messages: [],
    notes: '',
    notesUpdated: 0,
    skipVotes: [],
    groupAttempted: false,
    exitStarted: false,
    recap: null,
    version: 1
  };
  if (room.chair === 'bot') {
    const opening = chairReply(room, { type: 'open' }, room.startedAt);
    if (opening) room.messages.push(opening);
  } else {
    room.messages.push({
      id: `msg_${room.startedAt}_open`,
      at: room.startedAt,
      from: 'chair',
      name: 'Chair',
      kind: 'chair',
      text: `${openingSpeech(room)} The chair is muted unless you ask. Humans run this friends room.`
    });
  }
  return saveRoom(room);
}

export function joinRoom(code, person, extras) {
  const room = getRoom(code);
  if (!room) return null;
  if (room.members.some(member => member.id === person.id)) return room;
  const humans = room.members.filter(member => member.kind === 'human');
  if (humans.length >= HUMAN_CAP) return room;
  const member = makeMember(person, {
    intent: extras?.intent || room.intent,
    atomId: extras?.atomId || room.atomId,
    band: extras?.band || room.band,
    role: extras?.role || 'learner'
  });
  room.members = [...room.members, member];
  room.version += 1;
  room.messages = [...room.messages, {
    id: `msg_${Date.now()}_join`,
    at: Date.now(),
    from: 'chair',
    name: 'Chair',
    kind: 'chair',
    text: `${person.displayName} took a seat. Cap is ${HUMAN_CAP} humans.`
  }];
  return saveRoom(room);
}

export function postMessage(code, { from, name, kind = 'human', text }) {
  const room = getRoom(code);
  if (!room || room.status !== 'live') return room;
  const now = Date.now();
  const message = {
    id: `msg_${now}_${randomCode(4)}`,
    at: now,
    from,
    name,
    kind,
    text: String(text || '').slice(0, 2000)
  };
  room.messages = [...room.messages, message];
  if (kind === 'human' && String(text).trim().length > 20) room.groupAttempted = true;
  room.version += 1;
  if (room.chair === 'bot' && kind === 'human') {
    const reply = chairReply(room, { type: 'message', from, text: message.text }, now);
    if (reply) room.messages = [...room.messages, reply];
  }
  if (shouldEnd(room, now)) return endRoom(code, now);
  return saveRoom(room);
}

export function setNotes(code, notes) {
  const room = getRoom(code);
  if (!room) return null;
  room.notes = String(notes || '').slice(0, 8000);
  room.notesUpdated = Date.now();
  room.version += 1;
  return saveRoom(room);
}

export function voteSkip(code, learnerId) {
  const room = getRoom(code);
  if (!room) return null;
  if (!room.skipVotes.includes(learnerId)) room.skipVotes = [...room.skipVotes, learnerId];
  room.version += 1;
  if (room.chair === 'bot') {
    const reply = chairReply(room, { type: 'skip' }, Date.now());
    if (reply) {
      room.messages = [...room.messages, reply];
      if (reply.skip) room.skipVotes = [];
    }
  }
  return saveRoom(room);
}

export function pulseChair(code, pulse = 'timebox') {
  const room = getRoom(code);
  if (!room || room.chair !== 'bot' || room.status !== 'live') return room;
  const now = Date.now();
  if (shouldEnd(room, now)) return endRoom(code, now);
  const reply = chairReply(room, { type: 'tick', pulse }, now);
  if (reply) {
    if (reply.phase === 'exit') room.exitStarted = true;
    if (reply.phase === 'recap') return endRoom(code, now);
    room.messages = [...room.messages, reply];
    room.version += 1;
    return saveRoom(room);
  }
  return room;
}

export function toggleChair(code, muted) {
  const room = getRoom(code);
  if (!room || room.kind !== 'friends') return room;
  room.mutedChair = Boolean(muted);
  room.chair = room.mutedChair ? 'muted' : 'bot';
  room.version += 1;
  return saveRoom(room);
}

export function endRoom(code, now = Date.now()) {
  const room = getRoom(code);
  if (!room) return null;
  if (room.status === 'ended' && room.recap) return room;
  room.status = 'ended';
  room.endedAt = now;
  const recap = buildRecap(room, now);
  room.recap = recap;
  room.version += 1;
  saveRoom(room);
  const recaps = loadRecaps().filter(row => row.roomCode !== code);
  recaps.unshift(recap);
  write(RECAPS_KEY, recaps.slice(0, 50));
  return room;
}

export function enqueueMatch(seat) {
  const queue = read(QUEUE_KEY, []).filter(row => Date.now() - row.at < 2 * 60 * 1000);
  queue.push({ ...seat, at: Date.now() });
  write(QUEUE_KEY, queue);
  return queue;
}

export function dequeueMatch(learnerId) {
  const queue = read(QUEUE_KEY, []).filter(row => row.learnerId !== learnerId);
  write(QUEUE_KEY, queue);
  return queue;
}

export function waitingFor(seat) {
  return read(QUEUE_KEY, []).filter(row =>
    row.learnerId !== seat.learnerId
    && Date.now() - row.at < 2 * 60 * 1000
  );
}

function broadcast(payload) {
  if (typeof BroadcastChannel === 'undefined') return;
  try {
    const channel = new BroadcastChannel(CHANNEL);
    channel.postMessage(payload);
    channel.close();
  } catch { /* unsupported */ }
}

export function subscribeRooms(onRoom) {
  if (typeof BroadcastChannel === 'undefined') return () => {};
  const channel = new BroadcastChannel(CHANNEL);
  channel.onmessage = event => {
    if (event.data?.type === 'room' && event.data.room) {
      const incoming = event.data.room;
      const current = getRoom(incoming.code);
      if (!current || incoming.version >= current.version) {
        const rooms = loadRooms();
        rooms[incoming.code] = mergeRooms(current, incoming);
        write(ROOMS_KEY, rooms);
        onRoom(rooms[incoming.code]);
      }
    }
  };
  return () => channel.close();
}

function mergeRooms(local, remote) {
  if (!local) return remote;
  const messages = [...(local.messages || []), ...(remote.messages || [])];
  const seen = new Set();
  const merged = [];
  for (const message of messages.sort((a, b) => a.at - b.at)) {
    if (seen.has(message.id)) continue;
    seen.add(message.id);
    merged.push(message);
  }
  const members = [...(local.members || [])];
  for (const member of remote.members || []) {
    if (!members.some(row => row.id === member.id)) members.push(member);
  }
  const notes = (remote.notesUpdated || 0) >= (local.notesUpdated || 0) ? remote.notes : local.notes;
  return {
    ...local,
    ...remote,
    members,
    messages: merged,
    notes,
    notesUpdated: Math.max(local.notesUpdated || 0, remote.notesUpdated || 0),
    version: Math.max(local.version || 0, remote.version || 0)
  };
}

export function inviteHref(room) {
  const params = new URLSearchParams({
    intent: room.intent,
    atom: room.atomId,
    kind: room.kind,
    band: room.band
  });
  return `/study/rooms/${room.code}?${params}`;
}
