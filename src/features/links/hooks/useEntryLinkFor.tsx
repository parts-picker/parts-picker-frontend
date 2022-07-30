import React from "react";
import LinkUtil from "../LinkUtil";
import { LinkNames } from "../types/LinkModel";
import { EntryLinksContext } from "../EntryLinksContext";

/**
 * Fetches a specific entry link from the entry links context.
 * @param name the name the link must have
 * @param ref the ref the link must have
 * @returns the entry link matching the given parameters or undefined
 */
export const useEntryLinkFor = (name: LinkNames, ref: string) => {
  const entryLinks = React.useContext(EntryLinksContext);

  return LinkUtil.findLink(entryLinks, ref, name);
};
