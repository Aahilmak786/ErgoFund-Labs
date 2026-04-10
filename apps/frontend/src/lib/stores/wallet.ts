import { writable } from 'svelte/store';
import {
  connectNautilus,
  connectErgoWallet,
  connectSafePal,
  isLikelyErgoAddress
} from '@benefaction/sdk';
import type { WalletSession, WalletId } from '@benefaction/sdk';

export const wallet = writable<WalletSession | null>(null);
export const walletError = writable<string | null>(null);
/** Show full wallet details panel (address, explorer, help links). */
export const walletPanelOpen = writable(false);

export async function connect(kind: WalletId): Promise<void> {
  walletError.set(null);
  walletPanelOpen.set(false);
  try {
    const session =
      kind === 'nautilus'
        ? await connectNautilus()
        : kind === 'safepal'
          ? await connectSafePal()
          : await connectErgoWallet();
    wallet.set(session);
    walletPanelOpen.set(true);
  } catch (e) {
    walletError.set(e instanceof Error ? e.message : 'Wallet error');
    wallet.set(null);
  }
}

export function disconnect(): void {
  wallet.set(null);
  walletPanelOpen.set(false);
}

/**
 * SafePal account names (e.g. "Wallet01-728") are not chain addresses.
 * User must copy **Ergo → Receive** in SafePal (long base58 string, often starts with 9).
 * @returns `null` on success, or an error message for the UI.
 */
export function tryPastedSafePalErgo(raw: string): string | null {
  const t = raw.trim();
  if (!t) return 'Paste your Ergo Receive address from SafePal.';
  if (t.length < 45 && /wallet|safepal|[\-_]/.test(t) && !t.startsWith('9')) {
    return `"${t.slice(0, 24)}${t.length > 24 ? '…' : ''}" looks like a SafePal wallet name (e.g. Wallet01-728), not an Ergo address. Open SafePal → Ergo → Receive and copy the long address.`;
  }
  if (!isLikelyErgoAddress(t)) {
    return 'That is not a valid Ergo address. In SafePal: Ergo → Receive → copy the full address (not the account nickname).';
  }
  wallet.set({
    walletId: 'safepal',
    address: t,
    connected: true,
    displayLabel: 'SafePal (Receive address)',
    readOnly: true
  });
  walletPanelOpen.set(true);
  return null;
}
