export const convertCommaSeparatedStringToNumberArray = (variable: string) =>
  variable.split(",").map(Number);

export const ALLOWED_PAGE_SIZES = convertCommaSeparatedStringToNumberArray(
  process.env.NEXT_PUBLIC_CHOOSABLE_PAGE_SIZES || "10,20"
);

export const ENTRY_LINK = process.env.NEXT_PUBLIC_ENTRY_LINK;

export const DEFAULT_PAGE_SIZE =
  Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE) || 10;

export const DEFAULT_PAGE_NUMBER =
  Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_NUMBER) || 0;
