import { Icon, IconName } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks: NavLink[] = [
  { href: "/", text: "Dashboard", icon: IconNames.TIMELINE_AREA_CHART },
  { href: "/item-types", text: "Item inventory", icon: IconNames.BOX },
];

const NavigationBar: FC = () => {
  const router = useRouter();

  return (
    <div className={"nav-container"}>
      {navLinks.map((navLink) => (
        <Link
          href={navLink.href}
          key={navLink.href + "-" + navLink.text + "-" + navLink.icon}
        >
          <a
            className={
              router.pathname === navLink.href
                ? "nav-container__href--selected"
                : "nav-container__href"
            }
          >
            <Icon icon={navLink.icon} size={25} />

            <span className={"href-text invisible-if-reduced"}>
              {navLink.text}
            </span>
          </a>
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
