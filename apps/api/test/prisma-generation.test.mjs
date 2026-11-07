import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, copyFileSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath, URL } from 'node:url';
import { ensurePrismaClient } from '../scripts/ensure-prisma-client.mjs';

test('Prisma generation works without output, skips unchanged content and recovers missing or changed files', async () => {
  const api = fileURLToPath(new URL('../', import.meta.url));
  mkdirSync(join(api, '.cache'), { recursive: true });
  const fixture = mkdtempSync(join(api, '.cache', 'prisma-'));
  try {
    mkdirSync(join(fixture, 'prisma'));
    for (const relative of ['package.json', 'prisma.config.ts', 'prisma/schema.prisma']) {
      copyFileSync(join(api, relative), join(fixture, relative));
    }
    assert.equal(ensurePrismaClient(fixture), true);
    assert.equal(ensurePrismaClient(fixture), false);
    const client = join(fixture, 'src/generated/prisma/client.ts');
    rmSync(client);
    assert.equal(ensurePrismaClient(fixture), true);
    const schema = join(fixture, 'prisma/schema.prisma');
    writeFileSync(schema, `${readFileSync(schema, 'utf8')}\n// Synthetic generation regression fixture.\n`);
    assert.equal(ensurePrismaClient(fixture), true);
    assert.equal(ensurePrismaClient(fixture), false);
  } finally {
    await rm(fixture, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  }
});
