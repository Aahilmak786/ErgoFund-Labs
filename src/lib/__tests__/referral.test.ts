import { describe, it, expect } from '@jest/globals';
import {
	generateReferralCode,
	checkRateLimit,
	type ReferralRecord
} from '../referral';

describe('referral', () => {
	describe('generateReferralCode', () => {
		it('generates deterministic code from address', () => {
			const addr = '9gNvAv97W71Wm33GoXgSQBFJxinFubKvE6wh2dEhFTSgYEe783j';
			const code = generateReferralCode(addr);
			expect(code).toMatch(/^BENE-[A-Z0-9]+$/);
			expect(generateReferralCode(addr)).toBe(code);
		});
	});

	describe('checkRateLimit', () => {
		it('allows when under limit', () => {
			const record: ReferralRecord = {
				code: 'BENE-TEST',
				referrer: 'addr',
				count: 5,
				lastUsed: Date.now() - 1000
			};
			expect(checkRateLimit(record)).toBe(true);
		});

		it('blocks when over limit', () => {
			const record: ReferralRecord = {
				code: 'BENE-TEST',
				referrer: 'addr',
				count: 15,
				lastUsed: Date.now() - 1000
			};
			expect(checkRateLimit(record)).toBe(false);
		});
	});
});
