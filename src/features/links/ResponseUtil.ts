import LinkUtil from "./LinkUtil";
import { LinkNames } from "./types/LinkModel";
import { ResponseModel } from "./types/ResponseModel";

export default class ResponseUtil {
  static equal(
    first: ResponseModel,
    second: ResponseModel,
    name: LinkNames,
    ref: string
  ): boolean {
    return (
      LinkUtil.findLink(first, ref, name)?.href ==
      LinkUtil.findLink(second, ref, name)?.href
    );
  }
}
