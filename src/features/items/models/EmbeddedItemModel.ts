import EmbeddedModel from "./EmbeddedModel";
import ItemModel from "./ItemModel";
import ItemTypeModel from "./ItemTypeModel";

export default class EmbeddedItemModel implements EmbeddedModel<ItemTypeModel> {
  items: ItemModel[];
}
