"use client";

import { Button } from "@blueprintjs/core";
import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";

import NavigationBar from "./NavigationBar";
import { NavLink } from "./NavLink";
import { useLocalStorage } from "../local_storage/useLocalStorage";

interface SidebarProps {
  navLinks: NavLink[];
}

const Sidebar: FC<SidebarProps> = ({ navLinks }) => {
  const [reduced, setReduced] = useLocalStorage("sidebar_reduced", false);

  const handleButton = () => setReduced(!reduced);

  if (navLinks.length === 0) {
    return null;
  }

  return (
    <aside className={reduced ? "sidebar--reduced" : "sidebar"}>
      <NavigationBar navLinks={navLinks} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          icon={reduced ? IconNames.CHEVRON_RIGHT : IconNames.CHEVRON_LEFT}
          variant="minimal"
          onClick={handleButton}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
