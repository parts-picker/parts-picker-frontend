import EmbeddedModel from "./EmbeddedModel";
import ItemTypeModel from "./ItemTypeModel";

export default class EmbeddedItemTypeModel
  implements EmbeddedModel<ItemTypeModel>
{
  itemTypes: ItemTypeModel[];
}
