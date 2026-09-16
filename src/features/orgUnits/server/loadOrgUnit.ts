import "server-only";

import { cache } from "react";
import { readSessionAccessToken } from "@/features/common/security/readSessionAccessToken";
import { serverAuthedFetch } from "@/features/common/utils/server/serverAuthedFetch";
import { decodeLinkBase64Url } from "@/features/links/LinkEncoding";
import OrgUnitModel from "@/features/orgUnits/models/OrgUnitModel";
import { ORG_UNIT_CACHE_REVALIDATE_SECONDS } from "@/features/orgUnits/OrgUnitConstants";

export const orgUnitCacheTag = (encodedOrgUnitLink: string) =>
  `org-unit:${encodedOrgUnitLink}`;

/**
 * Loads the org unit behind a route segment on the server.
 * Memoized per request and cached across requests, as the metadata
 * of every route below an org unit needs it.
 */
export const loadOrgUnit = cache(
  async (encodedOrgUnitLink: string): Promise<OrgUnitModel | undefined> => {
    const orgUnitLink = decodeLinkBase64Url(encodedOrgUnitLink);
    const accessToken = await readSessionAccessToken();
    if (!orgUnitLink || !accessToken) {
      return undefined;
    }

    try {
      return await serverAuthedFetch<OrgUnitModel>(orgUnitLink, accessToken, {
        revalidateSeconds: ORG_UNIT_CACHE_REVALIDATE_SECONDS,
        tags: [orgUnitCacheTag(encodedOrgUnitLink)],
      });
    } catch {
      return undefined;
    }
  }
);
