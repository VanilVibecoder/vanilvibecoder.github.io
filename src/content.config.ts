import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  source: z.string().min(12, 'Every metric needs a meaningful source or qualification'),
});

const galleryItemSchema = z.object({
  src: z.string().startsWith('/'),
  alt: z.string().min(8),
  caption: z.string().optional(),
});

const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.md' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    locale: z.enum(['ru', 'en']),
    title: z.string().min(8),
    eyebrow: z.string().min(3),
    summary: z.string().min(40),
    status: z.enum(['demo', 'training', 'public-template']),
    featured: z.boolean(),
    order: z.number().int().positive(),
    stack: z.array(z.string().min(1)).min(2),
    problems: z.array(z.string().min(8)).min(1),
    nodeCount: z.number().int().positive().optional(),
    repoUrl: z.string().url().startsWith('https://github.com/'),
    releaseUrl: z.string().url().optional(),
    metrics: z.array(metricSchema).default([]),
    testedScenarios: z.array(z.string().min(8)).min(1),
    limitations: z.array(z.string().min(8)).min(1),
    architecture: z.array(z.string().min(2)).min(3).max(8),
    gallery: z.array(galleryItemSchema).default([]),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = { cases };
