import type { WalletSession } from '../types.js';
import { readErgoAddressFromWindow } from './ergo-bridge.js';

/** Nautilus injects `window.ergo` (same bridge other Ergo wallets may share). */
export async function connectNautilus(): Promise<WalletSession> {
  try {
    const address = await readErgoAddressFromWindow();
    return { walletId: 'nautilus', address, connected: true, displayLabel: 'Nautilus' };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('No Ergo wallet')) {
      throw new Error(
        'Nautilus not detected. Install the Nautilus wallet for your browser from the official Ergo / Nautilus site, then refresh this page.'
      );
    }
    throw e;
  }
}
