import ListResponse from "../../common/models/ListResponse";
import { EmbeddedAssignableItemModel } from "./EmbeddedAssignableItemModel";

export type ReadAssignableItemsResponse =
  ListResponse<EmbeddedAssignableItemModel>;
