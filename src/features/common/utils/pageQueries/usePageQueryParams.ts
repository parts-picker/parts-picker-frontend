import { useRouter } from "next/router";

/**
 * Custom hook to simplify the usage of the size and page query parameters used in pagination.
 * The hook assumes that both parameters were validated before entering the page.
 * @returns the current values of size and page number as well as setters for them
 */
export const usePageQueryParams = (): PageQueryOptions => {
  const router = useRouter();
  const requestedPageNumber = Number(router.query.page);
  const requestedPageSize = Number(router.query.size);

  const setRequestedPageNumber = (page: number) =>
    shallowRouteWithParams(page, requestedPageSize);
  const setRequestedPageSize = (size: number) =>
    shallowRouteWithParams(requestedPageNumber, size);

  const shallowRouteWithParams = (page: number, size: number) => {
    router.push({ query: { ...router.query, size, page } }, undefined, {
      shallow: true,
    });

    (document?.activeElement as HTMLElement)?.blur();
  };

  return {
    requestedPageNumber,
    setRequestedPageNumber,
    requestedPageSize,
    setRequestedPageSize,
  };
};

type PageQueryOptions = {
  requestedPageNumber: number;
  setRequestedPageNumber: (page: number) => void;
  requestedPageSize: number;
  setRequestedPageSize: (size: number) => void;
};
