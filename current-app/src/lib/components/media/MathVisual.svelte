<script>
  export let spec = {};

  const FAMILY_LABELS = {
    coordinate: 'Coordinate model', line: 'Line model', linear: 'Linear model',
    function: 'Function model', matrix: 'Matrix model', exponential: 'Powers model',
    trig: 'Trigonometry model', derivative: 'Local-change model', limit: 'Approach model'
  };

  const PROMPTS = {
    distance: 'Compare the horizontal and vertical gaps before reading the diagonal.',
    midpoint: 'Track the point exactly halfway between the two endpoints.',
    circle: 'Connect radius, centre and coordinates in one construction.',
    polygon: 'Read the shape as a precise list of connected coordinates.',
    'number-line': 'Use position and direction to interpret the relationship.',
    ray: 'Compare the endpoint behaviour of a segment, ray and line.',
    segment: 'Read magnitude and direction from the directed segment.',
    mapping: 'Follow each input through the rule to its output.',
    inverse: 'Run the relationship forward, then reverse it.',
    intercept: 'Separate the line’s rate of change from its starting value.',
    parallel: 'Compare equal gradients while the lines remain separated.',
    perpendicular: 'Inspect how the two gradients preserve a right angle.',
    multiplication: 'Watch repeated multiplication become compact notation.',
    rotation: 'Compare the original coordinates with the rotated result.',
    identity: 'Verify that every point remains exactly where it started.',
    log: 'Read the logarithm as the exponent needed to reach a value.',
    decay: 'Each step keeps the same fraction of the previous value.',
    growth: 'Each equal step multiplies rather than adds.',
    triangle: 'Connect the angle to opposite, adjacent and hypotenuse.',
    wave: 'Trace circular motion into a repeating wave.',
    stationary: 'Find where the tangent becomes horizontal.',
    rate: 'Compare a fixed change with the interval over which it occurs.',
    continuity: 'Inspect whether both sides meet at the same value.',
    infinity: 'Follow the trend without treating infinity as a destination.'
  };

  $: kind = spec.kind || 'coordinate';
  $: variant = spec.variant || kind;
  $: title = spec.title || 'Mathematical relationship';
  $: prompt = spec.prompt || PROMPTS[variant] || {
    coordinate: 'Read position, direction and distance from the same coordinate model.',
    line: 'Inspect what remains fixed as the line extends.',
    linear: 'Compare rise, run, gradient and intercept.',
    function: 'Connect inputs, outputs and the graph of the rule.',
    matrix: 'Read the array and the transformation it represents.',
    exponential: 'Compare equal additive steps with multiplicative change.',
    trig: 'Connect angle, circle, triangle and repeating motion.',
    derivative: 'Move from a curve to its local tangent and slope.',
    limit: 'Approach the target from both sides and compare the trend.'
  }[kind];
  $: family = FAMILY_LABELS[kind] || 'Mathematical model';

  const lineLike = (value) => ['coordinate', 'line', 'linear'].includes(value);
</script>

<figure class="math-visual" aria-label={`${title}. ${prompt}`}>
  <header>
    <div><span>{family}</span><strong>{title}</strong></div>
    <i>{variant.replace('-', ' ')}</i>
  </header>
  <p>{prompt}</p>

  <div class="stage">
    {#if lineLike(kind)}
      <svg viewBox="0 0 320 320" role="img" aria-label="Coordinate grid showing the stated line relationship">
        <defs>
          <marker id="mv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" /></marker>
        </defs>
        <g class="grid">
          {#each [40,80,120,160,200,240,280] as n}<line x1={n} y1="24" x2={n} y2="296" /><line x1="24" y1={n} x2="296" y2={n} />{/each}
        </g>
        <g class="axes"><line x1="24" y1="160" x2="296" y2="160" marker-end="url(#mv-arrow)"/><line x1="160" y1="296" x2="160" y2="24" marker-end="url(#mv-arrow)"/></g>
        {#if variant === 'number-line' || kind === 'line'}
          <line class="primary long" x1="38" y1="160" x2="282" y2="160" marker-start="url(#mv-arrow)" marker-end="url(#mv-arrow)" />
          {#each [72,116,160,204,248] as x, index}<line class="tick" x1={x} y1="151" x2={x} y2="169"/><text x={x} y="188">{index - 2}</text>{/each}
          {#if variant === 'ray'}<circle class="open" cx="116" cy="160" r="7"/><line class="secondary" x1="116" y1="122" x2="274" y2="74" marker-end="url(#mv-arrow)" />{/if}
        {:else}
          <line class="primary draw" x1="45" y1="255" x2="276" y2="70" marker-end="url(#mv-arrow)" />
          <circle class="point" cx="92" cy="217" r="7"/><circle class="point" cx="230" cy="107" r="7"/>
          <path class="guide" d="M92 217H230V107" />
          {#if variant === 'midpoint'}<circle class="second-point" cx="161" cy="162" r="8"/><text x="172" y="151">midpoint</text>{/if}
          {#if variant === 'distance'}<text x="153" y="234">Δx</text><text x="241" y="169">Δy</text>{/if}
          {#if variant === 'parallel'}<line class="secondary" x1="45" y1="205" x2="276" y2="20" />{/if}
          {#if variant === 'perpendicular'}<line class="secondary" x1="68" y1="64" x2="255" y2="278" />{/if}
          {#if variant === 'polygon'}<path class="shape" d="M82 225L111 80L247 112L264 238Z"/><circle class="second-point" cx="82" cy="225" r="5"/><circle class="second-point" cx="111" cy="80" r="5"/><circle class="second-point" cx="247" cy="112" r="5"/><circle class="second-point" cx="264" cy="238" r="5"/>{/if}
          {#if variant === 'intercept'}<circle class="second-point" cx="160" cy="163" r="8"/><text x="171" y="151">c</text>{/if}
        {/if}
      </svg>

    {:else if kind === 'function'}
      <svg viewBox="0 0 320 320" role="img" aria-label="Inputs passing through a function to outputs and a graph">
        <defs><marker id="mv-function-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" /></marker></defs>
        <g class="mapping">
          <rect x="29" y="58" width="65" height="204" rx="18"/><rect x="226" y="58" width="65" height="204" rx="18"/><rect class="machine" x="119" y="117" width="82" height="86" rx="20"/>
          {#each [98,160,222] as y, index}<circle cx="62" cy={y} r="16"/><text x="62" y={y+5}>{index-1}</text><circle class="output" cx="258" cy={y} r="16"/><text x="258" y={y+5}>{index*2}</text><path class="flow" d={`M78 ${y} C112 ${y}, 107 160, 119 160 M201 160 C216 160, 210 ${y}, 242 ${y}`} marker-end="url(#mv-function-arrow)"/>{/each}
          <text class="rule" x="160" y="154">f(x)</text><text class="rule-small" x="160" y="178">one rule</text>
        </g>
      </svg>

    {:else if kind === 'matrix'}
      <svg viewBox="0 0 320 320" role="img" aria-label="Matrix array and its coordinate transformation">
        <defs><marker id="mv-matrix-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" /></marker></defs>
        <g class="matrix-brackets"><path d="M38 55H24V172H38M133 55H147V172H133"/><text x="58" y="99">1</text><text x="104" y="99">0</text><text x="58" y="145">0</text><text x="104" y="145">1</text></g>
        <path class="flow big" d="M164 116H209" marker-end="url(#mv-matrix-arrow)"/>
        <g transform="translate(230 86)"><path class="shape original" d="M0 0H55V55H0Z"/><path class="shape transformed" d={variant === 'rotation' ? 'M27 -12L67 27L27 67L-12 27Z' : variant === 'identity' ? 'M0 0H55V55H0Z' : 'M-8 8L64 -7L55 63L4 55Z'}/></g>
        <text x="82" y="211">rows × columns</text><text x="82" y="239">one operation</text><text x="235" y="239">every point</text>
      </svg>

    {:else if kind === 'exponential'}
      <svg viewBox="0 0 320 320" role="img" aria-label="Repeated multiplication and exponential graph">
        <g class="grid faint">{#each [60,100,140,180,220,260] as n}<line x1={n} y1="38" x2={n} y2="282"/><line x1="38" y1={n} x2="282" y2={n}/>{/each}</g>
        <g class="axes"><line x1="38" y1="260" x2="286" y2="260"/><line x1="58" y1="282" x2="58" y2="35"/></g>
        {#if variant === 'log'}<path class="primary curve" d="M72 246C92 212 120 184 158 157S236 108 275 94"/>
        {:else if variant === 'decay'}<path class="primary curve" d="M62 65C106 77 137 111 165 151S220 219 279 242"/>
        {:else}<path class="primary curve" d="M62 245C127 239 177 220 212 178S259 91 278 50"/>{/if}
        {#each [92,132,172,212,252] as x,index}<circle class="point step" cx={x} cy={variant === 'decay' ? 88+index*35 : 243-index*38} r="6"/>{/each}
        <text x="84" y="291">equal steps</text><text x="193" y="291">equal factors</text>
      </svg>

    {:else if kind === 'trig'}
      <svg viewBox="0 0 320 320" role="img" aria-label="Angle connected to a unit circle, triangle and wave">
        {#if variant === 'wave'}
          <g class="grid faint">{#each [60,100,140,180,220,260] as n}<line x1="28" y1={n} x2="292" y2={n}/>{/each}</g><line class="axis" x1="28" y1="160" x2="292" y2="160"/><path class="primary curve wave" d="M28 160C50 80 72 80 94 160S138 240 160 160S204 80 226 160S270 240 292 160"/>
        {:else}
          <circle class="circle" cx="160" cy="155" r="105"/><line class="axis" x1="38" y1="155" x2="282" y2="155"/><line class="axis" x1="160" y1="277" x2="160" y2="33"/><line class="primary radius" x1="160" y1="155" x2="237" y2="84"/><path class="guide" d="M237 84V155H160"/><path class="angle" d="M194 155A34 34 0 0 0 185 132"/><text x="196" y="140">θ</text><text x="240" y="124">sin θ</text><text x="190" y="171">cos θ</text>
        {/if}
      </svg>

    {:else if kind === 'derivative'}
      <svg viewBox="0 0 320 320" role="img" aria-label="Curve with a local tangent showing derivative">
        <g class="grid faint">{#each [60,100,140,180,220,260] as n}<line x1={n} y1="30" x2={n} y2="290"/><line x1="30" y1={n} x2="290" y2={n}/>{/each}</g><g class="axes"><line x1="30" y1="260" x2="292" y2="260"/><line x1="65" y1="290" x2="65" y2="30"/></g><path class="primary curve" d="M44 58C87 186 120 245 166 239S239 157 282 56"/><line class="secondary tangent" x1="115" y1="266" x2="246" y2="126"/><circle class="point pulse" cx="184" cy="193" r="8"/><path class="guide" d="M184 193V260M184 193H65"/><text x="204" y="226">local slope</text>
      </svg>

    {:else}
      <svg viewBox="0 0 320 320" role="img" aria-label="Values approaching the same limit from the left and right">
        <g class="grid faint">{#each [60,100,140,180,220,260] as n}<line x1={n} y1="30" x2={n} y2="290"/><line x1="30" y1={n} x2="290" y2={n}/>{/each}</g><g class="axes"><line x1="30" y1="260" x2="292" y2="260"/><line x1="60" y1="290" x2="60" y2="30"/></g><path class="primary curve" d="M42 242C88 221 123 191 158 154S226 91 282 74"/><circle class="open" cx="174" cy="139" r="9"/><circle class="approach left" cx="132" cy="181" r="7"/><circle class="approach right" cx="220" cy="101" r="7"/><path class="guide" d="M174 139V260"/><text x="147" y="286">x → target</text>
      </svg>
    {/if}
  </div>
  <figcaption><span aria-hidden="true">↔</span> Inspect the relationship, then return to the floor text.</figcaption>
</figure>

<style>
  .math-visual{width:min(100%,340px);height:100%;aspect-ratio:1;margin:auto;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;border:1px solid color-mix(in srgb,var(--qx-accent) 25%,var(--qx-border-2));border-radius:20px;background:linear-gradient(145deg,color-mix(in srgb,var(--qx-surface) 95%,var(--qx-accent) 5%),var(--qx-surface-2));color:var(--qx-text);box-shadow:0 14px 36px rgba(24,22,17,.09),inset 0 1px rgba(255,255,255,.55)}
  header{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:13px 15px 8px}header div{display:grid;gap:2px;min-width:0}header span{font-size:8px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:var(--qx-accent-text)}header strong{font-size:15px;line-height:1.15;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}header i{flex:0 0 auto;padding:5px 8px;border:1px solid var(--qx-border-2);border-radius:999px;background:var(--qx-surface);color:var(--qx-text-dim);font:800 8px var(--qx-font);font-style:normal;text-transform:capitalize}
  p{min-height:30px;margin:0;padding:0 15px 8px;color:var(--qx-text-dim);font-size:10px;font-weight:650;line-height:1.35}
  .stage{flex:1;min-height:0;margin:0 10px;border:1px solid color-mix(in srgb,var(--qx-border-2) 80%,transparent);border-radius:15px;background:linear-gradient(color-mix(in srgb,var(--qx-border) 30%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--qx-border) 30%,transparent) 1px,transparent 1px),var(--qx-surface);background-size:22px 22px,22px 22px,auto;overflow:hidden}.stage svg{display:block;width:100%;height:100%;font-family:var(--qx-font)}
  figcaption{display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 10px 10px;color:var(--qx-text-faint);font-size:8px;font-weight:750}figcaption span{font-size:13px;color:var(--qx-accent)}
  svg text{fill:var(--qx-text-dim);font-size:10px;font-weight:750;text-anchor:middle}.grid line{stroke:var(--qx-border);stroke-width:1}.grid.faint{opacity:.5}.axes line,.axis{stroke:var(--qx-text-faint);stroke-width:1.6}.primary{fill:none;stroke:var(--qx-accent);stroke-width:4;stroke-linecap:round}.secondary{fill:none;stroke:var(--qx-danger);stroke-width:3;stroke-linecap:round}.long{stroke-width:3}.tick{stroke:var(--qx-text-dim);stroke-width:2}.point,.second-point,.approach{fill:var(--qx-accent);filter:drop-shadow(0 3px 4px color-mix(in srgb,var(--qx-accent) 30%,transparent))}.second-point,.approach.right{fill:var(--qx-danger)}.open{fill:var(--qx-surface);stroke:var(--qx-accent);stroke-width:3}.guide{fill:none;stroke:var(--qx-text-faint);stroke-width:1.5;stroke-dasharray:5 5}.shape{fill:color-mix(in srgb,var(--qx-accent) 10%,transparent);stroke:var(--qx-accent);stroke-width:3}.mapping rect{fill:var(--qx-surface-2);stroke:var(--qx-border-2);stroke-width:2}.mapping .machine{fill:var(--qx-accent-soft);stroke:var(--qx-accent)}.mapping circle{fill:var(--qx-surface);stroke:var(--qx-accent);stroke-width:2}.mapping .output{stroke:var(--qx-danger)}.flow{fill:none;stroke:var(--qx-text-faint);stroke-width:1.8}.rule{fill:var(--qx-accent-text);font-size:18px}.rule-small{font-size:8px}.matrix-brackets path{fill:none;stroke:var(--qx-text);stroke-width:3}.matrix-brackets text{font-size:24px;fill:var(--qx-text)}.flow.big{stroke:var(--qx-accent);stroke-width:3}.original{fill:var(--qx-accent-soft);opacity:.42}.transformed{stroke:var(--qx-danger);fill:color-mix(in srgb,var(--qx-danger) 10%,transparent)}.curve{stroke-width:3.5}.circle{fill:color-mix(in srgb,var(--qx-accent) 5%,transparent);stroke:var(--qx-border-2);stroke-width:2}.radius{stroke-width:4}.angle{fill:none;stroke:var(--qx-danger);stroke-width:2}.tangent{stroke-width:2.5}.step,.pulse,.approach{transform-box:fill-box;transform-origin:center;animation:mvPulse 2.2s ease-in-out infinite}.draw{stroke-dasharray:330;animation:mvDraw 3.6s ease-in-out infinite}.wave{stroke-dasharray:500;animation:mvDraw 4.8s linear infinite}.approach.left{animation:mvLeft 3s ease-in-out infinite}.approach.right{animation:mvRight 3s ease-in-out infinite}
  @keyframes mvPulse{50%{transform:scale(1.3)}}@keyframes mvDraw{0%{stroke-dashoffset:500}55%,100%{stroke-dashoffset:0}}@keyframes mvLeft{50%{transform:translate(30px,-28px)}}@keyframes mvRight{50%{transform:translate(-30px,28px)}}
  @media(max-width:520px){.math-visual{border-radius:17px}header{padding:11px 12px 6px}header strong{font-size:14px}p{padding:0 12px 6px;font-size:9px}.stage{margin:0 8px}figcaption{padding-bottom:8px}}
  @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
