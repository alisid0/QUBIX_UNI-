<script>
  export let prompt = 'Set the forces so the object does what the target says.';
  export let target = 'balanced';
  export let startLeft = 1;
  export let startRight = 1;
  export let correctFeedback = 'Correct. The net force matches the target.';
  export let incorrectFeedback = 'Not yet. Compare the left and right pushes.';
  export let onDone = () => {};

  let left = startLeft;
  let right = startRight;
  let submitted = false;
  let correct = false;

  $: net = right - left;
  $: state = net === 0 ? 'balanced' : net > 0 ? 'right' : 'left';
  $: cartShift = Math.max(-28, Math.min(28, net * 9));
  $: targetLabel = target === 'balanced' ? 'No movement' : `Move ${target}`;

  function bump(side, delta) {
    if (submitted) return;
    if (side === 'left') left = Math.max(0, Math.min(5, left + delta));
    if (side === 'right') right = Math.max(0, Math.min(5, right + delta));
  }

  function submit() {
    correct = state === target;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="force-balance">
  <div class="prompt">{prompt}</div>
  <div class="target">Target: <strong>{targetLabel}</strong></div>

  <div class="stage">
    <div class="arrow left" style={`--power:${left};`}></div>
    <div class="track">
      <div class="cart" style={`transform: translateX(${cartShift}px);`}>
        <span></span>
      </div>
    </div>
    <div class="arrow right" style={`--power:${right};`}></div>
  </div>

  <div class="meters">
    <div class="meter">
      <span>Left push</span>
      <strong>{left}</strong>
      <div>
        <button on:click={() => bump('left', -1)} aria-label="Reduce left force">-</button>
        <button on:click={() => bump('left', 1)} aria-label="Increase left force">+</button>
      </div>
    </div>
    <div class="meter">
      <span>Right push</span>
      <strong>{right}</strong>
      <div>
        <button on:click={() => bump('right', -1)} aria-label="Reduce right force">-</button>
        <button on:click={() => bump('right', 1)} aria-label="Increase right force">+</button>
      </div>
    </div>
  </div>

  <div class="net">Net force: <strong>{state}</strong></div>

  {#if !submitted}
    <button class="submit-btn" on:click={submit}>Test motion</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .force-balance {
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

  .target,
  .net {
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

  .target strong,
  .net strong {
    color: var(--qx-text);
    text-transform: capitalize;
  }

  .stage {
    width: 100%;
    min-height: 132px;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: linear-gradient(180deg, var(--qx-surface), var(--qx-surface-2));
    display: grid;
    grid-template-columns: 76px 1fr 76px;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
  }

  .track {
    height: 64px;
    border-bottom: 3px solid var(--qx-border-2);
    display: grid;
    place-items: end center;
  }

  .cart {
    width: 72px;
    height: 42px;
    border-radius: 8px 8px 5px 5px;
    background: var(--qx-accent);
    position: relative;
    transition: transform 0.22s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  }

  .cart span,
  .cart::after {
    content: '';
    position: absolute;
    bottom: -8px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--qx-text);
  }

  .cart span { left: 12px; }
  .cart::after { right: 12px; }

  .arrow {
    height: calc(10px + var(--power) * 6px);
    min-height: 10px;
    border-radius: 999px;
    background: var(--qx-accent-soft);
    border: 1px solid var(--qx-accent);
    position: relative;
    opacity: calc(0.35 + var(--power) * 0.11);
  }

  .arrow::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
  }

  .arrow.left::after {
    right: -14px;
    border-left: 15px solid var(--qx-accent);
  }

  .arrow.right::after {
    left: -14px;
    border-right: 15px solid var(--qx-accent);
  }

  .meters {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .meter {
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface);
    padding: 10px;
    display: grid;
    gap: 7px;
    justify-items: center;
  }

  .meter span {
    font-size: 11px;
    font-weight: 820;
    color: var(--qx-text-faint);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .meter strong {
    font-size: 26px;
    font-weight: 900;
    color: var(--qx-text);
  }

  .meter div {
    display: flex;
    gap: 8px;
  }

  .meter button {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid var(--qx-border-2);
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font: 900 18px/1 var(--qx-font);
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
