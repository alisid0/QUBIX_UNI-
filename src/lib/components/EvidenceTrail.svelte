<script>
  // Five decisions that build one number's trail, from the records it started
  // in to the place the result is saved.
  //
  // The trail is the mechanic, not the decoration. A correct decision adds a
  // stage to it and a wrong one does not, so what the learner is assembling is
  // visible the whole way and cannot be assembled by guessing. At the end the
  // finished trail sits under the reported figure: this is where £84,320 came
  // from, in five steps anybody can follow back.
  //
  // The last decision is the one that matters most. The result is saved
  // separately and the original records are kept, because a number nobody can
  // trace back to its source is a number nobody can check.
  //
  // Ported from a review-document script that wrote into data-lineage-* hooks.

  import { createEventDispatcher } from 'svelte';

  export let steps = [];
  export let target = { label: 'Reported result', name: 'Weekly revenue', value: '£84,320' };
  export let completed = false;

  const dispatch = createEventDispatcher();

  let round = 0;
  let picked = null;
  let answered = false;
  let correct = false;
  let built = 0;        // stages on the trail so far

  $: current = steps[round];
  $: last = round === steps.length - 1;
  $: trail = steps.slice(0, built);

  // A second press cannot get in. The early return below reads the settled flag
  // that this same handler set, so the second press is rejected by the first
  // one having already happened, and the buttons are disabled from the next
  // render onward.
  //
  // A no-op flag used to sit here, set true and false again inside one
  // synchronous handler. It read like protection and blocked nothing.

  function pick(index) {
    if (answered || completed || !current) return;
    picked = index;
    answered = true;
    correct = index === current.correct;
    // The trail only ever grows on a correct decision.
    if (correct) built = round + 1;
  }

  function next() {
    if (!correct) return;
    picked = null; answered = false; correct = false;
    if (!last) { round += 1; return; }
    dispatch('complete');
  }

  function again() { picked = null; answered = false; correct = false; }
</script>

<div class="trail-exercise">
  <div class="target">
    <span>{target.label}</span>
    <b>{target.name}</b>
    <strong>{target.value}</strong>
  </div>

  <p class="progress" aria-live="polite">
    {completed ? `All ${steps.length} stages traced` : `Decision ${round + 1} of ${steps.length}`}
  </p>

  <ol class="trail" aria-label={`The trail so far: ${trail.length} of ${steps.length} stages`}>
    {#each steps as step, i}
      <li class:done={i < built} class:pending={i >= built}>
        <span class="phase">{step.phase}</span>
        {#if i < built}
          <b>{step.title}</b>
          <small>{step.detail}</small>
        {:else}
          <b class="unknown">not traced yet</b>
        {/if}
      </li>
    {/each}
  </ol>

  {#if current && !completed}
    <p class="question" id="trail-question">{current.prompt}</p>

    <div class="choices" role="group" aria-labelledby="trail-question">
      {#each current.options as label, i}
        <button
          class="choice"
          class:picked={picked === i}
          class:right={answered && correct && picked === i}
          class:wrong={answered && !correct && picked === i}
          class:answer={answered && !correct && i === current.correct}
          aria-pressed={picked === i}
          disabled={answered}
          on:click={() => pick(i)}>{label}</button>
      {/each}
    </div>

    <div class="feedback" role="status" aria-live="polite">
      {#if answered && correct}
        <p class="good"><b>Added to the trail.</b> {current.explanation}</p>
      {:else if answered}
        <p class="not-yet"><b>That does not go on the trail.</b> {current.explanation}</p>
      {:else}
        <p class="waiting">Choose the step that belongs at this point in the trail.</p>
      {/if}
    </div>

    {#if answered && correct}
      <button class="advance" on:click={next}>{last ? 'Finish the trail' : 'Next decision'}</button>
    {:else if answered}
      <button class="advance retry" on:click={again}>Try this one again</button>
    {/if}
  {:else}
    <p class="all-done">Five stages, and the number can be followed back through every one of them.
      The original records were kept, so anybody who doubts the figure can check it rather than
      take it on trust.</p>
  {/if}
</div>

<style>
  .trail-exercise { display: grid; gap: 13px; }

  .target { display: grid; gap: 2px; padding: 13px 16px; border: 2px solid #20241f;
            border-radius: 10px; background: #fffdf7; }
  .target span { color: #8b8375; font: 800 11px var(--qx-font, system-ui); letter-spacing: .1em;
                 text-transform: uppercase; }
  .target b { font: 700 15px var(--qx-font, system-ui); color: #20241f; }
  .target strong { font: 800 27px var(--qx-font, system-ui); color: #8c4c2e; }

  .progress { margin: 0; color: #6d6558; font: 800 11px var(--qx-font, system-ui);
              letter-spacing: .1em; text-transform: uppercase; }

  .trail { display: grid; gap: 7px; margin: 0; padding: 0; list-style: none; }
  .trail li { display: grid; gap: 1px; padding: 10px 13px; border-radius: 9px;
              border: 2px solid #e0d8c8; background: #fff; }
  /* A traced stage is filled and carries a tick; an untraced one is dashed and
     says so in words. Never the colour alone. */
  .trail li.done { border-color: #3e9e2a; background: #f2f7ef; }
  .trail li.pending { border-style: dashed; background: transparent; }
  .trail .phase { color: #8c4c2e; font: 800 11px var(--qx-font, system-ui); letter-spacing: .1em;
                  text-transform: uppercase; }
  .trail li.done .phase::after { content: ' ✓'; color: #2c6b1c; }
  .trail li b { font: 800 15px var(--qx-font, system-ui); color: #20241f; }
  .trail li b.unknown { color: #a09781; font-weight: 650; font-style: italic; }
  .trail li small { color: #6d6558; font: 650 12.5px var(--qx-font, system-ui); }

  .question { margin: 0; font: 700 18px/1.35 Georgia, serif; color: #20241f; }

  .choices { display: grid; gap: 8px; }
  .choice { width: 100%; min-height: 46px; padding: 11px 15px; text-align: left; cursor: pointer;
            border: 2px solid #cbbfa6; border-radius: 10px; background: #fff; color: #20241f;
            font: 650 15px/1.35 var(--qx-font, system-ui); }
  .choice:hover:not(:disabled) { border-color: #a85a34; }
  .choice:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .choice.picked { border-color: #20241f; }
  .choice.right { border-color: #3e9e2a; background: #e7f1e2; color: #2c6b1c; }
  .choice.right::after { content: ' — correct'; font-weight: 800; }
  .choice.wrong { border-color: #b3402e; background: #f7e7e3; }
  .choice.wrong::after { content: ' — not this one'; font-weight: 800; color: #8c3a2a; }
  .choice.answer { border-color: #3e9e2a; }
  .choice.answer::after { content: ' — this one'; font-weight: 800; color: #2c6b1c; }
  .choice:disabled { cursor: default; }

  .feedback { min-height: 44px; }
  .feedback p { margin: 0; font: 600 14px/1.5 var(--qx-font, system-ui); }
  .good { color: #2c6b1c; }
  .not-yet { color: #8c3a2a; }
  .waiting { color: #8b8375; }

  .advance { min-height: 46px; padding: 0 20px; border: 0; border-radius: 11px; cursor: pointer;
             background: #20241f; color: #fff; font: 800 15px var(--qx-font, system-ui); }
  .advance.retry { background: #fffdf7; color: #20241f; border: 2px solid #20241f; }
  .advance:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }

  .all-done { margin: 0; color: #4a4436; font: 600 15px/1.6 var(--qx-font, system-ui); max-width: 62ch; }

  @media (max-width: 620px) {
    .question { font-size: 16.5px; }
    .target strong { font-size: 23px; }
  }

  @media (forced-colors: active) {
    .trail li.done { border-color: CanvasText; }
    .choice.right, .choice.answer, .choice.wrong { border-color: CanvasText; }
  }
</style>
