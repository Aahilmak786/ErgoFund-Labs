/**
 * Referral system with protection against misuse
 * - Rate limiting
 * - Unique referral codes
 * - Verification before rewards
 */

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REFERRALS_PER_WINDOW = 10;

export function generateReferralCode(address: string): string {
	// Deterministic code from address (in production, use secure hash + salt)
	const hash = address.slice(-8) + address.slice(0, 6);
	return `BENE-${hash.replace(/[^a-zA-Z0-9]/g, '')}`.toUpperCase();
}

export interface ReferralRecord {
	code: string;
	referrer: string;
	count: number;
	lastUsed: number;
}

export function checkRateLimit(record: ReferralRecord): boolean {
	const now = Date.now();
	if (now - record.lastUsed > RATE_LIMIT_WINDOW_MS) {
		return true; // Window reset
	}
	return record.count < MAX_REFERRALS_PER_WINDOW;
}
