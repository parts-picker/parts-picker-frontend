import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

interface LayoutProps {
  children?: ReactNode;
}

/**
 * @deprecated Will be removed when migration to app router is finished.
 */
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={"layout"}>
      <header className={"header"}>HEADER</header>
      <Sidebar />
      <main className={"content"}>{children}</main>
    </div>
  );
};

export default Layout;
