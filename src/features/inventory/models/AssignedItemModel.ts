import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";
import { InventoryItemCondition } from "./InventoryItemCondition";

export class AssignedItemModel implements ResponseModel {
  condition: InventoryItemCondition;
  _links: LinkMap;
}
