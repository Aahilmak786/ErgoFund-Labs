import type { ReferralRepository } from '../repositories/referral.repository.js';

const MAX_EVENTS_PER_WINDOW = 50;
const WINDOW_MS = 86_400_000;

export class ReferralService {
  constructor(private readonly referrals: ReferralRepository) {}

  async validateUse(params: { code: string; referrerWallet: string; referredWallet: string }) {
    if (params.referrerWallet === params.referredWallet) {
      return { ok: false as const, reason: 'Self-referral not allowed' };
    }

    const row = await this.referrals.findByCode(params.code);
    if (!row) return { ok: false as const, reason: 'Invalid referral code' };
    if (row.referrer_wallet !== params.referrerWallet) {
      return { ok: false as const, reason: 'Code does not match referrer wallet' };
    }

    const recent = await this.referrals.countEventsLastWindow(params.referrerWallet, WINDOW_MS);
    if (recent >= MAX_EVENTS_PER_WINDOW) {
      return { ok: false as const, reason: 'Rate limit: too many referrals in window' };
    }

    await this.referrals.insertEvent(row.id, params.referredWallet);
    return { ok: true as const, referralId: row.id };
  }
}
