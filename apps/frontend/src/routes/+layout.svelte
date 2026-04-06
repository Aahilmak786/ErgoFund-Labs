<script lang="ts">
  import './layout.css';
  import { onMount } from 'svelte';
  import { theme, toggleTheme } from '$lib/theme';
  import { wallet, connect, disconnect } from '$lib/stores/wallet';
  let { children } = $props();

  onMount(() => {
    return theme.subscribe((v) => {
      document.documentElement.dataset.theme = v;
      localStorage.setItem('bene-theme', v);
    });
  });
</script>

<svelte:head>
  <title>BenefactionPlatform-Ergo</title>
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
      <span class="addr" title={$wallet.address}>{$wallet.address.slice(0, 8)}…</span>
      <button type="button" class="btn" onclick={() => disconnect()}>Disconnect</button>
    {:else}
      <button type="button" class="btn" onclick={() => connect('nautilus')}>Nautilus</button>
      <button type="button" class="btn secondary" onclick={() => connect('ergo-wallet')}>Ergo Wallet</button>
    {/if}
  </div>
</header>

<main id="main">
  {@render children()}
</main>

<footer class="footer">
  <p>AOSSIE · BenefactionPlatform-Ergo · Fleet SDK · ErgoScript</p>
</footer>
