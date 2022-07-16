export const range = (start: number, stop: number) => {
  return [...Array(Math.abs(stop - start)).keys()].map((i) => i + start);
};
