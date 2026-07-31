import { getCollection, type CollectionEntry } from 'astro:content';
import { COLUMNS, SERIES, type ColumnKey, type SeriesKey } from '../config/site';

export type Post = CollectionEntry<'blog'>;

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
  return `/tags/${encodeURIComponent(tag)}`;
}
