import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';

const require = createRequire(import.meta.url);
const defaultDirectory = fileURLToPath(new URL('../', import.meta.url));

function outputDigest(directory) {
  if (!existsSync(join(directory, 'client.ts'))) return undefined;
  const hash = createHash('sha256');
  function visit(current, prefix = '') {
    for (const entry of readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const name = `${prefix}${entry.name}`;
      if (entry.isDirectory()) visit(join(current, entry.name), `${name}/`);
      else hash.update(name).update(readFileSync(join(current, entry.name)));
    }
  }
  visit(directory);
  return hash.digest('hex');
}

export function ensurePrismaClient(directory = defaultDirectory, force = false) {
  const root = resolve(directory);
  const hash = createHash('sha256');
  for (const relative of ['prisma/schema.prisma', 'prisma.config.ts', 'package.json']) {
    hash.update(relative).update(readFileSync(join(root, relative)));
  }
  hash.update(readFileSync(fileURLToPath(import.meta.url)));
  hash.update(require('prisma/package.json').version);
  hash.update(require('@prisma/client/package.json').version);
  const input = hash.digest('hex');
  const output = join(root, 'src/generated/prisma');
  const stamp = join(root, '.cache/prisma-client.json');
  const digest = outputDigest(output);
  if (!force && existsSync(stamp)) {
    try {
      const previous = JSON.parse(readFileSync(stamp, 'utf8'));
      if (digest && previous.input === input && previous.output === digest) return false;
    } catch {
      // Missing or invalid cache metadata requires generation, never a bypass.
    }
  }
  const prismaPackage = require('prisma/package.json');
  const cli = resolve(dirname(require.resolve('prisma/package.json')), prismaPackage.bin.prisma);
  // This fixed disposable output is inside the resolved API/fixture root.
  // Clean partial output too: Prisma refuses to overwrite it if client.ts is missing.
  rmSync(output, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  const result = spawnSync(process.execPath, [cli, 'generate', '--config', join(root, 'prisma.config.ts')], {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('Prisma Client generation failed.');
  const generated = outputDigest(output);
  if (!generated) throw new Error('Prisma Client was not generated.');
  mkdirSync(join(root, '.cache'), { recursive: true });
  writeFileSync(stamp, `${JSON.stringify({ input, output: generated })}\n`);
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  ensurePrismaClient(defaultDirectory, process.argv.includes('--force'));
}
