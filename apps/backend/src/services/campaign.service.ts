import type { CampaignRepository } from '../repositories/campaign.repository.js';
import type { ContributionRepository } from '../repositories/contribution.repository.js';

export class CampaignService {
  constructor(
    private readonly campaigns: CampaignRepository,
    private readonly contributions: ContributionRepository
  ) {}

  async list() {
    const rows = await this.campaigns.findAll();
    const out = [];
    for (const c of rows) {
      const byToken = await this.contributions.sumByCampaign(c.id);
      const unique = await this.contributions.countUniqueWallets(c.id);
      out.push({
        ...c,
        raisedByToken: Object.fromEntries(byToken.map((x) => [x.token_id, x.total])),
        uniqueContributors: unique
      });
    }
    return out;
  }

  async getBySlug(slug: string) {
    const c = await this.campaigns.findBySlug(slug);
    if (!c) return null;
    const byToken = await this.contributions.sumByCampaign(c.id);
    const unique = await this.contributions.countUniqueWallets(c.id);
    return {
      ...c,
      raisedByToken: Object.fromEntries(byToken.map((x) => [x.token_id, x.total])),
      uniqueContributors: unique
    };
  }
}
