import { ColumnSort } from "@tanstack/react-table";

export default class PaginationQueryOptions {
  requestedPageNumber: number;
  setRequestedPageNumber: SetRequestedPageNumber;
  requestedPageSize: number;
  setRequestedPageSize: SetRequestedPageSize;
  allowedPageSizes: number[];
  requestedSortRules: ColumnSort[];
  setRequestedSortRules: SetRequestedSortRules;
}

export type SetRequestedPageNumber = (pageNumber: number) => void;

export type SetRequestedPageSize = (pageSize: number) => void;

export type SetRequestedSortRules = (sortRules: ColumnSort[]) => void;
