/* ============================================================
   Graph rendering — builds the SVG from graph-data.js + the
   settled positions from graph-layout.js.
   ============================================================ */
const GraphRender = (function () {
  const SVG_NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs) {
    const node = document.createElementNS(SVG_NS, tag);
    if (attrs) for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function buildGraph() {
    const nodes = [];
    Object.keys(CURRICULUM_TOPICS).forEach(function (id) {
      nodes.push({ id: "t" + id, topicId: Number(id), isHub: false, data: CURRICULUM_TOPICS[id] });
    });
    HUB_NODES.forEach(function (h) {
      nodes.push({ id: h.id, isHub: true, data: h });
    });

    const edges = [];
    HUB_NODES.forEach(function (h) {
      h.topics.forEach(function (t) {
        edges.push({ source: h.id, target: "t" + t, idealLen: 90, kind: "hub" });
      });
    });
    BRIDGE_EDGES.forEach(function (b) {
      edges.push({ source: "t" + b.from, target: "t" + b.to, idealLen: 130, kind: "bridge", builtStatus: b.builtStatus });
    });

    return { nodes: nodes, edges: edges };
  }

  function hashString(str) {
    // djb2 - simple, deterministic, good enough to detect structural changes
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    }
    return (h >>> 0).toString(36);
  }

  function getCacheKey(nodes, edges) {
    const nodeIds = nodes.map(function (n) { return n.id; }).sort().join(",");
    const edgePairs = edges.map(function (e) { return e.source + ">" + e.target; }).sort().join(",");
    return "strata-graph-layout-v1:" + hashString(nodeIds + "|" + edgePairs);
  }

  function getPositions(nodes, edges) {
    const key = getCacheKey(nodes, edges);
    try {
      const cached = localStorage.getItem(key);
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    const positions = runForceLayout(nodes, edges);
    try { localStorage.setItem(key, JSON.stringify(positions)); } catch (e) {}
    return positions;
  }

  function firstUnreadCard(pathId) {
    const manifest = PATHS_MANIFEST[pathId];
    const data = ProgressStore._load();
    for (const n of manifest.cards) {
      if (!data.boards[n] || !data.boards[n].firstOpenedAt) return n;
    }
    return manifest.cards[0];
  }

  // A pathId means real ProgressStore tracking exists, regardless of whether
  // CURRICULUM.md's status is "built" or "partial" (that flag describes content
  // completeness, a different question from whether progress is tracked at all).
  function statusLabel(node) {
    if (node.isHub) return "Hub concept";
    const d = node.data;
    if (d.pathId) {
      const st = ProgressStore.getPathState(d.pathId);
      return st.label;
    }
    if (d.status === "partial") return "Partial — some content exists";
    return "Not started yet";
  }

  function nodeClass(node) {
    if (node.isHub) return "graph-node hub";
    const d = node.data;
    if (d.pathId) {
      const st = ProgressStore.getPathState(d.pathId);
      return "graph-node topic built " + st.state;
    }
    return "graph-node topic " + d.status;
  }

  function renderGraph(container, popoverEl) {
    container.innerHTML = "";
    const graph = buildGraph();
    const positions = getPositions(graph.nodes, graph.edges);

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    graph.nodes.forEach(function (n) {
      const p = positions[n.id];
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
    });
    const pad = 60;
    const vbX = minX - pad, vbY = minY - pad, vbW = (maxX - minX) + pad * 2, vbH = (maxY - minY) + pad * 2;

    const svg = el("svg", {
      viewBox: vbX + " " + vbY + " " + vbW + " " + vbH,
      class: "graph-svg"
    });

    const edgeGroup = el("g", { class: "edges" });
    graph.edges.forEach(function (e) {
      const a = positions[e.source], b = positions[e.target];
      const line = el("line", {
        x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        class: "graph-edge " + e.kind + (e.builtStatus ? " " + e.builtStatus : "")
      });
      edgeGroup.appendChild(line);
    });
    svg.appendChild(edgeGroup);

    const nodeGroup = el("g", { class: "nodes" });
    graph.nodes.forEach(function (n) {
      const p = positions[n.id];
      const r = n.isHub ? 34 : 20;
      const g = el("g", { class: nodeClass(n), transform: "translate(" + p.x + "," + p.y + ")", "data-id": n.id });
      g.appendChild(el("circle", { r: r, class: "node-circle" }));
      if (n.isHub) {
        const label = el("text", { class: "node-label", y: r + 14, "text-anchor": "middle" });
        label.textContent = n.data.name;
        g.appendChild(label);
      }
      g.addEventListener("click", function () { onNodeTap(n, popoverEl); });
      nodeGroup.appendChild(g);
    });
    svg.appendChild(nodeGroup);

    container.appendChild(svg);
    container._graphBox = { vbW: vbW, vbH: vbH };
  }

  function onNodeTap(node, popoverEl) {
    if (!popoverEl) return;
    if (node.isHub) {
      popoverEl.innerHTML =
        '<div class="popover-name">' + node.data.name + '</div>' +
        '<div class="popover-status">Hub concept</div>' +
        '<div class="popover-desc">' + node.data.description + '</div>';
    } else {
      const d = node.data;
      if (d.pathId) {
        const target = firstUnreadCard(d.pathId);
        popoverEl.innerHTML =
          '<div class="popover-name">' + d.name + '</div>' +
          '<div class="popover-status">' + statusLabel(node) + '</div>' +
          '<a class="popover-go" href="index.html?card=' + target + '">Open ›</a>';
      } else {
        popoverEl.innerHTML =
          '<div class="popover-name">' + d.name + '</div>' +
          '<div class="popover-status">' + statusLabel(node) + '</div>';
      }
    }
    popoverEl.classList.add("active");
  }

  return { renderGraph: renderGraph, buildGraph: buildGraph };
})();
