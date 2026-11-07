export function parsePort(value: unknown): number {
  if (value === undefined) return 3001;
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }
  return port;
}

export function validateEnvironment(environment: Record<string, unknown>) {
  return { ...environment, PORT: parsePort(environment.PORT) };
}
