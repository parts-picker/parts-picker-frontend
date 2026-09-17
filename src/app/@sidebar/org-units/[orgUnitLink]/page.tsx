import { IconNames } from "@blueprintjs/icons";
import Sidebar from "@/features/common/layout/Sidebar";
import { NavLink } from "@/features/common/layout/NavLink";
import { OrgUnitLinkParam } from "@/features/orgUnits/types/OrgUnitLinkParam";
import { buildOrgUnitPath } from "@/features/orgUnits/util/OrgUnitRoutingUtil";

interface OrgUnitSidebarPageProps {
  params: Promise<OrgUnitLinkParam>;
}

// the sidebar slot for an org unit
const OrgUnitSidebarPage = async ({ params }: OrgUnitSidebarPageProps) => {
  const { orgUnitLink } = await params;
  const orgUnitPath = buildOrgUnitPath(orgUnitLink);

  const navLinks: NavLink[] = [
    {
      href: orgUnitPath,
      text: "Dashboard",
      icon: IconNames.TIMELINE_AREA_CHART,
    },
    {
      href: `${orgUnitPath}/projects`,
      text: "Project Overview",
      icon: IconNames.CLIPBOARD,
    },
    {
      href: `${orgUnitPath}/item-types`,
      text: "Item Inventory",
      icon: IconNames.BOX,
    },
  ];

  return <Sidebar navLinks={navLinks} />;
};

export default OrgUnitSidebarPage;
