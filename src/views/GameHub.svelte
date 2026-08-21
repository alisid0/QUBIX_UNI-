<script>
  // The way in, and the thing that makes six missions a game rather than six
  // pages. It reads progress on mount and again whenever the tab is returned
  // to, so finishing a mission and pressing back shows the new state.
  import { onMount } from 'svelte';
  import { MISSIONS, RANKS, TOTAL_XP, load, reset, statusOf, xpOf, rankOf, nextRankOf } from '../lib/game/progress.js';

  let state = { completed: [], started: null };
  let confirming = false;

  const refresh = () => { state = load(); };
  onMount(() => {
    refresh();
    const onShow = () => refresh();
    window.addEventListener('pageshow', onShow);
    document.addEventListener('visibilitychange', onShow);
    return () => {
      window.removeEventListener('pageshow', onShow);
      document.removeEventListener('visibilitychange', onShow);
    };
  });

  $: xp = xpOf(state);
  $: rank = rankOf(xp);
  $: next = nextRankOf(xp);
  $: rows = statusOf(state);
  $: done = state.completed.length;
  $: nextUp = rows.find(r => !r.done);

  function clearProgress() {
    reset();
    refresh();
    confirming = false;
  }
</script>

<svelte:head><title>Qubix Superstore | Qubix University</title>
<meta name="description" content="Learn data by working inside a synthetic retailer. Six missions from the checkout to the join." /></svelte:head>

<section class="hub qx-shell">
  <header>
    <div class="identity">
      <span class="badge">QX</span>
      <div>
        <p>QUBIX SUPERSTORE · PRE-INTERN ACADEMY · AI_DRAFT</p>
        <h1>Learn data by working in a shop</h1>
      </div>
    </div>
    <nav>
      <a href="?mode=wiki">The wiki</a>
      <a href="/library/index.html">Library</a>
      <a href="/">Mathematics</a>
    </nav>
  </header>

  <div class="standing">
    <div class="rank">
      <p class="eyebrow">YOUR STANDING</p>
      <h2>{rank.title}</h2>
      <p class="note">{rank.note}</p>
    </div>
    <div class="meter">
      <div class="bar" role="img" aria-label={`${xp} of ${TOTAL_XP} experience earned`}>
        <span style={`width:${Math.round((100 * xp) / TOTAL_XP)}%`}></span>
      </div>
      <div class="meter-row">
        <span><b>{xp}</b> / {TOTAL_XP} XP</span>
        <span><b>{done}</b> / {MISSIONS.length} missions</span>
      </div>
      {#if next}
        <p class="note">{next.at - xp} XP to {next.title}</p>
      {:else}
        <p class="note done">Academy complete. You can predict what a join does before running it.</p>
      {/if}
    </div>
  </div>

  {#if nextUp}
    <a class="resume" href={`?mode=game&mission=${nextUp.slug}`}>
      <span class="eyebrow">{done ? 'CONTINUE' : 'START HERE'}</span>
      <strong>{nextUp.mission.title}</strong>
      <span class="teaches">{nextUp.teaches}</span>
    </a>
  {/if}

  <h3>The academy</h3>
  <ol class="missions">
    {#each rows as row, i}
      <li class:done={row.done} class:locked={!row.open}>
        <span class="num">{String(i + 1).padStart(2, '0')}</span>
        <div class="body">
          <b>{row.mission.title}</b>
          <span>{row.teaches}</span>
        </div>
        <span class="xp">{row.xp} XP</span>
        {#if row.open}
          <a href={`?mode=game&mission=${row.slug}`}>{row.done ? 'Replay' : 'Play'}</a>
        {:else}
          <span class="lock" aria-label="Locked until the mission before it is finished">Locked</span>
        {/if}
      </li>
    {/each}
  </ol>

  <div class="ranks">
    <h3>Ranks</h3>
    <ul>
      {#each RANKS as r}
        <li class:reached={xp >= r.at}><b>{r.title}</b><span>{r.at} XP</span></li>
      {/each}
    </ul>
  </div>

  <footer>
    <p>Progress is kept in this browser only. There is no account and nothing is sent anywhere.</p>
    {#if confirming}
      <span class="confirm">
        Erase {done} completed mission{done === 1 ? '' : 's'}?
        <button on:click={clearProgress}>Erase</button>
        <button class="ghost" on:click={() => (confirming = false)}>Keep</button>
      </span>
    {:else}
      <button class="ghost" on:click={() => (confirming = true)} disabled={!done}>Reset progress</button>
    {/if}
  </footer>
</section>

<style>
  :global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}
  .hub{min-height:100vh;max-width:none;padding:20px clamp(12px,3vw,34px) 60px;color:#f1ede4;
       background:radial-gradient(circle at 40% 0,#3f3428,#171510 58%);overflow:auto}
  header{max-width:1080px;margin:0 auto 26px;display:flex;justify-content:space-between;align-items:flex-end;gap:18px;flex-wrap:wrap}
  .identity{display:flex;align-items:center;gap:13px;min-width:0}
  .badge{display:grid;place-items:center;width:50px;height:50px;border-radius:14px;background:#a85a34;color:#fff;font:900 15px var(--qx-font);flex:none}
  .identity p{margin:0 0 5px;color:#bcb19e;font:800 9px var(--qx-font);letter-spacing:.11em}
  .identity h1{margin:0;color:#fff;font:700 clamp(24px,4vw,34px)/1.1 Georgia,serif;text-wrap:balance}
  nav{display:flex;gap:15px;flex-wrap:wrap}
  nav a{color:#e2c7b7;font:800 11px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}

  .standing{max-width:1080px;margin:0 auto 18px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);
            gap:20px;padding:22px 24px;border:1px solid rgba(255,255,255,.13);border-radius:18px;background:rgba(255,255,255,.04)}
  .eyebrow{margin:0 0 6px;color:#c98c5e;font:900 9px var(--qx-font);letter-spacing:.12em}
  .rank h2{margin:0;font:700 26px Georgia,serif;color:#fff;text-wrap:balance}
  .note{margin:7px 0 0;color:#a89e8d;font:600 12px/1.5 var(--qx-font)}
  .note.done{color:#8fc978}
  .meter{display:flex;flex-direction:column;justify-content:center}
  .bar{height:9px;border-radius:6px;background:rgba(255,255,255,.11);overflow:hidden}
  .bar span{display:block;height:100%;background:linear-gradient(90deg,#a85a34,#d69a4e);transition:width .4s ease}
  .meter-row{display:flex;justify-content:space-between;gap:14px;margin-top:10px;color:#bcb19e;font:700 11.5px var(--qx-font)}
  .meter-row b{color:#fff;font:900 15px var(--qx-font);font-variant-numeric:tabular-nums}

  .resume{max-width:1080px;margin:0 auto 30px;display:grid;gap:5px;padding:20px 24px;border-radius:16px;
          background:#a85a34;color:#fff;text-decoration:none;border:1px solid #c2703f}
  .resume .eyebrow{color:#f6d9c4;margin:0}
  .resume strong{font:700 23px Georgia,serif}
  .resume .teaches{color:#f3ddcd;font:600 12.5px var(--qx-font)}
  .resume:hover{background:#96502e}
  .resume:focus-visible{outline:3px solid #f1ede4;outline-offset:3px}

  h3{max-width:1080px;margin:0 auto 12px;font:900 10px var(--qx-font);letter-spacing:.13em;color:#bcb19e}
  ol.missions{max-width:1080px;margin:0 auto 32px;padding:0;list-style:none;display:grid;gap:9px}
  ol.missions li{display:grid;grid-template-columns:auto minmax(0,1fr) auto auto;align-items:center;gap:15px;
                 padding:15px 20px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,255,255,.03)}
  ol.missions li.done{border-color:rgba(143,201,120,.4);background:rgba(143,201,120,.07)}
  ol.missions li.locked{opacity:.5}
  .num{font:900 13px var(--qx-font);color:#8d8474;font-variant-numeric:tabular-nums}
  li.done .num::after{content:" ✓";color:#8fc978}
  .body{min-width:0}
  .body b{display:block;font:700 17px Georgia,serif;color:#fff}
  .body span{display:block;margin-top:3px;color:#a89e8d;font:600 12px/1.45 var(--qx-font)}
  .xp{font:900 11px var(--qx-font);color:#c98c5e;font-variant-numeric:tabular-nums}
  ol.missions a,.lock{min-height:38px;display:grid;place-items:center;padding:0 17px;border-radius:9px;
                      font:900 11px var(--qx-font);text-decoration:none}
  ol.missions a{background:#f1ede4;color:#25231f}
  ol.missions a:hover{background:#fff}
  ol.missions a:focus-visible{outline:3px solid #a85a34;outline-offset:2px}
  .lock{color:#8d8474;border:1px dashed rgba(255,255,255,.2)}

  .ranks{max-width:1080px;margin:0 auto 30px}
  .ranks ul{list-style:none;margin:0;padding:0;display:grid;gap:6px;
            grid-template-columns:repeat(auto-fit,minmax(190px,1fr))}
  .ranks li{padding:11px 14px;border:1px solid rgba(255,255,255,.1);border-radius:11px;
            display:flex;justify-content:space-between;gap:10px;align-items:baseline;opacity:.5}
  .ranks li.reached{opacity:1;border-color:rgba(143,201,120,.45);background:rgba(143,201,120,.07)}
  .ranks b{font:700 12.5px var(--qx-font);color:#fff}
  .ranks span{font:800 10.5px var(--qx-font);color:#a89e8d;font-variant-numeric:tabular-nums}

  footer{max-width:1080px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;
         gap:16px;flex-wrap:wrap;padding-top:18px;border-top:1px solid rgba(255,255,255,.1)}
  footer p{margin:0;color:#8d8474;font:600 11.5px var(--qx-font)}
  .confirm{display:flex;align-items:center;gap:9px;color:#e6b4ab;font:700 11.5px var(--qx-font);flex-wrap:wrap}
  button{min-height:36px;padding:0 15px;border-radius:9px;border:0;cursor:pointer;font:900 10.5px var(--qx-font)}
  button:not(.ghost){background:#b8483f;color:#fff}
  button.ghost{background:transparent;color:#bcb19e;border:1px solid rgba(255,255,255,.2)}
  button:disabled{opacity:.4;cursor:default}
  button:focus-visible{outline:3px solid #a85a34;outline-offset:2px}

  @media(max-width:820px){
    .standing{grid-template-columns:1fr}
    ol.missions li{grid-template-columns:auto minmax(0,1fr);row-gap:11px}
    .xp,ol.missions a,.lock{grid-column:2}
    ol.missions a,.lock{justify-self:start}
  }
  @media(prefers-reduced-motion:reduce){.bar span{transition:none}}
</style>
