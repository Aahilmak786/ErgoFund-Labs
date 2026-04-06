import type pg from 'pg';

export class ReferralRepository {
  constructor(private readonly pool: pg.Pool) {}

  async findByCode(code: string): Promise<{ id: string; referrer_wallet: string } | null> {
    const { rows } = await this.pool.query<{ id: string; referrer_wallet: string }>(
      `SELECT id, referrer_wallet FROM referrals WHERE code = $1`,
      [code]
    );
    return rows[0] ?? null;
  }

  async countEventsLastWindow(referrerWallet: string, windowMs: number): Promise<number> {
    const since = new Date(Date.now() - windowMs);
    const { rows } = await this.pool.query<{ c: string }>(
      `SELECT COUNT(*)::text AS c FROM referral_events re
       JOIN referrals r ON r.id = re.referral_id
       WHERE r.referrer_wallet = $1 AND re.created_at >= $2`,
      [referrerWallet, since]
    );
    return Number(rows[0]?.c ?? 0);
  }

  async insertEvent(referralId: string, referredWallet: string): Promise<void> {
    await this.pool.query(
      `INSERT INTO referral_events (referral_id, referred_wallet) VALUES ($1, $2)
       ON CONFLICT (referred_wallet) DO NOTHING`,
      [referralId, referredWallet]
    );
  }
}
