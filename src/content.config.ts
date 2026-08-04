import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const now = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/now' }),
  schema: z.object({
    title: z.string().optional(),
    updated: z.date(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    repo: z.string().url(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    impact: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const travel = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/travel' }),
  schema: ({ image }) =>
    z.object({
      date: z.date(),
      location: z.string(),
      caption: z.string(),
      photos: z.array(image()),
    }),
});

export const collections = { now, projects, travel };
