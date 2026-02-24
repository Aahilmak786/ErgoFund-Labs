<script lang="ts">
	import { SUPPORTED_TOKENS } from '$lib/ergo/tokens';

	let title = $state('');
	let description = $state('');
	let goal = $state('');
	let tokenId = $state('ERG');
	let deadline = $state('');
</script>

<svelte:head>
	<title>Create Project | Bene Fundraising</title>
</svelte:head>

<h1>Create a Fundraising Project</h1>

<form class="create-form">
	<label for="title">Project Title</label>
	<input id="title" type="text" bind:value={title} required placeholder="e.g. Community Education Fund" />

	<label for="description">Description</label>
	<textarea id="description" bind:value={description} rows="4" required placeholder="Describe your project..."></textarea>

	<label for="goal">Funding Goal</label>
	<input id="goal" type="number" bind:value={goal} required min="1" placeholder="500000" />

	<label for="token">Token</label>
	<select id="token" bind:value={tokenId}>
		{#each SUPPORTED_TOKENS as token}
			<option value={token.id}>{token.symbol} - {token.name}</option>
		{/each}
	</select>

	<label for="deadline">Deadline</label>
	<input id="deadline" type="date" bind:value={deadline} required />

	<button type="submit" class="submit-btn">Create Project</button>
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
</style>
