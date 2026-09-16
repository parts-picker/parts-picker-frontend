import { LinkMap } from "@/features/links/types/LinkMap";
import { ResponseModel } from "@/features/links/types/ResponseModel";
import { AccessLevel } from "./AccessLevel";
import OrgUnitSummaryModel from "./OrgUnitSummaryModel";

export default class OrgUnitMembershipModel implements ResponseModel {
  orgUnit: OrgUnitSummaryModel;
  accessLevel: AccessLevel;
  joinedOn: string;
  _links: LinkMap;
}
