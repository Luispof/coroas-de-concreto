import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createApp } from '../src/app.js';

for (const databaseUrl of [undefined, 'postgresql://invalid:invalid@127.0.0.1:1/unavailable']) {
  test(`application starts and health responds with ${databaseUrl ? 'unreachable' : 'no'} database configuration`, async () => {
    const previous = process.env.DATABASE_URL;
    const previousPort = process.env.PORT;
    delete process.env.PORT;
    if (databaseUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = databaseUrl;
    const app = await createApp({ ignoreEnvFile: true });
    try {
      await app.listen(0, '127.0.0.1');
      const response = await fetch(`${await app.getUrl()}/api/v1/health`);
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type') ?? '', /application\/json/);
      assert.deepEqual(await response.json(), { status: 'ok' });
      assert.equal(process.env.DATABASE_URL, databaseUrl);
      assert.equal((await fetch(`${await app.getUrl()}/health`)).status, 404);
    } finally {
      await app.close();
      if (previous === undefined) delete process.env.DATABASE_URL;
      else process.env.DATABASE_URL = previous;
      if (previousPort === undefined) delete process.env.PORT;
      else process.env.PORT = previousPort;
    }
  });
}
