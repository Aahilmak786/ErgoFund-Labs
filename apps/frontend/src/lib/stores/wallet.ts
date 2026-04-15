import { writable } from 'svelte/store';
import { connectNautilus, connectErgoWallet } from '@benefaction/sdk';
import type { WalletSession } from '@benefaction/sdk';

export const wallet = writable<WalletSession | null>(null);
export const walletError = writable<string | null>(null);
/** Show full wallet details panel (address, explorer, help links). */
export const walletPanelOpen = writable(false);

export async function connect(kind: 'nautilus' | 'ergo-wallet'): Promise<void> {
  walletError.set(null);
  walletPanelOpen.set(false);
  try {
    const session = kind === 'nautilus' ? await connectNautilus() : await connectErgoWallet();
    wallet.set(session);
    walletPanelOpen.set(true);
  } catch (e) {
    walletError.set(e instanceof Error ? e.message : 'Wallet error');
    wallet.set(null);
  }
}

const DEMO_WALLET_SESSION: WalletSession = {
  walletId: 'ergo-wallet',
  address: '9fRAWhdxEsTcdb8PhGNrZfwqa65zfkuYHAMmkQLcic1gdLSV',
  connected: true,
  displayLabel: 'Demo Wallet',
  readOnly: true
};

export function connectDemoWallet(): void {
  walletError.set(null);
  wallet.set(DEMO_WALLET_SESSION);
  walletPanelOpen.set(true);
}

export function disconnect(): void {
  wallet.set(null);
  walletPanelOpen.set(false);
}
