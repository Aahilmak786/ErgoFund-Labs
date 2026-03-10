<script lang="ts">
	import { SUPPORTED_TOKENS } from '$lib/ergo/tokens';
	import { createCampaignTx } from '$lib/ergo/campaign';
	import { get } from 'svelte/store';
	import { connectedWallet } from '$lib/stores/wallet';
	import { getCreationHeight } from '$lib/ergo/wallet';

	let title = $state('');
	let description = $state('');
	let goal = $state('');
	let tokenId = $state('ERG');
	let deadline = $state('');

	let submitting = $state(false);
	let error = $state<string | null>(null);
	let txId = $state<string | null>(null);

	function deadlineDateToHeight(currentHeight: number, yyyyMmDd: string): number {
		const target = new Date(`${yyyyMmDd}T00:00:00Z`).getTime();
		const now = Date.now();
		const msPerDay = 24 * 60 * 60 * 1000;
		const days = Math.max(0, Math.ceil((target - now) / msPerDay));
		// Ergo ~2 minutes per block => ~720 blocks/day (approx)
		return currentHeight + days * 720;
	}

	function parseGoalToNanoErg(goalText: string): bigint {
		const val = Number(goalText);
		if (!Number.isFinite(val) || val <= 0) throw new Error('Goal must be a positive number');
		// Goal is entered in ERG for UX; contract expects nanoERG.
		return BigInt(Math.round(val * 1e9));
	}

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitting = true;
		error = null;
		txId = null;

		try {
			const wallet = get(connectedWallet);
			if (!wallet) throw new Error('Connect a wallet first');
			if (tokenId !== 'ERG') throw new Error('Create campaign currently supports ERG only');

			const goalNanoErg = parseGoalToNanoErg(goal);
			const currentHeight = await getCreationHeight(wallet.type);
			const deadlineHeight = deadlineDateToHeight(currentHeight, deadline);

			const res = await createCampaignTx({
				walletType: wallet.type,
				goalNanoErg,
				deadlineHeight,
				recipientAddress: wallet.address
			});

			txId = res.txId;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to create campaign';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Create Project | Bene Fundraising</title>
</svelte:head>

<h1>Create a Fundraising Project</h1>

<form class="create-form" onsubmit={onSubmit}>
	<label for="title">Project Title</label>
	<input id="title" type="text" bind:value={title} required placeholder="e.g. Community Education Fund" />

	<label for="description">Description</label>
	<textarea id="description" bind:value={description} rows="4" required placeholder="Describe your project..."></textarea>

	<label for="goal">Funding Goal</label>
	<input id="goal" type="number" bind:value={goal} required min="0.000000001" step="0.000000001" placeholder="10" />

	<label for="token">Token</label>
	<select id="token" bind:value={tokenId}>
		{#each SUPPORTED_TOKENS as token}
			<option value={token.id}>{token.symbol} - {token.name}</option>
		{/each}
	</select>

	<label for="deadline">Deadline</label>
	<input id="deadline" type="date" bind:value={deadline} required />

	<button type="submit" class="submit-btn" disabled={submitting}>
		{submitting ? 'Creating…' : 'Create Project'}
	</button>

	{#if error}
		<p class="error">{error}</p>
	{/if}
	{#if txId}
		<p class="success">
			Submitted. Tx ID:
			<code>{txId}</code>
		</p>
	{/if}
</form>

<style>
	.create-form {
		max-width: 500px;
		margin-top: 2rem;
	}
	label {
		display: block;
		margin: 1rem 0 0.5rem;
		font-weight: 500;
	}
	input,
	textarea,
	select {
		width: 100%;
		padding: 0.75rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		color: var(--color-text);
		font-size: 1rem;
	}
	.submit-btn {
		margin-top: 1.5rem;
		padding: 0.75rem 2rem;
		background: var(--color-accent);
		color: #fff;
		border: none;
		border-radius: var(--radius);
		font-weight: 600;
	}
	.submit-btn:hover {
		background: var(--color-accent-hover);
	}
	.error {
		margin-top: 1rem;
		color: #f87171;
	}
	.success {
		margin-top: 1rem;
		color: #34d399;
		word-break: break-all;
	}
	code {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		font-size: 0.9em;
	}
</style>
