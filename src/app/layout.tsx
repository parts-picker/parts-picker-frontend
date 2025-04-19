import { FC, ReactNode } from "react";
import Sidebar from "../features/common/layout/Sidebar";
import { EntryLinksProviderV2 } from "../features/links/EntryLinksContextV2";
import OverlaysProviderClientWrapper from "../features/common/utils/OverlaysProviderClientWrapper";

import "../../styles/globals.scss";
import "../../styles/layout.scss";
import "../../styles/navigation.scss";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const entryLinksUrl = process.env.ENTRY_LINKS_URL;

  return (
    <html lang="en">
      <body>
        <OverlaysProviderClientWrapper>
          <EntryLinksProviderV2 entryLinksUrl={entryLinksUrl}>
            <div className={"layout"}>
              <header className={"header"}>HEADER</header>
              <Sidebar />
              <main className={"content"}>{children}</main>
            </div>
          </EntryLinksProviderV2>
        </OverlaysProviderClientWrapper>
      </body>
    </html>
  );
};

export default Layout;
