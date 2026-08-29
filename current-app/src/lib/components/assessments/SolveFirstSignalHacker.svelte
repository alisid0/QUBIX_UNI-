<script>
  // The Big Wheel — a Solve First sine-wave discovery, built from scratch 2026-07-29.
  //
  // A dot rides a rotating wheel; its HEIGHT traces onto scrolling paper.
  // The learner recreates recorded rides:
  //   Mission 1 — wheel RADIUS shapes the trace's height (amplitude).
  //   Mission 2 — spin SPEED packs in more cycles (frequency).
  //   Mission 3 — START ANGLE slides the trace (phase) and AXLE HEIGHT lifts
  //               its midline (vertical shift).
  //   Mission 4 — ROOT: the recorded trace goes dark; only its equation is
  //               shown. Set the dials by reading it.
  // The reveal names it: a sine wave IS circular motion seen sideways.
  // Pure SVG — Qubix tokens work natively, every state testable.
  import ArcadeShell from './ArcadeShell.svelte';
  import SolveFirstPause from './SolveFirstPause.svelte';
  import { fly } from 'svelte/transition';
  import { playAward, playBonus } from '../../sfx.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const W = 360, H = 240;
  const WHEEL_CX = 62, MID = 120;      // wheel centre x, paper midline y
  const PAPER_X = 130, PAPER_W = 218;  // trace area

  const RANGES = {
    A: { min: 10, max: 80, step: 2 },
    w: { min: 0.5, max: 4, step: 0.1 },
    p: { min: 0, max: 6.2, step: 0.1 },
    D: { min: -50, max: 50, step: 2 }
  };
  const LABELS = { A: 'Wheel radius', w: 'Spin speed', p: 'Start angle', D: 'Axle height' };
  const RAW = { A: 'A', w: 'ω', p: 'φ', D: 'D' };

  const MISSIONS = [
    {
      name: 'The Radius', params: ['A'],
      brief: 'A camera films the wheel from the side. Its dot draws the paper trace on the right.\n\nOne dial: WHEEL RADIUS.\nRecreate the two recorded rides (dim traces).',
      rides: [{ A: 60, w: 1.5, p: 0, D: 0 }, { A: 25, w: 1.5, p: 0, D: 0 }]
    },
    {
      name: 'The Spin', params: ['A', 'w'],
      brief: 'New dial: SPIN SPEED.\nFaster spin = more humps on the same paper.\nRecreate both rides.',
      rides: [{ A: 45, w: 3.0, p: 0, D: 0 }, { A: 65, w: 1.0, p: 0, D: 0 }]
    },
    {
      name: 'The Offset', params: ['A', 'w', 'p', 'D'],
      brief: 'Two more dials.\nSTART ANGLE — where on the wheel the dot begins.\nAXLE HEIGHT — raise or sink the whole wheel.\nRecreate both rides.',
      rides: [{ A: 40, w: 2.0, p: 1.6, D: 25 }, { A: 55, w: 1.5, p: 3.1, D: -20 }]
    },
    {
      name: 'Root Access', params: ['A', 'w', 'p', 'D'],
      brief: '⚠ RECORDING CORRUPTED ⚠\nThe trace is dark. Only its formula survived:\n\nh(t) = 50 · sin(2.0·t + 1.5) + 20\n\nSet the dials by reading it. Then transmit.',
      rides: [{ A: 50, w: 2.0, p: 1.5, D: 20, dark: true }],
      equation: 'h(t) = 50 · sin(2.0·t + 1.5) + 20'
    }
  ];

  let mission = 0;
  let phase = 'briefing';              // briefing | play | reveal
  let rideIx = 0;
  let params = { A: 30, w: 1.0, p: 0, D: 0 };
  let matched = false;
  let score = 0, locksDone = 0;
  let celebrating = false;
  let recorded = false;

  $: M = MISSIONS[mission];
  $: ride = M.rides[rideIx];
  $: dark = !!ride.dark;
  $: matchPct = computeMatch(params, ride, M.params);
  $: matched = matchPct >= 88;

  function computeMatch(pr, tg, active) {
    const spans = { A: 55, w: 2.8, p: Math.PI, D: 80 };
    let total = 0;
    for (const k of active) {
      const diff = k === 'p'
        ? Math.min(Math.abs(pr.p - tg.p), Math.PI * 2 - Math.abs(pr.p - tg.p))
        : Math.abs(pr[k] - tg[k]);
      total += Math.max(0, 1 - diff / spans[k]);
    }
    return Math.round((total / active.length) * 100);
  }

  function tracePath(cfg) {
    let d = '';
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * (Math.PI * 2);
      const x = PAPER_X + (i / 100) * PAPER_W;
      const y = MID - (cfg.A * Math.sin(cfg.w * t + cfg.p) + cfg.D);
      d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
    }
    return d;
  }

  function randomize(active) {
    const next = { ...params };
    for (const k of active) {
      const r = RANGES[k];
      next[k] = Math.round((r.min + Math.random() * (r.max - r.min)) / r.step) * r.step;
    }
    // never start already matched
    params = next;
    if (computeMatch(next, ride, active) >= 80) randomize(active);
  }

  function startMission(m) {
    mission = m;
    rideIx = 0;
    phase = 'briefing';
    celebrating = false;
  }

  function beginRide() {
    phase = 'play';
    randomize(MISSIONS[mission].params);
  }

  function lockRide() {
    if (!matched || phase !== 'play' || celebrating) return;
    celebrating = true;
    locksDone += 1;
    score += 120 + matchPct;
    try { playBonus(); } catch (_) {}
  }

  function continueAfterLock() {
    if (!celebrating) return;
    celebrating = false;
    if (rideIx < M.rides.length - 1) {
      rideIx += 1;
      randomize(M.params);
    } else if (mission < MISSIONS.length - 1) {
      startMission(mission + 1);
    } else {
      phase = 'reveal';
      finishGame();
    }
  }

  function finishGame() {
    if (recorded) return;
    recorded = true;
    try { playAward(); } catch (_) {}
    onDone({
      id: config.id,
      reward: Math.min(15, 7 + locksDone),
      arcadeScore: score,
      levelsCleared: 4,
      perfectLevels: 4,
      patternFound: true,
      compared: true,
      transferFirstTry: true,
      usedHint: false
    });
  }

  function restart() {
    recorded = false;
    score = 0;
    locksDone = 0;
    startMission(0);
  }

  function fmt(k) {
    const v = params[k];
    if (k === 'w') return v.toFixed(1);
    if (k === 'p') return v.toFixed(1);
    return String(Math.round(v));
  }

  startMission(0);

  // wheel dot at trace start (t = 0): height A·sin(φ), horizontal A·cos(φ)
  $: wheelDot = {
    x: WHEEL_CX + params.A * Math.cos(params.p),
    y: MID - params.D - params.A * Math.sin(params.p)
  };
</script>

<ArcadeShell
  eyebrow={config.eyebrow}
  title={config.title}
  level={mission + (phase === 'reveal' ? 1 : 0)}
  totalLevels={MISSIONS.length}
  score={score}
  streak={locksDone > 2 ? locksDone : 0}
  onExit={() => { if (phase === 'reveal') finishGame(); onExit(); }}
>
  {#if phase === 'briefing'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Mission {mission + 1} of {MISSIONS.length}</div>
      <h2>{M.name}</h2>
      <p class="pre">{M.brief}</p>
      <button class="primary" on:click={beginRide}>Start the wheel</button>
    </div>

  {:else if phase === 'reveal'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Decoded</div>
      <h2>A sine wave is a spinning wheel, seen sideways.</h2>
      <p class="pre" style="color:var(--qx-green-text)">{'Every dial you turned is a term:\n\nWHEEL RADIUS = A — amplitude\nSPIN SPEED = ω — frequency\nSTART ANGLE = φ — phase shift\nAXLE HEIGHT = D — vertical shift'}</p>
      <div class="formula">h(t) = A · sin(ω·t + φ) + D</div>
      <div class="rewardbox"><div><span>Discovery</span><strong>{config.rewardLabel}</strong></div></div>
      <div class="stack">
        <button class="primary" on:click={() => { finishGame(); onExit(); }}>Return to workshops</button>
        <button class="ghost" on:click={restart}>Ride again</button>
      </div>
    </div>

  {:else}
    <svg class="scene" class:locked={celebrating} viewBox="0 0 {W} {H}" aria-label="Wheel and trace">
      <!-- midline -->
      <line class="mid" x1="8" y1={MID} x2={W - 8} y2={MID} />
      <!-- paper zone -->
      <rect class="paper" x={PAPER_X - 4} y="10" width={PAPER_W + 10} height={H - 20} rx="8" />
      <!-- axle track -->
      <line class="axletrack" x1={WHEEL_CX} y1={MID - 60} x2={WHEEL_CX} y2={MID + 60} />
      <!-- wheel -->
      <circle class="wheel" cx={WHEEL_CX} cy={MID - params.D} r={params.A} />
      <circle class="axle" cx={WHEEL_CX} cy={MID - params.D} r="3.5" />
      <line class="spoke" x1={WHEEL_CX} y1={MID - params.D} x2={wheelDot.x} y2={wheelDot.y} />
      <circle class="rider" cx={wheelDot.x} cy={wheelDot.y} r="6" />
      <!-- projection line from rider to trace start -->
      <line class="proj" x1={wheelDot.x} y1={wheelDot.y} x2={PAPER_X} y2={MID - (params.A * Math.sin(params.p) + params.D)} />
      <!-- target trace (recorded ride) -->
      {#if !dark}
        <path class="target" d={tracePath(ride)} />
      {:else}
        <text class="darknote" x={PAPER_X + PAPER_W / 2} y="32" text-anchor="middle">RECORDING DARK — read the formula</text>
      {/if}
      <!-- player trace -->
      <path class="player" d={tracePath(params)} />
      <!-- match strip -->
      <text class="matchlabel" class:good={matched} x="12" y="24">MATCH {matchPct}%</text>
      {#if celebrating}<text class="flash" x={W / 2} y={H - 14} text-anchor="middle">RIDE LOCKED ✓</text>{/if}
    </svg>

    {#if dark}
      <div class="deq"><span>Root challenge — set the dials from the surviving formula:</span><b>{M.equation}</b></div>
    {:else}
      <p class="tip">Ride {rideIx + 1} of {M.rides.length}. Match the dim recorded trace with the bright one, then lock it.</p>
    {/if}

    <div class="controls">
      {#each M.params as k (k)}
        <label class="ctl">
          <span>{dark ? RAW[k] : LABELS[k]} · {fmt(k)}</span>
          <input type="range" min={RANGES[k].min} max={RANGES[k].max} step={RANGES[k].step}
            bind:value={params[k]} aria-label={LABELS[k]} disabled={celebrating} />
        </label>
      {/each}
      <button class="lock" class:armed={matched} on:click={lockRide} disabled={!matched || celebrating}>
        {matched ? (dark ? 'TRANSMIT ▸' : 'LOCK THE RIDE ▸') : `MATCH ${matchPct}% — need 88%`}
      </button>
    </div>
    {#if celebrating}
      <SolveFirstPause
        title={dark ? 'The formula rebuilt the hidden trace' : 'The two traces now agree'}
        message={dark
          ? 'Read the four dial values against the four terms in the formula. You produced the missing output without seeing the recording.'
          : 'Keep the solved trace on screen. Notice which dial changed its height, spacing, starting point, or centre line.'}
        actionLabel={rideIx < M.rides.length - 1
          ? 'Continue to the next ride'
          : mission < MISSIONS.length - 1 ? 'Continue to the next mission' : 'Reveal the concept'}
        onContinue={continueAfterLock}
      />
    {/if}
  {/if}
</ArcadeShell>

<style>
  .scene { width: 100%; border: 1px solid var(--qx-border); border-radius: 14px; background: var(--qx-bg); transition: box-shadow .2s; }
  .scene.locked { box-shadow: 0 0 0 2px var(--qx-green); }
  .mid { stroke: var(--qx-border-2); stroke-dasharray: 4 5; }
  .paper { fill: var(--qx-surface); stroke: var(--qx-border); }
  .axletrack { stroke: var(--qx-border-2); stroke-dasharray: 2 4; }
  .wheel { fill: none; stroke: var(--qx-accent); stroke-width: 2; opacity: .85; }
  .axle { fill: var(--qx-text); }
  .spoke { stroke: var(--qx-accent); stroke-width: 2; }
  .rider { fill: var(--qx-yellow); stroke: var(--qx-text); stroke-width: 1.5; }
  .proj { stroke: var(--qx-yellow); stroke-width: 1.5; stroke-dasharray: 3 4; opacity: .8; }
  .target { fill: none; stroke: var(--qx-green); stroke-width: 3; opacity: .35; }
  .player { fill: none; stroke: var(--qx-accent); stroke-width: 2.5; }
  .matchlabel { fill: var(--qx-text-faint); font-size: 11px; font-weight: 900; }
  .matchlabel.good { fill: var(--qx-green-text); }
  .darknote { fill: var(--qx-text-faint); font-size: 11px; font-weight: 800; letter-spacing: .05em; }
  .flash { fill: var(--qx-green-text); font-size: 15px; font-weight: 950; }

  .tip { color: var(--qx-text-dim); font-size: 12.5px; font-weight: 650; line-height: 1.4; margin: 9px 0 0; }
  .deq { display: grid; gap: 4px; margin-top: 9px; border: 1.5px solid var(--qx-accent); border-radius: 12px; background: var(--qx-accent-soft); padding: 10px 12px; }
  .deq span { color: var(--qx-text-dim); font-size: 11px; font-weight: 700; }
  .deq b { font-family: ui-monospace, Menlo, monospace; font-size: 14px; font-weight: 800; color: var(--qx-text); }

  .controls { display: grid; gap: 7px; margin-top: 10px; grid-template-columns: 1fr 1fr; }
  .ctl { display: grid; gap: 3px; }
  .ctl span { color: var(--qx-text-dim); font-size: 10px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; font-variant-numeric: tabular-nums; }
  .ctl input { width: 100%; accent-color: var(--qx-accent); min-height: 28px; }
  .lock { grid-column: 1 / -1; min-height: 46px; border: 1.5px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text-faint); font: 900 13px var(--qx-font); cursor: default; transition: background .2s, color .2s; }
  .lock.armed { border: none; background: var(--qx-green); color: var(--qx-bg); cursor: pointer; }

  .panel { display: flex; flex-direction: column; gap: 10px; padding: 4px 2px; }
  .panel.center { align-items: center; text-align: center; }
  .eyebrow { color: var(--qx-accent-text); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  h2 { font-size: 20px; line-height: 1.15; margin: 2px 0 4px; font-weight: 950; }
  .panel p { color: var(--qx-text-dim); font-size: 13px; line-height: 1.5; margin: 0; }
  .pre { white-space: pre-line; }
  .formula { font-family: ui-monospace, Menlo, monospace; font-size: 13px; font-weight: 800; color: var(--qx-text); border: 1.5px solid var(--qx-accent); border-radius: 12px; background: var(--qx-accent-soft); padding: 10px 12px; }
  .rewardbox { width: 100%; border: 1.5px solid var(--qx-green); border-radius: 14px; background: var(--qx-green-soft); padding: 12px; text-align: left; }
  .rewardbox span { font-size: 9px; color: var(--qx-green-text); font-weight: 900; text-transform: uppercase; }
  .rewardbox strong { display: block; font-size: 15px; }
  .stack { width: 100%; display: grid; gap: 7px; }
  .primary { min-height: 46px; border: none; border-radius: 999px; background: var(--qx-accent); color: var(--qx-bg); font: 900 14px var(--qx-font); cursor: pointer; width: 100%; }
  .ghost { min-height: 46px; border: 1.5px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text-dim); font: 900 14px var(--qx-font); cursor: pointer; width: 100%; }
</style>
