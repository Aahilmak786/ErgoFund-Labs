import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadEnv } from './env.js';

test('loadEnv parses DATABASE_URL and PORT', () => {
  const env = loadEnv({
    NODE_ENV: 'test',
    DATABASE_URL: 'postgresql://bene:bene@127.0.0.1:5432/bene',
    PORT: '9000',
    CORS_ORIGIN: 'http://localhost:5173'
  });
  assert.equal(env.PORT, 9000);
  assert.equal(env.DATABASE_URL, 'postgresql://bene:bene@127.0.0.1:5432/bene');
});

test('loadEnv defaults rate limit', () => {
  const env = loadEnv({
    NODE_ENV: 'test',
    DATABASE_URL: 'postgresql://bene:bene@127.0.0.1:5432/bene'
  });
  assert.equal(env.RATE_LIMIT_MAX, 120);
});
