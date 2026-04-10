/**
 * Normalizes different Ergo dApp-injection shapes (Nautilus, Yoroi/Ergo Wallet, SafePal in-app, etc.).
 * EIP-12 style: https://github.com/ergoplatform/eips/blob/master/eip-0012.md
 */
export type ErgoWindowApi = {
  get_used_addresses?: () => Promise<string[]>;
  /** Nautilus / several wallets expose this when `get_used_addresses` is missing. */
  get_change_address?: () => Promise<string>;
};

declare global {
  interface Window {
    ergo?: ErgoWindowApi;
    /** Yoroi / some builds require this before `window.ergo` is usable. */
    ergo_request_read_access?: () => Promise<boolean>;
  }
}

/** Heuristic: reject obvious non-Ergo chains (e.g. Bitcoin bc1…, EVM 0x…). */
export function isLikelyErgoAddress(address: string): boolean {
  const s = address.trim();
  if (s.length < 30 || s.length > 60) return false;
  if (s.startsWith('bc1') || s.startsWith('tb1') || s.startsWith('0x')) return false;
  // Mainnet P2PK often base58 starting with 9; testnet/other types vary — allow base58-like charset
  if (!/^[1-9A-HJ-NP-Za-km-z]+$/.test(s)) return false;
  return true;
}

export async function readErgoAddressFromWindow(): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('Wallet connection requires a browser');
  }

  if (typeof window.ergo_request_read_access === 'function') {
    const ok = await window.ergo_request_read_access();
    if (!ok) throw new Error('Wallet access was denied');
  }

  const ergo = window.ergo;
  if (!ergo) {
    throw new Error(
      'No Ergo wallet detected in this page. Install the Nautilus extension (desktop) or open this site in SafePal’s in-app Browser with Ergo enabled.'
    );
  }

  if (typeof ergo.get_used_addresses === 'function') {
    const addrs = await ergo.get_used_addresses();
    const first = addrs?.find(Boolean);
    if (first) return first;
  }

  if (typeof ergo.get_change_address === 'function') {
    const addr = await ergo.get_change_address();
    if (addr && typeof addr === 'string') return addr;
  }

  throw new Error(
    'Ergo wallet is present but did not return an address. Unlock the wallet, enable Ergo on this site, or try Nautilus.'
  );
}
