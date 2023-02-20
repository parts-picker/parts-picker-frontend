import { ReadRequiredItemTypesResponse } from "../../workflow/models/ReadRequiredItemTypesResponse";
import {
  EmbeddedItemTypes,
  EmbeddedItems,
} from "../../items/models/ItemEmbeddedTypes";

export type EmbeddedModels =
  | EmbeddedItemTypes
  | EmbeddedItems
  | ReadRequiredItemTypesResponse;
