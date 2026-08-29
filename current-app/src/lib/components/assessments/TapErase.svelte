<script>
  // TapErase — tap one anchor dot to change the segment
  export let onDone = () => {};

  let leftGone = false;
  let rightGone = false;
  let answered = false;
  let selectedAnswer = null;
  let correct = false;

  $: erased = leftGone || rightGone;

  const options = [
    { id: 'ray', label: 'A ray' },
    { id: 'broken', label: 'A broken segment' },
    { id: 'line', label: 'A true line' }
  ];
  const shuffledOptions = shuffle(options);

  function shuffle(list = []) {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function tapLeft() { if (!erased) { leftGone = true; leftGone = leftGone; } }
  function tapRight() { if (!erased) { rightGone = true; rightGone = rightGone; } }

  function choose(id) {
    if (answered) return;
    selectedAnswer = id;
    answered = true;
    correct = id === 'ray';
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="tap-erase">
  <div class="prompt">You are looking at a line segment. It has two ends — tap one to erase it.</div>

  <svg viewBox="0 0 300 120" class="stage">
    <!-- Segment line -->
    {#if !leftGone && !rightGone}
      <line x1="60" y1="60" x2="240" y2="60" stroke="var(--qx-accent)" stroke-width="3" stroke-linecap="round"/>
    {:else if rightGone}
      <!-- Left anchor gone → line going right forever -->
      <line x1="60" y1="60" x2="300" y2="60" stroke="var(--qx-accent)" stroke-width="3" stroke-linecap="round"/>
      <line x1="290" y1="55" x2="300" y2="60" stroke="var(--qx-accent)" stroke-width="2"/>
      <line x1="290" y1="65" x2="300" y2="60" stroke="var(--qx-accent)" stroke-width="2"/>
    {:else if leftGone}
      <!-- Right anchor gone → line going left forever -->
      <line x1="0" y1="60" x2="240" y2="60" stroke="var(--qx-accent)" stroke-width="3" stroke-linecap="round"/>
      <line x1="10" y1="55" x2="0" y2="60" stroke="var(--qx-accent)" stroke-width="2"/>
      <line x1="10" y1="65" x2="0" y2="60" stroke="var(--qx-accent)" stroke-width="2"/>
    {/if}

    <!-- Anchor dots -->
    {#if !leftGone}
      <circle cx="60" cy="60" r="8" fill="var(--qx-surface)" stroke="var(--qx-accent)" stroke-width="2.5" class="anchor"
        role="button" tabindex="0" aria-label="Erase the left endpoint" on:click={tapLeft}
        on:keydown={(event) => (event.key === 'Enter' || event.key === ' ') && tapLeft()}/>
    {/if}
    {#if !rightGone}
      <circle cx="240" cy="60" r="8" fill="var(--qx-surface)" stroke="var(--qx-accent)" stroke-width="2.5" class="anchor"
        role="button" tabindex="0" aria-label="Erase the right endpoint" on:click={tapRight}
        on:keydown={(event) => (event.key === 'Enter' || event.key === ' ') && tapRight()}/>
    {/if}
  </svg>

  {#if erased && !answered}
    <div class="question">What did you just create?</div>
    <div class="options">
      {#each shuffledOptions as opt}
        <button class="opt-btn" on:click={() => choose(opt.id)}>{opt.label}</button>
      {/each}
    </div>
  {/if}

  {#if answered}
    <div class="feedback" class:correct class:incorrect={!correct}>
      {correct
        ? 'Exactly. It is still anchored on one side, but now it shoots off forever on the other.'
        : 'Not quite. Erasing one end leaves an anchor on the other side — that is a ray.'}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .tap-erase {
    display: flex; flex-direction: column; align-items: center; gap: 16px;
    width: 100%; max-width: 360px; margin: 0 auto;
  }
  .prompt {
    font-size: 15px; font-weight: 700; color: var(--qx-text); text-align: center;
  }
  .stage {
    width: 100%; height: auto; background: var(--qx-surface-2);
    border-radius: 12px; border: 1.5px solid var(--qx-border-2);
  }
  .anchor { cursor: pointer; transition: r 0.2s; }
  .anchor:hover { r: 10; }
  .question {
    font-size: 14px; font-weight: 700; color: var(--qx-text);
  }
  .options { display: flex; flex-direction: column; gap: 8px; width: 100%; }
  .opt-btn {
    padding: 12px; border-radius: 10px; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); font-family: var(--qx-font);
    font-size: 14px; font-weight: 700; color: var(--qx-text); cursor: pointer;
  }
  .opt-btn:hover { border-color: var(--qx-accent); }
  .feedback {
    font-size: 13px; font-weight: 600; padding: 12px; border-radius: 8px;
    text-align: center; line-height: 1.5;
  }
  .feedback.correct { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .feedback.incorrect { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .continue-btn {
    padding: 12px 32px; border-radius: 24px; border: none;
    background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 14px; font-weight: 800; cursor: pointer;
  }
</style>
