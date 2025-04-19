import { EntryLinksContext } from "../EntryLinksContextV2";
import LinkUtil from "../LinkUtil";
import { LinkName } from "../types/LinkModel";
import { useContext } from "react";

/**
 * Fetches a specific entry link from the entry links context.
 * @param name the name the link must have
 * @param ref the ref the link must have
 * @returns the entry link matching the given parameters or undefined
 */
export const useEntryLinkFor = (name: LinkName, ref: string) => {
  const entryLinks = useContext(EntryLinksContext);

  return LinkUtil.findLink(entryLinks, ref, name);
};
