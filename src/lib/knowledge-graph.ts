import type { ColumnKey, SeriesKey } from '../config/site';
import { COLUMNS, SERIES } from '../config/site';
import type { Post } from './content';
import { getColumnKey, getSeriesMeta } from './content';

export type KnowledgeNodeType = 'column' | 'series' | 'article';
export type KnowledgeLinkType = 'contains' | 'sequence' | 'prerequisite';

export interface KnowledgeGraphNode {
  id: string;
  type: KnowledgeNodeType;
  label: string;
  column: ColumnKey;
  series?: SeriesKey;
  href: string;
  order?: number;
  description?: string;
  articleCount?: number;
  tags?: string[];
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  type: KnowledgeLinkType;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeGraphNode[];
  links: KnowledgeGraphLink[];
}

export function buildKnowledgeGraph(posts: Post[]): KnowledgeGraphData {
  const nodes: KnowledgeGraphNode[] = [];
  const links: KnowledgeGraphLink[] = [];
  const slugs = new Set(posts.map((post) => post.data.slug));
  const nodeIds = new Set<string>();
  const linkIds = new Set<string>();
  const seriesGroups = new Map<string, Post[]>();

  const addNode = (node: KnowledgeGraphNode) => {
    if (nodeIds.has(node.id)) throw new Error(`Duplicate knowledge graph node: ${node.id}`);
    nodeIds.add(node.id);
    nodes.push(node);
  };
  const addLink = (link: KnowledgeGraphLink) => {
    if (link.source === link.target) throw new Error(`Self-referencing knowledge graph link: ${link.source}`);
    const key = `${link.source}|${link.target}|${link.type}`;
    if (linkIds.has(key)) throw new Error(`Duplicate knowledge graph link: ${key}`);
    linkIds.add(key);
    links.push(link);
  };

  posts.forEach((post) => {
    const group = seriesGroups.get(post.data.series) ?? [];
    group.push(post);
    seriesGroups.set(post.data.series, group);
  });

  const columns = new Set<ColumnKey>();
  seriesGroups.forEach((seriesPosts) => columns.add(getColumnKey(seriesPosts[0].data.series)));
  columns.forEach((column) => addNode({
    id: `column:${column}`,
    type: 'column',
    label: COLUMNS[column].name,
    column,
    href: `/series/${column}/`,
    description: COLUMNS[column].description,
    articleCount: posts.filter((post) => getColumnKey(post.data.series) === column).length,
  }));

  seriesGroups.forEach((seriesPosts, series) => {
    const column = getColumnKey(series);
    const meta = getSeriesMeta(series);
    addNode({
      id: `series:${series}`,
      type: 'series',
      label: meta.name,
      column,
      series: series as SeriesKey,
      href: `/series/${column}/`,
      description: meta.description,
      articleCount: seriesPosts.length,
    });
    addLink({ source: `column:${column}`, target: `series:${series}`, type: 'contains' });

    const ordered = [...seriesPosts].sort((a, b) => a.data.order - b.data.order || a.data.slug.localeCompare(b.data.slug));
    ordered.forEach((post, index) => {
      addNode({
        id: post.data.slug,
        type: 'article',
        label: post.data.title,
        column,
        series: series as SeriesKey,
        href: `/posts/${post.data.slug}/`,
        order: post.data.order,
        description: post.data.description,
        tags: post.data.tags.slice(0, 4),
      });
      addLink({ source: `series:${series}`, target: post.data.slug, type: 'contains' });

      if (index > 0 && post.data.prerequisites.length === 0) {
        addLink({ source: ordered[index - 1].data.slug, target: post.data.slug, type: 'sequence' });
      }
      post.data.prerequisites.forEach((prerequisite) => {
        if (!slugs.has(prerequisite)) {
          throw new Error(`Unknown prerequisite "${prerequisite}" in article "${post.data.slug}"`);
        }
        addLink({ source: prerequisite, target: post.data.slug, type: 'prerequisite' });
      });
    });
  });

  links.forEach((link) => {
    if (!nodeIds.has(link.source) || !nodeIds.has(link.target)) {
      throw new Error(`Knowledge graph link references a missing node: ${link.source} -> ${link.target}`);
    }
  });

  return { nodes, links };
}

export const knowledgeGraphSeries = SERIES;
