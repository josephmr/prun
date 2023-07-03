import type { Cookies } from '@sveltejs/kit';
import { persisted } from '@square/svelte-store';

interface FIOAuth {
  username: string;
  apiKey: string;
}

export const FIO_AUTH_COOKIE = 'FIO_AUTH';

/**
 * Gets FIO API key from either the cookies of a server load function or the parent data from a universal load function via the root +layout.server.ts
 */
export function getApiKey(getter: Cookies | { apiKey: string | undefined }): string | undefined {
  if ('apiKey' in getter) {
    return getter.apiKey;
  }
  const cookie = getter.get(FIO_AUTH_COOKIE);
  if (cookie) {
    return JSON.parse(cookie).apiKey;
  }
  return undefined;
}

export const auth = persisted<FIOAuth | null>(null, FIO_AUTH_COOKIE, { storageType: 'COOKIE' });
