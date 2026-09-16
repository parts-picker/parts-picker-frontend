import "server-only";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData } from "./SessionData";
import { getSessionOptions } from "./ServerSecurityConstants";

/**
 * Reads the access token of the current request's session.
 */
export const readSessionAccessToken = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    getSessionOptions()
  );

  return session.user?.accessToken;
};
