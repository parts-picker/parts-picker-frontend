import { LinkMap } from "../../links/types/LinkMap";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ListResponse<ResponseType> implements ResponseModel {
  _links: LinkMap;
  _embedded: ResponseType;
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
