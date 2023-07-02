import { useState } from "react";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../ConfigReaderUtils";
import { ColumnSort } from "@tanstack/react-table";
import {
  SetRequestedPageSize,
  SetRequestedPageNumber,
  SetRequestedSortRules,
} from "../../tables/types/PaginationQueryOptions";

export const usePaginationParamState = (): PaginationParamState => {
  const [size, setSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [sort, setSort] = useState<ColumnSort[]>([]);

  return {
    size,
    page,
    sort,
    setSize,
    setPage,
    setSort,
  };
};

export type PaginationParamState = {
  size: number;
  page: number;
  sort: ColumnSort[];
  setSize: SetRequestedPageSize;
  setPage: SetRequestedPageNumber;
  setSort: SetRequestedSortRules;
};
