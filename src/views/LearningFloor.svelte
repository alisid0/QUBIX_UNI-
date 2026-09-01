<script>
  // The learning floor.
  //
  // Shape and flow come from the prototype: white cards with a circular icon
  // badge, a small-caps kind label above a bold title, a chevron on the right,
  // pill buttons, numbered circles down the gutter, and the Read → Play row
  // running left to right with an arrow between.
  //
  // Colour does not. check-palette refuses new hue families and its own note
  // says why, so the prototype's navy, teal and lime become the Qubix ink,
  // green and clay. The badges carry the distinction the prototype used colour
  // for: a book on ink for reading, a play triangle on clay for the
  // consequence.
  //
  // The one thing changed rather than copied is where a learner starts. The
  // prototype opened on the whole curriculum and a learner had to scroll it
  // before knowing what to do, so the next step is lifted to the top and the
  // floor sits underneath.
  //
  // Progress is read from the stores the reader and the missions already keep.
  // Nothing here writes progress and nothing migrates it.

  import { onMount } from 'svelte';
  import { DOORS, SHARED_DATA_TRUTHS, ANALYST_FLOOR, liveCompletion, isAvailable }
    from '../lib/content/learning-flow.js';
  import { completedAssetIds, stageState, nextStep } from '../lib/content/learning-progress.js';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';

  const DOOR_KEY = 'qubix.learning-floor.door.v1';

  let done = [];
  let selectedDoor = 'concepts';
  let hydrated = false;
  // The floor is the page. Hiding it behind a button was why the structure
  // from the map never appeared: a learner saw five stage headings and had to
  // ask for the thing they came to see.
  let openFloor = true;

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
    // The door reorders what is ahead. It never clears anything: shared work
    // belongs to the learner, not to the door they came through.
    try { localStorage.setItem(DOOR_KEY, id); } catch (error) { /* nothing to do */ }
  }

  $: overall = liveCompletion(done);
  $: next = hydrated ? nextStep(done, selectedDoor) : null;
  $: stages = [
    stageState(SHARED_DATA_TRUTHS, done),
    stageState(DOORS.find(d => d.id === selectedDoor), done),
    ...DOORS.filter(d => d.id !== selectedDoor).map(d => stageState(d, done)),
    stageState(ANALYST_FLOOR, done)
  ];

  const stateWord = { done: 'Done', todo: 'To do' };
</script>

<svelte:head>
  <title>Start · Qubix University</title>
  <meta name="description" content="Read the idea, play the consequence. Your next step on the Qubix learning floor." />
</svelte:head>

<div class="floor-page">
<SiteNav />

<div class="floor">
  <!-- What to do next, before the floor. -->
  <section class="now" aria-labelledby="now-heading">
    <p class="eyebrow">Your next step</p>
    <h1 id="now-heading">Read the idea. Play the consequence.</h1>

    {#if !hydrated}
      <p class="settling">Finding where you got to…</p>
    {:else if next}
      <div class="now-card">
        <p class="now-where">{next.stage.title} · step {next.pair.sequence} · {next.pair.idea}</p>

        <div class="pair-row big">
          <a class="asset read" class:is-done={next.pair.readState === 'done'} href={next.pair.read.href}>
            <span class="badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="17" height="17"><path fill="currentColor"
                d="M12 6.2C10.5 5 8.6 4.5 6 4.5c-.9 0-1.7.1-2.4.2A.8.8 0 0 0 3 5.5v11.7c0 .5.5.9 1 .8.6-.1 1.3-.2 2-.2 2.3 0 4 .5 5.3 1.5.4.3 1 .3 1.4 0 1.3-1 3-1.5 5.3-1.5.7 0 1.4.1 2 .2.5.1 1-.3 1-.8V5.5a.8.8 0 0 0-.6-.8c-.7-.1-1.5-.2-2.4-.2-2.6 0-4.5.5-6 1.7zm0 2v8.5c-1.4-.8-3.1-1.2-5-1.2-.6 0-1.2 0-1.8.1V6.3c.6 0 1.2-.1 1.8-.1 2.1 0 3.7.5 5 1.4z"/></svg>
            </span>
            <span class="asset-text">
              <span class="kind">Read</span>
              <b>{next.pair.read.label}</b>
              <span class="state">{next.pair.readState === 'done' ? 'Done · read it again' : 'Start here'}</span>
            </span>
            <span class="chev" aria-hidden="true">›</span>
          </a>

          <span class="arrow" aria-hidden="true">→</span>

          {#if isAvailable(next.pair.play)}
            <a class="asset play" class:is-done={next.pair.playState === 'done'}
               class:waiting={next.pair.readState !== 'done'} href={next.pair.play.href}>
              <span class="badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 8h10a5 5 0 0 1 4.9 4l1 5a2.2 2.2 0 0 1-4 1.6L16.6 16H7.4l-2.3 2.6a2.2 2.2 0 0 1-4-1.6l1-5A5 5 0 0 1 7 8zm-.6 3v1.4H5v1.2h1.4V15h1.2v-1.4H9v-1.2H7.6V11zm9 .4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm2 2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
              </span>
              <span class="asset-text">
                <span class="kind">Play</span>
                <b>{next.pair.play.label}</b>
                <span class="state">
                  {next.pair.playState === 'done' ? 'Done · play it again'
                    : next.pair.readState === 'done' ? 'Now the consequence' : 'After the reading'}
                </span>
              </span>
              <span class="chev" aria-hidden="true">›</span>
            </a>
          {:else}
            <div class="asset play blocked" aria-disabled="true">
              <span class="badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor"
                  d="M16.5 9.5V7.8a4.5 4.5 0 0 0-9 0v1.7H6v9.5h12V9.5zM9.3 7.8a2.7 2.7 0 0 1 5.4 0v1.7H9.3z"/></svg>
              </span>
              <span class="asset-text">
                <span class="kind">Play</span>
                <b>{next.pair.play.label} — not built</b>
                <span class="state">The reading stands on its own.</span>
              </span>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="now-card done-all">
        <p class="now-where">Every live step on the floor is done.</p>
        <p class="settling">New material joins the floor as it is written. Nothing below is waiting for you.</p>
      </div>
    {/if}

    <div class="tally" role="status">
      <b>{overall.done} of {overall.total}</b>
      <span>live steps done</span>
      <span class="bar"><i style={`width:${overall.percent}%`}></i></span>
      <span class="quiet">Material that is not built yet is never counted here.</span>
    </div>
  </section>

  <!-- The floor itself, in the prototype's rhythm. -->
  <section class="route" aria-labelledby="route-heading">
    <div class="route-head">
      <h2 id="route-heading">The whole floor</h2>
      <button class="pill" aria-expanded={openFloor} on:click={() => (openFloor = !openFloor)}>
        {openFloor ? 'Hide the floor' : 'See the whole floor'}
      </button>
    </div>

    <ol class="stages">
      {#each stages as stage, i}
        <li class="stage" class:complete={stage.complete}>
          <div class="stage-head">
            <span class="stage-no">{i + 1}</span>
            <span class="stage-text">
              <h3>{stage.title}</h3>
              <span class="lede">{stage.lede}</span>
              {#if ['concepts', 'python', 'sql'].includes(stage.id)}
                <span class="door-note">{stage.id === selectedDoor
                  ? 'Your first door. The order changes; the standard does not.'
                  : 'Required before the Analyst floor, at your own pace.'}</span>
              {/if}
            </span>
            <span class="stage-tally">{stage.done}<i>/{stage.total}</i></span>
          </div>

          {#if openFloor}
            <div class="cols" aria-hidden="true">
              <span>Idea</span><span>Read</span><span></span><span>Play</span>
            </div>
            <ul class="pairs">
              {#each stage.pairs as pair}
                <li class="pair-line" class:current={pair.current}>
                  <span class="gutter">
                    <span class="seq" class:seq-done={pair.finished}>{pair.sequence}</span>
                    <span class="idea">{pair.idea}</span>
                  </span>

                  <div class="pair-row">
                    {#if isAvailable(pair.read)}
                      <a class="asset read small" class:is-done={pair.readState === 'done'} href={pair.read.href}>
                        <span class="badge" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor"
                            d="M12 6.2C10.5 5 8.6 4.5 6 4.5c-.9 0-1.7.1-2.4.2A.8.8 0 0 0 3 5.5v11.7c0 .5.5.9 1 .8.6-.1 1.3-.2 2-.2 2.3 0 4 .5 5.3 1.5.4.3 1 .3 1.4 0 1.3-1 3-1.5 5.3-1.5.7 0 1.4.1 2 .2.5.1 1-.3 1-.8V5.5a.8.8 0 0 0-.6-.8c-.7-.1-1.5-.2-2.4-.2-2.6 0-4.5.5-6 1.7zm0 2v8.5c-1.4-.8-3.1-1.2-5-1.2-.6 0-1.2 0-1.8.1V6.3c.6 0 1.2-.1 1.8-.1 2.1 0 3.7.5 5 1.4z"/></svg>
                        </span>
                        <span class="asset-text">
                          <span class="kind">Read</span><b>{pair.read.label}</b>
                          <span class="state">{stateWord[pair.readState]}</span>
                        </span>
                        <span class="chev" aria-hidden="true">›</span>
                      </a>
                    {:else}
                      <span class="asset read small blocked" aria-disabled="true">
                        <span class="badge" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="13" height="13"><path fill="currentColor"
                            d="M16.5 9.5V7.8a4.5 4.5 0 0 0-9 0v1.7H6v9.5h12V9.5zM9.3 7.8a2.7 2.7 0 0 1 5.4 0v1.7H9.3z"/></svg>
                        </span>
                        <span class="asset-text">
                          <span class="kind">Read</span><b>{pair.read.label} — not written</b>
                          <span class="state">Excluded from your progress</span>
                        </span>
                      </span>
                    {/if}

                    <span class="arrow" aria-hidden="true">→</span>

                    {#if isAvailable(pair.play)}
                      <a class="asset play small" class:is-done={pair.playState === 'done'} href={pair.play.href}>
                        <span class="badge" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="13" height="13"><path fill="currentColor" d="M7 8h10a5 5 0 0 1 4.9 4l1 5a2.2 2.2 0 0 1-4 1.6L16.6 16H7.4l-2.3 2.6a2.2 2.2 0 0 1-4-1.6l1-5A5 5 0 0 1 7 8zm-.6 3v1.4H5v1.2h1.4V15h1.2v-1.4H9v-1.2H7.6V11zm9 .4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm2 2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
                        </span>
                        <span class="asset-text">
                          <span class="kind">Play</span><b>{pair.play.label}</b>
                          <span class="state">{stateWord[pair.playState]}</span>
                        </span>
                        <span class="chev" aria-hidden="true">›</span>
                      </a>
                    {:else}
                      <span class="asset play small blocked" aria-disabled="true">
                        <span class="badge" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="13" height="13"><path fill="currentColor"
                            d="M16.5 9.5V7.8a4.5 4.5 0 0 0-9 0v1.7H6v9.5h12V9.5zM9.3 7.8a2.7 2.7 0 0 1 5.4 0v1.7H9.3z"/></svg>
                        </span>
                        <span class="asset-text">
                          <span class="kind">Play</span><b>{pair.play.label} — not built</b>
                          <span class="state">Excluded from your progress</span>
                        </span>
                      </span>
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>

            {#if stage.exitOutcome}
              <p class="exit"><b>To leave this floor</b>{stage.exitOutcome}</p>
            {/if}
            {#if stage.standard}
              <ul class="standard">{#each stage.standard as line}<li>{line}</li>{/each}</ul>
            {/if}
          {/if}
        </li>
      {/each}
    </ol>
  </section>

  <section class="doors" aria-labelledby="doors-heading">
    <h2 id="doors-heading">Your first door</h2>
    <p class="doors-lede">All three foundations are required before the Analyst floor. The door you
      pick changes the order you meet them in, and nothing else.</p>
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
</div>

<SiteFooter />
</div>

<style>
  /* The scroller. Without it the floor is clipped at viewport height by the
     shell, which is fixed and hidden from the original full-screen build. */
  .floor-page { height: 100%; overflow-y: auto; overscroll-behavior: contain; }

  /* Prototype shapes, Qubix colours. Rounded cards, circular badges, pills and
     chevrons come from the map; the hues are the ones the rest of the site
     already uses, because check-palette refuses a new family and a floor that
     linked into readings in a different hue is the drift it exists to stop. */
  .floor {
    --ink: #241f16; --paper: #f7f3e9; --card: #fffdf7; --deep: #ede5d5;
    --clay: #a85a34; --clay-soft: #f6e6db; --green: #3e9e2a; --green-soft: #e7f1e2;
    --line: #d6d0c4; --muted: #78716c; --off: #e9e6e0;
    max-width: 1240px; margin: 0 auto; padding: 26px 24px 72px;
    display: grid; gap: 36px; color: var(--ink);
  }

  .eyebrow { margin: 0 0 8px; color: var(--clay); font: 800 11px var(--qx-font, system-ui);
             letter-spacing: .14em; text-transform: uppercase; }
  h1 { margin: 0; font: 800 clamp(30px, 5vw, 46px)/1.05 Georgia, serif;
       letter-spacing: -.02em; max-width: 17ch; }
  .settling { color: var(--muted); font: 650 14.5px/1.55 var(--qx-font, system-ui); }

  /* ── the card, the one shape the whole floor is made of ────────── */
  .now-card { margin-top: 22px; padding: 20px; border: 1px solid var(--line);
              border-radius: 22px; background: var(--deep); }
  .now-card.done-all { display: grid; gap: 6px; }
  .now-where { margin: 0 0 14px; color: var(--muted);
               font: 700 12.5px var(--qx-font, system-ui); letter-spacing: .03em; }

  .pair-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: stretch; }
  .arrow { align-self: center; color: var(--muted); font-size: 19px; font-weight: 700; }

  .asset { display: grid; grid-template-columns: auto 1fr auto; gap: 13px; align-items: center;
           padding: 16px 18px; border-radius: 16px; text-decoration: none;
           border: 1px solid var(--line); background: var(--card); color: var(--ink); }
  .asset.small { padding: 11px 14px; border-radius: 13px; gap: 10px; }

  /* The badge carries what the prototype used a second hue for. */
  .badge { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%;
           background: var(--ink); color: var(--card); flex: none; }
  .asset.small .badge { width: 30px; height: 30px; }
  .asset.play .badge { background: var(--clay); }

  .asset-text { display: grid; gap: 1px; min-width: 0; }
  .kind { color: var(--muted); font: 800 11px var(--qx-font, system-ui);
          letter-spacing: .13em; text-transform: uppercase; }
  .asset b { font: 800 17px/1.25 var(--qx-font, system-ui); overflow-wrap: anywhere; }
  .asset.small b { font-size: 14px; }
  .state { color: var(--muted); font: 650 12.5px var(--qx-font, system-ui); }
  .chev { color: var(--muted); font-size: 21px; line-height: 1; }

  .asset.play { border-color: #e3c3ac; background: #fffaf6; }
  .asset.play.waiting .badge { background: var(--clay-soft); color: var(--clay); }
  .asset.is-done { border-color: var(--green); background: var(--green-soft); }
  .asset.is-done .state { color: #2c6b1c; }
  a.asset { transition: transform .15s ease, border-color .15s ease; }
  a.asset:hover { transform: translateY(-2px); border-color: var(--ink); }
  a.asset:focus-visible { outline: 3px solid var(--clay); outline-offset: 3px; }

  /* Unavailable: dashed, quiet, a padlock, and said in words. */
  .asset.blocked { border: 1px dashed #c4bfb6; background: var(--off); color: var(--muted);
                   cursor: not-allowed; }
  .asset.blocked .badge { background: #cfcac1; color: var(--card); }
  .asset.blocked b { font-weight: 700; }

  .tally { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 18px; }
  .tally b { font: 800 17px var(--qx-font, system-ui); }
  .tally span { color: var(--muted); font: 650 13.5px var(--qx-font, system-ui); }
  .tally .quiet { flex-basis: 100%; font-size: 12px; }
  .bar { flex: 1 1 150px; min-width: 110px; height: 8px; border-radius: 5px;
         background: var(--off); overflow: hidden; }
  .bar i { display: block; height: 100%; background: var(--green); }

  /* ── pills ─────────────────────────────────────────────────────── */
  .pill { min-height: 44px; padding: 0 20px; border: 1px solid var(--ink); border-radius: 999px;
          background: var(--card); color: var(--ink); cursor: pointer;
          font: 800 13.5px var(--qx-font, system-ui); }
  .pill:hover { background: var(--ink); color: var(--card); }
  .pill:focus-visible { outline: 3px solid var(--clay); outline-offset: 2px; }

  /* ── the floor ─────────────────────────────────────────────────── */
  .route-head { display: flex; align-items: center; justify-content: space-between;
                gap: 14px; flex-wrap: wrap; }
  .route-head h2, .doors h2 { margin: 0; font: 800 23px Georgia, serif; }

  .stages { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 12px; }
  .stage { padding: 18px; border: 1px solid var(--line); border-radius: 20px; background: var(--card); }
  .stage.complete { border-color: var(--green); background: #f4faf1; }
  .stage-head { display: grid; grid-template-columns: 36px 1fr auto; gap: 13px; align-items: start; }
  .stage-no { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%;
              background: var(--ink); color: var(--card);
              font: 800 13px ui-monospace, Consolas, monospace; }
  .stage-text { display: grid; gap: 3px; }
  .stage-head h3 { margin: 0; font: 800 17.5px var(--qx-font, system-ui); }
  .lede { color: var(--muted); font: 650 13.5px/1.45 var(--qx-font, system-ui); }
  .door-note { color: var(--clay); font: 700 12.5px var(--qx-font, system-ui); }
  .stage-tally { font: 800 16px ui-monospace, Consolas, monospace; }
  .stage-tally i { color: var(--muted); font-style: normal; font-size: 13px; }

  /* The column heads and the rail are what make this read as one structure
     rather than a stack of unrelated rows. Straight from the map. */
  .cols { display: grid; grid-template-columns: 132px 1fr auto 1fr; gap: 12px;
          margin: 16px 0 6px; padding: 0 8px; }
  .cols span { color: var(--muted); font: 800 11px var(--qx-font, system-ui);
               letter-spacing: .14em; text-transform: uppercase; }

  .pairs { position: relative; list-style: none; margin: 0; padding: 0; display: grid; gap: 10px;
           border: 1px solid var(--line); border-radius: 18px; background: var(--paper);
           padding: 10px; }
  /* One continuous line behind the sequence circles, so the steps read as a
     route rather than as separate cards. */
  .pairs::before { content: ''; position: absolute; top: 34px; bottom: 34px; left: 76px;
                   width: 2px; background: var(--line); }
  .pair-line { position: relative; display: grid; grid-template-columns: 132px 1fr; gap: 12px;
               align-items: center; padding: 8px; border-radius: 14px; }
  .pair-line.current { background: var(--clay-soft); }
  .gutter { display: grid; justify-items: center; gap: 4px; text-align: center; }
  .seq { position: relative; z-index: 1; display: grid; place-items: center;
         width: 32px; height: 32px; border-radius: 50%;
         border: 1px solid var(--line); background: var(--card); color: var(--muted);
         font: 800 12px ui-monospace, Consolas, monospace; }
  .seq-done { border-color: var(--green); background: var(--green-soft); color: #2c6b1c; }
  .idea { color: var(--ink); font: 700 12px/1.35 var(--qx-font, system-ui); }

  .exit { display: grid; gap: 4px; margin: 15px 0 0; padding: 13px 15px; border-radius: 14px;
          background: var(--green-soft); font: 650 13.5px/1.55 var(--qx-font, system-ui); }
  .exit b { color: #2c6b1c; font: 800 11px var(--qx-font, system-ui);
            letter-spacing: .1em; text-transform: uppercase; }
  .standard { margin: 12px 0 0; padding-left: 20px; font: 650 13.5px/1.75 var(--qx-font, system-ui); }

  /* ── doors ─────────────────────────────────────────────────────── */
  .doors-lede { margin: 6px 0 16px; max-width: 62ch; color: var(--muted);
                font: 650 14.5px/1.6 var(--qx-font, system-ui); }
  .door-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(215px, 1fr)); gap: 12px; }
  .door { display: grid; gap: 5px; padding: 18px; text-align: left; cursor: pointer;
          border: 1px solid var(--line); border-radius: 20px; background: var(--card); color: var(--ink); }
  .door.chosen { border-color: var(--ink); background: var(--ink); color: var(--paper); }
  .door-kind { color: var(--clay); font: 800 11px var(--qx-font, system-ui);
               letter-spacing: .13em; text-transform: uppercase; }
  .door.chosen .door-kind { color: #e0b79c; }
  .door b { font: 800 18px var(--qx-font, system-ui); }
  .door-lede { color: var(--muted); font: 650 13px/1.45 var(--qx-font, system-ui); }
  .door.chosen .door-lede { color: #cdc2ae; }
  .door-tally { color: var(--muted); font: 800 12px ui-monospace, Consolas, monospace; }
  .door.chosen .door-tally { color: #9ec98d; }
  .door:focus-visible { outline: 3px solid var(--clay); outline-offset: 2px; }

  @media (max-width: 800px) {
    /* Read stays above Play, so the order survives the stack. */
    .pair-row { grid-template-columns: 1fr; }
    .arrow { transform: rotate(90deg); justify-self: center; }
    .pairs::before { display: none; }
    .cols { display: none; }
    .pair-line { grid-template-columns: 1fr; }
    .gutter { grid-auto-flow: column; justify-items: start; justify-content: start;
              align-items: center; gap: 9px; text-align: left; }
  }

  @media (prefers-reduced-motion: reduce) {
    a.asset { transition: none; }
    a.asset:hover { transform: none; }
  }

  @media (forced-colors: active) {
    .asset.blocked { border: 2px dashed CanvasText; }
    .asset.is-done, .seq-done { outline: 2px solid CanvasText; }
  }
</style>
