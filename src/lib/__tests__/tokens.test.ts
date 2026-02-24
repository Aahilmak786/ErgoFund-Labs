import { describe, it, expect } from '@jest/globals';
import { getTokenInfo, getStablecoins, formatTokenAmount } from '../ergo/tokens';

describe('tokens', () => {
	describe('getTokenInfo', () => {
		it('returns ERG for native token', () => {
			const info = getTokenInfo('ERG');
			expect(info?.symbol).toBe('ERG');
			expect(info?.isNative).toBe(true);
		});

		it('returns undefined for unknown token', () => {
			expect(getTokenInfo('unknown')).toBeUndefined();
		});
	});

	describe('getStablecoins', () => {
		it('returns only stablecoins', () => {
			const stablecoins = getStablecoins();
			expect(stablecoins.every((t) => t.isStablecoin)).toBe(true);
		});
	});

	describe('formatTokenAmount', () => {
		it('formats ERG with 9 decimals', () => {
			expect(formatTokenAmount(1_000_000_000n, 'ERG')).toContain('1');
		});

		it('handles zero', () => {
			expect(formatTokenAmount(0n, 'ERG')).toBe('0');
		});
	});
});
