import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export class AvailableItemType implements ResponseModel {
  name: string;
  _links: LinkMap;
}

export type NullableAvailableItemType = AvailableItemType | null;
