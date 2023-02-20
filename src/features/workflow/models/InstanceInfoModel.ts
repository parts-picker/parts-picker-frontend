import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";
import { EdgeInfoModel } from "./EdgeInfoModel";

export class InstanceInfo implements ResponseModel {
  name: string;
  displayName: string;
  options?: EdgeInfoModel[];
  _links: LinkMap;
}

export type NullableInstanceInfo = InstanceInfo | undefined | null;
