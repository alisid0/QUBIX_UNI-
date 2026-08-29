<script>
  export let prompt = 'Paint the grid to match the target.';
  export let target = [];
  export let correctFeedback = 'Matched. The bit pattern becomes a picture.';
  export let incorrectFeedback = 'Close. Compare each square with the target.';
  export let onDone = () => {};

  $: rows = target.length ? target : ['0110', '1001', '1001', '0110'];
  $: height = rows.length;
  $: width = rows[0]?.length || 4;
  $: targetCells = rows.join('').split('').map(x => x === '1' ? 1 : 0);

  let cells = [];
  let submitted = false;
  let correct = false;

  $: if (cells.length !== targetCells.length) {
    cells = Array(targetCells.length).fill(0);
  }

  function toggle(index) {
    if (submitted) return;
    cells[index] = cells[index] ? 0 : 1;
    cells = [...cells];
  }

  function reset() {
    if (submitted) return;
    cells = Array(targetCells.length).fill(0);
  }

  function submit() {
    correct = cells.every((value, index) => value === targetCells[index]);
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="pixel-grid">
  <div class="prompt">{prompt}</div>

  <div class="stage">
    <div class="panel">
      <div class="panel-label">Target</div>
      <div class="mini-grid" style={`--cols:${width}; --rows:${height};`}>
        {#each targetCells as value}
          <span class:on={value === 1}></span>
        {/each}
      </div>
    </div>

    <div class="panel live">
      <div class="panel-label">Build</div>
      <div class="paint-grid" style={`--cols:${width}; --rows:${height};`}>
        {#each cells as value, index}
          <button
            class:on={value === 1}
            class:right={submitted && value === targetCells[index]}
            class:wrong={submitted && value !== targetCells[index]}
            on:click={() => toggle(index)}
            aria-label={`Pixel ${index + 1}: ${value ? 'on' : 'off'}`}
            aria-pressed={value === 1}
          ></button>
        {/each}
      </div>
    </div>
  </div>

  {#if !submitted}
    <div class="actions">
      <button class="ghost-btn" on:click={reset}>Clear</button>
      <button class="submit-btn" on:click={submit}>Run image</button>
    </div>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .pixel-grid {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }

  .prompt {
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    color: var(--qx-text);
    text-align: center;
  }

  .stage {
    width: 100%;
    display: grid;
    grid-template-columns: 0.78fr 1fr;
    gap: 10px;
    align-items: stretch;
  }

  .panel {
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    min-height: 170px;
    box-sizing: border-box;
  }

  .panel.live {
    background: var(--qx-surface);
    border-color: var(--qx-border-2);
  }

  .panel-label {
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--qx-text-faint);
  }

  .mini-grid,
  .paint-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    grid-template-rows: repeat(var(--rows), 1fr);
    gap: 4px;
    width: min(100%, 132px);
    aspect-ratio: var(--cols) / var(--rows);
  }

  .paint-grid {
    width: min(100%, 160px);
    gap: 5px;
  }

  .mini-grid span,
  .paint-grid button {
    border-radius: 5px;
    border: 1px solid var(--qx-border-2);
    background: var(--qx-surface);
    aspect-ratio: 1;
  }

  .mini-grid span.on,
  .paint-grid button.on {
    background: var(--qx-accent);
    border-color: var(--qx-accent);
  }

  .paint-grid button {
    cursor: pointer;
    transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s ease;
  }

  .paint-grid button:active {
    transform: scale(0.92);
  }

  .paint-grid button.right {
    background: var(--qx-green);
    border-color: var(--qx-green);
  }

  .paint-grid button.wrong {
    background: var(--qx-danger-soft);
    border-color: var(--qx-danger);
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

  @media (max-width: 420px) {
    .stage {
      grid-template-columns: 1fr;
    }

    .panel {
      min-height: 128px;
    }
  }
</style>
