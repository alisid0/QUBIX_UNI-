/* ============================================================
   INTERACTIVE SPECS — drag/slider configs for BBs where
   manipulation teaches better than a static picture.
   Consumed by COORDINATE-GEOMETRY-REVIEW.html via diagram-engine.js
   (DG.mountInteractive / DG.mountSliders).
   ============================================================ */

const { el, toX, toY, colorOf } = DG;

function lineEl(x1, y1, x2, y2, color, dashed){
  return el("line", {x1:toX(x1), y1:toY(y1), x2:toX(x2), y2:toY(y2),
    stroke: colorOf(color||"yellow"), "stroke-width": 2.2,
    "stroke-dasharray": dashed ? "4 3" : ""});
}
function nlLineRaw(x1px, y, x2px, color){
  return el("line", {x1:x1px, y1:y, x2:x2px, y2:y, stroke: colorOf(color||"yellow"), "stroke-width": 3});
}
function markerEl(x, y, color){
  return el("circle", {cx:toX(x), cy:toY(y), r:5, fill: colorOf(color||"green")});
}
function fmt(n){ return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/,''); }

const INTERACTIVE_SPECS = {

  // ---- Tier 0: number line ----
  CG1: { mode:"numberline", points:[{id:"a", x:2, label:p=>fmt(p.x), color:"yellow"}],
    compute: (pts)=>({ readout: `Drag the point. Its value is <strong>${fmt(pts[0].x)}</strong>.` }) },

  CG3: { mode:"numberline", points:[{id:"a", x:3, label:p=>fmt(p.x), color:"yellow"}],
    compute: (pts)=>{
      const x = pts[0].x;
      const sign = x>0?"positive":x<0?"negative":"zero";
      return { readout: `${fmt(x)} is <strong>${sign}</strong> — ${Math.abs(x)} step${Math.abs(x)===1?'':'s'} ${x>=0?'right':'left'} of zero.` };
    } },

  CG5: { mode:"numberline", points:[{id:"a", x:-3, label:p=>fmt(p.x), color:"yellow"}, {id:"b", x:-7, label:p=>fmt(p.x), color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const bigger = a.x===b.x ? null : (a.x>b.x?a:b);
      return { readout: bigger ? `<strong>${fmt(bigger.x)}</strong> is bigger — it sits further right.` : "Equal — same spot on the line." };
    } },

  CG6: { mode:"numberline", points:[{id:"a", x:2, label:p=>fmt(p.x), color:"yellow"}, {id:"b", x:9, label:p=>fmt(p.x), color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const dist = Math.abs(a.x-b.x);
      const lo = Math.min(a.x,b.x), hi = Math.max(a.x,b.x);
      const nlPx = (v)=> 20 + (v+6)/12*(260-40);
      return { elements:[nlLineRaw(nlPx(lo), 100, nlPx(hi), "green")],
        readout: `Distance = |${fmt(a.x)} − ${fmt(b.x)}| = <strong>${fmt(dist)}</strong>` };
    } },

  CG7: { mode:"numberline", points:[{id:"a", x:2, label:p=>fmt(p.x), color:"yellow"}, {id:"b", x:9, label:p=>fmt(p.x), color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const mid = (a.x+b.x)/2;
      const nlPx = (v)=> 20 + (v+6)/12*(260-40);
      return { elements:[el("circle",{cx:nlPx(mid), cy:100, r:5, fill:colorOf("blue")})],
        readout: `Midpoint = (${fmt(a.x)} + ${fmt(b.x)}) / 2 = <strong>${fmt(mid)}</strong>` };
    } },

  // ---- Tier 0: grid ----
  CG11: { mode:"grid", points:[{id:"p", x:3, y:4, label:p=>`(${fmt(p.x)}, ${fmt(p.y)})`, color:"yellow"}],
    compute: (pts)=>({ readout: `Point at <strong>(${fmt(pts[0].x)}, ${fmt(pts[0].y)})</strong>` }) },

  CG12: { mode:"grid", points:[{id:"p", x:-2, y:3, label:p=>`(${fmt(p.x)}, ${fmt(p.y)})`, color:"yellow"}],
    compute: (pts)=>{
      const p = pts[0];
      return { elements:[
          lineEl(p.x, p.y, p.x, 0, "green", true),
          lineEl(p.x, p.y, 0, p.y, "blue", true)
        ],
        readout: `Drop to the x-axis: x = <strong>${fmt(p.x)}</strong>. Drop to the y-axis: y = <strong>${fmt(p.y)}</strong>.` };
    } },

  CG14: { mode:"grid", points:[{id:"p", x:2, y:2, label:p=>`(${fmt(p.x)}, ${fmt(p.y)})`, color:"yellow"}],
    compute: (pts)=>{
      const {x,y} = pts[0];
      const quad = x>=0 ? (y>=0?'I':'IV') : (y>=0?'II':'III');
      return { readout: `Signs (${x>=0?'+':'−'}, ${y>=0?'+':'−'}) → Quadrant <strong>${quad}</strong>` };
    } },

  CG16: { mode:"grid", points:[{id:"a", x:1, y:1, label:"A", color:"yellow"}, {id:"b", x:5, y:4, label:"B", color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
      return { elements:[lineEl(a.x,a.y,b.x,b.y,"chalk",true), markerEl(mx,my,"blue")],
        readout: `Midpoint = ((${fmt(a.x)}+${fmt(b.x)})/2, (${fmt(a.y)}+${fmt(b.y)})/2) = <strong>(${fmt(mx)}, ${fmt(my)})</strong>` };
    } },

  // ---- Tier 1: lines via two draggable points ----
  CG19: { mode:"grid", points:[{id:"a", x:1, y:2, label:"A", color:"yellow"}, {id:"b", x:4, y:5, label:"B", color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const dy=b.y-a.y, dx=b.x-a.x;
      return { elements:[lineEl(a.x,a.y,b.x,b.y,"chalk")],
        readout: `Δy = ${fmt(b.y)} − ${fmt(a.y)} = <strong>${fmt(dy)}</strong> &nbsp; Δx = ${fmt(b.x)} − ${fmt(a.x)} = <strong>${fmt(dx)}</strong>` };
    } },

  CG20: { mode:"grid", points:[{id:"a", x:1, y:2, label:"A", color:"yellow"}, {id:"b", x:4, y:8, label:"B", color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const dy=b.y-a.y, dx=b.x-a.x;
      const m = dx===0 ? null : dy/dx;
      return { elements:[lineEl(a.x,a.y,b.x,b.y,"chalk")],
        readout: m===null
          ? `Δx = 0 — gradient is <strong>undefined</strong>`
          : `m = Δy/Δx = ${fmt(dy)}/${fmt(dx)} = <strong>${fmt(m)}</strong>` };
    } },

  CG22: { mode:"grid", points:[{id:"a", x:-3, y:2, label:"A", color:"yellow"}, {id:"b", x:3, y:2, label:"B", color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const dy=b.y-a.y, dx=b.x-a.x;
      const m = dx===0 ? null : dy/dx;
      return { elements:[lineEl(a.x,a.y,b.x,b.y,"chalk")],
        readout: `Drag B level with A to flatten the line. ` + (m===null ? `Δx = 0 — undefined.` : `m = ${fmt(dy)}/${fmt(dx)} = <strong>${fmt(m)}</strong>${m===0?' — flat.':''}`) };
    } },

  CG23: { mode:"grid", points:[{id:"a", x:2, y:-3, label:"A", color:"yellow"}, {id:"b", x:2, y:3, label:"B", color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const dy=b.y-a.y, dx=b.x-a.x;
      return { elements:[lineEl(a.x,a.y,b.x,b.y,"chalk")],
        readout: dx===0 ? `Δx = 0 — division by zero — gradient is <strong>undefined</strong>.` : `m = ${fmt(dy)}/${fmt(dx)} = <strong>${fmt(dy/dx)}</strong>` };
    } },

  CG26: { mode:"grid", points:[{id:"a", x:2, y:7, label:"A", color:"yellow"}, {id:"b", x:5, y:16, label:"B", color:"green"}],
    compute: (pts)=>{
      const [a,b] = pts;
      const dx=b.x-a.x;
      if(dx===0) return { elements:[lineEl(a.x,a.y,b.x,b.y,"chalk")], readout:"Δx = 0 — pick two points with different x." };
      const m=(b.y-a.y)/dx;
      const c = a.y - m*a.x;
      return { elements:[lineEl(-7, m*-7+c, 7, m*7+c, "chalk")],
        readout: `m = <strong>${fmt(m)}</strong>, c = <strong>${fmt(c)}</strong> → y = ${fmt(m)}x ${c>=0?'+':'−'} ${fmt(Math.abs(c))}` };
    } },

  // ---- Tier 1: lines via sliders (y = mx + c family) ----
  CG24: { sliders:[{id:"m",label:"m",min:-3,max:3,step:0.5,default:1},{id:"c",label:"c",min:-5,max:5,step:1,default:2}],
    compute: (v)=>({ elements:[lineEl(-7, v.m*-7+v.c, 7, v.m*7+v.c, "yellow")],
      readout: `y = ${fmt(v.m)}x ${v.c>=0?'+':'−'} ${fmt(Math.abs(v.c))}` }) },

  CG25: { sliders:[{id:"m1",label:"line 1: m",min:-3,max:3,step:0.5,default:2},{id:"c1",label:"line 1: c",min:-5,max:5,step:1,default:3},
                    {id:"m2",label:"line 2: m",min:-3,max:3,step:0.5,default:2},{id:"c2",label:"line 2: c",min:-5,max:5,step:1,default:7}],
    compute: (v)=>({ elements:[lineEl(-7, v.m1*-7+v.c1, 7, v.m1*7+v.c1, "yellow"), lineEl(-7, v.m2*-7+v.c2, 7, v.m2*7+v.c2, "green", true)],
      readout: `Yellow: y=${fmt(v.m1)}x+${fmt(v.c1)} &nbsp; Green: y=${fmt(v.m2)}x+${fmt(v.c2)} — ${v.m1===v.m2?'same lean, different position':'different lean'}` }) },

  CG27: { sliders:[{id:"m",label:"shared m",min:-3,max:3,step:0.5,default:2},{id:"c1",label:"c (line 1)",min:-5,max:5,step:1,default:3},{id:"c2",label:"c (line 2)",min:-5,max:5,step:1,default:-2}],
    compute: (v)=>({ elements:[lineEl(-7, v.m*-7+v.c1, 7, v.m*7+v.c1, "yellow"), lineEl(-7, v.m*-7+v.c2, 7, v.m*7+v.c2, "green", true)],
      readout: `Same m = ${fmt(v.m)} → always parallel, however far you drag c apart.` }) },

  CG28: { sliders:[{id:"m1",label:"m (line 1)",min:-3,max:3,step:0.25,default:2}],
    compute: (v)=>{
      const m2 = v.m1===0 ? 999 : -1/v.m1;
      return { elements:[lineEl(-7, v.m1*-7, 7, v.m1*7, "yellow"), lineEl(-7, m2*-7, 7, m2*7, "green")],
        readout: `m₁ = ${fmt(v.m1)}, m₂ = −1/m₁ = <strong>${fmt(m2)}</strong>. Check: ${fmt(v.m1)} × ${fmt(m2)} = ${fmt(v.m1*m2)}` };
    } },

  CG29: { sliders:[{id:"m",label:"m",min:-3,max:3,step:0.5,default:2},{id:"c",label:"c",min:-6,max:6,step:1,default:-6}],
    compute: (v)=>{
      const root = v.m===0 ? null : -v.c/v.m;
      return { elements:[lineEl(-7, v.m*-7+v.c, 7, v.m*7+v.c, "yellow")].concat(root!==null?[markerEl(root,0,"green")]:[]),
        readout: root===null ? "m = 0 — flat line, never crosses (unless c = 0)." : `Set y=0: x = <strong>${fmt(root)}</strong> — the root.` };
    } },

  CG30: { sliders:[{id:"m",label:"m",min:-3,max:3,step:0.5,default:2},{id:"c",label:"c",min:-6,max:6,step:1,default:-6}],
    compute: (v)=>({ elements:[lineEl(-7, v.m*-7+v.c, 7, v.m*7+v.c, "yellow"), markerEl(0,v.c,"blue")],
      readout: `At x = 0: y = <strong>${fmt(v.c)}</strong> — matches c exactly.` }) },

  CG31: { sliders:[{id:"m1",label:"line 1: m",min:-3,max:3,step:0.5,default:2},{id:"c1",label:"line 1: c",min:-6,max:6,step:1,default:-6},
                    {id:"m2",label:"line 2: m",min:-3,max:3,step:0.5,default:-1},{id:"c2",label:"line 2: c",min:-6,max:6,step:1,default:9}],
    compute: (v)=>{
      if(v.m1===v.m2) return { elements:[lineEl(-7,v.m1*-7+v.c1,7,v.m1*7+v.c1,"yellow"),lineEl(-7,v.m2*-7+v.c2,7,v.m2*7+v.c2,"green")], readout:"Same gradient — parallel, never meet." };
      const x = (v.c2-v.c1)/(v.m1-v.m2);
      const y = v.m1*x+v.c1;
      return { elements:[lineEl(-7,v.m1*-7+v.c1,7,v.m1*7+v.c1,"yellow"),lineEl(-7,v.m2*-7+v.c2,7,v.m2*7+v.c2,"green"),markerEl(x,y,"blue")],
        readout: `They meet at <strong>(${fmt(x)}, ${fmt(y)})</strong>` };
    } },

};
