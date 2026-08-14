<script>
  export let prompt = 'Send the point through the matrix machine.';
  export let matrix = [[2, 0], [0, 1]];
  export let inputPoint = [2, 3];
  export let options = [[4, 3], [2, 6], [4, 6]];
  export let correctFeedback = 'Correct. The matrix transformed the point.';
  export let incorrectFeedback = 'Not yet. Multiply the x and y parts by the matrix rules.';
  export let onDone = () => {};

  let selected = null;
  let submitted = false;
  let correct = false;
  let shuffledOptions = [];
  let optionsKey = '';

  function shuffle(list = []) {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  $: outputPoint = [
    matrix[0][0] * inputPoint[0] + matrix[0][1] * inputPoint[1],
    matrix[1][0] * inputPoint[0] + matrix[1][1] * inputPoint[1]
  ];

  function samePoint(a, b) {
    return a?.[0] === b?.[0] && a?.[1] === b?.[1];
  }

  function submit() {
    correct = samePoint(selected, outputPoint);
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }

  $: {
    const nextKey = options.map((option) => option.join(',')).join('|');
    if (nextKey !== optionsKey) {
      optionsKey = nextKey;
      shuffledOptions = shuffle(options);
      selected = null;
      submitted = false;
      correct = false;
    }
  }
</script>

<div class="matrix-transform">
  <div class="prompt">{prompt}</div>

  <div class="machine">
    <div class="matrix">
      <span>{matrix[0][0]}</span><span>{matrix[0][1]}</span>
      <span>{matrix[1][0]}</span><span>{matrix[1][1]}</span>
    </div>
    <div class="arrow">Point ({inputPoint[0]}, {inputPoint[1]})</div>
  </div>

  <div class="plane" aria-hidden="true">
    <div class="axis x"></div>
    <div class="axis y"></div>
    <span class="dot input" style={`--x:${inputPoint[0]}; --y:${inputPoint[1]};`}>in</span>
    {#if submitted}
      <span class="dot output" style={`--x:${outputPoint[0]}; --y:${outputPoint[1]};`}>out</span>
    {/if}
  </div>

  <div class="options">
    {#each shuffledOptions as opt}
      <button
        class:selected={samePoint(selected, opt)}
        class:right={submitted && samePoint(outputPoint, opt)}
        class:wrong={submitted && samePoint(selected, opt) && !samePoint(outputPoint, opt)}
        on:click={() => { if (!submitted) selected = opt; }}
      >
        ({opt[0]}, {opt[1]})
      </button>
    {/each}
  </div>

  {#if !submitted}
    <button class="submit-btn" disabled={!selected} on:click={submit}>Run matrix</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .matrix-transform {
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

  .machine {
    width: 100%;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface);
    padding: 13px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .matrix {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    padding: 10px 14px;
    border-left: 3px solid var(--qx-accent);
    border-right: 3px solid var(--qx-accent);
    border-radius: 5px;
  }

  .matrix span {
    width: 34px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 6px;
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 18px;
    font-weight: 900;
  }

  .arrow {
    color: var(--qx-text-dim);
    font-size: 13px;
    font-weight: 850;
  }

  .plane {
    width: 100%;
    height: 190px;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background:
      linear-gradient(var(--qx-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--qx-border) 1px, transparent 1px),
      var(--qx-surface-2);
    background-size: 24px 24px;
    position: relative;
    overflow: hidden;
  }

  .axis {
    position: absolute;
    background: var(--qx-border-2);
  }

  .axis.x {
    height: 2px;
    left: 0;
    right: 0;
    top: 50%;
  }

  .axis.y {
    width: 2px;
    top: 0;
    bottom: 0;
    left: 50%;
  }

  .dot {
    position: absolute;
    left: calc(50% + var(--x) * 18px);
    top: calc(50% - var(--y) * 18px);
    transform: translate(-50%, -50%);
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .dot.input {
    background: var(--qx-surface);
    color: var(--qx-text);
    border: 1.5px solid var(--qx-border-2);
  }

  .dot.output {
    background: var(--qx-accent);
    color: #fff;
    box-shadow: 0 0 0 6px var(--qx-accent-soft);
  }

  .options {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .options button {
    min-height: 42px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .options button.selected {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  .options button.right {
    border-color: var(--qx-green);
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .options button.wrong {
    border-color: var(--qx-danger);
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
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

  .submit-btn:disabled {
    opacity: 0.45;
    cursor: default;
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

  @media (max-width: 380px) {
    .options {
      grid-template-columns: 1fr;
    }
  }
</style>
