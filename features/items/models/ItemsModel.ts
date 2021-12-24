import LinkModel from "../../links/models/LinkModel";

export default class ItemsModel {
  _embeddable: [];
  _links: { [key: string]: LinkModel };
}
