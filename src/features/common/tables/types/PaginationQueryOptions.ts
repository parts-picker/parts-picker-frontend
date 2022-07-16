import { z, ZodTypeAny } from "zod";

export default class PaginationQueryOptions {
  requestedPageNumber: number;
  setRequestedPageNumber: SetRequestedPageNumber;
  requestedPageSize: number;
  setRequestedPageSize: SetRequestedPageSize;
  allowedPageSizes: number[];
  sizePreprocessingSchema: SizePreprocessingSchema;
}

export type SetRequestedPageNumber = (pageNumber: number) => void;

export type SetRequestedPageSize = (pageSize: number) => void;

export type SizePreprocessingSchema = z.ZodEffects<ZodTypeAny, number, unknown>;
