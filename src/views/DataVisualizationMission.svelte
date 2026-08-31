<script>
  import { DATA_VISUALIZATION_MISSION as M, isVisualizationAnswer } from '../lib/game/data-visualization-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';

  let caseIndex = 0;
  let selected = '';
  let checked = false;
  let correct = false;
  let completed = [];

  $: c = M.cases[caseIndex];
  $: missionComplete = completed.length === M.cases.length;
  $: progress = Math.round(((completed.length + (correct ? 1 : 0)) / M.cases.length) * 100);
  $: preview = selected || c?.answer || 'bar';
  $: max = Math.max(...(c?.values || [1]));
  $: if (missionComplete) recordCompletion('data-visualization');

  function choose(id) {
    if (correct) return;
    selected = id;
    checked = true;
    correct = isVisualizationAnswer(c, id);
  }

  function advance() {
    if (!correct) return;
    completed = [...completed, c.id];
    caseIndex += 1;
    selected = '';
    checked = false;
    correct = false;
  }

  function restart() {
    caseIndex = 0; selected = ''; checked = false; correct = false; completed = [];
  }
</script>

<svelte:head>
  <title>{M.title} | Qubix University</title>
  <meta name="description" content="Choose honest bar, line, histogram and scatter charts, then audit their scale, labels and accessibility." />
</svelte:head>

<section class="clinic mission-shell qx-shell">
  <MissionMasthead eyebrow={`${M.id} · REPORTING ASSIGNMENT`} title={M.title}
    roomId="boardroom" roomName="Boardroom · Presentation wall" progress={progress}
    meta={`${missionComplete ? M.cases.length : caseIndex + 1} OF ${M.cases.length} CHART BRIEFS · ${M.role}`} />

  <main>
    <section class="workarea m1-workarea">
      {#if missionComplete}
        <div class="done">
          <span aria-hidden="true">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>A chart is an argument you can audit.</h2>
          <p>{M.competency}</p>
          <ul>
            <li><b>Question</b><span>What comparison must the reader make?</span></li>
            <li><b>Encoding</b><span>Does position, length or shape answer it directly?</span></li>
            <li><b>Integrity</b><span>Are scale, units, denominator, source and period visible?</span></li>
            <li><b>Access</b><span>Do labels or shapes carry meaning without colour alone?</span></li>
          </ul>
          <div class="done-actions"><button on:click={restart}>Run the clinic again</button><a href="?mode=game&mission=analyst-desk">Use it at the Analyst Desk →</a></div>
        </div>
      {:else}
        <div class="brief"><p class="eyebrow">CHART BRIEF {caseIndex + 1}</p><h2>{c.brief}</h2><p>{c.question}</p></div>
        <figure aria-labelledby="chart-caption">
          <div class={`chart ${preview}`}>
            <span class="y-label">{c.id === 'time' ? 'returns per 1,000 sales' : c.id === 'relationship' ? 'wait, minutes' : c.id === 'shape' ? 'frequency' : 'revenue, £000'}</span>
            <div class="plot">
              {#if preview === 'scatter'}
                {#each c.values as value, i}<i class="dot" style={`left:${12 + (c.second?.[i] || i + 1) * 9}%;bottom:${10 + value / max * 72}%`}><span>{c.labels[i]}</span></i>{/each}
              {:else if preview === 'line'}
                <svg viewBox="0 0 600 230" role="img" aria-label="Line chart preview">
                  <polyline points={c.values.map((v, i) => `${45 + i * (510 / Math.max(1, c.values.length - 1))},${205 - v / max * 160}`).join(' ')} fill="none" stroke="#a84e2e" stroke-width="5" stroke-linejoin="round" />
                  {#each c.values as v, i}<circle cx={45 + i * (510 / Math.max(1, c.values.length - 1))} cy={205 - v / max * 160} r="7" fill="#315f48" />{/each}
                </svg>
              {:else}
                <div class="bars" class:histogram={preview === 'histogram'}>
                  {#each c.values as value, i}<i style={`height:${Math.max(7, value / max * 88)}%`}><span>{c.labels[i]}</span></i>{/each}
                </div>
              {/if}
            </div>
            <span class="x-label">{c.id === 'time' ? 'month, 2026' : c.id === 'relationship' ? 'queue length, people' : c.id === 'shape' ? 'basket value, £ bins' : 'department'}</span>
          </div>
          <figcaption id="chart-caption"><b>Live preview:</b> {preview === 'bar' ? 'bar chart' : preview === 'histogram' ? 'histogram' : preview === 'scatter' ? 'scatter plot' : preview === 'pie' ? 'pie-style category view' : 'line chart'}</figcaption>
        </figure>
      {/if}
    </section>

    {#if !missionComplete}
      <aside>
        <p class="eyebrow">CHOOSE THE REPRESENTATION</p>
        <h2>{c.question}</h2>
        <div class="options">
          {#each c.options as option}
            <button class:selected={selected === option.id} class:right={correct && selected === option.id}
              class:wrong={checked && !correct && selected === option.id} on:click={() => choose(option.id)} disabled={correct}>
              <b>{option.label}</b><span>{option.hint}</span>
            </button>
          {/each}
        </div>
        {#if checked}<div class:good={correct} class:bad={!correct} class="feedback" role="status">{#if correct}<b>Correct.</b> {c.why}{:else}<b>Not yet.</b> Read the question again: category, time, distribution or relationship?{/if}</div>{/if}
        {#if correct}<button class="next" on:click={advance}>{caseIndex === M.cases.length - 1 ? 'Finish the clinic' : 'Next chart brief'} →</button>{/if}
        <section class="audit"><p class="eyebrow">BEFORE IT LEAVES THE ROOM</p><ul><li>Scale and zero are honest</li><li>Axes name the measure and unit</li><li>Counts or rates are stated</li><li>Source and period are present</li><li>Colour is not the only key</li></ul></section>
      </aside>
    {/if}
  </main>

  <footer><span>Source-informed learning draft · accessed 31 August 2026</span><span>{#each M.sources as source, i}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{i < M.sources.length - 1 ? ' · ' : ''}{/each}</span></footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}
  :global(body){position:static}
  .clinic{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 30px;color:#f1ede4;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%)}
  main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(330px,.8fr);gap:16px;align-items:start}
  .workarea,aside{min-width:0;border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;overflow:hidden}
  .brief{padding:20px 22px;background:#25231f;color:#f1ede4}.brief h2{margin:0;font:700 26px Georgia,serif}.brief>p:last-child{margin:7px 0 0;color:#c9c0b1;font:650 14px/1.5 var(--qx-font)}
  .eyebrow{margin:0 0 6px;color:#a84e2e;font:900 11px var(--qx-font);letter-spacing:.14em}.brief .eyebrow{color:#e4a17b}
  figure{margin:0;padding:18px;background:#fbf8f1}.chart{position:relative;min-height:330px;padding:22px 24px 42px 54px;border:1px solid #ded6c6;background:#fff}.plot{position:relative;height:250px;border-left:2px solid #3c3931;border-bottom:2px solid #3c3931}.bars{height:100%;display:flex;align-items:end;gap:clamp(5px,2vw,22px);padding:12px 18px 0}.bars i{position:relative;flex:1;min-width:8px;background:#a84e2e}.bars i span{position:absolute;top:calc(100% + 9px);left:50%;transform:translateX(-50%);color:#5f584c;font:700 11px var(--qx-font);white-space:nowrap}.bars.histogram{gap:1px}.bars.histogram i{background:#315f48}.chart.pie .bars i{border-radius:50% 50% 0 0;background:#8b7660}.plot svg{display:block;width:100%;height:100%}.dot{position:absolute;width:15px;height:15px;border:3px solid #fff;border-radius:50%;background:#315f48;box-shadow:0 0 0 2px #315f48;transform:translate(-50%,50%)}.dot span{position:absolute;left:12px;bottom:9px;color:#5f584c;font:800 11px var(--qx-font)}.x-label,.y-label{position:absolute;color:#554e43;font:800 11px var(--qx-font);letter-spacing:.04em}.x-label{bottom:12px;left:50%;transform:translateX(-50%)}.y-label{left:8px;top:50%;writing-mode:vertical-rl;transform:translateY(-50%) rotate(180deg)}figcaption{padding-top:10px;color:#675f52;font:650 12px var(--qx-font)}
  aside{padding:clamp(18px,2.4vw,27px)}aside h2{margin:0 0 17px;font:700 23px/1.15 Georgia,serif}.options{display:grid;gap:9px}.options button{min-height:66px;padding:12px 14px;border:2px solid #d9d0c0;border-radius:10px;background:#fff;color:#25231f;text-align:left;cursor:pointer}.options b,.options span{display:block}.options b{font:850 14px var(--qx-font)}.options span{margin-top:3px;color:#706858;font:650 12.5px/1.4 var(--qx-font)}.options button:hover,.options button.selected{border-color:#a84e2e}.options button.right{border-color:#4f8736;background:#e5efdf}.options button.wrong{border-color:#aa3325;background:#f6ded8}.options button:focus-visible,.next:focus-visible,.done button:focus-visible,.done a:focus-visible{outline:3px solid #a84e2e;outline-offset:2px}.feedback{margin-top:11px;padding:11px 13px;border-radius:9px;font:650 13px/1.5 var(--qx-font)}.feedback.good{background:#e5efdf;color:#345c24}.feedback.bad{background:#f6ded8;color:#8b271a}.next,.done button{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:9px;background:#a84e2e;color:#fff;font:900 13px var(--qx-font);cursor:pointer}.audit{margin-top:20px;padding-top:17px;border-top:1px solid #d9d0c0}.audit ul{display:grid;gap:7px;margin:0;padding:0;list-style:none}.audit li{color:#625a4d;font:700 12px var(--qx-font)}.audit li::before{content:'✓';margin-right:8px;color:#315f48}
  .done{padding:32px;text-align:center}.done>span{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:#4f8736;color:#fff;font:900 26px var(--qx-font)}.done h2{margin:0;font:700 28px Georgia,serif}.done>p:not(.eyebrow){max-width:640px;margin:10px auto;color:#625a4d;font:650 14px/1.55 var(--qx-font)}.done ul{max-width:660px;margin:23px auto;padding:0;border:1px solid #d9d0c0;list-style:none;text-align:left}.done li{display:grid;grid-template-columns:110px 1fr;gap:14px;padding:11px 13px;border-bottom:1px solid #e3dccf}.done li:last-child{border:0}.done b{font:850 12.5px var(--qx-font)}.done li span{color:#625a4d;font:650 12.5px/1.4 var(--qx-font)}.done-actions{max-width:660px;margin:auto;display:grid;grid-template-columns:1fr 1fr;gap:10px}.done-actions a{display:grid;place-items:center;min-height:46px;border:2px solid #315f48;color:#315f48;font:900 13px var(--qx-font);text-decoration:none}
  footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#9f9585;font:650 12px/1.5 var(--qx-font);flex-wrap:wrap}footer a{color:#e2c7b7;text-decoration:none;border-bottom:1px solid currentColor}
  @media(max-width:920px){main{grid-template-columns:1fr}.chart{min-height:290px}.plot{height:210px}}
  @media(max-width:560px){.clinic{padding:12px 9px 24px}.brief{padding:16px}.chart{min-height:265px;padding:15px 10px 40px 40px}.plot{height:195px}.bars{gap:5px;padding-inline:8px}.bars i span{font-size:11px}.done{padding:24px 16px}.done-actions{grid-template-columns:1fr}.done li{grid-template-columns:1fr;gap:3px}}
</style>
