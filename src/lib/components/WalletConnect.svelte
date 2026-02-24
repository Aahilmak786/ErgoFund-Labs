<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { connectedWallet } from '$lib/stores/wallet';
	import {
		getAvailableWallets,
		getWalletName,
		connectWallet,
		disconnectWallet,
		type WalletType
	} from '$lib/ergo/wallet';
	import { formatTokenAmount } from '$lib/ergo/tokens';

	let availableWallets = $state<WalletType[]>([]);
	let menuOpen = $state(false);
	let loading = $state(false);
	let error = $state<string | null>(null);

	onMount(() => {
		availableWallets = getAvailableWallets();
	});

	function handleConnect(type: WalletType) {
		loading = true;
		error = null;
		connectWallet(type)
			.then((wallet) => {
				if (wallet) {
					connectedWallet.set(wallet);
					menuOpen = false;
				} else {
					error = 'Connection failed';
				}
			})
			.catch((e) => {
				error = e instanceof Error ? e.message : 'Failed to connect';
			})
			.finally(() => {
				loading = false;
			});
	}

	function handleDisconnect() {
		const wallet = get(connectedWallet);
		if (wallet) {
			disconnectWallet(wallet.type);
			connectedWallet.set(null);
		}
		menuOpen = false;
	}

	function truncateAddress(addr: string) {
		return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
	}
</script>

<div class="wallet-connect">
	{#if $connectedWallet}
		<button
			class="wallet-btn connected"
			onclick={() => (menuOpen = !menuOpen)}
			aria-haspopup="true"
			aria-expanded={menuOpen}
		>
			<span class="balance">{formatTokenAmount($connectedWallet.balance, 'ERG')} ERG</span>
			<span class="address">{truncateAddress($connectedWallet.address)}</span>
		</button>
		{#if menuOpen}
			<div class="dropdown" role="menu">
				<button class="dropdown-item" onclick={handleDisconnect} role="menuitem">Disconnect</button>
			</div>
		{/if}
	{:else}
		<button
			class="wallet-btn"
			onclick={() => (menuOpen = !menuOpen)}
			aria-haspopup="true"
			aria-expanded={menuOpen}
		>
			Connect Wallet
		</button>
		{#if menuOpen}
			<div class="dropdown" role="menu">
				{#if error}
					<p class="error">{error}</p>
				{/if}
				{#if availableWallets.length === 0}
					<p class="hint">Install Nautilus or Yoroi wallet extension</p>
				{:else}
					{#each availableWallets as type (type)}
						<button
							class="dropdown-item"
							onclick={() => handleConnect(type)}
							disabled={loading}
							role="menuitem"
						>
							{getWalletName(type)}
						</button>
					{/each}
				{/if}
			</div>
		{/if}
	{/if}
</div>

<style>
	.wallet-connect {
		position: relative;
	}
	.wallet-btn {
		padding: 0.5rem 1rem;
		border-radius: var(--radius);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		font-size: 0.9rem;
	}
	.wallet-btn:hover {
		background: var(--color-border);
	}
	.wallet-btn.connected {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.wallet-btn.connected .balance {
		font-weight: 600;
		color: var(--color-accent);
	}
	.wallet-btn.connected .address {
		font-size: 0.75rem;
		color: var(--color-muted);
	}
	.dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		min-width: 180px;
		padding: 0.5rem;
	}
	.dropdown-item {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		text-align: left;
		border: none;
		background: transparent;
		color: var(--color-text);
		border-radius: 6px;
	}
	.dropdown-item:hover:not(:disabled) {
		background: var(--color-border);
	}
	.error {
		color: #f87171;
		font-size: 0.875rem;
		padding: 0.5rem 1rem;
		margin: 0;
	}
	.hint {
		color: var(--color-muted);
		font-size: 0.875rem;
		padding: 1rem;
		margin: 0;
	}
</style>
