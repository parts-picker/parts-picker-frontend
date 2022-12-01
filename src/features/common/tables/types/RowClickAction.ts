import { Row } from "@tanstack/react-table";
import { NextRouter } from "next/router";
import { ResponseModel } from "../../../links/types/ResponseModel";

export type RowClickAction<Content extends ResponseModel> = (
  row: Row<Content>,
  router: NextRouter
) => void | undefined;
