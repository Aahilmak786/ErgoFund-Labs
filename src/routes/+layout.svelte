<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<div class="app">
	<Header />
	<main>
		{@render children()}
	</main>
	<footer class="footer">
		<p>Bene Fundraising Platform · Ergo Blockchain · AOSSIE Technologies</p>
	</footer>
</div>
