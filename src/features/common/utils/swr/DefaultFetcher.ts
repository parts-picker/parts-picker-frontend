import { IconNames } from "@blueprintjs/icons";
import ResponseError from "../../models/ResponseError";
import { AppToaster } from "../Toaster";
import {
  InteralResponseErrors,
  LOGIN_REQUIRED_ERROR_CODE,
  TARGET_URL_PARAM_NAME,
} from "../../security/SharedSecurityConstants";

let timeoutToastAlreadyShown = false;

export const defaultAuthedFetch = async <T = unknown>(
  resource: string | Request,
  proxyFullUrl: string,
  init?: RequestInit
): Promise<T | undefined> => {
  const redirectToAuthUrl = new URL(`${proxyFullUrl}/api/auth/proxy`);

  const targetUrl = typeof resource === "string" ? resource : resource.url;
  redirectToAuthUrl.searchParams.set(TARGET_URL_PARAM_NAME, targetUrl);

  const res = await fetch(redirectToAuthUrl, init);

  const contentType = res.headers.get("content-type") ?? "";
  if (!res.ok) {
    if (
      res.status == 401 &&
      isBodyJson(contentType) &&
      ((await res.json()) as InteralResponseErrors).errorCode ==
        LOGIN_REQUIRED_ERROR_CODE
    ) {
      if (!timeoutToastAlreadyShown) {
        timeoutToastAlreadyShown = true;
        (await AppToaster)?.show?.({
          message: "Session timed out - redirecting to login",
          intent: "warning",
          icon: IconNames.LOG_IN,
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.reload();
      } else {
        return undefined;
      }
    }

    throw new ResponseError(
      "An error occurred while fetching data.",
      res.status
    );
  }

  if (isBodyJson(contentType)) {
    return res.json() as Promise<T>;
  }

  return undefined;
};

export type AuthedFetch = <T = unknown>(
  resource: string | Request,
  init?: RequestInit
) => Promise<T | undefined>;

// helpers
const isBodyJson = (contentType: string) =>
  contentType.includes("application/json") ||
  contentType.includes("application/hal+json");
