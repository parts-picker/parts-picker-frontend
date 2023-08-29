import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ProjectModel implements ResponseModel {
  name: string;
  shortDescription?: string;
  _links: LinkMap;
}

export type NullableProjectModel = ProjectModel | undefined | null;
