import { useSWRConfig } from "swr";
import URITemplate from "urijs/src/URITemplate";
import { LinkModel } from "../../../links/types/LinkModel";

export const useMatchMutate = () => {
  const { cache, mutate } = useSWRConfig();
  return (linkToMutate: LinkModel | undefined, ...args: unknown[]) => {
    if (!linkToMutate) {
      return undefined;
    }

    let uri: string;
    if (linkToMutate.templated) {
      uri = new URITemplate(linkToMutate.href).expand({}).toString();
    } else {
      uri = linkToMutate.href;
    }

    if (!(cache instanceof Map)) {
      throw new Error(
        "matchMutate requires the cache provider to be a Map instance"
      );
    }

    const matcher = new RegExp(
      `^${uri.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
    );

    const keys = [];

    for (const key of cache.keys()) {
      if (matcher.test(key)) {
        keys.push(key);
      }
    }

    const mutations = keys.map((key) => mutate(key, ...args));
    return Promise.all(mutations);
  };
};
