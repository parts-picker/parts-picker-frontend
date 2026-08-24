import { ReactNode } from "react";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData } from "../features/common/security/SessionData";
import Sidebar from "../features/common/layout/Sidebar";
import UserMenu from "../features/common/layout/UserMenu";
import { EntryLinksProviderV2 } from "../features/links/EntryLinksContextV2";
import OverlaysProviderClientWrapper from "../features/common/utils/OverlaysProviderClientWrapper";
import { UserProvider } from "../features/common/user/UserContext";
import { PublicUser } from "../features/common/user/PublicUser";

import "../../styles/globals.scss";
import "../../styles/layout.scss";
import "../../styles/navigation.scss";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import SwrConfigClientWrapper from "../features/common/utils/SwrConfigClientWrapper";
import {
  getEntryLinksUrl,
  getLogoutUri,
  getPublicRootUrl,
  getSessionOptions,
} from "../features/common/security/ServerSecurityConstants";

// the whole app is authenticated and reads the session, so nothing is prerendered
export const dynamic = "force-dynamic";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const entryLinksUrl = getEntryLinksUrl();
  const rootUrl = getPublicRootUrl();

  const session = await getIronSession<SessionData>(
    await cookies(),
    getSessionOptions()
  );
  const user: PublicUser | undefined = session.user
    ? {
        id: session.user.id,
        username: session.user.username,
        email: session.user.email,
      }
    : undefined;

  return (
    <html lang="en">
      <body>
        <SwrConfigClientWrapper rootUrl={rootUrl}>
          <OverlaysProviderClientWrapper>
            <UserProvider user={user}>
              <EntryLinksProviderV2 entryLinksUrl={entryLinksUrl}>
                <div className={"layout"}>
                  <header className={"header"}>
                    <UserMenu logoutUrl={getLogoutUri()} />
                  </header>
                  <Sidebar />
                  <main className={"content"}>{children}</main>
                </div>
              </EntryLinksProviderV2>
            </UserProvider>
          </OverlaysProviderClientWrapper>
        </SwrConfigClientWrapper>
      </body>
    </html>
  );
};

export default Layout;
