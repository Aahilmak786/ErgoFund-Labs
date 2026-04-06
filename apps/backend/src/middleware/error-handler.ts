import type { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const message = err instanceof Error ? err.message : 'Internal error';
  const status = message.startsWith('Validation') ? 400 : 500;
  res.status(status).json({ error: message });
}
