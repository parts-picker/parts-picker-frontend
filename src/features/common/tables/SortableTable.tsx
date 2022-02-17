import { HTMLTable } from "@blueprintjs/core";
import React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Column, useSortBy, useTable } from "react-table";
import { ResponseModel } from "../../links/types/ResponseModel";
import { TableContext } from "./context/GenericTableContext";
import GenericTableBody from "./GenericTableBody";
import GenericTableHeader from "./GenericTableHeader";
import { RowClickAction } from "./types/RowClickAction";

interface SortableTableProps<Content extends ResponseModel> {
  columns: Column<Content>[];
  data: Readonly<Array<Content> | undefined>;
  loading?: boolean;
  options?: {
    onRowClickAction?: RowClickAction<Content>;
    nonIdealState?: ReactElement;
  };
}

const SortableTable = <Content extends ResponseModel>({
  columns,
  data,
  loading = false,
  options = {
    onRowClickAction: undefined,
    nonIdealState: undefined,
  },
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
      }}
    >
      <HTMLTable
        striped={!loading}
        interactive={options?.onRowClickAction && !loading}
        {...table.getTableProps()}
      >
        <GenericTableHeader />
        <GenericTableBody />
      </HTMLTable>
    </TableContext.Provider>
  );
};

export default SortableTable;
