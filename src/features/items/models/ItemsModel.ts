import { Links } from "../../links/types/Links";
import { ResponseModel } from "../../links/types/ResponseModel";
import ItemModel from "./ItemModel";

export default class ItemsModel implements ResponseModel {
  _embedded: { items: ItemModel[] };
  _links: Links;
}
