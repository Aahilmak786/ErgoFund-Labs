import type { TokenSymbol } from './types.js';

export interface RegisteredToken {
  symbol: TokenSymbol;
  /** Base16 token ID on Ergo (empty for native ERG in app logic). */
  tokenId: string;
  decimals: number;
  /** Human label for UI */
  label: string;
  stablecoin: boolean;
}

/** Dynamic registry: replace IDs with mainnet/testnet values via env at build/runtime. */
export function loadTokenRegistry(env: Record<string, string | undefined>): Map<string, RegisteredToken> {
  const map = new Map<string, RegisteredToken>();

  const add = (t: RegisteredToken) => {
    map.set(t.tokenId.toLowerCase(), t);
    map.set(t.symbol, t);
  };

  add({
    symbol: 'APT',
    tokenId: (env.PUBLIC_TOKEN_APT_ID ?? 'apt-placeholder-token-id').toLowerCase(),
    decimals: Number(env.PUBLIC_TOKEN_APT_DECIMALS ?? 4),
    label: 'APT',
    stablecoin: false
  });

  add({
    symbol: 'PFT',
    tokenId: (env.PUBLIC_TOKEN_PFT_ID ?? 'pft-placeholder-token-id').toLowerCase(),
    decimals: Number(env.PUBLIC_TOKEN_PFT_DECIMALS ?? 4),
    label: 'PFT',
    stablecoin: false
  });

  add({
    symbol: 'SIGUSD',
    tokenId: (env.PUBLIC_TOKEN_SIGUSD_ID ?? 'sigusd-placeholder-token-id').toLowerCase(),
    decimals: Number(env.PUBLIC_TOKEN_SIGUSD_DECIMALS ?? 2),
    label: 'SigUSD',
    stablecoin: true
  });

  return map;
}
