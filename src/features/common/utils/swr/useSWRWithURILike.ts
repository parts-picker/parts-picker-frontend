import { URILike } from "../../../links/types/URILike";
import defaultFetcher from "./DefaultFetcher";
import URITemplate, { URITemplateInput } from "urijs/src/URITemplate";
import URI from "urijs";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

export const useSWRWithURILike = <ReturnType = unknown, ErrorType = unknown>(
  uriLike: URILike,
  uriParams?: URITemplateInput,
  swrOptions?: SWRConfiguration<ReturnType, ErrorType>
): SWRResponse<ReturnType, ErrorType> => {
  let key: string | undefined;

  if (uriLike instanceof URI) {
    key = uriLike.toString();
  } else if (uriLike instanceof URITemplate) {
    key = uriLike.expand(uriParams ?? {}).toString();
  } else if (typeof uriLike === "string") {
    key = uriLike;
  }

  return useSWR<ReturnType, ErrorType>(key, defaultFetcher, swrOptions);
};
