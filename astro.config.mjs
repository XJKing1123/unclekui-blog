import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import stripLeadingTitle from './src/remark/strip-leading-title.mjs';

const site = process.env.BLOG_SITE_URL || process.env.SITE_URL;
const isBuild = process.argv.includes('build') || process.env.npm_lifecycle_event === 'build';

if (isBuild && !site) {
  throw new Error('SITE_URL is required for production builds.');
}

export default defineConfig({
  site: site || 'http://localhost:4321',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/search/') })],
  markdown: {
    processor: unified({ remarkPlugins: [stripLeadingTitle] }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  vite: {
    build: {
      cssMinify: true,
      // Three.js and Mermaid are optional, lazy-loaded features with isolated entry points.
      chunkSizeWarningLimit: 800,
    },
  },
});
