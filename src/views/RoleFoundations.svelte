<script>
  import { partsForChapter, writtenChapters, volumeMinutes } from '../lib/content/shared-foundations.js';
  import { MISSIONS } from '../lib/game/progress.js';
  const shared = {
    id: 'shared', number: '0', title: 'Shared Foundations', subtitle: 'What every data role should understand before specialising', colour: '#5f7355',
    bookHref: '?mode=game&mission=shared-book',
    game: { title: 'Data Quality Rotation', description: 'Practise the shared foundations across seven connected Superstore missions.', href: '?mode=game&mission=campaign', state: 'FOUNDATIONAL PLAYABLE DRAFT' },
    chapters: [
      ['What data represents', 'Observations, variables, records, tables and how data describes part of the world.'],
      ['Numbers, ratios and change', 'Arithmetic, percentages, rates, units, algebra, functions and graphs.'],
      ['Quality and evidence', 'Missing values, valid types, grain, keys, duplicates, provenance and uncertainty.'],
      ['Statistics before models', 'Distributions, centre, spread, variation, sampling and the language of probability.'],
      ['SQL foundations', 'Select, filter, group, join and check the grain of a result.'],
      ['Python foundations', 'Values, variables, conditions, loops, functions, collections and working with tabular data.'],
      ['Explain what you found', 'Clear tables, charts, written reasoning, reproducibility and responsible communication.']
    ]
  };

  const roles = [
    {
      id: 'analyst', number: 'I', title: 'Analyst Foundations', subtitle: 'Turn trustworthy data into clear representations and decisions', colour: '#a85a34', icon: '▥',
      outcome: 'Prepare for junior data, business-intelligence and operations analyst work.',
      game: { title: 'Analyst Decision Desk', description: 'Practise the foundations of turning a simple question into a clear representation.', href: '?mode=game&mission=role-game&role=analyst', state: 'FOUNDATIONAL GAME PLAN' },
      chapters: [
        ['Frame a useful question', 'Translate a business problem into measures, comparisons and a clear unit of analysis.'],
        ['Query with SQL', 'Filter, join, aggregate and use window functions without silently changing grain.'],
        ['Represent data clearly', 'Choose tables and charts by purpose, then label scales, units and uncertainty honestly.'],
        ['Describe patterns', 'Use distributions, centre, spread, segments and time comparisons without overclaiming.'],
        ['Define business metrics', 'Build traceable measures, denominators, cohorts and time windows.'],
        ['Build a decision view', 'Combine spreadsheets, notebooks or BI tools into a governed dashboard.'],
        ['Explain and recommend', 'Separate evidence from interpretation and communicate a decision with limitations.']
      ]
    },
    {
      id: 'engineer', number: 'II', title: 'Data Engineer Foundations', subtitle: 'Build reliable paths from source systems to usable data', colour: '#397f86', icon: '▤',
      outcome: 'Prepare for junior analytics-engineering and data-engineering study.',
      game: { title: 'Pipeline Control', description: 'Practise the basic parts of a pipeline, the order they run and the checks between them.', href: '?mode=game&mission=role-game&role=engineer', state: 'FOUNDATIONAL GAME PLAN' },
      chapters: [
        ['Program with Python', 'Use functions, modules, files, errors, tests and data structures to build maintainable processes.'],
        ['Model relational data', 'Use keys, constraints, normal forms, dimensions and facts to preserve meaning.'],
        ['Write production SQL', 'Transform data predictably, test assumptions and inspect query plans.'],
        ['Move and store data', 'Understand files, APIs, databases, warehouses, batch jobs and streaming fundamentals.'],
        ['Build a pipeline', 'Separate ingestion, validation, transformation and publishing into restartable steps.'],
        ['Operate for reliability', 'Use data contracts, quality checks, logs, lineage, orchestration and alerts.'],
        ['Protect the platform', 'Apply access control, secrets hygiene, retention, cost awareness and recovery basics.']
      ]
    },
    {
      id: 'scientist', number: 'III', title: 'Data Scientist Foundations', subtitle: 'Use mathematics, code and evidence to study uncertain problems', colour: '#8b5e9b', icon: '∿',
      outcome: 'Prepare for junior data-science study without skipping mathematical reasoning.',
      game: { title: 'Investigation Lab', description: 'Practise asking a measurable question, examining variation and judging simple evidence.', href: '?mode=game&mission=role-game&role=scientist', state: 'FOUNDATIONAL GAME PLAN' },
      chapters: [
        ['Compute with Python and SQL', 'Manipulate, join, visualise and test data reproducibly.'],
        ['Probability', 'Events, conditional probability, independence, random variables and common distributions.'],
        ['Statistical inference', 'Sampling, bias, estimation, confidence intervals, hypothesis tests and practical significance.'],
        ['Vectors and matrices', 'Represent observations, features and linear transformations with geometric meaning.'],
        ['Calculus and optimisation', 'Understand rates of change, derivatives, gradients, loss and numerical optimisation.'],
        ['Build and evaluate models', 'Frame prediction tasks, split data, establish baselines and compare suitable metrics.'],
        ['Reason from model evidence', 'Interpret results, examine failure modes and communicate uncertainty and limitations.']
      ]
    },
    {
      id: 'ml-engineer', number: 'IV', title: 'Machine Learning Engineer Foundations', subtitle: 'Turn validated models into dependable software systems', colour: '#b9822f', icon: '◇',
      outcome: 'Prepare for ML-engineering study by combining mathematical, modelling and software foundations.',
      game: { title: 'Model Operations', description: 'Practise the basic model lifecycle from inputs and training to checking an output.', href: '?mode=game&mission=role-game&role=ml-engineer', state: 'FOUNDATIONAL GAME PLAN' },
      chapters: [
        ['Mathematics for learning systems', 'Algebra, functions, vectors, matrices, probability, statistics, derivatives and gradients.'],
        ['Programming and algorithms', 'Python, data structures, complexity, testing, version control and maintainable design.'],
        ['Machine-learning foundations', 'Features, objectives, training, regularisation, validation and model families.'],
        ['Data and training pipelines', 'Create reproducible datasets, transformations, experiments and model artefacts.'],
        ['Serve a model', 'Use APIs, batch inference, containers and compute resources to make predictions available.'],
        ['Operate the system', 'Monitor latency, data quality, drift, model quality, failures and rollback.'],
        ['Build responsibly', 'Address privacy, security, robustness, fairness, explainability and human oversight.']
      ]
    }
  ];

  const requestedRole = new URLSearchParams(window.location.search).get('role');
  let selected = roles.some(role => role.id === requestedRole) ? requestedRole : 'shared';
  $: volume = selected === 'shared' ? shared : roles.find(role => role.id === selected);

  // Asked, not hardcoded. A chapter becomes clickable here by being added to
  // the registry, which is the only place that knows what exists.
  const partsFor = (v, chapterIndex) => (v.id === 'shared' ? partsForChapter(chapterIndex + 1) : []);

  const minutes = m => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`);
  // Read from the book rather than typed here, so the two cannot disagree.
  $: readingTime = minutes(volumeMinutes);
  $: written = volume.id === 'shared' ? writtenChapters : 0;
</script>

<svelte:head><title>Role Foundations | Qubix University</title><meta name="description" content="Authoring proposal for a book-first shared and role-specific foundations curriculum." /></svelte:head>

<section class="library qx-shell" style={`--volume:${volume.colour}`}>
  <header><div><p>QUBIX UNIVERSITY · CURRICULUM PROPOSAL · AI_DRAFT</p><h1>Foundations before specialisation.</h1><span>Read in order. Understand the idea. Work one example. Answer from memory. Then continue.</span></div><a href="?mode=game">Play the missions</a></header>

  <!-- The games were live but reachable only from a link in the header, on a
       page that opens with a table of contents. Reading is the slower half of
       this curriculum and it was the only half with a front door. -->
  <section class="play">
    <div class="play-lead">
      <p>PLAY FIRST · NO READING REQUIRED</p>
      <h2>{MISSIONS.length} playable missions</h2>
      <span>Work a shift in the Superstore. Each one is fifteen minutes, keeps your progress, and teaches one idea you can use the same day.</span>
    </div>
    <ol class="play-list">
      {#each MISSIONS as m, i}
        <li><a href={`?mode=game&mission=${m.slug}`}><b>{String(i + 1).padStart(2, '0')}</b><span>{m.mission.title}</span><em>{m.xp} XP</em></a></li>
      {/each}
    </ol>
    <div class="play-actions">
      <a class="play-primary" href="?mode=game">Open the academy <span aria-hidden="true">→</span></a>
      <a class="play-second" href="?mode=game&mission=campaign">Story mode: one connected shift</a>
    </div>
  </section>

  <section class="principle"><b>THEN READ</b><span>Everyone completes Volume 0.</span><i>→</i><span>Choose a role foundation.</span><i>→</i><span>Build deeper projects later.</span></section>

  <nav aria-label="Foundation volumes">
    <button class:active={selected === 'shared'} on:click={() => selected = 'shared'}><span>0</span><div><b>Shared</b><small>Start here</small></div></button>
    {#each roles as role}<button class:active={selected === role.id} on:click={() => selected = role.id}><span>{role.number}</span><div><b>{role.title.replace(' Foundations','')}</b><small>Foundation volume</small></div></button>{/each}
  </nav>

  <main>
    <aside><div class="book"><span>VOLUME {volume.number}</span><b>{volume.title}</b><i>{selected === 'shared' ? '◎' : volume.icon}</i></div><p>{volume.subtitle}</p>{#if selected !== 'shared'}<strong>{volume.outcome}</strong><div class="requires"><b>Begins after</b><span>Volume 0 · Shared Foundations</span></div>{:else}<strong>This volume prevents learners from entering a role path with hidden gaps in maths, data, SQL, Python or communication.</strong>{/if}<section class="companion"><small>COMPANION GAME · {volume.game.state}</small><h3>{volume.game.title}</h3><p>{volume.game.description}</p><a href={volume.game.href}>{selected === 'shared' ? 'Play the connected draft' : 'Open the game plan'} →</a></section></aside>

    <section class="contents"><div class="contents-head"><div><p>TABLE OF CONTENTS</p><h2>{volume.title}</h2></div><div class="contents-actions"><span>{volume.chapters.length} CHAPTERS · {written} WRITTEN</span>{#if volume.bookHref}<a href={volume.bookHref}>Begin Part One · {readingTime} →</a>{/if}</div></div>
      <ol>{#each volume.chapters as chapter,index}
        {@const part = partsFor(volume, index)}
        <li class:planned={!part.length}>
          <span>{String(index + 1).padStart(2,'0')}</span>
          <div>
            <h3>{chapter[0]}</h3>
            <p>{chapter[1]}</p>
            {#if part.length}
              <!-- The chapter's own parts, each opening the page it names.
                   Before this the whole volume had one button and no chapter
                   had any, so there was no way to reach a chapter directly. -->
              <ul class="parts">{#each part as session}
                <li><a href={`${volume.bookHref}&chapter=${index + 1}&session=${session.n}`}>{session.n}. {session.title}<em>{minutes(session.minutes)}</em></a></li>
              {/each}</ul>
            {/if}
          </div>
          {#if part.length}
            <a class="open" href={`${volume.bookHref}&chapter=${index + 1}&session=1`}>Read <span aria-hidden="true">→</span></a>
          {:else}
            <em class="soon">Not written yet</em>
          {/if}
        </li>
      {/each}</ol>
    </section>
  </main>

  <section class="page-rule"><p>Every eventual chapter uses the same calm page structure.</p><div><span>1</span><b>Explain one idea</b></div><i>→</i><div><span>2</span><b>Show one worked example</b></div><i>→</i><div><span>3</span><b>Ask one focused question</b></div><i>→</i><div><span>4</span><b>Recall it later</b></div></section>
  <footer><span>Planning surface only. Topics remain locked until individually sourced, drafted and reviewed.</span><span>Role foundations proposal · 22 August 2026</span></footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}:global(html),:global(body){overflow:auto;background:#f1ede4}:global(body){position:static}.library{min-height:100vh;max-width:none;padding:25px clamp(12px,4vw,52px) 40px;background:#f1ede4;color:#241f16;overflow:auto}header{max-width:1220px;margin:0 auto 22px;display:flex;align-items:end;justify-content:space-between;gap:20px;border-bottom:1px solid #d8d0be;padding-bottom:19px}header p,.contents-head p{margin:0 0 6px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.13em}header h1{margin:0;font:700 clamp(31px,5vw,54px) Georgia,serif}header span{display:block;margin-top:8px;color:#625a49;font:650 14.5px var(--qx-font)}header a{color:#8c4c2e;font:850 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px;white-space:nowrap}.principle{max-width:1180px;margin:0 auto 16px;padding:14px 20px;display:flex;align-items:center;justify-content:center;gap:13px;border-radius:12px;background:#241f16;color:#f1ede4;font:750 13px var(--qx-font)}.principle b{color:#e4a17b;letter-spacing:.1em}
  .play{max-width:1180px;margin:0 auto 16px;padding:24px clamp(16px,3vw,28px);border-radius:16px;background:#241f16;color:#f1ede4;display:grid;gap:18px}
  .play-lead p{margin:0 0 7px;color:#e4a17b;font:900 12px var(--qx-font);letter-spacing:.13em}
  .play-lead h2{margin:0;font:700 clamp(25px,3.4vw,34px) Georgia,serif;color:#fff}
  .play-lead span{display:block;margin-top:8px;max-width:62ch;color:#bcb19e;font:650 14.5px/1.5 var(--qx-font)}
  .play-list{list-style:none;margin:0;padding:0;display:grid;gap:7px;grid-template-columns:repeat(auto-fit,minmax(268px,1fr))}
  .play-list a{display:flex;align-items:center;gap:11px;padding:12px 14px;border:1px solid rgba(255,255,255,.15);border-radius:11px;background:rgba(255,255,255,.05);color:#f1ede4;text-decoration:none}
  .play-list a:hover{background:rgba(255,255,255,.12);border-color:#e4a17b}
  .play-list a:focus-visible{outline:3px solid #e4a17b;outline-offset:2px}
  .play-list b{flex:none;color:#8d8474;font:900 13px var(--qx-font);font-variant-numeric:tabular-nums}
  .play-list span{flex:1;min-width:0;font:750 14px var(--qx-font)}
  .play-list em{flex:none;color:#e4a17b;font:900 12px var(--qx-font);font-style:normal}
  .play-actions{display:flex;flex-wrap:wrap;gap:11px;align-items:center}
  .play-primary{padding:13px 22px;border-radius:11px;background:#e4a17b;color:#241f16;text-decoration:none;font:900 14px var(--qx-font)}
  .play-primary:hover{background:#fff}
  .play-second{color:#bcb19e;font:750 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:2px}
  .play-primary:focus-visible,.play-second:focus-visible{outline:3px solid #e4a17b;outline-offset:3px}.principle i{color:#83bc68;font-style:normal}nav{max-width:1180px;margin:0 auto 18px;display:grid;grid-template-columns:repeat(5,1fr);gap:8px}nav button{min-height:65px;padding:9px 11px;display:flex;align-items:center;gap:9px;border:1px solid #d8d0be;border-radius:11px;background:#fff;color:#241f16;text-align:left;cursor:pointer}nav button>span{display:grid;place-items:center;flex:0 0 32px;height:32px;border-radius:7px;background:#ece7dc;color:#625a49;font:900 12px var(--qx-font)}nav button div{display:grid;gap:2px}nav b{font:850 12px var(--qx-font)}nav small{color:#756c5c;font:650 11px var(--qx-font)}nav button.active{border:2px solid var(--volume);background:#fbf8f1}nav button.active>span{background:var(--volume);color:#fff}nav button:focus-visible{outline:3px solid var(--volume);outline-offset:2px}main{max-width:1180px;margin:auto;display:grid;grid-template-columns:300px 1fr;gap:16px;align-items:start}main>aside,.contents{border:1px solid #d8d0be;border-radius:16px;background:#fff;overflow:hidden}main>aside{position:sticky;top:14px;padding:20px}.book{position:relative;min-height:310px;padding:25px;display:flex;flex-direction:column;justify-content:space-between;border-radius:5px 15px 15px 5px;background:var(--volume);color:#fff;box-shadow:inset 8px 0 rgba(0,0,0,.13),6px 8px 0 #ded5c5}.book:after{content:'';position:absolute;left:22px;right:18px;top:60px;height:1px;background:rgba(255,255,255,.4)}.book span{font:900 11.5px var(--qx-font);letter-spacing:.13em}.book b{max-width:180px;font:700 29px/1.05 Georgia,serif}.book i{align-self:flex-end;font:normal 45px Georgia,serif}aside>p{margin:22px 0 9px;font:700 14px/1.45 Georgia,serif}aside>strong{color:#625a49;font:650 13px/1.55 var(--qx-font)}.requires{margin-top:16px;padding:11px;border-left:4px solid var(--volume);background:#f1ede4}.requires b,.requires span{display:block}.requires b{font:900 11.5px var(--qx-font)}.requires span{margin-top:3px;font:700 12px var(--qx-font)}.contents{padding:22px}.contents-head{display:flex;align-items:end;justify-content:space-between;gap:12px;padding-bottom:16px;border-bottom:1px solid #d8d0be}.contents-head h2{margin:0;font:700 27px Georgia,serif}.contents ol{list-style:none;margin:0;padding:0}.contents li{display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:13px;padding:17px 4px;border-bottom:1px solid #e4ddce}.contents li>span{color:var(--volume);font:900 13.5px var(--qx-font)}.contents h3{margin:0 0 4px;font:700 17px Georgia,serif}.contents li p{margin:0;color:#625a49;font:650 12px/1.45 var(--qx-font)}.contents em{color:#8c4c2e;font:850 11px var(--qx-font);letter-spacing:.07em;white-space:nowrap}
  .contents li.planned{opacity:.62}
  .contents li>div{min-width:0}
  .parts{list-style:none;margin:11px 0 0;padding:0;display:grid;gap:5px}
  .parts li{display:block;padding:0;border:0}
  .parts a{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:8px 11px;border:1px solid #e4ddce;border-radius:9px;background:#fbf8f1;color:#241f16;text-decoration:none;font:700 13px var(--qx-font)}
  .parts a:hover{border-color:var(--volume);background:#fff}
  .parts a:focus-visible{outline:3px solid var(--volume);outline-offset:2px}
  .parts em{color:#756c5c;font:700 12px var(--qx-font);font-style:normal;white-space:nowrap}
  a.open{display:grid;place-items:center;min-height:40px;padding:0 17px;border-radius:9px;background:var(--volume);color:#fff;text-decoration:none;font:900 13px var(--qx-font);white-space:nowrap}
  a.open:hover{background:#241f16}
  a.open:focus-visible{outline:3px solid #241f16;outline-offset:2px}
  em.soon{color:#8a8172;font:800 12px var(--qx-font);font-style:normal;white-space:nowrap}.page-rule{max-width:1140px;margin:17px auto 0;padding:16px 20px;display:flex;align-items:center;justify-content:center;gap:10px;border-radius:13px;background:#e7efdc}.page-rule>p{margin:0 15px 0 0;font:700 13.5px Georgia,serif}.page-rule div{display:flex;align-items:center;gap:6px}.page-rule div span{display:grid;place-items:center;width:23px;height:23px;border-radius:50%;background:#3e9e2a;color:#fff;font:900 11.5px var(--qx-font)}.page-rule div b{font:800 11.5px var(--qx-font)}.page-rule>i{color:#759166;font-style:normal}footer{max-width:1180px;margin:15px auto 0;display:flex;justify-content:space-between;gap:15px;color:#746c5e;font:650 11.5px var(--qx-font)}@media(max-width:900px){nav{grid-template-columns:repeat(3,1fr)}main{grid-template-columns:1fr}main>aside{position:static;display:grid;grid-template-columns:230px 1fr;gap:0 20px}.book{grid-row:1/5;min-height:270px}.page-rule{flex-wrap:wrap}}@media(max-width:600px){.library{padding:15px 9px 28px}header{align-items:flex-start;flex-direction:column}.principle{align-items:flex-start;flex-direction:column}.principle i{transform:rotate(90deg);align-self:center}nav{display:flex;overflow-x:auto;padding-bottom:4px}nav button{flex:0 0 145px}.contents{padding:15px}.contents-head{align-items:flex-start;flex-direction:column}.contents li{grid-template-columns:32px 1fr}.contents em{grid-column:2}.book{min-height:230px}main>aside{display:block}.book{margin-bottom:18px}.page-rule{align-items:flex-start;justify-content:flex-start;flex-direction:column}.page-rule>i{transform:rotate(90deg);align-self:center}footer{flex-direction:column}}
  .companion{margin-top:16px;padding:14px;border-radius:11px;background:#241f16;color:#f1ede4}.companion small{color:#d9a07f;font:900 11px var(--qx-font);letter-spacing:.1em}.companion h3{margin:6px 0 5px;font:700 17px Georgia,serif}.companion p{margin:0;color:#c8c0b2;font:650 11.5px/1.45 var(--qx-font)}.companion a{display:grid;place-items:center;min-height:38px;margin-top:10px;border-radius:8px;background:var(--volume);color:#fff;font:900 11.5px var(--qx-font);text-decoration:none}.companion a:focus-visible{outline:3px solid var(--volume);outline-offset:2px}
  .contents-actions{display:grid;justify-items:end;gap:8px}.contents-actions>span{color:#756c5c;font:850 11px var(--qx-font);letter-spacing:.08em}.contents-actions>a{padding:9px 11px;border-radius:7px;background:var(--volume);color:#fff;font:900 11.5px var(--qx-font);text-decoration:none}
  .principle i{color:#9aaf8f}.page-rule{background:#e8ede3}.page-rule div span{background:#5f7355}
</style>
