/* ============================================================
   DIAGRAM ENGINE — generic chalk-styled SVG renderer
   Used by COORDINATE-GEOMETRY-REVIEW.html to render a small
   diagram per BB from a declarative spec (see diagram-specs.js).
   Not part of the live deck — a review/authoring aid.
   ============================================================ */

const DG = (function(){
  const NS = "http://www.w3.org/2000/svg";
  const W = 260, H = 200;        // viewport pixels
  const PX = W/2, PY = H/2;      // pixel origin (centre by default)
  const SCALE = 16;               // px per unit, axes-based diagrams

  const COLORS = {chalk:"#f4f1e9", yellow:"#f2d585", green:"#a9d6a0", blue:"#9ec6d8", faint:"#8fa093"};
  const colorOf = (name)=>COLORS[name]||COLORS.chalk;

  function el(tag, attrs){
    const e = document.createElementNS(NS, tag);
    for(const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function svgRoot(){
    return el("svg", {viewBox:`0 0 ${W} ${H}`, width:"100%", height:"100%"});
  }
  function toX(x){ return PX + x*SCALE; }
  function toY(y){ return PY - y*SCALE; }
  function round(v, step){ step = step||0.5; return Math.round(v/step)*step; }

  function evalFn(expr, varName){
    // authored content only, not user input
    try{
      const f = new Function(varName, "with(Math){ return (" + expr + "); }");
      return f;
    }catch(e){ return ()=>0; }
  }

  function axes(svg, opts){
    opts = opts||{};
    const g = el("g", {});
    // faint grid
    for(let gx=-7; gx<=7; gx++){
      g.appendChild(el("line",{x1:toX(gx),y1:0,x2:toX(gx),y2:H,stroke:"rgba(244,241,233,0.06)","stroke-width":1}));
    }
    for(let gy=-6; gy<=6; gy++){
      g.appendChild(el("line",{x1:0,y1:toY(gy),x2:W,y2:toY(gy),stroke:"rgba(244,241,233,0.06)","stroke-width":1}));
    }
    if(!opts.noAxes){
      g.appendChild(el("line",{x1:0,y1:toY(0),x2:W,y2:toY(0),stroke:"#8fa093","stroke-width":1.4}));
      g.appendChild(el("line",{x1:toX(0),y1:0,x2:toX(0),y2:H,stroke:"#8fa093","stroke-width":1.4}));
    }
    svg.appendChild(g);
  }

  function curvePath(fn, domain, sampleN){
    sampleN = sampleN||80;
    let d = "";
    for(let i=0;i<=sampleN;i++){
      const x = domain[0] + (domain[1]-domain[0])*i/sampleN;
      let y;
      try{ y = fn(x); }catch(e){ y = NaN; }
      if(!isFinite(y) || Math.abs(y)>8){ d += ""; continue; }
      const cmd = d===""?"M":"L";
      d += `${cmd}${toX(x).toFixed(1)},${toY(y).toFixed(1)} `;
    }
    return d;
  }

  function render(container, spec){
    const svg = svgRoot();
    container.innerHTML = "";
    container.appendChild(svg);
    if(!spec){ container.style.display="none"; return; }
    const type = spec.type;
    const c = colorOf;

    if(type!=="numberline" && type!=="matrix") axes(svg, spec);

    switch(type){

      case "numberline": {
        const y = H/2;
        svg.appendChild(el("line",{x1:20,y1:y,x2:W-20,y2:y,stroke:"#8fa093","stroke-width":1.6}));
        const lo=-6, hi=6, span=W-40;
        const px = (v)=> 20 + (v-lo)/(hi-lo)*span;
        for(let i=lo;i<=hi;i++){
          svg.appendChild(el("line",{x1:px(i),y1:y-5,x2:px(i),y2:y+5,stroke:"#8fa093","stroke-width":1}));
        }
        if(spec.highlight){
          svg.appendChild(el("line",{x1:px(spec.highlight[0]),y1:y,x2:px(spec.highlight[1]),y2:y,stroke:c("yellow"),"stroke-width":3}));
        }
        (spec.points||[]).forEach(p=>{
          svg.appendChild(el("circle",{cx:px(p.x),cy:y,r:5,fill:c(p.color||"yellow")}));
          if(p.label) svg.appendChild(el("text",{x:px(p.x),y:y-12,fill:c("chalk"),"font-size":11,"text-anchor":"middle"})).textContent=p.label;
        });
        break;
      }

      case "points": {
        (spec.pts||[]).forEach((p,i)=>{
          svg.appendChild(el("circle",{cx:toX(p.x),cy:toY(p.y),r:4.5,fill:c(p.color||"yellow")}));
          if(p.label){
            const t=el("text",{x:toX(p.x)+8,y:toY(p.y)-6,fill:c("chalk"),"font-size":11});
            t.textContent=p.label; svg.appendChild(t);
          }
        });
        if(spec.connect && spec.pts && spec.pts.length>1){
          const d = "M"+spec.pts.map(p=>`${toX(p.x)},${toY(p.y)}`).join(" L");
          svg.appendChild(el("path",{d,stroke:c("chalk"),"stroke-width":1.8,fill:"none"}));
        }
        break;
      }

      case "line": {
        let p1,p2;
        if(spec.p1 && spec.p2){ p1=spec.p1; p2=spec.p2; }
        else { const m=spec.m, cc=spec.c||0; p1=[-7,m*-7+cc]; p2=[7,m*7+cc]; }
        svg.appendChild(el("line",{x1:toX(p1[0]),y1:toY(p1[1]),x2:toX(p2[0]),y2:toY(p2[1]),stroke:c(spec.color||"yellow"),"stroke-width":2.2,"stroke-dasharray":spec.dashed?"5 4":""}));
        break;
      }

      case "curve": {
        const fn = evalFn(spec.fn,"x");
        const d = curvePath(fn, spec.domain||[-6,6]);
        svg.appendChild(el("path",{d,stroke:c(spec.color||"yellow"),"stroke-width":2.2,fill:"none"}));
        if(spec.fn2){
          const fn2=evalFn(spec.fn2,"x");
          svg.appendChild(el("path",{d:curvePath(fn2, spec.domain||[-6,6]),stroke:c(spec.color2||"green"),"stroke-width":2,fill:"none","stroke-dasharray":"4 3"}));
        }
        break;
      }

      case "riemann": {
        const fn = evalFn(spec.fn,"x");
        const [a,b] = spec.domain;
        const n = spec.n||6;
        const w = (b-a)/n;
        for(let i=0;i<n;i++){
          const x0=a+i*w, xm=x0+w/2;
          let h; try{ h=fn(xm); }catch(e){h=0;}
          const y0=toY(0), y1=toY(h);
          svg.appendChild(el("rect",{x:toX(x0),y:Math.min(y0,y1),width:w*SCALE,height:Math.abs(y1-y0),fill:"rgba(169,214,160,0.28)",stroke:c("green"),"stroke-width":1}));
        }
        svg.appendChild(el("path",{d:curvePath(fn,[a,b]),stroke:c("yellow"),"stroke-width":2,fill:"none"}));
        break;
      }

      case "circle": {
        svg.appendChild(el("circle",{cx:toX(spec.cx||0),cy:toY(spec.cy||0),r:(spec.r||3)*SCALE,fill:"none",stroke:c(spec.color||"yellow"),"stroke-width":2.2}));
        break;
      }

      case "circle-touch": {
        const r = spec.r||3, cx=spec.cx||0, cy=spec.cy||0;
        const th = (spec.touchDeg||40)*Math.PI/180;
        const px = cx + r*Math.cos(th), py = cy + r*Math.sin(th);
        svg.appendChild(el("circle",{cx:toX(cx),cy:toY(cy),r:r*SCALE,fill:"none",stroke:c("chalk"),"stroke-width":1.8}));
        if(spec.mode === "normal"){
          const dx = px-cx, dy = py-cy, len = Math.hypot(dx,dy), ext = r*1.7;
          const x1 = cx - dx/len*ext, y1 = cy - dy/len*ext;
          const x2 = cx + dx/len*ext, y2 = cy + dy/len*ext;
          svg.appendChild(el("line",{x1:toX(x1),y1:toY(y1),x2:toX(x2),y2:toY(y2),stroke:c("green"),"stroke-width":2.2}));
        } else {
          svg.appendChild(el("line",{x1:toX(cx),y1:toY(cy),x2:toX(px),y2:toY(py),stroke:c("faint"),"stroke-width":1.4,"stroke-dasharray":"4 3"}));
          const tangAng = Math.atan2(py-cy, px-cx) + Math.PI/2;
          const ext = r*1.1;
          const tx1 = px - ext*Math.cos(tangAng), ty1 = py - ext*Math.sin(tangAng);
          const tx2 = px + ext*Math.cos(tangAng), ty2 = py + ext*Math.sin(tangAng);
          svg.appendChild(el("line",{x1:toX(tx1),y1:toY(ty1),x2:toX(tx2),y2:toY(ty2),stroke:c("yellow"),"stroke-width":2.2}));
        }
        svg.appendChild(el("circle",{cx:toX(px),cy:toY(py),r:4,fill:c("yellow")}));
        break;
      }

      case "vectors": {
        (spec.vecs||[]).forEach(v=>{
          const from=v.from||[0,0], to=v.to;
          const x1=toX(from[0]),y1=toY(from[1]),x2=toX(to[0]),y2=toY(to[1]);
          const ang=Math.atan2(y2-y1,x2-x1);
          const ah=8;
          svg.appendChild(el("line",{x1,y1,x2,y2,stroke:c(v.color||"yellow"),"stroke-width":2.4}));
          const a1x=x2-ah*Math.cos(ang-0.4), a1y=y2-ah*Math.sin(ang-0.4);
          const a2x=x2-ah*Math.cos(ang+0.4), a2y=y2-ah*Math.sin(ang+0.4);
          svg.appendChild(el("polygon",{points:`${x2},${y2} ${a1x},${a1y} ${a2x},${a2y}`,fill:c(v.color||"yellow")}));
          if(v.label){
            const t=el("text",{x:(x1+x2)/2+6,y:(y1+y2)/2-6,fill:c("chalk"),"font-size":12});
            t.textContent=v.label; svg.appendChild(t);
          }
        });
        break;
      }

      case "wave": {
        const amp=spec.amp||1, period=spec.period||6.283, phase=spec.phase||0;
        const fn = (x)=> amp*Math.sin((2*Math.PI/period)*x + phase);
        const d = curvePath(fn, spec.domain||[-7,7], 120);
        svg.appendChild(el("path",{d,stroke:c(spec.color||"blue"),"stroke-width":2.2,fill:"none"}));
        if(spec.fn2same){
          const fn2=(x)=> (spec.amp2||amp)*Math.sin((2*Math.PI/(spec.period2||period))*x + (spec.phase2||0));
          svg.appendChild(el("path",{d:curvePath(fn2,spec.domain||[-7,7],120),stroke:c("green"),"stroke-width":1.8,fill:"none","stroke-dasharray":"4 3"}));
        }
        break;
      }

      case "polar": {
        const fn = evalFn(spec.fn,"t");
        let d="";
        const tmax = spec.tmax||6.283;
        for(let i=0;i<=140;i++){
          const t = tmax*i/140;
          let r; try{ r=fn(t); }catch(e){ r=0; }
          const x=r*Math.cos(t), y=r*Math.sin(t);
          d += (i===0?"M":"L")+toX(x).toFixed(1)+","+toY(y).toFixed(1)+" ";
        }
        svg.appendChild(el("path",{d,stroke:c(spec.color||"green"),"stroke-width":2,fill:"none"}));
        break;
      }

      case "parametric": {
        const fx=evalFn(spec.x,"t"), fy=evalFn(spec.y,"t");
        let d=""; const tmax=spec.tmax||6.283, tmin=spec.tmin||0;
        for(let i=0;i<=140;i++){
          const t=tmin+(tmax-tmin)*i/140;
          let x,y; try{x=fx(t);y=fy(t);}catch(e){x=0;y=0;}
          d += (i===0?"M":"L")+toX(x).toFixed(1)+","+toY(y).toFixed(1)+" ";
        }
        svg.appendChild(el("path",{d,stroke:c(spec.color||"yellow"),"stroke-width":2.2,fill:"none"}));
        break;
      }

      case "complex": {
        (spec.pts||[]).forEach(p=>{
          svg.appendChild(el("line",{x1:toX(0),y1:toY(0),x2:toX(p.re),y2:toY(p.im),stroke:c(p.color||"yellow"),"stroke-width":2}));
          svg.appendChild(el("circle",{cx:toX(p.re),cy:toY(p.im),r:4.5,fill:c(p.color||"yellow")}));
          if(p.label){const t=el("text",{x:toX(p.re)+8,y:toY(p.im)-6,fill:c("chalk"),"font-size":11});t.textContent=p.label;svg.appendChild(t);}
        });
        break;
      }

      case "field": {
        const fn = evalFn(spec.fn,"p"); // p=[x,y] -> returns [dx,dy]
        for(let gx=-6;gx<=6;gx+=2){
          for(let gy=-5;gy<=5;gy+=2){
            let v; try{ v=fn([gx,gy]); }catch(e){ v=[0,0]; }
            const len=Math.hypot(v[0],v[1])||1;
            const nx=v[0]/len*0.7, ny=v[1]/len*0.7;
            const x1=toX(gx),y1=toY(gy),x2=toX(gx+nx),y2=toY(gy+ny);
            svg.appendChild(el("line",{x1,y1,x2,y2,stroke:c("green"),"stroke-width":1.6}));
            const ang=Math.atan2(y2-y1,x2-x1);
            svg.appendChild(el("polygon",{points:`${x2},${y2} ${x2-6*Math.cos(ang-0.4)},${y2-6*Math.sin(ang-0.4)} ${x2-6*Math.cos(ang+0.4)},${y2-6*Math.sin(ang+0.4)}`,fill:c("green")}));
          }
        }
        break;
      }

      case "matrix": {
        const m = spec.m; // [[a,b],[c,d]]
        const corners=[[0,0],[1,0],[1,1],[0,1]];
        const grey="rgba(244,241,233,0.25)";
        // original unit square
        let d0="M"+corners.map(p=>`${toX(p[0]*3)},${toY(p[1]*3)}`).join(" L")+" Z";
        svg.appendChild(el("path",{d:d0,fill:"none",stroke:grey,"stroke-width":1.5,"stroke-dasharray":"3 3"}));
        // transformed square
        const tp = corners.map(p=>[m[0][0]*p[0]+m[0][1]*p[1], m[1][0]*p[0]+m[1][1]*p[1]]);
        let d1="M"+tp.map(p=>`${toX(p[0]*3)},${toY(p[1]*3)}`).join(" L")+" Z";
        svg.appendChild(el("path",{d:d1,fill:"rgba(242,213,133,0.12)",stroke:c("yellow"),"stroke-width":2}));
        axes(svg,{});
        break;
      }

      case "region": {
        // shade y between two lines/functions across domain
        const f1=evalFn(spec.fn||"3","x"), f2=evalFn(spec.fn2||"-3","x");
        const [a,b]=spec.domain||[-5,5];
        let d="M";
        for(let i=0;i<=40;i++){const x=a+(b-a)*i/40; d+=`${toX(x).toFixed(1)},${toY(f1(x)).toFixed(1)} L`;}
        for(let i=40;i>=0;i--){const x=a+(b-a)*i/40; d+=`${toX(x).toFixed(1)},${toY(f2(x)).toFixed(1)} L`;}
        d+="Z";
        svg.appendChild(el("path",{d,fill:"rgba(169,214,160,0.22)",stroke:"none"}));
        break;
      }

      case "angle": {
        const r=3;
        svg.appendChild(el("circle",{cx:toX(0),cy:toY(0),r:r*SCALE,fill:"none",stroke:c("chalk"),"stroke-width":1.6}));
        const th = (spec.theta||45)*Math.PI/180;
        const px=r*Math.cos(th), py=r*Math.sin(th);
        svg.appendChild(el("line",{x1:toX(0),y1:toY(0),x2:toX(px),y2:toY(py),stroke:c("yellow"),"stroke-width":2.2}));
        svg.appendChild(el("line",{x1:toX(px),y1:toY(py),x2:toX(px),y2:toY(0),stroke:c("green"),"stroke-width":1.6,"stroke-dasharray":"4 3"}));
        svg.appendChild(el("line",{x1:toX(px),y1:toY(0),x2:toX(0),y2:toY(0),stroke:c("blue"),"stroke-width":1.6,"stroke-dasharray":"4 3"}));
        svg.appendChild(el("circle",{cx:toX(px),cy:toY(py),r:4,fill:c("yellow")}));
        const arcR=22;
        svg.appendChild(el("path",{d:`M ${toX(0)+arcR} ${toY(0)} A ${arcR} ${arcR} 0 0 0 ${toX(0)+arcR*Math.cos(th)} ${toY(0)-arcR*Math.sin(th)}`,fill:"none",stroke:c("yellow"),"stroke-width":1.4}));
        break;
      }

      case "conic": {
        const kind=spec.kind;
        if(kind==="ellipse"){
          const a=spec.a||3,b=spec.b||2;
          svg.appendChild(el("ellipse",{cx:toX(0),cy:toY(0),rx:a*SCALE,ry:b*SCALE,fill:"none",stroke:c("yellow"),"stroke-width":2.2}));
        } else if(kind==="parabola"){
          const fn=(x)=> (spec.a||0.3)*x*x - 4;
          svg.appendChild(el("path",{d:curvePath(fn,[-6,6]),stroke:c("yellow"),"stroke-width":2.2,fill:"none"}));
        } else if(kind==="hyperbola"){
          const a=spec.a||2,b=spec.b||2;
          const fn1=(x)=> b*Math.sqrt(Math.max(0,(x*x)/(a*a)-1));
          const fn2=(x)=> -fn1(x);
          svg.appendChild(el("path",{d:curvePath(fn1,[a,7]),stroke:c("yellow"),"stroke-width":2.2,fill:"none"}));
          svg.appendChild(el("path",{d:curvePath(fn2,[a,7]),stroke:c("yellow"),"stroke-width":2.2,fill:"none"}));
          svg.appendChild(el("path",{d:curvePath(fn1,[-7,-a]),stroke:c("green"),"stroke-width":2.2,fill:"none"}));
          svg.appendChild(el("path",{d:curvePath(fn2,[-7,-a]),stroke:c("green"),"stroke-width":2.2,fill:"none"}));
        }
        break;
      }

      case "phase": {
        let d=""; const n=200;
        for(let i=0;i<=n;i++){
          const t = i/n*8*Math.PI;
          let r;
          if(spec.kind==="spiral-in") r = 5*Math.exp(-t*0.06);
          else if(spec.kind==="spiral-out") r = 1*Math.exp(t*0.05);
          else r = 3;
          const x=r*Math.cos(t), y=r*Math.sin(t);
          d += (i===0?"M":"L")+toX(x).toFixed(1)+","+toY(y).toFixed(1)+" ";
        }
        svg.appendChild(el("path",{d,stroke:c("green"),"stroke-width":2,fill:"none"}));
        break;
      }

      default: break;
    }
  }

  /* ----------------------------------------------------------
     INTERACTIVE — draggable points (number line or grid).
     opts: {
       mode: 'numberline' | 'grid',
       points: [{id, x, y, label, color, lockY}],   // lockY for numberline-style drag-on-a-line-only in grid mode
       step: 0.5,
       compute(pts) -> { elements:[svgEl,...], readout: "html string" }
     }
     ---------------------------------------------------------- */
  function mountInteractive(container, opts){
    const svg = svgRoot();
    container.innerHTML = "";
    container.appendChild(svg);
    const readoutEl = document.createElement('div');
    readoutEl.className = 'dg-readout';
    container.appendChild(readoutEl);

    const step = opts.step || 0.5;
    const pts = opts.points.map(p=>Object.assign({}, p));
    const lo=-6, hi=6, nlSpan=W-40;
    const nlPx = (v)=> 20 + (v-lo)/(hi-lo)*nlSpan;
    const nlVal = (px)=> lo + (px-20)/nlSpan*(hi-lo);

    function ptPx(p){ return opts.mode==='numberline' ? nlPx(p.x) : toX(p.x); }
    function ptPy(p){ return opts.mode==='numberline' ? H/2 : toY(p.y); }

    function redraw(){
      svg.innerHTML = '';
      if(opts.mode==='grid'){
        axes(svg,{});
      } else {
        const y = H/2;
        svg.appendChild(el("line",{x1:20,y1:y,x2:W-20,y2:y,stroke:"#8fa093","stroke-width":1.6}));
        for(let i=lo;i<=hi;i++){
          svg.appendChild(el("line",{x1:nlPx(i),y1:y-5,x2:nlPx(i),y2:y+5,stroke:"#8fa093","stroke-width":1}));
        }
      }
      const derived = opts.compute(pts) || {};
      (derived.elements||[]).forEach(e=>svg.appendChild(e));
      pts.forEach(p=>{
        const cx = ptPx(p), cy = ptPy(p);
        if(p.label!=null){
          const t = el("text",{x:cx, y:cy-12, fill:colorOf("chalk"),"font-size":11,"text-anchor":"middle"});
          t.textContent = typeof p.label==='function' ? p.label(p) : p.label;
          svg.appendChild(t);
        }
        const handle = el("circle",{cx,cy,r:7,fill:colorOf(p.color||"yellow"),stroke:"#16291f","stroke-width":2});
        handle.style.cursor = "grab";
        handle.style.touchAction = "none";
        handle.addEventListener('pointerdown', (ev)=>{
          ev.preventDefault();
          handle.style.cursor = "grabbing";
          const move = (mv)=>{
            const rect = svg.getBoundingClientRect();
            const sx = (mv.clientX-rect.left)/rect.width*W;
            const sy = (mv.clientY-rect.top)/rect.height*H;
            if(opts.mode==='numberline'){
              p.x = round(nlVal(sx), step);
              p.x = Math.max(lo, Math.min(hi, p.x));
            } else {
              p.x = round((sx-PX)/SCALE, step);
              if(!p.lockY) p.y = round((PY-sy)/SCALE, step);
              p.x = Math.max(-7, Math.min(7, p.x));
              p.y = Math.max(-6, Math.min(6, p.y));
            }
            redraw();
          };
          const up = ()=>{
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
          };
          window.addEventListener('pointermove', move);
          window.addEventListener('pointerup', up);
        });
        svg.appendChild(handle);
      });
      readoutEl.innerHTML = derived.readout || '';
    }
    redraw();
  }

  /* ----------------------------------------------------------
     INTERACTIVE — sliders (for y = mx + c style controls).
     opts: {
       sliders: [{id, label, min, max, step, default}],
       compute(vals) -> { elements:[svgEl,...], readout: "html string" }
     }
     ---------------------------------------------------------- */
  function mountSliders(container, opts){
    const svg = svgRoot();
    container.innerHTML = "";
    container.appendChild(svg);
    const readoutEl = document.createElement('div');
    readoutEl.className = 'dg-readout';
    container.appendChild(readoutEl);
    const slidersEl = document.createElement('div');
    slidersEl.className = 'dg-sliders';
    container.appendChild(slidersEl);

    const vals = {};
    opts.sliders.forEach(s=>{ vals[s.id] = s.default; });

    function redraw(){
      svg.innerHTML = '';
      axes(svg,{});
      const derived = opts.compute(vals) || {};
      (derived.elements||[]).forEach(e=>svg.appendChild(e));
      readoutEl.innerHTML = derived.readout || '';
    }

    opts.sliders.forEach(s=>{
      const row = document.createElement('div');
      row.className = 'dg-slider-row';
      const lbl = document.createElement('span');
      lbl.className = 'dg-slider-label';
      lbl.textContent = s.label + ': ';
      const valSpan = document.createElement('span');
      valSpan.className = 'dg-slider-val';
      valSpan.textContent = s.default;
      const input = document.createElement('input');
      input.type = 'range'; input.min = s.min; input.max = s.max;
      input.step = s.step || 1; input.value = s.default;
      input.addEventListener('input', ()=>{
        vals[s.id] = parseFloat(input.value);
        valSpan.textContent = vals[s.id];
        redraw();
      });
      row.appendChild(lbl); row.appendChild(input); row.appendChild(valSpan);
      slidersEl.appendChild(row);
    });

    redraw();
  }

  return { render, mountInteractive, mountSliders, el, toX, toY, colorOf };
})();
