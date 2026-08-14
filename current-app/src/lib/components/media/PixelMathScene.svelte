<script>
  export let spec = {};
  $: kind = spec.kind || 'number-line';
  $: title = spec.title || ({coordinate:'Grid quest',vector:'Vector voyage','number-line':'Number-line walk',matrix:'Matrix machine',derivative:'Slope mountain'}[kind] || 'Maths micro-world');
</script>

<figure class="pixel" aria-label={`${title}. Pixel-art mathematical scene.`}>
  <header><span>16-BIT CONCEPT SCENE</span><strong>{title}</strong><i>×1</i></header>
  <div class="viewport">
    <svg viewBox="0 0 320 320" shape-rendering="crispEdges" role="img" aria-label={`Pixel-art ${kind} scene`}>
      <rect class="sky" x="0" y="0" width="320" height="320"/><circle class="sun" cx="266" cy="54" r="22"/>
      <path class="cloud" d="M28 56H48V44H72V52H88V68H28ZM196 91H218V76H244V86H260V102H196Z"/>
      {#if kind === 'matrix'}
        <path class="ground" d="M0 248H320V320H0Z"/><path class="machine" d="M57 100H151V222H57ZM178 76H274V222H178Z"/><g class="lights">{#each [78,110,142] as y}<rect x="76" y={y} width="18" height="18"/><rect x="111" y={y} width="18" height="18"/><rect x="199" y={y} width="18" height="18"/><rect x="234" y={y} width="18" height="18"/>{/each}</g><path class="beam" d="M151 145H178V178H151Z"/>
      {:else}
        <path class="mountain" d="M0 245L58 174L92 205L151 110L205 180L243 139L320 222V320H0Z"/>
        <path class="route" d="M28 255H72V227H108V202H147V169H190V142H236V111H287"/>
        <g class="hero"><rect x="31" y="221" width="20" height="24"/><rect x="35" y="213" width="12" height="9"/><rect x="27" y="227" width="4" height="11"/><rect x="51" y="227" width="4" height="11"/></g>
        {#each [[72,217],[108,192],[147,159],[190,132],[236,101]] as point,index}<rect class="flag" x={point[0]} y={point[1]-20} width="4" height="20"/><rect class="flagcloth" x={point[0]+4} y={point[1]-20} width="13" height="9"/><text x={point[0]+10} y={point[1]-12}>{index+1}</text>{/each}
      {/if}
      <text class="caption" x="160" y="297">ONE STEP • ONE RULE • ONE RESULT</text>
    </svg>
  </div>
  <figcaption>Pixel clarity for the underlying idea.</figcaption>
</figure>

<style>
  .pixel{width:min(100%,340px);height:100%;aspect-ratio:1;margin:auto;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;border:3px solid #292521;border-radius:8px;background:#f2ddaa;color:#292521;box-shadow:8px 8px 0 color-mix(in srgb,var(--qx-accent) 24%,#292521)}
  header{display:grid;grid-template-columns:1fr auto;gap:2px 8px;padding:11px 12px 8px;border-bottom:3px solid #292521;background:#f7e8bd}header span{font:900 8px var(--qx-font);letter-spacing:.12em;color:#8a4f33}header strong{font:900 15px var(--qx-font)}header i{grid-column:2;grid-row:1/3;align-self:center;font:900 9px var(--qx-font);font-style:normal}
  .viewport{flex:1;min-height:0;margin:8px;border:3px solid #292521;background:#86c7c3}.viewport svg{display:block;width:100%;height:100%;font-family:monospace}.sky{fill:#86c7c3}.sun{fill:#f6cf57}.cloud{fill:#fff0cf}.ground{fill:#446b4d}.mountain{fill:#527a58}.route{fill:none;stroke:#f2ddaa;stroke-width:8}.hero{fill:#d95c4b;animation:hop 1.4s steps(2,end) infinite}.flag{fill:#292521}.flagcloth,.lights rect{fill:#f6cf57}.lights rect:nth-child(2n){fill:#d95c4b}.machine{fill:#6d5b78;stroke:#292521;stroke-width:5}.beam{fill:#f6cf57;animation:blink 1s steps(2,end) infinite}.caption{fill:#fff0cf;font-size:9px;font-weight:900;text-anchor:middle}.flagcloth+text{fill:#292521;font-size:7px;text-anchor:middle;font-weight:900}figcaption{padding:0 10px 9px;text-align:center;font:900 8px var(--qx-font);letter-spacing:.05em}
  @keyframes hop{50%{transform:translateY(-8px)}}@keyframes blink{50%{fill:#fff0cf}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
