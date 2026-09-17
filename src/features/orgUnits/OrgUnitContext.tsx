"use client";

import { createContext, ReactNode, useEffect, useMemo } from "react";
import useSWR from "swr";
import DefaultLoadingSpinner from "@/features/common/loading/DefaultLoadingSpinner";
import ResponseError from "@/features/common/models/ResponseError";
import { setBrowserCookie } from "@/features/common/utils/BrowserCookieUtils";
import { decodeLinkBase64Url } from "@/features/links/LinkEncoding";
import { useCurrentOrgUnit } from "@/features/orgUnits/CurrentOrgUnitContext";
import OrgUnitFetchFailed from "@/features/orgUnits/components/OrgUnitFetchFailed";
import OrgUnitNotAccessible from "@/features/orgUnits/components/OrgUnitNotAccessible";
import OrgUnitModel from "@/features/orgUnits/models/OrgUnitModel";
import {
  ORG_UNIT_COOKIE_MAX_AGE_SECONDS,
  ORG_UNIT_COOKIE_NAME,
} from "@/features/orgUnits/OrgUnitConstants";
import { buildOrgUnitPath } from "@/features/orgUnits/util/OrgUnitRoutingUtil";

export interface OrgUnitContextValue {
  orgUnit: OrgUnitModel;
  // app path of the org unit, base for all routes below it
  orgUnitPath: string;
}

export const OrgUnitContext = createContext<OrgUnitContextValue | undefined>(
  undefined
);

interface OrgUnitProviderProps {
  encodedOrgUnitLink: string;
  initialOrgUnit?: OrgUnitModel;
  children: ReactNode;
}

export const OrgUnitProvider = ({
  encodedOrgUnitLink,
  initialOrgUnit,
  children,
}: OrgUnitProviderProps) => {
  const orgUnitLink = decodeLinkBase64Url(encodedOrgUnitLink);
  const {
    data: orgUnit,
    error,
    isLoading,
  } = useSWR<OrgUnitModel, unknown>(orgUnitLink ?? null, {
    fallbackData: initialOrgUnit,
    revalidateOnMount: initialOrgUnit ? false : undefined,
  });

  useEffect(() => {
    if (orgUnit) {
      storeLastUsedOrgUnit(encodedOrgUnitLink);
    }
  }, [orgUnit, encodedOrgUnitLink]);

  const value = useMemo(
    () =>
      orgUnit
        ? { orgUnit, orgUnitPath: buildOrgUnitPath(encodedOrgUnitLink) }
        : undefined,
    [orgUnit, encodedOrgUnitLink]
  );

  const { setCurrentOrgUnit } = useCurrentOrgUnit();
  useEffect(() => {
    setCurrentOrgUnit(orgUnit);
    return () => setCurrentOrgUnit(undefined);
  }, [orgUnit, setCurrentOrgUnit]);

  if (!orgUnitLink || isAccessError(error)) {
    return <OrgUnitNotAccessible />;
  }

  if (error) {
    return <OrgUnitFetchFailed />;
  }

  if (isLoading || !value) {
    return <DefaultLoadingSpinner />;
  }

  return (
    <OrgUnitContext.Provider value={value}>{children}</OrgUnitContext.Provider>
  );
};

// helpers
const isAccessError = (error: unknown) =>
  error instanceof ResponseError &&
  (error.status === 403 || error.status === 404);

const storeLastUsedOrgUnit = (encodedOrgUnitLink: string) =>
  setBrowserCookie(
    ORG_UNIT_COOKIE_NAME,
    encodedOrgUnitLink,
    ORG_UNIT_COOKIE_MAX_AGE_SECONDS
  );
