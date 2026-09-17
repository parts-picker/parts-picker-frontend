import { Metadata } from "next";
import { ReactNode } from "react";
import { OrgUnitProvider } from "@/features/orgUnits/OrgUnitContext";
import { loadOrgUnit } from "@/features/orgUnits/server/loadOrgUnit";
import { OrgUnitLinkParam } from "@/features/orgUnits/types/OrgUnitLinkParam";

interface OrgUnitLayoutProps {
  children: ReactNode;
  params: Promise<OrgUnitLinkParam>;
}

// the tab shows the org unit if it is available
export const generateMetadata = async ({
  params,
}: Pick<OrgUnitLayoutProps, "params">): Promise<Metadata> => {
  const orgUnit = await loadOrgUnit((await params).orgUnitLink);

  return orgUnit ? { title: orgUnit.name } : {};
};

// everything below inside this layout is scoped to one org unit
const OrgUnitLayout = async ({ children, params }: OrgUnitLayoutProps) => {
  const { orgUnitLink } = await params;
  const initialOrgUnit = await loadOrgUnit(orgUnitLink);

  return (
    <OrgUnitProvider
      encodedOrgUnitLink={orgUnitLink}
      initialOrgUnit={initialOrgUnit}
    >
      {children}
    </OrgUnitProvider>
  );
};

export default OrgUnitLayout;
