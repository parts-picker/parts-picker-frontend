import React, { ReactElement } from "react";
import { TableInstance } from "react-table";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { RowClickAction } from "../types/RowClickAction";

export const TableContext = React.createContext<GenericTableContextModel<any>>( //eslint-disable-line @typescript-eslint/no-explicit-any
  {} as GenericTableContextModel<ResponseModel>
);

export interface GenericTableContextModel<Content extends ResponseModel> {
  loading: boolean;
  table: TableInstance<Content>;
  tableOptions?: TableOptions<Content>;
}

interface TableOptions<Content extends ResponseModel> {
  onRowClickAction?: RowClickAction<Content>;
  nonIdealState?: ReactElement;
}
