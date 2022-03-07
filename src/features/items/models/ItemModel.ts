import { Links } from "../../links/types/Links";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ItemModel implements ResponseModel {
  condition: string;
  status: string;
  note: string;
  _links: Links;
}
