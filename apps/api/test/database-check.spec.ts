import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

test('database diagnostic accepts process configuration without an env file and never prints credentials', () => {
  const cache = resolve('.cache');
  mkdirSync(cache, { recursive: true });
  const fixture = mkdtempSync(join(cache, 'db-check-'));
  const script = fileURLToPath(new URL('../src/prisma/check-database.js', import.meta.url));
  const env = { ...process.env };
  delete env.DATABASE_URL;
  const invoke = () => spawnSync(process.execPath, ['--env-file-if-exists=.env', script], {
    cwd: fixture, env, encoding: 'utf8', timeout: 10000,
  });
  try {
    const missing = invoke();
    assert.equal(missing.status, 1);
    assert.match(missing.stderr, /Configure DATABASE_URL/);
    env.DATABASE_URL = 'postgresql://synthetic:synthetic-secret@127.0.0.1:1/unavailable';
    const configured = invoke();
    assert.equal(configured.status, 1);
    assert.match(configured.stderr, /PostgreSQL connection failed/);
    assert.doesNotMatch(configured.stderr, /synthetic-secret|Configure DATABASE_URL/);
    writeFileSync(join(fixture, '.env'), 'DATABASE_URL=\n');
    const precedence = invoke();
    assert.equal(precedence.status, 1);
    assert.match(precedence.stderr, /PostgreSQL connection failed/);
    assert.doesNotMatch(precedence.stderr, /Configure DATABASE_URL|synthetic-secret/);
    delete env.DATABASE_URL;
    writeFileSync(join(fixture, '.env'), 'DATABASE_URL=postgresql://synthetic:synthetic-secret@127.0.0.1:1/unavailable\n');
    const fromFile = invoke();
    assert.equal(fromFile.status, 1);
    assert.match(fromFile.stderr, /PostgreSQL connection failed/);
    assert.doesNotMatch(fromFile.stderr, /synthetic-secret/);
  } finally {
    rmSync(fixture, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
