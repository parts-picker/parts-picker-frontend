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

const allowedLiterals = ALLOWED_PAGE_SIZES.map((number) => z.literal(number));
const sizeSchema = z.union(
  allowedLiterals as unknown as [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]] //TODO fix typing
);
const sizePreprocessingSchema = z.preprocess(
  (val: unknown) => Number(val),
  sizeSchema
);

export const parsePageQueryParams = (
  size: QueryParam,
  page: QueryParam
): PageQueryParseResult => {
  let valid = true;

  let parsedSize: number;
  try {
    parsedSize = sizePreprocessingSchema.parse(size);
  } catch (_: unknown) {
    parsedSize = DEFAULT_PAGE_SIZE;
    valid = false;
  }

  let parsedPage: number;
  try {
    parsedPage = pagePreprocessingSchema.parse(page);
  } catch (_: unknown) {
    parsedPage = DEFAULT_PAGE_NUMBER;
    valid = false;
  }

  return { valid, parsedPage, parsedSize };
};

type QueryParam = string | string[] | undefined | null;

type PageQueryParseResult = {
  valid: boolean;
  parsedPage: number;
  parsedSize: number;
};
