import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './articles' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(20),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    tags: z.array(z.string().min(1)).min(1),
    series: z.string().min(1),
    order: z.number().int().positive(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    prerequisites: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).default([]),
    image: z.string().startsWith('/').optional(),
    draft: z.boolean(),
  }),
});

export const collections = { blog };
