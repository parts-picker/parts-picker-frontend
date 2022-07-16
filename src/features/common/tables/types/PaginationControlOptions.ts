import {
  SetRequestedPageNumber,
  SetRequestedPageSize,
} from "./PaginationQueryOptions";

export default interface PaginationControlOptions {
  size: number;
  setRequestedPageSize: SetRequestedPageSize;
  allowedPageSizes: number[];
  totalElements: number;
  number: number;
  setRequestedPageNumber: SetRequestedPageNumber;
  totalPages: number;
}
