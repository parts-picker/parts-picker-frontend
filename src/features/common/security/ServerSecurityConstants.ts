import "server-only";

import { requireEnv } from "../utils/ServerEnvUtils";

// memoize a factory so env is read/derived on first use, not at module load
const once = <T>(factory: () => T): (() => T) => {
  let cache: { value: T } | undefined;
  return () => (cache ??= { value: factory() }).value;
};

export const CALLBACK_PATH = "/api/auth/callback";
export const LOGIN_PATH = "/api/auth/login";
export const AUTH_PROXY_PATH = "/api/auth/proxy";
export const LOGOUT_PATH = "/api/auth/logout";

export const OIDC_CODE_CHALLENGE_METHOD = "S256";
export const OIDC_SCOPE = "openid email";

export const SEC_FETCH_SITE_HEADER = "sec-fetch-site";
export const SEC_FETCH_SITE_SAME_ORIGIN = "same-origin";

// request headers the proxy forwards to the backend; everything else is dropped
export const PROXY_FORWARDED_REQUEST_HEADERS = [
  "content-type",
  "accept",
  "accept-language",
  "if-match",
  "if-none-match",
];

// backend response headers relayed to the browser; everything else is dropped
export const PROXY_FORWARDED_RESPONSE_HEADERS = [
  "content-type",
  "content-language",
  "etag",
  "last-modified",
  "location",
];

// max time to wait for the backend before the proxy returns 504
export const BACKEND_TIMEOUT_MS = 30000;

export const getPublicBaseUrl = once(() => requireEnv("PUBLIC_BASE_URL"));
export const getPublicBasePath = once(() => requireEnv("PUBLIC_BASE_PATH"));

export const getPublicRootUrl = once(() => {
  const rootUrl = `${getPublicBaseUrl()}${getPublicBasePath()}`;
  if (!URL.canParse(rootUrl)) {
    throw new Error(`PUBLIC_ROOT_URL is not a valid URL: ${rootUrl}`);
  }
  return rootUrl;
});

export const getCallbackUri = once(
  () => `${getPublicRootUrl()}${CALLBACK_PATH}`
);
export const getLoginUri = once(() => `${getPublicRootUrl()}${LOGIN_PATH}`);
export const getAuthProxyUri = once(
  () => `${getPublicRootUrl()}${AUTH_PROXY_PATH}`
);
export const getLogoutUri = once(() => `${getPublicRootUrl()}${LOGOUT_PATH}`);

export const getEntryLinksUrl = once(() => requireEnv("ENTRY_LINKS_URL"));
export const getBackendOrigin = once(() => new URL(getEntryLinksUrl()).origin);

export const getOidcClientId = once(() => requireEnv("OIDC_CLIENT_ID"));
export const getOidcClientSecret = once(() => requireEnv("OIDC_CLIENT_SECRET"));
export const getOidcIssuerUrl = once(() => requireEnv("OIDC_ISSUER_URL"));

export const getSessionOptions = once(() => ({
  cookieName: requireEnv("SESSION_COOKIE_NAME"),
  password: requireEnv("SESSION_PASSWORD"),
  cookieOptions: {
    secure:
      process.env.NODE_ENV === "production" ||
      getPublicBaseUrl().startsWith("https:"),
  },
}));

// force all required env to be read/validated (called once at server startup)
export const validateServerSecurityEnv = () => {
  getPublicRootUrl();
  getBackendOrigin();
  getOidcClientId();
  getOidcClientSecret();
  getOidcIssuerUrl();
  getSessionOptions();
};
