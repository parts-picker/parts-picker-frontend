import { LinkMap } from "./LinkMap";
import { Links } from "./LinkModel";

export default class EntryLinksModel extends LinkMap {
  orgUnitMemberships: Links;
  orgUnits: Links;
}
