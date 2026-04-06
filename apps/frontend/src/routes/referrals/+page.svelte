<script lang="ts">
  import { apiUrl } from '$lib/api';
  import { wallet } from '$lib/stores/wallet';

  let code = $state('BENE-ERG-01');
  let referred = $state('');
  let message = $state<string | null>(null);
  let pending = $state(false);

  async function submit(e: Event) {
    e.preventDefault();
    message = null;
    if (!$wallet) {
      message = 'Connect a wallet first.';
      return;
    }
    if (!referred.trim()) {
      message = 'Enter a distinct referred wallet address.';
      return;
    }
    pending = true;
    try {
      const res = await fetch(apiUrl('/api/referrals/validate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          referrerWallet: $wallet.address,
          referredWallet: referred.trim()
        })
      });
      const data = (await res.json()) as { ok?: boolean; reason?: string };
      if (!res.ok) {
        message = data.reason ?? 'Request failed';
      } else {
        message = 'Referral recorded (demo policy).';
      }
    } catch (err) {
      message = err instanceof Error ? err.message : 'Error';
    } finally {
      pending = false;
    }
  }
</script>

<h1>Referrals</h1>
<p class="muted">
  Anti-abuse: self-referrals blocked, per-referrer rate limits, one referred wallet globally (demo schema).
</p>

<form class="card" onsubmit={submit}>
  <label for="code">Referral code</label>
  <input id="code" bind:value={code} autocomplete="off" />

  <label for="referred">Referred wallet (test)</label>
  <input id="referred" bind:value={referred} placeholder="Use a second address to test" />

  <button class="btn" type="submit" disabled={pending}>Validate</button>
</form>

{#if message}
  <p role="status">{message}</p>
{/if}

<style>
  label {
    display: block;
    margin: 0.5rem 0 0.25rem;
    font-weight: 600;
  }
  input {
    width: 100%;
    max-width: 420px;
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
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
</style>
