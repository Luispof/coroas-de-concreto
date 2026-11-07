import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { test } from 'node:test';
import { ConfigService } from '@nestjs/config';
import { createApp } from '../../src/app.js';

test('test startup ignores a present env file; normal startup still loads it and respects process precedence', async () => {
  const cache = resolve('.cache');
  await mkdir(cache, { recursive: true });
  const fixture = await mkdtemp(join(cache, 'environment-'));
  const envFilePath = join(fixture, '.env');
  const previousUrl = process.env.DATABASE_URL;
  const previousPort = process.env.PORT;
  try {
    await writeFile(envFilePath, 'DATABASE_URL=synthetic-public-fixture\nPORT=4321\n');
    delete process.env.DATABASE_URL;
    delete process.env.PORT;
    const isolated = await createApp({ ignoreEnvFile: true, envFilePath });
    try {
      await isolated.init();
      assert.equal(isolated.get(ConfigService).get('DATABASE_URL'), undefined);
      assert.equal(isolated.get(ConfigService).get('PORT'), 3001);
      assert.equal(process.env.DATABASE_URL, undefined);
    } finally {
      await isolated.close();
    }
    // ConfigModule publishes validated defaults into process.env; start a fresh scenario.
    delete process.env.PORT;
    delete process.env.DATABASE_URL;
    const normal = await createApp({ envFilePath });
    try {
      await normal.init();
      assert.equal(normal.get(ConfigService).get('DATABASE_URL'), 'synthetic-public-fixture');
      assert.equal(normal.get(ConfigService).get('PORT'), 4321);
    } finally {
      await normal.close();
    }
    process.env.PORT = '5432';
    const overridden = await createApp({ envFilePath });
    try {
      await overridden.init();
      assert.equal(overridden.get(ConfigService).get('PORT'), 5432);
    } finally {
      await overridden.close();
    }
  } finally {
    if (previousUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previousUrl;
    if (previousPort === undefined) delete process.env.PORT;
    else process.env.PORT = previousPort;
    await rm(fixture, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test('invalid PORT rejects application startup without fallback', async () => {
  const previousPort = process.env.PORT;
  process.env.PORT = '';
  try {
    await assert.rejects(createApp({ ignoreEnvFile: true }), /PORT must be an integer between 1 and 65535/);
  } finally {
    if (previousPort === undefined) delete process.env.PORT;
    else process.env.PORT = previousPort;
  }
});
