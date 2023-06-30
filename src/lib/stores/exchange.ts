import type { CXOB } from '$lib/api/fio';
import client from '$lib/api/fio';
import { readable } from 'svelte/store';

function jitter(ms: number) {
  const max = ms + 0.25 * ms;
  const min = ms - 0.25 * ms;
  return Math.random() * (max - min) + min;
}

class ExchangeStore {
  data: Record<string, CXOB> = {};
  inFlight: Set<string> = new Set();
  setter?: (value: ExchangeStore) => void;

  get(ticker: string): CXOB | undefined {
    this.queue(ticker);
    return this.data[ticker];
  }

  private queue(ticker: string) {
    if (this.inFlight.has(ticker)) {
      return;
    }
    this.inFlight.add(ticker);
    setTimeout(async () => {
      const resp = await client.exchange.getExchangeExchangeTicker(ticker);
      this.inFlight.delete(ticker);
      this.setTicker(ticker, resp.data);
    }, jitter(5 * 60 * 1000));
  }

  private setTicker(ticker: string, v: CXOB) {
    this.data[ticker] = v;
    this.setter?.(this);
  }

  async init(setter: (value: ExchangeStore) => void) {
    this.setter = setter;
    const response = await client.exchange.getExchangeFull();
    this.data = response.data.reduce((acc, v) => {
      acc[v.MaterialTicker + '.' + v.ExchangeCode] = v;
      return acc;
    }, {} as Record<string, CXOB>);
    this.setter(this);
  }
}
const st = new ExchangeStore();
export const exchange = readable<ExchangeStore>(st, (set) => {
  st.init(set);
});
