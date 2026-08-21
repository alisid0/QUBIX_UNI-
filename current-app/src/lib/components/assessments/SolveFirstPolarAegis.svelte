<script>
  // Radar Nine — a Solve First polar-coordinates discovery, built from scratch 2026-07-29.
  //
  //   Mission 1 — address the sky: tag blips from (range, bearing) callouts.
  //   Mission 2 — two languages: translate one polar address to grid (x, y).
  //   Mission 3 — program the fence: r = a·cos(kθ) petals must ALIGN with the
  //               raid bearings — petal count alone is not enough.
  //   Mission 4 — ROOT: a dark fence broadcast, formula only; call its tips.
  // The reveal names polar coordinates and rose curves.
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

  const W = 360, H = 320, CX = W / 2, CY = H / 2 + 6;
  const RINGS = [40, 80, 120];
  const rad = (d) => (d * Math.PI) / 180;
  const px = (r, thDeg) => ({ x: CX + r * Math.cos(rad(thDeg)), y: CY - r * Math.sin(rad(thDeg)) });

  // ---------- mission 1: tag blips by polar address ----------
  const M1_BLIPS = [
    { r: 120, th: 150 },
    { r: 80, th: 30 },
    { r: 100, th: 270 },
    { r: 60, th: 200 }
  ];
  const AIM_TOL_R = 14, AIM_TOL_TH = 8;

  // ---------- mission 2: one address, two languages ----------
  const M2_QUESTIONS = [
    {
      blip: { r: 100, th: 60 },
      q: 'The tower reads this blip as range 100, bearing 60°. The old grid map needs (x, y). Which is it?',
      options: [
        { label: '(50, 87) — across r·cos θ, up r·sin θ', ok: true },
        { label: '(87, 50) — bigger number first', ok: false },
        { label: '(100, 60) — same numbers, same spot', ok: false }
      ],
      hint: 'Walk it: face 60°, go 100. Across = 100·cos 60° = 50. Up = 100·sin 60° ≈ 87.'
    },
    {
      blip: { r: 80, th: 180 },
      q: 'Next blip: range 80, bearing 180°. In grid language?',
      options: [
        { label: '(0, 80) — straight up', ok: false },
        { label: '(−80, 0) — due west', ok: true },
        { label: '(80, 180) — unchanged', ok: false }
      ],
      hint: 'Bearing 180° points along the negative x-axis. cos 180° = −1, sin 180° = 0.'
    }
  ];

  // ---------- mission 3: rose fence alignment ----------
  // petals of r = a·|cos(kθ)| peak where k·θ is a multiple of 180°
  const M3_ROUNDS = [
    {
      raidsDeg: [0, 60, 120, 180, 240, 300], raidR: 100,
      note: 'Raiders inbound on six bearings, 60° apart starting at 0°.'
    },
    {
      raidsDeg: [30, 90, 150, 210, 270, 330], raidR: 100,
      note: 'Same six-way raid — but rotated 30°. Petal COUNT won\'t save you; alignment will.'
    }
  ];

  // ---------- mission 4: root ----------
  const M4 = {
    equation: 'r = 110 · cos(3θ)',
    q: 'A captured fence broadcast, screen dark. Where do its petal tips point?',
    options: [
      { label: '0°, 60°, 120°… — where 3θ hits a multiple of 180°', ok: true },
      { label: '30°, 90°, 150°… — between the spokes', ok: false },
      { label: 'Three fixed tips at 0°, 120°, 240° only', ok: false }
    ],
    hint: 'Tips form where cos(3θ) = ±1, i.e. 3θ = 0°, 180°, 360°… → θ = 0°, 60°, 120°, 180°, 240°, 300°.'
  };

  // ---------- state ----------
  let mission = 0;
  let phase = 'briefing';              // briefing | play | reveal
  let score = 0;
  let recorded = false;
  let pauseKind = '';
  let solvedOption = '';

  // m1
  let aimR = 80, aimTh = 90, blipIx = 0, tagged = 0, m1Flash = '';
  // m2 / m4 MCQ
  let qIx = 0, qTries = 0, qWrong = false, mcqFirstTries = 0;
  // m3
  let roundIx = 0, fenceA = 80, fenceK = 2, m3Flash = '';

  $: m1blip = M1_BLIPS[blipIx];
  $: m2q = M2_QUESTIONS[qIx];
  $: m3round = M3_ROUNDS[roundIx];

  const BRIEFS = [
    { name: 'Address the Sky', text: 'No grid out here. The tower calls every blip as:\nRANGE (how far) and BEARING (which angle).\n\nSet both dials, tag all four blips.' },
    { name: 'Two Languages', text: 'The old wall map speaks grid: (across, up).\nThe radar speaks polar: (range, bearing).\n\nSame sky. Translate.' },
    { name: 'Program the Fence', text: 'Defence fence: r = a · cos(k·θ).\nDial a for SIZE, k for RESONANCE — the curve folds into petals.\n\nA raider is stopped only if a petal TIP points down its bearing.' },
    { name: 'Root Access', text: '⚠ SCREEN DARK ⚠\nA captured broadcast is all you have.' }
  ];

  function startMission(m) {
    mission = m;
    phase = 'briefing';
    pauseKind = '';
    solvedOption = '';
    if (m === 0) { blipIx = 0; tagged = 0; aimR = 80; aimTh = 90; }
    if (m === 1 || m === 3) { qIx = 0; qTries = 0; qWrong = false; }
    if (m === 2) { roundIx = 0; fenceA = 80; fenceK = 2; }
  }

  function fireTag() {
    if (phase !== 'play' || mission !== 0 || pauseKind) return;
    const dTh = Math.min(Math.abs(aimTh - m1blip.th), 360 - Math.abs(aimTh - m1blip.th));
    const hit = Math.abs(aimR - m1blip.r) <= AIM_TOL_R && dTh <= AIM_TOL_TH;
    m1Flash = hit ? 'TAGGED ✓' : 'MISS — check both dials';
    if (!hit) {
      setTimeout(() => { m1Flash = ''; }, 900);
      return;
    }
    tagged += 1;
    score += 110;
    try { playBonus(); } catch (_) {}
    pauseKind = 'tag';
  }

  function answerMcq(opt) {
    if (pauseKind) return;
    qTries += 1;
    if (!opt.ok) { qWrong = true; return; }
    if (qTries === 1) mcqFirstTries += 1;
    score += Math.max(60, 200 - (qTries - 1) * 70);
    try { playAward(); } catch (_) {}
    qWrong = false;
    solvedOption = opt.label;
    pauseKind = 'mcq';
  }

  function rosePath(a, k) {
    let d = '';
    for (let i = 0; i <= 240; i++) {
      const th = (i / 240) * Math.PI * 2;
      const r = Math.abs(a * Math.cos(k * th));
      const x = CX + r * Math.cos(th), y = CY - r * Math.sin(th);
      d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
    }
    return d + 'Z';
  }

  function raidBlocked(bearingDeg, a, k) {
    // a petal tip points down the bearing when |cos(k·θ)| ≈ 1 and it reaches
    return Math.abs(Math.cos(k * rad(bearingDeg))) > 0.92 && a >= 95;
  }
  $: blockedList = mission === 2 && m3round
    ? m3round.raidsDeg.map((b) => raidBlocked(b, fenceA, fenceK))
    : [];

  function energize() {
    if (phase !== 'play' || mission !== 2 || pauseKind) return;
    if (blockedList.every(Boolean)) {
      score += 200;
      m3Flash = 'RAID REPELLED ✓';
      try { playBonus(); } catch (_) {}
      pauseKind = 'fence';
    } else {
      const leak = m3round.raidsDeg.filter((b, i) => !blockedList[i]);
      m3Flash = `BREACH at ${leak.slice(0, 3).join('°, ')}° — tips must point down every raid bearing`;
      setTimeout(() => { m3Flash = ''; }, 1600);
    }
  }

  function continueAfterResult() {
    if (pauseKind === 'tag') {
      pauseKind = '';
      m1Flash = '';
      if (blipIx < M1_BLIPS.length - 1) blipIx += 1;
      else startMission(1);
      return;
    }
    if (pauseKind === 'mcq') {
      pauseKind = '';
      solvedOption = '';
      qTries = 0;
      if (mission === 1) {
        if (qIx < M2_QUESTIONS.length - 1) qIx += 1;
        else startMission(2);
      } else {
        phase = 'reveal';
        finishGame();
      }
      return;
    }
    if (pauseKind === 'fence') {
      pauseKind = '';
      m3Flash = '';
      if (roundIx < M3_ROUNDS.length - 1) {
        roundIx += 1;
        fenceA = 80;
        fenceK = 2;
      } else {
        startMission(3);
      }
    }
  }

  function finishGame() {
    if (recorded) return;
    recorded = true;
    try { playAward(); } catch (_) {}
    onDone({
      id: config.id,
      reward: Math.min(15, 7 + tagged + mcqFirstTries),
      arcadeScore: score,
      levelsCleared: 4,
      perfectLevels: mcqFirstTries + 1,
      patternFound: true,
      compared: true,
      transferFirstTry: mcqFirstTries >= 3,
      usedHint: mcqFirstTries < 3
    });
  }

  function restart() {
    recorded = false;
    score = 0;
    mcqFirstTries = 0;
    startMission(0);
  }

  startMission(0);
</script>

<ArcadeShell
  eyebrow={config.eyebrow}
  title={config.title}
  level={mission + (phase === 'reveal' ? 1 : 0)}
  totalLevels={4}
  score={score}
  streak={tagged > 2 ? tagged : 0}
  onExit={() => { if (phase === 'reveal') finishGame(); onExit(); }}
>
  {#if phase === 'briefing'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Mission {mission + 1} of 4</div>
      <h2>{BRIEFS[mission].name}</h2>
      <p class="pre">{BRIEFS[mission].text}</p>
      {#if mission === 3}<p class="formula">{M4.equation}</p>{/if}
      <button class="primary" on:click={() => phase = 'play'}>To the console</button>
    </div>

  {:else if phase === 'reveal'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Decoded</div>
      <h2>You were speaking polar coordinates.</h2>
      <p class="pre" style="color:var(--qx-green-text)">{'RANGE and BEARING are (r, θ) — a distance\nand an angle instead of two grid steps.\n\nBridge: x = r·cos θ, y = r·sin θ.\nYour fence was a ROSE CURVE, r = a·cos(kθ),\nand its tips obey the equation, not intuition.'}</p>
      <div class="formula">(r, θ) · x = r·cos θ · y = r·sin θ</div>
      <div class="rewardbox"><div><span>Discovery</span><strong>{config.rewardLabel}</strong></div></div>
      <div class="stack">
        <button class="primary" on:click={() => { finishGame(); onExit(); }}>Return to workshops</button>
        <button class="ghost" on:click={restart}>Rerun the shift</button>
      </div>
    </div>

  {:else if mission === 1 || mission === 3}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      {#if mission === 1}
        <div class="eyebrow">Translate · {qIx + 1} of {M2_QUESTIONS.length}</div>
        <svg class="mini" viewBox="0 0 {W} 180" aria-label="Blip to translate">
          <line class="axis" x1="20" y1="150" x2={W - 20} y2="150" />
          <line class="axis" x1={CX} y1="16" x2={CX} y2="166" />
          <line class="beam" x1={CX} y1="150" x2={CX + m2q.blip.r * Math.cos(rad(m2q.blip.th))} y2={150 - m2q.blip.r * Math.sin(rad(m2q.blip.th)) * 0.9} />
          <circle class="blip" cx={CX + m2q.blip.r * Math.cos(rad(m2q.blip.th))} cy={150 - m2q.blip.r * Math.sin(rad(m2q.blip.th)) * 0.9} r="6" />
          <text class="calloutSm" x={CX + 8} y="30">r = {m2q.blip.r}, θ = {m2q.blip.th}°</text>
        </svg>
        <p>{m2q.q}</p>
        <div class="opts">
          {#each m2q.options as opt (opt.label)}
            <button class="opt" disabled={!!pauseKind} on:click={() => answerMcq(opt)}>{opt.label}</button>
          {/each}
        </div>
        {#if qWrong}<p class="wrong">{m2q.hint}</p>{/if}
      {:else}
        <div class="eyebrow">Root access — screen dark</div>
        <p class="formula">{M4.equation}</p>
        <p>{M4.q}</p>
        <div class="opts">
          {#each M4.options as opt (opt.label)}
            <button class="opt" disabled={!!pauseKind} on:click={() => answerMcq(opt)}>{opt.label}</button>
          {/each}
        </div>
        {#if qWrong}<p class="wrong">{M4.hint}</p>{/if}
      {/if}
      {#if pauseKind === 'mcq'}
        <SolveFirstPause
          title="The two coordinate languages point to the same place"
          message={mission === 1
            ? `Keep “${solvedOption}” beside the radar address. Range supplies the length; cosine and sine split it into across and up.`
            : 'The equation fixes every petal tip. Notice that multiplying the angle inside cosine controls the repeated bearings.'}
          actionLabel={mission === 1
            ? qIx < M2_QUESTIONS.length - 1 ? 'Continue to the next translation' : 'Continue to the fence'
            : 'Reveal the concept'}
          onContinue={continueAfterResult}
        />
      {/if}
    </div>

  {:else}
    <svg class="scene" viewBox="0 0 {W} {H}" aria-label="Radar scope">
      <!-- rings + spokes -->
      {#each RINGS as R}
        <circle class="ring" cx={CX} cy={CY} r={R} />
        <text class="rlabel" x={CX + R + 3} y={CY - 4}>{R}</text>
      {/each}
      {#each [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as s}
        <line class="spoke" x1={CX} y1={CY} x2={px(132, s).x} y2={px(132, s).y} />
        {#if s % 90 === 0}<text class="slabel" x={px(144, s).x} y={px(144, s).y + 3} text-anchor="middle">{s}°</text>{/if}
      {/each}

      {#if mission === 0}
        <!-- unknown blips (dim), current callout blip (bright) -->
        {#each M1_BLIPS as b, i}
          {#if i === blipIx}
            <circle class="blip live" cx={px(b.r, b.th).x} cy={px(b.r, b.th).y} r="6" />
          {:else if i < blipIx}
            <circle class="blip done" cx={px(b.r, b.th).x} cy={px(b.r, b.th).y} r="4" />
          {/if}
        {/each}
        <!-- aim reticle -->
        <line class="beam" x1={CX} y1={CY} x2={px(132, aimTh).x} y2={px(132, aimTh).y} />
        <circle class="reticle" cx={px(aimR, aimTh).x} cy={px(aimR, aimTh).y} r="10" />
        <text class="callout" x="12" y="22">TOWER: “range {m1blip.r}, bearing {m1blip.th}°”</text>
        {#if m1Flash}<text class="flash" class:good={m1Flash.includes('✓')} x={CX} y={H - 10} text-anchor="middle">{m1Flash}</text>{/if}

      {:else}
        <!-- mission 3: fence + raiders -->
        <path class="rose" d={rosePath(fenceA, fenceK)} />
        {#each m3round.raidsDeg as b, i}
          <g class="raider" class:blocked={blockedList[i]}>
            <circle cx={px(m3round.raidR, b).x} cy={px(m3round.raidR, b).y} r="6" />
            <line x1={px(m3round.raidR + 18, b).x} y1={px(m3round.raidR + 18, b).y} x2={px(m3round.raidR + 6, b).x} y2={px(m3round.raidR + 6, b).y} />
          </g>
        {/each}
        <text class="callout" x="12" y="22">{m3round.note}</text>
        <text class="callout dim" x="12" y="38">blocked {blockedList.filter(Boolean).length}/{m3round.raidsDeg.length}</text>
        {#if m3Flash}<text class="flash" class:good={m3Flash.includes('✓')} x={CX} y={H - 10} text-anchor="middle">{m3Flash}</text>{/if}
      {/if}
    </svg>

    {#if mission === 0}
      <div class="controls">
        <label class="ctl"><span>Range · {aimR}</span>
          <input type="range" min="30" max="130" step="2" bind:value={aimR} aria-label="Range dial" disabled={!!pauseKind} /></label>
        <label class="ctl"><span>Bearing · {aimTh}°</span>
          <input type="range" min="0" max="359" step="1" bind:value={aimTh} aria-label="Bearing dial" disabled={!!pauseKind} /></label>
        <button class="primary wide" on:click={fireTag} disabled={!!pauseKind}>Tag the blip ▸ ({tagged}/{M1_BLIPS.length})</button>
      </div>
    {:else}
      <div class="controls">
        <label class="ctl"><span>Fence size · a = {fenceA}</span>
          <input type="range" min="40" max="130" step="2" bind:value={fenceA} aria-label="Fence size a" disabled={!!pauseKind} /></label>
        <label class="ctl"><span>Resonance · k = {fenceK}</span>
          <input type="range" min="1" max="6" step="1" bind:value={fenceK} aria-label="Resonance k" disabled={!!pauseKind} /></label>
        <button class="primary wide" on:click={energize} disabled={!!pauseKind}>Energize the fence ▸</button>
      </div>
    {/if}
    {#if pauseKind === 'tag'}
      <SolveFirstPause
        title={`Blip ${blipIx + 1} is tagged`}
        message={`The same point needed two inputs: range ${m1blip.r} set how far, and bearing ${m1blip.th}° set which direction. Keep the reticle on the solved blip while you compare them.`}
        actionLabel={blipIx < M1_BLIPS.length - 1 ? 'Continue to the next blip' : 'Continue to translation'}
        onContinue={continueAfterResult}
      />
    {:else if pauseKind === 'fence'}
      <SolveFirstPause
        title="Every raid bearing meets a petal tip"
        message={`The solved fence blocks ${m3round.raidsDeg.length} directions. Size made it reach the raiders; resonance and alignment decided where its tips pointed.`}
        actionLabel={roundIx < M3_ROUNDS.length - 1 ? 'Continue to the rotated raid' : 'Continue to the formula'}
        onContinue={continueAfterResult}
      />
    {/if}
  {/if}
</ArcadeShell>

<style>
  .scene, .mini { width: 100%; border: 1px solid var(--qx-border); border-radius: 14px; background: var(--qx-bg); }
  .ring { fill: none; stroke: var(--qx-border); }
  .rlabel { fill: var(--qx-text-faint); font-size: 8.5px; font-weight: 700; }
  .spoke { stroke: var(--qx-border); opacity: .55; }
  .slabel { fill: var(--qx-text-faint); font-size: 9px; font-weight: 800; }
  .axis { stroke: var(--qx-border); }
  .beam { stroke: var(--qx-accent); stroke-width: 1.5; stroke-dasharray: 4 4; opacity: .8; }
  .reticle { fill: none; stroke: var(--qx-accent); stroke-width: 2.5; }
  .blip { fill: var(--qx-yellow); stroke: var(--qx-text); stroke-width: 1; }
  .blip.live { fill: var(--qx-yellow); }
  .blip.done { fill: var(--qx-green); opacity: .5; }
  .callout { fill: var(--qx-text-dim); font-size: 11px; font-weight: 800; }
  .callout.dim { fill: var(--qx-text-faint); font-size: 10px; }
  .calloutSm { fill: var(--qx-text-dim); font-size: 11px; font-weight: 800; }
  .rose { fill: color-mix(in srgb, var(--qx-accent) 8%, transparent); stroke: var(--qx-accent); stroke-width: 2; }
  .raider circle { fill: var(--qx-danger); }
  .raider line { stroke: var(--qx-danger); stroke-width: 2; }
  .raider.blocked circle { fill: var(--qx-green); }
  .raider.blocked line { stroke: var(--qx-green); }
  .flash { fill: var(--qx-danger-text); font-size: 11.5px; font-weight: 900; }
  .flash.good { fill: var(--qx-green-text); font-size: 15px; }

  .controls { display: grid; gap: 7px; margin-top: 10px; grid-template-columns: 1fr 1fr; }
  .ctl { display: grid; gap: 3px; }
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
  .ghost { min-height: 46px; border: 1.5px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text-dim); font: 900 14px var(--qx-font); cursor: pointer; }
</style>
