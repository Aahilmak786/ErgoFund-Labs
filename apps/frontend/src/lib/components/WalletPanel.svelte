<script lang="ts">
  import { WALLET_LINKS } from '@benefaction/sdk';
  import type { WalletSession } from '@benefaction/sdk';

  let { session, onclose }: { session: WalletSession; onclose: () => void } = $props();

  let copied = $state(false);

  const title = $derived(session.displayLabel ?? labelFor(session.walletId));
  const explorerUrl = $derived(WALLET_LINKS.explorerAddressMainnet(session.address));

  function labelFor(id: string): string {
    if (id === 'nautilus') return 'Nautilus';
    if (id === 'safepal') return 'SafePal';
    return 'Ergo Wallet';
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(session.address);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      copied = false;
    }
  }
</script>

<button type="button" class="backdrop" aria-label="Close wallet panel" onclick={onclose}></button>
<aside class="panel" aria-label="Wallet details">
  <div class="panel-head">
    <h2>{title}</h2>
    <button type="button" class="close ghost" onclick={onclose} aria-label="Close wallet panel"
      >×</button
    >
  </div>
  {#if session.readOnly}
    <p class="readonly-note" role="status">
      <strong>Read-only.</strong> This address was pasted from SafePal Receive. For signing transactions in the
      browser, use <strong>SafePal → Browser</strong> or install <strong>Nautilus</strong>.
    </p>
  {/if}
  <p class="muted small">Connected Ergo address</p>
  <div class="addr-box">
    <code class="full-addr">{session.address}</code>
    <button type="button" class="btn small" onclick={copyAddress}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  </div>

  <div class="actions-row">
    <a class="btn secondary small" href={explorerUrl} target="_blank" rel="noopener noreferrer">
      View on explorer
    </a>
  </div>

  <section class="links">
    <h3>Ergo &amp; wallet help</h3>
    <ul>
      <li>
        <a href={WALLET_LINKS.ergoWallets} target="_blank" rel="noopener noreferrer"
          >Ergo official wallets overview</a
        >
      </li>
      <li>
        <a href={WALLET_LINKS.safepalHome} target="_blank" rel="noopener noreferrer">SafePal</a>
        —
        <a href={WALLET_LINKS.safepalDownload} target="_blank" rel="noopener noreferrer"
          >Download apps</a
        >
        <span class="muted small"> (open the dApp in SafePal’s browser for Ergo)</span>
      </li>
    </ul>
  </section>
</aside>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    border: none;
    padding: 0;
    cursor: pointer;
    background: rgba(4, 12, 24, 0.55);
    z-index: 40;
    backdrop-filter: blur(2px);
  }
  .panel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    max-width: min(420px, 100vw);
    width: 100%;
    background: var(--surface);
    border-left: 1px solid var(--border);
    z-index: 50;
    padding: 1rem 1.25rem 2rem;
    box-sizing: border-box;
    overflow-y: auto;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.25);
  }
  .panel-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  .readonly-note {
    font-size: 0.82rem;
    line-height: 1.45;
    padding: 0.55rem 0.65rem;
    border-radius: 10px;
    background: var(--bg);
    border: 1px solid var(--border);
    margin: 0 0 0.75rem;
  }
  .panel-head h2 {
    margin: 0;
    font-size: 1.25rem;
  }
  .close {
    font-size: 1.5rem;
    line-height: 1;
    padding: 0.15rem 0.45rem;
  }
  .small {
    font-size: 0.85rem;
  }
  .addr-box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.5rem 0 1rem;
  }
  .full-addr {
    display: block;
    word-break: break-all;
    font-size: 0.8rem;
    padding: 0.65rem 0.75rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
  }
  .btn.small {
    align-self: flex-start;
    padding: 0.35rem 0.65rem;
    font-size: 0.85rem;
  }
  .actions-row {
    margin-bottom: 1.25rem;
  }
  .links h3 {
    font-size: 0.95rem;
    margin-bottom: 0.35rem;
  }
  .links ul {
    margin: 0;
    padding-left: 1.1rem;
    color: var(--muted);
    font-size: 0.9rem;
  }
  .links a {
    color: var(--brand);
    font-weight: 600;
  }
  @media (max-width: 520px) {
    .panel {
      max-width: 100%;
    }
  }
</style>
