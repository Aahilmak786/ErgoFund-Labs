export type TokenSymbol = 'APT' | 'PFT' | 'SIGUSD' | 'ERG';

export type WalletId = 'nautilus' | 'ergo-wallet' | 'safepal';

export interface WalletSession {
  walletId: WalletId;
  address: string;
  connected: boolean;
  /** Human-readable wallet name for UI (e.g. SafePal). */
  displayLabel?: string;
  /** True when the address was pasted (no browser extension); signing txs is not available. */
  readOnly?: boolean;
}
