import "../styles/globals.css";
import type { AppProps } from "next/app";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import useSWR from "swr";
import defaultFetcher from "../features/common/DefaultFetcher";
import { EntryLinksProvider } from "../features/links/EntryLinksContext";
import { Spinner } from "@blueprintjs/core";
import ResponseError from "../features/common/models/ResponseError";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR(
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
    return <Spinner intent="primary" />;
  }

  return (
    <EntryLinksProvider value={data ? data._links : undefined}>
      <Component {...pageProps} />
    </EntryLinksProvider>
  );
}

export default MyApp;
