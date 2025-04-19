import { ColumnSort } from "@tanstack/react-table";
import {
  SetRequestedPageNumber,
  SetRequestedPageSize,
  SetRequestedSortRules,
} from "../../tables/types/PaginationQueryOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Custom hook to simplify the usage of the size, page & sort query parameters used in pagination.
 * The hook assumes that all parameters were validated before entering the page.
 * @returns the current values of size, page number & sorting rules as well as setters for them
 */
export const usePageQueryParamsV2 = (): PageQueryOptions => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageParam = searchParams?.get("page");
  const sizeParam = searchParams?.get("size");
  const sortParam = searchParams?.getAll("sort");

  const requestedPageNumber = isNaN(Number(pageParam))
    ? Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_NUMBER)
    : Number(pageParam);
  const requestedPageSize = isNaN(Number(sizeParam))
    ? Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE)
    : Number(sizeParam);
  const requestedSortRules = queryParamToSortRules(sortParam);

  const setRequestedPageNumber = (page: number) =>
    shallowRouteWithParams(
      page,
      requestedPageSize,
      requestedSortRulesToQueryParam(requestedSortRules)
    );
  const setRequestedPageSize = (size: number) =>
    shallowRouteWithParams(
      requestedPageNumber,
      size,
      requestedSortRulesToQueryParam(requestedSortRules)
    );
  const setRequestedSortRules = (sortRules: ColumnSort[]) =>
    shallowRouteWithParams(
      requestedPageNumber,
      requestedPageSize,
      requestedSortRulesToQueryParam(sortRules)
    );

  const shallowRouteWithParams = (
    page: number,
    size: number,
    sort: string[]
  ) => {
    const updatedParams = new URLSearchParams(searchParams ?? "");

    updatedParams.set("page", page.toString());
    updatedParams.set("size", size.toString());
    updatedParams.delete("sort");
    sort.forEach((sortEntry) => updatedParams.append("sort", sortEntry));

    router.replace(`${pathname}?${updatedParams.toString()}`);
    (document?.activeElement as HTMLElement)?.blur();
  };

  return {
    requestedPageNumber,
    setRequestedPageNumber,
    requestedPageSize,
    setRequestedPageSize,
    requestedSortRules,
    setRequestedSortRules,
  };
};

type PageQueryOptions = {
  requestedPageNumber: number;
  setRequestedPageNumber: SetRequestedPageNumber;
  requestedPageSize: number;
  setRequestedPageSize: SetRequestedPageSize;
  requestedSortRules: ColumnSort[];
  setRequestedSortRules: SetRequestedSortRules;
};

enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export const requestedSortRulesToQueryParam = (sortRules: ColumnSort[]) =>
  sortRules.map(
    (rule) =>
      rule.id + "," + (rule.desc ? SortDirection.DESC : SortDirection.ASC)
  );

export const queryParamToSortRules = (
  param: string | string[] | undefined
): ColumnSort[] => {
  if (!param) {
    return [];
  }

  if (!Array.isArray(param)) {
    param = [param];
  }

  let sortRules: ColumnSort[] = [];

  param.forEach((queryParam) => {
    const values = queryParam.split(",");
    const desc = values[values.length - 1] === SortDirection.DESC;

    sortRules = sortRules.concat(
      values
        .filter(
          (value) => !Object.values<string>(SortDirection).includes(value)
        )
        .map(
          (columnName) =>
            ({
              id: columnName,
              desc: desc,
            }) as ColumnSort
        )
    );
  });

  return sortRules;
};
