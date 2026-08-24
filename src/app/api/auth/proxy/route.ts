import { getIronSession } from "iron-session";
import { SessionData } from "../../../../features/common/security/SessionData";
import { NextRequest, NextResponse } from "next/server";
import {
  BACKEND_TIMEOUT_MS,
  PROXY_FORWARDED_REQUEST_HEADERS,
  PROXY_FORWARDED_RESPONSE_HEADERS,
  SEC_FETCH_SITE_HEADER,
  SEC_FETCH_SITE_SAME_ORIGIN,
  getBackendOrigin,
  getOidcClientId,
  getOidcClientSecret,
  getOidcIssuerUrl,
  getSessionOptions,
} from "../../../../features/common/security/ServerSecurityConstants";
import {
  buildLoginRequiredResponse,
  isAccessTokenExpired,
  shouldTryRefresh,
  updateAuthSessionbyResponse,
} from "../../../../features/common/security/serverSessionUtil";
import * as client from "openid-client";
import { TARGET_URL_PARAM_NAME } from "../../../../features/common/security/SharedSecurityConstants";

const discoveryOptions =
  process.env.NODE_ENV === "development"
    ? { execute: [client.allowInsecureRequests] }
    : undefined;

// /api/auth/proxy
const proxyHandler = async (request: NextRequest) => {
  // Reject non-same-origin requests so a same-site subdomain cannot use the session cookie.
  if (
    request.headers.get(SEC_FETCH_SITE_HEADER) !== SEC_FETCH_SITE_SAME_ORIGIN
  ) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const targetUrlParam = request.nextUrl.searchParams.get(
    TARGET_URL_PARAM_NAME!
  );
  if (!targetUrlParam) {
    return NextResponse.json(
      { error: "missing_target_url_param" },
      { status: 400 }
    );
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(targetUrlParam);
  } catch {
    return NextResponse.json(
      { error: "invalid_target_url_param" },
      { status: 400 }
    );
  }

  if (targetUrl.origin !== getBackendOrigin()) {
    return NextResponse.json(
      { error: "invalid_target_url_param" },
      { status: 400 }
    );
  }

  const cookieResponse = new NextResponse();
  const existingSession = await getIronSession<SessionData>(
    request,
    cookieResponse,
    getSessionOptions()
  );

  if (isAccessTokenExpired(existingSession)) {
    // try refresh if possible, else return 401
    if (shouldTryRefresh(existingSession)) {
      try {
        const issuerConfiguration = await client.discovery(
          new URL(getOidcIssuerUrl()),
          getOidcClientId(),
          getOidcClientSecret(),
          undefined,
          discoveryOptions
        );
        const refreshResponse = await client.refreshTokenGrant(
          issuerConfiguration,
          existingSession.user.refreshToken
        );

        await updateAuthSessionbyResponse(existingSession, refreshResponse);
      } catch (_) {
        return buildLoginRequiredResponse();
      }
    } else {
      return buildLoginRequiredResponse();
    }
  }

  // Build a new request to control what reaches the backend
  // Copy only allow-listed headers
  const headers = new Headers();
  for (const name of PROXY_FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }
  headers.set("Authorization", `Bearer ${existingSession.user?.accessToken}`);

  const proxyInit: RequestInit & { duplex: "half" } = {
    method: request.method,
    headers,
    body: request.body,
    duplex: "half",
  };
  const proxyRequest = new Request(targetUrl, proxyInit);

  let backendResponse: Response;
  try {
    backendResponse = await fetch(proxyRequest, {
      redirect: "manual",
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 504 });
  }

  // Relay only allow-listed response headers
  const responseHeaders = new Headers();
  for (const name of PROXY_FORWARDED_RESPONSE_HEADERS) {
    const value = backendResponse.headers.get(name);
    if (value) {
      responseHeaders.set(name, value);
    }
  }
  responseHeaders.set("Cache-Control", "private, no-store");
  responseHeaders.set("Vary", "Cookie");
  cookieResponse.headers
    .getSetCookie()
    .forEach((cookie) => responseHeaders.append("set-cookie", cookie));

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    headers: responseHeaders,
  });
};

export {
  proxyHandler as GET,
  proxyHandler as POST,
  proxyHandler as PUT,
  proxyHandler as DELETE,
  proxyHandler as PATCH,
};
