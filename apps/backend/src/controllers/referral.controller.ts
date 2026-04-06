import type { Request, Response } from 'express';
import { z } from 'zod';
import type { ReferralService } from '../services/referral.service.js';
import { asyncHandler } from '../utils/async-handler.js';

const bodySchema = z.object({
  code: z.string().min(4).max(64),
  referrerWallet: z.string().min(10),
  referredWallet: z.string().min(10)
});

export function createReferralController(service: ReferralService) {
  return {
    validate: asyncHandler(async (req: Request, res: Response) => {
      const parsed = bodySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: 'Validation', details: parsed.error.flatten() });
        return;
      }
      const result = await service.validateUse(parsed.data);
      if (!result.ok) {
        res.status(400).json(result);
        return;
      }
      res.json(result);
    })
  };
}
