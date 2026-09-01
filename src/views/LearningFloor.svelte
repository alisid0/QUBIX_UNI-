<script>
  // The learning floor. One question answered first: what do I do next?
  //
  // The prototype this replaces showed the whole curriculum at once, nine pairs
  // then three doors then nine more pairs, and a learner had to scroll all of
  // it before knowing where to start. It was a map. This is a route: the next
  // step is large and at the top, the rest of the floor is underneath it, and
  // everything already finished is marked so.
  //
  // Read and Play are deliberately not twins. Read is the quiet navy surface,
  // Play is the orange consequence and sits heavier, because "read the idea,
  // play the consequence" is a claim about weight and not only about order.
  //
  // Progress is read from the stores the reader and the missions already keep,
  // so somebody who has never opened this page still arrives with their work
  // showing. Nothing here writes progress and nothing migrates it.

  import { onMount } from 'svelte';
  import { ALL_STAGES, DOORS, SHARED_DATA_TRUTHS, ANALYST_FLOOR, liveCompletion, isAvailable }
    from '../lib/content/learning-flow.js';
  import { completedAssetIds, stageState, nextStep } from '../lib/content/learning-progress.js';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';

  const DOOR_KEY = 'qubix.learning-floor.door.v1';

  let done = [];
  let selectedDoor = 'concepts';
  let hydrated = false;
  let showWholeFloor = false;

  onMount(() => {
    done = completedAssetIds();
    try {
      const saved = localStorage.getItem(DOOR_KEY);
      if (DOORS.some(d => d.id === saved)) selectedDoor = saved;
    } catch (error) {
      console.warn('Could not restore the chosen door.', error);
    }
    hydrated = true;
  });

  function chooseDoor(id) {
    selectedDoor = id;
    // Choosing a door reorders the route. It never clears anything: shared work
    // belongs to the learner, not to the door they came through.
    try { localStorage.setItem(DOOR_KEY, id); } catch (error) { /* nothing to do */ }
  }

  $: overall = liveCompletion(done);
  $: next = hydrated ? nextStep(done, selectedDoor) : null;
  $: foundation = stageState(SHARED_DATA_TRUTHS, done);
  $: door = stageState(DOORS.find(d => d.id === selectedDoor), done);
  $: analyst = stageState(ANALYST_FLOOR, done);
  $: otherDoors = DOORS.filter(d => d.id !== selectedDoor).map(d => stageState(d, done));

  const label = { done: 'Done', todo: 'To do', 'not-built': 'Not built', unavailable: 'Unavailable' };
</script>

<svelte:head>
  <title>Start · Qubix University</title>
  <meta name="description" content="Read the idea, play the consequence. Your next step on the Qubix learning floor." />
</svelte:head>

<SiteNav />

<main class="floor">
  <!-- What to do next, before anything else on the page. -->
  <section class="now" aria-labelledby="now-heading">
    <div class="now-head">
      <p class="eyebrow">Your next step</p>
      <h1 id="now-heading">Read the idea. Play the consequence.</h1>
    </div>

    {#if !hydrated}
      <p class="settling">Finding where you got to…</p>
    {:else if next}
      <div class="now-card">
        <p class="now-where">{next.stage.title} · step {next.pair.sequence} · {next.pair.idea}</p>
        <div class="now-pair">
          <a class="card read" class:done={next.pair.readState === 'done'} href={next.pair.read.href}>
            <span class="kind">Read</span>
            <b>{next.pair.read.label}</b>
            <span class="state">{next.pair.readState === 'done' ? 'Done · read it again' : 'Start here'}</span>
          </a>

          <span class="arrow" aria-hidden="true">→</span>

          {#if isAvailable(next.pair.play)}
            <a class="card play" class:done={next.pair.playState === 'done'}
               class:waiting={next.pair.readState !== 'done'} href={next.pair.play.href}>
              <span class="kind">Play</span>
              <b>{next.pair.play.label}</b>
              <span class="state">
                {next.pair.playState === 'done' ? 'Done · play it again'
                  : next.pair.readState === 'done' ? 'Now the consequence' : 'After the reading'}
              </span>
            </a>
          {:else}
            <div class="card play blocked" aria-disabled="true">
              <span class="kind">Play</span>
              <b>{next.pair.play.label}</b>
              <span class="state">Not built yet. The reading stands on its own.</span>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="now-card finished">
        <p class="now-where">Every live step on the floor is done.</p>
        <p>New material is added to the floor as it is written. Nothing below is waiting for you.</p>
      </div>
    {/if}

    <div class="tally" role="status">
      <b>{overall.done} of {overall.total}</b>
      <span>live steps done</span>
      <div class="bar"><i style={`width:${overall.percent}%`}></i></div>
      <span class="quiet">Material that is not built yet is never counted here.</span>
    </div>
  </section>

  <!-- The whole floor, underneath the thing to do now. -->
  <section class="route" aria-labelledby="route-heading">
    <div class="route-head">
      <h2 id="route-heading">The whole floor</h2>
      <button class="toggle" aria-expanded={showWholeFloor}
              on:click={() => (showWholeFloor = !showWholeFloor)}>
        {showWholeFloor ? 'Hide the floor' : 'See the whole floor'}
      </button>
    </div>

    <ol class="stages">
      {#each [foundation, door, ...otherDoors, analyst] as stage, i}
        <li class="stage" class:open={showWholeFloor} class:complete={stage.complete}>
          <div class="stage-head">
            <span class="step-no">{i + 1}</span>
            <div>
              <h3>{stage.title}</h3>
              <p class="lede">{stage.lede}</p>
            </div>
            <span class="stage-tally">{stage.done}/{stage.total}</span>
          </div>

          {#if stage.id === 'concepts' || stage.id === 'python' || stage.id === 'sql'}
            <p class="door-note">
              {stage.id === selectedDoor
                ? 'Your first door. The order changes; the standard does not.'
                : 'Required before the Analyst floor, at your own pace.'}
            </p>
          {/if}

          {#if showWholeFloor}
            <ul class="pairs">
              {#each stage.pairs as pair}
                <li class="pair" class:current={pair.current} class:finished={pair.finished}>
                  <span class="seq">{pair.sequence}</span>
                  <span class="idea">{pair.idea}</span>

                  {#if isAvailable(pair.read)}
                    <a class="mini read" class:is-done={pair.readState === 'done'} href={pair.read.href}>
                      <span class="mini-kind">Read</span>{pair.read.label}
                      <span class="mini-state">{label[pair.readState]}</span>
                    </a>
                  {:else}
                    <span class="mini read blocked" aria-disabled="true">
                      <span class="mini-kind">Read</span>{pair.read.label}
                      <span class="mini-state">Not written</span>
                    </span>
                  {/if}

                  {#if isAvailable(pair.play)}
                    <a class="mini play" class:is-done={pair.playState === 'done'} href={pair.play.href}>
                      <span class="mini-kind">Play</span>{pair.play.label}
                      <span class="mini-state">{label[pair.playState]}</span>
                    </a>
                  {:else}
                    <span class="mini play blocked" aria-disabled="true">
                      <span class="mini-kind">Play</span>{pair.play.label}
                      <span class="mini-state">Not built</span>
                    </span>
                  {/if}
                </li>
              {/each}
            </ul>

            {#if stage.exitOutcome}
              <p class="exit"><b>To leave this floor</b> {stage.exitOutcome}</p>
            {/if}
            {#if stage.standard}
              <ul class="standard">
                {#each stage.standard as line}<li>{line}</li>{/each}
              </ul>
            {/if}
          {/if}
        </li>
      {/each}
    </ol>
  </section>

  <!-- The door only reorders what is ahead. It is placed after the route so it
       reads as a choice about sequence rather than the first thing asked. -->
  <section class="doors" aria-labelledby="doors-heading">
    <h2 id="doors-heading">Your first door</h2>
    <p class="doors-lede">All three foundations are required before the Analyst floor. The door
      you pick changes the order you meet them in, and nothing else.</p>
    <div class="door-cards" role="group" aria-labelledby="doors-heading">
      {#each DOORS as d}
        {@const s = stageState(d, done)}
        <button class="door" class:chosen={d.id === selectedDoor}
                aria-pressed={d.id === selectedDoor} on:click={() => chooseDoor(d.id)}>
          <span class="door-kind">{d.id === selectedDoor ? 'Your door' : 'Choose'}</span>
          <b>{d.title}</b>
          <span class="door-lede">{d.lede}</span>
          <span class="door-tally">{s.done}/{s.total} done</span>
        </button>
      {/each}
    </div>
  </section>
</main>

<SiteFooter />

<style>
  /* The prototype's palette is navy, orange, teal and lime. This uses the Qubix
     palette instead, deliberately.
     check-palette exists because hue drift crept in one screen at a time, and
     its own note names the failure: "a blue mission next to a purple one next
     to a terracotta one". A navy floor linking straight into terracotta
     readings would be that failure, introduced on purpose.
     The prototype's structure survives the swap intact, because what makes
     Read and Play different here is weight and surface, not hue: Read is the
     quiet near-black, Play is the clay accent and sits heavier. Adopting the
     prototype palette site-wide is a real decision that changes check-palette
     too, and it is not smuggled in through one view. */
  .floor {
    --navy: #241f16; --paper: #f7f3e9; --paper-deep: #ede5d5;
    --orange: #a85a34; --teal: #3e9e2a; --lime: #a8c797;
    --line: #d6d0c4; --muted: #78716c; --off: #e7e5e4;
    max-width: 1100px; margin: 0 auto; padding: 26px 20px 70px;
    display: grid; gap: 34px; color: var(--navy);
  }

  .eyebrow { margin: 0 0 8px; color: var(--orange);
             font: 800 11.5px var(--qx-font, system-ui); letter-spacing: .14em; text-transform: uppercase; }

  /* ── what to do next ───────────────────────────────────────────── */
  .now-head h1 { margin: 0; font: 800 clamp(30px, 5vw, 46px)/1.05 Georgia, serif;
                 letter-spacing: -.02em; max-width: 16ch; }
  .settling { color: var(--muted); font: 600 15px var(--qx-font, system-ui); }

  .now-card { margin-top: 22px; padding: 20px; border: 2px solid var(--navy); border-radius: 18px;
              background: #fff; }
  .now-card.finished { background: var(--paper-deep); }
  .now-where { margin: 0 0 14px; color: var(--muted);
               font: 700 12.5px var(--qx-font, system-ui); letter-spacing: .04em; }

  .now-pair { display: grid; grid-template-columns: 1fr auto 1.15fr; gap: 14px; align-items: stretch; }
  .arrow { align-self: center; color: var(--navy); font-size: 22px; font-weight: 800; }

  .card { display: grid; gap: 6px; align-content: center; padding: 20px; border-radius: 14px;
          text-decoration: none; border: 2px solid transparent; }
  .card .kind { font: 800 11px var(--qx-font, system-ui); letter-spacing: .14em; text-transform: uppercase; }
  .card b { font: 800 19px/1.25 var(--qx-font, system-ui); }
  .card .state { font: 650 13px var(--qx-font, system-ui); }

  /* Read is quiet. Play is the consequence and carries more weight. */
  .card.read { background: var(--navy); color: var(--paper); }
  .card.read .kind { color: var(--lime); }
  .card.read .state { color: #cdc2ae; }
  .card.play { background: var(--orange); color: #fff; box-shadow: 0 3px 0 #8c4c2e66; }
  .card.play .kind, .card.play .state { color: #ffe4d8; }
  .card.play.waiting { background: #f6e6db; color: #8c4c2e; box-shadow: none; }
  .card.play.waiting .kind, .card.play.waiting .state { color: #8c4c2e; }
  .card.done { outline: 3px solid var(--teal); outline-offset: 2px; }
  .card:focus-visible { outline: 3px solid var(--navy); outline-offset: 3px; }
  a.card:hover { transform: translateY(-2px); }
  a.card { transition: transform .15s ease; }

  .card.blocked { background: var(--off); color: var(--muted); border: 2px dashed #c9c6c1;
                  box-shadow: none; cursor: not-allowed; }
  .card.blocked .kind, .card.blocked .state { color: var(--muted); }

  .tally { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 18px; }
  .tally b { font: 800 17px var(--qx-font, system-ui); }
  .tally span { color: var(--muted); font: 650 13.5px var(--qx-font, system-ui); }
  .tally .quiet { flex-basis: 100%; font-size: 12.5px; }
  .bar { flex: 1 1 160px; height: 8px; min-width: 120px; border-radius: 5px; background: var(--off); overflow: hidden; }
  .bar i { display: block; height: 100%; background: var(--teal); }

  /* ── the whole floor ───────────────────────────────────────────── */
  .route-head { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
  .route-head h2 { margin: 0; font: 800 24px Georgia, serif; }
  .toggle { min-height: 44px; padding: 0 18px; border: 2px solid var(--navy); border-radius: 22px;
            background: #fff; color: var(--navy); cursor: pointer;
            font: 800 14px var(--qx-font, system-ui); }
  .toggle:focus-visible { outline: 3px solid var(--orange); outline-offset: 2px; }

  .stages { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 12px; }
  .stage { padding: 18px; border: 1px solid var(--line); border-radius: 16px; background: #fff; }
  .stage.complete { border-color: var(--teal); background: #eef4e9; }
  .stage-head { display: grid; grid-template-columns: 34px 1fr auto; gap: 13px; align-items: start; }
  .step-no { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%;
             background: var(--navy); color: var(--paper);
             font: 800 13px ui-monospace, Consolas, monospace; }
  .stage-head h3 { margin: 0; font: 800 18px var(--qx-font, system-ui); }
  .lede { margin: 3px 0 0; color: var(--muted); font: 650 13.5px/1.45 var(--qx-font, system-ui); }
  .stage-tally { color: var(--muted); font: 800 14px ui-monospace, Consolas, monospace; }
  .door-note { margin: 10px 0 0 47px; color: var(--muted);
               font: 650 13px var(--qx-font, system-ui); }

  .pairs { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 8px; }
  .pair { display: grid; grid-template-columns: 30px 150px 1fr 1fr; gap: 10px; align-items: center;
          padding: 9px 10px; border-radius: 11px; }
  .pair.current { background: #faf3ec; outline: 2px solid var(--orange); }
  .pair.finished { opacity: .72; }
  .seq { color: var(--muted); font: 800 12px ui-monospace, Consolas, monospace; }
  .idea { font: 700 13.5px var(--qx-font, system-ui); }

  .mini { display: grid; gap: 2px; padding: 9px 12px; border-radius: 10px; text-decoration: none;
          border: 1px solid var(--line); background: var(--paper);
          color: var(--navy); font: 700 13.5px var(--qx-font, system-ui); }
  .mini-kind { color: var(--muted); font: 800 11px var(--qx-font, system-ui);
               letter-spacing: .12em; text-transform: uppercase; }
  .mini-state { color: var(--muted); font: 650 11.5px var(--qx-font, system-ui); }
  .mini.play { border-color: #e3c3ac; background: #faf3ec; }
  .mini.is-done { border-color: var(--teal); background: #e7f1e2; }
  .mini.is-done .mini-state { color: #2c6b1c; }
  a.mini:hover { border-color: var(--navy); }
  a.mini:focus-visible { outline: 3px solid var(--orange); outline-offset: 2px; }
  .mini.blocked { border-style: dashed; background: var(--off); color: var(--muted); cursor: not-allowed; }

  .exit { margin: 14px 0 0; padding: 12px 14px; border-left: 4px solid var(--teal);
          background: #eef4e9; font: 650 13.5px/1.55 var(--qx-font, system-ui); }
  .exit b { display: block; color: #2c6b1c; font: 800 11px var(--qx-font, system-ui);
            letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px; }
  .standard { margin: 12px 0 0; padding-left: 20px; color: var(--navy);
              font: 650 13.5px/1.7 var(--qx-font, system-ui); }

  /* ── the door ──────────────────────────────────────────────────── */
  .doors h2 { margin: 0; font: 800 24px Georgia, serif; }
  .doors-lede { margin: 6px 0 16px; max-width: 62ch; color: var(--muted);
                font: 650 14.5px/1.6 var(--qx-font, system-ui); }
  .door-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
  .door { display: grid; gap: 5px; padding: 18px; text-align: left; cursor: pointer;
          border: 2px solid var(--line); border-radius: 16px; background: #fff; color: var(--navy); }
  .door.chosen { border-color: var(--navy); background: var(--navy); color: var(--paper); }
  .door-kind { font: 800 11px var(--qx-font, system-ui); letter-spacing: .13em;
               text-transform: uppercase; color: var(--orange); }
  .door.chosen .door-kind { color: var(--lime); }
  .door b { font: 800 19px var(--qx-font, system-ui); }
  .door-lede { color: var(--muted); font: 650 13px/1.45 var(--qx-font, system-ui); }
  .door.chosen .door-lede { color: #cdc2ae; }
  .door-tally { color: var(--muted); font: 800 12px ui-monospace, Consolas, monospace; }
  .door.chosen .door-tally { color: var(--teal); }
  .door:focus-visible { outline: 3px solid var(--orange); outline-offset: 2px; }

  @media (max-width: 780px) {
    /* Read above Play, never side by side, so the order survives the stack. */
    .now-pair { grid-template-columns: 1fr; }
    .arrow { transform: rotate(90deg); justify-self: start; }
    .pair { grid-template-columns: 30px 1fr; }
    .pair .idea { grid-column: 2; }
    .pair .mini { grid-column: 1 / -1; }
  }

  @media (prefers-reduced-motion: reduce) {
    a.card { transition: none; }
    a.card:hover { transform: none; }
  }

  @media (forced-colors: active) {
    .card.blocked, .mini.blocked { border: 2px dashed CanvasText; }
    .card.done, .mini.is-done { outline: 2px solid CanvasText; }
  }
</style>
