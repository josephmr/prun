import type { PageLoad } from './$types';
import { exchangeOrdersForCompany, exchangeFull, type CXOB } from '$lib/api/fio';
import { getApiKey } from '$lib/stores/fio';

export const load = (async ({ params, fetch, parent, depends }) => {
  const apiKey = getApiKey(await parent());
  depends('orders:');
  const data = await exchangeOrdersForCompany(params.company, { fetch, apiKey });
  const latestExchangeOrders = await exchangeFull({ fetch });
  const latestExchangeOrdersByMat = latestExchangeOrders.reduce((acc, v) => {
    acc[`${v.MaterialTicker}.${v.ExchangeCode}`] = v;
    return acc;
  }, {} as { [ticker: string]: CXOB });
  return {
    company: params.company,
    orders: data.map((order) => ({
      Ticker: order.Ticker,
      Orders: [
        ...order.Buys.map((buy) => ({ ...buy, Type: 'Buy' as 'Buy' | 'Sell' })),
        ...order.Sells.map((sell) => ({ ...sell, Type: 'Sell' as 'Buy' | 'Sell' }))
      ],
      Market: latestExchangeOrdersByMat[order.Ticker]
    }))
  };
}) satisfies PageLoad;
