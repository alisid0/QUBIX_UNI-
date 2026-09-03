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
  import WorkshopAssistant from '../lib/components/WorkshopAssistant.svelte';
  import { HOME_ASSISTANT } from '../lib/content/home-assistant.js';

  const DOOR_KEY = 'qubix.learning-floor.door.v1';

  let done = [];
  let selectedDoor = 'concepts';
  let hydrated = false;
  // Whether the learner has actually picked a door, as opposed to being shown
  // the default. "Choose your first door" is the right question once and noise
  // every time after, so a returning learner gets one line instead of three
  // cards.
  let doorChosen = false;
  onMount(() => {
    done = completedAssetIds();
    try {
      const saved = localStorage.getItem(DOOR_KEY);
      if (DOORS.some(d => d.id === saved)) { selectedDoor = saved; doorChosen = true; }
    } catch (error) {
      console.warn('Could not restore the chosen door.', error);
    }
    hydrated = true;
  });

  function chooseDoor(id) {
    selectedDoor = id;
    doorChosen = true;
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

  // One stage on its own page, or all five on the floor. The whole floor is
  // the map; a stage is the unit somebody actually works through, and 27 pairs
  // on one scroll is a lot to hold. Same component either way: a stage page is
  // the floor with one stage in it and its own header.
  export let stage = null;

  $: shown = stage ? stages.filter(s => s.id === stage) : stages;
  $: one = stage ? shown[0] : null;
  $: unknownStage = Boolean(stage) && !one;

  /* The step this page is asking for: the stage's own when you are on a stage
     page, the floor's when you are on the floor. */
  $: here = (() => {
    if (!one) return next;
    const pair = one.current;
    if (!pair) return null;
    const asset = pair.readState === 'todo' ? pair.read
      : pair.playState === 'todo' ? pair.play
        : null;
    return asset ? { stage: one, pair, asset, kind: asset.kind } : null;
  })();

  /* What a stage contains, said the way the header says it. */
  const shape = st => {
    const halves = st.pairs.flatMap(p => [
      { kind: 'read', ok: p.readState !== 'not-built' },
      { kind: 'play', ok: p.playState !== 'not-built' }
    ]).filter(h => h.ok);
    return {
      live: halves.length,
      reads: halves.filter(h => h.kind === 'read').length,
      plays: halves.filter(h => h.kind === 'play').length
    };
  };

  const stateWord = { done: 'Done', todo: 'To do' };
</script>

<svelte:head>
  <title>{one ? `${one.title} · Qubix University` : 'The whole floor · Qubix University'}</title>
  <meta name="description" content="Read the idea, play the consequence. Your next step on the Qubix learning floor." />
</svelte:head>

<div class="floor-page">
<SiteNav subjects={Boolean(stage)} />

<div class="floor" class:whole={!stage}>
  {#if stage}
  <header class="masthead">
    <div class="mast-text">
      <p class="eyebrow">{unknownStage ? 'Qubix University' : one ? 'Qubix University · one stage' : 'No experience needed · start where you are'}</p>
      <h1>{unknownStage ? 'No such stage' : one ? one.title : 'Read it. Then prove it.'}</h1>
      <p class="mast-lede">{unknownStage
        ? 'The address names a stage this floor does not have.'
        : one ? one.lede
          : 'Choose Concepts, Python or SQL as your first door. The order changes; the complete foundation does not.'}</p>
    </div>

    {#if unknownStage}
      <span></span>
    {:else if one}
      {@const sh = shape(one)}
      <div class="shape" role="status">
        <b>{sh.live} live steps</b>
        <span>{sh.reads} reads · {sh.plays} plays</span>
        <span class="bar"><i style={`width:${one.percent}%`}></i></span>
        <span class="quiet">{one.done} of {one.total} done on this stage.</span>
      </div>
    {:else}
      <div class="tally" role="status">
        <b>{overall.done} of {overall.total}</b>
        <span>live steps done</span>
        <span class="bar"><i style={`width:${overall.percent}%`}></i></span>
        <span class="quiet">Material that is not built yet is never counted here.</span>
      </div>
    {/if}
  </header>

  {#if unknownStage}
    <p class="resume done-all">There is no stage called “{stage}” on this floor.
      <a href="/">Open the whole floor</a> and pick one.</p>
  {:else if !hydrated}
    <p class="resume settling">Finding where you got to…</p>
  {:else if here}
    <a class="resume" href={here.asset.href}>
      <span class="resume-tag">{done.length === 0 ? 'Start here' : 'Your next step'}</span>
      <span class="resume-what">
        <b>{here.asset.label}</b>
        <span>{here.kind === 'read' ? 'Read' : 'Play'} · {here.stage.title} ·
          step {here.pair.sequence} · {here.pair.idea}</span>
      </span>
      <span class="chev" aria-hidden="true">›</span>
    </a>
  {:else}
    <p class="resume done-all">{one
      ? `Every live step on ${one.title} is done.`
      : 'Every live step on the floor is done.'} New material joins the floor as it is written.</p>
  {/if}
  {/if}

  {#if !stage && hydrated && doorChosen}
    <p class="door-settled">
      Your first door is <b>{stages[1]?.title || selectedDoor}</b>.
      <button class="door-change" on:click={() => (doorChosen = false)}>Change it</button>
    </p>
  {/if}

  {#if !stage && !(hydrated && doorChosen)}

  <!-- The door reorders the map, so it is chosen above the map rather than
       five thousand pixels below it. Asked once: after a learner has answered,
       three cards restating the question are three controls in the way of the
       one they came back for. -->
  <section class="door-pick" aria-labelledby="door-heading">
    <div class="door-intro">
      <span class="door-pick-label">Choose your first door</span>
      <h2 id="door-heading">What sounds most interesting today?</h2>
      <p>Pick the route that feels easiest to enter. You can change it at any time; your progress stays with you.</p>
    </div>
    <div class="door-cards" role="group" aria-label="Choose your first learning door">
      {#each DOORS as d}
        <button class="door-card" class:chosen={d.id === selectedDoor}
                aria-pressed={d.id === selectedDoor} on:click={() => chooseDoor(d.id)}>
          <span class="door-symbol" aria-hidden="true">{d.id === 'concepts' ? 'IDEA' : d.id === 'python' ? 'PY' : 'SQL'}</span>
          <span class="door-copy"><b>{d.title}</b><em>{d.lede}</em></span>
          <span class="door-action">{d.id === selectedDoor ? 'Selected · shown first' : `Choose ${d.id === 'concepts' ? 'concepts' : d.id}`}</span>
        </button>
      {/each}
    </div>
    <span class="door-pick-note">All three doors are part of the complete foundation. This choice only changes which one you meet first.</span>
  </section>
  {/if}

  <section class="route" aria-label="The whole floor">
    <ol class="stages">
      {#each shown as st, i}
        <li class="stage" class:complete={st.complete} class:solo={Boolean(stage)}>
          {#if !stage}
            <div class="stage-head">
              <span class="stage-no">{i + 1}</span>
              <span class="stage-text">
                <!-- Plain text, not a link. The stage card below is the one
                     control for this stage; a heading pointing at the same
                     page is a second thing to decide about and no new place
                     to go. -->
                <h3>{st.title}</h3>
                <span class="lede">{st.lede}</span>
                {#if ['concepts', 'python', 'sql'].includes(st.id)}
                  <span class="door-note">{st.id === selectedDoor
                    ? 'Your first door. The order changes; the standard does not.'
                    : 'Required before the Analyst floor, at your own pace.'}</span>
                {/if}
              </span>
              <span class="stage-tally">{st.done}<i>/{st.total}</i></span>
            </div>
          {/if}

          <!-- The steps themselves belong to a stage page.
               The floor is the map, and a map that draws every street name at
               full size stops being a map: forty-nine identical chips on the
               front door made the first question "which of these?" when it
               should have been "shall I carry on?". Every one of them is still
               one click away, on the page built for it in 5f63c7e. -->
          {#if stage}
          <div class="cols" aria-hidden="true">
            <span>Idea</span><span>Read</span><span></span><span>Play</span>
          </div>
          <ul class="pairs">
            {#each st.pairs as pair}
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
          {:else}
            <a class="stage-open" href={`/floor/${st.id}`}>
              <span class="stage-open-what">
                <b>Open {st.title}</b>
                <span>{st.pairs.length} steps · {shape(st).live} built · {st.done} done</span>
              </span>
              <span class="chev" aria-hidden="true">›</span>
            </a>
            {#if shape(st).live < st.pairs.length * 2}
              <span class="stage-unbuilt">{st.pairs.length * 2 - shape(st).live} not written yet,
                and never counted in your progress.</span>
            {/if}
          {/if}

          {#if st.exitOutcome}
            <p class="exit"><b>To leave this floor</b>{st.exitOutcome}</p>
          {/if}
          {#if st.standard}
            <ul class="standard">{#each st.standard as line}<li>{line}</li>{/each}</ul>
          {/if}
        </li>
      {/each}
    </ol>
  </section>

</div>

<WorkshopAssistant spec={HOME_ASSISTANT} />
<SiteFooter />
</div>

<style>
  /* The scroller. Without it the floor is clipped at viewport height by the
     shell, which is fixed and hidden from the original full-screen build. */
  .floor-page { height: 100%; overflow-y: auto; overscroll-behavior: contain;
                background: radial-gradient(circle at 12% 0, #fffaf1 0, transparent 31%), #eee8dc; }

  /* Prototype shapes, Qubix colours. Rounded cards, circular badges, pills and
     chevrons come from the map; the hues are the ones the rest of the site
     already uses, because check-palette refuses a new family and a floor that
     linked into readings in a different hue is the drift it exists to stop. */
  .floor {
    --ink: #241f16; --paper: #f7f3e9; --card: #fffdf7; --deep: #ede5d5;
    --clay: #a85a34; --clay-soft: #f6e6db; --green: #3e9e2a; --green-soft: #e7f1e2;
    --play: #e8631f; --play-line: #f0b492;
    --line: #d6d0c4; --muted: #78716c; --off: #e9e6e0;
    max-width: 1240px; margin: 0 auto; padding: 24px 24px 78px;
    display: grid; gap: 22px; color: var(--ink);
  }

  .eyebrow { margin: 0 0 5px; color: var(--clay); font: 800 11px var(--qx-font, system-ui);
             letter-spacing: .14em; text-transform: uppercase; }
  h1 { max-width: 760px; margin: 0; font: 700 clamp(34px, 5vw, 54px)/1.01 Georgia, serif;
       letter-spacing: -.035em; text-wrap: balance; }
  .settling { color: var(--muted); font: 650 14.5px/1.55 var(--qx-font, system-ui); }
  /* ── the card, the one shape the whole floor is made of ────────── */
  .pair-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: stretch; }
  .arrow { align-self: center; color: var(--muted); font-size: 19px; font-weight: 700; }

  .asset { display: grid; grid-template-columns: auto 1fr auto; gap: 13px; align-items: center;
           padding: 16px 18px; border-radius: 16px; text-decoration: none;
           border: 1px solid var(--line); background: var(--card); color: var(--ink);
           box-shadow: 0 2px 0 rgba(36,31,22,.06); }
  .asset.small { padding: 11px 14px; border-radius: 13px; gap: 10px; }

  /* The badge carries what the prototype used a second hue for. */
  .badge { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%;
           background: var(--ink); color: var(--card); flex: none; }
  .asset.small .badge { width: 30px; height: 30px; }
  .asset.play .badge { background: var(--play); }

  .asset-text { display: grid; gap: 1px; min-width: 0; }
  .kind { color: var(--muted); font: 800 11px var(--qx-font, system-ui);
          letter-spacing: .13em; text-transform: uppercase; }
  .asset b { font: 800 17px/1.25 var(--qx-font, system-ui); overflow-wrap: anywhere; }
  .asset.small b { font-size: 14px; }
  .state { color: var(--muted); font: 650 12.5px var(--qx-font, system-ui); }
  .chev { color: var(--muted); font-size: 21px; line-height: 1; }

  .asset.play { border-color: var(--play-line); background: #fffaf6; }
  .asset.is-done { border-color: var(--green); background: var(--green-soft); }
  .asset.is-done .state { color: #2c6b1c; }
  a.asset { transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease; }
  a.asset:hover { transform: translateY(-3px); border-color: var(--ink); box-shadow: 0 9px 20px rgba(36,31,22,.1); }
  a.asset:focus-visible { outline: 3px solid var(--clay); outline-offset: 3px; }

  /* Unavailable: dashed, quiet, a padlock, and said in words. */
  .asset.blocked { border: 1px dashed #c4bfb6; background: var(--off); color: var(--muted);
                   cursor: not-allowed; }
  .asset.blocked .badge { background: #cfcac1; color: var(--card); }
  .asset.blocked b { font-weight: 700; }

  .tally { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; align-content: end; }
  .tally b { font: 800 17px var(--qx-font, system-ui); }
  .tally span { color: var(--muted); font: 650 13.5px var(--qx-font, system-ui); }
  .tally .quiet { flex-basis: 100%; font-size: 12px; }
  .bar { flex: 1 1 150px; min-width: 110px; height: 8px; border-radius: 5px;
         background: var(--off); overflow: hidden; }
  .bar i { display: block; height: 100%; background: var(--green); }

  /* What a stage holds, rather than how far through it you are. On a stage you
     have only just opened, the shape is the more useful of the two. */
  .shape { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; align-content: end; }
  .shape b { font: 800 17px var(--qx-font, system-ui); }
  .shape span { color: var(--muted); font: 650 13.5px var(--qx-font, system-ui); }
  .shape .quiet { flex-basis: 100%; font-size: 12px; }

  .stage-head h3 a { color: inherit; text-decoration: none;
                     border-bottom: 1.5px solid var(--line); }
  .stage-head h3 a:hover { border-color: var(--clay); color: var(--clay); }
  .stage-head h3 a:focus-visible { outline: 3px solid var(--clay); outline-offset: 3px; }
  .resume a { color: var(--clay); }

  /* ── the masthead: one line, not a landing page ──────── */
  .masthead { display: grid; grid-template-columns: minmax(0, 1fr) minmax(240px, 350px);
              gap: 25px 42px; align-items: end; padding: 30px clamp(22px,4vw,42px);
              border: 1px solid var(--line); border-radius: 24px;
              background: linear-gradient(125deg, rgba(255,253,247,.98), rgba(246,230,219,.72));
              box-shadow: 0 12px 30px rgba(36,31,22,.075); }
  .mast-lede { margin: 12px 0 0; max-width: 62ch; color: #4a4436;
               font: 600 15.5px/1.62 var(--qx-font, system-ui); }

  /* ── where the learner is, in one row ────────────── */
  .resume { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 16px;
            align-items: center; min-height: 64px; padding: 14px 19px; border-radius: 16px;
            border: 1px solid var(--clay); background: var(--clay-soft);
            color: var(--ink); text-decoration: none; box-shadow: 0 5px 0 rgba(168,90,52,.11); }
  .resume-tag { padding: 5px 11px; border-radius: 999px; background: var(--clay);
                color: #fff; font: 800 11px var(--qx-font, system-ui);
                letter-spacing: .1em; text-transform: uppercase; white-space: nowrap; }
  .resume-what { display: grid; gap: 1px; min-width: 0; }
  .resume-what b { font: 800 16px/1.25 var(--qx-font, system-ui); overflow-wrap: anywhere; }
  .resume-what span { color: #6b5747; font: 650 12.5px var(--qx-font, system-ui); }
  a.resume { transition: border-color .15s ease, background .15s ease; }
  a.resume:hover { background: #f0d9c9; border-color: var(--ink); }
  a.resume:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }
  .resume.settling, .resume.done-all { margin: 0; border-style: dashed;
    border-color: var(--line); background: var(--card); }

  /* ── the door, now a real invitation rather than three small pills ───── */
  .door-pick { display: grid; gap: 18px; padding: 25px; border: 1px solid var(--line);
               border-radius: 22px; background: rgba(255,253,247,.72); }
  .door-intro { display: grid; grid-template-columns: minmax(0,1fr) minmax(260px,.72fr);
                gap: 6px 30px; align-items: end; }
  .door-pick-label { grid-column: 1/-1; color: var(--clay); font: 850 11px var(--qx-font, system-ui);
                     letter-spacing: .14em; text-transform: uppercase; }
  .door-intro h2 { margin: 0; font: 700 clamp(24px,3vw,32px)/1.08 Georgia,serif; letter-spacing: -.02em; }
  .door-intro p { margin: 0; color: var(--muted); font: 600 14px/1.55 var(--qx-font,system-ui); }
  .door-cards { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 11px; }
  .door-card { display: grid; grid-template-columns: auto 1fr; gap: 13px; align-items: start;
               min-width: 0; min-height: 154px; padding: 17px; cursor: pointer; text-align: left;
               border: 1px solid var(--line); border-radius: 16px; background: var(--card); color: var(--ink);
               box-shadow: 0 3px 0 rgba(36,31,22,.065); transition: transform .16s ease,border-color .16s ease,box-shadow .16s ease; }
  .door-card:hover { transform: translateY(-4px); border-color: var(--clay); box-shadow: 0 11px 22px rgba(36,31,22,.11); }
  .door-card.chosen { border: 2px solid var(--clay); padding: 16px; background: var(--clay-soft); }
  .door-symbol { display: grid; place-items: center; min-width: 49px; height: 38px; padding: 0 7px;
                 border-radius: 10px; background: var(--ink); color: var(--card);
                 font: 900 11px var(--qx-font,system-ui); letter-spacing: .08em; }
  .door-card.chosen .door-symbol { background: var(--clay); }
  .door-copy { display: grid; gap: 6px; min-width: 0; }
  .door-copy b { font: 800 16px/1.2 var(--qx-font,system-ui); }
  .door-copy em { color: var(--muted); font: 600 12.5px/1.45 var(--qx-font,system-ui); font-style: normal; }
  .door-action { grid-column: 1/-1; align-self: end; display: flex; justify-content: space-between;
                 color: var(--clay); font: 850 11.5px var(--qx-font,system-ui); }
  .door-action:after { content: '→'; }
  .door-card:focus-visible { outline: 3px solid var(--clay); outline-offset: 3px; }
  .door-pick-note { color: var(--muted); font: 650 12.5px/1.5 var(--qx-font, system-ui); }

  /* ── the floor ─────────────────────────────────────────────────── */
  .stages { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
  .stage { padding: 20px; border: 1px solid var(--line); border-radius: 20px; background: var(--card);
           box-shadow: 0 4px 0 rgba(36,31,22,.055); }
  /* A stage on its own page is the page, not a card sitting on one. */
  .stage.solo { padding: 0; border: 0; background: none; }
  .stage.solo .cols { margin-top: 0; }
  .stage.complete { border-color: var(--green); background: #f4faf1; }
  .stage-head { display: grid; grid-template-columns: 36px 1fr auto; gap: 13px; align-items: start; }
  .stage-no { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%;
              background: var(--ink); color: var(--card);
              font: 800 13px ui-monospace, Consolas, monospace; }
  .stage-text { display: grid; gap: 3px; }
  .stage-head h3 { margin: 0; font: 800 17.5px var(--qx-font, system-ui); }
  .lede { color: var(--muted); font: 650 13.5px/1.45 var(--qx-font, system-ui); }
  .door-note { color: var(--clay); font: 700 12.5px var(--qx-font, system-ui); }
  /* One control per stage on the floor, in place of the stage's own chips. It
     reads as a destination rather than a step, so it is quieter than .resume:
     the floor should have exactly one loudest thing on it. */
  .stage-open { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 14px;
                align-items: center; min-height: 58px; margin-top: 12px; padding: 13px 17px;
                border: 1px solid var(--line); border-radius: 14px; background: var(--card);
                color: var(--ink); text-decoration: none; }
  .stage-open:hover { border-color: var(--ink); background: var(--deep); }
  .stage-open:focus-visible { outline: 3px solid var(--clay); outline-offset: 3px; }
  .stage-open-what { display: grid; gap: 2px; min-width: 0; }
  .stage-open-what b { font: 800 15.5px/1.25 var(--qx-font, system-ui); }
  .stage-open-what span { color: var(--muted); font: 650 12.5px var(--qx-font, system-ui); }
  .stage-unbuilt { display: block; margin-top: 8px; color: var(--muted);
                   font: 650 12px/1.5 var(--qx-font, system-ui); }

  /* Asked once. After that it is a sentence, not three cards. */
  .door-settled { display: flex; flex-wrap: wrap; align-items: baseline; gap: 9px;
                  margin: 22px 0 0; color: var(--muted);
                  font: 650 13.5px var(--qx-font, system-ui); }
  .door-settled b { color: var(--ink); font-weight: 800; }
  .door-change { padding: 0; border: 0; background: none; color: var(--clay);
                 font: 800 13.5px var(--qx-font, system-ui); text-decoration: underline;
                 text-underline-offset: 3px; cursor: pointer; }
  .door-change:focus-visible { outline: 3px solid var(--clay); outline-offset: 3px; }

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

  @media (max-width: 900px) {
    .masthead { grid-template-columns: 1fr; align-items: start; }
    .resume { grid-template-columns: minmax(0, 1fr) auto; }
    .resume-tag { grid-column: 1 / -1; justify-self: start; }
  }

  @media (max-width: 760px) {
    .floor { padding-inline: 14px; }
    .masthead { padding: 25px 20px; }
    .door-intro { grid-template-columns: 1fr; }
    .door-cards { grid-template-columns: 1fr; }
    .door-card { min-height: 130px; }
  }

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
    a.asset, .door-card { transition: none; }
    a.asset:hover, .door-card:hover { transform: none; }
  }

  @media (forced-colors: active) {
    .asset.blocked { border: 2px dashed CanvasText; }
    .asset.is-done, .seq-done { outline: 2px solid CanvasText; }
  }

  /* Approved homepage direction B · Learning ledger.
     This is a presentation decision only. It does not change the status of
     any lesson, mission or curriculum record shown on the floor. */
  .floor-page { background: #e8e0d1; }
  .floor {
    --paper: #f4efe4;
    --card: #fffdf7;
    --deep: #e5ddcd;
    --line: #c9c0ae;
    padding-top: 18px;
    gap: 18px;
  }

  .masthead {
    grid-template-columns: minmax(0, 1fr) minmax(210px, 285px);
    padding: 27px 31px;
    border: 5px solid var(--ink);
    border-radius: 0;
    background: var(--paper);
    box-shadow: 9px 9px 0 rgba(36,31,22,.15);
  }
  .masthead h1 { font-weight: 400; }
  .mast-lede { max-width: 720px; font-family: Georgia, serif; font-size: 17px; font-weight: 400; }
  .tally, .shape {
    padding: 16px 18px;
    border-left: 4px solid var(--green);
    background: var(--green-soft);
  }
  .tally .bar, .shape .bar { flex-basis: 100%; height: 7px; background: rgba(36,31,22,.13); }

  .resume {
    min-height: 68px;
    padding: 0;
    grid-template-columns: 112px minmax(0, 1fr) auto;
    gap: 0;
    border: 3px solid var(--ink);
    border-radius: 0;
    background: var(--card);
    box-shadow: 7px 7px 0 var(--ink);
  }
  .resume-tag {
    align-self: stretch;
    display: grid;
    place-items: center;
    padding: 10px;
    border-radius: 0;
    background: var(--clay);
    text-align: center;
  }
  .resume-what { padding: 15px 18px; }
  .resume-what b { font-family: Georgia, serif; font-size: 20px; font-weight: 700; }
  .resume > .chev { padding: 0 22px; color: var(--ink); }
  a.resume:hover { background: var(--card); border-color: var(--clay); box-shadow: 7px 7px 0 var(--clay); }

  .door-pick {
    gap: 15px;
    padding: 23px;
    border: 4px solid var(--ink);
    border-radius: 0;
    background: var(--paper);
  }
  .door-intro { grid-template-columns: minmax(0, 1fr) minmax(250px, .7fr); }
  .door-intro h2 { font-size: clamp(25px, 3vw, 34px); font-weight: 400; }
  .door-cards { gap: 10px; }
  .door-card {
    grid-template-columns: 58px 1fr auto;
    align-items: center;
    min-height: 154px;
    padding: 14px;
    border: 2px solid var(--ink);
    border-radius: 0;
    box-shadow: none;
  }
  .door-card:hover { transform: translateY(-2px); box-shadow: 5px 5px 0 rgba(36,31,22,.15); }
  .door-card.chosen { padding: 13px; border: 3px solid var(--clay); background: var(--clay-soft); box-shadow: 5px 5px 0 rgba(36,31,22,.15); }
  .door-symbol { width: 50px; min-width: 50px; height: 50px; border-radius: 0; }
  .door-copy b { font-family: Georgia, serif; font-size: 18px; }
  .door-action {
    grid-column: 1 / -1;
    width: 100%;
    padding-top: 12px;
    border-top: 1px solid var(--line);
  }

  .stage {
    padding: 21px;
    border: 4px solid var(--ink);
    border-radius: 0;
    background: var(--paper);
    box-shadow: 7px 7px 0 rgba(36,31,22,.14);
  }
  .stage + .stage { margin-top: 7px; }
  .stage-head h3 { font-family: Georgia, serif; font-size: 21px; }
  .stage-no { border-radius: 0; }
  .pairs { border-radius: 0; background: var(--deep); }
  .pair-line { border-radius: 0; }
  .asset, .asset.small { border: 2px solid var(--ink); border-radius: 0; box-shadow: 3px 3px 0 rgba(36,31,22,.09); }
  .asset.play { border-color: var(--clay); background: #fff8f2; }
  .asset.is-done { border-color: var(--green); background: var(--green-soft); }
  .badge, .asset.small .badge { border-radius: 0; }

  @media (max-width: 900px) {
    .masthead { grid-template-columns: 1fr; }
    .resume { grid-template-columns: 104px minmax(0, 1fr) auto; }
    .resume-tag { grid-column: auto; justify-self: stretch; }
  }

  @media (max-width: 760px) {
    .masthead { border-width: 4px; padding: 23px 19px; box-shadow: 6px 6px 0 rgba(36,31,22,.15); }
    .resume { grid-template-columns: 1fr; box-shadow: 5px 5px 0 var(--ink); }
    .resume-tag { min-height: 38px; }
    .resume > .chev { padding: 0 18px 14px; text-align: right; }
    .door-pick { padding: 19px 14px; }
    .door-intro { grid-template-columns: 1fr; }
    .door-card { grid-template-columns: 52px 1fr; }
    .stage { padding: 16px 12px; border-width: 3px; box-shadow: 5px 5px 0 rgba(36,31,22,.14); }
  }

  /* Softer controls sit on top of the square ledger system. Restricting the
     shape to current state and actions keeps it meaningful. */
  .resume-tag {
    align-self: center;
    min-height: 36px;
    margin: 0 13px;
    padding-inline: 15px;
    border-radius: 999px;
  }

  .door-card.chosen .door-action {
    padding: 8px 12px;
    border: 0;
    border-radius: 999px;
    background: var(--clay);
    color: #fff;
  }
  .door-card {
    padding-inline: 24px;
    border-radius: 28px;
  }
  .door-card.chosen { padding-inline: 23px; }
  .door-symbol {
    width: 50px;
    border-radius: 16px;
  }
  .door-action { padding-inline: 8px; }

  .asset, .asset.small {
    padding-inline: 18px;
    border-radius: 999px;
  }
  .badge, .asset.small .badge { border-radius: 50%; }

  @media (max-width: 760px) {
    .resume-tag { justify-self: start; margin: 12px 14px 0; }
  }
</style>
