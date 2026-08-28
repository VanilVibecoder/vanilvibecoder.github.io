import { defineCollection } from 'astro:content';
import type { LoaderContext } from 'astro/loaders';
import { parseFrontmatter } from 'astro/markdown';
import { z } from 'astro/zod';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const caseLoader = {
  name: 'case-markdown-loader',
  async load({
    config,
    store,
    parseData,
    renderMarkdown,
    generateDigest,
    logger,
    watcher,
  }: LoaderContext) {
    const baseUrl = new URL('./src/content/cases/', config.root);
    const basePath = fileURLToPath(baseUrl);
    const fileToId = new Map<string, string>();
    const files = (await readdir(basePath, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .sort((a, b) => a.name.localeCompare(b.name));

    store.clear();

    async function syncFile(filePath: string) {
      const contents = await readFile(filePath, 'utf8');
      const { frontmatter, content } = parseFrontmatter(contents);
      const id = String(frontmatter.slug ?? filePath.split(/[\\/]/).at(-1)?.replace(/\.md$/, ''));
      const previousId = fileToId.get(filePath);
      if (previousId && previousId !== id) store.delete(previousId);
      const data = await parseData({ id, data: frontmatter, filePath });
      const rendered = await renderMarkdown(content, { fileURL: pathToFileURL(filePath) });

      store.set({
        id,
        data,
        body: content,
        filePath: relative(fileURLToPath(config.root), filePath).replaceAll('\\', '/'),
        digest: generateDigest(contents),
        rendered,
        assetImports: rendered.metadata?.imagePaths,
      });
      fileToId.set(filePath, id);
    }

    for (const file of files) {
      await syncFile(resolve(basePath, file.name));
    }

    if (watcher) {
      watcher.add(basePath);
      const isCaseFile = (filePath: string) =>
        dirname(resolve(filePath)) === resolve(basePath) && filePath.endsWith('.md');
      const update = async (filePath: string) => {
        if (!isCaseFile(filePath)) return;
        try {
          await syncFile(resolve(filePath));
          logger.info(`Reloaded ${relative(basePath, filePath)}`);
        } catch (error) {
          logger.error(`Failed to reload ${relative(basePath, filePath)}: ${String(error)}`);
        }
      };

      watcher.on('change', update);
      watcher.on('add', update);
      watcher.on('unlink', (filePath) => {
        if (!isCaseFile(filePath)) return;
        const id = fileToId.get(resolve(filePath));
        if (id) store.delete(id);
        fileToId.delete(resolve(filePath));
      });
    }
  },
};

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
  loader: caseLoader,
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
