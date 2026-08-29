<script>
  import PixelAsset from '../lib/components/game/PixelAsset.svelte';
  import SiteNav from '../lib/components/SiteNav.svelte';

  const params = new URLSearchParams(window.location.search);
  const complete = params.get('screen') === 'complete';
  const missions = [
    { id: '001', title: 'Process a Sale', task: 'Scan a basket and separate observations, stored facts and calculated values.', interaction: '3D checkout', icon: 'branch', href: '?mode=game&mission=checkout' },
    { id: '002', title: 'Classify Store Data', task: 'Classify variables by meaning, subtype and measurement scale.', interaction: 'Decision desk', icon: 'folder', href: '?mode=game&mission=classify-data' },
    { id: '003', title: 'What Is Missing?', task: 'Interpret blank values without turning uncertainty into zero.', interaction: 'Feed terminal', icon: 'alert', href: '?mode=game&mission=missing-data' },
    { id: '004', title: 'What Does One Row Represent?', task: 'Declare table grain before counting or joining records.', interaction: '3D workbench', icon: 'database', href: '?mode=game&mission=table-grain' },
    { id: '005', title: 'Keys and Duplicate Records', task: 'Find repeated keys and preserve evidence while investigating.', interaction: 'SQL console', icon: 'clipboard', href: '?mode=game&mission=duplicate-records' },
    { id: '006', title: 'Units and Measurement', task: 'Normalise compatible units and quarantine impossible mappings.', interaction: 'Conversion pipeline', icon: 'feed', href: '?mode=game&mission=units-measurement' },
    { id: '007', title: 'Trace the Number', task: 'Follow a report value back through its transformation to the source.', interaction: 'Lineage viewer', icon: 'monitor', href: '?mode=game&mission=data-lineage' }
  ];
</script>

<svelte:head><title>Data Quality Story Mode | Qubix University</title><meta name="description" content="Authoring-only continuous gameplay route through seven Qubix Superstore missions." /></svelte:head>

<section class="campaign qx-shell">
  <div class="site-nav"><SiteNav current="play" subjects={false} /></div>
  <header><div><p>QUBIX SUPERSTORE · STORY MODE · AI_DRAFT</p><h1>{complete ? 'The morning report is trustworthy.' : 'Your first shift starts now.'}</h1><span>{complete ? 'Every suspicious value can be checked without erasing its history.' : 'Seven connected missions. One data-quality rotation.'}</span></div><a href="?mode=assets&asset=computer-screen">Operations studio</a></header>

  {#if complete}
    <main class="ending">
      <div class="ending-art"><div class="sun"></div><div class="hq"><span></span><b>Q</b></div><div class="road"></div></div>
      <section><p>SHIFT COMPLETE</p><h2>You did not memorise a checklist.</h2><strong>You inspected what the data meant, changed it carefully, and kept the evidence needed to explain why.</strong><div class="skills">{#each ['Observe', 'Classify', 'Interpret', 'Define', 'Detect', 'Normalise', 'Trace'] as skill}<span>✓ {skill}</span>{/each}</div><div class="actions"><a class="primary" href="?mode=game&mission=campaign">Return to mission map</a><a href="?mode=game&mission=checkout">Play again</a></div><small>Authoring prototype complete. This screen records no curriculum approval or certification.</small></section>
    </main>
  {:else}
    <section class="brief"><div class="brief-icon"><PixelAsset kind="clipboard" /></div><div><p>HQ BRIEFING · 05:55</p><h2>Seven systems feed the morning report.</h2><span>Your job is not to make every warning disappear. Your job is to understand what happened, correct what can be corrected, and preserve what the next person needs to verify.</span></div><a href={missions[0].href}>Start Mission 001 →</a></section>
    <main class="map" aria-label="Seven-mission campaign map">
      {#each missions as mission, index}
        <article>
          <div class="number"><span>{mission.id}</span><div><PixelAsset kind={mission.icon} /></div></div>
          <div class="copy"><small>MISSION {mission.id} · {mission.interaction}</small><h2>{mission.title}</h2><p>{mission.task}</p></div>
          <a href={mission.href} aria-label={`Open Mission ${mission.id}: ${mission.title}`}>OPEN</a>
          {#if index < missions.length - 1}<i aria-hidden="true">↓</i>{/if}
        </article>
      {/each}
    </main>
    <footer><span>Campaign order: observation → classification → missingness → grain → keys → units → lineage</span><span>Development-only authoring route</span></footer>
  {/if}
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}:global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}:global(body){position:static}.campaign{min-height:100vh;max-width:none;padding:24px clamp(12px,4vw,54px) 38px;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);color:#f1ede4;overflow:auto}header{max-width:1180px;margin:0 auto 20px;display:flex;align-items:end;justify-content:space-between;gap:20px}header p,.brief p,.ending section>p{margin:0 0 6px;color:#d28a5e;font:900 12px var(--qx-font);letter-spacing:.13em}header h1{margin:0;font:700 clamp(29px,4.5vw,52px) Georgia,serif}header span{display:block;margin-top:7px;color:#b8c4c1;font:650 14.5px var(--qx-font)}header>a{color:#e2c7b7;font:800 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px;white-space:nowrap}.brief{max-width:1130px;margin:0 auto 18px;padding:20px 24px;display:grid;grid-template-columns:70px 1fr auto;align-items:center;gap:18px;border-radius:17px;background:#f1ede4;color:#241f16}.brief-icon{width:62px;height:62px}.brief h2{margin:0 0 5px;font:700 23px Georgia,serif}.brief span{color:#625a49;font:650 13.5px/1.5 var(--qx-font)}.brief>a,.map article>a,.actions a{display:grid;place-items:center;min-height:44px;padding:0 16px;border-radius:10px;background:#a85a34;color:#fff;font:900 13px var(--qx-font);text-decoration:none;white-space:nowrap}.map{max-width:980px;margin:auto;display:grid;gap:12px}.map article{position:relative;display:grid;grid-template-columns:92px 1fr auto;align-items:center;gap:18px;min-height:122px;padding:15px 18px;border:1px solid rgba(255,255,255,.14);border-radius:16px;background:#f1ede4;color:#241f16}.number{display:flex;align-items:center;gap:8px}.number>span{color:#a85a34;font:900 14.5px var(--qx-font)}.number>div{width:55px;height:55px}.copy small{color:#8c4c2e;font:900 11px var(--qx-font);letter-spacing:.1em;text-transform:uppercase}.copy h2{margin:4px 0;font:700 21px Georgia,serif}.copy p{margin:0;color:#625a49;font:650 13px/1.45 var(--qx-font)}.map article>a{min-width:62px;background:#241f16}.map article>i{position:absolute;left:50%;bottom:-20px;z-index:2;color:#d28a5e;font:900 18px var(--qx-font);font-style:normal}.brief>a:focus-visible,.map a:focus-visible,.actions a:focus-visible{outline:3px solid #d28a5e;outline-offset:3px}footer{max-width:980px;margin:18px auto 0;display:flex;justify-content:space-between;gap:15px;color:#91a09d;font:650 11.5px var(--qx-font)}.ending{max-width:1180px;margin:auto;display:grid;grid-template-columns:1.08fr .92fr;border-radius:20px;overflow:hidden;background:#f1ede4;color:#241f16}.ending-art{position:relative;min-height:610px;overflow:hidden;background:linear-gradient(#d6c8b9 0 58%,#77965f 58%)}.sun{position:absolute;top:55px;right:70px;width:82px;height:82px;border-radius:50%;background:#e4a742}.hq{position:absolute;left:15%;right:15%;bottom:135px;height:235px;border:9px solid #241f16;background:#e8dfcd}.hq:before{content:'';position:absolute;left:-28px;right:-28px;top:-75px;border-right:28px solid transparent;border-bottom:75px solid #a85a34;border-left:28px solid transparent}.hq span{position:absolute;right:50px;bottom:0;width:70px;height:115px;background:#241f16}.hq b{position:absolute;left:38px;top:45px;display:grid;place-items:center;width:72px;height:72px;border-radius:14px;background:#a85a34;color:#fff;font:900 40px Georgia,serif}.road{position:absolute;left:44%;bottom:-50px;width:140px;height:210px;background:#b7ad98;transform:perspective(200px) rotateX(25deg)}.ending section{padding:clamp(30px,5vw,64px);display:flex;flex-direction:column;justify-content:center}.ending h2{margin:0;font:700 clamp(31px,4vw,48px)/1.02 Georgia,serif}.ending strong{margin-top:18px;color:#625a49;font:650 14px/1.65 var(--qx-font)}.skills{display:flex;flex-wrap:wrap;gap:7px;margin:25px 0}.skills span{padding:8px 10px;border-radius:999px;background:#e1ead9;color:#3f692e;font:850 12px var(--qx-font)}.actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}.actions a:not(.primary){background:#241f16}.ending small{margin-top:16px;color:#746b5b;font:650 11.5px/1.5 var(--qx-font)}@media(max-width:760px){.campaign{padding:15px 9px 28px}header{align-items:flex-start;flex-direction:column}.brief{grid-template-columns:55px 1fr;padding:16px}.brief-icon{width:50px;height:50px}.brief>a{grid-column:1/-1}.map article{grid-template-columns:64px 1fr;padding:13px;gap:10px}.number{display:grid;justify-items:center}.number>div{width:44px;height:44px}.map article>a{grid-column:1/-1}.ending{grid-template-columns:1fr}.ending-art{min-height:360px}.ending section{padding:28px 20px}.actions{grid-template-columns:1fr}footer{flex-direction:column}}

  :global(html),:global(body),:global(#app){background:#e6e0d2}
  .campaign{--nav-ink:#20241f;--nav-soft:#62695f;--nav-rule:#c8c1b1;--nav-accent:#315f48;
            padding:0 0 58px;background:#e6e0d2;color:#20241f}
  .site-nav,header,.brief,.map,footer,.ending{width:min(100%,1120px);max-width:none;margin-inline:auto;box-sizing:border-box}
  .site-nav,header,footer{padding-inline:clamp(16px,5vw,56px)}
  header{padding-top:44px;margin-bottom:28px}header p,.brief p,.ending section>p{color:#b85530}header h1{font-weight:400;font-size:clamp(42px,7vw,68px);line-height:.98;letter-spacing:-.035em}header span{color:#62695f}header>a{color:#315f48}
  .brief{border:5px solid #20241f;border-radius:0;background:#f7f3e9;box-shadow:9px 9px 0 rgba(32,36,31,.14)}
  .brief>a,.map article>a,.actions a{border-radius:0;background:#315f48}
  .map{padding-top:10px}.map article{border-radius:0;border-color:#9c998d;background:#f7f3e9}.map article>a{background:#20241f}
  .ending{border-radius:0;border:5px solid #20241f;box-shadow:10px 10px 0 rgba(32,36,31,.14)}
  .skills span{border-radius:0}.actions a:not(.primary){background:#20241f}
  footer{color:#62695f}
  @media(max-width:760px){.site-nav,header,footer{padding-inline:16px}.campaign{padding-bottom:38px}.brief,.map,.ending{width:calc(100% - 32px)}header{padding-top:34px}}
</style>
