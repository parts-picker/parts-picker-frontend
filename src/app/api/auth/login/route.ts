import { NextResponse, type NextRequest } from "next/server";
import {
  OIDC_CODE_CHALLENGE_METHOD,
  OIDC_SCOPE,
  getCallbackUri,
  getOidcClientId,
  getOidcClientSecret,
  getOidcIssuerUrl,
  getSessionOptions,
} from "../../../../features/common/security/ServerSecurityConstants";
import { getIronSession } from "iron-session";
import { SessionData } from "../../../../features/common/security/SessionData";
import * as client from "openid-client";
import {
  isAccessTokenExpired,
  resolveSafeRedirect,
  shouldTryRefresh,
  updateAuthSessionbyResponse,
} from "../../../../features/common/security/serverSessionUtil";
import { REDIRECT_TO_PARAM_NAME } from "../../../../features/common/security/SharedSecurityConstants";

const discoveryOptions =
  process.env.NODE_ENV === "development"
    ? { execute: [client.allowInsecureRequests] }
    : undefined;

// /api/auth/login
export const GET = async (request: NextRequest) => {
  const response = new NextResponse();
  const existingSession = await getIronSession<SessionData>(
    request,
    response,
    getSessionOptions()
  );

  const userTargetPath = resolveSafeRedirect(
    request.nextUrl.searchParams.get(REDIRECT_TO_PARAM_NAME)
  );

  if (!isAccessTokenExpired(existingSession)) {
    return NextResponse.redirect(userTargetPath, {
      headers: response.headers,
    });
  }

  const issuerConfiguration = await client.discovery(
    new URL(getOidcIssuerUrl()),
    getOidcClientId(),
    getOidcClientSecret(),
    undefined,
    discoveryOptions
  );

  if (shouldTryRefresh(existingSession)) {
    try {
      const refreshResponse = await client.refreshTokenGrant(
        issuerConfiguration,
        existingSession.user.refreshToken
      );

      await updateAuthSessionbyResponse(existingSession, refreshResponse);

      return NextResponse.redirect(userTargetPath, {
        headers: response.headers,
      });
    } catch {
      // do nothing and continue to full login
    }
  }

  // full login
  const codeVerifier = client.randomPKCECodeVerifier();
  const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);
  const nonce = client.randomNonce();
  const state = client.randomState();

  const authParameters: Record<string, string> = {
    redirect_uri: getCallbackUri(),
    scope: OIDC_SCOPE,
    code_challenge: codeChallenge,
    code_challenge_method: OIDC_CODE_CHALLENGE_METHOD,
    state,
    nonce,
  };

  // save relevant params in session
  const targetAuthUrl = client.buildAuthorizationUrl(
    issuerConfiguration,
    authParameters
  );

  existingSession.flowInfo = {
    codeVerifier: codeVerifier,
    state: state,
    nonce: nonce,
    redirectTo: userTargetPath,
  };
  await existingSession.save();

  return NextResponse.redirect(targetAuthUrl, { headers: response.headers });
};
