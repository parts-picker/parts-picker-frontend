import LinkUtil from "@/features/links/LinkUtil";
import { LinkName } from "@/features/links/types/LinkModel";
import { useOrgUnit } from "./useOrgUnit";

/**
 * Fetches a specific link from the org unit the current route is scoped to.
 * @param name the name the link must have
 * @param ref the ref the link must have
 * @returns the org unit link matching the given parameters or undefined
 */
export const useOrgUnitLinkFor = (name: LinkName, ref: string) => {
  const { orgUnit } = useOrgUnit();

  return LinkUtil.findLink(orgUnit, ref, name);
};
