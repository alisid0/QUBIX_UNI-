<script>
  import { onDestroy, onMount, tick } from 'svelte';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import {
    atomById, intentById, getRoom, joinRoom, postMessage, setNotes, voteSkip,
    pulseChair, toggleChair, endRoom, inviteHref, subscribeRooms, loadIdentity,
    recapText, deleteRoom, SESSION_MS, peerLine
  } from '../lib/study/index.js';

  export let code;
  export let joinExtras = {};

  let room = null;
  let missing = false;
  let draft = '';
  let copied = false;
  let log;
  let now = Date.now();
  let exampleStep = 0;
  let identity = loadIdentity();
  let unsub = () => {};
  let tickTimer;
  let pulseTimer;

  $: atom = room ? atomById(room.atomId) : null;
  $: intent = room ? intentById(room.intent) : null;
  $: remaining = room?.startedAt
    ? Math.max(0, room.startedAt + room.durationMs - now)
    : 0;
  $: clock = formatMs(remaining);
  $: humans = room?.members.filter(member => member.kind === 'human') || [];
  $: bots = room?.members.filter(member => member.kind !== 'human') || [];
  $: ended = room?.status === 'ended';
  $: exampleRows = atom?.example?.rows || [];

  function formatMs(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  async function scrollLog() {
    await tick();
    if (log) log.scrollTop = log.scrollHeight;
  }

  function refresh() {
    room = getRoom(code);
    if (room) scrollLog();
  }

  onMount(() => {
    identity = loadIdentity();
    const existing = getRoom(code);
    if (!existing) {
      missing = true;
      return;
    }
    if (identity.id && !existing.members.some(member => member.id === identity.id)) {
      joinRoom(code, { id: identity.id, displayName: identity.displayName || 'Learner' }, joinExtras);
    }
    refresh();
    unsub = subscribeRooms(next => {
      if (next?.code === code) {
        room = next;
        scrollLog();
      }
    });
    tickTimer = setInterval(() => { now = Date.now(); }, 1000);
    pulseTimer = setInterval(() => {
      if (getRoom(code)?.status === 'live') {
        pulseChair(code, Date.now() % 120000 < 5000 ? 'rotate' : 'timebox');
        refresh();
      }
    }, 60 * 1000);
  });

  onDestroy(() => {
    unsub();
    clearInterval(tickTimer);
    clearInterval(pulseTimer);
  });

  function send() {
    const text = draft.trim();
    if (!text || !room || ended) return;
    postMessage(code, {
      from: identity.id,
      name: identity.displayName || 'Learner',
      kind: 'human',
      text
    });
    draft = '';
    refresh();
    maybePeer();
  }

  function maybePeer() {
    const current = getRoom(code);
    if (!current || current.kind === 'friends' || current.chair !== 'bot') return;
    const agents = current.members.filter(member => member.kind === 'bot');
    if (!agents.length) return;
    if ((current.messages || []).filter(message => message.kind === 'human').length % 3 !== 0) return;
    const agent = agents[0];
    const turn = current.messages.filter(message => message.from === agent.id).length;
    setTimeout(() => {
      postMessage(code, {
        from: agent.id,
        name: agent.displayName,
        kind: 'bot',
        text: peerLine(agent, current.atomId, turn)
      });
      refresh();
    }, 700);
  }

  function notesInput(event) {
    setNotes(code, event.target.value);
    refresh();
  }

  function skip() {
    if (!identity.id) return;
    voteSkip(code, identity.id);
    refresh();
  }

  function finish() {
    endRoom(code);
    refresh();
  }

  async function copyInvite() {
    const href = `${window.location.origin}${inviteHref(room)}`;
    try {
      await navigator.clipboard.writeText(href);
      copied = true;
      setTimeout(() => (copied = false), 1600);
    } catch {
      copied = false;
    }
  }

  function downloadRecap() {
    if (!room?.recap) return;
    const blob = new Blob([recapText(room.recap)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qubix-study-${room.code}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function removeAll() {
    deleteRoom(code);
    window.location.assign('/study');
  }

  function studyAgain() {
    const params = new URLSearchParams({
      intent: room.intent,
      atom: room.atomId,
      role: humans.find(member => member.id === identity.id)?.role || 'learner'
    });
    window.location.assign(`/study?${params}`);
  }
</script>

<svelte:head>
  <title>{atom ? `${atom.title} study room` : 'Study room'} | Qubix University</title>
  <meta name="description" content="A timed Qubix study room with a chair, shared notes and a recap. Private by default." />
</svelte:head>

<section class="room qx-shell">
  <div class="nav-wrap"><SiteNav current="study" subjects={false} /></div>

  {#if missing}
    <header class="hero">
      <p>ROOM NOT ON THIS DEVICE</p>
      <h1>This invite has no live chat pipe yet.</h1>
      <span>Until a founder-authorised session store exists, two tabs on this browser can share a room. A remote friend gets the same atom, intent and timer by opening a new seat from the lobby.</span>
      <a class="primary" href="/study">Take a seat from the lobby</a>
    </header>
  {:else if room}
    <header class="mast">
      <div>
        <p>{intent?.label || room.intent} · {room.kind} · {room.band}</p>
        <h1>{atom?.title}</h1>
        <span>{atom?.objective}</span>
      </div>
      <div class="clock" aria-live="polite">
        <b>{clock}</b>
        <small>{ended ? 'Ended' : room.durationMs >= SESSION_MS ? '40-minute room' : 'Rehearsal clock'}</small>
      </div>
    </header>

    <div class="layout">
      <section class="chat" aria-label="Room chat">
        <div class="log" bind:this={log}>
          {#each room.messages as message}
            <article class={message.kind}>
              <b>{message.name}</b>
              <p>{message.text}</p>
            </article>
          {/each}
        </div>
        {#if !ended}
          <form on:submit|preventDefault={send}>
            <label class="sr" for="room-draft">Message</label>
            <textarea id="room-draft" bind:value={draft} rows="2" maxlength="2000"
              placeholder={intent?.id === 'learn' ? 'Attempt the idea. Do not dump the answer.' : 'Write in the room.'}></textarea>
            <div class="composer">
              <button class="primary" type="submit" disabled={!draft.trim()}>Send</button>
              <button type="button" on:click={skip}>Vote to skip ({room.skipVotes.length}/3)</button>
              {#if room.kind === 'friends'}
                <button type="button" on:click={() => { toggleChair(code, !room.mutedChair); refresh(); }}>
                  {room.mutedChair ? 'Ask the chair in' : 'Mute the chair'}
                </button>
              {/if}
              <button type="button" on:click={finish}>End and recap</button>
            </div>
          </form>
        {/if}
      </section>

      <aside class="pane">
        <section>
          <p class="eyebrow">AGENDA</p>
          <ol>
            <li>Opening · 20 seconds each, chair-chosen order</li>
            <li>Work the pinned atom</li>
            <li>Exit checks</li>
            <li>Recap · next atom · study again or publish nothing</li>
          </ol>
        </section>

        {#if exampleRows.length}
          <section>
            <p class="eyebrow">WORKED EXAMPLE · ONE STEP</p>
            <b>{atom.example.title}</b>
            <p>{exampleRows[Math.min(exampleStep, exampleRows.length - 1)].join(' — ')}</p>
            <button type="button" on:click={() => (exampleStep = (exampleStep + 1) % exampleRows.length)}>Next step</button>
          </section>
        {/if}

        {#if atom?.check}
          <section>
            <p class="eyebrow">CHECK CARD</p>
            <p>{atom.check.prompt}</p>
            {#if intent?.id !== 'learn' || ended}
              <ul>{#each atom.check.options as option}<li>{option[1]}</li>{/each}</ul>
            {:else}
              <p class="hint">Learn rooms hide the choices until the group has attempted.</p>
            {/if}
          </section>
        {/if}

        <section>
          <p class="eyebrow">SHARED NOTES</p>
          <label class="sr" for="room-notes">Shared notes</label>
          <textarea id="room-notes" value={room.notes} on:input={notesInput} rows="6"
            placeholder="What the group actually said. Private to this room."></textarea>
        </section>

        <section>
          <p class="eyebrow">SEATS · {humans.length} HUMAN{humans.length === 1 ? '' : 'S'} / 5</p>
          <ul class="seats">
            {#each room.members as member}
              <li><b>{member.displayName}</b> <span>{member.kind} · {member.band} · {member.role}</span></li>
            {/each}
          </ul>
          {#if bots.length}<p class="hint">Peer agents fill empty seats rather than waiting forever.</p>{/if}
        </section>

        <section>
          <p class="eyebrow">INVITE</p>
          <button type="button" on:click={copyInvite}>{copied ? 'Copied' : 'Copy invite link'}</button>
          <p class="hint">Two tabs in this browser share the chat live. A remote friend still needs a call plus this timer until a session store is authorised.</p>
        </section>
      </aside>
    </div>

    {#if ended && room.recap}
      <section class="recap">
        <p class="eyebrow">RECAP · PRIVATE</p>
        <h2>Keep the room. Publish nothing.</h2>
        <pre>{recapText(room.recap)}</pre>
        <div class="composer">
          <button class="primary" type="button" on:click={studyAgain}>Study again with these people</button>
          {#if room.recap.nextAtomId}
            <a href={`/study?atom=${room.recap.nextAtomId}&intent=${room.intent}`}>Next atom</a>
          {/if}
          <button type="button" on:click={downloadRecap}>Export</button>
          <button type="button" class="danger" on:click={removeAll}>Delete this room</button>
        </div>
      </section>
    {/if}
  {/if}
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#f1ede4}
  :global(body){position:static}

  .room{--rule:#c8c1b1;--ink:#20241f;--soft:#62695f;--accent:#315f48;--signal:#b85530;--panel:#f7f3e9;
        min-height:100vh;max-width:none;padding:0 0 64px;background:#e6e0d2;color:var(--ink)}
  .nav-wrap,.mast,.layout,.recap,.hero{padding-inline:clamp(16px,4vw,48px);max-width:1240px;margin-inline:auto}
  .hero{padding-top:48px}
  .hero p{margin:0 0 12px;color:var(--signal);font:800 11.5px var(--qx-font);letter-spacing:.14em}
  h1{margin:0;font:400 clamp(28px,3.6vw,42px)/1.08 Georgia,serif}
  .hero span,.mast span{display:block;margin-top:10px;color:var(--soft);font:400 15px/1.5 var(--qx-font)}
  .primary{display:inline-flex;margin-top:18px;padding:12px 16px;background:var(--signal);color:#fff;font:800 14.5px var(--qx-font);text-decoration:none;border:0;border-radius:10px}

  .mast{display:flex;justify-content:space-between;gap:20px;align-items:end;padding-top:28px;padding-bottom:18px;border-bottom:1px solid var(--rule)}
  .mast p,.eyebrow{margin:0 0 8px;color:var(--signal);font:800 11.5px var(--qx-font);letter-spacing:.12em}
  .clock{text-align:right}
  .clock b{display:block;font:400 36px/1 Georgia,serif;font-variant-numeric:tabular-nums}
  .clock small{color:var(--soft);font:700 12px var(--qx-font);letter-spacing:.08em}

  .layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(260px,.75fr);gap:18px;padding-top:18px;align-items:start}
  .chat,.pane section,.recap{border:1px solid var(--rule);border-radius:14px;background:rgba(247,243,233,.7)}
  .log{height:min(58vh,560px);overflow:auto;padding:16px;display:grid;gap:12px}
  article b{display:block;font:800 12px var(--qx-font);letter-spacing:.06em}
  article p{margin:4px 0 0;font:400 15px/1.5 var(--qx-font)}
  article.chair b{color:var(--accent)}
  article.bot b{color:var(--soft)}
  form, .pane section, .recap{padding:14px}
  textarea{width:100%;padding:10px;border:1px solid var(--rule);border-radius:10px;background:#fff;color:var(--ink);font:400 15px/1.45 var(--qx-font)}
  .composer{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
  button, .recap a{min-height:42px;padding:10px 13px;border:1px solid var(--rule);border-radius:9px;background:#fff;color:var(--ink);font:800 13.5px var(--qx-font);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center}
  button.primary,.primary{background:var(--signal);border-color:var(--signal);color:#fff}
  button.danger{color:#a02d1d}
  .pane{display:grid;gap:12px}
  .pane ol,.pane ul{margin:8px 0 0;padding-left:18px;color:var(--soft);font:400 14.5px/1.5 var(--qx-font)}
  .pane b{font:400 16px Georgia,serif}
  .hint{margin:8px 0 0;color:var(--soft);font:400 13.5px/1.45 var(--qx-font)}
  .seats{list-style:none;padding:0}
  .seats li span{color:var(--soft);font:400 13px var(--qx-font)}
  .recap{margin-top:22px}
  .recap h2{margin:0 0 12px;font:400 26px Georgia,serif}
  pre{white-space:pre-wrap;font:400 14.5px/1.5 var(--qx-font);color:var(--ink);margin:0}
  .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}

  button:focus-visible,a:focus-visible,textarea:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

  @media(max-width:820px){
    .layout{grid-template-columns:1fr}
    .mast{flex-direction:column;align-items:start}
    .clock{text-align:left}
    .log{height:42vh}
  }
</style>
