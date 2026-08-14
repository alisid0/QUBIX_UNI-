<script>
  // Vector Racer — discover vector addition by changing a velocity vector.
  // Each turn is deliberate: choose Δv, inspect the sum, then move.
  import ArcadeShell from './ArcadeShell.svelte';
  import SolveFirstPause from './SolveFirstPause.svelte';
  import { playAward, playBonus } from '../../sfx.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const GW = 15, GH = 11, CELL = 20;
  const W = GW * CELL, H = GH * CELL;
  const cx2 = (x) => x * CELL + CELL / 2;
  const cy2 = (y) => y * CELL + CELL / 2;

  const LEVELS = [
    { name: 'Sprint', start: [1, 5], finishPt: [13, 5],
      onTrack: (x, y) => y >= 3 && y <= 7 && x >= 1 && x <= 13,
      isFinish: (x, y) => x >= 13 && y >= 3 && y <= 7,
      blurb: 'Reach the flag. Choose a change vector, inspect the sum, then move by the resulting velocity.' },
    { name: 'The bend', start: [1, 8], finishPt: [7, 1],
      onTrack: (x, y) => (y >= 6 && y <= 10 && x >= 1 && x <= 9) || (x >= 5 && x <= 9 && y >= 1 && y <= 10),
      isFinish: (x, y) => y <= 1 && x >= 5 && x <= 9,
      blurb: 'Turn the corner by changing the across and down components one step at a time.' },
    { name: 'Diagonal climb', start: [1, 9], finishPt: [13, 2],
      onTrack: (x, y) => x >= 1 && x <= 13 && Math.abs(y - (9.6 - x * 0.58)) <= 2,
      isFinish: (x, y) => x >= 13 && y >= 0 && y <= 4,
      blurb: 'Build both components together. A diagonal velocity changes across and down on the same move.' },
    { name: 'The chicane', start: [1, 8], finishPt: [13, 3],
      onTrack: (x, y) =>
        (x >= 1 && x <= 5 && y >= 6 && y <= 10) ||
        (x >= 4 && x <= 9 && y >= 3 && y <= 7) ||
        (x >= 8 && x <= 13 && y >= 1 && y <= 5),
      isFinish: (x, y) => x >= 13 && y >= 1 && y <= 5,
      blurb: 'Link two direction changes. Read the next velocity before committing to each bend.' },
    { name: 'The hairpin', start: [1, 8], finishPt: [1, 3],
      onTrack: (x, y) => (y >= 7 && y <= 9 && x >= 1 && x <= 13) || (x >= 10 && x <= 13 && y >= 2 && y <= 9) || (y >= 2 && y <= 4 && x >= 1 && x <= 13),
      isFinish: (x, y) => x <= 1 && y >= 2 && y <= 4,
      blurb: 'Reverse direction by repeatedly adding small change vectors. Predict each new velocity before moving.' }
  ];

  let levelIx = 0;
  let cx = 1, cy = 5, vx = 0, vy = 0;
  let phase = 'play';       // play | predict | concept

  // Transfer beat: add vectors without relying on the track.
  const EXERCISES = [
    {
      intro: 'Current velocity (3, 1), change vector Δv = (−1, 1).',
      q: 'What is the next velocity?',
      options: [{ label: '(2, 2)', ok: true }, { label: '(4, 0)', ok: false }, { label: '(−3, 1)', ok: false }],
      hint: 'Add matching components: (3 + −1, 1 + 1) = (2, 2).'
    },
    {
      intro: 'Current velocity (−2, 3), change vector Δv = (1, −1).',
      q: 'What is the next velocity?',
      options: [{ label: '(−1, 2)', ok: true }, { label: '(−3, 4)', ok: false }, { label: '(2, −3)', ok: false }],
      hint: 'Across: −2 + 1 = −1. Down: 3 + −1 = 2.'
    },
    {
      intro: 'Current velocity (0, −2), change vector Δv = (−1, 1).',
      q: 'What is the next velocity?',
      options: [{ label: '(−1, −1)', ok: true }, { label: '(1, −3)', ok: false }, { label: '(0, −1)', ok: false }],
      hint: 'A zero component still participates: 0 + −1 = −1, and −2 + 1 = −1.'
    },
    {
      intro: 'Current velocity (2, −1). You want the next velocity to be (0, 0).',
      q: 'Which change vector Δv will do that?',
      options: [{ label: '(−2, 1)', ok: true }, { label: '(2, −1)', ok: false }, { label: '(−1, 0)', ok: false }],
      hint: 'Find what cancels each component: 2 + −2 = 0 and −1 + 1 = 0.'
    }
  ];
  let exerciseIx = 0;
  let exerciseTries = 0;
  let exerciseWrong = false;
  let moves = 0, crashes = 0, cleared = 0;
  let arcadeScore = 0, combo = 0;
  let crashFlash = false;
  let trackCleared = false;
  let selected = null;
  let recorded = false;

  $: level = LEVELS[levelIx];
  $: exercise = EXERCISES[exerciseIx];
  $: reward = Math.min(15, 8 + cleared * 2 + (crashes === 0 ? 1 : 0));

  function loadLevel() {
    const s = LEVELS[levelIx].start;
    cx = s[0]; cy = s[1]; vx = 0; vy = 0; moves = 0; crashFlash = false;
    trackCleared = false;
    selected = null;
  }

  function segOK(x0, y0, x1, y1) {
    const lvl = LEVELS[levelIx];
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2 + 1;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      if (!lvl.onTrack(Math.round(x0 + (x1 - x0) * t), Math.round(y0 + (y1 - y0) * t))) return false;
    }
    return true;
  }
  function segFinish(x0, y0, x1, y1) {
    const lvl = LEVELS[levelIx];
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2 + 1;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      if (lvl.isFinish(Math.round(x0 + (x1 - x0) * t), Math.round(y0 + (y1 - y0) * t))) return true;
    }
    return false;
  }

  // 9 candidate next positions (coast point ± each nudge)
  $: candidates = (() => {
    const list = [];
    for (let ay = -1; ay <= 1; ay++) for (let ax = -1; ax <= 1; ax++) {
      const nextVx = vx + ax, nextVy = vy + ay;
      const nx = cx + nextVx, ny = cy + nextVy;
      const inGrid = nx >= 0 && nx < GW && ny >= 0 && ny < GH;
      const fin = segFinish(cx, cy, nx, ny);
      const ok = inGrid && (fin || segOK(cx, cy, nx, ny));
      // display clamped into the grid so a fast winning shot never renders
      // off-screen and unclickable; win logic still uses the true nx/ny.
      const dispX = Math.max(0, Math.min(GW - 1, nx)), dispY = Math.max(0, Math.min(GH - 1, ny));
      list.push({ ax, ay, nextVx, nextVy, nx, ny, dispX, dispY, ok, fin, coast: ax === 0 && ay === 0 });
    }
    return list;
  })();

  function choose(c) {
    if (phase !== 'play' || trackCleared) return;
    selected = c;
  }

  function move() {
    if (phase !== 'play' || trackCleared) return;
    const c = selected;
    if (!c) return;
    moves += 1;
    if (c.fin) {
      const finalVx = c.nx - cx;
      const finalVy = c.ny - cy;
      cleared += 1; combo += 1;
      arcadeScore += (180 + Math.max(0, 60 - moves * 3)) * Math.max(1, combo);
      try { (combo > 1 ? playBonus : playAward)(); } catch (_) {}
      cx = c.dispX;
      cy = c.dispY;
      vx = finalVx;
      vy = finalVy;
      trackCleared = true;
      selected = null;
    } else if (!c.ok) {
      crashes += 1; combo = 0; crashFlash = true;
      setTimeout(() => { crashFlash = false; }, 320);
      loadLevel();
    } else {
      vx = c.nx - cx; vy = c.ny - cy; cx = c.nx; cy = c.ny;
      selected = null;
    }
  }

  function moveByKey(event, candidate) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    choose(candidate);
  }

  function continueAfterTrack() {
    if (!trackCleared) return;
    if (levelIx < LEVELS.length - 1) {
      levelIx += 1;
      loadLevel();
    } else {
      trackCleared = false;
      phase = 'predict';
      exerciseIx = 0;
      exerciseTries = 0;
      exerciseWrong = false;
    }
  }

  function answerPredict(opt) {
    exerciseTries += 1;
    if (!opt.ok) { exerciseWrong = true; combo = 0; return; }
    arcadeScore += Math.max(40, 140 - (exerciseTries - 1) * 35);
    try { playBonus(); } catch (_) {}
    if (exerciseIx < EXERCISES.length - 1) {
      exerciseIx += 1;
      exerciseWrong = false;
      return;
    }
    phase = 'concept';
    finish();
  }

  function finish() {
    if (recorded) return;
    recorded = true;
    onDone({
      id: config.id, reward, arcadeScore, cleared,
      patternFound: true, compared: true,
      usedHint: exerciseTries > EXERCISES.length,
      transferFirstTry: exerciseTries === EXERCISES.length && crashes === 0
    });
  }
</script>

<ArcadeShell
  eyebrow={`${config.eyebrow} · Arcade mission`}
  title={config.title}
  level={phase === 'concept' ? LEVELS.length : levelIx}
  totalLevels={LEVELS.length}
  score={arcadeScore}
  streak={combo}
  onExit={onExit}
>
  {#if phase === 'predict'}
    <div class="reveal">
      <span class="rv-eyebrow">Vector exercise {exerciseIx + 1} of {EXERCISES.length}</span>
      <h2>{exerciseIx === EXERCISES.length - 1 ? 'Find the missing change.' : 'Add the two vectors.'}</h2>
      <div class="exercise-rail" aria-label={`Exercise ${exerciseIx + 1} of ${EXERCISES.length}`}>
        {#each EXERCISES as _, i}<span class:done={i < exerciseIx} class:active={i === exerciseIx}></span>{/each}
      </div>
      <p>{exercise.intro}</p>
      <p><b>{exercise.q}</b></p>
      <div class="topts">
        {#each exercise.options as opt (opt.label)}
          <button class="topt" on:click={() => answerPredict(opt)}>{opt.label}</button>
        {/each}
      </div>
      {#if exerciseWrong}<p class="twrong">{exercise.hint}</p>{/if}
    </div>

  {:else if phase === 'concept'}
    <div class="reveal">
      <span class="rv-eyebrow">Concept uncovered</span>
      <h2>You steered by vector addition.</h2>
      <p>A velocity such as <b>(3, 1)</b> means move 3 grid spaces across and 1 down.
        You steered by adding a small <b>change vector Δv</b>. Across adds to across; down adds to down.
        The resulting velocity determined the car's next move.</p>
      <div class="formula">next velocity = current velocity + Δv</div>
      <div class="rv-reward">
        <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
        <span class="rv-w">+{reward} W</span>
      </div>
      <div class="rv-skills"><span>Vector addition</span><span>Components</span><span>Velocity vectors</span></div>
      <p class="completion-note">Five tracks cleared · Four vector exercises completed</p>
      <button class="rv-exit" on:click={onExit}>Return to workshops</button>
    </div>

  {:else}
    <p class="brief">{level.blurb}</p>

    <div class="track" class:crash={crashFlash}>
      <svg viewBox="0 0 {W} {H}">
        <!-- track cells -->
        {#each Array(GH) as _, gy}
          {#each Array(GW) as _, gx}
            {#if level.onTrack(gx, gy)}
              <rect class="road" class:fin={level.isFinish(gx, gy)} x={gx * CELL + 1} y={gy * CELL + 1} width={CELL - 2} height={CELL - 2} rx="3" />
            {/if}
          {/each}
        {/each}

        <!-- velocity arrow (coast direction) -->
        {#if vx !== 0 || vy !== 0}
          <line class="vel" x1={cx2(cx)} y1={cy2(cy)} x2={cx2(cx + vx)} y2={cy2(cy + vy)} marker-end="url(#vhead)" />
        {/if}
        {#if selected}
          <line class="delta" x1={cx2(cx + vx)} y1={cy2(cy + vy)} x2={cx2(cx + selected.nextVx)} y2={cy2(cy + selected.nextVy)} marker-end="url(#dhead)" />
          <line class="result" x1={cx2(cx)} y1={cy2(cy)} x2={cx2(selected.dispX)} y2={cy2(selected.dispY)} marker-end="url(#rhead)" />
        {/if}
        <defs>
          <marker id="vhead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--qx-accent)" />
          </marker>
          <marker id="dhead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--qx-pink)" />
          </marker>
          <marker id="rhead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--qx-green)" />
          </marker>
        </defs>

        <!-- candidate moves -->
        {#if !trackCleared}
          {#each candidates as c}
            <circle class="cand" class:fin={c.fin} class:crash={!c.ok && !c.fin} class:coast={c.coast}
              data-cx={c.nx} data-cy={c.ny} data-ok={c.ok || c.fin}
              cx={cx2(c.dispX)} cy={cy2(c.dispY)} r={c.coast ? 5 : 7}
              class:selected={selected === c}
              on:click={() => choose(c)} on:keydown={(event) => moveByKey(event, c)} role="button" tabindex="0" />
          {/each}
        {/if}

        <!-- the car -->
        <circle class="car" data-cx={cx} data-cy={cy} cx={cx2(cx)} cy={cy2(cy)} r="6" />
      </svg>
    </div>

    <div class="vector-console">
      <div class="equation" aria-live="polite">
        <span>Current <b>({vx}, {vy})</b></span><i>+</i>
        <span>Δv <b>{selected ? `(${selected.ax}, ${selected.ay})` : '(choose)'}</b></span><i>=</i>
        <span>Next <b>{selected ? `(${selected.nextVx}, ${selected.nextVy})` : '(?, ?)'}</b></span>
      </div>
      <div class="changes" aria-label="Choose a change vector">
        {#each candidates as c}
          <button class:selected={selected === c} on:click={() => choose(c)}>({c.ax}, {c.ay})</button>
        {/each}
      </div>
      <button class="move-btn" disabled={!selected} on:click={move}>
        {selected ? `Move by (${selected.nextVx}, ${selected.nextVy})` : 'Choose Δv'}
      </button>
    </div>
    <p class="hint"><b>Orange</b> current + <b>pink</b> change = <b>green</b> next velocity.</p>
    {#if trackCleared}
      <SolveFirstPause
        title="The finish line is crossed"
        message="The orange and pink vectors added tip-to-tail to make the green velocity vector."
        actionLabel={levelIx < LEVELS.length - 1 ? 'Continue to the next track' : 'Continue to the final check'}
        onContinue={continueAfterTrack}
      />
    {/if}
  {/if}
</ArcadeShell>

<style>
  .brief { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.4; margin: 0 0 9px; }
  .track { border: 1.5px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface-3); overflow: hidden; transition: box-shadow 0.1s; }
  .track.crash { box-shadow: inset 0 0 0 3px var(--qx-accent); }
  svg { display: block; width: 100%; height: auto; }
  .road { fill: var(--qx-surface); }
  .road.fin { fill: var(--qx-green-soft); }
  .vel { stroke: var(--qx-accent); stroke-width: 2.5; opacity: 0.75; }
  .delta { stroke: var(--qx-pink); stroke-width: 2.5; }
  .result { stroke: var(--qx-green); stroke-width: 2.5; stroke-dasharray: 4 3; }
  .cand { fill: var(--qx-accent-soft); stroke: var(--qx-accent); stroke-width: 2; cursor: pointer; pointer-events: all; }
  .cand.selected { fill: var(--qx-green-soft); stroke: var(--qx-green); stroke-width: 3; }
  .cand.coast { fill: var(--qx-surface-3); stroke: var(--qx-text-faint); stroke-dasharray: 3 3; }
  .cand.fin { fill: var(--qx-green); stroke: var(--qx-green-text); }
  .cand.crash { fill: var(--qx-surface-2); stroke: var(--qx-border-2); opacity: 0.4; }
  .car { fill: var(--qx-text); stroke: var(--qx-surface); stroke-width: 2; }
  .hint { font-size: 12px; font-weight: 600; color: var(--qx-text-dim); margin: 10px 0 0; text-align: center; }
  .hint b { color: var(--qx-text); font-family: ui-monospace, Menlo, monospace; }
  .hint b:nth-of-type(1) { color: var(--qx-accent-text); }
  .hint b:nth-of-type(2) { color: var(--qx-pink-text); }
  .hint b:nth-of-type(3) { color: var(--qx-green-text); }

  .vector-console { display: grid; gap: 8px; margin-top: 9px; }
  .equation { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; gap: 5px; padding: 9px; border: 1px solid var(--qx-border); border-radius: 10px; background: var(--qx-surface-2); text-align: center; }
  .equation span { color: var(--qx-text-dim); font-size: 9px; }
  .equation b { display: block; margin-top: 2px; color: var(--qx-text); font: 850 12px ui-monospace, Menlo, monospace; }
  .equation i { color: var(--qx-text-faint); font-style: normal; font-weight: 900; }
  .changes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
  .changes button { min-height: 34px; border: 1px solid var(--qx-border); border-radius: 8px; background: var(--qx-surface); color: var(--qx-text-dim); font: 800 11px ui-monospace, Menlo, monospace; cursor: pointer; }
  .changes button.selected { border-color: var(--qx-pink); background: var(--qx-accent-soft); color: var(--qx-text); }
  .move-btn { min-height: 44px; border: 0; border-radius: 999px; background: var(--qx-green); color: var(--qx-bg); font: 900 13px var(--qx-font); cursor: pointer; }
  .move-btn:disabled { opacity: .42; cursor: default; }

  .topts { width: 100%; display: grid; gap: 8px; }
  .topt {
    border: 1.5px solid var(--qx-border-2); border-radius: 12px; background: var(--qx-surface);
    color: var(--qx-text); font-family: var(--qx-font); font-size: 13px; font-weight: 750;
    min-height: 46px; padding: 8px 14px; cursor: pointer; text-align: left;
  }
  .topt:hover { border-color: var(--qx-accent); }
  .twrong { color: var(--qx-danger-text); font-size: 12.5px; font-weight: 700; }
  .exercise-rail { width: 100%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
  .exercise-rail span { height: 5px; border-radius: 999px; background: var(--qx-surface-3); }
  .exercise-rail span.active { background: var(--qx-accent); }
  .exercise-rail span.done { background: var(--qx-green); }

  .reveal { display: flex; flex-direction: column; gap: 12px; text-align: center; align-items: center; justify-content: center; min-height: clamp(480px, calc(100dvh - 230px), 680px); box-sizing: border-box; padding: 18px 2px 32px; }
  .rv-eyebrow { font-size: 10px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: var(--qx-accent-text); }
  .reveal h2 { font-size: 21px; font-weight: 950; color: var(--qx-text); margin: 0; line-height: 1.15; }
  .reveal p { font-size: 13.5px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.5; margin: 0; }
  .reveal p b { color: var(--qx-text); }
  .formula { font-family: ui-monospace, Menlo, monospace; font-size: 13.5px; font-weight: 800; color: var(--qx-text); }
  .rv-reward { width: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; gap: 10px; border: 1.5px solid var(--qx-accent-soft); background: var(--qx-accent-soft); border-radius: 12px; padding: 10px 14px; }
  .rv-reward span { font-size: 10px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--qx-text-faint); }
  .rv-reward strong { display: block; font-size: 15px; font-weight: 900; color: var(--qx-text); }
  .rv-w { font-size: 17px !important; font-weight: 950 !important; color: var(--qx-accent-text) !important; letter-spacing: 0 !important; text-transform: none !important; }
  .rv-skills { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
  .rv-skills span { font-size: 11px; font-weight: 700; color: var(--qx-text-dim); background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 999px; padding: 4px 11px; }
  .rv-exit { margin-top: 4px; border: none; border-radius: 999px; background: var(--qx-accent); color: #fff; font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 44px; padding: 0 28px; cursor: pointer; }
  .completion-note { color: var(--qx-green-text) !important; font-size: 11px !important; font-weight: 800 !important; }
  @media (max-height: 700px) { .reveal { min-height: 0; justify-content: flex-start; padding-top: 6px; } }
</style>
