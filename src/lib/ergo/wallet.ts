/**
 * Multi-wallet connector for Ergo blockchain
 * Supports Nautilus, Yoroi, SAFEW via EIP-12 dApp Connector API
 */

// EIP-12 ergo connector types
export interface ErgoConnector {
	connect: (params?: { createErgoObject?: boolean }) => Promise<boolean>;
	disconnect: () => Promise<void>;
	isConnected: () => Promise<boolean>;
	getContext: () => Promise<ErgoStateContext | undefined>;
	getChangeAddress: () => Promise<string | undefined>;
	getUnusedAddresses: () => Promise<string[]>;
	getUsedAddresses: () => Promise<string[]>;
	getUtxos: (amount?: string, tokenId?: string) => Promise<ErgoBox[]>;
	signTx: (tx: ErgoTx) => Promise<ErgoTx>;
	signInput: (tx: ErgoTx, index: number) => Promise<Input>;
}

export interface ErgoStateContext {
	lastBlockId: string;
	height: number;
}

export interface ErgoBox {
	boxId: string;
	value: string;
	ergoTree: string;
	assets?: { tokenId: string; amount: string }[];
	additionalRegisters?: Record<string, string>;
	creationHeight: number;
	transactionId: string;
	index: number;
}

export interface ErgoTx {
	id?: string;
	inputs: Input[];
	dataInputs: Input[];
	outputs: Output[];
}

export interface Input {
	boxId: string;
	spendingProof?: { proofBytes: string; extension: Record<string, string> };
}

export interface Output {
	boxId?: string;
	value: string;
	ergoTree: string;
	assets?: { tokenId: string; amount: string }[];
	additionalRegisters?: Record<string, string>;
}

export type WalletType = 'nautilus' | 'yoroi' | 'safew';

export interface ConnectedWallet {
	type: WalletType;
	address: string;
	utxos: ErgoBox[];
	balance: bigint;
	isConnected: boolean;
}

declare global {
	interface Window {
		ergoConnector?: {
			nautilus?: ErgoConnector;
			yoroi?: ErgoConnector;
			safew?: ErgoConnector;
		};
	}
}

const WALLET_NAMES: Record<WalletType, string> = {
	nautilus: 'Nautilus',
	yoroi: 'Yoroi',
	safew: 'SAFEW'
};

/**
 * Get available wallet connectors (browser only)
 */
export function getAvailableWallets(): WalletType[] {
	if (typeof window === 'undefined') return [];
	const connector = window.ergoConnector;
	if (!connector) return [];

	const available: WalletType[] = [];
	if (connector.nautilus) available.push('nautilus');
	if (connector.yoroi) available.push('yoroi');
	if (connector.safew) available.push('safew');
	return available;
}

/**
 * Get wallet display name
 */
export function getWalletName(type: WalletType): string {
	return WALLET_NAMES[type] ?? type;
}

/**
 * Connect to a specific Ergo wallet
 */
export async function connectWallet(type: WalletType): Promise<ConnectedWallet | null> {
	if (typeof window === 'undefined') return null;

	const connector = window.ergoConnector?.[type];
	if (!connector) {
		throw new Error(`${getWalletName(type)} wallet not detected. Please install the extension.`);
	}

	const connected = await connector.connect();
	if (!connected) return null;

	const [address, utxos, context] = await Promise.all([
		connector.getChangeAddress(),
		connector.getUtxos(),
		connector.getContext()
	]);

	if (!address) return null;

	const balance = utxos.reduce((sum, box) => sum + BigInt(box.value), 0n);

	return {
		type,
		address,
		utxos: utxos ?? [],
		balance,
		isConnected: true
	};
}

/**
 * Disconnect from wallet
 */
export async function disconnectWallet(type: WalletType): Promise<void> {
	if (typeof window === 'undefined') return;

	const connector = window.ergoConnector?.[type];
	if (connector) {
		await connector.disconnect();
	}
}

/**
 * Get creation height for transaction building (Fleet SDK)
 */
export async function getCreationHeight(type: WalletType): Promise<number> {
	if (typeof window === 'undefined') return 0;

	const connector = window.ergoConnector?.[type];
	const context = await connector?.getContext();
	return context?.height ?? 0;
}
