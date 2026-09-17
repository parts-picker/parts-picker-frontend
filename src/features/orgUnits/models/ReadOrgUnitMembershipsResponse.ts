import ListResponse from "@/features/common/models/ListResponse";
import { EmbeddedOrgUnitMembershipModel } from "./EmbeddedOrgUnitMembershipModel";

export type ReadOrgUnitMembershipsResponse =
  ListResponse<EmbeddedOrgUnitMembershipModel>;
