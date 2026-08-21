<script>
  export let mode = 'mix';
  export let prompt = 'Tune the thermal system.';
  export let target = 50;
  export let tolerance = 2;
  export let start = 30;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let correctFeedback = 'Correct.';
  export let incorrectFeedback = 'Not quite. Adjust the system and read the labels again.';
  export let onDone = () => {};

  let value = start;
  let submitted = false;
  let correct = false;

  const modeCopy = {
    mix: {
      label: 'Mixture target',
      unit: 'C',
      equation: 'heat lost = heat gained'
    },
    phase: {
      label: 'Energy stage',
      unit: '',
      equation: 'warming slope, phase-change plateau'
    },
    piston: {
      label: 'Piston volume',
      unit: 'L',
      equation: 'P x V stays constant'
    },
    engine: {
      label: 'Hot reservoir',
      unit: 'K',
      equation: 'efficiency = 1 - Tc / Th'
    }
  };

  $: copy = modeCopy[mode] || modeCopy.mix;
  $: numericValue = Number(value);
  $: result = computeResult(mode, numericValue);
  $: resultLabel = formatResult(mode, result);
  $: heatPct = clamp((numericValue - min) / (max - min || 1), 0, 1) * 100;
  $: targetPct = clamp((target - min) / (max - min || 1), 0, 1) * 100;
  $: displayValue = formatInput(mode, numericValue);

  function clamp(n, low, high) {
    return Math.min(high, Math.max(low, n));
  }

  function computeResult(currentMode, input) {
    if (currentMode === 'piston') {
      return 10 / input;
    }
    if (currentMode === 'engine') {
      return (1 - 300 / input) * 100;
    }
    return input;
  }

  function formatInput(currentMode, input) {
    if (currentMode === 'phase') {
      const labels = ['ice warming', 'melting plateau', 'water warming', 'boiling plateau', 'steam warming'];
      return labels[Math.round(input)] || labels[0];
    }
    return `${input}${copy.unit ? ' ' + copy.unit : ''}`;
  }

  function formatResult(currentMode, output) {
    if (currentMode === 'piston') return `${output.toFixed(1)} atm`;
    if (currentMode === 'engine') return `${Math.round(output)}%`;
    if (currentMode === 'phase') return displayValue;
    return `${Math.round(output)} C`;
  }

  function submit() {
    const checkValue = mode === 'piston' || mode === 'engine' ? result : numericValue;
    correct = Math.abs(checkValue - target) <= tolerance;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="thermo-lab">
  <div class="prompt">{prompt}</div>

  <div class="lab-stage" class:phase={mode === 'phase'} class:piston={mode === 'piston'} class:engine={mode === 'engine'}>
    <div class="glass">
      {#if mode === 'mix'}
        <div class="beaker hot">
          <span class="liquid" style={`height:${clamp(100 - heatPct * 0.45, 42, 88)}%`}></span>
          <strong>hot</strong>
        </div>
        <div class="mix-arrow">+</div>
        <div class="beaker cool">
          <span class="liquid" style={`height:${clamp(42 + heatPct * 0.32, 42, 86)}%`}></span>
          <strong>cool</strong>
        </div>
      {:else if mode === 'phase'}
        <svg viewBox="0 0 300 150" role="img" aria-label="Heating curve">
          <path class="axis" d="M28 126 H276 M28 126 V18" />
          <path class="curve" d="M36 112 L82 72 L132 72 L184 32 L236 32 L270 18" />
          <circle class="dot" cx={36 + (numericValue / 4) * 234} cy={numericValue < 1 ? 112 - numericValue * 40 : numericValue < 2 ? 72 : numericValue < 3 ? 72 - (numericValue - 2) * 40 : numericValue < 4 ? 32 : 18} r="7" />
          <text x="76" y="64">melting</text>
          <text x="182" y="24">boiling</text>
        </svg>
      {:else if mode === 'piston'}
        <div class="cylinder">
          <span class="gas" style={`height:${clamp((numericValue / max) * 100, 18, 92)}%`}></span>
          <span class="piston-head" style={`bottom:${clamp((numericValue / max) * 100, 18, 92)}%`}></span>
          <i></i><i></i><i></i><i></i><i></i><i></i>
        </div>
      {:else}
        <div class="engine-loop">
          <div class="reservoir hot-res">hot<br><strong>{numericValue} K</strong></div>
          <div class="work-dial">{resultLabel}<small>max work</small></div>
          <div class="reservoir cold-res">cold<br><strong>300 K</strong></div>
        </div>
      {/if}
    </div>

    <div class="readout">
      <span>{copy.label}</span>
      <strong>{displayValue}</strong>
      <small>{copy.equation}</small>
    </div>
  </div>

  <label class="slider-row">
    <span>Adjust</span>
    <input type="range" bind:value min={min} max={max} step={step} disabled={submitted} />
    <span class="result">{resultLabel}</span>
  </label>

  <div class="target-line">
    <span>Target</span>
    <strong>{mode === 'piston' ? `${target.toFixed(1)} atm` : mode === 'engine' ? `${Math.round(target)}%` : mode === 'phase' ? formatInput(mode, target) : `${target} C`}</strong>
    {#if mode === 'mix' || mode === 'phase'}
      <i style={`left:${targetPct}%`}></i>
    {/if}
  </div>

  {#if !submitted}
    <button class="submit-btn" on:click={submit}>Lock answer</button>
  {:else}
    <div class="feedback" class:correct class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .thermo-lab {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
  }

  .prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 800;
    line-height: 1.42;
    text-align: center;
  }

  .lab-stage {
    width: 100%;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: linear-gradient(180deg, var(--qx-surface-2), var(--qx-surface));
    padding: 12px;
    box-sizing: border-box;
    display: grid;
    gap: 10px;
  }

  .glass {
    min-height: 176px;
    border-radius: 8px;
    background:
      radial-gradient(circle at 18% 22%, rgba(255,255,255,0.28), transparent 24%),
      linear-gradient(180deg, rgba(255,255,255,0.16), rgba(0,0,0,0.04));
    border: 1px solid var(--qx-border);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    overflow: hidden;
    position: relative;
  }

  .beaker {
    width: 82px;
    height: 130px;
    border: 2px solid var(--qx-border-2);
    border-top: none;
    border-radius: 0 0 14px 14px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .beaker strong {
    position: relative;
    z-index: 2;
    margin-bottom: 10px;
    color: #fff;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .liquid {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transition: height 0.18s ease;
  }

  .hot .liquid { background: linear-gradient(180deg, #ffb36f, #d85f54); }
  .cool .liquid { background: linear-gradient(180deg, #70d6ff, #4976d0); }

  .mix-arrow {
    color: var(--qx-text-dim);
    font-weight: 950;
    font-size: 28px;
  }

  svg {
    width: 100%;
    height: 176px;
  }

  .axis {
    fill: none;
    stroke: var(--qx-text-faint);
    stroke-width: 3;
  }

  .curve {
    fill: none;
    stroke: var(--qx-accent);
    stroke-width: 7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .dot {
    fill: var(--qx-green);
    stroke: #fff;
    stroke-width: 3;
  }

  text {
    fill: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 800;
  }

  .cylinder {
    width: 136px;
    height: 150px;
    border: 2px solid var(--qx-border-2);
    border-radius: 18px 18px 10px 10px;
    position: relative;
    overflow: hidden;
    background: rgba(255,255,255,0.16);
  }

  .gas {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(241,185,78,0.38), rgba(229,107,111,0.7));
    transition: height 0.18s ease;
  }

  .piston-head {
    position: absolute;
    left: 8px;
    right: 8px;
    height: 10px;
    border-radius: 999px;
    background: var(--qx-text-dim);
    transform: translateY(5px);
    transition: bottom 0.18s ease;
  }

  .cylinder i {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--qx-accent);
    opacity: 0.75;
  }

  .cylinder i:nth-child(3) { left: 26px; bottom: 28px; }
  .cylinder i:nth-child(4) { left: 82px; bottom: 42px; }
  .cylinder i:nth-child(5) { left: 54px; bottom: 72px; }
  .cylinder i:nth-child(6) { left: 98px; bottom: 92px; }
  .cylinder i:nth-child(7) { left: 34px; bottom: 110px; }
  .cylinder i:nth-child(8) { left: 70px; bottom: 124px; }

  .engine-loop {
    width: min(320px, 100%);
    display: grid;
    grid-template-columns: 1fr 118px 1fr;
    align-items: center;
    gap: 8px;
  }

  .reservoir,
  .work-dial {
    min-height: 96px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    text-align: center;
    font-weight: 900;
    color: #fff;
    line-height: 1.25;
  }

  .hot-res { background: linear-gradient(180deg, #e9855f, #c7474d); }
  .cold-res { background: linear-gradient(180deg, #61b7df, #3866bb); }

  .work-dial {
    color: var(--qx-text);
    background: var(--qx-surface);
    border: 1.5px solid var(--qx-border-2);
    font-size: 24px;
  }

  .work-dial small {
    display: block;
    color: var(--qx-text-faint);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .readout {
    display: grid;
    gap: 3px;
    text-align: center;
  }

  .readout span,
  .target-line span,
  .slider-row span {
    color: var(--qx-text-faint);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .readout strong {
    color: var(--qx-text);
    font-size: 21px;
    font-weight: 950;
  }

  .readout small {
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 700;
  }

  .slider-row {
    width: 100%;
    display: grid;
    grid-template-columns: 58px 1fr 68px;
    gap: 10px;
    align-items: center;
  }

  input[type="range"] {
    width: 100%;
    accent-color: var(--qx-accent);
  }

  .result {
    text-align: right;
    color: var(--qx-text) !important;
    letter-spacing: 0 !important;
    text-transform: none !important;
    font-variant-numeric: tabular-nums;
  }

  .target-line {
    position: relative;
    width: 100%;
    min-height: 36px;
    border-radius: 8px;
    background: var(--qx-surface-2);
    border: 1px solid var(--qx-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .target-line strong {
    color: var(--qx-text);
    font-size: 13px;
    font-weight: 900;
  }

  .target-line i {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--qx-green);
  }

  .submit-btn,
  .continue-btn {
    min-height: 42px;
    width: 100%;
    border-radius: 999px;
    border: none;
    background: var(--qx-accent);
    color: #fff;
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .feedback {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 720;
    line-height: 1.45;
    text-align: center;
  }

  .feedback.correct {
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .feedback.incorrect {
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }
</style>
