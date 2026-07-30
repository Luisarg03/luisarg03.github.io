// @ts-check
import { defineConfig } from 'astro/config';
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
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
  site: 'https://luisarg03.github.io',
});
