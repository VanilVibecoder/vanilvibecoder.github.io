import { createReadStream } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { createGunzip } from 'node:zlib';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const TOP_LEVEL_FORBIDDEN = new Set(['id', 'versionId', 'meta', 'pinData', 'staticData']);
const SECRET_KEY =
  /^(?:api[-_]?key|access[-_]?token|refresh[-_]?token|token|password|secret|authorization)$/i;
const ENDPOINT_KEY = /^(?:chatId|documentId|sheetId|webhookId|webhookPath)$/i;
const SECRET_PATTERNS = [
  { code: 'bearer-token', pattern: /\bBearer\s+[A-Za-z0-9._~-]{16,}/i },
  { code: 'openai-style-key', pattern: /\bsk-[A-Za-z0-9_-]{16,}/ },
  { code: 'telegram-bot-token', pattern: /\b\d{6,12}:[A-Za-z0-9_-]{20,}\b/ },
  { code: 'jwt', pattern: /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\b/ },
];

function isPlaceholder(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return (
    trimmed === '' ||
    /^<[^>]+>$/.test(trimmed) ||
    trimmed.includes('{{') ||
    trimmed.startsWith('$env.') ||
    trimmed.startsWith('$vars.')
  );
}

function issue(code, location) {
  return { code, location };
}

function inspectValue(value, location, issues, key = '') {
  if (typeof value === 'string') {
    if (SECRET_KEY.test(key) && !isPlaceholder(value)) {
      issues.push(issue('secret-like-field', location));
    }

    if (ENDPOINT_KEY.test(key) && !isPlaceholder(value)) {
      issues.push(issue('real-endpoint-id', location));
    }

    if (!isPlaceholder(value)) {
      for (const candidate of SECRET_PATTERNS) {
        if (candidate.pattern.test(value)) issues.push(issue(candidate.code, location));
      }
    }

    return;
  }

  if (Array.isArray(value)) {
    value.forEach((child, index) => inspectValue(child, `${location}[${index}]`, issues));
    return;
  }

  if (!value || typeof value !== 'object') return;

  for (const [childKey, child] of Object.entries(value)) {
    const childLocation = `${location}.${childKey}`;

    if (ENDPOINT_KEY.test(childKey) && child && typeof child === 'object' && 'value' in child) {
      const endpointValue = child.value;
      if (typeof endpointValue === 'string' && !isPlaceholder(endpointValue)) {
        issues.push(issue('real-endpoint-id', `${childLocation}.value`));
      }
    }

    inspectValue(child, childLocation, issues, childKey);
  }
}

export function auditWorkflow(workflow, source = '<memory>') {
  const issues = [];

  if (!workflow || typeof workflow !== 'object' || Array.isArray(workflow)) {
    return [issue('invalid-workflow-shape', source)];
  }

  if (workflow.active === true) issues.push(issue('active-workflow', `${source}.active`));

  for (const field of TOP_LEVEL_FORBIDDEN) {
    if (Object.hasOwn(workflow, field))
      issues.push(issue('instance-metadata', `${source}.${field}`));
  }

  if (Array.isArray(workflow.nodes)) {
    workflow.nodes.forEach((node, index) => {
      if (node && typeof node === 'object' && Object.hasOwn(node, 'credentials')) {
        issues.push(issue('credential-binding', `${source}.nodes[${index}].credentials`));
      }
    });
  }

  inspectValue(workflow, source, issues);
  return deduplicate(issues);
}

function deduplicate(issues) {
  const seen = new Set();
  return issues.filter(({ code, location }) => {
    const key = `${code}:${location}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function readGzip(filePath) {
  const chunks = [];
  await new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(createGunzip())
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', resolve)
      .on('error', reject);
  });
  return Buffer.concat(chunks).toString('utf8');
}

async function collectFiles(target) {
  const stats = await import('node:fs/promises').then(({ stat }) => stat(target));
  if (stats.isFile()) return /\.json(?:\.gz)?$/i.test(target) ? [target] : [];

  const entries = await readdir(target, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith('.'))
      .map((entry) => collectFiles(path.join(target, entry.name))),
  );
  return nested.flat();
}

export async function auditFile(filePath) {
  const raw = filePath.toLowerCase().endsWith('.gz')
    ? await readGzip(filePath)
    : await readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  const workflows = Array.isArray(parsed) ? parsed : [parsed];
  return workflows.flatMap((workflow, index) =>
    auditWorkflow(workflow, workflows.length > 1 ? `${filePath}[${index}]` : filePath),
  );
}

async function main(args) {
  if (args.length === 0) {
    console.error('Usage: node scripts/audit-workflow-export.mjs <file-or-directory> [...]');
    process.exitCode = 2;
    return;
  }

  const files = (
    await Promise.all(args.map((target) => collectFiles(path.resolve(target))))
  ).flat();
  if (files.length === 0) {
    console.error('No .json or .json.gz workflow exports found.');
    process.exitCode = 2;
    return;
  }

  let failed = false;
  for (const filePath of files) {
    try {
      const issues = await auditFile(filePath);
      if (issues.length === 0) {
        console.log(`PASS ${filePath}`);
        continue;
      }

      failed = true;
      console.error(`FAIL ${filePath}`);
      for (const finding of issues) console.error(`  ${finding.code} at ${finding.location}`);
    } catch {
      failed = true;
      console.error(`FAIL ${filePath}`);
      console.error(`  unreadable-or-invalid-json at ${filePath}`);
    }
  }

  if (failed) process.exitCode = 1;
}

const executedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (executedDirectly) await main(process.argv.slice(2));
