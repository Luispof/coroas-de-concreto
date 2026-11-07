import assert from 'node:assert/strict';
import { test } from 'node:test';
import { HealthController } from '../src/health/health.controller.js';

test('health reports process liveness without dependencies', () => {
  assert.deepEqual(new HealthController().getHealth(), { status: 'ok' });
});
