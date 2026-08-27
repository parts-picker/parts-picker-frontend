import { ReactTable } from "@tanstack/react-table";
import { SortableTableFeatures } from "../TableFeatures";
import React, { ReactElement, useContext } from "react";
import { ResponseModel } from "../../../links/types/ResponseModel";
import PaginationControlOptions from "../types/PaginationControlOptions";
import { RowClickAction } from "../types/RowClickAction";

export const TableContext = React.createContext<TableContextModel<any>>(
  {} as TableContextModel<ResponseModel>
);

export interface TableContextModel<Content extends ResponseModel> {
  loading: boolean;
  table: ReactTable<SortableTableFeatures, Content>;
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
