import { productionForUser } from '$lib/api/fio';
import { getAuthInfo } from '$lib/auth';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
  const authInfo = getAuthInfo(await parent());
  const opts = { fetch, authInfo };

  if (!(authInfo?.username && authInfo?.apiKey)) {
    throw error(400, {
      message: 'Must set username and FIO API key',
    });
  }

  const production = await productionForUser(authInfo.username, opts);
  return { production };
}) satisfies PageLoad;
