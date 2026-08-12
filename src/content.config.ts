import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const now = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/now' }),
  schema: z.object({
    title: z.string().optional(),
    updated: z.date(),
    focus: z.array(
      z.object({
        label: z.string(),
        status: z.enum(['in-progress', 'planned', 'paused', 'completed']),
        progress: z.number().int().min(0).max(100).optional(),
        note: z.string().optional(),
      })
    ).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      repo: z.string().url(),
      problem: z.string().optional(),
      solution: z.string().optional(),
      impact: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      order: z.number().default(0),
      status: z.enum(['online', 'wip', 'archived']).optional(),
      year: z.number().int().min(2000).max(2100).optional(),
      role: z.string().optional(),
      scaleMetric: z.string().optional(),
      type: z.enum(['personal', 'client', 'oss']).optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      stack: z.array(z.string()).default([]).optional(),
      codeSnippet: z.object({ lang: z.string(), code: z.string() }).optional(),
      links: z.object({ demo: z.string().url().optional(), docs: z.string().url().optional() }).optional(),
      planSummary: z.object({
        add: z.number().optional(),
        change: z.number().optional(),
        remove: z.number().optional(),
        unchanged: z.number().optional(),
      }).optional(),
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
