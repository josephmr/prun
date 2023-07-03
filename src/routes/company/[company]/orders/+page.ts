import type { PageLoad } from './$types';
import { exchangeOrdersForCompany, exchangeFull, type CXOB } from '$lib/api/fio';
import { getApiKey } from '$lib/stores/fio';

export const load = (async ({ params, fetch, parent, depends }) => {
  depends('fio:');

  const apiKey = getApiKey(await parent());
  const opts = { fetch, apiKey };

  const orders = await exchangeOrdersForCompany(params.company, opts);
  const latestExchangeOrders = await exchangeFull(opts);

  const latestExchangeOrdersByMat = latestExchangeOrders.reduce((acc, v) => {
    acc[`${v.MaterialTicker}.${v.ExchangeCode}`] = v;
    return acc;
  }, {} as { [ticker: string]: CXOB });

  return {
    company: params.company,
    orders: orders.map((order) => ({
      Ticker: order.Ticker,
      Orders: [
        ...order.Buys.map((buy) => ({ ...buy, Type: 'Buy' as 'Buy' | 'Sell' })),
        ...order.Sells.map((sell) => ({ ...sell, Type: 'Sell' as 'Buy' | 'Sell' }))
      ],
      Market: latestExchangeOrdersByMat[order.Ticker]
    }))
  };
}) satisfies PageLoad;
