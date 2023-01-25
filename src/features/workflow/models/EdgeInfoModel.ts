import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export class EdgeInfoModel implements ResponseModel {
  name: string;
  displayName: string;
  _links: LinkMap;
}
