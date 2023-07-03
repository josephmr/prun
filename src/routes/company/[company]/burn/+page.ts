import { productionForUser } from '$lib/api/fio';
import { getApiKey } from '$lib/stores/fio';
import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
  const apiKey = getApiKey(await parent());
  const opts = { fetch, apiKey };

  const production = await productionForUser('fortruce', opts); // TODO get username from cookie
  return { production };
}) satisfies PageLoad;
