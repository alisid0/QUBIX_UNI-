<script>
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';
  import { MISSIONS, RANKS } from '../lib/game/progress.js';

  const AUDIENCES = Object.freeze({
    learners: Object.freeze({ label: 'Potential learners', heading: 'Learn by making real analytical decisions.', note: 'Start at zero, practise in short missions, and see why a plausible wrong answer fails before moving on.' }),
    education: Object.freeze({ label: 'Universities', heading: 'A practical bridge from concepts to evidence.', note: 'Pair concise readings with assessable decisions about data quality, statistics, SQL, Python and communication.' }),
    teams: Object.freeze({ label: 'Training teams', heading: 'Shared habits for trustworthy data work.', note: 'Give analysts a common language for grain, units, denominators, validation, visualisation and reproducible handover.' }),
    partners: Object.freeze({ label: 'Stakeholders & investors', heading: 'A complete learning system, not a collection of videos.', note: 'The curriculum, persistent Superstore world, interactive missions, progression and source trail are designed as one product.' })
  });
  let audience = 'learners';
  $: selectedAudience = AUDIENCES[audience];

  const HIGHLIGHTS = Object.freeze([
    Object.freeze({ number: '01', tag: 'THE WORLD', title: 'Walk the Superstore', copy: 'See how every skill belongs to a real place and a real decision.', href: '/superstore', action: 'Open the floor' }),
    Object.freeze({ number: '02', tag: 'DATA LITERACY', title: 'Read the Table', copy: 'A zero-assumption mission about what rows and columns actually mean.', href: '/academy/missions/read-the-table?showcase=1', action: 'Try the mission' }),
    Object.freeze({ number: '03', tag: 'VISUALISATION', title: 'The Chart Clinic', copy: 'Choose bar, line, histogram or scatter from the question—not appearance.', href: '/academy/missions/data-visualization?showcase=1', action: 'Choose a chart' }),
    Object.freeze({ number: '04', tag: 'ANALYTICAL JUDGEMENT', title: 'Analyst Decision Desk', copy: 'Turn a vague request into a unit, evidence, chart and defensible sentence.', href: '/academy/missions/analyst-desk?showcase=1', action: 'Work the desk' }),
    Object.freeze({ number: '05', tag: 'COMPUTING', title: 'Live SQL Console', copy: 'Run real queries and inspect what each clause does to the result grain.', href: '/tools/data-console', action: 'Open the console' }),
    Object.freeze({ number: '06', tag: 'COMPUTER SCIENCE', title: 'Watch an Array Grow', copy: 'A code-native visual explanation of capacity, copying and amortised cost.', href: '/dsa/arrays/growth', action: 'Open the visual' })
  ]);
</script>

<svelte:head>
  <title>Qubix University Showcase</title>
  <meta name="description" content="A guided tour of the strongest Qubix University learning experiences for learners, universities, training teams and partners." />
</svelte:head>

<section class="showcase qx-shell">
  <div class="nav-wrap"><SiteNav current="showcase" subjects={false} /></div>

  <header class="hero">
    <div>
      <p class="eyebrow">QUBIX UNIVERSITY · GUIDED SHOWCASE</p>
      <h1>From a messy question to a result you can defend.</h1>
      <p class="lede">Qubix teaches the judgement around the tools: what the data means, what can go wrong, which method fits, and what the evidence honestly supports.</p>
      <div class="hero-actions"><a class="primary" href="/showcase/demo">Run the 30-minute demo</a><a href="#highlights">Browse individual highlights</a><a href="/learn/foundations">View the full pathway</a></div>
    </div>
    <aside aria-label="Current Qubix University learning system">
      <p class="eyebrow">THE SYSTEM TODAY</p>
      <dl><div><dt>Concise chapters</dt><dd>7</dd></div><div><dt>Practical missions</dt><dd>{MISSIONS.length}</dd></div><div><dt>Earned ranks</dt><dd>{RANKS.length}</dd></div><div><dt>Learning world</dt><dd>1 connected store</dd></div></dl>
    </aside>
  </header>

  <section class="audience" aria-labelledby="audience-heading">
    <div class="audience-tabs" role="tablist" aria-label="Choose your perspective">
      {#each Object.entries(AUDIENCES) as [id, item]}
        <button role="tab" aria-selected={audience === id} class:on={audience === id} on:click={() => (audience = id)}>{item.label}</button>
      {/each}
    </div>
    <div class="audience-copy" role="tabpanel"><p class="eyebrow">WHY IT MATTERS</p><h2 id="audience-heading">{selectedAudience.heading}</h2><p>{selectedAudience.note}</p></div>
  </section>

  <section class="promise" aria-labelledby="promise-heading">
    <div><p class="eyebrow">WHAT A DATA SCIENTIST ACTUALLY DOES</p><h2 id="promise-heading">The tools sit inside a decision loop.</h2></div>
    <ol>
      <li><span>01</span><b>Frame</b><p>Turn a business question into a measurable outcome and unit of analysis.</p></li>
      <li><span>02</span><b>Inspect</b><p>Find, query and test the data before trusting a summary or model.</p></li>
      <li><span>03</span><b>Analyse</b><p>Explore patterns, quantify uncertainty and compare a useful baseline.</p></li>
      <li><span>04</span><b>Explain</b><p>Show the evidence clearly, state its limits and recommend the next action.</p></li>
    </ol>
  </section>

  <section class="highlights" id="highlights" aria-labelledby="highlights-heading">
    <div class="section-heading"><p class="eyebrow">CURATED DEMO ROUTE</p><h2 id="highlights-heading">The best places to begin.</h2><p>Each link opens a self-contained highlight. The showcase links allow a presentation audience to try later missions without completing the whole course first.</p></div>
    <div class="grid">
      {#each HIGHLIGHTS as item}
        <article><div class="card-top"><span>{item.number}</span><em>{item.tag}</em></div><h3>{item.title}</h3><p>{item.copy}</p><a href={item.href}>{item.action} <span aria-hidden="true">→</span></a></article>
      {/each}
    </div>
  </section>

  <section class="coverage" aria-labelledby="coverage-heading">
    <div><p class="eyebrow">FOUNDATION BEFORE FASHION</p><h2 id="coverage-heading">What the current volume covers.</h2><p>It deliberately puts data meaning and evidence quality before machine learning. Gradient descent matters later; knowing whether one row represents a sale, a customer or a month matters on day one.</p></div>
    <ul><li>Data, rows, columns and grain</li><li>Missing values, types and lineage</li><li>Units, ratios, rates and percentages</li><li>Distributions, centre and sampling</li><li>SQL, joins and result checks</li><li>Python execution and reproducibility</li><li>Data visualisation and chart integrity</li><li>Findings, limitations and handover</li></ul>
  </section>

  <section class="cta"><p class="eyebrow">READY TO EXPLORE?</p><h2>Start with the experience that matches the room.</h2><div><a class="primary" href="/academy">Start as a learner</a><a href="/academy/missions/data-visualization?showcase=1">Run a five-minute demonstration</a></div></section>

  <div class="foot-wrap"><SiteFooter compact /></div>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#ebe5d8}
  :global(body){position:static}
  .showcase{--ink:#20241f;--soft:#62695f;--accent:#315f48;--signal:#b85530;--paper:#f7f3e9;--rule:#c8c1b1;min-height:100vh;max-width:none;padding-bottom:48px;background:#ebe5d8;color:var(--ink)}
  .showcase>*{max-width:1160px;margin-inline:auto}.nav-wrap,.hero,.audience,.promise,.highlights,.coverage,.cta,.foot-wrap{padding-inline:clamp(16px,5vw,58px)}
  .eyebrow{margin:0 0 10px;color:var(--signal);font:900 11px var(--qx-font);letter-spacing:.15em}.hero{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(260px,.65fr);gap:clamp(35px,8vw,110px);align-items:end;padding-top:72px;padding-bottom:72px}.hero h1{max-width:780px;margin:0;font:500 clamp(46px,7vw,82px)/.95 Georgia,serif;letter-spacing:-.045em;text-wrap:balance}.lede{max-width:660px;margin:24px 0 0;color:var(--soft);font:500 18px/1.65 var(--qx-font)}.hero-actions,.cta>div{display:flex;gap:13px;align-items:center;flex-wrap:wrap;margin-top:28px}.hero-actions a,.cta a{min-height:48px;display:inline-flex;align-items:center;padding:0 20px;border:1px solid var(--accent);color:var(--accent);font:850 13px var(--qx-font);text-decoration:none}.hero-actions a.primary,.cta a.primary{border-color:var(--signal);background:var(--signal);color:#fff}.hero aside{padding:26px;border-top:4px solid var(--accent);background:var(--paper)}dl{margin:0}dl div{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid var(--rule)}dl div:last-child{border:0}dt{color:var(--soft);font:700 12px var(--qx-font)}dd{margin:0;font:600 19px Georgia,serif}
  .audience{padding-top:46px;padding-bottom:62px;border-block:1px solid var(--rule)}.audience-tabs{display:flex;gap:8px;flex-wrap:wrap}.audience-tabs button{min-height:42px;padding:0 14px;border:1px solid var(--rule);background:transparent;color:var(--soft);font:800 12px var(--qx-font);cursor:pointer}.audience-tabs button.on{border-color:var(--accent);background:var(--accent);color:#fff}.audience-tabs button:focus-visible,.showcase a:focus-visible{outline:3px solid var(--signal);outline-offset:3px}.audience-copy{max-width:820px;margin-top:32px}.audience-copy h2,.promise h2,.section-heading h2,.coverage h2,.cta h2{margin:0;font:500 clamp(32px,5vw,52px)/1.06 Georgia,serif;letter-spacing:-.025em}.audience-copy>p:last-child,.section-heading>p:last-child,.coverage>div>p:last-child{max-width:720px;color:var(--soft);font:500 15px/1.65 var(--qx-font)}
  .promise{padding-top:76px;padding-bottom:80px}.promise>div{max-width:760px}.promise ol{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin:38px 0 0;padding:0;border-top:3px solid var(--accent);border-left:1px solid var(--rule);list-style:none}.promise li{min-width:0;padding:22px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);background:rgba(247,243,233,.58)}.promise li>span{display:block;color:var(--signal);font:600 14px Georgia,serif}.promise li b{display:block;margin-top:24px;font:600 21px Georgia,serif}.promise li p{margin:9px 0 0;color:var(--soft);font:550 13px/1.55 var(--qx-font)}
  .highlights{padding-top:76px;padding-bottom:80px;background:#20241f;color:#f7f3e9}.section-heading{margin:0;padding:0}.section-heading>p:last-child{color:#bfc4bb}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:38px;background:#55594f;border:1px solid #55594f}.grid article{min-width:0;min-height:290px;display:flex;flex-direction:column;padding:26px;background:#292e28}.card-top{display:flex;justify-content:space-between;gap:15px}.card-top span{color:#e08b61;font:600 13px Georgia,serif}.card-top em{color:#aeb5aa;font:900 11px var(--qx-font);font-style:normal;letter-spacing:.12em}.grid h3{margin:48px 0 0;font:500 28px Georgia,serif}.grid p{margin:10px 0;color:#bfc4bb;font:550 13.5px/1.55 var(--qx-font)}.grid a{margin-top:auto;color:#f0a27c;font:850 12.5px var(--qx-font);text-decoration:none}
  .coverage{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:clamp(40px,8vw,100px);padding-top:84px;padding-bottom:84px}.coverage ul{display:grid;grid-template-columns:1fr 1fr;gap:0;margin:0;padding:0;border-top:3px solid var(--accent);list-style:none}.coverage li{padding:14px 12px;border-bottom:1px solid var(--rule);font:750 12.5px/1.4 var(--qx-font)}.coverage li:nth-child(odd){border-right:1px solid var(--rule)}
  .cta{padding-top:60px;padding-bottom:64px;border-top:1px solid var(--rule);text-align:center}.cta>div{justify-content:center}.foot-wrap{border-top:1px solid var(--rule)}
  @media(max-width:900px){.hero,.coverage{grid-template-columns:1fr}.promise ol{grid-template-columns:1fr 1fr}.grid{grid-template-columns:1fr 1fr}.hero{padding-top:52px}.hero aside{max-width:480px}}
  @media(max-width:560px){.hero h1{font-size:48px}.promise ol,.grid{grid-template-columns:1fr}.promise li{min-height:180px}.grid article{min-height:250px}.coverage ul{grid-template-columns:1fr}.coverage li:nth-child(odd){border-right:0}.hero-actions a,.cta a{width:100%;justify-content:center}.audience-tabs{display:grid;grid-template-columns:1fr 1fr}.audience-tabs button{padding-inline:8px}}
</style>
