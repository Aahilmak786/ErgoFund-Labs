import type { WalletSession } from '../types.js';
import { readErgoAddressFromWindow } from './ergo-bridge.js';

/**
 * SafePal: use the in-app **Browser** tab with Ergo network, where `window.ergo` is injected
 * like other Ergo dApps. Same bridge as Nautilus on desktop if multiple wallets are installed.
 */
export async function connectSafePal(): Promise<WalletSession> {
  try {
    const address = await readErgoAddressFromWindow();
    return {
      walletId: 'safepal',
      address,
      connected: true,
      displayLabel: 'SafePal'
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('No Ergo wallet')) {
      throw new Error(
        'SafePal: use **Browser** inside the app with Ergo, then tap SafePal again — or tap **Paste Ergo address** and copy your address from SafePal → Ergo → Receive (Wallet01-728 is only a label, not your chain address).'
      );
    }
    throw e;
  }
}
