<script>
  import { superstoreTopics, superstoreTopicCount } from '../factory/superstore-topics.js';

  const books = [
    { stage: 'Qubix Ebook 001', title: 'What Data Is and Why People Use It', author: 'Qubix University · Pre-Intern Academy', note: 'The first source-first title: event, record, context, evidence and decision inside Qubix Superstore.', access: 'AI_DRAFT', url: '/library/what-data-is.html' },
    { stage: 'Qubix Ebook 002', title: 'What a Computer Program Does', author: 'Qubix University · Pre-Intern Academy', note: 'Instructions, inputs, processing, outputs, conditions, repetition and the difference between code and data.', access: 'AI_DRAFT', url: '/library/what-a-program-does.html' },
    { stage: 'Foundation', title: 'OpenIntro Statistics', author: 'Diez, Barr & Çetinkaya-Rundel', note: 'The main modern reference for data, probability, inference and regression.', access: 'Free PDF', url: 'https://www.openintro.org/book/os/' },
    { stage: 'Foundation', title: 'Introduction to Statistics', author: 'Lane et al.', note: 'A second explanation of variables, measurement, distributions and inference.', access: 'Public domain', url: 'https://onlinestatbook.com/' },
    { stage: 'Analyst', title: 'Python Data Science Handbook', author: 'Jake VanderPlas', note: 'Practical notebooks for NumPy, pandas, visualisation and scikit-learn.', access: 'Free online', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' },
    { stage: 'Scientist', title: 'An Introduction to Statistical Learning', author: 'James, Witten, Hastie, Tibshirani & Taylor', note: 'A major applied machine-learning reference with Python and R editions.', access: 'Free PDF', url: 'https://www.statlearning.com/' },
    { stage: 'Scientist', title: 'Mathematics for Machine Learning', author: 'Deisenroth, Faisal & Ong', note: 'Linear algebra, calculus and probability connected directly to ML.', access: 'Free PDF', url: 'https://mml-book.github.io/' },
    { stage: 'Specialist', title: 'Forecasting: Principles and Practice', author: 'Hyndman & Athanasopoulos', note: 'A practical reference for retail demand, seasonality and backtesting.', access: 'Free online', url: 'https://otexts.com/fpp3/' },
    { stage: 'Specialist', title: 'Causal Inference: The Mixtape', author: 'Scott Cunningham', note: 'Applied causal reasoning for experiments and observational evidence.', access: 'Free online', url: 'https://mixtape.scunning.com/' },
    { stage: 'Engineer', title: 'Fundamentals of Data Engineering', author: 'Joe Reis & Matt Housley', note: 'The data lifecycle from generation and ingestion to serving and governance.', access: 'Professional', url: 'https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/' },
    { stage: 'Engineer', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann & Chris Riccomini', note: 'Advanced principles for reliable, scalable and maintainable data systems.', access: 'Professional', url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/' },
    { stage: 'AI', title: 'Dive into Deep Learning', author: 'Zhang, Lipton, Li & Smola', note: 'Interactive deep learning with code, mathematics and exercises.', access: 'Free online', url: 'https://d2l.ai/' },
    { stage: 'AI', title: 'Deep Learning', author: 'Goodfellow, Bengio & Courville', note: 'The technical foundation beneath modern neural networks.', access: 'Free online', url: 'https://www.deeplearningbook.org/' },
    { stage: 'Leadership', title: 'NIST AI Risk Management Framework', author: 'National Institute of Standards and Technology', note: 'A living reference for trustworthy and responsible AI systems.', access: 'Official standard', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }
  ];

  const companyDomains = [
    ['Sales', 'sale · sale_line · return', 'Which key prevents double counting?'],
    ['Product', 'product · category · price_history', 'Which price was valid on the sale date?'],
    ['Inventory', 'inventory_snapshot · stock_movement', 'Is a blank stock count zero or missing?'],
    ['Supply chain', 'supplier · purchase_order · shipment', 'Where did a late delivery begin?'],
    ['Promotion', 'promotion · promotion_product · branch', 'Which sales were exposed to the campaign?'],
    ['ML platform', 'feature_snapshot · model_version · prediction', 'Can this prediction be reproduced?']
  ];

  const roleGroups = [
    ['Start', 'Pre-Intern Candidate', 'Learn digital, mathematical and data foundations from zero.'],
    ['Analyse', 'Data Intern → Decision Scientist', 'Turn governed records into evidence and decisions.'],
    ['Build', 'Analytics Engineer → Data Architect', 'Create reliable models, pipelines and data platforms.'],
    ['Model', 'Junior Data Scientist → Principal Data Scientist', 'Frame problems, quantify uncertainty and validate models.'],
    ['Deploy', 'ML Engineer → AI Engineer', 'Operate production models, retrieval systems and agents.'],
    ['Lead', 'Lead Data Scientist → Head of Data', 'Set scientific standards, strategy, risk and accountability.']
  ];

  let query = '';
  let selectedPhase = null;
  let mobileNavOpen = false;
  let view = 'learn';

  $: normalisedQuery = query.trim().toLowerCase();
  $: matches = normalisedQuery
    ? superstoreTopics.flatMap((phase) => phase.topics
        .filter((topic) => `${topic} ${phase.title} ${phase.role}`.toLowerCase().includes(normalisedQuery))
        .map((topic) => ({ topic, phase })))
    : [];
  $: activePhase = selectedPhase === null ? null : superstoreTopics.find((phase) => phase.phase === selectedPhase);

  function choosePhase(phase) {
    selectedPhase = phase;
    query = '';
    view = 'learn';
    mobileNavOpen = false;
    document.querySelector('.wiki-main')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goHome() {
    selectedPhase = null;
    query = '';
    view = 'learn';
    mobileNavOpen = false;
    document.querySelector('.wiki-main')?.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:head>
  <title>Qubix Data Science Wiki</title>
  <meta name="description" content="A structured path from complete beginner to Lead Data Scientist, taught through the fictional Qubix Superstore." />
</svelte:head>

<div class="wiki-shell">
  <header class="topbar">
    <button class="brand" on:click={goHome} aria-label="Qubix Data Science Wiki home">
      <span class="brand-mark">Q</span>
      <span><b>QUBIX</b><small>DATA SCIENCE WIKI</small></span>
    </button>

    <label class="search" class:searching={normalisedQuery}>
      <span aria-hidden="true">⌕</span>
      <input bind:value={query} aria-label="Search all 379 topics" placeholder="Search probability, SQL, forecasting…" />
      {#if query}<button on:click={() => query = ''} aria-label="Clear search">×</button>{/if}
    </label>

    <div class="status"><i></i><span>Draft knowledge base</span></div>
    <button class="nav-toggle" on:click={() => mobileNavOpen = !mobileNavOpen} aria-label="Open curriculum navigation">{mobileNavOpen ? '×' : '☰'}</button>
  </header>

  <aside class:open={mobileNavOpen} class="sidebar">
    <nav aria-label="Wiki navigation">
      <button class:active={selectedPhase === null && view === 'learn'} on:click={goHome}><span>Overview</span><small>{superstoreTopicCount} topics</small></button>
      <p>LEARNING PATH</p>
      {#each superstoreTopics as phase}
        <button class:active={selectedPhase === phase.phase && view === 'learn'} on:click={() => choosePhase(phase.phase)}>
          <i>{String(phase.phase).padStart(2, '0')}</i>
          <span>{phase.title.split(' · ')[0]}</span>
          <small>{phase.topics.length}</small>
        </button>
      {/each}
      <p>LIBRARY</p>
      <button class:active={view === 'books'} on:click={() => { view = 'books'; selectedPhase = null; mobileNavOpen = false; }}><span>Books & references</span><small>{books.length}</small></button>
      <button class:active={view === 'world'} on:click={() => { view = 'world'; selectedPhase = null; mobileNavOpen = false; }}><span>Superstore data world</span><small>10 tables</small></button>
    </nav>
  </aside>

  <main class="wiki-main">
    {#if normalisedQuery}
      <section class="content search-page">
        <div class="eyebrow">SEARCHING THE ENTIRE PATH</div>
        <h1>{matches.length} result{matches.length === 1 ? '' : 's'} for “{query}”</h1>
        <p class="lede">Every result remains attached to its prerequisite phase and Superstore role.</p>
        <div class="results">
          {#each matches as match}
            <button on:click={() => choosePhase(match.phase.phase)}>
              <span class="result-phase">PHASE {match.phase.phase} · {match.phase.role}</span>
              <b>{match.topic}</b>
              <small>{match.phase.title} <i>→</i></small>
            </button>
          {:else}
            <div class="empty"><b>No topic found yet.</b><span>Try a broader idea such as “data”, “model”, “probability” or “SQL”.</span></div>
          {/each}
        </div>
      </section>
    {:else if view === 'books'}
      <section class="content">
        <div class="eyebrow">THE REFERENCE DESK</div>
        <h1>Books that deepen the lesson.</h1>
        <p class="lede">Qubix teaches in its own words. Books provide a second explanation, technical depth and a trail back to authoritative sources.</p>
        <div class="source-rule"><b>How references work</b><span>Qubix theory → Superstore practical → reference chapter → original paper or official standard. Wikipedia helps with orientation and vocabulary, but its citations—not the page alone—are the final research trail.</span></div>
        <div class="book-grid">
          {#each books as book}
            <a href={book.url} target="_blank" rel="noreferrer">
              <span class="book-stage">{book.stage}</span>
              <h2>{book.title}</h2>
              <p class="author">{book.author}</p>
              <p>{book.note}</p>
              <span class="book-foot"><i>{book.access}</i><b>Open reference ↗</b></span>
            </a>
          {/each}
        </div>
      </section>
    {:else if view === 'world'}
      <section class="content">
        <div class="eyebrow">ONE COMPANY · CUMULATIVE DATA</div>
        <h1>The Qubix Superstore data world.</h1>
        <p class="lede">A fictional retail enterprise gives every concept a place, a stakeholder and a consequence. No real customer or retailer data is used.</p>
        <div class="footprint">
          <div><b>48</b><span>synthetic branches</span></div><div><b>5</b><span>regions</span></div><div><b>2</b><span>distribution hubs</span></div><div><b>1</b><span>corporate data office</span></div>
        </div>
        <div class="data-flow"><div>BRANCH SYSTEMS<small>sales · stock · shifts</small></div><i>→</i><div>DATA PLATFORM<small>validated relational history</small></div><i>→</i><div>CORPORATE OFFICE<small>decisions · experiments · models</small></div></div>
        <h2 class="section-title">Relational domains</h2>
        <div class="domain-grid">
          {#each companyDomains as domain}
            <article><span>{domain[0]}</span><code>{domain[1]}</code><p>{domain[2]}</p></article>
          {/each}
        </div>
        <h2 class="section-title">Career permissions grow with competence</h2>
        <div class="roles">
          {#each roleGroups as role, index}
            <article><i>{String(index + 1).padStart(2, '0')}</i><div><span>{role[0]}</span><b>{role[1]}</b><p>{role[2]}</p></div></article>
          {/each}
        </div>
      </section>
    {:else if activePhase}
      <section class="content phase-page">
        <div class="phase-heading">
          <div><span>PHASE</span><b>{String(activePhase.phase).padStart(2, '0')}</b></div>
          <section><div class="eyebrow">{activePhase.role}</div><h1>{activePhase.title}</h1><p class="lede">Theory, then practical. Repeat until the idea can be used independently.</p></section>
        </div>
        <div class="mission"><span>SUPERSTORE PRACTICAL</span><p>{activePhase.practical}</p></div>
        <div class="topic-list">
          {#each activePhase.topics as topic, index}
            <article>
              <span class="topic-number">{String(index + 1).padStart(2, '0')}</span>
              <div><h2>{topic}</h2><p>{index % 2 === 0 ? 'Theory · understand the concept and its limits' : 'Practical · apply it to Superstore evidence'}</p></div>
              <span class="topic-state">PLANNED</span>
            </article>
          {/each}
        </div>
        {#if activePhase.phase === 0}
          <a class="current-board" href="/library/what-data-is.html"><span>FIRST SOURCE-FIRST EBOOK</span><b>What Data Is and Why People Use It</b><small>Read ebook →</small></a>
          <a class="current-board" href="/library/what-a-program-does.html"><span>SECOND SOURCE-FIRST EBOOK</span><b>What a Computer Program Does</b><small>Read ebook →</small></a>
        {:else if activePhase.phase === 3}
          <a class="current-board" href="?mode=factory&bb=observations-variables"><span>FIRST BOARD IN REVIEW</span><b>Observations and Variables</b><small>Open the authoring preview →</small></a>
        {/if}
        <div class="phase-nav">
          <button disabled={activePhase.phase === 0} on:click={() => choosePhase(activePhase.phase - 1)}>← Previous phase</button>
          <button disabled={activePhase.phase === superstoreTopics.length - 1} on:click={() => choosePhase(activePhase.phase + 1)}>Next phase →</button>
        </div>
      </section>
    {:else}
      <section class="hero content">
        <div class="hero-copy">
          <div class="eyebrow">FROM ZERO TO LEAD DATA SCIENTIST</div>
          <h1>Learn the whole data science world in one connected place.</h1>
          <p class="lede">A structured wiki for statistics, probability, programming, data engineering, machine learning and AI—grounded in one persistent Superstore.</p>
          <div class="hero-actions"><button on:click={() => choosePhase(0)}>Start from zero <span>→</span></button><button class="secondary" on:click={() => view = 'books'}>Browse the library</button></div>
        </div>
        <div class="route-card">
          <span>YOUR ROUTE</span>
          <div><i>01</i><p><b>Pre-Intern</b><small>Digital + maths foundations</small></p></div>
          <div><i>02</i><p><b>Data professional</b><small>Analysis + engineering + statistics</small></p></div>
          <div><i>03</i><p><b>AI leader</b><small>Models + production + strategy</small></p></div>
        </div>
      </section>

      <section class="stats-strip">
        <div><b>{superstoreTopicCount}</b><span>mapped topics</span></div><div><b>17</b><span>ordered phases</span></div><div><b>6</b><span>career levels</span></div><div><b>1</b><span>connected company</span></div>
      </section>

      <section class="content overview-section">
        <div class="section-intro"><div><span>THE KNOWLEDGE MAP</span><h2>Everything has a place and a prerequisite.</h2></div><p>Choose a phase to see every topic. Listing a topic does not mark it complete—the detailed teaching boards enter founder review one at a time.</p></div>
        <div class="phase-grid">
          {#each superstoreTopics as phase}
            <button on:click={() => choosePhase(phase.phase)}>
              <span class="phase-top"><i>{String(phase.phase).padStart(2, '0')}</i><small>{phase.topics.length} TOPICS</small></span>
              <h3>{phase.title}</h3><p>{phase.role}</p>
              <span class="sample">{phase.topics.slice(0, 3).join(' · ')}</span>
              <b>Explore phase →</b>
            </button>
          {/each}
        </div>
      </section>

      <section class="method">
        <div class="content">
          <div class="eyebrow">THE LEARNING RHYTHM</div><h2>Understand it. Use it. Then go deeper.</h2>
          <div class="method-grid"><article><span>01</span><b>Theory</b><p>One precise concept, explained in plain language with its assumptions.</p></article><article><span>02</span><b>Practical</b><p>Use that idea on a realistic Superstore table, decision or failure.</p></article><article><span>03</span><b>Theory</b><p>Return with a stronger definition after seeing what can go wrong.</p></article><article><span>04</span><b>Practical</b><p>Reconstruct the idea independently and explain the consequence.</p></article></div>
        </div>
      </section>
    {/if}
  </main>
</div>

<style>
  :global(html), :global(body) { overflow: hidden; background: #f1ede4; }
  :global(body::before), :global(body::after) { display: none; }
  .wiki-shell { --ink:#221f1a; --paper:#f4f0e8; --card:#fbf9f4; --clay:#a85836; --olive:#67704b; --line:#d8d1c3; height:100%; display:grid; grid-template:72px 1fr / 258px 1fr; color:var(--ink); background:var(--paper); font-family:var(--qx-font); }
  button, input { font:inherit; }
  button { color:inherit; }
  .topbar { grid-column:1/-1; display:grid; grid-template-columns:258px minmax(260px,620px) 1fr auto; align-items:center; gap:24px; border-bottom:1px solid var(--line); background:rgba(251,249,244,.96); z-index:20; }
  .brand { height:100%; display:flex; align-items:center; gap:11px; padding:0 22px; border:0; border-right:1px solid var(--line); background:none; text-align:left; cursor:pointer; }
  .brand-mark { width:35px; height:35px; display:grid; place-items:center; border:1px solid var(--clay); border-radius:50%; color:var(--clay); font:700 18px Georgia,serif; }
  .brand > span:last-child { display:flex; flex-direction:column; gap:2px; }
  .brand b { font-size:14.5px; letter-spacing:.18em; }
  .brand small { font-size:11.5px; letter-spacing:.12em; color:#756d61; }
  .search { height:42px; display:flex; align-items:center; gap:9px; padding:0 12px; border:1px solid var(--line); border-radius:10px; background:#fff; }
  .search:focus-within { border-color:var(--clay); box-shadow:0 0 0 3px rgba(168,88,54,.1); }
  .search span { color:var(--clay); font-size:22px; transform:rotate(-15deg); }
  .search input { min-width:0; flex:1; border:0; outline:0; background:none; color:var(--ink); font-size:15px; }
  .search button { border:0; background:none; cursor:pointer; font-size:20px; color:#7d7468; }
  .status { justify-self:end; display:flex; align-items:center; gap:7px; color:#71695e; font-size:13.5px; }
  .status i { width:7px; height:7px; border-radius:50%; background:var(--clay); }
  .nav-toggle { display:none; margin-right:16px; border:0; background:none; font-size:22px; cursor:pointer; }
  .sidebar { min-height:0; overflow-y:auto; border-right:1px solid var(--line); background:#ece7dd; padding:18px 12px 28px; }
  .sidebar nav { display:flex; flex-direction:column; gap:3px; }
  .sidebar nav > p { margin:18px 10px 7px; color:#857c6f; font-size:11.5px; font-weight:900; letter-spacing:.16em; }
  .sidebar button { width:100%; min-height:40px; display:grid; grid-template-columns:27px minmax(0,1fr) auto; align-items:center; gap:7px; padding:8px 9px; border:0; border-radius:8px; background:none; text-align:left; cursor:pointer; }
  .sidebar button:first-child, .sidebar p + button:last-child { grid-template-columns:minmax(0,1fr) auto; }
  .sidebar button:hover { background:rgba(255,255,255,.5); }
  .sidebar button.active { background:var(--card); box-shadow:inset 3px 0 var(--clay); color:var(--clay); }
  .sidebar button i { width:26px; color:#8c8275; font-size:12px; font-style:normal; font-weight:900; }
  /* Wrapped rather than clipped. At the old 9px these labels mostly fitted;
     at a readable size the ellipsis was eating half of "Sampling, inference
     and experimentation", which is a worse trade than a second line. */
  .sidebar button span { font-size:13.5px; font-weight:700; line-height:1.35; overflow-wrap:anywhere; }
  .sidebar button small { color:#8a8174; font-size:12px; }
  .wiki-main { min-width:0; min-height:0; overflow-y:auto; scroll-behavior:smooth; }
  .content { width:min(1180px, calc(100% - 64px)); margin:0 auto; }
  .eyebrow { color:var(--clay); font-size:13px; font-weight:900; letter-spacing:.17em; }
  h1,h2,h3,p { margin:0; }
  h1 { max-width:850px; margin-top:15px; font:500 clamp(38px,5.5vw,72px)/.98 Georgia,serif; letter-spacing:-.045em; }
  .lede { max-width:720px; margin-top:22px; color:#625b51; font-size:17px; line-height:1.65; }
  .hero { min-height:510px; display:grid; grid-template-columns:minmax(0,1.55fr) minmax(290px,.7fr); align-items:center; gap:80px; padding:68px 0 52px; }
  .hero-actions { display:flex; gap:10px; margin-top:30px; }
  .hero-actions button { min-height:48px; padding:0 19px; border:1px solid var(--clay); border-radius:8px; background:var(--clay); color:#fffaf2; font-size:14.5px; font-weight:900; cursor:pointer; }
  .hero-actions button span { margin-left:22px; }
  .hero-actions .secondary { background:transparent; color:var(--clay); }
  .route-card { border:1px solid var(--line); border-radius:16px; background:var(--card); padding:23px; box-shadow:0 18px 50px rgba(55,45,32,.08); }
  .route-card > span { display:block; margin-bottom:17px; color:#82796c; font-size:12px; font-weight:900; letter-spacing:.14em; }
  .route-card > div { display:grid; grid-template-columns:34px 1fr; gap:12px; padding:15px 0; border-top:1px solid var(--line); }
  .route-card i { color:var(--clay); font-size:13px; font-style:normal; font-weight:900; }
  .route-card p { display:flex; flex-direction:column; gap:4px; }
  .route-card b { font:500 17px Georgia,serif; }
  .route-card small { color:#786f63; font-size:13px; }
  .stats-strip { display:grid; grid-template-columns:repeat(4,1fr); border-block:1px solid var(--line); background:var(--card); }
  .stats-strip div { display:flex; flex-direction:column; align-items:center; gap:3px; padding:24px; border-right:1px solid var(--line); }
  .stats-strip div:last-child { border:0; }
  .stats-strip b { font:500 30px Georgia,serif; color:var(--clay); }
  .stats-strip span { color:#756d61; font-size:12px; font-weight:800; letter-spacing:.09em; text-transform:uppercase; }
  .overview-section { padding:74px 0 90px; }
  .section-intro { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:end; margin-bottom:33px; }
  .section-intro span { color:var(--clay); font-size:12px; font-weight:900; letter-spacing:.16em; }
  .section-intro h2, .method h2 { margin-top:10px; font:500 clamp(30px,4vw,48px)/1 Georgia,serif; letter-spacing:-.035em; }
  .section-intro p { color:#6c6459; font-size:15px; line-height:1.7; }
  .phase-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }
  .phase-grid button { min-height:242px; display:flex; flex-direction:column; align-items:stretch; gap:9px; padding:18px; border:1px solid var(--line); border-radius:12px; background:var(--card); text-align:left; cursor:pointer; transition:.18s ease; }
  .phase-grid button:hover, .phase-grid button:focus-visible { border-color:var(--clay); transform:translateY(-3px); box-shadow:0 14px 30px rgba(56,44,30,.08); outline:none; }
  .phase-top { display:flex; justify-content:space-between; }
  .phase-top i { color:var(--clay); font-style:normal; font-weight:900; font-size:13px; }
  .phase-top small { color:#8a8175; font-size:11.5px; font-weight:900; letter-spacing:.1em; }
  .phase-grid h3 { margin-top:10px; font:500 20px/1.12 Georgia,serif; }
  .phase-grid p { color:var(--olive); font-size:12px; font-weight:900; letter-spacing:.07em; text-transform:uppercase; }
  .phase-grid .sample { margin-top:7px; color:#786f63; font-size:13.5px; line-height:1.5; }
  .phase-grid button > b { margin-top:auto; color:var(--clay); font-size:13px; }
  .method { background:var(--ink); color:#f6f0e5; padding:76px 0 88px; }
  .method .eyebrow { color:#d18a68; }
  .method-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin-top:38px; background:#4a453e; border:1px solid #4a453e; }
  .method-grid article { min-height:210px; display:flex; flex-direction:column; padding:22px; background:#292620; }
  .method-grid span { color:#d18a68; font-size:13px; font-weight:900; }
  .method-grid b { margin-top:auto; font:500 24px Georgia,serif; }
  .method-grid p { margin-top:9px; color:#beb5a7; font-size:14.5px; line-height:1.55; }
  .search-page, .phase-page, .content:not(.hero):not(.overview-section) { padding-top:60px; padding-bottom:90px; }
  .search-page h1, .content:not(.hero) > h1, .phase-heading h1 { font-size:clamp(36px,5vw,60px); }
  .results { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:38px; }
  .results button { min-height:130px; display:flex; flex-direction:column; align-items:flex-start; gap:8px; padding:17px; border:1px solid var(--line); border-radius:10px; background:var(--card); text-align:left; cursor:pointer; }
  .results button:hover { border-color:var(--clay); }
  .result-phase { color:var(--clay); font-size:11.5px; font-weight:900; letter-spacing:.1em; }
  .results b { font:500 20px Georgia,serif; }
  .results small { margin-top:auto; color:#776f63; }
  .results small i { color:var(--clay); font-style:normal; }
  .empty { grid-column:1/-1; display:flex; flex-direction:column; gap:8px; padding:45px; border:1px dashed var(--line); color:#6f675c; text-align:center; }
  .source-rule { display:grid; grid-template-columns:190px 1fr; gap:20px; margin-top:38px; padding:20px; border-left:3px solid var(--clay); background:#ebe5da; font-size:15px; line-height:1.65; }
  .book-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:30px; }
  .book-grid a { min-height:250px; display:flex; flex-direction:column; padding:20px; border:1px solid var(--line); border-radius:12px; background:var(--card); color:inherit; text-decoration:none; }
  .book-grid a:hover { border-color:var(--clay); }
  .book-stage { color:var(--clay); font-size:11.5px; font-weight:900; letter-spacing:.14em; text-transform:uppercase; }
  .book-grid h2 { margin-top:18px; font:500 22px/1.1 Georgia,serif; }
  .book-grid .author { margin-top:7px; color:var(--olive); font-size:13px; font-weight:800; }
  .book-grid a > p:not(.author) { margin-top:16px; color:#6f675b; font-size:14.5px; line-height:1.6; }
  .book-foot { display:flex; justify-content:space-between; gap:10px; margin-top:auto; padding-top:18px; border-top:1px solid var(--line); font-size:12px; }
  .book-foot i { color:#7c7367; font-style:normal; }
  .book-foot b { color:var(--clay); }
  .footprint { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-top:36px; }
  .footprint div { padding:20px; border:1px solid var(--line); background:var(--card); }
  .footprint b { display:block; font:500 30px Georgia,serif; color:var(--clay); }
  .footprint span { color:#766e62; font-size:13px; }
  .data-flow { display:grid; grid-template-columns:1fr auto 1fr auto 1fr; align-items:center; gap:14px; margin-top:13px; padding:22px; background:var(--ink); color:#f5eee2; }
  .data-flow div { display:flex; flex-direction:column; gap:5px; font-size:13px; font-weight:900; letter-spacing:.09em; }
  .data-flow small { color:#bcb3a5; font-size:13px; font-weight:500; letter-spacing:0; }
  .data-flow i { color:#d18a68; font-style:normal; }
  .section-title { margin:45px 0 18px; font:500 30px Georgia,serif; }
  .domain-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .domain-grid article { min-height:155px; padding:17px; border:1px solid var(--line); border-radius:10px; background:var(--card); }
  .domain-grid span { color:var(--clay); font-size:12px; font-weight:900; letter-spacing:.1em; text-transform:uppercase; }
  .domain-grid code { display:block; margin:16px 0 13px; color:var(--olive); font-size:13px; white-space:normal; }
  .domain-grid p { color:#6f675c; font-size:14.5px; line-height:1.5; }
  .roles { border-top:1px solid var(--line); }
  .roles article { display:grid; grid-template-columns:45px 1fr; gap:18px; padding:18px 0; border-bottom:1px solid var(--line); }
  .roles > article > i { color:var(--clay); font-size:13px; font-style:normal; font-weight:900; }
  .roles div { display:grid; grid-template-columns:90px 260px 1fr; align-items:center; gap:15px; }
  .roles span { color:var(--olive); font-size:12px; font-weight:900; text-transform:uppercase; }
  .roles b { font:500 17px Georgia,serif; }
  .roles p { color:#6e665b; font-size:13.5px; }
  .phase-heading { display:grid; grid-template-columns:105px 1fr; gap:30px; align-items:start; }
  .phase-heading > div { aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; border:1px solid var(--clay); border-radius:50%; color:var(--clay); }
  .phase-heading > div span { font-size:11.5px; font-weight:900; letter-spacing:.13em; }
  .phase-heading > div b { font:500 38px Georgia,serif; }
  .mission { display:grid; grid-template-columns:190px 1fr; gap:20px; margin:38px 0 24px; padding:20px; border:1px solid var(--line); border-left:4px solid var(--olive); background:var(--card); }
  .mission span { color:var(--olive); font-size:12px; font-weight:900; letter-spacing:.12em; }
  .mission p { color:#5e574e; font-size:15px; line-height:1.55; }
  .topic-list { border-top:1px solid var(--line); }
  .topic-list article { display:grid; grid-template-columns:45px 1fr auto; align-items:center; gap:16px; padding:16px 5px; border-bottom:1px solid var(--line); }
  .topic-number { color:#938a7d; font-size:12px; font-weight:900; }
  .topic-list h2 { font:500 17px Georgia,serif; }
  .topic-list p { margin-top:3px; color:#8a8175; font-size:13px; }
  .topic-state { padding:5px 7px; border:1px solid var(--line); border-radius:99px; color:#847b6f; font-size:11px; font-weight:900; letter-spacing:.1em; }
  .current-board { display:grid; grid-template-columns:1fr auto; gap:5px 20px; margin-top:24px; padding:19px; border:1px solid var(--clay); border-radius:10px; background:#efe0d5; color:inherit; text-decoration:none; }
  .current-board span { grid-column:1/-1; color:var(--clay); font-size:11.5px; font-weight:900; letter-spacing:.12em; }
  .current-board b { font:500 20px Georgia,serif; }
  .current-board small { align-self:end; color:var(--clay); font-weight:800; }
  .phase-nav { display:flex; justify-content:space-between; margin-top:34px; }
  .phase-nav button { min-height:42px; padding:0 14px; border:1px solid var(--line); border-radius:7px; background:var(--card); font-size:13px; font-weight:800; cursor:pointer; }
  .phase-nav button:disabled { opacity:.35; cursor:not-allowed; }
  @media (max-width: 940px) {
    .wiki-shell { grid-template-columns:220px 1fr; }
    .topbar { grid-template-columns:220px minmax(220px,1fr) auto auto; gap:12px; }
    .brand { padding:0 14px; }
    .content { width:min(100% - 38px, 900px); }
    .hero { grid-template-columns:1fr; gap:35px; }
    .route-card { display:none; }
    .phase-grid, .book-grid { grid-template-columns:repeat(2,1fr); }
    .method-grid { grid-template-columns:repeat(2,1fr); }
    .roles div { grid-template-columns:80px 210px 1fr; }
  }
  @media (max-width: 700px) {
    .wiki-shell { display:block; }
    .topbar { height:64px; display:grid; grid-template-columns:auto 1fr auto; position:relative; }
    .brand { border-right:0; }
    .brand > span:last-child, .status { display:none; }
    .search { height:38px; }
    .nav-toggle { display:block; }
    .sidebar { position:fixed; z-index:19; top:64px; bottom:0; left:0; width:min(88vw,320px); transform:translateX(-102%); transition:transform .2s ease; box-shadow:15px 0 50px rgba(40,32,22,.18); }
    .sidebar.open { transform:translateX(0); }
    .wiki-main { height:calc(100% - 64px); }
    .content { width:calc(100% - 30px); }
    h1 { font-size:44px; }
    .hero { min-height:auto; padding:52px 0; }
    .hero-actions { align-items:stretch; flex-direction:column; }
    .stats-strip { grid-template-columns:repeat(2,1fr); }
    .stats-strip div:nth-child(2) { border-right:0; }
    .stats-strip div:nth-child(-n+2) { border-bottom:1px solid var(--line); }
    .section-intro { grid-template-columns:1fr; gap:16px; }
    .phase-grid, .book-grid, .results, .domain-grid { grid-template-columns:1fr; }
    .method-grid { grid-template-columns:1fr; }
    .source-rule, .mission { grid-template-columns:1fr; gap:8px; }
    .footprint { grid-template-columns:repeat(2,1fr); }
    .data-flow { grid-template-columns:1fr; }
    .data-flow i { transform:rotate(90deg); justify-self:center; }
    .roles div { grid-template-columns:1fr; gap:4px; }
    .phase-heading { grid-template-columns:70px 1fr; gap:16px; }
    .phase-heading > div b { font-size:28px; }
    .topic-list article { grid-template-columns:30px 1fr; }
    .topic-state { display:none; }
  }
</style>
