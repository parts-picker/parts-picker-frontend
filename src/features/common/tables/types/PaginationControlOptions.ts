import { ColumnSort } from "@tanstack/react-table";
import {
  SetRequestedPageNumber,
  SetRequestedPageSize,
  SetRequestedSortRules,
} from "./PaginationQueryOptions";

export default interface PaginationControlOptions {
  size: number;
  setRequestedPageSize: SetRequestedPageSize;
  allowedPageSizes: number[];
  totalElements: number;
  number: number;
  setRequestedPageNumber: SetRequestedPageNumber;
  totalPages: number;
  requestedSortRules: ColumnSort[];
  setRequestedSortRules: SetRequestedSortRules;
}
