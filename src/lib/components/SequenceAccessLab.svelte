<script>
  import { DSA_SEQUENCE_PREVIEW as lesson, inspectionsToFind } from '../content/dsa-sequence-preview.js';

  let stage = 0;
  let directChoice = null;
  let directDone = false;
  let inspected = 0;
  let searchDone = false;
  let prediction = null;

  $: targetSearchIndex = lesson.items.indexOf(lesson.search.target);
  $: revealedCount = searchDone ? targetSearchIndex + 1 : inspected;

  function chooseDirect(index) {
    directChoice = index;
    directDone = index === lesson.direct.targetIndex;
  }

  function inspectNext() {
    if (searchDone) return;
    inspected += 1;
    if (inspected - 1 === targetSearchIndex) searchDone = true;
  }

  function reset() {
    stage = 0;
    directChoice = null;
    directDone = false;
    inspected = 0;
    searchDone = false;
    prediction = null;
  }
</script>

<section class="lab" aria-labelledby="lab-heading">
  <div class="lab-head">
    <div><p class="eyebrow">DO · {stage + 1} OF 3</p><h2 id="lab-heading">The dispatch shelf</h2></div>
    <div class="step-meter" aria-label={`Step ${stage + 1} of 3`}>
      {#each [0, 1, 2] as marker}<span class:active={marker <= stage}></span>{/each}
    </div>
  </div>

  {#if stage === 0}
    <p class="ticket">{lesson.direct.prompt}</p>
    <p class="instruction">You have the address. Choose that position—counting begins at 0.</p>
    <div class="shelf" aria-label="A sequence of sixteen labelled items">
      {#each lesson.items as item, index}
        <button class:selected={directChoice === index} class:correct={directDone && index === lesson.direct.targetIndex} on:click={() => chooseDirect(index)} aria-label={`Position ${index}, item ${item}`}>
          <span class="index">{index}</span><strong>{item}</strong>
        </button>
      {/each}
    </div>
    {#if directChoice !== null}
      <p class:good={directDone} class:try-again={!directDone} class="feedback" aria-live="polite">
        {directDone ? 'One address, one inspection. The other fifteen items did not need checking.' : `Position ${directChoice} is a different address. Use the number on the ticket, not the label.`}
      </p>
    {/if}
    <button class="primary" disabled={!directDone} on:click={() => stage = 1}>Change the question →</button>
  {:else if stage === 1}
    <p class="ticket">{lesson.search.prompt}</p>
    <p class="instruction">Now you have an identity, not an address. Inspect from the beginning until the labels match.</p>
    <div class="shelf search" aria-label="Sequence being searched from left to right">
      {#each lesson.items as item, index}
        <div class:revealed={index < revealedCount} class:found={searchDone && index === targetSearchIndex}>
          <span class="index">{index}</span><strong>{index < revealedCount ? item : '????'}</strong>
        </div>
      {/each}
    </div>
    <div class="work-meter"><span>Inspections</span><strong>{inspected}</strong><div><i style={`width: ${(inspected / lesson.items.length) * 100}%`}></i></div></div>
    {#if searchDone}<p class="feedback good" aria-live="polite">Found after {inspectionsToFind(lesson.items, lesson.search.target)} inspections. Without an address, every earlier label mattered.</p>{/if}
    <button class="primary" disabled={searchDone} on:click={inspectNext}>{searchDone ? 'Target found' : 'Inspect next item'}</button>
    <button class="secondary" disabled={!searchDone} on:click={() => stage = 2}>Explain the pattern →</button>
  {:else}
    <p class="ticket">{lesson.prediction.prompt}</p>
    <div class="answers">
      {#each lesson.prediction.answers as answer}
        <button class:chosen={prediction === answer.id} class:answer-correct={prediction === answer.id && answer.id === lesson.prediction.correct} on:click={() => prediction = answer.id}>{answer.label}</button>
      {/each}
    </div>
    {#if prediction}
      <p class:good={prediction === lesson.prediction.correct} class:try-again={prediction !== lesson.prediction.correct} class="feedback" aria-live="polite">
        {prediction === lesson.prediction.correct ? 'Yes. Twice as many possible positions means up to about twice as many inspections.' : 'Replay the search in your head: if the target is last, every new item adds another possible inspection.'}
      </p>
    {/if}
    {#if prediction === lesson.prediction.correct}
      <div class="reveal"><div><span>Known index</span><strong>O(1)</strong><small>work stays roughly constant</small></div><div><span>Unknown position</span><strong>O(n)</strong><small>work grows with the sequence</small></div></div>
      <p class="precision"><strong>Precision note:</strong> Big O describes how work grows, not exact seconds. Hardware and implementation details still affect real running time.</p>
      <button class="secondary" on:click={reset}>Replay the shelf</button>
    {/if}
  {/if}
</section>

<style>
  .lab { background: var(--qx-ink); color: var(--qx-ink-text); border: 3px solid #000; box-shadow: 8px 8px 0 #000; padding: clamp(18px, 4vw, 32px); }
  .lab-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }
  .eyebrow { margin: 0 0 4px; color: var(--qx-ink-accent); font-size: 12px; font-weight: 900; letter-spacing: .14em; }
  h2 { margin: 0; font-size: clamp(25px, 5vw, 38px); line-height: 1.05; }
  .step-meter { display: flex; gap: 5px; padding-top: 7px; }
  .step-meter span { width: 24px; height: 6px; background: var(--qx-ink-line-2); }
  .step-meter span.active { background: var(--qx-ink-accent); }
  .ticket { margin: 25px 0 8px; background: var(--qx-slip); color: var(--qx-slip-ink); border: 2px solid #000; padding: 14px 16px; font-weight: 900; box-shadow: 4px 4px 0 #000; }
  .instruction { color: var(--qx-ink-text-2); margin: 14px 0; }
  .shelf { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); border: 2px solid #000; background: #000; gap: 2px; }
  .shelf button, .shelf > div { min-width: 0; min-height: 68px; border: 0; background: var(--qx-slip); color: var(--qx-slip-ink); display: flex; flex-direction: column; justify-content: space-between; padding: 7px; text-align: left; cursor: pointer; }
  .shelf > div { cursor: default; background: var(--qx-ink-panel); color: var(--qx-ink-text-dim); }
  .shelf > div.revealed { background: var(--qx-slip); color: var(--qx-slip-ink); }
  .shelf > div.found, .shelf button.correct { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .shelf button:hover, .shelf button:focus-visible, .shelf button.selected { outline: 3px solid var(--qx-ink-accent); outline-offset: -3px; }
  .index { font: 800 11px/1 var(--qx-font); opacity: .68; }
  .shelf strong { overflow: hidden; font-size: 11px; }
  button { font: inherit; }
  .primary, .secondary { margin-top: 16px; min-height: 46px; padding: 10px 16px; border: 2px solid #000; font-weight: 900; cursor: pointer; }
  .primary { background: var(--qx-ink-accent); color: #171510; box-shadow: 4px 4px 0 #000; }
  .secondary { background: transparent; color: var(--qx-ink-text); border-color: var(--qx-ink-line-2); margin-left: 10px; }
  button:disabled { opacity: .38; cursor: not-allowed; }
  .feedback { border-left: 4px solid currentColor; padding: 9px 12px; margin: 16px 0 0; }
  .good { color: var(--qx-ink-good); }
  .try-again { color: var(--qx-ink-bad); }
  .work-meter { display: grid; grid-template-columns: auto auto; gap: 5px 12px; margin-top: 18px; align-items: center; }
  .work-meter span { color: var(--qx-ink-text-2); }
  .work-meter strong { font-size: 24px; }
  .work-meter div { grid-column: 1 / -1; height: 8px; background: var(--qx-ink-line-2); }
  .work-meter i { display: block; height: 100%; background: var(--qx-ink-accent); transition: width .18s ease; }
  .answers { display: grid; gap: 9px; margin-top: 18px; }
  .answers button { padding: 13px 15px; text-align: left; color: var(--qx-ink-text); background: var(--qx-ink-panel); border: 1px solid var(--qx-ink-line-2); cursor: pointer; }
  .answers button.chosen { border-color: var(--qx-ink-accent); }
  .answers button.answer-correct { color: var(--qx-ink-good); border-color: var(--qx-ink-good); }
  .reveal { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
  .reveal div { border: 1px solid var(--qx-ink-line-2); padding: 16px; }
  .reveal span, .reveal small { display: block; color: var(--qx-ink-text-2); }
  .reveal strong { display: block; margin: 5px 0; color: var(--qx-ink-accent); font-size: 32px; }
  .precision { font-size: 14px; color: var(--qx-ink-text-2); }
  @media (max-width: 680px) { .shelf { grid-template-columns: repeat(4, minmax(0, 1fr)); } .shelf button, .shelf > div { min-height: 60px; } .reveal { grid-template-columns: 1fr; } .secondary { margin-left: 0; } }
</style>
