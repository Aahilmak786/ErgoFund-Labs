import { writable } from 'svelte/store';
import { connectNautilus, connectErgoWallet } from '@benefaction/sdk';
import type { WalletSession, WalletId } from '@benefaction/sdk';

export const wallet = writable<WalletSession | null>(null);
export const walletError = writable<string | null>(null);

export async function connect(kind: WalletId): Promise<void> {
  walletError.set(null);
  try {
    const session = kind === 'nautilus' ? await connectNautilus() : await connectErgoWallet();
    wallet.set(session);
  } catch (e) {
    walletError.set(e instanceof Error ? e.message : 'Wallet error');
    wallet.set(null);
  }
}

export function disconnect(): void {
  wallet.set(null);
}
