import { rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, URL } from 'node:url';

const directory = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
// Fixed output directory under the API root; discard stale compiled tests.
rmSync(new URL('../dist-test/', import.meta.url), { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
const compile = spawnSync(process.execPath, [require.resolve('typescript/bin/tsc'), '--project', 'tsconfig.test.json'], {
  cwd: directory, stdio: 'inherit',
});
if (compile.error) throw compile.error;
if (compile.status !== 0) process.exit(compile.status ?? 1);

const patterns = process.argv.includes('--e2e')
  ? ['dist-test/test/**/*.e2e-spec.js']
  : ['dist-test/test/**/*.spec.js', 'dist-test/test/**/*.e2e-spec.js', 'test/**/*.test.mjs'];
const tests = spawnSync(process.execPath, ['--test', ...patterns], { cwd: directory, stdio: 'inherit' });
if (tests.error) throw tests.error;
process.exitCode = tests.status ?? 1;
