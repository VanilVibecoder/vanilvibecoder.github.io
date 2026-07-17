import assert from 'node:assert/strict';
import { test } from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditFile, auditWorkflow } from '../scripts/audit-workflow-export.mjs';

const directory = path.dirname(fileURLToPath(import.meta.url));

test('sanitized inactive workflow passes', async () => {
  const findings = await auditFile(path.join(directory, 'fixtures', 'safe-workflow.json'));
  assert.deepEqual(findings, []);
});

test('unsafe export reports locations without returning secret values', async () => {
  const findings = await auditFile(path.join(directory, 'fixtures', 'unsafe-workflow.json'));
  const codes = new Set(findings.map((finding) => finding.code));

  assert.ok(codes.has('active-workflow'));
  assert.ok(codes.has('instance-metadata'));
  assert.ok(codes.has('credential-binding'));
  assert.ok(codes.has('real-endpoint-id'));
  assert.ok(codes.has('telegram-bot-token'));

  const serialized = JSON.stringify(findings);
  assert.equal(serialized.includes('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef'), false);
});

test('node ids are allowed while top-level instance ids are rejected', () => {
  const clean = auditWorkflow({ active: false, nodes: [{ id: 'node-id', parameters: {} }] });
  const dirty = auditWorkflow({ id: 'workflow-id', active: false, nodes: [] });

  assert.equal(clean.length, 0);
  assert.ok(dirty.some((finding) => finding.code === 'instance-metadata'));
});
