"use client";

import React from "react";
import { EntryLinksResponse } from "./types/EntryLinksResponse";
import useSWR from "swr";
import ResponseError from "../common/models/ResponseError";
import DefaultLoadingSpinner from "../common/loading/DefaultLoadingSpinner";

type EntryLinksProviderV2Props = {
  children: React.ReactNode;
  entryLinksUrl: string;
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
  } = useSWR<EntryLinksResponse>(entryLinksUrl);

  if (error) {
    console.log("ERROR: ", error);
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
