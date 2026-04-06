# Architecture — BenefactionPlatform-Ergo

High-level reference for mentors and contributors. Update as implementation lands.

## UTXO flow (conceptual)

1. **Campaign box** holds campaign state (datum): goal, deadline, owner, milestone index, allowed tokens / registry refs.
2. **Contribution txs** spend/create boxes that record pledged amounts per token; token IDs must match the **on-chain or app-level registry** (no spoofed assets).
3. **Milestone release** (if applicable) moves value per contract rules when milestones are authorized.
4. **Refund path** unlocks when conditions fail (e.g. goal not met by deadline), per ErgoScript guards.

## Token model

| Asset | Typical decimals | Notes |
| --- | --- | --- |
| ERG | 9 | Base fees and MIN_ERG for boxes |
| SigUSD | 2 | Stablecoin example |
| APT / PFT / others | From registry | Allowlist + metadata |

## Referral logic (target)

- Metadata in **registers** (or committed hashes) as designed with mentors.
- **Anti-sybil:** minimum stake and/or PoW — specify in contract + off-chain policy.
- **Idempotency / replay:** unique nonces or box chaining so the same proof cannot be replayed.

## Off-chain stack

- **SvelteKit** UI → **Fleet SDK** tx building → wallet (EIP-12 / ErgoPay / etc.).
- **Indexer/API** (optional): analytics and `/health` for deployment probes.

## Deployment

See **README.md** (setup, Docker, live URLs) and **`.env.example`** for variables.
