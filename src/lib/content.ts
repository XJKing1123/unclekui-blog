import { getCollection, type CollectionEntry } from 'astro:content';
import { COLUMNS, SERIES, type ColumnKey, type SeriesKey } from '../config/site';

export type Post = CollectionEntry<'blog'>;
export const MIN_INDEXABLE_TAG_POSTS = 3;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function getSeriesMeta(series: string) {
  return SERIES[series as SeriesKey] ?? {
    name: series,
    description: '深度技术文章与工程实践。',
  };
}

export function getColumnKey(series: string): ColumnKey {
  if (series === 'experience' || series === 'ios' || series === 'react' || series === 'web3') return series;
  return 'flutter';
}

export function getColumnMeta(series: string) {
  return COLUMNS[getColumnKey(series)];
}

export function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(tag)}/`;
}

export function postHref(slug: string) {
  return `/posts/${slug}/`;
}

export function seriesHref(series: string) {
  return `/series/${getColumnKey(series)}/`;
}

export function buildTagCounts(posts: Post[]) {
  const counts = new Map<string, number>();
  posts.forEach((post) => post.data.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
  return counts;
}

export function isIndexableTag(count: number | undefined) {
  return (count ?? 0) >= MIN_INDEXABLE_TAG_POSTS;
}
