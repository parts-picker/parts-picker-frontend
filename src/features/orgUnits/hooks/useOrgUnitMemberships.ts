import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import URITemplate from "urijs/src/URITemplate";
import { useEntryLinkFor } from "@/features/links/hooks/useEntryLinkFor";
import { LinkName } from "@/features/links/types/LinkModel";
import { ReadOrgUnitMembershipsResponse } from "@/features/orgUnits/models/ReadOrgUnitMembershipsResponse";
import { ORG_UNITS_PAGE_SIZE } from "@/features/orgUnits/OrgUnitConstants";

/**
 * Loads the org unit memberships of the current user page by page. The first page comes from
 * the entry link, every further page follows the next link of the page before it.
 */
export const useOrgUnitMemberships = () => {
  const membershipsReadLink = useEntryLinkFor(
    LinkName.READ,
    "orgUnitMemberships"
  );
  const firstPageKey = membershipsReadLink
    ? new URITemplate(membershipsReadLink.href)
        .expand({ size: ORG_UNITS_PAGE_SIZE.toString(), page: "0" })
        .toString()
    : null;

  const { data, error, isLoading, size, setSize, mutate } =
    useSWRInfinite<ReadOrgUnitMembershipsResponse>(
      (pageIndex, previousPage) => {
        if (!firstPageKey) {
          return null;
        }
        if (pageIndex === 0) {
          return firstPageKey;
        }
        return previousPage ? nextPageHref(previousPage) : null;
      }
    );

  const pages = useMemo(() => data ?? [], [data]);
  const lastPage = pages[pages.length - 1];
  // a stable array, consumers such as Select treat a new reference as a changed list
  const memberships = useMemo(
    () => pages.flatMap((page) => page._embedded?.orgUnitMemberships ?? []),
    [pages]
  );

  return {
    memberships,
    error,
    isLoading,
    isLoadingMore: size > pages.length,
    hasMore: lastPage ? nextPageHref(lastPage) !== null : false,
    loadMore: () => setSize(size + 1),
    mutate,
  };
};

// helpers
const nextPageHref = (page: ReadOrgUnitMembershipsResponse): string | null => {
  const next = page._links.next;
  const link = Array.isArray(next) ? next[0] : next;

  return link?.href ?? null;
};
