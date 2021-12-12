import LinkModel from "../../common/models/LinkModel";

export default class ItemModel {
  id: number;
  condition: string;
  status: string;
  note: string;
  _links: { [key: string]: LinkModel };
}
