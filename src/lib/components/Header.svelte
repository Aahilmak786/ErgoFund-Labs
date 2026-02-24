<script lang="ts">
	import { page } from '$app/stores';
	import WalletConnect from './WalletConnect.svelte';
</script>

<header class="header">
	<a href="/" class="logo">
		<span class="logo-icon">⟡</span>
		<span>Bene</span>
	</a>
	<nav class="nav" aria-label="Main navigation">
		<a href="/" class:active={$page.url.pathname === '/'}>Explore</a>
		<a href="/projects" class:active={$page.url.pathname === '/projects'}>Projects</a>
		<a href="/create" class:active={$page.url.pathname === '/create'}>Create</a>
		<a href="/analytics" class:active={$page.url.pathname === '/analytics'}>Analytics</a>
	</nav>
	<WalletConnect />
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		position: sticky;
		top: 0;
		z-index: 100;
	}
	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text);
	}
	.logo:hover {
		color: var(--color-accent);
	}
	.logo-icon {
		font-size: 1.75rem;
		color: var(--color-accent);
	}
	.nav {
		display: flex;
		gap: 2rem;
	}
	.nav a {
		color: var(--color-muted);
		font-weight: 500;
	}
	.nav a:hover,
	.nav a.active {
		color: var(--color-text);
	}
	@media (max-width: 768px) {
		.nav {
			display: none;
		}
	}
</style>
