import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ProjectModel implements ResponseModel {
  name: string;
  description?: string;
  _links: LinkMap;
}
