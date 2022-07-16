import EntryLinks from "./EntryLinksModel";
import { ResponseModel } from "./ResponseModel";

export class EntryLinksResponse implements ResponseModel {
  _links: EntryLinks;
}
