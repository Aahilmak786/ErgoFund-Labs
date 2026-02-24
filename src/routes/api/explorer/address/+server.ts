/**
 * Node.js API route - Ergo Explorer blockchain data by address
 */
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUnspentBoxesByAddress, getAddressBalance } from '$lib/ergo/explorer';

export const GET: RequestHandler = async ({ url }) => {
	const address = url.searchParams.get('address');
	const useTestnet = url.searchParams.get('testnet') === 'true';

	if (!address) {
		return json({ error: 'Missing address parameter' }, { status: 400 });
	}

	try {
		const [boxes, balance] = await Promise.all([
			getUnspentBoxesByAddress(address, { limit: 100, useTestnet }),
			getAddressBalance(address, useTestnet)
		]);

		return json({
			address,
			balance: balance.toString(),
			boxesCount: boxes.items.length,
			total: boxes.total
		});
	} catch (e) {
		const msg = e instanceof Error ? e.message : 'Explorer API error';
		return json({ error: msg }, { status: 502 });
	}
};
