export type TokenSymbol = 'APT' | 'PFT' | 'SIGUSD' | 'ERG';

export type WalletId = 'nautilus' | 'ergo-wallet';

export interface WalletSession {
  walletId: WalletId;
  address: string;
  connected: boolean;
}
