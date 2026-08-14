<script>
  // Ropeworks — a Solve First conic-sections discovery, built from scratch 2026-07-29.
  //
  // The string construction, playable: two ANCHORS (foci) and a ROPE of fixed
  // length trace an orbit. Debris is caught only when the PATH passes through
  // it — the sum of its two anchor distances must equal the rope. That rule
  // IS the definition of an ellipse, so no area-covering exploit can exist.
  //   Mission 1 — anchors merged: the rope draws a circle; size it.
  //   Mission 2 — anchors apart: two debris a circle can't share; stretch.
  //   Mission 3 — slide the whole rig: off-centre orbits (h, k).
  //   Transfer — read a standard-form equation, place the anchors.
  // Pure SVG — Qubix tokens native, every state testable.
  import ArcadeShell from './ArcadeShell.svelte';
  import SolveFirstPause from './SolveFirstPause.svelte';
  import { fly } from 'svelte/transition';
  import { playAward, playBonus } from '../../sfx.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const W = 360, H = 300, CX = W / 2, CY = H / 2;
  const TOL = 9;                       // |d1 + d2 − rope| tolerance

  const MISSIONS = [
    {
      name: 'One Anchor', sep: 0, sepLocked: true, moveLocked: true,
      brief: 'A rope loops around the anchors and a stylus pulls it taut — the stylus traces the orbit.\n\nBoth anchors sit together. One dial: ROPE LENGTH.\nSweep the orbit through every debris point.',
      sweeps: [
        [{ x: 0, y: 70 }, { x: -70, y: 0 }],
        [{ x: 95, y: 0 }, { x: 0, y: -95 }]
      ]
    },
    {
      name: 'Two Anchors', sepLocked: false, moveLocked: true,
      brief: 'Now pull the anchors APART (drag either one, or use the dial).\n\nThese debris pairs sit at DIFFERENT distances from centre — no single circle passes through both. The stretched orbit can.',
      sweeps: [
        [{ x: 120, y: 0 }, { x: 0, y: 55 }],
        [{ x: -110, y: 0 }, { x: 60, y: 48 }]
      ]
    },
    {
      name: 'Slide the Rig', sepLocked: false, moveLocked: false,
      brief: 'The whole rig slides now — drag the CENTRE handle.\nOff-centre debris needs an off-centre orbit.',
      sweeps: [
        [{ x: 150, y: 20 }, { x: 40, y: 60 }],
        [{ x: -60, y: -75 }, { x: -140, y: -20 }]
      ]
    }
  ];

  // Transfer: (x−60)²/100² + y²/60²  → a=100, b=60, c=√(a²−b²)=80, centre (60,0)
  // anchors at (60−80, 0) and (60+80, 0) = (−20, 0) and (140, 0)
  const TRANSFER = {
    equation: '(x − 60)² / 100²  +  y² / 60²  =  1',
    q: 'A ghost orbit broadcasts this equation. Where are its two anchors?',
    options: [
      { label: '(−40, 0) and (160, 0) — a to each side', ok: false },
      { label: '(−20, 0) and (140, 0) — c = √(a²−b²) = 80 from centre (60, 0)', ok: true },
      { label: '(0, −60) and (120, 60) — on the orbit itself', ok: false }
    ],
    hint: 'Anchors sit ON the long axis, c from the centre, with c² = a² − b² = 100² − 60² → c = 80. Centre is (h, k) = (60, 0).'
  };

  let mission = 0;
  let phase = 'briefing';              // briefing | play | transfer | reveal
  let sweepIx = 0;
  let rope = 180;                      // total rope length (= 2a)
  let sep = 0;                         // anchor separation (= 2c)
  let hx = 0, hy = 0;                  // rig centre offset (h, k)
  let caught = {};
  let flashMsg = '';
  let sweepComplete = false;
  let score = 0, sweepsDone = 0;
  let transferTries = 0, transferWrong = false;
  let dragging = null;                 // 'f1' | 'f2' | 'rig'
  let svgEl;
  let recorded = false;

  $: M = MISSIONS[mission];
  $: debris = M.sweeps[sweepIx];
  $: c = sep / 2;
  $: a = rope / 2;
  $: bOK = a > c + 2;
  $: b = bOK ? Math.sqrt(a * a - c * c) : 0;
  $: f1 = { x: hx - c, y: hy };
  $: f2 = { x: hx + c, y: hy };
  $: minRope = Math.max(60, sep + 10);

  // NOTE: foci passed explicitly so Svelte tracks them — a bare closure over
  // f1/f2 would leave these readouts stale when the anchors move.
  function distSum(p, fa, fb) {
    return Math.hypot(p.x - fa.x, p.y - fa.y) + Math.hypot(p.x - fb.x, p.y - fb.y);
  }
  $: onPath = debris.map((p) => Math.abs(distSum(p, f1, f2) - rope) < TOL);

  function sweep() {
    if (phase !== 'play' || !bOK || sweepComplete) return;
    let newCatch = false;
    debris.forEach((p, i) => {
      if (!caught[i] && onPath[i]) { caught[i] = true; newCatch = true; score += 90; }
    });
    caught = caught;
    if (!newCatch) {
      flashMsg = 'The orbit missed — the rope must pass THROUGH the debris.';
      setTimeout(() => { flashMsg = ''; }, 1200);
      return;
    }
    try { playBonus(); } catch (_) {}
    if (debris.every((_, i) => caught[i])) {
      sweepsDone += 1;
      flashMsg = 'ORBIT COMPLETE ✓';
      sweepComplete = true;
    }
  }

  function continueAfterSweep() {
    if (!sweepComplete) return;
    sweepComplete = false;
    flashMsg = '';
    caught = {};
    if (sweepIx < M.sweeps.length - 1) {
      sweepIx += 1;
    } else if (mission < MISSIONS.length - 1) {
      startMission(mission + 1);
    } else {
      phase = 'transfer';
      transferWrong = false;
    }
  }

  function startMission(m) {
    mission = m;
    sweepIx = 0;
    caught = {};
    sweepComplete = false;
    phase = 'briefing';
    rope = 180;
    sep = MISSIONS[m].sep ?? 90;
    if (MISSIONS[m].sepLocked) sep = 0;
    hx = 0; hy = 0;
  }

  function answerTransfer(opt) {
    transferTries += 1;
    if (!opt.ok) { transferWrong = true; return; }
    score += Math.max(60, 240 - (transferTries - 1) * 90);
    phase = 'reveal';
    finishGame();
  }

  function finishGame() {
    if (recorded) return;
    recorded = true;
    try { playAward(); } catch (_) {}
    onDone({
      id: config.id,
      reward: Math.min(15, 7 + sweepsDone + (transferTries === 1 ? 2 : 0)),
      arcadeScore: score,
      levelsCleared: 3,
      perfectLevels: transferTries === 1 ? 3 : 2,
      patternFound: true,
      compared: true,
      transferFirstTry: transferTries === 1,
      usedHint: transferTries > 1
    });
  }

  function restart() {
    recorded = false;
    score = 0; sweepsDone = 0; transferTries = 0;
    startMission(0);
  }

  // ---------- dragging ----------
  function svgPoint(e) {
    const r = svgEl.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * W - CX,
      y: -(((e.clientY - r.top) / r.height) * H - CY)
    };
  }
  function down(e) {
    if (phase !== 'play' || sweepComplete) return;
    const p = svgPoint(e);
    const near = (q, rr) => Math.hypot(p.x - q.x, p.y - q.y) < rr;
    if (!M.sepLocked && near(f1, 20)) dragging = 'f1';
    else if (!M.sepLocked && near(f2, 20)) dragging = 'f2';
    else if (!M.moveLocked && near({ x: hx, y: hy }, 22)) dragging = 'rig';
    if (dragging) svgEl.setPointerCapture?.(e.pointerId);
  }
  function moveDrag(e) {
    if (!dragging || phase !== 'play' || sweepComplete) return;
    const p = svgPoint(e);
    if (dragging === 'rig') {
      hx = Math.max(-150, Math.min(150, p.x));
      hy = Math.max(-110, Math.min(110, p.y));
    } else {
      // drag either focus along the horizontal axis → new separation
      const d = Math.abs(p.x - hx);
      sep = Math.max(0, Math.min(rope - 12, d * 2));
    }
  }
  function up() { dragging = null; }

  startMission(0);
</script>

<ArcadeShell
  eyebrow={config.eyebrow}
  title={config.title}
  level={mission + (phase === 'reveal' || phase === 'transfer' ? 1 : 0)}
  totalLevels={MISSIONS.length}
  score={score}
  streak={sweepsDone > 2 ? sweepsDone : 0}
  onExit={() => { if (phase === 'reveal') finishGame(); onExit(); }}
>
  {#if phase === 'briefing'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Mission {mission + 1} of {MISSIONS.length}</div>
      <h2>{M.name}</h2>
      <p class="pre">{M.brief}</p>
      <button class="primary" on:click={() => phase = 'play'}>Rig the rope</button>
    </div>

  {:else if phase === 'transfer'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Final check — read the ghost orbit</div>
      <p class="formula">{TRANSFER.equation}</p>
      <p>{TRANSFER.q}</p>
      <div class="opts">
        {#each TRANSFER.options as opt (opt.label)}
          <button class="opt" on:click={() => answerTransfer(opt)}>{opt.label}</button>
        {/each}
      </div>
      {#if transferWrong}<p class="wrong">{TRANSFER.hint}</p>{/if}
    </div>

  {:else if phase === 'reveal'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Decoded</div>
      <h2>You built ellipses with a rope.</h2>
      <p class="pre" style="color:var(--qx-green-text)">{'An ELLIPSE is every point whose two anchor\ndistances sum to the same rope length.\nThe anchors are its FOCI.\n\nrope = 2a · anchors 2c apart · b² = a² − c²\nAnchors together (c = 0): a CIRCLE.'}</p>
      <div class="formula">(x−h)²/a² + (y−k)²/b² = 1</div>
      <div class="rewardbox"><div><span>Discovery</span><strong>{config.rewardLabel}</strong></div></div>
      <div class="stack">
        <button class="primary" on:click={() => { finishGame(); onExit(); }}>Return to workshops</button>
        <button class="ghost" on:click={restart}>Rig it again</button>
      </div>
    </div>

  {:else}
    <svg
      bind:this={svgEl}
      class="scene"
      viewBox="0 0 {W} {H}"
      on:pointerdown={down}
      on:pointermove={moveDrag}
      on:pointerup={up}
      on:pointercancel={up}
      aria-label="Rope orbit rig"
    >
      <line class="axis" x1="0" y1={CY} x2={W} y2={CY} />
      <line class="axis" x1={CX} y1="0" x2={CX} y2={H} />

      <!-- orbit -->
      {#if bOK}
        <ellipse class="orbit" cx={CX + hx} cy={CY - hy} rx={a} ry={b} />
      {:else}
        <text class="warn" x={CX} y="24" text-anchor="middle">rope too short for that separation</text>
      {/if}

      <!-- rope illustration: anchor → debris0 → anchor -->
      {#if debris[0] && !caught[0]}
        <polyline class="ropeline" points={`${CX + f1.x},${CY - f1.y} ${CX + debris[0].x},${CY - debris[0].y} ${CX + f2.x},${CY - f2.y}`} />
      {/if}

      <!-- debris -->
      {#each debris as p, i}
        <g class="debris" class:got={caught[i]} class:near={onPath[i] && !caught[i]}>
          <circle cx={CX + p.x} cy={CY - p.y} r="6" class="dcore" />
          <text x={CX + p.x} y={CY - p.y - 12} text-anchor="middle" class="dlabel">
            d₁+d₂ = {Math.round(distSum(p, f1, f2))}
          </text>
        </g>
      {/each}

      <!-- rig centre handle -->
      {#if !M.moveLocked}
        <circle class="rig" cx={CX + hx} cy={CY - hy} r="10" />
        <text class="riglabel" x={CX + hx} y={CY - hy + 24} text-anchor="middle">drag rig ({Math.round(hx)}, {Math.round(hy)})</text>
      {/if}

      <!-- anchors -->
      <g class="anchor" class:draggable={!M.sepLocked}>
        <circle cx={CX + f1.x} cy={CY - f1.y} r="8" />
        <circle cx={CX + f2.x} cy={CY - f2.y} r="8" />
      </g>

      {#if flashMsg}
        <text class="flash" class:good={flashMsg.includes('✓')} x={CX} y={H - 12} text-anchor="middle">{flashMsg}</text>
      {/if}
    </svg>

    <p class="tip">
      Rope <b>{Math.round(rope)}</b> · anchors <b>{Math.round(sep)}</b> apart.
      A debris is caught when its <b>d₁+d₂</b> readout equals the rope. Sweep {sweepIx + 1} of {M.sweeps.length}.
    </p>

    <div class="controls">
      <label class="ctl"><span>Rope length · {Math.round(rope)}</span>
        <input type="range" min={minRope} max="320" step="2" bind:value={rope} aria-label="Rope length" disabled={sweepComplete} /></label>
      <label class="ctl" class:locked={M.sepLocked}><span>Anchor spread · {Math.round(sep)}</span>
        <input type="range" min="0" max="240" step="2" bind:value={sep} disabled={M.sepLocked || sweepComplete}
          on:input={() => { if (sep > rope - 12) sep = rope - 12; }} aria-label="Anchor separation" /></label>
      <button class="primary wide" on:click={sweep} disabled={!bOK || sweepComplete}>Sweep the orbit ▸</button>
    </div>
    {#if sweepComplete}
      <SolveFirstPause
        title="The rope passed through every debris point"
        message="Compare the two distance readouts while the solved orbit is still visible: their sum stays equal to the rope length at every caught point."
        actionLabel={sweepIx < M.sweeps.length - 1
          ? 'Continue to the next sweep'
          : mission < MISSIONS.length - 1 ? 'Continue to the next mission' : 'Continue to the final check'}
        onContinue={continueAfterSweep}
      />
    {/if}
  {/if}
</ArcadeShell>

<style>
  .scene { width: 100%; border: 1px solid var(--qx-border); border-radius: 14px; background: var(--qx-bg); touch-action: none; }
  .axis { stroke: var(--qx-border); }
  .orbit { fill: color-mix(in srgb, var(--qx-accent) 7%, transparent); stroke: var(--qx-accent); stroke-width: 2.5; }
  .ropeline { fill: none; stroke: var(--qx-yellow); stroke-width: 1.5; stroke-dasharray: 4 4; opacity: .8; }
  .warn { fill: var(--qx-danger-text); font-size: 11px; font-weight: 800; }
  .dcore { fill: var(--qx-yellow); stroke: var(--qx-text); stroke-width: 1; }
  .debris.near .dcore { fill: var(--qx-green); }
  .debris.got .dcore { fill: var(--qx-green); opacity: .45; }
  .dlabel { fill: var(--qx-text-dim); font-size: 9.5px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .debris.near .dlabel { fill: var(--qx-green-text); }
  .rig { fill: var(--qx-surface); stroke: var(--qx-text-dim); stroke-width: 2; stroke-dasharray: 3 3; cursor: grab; }
  .riglabel { fill: var(--qx-text-faint); font-size: 9px; font-weight: 800; }
  .anchor circle { fill: var(--qx-text); }
  .anchor.draggable circle { cursor: grab; stroke: var(--qx-accent); stroke-width: 2; }
  .flash { fill: var(--qx-danger-text); font-size: 12px; font-weight: 900; }
  .flash.good { fill: var(--qx-green-text); font-size: 15px; }

  .tip { color: var(--qx-text-dim); font-size: 12.5px; font-weight: 650; line-height: 1.4; margin: 9px 0 0; }
  .tip b { color: var(--qx-text); font-variant-numeric: tabular-nums; }
  .controls { display: grid; gap: 7px; margin-top: 10px; grid-template-columns: 1fr 1fr; }
  .ctl { display: grid; gap: 3px; }
  .ctl.locked { opacity: .55; }
  .ctl span { color: var(--qx-text-dim); font-size: 10px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; font-variant-numeric: tabular-nums; }
  .ctl input { width: 100%; accent-color: var(--qx-accent); min-height: 28px; }
  .wide { grid-column: 1 / -1; }

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
  .opts { width: 100%; display: grid; gap: 8px; }
  .opt { border: 1.5px solid var(--qx-border-2); border-radius: 12px; background: var(--qx-surface); color: var(--qx-text); font-family: var(--qx-font); font-size: 13px; font-weight: 750; min-height: 46px; padding: 8px 14px; cursor: pointer; text-align: left; }
  .opt:hover { border-color: var(--qx-accent); }
  .wrong { color: var(--qx-danger-text); font-size: 12.5px; font-weight: 700; }
  .primary { min-height: 46px; border: none; border-radius: 999px; background: var(--qx-accent); color: var(--qx-bg); font: 900 14px var(--qx-font); cursor: pointer; width: 100%; }
  .primary:disabled { opacity: .45; cursor: default; }
  .ghost { min-height: 46px; border: 1.5px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text-dim); font: 900 14px var(--qx-font); cursor: pointer; width: 100%; }
</style>
