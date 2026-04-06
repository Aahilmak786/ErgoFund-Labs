import pg from 'pg';

export function createPool(connectionString: string): pg.Pool {
  return new pg.Pool({ connectionString, max: 20, idleTimeoutMillis: 30_000 });
}
