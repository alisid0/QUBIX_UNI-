<script>
  import { onMount } from 'svelte';
  import { MISSIONS, RANKS, TOTAL_XP, load, reset, statusOf, xpOf, rankOf, nextRankOf } from '../lib/game/progress.js';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';

  let state = { completed: [], started: null };
  let confirming = false;
  const lockedSlug = new URLSearchParams(window.location.search).get('locked');
  const lockedMission = MISSIONS.find(m => m.slug === lockedSlug);
  // Which missions live in which room. The numbers and the names underneath are
  // read from the roster rather than written here: this list used to carry both
  // by hand, and it still said "Aisles · 02 · Classify Store Data" after that
  // mission had moved to chapter 3 and Read the Table had taken its place.
  // A room with one mission shows that mission's title. A room with several
  // shows a short theme, written by hand because four full titles do not fit on
  // a card. check-room-map refuses a theme that names a mission living
  // somewhere else, which is exactly how this went stale.
  const ROOM_PLAN = [
    { id: 'goods-in', image: 'goods-in', name: 'Goods In', slugs: ['units-measurement', 'uom'],
      theme: 'Units and measurement' },
    // Duplicate records live at the customer desk on the floor map, not here.
    { id: 'stock-room', image: 'stock-room', name: 'Stock Room', slugs: ['table-grain', 'missing-data'],
      theme: 'Grain and missing values' },
    { id: 'data-office', image: 'data-office', name: 'Data Office', slugs: ['sql-console', 'join-grain', 'result-checkpoint', 'python-trace'],
      theme: 'SQL · joins · verification · Python' },
    { id: 'checkout', image: 'tills', name: 'Checkout', slugs: ['checkout'] },
    { id: 'aisles', image: 'aisles', name: 'Aisles', slugs: ['read-the-table', 'classify-data'],
      theme: 'Rows and columns · data types' },
    { id: 'board-room', image: 'boardroom', name: 'Board Room', slugs: ['analyst-desk', 'handover-pack'],
      theme: 'Decision desk · handover review' }
  ];

  const numberOf = slug => String(MISSIONS.findIndex(m => m.slug === slug) + 1).padStart(2, '0');

  // A run of consecutive numbers reads as a range; anything else is listed.
  const numbersFor = slugs => {
    const ns = slugs.map(numberOf).sort();
    if (ns.length > 2 && Number(ns.at(-1)) - Number(ns[0]) === ns.length - 1) return `${ns[0]}–${ns.at(-1)}`;
    return ns.join(' · ');
  };

  const ROOMS = ROOM_PLAN.map(room => ({
    ...room,
    slug: room.slugs[0],
    missions: numbersFor(room.slugs),
    note: room.theme
      || MISSIONS.find(m => m.slug === room.slugs[0])?.mission.title
      || room.name
  }));

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
  $: progress = Math.round((100 * xp) / TOTAL_XP);

  function clearProgress() { reset(); refresh(); confirming = false; }
</script>

<svelte:head>
  <title>My Shift | Qubix University</title>
  <meta name="description" content={`Continue your Qubix Superstore training shift through ${MISSIONS.length} practical data missions, paired readings, XP and ranks.`} />
</svelte:head>

<section class="hub qx-shell">
  <div class="nav-wrap"><SiteNav current="play" subjects={false} /></div>

  <header class="hero">
    <div class="hero-copy">
      <p class="eyebrow">{rank.title.toUpperCase()} · SHIFT {String(done + 1).padStart(3, '0')}</p>
      <h1>{nextUp ? 'Your next decision is waiting in the store.' : 'Your training shift is complete.'}</h1>
      <p class="lede">Read the briefing, work the evidence, then explain what Qubix Superstore can honestly claim.</p>
    </div>
    <aside class="standing" aria-label="Your training progress">
      <p class="eyebrow">YOUR STANDING</p>
      <div class="rank-line"><strong>{rank.title}</strong><span>{progress}%</span></div>
      <div class="bar" role="img" aria-label={`${xp} of ${TOTAL_XP} experience earned`}><span style={`width:${progress}%`}></span></div>
      <div class="meter-row"><span>{xp.toLocaleString()} / {TOTAL_XP.toLocaleString()} XP</span><span>{done} / {MISSIONS.length} missions</span></div>
      {#if next}<small>{next.at - xp} XP to {next.title}</small>{:else}<small>Volume 0 complete</small>{/if}
    </aside>
  </header>

  {#if lockedMission}<p class="locked-notice" role="status"><b>{lockedMission.mission.title}</b> is still locked. Continue with the next available mission below.</p>{/if}

  {#if nextUp}
    <section class="next-card" aria-labelledby="next-heading">
      <span class="mission-number">{String(MISSIONS.findIndex(m => m.slug === nextUp.slug) + 1).padStart(2, '0')}</span>
      <div class="next-copy">
        <p class="eyebrow">NEXT MISSION · {ROOMS.find(room => room.slug === nextUp.slug)?.name?.toUpperCase() || 'SUPERSTORE'}</p>
        <h2 id="next-heading">{nextUp.mission.title}</h2>
        <p>{nextUp.teaches}</p>
        <div class="pairing"><span><b>READ FIRST</b>{nextUp.reading.label}</span><span><b>THEN PLAY</b>{nextUp.xp} XP · practical investigation</span></div>
      </div>
      <div class="next-actions">
        <a class="primary" href={`?mode=game&mission=${nextUp.slug}`}>{done ? 'Continue mission' : 'Begin mission'} <span aria-hidden="true">→</span></a>
        <a href={`?mode=game&mission=shared-book&chapter=${nextUp.reading.chapter}&session=${nextUp.reading.session}`}>Open briefing</a>
      </div>
    </section>
  {/if}

  <section class="floor" aria-labelledby="floor-heading">
    <div class="section-heading"><div><p class="eyebrow">QUBIX SUPERSTORE · TRAINING FLOOR</p><h2 id="floor-heading">Choose a room. See what the data costs there.</h2></div><span>{done} / {MISSIONS.length} MISSIONS</span></div>
    <div class="floor-map">
      {#each ROOMS as room}
        {@const mission = rows.find(row => row.slug === room.slug)}
        <a class={`room ${room.id}`} href={mission?.open ? `?mode=game&mission=${room.slug}` : `?mode=game&locked=${room.slug}`}
          data-image-slot={room.id} class:current={nextUp?.slug === room.slug} class:complete={mission?.done}>
          <img class="room-image" src={`/rooms/${room.image}-thumb.webp`} alt="" decoding="async" />
          <span class="room-top"><b>{room.name}</b><em>{room.missions}</em></span>
          <small>{room.note}</small><span class="room-state">{mission?.done ? 'Complete' : mission?.open ? 'Enter room' : 'Locked'}</span>
        </a>
      {/each}
      <span class="you-are-here">YOU ARE HERE</span>
    </div>
  </section>

  <section class="route" aria-labelledby="route-heading">
    <div class="section-heading"><div><p class="eyebrow">YOUR ROUTE</p><h2 id="route-heading">{MISSIONS.length} missions through the store.</h2></div><span>{rows.filter(row => row.open && !row.done).length} OPEN · {rows.filter(row => !row.open).length} LOCKED</span></div>
    <ol class="missions">
      {#each rows as row, i}
        <li class:done={row.done} class:locked={!row.open}>
          <span class="num">{String(i + 1).padStart(2, '0')}</span>
          <div class="body"><b>{row.mission.title}</b><span>{row.teaches}</span></div><span class="xp">{row.xp} XP</span>
          <div class="actions"><a class="read" href={`?mode=game&mission=shared-book&chapter=${row.reading.chapter}&session=${row.reading.session}`}>Read <span class="sr-only">{row.reading.label}</span></a>{#if row.open}<a class="play" href={`?mode=game&mission=${row.slug}`}>{row.done ? 'Replay' : 'Play'}</a>{:else}<span class="lock">Locked</span>{/if}</div>
        </li>
      {/each}
    </ol>
  </section>

  <section class="ranks" aria-labelledby="ranks-heading">
    <p class="eyebrow">PROGRESSION</p><h2 id="ranks-heading">Ranks are earned on the floor.</h2>
    <ul>{#each RANKS as r}<li class:reached={xp >= r.at}><b>{r.title}</b><span>{r.at.toLocaleString()} XP</span></li>{/each}</ul>
  </section>

  <div class="foot-wrap"><SiteFooter compact /></div>
  <footer class="progress-foot">
    <p>Progress is kept in this browser only. There is no account and nothing is sent anywhere.</p>
    {#if confirming}<span class="confirm">Erase {done} completed mission{done === 1 ? '' : 's'}?<button on:click={clearProgress}>Erase</button><button class="ghost" on:click={() => (confirming = false)}>Keep</button></span>{:else}<button class="ghost" on:click={() => (confirming = true)} disabled={!done}>Reset progress</button>{/if}
  </footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#f1ede4}
  :global(body){position:static}
  .hub{--ink:#20241f;--soft:#62695f;--accent:#315f48;--signal:#b85530;--paper:#f7f3e9;--rule:#c8c1b1;min-height:100vh;max-width:none;padding:0 0 54px;background:#e6e0d2;color:var(--ink)}
  .hub>*{max-width:1120px;margin-inline:auto}.nav-wrap,.hero,.floor,.route,.ranks,.foot-wrap,.progress-foot,.locked-notice{padding-inline:clamp(16px,5vw,56px)}
  .eyebrow{margin:0 0 10px;color:var(--signal);font:900 11px var(--qx-font);letter-spacing:.15em}
  .hero{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(260px,.65fr);gap:clamp(30px,7vw,90px);align-items:end;padding-top:60px;padding-bottom:50px}
  .hero h1{max-width:720px;margin:0;font:500 clamp(42px,7vw,76px)/.98 Georgia,serif;letter-spacing:-.035em;text-wrap:balance}.lede{max-width:590px;margin:20px 0 0;color:var(--soft);font:500 17px/1.6 var(--qx-font)}
  .standing{padding:24px;border-top:3px solid var(--accent);background:var(--paper)}.rank-line{display:flex;justify-content:space-between;align-items:baseline;gap:14px}.rank-line strong{font:500 23px Georgia,serif}.rank-line span{font:500 34px Georgia,serif}.bar{height:5px;margin-top:22px;background:#cec8ba;overflow:hidden}.bar span{display:block;height:100%;background:var(--accent);transition:width .4s ease}.meter-row{display:flex;justify-content:space-between;gap:12px;margin-top:8px;color:var(--soft);font:700 11px var(--qx-font)}.standing small{display:block;margin-top:12px;color:var(--soft);font:600 11px var(--qx-font)}
  .locked-notice{margin-bottom:20px;color:#7a3524;font:700 14px/1.5 var(--qx-font)}
  .next-card{display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:28px;align-items:center;width:calc(100% - clamp(32px,10vw,112px));max-width:1008px!important;box-sizing:border-box;margin-bottom:72px!important;padding:30px!important;border:6px solid var(--ink);background:var(--paper);box-shadow:12px 12px 0 rgba(32,36,31,.16)}.mission-number{color:var(--signal);font:500 28px Georgia,serif}.next-copy h2{margin:0;font:500 31px Georgia,serif}.next-copy>p:not(.eyebrow){margin:7px 0;color:var(--soft);font:500 14px/1.5 var(--qx-font)}
  .pairing{display:flex;margin-top:20px}.pairing span{max-width:230px;padding:0 22px;border-left:1px solid var(--rule);color:var(--soft);font:500 11px/1.45 var(--qx-font)}.pairing span:first-child{padding-left:0;border:0}.pairing b{display:block;margin-bottom:6px;color:var(--signal);font:900 11px var(--qx-font);letter-spacing:.12em}.next-actions{display:grid;gap:11px;text-align:center}.next-actions a{color:var(--ink);font:800 12px var(--qx-font);text-decoration:none}.next-actions .primary{padding:16px 20px;background:var(--signal);color:#fff}.next-actions a:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
  .floor,.route{padding-bottom:76px}.section-heading{display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:28px}.section-heading h2,.ranks h2{max-width:720px;margin:0;font:500 clamp(30px,4vw,47px)/1.08 Georgia,serif;letter-spacing:-.02em}.section-heading>span{color:var(--soft);font:800 11.5px/1.5 var(--qx-font);letter-spacing:.08em;text-align:right}
  .floor-map{position:relative;display:grid;grid-template-columns:1fr 1.15fr 1.35fr;grid-template-areas:'goods stock office' 'checkout aisles office' 'checkout aisles board';gap:16px;padding:24px;border:6px solid var(--ink);background:#d7dbcf;box-shadow:12px 12px 0 rgba(32,36,31,.16)}
  .room{position:relative;min-height:190px;display:flex;flex-direction:column;padding:18px;border:1px solid #77776d;background:#e8e2d5;color:var(--ink);text-decoration:none;overflow:hidden;isolation:isolate}.goods-in{grid-area:goods}.stock-room{grid-area:stock}.data-office{grid-area:office}.checkout{grid-area:checkout}.aisles{grid-area:aisles}.board-room{grid-area:board}.room-image{position:absolute;inset:0;z-index:-3;width:100%;height:100%;object-fit:cover;filter:saturate(.82) contrast(.94);transform:scale(1.01);transition:transform .25s ease,filter .25s ease}.room::before{content:'';position:absolute;inset:0;z-index:-2;background:linear-gradient(to bottom,rgba(24,28,24,.8) 0,rgba(24,28,24,.43) 28%,rgba(24,28,24,.03) 55%,rgba(232,226,213,.95) 79%,rgba(232,226,213,1) 100%)}.room::after{content:'';position:absolute;inset:auto 0 0;z-index:-1;height:36%;border-top:1px solid rgba(32,36,31,.25);background:linear-gradient(to bottom,rgba(232,226,213,.78),rgba(232,226,213,.98) 36%)}.room:hover{border-color:var(--signal)}.room:hover .room-image{filter:saturate(1) contrast(1);transform:scale(1.035)}.room:focus-visible{outline:4px solid var(--signal);outline-offset:-4px}.room.current{border:3px solid var(--signal)}.room.complete{border-color:var(--accent)}
  .room-top{display:flex;justify-content:space-between;gap:12px;text-transform:uppercase}.room-top b{color:#f7f3e9;font:800 12px var(--qx-font);letter-spacing:.13em;text-shadow:0 1px 3px rgba(0,0,0,.7)}.room-top em{color:#f0c2a8;font:800 11.5px var(--qx-font);font-style:normal;text-shadow:0 1px 3px rgba(0,0,0,.7)}.room small{margin-top:auto;color:var(--soft);font:650 11.5px/1.35 var(--qx-font)}.room-state{margin-top:8px;color:var(--signal);font:900 11px var(--qx-font);letter-spacing:.09em;text-transform:uppercase}.you-are-here{position:absolute;left:18%;top:56%;z-index:3;padding:10px 13px;background:var(--signal);color:#fff;font:900 11px var(--qx-font);letter-spacing:.08em;box-shadow:4px 4px 0 rgba(32,36,31,.18)}
  ol.missions{margin:0;padding:0;border-top:3px solid var(--accent);list-style:none}.missions li{display:grid;grid-template-columns:42px minmax(0,1fr) auto auto;align-items:center;gap:18px;padding:19px 20px;border-bottom:1px solid var(--rule);background:rgba(247,243,233,.65)}.missions li:first-child{border-left:4px solid var(--signal)}.missions li.done{background:rgba(49,95,72,.07)}.missions li.locked{opacity:.55}.num{color:var(--accent);font:500 14px Georgia,serif}.body b{display:block;font:500 17px Georgia,serif}.body span{display:block;margin-top:3px;color:var(--soft);font:500 12px/1.4 var(--qx-font)}.xp{color:var(--soft);font:800 11.5px var(--qx-font)}.actions{display:flex;align-items:center;gap:8px}.actions a,.lock{min-width:58px;padding:9px 10px;color:var(--ink);font:900 11px var(--qx-font);letter-spacing:.08em;text-align:center;text-decoration:none;text-transform:uppercase}.actions .play{background:var(--signal);color:#fff}.actions .read{color:var(--accent)}.lock{color:var(--soft)}.actions a:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
  .ranks{padding-bottom:62px}.ranks ul{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0;margin:26px 0 0;padding:0;border-top:1px solid var(--rule);border-left:1px solid var(--rule);list-style:none}.ranks li{display:flex;justify-content:space-between;gap:10px;padding:15px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);opacity:.48}.ranks li.reached{background:var(--paper);opacity:1}.ranks b{font:600 12px var(--qx-font)}.ranks span{color:var(--soft);font:700 11.5px var(--qx-font)}
  .progress-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding-top:18px;border-top:1px solid var(--rule)}.progress-foot p{margin:0;color:var(--soft);font:500 12px/1.5 var(--qx-font)}.confirm{display:flex;align-items:center;gap:9px;color:#7a3524;font:700 12px var(--qx-font);flex-wrap:wrap}button{min-height:34px;padding:0 14px;border:0;background:#9b382c;color:#fff;cursor:pointer;font:900 11px var(--qx-font)}button.ghost{border:1px solid var(--rule);background:transparent;color:var(--soft)}button:disabled{opacity:.4;cursor:default}button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
  @media(max-width:780px){.hero{grid-template-columns:1fr;padding-top:40px}.next-card{grid-template-columns:42px minmax(0,1fr)}.next-actions{grid-column:2;justify-items:start}.floor-map{grid-template-columns:1fr 1fr;grid-template-areas:'checkout aisles' 'goods stock' 'office office' 'board board';padding:14px}.room{min-height:145px}.data-office,.board-room{min-height:160px}.you-are-here{left:42%;top:23%}.missions li{grid-template-columns:34px minmax(0,1fr);gap:10px}.xp,.actions{grid-column:2}.actions{justify-self:start}.section-heading{align-items:flex-start;flex-direction:column}.section-heading>span{text-align:left}}
  @media(max-width:460px){.hero h1{font-size:43px}.next-card{margin-inline:16px!important;padding:21px!important;border-width:5px;box-shadow:8px 8px 0 rgba(32,36,31,.16)}.next-card .mission-number{display:none}.next-card,.next-actions{grid-template-columns:1fr;grid-column:1}.pairing{display:grid;gap:12px}.pairing span{padding:0;border:0}.floor-map{grid-template-columns:1fr;grid-template-areas:'checkout' 'aisles' 'goods' 'stock' 'office' 'board';box-shadow:8px 8px 0 rgba(32,36,31,.16)}.you-are-here{top:15%;left:auto;right:4px}.room{min-height:190px}}
  @media(prefers-reduced-motion:reduce){.bar span,.room-image{transition:none}}
</style>
