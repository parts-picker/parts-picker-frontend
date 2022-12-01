import ListResponse from "../../common/models/ListResponse";
import { EmbeddedItemModel } from "./EmbeddedItemModel";
import { EmbeddedItemTypeModel } from "./EmbeddedItemTypeModel";

export type EmbeddedItemTypes = ListResponse<EmbeddedItemTypeModel>;

export type EmbeddedItems = ListResponse<EmbeddedItemModel>;

export type ListEmbeddedModels = EmbeddedItemTypes | EmbeddedItems;
