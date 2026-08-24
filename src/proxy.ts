import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData } from "./features/common/security/SessionData";
import {
  getLoginUri,
  getSessionOptions,
} from "./features/common/security/ServerSecurityConstants";
import { isAccessTokenExpired } from "./features/common/security/serverSessionUtil";
import { REDIRECT_TO_PARAM_NAME } from "./features/common/security/SharedSecurityConstants";

export const proxy = async (request: NextRequest) => {
  const response = NextResponse.next();
  const existingSession = await getIronSession<SessionData>(
    request,
    response,
    getSessionOptions()
  );

  if (isAccessTokenExpired(existingSession)) {
    const loginRedirectUrl = new URL(getLoginUri());
    loginRedirectUrl.searchParams.set(
      REDIRECT_TO_PARAM_NAME,
      request.nextUrl.href
    );

    return NextResponse.redirect(loginRedirectUrl);
  }

  return response;
};

export const config = {
  matcher: [
    "/",
    "/((?!(?:_next|api/auth/login|api/auth/callback|api/auth/proxy|api/auth/logout|api/actuator/health|favicon\\.ico)(?:/|$)).*)",
  ],
};
