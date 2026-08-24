"use client";

import { createContext, ReactNode, useContext } from "react";
import { PublicUser } from "./PublicUser";

const UserContext = createContext<PublicUser | undefined>(undefined);

interface UserProviderProps {
  user: PublicUser | undefined;
  children: ReactNode;
}

export const UserProvider = ({ user, children }: UserProviderProps) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const useUser = () => useContext(UserContext);
