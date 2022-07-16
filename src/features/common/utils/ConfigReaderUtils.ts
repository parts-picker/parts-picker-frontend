export const convertCommaSeparatedStringToNumberArray = (variable: string) =>
  variable.split(",").map(Number);
