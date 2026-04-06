import type { WalletSession } from '../types.js';

/** EIP-12 / Nautilus window.ergo / ergo types are injected at runtime. */
export async function connectNautilus(): Promise<WalletSession> {
  const w = typeof window !== 'undefined' ? (window as unknown as { ergo?: { get_used_addresses?: () => Promise<string[]> } }) : undefined;
  if (!w?.ergo?.get_used_addresses) {
    throw new Error('Nautilus not available: install Nautilus for Ergo');
  }
  const addrs = await w.ergo.get_used_addresses();
  const address = addrs[0];
  if (!address) throw new Error('No Ergo address from wallet');
  return { walletId: 'nautilus', address, connected: true };
}
