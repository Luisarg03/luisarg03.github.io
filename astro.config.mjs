// @ts-check
import { defineConfig } from 'astro/config';
import { transformerNotationHighlight } from '@shikijs/transformers';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap()],
  devToolbar: { enabled: false },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  site: 'https://luisarg03.github.io',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      transformers: [transformerNotationHighlight()],
    },
  },
});
