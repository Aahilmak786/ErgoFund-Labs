import type { Request, Response } from 'express';
import type { CampaignService } from '../services/campaign.service.js';
import { asyncHandler } from '../utils/async-handler.js';

export function createCampaignController(service: CampaignService) {
  return {
    list: asyncHandler(async (_req: Request, res: Response) => {
      const data = await service.list();
      res.json({ campaigns: data });
    }),
    get: asyncHandler(async (req: Request, res: Response) => {
      const raw = req.params['slug'];
      const slug = Array.isArray(raw) ? raw[0] : raw;
      if (!slug) {
        res.status(400).json({ error: 'Missing slug' });
        return;
      }
      const data = await service.getBySlug(slug);
      if (!data) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json({ campaign: data });
    })
  };
}
