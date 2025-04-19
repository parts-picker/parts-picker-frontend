"use client";

import { Icon, IconName } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks: NavLink[] = [
  { href: "/", text: "Dashboard", icon: IconNames.TIMELINE_AREA_CHART },
  { href: "/projects", text: "Project Overview", icon: IconNames.CLIPBOARD },
  { href: "/item-types", text: "Item Inventory", icon: IconNames.BOX },
];

const NavigationBar: FC = () => {
  const pathname = usePathname();

  return (
    <div className={"nav-container"}>
      {navLinks.map((navLink) => (
        <Link
          href={navLink.href}
          key={navLink.href + "-" + navLink.text + "-" + navLink.icon}
        >
          <div
            className={
              pathname === navLink.href
                ? "nav-container__href--selected"
                : "nav-container__href"
            }
          >
            <Icon icon={navLink.icon} size={25} />
            <span className={"href-text invisible-if-reduced"}>
              {navLink.text}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;

interface NavLink {
  href: string;
  text: string;
  icon: IconName;
}
