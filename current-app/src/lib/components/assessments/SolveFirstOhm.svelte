<script>
  import SolveFirstPause from './SolveFirstPause.svelte';

  export let config;
  export let onDone = () => {};
  export let onExit = () => {};

  const V_MIN = 1, V_MAX = 12;
  const R_MIN = 1, R_MAX = 12;
  const TARGET_I = 2.0;         // tune stage goal
  const SAFE_MAX = 3.0;         // overload stage: device burns above this
  const OVERLOAD_V = 12;        // fixed high voltage in the overload stage
  const PREDICT_V = 9, PREDICT_R = 3; // locked transfer circuit -> I = 3.0

  const STAGES = ['explore', 'target', 'overload', 'predict', 'reveal'];
  const STAGE_LABELS = { explore: 'Feel', target: 'Tune', overload: 'Survive', predict: 'Predict', reveal: 'Name' };

  let phase = 'intro';
  let v = 6, r = 6;
  let vLocked = false, rLocked = false;
  let message = '';
  let messageTone = 'neutral';

  let touchedV = false, touchedR = false, adjustCount = 0;
  let exploreDone = false;
  let targetHit = false;
  let overloadSafe = false;
  let burned = false;                 // evidence: pushed a device past its limit
  let predictChoice = null;
  let predictedCorrectly = false;
  let predictWrong = false;
  let revealBeat = 0;
  let usedHint = false;
  let showHint = false;
  let recorded = false;

  $: current = v / r;                                  // I = V / R
  $: brightness = Math.max(0, Math.min(1, current / 6));
  $: danger = phase === 'overload' && current > SAFE_MAX;
  $: flowDur = current <= 0 ? 0 : Math.max(0.35, 2.4 / current);
  $: stageIndex = Math.max(0, STAGES.indexOf(phase));
  $: reward = Math.min(15, 10 + (usedHint ? 0 : 2) + (predictWrong ? 1 : 3));

  function setFeedback(text, tone = 'neutral') { message = text; messageTone = tone; }
  function fmt(x) { return x.toFixed(1); }

  function adjust(which, delta) {
    if (phase === 'intro' || phase === 'reveal') return;
    if (which === 'v') {
      if (vLocked) return;
      v = Math.max(V_MIN, Math.min(V_MAX, v + delta));
      touchedV = true;
    } else {
      if (rLocked) return;
      r = Math.max(R_MIN, Math.min(R_MAX, r + delta));
      touchedR = true;
    }
    adjustCount += 1;
    afterAdjust();
  }

  function afterAdjust() {
    // Read the current directly from the dials: the reactive `current` has not
    // recomputed yet inside this synchronous handler.
    const i = v / r;
    if (phase === 'explore') {
      if (touchedV && touchedR && adjustCount >= 5 && !exploreDone) {
        exploreDone = true;
        setFeedback('You have felt both dials move the meter. Notice which way each one pushes the current.', 'good');
      }
    } else if (phase === 'target') {
      if (Math.abs(i - TARGET_I) < 0.05) {
        targetHit = true;
        setFeedback(`Ammeter reads ${fmt(i)} A. Locked on target with ${v} V and ${r} Ω.`, 'good');
      } else {
        setFeedback(`Ammeter reads ${fmt(i)} A. Target is ${TARGET_I.toFixed(1)} A.`, 'neutral');
      }
    } else if (phase === 'overload') {
      if (i > SAFE_MAX) {
        burned = true;
        setFeedback(`${fmt(i)} A through a device rated for ${SAFE_MAX.toFixed(1)} A. It is overheating. Add resistance.`, 'bad');
      } else if (i >= 1) {
        overloadSafe = true;
        setFeedback(`${fmt(i)} A, under the ${SAFE_MAX.toFixed(1)} A limit. The device is safe and still lit.`, 'good');
      } else {
        setFeedback(`${fmt(i)} A. Safe, but so dim it is barely working.`, 'neutral');
      }
    }
  }

  function begin() {
    phase = 'explore';
    v = 6; r = 6; vLocked = false; rLocked = false;
    touchedV = false; touchedR = false; adjustCount = 0; exploreDone = false;
    setFeedback('Turn the voltage and resistance dials. Watch the ammeter and the bulb respond.');
  }

  function enterTarget() {
    phase = 'target';
    v = 6; r = 6; vLocked = false; rLocked = false;
    targetHit = false;
    setFeedback(`Set the dials so the ammeter reads exactly ${TARGET_I.toFixed(1)} A.`);
  }

  function enterOverload() {
    phase = 'overload';
    v = OVERLOAD_V; r = 2; vLocked = true; rLocked = false; // 12 V / 2 ohm = 6 A, over the limit
    overloadSafe = false; burned = false;
    setFeedback(`The supply is stuck at ${OVERLOAD_V} V and cannot be lowered. The device burns above ${SAFE_MAX.toFixed(1)} A. Only resistance can save it.`);
  }

  function enterPredict() {
    phase = 'predict';
    v = PREDICT_V; r = PREDICT_R; vLocked = true; rLocked = true;
    predictChoice = null; predictedCorrectly = false;
    setFeedback(`New circuit: ${PREDICT_V} V and ${PREDICT_R} Ω, dials locked. Predict the current before the meter shows it.`);
  }

  function pickPredict(value) {
    if (predictedCorrectly) return;
    predictChoice = value;
    if (Math.abs(value - PREDICT_V / PREDICT_R) < 0.05) {
      predictedCorrectly = true;
      setFeedback(`Correct: ${PREDICT_V} ÷ ${PREDICT_R} = ${fmt(PREDICT_V / PREDICT_R)} A. You used the rule before seeing the meter.`, 'good');
    } else {
      predictWrong = true;
      setFeedback('Not quite. The current is the voltage divided by the resistance. Try again.', 'bad');
    }
  }

  function beginReveal() { phase = 'reveal'; revealBeat = 0; }

  function nextReveal() {
    if (revealBeat < 4) { revealBeat += 1; return; }
    if (!recorded) {
      recorded = true;
      onDone({
        id: config.id,
        reward,
        evidenceCount: 3,
        patternFound: true,
        compared: true,
        transferred: predictedCorrectly,
        transferFirstTry: !predictWrong,
        usedHint
      });
    }
    revealBeat = 5;
  }

  function useHint() { usedHint = true; showHint = true; }

  const PREDICT_CHOICES = [
    { value: PREDICT_V / PREDICT_R, label: '3.0 A' },
    { value: PREDICT_V * PREDICT_R, label: '27 A' },
    { value: PREDICT_R / PREDICT_V, label: '0.33 A' }
  ];
</script>

<div class="ohm-game" class:technical={phase === 'reveal'}>
  {#if phase === 'intro'}
    <button class="exit" type="button" on:click={onExit} aria-label="Return to all workshops">&larr;</button>
    <section class="intro">
      <span class="eyebrow">{config.eyebrow}</span>
      <div class="spark" aria-hidden="true"><i></i><i></i><i></i></div>
      <h2>Live Wire</h2>
      <p>A workbench circuit: a supply, a coil of resistance wire, and a bulb. You control how hard the current is pushed and how hard it is held back.</p>
      <strong>No timer. Burning out a device is evidence, not a mistake.</strong>
      <button class="primary" type="button" on:click={begin}>Close the circuit</button>
    </section>

  {:else if phase === 'reveal'}
    <section class="reveal">
      <span class="eyebrow">Concept uncovered &middot; {Math.min(revealBeat + 1, 5)}/5</span>

      {#if revealBeat === 0}
        <h2>You were controlling an electric current.</h2>
        <p>Three quantities were in your hands the whole time. They are about to get their real names.</p>
      {:else if revealBeat === 1}
        <h2>The current was the voltage divided by the resistance.</h2>
        <div class="law-cards">
          <span><b>Voltage</b>how hard the current is pushed</span>
          <span><b>Resistance</b>how hard it is held back</span>
          <span><b>Current</b>what actually flows: V &divide; R</span>
        </div>
        <p>Raising voltage raised the current; raising resistance lowered it. On the tune stage, several dial pairs gave the same current because the <strong>ratio</strong> was the same.</p>
      {:else if revealBeat === 2}
        <h2>Rearranged, that is Ohm&rsquo;s law.</h2>
        <div class="ohm-triangle">
          <b>V = I &times; R</b>
          <span>voltage = current &times; resistance</span>
        </div>
        <p>One relationship ties all three. Know any two and the third is fixed.</p>
      {:else if revealBeat === 3}
        <h2>Resistance choked the current back.</h2>
        <div class="metric-replay">
          <span><b>{OVERLOAD_V}</b>volts, fixed</span>
          <span><b>&ge;4</b>ohms needed</span>
          <span><b>{SAFE_MAX.toFixed(1)}</b>amp safe limit</span>
        </div>
        <p>With the voltage stuck high, the only way under the limit was to add resistance. That is how fuses and series resistors protect real circuits.</p>
      {:else}
        <h2>Same law, three ways to read it.</h2>
        <div class="comparison">
          <article><b>Find current</b><span>I = V &divide; R</span></article>
          <article><b>Find voltage</b><span>V = I &times; R</span></article>
          <article><b>Find resistance</b><span>R = V &divide; I</span></article>
        </div>
        <p>You drove the current, tuned it to a target, survived an overload, and predicted a new circuit, all from one rule.</p>
      {/if}

      {#if revealBeat < 4}
        <button class="primary" type="button" on:click={nextReveal}>
          {revealBeat === 0 ? 'Name the three quantities' : revealBeat === 1 ? 'Rearrange the rule' : revealBeat === 2 ? 'Replay the overload' : 'See all three forms'}
        </button>
      {:else if revealBeat === 4}
        <div class="reward-panel">
          <div><span>Discovery distinction</span><strong>{config.rewardLabel}</strong></div>
          <b>+{reward} W</b>
        </div>
        <button class="primary" type="button" on:click={nextReveal}>Complete discovery</button>
      {:else}
        <div class="complete-panel"><b>Ohm&rsquo;s law mapped.</b><span>Voltage, current, and resistance now have one law between them.</span></div>
        <button class="primary" type="button" on:click={onExit}>Return to workshops</button>
      {/if}
    </section>

  {:else}
    <button class="exit" type="button" on:click={onExit} aria-label="Return to all workshops">&larr;</button>
    <header>
      <span class="eyebrow">{config.eyebrow} &middot; Workbench</span>
      <h2>Live Wire</h2>
    </header>

    <div class="rail" aria-label="Discovery progress">
      {#each STAGES as stage}
        <span class:current={stage === phase} class:done={stageIndex > STAGES.indexOf(stage)}>{STAGE_LABELS[stage]}</span>
      {/each}
    </div>

    <section class="mission">
      {#if phase === 'explore'}
        <span>Shift 1 &middot; Feel</span><h3>Move both dials and watch the meter.</h3>
        <p>One dial pushes the current up, the other holds it back. Find out which is which.</p>
      {:else if phase === 'target'}
        <span>Shift 2 &middot; Tune</span><h3>Read exactly {TARGET_I.toFixed(1)} A.</h3>
        <p>More than one pair of dials can land it. See if you can spot why.</p>
      {:else if phase === 'overload'}
        <span>Shift 3 &middot; Survive</span><h3>Keep the device under {SAFE_MAX.toFixed(1)} A.</h3>
        <p>The supply is locked high. Only the resistance dial can save the device.</p>
      {:else}
        <span>Shift 4 &middot; Predict</span><h3>Call the current before the meter.</h3>
        <p>The dials are locked. Use the rule you found to predict what will flow.</p>
      {/if}
    </section>

    <div class="circuit" class:danger>
      <svg viewBox="0 0 300 150" role="img" aria-label={`Circuit reading ${fmt(current)} amps`}>
        <path class="wire" d="M45 35 H255 V115 H45 Z" pathLength="100" style={`--flow-dur:${flowDur}s`} />
        <!-- battery (supply) on the left rail -->
        <line class="rail-line" x1="45" y1="60" x2="45" y2="90" />
        <line class="bat-long" x1="38" y1="66" x2="52" y2="66" />
        <line class="bat-short" x1="42" y1="84" x2="48" y2="84" />
        <text class="lbl" x="20" y="79">{v}V</text>
        <!-- resistor (zigzag) on the top rail -->
        <polyline class="resistor" points="120,35 128,26 138,44 148,26 158,44 168,26 178,44 180,35" />
        <text class="lbl" x="150" y="18" text-anchor="middle">{r}&#8486;</text>
        <!-- bulb on the right rail -->
        <circle class="bulb-glow" cx="255" cy="75" r="22" style={`opacity:${(brightness * 0.9).toFixed(2)}`} />
        <circle class="bulb" cx="255" cy="75" r="12" style={`fill:color-mix(in srgb, var(--qx-yellow) ${Math.round(brightness * 100)}%, var(--qx-surface))`} />
        <path class="filament" d="M250 75 q5 -7 10 0" style={`opacity:${(0.4 + brightness * 0.6).toFixed(2)}`} />
      </svg>

      <div class="ammeter" class:hot={danger}>
        <span>Ammeter</span>
        <b>{fmt(current)}<em>A</em></b>
        {#if phase === 'overload'}<small>limit {SAFE_MAX.toFixed(1)} A</small>{/if}
      </div>
    </div>

    <div class="dials">
      <div class="dial" class:locked={vLocked}>
        <span>Voltage</span>
        <div class="stepper">
          <button type="button" on:click={() => adjust('v', -1)} disabled={vLocked || v <= V_MIN} aria-label="Lower voltage">&minus;</button>
          <b>{v}<em>V</em></b>
          <button type="button" on:click={() => adjust('v', 1)} disabled={vLocked || v >= V_MAX} aria-label="Raise voltage">+</button>
        </div>
      </div>
      <div class="dial" class:locked={rLocked}>
        <span>Resistance</span>
        <div class="stepper">
          <button type="button" on:click={() => adjust('r', -1)} disabled={rLocked || r <= R_MIN} aria-label="Lower resistance">&minus;</button>
          <b>{r}<em>&#8486;</em></b>
          <button type="button" on:click={() => adjust('r', 1)} disabled={rLocked || r >= R_MAX} aria-label="Raise resistance">+</button>
        </div>
      </div>
    </div>

    {#if phase === 'predict'}
      <div class="predict-row">
        {#each PREDICT_CHOICES as choice}
          <button
            type="button"
            class="predict-choice"
            class:picked={predictChoice === choice.value}
            class:correct={predictedCorrectly && Math.abs(choice.value - PREDICT_V / PREDICT_R) < 0.05}
            class:wrong={predictChoice === choice.value && !predictedCorrectly}
            on:click={() => pickPredict(choice.value)}
          >{choice.label}</button>
        {/each}
      </div>
    {/if}

    <div class="feedback" class:good={messageTone === 'good'} class:bad={messageTone === 'bad'} aria-live="polite">{message}</div>

    {#if phase === 'explore' && exploreDone}
      <SolveFirstPause title="Voltage pushes, resistance holds back." message="The bulb tracked the ammeter exactly. Now aim for a specific reading." actionLabel="Tune to a target" onContinue={enterTarget} />
    {:else if phase === 'target' && targetHit}
      <SolveFirstPause title="Different dials, same current." message="Every pair that worked shared the same voltage-to-resistance ratio. That ratio is the current." actionLabel="Face an overload" onContinue={enterOverload} />
    {:else if phase === 'overload' && overloadSafe}
      <SolveFirstPause title="Resistance pulled the current back under the limit." message="With the voltage locked high, adding resistance was the only way to protect the device. Resistance opposes current." actionLabel="Predict a new circuit" onContinue={enterPredict} />
    {:else if phase === 'predict' && predictedCorrectly}
      <SolveFirstPause title="You called the current before the meter." message="Voltage divided by resistance, worked out in your head. That is a rule you can carry to any circuit." actionLabel="Name the law" onContinue={beginReveal} />
    {:else if phase === 'overload' && !showHint}
      <button class="hint-button" type="button" on:click={useHint}>Need a nudge?</button>
    {:else if phase === 'overload' && showHint}
      <p class="hint">Current is {OVERLOAD_V} divided by the resistance. To get to {SAFE_MAX.toFixed(1)} A or less, the resistance needs to reach at least {Math.ceil(OVERLOAD_V / SAFE_MAX)} &#8486;.</p>
    {/if}
  {/if}
</div>

<style>
  .ohm-game { width: 100%; max-width: 720px; margin: 0 auto; position: relative; color: var(--qx-text); font-family: var(--qx-font); }
  button { font: inherit; }
  button:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }
  .exit { position: absolute; top: 0; left: 0; z-index: 5; width: 44px; height: 44px; border: 1.5px solid var(--qx-border); border-radius: 50%; background: var(--qx-surface); color: var(--qx-text); cursor: pointer; font-size: 20px; }
  header { min-height: 46px; padding: 1px 54px 8px; text-align: center; }
  h2, h3, p { margin-top: 0; }
  header h2 { margin-bottom: 0; font-size: 22px; font-weight: 950; }
  .eyebrow, .mission > span { color: var(--qx-accent-text); font-size: 9px; font-weight: 950; letter-spacing: .12em; text-transform: uppercase; }

  .intro, .reveal { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 8px 2px; text-align: center; }
  .intro h2, .reveal h2 { max-width: 24ch; margin: 0; font-size: clamp(24px, 5vw, 34px); font-weight: 950; line-height: 1.08; }
  .intro p, .intro > strong, .reveal > p { max-width: 54ch; margin: 0; color: var(--qx-text-dim); font-size: 14px; line-height: 1.55; }
  .intro > strong, .reveal strong { color: var(--qx-text); }
  .spark { display: flex; gap: 8px; }
  .spark i { width: 10px; height: 26px; border-radius: 3px; background: var(--qx-yellow); box-shadow: 0 0 14px color-mix(in srgb, var(--qx-yellow) 70%, transparent); }
  .spark i:nth-child(2) { height: 38px; } .spark i:nth-child(3) { height: 20px; }
  .primary { width: 100%; max-width: 360px; min-height: 48px; border: 0; border-radius: var(--qx-radius-sm); background: var(--qx-accent); color: #fff; cursor: pointer; font-size: 13px; font-weight: 950; box-shadow: var(--qx-shadow-card); }

  .rail { display: flex; justify-content: center; gap: 4px; margin-bottom: 10px; flex-wrap: wrap; }
  .rail span { padding: 4px 8px; border: 1px solid var(--qx-border); border-radius: 999px; background: var(--qx-surface-2); color: var(--qx-text-faint); font-size: 8px; font-weight: 900; text-transform: uppercase; }
  .rail span.current { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .rail span.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .mission { padding: 10px 12px; border-left: 4px solid var(--qx-accent); background: var(--qx-surface-2); border-radius: 0 var(--qx-radius-sm) var(--qx-radius-sm) 0; }
  .mission h3 { margin: 2px 0; font-size: 16px; font-weight: 950; }
  .mission p { margin: 0; color: var(--qx-text-dim); font-size: 12px; line-height: 1.4; }

  .circuit { position: relative; margin: 10px 0; padding: 8px; border: 1px solid var(--qx-border-2); border-radius: var(--qx-radius-md); background: var(--qx-surface-3); box-shadow: var(--qx-shadow-card); }
  .circuit.danger { border-color: var(--qx-danger); box-shadow: var(--qx-shadow-card), 0 0 0 2px var(--qx-danger-soft); }
  .circuit svg { display: block; width: 100%; height: auto; }
  .wire { fill: none; stroke: var(--qx-text-faint); stroke-width: 3; stroke-linejoin: round; stroke-dasharray: 2 3; animation: flow var(--flow-dur, 1.5s) linear infinite; }
  .circuit.danger .wire { stroke: var(--qx-danger); }
  @keyframes flow { to { stroke-dashoffset: -20; } }
  .rail-line { stroke: var(--qx-surface-3); stroke-width: 6; }
  .bat-long { stroke: var(--qx-text); stroke-width: 3; }
  .bat-short { stroke: var(--qx-text); stroke-width: 3; }
  .resistor { fill: none; stroke: var(--qx-accent); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
  .lbl { fill: var(--qx-text-dim); font: 900 11px var(--qx-font); }
  .bulb-glow { fill: var(--qx-yellow); filter: blur(6px); transition: opacity .18s ease; }
  .bulb { stroke: var(--qx-text); stroke-width: 2; transition: fill .18s ease; }
  .filament { fill: none; stroke: var(--qx-accent-text); stroke-width: 1.5; }

  .ammeter { position: absolute; right: 14px; bottom: 12px; display: grid; justify-items: end; padding: 5px 11px; border: 1px solid var(--qx-border); border-radius: var(--qx-radius-sm); background: var(--qx-surface); box-shadow: var(--qx-shadow-card); }
  .ammeter span { color: var(--qx-text-faint); font-size: 7px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .ammeter b { font-size: 26px; font-weight: 950; font-variant-numeric: tabular-nums; line-height: 1; }
  .ammeter b em { font-size: 12px; font-style: normal; color: var(--qx-text-dim); margin-left: 2px; }
  .ammeter small { color: var(--qx-text-faint); font-size: 8px; }
  .ammeter.hot { border-color: var(--qx-danger); }
  .ammeter.hot b { color: var(--qx-danger-text); }

  .dials { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .dial { padding: 9px 10px; border: 1px solid var(--qx-border); border-radius: var(--qx-radius-md); background: var(--qx-surface); }
  .dial > span { color: var(--qx-text-faint); font-size: 8px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
  .dial.locked { opacity: .72; }
  .stepper { display: grid; grid-template-columns: 44px 1fr 44px; align-items: center; gap: 8px; margin-top: 4px; }
  .stepper button { min-height: 44px; border: 1px solid var(--qx-border-2); border-radius: var(--qx-radius-sm); background: var(--qx-surface-2); color: var(--qx-text); font-size: 20px; font-weight: 900; cursor: pointer; }
  .stepper button:disabled { opacity: .4; cursor: not-allowed; }
  .stepper b { text-align: center; font-size: 22px; font-weight: 950; font-variant-numeric: tabular-nums; }
  .stepper b em { font-size: 12px; font-style: normal; color: var(--qx-text-dim); margin-left: 2px; }

  .predict-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 9px; }
  .predict-choice { min-height: 52px; border: 1px solid var(--qx-border-2); border-radius: var(--qx-radius-sm); background: var(--qx-surface); color: var(--qx-text); font-size: 15px; font-weight: 950; cursor: pointer; box-shadow: var(--qx-shadow-card); }
  .predict-choice.correct { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .predict-choice.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }

  .feedback { min-height: 30px; margin-top: 9px; padding: 7px 10px; border-left: 4px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text-dim); font-size: 11px; font-weight: 700; line-height: 1.4; border-radius: 0 var(--qx-radius-sm) var(--qx-radius-sm) 0; }
  .feedback.good { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .feedback.bad { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .hint-button { display: block; min-height: 44px; margin: 8px auto 0; border: 0; background: transparent; color: var(--qx-accent-text); cursor: pointer; font-weight: 850; text-decoration: underline; }
  .hint { margin: 8px 0 0; padding: 9px; border: 1px solid var(--qx-accent); border-radius: var(--qx-radius-sm); background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 11px; text-align: center; }

  .law-cards, .comparison, .metric-replay { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  .law-cards span, .comparison article, .metric-replay span { display: grid; gap: 3px; padding: 10px; border: 1px solid var(--qx-border); border-radius: var(--qx-radius-sm); background: var(--qx-surface); text-align: left; }
  .law-cards b, .comparison b { color: var(--qx-text); font-size: 10px; text-transform: uppercase; letter-spacing: .04em; }
  .law-cards span, .comparison span { color: var(--qx-text-dim); font-size: 11px; }
  .metric-replay { text-align: center; }
  .metric-replay span { justify-items: center; }
  .metric-replay b { color: var(--qx-accent-text); font-size: 23px; }
  .metric-replay span { color: var(--qx-text-dim); font-size: 10px; }
  .ohm-triangle { display: grid; gap: 4px; padding: 16px 30px; border: 2px solid var(--qx-accent); border-radius: var(--qx-radius-md); background: var(--qx-accent-soft); }
  .ohm-triangle b { color: var(--qx-accent-text); font-size: 30px; font-weight: 950; }
  .ohm-triangle span { color: var(--qx-text-dim); font-size: 11px; }
  .comparison span { font-variant-numeric: tabular-nums; font-size: 14px; font-weight: 800; color: var(--qx-text); }

  .reward-panel, .complete-panel { width: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border: 1.5px solid var(--qx-accent); border-radius: var(--qx-radius-md); background: var(--qx-accent-soft); text-align: left; }
  .reward-panel span { display: block; color: var(--qx-accent-text); font-size: 9px; font-weight: 900; text-transform: uppercase; }
  .reward-panel > b { color: var(--qx-accent-text); font-size: 19px; }
  .complete-panel { display: grid; border-color: var(--qx-green); background: var(--qx-green-soft); }
  .complete-panel span { color: var(--qx-green-text); font-size: 11px; }

  @media (max-width: 420px) {
    .law-cards, .comparison, .metric-replay { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
</style>
