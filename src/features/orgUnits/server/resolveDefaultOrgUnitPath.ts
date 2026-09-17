import "server-only";

import { serverAuthedFetch } from "@/features/common/utils/server/serverAuthedFetch";
import { getEntryLinksUrl } from "@/features/common/security/ServerSecurityConstants";
import LinkUtil from "@/features/links/LinkUtil";
import { EntryLinksResponse } from "@/features/links/types/EntryLinksResponse";
import { LinkName } from "@/features/links/types/LinkModel";
import { ReadOrgUnitMembershipsResponse } from "@/features/orgUnits/models/ReadOrgUnitMembershipsResponse";
import {
  ORG_UNITS_PAGE_SIZE,
  ORG_UNITS_PATH,
} from "@/features/orgUnits/OrgUnitConstants";
import { selectDefaultOrgUnitPath } from "@/features/orgUnits/util/selectDefaultOrgUnitPath";

/**
 * Resolves the app path a freshly arriving user is sent to, see selectDefaultOrgUnitPath.
 * Falls back to the org unit overview if the backend cannot be reached, so the client
 * side error handling takes over.
 */
export const resolveDefaultOrgUnitPath = async (
  accessToken: string,
  lastUsedOrgUnitLink: string | undefined
): Promise<string> => {
  try {
    const entryLinks = await serverAuthedFetch<EntryLinksResponse>(
      getEntryLinksUrl(),
      accessToken
    );
    const membershipsReadLink = LinkUtil.findTemplatedLink(
      entryLinks,
      "orgUnitMemberships",
      LinkName.READ
    );
    if (!membershipsReadLink) {
      return ORG_UNITS_PATH;
    }

    const membershipsUrl = membershipsReadLink
      .expand({ size: ORG_UNITS_PAGE_SIZE.toString(), page: "0" })
      .toString();
    const membershipsResponse =
      await serverAuthedFetch<ReadOrgUnitMembershipsResponse>(
        membershipsUrl,
        accessToken
      );

    return selectDefaultOrgUnitPath(
      membershipsResponse._embedded?.orgUnitMemberships ?? [],
      lastUsedOrgUnitLink
    );
  } catch (error) {
    console.error("Could not resolve the default org unit:", error);
    return ORG_UNITS_PATH;
  }
};
