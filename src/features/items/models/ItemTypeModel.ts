import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ItemTypeModel implements ResponseModel {
  name: string;
  description: string;
  _links: LinkMap;
}
