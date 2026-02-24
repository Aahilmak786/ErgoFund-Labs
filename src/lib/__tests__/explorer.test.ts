import { describe, it, expect } from '@jest/globals';
import {
	getExplorerBaseUrl,
	ERGO_EXPLORER_URL,
	ERGO_TESTNET_URL
} from '../ergo/explorer';

describe('explorer', () => {
	describe('getExplorerBaseUrl', () => {
		it('returns mainnet URL by default', () => {
			expect(getExplorerBaseUrl(false)).toBe(ERGO_EXPLORER_URL);
		});

		it('returns testnet URL when requested', () => {
			expect(getExplorerBaseUrl(true)).toBe(ERGO_TESTNET_URL);
		});
	});
});
