<script>
  // Stop the Cart — a Solve First force lab.
  //
  // The learner commands two opposing thrusters on a runaway cart. They must:
  //   1. steady   collect three contrasting outcomes (still / left / right)
  //   2. deliver  aim the resultant to hit a right bay AND a left bay
  //   3. transfer apply balanced vs unbalanced reasoning to two new scenes
  //   4. reveal   only now meet "balanced forces" and "resultant force"
  // No written explanation, no lucky-success skip, no timer. Same reward
  // contract as the Crack the Lockers reference so the modes stay consistent.
  import { fly, fade } from 'svelte/transition';
  import ArcadeShell from './ArcadeShell.svelte';
  import ForceEvidence from './ForceEvidence.svelte';
  import { playAward, playBonus } from '../../sfx.js';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const MAX = 5;

  let phase = 'brief';
  let left = 1;
  let right = 1;
  let lastRun = null;              // { left, right, outcome } of the most recent test
  let runs = [];                   // steady-phase log
  let seen = { still: false, left: false, right: false };
  let deliveredRight = false;
  let deliveredLeft = false;
  let deliverRun = null;
  let hintUsed = false;
  let activeHint = '';
  let transfer = { tug: '', ramp: '', resultant: '' };
  let transferMistakes = 0;
  let recorded = false;
  let arcadeScore = 0;
  let combo = 0;
  let attempts = 0;
  let launchToken = 0;

  // The left-side thruster pushes right; the right-side thruster pushes left.
  $: net = left - right;
  $: outcome = net === 0 ? 'still' : net > 0 ? 'right' : 'left';
  $: shift = Math.max(-118, Math.min(118, net * 34));
  $: steadyReady = seen.still && seen.left && seen.right;
  $: deliverReady = deliveredRight && deliveredLeft;
  $: transferReady =
    transfer.tug === 'equal' &&
    transfer.ramp === 'stronger' &&
    transfer.resultant === '3-right';
  $: transferFirstTry = transferReady && transferMistakes === 0;
  $: evidenceScore = runs.length >= 4 && steadyReady ? 4 : 3;
  $: reward = Math.min(15, 6 + evidenceScore + (transferFirstTry ? 3 : 1) + (hintUsed ? 0 : 2));
  $: level = phase === 'brief' ? 0 : phase === 'steady' ? 1 : phase === 'deliver' ? 2 : phase === 'transfer' ? 3 : 4;
  $: rank = arcadeScore >= 7500 ? 'S' : arcadeScore >= 5200 ? 'A' : arcadeScore >= 3000 ? 'B' : 'C';

  function bump(side, delta) {
    if (side === 'left') left = Math.max(0, Math.min(MAX, left + delta));
    else right = Math.max(0, Math.min(MAX, right + delta));
  }

  function award(points, major = false) {
    combo += 1;
    arcadeScore += points * Math.max(1, combo);
    if (major) playBonus();
    else playAward();
  }

  function miss(penalty = 25) {
    combo = 0;
    arcadeScore = Math.max(0, arcadeScore - penalty);
  }

  function runSteady() {
    const alreadySeen = seen[outcome];
    const wasReady = steadyReady;
    const result = { left, right, outcome };
    lastRun = result;
    runs = [...runs, result];
    seen = { ...seen, [outcome]: true };
    attempts += 1;
    launchToken += 1;
    if (alreadySeen) {
      arcadeScore += 20;
    } else {
      award(100);
    }
    if (!wasReady && Object.values({ ...seen, [outcome]: true }).every(Boolean)) {
      award(180, true);
    }
  }

  function runDeliver() {
    const result = net === 2
      ? 'east-perfect'
      : net === -2
        ? 'west-perfect'
        : net === 0
          ? 'stalled'
          : net > 2
            ? 'east-overshoot'
            : net > 0
              ? 'east-short'
              : net < -2
                ? 'west-overshoot'
                : 'west-short';
    deliverRun = { left, right, outcome, result };
    attempts += 1;
    launchToken += 1;

    if (result === 'east-perfect') {
      if (!deliveredRight) award(220, true);
      else arcadeScore += 20;
      deliveredRight = true;
    } else if (result === 'west-perfect') {
      if (!deliveredLeft) award(220, true);
      else arcadeScore += 20;
      deliveredLeft = true;
    } else {
      miss();
    }
  }

  function showHint(key) {
    hintUsed = true;
    activeHint = activeHint === key ? '' : key;
  }

  function answerTransfer(scene, value) {
    const correct = scene === 'tug' ? 'equal' : scene === 'ramp' ? 'stronger' : '3-right';
    const previous = transfer[scene];
    if (previous === value) return;
    if (value !== correct) {
      transferMistakes += 1;
      miss(35);
    } else if (previous !== correct) {
      award(scene === 'resultant' ? 240 : 160, scene === 'resultant');
    }
    transfer = { ...transfer, [scene]: value };
  }

  function finishDiscovery() {
    if (!transferReady) return;
    phase = 'reveal';
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id,
        reward,
        evidenceCount: runs.length,
        patternFound: true,
        compared: true,
        transferFirstTry,
        usedHint: hintUsed,
        arcadeScore,
        arcadeRank: rank,
        attempts
      });
    }
  }

  function restart() {
    phase = 'brief';
    left = 1;
    right = 1;
    lastRun = null;
    runs = [];
    seen = { still: false, left: false, right: false };
    deliveredRight = false;
    deliveredLeft = false;
    deliverRun = null;
    hintUsed = false;
    activeHint = '';
    transfer = { tug: '', ramp: '', resultant: '' };
    transferMistakes = 0;
    recorded = false;
    arcadeScore = 0;
    combo = 0;
    attempts = 0;
    launchToken = 0;
  }
</script>

<div class="solve-first">
  <ArcadeShell
    eyebrow={`${config.eyebrow} · Arcade mission`}
    title="Stop the Cart"
    {level}
    totalLevels={4}
    score={arcadeScore}
    streak={combo}
    {onExit}
  >

  {#key phase}
    <section class="phase" in:fly={{ x: 28, duration: 240 }} out:fade={{ duration: 90 }}>
      {#if phase === 'brief'}
        <div class="brief">
          <div class="brief-hero" aria-hidden="true">
            <span class="hero-kicker">Dock 07 · Control offline</span>
            <div class="hero-cart">
              <i class="hero-flame left"></i>
              <span class="hero-cargo"></span>
              <i class="hero-flame right"></i>
            </div>
            <span class="hero-alert">!</span>
          </div>
          <div class="micro-label">Loading dock · Runaway cart</div>
          <h2>Stop the Cart</h2>
          <p>A loaded service cart is drifting across Dock 07. Take manual control, learn its physics and land it safely.</p>
          <div class="mission">
            <span>Your mission</span>
            <strong>Complete three live missions: stabilise the cart, calibrate both bays, then pass the control-room test.</strong>
          </div>
          <div class="brief-rules">
            <span>Accuracy builds score</span>
            <span>Clean runs build combo</span>
            <span>Physics unlocks at the end</span>
          </div>
          <button class="primary launch-primary" on:click={() => phase = 'steady'}>Take manual control</button>
        </div>

      {:else if phase === 'steady'}
        <div class="section-title">
          <span>Task 01 · Read the cart</span>
          <h2>Make it hold still</h2>
          <p>Set the two thrusters and run the cart. Find out exactly what decides which way it goes — or whether it goes at all.</p>
        </div>

        <div class="stage" class:still={lastRun && lastRun.outcome === 'still'} class:active-run={!!lastRun}>
          <div class="stage-vignette" aria-hidden="true"></div>
          <span class="dock-id">DOCK 07</span>
          <div class="thruster left" style={`--power:${left};`} aria-hidden="true"></div>
          <div class="track">
            <span class="bay left-bay">W</span>
            <span class="bay right-bay">E</span>
            {#key launchToken}
              <div
                class="cart"
                class:run-left={lastRun?.outcome === 'left'}
                class:run-right={lastRun?.outcome === 'right'}
                class:run-still={lastRun?.outcome === 'still'}
                style={`--shift:${lastRun ? shift : 0}px;`}
              >
                <span class="cargo"></span>
                <i class="nozzle nozzle-left"></i>
                <i class="nozzle nozzle-right"></i>
                <b></b><em></em>
              </div>
            {/key}
          </div>
          <div class="thruster right" style={`--power:${right};`} aria-hidden="true"></div>
          {#if lastRun}<div class="result-flash">{lastRun.outcome === 'still' ? 'STABLE' : lastRun.outcome === 'right' ? 'EASTBOUND' : 'WESTBOUND'}</div>{/if}
        </div>

        <div class="readout">
          <span>Last run</span>
          <strong>{lastRun ? (lastRun.outcome === 'still' ? 'held still' : lastRun.outcome === 'left' ? 'moved left' : 'moved right') : 'not run yet'}</strong>
        </div>

        <div class="controls">
          <div class="control">
            <span>Push from left</span>
            <strong>{left}</strong>
            <div>
              <button on:click={() => bump('left', -1)} disabled={left === 0} aria-label="Reduce left thruster">−</button>
              <button on:click={() => bump('left', 1)} disabled={left === MAX} aria-label="Increase left thruster">+</button>
            </div>
          </div>
          <div class="control">
            <span>Push from right</span>
            <strong>{right}</strong>
            <div>
              <button on:click={() => bump('right', -1)} disabled={right === 0} aria-label="Reduce right thruster">−</button>
              <button on:click={() => bump('right', 1)} disabled={right === MAX} aria-label="Increase right thruster">+</button>
            </div>
          </div>
        </div>

        <button class="test-button" on:click={runSteady}>Run the cart</button>

        <ForceEvidence {runs} {seen} />

        {#if runs.length > 0 && !steadyReady}
          <div class="nudge">Good data. You still need {['still','left','right'].filter((k) => !seen[k]).length} more contrasting {['still','left','right'].filter((k) => !seen[k]).length === 1 ? 'outcome' : 'outcomes'} — get it to hold still, drift left, and drift right.</div>
        {/if}
        <button class="hint-link" on:click={() => showHint('steady')}>{activeHint === 'steady' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'steady'}<div class="hint">Try equal pushes, then make one side clearly bigger. Watch what the difference does.</div>{/if}
        <button class="primary" disabled={!steadyReady} on:click={() => phase = 'deliver'}>
          {steadyReady ? 'Rule proven · Steer it' : 'Collect still, left and right'}
        </button>

      {:else if phase === 'deliver'}
        <div class="section-title">
          <span>Task 02 · Steer on demand</span>
          <h2>Deliver to both bays</h2>
          <p>Now aim it. Land the cart in the east bay and, on another run, the west bay. Prove you control the direction, not just luck.</p>
        </div>

        <div class="stage delivery-stage" class:still={deliverRun && deliverRun.outcome === 'still'} class:active-run={!!deliverRun}>
          <div class="stage-vignette" aria-hidden="true"></div>
          <span class="dock-id">CALIBRATION RUN</span>
          <div class="thruster left" style={`--power:${left};`} aria-hidden="true"></div>
          <div class="track">
            <span class="bay left-bay" class:hit={deliveredLeft}>W · −2 {deliveredLeft ? '✓' : ''}</span>
            <span class="bay right-bay" class:hit={deliveredRight}>E · +2 {deliveredRight ? '✓' : ''}</span>
            {#key launchToken}
              <div
                class="cart"
                class:run-left={deliverRun?.outcome === 'left'}
                class:run-right={deliverRun?.outcome === 'right'}
                class:run-still={deliverRun?.outcome === 'still'}
                style={`--shift:${deliverRun ? shift : 0}px;`}
              >
                <span class="cargo"></span>
                <i class="nozzle nozzle-left"></i>
                <i class="nozzle nozzle-right"></i>
                <b></b><em></em>
              </div>
            {/key}
          </div>
          <div class="thruster right" style={`--power:${right};`} aria-hidden="true"></div>
          {#if deliverRun}
            <div class="result-flash" class:perfect={deliverRun.result?.includes('perfect')}>
              {deliverRun.result === 'east-perfect' || deliverRun.result === 'west-perfect'
                ? 'PERFECT DOCK'
                : deliverRun.result === 'stalled'
                  ? 'NO MOVEMENT'
                  : deliverRun.result?.includes('overshoot')
                    ? 'OVERSHOOT'
                    : 'SHORT'}
            </div>
          {/if}
        </div>

        <div class="deliver-goals">
          <div class:done={deliveredRight}><b>{deliveredRight ? '✓' : '○'}</b> East bay · difference +2</div>
          <div class:done={deliveredLeft}><b>{deliveredLeft ? '✓' : '○'}</b> West bay · difference −2</div>
        </div>

        <div class="controls">
          <div class="control">
            <span>Push from left</span>
            <strong>{left}</strong>
            <div>
              <button on:click={() => bump('left', -1)} disabled={left === 0} aria-label="Reduce left thruster">−</button>
              <button on:click={() => bump('left', 1)} disabled={left === MAX} aria-label="Increase left thruster">+</button>
            </div>
          </div>
          <div class="control">
            <span>Push from right</span>
            <strong>{right}</strong>
            <div>
              <button on:click={() => bump('right', -1)} disabled={right === 0} aria-label="Reduce right thruster">−</button>
              <button on:click={() => bump('right', 1)} disabled={right === MAX} aria-label="Increase right thruster">+</button>
            </div>
          </div>
        </div>

        <button class="test-button" on:click={runDeliver}>Launch delivery</button>

        {#if deliverRun && !deliverReady}
          <div class="nudge">
            {deliverRun.result === 'stalled'
              ? 'The pushes cancelled. The calibration bay needs a difference of exactly 2.'
              : deliverRun.result?.includes('overshoot')
                ? 'Too much difference—the cart overshot. Reduce the winning side until the difference is exactly 2.'
                : deliverRun.result?.includes('perfect')
                  ? 'Perfect dock. Reverse the winning side and reproduce a difference of 2 for the other bay.'
                  : 'Correct direction, but not enough difference. The calibration target is exactly 2.'}
          </div>
        {/if}
        <button class="hint-link" on:click={() => showHint('deliver')}>{activeHint === 'deliver' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'deliver'}<div class="hint">For east, make the left push exactly 2 greater. For west, make the right push exactly 2 greater.</div>{/if}
        <button class="primary" disabled={!deliverReady} on:click={() => phase = 'transfer'}>
          {deliverReady ? 'Control proven · Apply it' : 'Deliver to both bays'}
        </button>

      {:else if phase === 'transfer'}
        <div class="section-title">
          <span>Field test</span>
          <h2>Call the outcome</h2>
          <p>Use what the cart taught you. The formal names are still hidden.</p>
        </div>

        <div class="policy-card">
          <div class="policy-icon" aria-hidden="true">⚑</div>
          <div class="policy-copy">
            <small>Tug of war</small>
            <strong>The flag must stay dead centre over the line. What has to be true of the two teams’ pulls?</strong>
          </div>
          <div class="policy-options">
            <button
              class:selected={transfer.tug === 'equal'}
              class:correct={transfer.tug === 'equal'}
              on:click={() => answerTransfer('tug', 'equal')}
            >Equal pulls, opposite ways</button>
            <button
              class:selected={transfer.tug === 'one'}
              class:wrong={transfer.tug === 'one'}
              on:click={() => answerTransfer('tug', 'one')}
            >One team pulling harder</button>
          </div>
        </div>

        <div class="policy-card">
          <div class="policy-icon" aria-hidden="true">▲</div>
          <div class="policy-copy">
            <small>Loading ramp</small>
            <strong>To start a heavy pallet sliding up toward the ramp, the push toward the ramp must be…</strong>
          </div>
          <div class="policy-options">
            <button
              class:selected={transfer.ramp === 'equal'}
              class:wrong={transfer.ramp === 'equal'}
              on:click={() => answerTransfer('ramp', 'equal')}
            >Equal to the push holding it back</button>
            <button
              class:selected={transfer.ramp === 'stronger'}
              class:correct={transfer.ramp === 'stronger'}
              on:click={() => answerTransfer('ramp', 'stronger')}
            >Stronger than the push holding it back</button>
          </div>
        </div>

        <div class="policy-card synthesis-card">
          <div class="policy-icon" aria-hidden="true">5−2</div>
          <div class="policy-copy">
            <small>Control-room prediction</small>
            <strong>A left thruster pushes 5 units right while the opposite thruster pushes 2 units left. Predict the exact remaining push.</strong>
          </div>
          <div class="policy-options three">
            <button
              class:selected={transfer.resultant === '7-right'}
              class:wrong={transfer.resultant === '7-right'}
              on:click={() => answerTransfer('resultant', '7-right')}
            >7 units right</button>
            <button
              class:selected={transfer.resultant === '3-right'}
              class:correct={transfer.resultant === '3-right'}
              on:click={() => answerTransfer('resultant', '3-right')}
            >3 units right</button>
            <button
              class:selected={transfer.resultant === '3-left'}
              class:wrong={transfer.resultant === '3-left'}
              on:click={() => answerTransfer('resultant', '3-left')}
            >3 units left</button>
          </div>
        </div>

        <button class="primary" disabled={!transferReady} on:click={finishDiscovery}>
          {transferReady ? 'Reveal the physics' : 'Call both outcomes and calculate the remaining push'}
        </button>

      {:else if phase === 'reveal'}
        <div class="reveal">
          <div class="reveal-kicker">Two principles uncovered</div>
          <h2>You discovered balanced and resultant force.</h2>
          <p>You steered the cart before meeting the syllabus names for what you did.</p>

          <div class="law-reveals">
            <article>
              <div class="law-mark">= 0</div>
              <strong>Balanced forces</strong>
              <span>Equal, opposite pushes cancel. The resultant is zero, so the cart held still.</span>
            </article>
            <article>
              <div class="law-mark net">→</div>
              <strong>Resultant force</strong>
              <span>When one push wins, the difference is the resultant. The cart moves that way.</span>
            </article>
          </div>

          <div class="tie-back">
            When your thrusters matched, the cart stayed put — zero resultant. When one was bigger, the cart headed toward it. That difference is the net force.
          </div>

          <div class="arcade-result">
            <div class="rank-orb" class:s-rank={rank === 'S'}>{rank}</div>
            <div>
              <span>Mission score</span>
              <strong>{arcadeScore.toLocaleString()} points</strong>
              <small>{attempts} live runs · {transferMistakes} control-room {transferMistakes === 1 ? 'error' : 'errors'}</small>
            </div>
            <b>{rank === 'S' ? 'Master controller' : rank === 'A' ? 'Precision pilot' : rank === 'B' ? 'Dock qualified' : 'Mission complete'}</b>
          </div>

          <div class="insight-ladder">
            <strong>What you actually proved</strong>
            <span><b>Evidence:</b> equal pushes produced no change; unequal pushes produced a repeatable direction.</span>
            <span><b>Rule:</b> opposite forces subtract, so 5 right and 2 left leave a resultant of 3 right.</span>
            <span><b>Deeper build:</b> resultant force predicts acceleration, not motion by itself. Next, connect this difference to mass with <em>F = ma</em>.</span>
          </div>

          <div class="reward-panel">
            <div class="reward-top">
              <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
              <b>+{reward} W</b>
            </div>
            <div class="reward-skills">
              <span class:earned={steadyReady}>Evidence</span>
              <span class:earned={true}>Pattern</span>
              <span class:earned={transferReady}>Transfer</span>
              <span class:earned={!hintUsed}>Independent</span>
            </div>
            <small>Ws are awarded once. The distinction records how you reasoned—not how quickly you tapped.</small>
          </div>

          <div class="reveal-actions">
            <button class="primary" on:click={onExit}>Return to workshops</button>
            <button class="secondary" on:click={restart}>Play again</button>
          </div>
        </div>
      {/if}
    </section>
  {/key}
  </ArcadeShell>
</div>

<style>
  .solve-first { width: 100%; max-width: 720px; margin: 0 auto; color: var(--qx-text); }
  .phase { min-height: 520px; display: flex; flex-direction: column; }

  .brief { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .brief-hero {
    position: relative;
    width: 100%;
    min-height: 230px;
    overflow: hidden;
    border: 1px solid rgba(115, 148, 255, .45);
    border-radius: 18px;
    margin: 0 0 18px;
    background:
      linear-gradient(180deg, rgba(5, 10, 32, .05), rgba(5, 10, 32, .55)),
      url('/images/games/stop-the-cart-dock-v1.webp') center 58% / cover;
    box-shadow: 0 18px 40px rgba(10, 16, 42, .22);
  }
  .brief-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 72%, rgba(76, 111, 255, .25), transparent 35%);
    pointer-events: none;
  }
  .hero-kicker {
    position: absolute;
    top: 13px;
    left: 13px;
    z-index: 2;
    border: 1px solid rgba(255, 255, 255, .25);
    border-radius: 999px;
    padding: 6px 10px;
    background: rgba(7, 12, 35, .72);
    color: #dfe7ff;
    font-size: 8px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
    backdrop-filter: blur(7px);
  }
  .hero-alert {
    position: absolute;
    top: 13px;
    right: 13px;
    z-index: 2;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 155, 103, .8);
    border-radius: 50%;
    background: rgba(179, 54, 46, .82);
    color: #fff;
    font-size: 15px;
    font-weight: 950;
    box-shadow: 0 0 0 6px rgba(229, 107, 111, .15);
    animation: alertPulse 1.25s ease-in-out infinite;
  }
  .hero-cart {
    position: absolute;
    left: 50%;
    bottom: 36px;
    z-index: 2;
    width: 106px;
    height: 54px;
    transform: translateX(-50%);
    border: 2px solid rgba(255, 255, 255, .45);
    border-radius: 13px 13px 8px 8px;
    background: linear-gradient(135deg, #637fff, #3650ba);
    box-shadow: 0 14px 24px rgba(3, 8, 30, .48), inset 0 1px rgba(255, 255, 255, .35);
  }
  .hero-cart::before,
  .hero-cart::after {
    content: '';
    position: absolute;
    bottom: -10px;
    width: 20px;
    height: 20px;
    border: 3px solid #182044;
    border-radius: 50%;
    background: #7b88ad;
  }
  .hero-cart::before { left: 14px; }
  .hero-cart::after { right: 14px; }
  .hero-cargo {
    position: absolute;
    left: 23px;
    top: -28px;
    width: 58px;
    height: 34px;
    border: 2px solid #ffcc75;
    border-radius: 6px;
    background: linear-gradient(135deg, #f0a84d, #b86a2b);
    box-shadow: inset 0 1px rgba(255, 255, 255, .4);
  }
  .hero-cargo::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(82, 42, 21, .35);
  }
  .hero-flame {
    position: absolute;
    top: 21px;
    width: 42px;
    height: 12px;
    border-radius: 999px 20% 20% 999px;
    background: linear-gradient(90deg, transparent, #ff864e, #ffe18a);
    filter: drop-shadow(0 0 8px #ff8f57);
  }
  .hero-flame.left { right: 100%; }
  .hero-flame.right { left: 100%; transform: scaleX(-1); opacity: .4; }
  .micro-label, .section-title > span, .reveal-kicker { color: var(--qx-accent); font-size: 10px; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
  h2 { font-size: 25px; line-height: 1.1; margin: 7px 0 9px; font-weight: 950; }
  p { color: var(--qx-text-dim); font-size: 13.5px; line-height: 1.5; margin: 0; }
  .brief > p { max-width: 32ch; }
  .mission { margin: 20px 0 12px; text-align: left; width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-accent); border-radius: 14px; padding: 13px 14px; background: var(--qx-accent-soft); }
  .mission span { display: block; color: var(--qx-accent-text); font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .mission strong { display: block; color: var(--qx-text); margin-top: 4px; font-size: 14px; line-height: 1.4; }
  .brief-rules { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; margin-bottom: 19px; }
  .brief-rules span { border: 1px solid var(--qx-border); border-radius: 999px; padding: 5px 9px; font-size: 10px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface-2); }

  .primary, .secondary { min-height: 44px; width: 100%; border-radius: 999px; font-family: var(--qx-font); font-size: 14px; font-weight: 900; cursor: pointer; }
  .primary { border: none; background: linear-gradient(135deg, var(--qx-accent), color-mix(in srgb, var(--qx-accent) 65%, #25317d)); color: #fff; box-shadow: 0 10px 20px color-mix(in srgb, var(--qx-accent) 20%, transparent); }
  .primary:disabled { opacity: .42; cursor: not-allowed; }
  .secondary { border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); }
  .launch-primary { max-width: 360px; }

  .section-title { text-align: left; margin-bottom: 14px; }
  .section-title h2 { font-size: 22px; margin-bottom: 6px; }

  .stage {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    min-height: 250px;
    overflow: hidden;
    border: 1.5px solid rgba(99, 127, 255, .55);
    border-radius: 18px;
    background:
      linear-gradient(180deg, rgba(5, 9, 31, .05), rgba(5, 9, 31, .42)),
      url('/images/games/stop-the-cart-dock-v1.webp') center 60% / cover;
    display: grid;
    grid-template-columns: 70px 1fr 70px;
    align-items: end;
    gap: 4px;
    padding: 24px 14px 35px;
    margin-bottom: 10px;
    box-shadow: inset 0 -40px 50px rgba(5, 9, 31, .28), 0 14px 28px rgba(20, 28, 70, .14);
    isolation: isolate;
  }
  .stage.still { border-color: var(--qx-green); }
  .stage-vignette {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(circle at 50% 66%, transparent 25%, rgba(4, 8, 28, .36) 100%);
  }
  .dock-id {
    position: absolute;
    top: 11px;
    left: 12px;
    border: 1px solid rgba(255, 255, 255, .25);
    border-radius: 999px;
    padding: 5px 8px;
    background: rgba(6, 11, 34, .68);
    color: #e3e9ff;
    font-size: 8px;
    font-weight: 950;
    letter-spacing: .11em;
    backdrop-filter: blur(6px);
  }
  .thruster {
    align-self: center;
    height: 18px;
    border: 2px solid rgba(213, 225, 255, .75);
    border-radius: 6px;
    background: linear-gradient(180deg, #8497cb, #27335f);
    position: relative;
    box-shadow: 0 8px 16px rgba(3, 7, 24, .38);
  }
  .thruster::before {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(10px + var(--power) * 8px);
    height: calc(5px + var(--power) * 2px);
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(255, 229, 145, .95), rgba(255, 108, 65, .75), transparent);
    filter: drop-shadow(0 0 6px #ff814f);
    opacity: calc(.22 + var(--power) * .15);
  }
  .thruster.left::before { right: -4px; transform: translate(100%, -50%); }
  .thruster.right::before { left: -4px; transform: translate(-100%, -50%) scaleX(-1); }
  .track {
    position: relative;
    height: 128px;
    border-bottom: 5px solid rgba(146, 164, 216, .72);
    display: grid;
    place-items: end center;
  }
  .track::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -8px;
    left: 0;
    height: 2px;
    background: repeating-linear-gradient(90deg, #ffbe5b 0 18px, transparent 18px 30px);
    opacity: .85;
  }
  .bay {
    position: absolute;
    bottom: 5px;
    min-width: 42px;
    border: 1px solid rgba(217, 226, 255, .65);
    border-radius: 7px;
    padding: 4px 6px;
    background: rgba(6, 11, 34, .72);
    color: #dce5ff;
    font-size: 8px;
    font-weight: 950;
    letter-spacing: .06em;
    text-align: center;
    backdrop-filter: blur(5px);
  }
  .bay.left-bay { left: 0; }
  .bay.right-bay { right: 0; }
  .bay.hit {
    border-color: #72e59d;
    background: rgba(25, 111, 68, .82);
    color: #fff;
    box-shadow: 0 0 16px rgba(75, 222, 131, .5);
  }
  .cart {
    --shift: 0px;
    position: relative;
    width: 78px;
    height: 46px;
    z-index: 2;
    transform: translateX(var(--shift));
    border: 2px solid rgba(225, 234, 255, .8);
    border-radius: 11px 11px 7px 7px;
    background: linear-gradient(140deg, #6681ff, #334db4 70%);
    box-shadow: 0 12px 19px rgba(3, 7, 25, .48), inset 0 1px rgba(255, 255, 255, .35);
  }
  .cart.run-left,
  .cart.run-right { animation: cartLaunch .58s cubic-bezier(.18, .8, .25, 1); }
  .cart.run-still { animation: stableLock .5s ease; }
  .stage.still .cart {
    border-color: #8df0b1;
    background: linear-gradient(140deg, #3fcf7a, #197343);
    box-shadow: 0 0 20px rgba(69, 219, 128, .46);
  }
  .cargo {
    position: absolute;
    left: 17px;
    top: -28px;
    width: 43px;
    height: 31px;
    border: 2px solid #ffd38a;
    border-radius: 5px;
    background: linear-gradient(135deg, #efb45e, #a95d27);
  }
  .cargo::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: rgba(96, 48, 21, .35);
  }
  .cart b,
  .cart em {
    position: absolute;
    bottom: -11px;
    width: 18px;
    height: 18px;
    border: 3px solid #111934;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 35%, #9aa7cf 0 20%, #354064 22% 55%, #151b34 58%);
  }
  .cart b { left: 9px; }
  .cart em { right: 9px; }
  .nozzle {
    position: absolute;
    top: 14px;
    width: 8px;
    height: 18px;
    border-radius: 3px;
    background: #202b56;
  }
  .nozzle-left { right: 100%; }
  .nozzle-right { left: 100%; }
  .result-flash {
    position: absolute;
    top: 11px;
    right: 12px;
    border: 1px solid rgba(255, 255, 255, .28);
    border-radius: 8px;
    padding: 6px 9px;
    background: rgba(8, 13, 38, .78);
    color: #ffcf7a;
    font-size: 9px;
    font-weight: 950;
    letter-spacing: .08em;
    animation: resultPop .34s ease both;
    backdrop-filter: blur(6px);
  }
  .result-flash.perfect {
    border-color: #65e59a;
    color: #8ef0b3;
    box-shadow: 0 0 18px rgba(77, 224, 136, .3);
  }

  .readout { width: 100%; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center; padding: 9px 12px; border: 1px solid var(--qx-border); border-radius: 10px; background: linear-gradient(180deg, var(--qx-surface), var(--qx-surface-2)); margin-bottom: 10px; }
  .readout span { font-size: 9px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; color: var(--qx-text-faint); }
  .readout strong { font-size: 13px; color: var(--qx-text); text-transform: capitalize; }

  .controls { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
  .control { border: 1px solid var(--qx-border); border-radius: 13px; background: linear-gradient(180deg, var(--qx-surface), var(--qx-surface-2)); padding: 10px; display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 9px; align-items: center; text-align: left; }
  .control span { font-size: 10px; font-weight: 850; color: var(--qx-text-faint); text-transform: uppercase; letter-spacing: .05em; }
  .control strong { width: 35px; color: var(--qx-accent-text); font-size: 28px; font-weight: 950; font-variant-numeric: tabular-nums; text-align: center; }
  .control div { display: flex; gap: 8px; }
  .control button { width: 42px; height: 42px; border-radius: 11px; border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); font: 900 20px/1 var(--qx-font); cursor: pointer; box-shadow: 0 4px 10px rgba(17, 24, 58, .08); }
  .control button:disabled { opacity: .4; cursor: not-allowed; }

  .test-button { width: 100%; min-height: 48px; border-radius: 12px; border: none; background: linear-gradient(135deg, #151d43, #303b71); color: #fff; font-family: var(--qx-font); font-size: 13px; font-weight: 900; cursor: pointer; margin-bottom: 10px; box-shadow: 0 9px 20px rgba(17, 25, 64, .22); }

  .deliver-goals { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
  .deliver-goals div { display: flex; align-items: center; gap: 6px; border: 1.5px solid var(--qx-border); border-radius: 10px; padding: 9px 11px; background: var(--qx-surface-2); font-size: 11px; font-weight: 850; color: var(--qx-text-dim); }
  .deliver-goals div.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .deliver-goals b { font-size: 13px; }

  .nudge, .hint { border-radius: 10px; padding: 9px 11px; font-size: 11px; line-height: 1.4; margin-bottom: 7px; }
  .nudge { color: var(--qx-green-text); background: var(--qx-green-soft); }
  .hint { color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .hint-link { border: none; background: none; color: var(--qx-text-faint); font-family: var(--qx-font); font-size: 11px; font-weight: 800; cursor: pointer; margin: 0 auto 8px; min-height: 30px; }

  .policy-card { display: grid; grid-template-columns: 42px 1fr; gap: 10px; border: 1.5px solid var(--qx-border); border-radius: 14px; padding: 12px; margin-bottom: 10px; background: var(--qx-surface-2); }
  .policy-icon { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; background: var(--qx-text); color: var(--qx-bg); font-size: 18px; font-weight: 950; }
  .policy-copy { display: flex; flex-direction: column; }
  .policy-copy small { color: var(--qx-accent); font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: .07em; }
  .policy-copy strong { font-size: 12px; line-height: 1.38; margin-top: 3px; }
  .policy-options { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .policy-options button { min-height: 46px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text-dim); font: 800 10.5px/1.25 var(--qx-font); padding: 7px; cursor: pointer; }
  .policy-options button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .policy-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .policy-options.three { grid-template-columns: repeat(3, 1fr); }
  .synthesis-card { border-color: var(--qx-accent); }

  .reveal { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .reveal h2 { font-size: 21px; }
  .law-reveals { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 15px 0 10px; }
  .law-reveals article { border: 1.5px solid var(--qx-border); border-radius: 14px; padding: 11px 9px; background: var(--qx-surface-2); display: flex; flex-direction: column; align-items: center; }
  .law-mark { width: 66px; height: 46px; border: 2px solid var(--qx-green); border-radius: 14px; display: grid; place-items: center; background: var(--qx-green-soft); color: var(--qx-green-text); font-size: 18px; font-weight: 950; }
  .law-mark.net { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .law-reveals article > strong { font-size: 12px; margin-top: 7px; }
  .law-reveals article > span { color: var(--qx-text-dim); font-size: 9.5px; line-height: 1.35; margin-top: 3px; min-height: 40px; }
  .tie-back { width: 100%; box-sizing: border-box; border: 1px solid var(--qx-border); border-radius: 12px; padding: 11px 13px; background: var(--qx-surface); color: var(--qx-text-dim); font-size: 11.5px; line-height: 1.5; text-align: left; margin-bottom: 13px; }
  .arcade-result {
    width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr) auto;
    align-items: center;
    gap: 11px;
    border: 1px solid rgba(99, 127, 255, .45);
    border-radius: 15px;
    padding: 12px;
    margin-bottom: 13px;
    background:
      radial-gradient(circle at 10% 30%, rgba(76, 111, 255, .16), transparent 34%),
      linear-gradient(135deg, var(--qx-surface), var(--qx-surface-2));
    text-align: left;
  }
  .rank-orb {
    width: 54px;
    height: 54px;
    display: grid;
    place-items: center;
    border: 2px solid var(--qx-accent);
    border-radius: 17px;
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
    font-size: 27px;
    font-weight: 1000;
    box-shadow: 0 8px 18px rgba(76, 111, 255, .17);
  }
  .rank-orb.s-rank {
    border-color: var(--qx-yellow);
    background: var(--qx-yellow-soft);
    color: var(--qx-yellow-text);
    box-shadow: 0 0 22px color-mix(in srgb, var(--qx-yellow) 35%, transparent);
  }
  .arcade-result > div:nth-child(2) { min-width: 0; display: flex; flex-direction: column; }
  .arcade-result span { color: var(--qx-text-faint); font-size: 8px; font-weight: 900; letter-spacing: .09em; text-transform: uppercase; }
  .arcade-result strong { color: var(--qx-text); font-size: 16px; font-weight: 950; }
  .arcade-result small { color: var(--qx-text-dim); font-size: 9px; }
  .arcade-result > b { max-width: 90px; color: var(--qx-accent-text); font-size: 10px; line-height: 1.25; text-align: right; }
  .insight-ladder { width: 100%; box-sizing: border-box; display: grid; gap: 7px; border: 1.5px solid var(--qx-accent); border-radius: 12px; padding: 11px 12px; margin-bottom: 13px; background: var(--qx-accent-soft); text-align: left; }
  .insight-ladder > strong { color: var(--qx-accent-text); font-size: 12px; }
  .insight-ladder span { color: var(--qx-text-dim); font-size: 10.5px; line-height: 1.4; }
  .insight-ladder b { color: var(--qx-text); }

  .reward-panel { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-green); border-radius: 14px; background: var(--qx-green-soft); padding: 12px; text-align: left; margin-bottom: 13px; }
  .reward-top { display: flex; justify-content: space-between; align-items: center; }
  .reward-top div { display: flex; flex-direction: column; }
  .reward-top span { font-size: 9px; color: var(--qx-green-text); font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .reward-top strong { font-size: 15px; color: var(--qx-text); }
  .reward-top b { color: var(--qx-green-text); font-size: 21px; }
  .reward-skills { display: flex; gap: 5px; flex-wrap: wrap; margin: 10px 0 7px; }
  .reward-skills span { border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text-faint); border-radius: 999px; padding: 4px 8px; font-size: 9px; font-weight: 850; }
  .reward-skills span.earned { color: var(--qx-green-text); border-color: var(--qx-green); }
  .reward-panel small { color: var(--qx-text-dim); font-size: 9.5px; line-height: 1.35; display: block; }
  .reveal-actions { width: 100%; display: grid; gap: 7px; }

  @keyframes cartLaunch {
    0% { transform: translateX(0) scale(.96); filter: brightness(1.25); }
    64% { transform: translateX(var(--shift)) scale(1.03); }
    100% { transform: translateX(var(--shift)) scale(1); filter: brightness(1); }
  }
  @keyframes stableLock {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    50% { transform: translateX(4px); }
    75% { transform: translateX(-2px); }
  }
  @keyframes resultPop {
    from { opacity: 0; transform: translateY(-5px) scale(.92); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes alertPulse {
    50% { box-shadow: 0 0 0 10px rgba(229, 107, 111, 0); transform: scale(1.06); }
  }

  @media (max-width: 560px) {
    .controls { grid-template-columns: 1fr; }
    .stage { grid-template-columns: 44px 1fr 44px; min-height: 224px; padding-right: 8px; padding-left: 8px; }
    .thruster { height: 15px; }
    .arcade-result { grid-template-columns: 52px minmax(0, 1fr); }
    .arcade-result > b { grid-column: 2; max-width: none; text-align: left; }
  }

  @media (max-width: 360px) {
    .solve-first { max-width: 100%; }
    .phase { min-height: 460px; }
    .brief-hero { min-height: 195px; }
    .stage { grid-template-columns: 34px 1fr 34px; min-height: 210px; }
    .bay { min-width: 34px; font-size: 7px; padding-right: 3px; padding-left: 3px; }
    h2 { font-size: 22px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .cart, .hero-alert, .result-flash { animation: none; }
  }
</style>
