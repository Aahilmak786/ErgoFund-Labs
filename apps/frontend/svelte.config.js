import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import adapterNetlify from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** SvelteKit stays the UI stack; only the deployment adapter switches (Docker/CI vs Vercel vs Netlify). */
function kitAdapter() {
  if (process.env.VERCEL) {
    return adapterVercel();
  }
  if (process.env.NETLIFY) {
    return adapterNetlify();
  }
  return adapterNode({ out: 'build' });
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: kitAdapter(),
    alias: {
      '@benefaction/sdk': path.resolve(__dirname, '../../packages/sdk/src')
    }
  }
};

export default config;
