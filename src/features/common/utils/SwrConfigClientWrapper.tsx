"use client";

import { FC, ReactNode, useCallback } from "react";
import { SWRConfig } from "swr";
import { defaultAuthedFetch } from "./swr/DefaultFetcher";

interface SwrConfigClientWrapperProps {
  rootUrl: string;
  children: ReactNode;
}

const SwrConfigClientWrapper: FC<SwrConfigClientWrapperProps> = ({
  rootUrl,
  children,
}) => {
  const fetcher = useCallback(
    (resource: string | Request, init?: RequestInit) =>
      defaultAuthedFetch(resource, rootUrl, init),
    [rootUrl]
  );

  if (!rootUrl) {
    return "Root url must be set.";
  }

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrConfigClientWrapper;
