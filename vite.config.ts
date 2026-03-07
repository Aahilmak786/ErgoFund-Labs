/** Vite config for Bene Fundraising (SvelteKit + Fleet SDK) */
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@fleet-sdk/core']
	},
	optimizeDeps: {
		include: ['@fleet-sdk/core']
	}
});
