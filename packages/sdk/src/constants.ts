/** Base token decimals (Ergo standard references). */
export const DECIMALS = {
  ERG: 9,
  SIG_USD: 2
} as const;

/** Minimum nanoERG to keep boxes valid (protocol-dependent; document in contract). */
export const MIN_NANO_ERG_BOX = 100_000n;
