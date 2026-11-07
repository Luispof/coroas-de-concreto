import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'prisma/config';

config({ path: fileURLToPath(new URL('./.env', import.meta.url)), quiet: true });

export default defineConfig({
  schema: fileURLToPath(new URL('./prisma/schema.prisma', import.meta.url)),
  datasource: { url: process.env.DATABASE_URL },
});
