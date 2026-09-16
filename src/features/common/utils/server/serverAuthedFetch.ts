import "server-only";

import { BACKEND_TIMEOUT_MS } from "@/features/common/security/ServerSecurityConstants";
import ResponseError from "@/features/common/models/ResponseError";

export interface ServerFetchCacheOptions {
  // seconds a response is served from the next data cache before it is fetched again
  revalidateSeconds: number;
  // tags to invalidate the response early via revalidateTag
  tags?: string[];
}

/**
 * Fetches a backend resource from server code with the given access token.
 * Responses are cached across requests only if cache options are given.
 * The cache key includes the authorization header, so entries are per token.
 */
export const serverAuthedFetch = async <T>(
  url: string,
  accessToken: string,
  cacheOptions?: ServerFetchCacheOptions
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json, application/hal+json",
    },
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    ...(cacheOptions
      ? {
          cache: "force-cache",
          next: {
            revalidate: cacheOptions.revalidateSeconds,
            tags: cacheOptions.tags,
          },
        }
      : { cache: "no-store" }),
  });

  if (!response.ok) {
    throw new ResponseError("Backend request failed.", response.status);
  }

  return response.json() as Promise<T>;
};
