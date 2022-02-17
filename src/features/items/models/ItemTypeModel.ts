import { Links } from "../../links/types/Links";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ItemTypeModel implements ResponseModel {
  name: string;
  description: string;
  _links: Links;
}
