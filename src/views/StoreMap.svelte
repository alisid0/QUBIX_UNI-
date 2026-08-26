<script>
  // The Superstore floor. Nine rooms, every rostered mission standing on
  // the object it belongs to.
  //
  // The art is a backdrop and nothing more: every name, count, XP figure and
  // completion tick is HTML over the image, read from the roster through
  // planWith(). So a renamed mission cannot leave a stale label on the art, the
  // text stays sharp at any zoom, and a screen reader gets the whole room.
  //
  // A room whose image is missing still works. The plan falls back to a
  // flat-shaded isometric drawn from the same room data, which is what the
  // feature ran on before any art existed.
  import { onMount } from 'svelte';
  import { load, statusOf, xpOf, rankOf, TOTAL_XP } from '../lib/game/progress.js';
  import { planWith, nextRoom, box, project } from '../lib/game/store-map.js';
  import SiteNav from '../lib/components/SiteNav.svelte';

  let state = { completed: [], started: null };
  const requestedRoom = new URLSearchParams(window.location.search).get('room');
  let chosen = requestedRoom || '';
  let roomNav;
  let missing = {};      // rooms whose art failed to load
  let hovered = '';

  onMount(() => {
    state = load();
    // A mission links directly to its room. On a phone that tab may sit beyond
    // the initial horizontal viewport, so reveal it instead of showing Goods In
    // selected-looking while a different room is open below.
    requestAnimationFrame(() => roomNav?.querySelector('.room-tab.on')?.scrollIntoView({ block: 'nearest', inline: 'center' }));
  });

  $: statuses = statusOf(state);
  $: plan = planWith(statuses);
  $: xp = xpOf(state);
  $: rank = rankOf(xp);
  $: room = plan.find(r => r.id === chosen) || nextRoom(plan) || plan[0];
  $: doneCount = statuses.filter(s => s.done).length;

  // The fallback plan: the room's own footprint, extruded.
  $: solid = room ? box(0, 0, room.w, room.h, 0.35) : null;
  $: fallbackBox = room
    ? (() => {
        const pts = [[0, 0], [room.w, 0], [room.w, room.h], [0, room.h]]
          .map(([x, y]) => project(x, y, 0.35));
        const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
        const pad = 30;
        return `${Math.min(...xs) - pad} ${Math.min(...ys) - pad} ${Math.max(...xs) - Math.min(...xs) + pad * 2} ${Math.max(...ys) - Math.min(...ys) + pad * 2 + 20}`;
      })()
    : '0 0 100 100';
</script>

<svelte:head><title>The Superstore Floor</title>
<meta name="description" content="Every Qubix mission, standing in the room it happens in." /></svelte:head>

<section class="floor qx-shell">
  <div class="wrap">
    <SiteNav current="play" />

    <header>
      <div>
        <p class="eyebrow">QUBIX SUPERSTORE · BRANCH 17</p>
        <h1>The Superstore floor</h1>
        <p class="lede">Every mission happens somewhere. Walk in and pick one up.</p>
      </div>
      <div class="standing">
        <b>{rank.title}</b>
        <span>{xp.toLocaleString()} / {TOTAL_XP.toLocaleString()} XP · {doneCount} of {statuses.length} missions</span>
        <i><em style={`width:${Math.round((xp / TOTAL_XP) * 100)}%`}></em></i>
      </div>
    </header>

    <!-- Every room, always reachable. Nothing is hidden behind progress. -->
    <nav class="rooms" aria-label="Rooms" bind:this={roomNav}>
      {#each plan as r}
        <button class={`room-tab ${r.state}`} class:on={room && r.id === room.id}
          aria-current={room && r.id === room.id ? 'true' : undefined}
          on:click={() => (chosen = r.id)}>
          <b>{r.name}</b>
          <span>{r.total ? `${r.done}/${r.total}` : r.planned ? 'planned' : '—'}</span>
        </button>
      {/each}
    </nav>

    {#if room}
      <div class="stage">
        <div class="scene" class:noart={missing[room.id]}>
          {#if !missing[room.id]}
            <img src={`/rooms/${room.id}.webp`} alt={`${room.name}: ${room.blurb}`}
                 on:error={() => (missing = { ...missing, [room.id]: true })} />
          {:else}
            <!-- No art for this room. The plan still draws. -->
            <svg viewBox={fallbackBox} role="img" aria-label={`Plan of ${room.name}`}>
              <polygon class="f-left" points={solid.left} />
              <polygon class="f-right" points={solid.right} />
              <polygon class="f-top" points={solid.top} />
            </svg>
          {/if}

          {#each room.spots as spot}
            {@const m = room.missions.find(x => x.slug === spot.slug)}
            {#if m}
              <a class="spot" class:done={m.done} class:locked={!m.open}
                 style={`left:${spot.x}%;top:${spot.y}%`}
                 href={m.open ? `?mode=game&mission=${m.slug}` : undefined}
                 aria-disabled={m.open ? undefined : 'true'}
                 on:mouseenter={() => (hovered = m.slug)} on:mouseleave={() => (hovered = '')}
                 on:focus={() => (hovered = m.slug)} on:blur={() => (hovered = '')}>
                <span class="pin" aria-hidden="true">{m.done ? '✓' : m.open ? '' : '·'}</span>
                <span class="tip" class:show={hovered === m.slug}>
                  <b>{m.mission.title}</b>
                  <em>{m.open ? `${m.xp} XP · at ${spot.at}` : 'Finish the mission before it'}</em>
                </span>
              </a>
            {/if}
          {/each}
        </div>

        <aside class="detail">
          <p class="eyebrow">{room.state === 'planned' ? 'PLANNED' : room.total ? `${room.done} OF ${room.total} DONE` : 'NOTHING TO DO HERE'}</p>
          <h2>{room.name}</h2>
          <p class="blurb">{room.blurb}</p>

          {#if room.total}
            <ol class="missions">
              {#each room.missions as m}
                {@const spot = room.spots.find(s => s.slug === m.slug)}
                <li class:done={m.done} class:locked={!m.open}>
                  <svelte:element this={m.open ? 'a' : 'div'} href={m.open ? `?mode=game&mission=${m.slug}` : undefined}
                    role={m.open ? 'link' : 'group'}
                    on:mouseenter={() => (hovered = m.slug)} on:mouseleave={() => (hovered = '')}
                    on:focus={() => (hovered = m.slug)} on:blur={() => (hovered = '')}>
                    <span class="tick">{m.done ? '✓' : m.open ? '○' : '·'}</span>
                    <span class="text"><b>{m.mission.title}</b><em>{m.open ? m.teaches : 'Opens when the one before it is done.'}</em></span>
                    <span class="meta">{m.xp} XP</span>
                  </svelte:element>
                  {#if spot}<span class="where">at {spot.at}</span>{/if}
                </li>
              {/each}
            </ol>
          {/if}
        </aside>
      </div>
    {/if}

    <p class="foot">
      A place, not a world: you look in and click what you want, rather than walking to it.
      <a href="?mode=game">The academy list</a> · <a href="?mode=game&mission=foundations">Foundations</a>
    </p>
  </div>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}
  :global(body){position:static}

  .floor{--line:rgba(255,255,255,.11);--line2:rgba(255,255,255,.18);
         --ink:#ece7dc;--ink2:#a89e8d;--dim:#766d5b;--clay:#c77e61;--good:#9fd0b4;
         --nav-ink:#ece7dc;--nav-soft:#a89e8d;--nav-rule:rgba(255,255,255,.14);--nav-accent:#c77e61;
         min-height:100vh;max-width:none;padding:0 clamp(14px,4vw,34px) 56px;
         background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);color:var(--ink)}
  .wrap{max-width:1180px;margin-inline:auto}

  header{display:flex;align-items:flex-end;justify-content:space-between;gap:22px;flex-wrap:wrap;padding:20px 0 22px}
  .eyebrow{margin:0 0 7px;color:var(--clay);font:900 11px var(--qx-font);letter-spacing:.13em}
  h1{margin:0;font:400 clamp(26px,4vw,36px)/1.1 Georgia,serif;letter-spacing:-.015em}
  .lede{margin:9px 0 0;color:var(--ink2);font:400 15px var(--qx-font)}
  .standing{min-width:250px;display:flex;flex-direction:column;gap:5px}
  .standing b{font:800 15px var(--qx-font)}
  .standing>span{color:var(--ink2);font:600 12.5px var(--qx-font);font-variant-numeric:tabular-nums}
  .standing i{display:block;height:5px;border-radius:4px;background:rgba(255,255,255,.1);overflow:hidden}
  .standing em{display:block;height:100%;background:var(--clay)}

  .rooms{display:flex;gap:7px;overflow-x:auto;padding:0 0 12px;scrollbar-width:thin}
  .room-tab{flex:none;display:grid;gap:2px;padding:9px 14px;border:1px solid var(--line2);border-radius:9px;
            background:#1f1c15;color:var(--ink2);cursor:pointer;text-align:left}
  .room-tab b{color:var(--ink);font:700 13px var(--qx-font);white-space:nowrap}
  .room-tab span{font:600 11.5px var(--qx-font);font-variant-numeric:tabular-nums}
  .room-tab:hover{border-color:var(--clay)}
  .room-tab.on{border-color:var(--clay);background:#2a241a}
  .room-tab.done b{color:var(--good)}
  .room-tab.empty b,.room-tab.planned b{color:var(--dim)}

  .stage{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,.45fr);gap:16px;align-items:start}

  .scene{position:relative;border:1px solid var(--line2);border-radius:14px;overflow:hidden;background:#12100c}
  .scene img{display:block;width:100%;height:auto}
  .scene svg{display:block;width:100%;height:auto;padding:26px}
  .f-top{fill:#2a241a}.f-left{fill:#1b1811}.f-right{fill:#221e16}

  /* A hotspot sits on the object, not beside it. */
  .spot{position:absolute;transform:translate(-50%,-50%);z-index:2;text-decoration:none}
  .pin{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;
       border:2px solid #171510;background:var(--clay);color:#171510;
       font:900 14px var(--qx-font);box-shadow:0 3px 10px rgba(0,0,0,.5);transition:transform .14s ease}
  .spot:hover .pin,.spot:focus-visible .pin{transform:scale(1.18)}
  .spot.done .pin{background:var(--good)}
  .spot.locked{cursor:default}
  /* A locked mission still has to be findable. At #4a4438 the pin vanished into
     the wood grain, so a room with three missions looked like it had one. */
  .spot.locked .pin{background:rgba(23,21,16,.72);border-color:rgba(236,231,220,.55);color:#ece7dc}
  .spot:focus-visible{outline:none}
  .spot:focus-visible .pin{outline:3px solid #fff;outline-offset:2px}

  .tip{position:absolute;left:50%;bottom:calc(100% + 9px);transform:translateX(-50%);
       display:grid;gap:2px;min-width:172px;padding:8px 11px;border-radius:8px;
       background:#241f16;border:1px solid var(--line2);box-shadow:0 6px 18px rgba(0,0,0,.5);
       opacity:0;pointer-events:none;transition:opacity .13s ease}
  .tip.show{opacity:1}
  .tip b{color:var(--ink);font:700 13px var(--qx-font);white-space:nowrap}
  .tip em{color:var(--ink2);font:600 11.5px var(--qx-font);font-style:normal;white-space:nowrap}

  .detail{border:1px solid var(--line2);border-radius:14px;background:#1f1c15;padding:18px 18px 8px}
  .detail h2{margin:0;font:400 22px Georgia,serif}
  .blurb{margin:8px 0 0;color:var(--ink2);font:400 14px/1.55 var(--qx-font)}
  .missions{list-style:none;margin:14px 0 0;padding:0}
  .missions li{border-top:1px solid var(--line);padding-bottom:9px}
  .missions a,.missions div{display:grid;grid-template-columns:22px 1fr auto;align-items:baseline;gap:11px;
                            padding:12px 0 3px;color:var(--ink);text-decoration:none}
  .missions a:hover .text b{color:var(--clay)}
  .tick{color:var(--dim);font:800 13px var(--qx-font)}
  .missions li.done .tick{color:var(--good)}
  .text b{display:block;font:400 16px Georgia,serif}
  .text em{display:block;margin-top:3px;color:var(--ink2);font:400 12.8px/1.5 var(--qx-font);font-style:normal}
  .meta{color:var(--ink2);font:700 12px var(--qx-font);white-space:nowrap}
  .where{display:block;padding-left:33px;color:var(--dim);font:600 11.5px var(--qx-font)}
  .missions li.locked{opacity:.55}

  .foot{margin:24px 0 0;padding-top:16px;border-top:1px solid var(--line);color:var(--dim);font:400 13.5px/1.6 var(--qx-font)}
  .foot a{color:var(--ink2);text-decoration:none;border-bottom:1px solid var(--line2)}
  .foot a:hover{color:var(--ink)}
  a:focus-visible,button:focus-visible{outline:2px solid var(--clay);outline-offset:3px}

  @media(max-width:900px){
    .stage{grid-template-columns:1fr}
    .pin{width:26px;height:26px;font-size:12px}
  }
  @media(max-width:620px){
    header{flex-direction:column;align-items:stretch}
    .missions a,.missions div{grid-template-columns:20px 1fr;row-gap:4px}
    .meta{grid-column:2}
    .where{padding-left:31px}
  }
  @media(prefers-reduced-motion:reduce){.pin,.tip{transition:none}}

  /* H1 map treatment: room art is the navigable evidence layer, not a hero
     decoration. Labels and state remain live HTML on top of it. */
  :global(html),:global(body),:global(#app){background:#e6e0d2}
  .floor{--line:#d8d0be;--line2:#9c998d;--ink:#20241f;--ink2:#62695f;--dim:#817b70;
         --clay:#b85530;--good:#315f48;--nav-ink:#20241f;--nav-soft:#62695f;
         --nav-rule:#c8c1b1;--nav-accent:#315f48;padding:0 0 60px;background:#e6e0d2;color:var(--ink)}
  .wrap{width:min(100%,1120px);max-width:none;padding-inline:clamp(16px,5vw,56px);box-sizing:border-box}
  header{padding:48px 0 30px;align-items:end}
  h1{font-size:clamp(42px,7vw,70px);line-height:.98;letter-spacing:-.035em}
  .eyebrow{color:var(--clay);font-size:10px}.lede{color:var(--ink2)}
  .standing{padding:14px 16px;border-left:3px solid #315f48;background:#f7f3e9}
  .standing>span{color:var(--ink2)}.standing i{height:5px;border-radius:0;background:#c8c1b1}.standing em{background:#315f48}
  .rooms{width:max-content;max-width:100%;gap:1px;margin-bottom:22px;padding:0;background:#9c998d;border:1px solid #9c998d}
  .room-tab{border:0;border-radius:0;background:#f7f3e9;color:var(--ink2);padding:11px 14px}
  .room-tab b{color:var(--ink);font-size:12px}.room-tab:hover{background:#ece6da}.room-tab.on{background:#20241f;color:#f7f3e9}
  .room-tab.on b{color:#f7f3e9}.room-tab.done b{color:#315f48}.room-tab.on.done b{color:#dce8dc}
  .stage{gap:24px;grid-template-columns:minmax(0,1.35fr) minmax(260px,.65fr)}
  .scene{border:6px solid #20241f;border-radius:0;background:#f7f3e9;box-shadow:11px 11px 0 rgba(32,36,31,.16)}
  .scene img{background:#f7f3e9;image-rendering:auto}
  .pin{border-radius:0;border-color:#20241f;background:#b85530;color:#fff;box-shadow:4px 4px 0 rgba(32,36,31,.28)}
  .spot.done .pin{background:#315f48}.spot.locked .pin{border-color:#20241f;background:rgba(32,36,31,.76)}
  .tip{border-radius:0;background:#20241f;color:#f7f3e9}.tip b{color:#f7f3e9}.tip em{color:#c8c1b1}
  .detail{border:1px solid #9c998d;border-radius:0;background:#f7f3e9;padding:22px 20px 10px}
  .detail h2{font-size:30px}.blurb,.text em,.meta{color:var(--ink2)}
  .missions li{border-color:#d8d0be}.missions a,.missions div{color:var(--ink)}.missions a:hover .text b{color:#b85530}
  .tick{color:#817b70}.missions li.done .tick{color:#315f48}.where{color:#817b70}
  .foot{border-color:#c8c1b1;color:#817b70}.foot a{color:#315f48;border-color:#315f48}
  @media(max-width:900px){.stage{grid-template-columns:1fr}.scene{box-shadow:8px 8px 0 rgba(32,36,31,.16)}}
  @media(max-width:620px){.wrap{padding-inline:16px}header{padding-top:34px}h1{font-size:46px}.rooms{margin-inline:-16px;padding-inline:16px}.scene{border-width:5px}}
</style>
