<script>
  // The growth bench. Three steps, matching the approved insertion bench:
  // perform the operation, compare the strategies, then transfer the pattern.
  //
  // Step 1 makes the learner pay the resize by hand, one copy per click, so the
  // cost is felt before it is counted. Wrong answers are shown rather than
  // described: overwriting destroys a real label on screen, refusing leaves the
  // waiting item stranded.

  import { DSA_ARRAY_GROWTH_PREVIEW as lesson, growthTrace, growthSummary } from '../content/dsa-array-growth-preview.js';

  const traces = Object.fromEntries(
    lesson.strategies.map(s => [s.id, growthTrace(s.id, lesson.appendTarget, lesson.startCapacity)])
  );
  const summaries = Object.fromEntries(
    lesson.strategies.map(s => [s.id, growthSummary(s.id, lesson.appendTarget, lesson.startCapacity)])
  );
  const atSize = growthSummary('double', lesson.transferAppends, lesson.startCapacity);

  let stage = 0;

  /* step 1: the full array */
  let choice = null;
  let destroyed = null;
  let stranded = false;
  let bigger = null;          // the larger array, once the learner claims it
  let copiedCount = 0;
  let placed = false;
  let feedback = '';

  /* step 2: the race */
  let prediction = null;
  let n = 0;

  /* step 3: the count */
  let inspected = [];
  let selected = null;
  let transfer = null;

  const grown = lesson.startCapacity * 2;

  $: resizeDone = copiedCount === lesson.full.items.length;
  $: laneState = lesson.strategies.map(s => {
    const at = n === 0 ? null : traces[s.id][n - 1];
    return {
      ...s,
      capacity: at ? at.capacity : lesson.startCapacity,
      total: at ? at.totalCopies : 0,
      justGrew: at ? at.grew : false,
      justCopied: at ? at.copied : 0
    };
  });
  $: raceDone = n === lesson.appendTarget;
  $: allInspected = lesson.strategies.every(s => inspected.includes(s.id));
  $: selectedSummary = selected ? summaries[selected] : null;
  $: selectedStrategy = lesson.strategies.find(s => s.id === selected) || null;

  function pick(id) {
    choice = id;
    const option = lesson.full.choices.find(c => c.id === id);
    if (id === 'overwrite') {
      destroyed = lesson.full.items[0];
      stranded = false;
      feedback = option.cost + ' The array never grew, and the collection is now wrong.';
      return;
    }
    if (id === 'refuse') {
      destroyed = null;
      stranded = true;
      feedback = option.cost;
      return;
    }
    destroyed = null;
    stranded = false;
    bigger = Array(grown).fill(null);
    feedback = 'A ' + grown + '-slot array is claimed. Nothing is in it yet. Copy each item across.';
  }

  function copyNext() {
    if (!bigger || resizeDone) return;
    const next = [...bigger];
    next[copiedCount] = lesson.full.items[copiedCount];
    bigger = next;
    copiedCount += 1;
    feedback = copiedCount === lesson.full.items.length
      ? 'All ' + lesson.full.items.length + ' items copied. That is the price of this one append, and there is room again.'
      : 'Copied ' + lesson.full.items[copiedCount - 1] + '. ' + (lesson.full.items.length - copiedCount) + ' to go.';
  }

  function placeWaiting() {
    if (!resizeDone || placed) return;
    const next = [...bigger];
    next[lesson.full.items.length] = lesson.full.waiting;
    bigger = next;
    placed = true;
    feedback = lesson.full.waiting + ' is in. Adding one item cost ' + lesson.full.items.length
      + ' copies, and the next few appends will cost none.';
  }

  function append(times) {
    n = Math.min(lesson.appendTarget, n + times);
  }

  function inspect(id) {
    selected = id;
    if (!inspected.includes(id)) inspected = [...inspected, id];
  }

  function reset() {
    stage = 0; choice = null; destroyed = null; stranded = false;
    bigger = null; copiedCount = 0; placed = false; feedback = '';
    prediction = null; n = 0; inspected = []; selected = null; transfer = null;
  }
</script>

<section class="lab" aria-labelledby="growth-lab-heading">
  <div class="lab-head">
    <div><p class="eyebrow">DO · {stage + 1} OF 3</p><h2 id="growth-lab-heading">The growth bench</h2></div>
    <div class="steps" aria-label={'Step ' + (stage + 1) + ' of 3'}>
      {#each [0, 1, 2] as marker}<span class:active={marker <= stage}></span>{/each}
    </div>
  </div>

  {#if stage === 0}
    <p class="ticket">{lesson.full.prompt}</p>

    <div class="array" aria-label="Four occupied array positions and one item waiting outside">
      {#each lesson.full.items as item, index}
        <div class:lost={destroyed && index === 0}>
          <span>{index}</span>
          <strong>{destroyed && index === 0 ? lesson.full.waiting : item}</strong>
          {#if destroyed && index === 0}<em>{destroyed} destroyed</em>{/if}
        </div>
      {/each}
      <div class="waiting" class:stranded>
        <span>waiting</span>
        <strong>{stranded ? '' : lesson.full.waiting}</strong>
        {#if stranded}<em>{lesson.full.waiting} refused</em>{/if}
      </div>
    </div>

    <div class="answers">
      {#each lesson.full.choices as option}
        <button
          class:chosen={choice === option.id}
          class:correct={choice === option.id && option.id === lesson.full.correct}
          on:click={() => pick(option.id)}
        >{option.label}</button>
      {/each}
    </div>

    {#if bigger}
      <p class="instruction">The new array is empty. Copy the items across one at a time.</p>
      <div class="array bigger" aria-label={'The larger array of ' + grown + ' positions'}>
        {#each bigger as item, index}
          <div class:empty={!item} class:fresh={item === lesson.full.waiting}>
            <span>{index}</span>
            <strong>{item || 'EMPTY'}</strong>
          </div>
        {/each}
      </div>
      <div class="movement" aria-label="Copy progress">
        <span>Items copied</span><strong>{copiedCount} / {lesson.full.items.length}</strong>
        <div><i style={'width:' + ((copiedCount / lesson.full.items.length) * 100) + '%'}></i></div>
      </div>
    {/if}

    {#if feedback}
      <p class="feedback" class:good={choice === lesson.full.correct} class:retry={choice && choice !== lesson.full.correct} aria-live="polite">{feedback}</p>
    {/if}

    {#if bigger && !resizeDone}<button class="primary" on:click={copyNext}>Copy {lesson.full.items[copiedCount]} across</button>{/if}
    {#if resizeDone && !placed}<button class="primary" on:click={placeWaiting}>Now append {lesson.full.waiting}</button>{/if}
    <button class="secondary" disabled={!placed} on:click={() => stage = 1}>Compare growth strategies →</button>

  {:else if stage === 1}
    <p class="ticket">{lesson.prediction.prompt}</p>
    <div class="answers">
      {#each lesson.prediction.answers as answer}
        <button
          class:chosen={prediction === answer.id}
          class:correct={prediction === lesson.prediction.correct && answer.id === prediction}
          on:click={() => prediction = answer.id}
        >{answer.label}</button>
      {/each}
    </div>

    {#if prediction}
      <p class="instruction">Now run both. They start at capacity {lesson.startCapacity} and finish holding {lesson.appendTarget} items.</p>
      <div class="lanes">
        {#each laneState as lane}
          <div class="lane" class:grew={lane.justGrew}>
            <span class="lane-label">{lane.label}</span>
            <strong class="count">{lane.total}</strong>
            <small>items copied so far</small>
            <div class="meta">
              <span>capacity <b>{lane.capacity}</b></span>
              {#if lane.justGrew}<span class="flash">grew, copied {lane.justCopied}</span>{/if}
            </div>
          </div>
        {/each}
      </div>
      <div class="movement" aria-label="Append progress">
        <span>Appends</span><strong>{n} / {lesson.appendTarget}</strong>
        <div><i style={'width:' + ((n / lesson.appendTarget) * 100) + '%'}></i></div>
      </div>
      <button class="primary" disabled={raceDone} on:click={() => append(1)}>Append one item</button>
      <button class="secondary" disabled={raceDone} on:click={() => append(lesson.appendTarget)}>Run to {lesson.appendTarget}</button>
      {#if raceDone}
        <p class="feedback" class:good={prediction === lesson.prediction.correct} class:retry={prediction !== lesson.prediction.correct} aria-live="polite">
          {prediction === lesson.prediction.correct
            ? 'Correct. Both hold ' + lesson.appendTarget + ' items in a capacity of ' + summaries.double.finalCapacity + ', with no slot wasted either way. Growing by one copied ' + summaries.one.totalCopies + ' items to get there; doubling copied ' + summaries.double.totalCopies + '.'
            : 'Look again at the two totals. Both end at the same size with no slot wasted, yet growing by one copied ' + summaries.one.totalCopies + ' items and doubling copied ' + summaries.double.totalCopies + '.'}
        </p>
      {/if}
      <button class="secondary" disabled={!raceDone} on:click={() => stage = 2}>Count the cost →</button>
    {/if}

  {:else}
    <p class="ticket">Inspect both strategies, then say what happens at a size you have not watched.</p>
    <div class="answers">
      {#each lesson.strategies as s}
        <button class:chosen={selected === s.id} class:seen={inspected.includes(s.id)} on:click={() => inspect(s.id)}>
          {s.label}
          {#if inspected.includes(s.id)}<small>{summaries[s.id].totalCopies} items copied across {lesson.appendTarget} appends</small>{/if}
        </button>
      {/each}
    </div>

    {#if selectedSummary}
      <div class="costs" aria-live="polite">
        <div><span>Total copied</span><strong>{selectedSummary.totalCopies}</strong><small>over {lesson.appendTarget} appends</small></div>
        <div><span>Times it grew</span><strong>{selectedSummary.growEvents}</strong><small>{selectedStrategy.blurb}</small></div>
        <div><span>Worst single append</span><strong>{selectedSummary.worstAppend}</strong><small>items copied by one append</small></div>
        <div><span>Average per append</span><strong>{selectedSummary.copiesPerAppend.toFixed(2)}</strong><small>copies, spread over every append</small></div>
      </div>
    {/if}

    {#if allInspected}
      <p class="ticket transfer">{lesson.transfer.prompt}</p>
      <div class="answers">
        {#each lesson.transfer.answers as answer}
          <button
            class:chosen={transfer === answer.id}
            class:correct={transfer === lesson.transfer.correct && answer.id === transfer}
            on:click={() => transfer = answer.id}
          >{answer.label}</button>
        {/each}
      </div>
      {#if transfer}
        <p class="feedback" class:good={transfer === lesson.transfer.correct} class:retry={transfer !== lesson.transfer.correct} aria-live="polite">
          {transfer === lesson.transfer.correct
            ? 'Correct. Doubling from ' + lesson.startCapacity + ' reaches a capacity of ' + atSize.finalCapacity + ' in ' + atSize.growEvents + ' growths, copying ' + atSize.totalCopies + ' items in total: barely more than one copy for each item stored.'
            : 'Each growth doubles the room, so the capacity races ahead of the items. Count how many doublings it takes to pass a thousand.'}
        </p>
      {/if}
    {/if}

    {#if transfer === lesson.transfer.correct}
      <div class="costs verdict">
        <div><span>Append with room spare</span><strong>O(1)</strong><small>write into the next slot</small></div>
        <div><span>Append that triggers a resize</span><strong>O(n)</strong><small>copy every item once</small></div>
        <div><span>Averaged over many appends</span><strong>O(1)</strong><small>amortised, because resizes get rarer as the array grows</small></div>
      </div>
      <p class="precision"><strong>Precision note:</strong> amortised constant does not mean every append is fast. One particular append still copies the whole array. It means the expensive appends are rare enough that the average stays flat. Real Python does not double exactly; CPython grows by a smaller factor. The shape of the argument is the same, and the exact factor is an implementation detail.</p>
      <button class="secondary replay" on:click={reset}>Replay the bench</button>
    {/if}
  {/if}
</section>

<style>
  .lab { padding: clamp(18px,4vw,32px); border: 3px solid #000; background: var(--qx-ink); color: var(--qx-ink-text); box-shadow: 8px 8px 0 #000; }
  .lab-head { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
  .eyebrow { margin:0 0 4px; color:var(--qx-ink-accent); font-size:12px; font-weight:900; letter-spacing:.14em; }
  h2 { margin:0; font-size:clamp(25px,5vw,38px); line-height:1.05; }
  .steps { display:flex; gap:5px; padding-top:7px; }
  .steps span { width:32px; height:6px; background:var(--qx-ink-line-2); }
  .steps span.active { background:var(--qx-ink-accent); }
  .ticket { margin:24px 0 8px; padding:14px 16px; border:2px solid #000; background:var(--qx-slip); color:var(--qx-slip-ink); box-shadow:4px 4px 0 #000; }
  .ticket.transfer { margin-top:26px; }
  .instruction { color:var(--qx-ink-text-2); }

  .array { display:grid; grid-template-columns:repeat(5,minmax(72px,1fr)); gap:2px; margin-top:16px; border:2px solid #000; background:#000; overflow-x:auto; }
  .array.bigger { grid-template-columns:repeat(8,minmax(64px,1fr)); }
  .array div { min-width:64px; min-height:80px; padding:8px; background:var(--qx-slip); color:var(--qx-slip-ink); display:flex; flex-direction:column; justify-content:space-between; }
  .array div.empty { background:var(--qx-ink-well); color:var(--qx-ink-text-dim); }
  .array div.lost { background:var(--qx-ink-bad); color:#1a120f; }
  .array div.fresh { background:var(--qx-ink-accent); color:#171510; }
  .array div.waiting { background:var(--qx-ink-panel); color:var(--qx-ink-text); border-left:3px dashed var(--qx-ink-accent); }
  .array div.waiting.stranded { background:var(--qx-ink-bad); color:#1a120f; }
  .array span { font-size:11px; font-weight:900; opacity:.65; }
  .array strong { font-size:11px; overflow:hidden; }
  .array em { font-size:11px; font-style:normal; font-weight:800; }

  .lanes { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:18px; }
  .lane { padding:16px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); }
  .lane.grew { border-color:var(--qx-ink-accent); }
  .lane-label { display:block; color:var(--qx-ink-text-2); font-size:12px; font-weight:800; }
  .count { display:block; margin:6px 0 2px; color:var(--qx-ink-accent); font-size:38px; line-height:1; font-variant-numeric:tabular-nums; }
  .lane small { color:var(--qx-ink-text-2); font-size:11px; }
  .meta { display:flex; flex-wrap:wrap; gap:4px 12px; margin-top:9px; font-size:11px; }
  .meta b { color:var(--qx-ink-text); }
  .flash { color:var(--qx-ink-accent); font-weight:900; }

  .movement { display:grid; grid-template-columns:auto auto; align-items:center; gap:5px 12px; margin-top:18px; }
  .movement span { color:var(--qx-ink-text-2); }
  .movement strong { font-size:21px; font-variant-numeric:tabular-nums; }
  .movement div { grid-column:1/-1; height:8px; background:var(--qx-ink-line-2); }
  .movement i { display:block; height:100%; background:var(--qx-ink-accent); transition:width .18s ease; }

  .feedback { margin:16px 0 0; padding:10px 12px; border-left:4px solid currentColor; }
  .good { color:var(--qx-ink-good); }
  .retry { color:var(--qx-ink-bad); }

  button { font:inherit; }
  .primary,.secondary { min-height:46px; margin-top:16px; padding:10px 16px; border:2px solid #000; font-weight:900; cursor:pointer; }
  .primary { background:var(--qx-ink-accent); color:#171510; box-shadow:4px 4px 0 #000; }
  .secondary { margin-left:10px; border-color:var(--qx-ink-line-2); background:transparent; color:var(--qx-ink-text); }
  .primary:disabled,.secondary:disabled { opacity:.38; cursor:not-allowed; }

  .answers { display:grid; gap:9px; margin-top:18px; }
  .answers button { padding:13px 15px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); color:var(--qx-ink-text); text-align:left; cursor:pointer; }
  .answers button.chosen,.answers button.seen { border-color:var(--qx-ink-accent); }
  .answers button.correct { border-color:var(--qx-ink-good); color:var(--qx-ink-good); }
  .answers small { display:block; margin-top:4px; color:var(--qx-ink-accent); font-weight:800; }

  .costs { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:20px; }
  .costs.verdict { grid-template-columns:repeat(3,1fr); }
  .costs div { padding:16px; border:1px solid var(--qx-ink-line-2); }
  .costs span,.costs small { display:block; color:var(--qx-ink-text-2); font-size:12px; }
  .costs strong { display:block; margin:5px 0; color:var(--qx-ink-accent); font-size:30px; font-variant-numeric:tabular-nums; }
  .precision { color:var(--qx-ink-text-2); font-size:14px; }
  .replay { margin-left:0; }

  @media(max-width:760px) { .costs,.costs.verdict { grid-template-columns:1fr 1fr; } }
  @media(max-width:680px) { .lanes { grid-template-columns:1fr; } .array div { min-height:68px; } .secondary { margin-left:0; } }
  @media(prefers-reduced-motion:reduce) { .movement i { transition:none; } }
</style>
