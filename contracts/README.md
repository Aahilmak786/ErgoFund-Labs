# Bene Fundraising – ErgoScript Contracts

ErgoScript smart contracts for the Bene fundraising platform on Ergo (AOSSIE Technologies).  
Compile with [escript.online](https://escript.online/) or the ErgoScript compiler.

## Contracts

| File | Purpose |
|------|--------|
| **BeneCampaign.ergo** | Main campaign box. Supports **Collect** (recipient claims when goal met) and **Contribute** (anyone adds ERG before deadline). |
| **BeneRefund.ergo** | Placeholder for refund-on-failure logic (claim ERG when deadline passed and goal not met, using refund tokens). |

## BeneCampaign.ergo – Register Layout

| Register | Type | Meaning |
|----------|------|--------|
| R4 | Long | `goal` – funding goal in nanoERG |
| R5 | Int | `deadline` – block height; no new contributions after this |
| R6 | SigmaProp | `recipient` – project owner (can collect when goal met) |

## Spending Paths (BeneCampaign)

1. **Collect**  
   - Recipient signs.  
   - `SELF.value >= goal`.  
   - At least one output receives the campaign value (minus fee).  
   - Used when the campaign is successful.

2. **Contribute**  
   - No signature from recipient.  
   - `HEIGHT < deadline`.  
   - One output is the same contract (same `propositionBytes`, same R4, R5, R6) and has **strictly more** value than the current box.  
   - Used to add ERG to the campaign before the deadline.

## Compilation and Deployment

ErgoScript is compiled to **ErgoTree** and then to a **Pay-to-Script (P2S) address** for deployment.

- **Compile**: Use [escript.online](https://escript.online/), [Plutomonkey P2S Playground](https://wallet.plutomonkey.com/p2s/), or the [ErgoScript compiler](https://github.com/ergoplatform/ergoscript-compiler) (Scala/CLI).
- **Test**: Use [Ergo Playgrounds](https://github.com/ergoplatform/ergo-playgrounds) or [Ergo Puppet](https://docs.ergoplatform.com/dev/scs/puppet/) for simulation and tests.
- **Fleet SDK**: Off-chain code (create campaign box, build collect/contribute transactions) should use [Fleet SDK](https://fleet-sdk.github.io/docs/) in this repo’s TypeScript/SvelteKit app.

## Creating a Campaign Box (off-chain)

1. Compile `BeneCampaign.ergo` to an ErgoTree / P2S address.
2. Build a transaction that creates one output box with:
   - **value**: e.g. minimum (e.g. 1_000_000 nanoERG for min box value).
   - **propositionBytes**: compiled ErgoTree.
   - **R4**: `goal` (Long).
   - **R5**: `deadline` (Int, block height).
   - **R6**: `recipient` (SigmaProp from project owner’s public key).

Contributions are done by spending this box with the **Contribute** path; collection by the recipient uses the **Collect** path.

## Refunds (BeneRefund.ergo)

Refund-on-failure (after deadline, goal not met) is not implemented in contract logic yet. The intended design is:

- Refund tokens issued when users contribute.
- If the campaign fails, contributors spend their refund token and receive their share of the campaign box.
- `BeneRefund.ergo` is a placeholder; implement and audit before mainnet.

## Security and Testing

- Test on **Ergo Testnet** before mainnet.
- Audit all spending paths and register assumptions.
- Ensure deadline and goal are set correctly at campaign creation.
