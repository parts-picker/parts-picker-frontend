import "../../styles/globals.scss";
import type { AppProps } from "next/app";

import "../../styles/layout.scss";
import "../../styles/navigation.scss";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

import useSWR from "swr";
import defaultFetcher from "../features/common/utils/swr/DefaultFetcher";
import { EntryLinksProvider } from "../features/links/EntryLinksContext";
import ResponseError from "../features/common/models/ResponseError";
import DefaultLoadingSpinner from "../features/common/loading/DefaultLoadingSpinner";
import { EntryLinksResponse } from "../features/links/types/EntryLinksResponse";
import Layout from "../features/common/layout/Layout";
import { EntryLinksUrlApiResponse } from "./api/entry";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { data: entryLinksUrlApiResponse, error: entryLinksUrlError } =
    useSWR<EntryLinksUrlApiResponse>(
      router.basePath + "/api/entry",
      defaultFetcher
    );

  const { data, error } = useSWR<EntryLinksResponse>(
    entryLinksUrlApiResponse?.url,
    defaultFetcher
  );

  if (entryLinksUrlError) {
    return "ENTRY_LINKS_URL is a required value, but is missing or not configured properly";
  }

  if (error) {
    if (error instanceof ResponseError) {
      return "A REST error occurred while fetching: " + error.status;
    }

    return "Unknown error occurred - please try again later";
  }

  if (!data || !entryLinksUrlApiResponse) {
    return <DefaultLoadingSpinner />;
  }

  return (
    <EntryLinksProvider value={data}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EntryLinksProvider>
  );
}

export default MyApp;
