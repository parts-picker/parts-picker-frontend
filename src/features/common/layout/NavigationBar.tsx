"use client";

import { Icon } from "@blueprintjs/core";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";

interface NavigationBarProps {
  navLinks: NavLink[];
}

const NavigationBar: FC<NavigationBarProps> = ({ navLinks }) => {
  const pathname = usePathname();

  if (navLinks.length === 0) {
    return null;
  }

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
