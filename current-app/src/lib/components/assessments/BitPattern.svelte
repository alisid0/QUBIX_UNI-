<script>
  export let prompt = 'Turn the bits on or off to match the target.';
  export let bits = 4;
  export let target = '';
  export let labels = [];
  export let correctFeedback = 'Yes. The pattern matches.';
  export let incorrectFeedback = 'Not quite. Check each bit against the target.';
  export let onDone = () => {};

  let values = Array(bits).fill(0);
  let submitted = false;
  let correct = false;

  $: targetBits = String(target || '').replace(/\s/g, '').split('').map(x => x === '1' ? 1 : 0);
  $: displayTarget = targetBits.length ? targetBits.join('') : Array(bits).fill(0).join('');
  $: pattern = values.join('');

  function toggle(i) {
    if (submitted) return;
    values[i] = values[i] ? 0 : 1;
    values = [...values];
  }

  function reset() {
    if (submitted) return;
    values = Array(bits).fill(0);
  }

  function submit() {
    correct = pattern === displayTarget;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="bit-pattern">
  <div class="prompt">{prompt}</div>

  <div class="target-row" aria-label="Target bit pattern">
    <span class="target-label">Target</span>
    <span class="target-bits">{displayTarget}</span>
  </div>

  <div class="bits" role="group" aria-label="Bit switches">
    {#each values as value, i}
      <button
        class="bit"
        class:on={value === 1}
        class:right={submitted && targetBits[i] === value}
        class:wrong={submitted && targetBits[i] !== value}
        on:click={() => toggle(i)}
        aria-label={`Bit ${i + 1}: ${value}`}
        aria-pressed={value === 1}
      >
        <span class="bit-value">{value}</span>
        <span class="bit-label">{labels[i] || `bit ${i + 1}`}</span>
      </button>
    {/each}
  </div>

  <div class="current-row">
    <span class="current-label">Current</span>
    <span class="current-bits">{pattern}</span>
  </div>

  {#if !submitted}
    <div class="actions">
      <button class="ghost-btn" on:click={reset}>Reset</button>
      <button class="submit-btn" on:click={submit}>Check pattern</button>
    </div>
  {:else}
    <div class="feedback" class:correct class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .bit-pattern {
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }

  .prompt {
    font-size: 15px;
    font-weight: 750;
    line-height: 1.45;
    color: var(--qx-text);
    text-align: center;
  }

  .target-row,
  .current-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    box-sizing: border-box;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
  }

  .target-label,
  .current-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--qx-text-faint);
  }

  .target-bits,
  .current-bits {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: var(--qx-text);
  }

  .bits {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(58px, 1fr));
    gap: 8px;
  }

  .bit {
    min-height: 82px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    cursor: pointer;
    font-family: var(--qx-font);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    transition: transform 0.12s ease, border-color 0.12s ease, background 0.12s ease;
  }

  .bit:hover {
    border-color: var(--qx-accent);
  }

  .bit:active {
    transform: scale(0.98);
  }

  .bit.on {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  .bit.right {
    border-color: var(--qx-green);
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .bit.wrong {
    border-color: var(--qx-danger);
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }

  .bit-value {
    font-size: 26px;
    font-weight: 900;
    line-height: 1;
  }

  .bit-label {
    font-size: 10px;
    font-weight: 800;
    color: currentColor;
    opacity: 0.75;
  }

  .actions {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  .ghost-btn,
  .submit-btn,
  .continue-btn {
    min-height: 42px;
    border-radius: 22px;
    border: none;
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .ghost-btn {
    flex: 0 0 96px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    border: 1px solid var(--qx-border-2);
  }

  .submit-btn,
  .continue-btn {
    flex: 1;
    background: var(--qx-accent);
    color: #fff;
  }

  .feedback {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
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
