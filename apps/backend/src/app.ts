import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { Env } from './config/env.js';
import { buildRouter } from './routes/index.js';
import { createPool } from './repositories/db.js';
import { CampaignRepository } from './repositories/campaign.repository.js';
import { ContributionRepository } from './repositories/contribution.repository.js';
import { ReferralRepository } from './repositories/referral.repository.js';
import { CampaignService } from './services/campaign.service.js';
import { AnalyticsService } from './services/analytics.service.js';
import { ReferralService } from './services/referral.service.js';
import { createCampaignController } from './controllers/campaign.controller.js';
import { createAnalyticsController } from './controllers/analytics.controller.js';
import { createReferralController } from './controllers/referral.controller.js';
import { createHealthController } from './controllers/health.controller.js';
import { errorHandler } from './middleware/error-handler.js';

export function createApp(env: Env) {
  const pool = createPool(env.DATABASE_URL);
  const campaignRepo = new CampaignRepository(pool);
  const contributionRepo = new ContributionRepository(pool);
  const referralRepo = new ReferralRepository(pool);

  const campaignService = new CampaignService(campaignRepo, contributionRepo);
  const analyticsService = new AnalyticsService(contributionRepo);
  const referralService = new ReferralService(referralRepo);

  const app = express();
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN,
      credentials: true
    })
  );
  app.use(express.json({ limit: '64kb' }));

  const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false
  });
  app.use(limiter);

  const router = buildRouter({
    health: createHealthController(pool),
    campaigns: createCampaignController(campaignService),
    analytics: createAnalyticsController(analyticsService),
    referrals: createReferralController(referralService)
  });

  app.use(router);
  app.use(errorHandler);

  return { app, pool };
}
