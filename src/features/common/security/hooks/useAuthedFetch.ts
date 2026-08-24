import { useSWRConfig } from "swr";
import { AuthedFetch } from "../../utils/swr/DefaultFetcher";

export const useAuthedFetch = () => {
  const { fetcher } = useSWRConfig();

  if (!fetcher) {
    throw new Error("Fetcher not found in SWRConfig");
  }

  return fetcher as AuthedFetch;
};
