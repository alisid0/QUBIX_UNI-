<script>
  export let spec = {};

  const SIZE = 360;
  const PAD = 34;
  const bits = [8, 4, 2, 1];
  const particles = [
    [45, 68], [102, 114], [164, 61], [226, 105], [294, 66],
    [66, 190], [139, 171], [212, 206], [287, 166], [115, 270], [244, 274]
  ];

  const TITLES = {
    'number-line': 'Number line', measure: 'Area builder', uncertainty: 'Measurement window',
    'line-types': 'Line family', scale: 'Powers of ten', linear: 'Straight-line studio',
    'two-lines': 'Line relationships', vector: 'Vector builder', force: 'Force and motion',
    'force-balance': 'Net-force balance', 'force-pair': 'Action–reaction pair',
    rate: 'Rate laboratory', function: 'Function machine', inverse: 'Inverse machine',
    log: 'Exponent mirror', binary: 'Binary switches', logic: 'Logic gate', matrix: 'Matrix transform',
    circuit: 'Ohm’s law bench', 'circuit-pair': 'Resistance network', capacitor: 'Capacitor bench', thermal: 'Particle temperature', expansion: 'Thermal expansion',
    gas: 'Gas chamber', phase: 'State of matter', trig: 'Unit-circle studio', optics: 'Ray laboratory',
    mole: 'Mole balance', balance: 'Equation balancer', limiting: 'Reaction builder',
    'binary-add': 'Binary adder', loop: 'Loop counter', branch: 'Decision branch',
    pipeline: 'System throughput', memory: 'Memory inspector', reliability: 'Reliability builder',
    'matrix-index': 'Matrix address', energy: 'Energy account', ratio: 'Ratio builder',
    lens: 'Lens laboratory', limit: 'Limit explorer', derivative: 'Slope microscope'
  };

  const initialPrimary = spec.primary ?? 2;
  const initialSecondary = spec.secondary ?? 1;

  let primary = spec.primary ?? 2;
  let secondary = spec.secondary ?? 1;
  let toggles = [false, false, false, false];

  $: kind = spec.kind || 'number-line';
  $: title = spec.title || TITLES[kind] || 'Concept explorer';
  $: gate = spec.gate || 'AND';
  $: gateOut = gate === 'OR'
    ? toggles[0] || toggles[1]
    : gate === 'XOR'
      ? toggles[0] !== toggles[1]
      : toggles[0] && toggles[1];
  $: bitValue = bits.reduce((sum, weight, i) => sum + (toggles[i] ? weight : 0), 0);
  $: radians = primary * Math.PI / 180;
  $: functionValue = kind === 'function'
    ? (spec.fn === 'quadratic' ? primary * primary : spec.fn === 'exponential' ? 2 ** primary : spec.fn === 'decay' ? 0.5 ** primary : 2 * primary + 1)
    : 0;
  $: lineY1 = clamp(SIZE - PAD - ((secondary + primary * -5) + 6) / 12 * (SIZE - PAD * 2), PAD, SIZE - PAD);
  $: lineY2 = clamp(SIZE - PAD - ((secondary + primary * 5) + 6) / 12 * (SIZE - PAD * 2), PAD, SIZE - PAD);
  $: circuitCurrent = primary / secondary;
  $: acceleration = primary / secondary;
  $: gasPressure = (primary * 100) / secondary;
  $: moleAmount = primary / secondary;
  $: limitX = primary / 100;
  $: limitY = limitX + 2;
  $: derivativeY = primary * primary;
  $: derivativeSlope = 2 * primary;
  $: equivalentResistance = spec.mode === 'parallel' ? 1 / (1 / primary + 1 / secondary) : primary + secondary;
  $: phase = primary < 0 ? 'solid' : primary < 100 ? 'liquid' : 'gas';
  $: balanced = Number(primary) === 2 && Number(secondary) === 1;
  $: reactionPairs = Math.min(primary, secondary);
  $: lensDistance = primary > secondary ? (primary * secondary) / (primary - secondary) : Infinity;
  $: netForce = secondary - primary;
  $: capacitorCharge = primary * secondary;
  $: usefulEnergy = Math.min(primary, secondary);
  $: reliabilityValue = 100 * (1 - (1 - secondary / 100) ** primary);
  $: expansionAmount = 100 + primary * secondary / 100;

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function fmt(value, digits = 1) {
    return Number(value).toFixed(digits).replace(/\.0$/, '');
  }
  function toggle(index) {
    toggles[index] = !toggles[index];
    toggles = [...toggles];
  }
  function reset() {
    primary = initialPrimary;
    secondary = initialSecondary;
    toggles = [false, false, false, false];
  }
  function plotX(value, min = -5, max = 5) { return PAD + ((value - min) / (max - min)) * (SIZE - PAD * 2); }
  function plotY(value, min = -6, max = 6) { return SIZE - PAD - ((value - min) / (max - min)) * (SIZE - PAD * 2); }
  function curvePath(fn, min = -5, max = 5, ymin = -6, ymax = 6) {
    let path = '';
    for (let i = 0; i <= 80; i++) {
      const x = min + (max - min) * i / 80;
      const y = fn(x);
      path += `${i ? 'L' : 'M'}${plotX(x, min, max).toFixed(1)},${plotY(clamp(y, ymin, ymax), ymin, ymax).toFixed(1)} `;
    }
    return path;
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="explorer" role="group" aria-label="Interactive concept explorer" on:pointerdown|stopPropagation on:mousedown|stopPropagation on:touchstart|stopPropagation on:touchmove|stopPropagation on:keydown|stopPropagation>
  <div class="explorer-head">
    <div class="title-lockup"><span>INTERACTIVE MODEL</span><strong>{title}</strong></div>
    <button class="reset" on:click={reset} aria-label={`Reset ${title}`}>Reset</button>
  </div>
  <div class="prompt"><span aria-hidden="true"></span>{spec.prompt || 'Change the controls and watch what follows.'}</div>
  <div class="canvas">

  {#if kind === 'number-line'}
    <svg viewBox="0 0 360 150" role="img" aria-label="Interactive number line">
      <defs><marker id="nl-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" /></marker></defs>
      <line x1="28" y1="76" x2="332" y2="76" class="accent-line" marker-start="url(#nl-arrow)" marker-end="url(#nl-arrow)" />
      {#each [-5,-4,-3,-2,-1,0,1,2,3,4,5] as n}
        <line x1={180 + n * 27} y1="68" x2={180 + n * 27} y2="84" class="tick" />
        <text x={180 + n * 27} y="104" text-anchor="middle">{n}</text>
      {/each}
      <circle cx={180 + primary * 27} cy="76" r="8" class="point" />
    </svg>
    <label>Position <input type="range" min="-5" max="5" step={spec.step || 1} bind:value={primary} /></label>
    <div class="readout">{primary > 0 ? `${primary} is right of zero` : primary < 0 ? `${primary} is left of zero` : 'Zero is the origin'}</div>

  {:else if kind === 'measure'}
    <div class="measure-grid" style={`grid-template-columns:repeat(${primary}, 1fr);grid-template-rows:repeat(${secondary}, 1fr)`}>
      {#each Array(primary * secondary) as _}<i></i>{/each}
    </div>
    <div class="controls two">
      <label>Length {primary} m <input type="range" min="1" max="8" step="1" bind:value={primary} /></label>
      <label>Width {secondary} m <input type="range" min="1" max="6" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">Area = {primary} × {secondary} = {primary * secondary} m²</div>

  {:else if kind === 'uncertainty'}
    <div class="ruler"><span style={`left:${clamp(primary,0,100)}%`}></span>{#each [0,10,20,30,40,50,60,70,80,90,100] as n}<i style={`left:${n}%`}></i>{/each}</div>
    <div class="controls two">
      <label>Reading {primary} <input type="range" min="0" max="100" step={secondary} bind:value={primary} /></label>
      <label>Resolution {secondary} <input type="range" min="1" max="10" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">Reported as {primary} ± {fmt(secondary / 2)} units.</div>

  {:else if kind === 'line-types'}
    <svg viewBox="0 0 360 180" role="img" aria-label="Segment, ray, or line">
      <defs><marker id="lt-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" /></marker></defs>
      <line x1="65" y1="90" x2="295" y2="90" class="accent-line" marker-start={primary === 2 ? 'url(#lt-arrow)' : ''} marker-end={primary >= 1 ? 'url(#lt-arrow)' : ''} />
      {#if primary < 2}<circle cx="65" cy="90" r="7" class="point" />{/if}{#if primary === 0}<circle cx="295" cy="90" r="7" class="point" />{/if}
    </svg>
    <div class="choice-row"><button class:on={primary===0} on:click={() => primary=0}>Segment</button><button class:on={primary===1} on:click={() => primary=1}>Ray</button><button class:on={primary===2} on:click={() => primary=2}>Line</button></div>
    <div class="readout">{primary === 0 ? 'Two endpoints.' : primary === 1 ? 'One endpoint, one endless direction.' : 'No endpoints; both directions continue.'}</div>

  {:else if kind === 'scale'}
    <div class="power"><span>10</span><sup>{primary}</sup></div>
    <div class="scale-value">{primary >= 0 ? (10 ** primary).toLocaleString() : fmt(10 ** primary, Math.abs(primary))}</div>
    <label>Order of magnitude <input type="range" min="-6" max="9" step="1" bind:value={primary} /></label>
    <div class="readout">Each step changes the scale by a factor of ten.</div>

  {:else if kind === 'linear'}
    <svg viewBox="0 0 {SIZE} {SIZE}" role="img" aria-label="Adjustable straight-line graph" class="graph">
      <line x1={PAD} y1={SIZE/2} x2={SIZE-PAD} y2={SIZE/2} class="axis" />
      <line x1={SIZE/2} y1={PAD} x2={SIZE/2} y2={SIZE-PAD} class="axis" />
      <line x1={PAD} y1={lineY1} x2={SIZE-PAD} y2={lineY2} class="accent-line" />
    </svg>
    <div class="controls two">
      <label>Gradient m <input type="range" min="-1" max="1" step="0.1" bind:value={primary} /></label>
      <label>Intercept c <input type="range" min="-4" max="4" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">y = {fmt(primary)}x {secondary < 0 ? '−' : '+'} {Math.abs(secondary)}</div>

  {:else if kind === 'two-lines'}
    <svg viewBox="0 0 360 240" role="img" aria-label={`${spec.mode} lines`}>
      <g transform={`rotate(${-primary} 180 120)`}>
        <line x1="45" y1="85" x2="315" y2="85" class="accent-line" />
        <line x1="45" y1="155" x2="315" y2="155" class="second-line" transform={spec.mode === 'perpendicular' ? 'rotate(90 180 120)' : ''} />
      </g>
    </svg>
    <label>Turn the pair <input type="range" min="-70" max="70" step="1" bind:value={primary} /></label>
    <div class="readout">{spec.mode === 'perpendicular' ? 'The angle stays 90°.' : 'The lines keep the same gradient and never meet.'}</div>

  {:else if kind === 'vector'}
    <svg viewBox="0 0 360 220" role="img" aria-label="Adjustable vector">
      <defs><marker id="v-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" /></marker></defs>
      <line x1="180" y1="190" x2={180 + primary * 24} y2={190 - secondary * 24} class="accent-line" marker-end="url(#v-arrow)" />
      <line x1="180" y1="190" x2={180 + primary * 24} y2="190" class="guide" />
      <line x1={180 + primary * 24} y1="190" x2={180 + primary * 24} y2={190 - secondary * 24} class="guide" />
    </svg>
    <div class="controls two">
      <label>Horizontal <input type="range" min="-5" max="5" step="1" bind:value={primary} /></label>
      <label>Vertical <input type="range" min="-5" max="5" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">Vector ({primary}, {secondary}) · length {fmt(Math.hypot(primary, secondary))}</div>

  {:else if kind === 'force'}
    <div class="force-stage"><div class="block" style={`transform:translateX(${clamp(acceleration * 12, 0, 150)}px)`}>m</div><div class="force-arrow" style={`width:${50 + primary * 4}px`}>F →</div></div>
    <div class="controls two">
      <label>Force {primary} N <input type="range" min="1" max="20" step="1" bind:value={primary} /></label>
      <label>Mass {secondary} kg <input type="range" min="1" max="10" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">Acceleration = F ÷ m = {fmt(acceleration)} m/s²</div>

  {:else if kind === 'force-balance'}
    <div class="balance-stage"><span class="left-force" style={`width:${primary*7}px`}>← {primary} N</span><div class="balance-block">object</div><span class="right-force" style={`width:${secondary*7}px`}>{secondary} N →</span></div>
    <div class="controls two"><label>Left force <input type="range" min="0" max="20" step="1" bind:value={primary} /></label><label>Right force <input type="range" min="0" max="20" step="1" bind:value={secondary} /></label></div>
    <div class="readout">{netForce === 0 ? 'Net force = 0 N. Motion does not change.' : `Net force = ${Math.abs(netForce)} N ${netForce > 0 ? 'right' : 'left'}. The object accelerates.`}</div>

  {:else if kind === 'force-pair'}
    <div class="pair-stage"><span style={`width:${70+primary*6}px`}>← {primary} N</span><div><i>A</i><i>B</i></div><span style={`width:${70+primary*6}px`}>{primary} N →</span></div>
    <label>Interaction strength {primary} N <input type="range" min="1" max="20" step="1" bind:value={primary} /></label>
    <div class="readout">Equal size, opposite direction, acting on different objects.</div>

  {:else if kind === 'rate'}
    <div class="rate-stage"><div class="track"><div class="runner" style={`left:${clamp(primary / secondary * 18, 0, 88)}%`}>●</div></div></div>
    <div class="controls two">
      <label>{spec.primaryLabel || 'Distance'} {primary}{spec.primaryUnit || ' m'} <input type="range" min="1" max={spec.primaryMax || 20} bind:value={primary} /></label>
      <label>{spec.secondaryLabel || 'Time'} {secondary}{spec.secondaryUnit || ' s'} <input type="range" min="1" max={spec.secondaryMax || 10} bind:value={secondary} /></label>
    </div>
    <div class="readout">{spec.resultLabel || 'Rate'} = {spec.primaryLabel?.toLowerCase() || 'distance'} ÷ {spec.secondaryLabel?.toLowerCase() || 'time'} = {fmt(primary / secondary)}{spec.resultUnit || ' m/s'}</div>

  {:else if kind === 'function'}
    <div class="machine"><span>{fmt(primary)}</span><span class="machine-box">{spec.fn === 'quadratic' ? 'square' : spec.fn === 'exponential' ? '2 to the power' : spec.fn === 'decay' ? 'halve each step' : '×2, then +1'}</span><span>{fmt(functionValue, 2)}</span></div>
    <label>Input x <input type="range" min={spec.fn === 'exponential' ? -3 : -4} max="4" step="0.5" bind:value={primary} /></label>
    <div class="readout">Every input produces exactly one output.</div>

  {:else if kind === 'inverse'}
    <div class="machine"><span>{fmt(primary)}</span><span class="machine-box">×2, then +3</span><span>{fmt(primary*2+3)}</span><span class="machine-box inverse-box">−3, then ÷2</span><span>{fmt(primary)}</span></div>
    <label>Starting value <input type="range" min="-5" max="8" step="1" bind:value={primary} /></label>
    <div class="readout">The inverse undoes the original function in reverse order.</div>

  {:else if kind === 'log'}
    <div class="log-stack"><span>2<sup>{primary}</sup> = {2 ** primary}</span><span>log₂({2 ** primary}) = {primary}</span></div>
    <label>Power <input type="range" min="0" max="10" step="1" bind:value={primary} /></label>
    <div class="readout">A logarithm asks for the missing exponent.</div>

  {:else if kind === 'binary'}
    <div class="bits" role="group" aria-label="Four binary switches">
      {#each bits as weight, i}
        <button class:on={toggles[i]} on:click={() => toggle(i)} aria-pressed={toggles[i]}><span>{toggles[i] ? 1 : 0}</span><small>{weight}</small></button>
      {/each}
    </div>
    <div class="readout">{toggles.map(v => v ? '1' : '0').join('')} in binary = {bitValue} in decimal</div>

  {:else if kind === 'logic'}
    <div class="logic-row">
      <button class:on={toggles[0]} on:click={() => toggle(0)} aria-pressed={toggles[0]}>A: {toggles[0] ? 1 : 0}</button>
      <div class="gate">{gate}</div>
      <button class:on={toggles[1]} on:click={() => toggle(1)} aria-pressed={toggles[1]}>B: {toggles[1] ? 1 : 0}</button>
      <div class:lit={gateOut} class="output">{gateOut ? 1 : 0}</div>
    </div>
    <div class="readout">Try all four input combinations.</div>

  {:else if kind === 'matrix'}
    <svg viewBox="0 0 360 250" role="img" aria-label="A square rotated by a matrix">
      <g transform={`translate(180 125) rotate(${-primary})`}><rect x="-58" y="-58" width="116" height="116" class="shape" /></g>
      <line x1="30" y1="125" x2="330" y2="125" class="axis" /><line x1="180" y1="18" x2="180" y2="232" class="axis" />
    </svg>
    <label>Rotation {primary}° <input type="range" min="-180" max="180" step="5" bind:value={primary} /></label>
    <div class="readout">The matrix changes every point but preserves the square.</div>

  {:else if kind === 'matrix-index'}
    <div class="matrix-grid">{#each Array(9) as _, i}<span class:selected={Math.floor(i/3)+1===Number(primary) && i%3+1===Number(secondary)}>a<sub>{Math.floor(i/3)+1}{i%3+1}</sub></span>{/each}</div>
    <div class="controls two"><label>Row {primary} <input type="range" min="1" max="3" step="1" bind:value={primary} /></label><label>Column {secondary} <input type="range" min="1" max="3" step="1" bind:value={secondary} /></label></div>
    <div class="readout">Selected address: row {primary}, column {secondary} — written a<sub>{primary}{secondary}</sub>.</div>

  {:else if kind === 'circuit'}
    <div class="circuit"><span class="battery">{primary} V</span><span class="wire"></span><span class="resistor">{secondary} Ω</span><span class="wire"></span></div>
    <div class="controls two">
      <label>Voltage <input type="range" min="1" max="12" bind:value={primary} /></label>
      <label>Resistance <input type="range" min="1" max="12" bind:value={secondary} /></label>
    </div>
    <div class="readout">Current = V ÷ R = {fmt(circuitCurrent)} A</div>

  {:else if kind === 'circuit-pair'}
    <div class:parallel={spec.mode === 'parallel'} class="resistor-pair"><span>{primary} Ω</span><span>{secondary} Ω</span></div>
    <div class="controls two">
      <label>R₁ <input type="range" min="1" max="12" step="1" bind:value={primary} /></label>
      <label>R₂ <input type="range" min="1" max="12" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">{spec.mode === 'parallel' ? 'Parallel' : 'Series'} equivalent resistance = {fmt(equivalentResistance, 2)} Ω</div>

  {:else if kind === 'capacitor'}
    <div class="capacitor-stage"><span>+</span><i style={`box-shadow:0 0 22px ${Math.min(capacitorCharge/20,18)}px var(--qx-accent-soft)`}></i><i></i><span>−</span></div>
    <div class="controls two"><label>Voltage {primary} V <input type="range" min="1" max="12" step="1" bind:value={primary} /></label><label>Capacitance {secondary} F <input type="range" min="1" max="10" step="1" bind:value={secondary} /></label></div>
    <div class="readout">Stored charge Q = CV = {capacitorCharge} C.</div>

  {:else if kind === 'thermal'}
    <svg viewBox="0 0 360 310" role="img" aria-label="Particles responding to temperature" class="particle-box">
      {#each particles as p, i}<circle cx={p[0] + Math.sin(i * 2.3) * primary / 18} cy={p[1] + Math.cos(i * 1.7) * primary / 18} r="8" class="particle" />{/each}
    </svg>
    <label>Temperature {primary} K <input type="range" min="10" max="600" step="10" bind:value={primary} /></label>
    <div class="readout">Higher temperature means faster average particle motion.</div>

  {:else if kind === 'expansion'}
    <div class="expansion-stage"><span style={`width:${clamp(expansionAmount,100,280)}px`}></span><i></i></div>
    <div class="controls two"><label>Temperature rise {primary}°C <input type="range" min="0" max="200" step="5" bind:value={primary} /></label><label>Expansion factor {secondary} <input type="range" min="1" max="8" step="1" bind:value={secondary} /></label></div>
    <div class="readout">The material lengthens from 100 to {fmt(expansionAmount, 1)} relative units.</div>

  {:else if kind === 'gas'}
    <div class="gas-box" style={`width:${160 + secondary * 10}px`}><span>{primary} K</span>{#each particles.slice(0,7) as p}<i style={`left:${(p[0] % 135) + 8}px;top:${(p[1] % 85) + 8}px`}></i>{/each}</div>
    <div class="controls two">
      <label>Temperature <input type="range" min="100" max="600" step="20" bind:value={primary} /></label>
      <label>Volume <input type="range" min="2" max="12" bind:value={secondary} /></label>
    </div>
    <div class="readout">Relative pressure = {fmt(gasPressure)} · hotter or smaller means higher.</div>

  {:else if kind === 'phase'}
    <div class={`phase-stage ${phase}`}>
      {#each particles.slice(0,9) as p, i}<i style={`left:${phase==='solid' ? 64+(i%3)*52 : (p[0]%210)+35}px;top:${phase==='solid' ? 28+Math.floor(i/3)*52 : (p[1]%125)+18}px`}></i>{/each}
    </div>
    <label>Temperature {primary}°C <input type="range" min="-40" max="140" step="5" bind:value={primary} /></label>
    <div class="readout">State: {phase}. During a change of state, energy rearranges particles.</div>

  {:else if kind === 'energy'}
    <div class="energy-bar"><span style={`width:${primary ? usefulEnergy/primary*100 : 0}%`}>useful</span><i style={`width:${primary ? (primary-usefulEnergy)/primary*100 : 0}%`}>lost</i></div>
    <div class="controls two"><label>Energy in {primary} J <input type="range" min="1" max="100" step="1" bind:value={primary} /></label><label>Useful out {secondary} J <input type="range" min="0" max={primary} step="1" bind:value={secondary} /></label></div>
    <div class="readout">{usefulEnergy} J useful + {primary-usefulEnergy} J transferred elsewhere = {primary} J conserved.</div>

  {:else if kind === 'trig'}
    <svg viewBox="0 0 360 270" role="img" aria-label="Adjustable point on a unit circle">
      <circle cx="180" cy="135" r="92" class="circle-outline" /><line x1="65" y1="135" x2="295" y2="135" class="axis" /><line x1="180" y1="25" x2="180" y2="245" class="axis" />
      <line x1="180" y1="135" x2={180 + 92*Math.cos(radians)} y2={135 - 92*Math.sin(radians)} class="accent-line" />
      <line x1={180 + 92*Math.cos(radians)} y1="135" x2={180 + 92*Math.cos(radians)} y2={135 - 92*Math.sin(radians)} class="guide" />
      <circle cx={180 + 92*Math.cos(radians)} cy={135 - 92*Math.sin(radians)} r="7" class="point" />
    </svg>
    <label>Angle {primary}° <input type="range" min="0" max="360" step="1" bind:value={primary} /></label>
    <div class="readout">cos = {fmt(Math.cos(radians), 2)} · sin = {fmt(Math.sin(radians), 2)}</div>

  {:else if kind === 'optics'}
    <svg viewBox="0 0 360 250" role="img" aria-label="Adjustable light ray at a boundary">
      <line x1="28" y1="125" x2="332" y2="125" class="boundary" /><line x1="180" y1="18" x2="180" y2="232" class="guide" />
      <line x1={180 - 95*Math.sin(radians)} y1={125 - 95*Math.cos(radians)} x2="180" y2="125" class="accent-line" />
      {#if spec.mode === 'reflection'}
        <line x1="180" y1="125" x2={180 + 95*Math.sin(radians)} y2={125 - 95*Math.cos(radians)} class="accent-line" />
      {:else}
        <line x1="180" y1="125" x2={180 + 95*Math.sin(Math.asin(Math.sin(radians)/1.5))} y2={125 + 95*Math.cos(Math.asin(Math.sin(radians)/1.5))} class="accent-line" />
      {/if}
    </svg>
    <label>Incident angle {primary}° <input type="range" min="0" max="75" step="1" bind:value={primary} /></label>
    <div class="readout">{spec.mode === 'reflection' ? `Outgoing angle = ${primary}°` : 'Entering glass bends the ray toward the normal.'}</div>

  {:else if kind === 'mole'}
    <div class="balance"><span>{primary} g</span><span>÷</span><span>{secondary} g/mol</span></div>
    <div class="controls two">
      <label>Mass <input type="range" min="1" max="100" bind:value={primary} /></label>
      <label>Molar mass <input type="range" min="1" max="50" bind:value={secondary} /></label>
    </div>
    <div class="readout">Amount = mass ÷ molar mass = {fmt(moleAmount, 2)} mol</div>

  {:else if kind === 'balance'}
    <div class="equation"><span>{primary} H₂</span><b>+</b><span>{secondary} O₂</span><b>→</b><span>2 H₂O</span></div>
    <div class="controls two">
      <label>H₂ coefficient <input type="range" min="1" max="4" step="1" bind:value={primary} /></label>
      <label>O₂ coefficient <input type="range" min="1" max="4" step="1" bind:value={secondary} /></label>
    </div>
    <div class:success={balanced} class="readout">{balanced ? 'Balanced: 4 H and 2 O atoms on each side.' : `Left: ${primary*2} H, ${secondary*2} O · Right: 4 H, 2 O`}</div>

  {:else if kind === 'limiting'}
    <div class="reaction-bin"><span class="a">A × {primary}</span><b>+</b><span class="b">B × {secondary}</span><b>→</b><span>AB × {reactionPairs}</span></div>
    <div class="controls two">
      <label>Reactant A <input type="range" min="0" max="10" step="1" bind:value={primary} /></label>
      <label>Reactant B <input type="range" min="0" max="10" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">{primary === secondary ? 'Neither is left over.' : primary < secondary ? `A limits the reaction; ${secondary-primary} B left.` : `B limits the reaction; ${primary-secondary} A left.`}</div>

  {:else if kind === 'binary-add'}
    <div class="binary-sum"><span>{Number(primary).toString(2).padStart(4,'0')}</span><b>+</b><span>{Number(secondary).toString(2).padStart(4,'0')}</span><b>=</b><span>{(Number(primary)+Number(secondary)).toString(2).padStart(5,'0')}</span></div>
    <div class="controls two">
      <label>First number <input type="range" min="0" max="15" step="1" bind:value={primary} /></label>
      <label>Second number <input type="range" min="0" max="15" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">{primary} + {secondary} = {Number(primary)+Number(secondary)}</div>

  {:else if kind === 'loop'}
    <div class="loop-row">{#each Array(primary) as _, i}<span>{i+1}</span>{/each}</div>
    <label>Iterations {primary} <input type="range" min="1" max="12" step="1" bind:value={primary} /></label>
    <div class="readout">One instruction, repeated {primary} times.</div>

  {:else if kind === 'branch'}
    <div class="branch-flow"><span>Input {primary}</span><b>→</b><span class:on={primary >= secondary}>{primary >= secondary ? 'YES path' : 'NO path'}</span></div>
    <label>Input value <input type="range" min="0" max="100" step="1" bind:value={primary} /></label>
    <div class="readout">Condition: input ≥ {secondary}. Only one branch runs.</div>

  {:else if kind === 'pipeline'}
    <div class="pipeline"><span>Demand<br>{primary}/s</span><b>→</b><span class:bottleneck={secondary < primary}>Capacity<br>{secondary}/s</span><b>→</b><span>Output<br>{Math.min(primary,secondary)}/s</span></div>
    <div class="controls two">
      <label>Demand <input type="range" min="1" max="20" step="1" bind:value={primary} /></label>
      <label>Capacity <input type="range" min="1" max="20" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">{primary > secondary ? `Queue grows by ${primary-secondary} each second.` : 'Capacity can keep up with demand.'}</div>

  {:else if kind === 'memory'}
    <div class="memory-grid">{#each Array(8) as _, i}<span class:active={i===Number(primary)}><b>{i.toString(2).padStart(3,'0')}</b><i>{i===Number(primary) ? secondary : '—'}</i></span>{/each}</div>
    <div class="controls two"><label>Address <input type="range" min="0" max="7" step="1" bind:value={primary} /></label><label>Stored value <input type="range" min="0" max="255" step="1" bind:value={secondary} /></label></div>
    <div class="readout">Address {Number(primary).toString(2).padStart(3,'0')} selects one location containing {secondary}.</div>

  {:else if kind === 'reliability'}
    <div class="redundancy-row">{#each Array(primary) as _}<span></span>{/each}</div>
    <div class="controls two"><label>Parallel copies {primary} <input type="range" min="1" max="5" step="1" bind:value={primary} /></label><label>Each succeeds {secondary}% <input type="range" min="80" max="99" step="1" bind:value={secondary} /></label></div>
    <div class="readout">At least one works: {fmt(reliabilityValue, 2)}%.</div>

  {:else if kind === 'ratio'}
    <div class="ratio-cups"><span style={`flex:${primary}`}>{primary}</span><span style={`flex:${secondary}`}>{secondary}</span></div>
    <div class="controls two"><label>{spec.primaryLabel || 'First amount'} <input type="range" min="1" max={spec.primaryMax || 12} step="1" bind:value={primary} /></label><label>{spec.secondaryLabel || 'Second amount'} <input type="range" min="1" max={spec.secondaryMax || 12} step="1" bind:value={secondary} /></label></div>
    <div class="readout">{spec.resultLabel || 'Ratio'} = {primary} ÷ {secondary} = {fmt(primary/secondary, 2)}{spec.resultUnit || ''}.</div>

  {:else if kind === 'lens'}
    <div class="lens-stage"><span class="object" style={`left:${clamp(45-primary*2,5,38)}%`}>↑</span><i></i><span class="image" style={`right:${Number.isFinite(lensDistance) ? clamp(45-lensDistance*2,5,38) : 5}%`}>↓</span></div>
    <div class="controls two">
      <label>Object distance <input type="range" min="3" max="30" step="1" bind:value={primary} /></label>
      <label>Focal length <input type="range" min="2" max="12" step="1" bind:value={secondary} /></label>
    </div>
    <div class="readout">{primary > secondary ? `Image distance = ${fmt(lensDistance)} units.` : 'Inside the focal length: the image is virtual.'}</div>

  {:else if kind === 'limit'}
    <svg viewBox="0 0 {SIZE} {SIZE}" role="img" aria-label="A point approaching a hole in a graph" class="graph">
      <line x1={PAD} y1={SIZE-PAD} x2={SIZE-PAD} y2={SIZE-PAD} class="axis" /><line x1={PAD} y1={PAD} x2={PAD} y2={SIZE-PAD} class="axis" />
      <path d={curvePath(x => x + 2, -1, 5, 0, 7)} class="curve" />
      <circle cx={plotX(2,-1,5)} cy={plotY(4,0,7)} r="7" class="hole" />
      <circle cx={plotX(limitX,-1,5)} cy={plotY(limitY,0,7)} r="7" class="point" />
    </svg>
    <label>x approaches 2 <input type="range" min="-100" max="490" step="1" bind:value={primary} /></label>
    <div class="readout">x = {fmt(limitX,2)} · output approaches {fmt(limitY,2)}</div>

  {:else if kind === 'derivative'}
    <svg viewBox="0 0 {SIZE} {SIZE}" role="img" aria-label="A tangent moving along a curve" class="graph">
      <line x1={PAD} y1={SIZE-PAD} x2={SIZE-PAD} y2={SIZE-PAD} class="axis" /><line x1={SIZE/2} y1={PAD} x2={SIZE/2} y2={SIZE-PAD} class="axis" />
      <path d={curvePath(x => x*x, -4,4,-1,16)} class="curve" />
      <line x1={plotX(primary-1,-4,4)} y1={plotY(derivativeY-derivativeSlope,-1,16)} x2={plotX(primary+1,-4,4)} y2={plotY(derivativeY+derivativeSlope,-1,16)} class="tangent" />
      <circle cx={plotX(primary,-4,4)} cy={plotY(derivativeY,-1,16)} r="7" class="point" />
    </svg>
    <label>Point x = {primary} <input type="range" min="-3" max="3" step="0.1" bind:value={primary} /></label>
    <div class="readout">For y = x², the local slope here is {fmt(derivativeSlope)}.</div>
  {/if}
  </div>
  <div class="interaction-hint"><span aria-hidden="true">↔</span> Change one control at a time and compare the result.</div>
</div>

<style>
  .explorer { width:100%; min-height:400px; box-sizing:border-box; display:flex; flex-direction:column; overflow:hidden; border:1px solid color-mix(in srgb,var(--qx-accent) 24%,var(--qx-border-2)); border-radius:20px; background:linear-gradient(145deg,color-mix(in srgb,var(--qx-surface) 94%,var(--qx-accent) 6%),var(--qx-surface-2)); color:var(--qx-text); box-shadow:0 16px 42px rgba(24,22,17,.09),inset 0 1px 0 rgba(255,255,255,.55); user-select:none; touch-action:pan-y; }
  .explorer-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px 14px;border-bottom:1px solid color-mix(in srgb,var(--qx-border-2) 72%,transparent);background:linear-gradient(90deg,color-mix(in srgb,var(--qx-accent) 9%,transparent),transparent 65%)}
  .title-lockup{display:grid;gap:3px}.title-lockup span{font-size:9px;font-weight:900;letter-spacing:.16em;color:var(--qx-accent-text)}.title-lockup strong{font-size:18px;letter-spacing:-.025em;line-height:1.15}.reset{appearance:none;border:1px solid var(--qx-border-2);border-radius:999px;background:color-mix(in srgb,var(--qx-surface) 88%,transparent);color:var(--qx-text-dim);padding:7px 12px;font:800 10px var(--qx-font);letter-spacing:.04em;cursor:pointer;transition:transform .16s,border-color .16s,color .16s}.reset:hover{border-color:var(--qx-accent);color:var(--qx-accent-text);transform:translateY(-1px)}.reset:focus-visible{outline:3px solid var(--qx-accent-soft);outline-offset:2px}
  .prompt{display:flex;align-items:flex-start;justify-content:center;gap:8px;padding:11px 18px;color:var(--qx-text-dim);font-size:12px;font-weight:650;line-height:1.45;text-align:center}.prompt span{width:7px;height:7px;margin-top:5px;border-radius:50%;background:var(--qx-accent);box-shadow:0 0 0 5px var(--qx-accent-soft);flex:0 0 auto}
  .canvas{position:relative;display:flex;flex:1;flex-direction:column;justify-content:center;gap:15px;padding:18px;margin:0 12px;border:1px solid color-mix(in srgb,var(--qx-border-2) 78%,transparent);border-radius:16px;background:radial-gradient(circle at 15% 8%,color-mix(in srgb,var(--qx-accent) 8%,transparent),transparent 38%),linear-gradient(color-mix(in srgb,var(--qx-border) 35%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--qx-border) 35%,transparent) 1px,transparent 1px),var(--qx-surface);background-size:auto,24px 24px,24px 24px,auto;box-shadow:inset 0 1px 10px rgba(24,22,17,.035)}
  .interaction-hint{display:flex;align-items:center;justify-content:center;gap:7px;padding:11px 16px 13px;color:var(--qx-text-faint);font-size:10px;font-weight:700;letter-spacing:.015em}.interaction-hint span{font-size:15px;color:var(--qx-accent)}
  .readout{align-self:center;min-height:18px;padding:10px 15px;border:1px solid color-mix(in srgb,var(--qx-accent) 28%,var(--qx-border));border-radius:11px;background:color-mix(in srgb,var(--qx-accent-soft) 62%,var(--qx-surface));color:var(--qx-accent-text);font-size:12px;font-weight:800;line-height:1.35;text-align:center;box-shadow:0 5px 15px rgba(24,22,17,.045)}
  svg { width:100%; max-height:310px; overflow:visible; filter:drop-shadow(0 6px 10px rgba(24,22,17,.035)); } text { fill:var(--qx-text-dim); font:700 11px var(--qx-font); }
  label { display:grid; grid-template-columns:minmax(90px,auto) minmax(120px,1fr); align-items:center; gap:12px; padding:10px 12px; border:1px solid color-mix(in srgb,var(--qx-border-2) 82%,transparent); border-radius:11px; background:color-mix(in srgb,var(--qx-surface) 90%,transparent); color:var(--qx-text-dim); font-size:11px; font-weight:800; box-shadow:0 4px 12px rgba(24,22,17,.035); }
  input[type='range'] { appearance:none;width:100%;height:22px;margin:0;background:transparent;cursor:pointer; }
  input[type='range']::-webkit-slider-runnable-track{height:5px;border-radius:999px;background:linear-gradient(90deg,var(--qx-accent-soft),color-mix(in srgb,var(--qx-accent) 65%,var(--qx-border-2)));box-shadow:inset 0 1px 2px rgba(24,22,17,.14)}
  input[type='range']::-webkit-slider-thumb{appearance:none;width:18px;height:18px;margin-top:-6.5px;border:3px solid var(--qx-surface);border-radius:50%;background:var(--qx-accent);box-shadow:0 2px 8px rgba(24,22,17,.24);transition:transform .12s}
  input[type='range']:active::-webkit-slider-thumb{transform:scale(1.16)}input[type='range']:focus-visible{outline:3px solid var(--qx-accent-soft);outline-offset:3px;border-radius:999px}
  /* container-responsive: two sliders side-by-side only when they actually fit,
     else collapse to one column. Keyed to the grid's own width (auto-fit), not
     the viewport, so a narrow content frame on a wide desktop still collapses. */
  .controls.two { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap:12px; }
  .accent-line,.curve,.tangent { fill:none; stroke:var(--qx-accent); stroke-width:4; stroke-linecap:round; filter:drop-shadow(0 2px 3px color-mix(in srgb,var(--qx-accent) 24%,transparent)); }.tangent{stroke:var(--qx-danger);stroke-width:2.5}.curve{stroke-width:3}
  marker path { fill:var(--qx-accent); }.axis,.tick,.boundary { stroke:var(--qx-border-2); stroke-width:1.5; }.guide{stroke:var(--qx-text-faint);stroke-width:1.5;stroke-dasharray:5 5}
  .point,.particle { fill:var(--qx-accent); filter:drop-shadow(0 3px 5px color-mix(in srgb,var(--qx-accent) 30%,transparent)); }.hole { fill:var(--qx-surface-2); stroke:var(--qx-accent); stroke-width:3; }.circle-outline{fill:color-mix(in srgb,var(--qx-accent-soft) 22%,transparent);stroke:var(--qx-border-2);stroke-width:2}.shape{fill:var(--qx-accent-soft);stroke:var(--qx-accent);stroke-width:3;filter:drop-shadow(0 8px 10px rgba(24,22,17,.1))}
  .second-line{stroke:var(--qx-danger);stroke-width:4;stroke-linecap:round}.choice-row{display:flex;justify-content:center;gap:8px}.choice-row button{border:1px solid var(--qx-border-2);border-radius:999px;background:var(--qx-surface);color:var(--qx-text);padding:9px 15px;font-weight:800;box-shadow:0 4px 10px rgba(24,22,17,.05);cursor:pointer;transition:transform .15s,background .15s}.choice-row button:hover{transform:translateY(-1px)}.choice-row button.on{background:var(--qx-accent);border-color:var(--qx-accent);color:white;box-shadow:0 6px 14px color-mix(in srgb,var(--qx-accent) 26%,transparent)}
  .measure-grid{width:min(260px,85%);height:150px;margin:auto;display:grid;border:2px solid var(--qx-accent)}.measure-grid i{border:.5px solid var(--qx-accent);background:var(--qx-accent-soft)}
  .ruler{height:80px;position:relative;margin:15px 24px;border-bottom:4px solid var(--qx-text-dim)}.ruler i{position:absolute;bottom:-4px;height:18px;border-left:2px solid var(--qx-text-dim)}.ruler span{position:absolute;bottom:-12px;width:16px;height:30px;border-radius:8px;background:var(--qx-accent);transform:translateX(-8px)}
  .power { text-align:center; font-size:72px; font-weight:800; color:var(--qx-accent); }.power span{font-size:52px}.power sup{font-size:30px}.scale-value{text-align:center;color:var(--qx-text-dim);font-weight:700}
  .force-stage { height:100px; position:relative; border-bottom:3px solid var(--qx-border-2); overflow:hidden; }.block{position:absolute;left:20px;bottom:0;width:66px;height:58px;border-radius:10px 10px 2px 2px;background:var(--qx-accent-soft);border:2px solid var(--qx-accent);display:grid;place-items:center;font-weight:800;transition:transform .2s}.force-arrow{position:absolute;left:70px;top:6px;color:var(--qx-accent);font-weight:800;text-align:right}
  .balance-stage,.pair-stage{min-height:112px;display:flex;align-items:center;justify-content:center}.balance-stage>span,.pair-stage>span{color:var(--qx-accent);font-weight:900;white-space:nowrap}.left-force{text-align:left}.right-force{text-align:right}.balance-block{width:74px;height:62px;border:2px solid var(--qx-text-dim);border-radius:12px;background:var(--qx-surface);display:grid;place-items:center;font-size:11px;font-weight:800;box-shadow:0 8px 18px rgba(24,22,17,.08)}.pair-stage div{display:flex}.pair-stage i{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:var(--qx-accent-soft);border:2px solid var(--qx-accent);font-style:normal;font-weight:900}.pair-stage i+ i{background:color-mix(in srgb,var(--qx-danger) 12%,var(--qx-surface));border-color:var(--qx-danger)}
  .rate-stage{height:80px;display:grid;place-items:center}.track{position:relative;width:90%;height:4px;background:var(--qx-border-2)}.runner{position:absolute;top:-19px;color:var(--qx-accent);font-size:30px;transition:left .2s}
  .machine,.balance { display:flex;align-items:center;justify-content:center;gap:12px;font-size:22px;font-weight:800}.machine-box{padding:16px;border:2px solid var(--qx-accent);border-radius:12px;background:var(--qx-accent-soft);font-size:13px}
  .inverse-box{border-color:var(--qx-danger)}.log-stack{display:grid;gap:12px;text-align:center;font-size:30px;font-weight:800;color:var(--qx-accent)}.log-stack span:last-child{color:var(--qx-text);font-size:22px}
  .matrix-grid{width:min(240px,80%);margin:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.matrix-grid span{height:54px;display:grid;place-items:center;border:1px solid var(--qx-border-2);border-radius:9px;background:var(--qx-surface);font:800 17px var(--qx-font);transition:transform .15s,background .15s}.matrix-grid span.selected{background:var(--qx-accent);color:white;transform:scale(1.06);box-shadow:0 7px 16px color-mix(in srgb,var(--qx-accent) 25%,transparent)}.matrix-grid sub{font-size:9px}
  .bits,.logic-row { display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}.bits button,.logic-row button{border:1px solid var(--qx-border-2);border-radius:13px;background:var(--qx-surface);color:var(--qx-text);padding:13px 17px;font-weight:800;box-shadow:0 5px 13px rgba(24,22,17,.06);cursor:pointer;transition:transform .15s,box-shadow .15s}.bits button:hover,.logic-row button:hover{transform:translateY(-2px)}.bits button.on,.logic-row button.on{background:linear-gradient(145deg,var(--qx-accent),color-mix(in srgb,var(--qx-accent) 74%,black));color:white;border-color:var(--qx-accent);box-shadow:0 7px 18px color-mix(in srgb,var(--qx-accent) 28%,transparent)}.bits button span{display:block;font-size:22px}.bits button small{display:block;opacity:.65;margin-top:4px}.gate{padding:16px 20px;border:2px solid var(--qx-accent);border-radius:18px;background:var(--qx-accent-soft);font-weight:800;box-shadow:0 7px 16px rgba(24,22,17,.06)}.output{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:var(--qx-border-2);font-weight:800;box-shadow:inset 0 2px 4px rgba(24,22,17,.12)}.output.lit{background:var(--qx-accent);color:white;box-shadow:0 0 0 6px var(--qx-accent-soft),0 6px 14px color-mix(in srgb,var(--qx-accent) 28%,transparent)}
  .circuit { display:flex;align-items:center;justify-content:center;padding:30px 0}.battery,.resistor{border:2px solid var(--qx-accent);border-radius:8px;padding:12px;font-weight:800}.wire{width:60px;border-top:3px solid var(--qx-text-dim)}
  .resistor-pair{display:flex;align-items:center;justify-content:center;gap:0;padding:30px}.resistor-pair span{padding:14px 24px;border:2px solid var(--qx-accent);font-weight:800}.resistor-pair span+span{border-left:0}.resistor-pair.parallel{gap:50px;border-top:3px solid var(--qx-text-dim);border-bottom:3px solid var(--qx-text-dim)}.resistor-pair.parallel span+span{border-left:2px solid var(--qx-accent)}
  .capacitor-stage{height:120px;display:flex;align-items:center;justify-content:center;gap:20px;font-size:24px;font-weight:900;color:var(--qx-accent)}.capacitor-stage i{height:90px;border-left:7px solid var(--qx-text);border-radius:4px}.capacitor-stage i+ i{border-color:var(--qx-danger)}
  .particle-box,.gas-box{border:2px solid var(--qx-border-2);border-radius:14px;background:var(--qx-surface);margin:auto}.gas-box{height:120px;position:relative;transition:width .2s;max-width:95%}.gas-box span{position:absolute;right:8px;bottom:6px;font-size:11px;color:var(--qx-text-dim)}.gas-box i{position:absolute;width:10px;height:10px;border-radius:50%;background:var(--qx-accent)}
  .expansion-stage{height:100px;position:relative;display:flex;align-items:center;justify-content:center}.expansion-stage span{height:28px;border-radius:7px;background:linear-gradient(90deg,var(--qx-accent),color-mix(in srgb,var(--qx-danger) 58%,var(--qx-accent)));box-shadow:0 7px 18px color-mix(in srgb,var(--qx-accent) 20%,transparent);transition:width .2s}.expansion-stage i{position:absolute;width:284px;border-bottom:1px dashed var(--qx-text-faint);bottom:22px}
  .phase-stage{height:180px;width:min(280px,90%);margin:auto;position:relative;border:2px solid var(--qx-border-2);border-radius:14px;background:var(--qx-surface);overflow:hidden}.phase-stage i{position:absolute;width:20px;height:20px;border-radius:50%;background:var(--qx-accent);transition:left .25s,top .25s}.phase-stage.gas i{opacity:.75}.phase-stage.liquid i{transform:translateY(24px)}
  .energy-bar{height:58px;display:flex;overflow:hidden;border:1px solid var(--qx-border-2);border-radius:13px;background:var(--qx-surface);box-shadow:0 7px 18px rgba(24,22,17,.06)}.energy-bar span,.energy-bar i{display:grid;place-items:center;min-width:0;color:white;font-size:11px;font-weight:900;font-style:normal;transition:width .2s}.energy-bar span{background:var(--qx-accent)}.energy-bar i{background:var(--qx-danger)}
  .equation,.reaction-bin,.binary-sum,.branch-flow,.pipeline{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;font-size:20px;font-weight:800}.equation span,.reaction-bin span,.branch-flow span,.pipeline span{padding:12px;border:2px solid var(--qx-border-2);border-radius:10px;background:var(--qx-surface)}.readout.success{color:var(--qx-success)}.reaction-bin .a{border-color:var(--qx-accent)}.reaction-bin .b{border-color:var(--qx-danger)}.binary-sum{font-family:ui-monospace,monospace;font-size:24px;color:var(--qx-accent)}
  .loop-row{display:flex;justify-content:center;gap:7px;flex-wrap:wrap}.loop-row span{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:var(--qx-accent-soft);border:2px solid var(--qx-accent);font-weight:800}.branch-flow span.on{background:var(--qx-accent);border-color:var(--qx-accent);color:white}.pipeline span{font-size:14px;text-align:center}.pipeline span.bottleneck{border-color:var(--qx-danger);background:color-mix(in srgb,var(--qx-danger) 12%,var(--qx-surface))}
  .memory-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.memory-grid span{display:grid;grid-template-columns:1fr 1fr;padding:9px;border:1px solid var(--qx-border-2);border-radius:9px;background:var(--qx-surface);font-size:11px}.memory-grid span.active{border-color:var(--qx-accent);background:var(--qx-accent-soft);box-shadow:0 6px 14px rgba(24,22,17,.06)}.memory-grid i{text-align:right;font-style:normal;color:var(--qx-accent-text);font-weight:900}.redundancy-row{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.redundancy-row span{width:44px;height:58px;border:2px solid var(--qx-accent);border-radius:11px;background:linear-gradient(var(--qx-accent-soft),var(--qx-surface));box-shadow:0 6px 14px rgba(24,22,17,.07)}.ratio-cups{height:120px;display:flex;align-items:stretch;gap:8px}.ratio-cups span{display:grid;place-items:center;min-width:34px;border:2px solid var(--qx-accent);border-radius:12px;background:var(--qx-accent-soft);font-size:22px;font-weight:900;transition:flex .2s}.ratio-cups span+span{border-color:var(--qx-danger);background:color-mix(in srgb,var(--qx-danger) 12%,var(--qx-surface))}
  .lens-stage{position:relative;height:150px;border-bottom:2px solid var(--qx-text-dim)}.lens-stage i{position:absolute;left:50%;top:12px;height:128px;border-left:5px solid var(--qx-accent);border-radius:50%}.lens-stage .object,.lens-stage .image{position:absolute;bottom:-3px;font-size:65px;font-weight:400;color:var(--qx-text)}.lens-stage .image{color:var(--qx-danger)}
  @media(max-width:520px){.controls.two{grid-template-columns:1fr}.explorer{min-height:380px;border-radius:17px}.canvas{margin:0 8px;padding:14px}.explorer-head{padding:14px}.title-lockup strong{font-size:16px}.power{font-size:58px}.machine{flex-wrap:wrap}label{grid-template-columns:1fr;gap:6px}.interaction-hint{font-size:9px}}
  @media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
