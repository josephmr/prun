import type { Cookies } from '@sveltejs/kit';
import { CookieStorage } from 'cookie-storage';

const cookieStorage = new CookieStorage({
  path: '/'
});

export interface FIOAuth {
  username: string;
  apiKey: string;
}

export const FIO_AUTH_COOKIE = 'FIO_AUTH';

/**
 * Gets FIO API key from either the cookies of a server load function or the
 * parent data from a universal load function via the root +layout.server.ts.
 */
export function getAuthInfo(
  getter: Cookies | { authInfo: FIOAuth | undefined }
): FIOAuth | undefined {
  if ('authInfo' in getter) {
    return getter.authInfo;
  }
  const cookie = getter.get(FIO_AUTH_COOKIE);
  if (cookie) {
    return JSON.parse(cookie) ?? undefined;
  }
  return undefined;
}

export function setAuthInfo(auth: FIOAuth): void {
  cookieStorage.setItem(FIO_AUTH_COOKIE, JSON.stringify(auth));
}
