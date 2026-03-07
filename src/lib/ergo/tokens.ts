/**
 * Multi-token support for Bene Fundraising Platform.
 * ERG (native), stablecoins (SigUSD, etc.), and custom tokens.
 */

// Ergo mainnet token IDs (placeholders - use actual IDs in production)
export const TOKEN_IDS = {
	ERG: 'ERG', // Native token - no ID
	SIGUSD: '03faf2cb329f2e90d6d23b58d91b6a589c31938ed6eaf0fdf291e82a9a0c0e',
	SIGRSV: '003bd19d0187117f130b62e1bcab0939929ff5c7709f843c5c4dd158949285d0'
	// Add more stablecoins and project tokens as needed
} as const;

export interface TokenInfo {
	id: string;
	symbol: string;
	name: string;
	decimals: number;
	isStablecoin?: boolean;
	isNative?: boolean;
}

export const SUPPORTED_TOKENS: TokenInfo[] = [
	{
		id: 'ERG',
		symbol: 'ERG',
		name: 'Ergo',
		decimals: 9,
		isNative: true,
		isStablecoin: false
	},
	{
		id: TOKEN_IDS.SIGUSD,
		symbol: 'SigUSD',
		name: 'Sigma USD',
		decimals: 2,
		isStablecoin: true,
		isNative: false
	},
	{
		id: TOKEN_IDS.SIGRSV,
		symbol: 'SigRSV',
		name: 'Sigma RSV',
		decimals: 0,
		isStablecoin: false,
		isNative: false
	}
];

/**
 * Get token info by ID
 */
export function getTokenInfo(tokenId: string): TokenInfo | undefined {
	if (tokenId === 'ERG') {
		return SUPPORTED_TOKENS.find((t) => t.isNative);
	}
	return SUPPORTED_TOKENS.find((t) => t.id === tokenId);
}

/**
 * Get supported stablecoins for fundraising
 */
export function getStablecoins(): TokenInfo[] {
	return SUPPORTED_TOKENS.filter((t) => t.isStablecoin);
}

/**
 * Format token amount for display
 */
export function formatTokenAmount(amount: bigint, tokenId: string): string {
	const info = getTokenInfo(tokenId);
	const decimals = info?.decimals ?? 9;
	const divisor = 10 ** decimals;
	const whole = Number(amount) / divisor;
	return whole.toLocaleString('en-US', { maximumFractionDigits: decimals });
}
