import { Row } from "@tanstack/react-table";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type RowClickAction<Content extends ResponseModel> = (
  row: Row<Content>,
  router: AppRouterInstance
) => void | undefined;
