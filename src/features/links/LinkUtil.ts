import URITemplate from "urijs/src/URITemplate";
import { LinkModel, LinkNames } from "./types/LinkModel";
import { ResponseModel } from "./types/ResponseModel";

export default class LinkUtil {
  static findLink(
    responseModel: ResponseModel | undefined,
    ref: string,
    name: LinkNames
  ): LinkModel | undefined {
    if (!responseModel) {
      return undefined;
    }

    const linksForRef = responseModel._links[ref];
    if (!linksForRef) {
      return undefined;
    }

    if (Array.isArray(linksForRef)) {
      return linksForRef.find((link) => link.name === name);
    } else if (linksForRef.name === name) {
      return linksForRef;
    }

    return undefined;
  }

  static findTemplatedLink(
    responseModel: ResponseModel | undefined,
    ref: string,
    name: LinkNames
  ): URITemplate.URITemplate | null {
    const link = this.findLink(responseModel, ref, name);

    if (!link) {
      return null;
    }

    if (!link.templated) {
      throw Error("Link must be templated");
    }

    return new URITemplate(link.href);
  }

  static isLinkAvailable(
    responseModel: ResponseModel | undefined,
    ref: string,
    name: LinkNames
  ): boolean {
    return this.findLink(responseModel, ref, name) !== undefined;
  }
}
