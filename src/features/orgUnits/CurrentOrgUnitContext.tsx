"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import OrgUnitModel from "@/features/orgUnits/models/OrgUnitModel";

interface CurrentOrgUnitContextValue {
  // the org unit the current route is scoped to, undefined outside an org unit
  currentOrgUnit: OrgUnitModel | undefined;
  setCurrentOrgUnit: (orgUnit: OrgUnitModel | undefined) => void;
}

const CurrentOrgUnitContext = createContext<
  CurrentOrgUnitContextValue | undefined
>(undefined);

interface CurrentOrgUnitProviderProps {
  children: ReactNode;
}

/**
 * Lifts the org unit of the current route above the org unit layout, so components outside
 * of it, like the header, know which org unit is active. Set by OrgUnitProvider only.
 */
export const CurrentOrgUnitProvider = ({
  children,
}: CurrentOrgUnitProviderProps) => {
  const [currentOrgUnit, setCurrentOrgUnit] = useState<
    OrgUnitModel | undefined
  >(undefined);
  const value = useMemo(
    () => ({ currentOrgUnit, setCurrentOrgUnit }),
    [currentOrgUnit]
  );

  return (
    <CurrentOrgUnitContext.Provider value={value}>
      {children}
    </CurrentOrgUnitContext.Provider>
  );
};

export const useCurrentOrgUnit = () => {
  const context = useContext(CurrentOrgUnitContext);

  if (!context) {
    throw new Error(
      "useCurrentOrgUnit must be used below a CurrentOrgUnitProvider"
    );
  }

  return context;
};
