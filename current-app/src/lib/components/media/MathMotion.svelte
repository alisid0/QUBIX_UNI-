<script>
  export let spec = {};
  $: kind = spec.kind || 'linear';
  $: title = spec.title || ({
    coordinate:'Coordinates in motion', vector:'Vector journey', 'number-line':'Movement on the line',
    function:'A changing rule', linear:'Rate of change', matrix:'Transformation in motion',
    exponential:'Multiplicative change', trig:'Repeating motion', derivative:'Slope microscope', limit:'Approaching a limit'
  }[kind] || 'Mathematical motion');
  const curveKind = (value) => ['function','exponential','derivative','limit','linear'].includes(value);
</script>

<figure class="motion" aria-label={`${title}. Animated mathematical construction.`}>
  <header><span>MANIM-STYLE SEQUENCE</span><strong>{title}</strong><i>1:1</i></header>
  <div class="screen">
    <svg viewBox="0 0 320 320" role="img" aria-label={`Animated ${kind} construction`}>
      <g class="grid">{#each [40,80,120,160,200,240,280] as n}<line x1={n} y1="24" x2={n} y2="296"/><line x1="24" y1={n} x2="296" y2={n}/>{/each}</g>
      <g class="axes"><line x1="24" y1="260" x2="296" y2="260"/><line x1="60" y1="296" x2="60" y2="24"/></g>
      {#if kind === 'trig'}
        <circle class="ring" cx="160" cy="154" r="102"/><line class="radius" x1="160" y1="154" x2="237" y2="87"/><circle class="traveller orbit" cx="237" cy="87" r="7"/><path class="trace" d="M58 154C82 78 106 78 130 154S178 230 202 154S250 78 274 154"/>
      {:else if kind === 'matrix'}
        <path class="shape before" d="M82 220V115H187V220Z"/><path class="shape after" d="M168 224L104 140L188 76L252 160Z"/><path class="arrow" d="M165 236C198 246 230 225 245 197"/>
      {:else if kind === 'vector' || kind === 'coordinate'}
        <path class="trace" d="M65 254L130 196L191 133L267 68"/><circle class="traveller follow" cx="65" cy="254" r="8"/><path class="arrow" d="M191 133L267 68"/>
      {:else if kind === 'number-line'}
        <line class="trace" x1="38" y1="160" x2="282" y2="160"/>{#each [58,98,138,178,218,258] as x}<line class="tick" x1={x} y1="150" x2={x} y2="170"/>{/each}<circle class="traveller linewalk" cx="58" cy="160" r="8"/>
      {:else if curveKind(kind)}
        <path class="trace" d={kind === 'exponential' ? 'M62 244C137 240 191 213 227 159S269 74 282 44' : kind === 'limit' ? 'M45 240C100 215 139 177 174 139S239 89 281 72' : 'M45 238C91 111 136 69 177 122S231 239 282 65'}/>
        <line class="tangent" x1="116" y1="230" x2="252" y2="105"/><circle class="traveller curvewalk" cx="174" cy="139" r="8"/>
      {/if}
      <text x="160" y="302">construct → compare → understand</text>
    </svg>
  </div>
  <figcaption><b>▶</b> The sequence restarts automatically.</figcaption>
</figure>

<style>
  .motion{width:min(100%,340px);height:100%;aspect-ratio:1;margin:auto;box-sizing:border-box;display:flex;flex-direction:column;border:1px solid var(--qx-border-2);border-radius:20px;overflow:hidden;background:#11151a;color:#f5f0e6;box-shadow:0 16px 38px rgba(12,14,17,.18)}
  header{display:grid;grid-template-columns:1fr auto;gap:3px 10px;padding:14px 15px 9px}header span{font-size:8px;letter-spacing:.15em;color:#70d6b1;font-weight:900}header strong{grid-column:1;font-size:15px}header i{grid-column:2;grid-row:1/3;align-self:center;border:1px solid #36424a;border-radius:99px;padding:5px 7px;font:800 8px var(--qx-font);font-style:normal;color:#9daab3}
  .screen{flex:1;min-height:0;margin:0 10px;border:1px solid #29343c;border-radius:14px;overflow:hidden;background:#0d1115}.screen svg{width:100%;height:100%;font-family:var(--qx-font)}
  .grid line{stroke:#1c272e;stroke-width:1}.axes line,.tick{stroke:#697881;stroke-width:1.5}.trace,.ring,.shape,.arrow,.tangent,.radius{fill:none;stroke:#70d6b1;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}.trace{stroke-dasharray:700;animation:draw 4s ease-in-out infinite}.arrow,.tangent{stroke:#ffb36b;stroke-width:2.5}.before{stroke:#71808a}.after{stroke:#70d6b1;animation:pulse 3s ease-in-out infinite}.traveller{fill:#ffb36b;filter:drop-shadow(0 0 7px #ffb36b)}.orbit{transform-origin:160px 154px;animation:orbit 5s linear infinite}.follow{animation:follow 4s ease-in-out infinite}.linewalk{animation:linewalk 4s ease-in-out infinite}.curvewalk{animation:curvewalk 4s ease-in-out infinite}text{fill:#82919a;text-anchor:middle;font-size:9px;font-weight:750}
  figcaption{padding:9px 12px 11px;text-align:center;font-size:8px;color:#87959d}figcaption b{color:#70d6b1;margin-right:5px}
  @keyframes draw{0%{stroke-dashoffset:700}55%,100%{stroke-dashoffset:0}}@keyframes pulse{50%{opacity:.35}}@keyframes orbit{to{transform:rotate(360deg)}}@keyframes follow{50%{transform:translate(202px,-186px)}}@keyframes linewalk{50%{transform:translateX(200px)}}@keyframes curvewalk{50%{transform:translate(72px,-54px)}}
  @media(prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
