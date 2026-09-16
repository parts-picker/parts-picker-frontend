import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { encodeLinkBase64Url } from "@/features/links/LinkEncoding";
import LinkUtil from "@/features/links/LinkUtil";
import { LinkName } from "@/features/links/types/LinkModel";
import OrgUnitMembershipModel from "@/features/orgUnits/models/OrgUnitMembershipModel";
import OrgUnitModel from "@/features/orgUnits/models/OrgUnitModel";
import { ORG_UNITS_PATH } from "@/features/orgUnits/OrgUnitConstants";

export const buildOrgUnitPath = (encodedOrgUnitLink: string) =>
  `${ORG_UNITS_PATH}/${encodedOrgUnitLink}`;

export const routeToOrgUnit = (
  orgUnit: OrgUnitMembershipModel | OrgUnitModel,
  router: AppRouterInstance
) => {
  const link = LinkUtil.findLink(orgUnit, "self", LinkName.READ);
  if (!link) {
    return;
  }

  router.push(buildOrgUnitPath(encodeLinkBase64Url(link.href)));
};
