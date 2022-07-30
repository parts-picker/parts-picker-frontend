import React from "react";
import { EntryLinksResponse } from "./types/EntryLinksResponse";

type EntryLinksProviderProps = {
  children: React.ReactNode;
  value: EntryLinksResponse;
};

export const EntryLinksContext = React.createContext<
  EntryLinksResponse | undefined
>(undefined);

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
