<script>
  const gamePlans = {
    analyst: {
      volume: 'Volume I · Analyst Foundations', title: 'Analyst Decision Desk', colour: '#a85a34',
      premise: 'A branch leader brings an unclear question. Build a trustworthy representation and recommend what should happen next.',
      loop: [['Brief', 'Clarify the decision and unit of analysis'], ['Inspect', 'Query and check the evidence'], ['Represent', 'Choose a table, chart or metric'], ['Recommend', 'State the finding and its limits']],
      unlocks: ['Questions', 'SQL', 'Representations', 'Patterns', 'Metrics', 'Decision views', 'Recommendations']
    },
    engineer: {
      volume: 'Volume II · Data Engineer Foundations', title: 'Pipeline Control', colour: '#397f86',
      premise: 'The morning report did not arrive. Trace the data path, repair the failed stage and prove the output is safe to publish.',
      loop: [['Observe', 'Read the failure and affected output'], ['Trace', 'Follow source, schema and transformation evidence'], ['Repair', 'Choose the smallest safe intervention'], ['Verify', 'Run checks before publishing']],
      unlocks: ['Python', 'Data models', 'Production SQL', 'Storage', 'Pipelines', 'Reliability', 'Platform safety']
    },
    scientist: {
      volume: 'Volume III · Data Scientist Foundations', title: 'Investigation Lab', colour: '#8b5e9b',
      premise: 'The Superstore has an uncertain problem. Frame it carefully, examine variation and defend a conclusion supported by evidence.',
      loop: [['Question', 'Define the outcome and alternatives'], ['Explore', 'Inspect data, distributions and possible bias'], ['Test', 'Apply a suitable statistical or modelling method'], ['Evaluate', 'Compare evidence, uncertainty and failure modes']],
      unlocks: ['Python and SQL', 'Probability', 'Inference', 'Linear algebra', 'Optimisation', 'Models', 'Evidence']
    },
    'ml-engineer': {
      volume: 'Volume IV · Machine Learning Engineer Foundations', title: 'Model Operations', colour: '#b9822f',
      premise: 'A prediction service is behaving unexpectedly. Diagnose the system and choose a response that protects users and operations.',
      loop: [['Monitor', 'Identify the failing service signal'], ['Diagnose', 'Separate data, model and software causes'], ['Change', 'Choose a controlled repair or rollback'], ['Validate', 'Test quality and safety before release']],
      unlocks: ['ML mathematics', 'Programming', 'ML foundations', 'Training pipelines', 'Serving', 'Operations', 'Responsible ML']
    }
  };

  const requested = new URLSearchParams(window.location.search).get('role');
  const role = gamePlans[requested] ? requested : 'analyst';
  const game = gamePlans[role];
  let selectedStep = 0;
</script>

<svelte:head><title>{game.title} | Qubix University</title><meta name="description" content="Authoring-only companion game plan for a Qubix role-foundation volume." /></svelte:head>

<section class="game-plan qx-shell" style={`--game:${game.colour}`}>
  <header><div><p>FOUNDATIONAL COMPANION GAME · AUTHORING PLAN · AI_DRAFT</p><h1>{game.title}</h1><span>{game.volume}</span></div><nav class="plan-nav">{#if role === 'analyst'}<a class="playable" href="?mode=game&mission=analyst-desk">Play the Decision Desk →</a>{/if}<a href={`?mode=game&mission=foundations&role=${role}`}>Return to the book</a></nav></header>
  <main>
    <section class="brief"><small>GAME PREMISE</small><h2>Use what the book taught.</h2><p>{game.premise}</p><div><b>Book</b><span>teaches the concepts in order</span><i>→</i><b>Game</b><span>combines them inside a changing situation</span></div></section>
    <section class="loop"><div class="section-head"><div><small>CORE LOOP</small><h2>One repeatable way to think</h2></div><span>4 STEPS</span></div><div class="loop-grid">{#each game.loop as step,index}<button class:active={selectedStep === index} on:click={() => selectedStep = index}><span>{index + 1}</span><b>{step[0]}</b><small>{step[1]}</small></button>{/each}</div><article><span>STEP {selectedStep + 1}</span><h3>{game.loop[selectedStep][0]}</h3><p>{game.loop[selectedStep][1]}.</p></article></section>
    <aside><div class="section-head"><div><small>BOOK LINK</small><h2>Chapter unlocks</h2></div><span>7 FOUNDATIONS</span></div><ol>{#each game.unlocks as unlock,index}<li><span>{String(index + 1).padStart(2,'0')}</span><b>{unlock}</b><em>{role === 'analyst' && index < 4 ? 'PLAYABLE' : 'LOCKED IN PLAN'}</em></li>{/each}</ol><p>The game grows with the book. It does not introduce a technical idea before the learner has read and practised its foundation.</p></aside>
  </main>
  <footer><b>Foundational practice, not job simulation</b><span>This page approves no lesson content. It defines the connection between one book and one companion game.</span></footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}:global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}.game-plan{min-height:100vh;max-width:none;padding:24px clamp(12px,4vw,50px) 38px;background:radial-gradient(circle at 50% 0,#3b3329,#171510 62%);color:#f1ede4;overflow:auto}header{max-width:1180px;margin:0 auto 20px;display:flex;align-items:end;justify-content:space-between;gap:18px}header p,.section-head small,.brief>small{margin:0 0 6px;color:#e1a582;font:900 11.5px var(--qx-font);letter-spacing:.12em}header h1{margin:0;font:700 clamp(33px,5vw,55px) Georgia,serif}header span{display:block;margin-top:5px;color:#c1b8a9;font:700 13.5px var(--qx-font)}.plan-nav{display:flex;align-items:center;gap:15px;flex-wrap:wrap}.plan-nav .playable{padding:11px 18px;border-radius:10px;background:#e4a17b;color:#241f16;border:0;font:900 13px var(--qx-font)}.plan-nav .playable:hover{background:#fff}header a{color:#e4bba4;font:850 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}main{max-width:1180px;margin:auto;display:grid;grid-template-columns:1.25fr .75fr;gap:15px}.brief,.loop,aside{border-radius:16px;background:#f1ede4;color:#241f16}.brief{grid-column:1/-1;padding:24px;display:grid;grid-template-columns:1fr 1.35fr;gap:4px 28px}.brief small,.brief h2{grid-column:1}.brief h2{margin:0;font:700 27px Georgia,serif}.brief>p{grid-column:2;grid-row:1/3;margin:0;color:#5e574a;font:650 15px/1.55 var(--qx-font)}.brief>div{grid-column:1/-1;margin-top:16px;padding:11px 14px;display:flex;align-items:center;justify-content:center;gap:12px;border-radius:9px;background:#fff}.brief div b{color:var(--game);font:900 13px var(--qx-font)}.brief div span{font:700 12px var(--qx-font)}.brief div i{color:var(--game);font-style:normal}.loop,aside{padding:22px}.section-head{display:flex;align-items:end;justify-content:space-between;gap:12px}.section-head h2{margin:0;font:700 24px Georgia,serif}.section-head>span{color:#756d5e;font:850 11px var(--qx-font);letter-spacing:.08em}.loop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:17px}.loop-grid button{min-height:130px;padding:11px;display:flex;flex-direction:column;align-items:flex-start;border:2px solid #ded6c6;border-radius:10px;background:#fff;color:#241f16;text-align:left;cursor:pointer}.loop-grid button>span{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#ece7dc;font:900 11.5px var(--qx-font)}.loop-grid b{margin-top:13px;font:800 13.5px var(--qx-font)}.loop-grid small{margin-top:5px;color:#706856;font:650 11.5px/1.4 var(--qx-font)}.loop-grid button.active{border-color:var(--game)}.loop-grid button.active>span{background:var(--game);color:#fff}.loop-grid button:focus-visible{outline:3px solid var(--game);outline-offset:2px}.loop article{margin-top:12px;padding:15px;border-left:5px solid var(--game);background:#fff}.loop article span{color:var(--game);font:900 11px var(--qx-font)}.loop article h3{margin:5px 0 3px;font:700 20px Georgia,serif}.loop article p{margin:0;color:#625a49;font:650 13px var(--qx-font)}aside ol{list-style:none;margin:16px 0 0;padding:0;border-top:1px solid #d8d0be}aside li{display:grid;grid-template-columns:30px 1fr auto;gap:8px;padding:11px 0;border-bottom:1px solid #e1dacb;align-items:center}aside li>span{color:var(--game);font:900 11.5px var(--qx-font)}aside li b{font:800 12px var(--qx-font)}aside li em{color:#877b67;font:850 11px var(--qx-font)}aside>p{margin:15px 0 0;color:#625a49;font:650 12px/1.5 var(--qx-font)}footer{max-width:1140px;margin:15px auto 0;padding:13px 20px;display:flex;justify-content:space-between;gap:15px;border-left:5px solid var(--game);background:#26231e;color:#bdb4a5;font:650 11.5px var(--qx-font)}footer b{color:#f1ede4}@media(max-width:880px){main{grid-template-columns:1fr}.brief{display:block}.brief>p{margin-top:10px}.brief>div{flex-wrap:wrap}.loop-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.game-plan{padding:15px 9px 28px}header{align-items:flex-start;flex-direction:column}.brief,.loop,aside{padding:16px}.brief>div{align-items:flex-start;flex-direction:column}.brief div i{transform:rotate(90deg);align-self:center}.loop-grid{grid-template-columns:1fr 1fr}.loop-grid button{min-height:145px}footer{flex-direction:column}}
</style>
