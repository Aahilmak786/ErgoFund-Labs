<script lang="ts">
  import './layout.css';
  import { onMount } from 'svelte';
  import { theme, toggleTheme } from '$lib/theme';
  import {
    wallet,
    connect,
    connectDemoWallet,
    disconnect,
    walletPanelOpen,
    walletError
  } from '$lib/stores/wallet';
  import WalletPanel from '$lib/components/WalletPanel.svelte';
  let { children } = $props();
  const demoAddress = '9fRAWhdxEsTcdb8PhGNrZfwqa65zfkuYHAMmkQLcic1gdLSV';
  let demoWalletOpen = $state(false);

  onMount(() => {
    return theme.subscribe((v) => {
      document.documentElement.dataset.theme = v;
      localStorage.setItem('bene-theme', v);
    });
  });

  function togglePanel() {
    walletPanelOpen.update((v) => !v);
  }

  function openDemoWalletPanel() {
    walletError.set(null);
    demoWalletOpen = true;
  }

  function connectDemo() {
    connectDemoWallet();
    demoWalletOpen = false;
  }

  function disconnectDemo() {
    disconnect();
    demoWalletOpen = false;
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
        <button type="button" class="btn secondary" onclick={openDemoWalletPanel}
          >Ergo Wallet</button
        >
      </div>
    {/if}
  </div>
</header>

{#if demoWalletOpen}
  <button
    type="button"
    class="demo-backdrop"
    aria-label="Close demo wallet panel"
    onclick={() => (demoWalletOpen = false)}
  ></button>
  <div class="demo-wallet-panel" role="dialog" aria-modal="true" aria-labelledby="demo-wallet-title">
    <div class="demo-wallet-head">
      <h2 id="demo-wallet-title">Demo Wallet</h2>
      <span class="demo-mode-badge">Demo Mode</span>
    </div>
    <p class="muted">Mock Ergo wallet connection for classroom demonstrations.</p>

    <p class="demo-label">Address</p>
    <code class="demo-address">{demoAddress}</code>

    <p class="demo-label">Balance</p>
    <p class="demo-balance">1,250.75 ERG</p>

    <p class="demo-label">Token balances</p>
    <ul class="demo-token-list">
      <li>SigUSD: 500</li>
      <li>APT: 1000</li>
      <li>PFT: 250</li>
    </ul>

    <div class="demo-actions">
      <button type="button" class="btn" onclick={connectDemo}>Connect Demo Wallet</button>
      <button type="button" class="btn secondary" onclick={disconnectDemo}>Disconnect</button>
      <button type="button" class="ghost" onclick={() => (demoWalletOpen = false)}>Close</button>
    </div>
  </div>
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
