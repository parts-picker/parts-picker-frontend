import { z } from "zod";
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
