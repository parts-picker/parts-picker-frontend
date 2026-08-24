import "server-only";

import { IronSession } from "iron-session";
import { authorizationCodeGrant } from "openid-client";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import {
  InteralResponseErrors,
  LOGIN_REQUIRED_ERROR_CODE,
} from "./SharedSecurityConstants";
import { getPublicRootUrl } from "./ServerSecurityConstants";
import { SessionData } from "./SessionData";

export const expiresInToISODateString = (expiresIn: number | undefined) =>
  expiresIn ? new Date(Date.now() + expiresIn * 1000).toISOString() : undefined;

/**
 * Returns redirectTo only if it targets the application itself (same origin, inside the
 * base path, no embedded credentials); otherwise falls back to PUBLIC_ROOT_URL.
 */
export const resolveSafeRedirect = (
  redirectTo: string | null | undefined
): string => {
  if (!redirectTo) {
    return getPublicRootUrl();
  }
  try {
    const root = new URL(getPublicRootUrl());
    const resolved = new URL(redirectTo, root);
    const base = root.pathname.endsWith("/")
      ? root.pathname
      : `${root.pathname}/`;

    if (
      resolved.origin === root.origin &&
      !resolved.username &&
      !resolved.password &&
      `${resolved.pathname}/`.startsWith(base)
    ) {
      return resolved.href;
    }
  } catch {
    // fall through to default
  }
  return getPublicRootUrl();
};

export const isRefreshTokenExpired = (
  existingSession: IronSession<SessionData>
) => {
  return (
    existingSession.user?.refreshExpiresAfter !== undefined &&
    new Date(existingSession.user.refreshExpiresAfter) < new Date()
  );
};

export const shouldTryRefresh = (
  existingSession: IronSession<SessionData>
): existingSession is IronSession<SessionData> & {
  user: { refreshToken: string };
} => {
  return (
    Boolean(existingSession.user?.refreshToken) &&
    !isRefreshTokenExpired(existingSession)
  );
};

export const isAccessTokenExpired = (
  existingSession: IronSession<SessionData>
) => {
  return (
    !existingSession.user ||
    !existingSession.user.accessToken ||
    !existingSession.user.accessExpiresAfter ||
    new Date(existingSession.user.accessExpiresAfter) < new Date()
  );
};

/**
 * Update the existing auth session with updated data.
 * Clears any exchange/flow related info stored in the session.
 * Only meant for use on server side.
 * @param existingSession the current session which contains SessionData
 * @param updateResponse the response of the token issuer
 * @returns the redirect path stored in the session as URL
 */
export const updateAuthSessionbyResponse = async (
  existingSession: IronSession<SessionData>,
  updateResponse: TokenEndpointResponse
): Promise<URL> => {
  // clear exchange info
  const redirectTo = resolveSafeRedirect(existingSession.flowInfo?.redirectTo);
  existingSession.flowInfo = undefined;

  // set user
  const claims = updateResponse.claims();
  const refreshExpiresIn =
    typeof updateResponse.refresh_expires_in === "number"
      ? updateResponse.refresh_expires_in
      : undefined;
  existingSession.user = {
    id: claims?.sub,
    username:
      typeof claims?.preferred_username === "string"
        ? claims?.preferred_username
        : undefined,
    email: typeof claims?.email === "string" ? claims?.email : undefined,
    accessToken: updateResponse.access_token,
    accessExpiresAfter: expiresInToISODateString(updateResponse.expiresIn()),
    refreshToken: updateResponse.refresh_token,
    refreshExpiresAfter: expiresInToISODateString(refreshExpiresIn),
  };

  await existingSession.save();

  return new URL(redirectTo);
};

export type TokenEndpointResponse = Awaited<
  ReturnType<typeof authorizationCodeGrant>
>;

export const buildLoginRequiredResponse = () =>
  NextResponse.json(
    { errorCode: LOGIN_REQUIRED_ERROR_CODE },
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );

// default error response should not give any useable info for attackers
export const buildInvalidLoginErrorResponse = (
  headers?: HeadersInit
): NextResponse<InteralResponseErrors> =>
  NextResponse.json({ errorCode: "invalid_login" }, { status: 401, headers });
