import { LinkMap } from "@/features/links/types/LinkMap";
import { ResponseModel } from "@/features/links/types/ResponseModel";
import UserModel from "@/features/users/models/UserModel";

export default class OrgUnitModel implements ResponseModel {
  name: string;
  shortDescription: string | null;
  owner: UserModel;
  createdBy: UserModel;
  createdOn: string;
  _links: LinkMap;
}
