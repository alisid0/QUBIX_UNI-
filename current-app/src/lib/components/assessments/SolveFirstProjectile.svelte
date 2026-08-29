<script>
  // Trajectory — a Solve First projectile game.
  //
  // The learner aims a launcher (angle + power) and fires. A live dashed arc
  // previews the parabola; firing sends a shot along it. Three missions:
  //   1) hit a flag on flat ground (feel the arc)
  //   2) clear a wall and still land on the flag (the shape matters)
  //   3) fixed power, farthest flag — reachable only near 45° (the secret)
  // Only then is it named: projectile motion, a parabola, max range at 45°.
  // Same contract as the other arcade discoveries.
  import ArcadeShell from './ArcadeShell.svelte';
  import { playAward, playBonus } from '../../sfx.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const G = 9.8, WORLD_W = 100, WORLD_H = 56;
  const W = 320, H = 200, PL = 14, PR = 14, GROUND = 172, TOP = 12;
  const plotW = W - PL - PR, plotH = GROUND - TOP;
  const sx = (x) => PL + (x / WORLD_W) * plotW;
  const sy = (y) => GROUND - (y / WORLD_H) * plotH;

  const LEVELS = [
    { targetX: 55, tol: 6, wall: null, fixedPower: null,
      blurb: 'Land a shot on the flag. Nudge the angle and power until the arc drops on it.' },
    { targetX: 74, tol: 6, wall: { x: 40, h: 26 }, fixedPower: null,
      blurb: 'A wall in the way. Arc OVER it and still land on the flag beyond.' },
    { targetX: 92, tol: 5, wall: null, fixedPower: 30, noPreview: true,
      blurb: 'Power locked — and the targeting computer is OFFLINE. No preview arc. This flag is at the very edge; only one angle reaches that far. Find it by feel.' }
  ];

  // Transfer: complementary angles share a range. At the locked power,
  // 30° lands at v²·sin(60°)/g ≈ 80. Which other angle matches it?
  const TRANSFER = {
    intro: 'One last calibration shot: at this same power, a 30° launch lands at distance ≈80.',
    q: 'WITHOUT firing — which other angle lands in exactly the same spot?',
    options: [
      { label: '45° — always the best', ok: false },
      { label: '60° — same distance as 30°', ok: true },
      { label: '75° — higher flies farther', ok: false }
    ],
    hint: 'Look at the formula shape: range depends on sin(2θ). sin(60°) = sin(120°) — so 30° and 60° twin up. Angles that add to 90° share a landing spot.'
  };
  let transferTries = 0;
  let transferWrong = false;

  let levelIx = 0;
  let angle = 45;
  let power = 22;
  let phase = 'aim';        // aim | flying | landed | concept
  let flightX = 0, flightY = 0;
  let landedX = null, hit = false;
  let arcadeScore = 0, combo = 0, hits = 0;
  let shots = 0;
  let recorded = false;

  $: level = LEVELS[levelIx];
  $: usePower = level.fixedPower ?? power;
  $: rng = range(angle, usePower);
  $: reward = Math.min(15, 8 + hits * 2 + (combo >= 2 ? 1 : 0));

  function range(a, p) { const th = a * Math.PI / 180; return (p * p * Math.sin(2 * th)) / G; }
  function posAt(t, a, p) { const th = a * Math.PI / 180; return { x: p * Math.cos(th) * t, y: p * Math.sin(th) * t - 0.5 * G * t * t }; }
  function tLand(a, p) { const th = a * Math.PI / 180; return (2 * p * Math.sin(th)) / G; }

  // dashed aim preview (updates live as you adjust)
  $: aimPath = (() => {
    const p = usePower, tL = tLand(angle, p), n = 32; let d = '';
    for (let i = 0; i <= n; i++) { const pos = posAt((i / n) * tL, angle, p); d += (d ? ' L' : 'M') + sx(pos.x).toFixed(1) + ',' + sy(Math.max(0, pos.y)).toFixed(1); }
    return d;
  })();

  function startLevel() { phase = 'aim'; angle = 45; power = 22; landedX = null; hit = false; flightX = 0; flightY = 0; }

  function fire() {
    if (phase !== 'aim') return;
    const lvl = LEVELS[levelIx];
    const p = lvl.fixedPower ?? power;
    const r = range(angle, p), tL = tLand(angle, p);
    phase = 'flying';
    shots += 1;
    const finish = () => {
      landedX = r;
      let ok = Math.abs(r - lvl.targetX) < lvl.tol;
      if (lvl.wall) {
        const th = angle * Math.PI / 180, tw = lvl.wall.x / (p * Math.cos(th));
        const yw = posAt(tw, angle, p).y;
        ok = ok && r > lvl.wall.x && yw > lvl.wall.h;
      }
      hit = ok;
      if (ok) {
        hits += 1; combo += 1;
        const acc = Math.max(0, lvl.tol - Math.abs(r - lvl.targetX));
        arcadeScore += (140 + Math.round(acc * 20)) * Math.max(1, combo);
        try { (combo > 1 ? playBonus : playAward)(); } catch (_) {}
      } else { combo = 0; }
      phase = 'landed';
    };
    if (reduceMotion) { flightX = r; flightY = 0; finish(); return; }
    const dur = Math.min(1500, 550 + r * 9), start = performance.now();
    const step = (now) => {
      const prog = Math.min(1, (now - start) / dur), t = prog * tL, pos = posAt(t, angle, p);
      flightX = pos.x; flightY = Math.max(0, pos.y);
      if (prog < 1) requestAnimationFrame(step); else finish();
    };
    requestAnimationFrame(step);
  }

  function retry() { phase = 'aim'; landedX = null; hit = false; }
  function next() {
    if (levelIx < LEVELS.length - 1) { levelIx += 1; startLevel(); }
    else { phase = 'transfer'; transferWrong = false; }
  }

  function answerTransfer(opt) {
    transferTries += 1;
    if (!opt.ok) { transferWrong = true; combo = 0; return; }
    arcadeScore += Math.max(40, 180 - (transferTries - 1) * 70);
    try { playBonus(); } catch (_) {}
    phase = 'concept';
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id, reward, arcadeScore, hits,
        patternFound: true, compared: true,
        usedHint: transferTries > 1, transferFirstTry: transferTries === 1
      });
    }
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
  {#if phase === 'transfer'}
    <div class="reveal">
      <span class="rv-eyebrow">Final check — no preview, no shot</span>
      <h2>Call it before you fire.</h2>
      <p>{TRANSFER.intro}</p>
      <p><b>{TRANSFER.q}</b></p>
      <div class="topts">
        {#each TRANSFER.options as opt (opt.label)}
          <button class="topt" on:click={() => answerTransfer(opt)}>{opt.label}</button>
        {/each}
      </div>
      {#if transferWrong}<p class="twrong">{TRANSFER.hint}</p>{/if}
    </div>

  {:else if phase === 'concept'}
    <div class="reveal">
      <span class="rv-eyebrow">Concept uncovered</span>
      <h2>You've been flying projectiles.</h2>
      <p>Gravity pulls every shot into the same shape — a <b>parabola</b>. Steady sideways
        motion, a rise-then-fall up and down. And at a fixed power the range peaks at
        <b>45°</b>; angles that add to 90° (like 30° and 60°) land in the exact same spot.</p>
      <div class="formula">range = <span class="frac"><i>v² · sin(2θ)</i><em>g</em></span></div>
      <div class="rv-reward">
        <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
        <span class="rv-w">+{reward} W</span>
      </div>
      <div class="rv-skills"><span>Parabolic path</span><span>Range vs angle</span><span>45° max range</span></div>
      <button class="rv-exit" on:click={onExit}>Return to workshops</button>
    </div>

  {:else}
    <p class="brief">{level.blurb}</p>

    <div class="scene">
      <svg viewBox="0 0 {W} {H}">
        <line class="ground" x1="0" y1={GROUND} x2={W} y2={GROUND} />
        {#each [20, 40, 60, 80] as gx}<text class="gx" x={sx(gx)} y={GROUND + 12} text-anchor="middle">{gx}</text>{/each}

        <!-- wall -->
        {#if level.wall}
          <rect class="wall" x={sx(level.wall.x) - 4} y={sy(level.wall.h)} width="8" height={GROUND - sy(level.wall.h)} />
        {/if}

        <!-- target flag -->
        <g class="flag" class:hit={phase === 'landed' && hit}>
          <line x1={sx(level.targetX)} y1={GROUND} x2={sx(level.targetX)} y2={GROUND - 26} />
          <path d="M{sx(level.targetX)},{GROUND - 26} l14,5 l-14,5 Z" />
          <circle cx={sx(level.targetX)} cy={GROUND} r={sx(level.tol) - sx(0)} class="tolzone" />
        </g>

        <!-- launcher barrel -->
        <g transform={`translate(${sx(0)},${GROUND}) rotate(${-angle})`}>
          <rect class="barrel" x="0" y="-4" width="26" height="8" rx="3" />
        </g>
        <circle class="base" cx={sx(0)} cy={GROUND} r="8" />

        <!-- aim preview (offline on the final mission — that's the discovery) -->
        {#if phase === 'aim' && !level.noPreview}<path class="aim" d={aimPath} />{/if}
        <!-- shot in flight / landed -->
        {#if phase !== 'aim'}
          <circle class="shot" cx={sx(flightX)} cy={sy(flightY)} r="5" />
        {/if}
      </svg>
    </div>

    {#if phase === 'aim'}
      <div class="controls">
        <label class="ctl">
          <span>Angle <b>{angle}°</b></span>
          <input type="range" min="12" max="80" step="1" bind:value={angle} aria-label="Launch angle" />
        </label>
        <label class="ctl" class:locked={level.fixedPower != null}>
          <span>Power {level.fixedPower != null ? '(locked)' : ''} <b>{usePower}</b></span>
          <input type="range" min="14" max="30" step="1" bind:value={power} disabled={level.fixedPower != null} aria-label="Launch power" />
        </label>
        <button class="fire" on:click={fire}>Fire! →</button>
      </div>

    {:else if phase === 'flying'}
      <div class="controls"><p class="fly-tip">…in flight…</p></div>

    {:else}
      <div class="controls">
        <p class="result" class:good={hit}>
          {#if hit}Direct hit! Landed at {Math.round(landedX)}.{:else}Missed — landed at {Math.round(landedX)}, flag's at {level.targetX}.{/if}
        </p>
        {#if hit}
          <button class="fire" on:click={next}>{levelIx < LEVELS.length - 1 ? 'Next mission →' : 'What did I just do?'}</button>
        {:else}
          <button class="fire ghost" on:click={retry}>Re-aim</button>
        {/if}
      </div>
    {/if}
  {/if}
</ArcadeShell>

<style>
  .brief { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.4; margin: 0 0 9px; }
  .scene { border: 1.5px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface); overflow: hidden; }
  svg { display: block; width: 100%; height: auto; }
  .ground { stroke: var(--qx-text-faint); stroke-width: 2; }
  .gx { fill: var(--qx-text-faint); font-size: 8px; font-weight: 700; }
  .wall { fill: var(--qx-text-dim); }
  .flag line { stroke: var(--qx-text-dim); stroke-width: 2; }
  .flag path { fill: var(--qx-accent); }
  .flag.hit path { fill: var(--qx-green); }
  .tolzone { fill: color-mix(in srgb, var(--qx-accent) 14%, transparent); }
  .barrel { fill: var(--qx-text); }
  .base { fill: var(--qx-text); }
  .aim { fill: none; stroke: var(--qx-accent); stroke-width: 2; stroke-dasharray: 4 5; opacity: 0.8; }
  .shot { fill: var(--qx-accent); }

  .controls { margin-top: 11px; display: flex; flex-direction: column; gap: 10px; }
  .ctl { display: flex; flex-direction: column; gap: 3px; }
  .ctl > span { font-size: 12px; font-weight: 700; color: var(--qx-text-dim); }
  .ctl > span b { color: var(--qx-text); font-family: ui-monospace, Menlo, monospace; }
  .ctl input { accent-color: var(--qx-accent); height: 22px; }
  .ctl.locked { opacity: 0.6; }
  .fly-tip { text-align: center; font-size: 13px; font-weight: 700; color: var(--qx-text-faint); margin: 0; }
  .result { font-size: 13.5px; font-weight: 700; color: var(--qx-text-dim); margin: 0; text-align: center; }
  .result.good { color: var(--qx-green-text); }
  .fire {
    align-self: stretch; border: none; border-radius: 999px; background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 15px; font-weight: 850; min-height: 46px; padding: 0 22px; cursor: pointer;
  }
  .fire.ghost { background: var(--qx-surface); color: var(--qx-text); border: 1.5px solid var(--qx-border-2); }

  .topts { width: 100%; display: grid; gap: 8px; }
  .topt {
    border: 1.5px solid var(--qx-border-2); border-radius: 12px; background: var(--qx-surface);
    color: var(--qx-text); font-family: var(--qx-font); font-size: 13px; font-weight: 750;
    min-height: 46px; padding: 8px 14px; cursor: pointer; text-align: left;
  }
  .topt:hover { border-color: var(--qx-accent); }
  .twrong { color: var(--qx-danger-text); font-size: 12.5px; font-weight: 700; }

  .reveal { display: flex; flex-direction: column; gap: 12px; text-align: center; align-items: center; padding: 6px 2px; }
  .rv-eyebrow { font-size: 10px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: var(--qx-accent-text); }
  .reveal h2 { font-size: 21px; font-weight: 950; color: var(--qx-text); margin: 0; line-height: 1.15; }
  .reveal p { font-size: 13.5px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.5; margin: 0; }
  .reveal p b { color: var(--qx-text); }
  .formula { font-family: ui-monospace, Menlo, monospace; font-size: 14px; font-weight: 800; color: var(--qx-text); display: flex; align-items: center; gap: 8px; justify-content: center; }
  .frac { display: inline-flex; flex-direction: column; align-items: center; }
  .frac i { font-style: normal; border-bottom: 2px solid var(--qx-text-faint); padding: 0 6px 2px; }
  .frac em { font-style: normal; padding-top: 2px; }
  .rv-reward { width: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; gap: 10px; border: 1.5px solid var(--qx-accent-soft); background: var(--qx-accent-soft); border-radius: 12px; padding: 10px 14px; }
  .rv-reward span { font-size: 10px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--qx-text-faint); }
  .rv-reward strong { display: block; font-size: 15px; font-weight: 900; color: var(--qx-text); }
  .rv-w { font-size: 17px !important; font-weight: 950 !important; color: var(--qx-accent-text) !important; letter-spacing: 0 !important; text-transform: none !important; }
  .rv-skills { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
  .rv-skills span { font-size: 11px; font-weight: 700; color: var(--qx-text-dim); background: var(--qx-surface-2); border: 1px solid var(--qx-border); border-radius: 999px; padding: 4px 11px; }
  .rv-exit { margin-top: 4px; border: none; border-radius: 999px; background: var(--qx-accent); color: #fff; font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 44px; padding: 0 28px; cursor: pointer; }
</style>
