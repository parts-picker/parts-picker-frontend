import { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData } from "../features/common/security/SessionData";
import UserMenu from "../features/common/layout/UserMenu";
import OrgUnitSwitcher from "../features/orgUnits/components/OrgUnitSwitcher";
import { CurrentOrgUnitProvider } from "../features/orgUnits/CurrentOrgUnitContext";
import { EntryLinksProviderV2 } from "../features/links/EntryLinksContextV2";
import OverlaysProviderClientWrapper from "../features/common/utils/OverlaysProviderClientWrapper";
import FocusStyleClientWrapper from "../features/common/utils/FocusStyleClientWrapper";
import { UserProvider } from "../features/common/user/UserContext";
import { PublicUser } from "../features/common/user/PublicUser";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

import "../../styles/globals.scss";
import "../../styles/layout.scss";
import "../../styles/navigation.scss";
import SwrConfigClientWrapper from "../features/common/utils/SwrConfigClientWrapper";
import {
  getEntryLinksUrl,
  getLogoutUri,
  getPublicRootUrl,
  getSessionOptions,
} from "../features/common/security/ServerSecurityConstants";

// the whole app is authenticated and reads the session, so nothing is prerendered
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "parts picker", template: "%s · parts picker" },
};

interface LayoutProps {
  children: ReactNode;
  // sidebar slot, see app/@sidebar
  sidebar: ReactNode;
}

const Layout = async ({ children, sidebar }: LayoutProps) => {
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
          <FocusStyleClientWrapper>
            <OverlaysProviderClientWrapper>
              <UserProvider user={user}>
                <EntryLinksProviderV2 entryLinksUrl={entryLinksUrl}>
                  <CurrentOrgUnitProvider>
                    <div className={"layout"}>
                      <header className={"header"}>
                        <OrgUnitSwitcher />
                        <UserMenu logoutUrl={getLogoutUri()} />
                      </header>
                      {sidebar}
                      <main className={"content"}>{children}</main>
                    </div>
                  </CurrentOrgUnitProvider>
                </EntryLinksProviderV2>
              </UserProvider>
            </OverlaysProviderClientWrapper>
          </FocusStyleClientWrapper>
        </SwrConfigClientWrapper>
      </body>
    </html>
  );
};

export default Layout;
