import { NextRouter } from "next/router";
import { Row } from "react-table";
import { ResponseModel } from "../../../links/types/ResponseModel";

export type RowClickAction<Content extends ResponseModel> = (
  row: Row<Content>,
  router: NextRouter
) => void | undefined;
