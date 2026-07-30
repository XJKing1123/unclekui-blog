import { getCollection, type CollectionEntry } from 'astro:content';
import { SERIES, type SeriesKey } from '../config/site';

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

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function readingMinutes(body: string | undefined) {
  if (!body) return 1;
  const chinese = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latin = (body.replace(/[\u3400-\u9fff]/g, ' ').match(/\b\w+\b/g) ?? []).length;
  return Math.max(1, Math.ceil((chinese + latin) / 400));
}

export function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(tag)}`;
}
