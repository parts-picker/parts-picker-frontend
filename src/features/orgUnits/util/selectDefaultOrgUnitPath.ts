import { encodeLinkBase64Url } from "@/features/links/LinkEncoding";
import LinkUtil from "@/features/links/LinkUtil";
import { LinkName } from "@/features/links/types/LinkModel";
import OrgUnitMembershipModel from "@/features/orgUnits/models/OrgUnitMembershipModel";
import { ORG_UNITS_PATH } from "@/features/orgUnits/OrgUnitConstants";
import { buildOrgUnitPath } from "./OrgUnitRoutingUtil";

/**
 * Selects the org unit a user lands on: the last used one if still available, otherwise
 * the first one. Without any membership the org unit overview is the target.
 * @param memberships the org unit memberships of the current user
 * @param lastUsedOrgUnitLink the encoded self link from the last used org unit cookie, if set
 */
export const selectDefaultOrgUnitPath = (
  memberships: OrgUnitMembershipModel[],
  lastUsedOrgUnitLink: string | undefined
): string => {
  const encodedLinks = memberships
    .map(
      (membership) => LinkUtil.findLink(membership, "self", LinkName.READ)?.href
    )
    .filter((href): href is string => Boolean(href))
    .map(encodeLinkBase64Url);

  if (lastUsedOrgUnitLink && encodedLinks.includes(lastUsedOrgUnitLink)) {
    return buildOrgUnitPath(lastUsedOrgUnitLink);
  }

  return encodedLinks.length > 0
    ? buildOrgUnitPath(encodedLinks[0])
    : ORG_UNITS_PATH;
};
