export type TxJobStatus = 'queued' | 'signing' | 'broadcasted' | 'confirmed' | 'failed';

export interface TxJob<TPayload = unknown> {
  id: string;
  payload: TPayload;
  status: TxJobStatus;
  retries: number;
  lastError?: string;
}

/** Simple queue with retry cap for Fleet-driven flows. */
export class TransactionQueue<TPayload = unknown> {
  private jobs = new Map<string, TxJob<TPayload>>();
  private listeners: Array<(j: TxJob<TPayload>) => void> = [];

  subscribe(fn: (j: TxJob<TPayload>) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private emit(j: TxJob<TPayload>): void {
    for (const l of this.listeners) l(j);
  }

  enqueue(payload: TPayload): TxJob<TPayload> {
    const job: TxJob<TPayload> = {
      id: crypto.randomUUID(),
      payload,
      status: 'queued',
      retries: 0
    };
    this.jobs.set(job.id, job);
    this.emit(job);
    return job;
  }

  async run(
    id: string,
    signAndBroadcast: (payload: TPayload) => Promise<void>,
    maxRetries = 3
  ): Promise<TxJob<TPayload>> {
    const job = this.jobs.get(id);
    if (!job) throw new Error('Unknown job');

    try {
      job.status = 'signing';
      this.emit(job);
      await signAndBroadcast(job.payload);
      job.status = 'broadcasted';
      this.emit(job);
    } catch (e) {
      job.retries += 1;
      job.lastError = e instanceof Error ? e.message : String(e);
      job.status = job.retries >= maxRetries ? 'failed' : 'queued';
      this.emit(job);
    }
    return job;
  }
}
