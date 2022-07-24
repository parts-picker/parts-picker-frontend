export const convertCommaSeparatedStringToNumberArray = (variable: string) =>
  variable.split(",").map(Number);

export const ALLOWED_PAGE_SIZES = convertCommaSeparatedStringToNumberArray(
  process.env.NEXT_PUBLIC_CHOOSABLE_PAGE_SIZES || "10,20"
);
