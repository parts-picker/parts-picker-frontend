import { Links } from "../../links/types/Links";
import { ResponseModel } from "../../links/types/ResponseModel";

export default class ListResponse<ResponseType> implements ResponseModel {
  _links: Links;
  _embedded: ResponseType;
}
