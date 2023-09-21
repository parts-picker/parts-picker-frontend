import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ProjectModel implements ResponseModel {
  name: string;
  status: string;
  displayStatus: string;
  shortDescription?: string;
  description: string | null;

  _links: LinkMap;
}

export type NullableProjectModel = ProjectModel | undefined | null;
