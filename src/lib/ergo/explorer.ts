/**
 * Ergo Explorer API client – blockchain data retrieval.
 * Mainnet: api.ergoplatform.com | Testnet: api-testnet.ergoplatform.com
 */

const env = typeof import.meta !== 'undefined' ? (import.meta as { env?: Record<string, string> }).env : undefined;
export const ERGO_EXPLORER_URL = env?.PUBLIC_ERGO_EXPLORER_URL ?? 'https://api.ergoplatform.com';

export const ERGO_TESTNET_URL = 'https://api-testnet.ergoplatform.com';

export function getExplorerBaseUrl(useTestnet = false): string {
	return useTestnet ? ERGO_TESTNET_URL : ERGO_EXPLORER_URL;
}

export interface ErgoBoxAsset {
	tokenId: string;
	index: number;
	amount: number;
	name?: string;
	decimals?: number;
	type?: string;
}

export interface ErgoBoxInfo {
	boxId: string;
	transactionId: string;
	blockId?: string;
	value: number;
	index: number;
	globalIndex?: number;
	creationHeight: number;
	settlementHeight?: number;
	ergoTree: string;
	address: string;
	assets?: ErgoBoxAsset[];
	additionalRegisters?: Record<string, string>;
	spentTransactionId?: string;
	mainChain?: boolean;
}

export interface BoxesResponse {
	items: ErgoBoxInfo[];
	total: number;
}

/**
 * Fetch unspent boxes by address from Ergo Explorer API
 */
export async function getUnspentBoxesByAddress(
	address: string,
	options?: { offset?: number; limit?: number; useTestnet?: boolean }
): Promise<BoxesResponse> {
	const base = getExplorerBaseUrl(options?.useTestnet ?? false);
	const params = new URLSearchParams();
	if (options?.offset !== undefined) params.set('offset', String(options.offset));
	if (options?.limit !== undefined) params.set('limit', String(Math.min(options.limit, 500)));

	const url = `${base}/api/v1/boxes/unspent/byAddress/${address}?${params}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Ergo Explorer API error: ${res.status}`);
	return res.json();
}

/**
 * Fetch a single box by ID
 */
export async function getBoxById(
	boxId: string,
	useTestnet = false
): Promise<ErgoBoxInfo> {
	const base = getExplorerBaseUrl(useTestnet);
	const res = await fetch(`${base}/api/v1/boxes/${boxId}`);
	if (!res.ok) throw new Error(`Box not found: ${boxId}`);
	return res.json();
}

/**
 * Get total balance (nanoERG) for an address from Explorer
 */
export async function getAddressBalance(
	address: string,
	useTestnet = false
): Promise<bigint> {
	const { items } = await getUnspentBoxesByAddress(address, { limit: 500, useTestnet });
	return items.reduce((sum, box) => sum + BigInt(box.value), 0n);
}
