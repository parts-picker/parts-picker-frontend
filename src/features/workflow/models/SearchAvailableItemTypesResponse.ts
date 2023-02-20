import ListResponse from "../../common/models/ListResponse";
import { EmbeddedAvailableItemTypeModel } from "./EmbeddedAvailableItemTypeModel";

export type SearchAvailableItemTypesResponse =
  ListResponse<EmbeddedAvailableItemTypeModel>;
