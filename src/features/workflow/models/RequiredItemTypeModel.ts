import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export class RequiredItemType implements ResponseModel {
  itemTypeName: string;
  assignedAmount: number;
  requiredAmount: number;
  _links: LinkMap;
}

export type NullableRequiredItemType = RequiredItemType | null;
