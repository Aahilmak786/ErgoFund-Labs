import type { ContributionRepository } from '../repositories/contribution.repository.js';

export class AnalyticsService {
  constructor(private readonly contributions: ContributionRepository) {}

  async summary() {
    const byToken = await this.contributions.totalAcrossAll();
    const unique = await this.contributions.countUniqueContributorsGlobal();
    return {
      totalRaisedByToken: Object.fromEntries(byToken.map((x) => [x.token_id, x.total])),
      uniqueContributors: unique
    };
  }
}
