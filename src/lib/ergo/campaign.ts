import {
	ErgoAddress,
	OutputBuilder,
	SAFE_MIN_BOX_VALUE,
	SInt,
	SLong,
	SGroupElement,
	SSigmaProp,
	TransactionBuilder
} from '@fleet-sdk/core';
import type { ErgoTx, WalletType } from './wallet';
import { getCreationHeight, getWalletConnector } from './wallet';
import { BENE_CAMPAIGN_ERGOTREE } from './contracts';

export type CreateCampaignParams = {
	walletType: WalletType;
	goalNanoErg: bigint;
	deadlineHeight: number;
	recipientAddress: string;
	campaignErgoTree?: string;
	minBoxValueNanoErg?: bigint;
};

export async function createCampaignTx(params: CreateCampaignParams): Promise<{ txId: string; campaignAddress: string }> {
	const connector = getWalletConnector(params.walletType);
	if (!connector) throw new Error('Wallet connector not available');

	const [height, inputs, changeAddress] = await Promise.all([
		getCreationHeight(params.walletType),
		connector.getUtxos(),
		connector.getChangeAddress()
	]);

	if (!changeAddress) throw new Error('Failed to get change address from wallet');
	if (!inputs || inputs.length === 0) throw new Error('No UTXOs available in wallet');

	const fleetInputs = inputs.map((b) => ({
		...b,
		assets: b.assets ?? [],
		additionalRegisters: b.additionalRegisters ?? {}
	}));

	const campaignErgoTree = params.campaignErgoTree ?? BENE_CAMPAIGN_ERGOTREE;
	if (!campaignErgoTree) {
		throw new Error('Missing campaign ErgoTree. Set PUBLIC_BENE_CAMPAIGN_ERGOTREE or pass campaignErgoTree.');
	}

	const recipientPk = ErgoAddress.decode(params.recipientAddress).getPublicKeys()?.[0];
	if (!recipientPk) throw new Error('Recipient address must be a P2PK address to derive SigmaProp');

	const campaignAddress = ErgoAddress.fromErgoTree(campaignErgoTree).toString();

	const minBoxValue = params.minBoxValueNanoErg ?? SAFE_MIN_BOX_VALUE;
	const output = new OutputBuilder(minBoxValue, campaignAddress).setAdditionalRegisters({
		R4: SLong(params.goalNanoErg),
		R5: SInt(params.deadlineHeight),
		R6: SSigmaProp(SGroupElement(recipientPk))
	});

	const unsignedTx = new TransactionBuilder(height)
		.from(fleetInputs)
		.to(output)
		.sendChangeTo(changeAddress)
		.payMinFee()
		.build()
		.toEIP12Object();

	const signed = (await connector.signTx(unsignedTx as unknown as ErgoTx)) as unknown as ErgoTx;
	const txId = await connector.submitTx(signed);

	return { txId, campaignAddress };
}

