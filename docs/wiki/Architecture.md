# Architecture

See [ARCHITECTURE.md](https://github.com/Aahilmak786/ErgoFund-Labs/blob/main/ARCHITECTURE.md) in the repository for the canonical UTXO flow, token model, and referral notes.

## Runtime

- **SvelteKit** UI calls the **REST API** for campaigns, analytics, and referral validation.
- **Fleet SDK** wallet connectors live in `packages/sdk` for client-side signing flows.
- **ErgoScript** contracts in `contracts/` are compiled separately; ErgoTree hex is wired via env when building transactions.

## Data

PostgreSQL stores campaign metadata and indexed contributions for analytics. Token amounts are keyed by on-chain token id strings.
