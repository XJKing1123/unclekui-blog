import type { KnowledgeGraphData, KnowledgeGraphLink, KnowledgeGraphNode } from '../lib/knowledge-graph';
import { COLUMNS, SERIES } from '../config/site';

type PositionedNode = KnowledgeGraphNode & { x?: number; y?: number; z?: number };
type RuntimeLink = Omit<KnowledgeGraphLink, 'source' | 'target'> & {
  source: string | PositionedNode;
  target: string | PositionedNode;
};

const COLUMN_COLORS: Record<string, string> = {
  flutter: '#10a37f',
  ios: '#ef476f',
  react: '#20a4f3',
  web3: '#f3a712',
};

function endpointId(endpoint: string | PositionedNode) {
  return typeof endpoint === 'string' ? endpoint : endpoint.id;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export async function initKnowledgeGraph() {
  const root = document.querySelector<HTMLElement>('[data-knowledge-explorer]');
  const dataElement = document.querySelector<HTMLScriptElement>('#knowledge-graph-data');
  if (!root || !dataElement) return;

  const data = JSON.parse(dataElement.textContent ?? '{}') as KnowledgeGraphData;
  const graphView = root.querySelector<HTMLElement>('[data-graph-view]');
  const listView = root.querySelector<HTMLElement>('[data-list-view]');
  const container = root.querySelector<HTMLElement>('#knowledge-graph');
  const status = root.querySelector<HTMLElement>('[data-graph-status]');
  const label = root.querySelector<HTMLElement>('[data-node-label]');
  const detail = root.querySelector<HTMLElement>('[data-knowledge-detail]');
  const search = root.querySelector<HTMLInputElement>('#knowledge-search');
  const filter = root.querySelector<HTMLSelectElement>('#knowledge-column-filter');
  const viewButtons = root.querySelectorAll<HTMLButtonElement>('[data-view]');
  const actionButtons = root.querySelectorAll<HTMLButtonElement>('[data-action]');
  const mobile = matchMedia('(max-width: 680px)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  let selected: PositionedNode | null = null;
  let expandedSeries: string | null = null;
  let graph: any = null;
  let frame = 0;
  let graphRevision = 0;
  let resizeObserver: ResizeObserver | null = null;
  let disposed = false;
  let lastClick = { id: '', time: 0 };
  const nodeById = new Map(data.nodes.map((node) => [node.id, node]));

  const showView = (view: 'graph' | 'list') => {
    if (graphView) graphView.hidden = view !== 'graph';
    if (listView) listView.hidden = view !== 'list';
    viewButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
    actionButtons.forEach((button) => { button.disabled = view !== 'graph'; });
    if (view === 'graph' && graph && container) {
      requestAnimationFrame(() => graph.width(container.clientWidth).height(container.clientHeight));
    }
  };

  const showFallback = (message: string) => {
    if (status) status.textContent = message;
    showView('list');
  };

  viewButtons.forEach((button) => button.addEventListener('click', () => showView(button.dataset.view === 'list' ? 'list' : 'graph')));

  if (!container || mobile || saveData || !supportsWebGL() || (navigator.hardwareConcurrency ?? 4) <= 2) {
    showFallback('当前设备已切换到轻量列表视图。');
    return;
  }
  const graphContainer = container;

  try {
    const [{ default: ForceGraph3D }, THREE, { default: SpriteText }] = await Promise.all([
      import('3d-force-graph'),
      import('three'),
      import('three-spritetext'),
    ]);
    if (disposed) return;

    const geometries = {
      column: new THREE.IcosahedronGeometry(8, 1),
      series: new THREE.SphereGeometry(5, 20, 14),
      article: new THREE.SphereGeometry(2.45, 14, 10),
    };
    const materials = new Map<string, InstanceType<typeof THREE.MeshStandardMaterial>>();
    const nodeObjects = new Map<string, InstanceType<typeof THREE.Group>>();
    const labelSprites = new Map<string, InstanceType<typeof SpriteText>>();

    const compactLabel = (node: PositionedNode) => {
      if (node.type === 'column') return `${node.label}\n${node.articleCount ?? 0} 篇文章`;
      if (node.type === 'series') return `${node.label} · ${node.articleCount ?? 0} 篇`;
      const title = node.label.length > 18 ? `${node.label.slice(0, 18)}…` : node.label;
      return `${String(node.order ?? 0).padStart(2, '0')}  ${title}`;
    };

    const makeNodeObject = (node: PositionedNode) => {
      const color = COLUMN_COLORS[node.column] ?? '#7c68ee';
      const group = new THREE.Group();
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: node.type === 'article' ? 0.12 : 0.2,
        roughness: 0.42,
        metalness: node.type === 'column' ? 0.22 : 0.05,
        transparent: true,
        opacity: 0.96,
      });
      materials.set(node.id, material);
      const mesh = new THREE.Mesh(geometries[node.type], material);
      group.add(mesh);

      if (node.type !== 'article') {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(node.type === 'column' ? 11 : 7, .28, 8, 40),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .48 }),
        );
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }

      if (node.type !== 'article') {
        const dark = document.documentElement.dataset.theme === 'dark';
        const sprite = new SpriteText(compactLabel(node));
        sprite.textHeight = node.type === 'column' ? 7.2 : 5.4;
        sprite.fontFace = 'Inter, PingFang SC, Microsoft YaHei, sans-serif';
        sprite.fontWeight = '700';
        sprite.color = dark ? '#f2f4f5' : '#17191c';
        sprite.backgroundColor = dark ? 'rgba(23,26,29,.88)' : 'rgba(255,255,255,.9)';
        sprite.borderColor = `${color}aa`;
        sprite.borderWidth = .2;
        sprite.borderRadius = 3;
        sprite.padding = [1.1, .55];
        sprite.position.y = node.type === 'column' ? 15 : 10;
        group.add(sprite);
        labelSprites.set(node.id, sprite);
      }
      nodeObjects.set(node.id, group);
      return group;
    };

    const disposeNodeDecorations = () => {
      nodeObjects.forEach((group) => group.children.slice(1).forEach((object: any) => {
        object.geometry?.dispose?.();
        object.material?.map?.dispose?.();
        object.material?.dispose?.();
      }));
    };

    const GraphConstructor = ForceGraph3D as any;
    graph = new GraphConstructor(container, { rendererConfig: { antialias: !mobile, alpha: false } })
      .backgroundColor(getComputedStyle(document.documentElement).getPropertyValue('--bg').trim())
      .showNavInfo(false)
      .nodeThreeObject(makeNodeObject)
      .nodeLabel(() => '')
      .linkWidth((link: RuntimeLink) => selected && isAdjacent(link, selected.id) ? 2.4 : link.type === 'contains' ? 0.45 : 1.15)
      .linkColor((link: RuntimeLink) => linkColor(link, selected?.id ?? null))
      .linkOpacity(0.76)
      .linkDirectionalArrowLength((link: RuntimeLink) => link.type === 'contains' ? 0 : 3)
      .linkDirectionalArrowRelPos(0.82)
      .linkDirectionalParticles((link: RuntimeLink) => reducedMotion || !selected || link.type === 'contains' || !isAdjacent(link, selected.id) ? 0 : 1)
      .linkDirectionalParticleWidth(1.35)
      .linkDirectionalParticleSpeed(0.003)
      .cooldownTicks(mobile ? 40 : data.nodes.length > 100 ? 55 : 80)
      .d3AlphaDecay(data.nodes.length > 100 ? 0.06 : 0.045)
      .d3VelocityDecay(0.42)
      .onNodeClick((node: PositionedNode) => {
        const now = performance.now();
        if (node.type === 'article' && lastClick.id === node.id && now - lastClick.time < 360) {
          location.href = node.href;
          return;
        }
        lastClick = { id: node.id, time: now };
        if (mobile && node.type === 'series') {
          expandedSeries = node.id;
          updateGraph();
          requestAnimationFrame(() => focusNode(node));
        } else {
          selectNode(node);
        }
      })
      .onNodeHover((node: PositionedNode | null, previous: PositionedNode | null) => {
        if (previous) nodeObjects.get(previous.id)?.scale.setScalar(1);
        if (node) nodeObjects.get(node.id)?.scale.setScalar(node.type === 'article' ? 1.28 : 1.12);
      })
      .onBackgroundClick(() => selectNode(null))
      .onEngineStop(() => {
        if (status) status.hidden = true;
        if (!selected) fitGraph();
      });

    graph.renderer().setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : data.nodes.length > 100 ? 1.5 : 1.75));
    graph.scene().add(new THREE.AmbientLight(0xffffff, 1.55));
    const light = new THREE.DirectionalLight(0xffffff, 2.2);
    light.position.set(100, 80, 120);
    graph.scene().add(light);
    graph.d3Force('charge')?.strength(mobile ? -95 : -135);
    graph.d3Force('link')?.distance((link: RuntimeLink) => link.type === 'contains' ? 48 : 31);

    function isAdjacent(link: RuntimeLink, id: string) {
      return endpointId(link.source) === id || endpointId(link.target) === id;
    }

    function fitGraph(duration = reducedMotion ? 0 : 520) {
      const nodes = graph.graphData().nodes.filter((node: PositionedNode) => node.x != null && node.y != null && node.z != null);
      if (nodes.length === 0) return;
      const xs = nodes.map((node: PositionedNode) => node.x as number);
      const ys = nodes.map((node: PositionedNode) => node.y as number);
      const zs = nodes.map((node: PositionedNode) => node.z as number);
      const center = {
        x: (Math.min(...xs) + Math.max(...xs)) / 2,
        y: (Math.min(...ys) + Math.max(...ys)) / 2,
        z: (Math.min(...zs) + Math.max(...zs)) / 2,
      };
      const spanX = Math.max(...xs) - Math.min(...xs) + 55;
      const spanY = Math.max(...ys) - Math.min(...ys) + 45;
      const camera = graph.camera();
      const halfFov = (camera.fov * Math.PI / 180) / 2;
      const aspect = Math.max(graphContainer.clientWidth / graphContainer.clientHeight, .5);
      const distance = Math.max(spanY / (2 * Math.tan(halfFov)), spanX / (2 * Math.tan(halfFov) * aspect)) * (mobile ? 1.55 : 1.38);
      graph.cameraPosition(
        { x: center.x, y: center.y, z: center.z + distance },
        center,
        duration,
      );
    }

    function linkColor(link: RuntimeLink, selectedId: string | null) {
      if (selectedId && !isAdjacent(link, selectedId)) return 'rgba(125, 135, 145, 0.08)';
      if (link.type === 'prerequisite') return '#ef476f';
      if (link.type === 'sequence') return '#8b7cf6';
      return document.documentElement.dataset.theme === 'dark' ? 'rgba(168,175,183,.32)' : 'rgba(98,105,113,.26)';
    }

    function visibleData() {
      const column = filter?.value ?? 'all';
      const matching = data.nodes.filter((node) => column === 'all' || node.column === column);
      const visible = mobile
        ? matching.filter((node) => node.type !== 'article' || (expandedSeries && `series:${node.series}` === expandedSeries))
        : matching;
      const ids = new Set(visible.map((node) => node.id));
      const columnIndex: Record<string, number> = { flutter: 0, react: 1, web3: 2, ios: 3 };
      return {
        nodes: visible.map((node) => {
          const seed = [...node.id].reduce((value, character) => ((value * 31) + character.charCodeAt(0)) | 0, 7);
          const cluster = columnIndex[node.column] ?? 4;
          const rootPosition = mobile
            ? { x: 0, y: (cluster - 1) * 95 }
            : { x: (cluster - 1) * 125, y: 0 };
          return {
            ...node,
            x: mobile ? (seed % 25) - 12 : (cluster - 1) * 105 + (seed % 29),
            y: mobile ? (cluster - 1) * 80 + ((seed >> 3) % 30) : ((seed >> 3) % 80) - 40,
            z: ((seed >> 7) % 70) - 35,
            ...(node.type === 'column' ? { fx: rootPosition.x, fy: rootPosition.y, fz: 0 } : {}),
          };
        }),
        links: data.links.filter((link) => ids.has(link.source) && ids.has(link.target)).map((link) => ({ ...link })),
      };
    }

    function updateGraph() {
      const revision = ++graphRevision;
      selected = null;
      hideDetail();
      disposeNodeDecorations();
      materials.forEach((material) => material.dispose());
      materials.clear();
      nodeObjects.clear();
      labelSprites.clear();
      graph.graphData(visibleData());
      if (status) {
        status.hidden = false;
        status.textContent = mobile && !expandedSeries ? '选择一个系列以展开文章' : '正在整理关系…';
      }
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (revision !== graphRevision || disposed) return;
        fitGraph(0);
        if (status) status.hidden = true;
      }));
    }

    function focusNode(node: PositionedNode) {
      if (node.x == null || node.y == null || node.z == null) return;
      const distance = node.type === 'article' ? 138 : 175;
      const length = Math.hypot(node.x, node.y, node.z) || 1;
      const ratio = 1 + distance / length;
      graph.cameraPosition(
        { x: node.x * ratio, y: node.y * ratio, z: node.z * ratio },
        { x: node.x, y: node.y, z: node.z },
        reducedMotion ? 0 : 650,
      );
    }

    function selectNode(node: PositionedNode | null) {
      selected = node;
      graph.linkWidth(graph.linkWidth());
      graph.linkColor(graph.linkColor());
      graph.linkDirectionalParticles(graph.linkDirectionalParticles());
      materials.forEach((material, id) => {
        const related = !node || id === node.id || data.links.some((link) => isAdjacent(link, node.id) && (link.source === id || link.target === id));
        material.opacity = related ? 0.96 : 0.18;
      });
      labelSprites.forEach((sprite) => { sprite.visible = !node; });
      if (!node) {
        hideDetail();
        if (label) label.hidden = true;
        return;
      }
      focusNode(node);
      showDetail(node);
    }

    function relationLinks(nodeId: string, direction: 'before' | 'after') {
      return data.links
        .filter((link) => link.type !== 'contains' && (direction === 'before' ? link.target === nodeId : link.source === nodeId))
        .map((link) => nodeById.get(direction === 'before' ? link.source : link.target))
        .filter((node): node is KnowledgeGraphNode => Boolean(node));
    }

    function showDetail(node: PositionedNode) {
      if (!detail) return;
      detail.hidden = false;
      detail.querySelector<HTMLElement>('[data-detail-kind]')!.textContent = node.type === 'article' ? `${COLUMNS[node.column].name} · ${node.series ? (SERIES[node.series]?.name ?? node.series) : ''}` : node.type === 'series' ? '知识系列' : '技术栏目';
      detail.querySelector<HTMLElement>('[data-detail-title]')!.textContent = node.label;
      const meta = detail.querySelector<HTMLElement>('[data-detail-meta]')!;
      const before = relationLinks(node.id, 'before');
      const after = relationLinks(node.id, 'after');
      const metaItems = node.type === 'article'
        ? [`第 ${node.order ?? '-'} 篇`, `${before.length} 个前置`, `${after.length} 个后续`, ...(node.tags ?? [])]
        : [`${node.articleCount ?? 0} 篇文章`, node.type === 'series' ? '知识系列' : '技术栏目'];
      meta.replaceChildren(...metaItems.map((item) => {
        const span = document.createElement('span');
        span.textContent = item;
        return span;
      }));
      detail.querySelector<HTMLElement>('[data-detail-description]')!.textContent = node.description ?? '';
      renderRelations(detail.querySelector<HTMLElement>('[data-detail-before]')!, before);
      renderRelations(detail.querySelector<HTMLElement>('[data-detail-after]')!, after);
      detail.querySelector<HTMLAnchorElement>('[data-detail-link]')!.href = node.href;
      if (label) {
        label.textContent = node.label;
        label.hidden = false;
      }
    }

    function renderRelations(target: HTMLElement, nodes: KnowledgeGraphNode[]) {
      target.replaceChildren();
      if (nodes.length === 0) {
        target.textContent = '无';
        return;
      }
      nodes.slice(0, 4).forEach((node) => {
        const link = document.createElement('a');
        link.href = node.href;
        link.textContent = node.label;
        target.append(link);
      });
    }

    function hideDetail() {
      if (detail) detail.hidden = true;
    }

    function updateLabelPosition() {
      if (!disposed && selected && label && !label.hidden && selected.x != null) {
        const point = graph.graph2ScreenCoords(selected.x, selected.y, selected.z);
        label.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, calc(-100% - 12px))`;
      }
      frame = requestAnimationFrame(updateLabelPosition);
    }

    filter?.addEventListener('change', () => {
      expandedSeries = null;
      updateGraph();
      root.querySelectorAll<HTMLElement>('[data-list-column]').forEach((section) => {
        section.hidden = filter.value !== 'all' && section.dataset.listColumn !== filter.value;
      });
    });

    search?.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase('zh-CN');
      root.querySelectorAll<HTMLElement>('[data-search-text]').forEach((item) => {
        item.hidden = Boolean(query) && !item.dataset.searchText?.includes(query);
      });
      if (query.length < 2) return;
      const match = data.nodes.find((node) => node.label.toLocaleLowerCase('zh-CN').includes(query));
      if (!match) return;
      const needsGraphUpdate = mobile || Boolean(filter && filter.value !== 'all');
      if (filter && filter.value !== 'all') filter.value = 'all';
      if (mobile && match.type === 'article') expandedSeries = `series:${match.series}`;
      if (needsGraphUpdate) updateGraph();
      requestAnimationFrame(() => {
        const runtimeNode = graph.graphData().nodes.find((node: PositionedNode) => node.id === match.id);
        selectNode(runtimeNode ?? { ...match });
      });
    });

    root.querySelector('[data-detail-close]')?.addEventListener('click', () => selectNode(null));
    actionButtons.forEach((button) => button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'reset') {
        selectNode(null);
        fitGraph();
        return;
      }
      const camera = graph.camera();
      const factor = action === 'zoom-in' ? 0.78 : 1.28;
      graph.cameraPosition({ x: camera.position.x * factor, y: camera.position.y * factor, z: camera.position.z * factor }, undefined, reducedMotion ? 0 : 240);
    }));

    const applyTheme = () => {
      const dark = document.documentElement.dataset.theme === 'dark';
      graph.backgroundColor(getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
      graph.linkColor(graph.linkColor());
      labelSprites.forEach((sprite) => {
        sprite.color = dark ? '#f2f4f5' : '#17191c';
        sprite.backgroundColor = dark ? 'rgba(23,26,29,.88)' : 'rgba(255,255,255,.9)';
      });
    };
    addEventListener('site-theme-change', applyTheme);

    resizeObserver = new ResizeObserver(() => graph.width(container.clientWidth).height(container.clientHeight));
    resizeObserver.observe(container);
    updateGraph();
    updateLabelPosition();

    addEventListener('pagehide', () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      removeEventListener('site-theme-change', applyTheme);
      disposeNodeDecorations();
      materials.forEach((material) => material.dispose());
      Object.values(geometries).forEach((geometry) => geometry.dispose());
      graph?._destructor?.();
    }, { once: true });
  } catch (error) {
    console.error('Knowledge graph initialization failed', error);
    showFallback('三维场景加载失败，已切换到列表视图。');
  }
}
