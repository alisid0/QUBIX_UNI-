<script>
  export let prompt = 'Check the units before trusting the answer.';
  export let expression = '';
  export let target = '';
  export let options = [];
  export let correctOption = '';
  export let correctFeedback = 'Correct. The units match the physical meaning.';
  export let incorrectFeedback = 'Not yet. Cancel the units and check what remains.';
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

  function choose(id) {
    if (submitted) return;
    selected = id;
  }

  function submit() {
    correct = selected === correctOption;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }

  $: {
    const nextKey = options.map((option) => option.id).join('|');
    if (nextKey !== optionsKey) {
      optionsKey = nextKey;
      shuffledOptions = shuffle(options);
      selected = null;
      submitted = false;
      correct = false;
    }
  }
</script>

<div class="unit-check">
  <div class="prompt">{prompt}</div>

  <div class="equation-card">
    <span class="label">Unit test</span>
    <strong>{expression}</strong>
    <small>{target}</small>
  </div>

  <div class="options">
    {#each shuffledOptions as opt}
      <button
        class:selected={selected === opt.id}
        class:right={submitted && opt.id === correctOption}
        class:wrong={submitted && selected === opt.id && opt.id !== correctOption}
        on:click={() => choose(opt.id)}
      >
        <span>{opt.label}</span>
        {#if opt.note}<small>{opt.note}</small>{/if}
      </button>
    {/each}
  </div>

  {#if !submitted}
    <button class="submit-btn" disabled={!selected} on:click={submit}>Check units</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .unit-check {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .equation-card {
    width: 100%;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
    padding: 14px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }

  .label {
    color: var(--qx-accent);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  strong {
    color: var(--qx-text);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 22px;
    font-weight: 900;
    line-height: 1.25;
  }

  .equation-card small {
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 750;
    line-height: 1.35;
  }

  .options {
    width: 100%;
    display: grid;
    gap: 8px;
  }

  .options button {
    min-height: 48px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    font-family: var(--qx-font);
    cursor: pointer;
    text-align: left;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .options button span {
    font-size: 14px;
    font-weight: 850;
  }

  .options button small {
    color: var(--qx-text-faint);
    font-size: 11px;
    font-weight: 650;
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
</style>
