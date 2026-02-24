/**
 * Svelte store for wallet connection state
 */
import { writable, derived } from 'svelte/store';
import type { ConnectedWallet, WalletType } from '$lib/ergo/wallet';

export const connectedWallet = writable<ConnectedWallet | null>(null);

export const isConnected = derived(connectedWallet, ($w) => $w?.isConnected ?? false);
export const walletAddress = derived(connectedWallet, ($w) => $w?.address ?? null);
export const walletBalance = derived(connectedWallet, ($w) => $w?.balance ?? 0n);
