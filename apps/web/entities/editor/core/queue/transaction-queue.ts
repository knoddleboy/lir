export class TransactionQueue<T> {
  private queue: T[] = [];
  private isProcessing: boolean = false;
  private debounceTimer: NodeJS.Timeout | null = null;
  private readonly debounceTime: number = 500; // ms
  private readonly maxBatchSize: number = 10;
  private readonly mutationFn: (batch: T[]) => Promise<unknown>;

  constructor(mutationFn: (batch: T[]) => Promise<unknown>) {
    this.processQueue = this.processQueue.bind(this);
    this.mutationFn = mutationFn;
  }

  enqueue(trx: T) {
    this.queue.push(trx);
    if (this.queue.length >= this.maxBatchSize && !this.isProcessing) {
      // Process immediately when max batch size is reached
      this.processQueue();
    } else if (!this.isProcessing) {
      this.debouncedProcessQueue();
    }
  }

  private debouncedProcessQueue() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.processQueue();
    }, this.debounceTime);
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      this.debounceTimer = null;
      return;
    }

    this.isProcessing = true;
    const batch = this.collectBatch();

    try {
      await this.sendBatch(batch);
    } catch (error) {
      console.error(error);
      // Re-queue failed items...
    } finally {
      this.removeProcessedItems(batch.length);
      this.isProcessing = false;

      // If there are more items in the queue, process them
      if (this.queue.length > 0) {
        this.processQueue();
      }
    }
  }

  private collectBatch(): T[] {
    return this.queue.slice(0, this.maxBatchSize);
  }

  private async sendBatch(batch: T[]): Promise<unknown> {
    return this.mutationFn(batch);
  }

  private removeProcessedItems(count: number) {
    this.queue.splice(0, count);
  }
}
