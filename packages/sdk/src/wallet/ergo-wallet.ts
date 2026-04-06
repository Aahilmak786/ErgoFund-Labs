import type { WalletSession } from '../types.js';

/** Yoroi / Ergo Wallet browser bridge — API surface varies; normalize to one address. */
export async function connectErgoWallet(): Promise<WalletSession> {
  const w = typeof window !== 'undefined' ? (window as unknown as { ergo_request_read_access?: () => Promise<boolean>; ergo?: { get_used_addresses?: () => Promise<string[]> } }) : undefined;
  if (w?.ergo_request_read_access) {
    const ok = await w.ergo_request_read_access();
    if (!ok) throw new Error('User denied Ergo Wallet access');
  }
  if (!w?.ergo?.get_used_addresses) {
    throw new Error('Ergo Wallet API not found');
  }
  const addrs = await w.ergo.get_used_addresses();
  const address = addrs[0];
  if (!address) throw new Error('No Ergo address from wallet');
  return { walletId: 'ergo-wallet', address, connected: true };
}
