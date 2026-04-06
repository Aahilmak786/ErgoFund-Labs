import type { Request, Response } from 'express';
import type pg from 'pg';
import { asyncHandler } from '../utils/async-handler.js';

export function createHealthController(pool: pg.Pool) {
  return {
    get: asyncHandler(async (_req: Request, res: Response) => {
      await pool.query('SELECT 1');
      res.json({ status: 'ok', service: 'benefaction-backend' });
    })
  };
}
