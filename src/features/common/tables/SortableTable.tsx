import { HTMLTable } from "@blueprintjs/core";
import React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Column, useSortBy, useTable } from "react-table";
import { ResponseModel } from "../../links/types/ResponseModel";
import { TableContext } from "./context/TableContext";
import TableBody from "./subcomponents/TableBody";
import TableHeader from "./subcomponents/TableHeader";
import PaginationTableFooter from "./subcomponents/PaginationTableFooter";
import PaginationControlOptions from "./types/PaginationControlOptions";
import { RowClickAction } from "./types/RowClickAction";

interface SortableTableProps<Content extends ResponseModel> {
  columns: Column<Content>[];
  data: Content[] | undefined;
  loading?: boolean;
  options?: {
    onRowClickAction?: RowClickAction<Content>;
    nonIdealState?: ReactElement;
  };
  pageControlOptions?: PaginationControlOptions;
}

const SortableTable = <Content extends ResponseModel>({
  columns,
  data,
  loading = false,
  options = {
    onRowClickAction: undefined,
    nonIdealState: undefined,
  },
  pageControlOptions: pageOptions,
}: PropsWithChildren<SortableTableProps<Content>>): ReactElement => {
  const table = useTable(
    {
      columns: React.useMemo(() => columns, [columns]),
      data: React.useMemo(() => data || [], [data]),
    },
    useSortBy
  );

  return (
    <TableContext.Provider
      value={{
        loading,
        table: table,
        tableOptions: {
          onRowClickAction: options.onRowClickAction,
          nonIdealState: options.nonIdealState,
        },
        pageOptions: pageOptions,
      }}
    >
      <HTMLTable
        striped={!loading}
        interactive={options?.onRowClickAction && !loading}
        {...table.getTableProps()}
      >
        <TableHeader />
        <TableBody />
        <PaginationTableFooter />
      </HTMLTable>
    </TableContext.Provider>
  );
};

export default SortableTable;
