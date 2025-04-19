import React from "react";
import { EntryLinksResponse } from "./types/EntryLinksResponse";

type EntryLinksProviderProps = {
  children: React.ReactNode;
  value: EntryLinksResponse;
};

export const EntryLinksContext = React.createContext<
  EntryLinksResponse | undefined
>(undefined);

/**
 * @deprecated Will be removed when migration to app router is finished. Use V2 instead.
 */
export const EntryLinksProvider = ({
  children,
  value,
}: EntryLinksProviderProps) => {
  return (
    <EntryLinksContext.Provider value={value}>
      {children}
    </EntryLinksContext.Provider>
  );
};
