import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ItemModel implements ResponseModel {
  id: number;
  condition: string;
  status: string;
  note: string;
  _links: LinkMap;
}
