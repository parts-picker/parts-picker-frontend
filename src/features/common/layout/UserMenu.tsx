"use client";

import { Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC } from "react";
import { useUser } from "../user/UserContext";

interface UserMenuProps {
  logoutUrl: string;
}

const UserMenu: FC<UserMenuProps> = ({ logoutUrl }) => {
  const user = useUser();
  const username = user?.username;
  const email = user?.email;
  const initial =
    (username ?? email ?? "?").trim().charAt(0).toUpperCase() || "?";

  return (
    <Popover
      placement={"bottom-end"}
      content={
        <Menu>
          <MenuDivider title={username ?? "Signed in"} />
          {email && <MenuItem text={email} disabled />}
          <MenuDivider />
          <MenuItem icon={IconNames.LOG_OUT} text={"Logout"} href={logoutUrl} />
        </Menu>
      }
    >
      <button type="button" className={"user-avatar"} aria-label={"User menu"}>
        {initial}
      </button>
    </Popover>
  );
};

export default UserMenu;
