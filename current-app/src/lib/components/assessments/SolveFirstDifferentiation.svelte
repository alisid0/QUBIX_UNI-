<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SolveFirstPause from './SolveFirstPause.svelte';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const VALVES = [100, 200, 300];
  const SHIFTS = [
    { label: 'School run', demand: 80 },
    { label: 'Morning rush', demand: 160 },
    { label: 'Lunch queue', demand: 240 },
    { label: 'Evening lull', demand: 120 }
  ];
  const DELIVERY_OPTIONS = [0, 80, 120, 160, 240, 320];
  const PHASES = ['calibrate', 'compare', 'game', 'transfer', 'reveal'];

  let phase = 'brief';
  let reducedMotion = false;
  let hintUsed = false;
  let activeHint = '';
  let recorded = false;

  let valve = 100;
  let tankLevel = 400;
  let fillRuns = [];

  let steadySamples = [];
  let surgeSamples = [];
  let comparePick = '';
  let compareMistakes = 0;

  let stationLevel = 550;
  let shiftIndex = 0;
  let deliveryRate = 80;
  let shiftLog = [];
  let gameMistakes = 0;
  let gameMessage = '';
  let pendingShift = null;

  let transferPick = '';
  let transferMistakes = 0;

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  $: phaseIndex = phase === 'brief' ? 0 : PHASES.indexOf(phase) + 1;
  $: testedValves = new Set(fillRuns.map((run) => run.rate));
  $: calibrationReady = testedValves.size === VALVES.length && tankLevel === 1000;
  $: steadyReady = steadySamples.length === 3;
  $: surgeReady = surgeSamples.length === 3;
  $: compareReady = steadyReady && surgeReady && comparePick === 'surge';
  $: gameReady = shiftIndex === SHIFTS.length;
  $: transferReady = transferPick === '30';
  $: transferFirstTry = transferReady && transferMistakes === 0 && gameMistakes === 0;
  $: evidenceScore = testedValves.size === 3 && steadyReady && surgeReady ? 4 : 3;
  $: reward = Math.min(15, 6 + evidenceScore + (transferFirstTry ? 3 : 1) + (hintUsed ? 0 : 2));
  $: currentShift = SHIFTS[Math.min(shiftIndex, SHIFTS.length - 1)];
  $: tankPercent = Math.round((tankLevel / 1200) * 100);
  $: stationPercent = Math.round((stationLevel / 1000) * 100);

  function runFill() {
    const before = tankLevel;
    const after = Math.min(1200, before + valve);
    tankLevel = after;
    fillRuns = [...fillRuns, { rate: valve, before, after, change: after - before }];
  }

  function resetCalibration() {
    tankLevel = 400;
    fillRuns = [];
  }

  function sampleTank(kind, minute, volume) {
    if (kind === 'steady' && !steadySamples.some((sample) => sample.minute === minute)) {
      steadySamples = [...steadySamples, { minute, volume }].sort((a, b) => a.minute - b.minute);
    }
    if (kind === 'surge' && !surgeSamples.some((sample) => sample.minute === minute)) {
      surgeSamples = [...surgeSamples, { minute, volume }].sort((a, b) => a.minute - b.minute);
    }
  }

  function pickComparison(value) {
    if (value !== 'surge') compareMistakes += 1;
    comparePick = value;
  }

  function runShift() {
    if (gameReady || pendingShift) return;
    const shift = SHIFTS[shiftIndex];
    const change = (deliveryRate - shift.demand) * 2;
    const projected = stationLevel + change;

    if (projected < 350 || projected > 750) {
      gameMistakes += 1;
      gameMessage = projected < 350
        ? `That plan would leave only ${projected} L. Increase the delivery rate before advancing.`
        : `That plan would raise the tank to ${projected} L. Ease the delivery valve before advancing.`;
      return;
    }

    const result = {
      label: shift.label,
      demand: shift.demand,
      delivery: deliveryRate,
      change,
      after: projected
    };
    shiftLog = [...shiftLog, result];
    stationLevel = projected;
    pendingShift = result;
    gameMessage = change === 0
      ? 'Balanced: fuel entered as fast as customers drew it out.'
      : `Safe. The tank changed by ${change > 0 ? '+' : ''}${change} L over two minutes.`;
  }

  function continueShift() {
    if (!pendingShift) return;
    shiftIndex += 1;
    pendingShift = null;
    if (shiftIndex < SHIFTS.length) deliveryRate = SHIFTS[shiftIndex].demand;
  }

  function pickTransfer(value) {
    if (value !== '30') transferMistakes += 1;
    transferPick = value;
  }

  function showHint(key) {
    hintUsed = true;
    activeHint = activeHint === key ? '' : key;
  }

  function finishDiscovery() {
    if (!transferReady) return;
    phase = 'reveal';
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id,
        reward,
        evidenceCount: fillRuns.length + steadySamples.length + surgeSamples.length + shiftLog.length,
        patternFound: true,
        compared: true,
        transferFirstTry,
        usedHint: hintUsed
      });
    }
  }

  function restart() {
    phase = 'brief';
    hintUsed = false;
    activeHint = '';
    recorded = false;
    valve = 100;
    tankLevel = 400;
    fillRuns = [];
    steadySamples = [];
    surgeSamples = [];
    comparePick = '';
    compareMistakes = 0;
    stationLevel = 550;
    shiftIndex = 0;
    deliveryRate = 80;
    shiftLog = [];
    gameMistakes = 0;
    gameMessage = '';
    pendingShift = null;
    transferPick = '';
    transferMistakes = 0;
  }
</script>

<div class="solve-first">
  <header class="mode-head">
    <button class="exit" on:click={onExit} aria-label="Return to all workshops">←</button>
    <div><span>{config.eyebrow}</span><strong>Solve First</strong></div>
    <div class="phase-count">{phaseIndex}/5</div>
  </header>

  <div class="phase-line" aria-label="Discovery progress">
    {#each PHASES as item, i}
      <span class:active={phase === item} class:done={phaseIndex > i + 1}></span>
    {/each}
  </div>

  {#key phase}
    <section
      class="phase"
      in:fly={{ x: reducedMotion ? 0 : 24, duration: reducedMotion ? 0 : 220 }}
      out:fade={{ duration: reducedMotion ? 0 : 80 }}
    >
      {#if phase === 'brief'}
        <div class="brief">
          <div class="station-mark" aria-hidden="true">
            <div class="canopy"></div><div class="pump"></div><div class="hose"></div>
          </div>
          <div class="micro-label">Night shift · Low fuel warning</div>
          <h2>Run the Forecourt</h2>
          <p>The underground tank is low. A tanker is connected, customers keep arriving, and the station must not run dry or overflow.</p>
          <div class="mission">
            <span>Your mission</span>
            <strong>Learn what each valve setting does, read a changing flow, then balance deliveries against customer demand.</strong>
          </div>
          <div class="brief-rules">
            <span>Every test leaves evidence</span>
            <span>Bad plans can be revised</span>
            <span>The mathematics comes last</span>
          </div>
          <button class="primary" on:click={() => phase = 'calibrate'}>Connect the tanker</button>
        </div>

      {:else if phase === 'calibrate'}
        <div class="section-title">
          <span>Investigation 01 · Calibrate</span>
          <h2>Fill to exactly 1,000 litres</h2>
          <p>Choose a valve, pump for one minute, and test all three settings. Watch the change, not only the final level.</p>
        </div>

        <div class="tank-stage">
          <div class="tank" aria-label={`Underground tank ${tankPercent}% full`}>
            <div class="fuel" style={`height:${tankPercent}%`}></div>
            <span>{tankLevel} L</span>
          </div>
          <div class="target-line"><span>target · 1,000 L</span></div>
        </div>

        <div class="valve-picker" aria-label="Tanker valve setting">
          {#each VALVES as rate}
            <button class:active={valve === rate} class:tested={testedValves.has(rate)} on:click={() => valve = rate}>
              <span>{rate}</span><small>L per minute</small>
            </button>
          {/each}
        </div>

        <button class="pump-action" on:click={runFill} disabled={tankLevel >= 1200}>Pump for 1 minute</button>

        <div class="evidence-strip">
          {#if fillRuns.length}
            {#each fillRuns.slice(-3) as run}
              <span>{run.before} → {run.after} <b>+{run.change} L</b></span>
            {/each}
          {:else}
            <small>No readings yet. Run the first one-minute test.</small>
          {/if}
        </div>

        {#if tankLevel > 1000}
          <div class="error-note">The tank is above the target. Reset it, then use the readings you collected to plan the next run.</div>
          <button class="reset-link reset-visible" on:click={resetCalibration}>Reset tank to 400 L</button>
        {:else if tankLevel !== 1000 && testedValves.size === 3}
          <button class="reset-link reset-visible" on:click={resetCalibration}>Reset the tank and use your evidence</button>
        {/if}
        {#if calibrationReady}<div class="success-note">Target hit. Each valve number predicted the one-minute change.</div>{/if}
        <button class="primary" disabled={!calibrationReady} on:click={() => phase = 'compare'}>
          {calibrationReady ? 'Calibration secured · Compare two tanks' : `Test ${3 - testedValves.size} more setting${testedValves.size === 2 ? '' : 's'} and hit 1,000 L`}
        </button>

      {:else if phase === 'compare'}
        <div class="section-title">
          <span>Investigation 02 · Changing flow</span>
          <h2>Which tanker is speeding up?</h2>
          <p>Both tanks gain fuel. Reveal the readings around minute 5 and compare the changes between them.</p>
        </div>

        <div class="comparison-grid">
          <div class="reading-card">
            <div class="reading-head"><span>Tanker A</span><strong>Steady valve</strong></div>
            <div class="sample-row">
              {#each [{m: 4, v: 1000}, {m: 5, v: 1100}, {m: 6, v: 1200}] as sample}
                <button class:sampled={steadySamples.some((item) => item.minute === sample.m)} on:click={() => sampleTank('steady', sample.m, sample.v)}>
                  <span>{sample.m} min</span>
                  <strong>{steadySamples.some((item) => item.minute === sample.m) ? `${sample.v} L` : 'sample'}</strong>
                </button>
              {/each}
            </div>
            {#if steadyReady}<small>+100 L, then +100 L</small>{/if}
          </div>

          <div class="reading-card surge">
            <div class="reading-head"><span>Tanker B</span><strong>Opening valve</strong></div>
            <div class="sample-row">
              {#each [{m: 4, v: 1000}, {m: 5, v: 1090}, {m: 6, v: 1200}] as sample}
                <button class:sampled={surgeSamples.some((item) => item.minute === sample.m)} on:click={() => sampleTank('surge', sample.m, sample.v)}>
                  <span>{sample.m} min</span>
                  <strong>{surgeSamples.some((item) => item.minute === sample.m) ? `${sample.v} L` : 'sample'}</strong>
                </button>
              {/each}
            </div>
            {#if surgeReady}<small>+90 L, then +110 L</small>{/if}
          </div>
        </div>

        {#if steadyReady && surgeReady}
          <div class="decision">
            <strong>Which tank has an increasing fill rate?</strong>
            <div>
              <button class:wrong={comparePick === 'steady'} on:click={() => pickComparison('steady')}>Tanker A</button>
              <button class:correct={comparePick === 'surge'} on:click={() => pickComparison('surge')}>Tanker B</button>
            </div>
            {#if comparePick === 'steady'}<small>A adds the same 100 L each minute. Its rate is steady.</small>{/if}
            {#if comparePick === 'surge'}<small class="ok">Yes. B adds 90 L, then 110 L: the rate is increasing.</small>{/if}
          </div>
        {/if}

        <button class="hint-link" on:click={() => showHint('compare')}>{activeHint === 'compare' ? 'Hide clue' : 'Need a clue?'}</button>
        {#if activeHint === 'compare'}<div class="hint">Subtract consecutive tank readings. A changing amount added each minute means a changing fill rate.</div>{/if}
        <button class="primary" disabled={!compareReady} on:click={() => phase = 'game'}>
          {compareReady ? 'Pattern found · Open the station' : 'Reveal all six readings and choose'}
        </button>

      {:else if phase === 'game'}
        <div class="section-title">
          <span>Control game · Four shifts</span>
          <h2>Keep the forecourt running</h2>
          <p>Each shift lasts two minutes. Match the tanker delivery to customer demand so the tank stays in its safe band.</p>
        </div>

        <div class="game-board">
          <div class="game-status">
            <div><span>{gameReady ? 'Shift complete' : currentShift.label}</span><strong>{gameReady ? 'Station secure' : `${currentShift.demand} L/min going out`}</strong></div>
            <b>{shiftIndex}/4</b>
          </div>
          <div class="horizontal-tank">
            <div class="safe-band"></div>
            <div class="horizontal-fuel" style={`width:${stationPercent}%`}></div>
            <span>{stationLevel} L</span>
          </div>
          <div class="band-labels"><span>350 L minimum</span><span>750 L maximum</span></div>

          {#if !gameReady}
            <label for="delivery-rate">Tanker delivery rate</label>
            <select id="delivery-rate" bind:value={deliveryRate} disabled={!!pendingShift}>
              {#each DELIVERY_OPTIONS as rate}<option value={rate}>{rate} L/min in</option>{/each}
            </select>
            <div class="live-equation">
              <span>Tank change each minute</span>
              <strong class:negative={deliveryRate - currentShift.demand < 0}>
                {deliveryRate} − {currentShift.demand} = {deliveryRate - currentShift.demand > 0 ? '+' : ''}{deliveryRate - currentShift.demand} L/min
              </strong>
            </div>
            <button class="pump-action" on:click={runShift} disabled={!!pendingShift}>Advance 2 minutes</button>
          {/if}
        </div>

        {#if gameMessage}<div class:success-note={gameReady || shiftLog.length} class:error-note={gameMessage.includes('would')}>{gameMessage}</div>{/if}

        {#if pendingShift}
          <SolveFirstPause
            title={`${pendingShift.label}: tank ${pendingShift.change === 0 ? 'held steady' : pendingShift.change > 0 ? 'rose' : 'fell'}`}
            message={`Delivery was ${pendingShift.delivery} L/min and demand was ${pendingShift.demand} L/min. Their difference was ${pendingShift.change / 2} L/min, producing a ${pendingShift.change > 0 ? '+' : ''}${pendingShift.change} L change over two minutes.`}
            actionLabel={shiftIndex < SHIFTS.length - 1 ? 'Continue to the next shift' : 'Review the completed forecourt'}
            onContinue={continueShift}
          />
        {/if}

        {#if shiftLog.length}
          <div class="shift-log" aria-label="Completed shifts">
            {#each shiftLog as run}
              <span><b>{run.label}</b><small>{run.change > 0 ? '+' : ''}{run.change} L · tank {run.after} L</small></span>
            {/each}
          </div>
        {/if}

        <button class="primary" disabled={!gameReady} on:click={() => phase = 'transfer'}>
          {gameReady ? 'Forecourt saved · Transfer the rule' : `Complete ${4 - shiftIndex} more shift${shiftIndex === 3 ? '' : 's'}`}
        </button>

      {:else if phase === 'transfer'}
        <div class="section-title">
          <span>Transfer · Water tower</span>
          <h2>Read the rate in a new system</h2>
          <p>A town water tower rises from 480 L to 600 L in four minutes. The control room needs its average inflow rate.</p>
        </div>

        <div class="transfer-scene">
          <div class="tower"><div class="water"></div><strong>480 L</strong><small>start</small></div>
          <div class="transfer-arrow"><span>4 minutes</span><b>→</b></div>
          <div class="tower fuller"><div class="water"></div><strong>600 L</strong><small>end</small></div>
        </div>

        <div class="calculation"><span>change in amount ÷ change in time</span><strong>(600 − 480) ÷ 4</strong></div>
        <div class="decision">
          <strong>What rate should the operator report?</strong>
          <div class="three">
            {#each ['20', '30', '120'] as value}
              <button class:correct={transferPick === value && value === '30'} class:wrong={transferPick === value && value !== '30'} on:click={() => pickTransfer(value)}>{value} L/min</button>
            {/each}
          </div>
          {#if transferPick && transferPick !== '30'}<small>120 litres is the total change. Divide it across the four minutes.</small>{/if}
          {#if transferPick === '30'}<small class="ok">Correct. The level changed at 30 litres per minute.</small>{/if}
        </div>

        <button class="primary" disabled={!transferReady} on:click={finishDiscovery}>
          {transferReady ? 'Reveal the mathematics' : 'Calculate the water flow'}
        </button>

      {:else if phase === 'reveal'}
        <div class="reveal">
          <div class="reveal-kicker">The control rule has a name</div>
          <h2>You used a derivative.</h2>
          <p>A derivative measures how fast one quantity changes as another quantity changes.</p>

          <div class="formula">
            <span>Your underground tank</span>
            <strong>dV/dt = inflow − outflow</strong>
            <small>Volume V changes over time t. The units are litres per minute.</small>
          </div>

          <div class="slope-card" aria-label="Tank volume graph with a tangent showing the rate at minute five">
            <div class="axis-y">volume</div>
            <div class="curve"></div>
            <div class="tangent"></div>
            <div class="point"></div>
            <div class="axis-x">time</div>
            <span>rate now = slope here</span>
          </div>

          <ul class="reveal-list">
            <li><strong>Rate:</strong> your valve setting told you how many litres the tank gained per minute.</li>
            <li><strong>Positive and negative:</strong> the level rose when inflow won and fell when customers drew fuel faster.</li>
            <li><strong>Changing rate:</strong> Tanker B gained 90 L, then 110 L, so its graph became steeper.</li>
            <li><strong>Derivative:</strong> dV/dt is the instantaneous slope of the volume-against-time graph.</li>
          </ul>

          <div class="reward-panel">
            <div class="reward-top">
              <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
              <b>+{reward} W</b>
            </div>
            <div class="reward-skills">
              <span class:earned={calibrationReady && steadyReady && surgeReady}>Evidence</span>
              <span class:earned={true}>Pattern</span>
              <span class:earned={transferReady}>Transfer</span>
              <span class:earned={!hintUsed}>Independent</span>
            </div>
            <small>Ws are awarded once. This distinction records control of a changing rate, not speed.</small>
          </div>

          <div class="reveal-actions">
            <button class="primary" on:click={onExit}>Return to workshops</button>
            <button class="secondary" on:click={restart}>Play again</button>
          </div>
        </div>
      {/if}
    </section>
  {/key}
</div>

<style>
  .solve-first { width: 100%; max-width: 430px; min-width: 0; margin: 0 auto; color: var(--qx-text); }
  .solve-first * { min-width: 0; }
  .mode-head { display: grid; grid-template-columns: 38px 1fr auto; gap: 10px; align-items: center; margin-bottom: 11px; }
  .exit { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid var(--qx-border); background: var(--qx-surface-2); color: var(--qx-text); font-size: 17px; cursor: pointer; }
  .mode-head div:nth-child(2) { display: flex; flex-direction: column; }
  .mode-head span { color: var(--qx-accent); font-size: 9px; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
  .mode-head strong { font-size: 17px; font-weight: 900; }
  .phase-count { color: var(--qx-text-faint); font-size: 11px; font-weight: 900; font-variant-numeric: tabular-nums; }
  .phase-line { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; margin-bottom: 18px; }
  .phase-line span { height: 4px; border-radius: 4px; background: var(--qx-surface-3); }
  .phase-line span.active { background: var(--qx-accent); }
  .phase-line span.done { background: var(--qx-green); }
  .phase { min-height: 450px; display: flex; flex-direction: column; gap: 11px; }

  .brief, .reveal { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 11px; }
  .station-mark { width: 116px; height: 86px; margin: 6px 0 8px; position: relative; }
  .canopy { position: absolute; left: 5px; right: 5px; top: 7px; height: 14px; border-radius: 6px 6px 2px 2px; background: var(--qx-accent); box-shadow: 0 5px 0 var(--qx-accent-soft); }
  .canopy::before, .canopy::after { content: ''; position: absolute; top: 14px; width: 6px; height: 55px; border-radius: 3px; background: var(--qx-text-faint); }
  .canopy::before { left: 9px; } .canopy::after { right: 9px; }
  .pump { position: absolute; left: 42px; top: 29px; width: 32px; height: 49px; border: 3px solid var(--qx-text); border-radius: 6px; background: var(--qx-surface-2); }
  .pump::before { content: ''; position: absolute; left: 5px; top: 6px; width: 17px; height: 13px; border-radius: 2px; background: var(--qx-green-soft); border: 1px solid var(--qx-green); }
  .hose { position: absolute; right: 26px; top: 43px; width: 18px; height: 30px; border-right: 3px solid var(--qx-pink); border-bottom: 3px solid var(--qx-pink); border-radius: 0 0 12px 0; }
  .micro-label, .section-title > span, .reveal-kicker { color: var(--qx-accent); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  h2 { font-size: 24px; line-height: 1.15; margin: 0; font-weight: 950; }
  p { color: var(--qx-text-dim); font-size: 13.5px; line-height: 1.5; margin: 0; }
  .brief > p { max-width: 35ch; }
  .mission { margin: 7px 0 0; text-align: left; width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-accent); border-radius: 14px; padding: 13px 14px; background: var(--qx-accent-soft); }
  .mission span { display: block; color: var(--qx-accent-text); font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .mission strong { display: block; color: var(--qx-text); margin-top: 4px; font-size: 14px; line-height: 1.4; }
  .brief-rules { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; margin-bottom: 6px; }
  .brief-rules span { border: 1px solid var(--qx-border); border-radius: 999px; padding: 5px 9px; font-size: 10px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface-2); }
  .section-title { text-align: left; }
  .section-title h2 { font-size: 21px; margin: 6px 0; }

  .primary, .secondary, .pump-action { min-height: 46px; width: 100%; border-radius: 999px; font-family: var(--qx-font); font-size: 14px; font-weight: 900; cursor: pointer; }
  .primary { border: none; background: var(--qx-accent); color: var(--qx-bg); }
  .primary:disabled, .pump-action:disabled { opacity: .42; cursor: not-allowed; }
  .secondary { border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim); }
  .pump-action { border: none; background: var(--qx-text); color: var(--qx-bg); }

  .tank-stage { position: relative; height: 178px; display: grid; place-items: end center; border-radius: 16px; background: linear-gradient(var(--qx-surface-2), var(--qx-surface)); overflow: hidden; }
  .tank { position: relative; width: 150px; height: 132px; border: 4px solid var(--qx-text); border-radius: 46px 46px 20px 20px; overflow: hidden; background: var(--qx-surface-3); z-index: 1; }
  .fuel { position: absolute; left: 0; right: 0; bottom: 0; background: var(--qx-yellow); transition: height .45s ease; opacity: .9; }
  .tank > span { position: absolute; inset: 0; display: grid; place-items: center; font-size: 20px; font-weight: 950; color: var(--qx-text); text-shadow: 0 1px 8px var(--qx-bg); z-index: 1; }
  .target-line { position: absolute; left: 12px; right: 12px; bottom: 112px; border-top: 2px dashed var(--qx-green); z-index: 2; }
  .target-line span { float: right; margin-top: -18px; color: var(--qx-green-text); font-size: 9px; font-weight: 900; text-transform: uppercase; }
  .valve-picker { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  .valve-picker button { min-height: 58px; border: 1.5px solid var(--qx-border); border-radius: 11px; background: var(--qx-surface); color: var(--qx-text); display: grid; place-items: center; padding: 6px; font-family: var(--qx-font); cursor: pointer; }
  .valve-picker button.active { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .valve-picker button.tested::after { content: 'tested'; color: var(--qx-green-text); font-size: 8px; font-weight: 900; text-transform: uppercase; }
  .valve-picker span { font-size: 17px; font-weight: 950; }
  .valve-picker small { font-size: 8px; color: var(--qx-text-dim); }
  .evidence-strip { display: flex; flex-wrap: wrap; gap: 5px; min-height: 34px; }
  .evidence-strip > span { flex: 0 0 auto; border: 1px solid var(--qx-border); border-radius: 8px; padding: 7px 8px; background: var(--qx-surface-2); font-size: 9px; color: var(--qx-text-dim); }
  .evidence-strip b { color: var(--qx-green-text); }
  .evidence-strip > small { margin: auto; color: var(--qx-text-faint); }
  .reset-link, .hint-link { border: none; background: none; color: var(--qx-text-faint); font-family: var(--qx-font); font-size: 11px; font-weight: 800; cursor: pointer; min-height: 32px; }
  .reset-visible { width: 100%; min-height: 44px; border: 1.5px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text); }
  .success-note, .error-note { border-radius: 10px; padding: 9px 11px; font-size: 11px; line-height: 1.4; }
  .success-note { color: var(--qx-green-text); background: var(--qx-green-soft); }
  .error-note { color: var(--qx-danger-text); background: var(--qx-danger-soft); }

  .comparison-grid { display: grid; gap: 9px; }
  .reading-card { border: 1.5px solid var(--qx-border); border-radius: 13px; padding: 11px; background: var(--qx-surface-2); }
  .reading-card.surge { border-color: var(--qx-pink); }
  .reading-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 9px; }
  .reading-head span { color: var(--qx-accent-text); font-size: 9px; font-weight: 900; text-transform: uppercase; }
  .reading-head strong { font-size: 12px; }
  .sample-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .sample-row button { min-height: 56px; border: 1px solid var(--qx-border); border-radius: 9px; background: var(--qx-surface); color: var(--qx-text); display: grid; gap: 2px; place-items: center; font-family: var(--qx-font); cursor: pointer; }
  .sample-row button.sampled { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .sample-row span { font-size: 9px; color: var(--qx-text-faint); }
  .sample-row strong { font-size: 12px; }
  .reading-card > small { display: block; margin-top: 7px; text-align: center; color: var(--qx-text-dim); font-weight: 850; }
  .decision { border: 1.5px solid var(--qx-border); border-radius: 12px; padding: 11px; background: var(--qx-surface-2); display: grid; gap: 9px; }
  .decision > strong { font-size: 12px; line-height: 1.4; }
  .decision > div { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .decision > div.three { grid-template-columns: repeat(3, 1fr); }
  .decision button { min-height: 44px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); font: 900 11px/1.25 var(--qx-font); padding: 7px; cursor: pointer; }
  .decision button.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .decision button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .decision small { color: var(--qx-danger-text); font-size: 10.5px; line-height: 1.4; }
  .decision small.ok { color: var(--qx-green-text); }
  .hint-link { margin: 0 auto; }
  .hint { border-radius: 10px; padding: 9px 11px; color: var(--qx-accent-text); background: var(--qx-accent-soft); font-size: 11px; line-height: 1.4; }

  .game-board { border: 1.5px solid var(--qx-border); border-radius: 15px; padding: 12px; background: var(--qx-surface-2); display: grid; gap: 10px; }
  .game-status { display: flex; justify-content: space-between; align-items: center; }
  .game-status > div { display: grid; gap: 2px; }
  .game-status span, .game-board label { color: var(--qx-accent-text); font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .06em; }
  .game-status strong { font-size: 14px; }
  .game-status b { font-size: 18px; color: var(--qx-green-text); }
  .horizontal-tank { height: 62px; position: relative; overflow: hidden; border: 3px solid var(--qx-text); border-radius: 14px; background: var(--qx-surface-3); }
  .horizontal-fuel { position: absolute; inset: 0 auto 0 0; background: var(--qx-yellow); opacity: .9; transition: width .45s ease; }
  .safe-band { position: absolute; left: 35%; width: 40%; inset-block: 0; border-inline: 2px dashed var(--qx-green); background: var(--qx-green-soft); z-index: 1; }
  .horizontal-tank > span { position: absolute; inset: 0; display: grid; place-items: center; font-size: 18px; font-weight: 950; z-index: 2; text-shadow: 0 1px 8px var(--qx-bg); }
  .band-labels { display: flex; justify-content: space-between; color: var(--qx-text-faint); font-size: 8px; font-weight: 850; }
  .game-board select { min-height: 46px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text); padding: 0 12px; font: 850 13px var(--qx-font); }
  .live-equation { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 10px; align-items: center; padding: 9px; border-radius: 9px; background: var(--qx-surface); }
  .live-equation span { font-size: 9px; color: var(--qx-text-faint); }
  .live-equation strong { font-size: 11px; color: var(--qx-green-text); text-align: right; }
  .live-equation strong.negative { color: var(--qx-pink-text); }
  .shift-log { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .shift-log > span { display: grid; gap: 2px; border: 1px solid var(--qx-border); border-radius: 8px; padding: 7px; background: var(--qx-surface); }
  .shift-log b { font-size: 9px; }
  .shift-log small { font-size: 8px; color: var(--qx-text-dim); }

  .transfer-scene { display: grid; grid-template-columns: 1fr 80px 1fr; align-items: end; gap: 8px; padding: 13px; border-radius: 15px; background: var(--qx-surface-2); }
  .tower { position: relative; height: 150px; border: 3px solid var(--qx-text); border-radius: 42px 42px 13px 13px; overflow: hidden; display: grid; place-items: center; align-content: center; }
  .tower::after { content: ''; position: absolute; left: 25%; right: 25%; bottom: -16px; height: 16px; border-inline: 4px solid var(--qx-text); }
  .tower .water { position: absolute; inset: 42% 0 0; background: var(--qx-accent-soft); border-top: 2px solid var(--qx-accent); }
  .tower.fuller .water { inset-block-start: 24%; }
  .tower strong, .tower small { z-index: 1; }
  .tower strong { font-size: 17px; } .tower small { color: var(--qx-text-dim); }
  .transfer-arrow { display: grid; place-items: center; align-self: center; color: var(--qx-accent-text); }
  .transfer-arrow span { font-size: 9px; font-weight: 900; }
  .transfer-arrow b { font-size: 27px; }
  .calculation { display: grid; gap: 4px; padding: 11px; border: 1px solid var(--qx-border); border-radius: 11px; background: var(--qx-surface); text-align: center; }
  .calculation span { color: var(--qx-text-faint); font-size: 9px; text-transform: uppercase; font-weight: 900; }
  .calculation strong { font-size: 18px; }

  .reveal > p { max-width: 36ch; }
  .formula { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-accent); border-radius: 13px; padding: 12px; background: var(--qx-accent-soft); display: grid; gap: 4px; text-align: left; }
  .formula span { color: var(--qx-accent-text); font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .06em; }
  .formula strong { color: var(--qx-text); font-size: 21px; font-weight: 950; }
  .formula small { color: var(--qx-text-dim); font-size: 10.5px; }
  .slope-card { width: 100%; height: 150px; position: relative; box-sizing: border-box; border-left: 2px solid var(--qx-text-faint); border-bottom: 2px solid var(--qx-text-faint); overflow: hidden; }
  .curve { position: absolute; left: 12%; bottom: 9%; width: 70%; height: 95%; border-right: 4px solid var(--qx-accent); border-bottom: 4px solid var(--qx-accent); border-radius: 0 0 100% 0; transform: skewX(-12deg); }
  .tangent { position: absolute; width: 76%; height: 3px; left: 16%; top: 53%; background: var(--qx-pink); transform: rotate(-25deg); transform-origin: center; }
  .point { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: var(--qx-text); left: 52%; top: 46%; box-shadow: 0 0 0 5px var(--qx-surface); }
  .axis-y, .axis-x { position: absolute; color: var(--qx-text-faint); font-size: 8px; font-weight: 900; text-transform: uppercase; }
  .axis-y { left: 4px; top: 3px; } .axis-x { right: 3px; bottom: 4px; }
  .slope-card > span { position: absolute; right: 7px; top: 17px; color: var(--qx-pink-text); font-size: 9px; font-weight: 900; }
  .reveal-list { list-style: none; text-align: left; width: 100%; margin: 0; padding: 0; display: grid; gap: 6px; }
  .reveal-list li { border: 1px solid var(--qx-border); border-radius: 9px; padding: 9px 11px; background: var(--qx-surface-2); font-size: 11.5px; line-height: 1.4; color: var(--qx-text-dim); }
  .reveal-list strong { color: var(--qx-text); }
  .reward-panel { width: 100%; box-sizing: border-box; border: 1.5px solid var(--qx-green); border-radius: 14px; background: var(--qx-green-soft); padding: 12px; text-align: left; }
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

  @media (max-width: 380px) {
    .phase { min-height: 420px; }
    h2 { font-size: 21px; }
    .decision > div.three { grid-template-columns: 1fr; }
    .transfer-scene { grid-template-columns: 1fr 58px 1fr; }
    .shift-log { grid-template-columns: 1fr; }
    .reward-top { align-items: flex-start; gap: 8px; }
    .valve-picker button { padding-inline: 3px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .fuel, .horizontal-fuel { transition: none; }
  }
</style>
