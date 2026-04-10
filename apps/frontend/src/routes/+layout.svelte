<script lang="ts">
  import './layout.css';
  import { onMount } from 'svelte';
  import { theme, toggleTheme } from '$lib/theme';
  import { wallet, connect, disconnect, walletPanelOpen, walletError } from '$lib/stores/wallet';
  import WalletPanel from '$lib/components/WalletPanel.svelte';
  import PasteSafePalModal from '$lib/components/PasteSafePalModal.svelte';
  let { children } = $props();

  let pasteSafePalOpen = $state(false);

  onMount(() => {
    return theme.subscribe((v) => {
      document.documentElement.dataset.theme = v;
      localStorage.setItem('bene-theme', v);
    });
  });

  function togglePanel() {
    walletPanelOpen.update((v) => !v);
  }
</script>

<svelte:head>
  <title>BenefactionPlatform-Ergo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<a href="#main" class="skip">Skip to content</a>

<header class="topbar">
  <div class="brand">
    <a href="/">BenefactionPlatform-Ergo</a>
    <span class="tag">Ergo · Multi-token</span>
  </div>
  <nav aria-label="Primary">
    <a href="/campaigns">Campaigns</a>
    <a href="/analytics">Analytics</a>
    <a href="/referrals">Referrals</a>
  </nav>
  <div class="actions">
    <button type="button" class="ghost" onclick={() => toggleTheme()} aria-pressed={$theme === 'dark'}>
      {$theme === 'dark' ? 'Light' : 'Dark'} theme
    </button>
    {#if $wallet}
      <button
        type="button"
        class="addr-btn"
        onclick={togglePanel}
        title="Wallet details — {$wallet.address}"
        aria-expanded={$walletPanelOpen}
      >
        <span class="wallet-badge">{$wallet.displayLabel ?? $wallet.walletId}</span>
        <span class="addr-short">{$wallet.address.slice(0, 6)}…{$wallet.address.slice(-4)}</span>
      </button>
      <button type="button" class="btn" onclick={() => disconnect()}>Disconnect</button>
    {:else}
      <div class="wallet-btns">
        <button type="button" class="btn" onclick={() => connect('nautilus')}>Nautilus</button>
        <button type="button" class="btn secondary" onclick={() => connect('ergo-wallet')}
          >Ergo Wallet</button
        >
        <button
          type="button"
          class="btn safepal"
          title="In-app Browser with Ergo, or paste Receive address"
          onclick={() => connect('safepal')}>SafePal</button
        >
        <button
          type="button"
          class="btn ghost-outline"
          title="Wallet01-728 is a label — paste your Ergo Receive address from SafePal"
          onclick={() => (pasteSafePalOpen = true)}>Paste Ergo address</button
        >
      </div>
    {/if}
  </div>
</header>

{#if pasteSafePalOpen}
  <PasteSafePalModal onclose={() => (pasteSafePalOpen = false)} />
{/if}

{#if $walletError}
  <div class="banner error" role="alert">
    <p>{$walletError}</p>
    <button type="button" class="ghost" onclick={() => walletError.set(null)}>Dismiss</button>
  </div>
{/if}

{#if $wallet && $walletPanelOpen}
  <WalletPanel session={$wallet} onclose={() => walletPanelOpen.set(false)} />
{/if}

<main id="main">
  {@render children()}
</main>

<footer class="footer">
  <p>
    AOSSIE · BenefactionPlatform-Ergo · Fleet SDK · ErgoScript ·
    <a href="https://github.com/Aahilmak786/ErgoFund-Labs/wiki">Wiki</a>
  </p>
</footer>
