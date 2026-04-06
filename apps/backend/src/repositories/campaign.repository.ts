import type pg from 'pg';

export interface CampaignRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  owner_address: string;
  goal_amount: string;
  goal_token: string;
  deadline: Date | null;
  created_at: Date;
}

export class CampaignRepository {
  constructor(private readonly pool: pg.Pool) {}

  async findAll(): Promise<CampaignRow[]> {
    const { rows } = await this.pool.query<CampaignRow>(
      `SELECT id, slug, title, description, owner_address, goal_amount::text, goal_token, deadline, created_at
       FROM campaigns ORDER BY created_at DESC`
    );
    return rows;
  }

  async findBySlug(slug: string): Promise<CampaignRow | null> {
    const { rows } = await this.pool.query<CampaignRow>(
      `SELECT id, slug, title, description, owner_address, goal_amount::text, goal_token, deadline, created_at
       FROM campaigns WHERE slug = $1`,
      [slug]
    );
    return rows[0] ?? null;
  }

  async findById(id: string): Promise<CampaignRow | null> {
    const { rows } = await this.pool.query<CampaignRow>(
      `SELECT id, slug, title, description, owner_address, goal_amount::text, goal_token, deadline, created_at
       FROM campaigns WHERE id = $1`,
      [id]
    );
    return rows[0] ?? null;
  }
}
