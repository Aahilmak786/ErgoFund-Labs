import type { WalletSession } from '../types.js';
import { readErgoAddressFromWindow } from './ergo-bridge.js';

/** Yoroi “Ergo Wallet”, Nautilus, or any injector exposing EIP-12 `window.ergo`. */
export async function connectErgoWallet(): Promise<WalletSession> {
  const address = await readErgoAddressFromWindow();
  return { walletId: 'ergo-wallet', address, connected: true, displayLabel: 'Ergo Wallet' };
}
