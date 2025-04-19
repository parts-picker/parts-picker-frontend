"use client";

import React from "react";
import { EntryLinksResponse } from "./types/EntryLinksResponse";
import useSWR from "swr";
import defaultFetcher from "../common/utils/swr/DefaultFetcher";
import ResponseError from "../common/models/ResponseError";
import DefaultLoadingSpinner from "../common/loading/DefaultLoadingSpinner";

type EntryLinksProviderV2Props = {
  children: React.ReactNode;
  entryLinksUrl: string | undefined;
};

export const EntryLinksContext = React.createContext<
  EntryLinksResponse | undefined
>(undefined);

export const EntryLinksProviderV2 = ({
  children,
  entryLinksUrl,
}: EntryLinksProviderV2Props) => {
  const {
    data: entryLinksResponse,
    error,
    isLoading,
  } = useSWR<EntryLinksResponse>(entryLinksUrl, defaultFetcher);

  if (!entryLinksUrl) {
    return "ENTRY_LINKS_URL is a required value, but is missing or not configured properly";
  }

  if (error) {
    if (error instanceof ResponseError) {
      return "A REST error occurred while fetching: " + error.status;
    }

    return "Unknown error occurred - please try again later";
  }

  if (isLoading) {
    return <DefaultLoadingSpinner />;
  }

  return (
    <EntryLinksContext.Provider value={entryLinksResponse}>
      {children}
    </EntryLinksContext.Provider>
  );
};
