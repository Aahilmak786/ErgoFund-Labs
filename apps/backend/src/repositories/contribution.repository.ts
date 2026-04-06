import type pg from 'pg';

export class ContributionRepository {
  constructor(private readonly pool: pg.Pool) {}

  async sumByCampaign(campaignId: string): Promise<{ token_id: string; total: string }[]> {
    const { rows } = await this.pool.query<{ token_id: string; total: string }>(
      `SELECT token_id, SUM(amount)::text AS total FROM contributions WHERE campaign_id = $1 GROUP BY token_id`,
      [campaignId]
    );
    return rows;
  }

  async countUniqueWallets(campaignId: string): Promise<number> {
    const { rows } = await this.pool.query<{ c: string }>(
      `SELECT COUNT(DISTINCT wallet_address)::text AS c FROM contributions WHERE campaign_id = $1`,
      [campaignId]
    );
    return Number(rows[0]?.c ?? 0);
  }

  async totalAcrossAll(): Promise<{ token_id: string; total: string }[]> {
    const { rows } = await this.pool.query<{ token_id: string; total: string }>(
      `SELECT token_id, SUM(amount)::text AS total FROM contributions GROUP BY token_id`
    );
    return rows;
  }

  async countUniqueContributorsGlobal(): Promise<number> {
    const { rows } = await this.pool.query<{ c: string }>(
      `SELECT COUNT(DISTINCT wallet_address)::text AS c FROM contributions`
    );
    return Number(rows[0]?.c ?? 0);
  }
}
