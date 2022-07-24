import { z, ZodTypeAny } from "zod";
import { ALLOWED_PAGE_SIZES } from "../ConfigReaderUtils";

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
  } catch (e: unknown) {
    parsedSize = Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE) || 10;
    valid = false;
  }

  let parsedPage: number;
  try {
    parsedPage = pagePreprocessingSchema.parse(page);
  } catch (e: unknown) {
    parsedPage = Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_NUMBER) || 0;
    valid = false;
  }

  return { valid, parsedPage, parsedSize };
};

type QueryParam = string | string[] | undefined;

type PageQueryParseResult = {
  valid: boolean;
  parsedPage: number;
  parsedSize: number;
};
