import { getApiKey } from '$lib/stores/fio';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  const apiKey = getApiKey(cookies);
  return {
    apiKey
  };
}) satisfies LayoutServerLoad;
