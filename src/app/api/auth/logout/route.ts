import { getIronSession } from "iron-session";
import { SessionData } from "../../../../features/common/security/SessionData";
import { NextRequest, NextResponse } from "next/server";
import * as client from "openid-client";
import {
  getOidcClientId,
  getOidcClientSecret,
  getOidcIssuerUrl,
  getPublicRootUrl,
  getSessionOptions,
} from "../../../../features/common/security/ServerSecurityConstants";

const discoveryOptions =
  process.env.NODE_ENV === "development"
    ? { execute: [client.allowInsecureRequests] }
    : undefined;

// /api/auth/logout
export const GET = async (request: NextRequest) => {
  const response = new NextResponse();
  const session = await getIronSession<SessionData>(
    request,
    response,
    getSessionOptions()
  );

  session.destroy();

  try {
    const issuerConfiguration = await client.discovery(
      new URL(getOidcIssuerUrl()),
      getOidcClientId(),
      getOidcClientSecret(),
      undefined,
      discoveryOptions
    );

    const endSessionUrl = client.buildEndSessionUrl(issuerConfiguration, {
      post_logout_redirect_uri: getPublicRootUrl(),
    });

    return NextResponse.redirect(endSessionUrl, { headers: response.headers });
  } catch {
    return NextResponse.redirect(getPublicRootUrl(), {
      headers: response.headers,
    });
  }
};
