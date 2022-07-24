export default class PaginationQueryOptions {
  requestedPageNumber: number;
  setRequestedPageNumber: SetRequestedPageNumber;
  requestedPageSize: number;
  setRequestedPageSize: SetRequestedPageSize;
  allowedPageSizes: number[];
}

export type SetRequestedPageNumber = (pageNumber: number) => void;

export type SetRequestedPageSize = (pageSize: number) => void;
