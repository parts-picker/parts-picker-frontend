import { ReadRequiredItemTypesResponse } from "../../workflow/models/ReadRequiredItemTypesResponse";
import {
  EmbeddedItemTypes,
  EmbeddedItems,
} from "../../items/models/ItemEmbeddedTypes";
import { ReadProjectsResponse } from "../../projects/models/ReadProjectsResponse";

export type EmbeddedModels =
  | EmbeddedItemTypes
  | EmbeddedItems
  | ReadRequiredItemTypesResponse
  | ReadProjectsResponse;
