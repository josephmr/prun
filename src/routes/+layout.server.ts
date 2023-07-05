import { getAuthInfo } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, depends }) => {
  depends('auth:');
  const authInfo = getAuthInfo(cookies);
  return {
    authInfo
  };
}) satisfies LayoutServerLoad;
