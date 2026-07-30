import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articlePattern = '{Dart运行时,Flutter三棵树协作机制,Flutter应用生命周期,Flutter状态设计,Flutter请求治理,Flutter原生视图与混合工程,Flutter音视频,Flutter启动性能,Flutter性能优化,Flutter客户端监控体系,Flutter客户端Trace与稳定性治理,Flutter异常处理体系,Flutter国际化与本地化,Flutter输入与链接安全,Flutter客户端安全,Flutter模块化架构,Flutter依赖注入,Flutter混合开发技术详解,Web3分布式账本,Web3密码学基础,Web3交易与最终性,Web3共识,ReactJavaScript执行模型,ReactEventLoop与异步}.md';

const blog = defineCollection({
  loader: glob({ pattern: articlePattern, base: '.' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(20),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    tags: z.array(z.string().min(1)).min(1),
    series: z.string().min(1),
    order: z.number().int().positive(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    draft: z.boolean(),
  }),
});

export const collections = { blog };
