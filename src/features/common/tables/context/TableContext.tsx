import { Table } from "@tanstack/react-table";
import React, { ReactElement, useContext } from "react";
import { ResponseModel } from "../../../links/types/ResponseModel";
import PaginationControlOptions from "../types/PaginationControlOptions";
import { RowClickAction } from "../types/RowClickAction";

export const TableContext = React.createContext<TableContextModel<any>>( //eslint-disable-line @typescript-eslint/no-explicit-any
  {} as TableContextModel<ResponseModel>
);

export interface TableContextModel<Content extends ResponseModel> {
  loading: boolean;
  table: Table<Content>;
  tableOptions?: TableOptions<Content>;
  pageOptions?: PaginationControlOptions;
}

interface TableOptions<Content extends ResponseModel> {
  onRowClickAction?: RowClickAction<Content>;
  nonIdealState?: ReactElement;
}

export const useTableContext = <Content extends ResponseModel>() => {
  return useContext<TableContextModel<Content>>(TableContext);
};
