import { z, ZodTypeAny } from "zod";
import {
  ALLOWED_PAGE_SIZES,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../ConfigReaderUtils";

const pagePreprocessingSchema = z.preprocess(
  (val: unknown) => Number(val),
  z.number().nonnegative()
);

const sizeSchema = z.literal(ALLOWED_PAGE_SIZES);
const sizePreprocessingSchema = z.preprocess(
  (val: unknown) => Number(val),
  sizeSchema
);

/**
 * Validates the pagination query params. Absent params are valid and fall back to the defaults.
 * Only present but unusable values make the result invalid.
 */
export const parsePageQueryParams = (
  size: QueryParam,
  page: QueryParam
): PageQueryParseResult => {
  const { value: parsedSize, valid: sizeValid } = parseParam(
    size,
    sizePreprocessingSchema,
    DEFAULT_PAGE_SIZE
  );
  const { value: parsedPage, valid: pageValid } = parseParam(
    page,
    pagePreprocessingSchema,
    DEFAULT_PAGE_NUMBER
  );

  return { valid: sizeValid && pageValid, parsedPage, parsedSize };
};

const parseParam = (
  param: QueryParam,
  schema: ZodTypeAny,
  fallback: number
): { value: number; valid: boolean } => {
  if (param === undefined || param === null) {
    return { value: fallback, valid: true };
  }

  try {
    return { value: schema.parse(param) as number, valid: true };
  } catch (_: unknown) {
    return { value: fallback, valid: false };
  }
};

type QueryParam = string | string[] | undefined | null;

type PageQueryParseResult = {
  valid: boolean;
  parsedPage: number;
  parsedSize: number;
};
