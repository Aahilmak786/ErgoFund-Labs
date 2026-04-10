<script lang="ts">
  import { tryPastedSafePalErgo } from '$lib/stores/wallet';

  let { onclose }: { onclose: () => void } = $props();

  let value = $state('');
  let localError = $state<string | null>(null);

  function submit(e: Event) {
    e.preventDefault();
    localError = null;
    const err = tryPastedSafePalErgo(value);
    if (err) {
      localError = err;
      return;
    }
    value = '';
    onclose();
  }
</script>

<button type="button" class="backdrop" aria-label="Close" onclick={onclose}></button>
<div class="modal" role="dialog" aria-labelledby="paste-title" aria-modal="true">
  <h2 id="paste-title">Connect SafePal (paste Ergo address)</h2>
  <p class="muted help">
    Names like <strong>Wallet01-728</strong> are only labels inside SafePal. To connect this site to your Ergo
    balance for demos, copy your real chain address:
  </p>
  <ol class="steps">
    <li>Open the <strong>SafePal</strong> app.</li>
    <li>Select your <strong>Ergo</strong> wallet.</li>
    <li>Tap <strong>Receive</strong>.</li>
    <li>Copy the long address (often starts with <strong>9</strong> on mainnet).</li>
    <li>Paste it below.</li>
  </ol>
  {#if localError}
    <p class="local-err" role="alert">{localError}</p>
  {/if}
  <form onsubmit={submit}>
    <label for="ergo-paste">Ergo Receive address</label>
    <textarea
      id="ergo-paste"
      bind:value={value}
      rows="3"
      placeholder="Starts with 9… (full address from SafePal Receive)"
      autocomplete="off"
    ></textarea>
    <div class="row">
      <button type="button" class="ghost" onclick={onclose}>Cancel</button>
      <button type="submit" class="btn">Connect</button>
    </div>
  </form>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    border: none;
    padding: 0;
    cursor: pointer;
    background: rgba(4, 12, 24, 0.6);
    z-index: 60;
    backdrop-filter: blur(3px);
  }
  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(92vw, 440px);
    max-height: min(88vh, 560px);
    overflow-y: auto;
    z-index: 70;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.25rem 1.35rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
    pointer-events: auto;
  }
  .modal h2 {
    margin: 0 0 0.5rem;
    font-size: 1.15rem;
  }
  .local-err {
    font-size: 0.85rem;
    line-height: 1.45;
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
    background: rgba(200, 80, 80, 0.15);
    border: 1px solid rgba(220, 100, 100, 0.4);
    margin: 0 0 0.75rem;
  }
  .help {
    font-size: 0.9rem;
    line-height: 1.45;
    margin: 0 0 0.5rem;
  }
  .steps {
    margin: 0 0 1rem;
    padding-left: 1.2rem;
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.5;
  }
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.35rem;
    font-size: 0.9rem;
  }
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.55rem 0.65rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    font-family: ui-monospace, monospace;
    font-size: 0.82rem;
    resize: vertical;
    min-height: 4rem;
  }
  .row {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 0.85rem;
  }
  .btn {
    border: 0;
    border-radius: 10px;
    padding: 0.5rem 0.9rem;
    font-weight: 700;
    cursor: pointer;
    background: var(--brand);
    color: #041018;
  }
  .ghost {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.5rem 0.75rem;
    background: transparent;
    color: var(--text);
    cursor: pointer;
  }
</style>
