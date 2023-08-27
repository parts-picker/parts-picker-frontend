import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";
import { DisplayType } from "./DisplayTypeModel";
import { EdgeInfoModel } from "./EdgeInfoModel";

export class InstanceInfo implements ResponseModel {
  name: string;
  displayName: string;
  message: string;
  displayType: DisplayType;
  options?: EdgeInfoModel[];
  _links: LinkMap;
}

export type NullableInstanceInfo = InstanceInfo | undefined | null;
