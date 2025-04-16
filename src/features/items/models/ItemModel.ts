import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";
import { ItemCondition } from "./ItemConditionEnum";
import { ItemStatus } from "./ItemStatusEnum";

export default class ItemModel implements ResponseModel {
  condition: ItemCondition;
  status: ItemStatus;
  note: string;
  _links: LinkMap;
}
