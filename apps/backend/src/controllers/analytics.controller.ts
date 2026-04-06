import type { Request, Response } from 'express';
import type { AnalyticsService } from '../services/analytics.service.js';
import { asyncHandler } from '../utils/async-handler.js';

export function createAnalyticsController(service: AnalyticsService) {
  return {
    summary: asyncHandler(async (_req: Request, res: Response) => {
      const data = await service.summary();
      res.json(data);
    })
  };
}
