import type { PageLoad } from './$types';
import { exchangeOrdersForCompany, exchangeFull, exchangeForTicker, type CXOB } from '$lib/api/fio';

export const load = (async ({ params, fetch }) => {
  const data = await exchangeOrdersForCompany(params.company, { fetch });
  let latestExchangeOrders;
  if (data.length > 5) {
    latestExchangeOrders = await exchangeFull({ fetch });
  } else {
    latestExchangeOrders = await Promise.all(
      data.map(async (order) => {
        const data = await exchangeForTicker(order.Ticker, { fetch });
        return data;
      })
    );
  }
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
