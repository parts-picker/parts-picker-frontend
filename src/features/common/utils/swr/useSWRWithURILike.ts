import { URILike } from "../../../links/types/URILike";
import defaultFetcher from "./DefaultFetcher";
import URITemplate, { URITemplateInput } from "urijs/src/URITemplate";
import URI from "urijs";
import useSWR, { KeyedMutator, SWRResponse } from "swr";

export const useSWRWithURILike = <ReturnType = unknown, ErrorType = unknown>(
  uriLike: URILike,
  uriParams?: URITemplateInput,
  swrOptions?: SwrOptions
): ExtendedSWRResponse<ReturnType, ErrorType> => {
  let key: string | undefined;

  if (uriLike instanceof URI) {
    key = uriLike.toString();
  } else if (uriLike instanceof URITemplate) {
    key = uriLike.expand(uriParams || {}).toString();
  } else if (typeof uriLike === "string") {
    key = uriLike;
  }
  const swrResponse = useSWR<ReturnType, ErrorType>(
    key,
    defaultFetcher,
    swrOptions
  );

  return { ...swrResponse, loading: !swrResponse.error && !swrResponse.data };
};

export class ExtendedSWRResponse<ReturnType, ErrorType>
  implements SWRResponse<ReturnType, ErrorType>
{
  data?: ReturnType;
  error?: ErrorType;
  mutate: KeyedMutator<ReturnType>;
  isValidating: boolean;
  loading: boolean;
}

class SwrOptions {
  refreshInterval: number;
}
