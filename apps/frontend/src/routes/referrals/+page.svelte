<script lang="ts">
  import { apiPost } from '$lib/api';
  import { wallet } from '$lib/stores/wallet';
  import { isLikelyErgoAddress } from '@benefaction/sdk';

  let code = $state('BENE-ERG-01');
  let referred = $state('');
  /** When no extension is connected, paste your Ergo P2PK address (demo / testing). */
  let manualReferrer = $state('');
  let message = $state<string | null>(null);
  let pending = $state(false);

  const referrerAddr = $derived(
    $wallet?.address?.trim() || manualReferrer.trim()
  );

  async function submit(e: Event) {
    e.preventDefault();
    message = null;
    if (!referrerAddr) {
      message =
        'Connect a wallet with the header (Nautilus, Ergo Wallet, or SafePal in-app), or paste your Ergo address in the demo field below.';
      return;
    }
    if (!isLikelyErgoAddress(referrerAddr)) {
      message =
        'Referrer address must look like Ergo (base58, often starts with 9 on mainnet). Bitcoin addresses (bc1…) are not valid.';
      return;
    }
    if (!referred.trim()) {
      message = 'Enter a second Ergo address to act as the referred wallet.';
      return;
    }
    if (!isLikelyErgoAddress(referred.trim())) {
      message =
        'Referred wallet must be a plausible Ergo address — not a Bitcoin (bc1) or Ethereum (0x) address.';
      return;
    }
    if (referrerAddr === referred.trim()) {
      message = 'Referrer and referred addresses must differ (self-referral is blocked).';
      return;
    }
    pending = true;
    try {
      await apiPost<{ ok: boolean; referralId?: string }>('/api/referrals/validate', {
        code,
        referrerWallet: referrerAddr,
        referredWallet: referred.trim()
      });
      message = 'Referral recorded (demo policy).';
    } catch (err) {
      message = err instanceof Error ? err.message : 'Error';
    } finally {
      pending = false;
    }
  }
</script>

<svelte:head>
  <title>Referrals — BenefactionPlatform-Ergo</title>
</svelte:head>

<h1>Referrals</h1>
<p class="muted lead">
  Anti-abuse: self-referrals blocked, per-referrer rate limits, one referred wallet globally (demo schema).
  Use <strong>Ergo addresses</strong> (e.g. mainnet often starts with <code>9</code>) — not Bitcoin
  <code>bc1…</code>.
</p>

{#if !$wallet}
  <section class="card hint">
    <h2>No wallet connected</h2>
    <p class="muted">
      Install <strong>Nautilus</strong> for Chrome/Firefox, or use <strong>SafePal</strong> → Browser → Ergo, then use
      the header buttons. Or paste your Ergo address below for API testing only.
    </p>
    <label for="manual-ref">Your Ergo address (demo, if not using a browser wallet)</label>
    <input
      id="manual-ref"
      bind:value={manualReferrer}
      placeholder="e.g. 9eyX… (mainnet P2PK style)"
      autocomplete="off"
    />
  </section>
{:else}
  <p class="card subtle">
    Using connected wallet as referrer: <strong>{$wallet.displayLabel ?? $wallet.walletId}</strong> —
    <code class="addr">{$wallet.address.slice(0, 14)}…</code>
  </p>
{/if}

<form class="card form" onsubmit={submit}>
  <label for="code">Referral code</label>
  <input id="code" bind:value={code} autocomplete="off" />

  <label for="referred">Referred wallet (Ergo address)</label>
  <input
    id="referred"
    bind:value={referred}
    placeholder="Another Ergo address (not bc1… Bitcoin)"
    autocomplete="off"
  />

  <button class="btn" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Validate'}</button>
</form>

{#if message}
  <p
    class="feedback"
    class:error={message.includes('not valid') ||
      message.includes('blocked') ||
      message.includes('must differ')}
    role="status"
  >
    {message}
  </p>
{/if}

<style>
  .lead {
    max-width: 52rem;
    line-height: 1.5;
  }
  .lead code {
    font-size: 0.9em;
  }
  .hint {
    margin-bottom: 1rem;
    border-left: 4px solid var(--brand);
  }
  .hint h2 {
    margin-top: 0;
    font-size: 1.05rem;
  }
  .subtle {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
  .addr {
    font-size: 0.85rem;
    word-break: break-all;
  }
  .form label {
    display: block;
    margin: 0.5rem 0 0.25rem;
    font-weight: 600;
  }
  .form input {
    width: 100%;
    max-width: min(100%, 520px);
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    box-sizing: border-box;
  }
  .btn {
    margin-top: 0.75rem;
    border: 0;
    border-radius: 10px;
    padding: 0.55rem 0.9rem;
    font-weight: 800;
    cursor: pointer;
    background: var(--brand);
    color: #041018;
  }
  .btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  .feedback {
    margin-top: 1rem;
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    max-width: min(100%, 520px);
  }
  .feedback.error {
    border-color: rgba(220, 100, 100, 0.5);
  }
</style>
