<script>
  // Three rate comparisons, one at a time.
  //
  // The rates are concealed until the learner has decided. That is the whole
  // point of the activity: two counts and two totals are on screen, and the
  // question is which is proportionally larger. Showing 12.5% and 11.7% first
  // turns a judgement into reading a number off a card.
  //
  // Ported from a review-document script that mutated the DOM through
  // data-rate-* hooks and innerHTML. Here the rounds are state, so progress,
  // keyboard focus and the reader's own completion tracking all behave the way
  // they do everywhere else in the app.

  import { createEventDispatcher } from 'svelte';

  export let cases = [];
  export let completed = false;

  const dispatch = createEventDispatcher();

  let round = 0;
  let picked = null;      // 0, 1 or 2 (2 = equal)
  let revealed = false;   // rates are hidden until a decision is made
  let correct = false;
  let done = [];
  let busy = false;       // a settled round ignores further presses

  $: current = cases[round];
  $: finished = done.length === cases.length;
  $: choices = current
    ? [...current.branches.map((b, i) => [i, b.name]), [2, 'The rates are equal']]
    : [];

  function pick(index) {
    if (busy || revealed || completed || !current) return;
    busy = true;
    picked = index;
    revealed = true;
    correct = index === current.correct;
    busy = false;
  }

  function next() {
    if (!correct || !current) return;
    if (!done.includes(current.prompt)) done = [...done, current.prompt];
    picked = null; revealed = false; correct = false;
    if (round < cases.length - 1) { round += 1; return; }
    dispatch('complete');
  }

  function again() {
    // A wrong answer hides the rates again, so the next attempt is still a
    // judgement rather than a reading.
    picked = null; revealed = false; correct = false;
  }
</script>

<div class="rate-compare">
  <p class="progress" aria-live="polite">
    {finished || completed ? 'All three comparisons done' : `Comparison ${round + 1} of ${cases.length}`}
  </p>

  {#if current && !completed}
    <p class="question" id="rate-question">{current.prompt}</p>

    <div class="pair">
      {#each current.branches as branch, i}
        <section class="branch" class:chosen={revealed && picked === i}>
          <h4>{branch.name}</h4>
          <p class="fraction">
            <b>{branch.numerator}</b> <span>{branch.numeratorLabel}</span>
            <i aria-hidden="true"></i>
            <b>{branch.denominator}</b> <span>{branch.denominatorLabel}</span>
          </p>
          {#if revealed}
            <div class="reveal">
              <p class="result"><b>{branch.rate}</b> <span>{branch.rateCopy}</span></p>
              <div class="track" role="img" aria-label={`${branch.name}: ${branch.rateCopy}`}>
                <span style={`width:${Math.min(100, branch.width * 6)}%`}></span>
              </div>
            </div>
          {:else}
            <p class="hidden-note">Rate shown after you decide</p>
          {/if}
        </section>
      {/each}
    </div>

    <div class="choices" role="group" aria-labelledby="rate-question">
      {#each choices as [value, label]}
        <button
          class="choice"
          class:picked={picked === value}
          class:right={revealed && correct && picked === value}
          class:wrong={revealed && !correct && picked === value}
          class:answer={revealed && !correct && value === current.correct}
          aria-pressed={picked === value}
          disabled={revealed}
          on:click={() => pick(value)}>{label}</button>
      {/each}
    </div>

    <div class="feedback" role="status" aria-live="polite">
      {#if revealed && correct}
        <p class="good"><b>Yes.</b> {current.feedback}</p>
      {:else if revealed}
        <p class="not-yet"><b>Not that one.</b> {current.feedback}</p>
      {:else}
        <p class="waiting">Compare each count with the total beside it, then choose.</p>
      {/if}
    </div>

    {#if revealed && correct}
      <button class="advance" on:click={next}>
        {round === cases.length - 1 ? 'Finish' : 'Next comparison'}
      </button>
    {:else if revealed}
      <button class="advance retry" on:click={again}>Try this one again</button>
    {/if}
  {:else}
    <p class="all-done">Three comparisons, three different answers: one branch higher, the other
      branch higher, and one pair equal. A rate is a count measured against the total it came from.</p>
  {/if}
</div>

<style>
  .rate-compare { display: grid; gap: 13px; }

  .progress { margin: 0; color: #6d6558; font: 800 11px var(--qx-font, system-ui);
              letter-spacing: .1em; text-transform: uppercase; }
  .question { margin: 0; font: 700 18px/1.35 Georgia, serif; color: #20241f; }

  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .branch { padding: 14px; border: 2px solid #cbbfa6; border-radius: 10px; background: #fffdf7; }
  .branch.chosen { border-color: #20241f; }
  .branch h4 { margin: 0 0 8px; font: 800 15px var(--qx-font, system-ui); color: #20241f; }

  .fraction { margin: 0; display: grid; justify-items: center; gap: 1px;
              font: 600 13px var(--qx-font, system-ui); color: #6d6558; }
  .fraction b { font: 800 24px var(--qx-font, system-ui); color: #20241f; }
  .fraction i { display: block; width: 68px; height: 2px; margin: 5px 0; background: #20241f; }

  .hidden-note { margin: 10px 0 0; color: #8b8375; text-align: center;
                 font: 600 11.5px var(--qx-font, system-ui); }

  .reveal { margin-top: 10px; }
  .result { margin: 0; display: grid; justify-items: center; gap: 2px; }
  .result b { font: 800 19px var(--qx-font, system-ui); color: #8c4c2e; }
  .result span { color: #6d6558; font: 600 11.5px/1.3 var(--qx-font, system-ui); text-align: center; }
  .track { height: 9px; margin-top: 8px; border-radius: 5px; background: #e6dfd0; overflow: hidden; }
  .track span { display: block; height: 100%; background: #a85a34; }

  .choices { display: grid; gap: 8px; }
  .choice { width: 100%; min-height: 46px; padding: 11px 15px; text-align: left; cursor: pointer;
            border: 2px solid #cbbfa6; border-radius: 10px; background: #fff; color: #20241f;
            font: 650 15px/1.35 var(--qx-font, system-ui); }
  .choice:hover:not(:disabled) { border-color: #a85a34; }
  .choice:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .choice.picked { border-color: #20241f; }
  /* Never colour alone: the chosen answer is also marked in words. */
  .choice.right { border-color: #3e9e2a; background: #e7f1e2; color: #2c6b1c; }
  .choice.right::after { content: ' — correct'; font-weight: 800; }
  .choice.wrong { border-color: #b3402e; background: #f7e7e3; }
  .choice.wrong::after { content: ' — not this one'; font-weight: 800; color: #8c3a2a; }
  .choice.answer { border-color: #3e9e2a; }
  .choice.answer::after { content: ' — this one'; font-weight: 800; color: #2c6b1c; }
  .choice:disabled { cursor: default; }

  .feedback { min-height: 46px; }
  .feedback p { margin: 0; font: 600 14px/1.5 var(--qx-font, system-ui); }
  .good { color: #2c6b1c; }
  .not-yet { color: #8c3a2a; }
  .waiting { color: #8b8375; }

  .advance { min-height: 46px; padding: 0 20px; border: 0; border-radius: 11px; cursor: pointer;
             background: #20241f; color: #fff; font: 800 15px var(--qx-font, system-ui); }
  .advance.retry { background: #fffdf7; color: #20241f; border: 2px solid #20241f; }
  .advance:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }

  .all-done { margin: 0; color: #4a4436; font: 600 15px/1.6 var(--qx-font, system-ui); max-width: 60ch; }

  @media (max-width: 620px) {
    .pair { grid-template-columns: 1fr; }
    .question { font-size: 16.5px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .track span { transition: none; }
  }

  @media (forced-colors: active) {
    .choice.right, .choice.answer, .choice.wrong { border-color: CanvasText; }
    .track span { background: CanvasText; }
  }
</style>
