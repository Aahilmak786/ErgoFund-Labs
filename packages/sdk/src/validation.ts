import type { RegisteredToken } from './token-registry.js';

export function assertTokenAllowed(tokenId: string, registry: Map<string, RegisteredToken>): RegisteredToken {
  const key = tokenId.toLowerCase();
  const token = registry.get(key);
  if (!token) throw new Error(`Token not in registry: ${tokenId}`);
  return token;
}

export function assertPositiveAmount(raw: bigint): void {
  if (raw <= 0n) throw new Error('Amount must be positive');
}
