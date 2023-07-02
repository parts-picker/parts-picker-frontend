import LinkUtil from "./LinkUtil";
import { LinkName } from "./types/LinkModel";
import { ResponseModel } from "./types/ResponseModel";

export default class ResponseUtil {
  static equal(
    first: ResponseModel,
    second: ResponseModel,
    name: LinkName,
    ref: string
  ): boolean {
    return (
      LinkUtil.findLink(first, ref, name)?.href ==
      LinkUtil.findLink(second, ref, name)?.href
    );
  }
}
