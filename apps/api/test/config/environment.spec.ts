import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parsePort } from '../../src/config/environment.js';

test('PORT defaults only when absent and accepts integer bounds', () => {
  assert.equal(parsePort(undefined), 3001);
  assert.equal(parsePort('1'), 1);
  assert.equal(parsePort('3001'), 3001);
  assert.equal(parsePort('65535'), 65535);
});

test('PORT rejects empty, nonnumeric, fractional and out-of-range values', () => {
  for (const value of ['', ' ', 'abc', '3001abc', '1.5', '-1', '0', '65536', '1e3', 'Infinity', ' 3001 ', '999999999999999999999']) {
    assert.throws(() => parsePort(value), /^Error: PORT must be an integer between 1 and 65535\.$/);
  }
});
