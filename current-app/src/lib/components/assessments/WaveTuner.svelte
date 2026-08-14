<script>
  export let prompt = 'Tune the wave to match the target.';
  export let targetAmplitude = 3;
  export let targetFrequency = 4;
  export let correctFeedback = 'Correct. Amplitude controls height; frequency controls crowding.';
  export let incorrectFeedback = 'Not yet. Match both the height and the number of waves.';
  export let onDone = () => {};

  let amplitude = 1;
  let frequency = 1;
  let submitted = false;
  let correct = false;

  $: path = makeWave(amplitude, frequency);
  $: targetPath = makeWave(targetAmplitude, targetFrequency);

  function makeWave(amp, freq) {
    const mid = 55;
    const scale = amp * 8;
    const points = [];
    for (let x = 0; x <= 260; x += 10) {
      const y = mid - Math.sin((x / 260) * Math.PI * 2 * freq) * scale;
      points.push(`${x},${y.toFixed(2)}`);
    }
    return `M${points.join(' L')}`;
  }

  function submit() {
    correct = amplitude === targetAmplitude && frequency === targetFrequency;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="wave-tuner">
  <div class="prompt">{prompt}</div>

  <div class="target">
    Target: <strong>height {targetAmplitude}</strong> and <strong>crowding {targetFrequency}</strong>
  </div>

  <div class="scope">
    <svg viewBox="0 0 260 110" role="img" aria-label="Wave tuning display">
      <path class="target-wave" d={targetPath}></path>
      <path class="live-wave" d={path}></path>
      <line x1="0" y1="55" x2="260" y2="55"></line>
    </svg>
  </div>

  <div class="controls">
    <label>
      <span>Height</span>
      <strong>{amplitude}</strong>
      <input type="range" min="1" max="5" bind:value={amplitude} disabled={submitted} />
    </label>
    <label>
      <span>Crowding</span>
      <strong>{frequency}</strong>
      <input type="range" min="1" max="5" bind:value={frequency} disabled={submitted} />
    </label>
  </div>

  {#if !submitted}
    <button class="submit-btn" on:click={submit}>Lock wave</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .wave-tuner {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
  }

  .prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .target {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 11px;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 750;
    text-align: center;
  }

  .target strong {
    color: var(--qx-text);
  }

  .scope {
    width: 100%;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: radial-gradient(circle at 50% 50%, var(--qx-surface-2), var(--qx-surface));
    padding: 14px;
    box-sizing: border-box;
  }

  svg {
    width: 100%;
    display: block;
    overflow: visible;
  }

  line {
    stroke: var(--qx-border-2);
    stroke-width: 1;
  }

  path {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .target-wave {
    stroke: var(--qx-text-faintest);
    stroke-width: 4;
    stroke-dasharray: 4 7;
  }

  .live-wave {
    stroke: var(--qx-accent);
    stroke-width: 5;
    transition: d 0.18s ease;
  }

  .controls {
    width: 100%;
    display: grid;
    gap: 10px;
  }

  label {
    display: grid;
    grid-template-columns: 74px 28px 1fr;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface);
    padding: 10px;
  }

  label span {
    font-size: 12px;
    font-weight: 820;
    color: var(--qx-text-faint);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  label strong {
    font-size: 18px;
    font-weight: 900;
    color: var(--qx-text);
    text-align: center;
  }

  input {
    width: 100%;
    accent-color: var(--qx-accent);
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
