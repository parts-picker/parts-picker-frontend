import { useContext } from "react";
import { OrgUnitContext } from "@/features/orgUnits/OrgUnitContext";

/**
 * Returns the org unit the current route is scoped to.
 * Must only be used below an OrgUnitProvider.
 */
export const useOrgUnit = () => {
  const orgUnitContext = useContext(OrgUnitContext);

  if (!orgUnitContext) {
    throw new Error("useOrgUnit must be used below an OrgUnitProvider");
  }

  return orgUnitContext;
};
