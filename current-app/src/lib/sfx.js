// Reward sound effects — synthesized with Web Audio (no asset, no latency).
// Duolingo-style: short ascending chime for a W award, a three-note arpeggio
// with shimmer for bonuses. Swap these for ElevenLabs-generated mp3s later by
// replacing play() bodies with Audio(src) — the call sites won't change.
//
// Respects the 'qubix-sound' localStorage pref ('off' mutes; default on).

let ctx = null;

function audioCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function soundOn() {
  try { return localStorage.getItem('qubix-sound') !== 'off'; } catch { return true; }
}

/** One plucked bell-ish note: triangle fundamental + sine octave sparkle, fast decay. */
function note(ac, freq, at, dur = 0.28, vol = 0.32) {
  const gain = ac.createGain();
  gain.connect(ac.destination);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(vol, at + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);

  const osc = ac.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;
  osc.connect(gain);
  osc.start(at);
  osc.stop(at + dur + 0.02);

  const sparkle = ac.createGain();
  sparkle.connect(ac.destination);
  sparkle.gain.setValueAtTime(0.0001, at);
  sparkle.gain.exponentialRampToValueAtTime(vol * 0.22, at + 0.01);
  sparkle.gain.exponentialRampToValueAtTime(0.0001, at + dur * 0.6);
  const osc2 = ac.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = freq * 2;
  osc2.connect(sparkle);
  osc2.start(at);
  osc2.stop(at + dur);
}

/** Regular W award: two quick ascending notes (E5 → A5). */
export function playAward() {
  if (!soundOn()) return;
  const ac = audioCtx();
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  note(ac, 659.25, t);            // E5
  note(ac, 880.0, t + 0.09, 0.34); // A5
}

/** Bonus / big award: ascending major arpeggio with a top shimmer (C5-E5-G5-C6). */
export function playBonus() {
  if (!soundOn()) return;
  const ac = audioCtx();
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  note(ac, 523.25, t, 0.24);              // C5
  note(ac, 659.25, t + 0.08, 0.24);       // E5
  note(ac, 783.99, t + 0.16, 0.26);       // G5
  note(ac, 1046.5, t + 0.26, 0.5, 0.36);  // C6 held with sparkle
}
