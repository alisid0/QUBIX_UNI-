<script>
  // Skyhook — a Solve First trigonometry discovery, built from scratch 2026-07-29.
  //
  // You operate a rescue crane. The arm's ANGLE trades height for reach
  // (mission 1). Changing the arm's LENGTH reveals that the up/across RATIOS
  // are locked to the angle alone (mission 2 — with a commit: call the reach
  // before extending). Mission 3 is one-shot transfer: given the two ratios
  // of 37°, set the angle from the target's coordinates. Only the reveal
  // names them: sine = up-ratio, cosine = across-ratio.
  //
  // Pure SVG (no canvas): Qubix tokens work natively, every state testable.
  import ArcadeShell from './ArcadeShell.svelte';
  import SolveFirstPause from './SolveFirstPause.svelte';
  import { fly } from 'svelte/transition';
  import { playAward, playBonus } from '../../sfx.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const W = 360, H = 320;
  const BX = 34, BY = 292;            // crane base
  const TOL = 15;

  // ---------- mission data ----------
  const M1 = {
    L: 200,
    rescues: [
      { x: 173, y: 100, note: 'Low and far out.' },
      { x: 100, y: 173, note: 'High on the rock face.' },
      { x: 141, y: 141, note: 'Dead diagonal.' },
      { x: 193, y: 52, note: 'Very low on the outer ledge.' },
      { x: 52, y: 193, note: 'Almost directly above the base.' }
    ]
  };
  const M2 = {
    rounds: [
      {
        theta: 30, L1: 120, L2: 240, ask: 'across', L3: 300,
        options: [
          { label: '260 — the ratio holds', ok: true },
          { label: '150 — half the length', ok: false },
          { label: '212 — split the difference', ok: false }
        ]
      },
      {
        theta: 53, L1: 150, L2: 250, ask: 'up', L3: 400,
        options: [
          { label: '240 — like the across side', ok: false },
          { label: '320 — the up-ratio holds', ok: true },
          { label: '400 — full length', ok: false }
        ]
      },
      {
        theta: 45, L1: 140, L2: 280, ask: 'across', L3: 360,
        options: [
          { label: '180 — half the length', ok: false },
          { label: '255 — the 0.71 ratio holds', ok: true },
          { label: '360 — full length', ok: false }
        ]
      },
      {
        theta: 65, L1: 160, L2: 240, ask: 'up', L3: 300,
        options: [
          { label: '127 — that is the across side', ok: false },
          { label: '272 — the 0.91 ratio holds', ok: true },
          { label: '195 — copy the angle', ok: false }
        ]
      }
    ]
  };
  const M3 = {
    tolDeg: 3,
    rounds: [
      { L: 250, theta: 37, target: { x: 200, y: 150 }, upRatio: '0.60', acrossRatio: '0.80' },
      { L: 200, theta: 30, target: { x: 173, y: 100 }, upRatio: '0.50', acrossRatio: '0.87' },
      { L: 300, theta: 53, target: { x: 181, y: 240 }, upRatio: '0.80', acrossRatio: '0.60' }
    ],
    brief: 'Use the tower’s UP and ACROSS ratios to set the angle before each rescue. Three climbers, three arm lengths, one ratio triangle each.'
  };

  // ---------- state ----------
  let mission = 0;                    // 0..2
  let phase = 'briefing';             // briefing | play | commit | reveal
  let theta = 45;
  let L = M1.L;
  let rescueIx = 0;
  let logRows = [];                   // dispatch evidence log
  let flash = null;                   // 'hit' | 'miss'
  let score = 0;

  // mission 2 sub-state
  let roundIx = 0;
  let m2Stage = 0;                    // 0: extend L1, 1: extend L2, 2: commit MCQ
  let m2Rows = [];
  let commitTries = 0, commitWrong = false, commitFirstTries = 0;

  // mission 3 sub-state
  let transferIx = 0, m3Shots = 0, m3Done = false, transferFirstTries = 0;

  let recorded = false;
  let pauseKind = '';

  const rad = (d) => (d * Math.PI) / 180;
  $: across = L * Math.cos(rad(theta));
  $: up = L * Math.sin(rad(theta));
  $: tipX = BX + across;
  $: tipY = BY - up;
  $: m3round = M3.rounds[transferIx];
  $: target = mission === 0 ? M1.rescues[rescueIx]
    : mission === 2 ? m3round.target
    : null;
  $: m2round = M2.rounds[roundIx];

  const BRIEFS = [
    { name: 'The Arm', text: 'A rescue crane. One control: the ANGLE.\n\nTilt low to reach far. Tilt high to reach up.\nHook all three climbers.' },
    { name: 'The Ratio', text: 'New arm — its LENGTH extends too.\n\nThe tower reports two numbers after every dispatch:\nacross ÷ length, and up ÷ length.\n\nWatch what the angle does to them.' },
    { name: 'One Shot', text: M3.brief }
  ];
  const REVEALS = {
    final: 'Those two ratios have names.\n\nUP ÷ LENGTH = SINE of the angle.\nACROSS ÷ LENGTH = COSINE of the angle.\n\nThey never cared about the arm’s length — only its tilt. You used the same ratios to solve three different rescue triangles.'
  };

  function startMission(m) {
    mission = m;
    phase = 'briefing';
    pauseKind = '';
    flash = null;
    theta = 45;
    if (m === 0) { L = M1.L; rescueIx = 0; logRows = []; }
    if (m === 1) { roundIx = 0; enterRound(0); }
    if (m === 2) { transferIx = 0; enterTransfer(0); }
  }

  function enterTransfer(ix) {
    transferIx = ix;
    L = M3.rounds[ix].L;
    theta = 45;
    m3Shots = 0;
    m3Done = false;
  }

  function enterRound(ix) {
    roundIx = ix;
    m2Stage = 0;
    m2Rows = [];
    commitWrong = false;
    theta = M2.rounds[ix].theta;
    L = M2.rounds[ix].L1;
  }

  function dispatch() {
    if (phase !== 'play' || pauseKind) return;
    if (mission === 0) {
      const t = M1.rescues[rescueIx];
      const hit = Math.abs(tipX - (BX + t.x)) < TOL && Math.abs(tipY - (BY - t.y)) < TOL;
      logRows = [...logRows.slice(-3), { theta: Math.round(theta), across: Math.round(across), up: Math.round(up), hit }];
      flash = hit ? 'hit' : 'miss';
      if (!hit) {
        setTimeout(() => { flash = null; }, 650);
        return;
      }
      score += 100;
      try { playBonus(); } catch (_) {}
      pauseKind = 'rescue';
    } else if (mission === 2) {
      m3Shots += 1;
      const hit = Math.abs(theta - m3round.theta) <= M3.tolDeg;
      flash = hit ? 'hit' : 'miss';
      if (!hit) {
        setTimeout(() => { flash = null; }, 650);
        return;
      }
      m3Done = true;
      if (m3Shots === 1) transferFirstTries += 1;
      score += m3Shots === 1 ? 300 : 120;
      try { playAward(); } catch (_) {}
      pauseKind = 'final';
    }
  }

  function m2Extend() {
    if (phase !== 'play' || mission !== 1 || pauseKind) return;
    const r = m2round;
    m2Rows = [...m2Rows, {
      L: Math.round(L),
      acrossRatio: (Math.cos(rad(r.theta))).toFixed(2),
      upRatio: (Math.sin(rad(r.theta))).toFixed(2),
      across: Math.round(L * Math.cos(rad(r.theta))),
      up: Math.round(L * Math.sin(rad(r.theta)))
    }];
    try { playBonus(); } catch (_) {}
    pauseKind = 'measure';
  }

  function answerCommit(opt) {
    if (pauseKind) return;
    commitTries += 1;
    if (!opt.ok) { commitWrong = true; return; }
    if (commitTries === 1) commitFirstTries += 1;
    score += Math.max(60, 220 - (commitTries - 1) * 80);
    try { playAward(); } catch (_) {}
    pauseKind = 'prediction';
  }

  function continueAfterResult() {
    if (pauseKind === 'rescue') {
      pauseKind = '';
      flash = null;
      if (rescueIx < M1.rescues.length - 1) rescueIx += 1;
      else startMission(1);
      return;
    }
    if (pauseKind === 'measure') {
      pauseKind = '';
      if (m2Stage === 0) {
        m2Stage = 1;
        L = m2round.L2;
      } else {
        m2Stage = 2;
        phase = 'commit';
        commitWrong = false;
        commitTries = 0;
      }
      return;
    }
    if (pauseKind === 'prediction') {
      pauseKind = '';
      if (roundIx < M2.rounds.length - 1) {
        phase = 'play';
        enterRound(roundIx + 1);
      } else {
        startMission(2);
      }
      return;
    }
    if (pauseKind === 'final') {
      pauseKind = '';
      flash = null;
      if (transferIx < M3.rounds.length - 1) {
        enterTransfer(transferIx + 1);
        return;
      }
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
      reward: Math.min(15, 7 + commitFirstTries + transferFirstTries),
      arcadeScore: score,
      levelsCleared: 3,
      perfectLevels: commitFirstTries + transferFirstTries,
      patternFound: true,
      compared: true,
      transferFirstTry: transferFirstTries === M3.rounds.length,
      usedHint: commitTries > 1
    });
  }

  function restart() {
    recorded = false;
    score = 0;
    commitFirstTries = 0;
    transferFirstTries = 0;
    startMission(0);
  }

  function handleKey(e) {
    if (phase !== 'play' || pauseKind) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { theta = Math.max(0, theta - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { theta = Math.min(90, theta + 1); e.preventDefault(); }
    if (e.key === ' ' || e.key === 'Enter') {
      if (mission === 1) m2Extend(); else dispatch();
      e.preventDefault();
    }
  }

  startMission(0);
</script>

<svelte:window on:keydown={handleKey} />

<ArcadeShell
  eyebrow={config.eyebrow}
  title={config.title}
  level={mission + (phase === 'reveal' ? 1 : 0)}
  totalLevels={3}
  score={score}
  streak={0}
  onExit={() => { if (phase === 'reveal') finishGame(); onExit(); }}
>
  {#if phase === 'briefing'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Mission {mission + 1}</div>
      <h2>{BRIEFS[mission].name}</h2>
      <p class="pre">{BRIEFS[mission].text}</p>
      <button class="primary" on:click={() => phase = 'play'}>Take the controls</button>
    </div>

  {:else if phase === 'reveal'}
    <div class="panel center" in:fly={{ x: reduceMotion ? 0 : 16, duration: reduceMotion ? 0 : 200 }}>
      <div class="eyebrow">Decoded</div>
      <h2>You already knew trig.</h2>
      <p class="pre" style="color:var(--qx-green-text)">{REVEALS.final}</p>
      <div class="formula">sin θ = up / length &nbsp;·&nbsp; cos θ = across / length</div>
      <div class="rewardbox"><div><span>Discovery</span><strong>{config.rewardLabel}</strong></div></div>
      <p class="completion-note">Five angle rescues · Four ratio investigations · Three transfer rescues</p>
      <div class="stack">
        <button class="primary" on:click={() => { finishGame(); onExit(); }}>Return to workshops</button>
        <button class="ghost" on:click={restart}>Run it again</button>
      </div>
    </div>

  {:else}
    <svg class="scene" class:hit={flash === 'hit'} class:miss={flash === 'miss'} viewBox="0 0 {W} {H}" aria-label="Skyhook crane">
      <!-- ground + cliff -->
      <line class="ground" x1="0" y1={BY + 8} x2={W} y2={BY + 8} />
      <!-- reach arc for current length -->
      <path class="arc" d={`M ${BX + L} ${BY} A ${L} ${L} 0 0 0 ${BX} ${BY - L}`} />
      <!-- across / up guide lines -->
      <line class="guide across" x1={BX} y1={BY} x2={tipX} y2={BY} />
      <line class="guide upl" x1={tipX} y1={BY} x2={tipX} y2={tipY} />
      <text class="glabel" x={(BX + tipX) / 2} y={BY + 16} text-anchor="middle">across {Math.round(across)}</text>
      <text class="glabel up" x={tipX + 6} y={(BY + tipY) / 2}>up {Math.round(up)}</text>
      <!-- angle wedge -->
      <path class="wedge" d={`M ${BX + 34} ${BY} A 34 34 0 0 0 ${BX + 34 * Math.cos(rad(theta))} ${BY - 34 * Math.sin(rad(theta))} L ${BX} ${BY} Z`} />
      <text class="theta" x={BX + 48} y={BY - 10}>{Math.round(theta)}°</text>
      <!-- the arm -->
      <line class="arm" x1={BX} y1={BY} x2={tipX} y2={tipY} />
      <circle class="pivot" cx={BX} cy={BY} r="7" />
      <circle class="hook" cx={tipX} cy={tipY} r="6" />
      <!-- target -->
      {#if target}
        <g class="target">
          <circle cx={BX + target.x} cy={BY - target.y} r={TOL} class="tzone" />
          <circle cx={BX + target.x} cy={BY - target.y} r="5" class="tdot" />
          <text x={BX + target.x} y={BY - target.y - 20} text-anchor="middle" class="tlabel">
            ({Math.round(target.x)}, {Math.round(target.y)})
          </text>
        </g>
      {/if}
      {#if flash === 'hit'}<text class="flash good" x={W / 2} y="40" text-anchor="middle">HOOKED!</text>{/if}
      {#if flash === 'miss'}<text class="flash bad" x={W / 2} y="40" text-anchor="middle">SHORT — re-aim</text>{/if}
    </svg>

    {#if mission === 0}
      <p class="tip">{M1.rescues[rescueIx].note} Climber {rescueIx + 1} of {M1.rescues.length} at (across, up) = ({target.x}, {target.y}).</p>
      {#if logRows.length}
        <div class="log" aria-label="Dispatch log">
          <div class="lrow head"><span>θ</span><span>across</span><span>up</span><span></span></div>
          {#each logRows as r}
            <div class="lrow"><span>{r.theta}°</span><span>{r.across}</span><span>{r.up}</span><span>{r.hit ? '✓' : '✗'}</span></div>
          {/each}
        </div>
      {/if}
      <div class="controls">
        <label class="ctl"><span>Arm angle · {Math.round(theta)}°</span>
          <input type="range" min="0" max="90" step="1" bind:value={theta} aria-label="Arm angle" disabled={!!pauseKind} /></label>
        <button class="primary" on:click={dispatch} disabled={!!pauseKind}>Dispatch the hook ▸</button>
      </div>

    {:else if mission === 1}
      {#if phase === 'commit'}
        <div class="panel">
          <div class="eyebrow">Call it before you extend</div>
          <p>Same {m2round.theta}° tilt. Arm extends to <b>{m2round.L3}</b>.
            What will <b>{m2round.ask === 'across' ? 'ACROSS' : 'UP'}</b> measure?</p>
          <div class="opts">
            {#each m2round.options as opt (opt.label)}
              <button class="opt" disabled={!!pauseKind} on:click={() => answerCommit(opt)}>{opt.label}</button>
            {/each}
          </div>
          {#if commitWrong}
            <p class="wrong">The tower's ratio hasn't moved once. {m2round.ask} = ratio × length.</p>
          {/if}
        </div>
      {:else}
        <p class="tip">Angle locked at <b>{m2round.theta}°</b>. Extend the arm and watch the tower's ratio report.</p>
        {#if m2Rows.length}
          <div class="log" aria-label="Ratio report">
            <div class="lrow head"><span>length</span><span>across÷len</span><span>up÷len</span><span></span></div>
            {#each m2Rows as r}
              <div class="lrow"><span>{r.L}</span><span>{r.acrossRatio}</span><span>{r.upRatio}</span><span>✓</span></div>
            {/each}
          </div>
        {/if}
        <div class="controls">
          <button class="primary" on:click={m2Extend} disabled={!!pauseKind}>
            Extend to {m2Stage === 0 ? m2round.L1 : m2round.L2} and measure ▸
          </button>
        </div>
      {/if}

    {:else}
      <div class="transfer-progress" aria-label={`Transfer rescue ${transferIx + 1} of ${M3.rounds.length}`}>
        {#each M3.rounds as _, i}<span class:done={i < transferIx} class:active={i === transferIx}></span>{/each}
      </div>
      <p class="tip">Rescue {transferIx + 1} of {M3.rounds.length}. UP-RATIO({m3round.theta}°) = {m3round.upRatio} · ACROSS-RATIO({m3round.theta}°) = {m3round.acrossRatio} · arm locked at {m3round.L}. Shots taken: {m3Shots}.</p>
      <div class="controls">
        <label class="ctl"><span>Arm angle · {Math.round(theta)}°</span>
          <input type="range" min="0" max="90" step="1" bind:value={theta} aria-label="Arm angle" disabled={!!pauseKind} /></label>
        <button class="primary" on:click={dispatch} disabled={m3Done || !!pauseKind}>Take the shot ▸</button>
      </div>
    {/if}
    {#if pauseKind}
      <SolveFirstPause
        title={pauseKind === 'rescue'
          ? `Climber ${rescueIx + 1} is safely hooked`
          : pauseKind === 'measure' ? `Measurement ${m2Stage + 1} recorded`
          : pauseKind === 'prediction' ? 'Your prediction held when the arm extended'
          : 'The ratio data found the correct angle'}
        message={pauseKind === 'rescue'
          ? `At ${Math.round(theta)}°, the same arm produced ${Math.round(across)} across and ${Math.round(up)} up. Keep the triangle visible and notice the trade-off.`
          : pauseKind === 'measure'
            ? `Length changed, but across ÷ length stayed ${m2Rows[m2Rows.length - 1].acrossRatio} and up ÷ length stayed ${m2Rows[m2Rows.length - 1].upRatio}. The angle is holding both ratios steady.`
            : pauseKind === 'prediction'
              ? `The ${m2round.theta}° angle preserved its ratio at a new length. The measurement followed ratio × length, exactly as your answer predicted.`
              : `The ${m3round.acrossRatio} across-ratio and ${m3round.upRatio} up-ratio placed a ${m3round.L}-unit arm at across ${m3round.target.x}, up ${m3round.target.y}. The complete ratio triangle is still visible.`}
        actionLabel={pauseKind === 'rescue'
          ? rescueIx < M1.rescues.length - 1 ? 'Continue to the next climber' : 'Continue to the ratio test'
          : pauseKind === 'measure'
            ? m2Stage === 0 ? 'Continue to the longer arm' : 'Make a prediction'
            : pauseKind === 'prediction'
              ? roundIx < M2.rounds.length - 1 ? 'Continue to the next angle' : 'Continue to the final rescue'
              : transferIx < M3.rounds.length - 1 ? 'Continue to the next ratio rescue' : 'Reveal the concept'}
        onContinue={continueAfterResult}
      />
    {/if}
  {/if}
</ArcadeShell>

<style>
  .scene { width: 100%; border: 1px solid var(--qx-border); border-radius: 14px; background: var(--qx-bg); transition: box-shadow .2s; }
  .scene.hit { box-shadow: 0 0 0 2px var(--qx-green); }
  .scene.miss { box-shadow: 0 0 0 2px var(--qx-danger); }
  .ground { stroke: var(--qx-text-faint); stroke-width: 2; }
  .arc { fill: none; stroke: var(--qx-border-2); stroke-dasharray: 4 6; }
  .arm { stroke: var(--qx-accent); stroke-width: 5; stroke-linecap: round; transition: all .12s linear; }
  .pivot { fill: var(--qx-text); }
  .hook { fill: var(--qx-yellow); stroke: var(--qx-text); stroke-width: 1.5; }
  .guide { stroke-width: 2; stroke-dasharray: 3 4; opacity: .75; }
  .guide.across { stroke: var(--qx-green); }
  .guide.upl { stroke: var(--qx-pink, var(--qx-danger)); }
  .glabel { fill: var(--qx-green-text); font-size: 10px; font-weight: 800; }
  .glabel.up { fill: var(--qx-text-dim); }
  .wedge { fill: var(--qx-accent-soft); stroke: var(--qx-accent); stroke-width: 1; }
  .theta { fill: var(--qx-accent-text); font-size: 13px; font-weight: 900; }
  .tzone { fill: color-mix(in srgb, var(--qx-yellow) 16%, transparent); stroke: var(--qx-yellow); stroke-dasharray: 3 3; }
  .tdot { fill: var(--qx-yellow); }
  .tlabel { fill: var(--qx-text-dim); font-size: 10px; font-weight: 800; }
  .flash { font-size: 17px; font-weight: 950; }
  .flash.good { fill: var(--qx-green-text); }
  .flash.bad { fill: var(--qx-danger-text); }

  .tip { color: var(--qx-text-dim); font-size: 12.5px; font-weight: 650; line-height: 1.4; margin: 9px 0 0; }
  .tip b { color: var(--qx-text); }
  .transfer-progress { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 9px; }
  .transfer-progress span { height: 5px; border-radius: 999px; background: var(--qx-surface-3); }
  .transfer-progress span.active { background: var(--qx-accent); }
  .transfer-progress span.done { background: var(--qx-green); }
  .log { margin-top: 8px; border: 1px solid var(--qx-border); border-radius: 10px; overflow: hidden; }
  .lrow { display: grid; grid-template-columns: 1fr 1fr 1fr 30px; gap: 4px; padding: 5px 10px; font-size: 12px; font-weight: 700; color: var(--qx-text); font-variant-numeric: tabular-nums; }
  .lrow.head { background: var(--qx-surface-2); color: var(--qx-text-faint); font-size: 10px; text-transform: uppercase; letter-spacing: .05em; }
  .lrow:not(.head):nth-child(even) { background: var(--qx-surface); }

  .controls { display: grid; gap: 8px; margin-top: 10px; }
  .ctl { display: grid; gap: 4px; }
  .ctl span { color: var(--qx-text-dim); font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
  .ctl input { width: 100%; accent-color: var(--qx-accent); min-height: 28px; }

  .panel { width: 100%; min-width: 0; box-sizing: border-box; display: flex; flex-direction: column; gap: 10px; padding: 4px 2px; }
  .panel.center { align-items: center; text-align: center; }
  .eyebrow { color: var(--qx-accent-text); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  h2 { font-size: 20px; line-height: 1.15; margin: 2px 0 4px; font-weight: 950; }
  .panel p { color: var(--qx-text-dim); font-size: 13px; line-height: 1.5; margin: 0; }
  .panel p b { color: var(--qx-text); }
  .pre { white-space: pre-line; }
  .formula { width: 100%; min-width: 0; box-sizing: border-box; font-family: ui-monospace, Menlo, monospace; font-size: 13px; font-weight: 800; line-height: 1.4; overflow-wrap: anywhere; color: var(--qx-text); border: 1.5px solid var(--qx-accent); border-radius: 12px; background: var(--qx-accent-soft); padding: 10px 12px; }
  .rewardbox { width: 100%; min-width: 0; box-sizing: border-box; border: 1.5px solid var(--qx-green); border-radius: 14px; background: var(--qx-green-soft); padding: 12px; text-align: left; }
  .rewardbox span { font-size: 9px; color: var(--qx-green-text); font-weight: 900; text-transform: uppercase; }
  .rewardbox strong { display: block; font-size: 15px; }
  .completion-note { color: var(--qx-green-text) !important; font-size: 11px !important; font-weight: 800 !important; }
  .stack { width: 100%; min-width: 0; box-sizing: border-box; display: grid; gap: 7px; }
  .opts { display: grid; gap: 8px; }
  .opt { border: 1.5px solid var(--qx-border-2); border-radius: 12px; background: var(--qx-surface); color: var(--qx-text); font-family: var(--qx-font); font-size: 13px; font-weight: 750; min-height: 46px; padding: 8px 14px; cursor: pointer; text-align: left; }
  .opt:hover { border-color: var(--qx-accent); }
  .wrong { color: var(--qx-danger-text); font-size: 12.5px; font-weight: 700; }
  .primary { min-height: 46px; border: none; border-radius: 999px; background: var(--qx-accent); color: var(--qx-bg); font: 900 14px var(--qx-font); cursor: pointer; width: 100%; }
  .primary:disabled { opacity: .45; cursor: default; }
  .ghost { min-height: 46px; border: 1.5px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text-dim); font: 900 14px var(--qx-font); cursor: pointer; width: 100%; }
</style>
