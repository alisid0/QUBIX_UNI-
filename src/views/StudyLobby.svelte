<script>
  import { onMount } from 'svelte';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';
  import { SHARED_FOUNDATIONS } from '../lib/content/shared-foundations.js';
  import {
    INTENTS, ROLE_OPTIONS, STUDY_ATOMS, atomById, defaultAtomId, intentById,
    bandFromProbeScore, saveBand, bandForAtom, roleForAtom,
    loadIdentity, saveIdentity, canStrangerMatch,
    placementItemsFor, scorePlacement,
    SESSION_MS, REHEARSAL_MS,
    createRoom, inviteHref, loadRecaps, deleteRecap, recapText,
    enqueueMatch, dequeueMatch, waitingFor, pairScore
  } from '../lib/study/index.js';

  export let initialAtomId = defaultAtomId();
  export let initialIntent = 'learn';

  const CHAPTER_TITLES = [
    'What data represents', 'Numbers, ratios and change', 'Quality and evidence',
    'Statistics before models', 'SQL foundations', 'Python foundations', 'Explain what you found',
    'Chance and evidence'
  ];

  let identity = loadIdentity();
  let name = identity.displayName || '';
  let ageBand = identity.ageBand || '';
  let intent = intentById(initialIntent)?.id || 'learn';
  let atomId = atomById(initialAtomId)?.id || defaultAtomId();
  let role = roleForAtom(initialAtomId);
  let screen = 'lobby';
  let probeItems = [];
  let probeAnswers = {};
  let probeIndex = 0;
  let matchNotice = '';
  let recaps = [];
  let copied = false;
  let rehearsal = false;

  $: atom = atomById(atomId);
  $: grouped = SHARED_FOUNDATIONS.map(({ chapter }) => ({
    chapter,
    title: CHAPTER_TITLES[chapter - 1] || `Chapter ${chapter}`,
    atoms: STUDY_ATOMS.filter(item => item.chapter === chapter)
  }));
  $: savedBand = bandForAtom(atomId);
  $: identityReady = name.trim().length >= 2 && (ageBand === '18+' || ageBand === '13-17');

  onMount(() => {
    recaps = loadRecaps();
    const params = new URLSearchParams(window.location.search);
    rehearsal = params.get('rehearse') === '1';
    if (params.get('intent') && INTENTS.some(item => item.id === params.get('intent'))) {
      intent = params.get('intent');
    }
    if (params.get('atom') && atomById(params.get('atom'))) atomId = params.get('atom');
    if (params.get('role') && ROLE_OPTIONS.some(item => item.id === params.get('role'))) {
      role = params.get('role');
    }
  });

  function persistIdentity() {
    identity = saveIdentity({ displayName: name.trim(), ageBand });
  }

  function durationMs() {
    return rehearsal ? REHEARSAL_MS : SESSION_MS;
  }

  function host() {
    persistIdentity();
    return { id: identity.id, displayName: identity.displayName };
  }

  function startRoom(kind, extras = {}) {
    persistIdentity();
    saveBand(atomId, { band: extras.band || savedBand, role });
    const room = createRoom({
      kind,
      intent,
      atomId,
      band: extras.band || savedBand,
      role,
      host: host(),
      durationMs: durationMs(),
      mutedChair: kind === 'friends'
    });
    window.location.assign(inviteHref(room));
  }

  function startFriends() {
    if (!identityReady) return;
    startRoom('friends');
  }

  function startSeminar() {
    if (!identityReady) return;
    startRoom('seminar');
  }

  function startMatched() {
    if (!identityReady) return;
    if (!canStrangerMatch(identity)) {
      matchNotice = 'Stranger matching is 18+ in this prototype. Start a friends room or a bot seminar instead.';
      return;
    }
    const items = placementItemsFor(atomId);
    if (items.length && !probeAnswers._done) {
      probeItems = items;
      probeIndex = 0;
      probeAnswers = {};
      screen = 'probe';
      return;
    }
    runMatch(savedBand);
  }

  function submitProbe() {
    const item = probeItems[probeIndex];
    if (!probeAnswers[item.id]) return;
    if (probeIndex < probeItems.length - 1) {
      probeIndex += 1;
      return;
    }
    const result = scorePlacement(probeItems, probeAnswers);
    const band = bandFromProbeScore(result.correct, result.total);
    saveBand(atomId, { band, role });
    probeAnswers = { ...probeAnswers, _done: true };
    runMatch(band);
  }

  function runMatch(band) {
    screen = 'matching';
    matchNotice = '';
    const seat = {
      learnerId: host().id,
      intent,
      atomId,
      band,
      role,
      language: 'en',
      modality: 'text'
    };
    enqueueMatch(seat);
    const others = waitingFor(seat)
      .map(row => ({ seat: row, score: pairScore(seat, row) }))
      .filter(row => row.score > 0)
      .sort((a, b) => b.score - a.score);
    const waitMs = others.length ? 400 : 8000;
    setTimeout(() => {
      dequeueMatch(seat.learnerId);
      startRoom('matched', { band });
    }, waitMs);
  }

  function downloadRecap(recap) {
    const blob = new Blob([recapText(recap)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qubix-study-${recap.roomCode}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function removeRecap(code) {
    deleteRecap(code);
    recaps = loadRecaps();
  }

  function studyAgain(recap) {
    intent = recap.intent;
    atomId = recap.atomId;
    startSeminar();
  }

  function copyPrivacy() {
    copied = true;
    setTimeout(() => (copied = false), 1600);
  }
</script>

<svelte:head>
  <title>Study rooms | Qubix University</title>
  <meta name="description" content="A 40-minute data-science study room at your level, with a chair that will not let one person eat the session." />
  <link rel="canonical" href="https://qubix.university/study" />
</svelte:head>

<section class="study qx-shell">
  <div class="nav-wrap"><SiteNav current="study" subjects={false} /></div>

  {#if screen === 'probe'}
    <header class="hero">
      <p>PLACEMENT · 60–90 SECONDS</p>
      <h1>Show the work, then we seat you.</h1>
      <span>Three items on “{atom?.title}”. Demonstrated answers beat a self-report.</span>
    </header>
    <form class="probe" on:submit|preventDefault={submitProbe}>
      <p class="eyebrow">ITEM {probeIndex + 1} OF {probeItems.length} · {probeItems[probeIndex]?.difficulty}</p>
      <h2>{probeItems[probeIndex]?.prompt}</h2>
      <div class="options">
        {#each probeItems[probeIndex]?.options || [] as option}
          <button type="button" class:on={probeAnswers[probeItems[probeIndex].id] === option[0]}
            on:click={() => (probeAnswers[probeItems[probeIndex].id] = option[0])}>
            {option[1]}
          </button>
        {/each}
      </div>
      <button class="primary" type="submit" disabled={!probeAnswers[probeItems[probeIndex]?.id]}>
        {probeIndex === probeItems.length - 1 ? 'Seat me' : 'Next item'}
      </button>
    </form>
  {:else if screen === 'matching'}
    <header class="hero">
      <p>MATCHING</p>
      <h1>Looking for the same atom and intent.</h1>
      <span>If nobody compatible is waiting, the room fills with same-band peer agents rather than a bad five.</span>
    </header>
    <p class="wait" role="status">Holding a seat for “{atom?.title}” · {INTENTS.find(i => i.id === intent)?.label}</p>
  {:else}
    <header class="hero">
      <div class="hero-copy">
        <p>NEXT SEAT · NOT A FEED</p>
        <h1>40 minutes, your level, a chair that will not let one person eat the session.</h1>
        <span>Matched data-science rooms for people already learning on Qubix. The unit of value is the session, not a profile. Nothing is published unless you export it.</span>
        {#if rehearsal}<p class="rehearse">Rehearsal clock on. The real room is 40 minutes.</p>{/if}
      </div>
      <aside class="seat-card">
        <p>THIS SEAT</p>
        <h2>{atom?.title}</h2>
        <span>{INTENTS.find(i => i.id === intent)?.label} · band {savedBand}</span>
        <a href={atom?.readingHref}>Open the briefing first</a>
      </aside>
    </header>

    <p class="banner" role="note">Validation prototype. Curriculum stays <b>AI_DRAFT</b>. Chats stay on this device. We do not train on them, put them in a feed, or advertise what you got wrong.</p>

    <form class="setup" on:submit|preventDefault>
      <div class="field">
        <label for="study-name">What should we call you in the room?</label>
        <input id="study-name" type="text" bind:value={name} maxlength="32" autocomplete="nickname" required
          placeholder="A first name or a handle" />
      </div>
      <fieldset>
        <legend>Age band</legend>
        <label><input type="radio" bind:group={ageBand} value="18+" /> 18 or over — may join stranger matching</label>
        <label><input type="radio" bind:group={ageBand} value="13-17" /> 13–17 — friends rooms and bot seminars only</label>
      </fieldset>
      <p class="fine">Qubix is not for under-13s. There is no stranger voice match in this build: text only.</p>

      <fieldset class="intents">
        <legend>What is this room for?</legend>
        {#each INTENTS as item}
          <label class:on={intent === item.id}>
            <input type="radio" bind:group={intent} value={item.id} />
            <b>{item.label}</b>
            <span>{item.job}</span>
          </label>
        {/each}
      </fieldset>

      <div class="field">
        <label for="study-atom">Topic atom — one idea, not “data science”</label>
        <select id="study-atom" bind:value={atomId}>
          {#each grouped as group}
            <optgroup label={`${String(group.chapter).padStart(2, '0')} · ${group.title}`}>
              {#each group.atoms as item}
                <option value={item.id}>{item.title}</option>
              {/each}
            </optgroup>
          {/each}
        </select>
        {#if atom}<p class="objective">{atom.objective}</p>{/if}
      </div>

      <fieldset class="roles">
        <legend>Your role in this room</legend>
        {#each ROLE_OPTIONS as item}
          <label><input type="radio" bind:group={role} value={item.id} /> {item.label}</label>
        {/each}
      </fieldset>

      {#if matchNotice}<p class="notice" role="status">{matchNotice}</p>{/if}

      <div class="actions">
        <button type="button" class="primary" disabled={!identityReady || ageBand !== '18+'} on:click={startMatched}>Find a matched room</button>
        <button type="button" disabled={!identityReady} on:click={startFriends}>Invite friends</button>
        <button type="button" disabled={!identityReady} on:click={startSeminar}>Start a bot seminar</button>
      </div>
      <p class="fine">Matched rooms seat 3–5 humans. A partial fill with peer agents at the same band beats a bad five. Friends rooms let you mute the chair.</p>
    </form>

    <section class="notebook" aria-labelledby="notebook-heading">
      <p class="eyebrow" id="notebook-heading">YOUR NOTEBOOK</p>
      <h2>Rooms you can reopen. No wall of posts.</h2>
      {#if recaps.length === 0}
        <p class="empty">No recaps yet. Finish a room and it lands here, private to this device.</p>
      {:else}
        <ul>
          {#each recaps as recap}
            <li>
              <div>
                <b>{recap.atomTitle}</b>
                <span>{recap.intentLabel} · {recap.durationMin} min · {recap.members.filter(m => m.kind === 'human').map(m => m.displayName).join(', ')}</span>
              </div>
              <div class="row-actions">
                <button type="button" on:click={() => studyAgain(recap)}>Study again</button>
                <button type="button" on:click={() => downloadRecap(recap)}>Export</button>
                <button type="button" class="danger" on:click={() => removeRecap(recap.roomCode)}>Delete</button>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </section>

    <section class="promise">
      <p>We keep your rooms so you can continue. We don’t train on your chats, don’t put them in a feed, and don’t advertise what you got wrong.</p>
      <button type="button" class="quiet" on:click={copyPrivacy}>{copied ? 'That is the whole privacy promise.' : 'That is the product promise.'}</button>
    </section>
  {/if}

  <div class="foot-wrap"><SiteFooter compact /></div>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#f1ede4}
  :global(body){position:static}

  .study{--rule:#c8c1b1;--ink:#20241f;--soft:#62695f;--accent:#315f48;--signal:#b85530;--panel:#f7f3e9;
         min-height:100vh;max-width:none;padding:0 0 72px;background:#e6e0d2;color:var(--ink)}
  .study>*{max-width:1120px;margin-inline:auto}
  .nav-wrap,.foot-wrap,.hero,.banner,.setup,.notebook,.promise,.probe,.wait{padding-inline:clamp(16px,5vw,56px)}
  .hero,.setup,.notebook,.probe{max-width:860px}

  .hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,.7fr);gap:8%;padding-top:48px;padding-bottom:36px}
  .hero-copy>p:first-child,.eyebrow{margin:0 0 14px;color:var(--signal);font:800 11.5px var(--qx-font);letter-spacing:.16em}
  h1{margin:0;font:400 clamp(30px,4vw,46px)/1.05 Georgia,serif;letter-spacing:-.03em;text-wrap:balance}
  .hero-copy>span,.probe>span{display:block;margin-top:16px;max-width:62ch;color:var(--soft);font:400 16px/1.6 var(--qx-font)}
  .rehearse{margin:12px 0 0;color:var(--signal);font:700 13px var(--qx-font)}
  .seat-card{padding:20px;border:5px solid var(--ink);background:var(--panel)}
  .seat-card p{margin:0;color:var(--accent);font:800 11.5px var(--qx-font);letter-spacing:.12em}
  .seat-card h2{margin:10px 0 0;font:400 24px/1.15 Georgia,serif}
  .seat-card span{display:block;margin-top:8px;color:var(--soft);font:500 14px var(--qx-font)}
  .seat-card a{display:inline-block;margin-top:14px;color:var(--ink);font:700 14px var(--qx-font)}

  .banner{max-width:860px;margin:0 auto 28px;padding:12px 16px;border-left:3px solid var(--signal);background:#ebe5d8;color:var(--soft);font:400 14.5px/1.5 var(--qx-font)}
  .setup,.probe{display:grid;gap:22px;padding-bottom:40px}
  .field,.probe{display:grid;gap:8px}
  label,legend{font:700 14px var(--qx-font)}
  input[type=text],input:not([type]),select,input[type=search]{
    width:100%;min-height:46px;padding:10px 12px;border:1px solid var(--rule);border-radius:10px;
    background:#fff;color:var(--ink);font:400 16px var(--qx-font)}
  fieldset{border:0;margin:0;padding:0;display:grid;gap:10px}
  .intents{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .intents label{display:grid;gap:4px;padding:14px;border:1px solid var(--rule);border-radius:12px;background:rgba(255,255,255,.45);cursor:pointer}
  .intents label.on{border-color:var(--signal);background:#fff}
  .intents b{font:400 17px Georgia,serif}
  .intents span{color:var(--soft);font:400 13.5px/1.4 var(--qx-font)}
  .roles{display:flex;flex-wrap:wrap;gap:12px 18px}
  .objective,.fine,.empty{margin:0;color:var(--soft);font:400 14.5px/1.55 var(--qx-font)}
  .notice{margin:0;padding:12px;border-left:3px solid var(--signal);background:#ebe5d8;font:500 14.5px var(--qx-font)}
  .actions{display:flex;flex-wrap:wrap;gap:10px}
  button{min-height:44px;padding:11px 16px;border:1px solid var(--rule);border-radius:10px;background:transparent;color:var(--ink);font:800 14.5px var(--qx-font);cursor:pointer}
  .primary{background:var(--signal);border-color:var(--signal);color:#fff}
  button:disabled{opacity:.45;cursor:not-allowed}
  .danger{color:#a02d1d;border-color:#e3c2ba}
  .quiet{border:0;padding:0;min-height:0;font:600 14px var(--qx-font);text-decoration:underline}
  .options{display:grid;gap:8px}
  .options button{text-align:left;background:#fff}
  .options button.on{border-color:var(--signal)}

  .notebook{padding-top:12px;border-top:1px solid var(--rule)}
  .notebook h2{margin:0 0 16px;font:400 26px Georgia,serif}
  .notebook ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  .notebook li{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:14px 0;border-bottom:1px solid var(--rule)}
  .notebook b{display:block;font:400 18px Georgia,serif}
  .notebook span{color:var(--soft);font:400 14px var(--qx-font)}
  .row-actions{display:flex;flex-wrap:wrap;gap:8px}
  .promise{padding:28px 0 0;color:var(--soft);font:400 15px/1.55 var(--qx-font);max-width:70ch}
  .wait{padding:24px 0 80px;color:var(--soft);font:500 16px var(--qx-font)}

  button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

  @media(max-width:720px){
    .hero{grid-template-columns:1fr;gap:22px;padding-top:32px}
    .intents{grid-template-columns:1fr}
    .actions{display:grid}
  }
</style>
