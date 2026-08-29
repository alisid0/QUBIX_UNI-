<script>
  export let prompt = 'Build the atom shown in the target.';
  export let targetName = 'Oxygen';
  export let targetProtons = 8;
  export let targetNeutrons = 8;
  export let targetElectrons = 8;
  export let correctFeedback = 'Correct. The atom matches the target.';
  export let incorrectFeedback = 'Not yet. Match protons, neutrons, and electrons.';
  export let onDone = () => {};

  let protons = 1;
  let neutrons = 1;
  let electrons = 1;
  let submitted = false;
  let correct = false;

  $: charge = protons - electrons;
  $: mass = protons + neutrons;
  $: shellDots = Array.from({ length: Math.min(electrons, 12) });

  function bump(kind, delta) {
    if (submitted) return;
    if (kind === 'p') protons = Math.max(0, Math.min(12, protons + delta));
    if (kind === 'n') neutrons = Math.max(0, Math.min(14, neutrons + delta));
    if (kind === 'e') electrons = Math.max(0, Math.min(12, electrons + delta));
  }

  function submit() {
    correct = protons === targetProtons && neutrons === targetNeutrons && electrons === targetElectrons;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="atom-builder">
  <div class="prompt">{prompt}</div>
  <div class="target">
    Target: <strong>{targetName}</strong>
    <span>{targetProtons}p / {targetNeutrons}n / {targetElectrons}e</span>
  </div>

  <div class="atom-stage">
    <div class="orbit">
      {#each shellDots as _, index}
        <span style={`--i:${index}; --total:${Math.max(shellDots.length, 1)};`}></span>
      {/each}
      <div class="nucleus">
        <strong>{protons}p</strong>
        <em>{neutrons}n</em>
      </div>
    </div>
    <div class="readout">
      <span>Mass {mass}</span>
      <span>Charge {charge === 0 ? '0' : charge > 0 ? `+${charge}` : charge}</span>
    </div>
  </div>

  <div class="controls">
    <div class="counter">
      <span>Protons</span>
      <strong>{protons}</strong>
      <div>
        <button on:click={() => bump('p', -1)}>-</button>
        <button on:click={() => bump('p', 1)}>+</button>
      </div>
    </div>
    <div class="counter">
      <span>Neutrons</span>
      <strong>{neutrons}</strong>
      <div>
        <button on:click={() => bump('n', -1)}>-</button>
        <button on:click={() => bump('n', 1)}>+</button>
      </div>
    </div>
    <div class="counter">
      <span>Electrons</span>
      <strong>{electrons}</strong>
      <div>
        <button on:click={() => bump('e', -1)}>-</button>
        <button on:click={() => bump('e', 1)}>+</button>
      </div>
    </div>
  </div>

  {#if !submitted}
    <button class="submit-btn" on:click={submit}>Scan atom</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .atom-builder {
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
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .target strong {
    color: var(--qx-text);
  }

  .atom-stage {
    width: 100%;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: radial-gradient(circle at 50% 45%, var(--qx-surface-2), var(--qx-surface));
    min-height: 230px;
    display: grid;
    place-items: center;
    gap: 9px;
    padding: 16px;
    box-sizing: border-box;
  }

  .orbit {
    width: 172px;
    height: 172px;
    border: 2px solid var(--qx-border-2);
    border-radius: 50%;
    position: relative;
    display: grid;
    place-items: center;
  }

  .orbit::before,
  .orbit::after {
    content: '';
    position: absolute;
    inset: 28px;
    border: 1px solid var(--qx-border);
    border-radius: 50%;
    transform: rotate(62deg) scaleX(1.35);
  }

  .orbit::after {
    transform: rotate(-62deg) scaleX(1.35);
  }

  .orbit span {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--qx-accent);
    transform:
      rotate(calc((360deg / var(--total)) * var(--i)))
      translateX(86px)
      rotate(calc((-360deg / var(--total)) * var(--i)));
    box-shadow: 0 0 0 4px var(--qx-accent-soft);
  }

  .nucleus {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background: var(--qx-accent-soft);
    border: 1.5px solid var(--qx-accent);
    color: var(--qx-accent-text);
    display: grid;
    place-items: center;
    position: relative;
    z-index: 1;
  }

  .nucleus strong,
  .nucleus em {
    font-style: normal;
    font-weight: 900;
    line-height: 1;
  }

  .nucleus strong {
    font-size: 22px;
  }

  .nucleus em {
    font-size: 14px;
    margin-top: -12px;
  }

  .readout {
    display: flex;
    gap: 8px;
  }

  .readout span {
    border-radius: 999px;
    background: var(--qx-surface-2);
    border: 1px solid var(--qx-border);
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 800;
    padding: 5px 10px;
  }

  .controls {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .counter {
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface);
    padding: 9px 7px;
    display: grid;
    gap: 6px;
    justify-items: center;
  }

  .counter span {
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--qx-text-faint);
  }

  .counter strong {
    font-size: 23px;
    font-weight: 900;
    color: var(--qx-text);
  }

  .counter div {
    display: flex;
    gap: 6px;
  }

  .counter button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--qx-border-2);
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font: 900 17px/1 var(--qx-font);
    cursor: pointer;
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
