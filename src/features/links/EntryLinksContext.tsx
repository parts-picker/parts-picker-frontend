import React from "react";
import LinkUtil from "./LinkUtil";
import { EntryLinksResponse } from "./types/EntryLinksResponse";
import { LinkNames } from "./types/LinkModel";

type EntryLinksProviderProps = {
  children: React.ReactNode;
  value: EntryLinksResponse;
};

const EntryLinksContext = React.createContext<EntryLinksResponse | undefined>(
  undefined
);

const useEntryLinks = () => React.useContext(EntryLinksContext);

/**
 * Fetches a specific entry link from the entry links context.
 * @param name the name the link must have
 * @param ref the ref the link must have
 * @returns the entry link matching the given parameters or undefined
 */
const useEntryLinkFor = (name: LinkNames, ref: string) => {
  const entryLinks = React.useContext(EntryLinksContext);

  return LinkUtil.findLink(entryLinks, ref, name);
};

const EntryLinksProvider = ({ children, value }: EntryLinksProviderProps) => {
  return (
    <EntryLinksContext.Provider value={value}>
      {children}
    </EntryLinksContext.Provider>
  );
};

export { EntryLinksProvider, useEntryLinks, useEntryLinkFor };
