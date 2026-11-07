import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

if (!process.env.DATABASE_URL) {
  console.error('Configure DATABASE_URL in the process environment or apps/api/.env.');
  process.exitCode = 1;
} else {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 3000,
    }),
  });
  try {
    const result = await prisma.$queryRaw<Array<{ value: number }>>`SELECT 1 AS value`;
    if (result[0]?.value !== 1) throw new Error('Unexpected PostgreSQL response.');
    console.log('PostgreSQL connection: OK');
  } catch {
    console.error('PostgreSQL connection failed. Check the local database and DATABASE_URL.');
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}
