<script>
  import { isSafeMathExpr } from '../content/safeMathExpr.js';

  export let spec = null;

  const W = 260, H = 200;
  const PX = W / 2, PY = H / 2;
  const SCALE = 16;
  const COLORS = { chalk: '#f4f1e9', yellow: '#f2d585', green: '#a9d6a0', blue: '#9ec6d8', faint: '#8fa093' };

  function c(name) { return COLORS[name] || COLORS.chalk; }
  function toX(x) { return PX + x * SCALE; }
  function toY(y) { return PY - y * SCALE; }

  function curvePoints(fnStr, domain, n) {
    if (!isSafeMathExpr(fnStr)) return [];
    const fn = new Function('x', 'with(Math){return (' + fnStr + ')}');
    n = n || 80;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const x = domain[0] + (domain[1] - domain[0]) * i / n;
      let y;
      try { y = fn(x); } catch (e) { y = NaN; }
      if (!isFinite(y) || Math.abs(y) > 8) continue;
      pts.push({ x, y });
    }
    return pts;
  }

  function curvePath(fnStr, domain, n) {
    const pts = curvePoints(fnStr, domain, n);
    if (pts.length === 0) return '';
    return 'M' + pts.map(p => toX(p.x).toFixed(1) + ',' + toY(p.y).toFixed(1)).join(' L');
  }

  function nlPx(v) { return 20 + (v + 6) / 12 * (W - 40); }
</script>

<svg viewBox="0 0 {W} {H}" width="100%" height="100%" class="chalk-diagram">
  {#if !spec}
    <rect x="0" y="0" width={W} height={H} fill="transparent" />

  {:else if spec.type === 'numberline'}
    <line x1="20" y1={H / 2} x2={W - 20} y2={H / 2} stroke={c('faint')} stroke-width="1.6"/>
    {#each [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] as v}
      <line x1={nlPx(v)} y1={H / 2 - 5} x2={nlPx(v)} y2={H / 2 + 5} stroke={c('faint')} stroke-width="1"/>
    {/each}
    {#if spec.highlight}
      <line x1={nlPx(spec.highlight[0])} y1={H / 2} x2={nlPx(spec.highlight[1])} y2={H / 2} stroke={c('yellow')} stroke-width="3"/>
    {/if}
    {#each spec.points || [] as pt}
      <circle cx={nlPx(pt.x)} cy={H / 2} r="5" fill={c(pt.color || 'yellow')}/>
      {#if pt.label}
        <text x={nlPx(pt.x)} y={H / 2 - 12} fill={c('chalk')} font-size="11" text-anchor="middle">{pt.label}</text>
      {/if}
    {/each}

  {:else if spec.type === 'points'}
    {#each spec.pts || [] as pt}
      <circle cx={toX(pt.x)} cy={toY(pt.y)} r="4.5" fill={c(pt.color || 'yellow')}/>
      {#if pt.label}
        <text x={toX(pt.x) + 8} y={toY(pt.y) - 6} fill={c('chalk')} font-size="11">{pt.label}</text>
      {/if}
    {/each}
    {#if spec.connect && spec.pts?.length > 1}
      <path d={'M' + spec.pts.map(p => `${toX(p.x)},${toY(p.y)}`).join(' L')} stroke={c('chalk')} stroke-width="1.8" fill="none"/>
    {/if}

  {:else if spec.type === 'line'}
    {#if spec.p1 && spec.p2}
      <line x1={toX(spec.p1[0])} y1={toY(spec.p1[1])} x2={toX(spec.p2[0])} y2={toY(spec.p2[1])} stroke={c(spec.color || 'yellow')} stroke-width="2.2" stroke-dasharray={spec.dashed ? '5 4' : ''}/>
    {:else if spec.m != null}
      <line x1={toX(-7)} y1={toY(spec.m * -7 + (spec.c || 0))} x2={toX(7)} y2={toY(spec.m * 7 + (spec.c || 0))} stroke={c(spec.color || 'yellow')} stroke-width="2.2" stroke-dasharray={spec.dashed ? '5 4' : ''}/>
    {/if}

  {:else if spec.type === 'curve'}
    <path d={curvePath(spec.fn, spec.domain || [-6, 6])} stroke={c(spec.color || 'yellow')} stroke-width="2.2" fill="none"/>
    {#if spec.fn2}
      <path d={curvePath(spec.fn2, spec.domain || [-6, 6])} stroke={c(spec.color2 || 'green')} stroke-width="2" fill="none" stroke-dasharray="4 3"/>
    {/if}

  {:else if spec.type === 'vectors'}
    {#each spec.vecs || [] as v}
      {@const x1 = toX((v.from||[0,0])[0])}
      {@const y1 = toY((v.from||[0,0])[1])}
      {@const x2 = toX(v.to[0])}
      {@const y2 = toY(v.to[1])}
      {@const ang = Math.atan2(y2 - y1, x2 - x1)}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c(v.color||'yellow')} stroke-width="2.4"/>
      <polygon points={`${x2},${y2} ${x2-8*Math.cos(ang-0.4)},${y2-8*Math.sin(ang-0.4)} ${x2-8*Math.cos(ang+0.4)},${y2-8*Math.sin(ang+0.4)}`} fill={c(v.color||'yellow')}/>
      {#if v.label}
        <text x={(x1 + x2) / 2 + 6} y={(y1 + y2) / 2 - 6} fill={c('chalk')} font-size="12">{v.label}</text>
      {/if}
    {/each}

  {:else if spec.type === 'circle'}
    <circle cx={toX(spec.cx || 0)} cy={toY(spec.cy || 0)} r={(spec.r || 3) * SCALE} fill="none" stroke={c(spec.color||'yellow')} stroke-width="2.2"/>

  {:else if spec.type === 'wave'}
    {@const fnBody = `${spec.amp||1}*Math.sin((2*Math.PI/${spec.period||6.283})*x+${spec.phase||0})`}
    <path d={curvePath(fnBody, spec.domain||[-7,7], 120)} stroke={c(spec.color||'blue')} stroke-width="2.2" fill="none"/>
    {#if spec.fn2same}
      {@const fnBody2 = `${spec.amp2||spec.amp||1}*Math.sin((2*Math.PI/${spec.period2||spec.period||6.283})*x+${spec.phase2||0})`}
      <path d={curvePath(fnBody2, spec.domain||[-7,7], 120)} stroke={c('green')} stroke-width="1.8" fill="none" stroke-dasharray="4 3"/>
    {/if}

  {:else if spec.type === 'matrix'}
    {@const corners = [[0,0],[1,0],[1,1],[0,1]]}
    {@const m = spec.m}
    {@const d0 = 'M' + corners.map(p => `${toX(p[0]*3)},${toY(p[1]*3)}`).join(' L') + ' Z'}
    <path d={d0} fill="none" stroke="rgba(244,241,233,0.25)" stroke-width="1.5" stroke-dasharray="3 3"/>
    {@const tp = corners.map(p => [m[0][0]*p[0]+m[0][1]*p[1], m[1][0]*p[0]+m[1][1]*p[1]])}
    {@const d1 = 'M' + tp.map(p => `${toX(p[0]*3)},${toY(p[1]*3)}`).join(' L') + ' Z'}
    <path d={d1} fill="rgba(242,213,133,0.12)" stroke={c('yellow')} stroke-width="2"/>

  {:else}
    <!-- Fallback: axes-only grid -->
    {#each [-6,-4,-2,2,4,6] as gx}
      <line x1={toX(gx)} y1="0" x2={toX(gx)} y2={H} stroke="rgba(244,241,233,0.06)" stroke-width="1"/>
    {/each}
    {#each [-5,-3,-1,1,3,5] as gy}
      <line x1="0" y1={toY(gy)} x2={W} y2={toY(gy)} stroke="rgba(244,241,233,0.06)" stroke-width="1"/>
    {/each}
    <line x1="0" y1={toY(0)} x2={W} y2={toY(0)} stroke={c('faint')} stroke-width="1.4"/>
    <line x1={toX(0)} y1="0" x2={toX(0)} y2={H} stroke={c('faint')} stroke-width="1.4"/>
  {/if}
</svg>

<style>
  .chalk-diagram {
    display: block;
    background: transparent;
    border-radius: 6px;
    width: 100%;
    height: auto;
  }
</style>
