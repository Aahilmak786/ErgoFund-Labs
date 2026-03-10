const env = typeof import.meta !== 'undefined' ? (import.meta as { env?: Record<string, string> }).env : undefined;

/**
 * Compiled ErgoTree hex string for `contracts/BeneCampaign.ergo`.
 *
 * Provide via Vite env, e.g.:
 * - `PUBLIC_BENE_CAMPAIGN_ERGOTREE` (recommended)
 */
export const BENE_CAMPAIGN_ERGOTREE: string | undefined = env?.PUBLIC_BENE_CAMPAIGN_ERGOTREE;

