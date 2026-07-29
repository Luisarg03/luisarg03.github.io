// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx()],
  devToolbar: { enabled: false },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
  site: 'https://luisarg03.github.io',
});
