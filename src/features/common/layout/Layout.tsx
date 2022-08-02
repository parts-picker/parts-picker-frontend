import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children?: ReactNode;
}

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
