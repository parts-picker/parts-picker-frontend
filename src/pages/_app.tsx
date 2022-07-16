import "../../styles/globals.css";
import type { AppProps } from "next/app";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import useSWR from "swr";
import defaultFetcher from "../features/common/DefaultFetcher";
import { EntryLinksProvider } from "../features/links/EntryLinksContext";
import ResponseError from "../features/common/models/ResponseError";
import DefaultLoadingSpinner from "../features/common/loading/DefaultLoadingSpinner";
import { EntryLinksResponse } from "../features/links/types/EntryLinksResponse";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR<EntryLinksResponse>(
    "http://localhost:8080/api/v1/entry",
    defaultFetcher
  );

  if (error) {
    if (error instanceof ResponseError) {
      return "A REST error occurred while fetching: " + error.status;
    }

    return "Unknown error occurred - please try again later";
  }

  if (!data) {
    return <DefaultLoadingSpinner />;
  }

  return (
    <EntryLinksProvider value={data}>
      <Component {...pageProps} />
    </EntryLinksProvider>
  );
}

export default MyApp;
