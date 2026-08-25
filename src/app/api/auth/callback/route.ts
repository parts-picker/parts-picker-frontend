import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData } from "../../../../features/common/security/SessionData";
import * as client from "openid-client";
import {
  getSessionOptions,
  getOidcIssuerUrl,
  getOidcClientId,
  getOidcClientSecret,
  getCallbackUri,
} from "../../../../features/common/security/ServerSecurityConstants";
import {
  buildInvalidLoginErrorResponse,
  updateAuthSessionbyResponse,
} from "../../../../features/common/security/serverSessionUtil";

const discoveryOptions =
  process.env.NODE_ENV === "development"
    ? { execute: [client.allowInsecureRequests] }
    : undefined;

// /api/auth/callback/route.ts
export const GET = async (request: NextRequest) => {
  const url = request.nextUrl;
  const originalUrl = new URL(getCallbackUri());
  originalUrl.search = url.search;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json(
      { error: "missing_code_or_state_param" },
      { status: 400 }
    );
  }

  // load session
  const response = new NextResponse();
  const existingSession = await getIronSession<SessionData>(
    request,
    response,
    getSessionOptions()
  );

  const flowInfo = existingSession.flowInfo;
  if (
    !flowInfo ||
    !flowInfo.codeVerifier ||
    !flowInfo.nonce ||
    !flowInfo.state
  ) {
    return buildInvalidLoginErrorResponse();
  }

  const issuerConfiguration = await client.discovery(
    new URL(getOidcIssuerUrl()),
    getOidcClientId(),
    getOidcClientSecret(),
    undefined,
    discoveryOptions
  );

  // exchange code for tokens
  try {
    const authResponse = await client.authorizationCodeGrant(
      issuerConfiguration,
      originalUrl,
      {
        pkceCodeVerifier: flowInfo.codeVerifier,
        expectedNonce: flowInfo.nonce,
        expectedState: flowInfo.state,
      }
    );

    // update session with user data & redirect to original target
    const redirectTo = await updateAuthSessionbyResponse(
      existingSession,
      authResponse
    );
    return NextResponse.redirect(redirectTo, { headers: response.headers });
  } catch {
    // drop the exchange info on fail so its codeVerifier/state/nonce cannot be reused
    existingSession.flowInfo = undefined;
    await existingSession.save();
    return buildInvalidLoginErrorResponse(response.headers);
  }
};
