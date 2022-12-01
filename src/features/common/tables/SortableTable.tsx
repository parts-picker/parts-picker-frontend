import { HTMLTable } from "@blueprintjs/core";
import React, { useMemo } from "react";
import { PropsWithChildren, ReactElement } from "react";
import { ResponseModel } from "../../links/types/ResponseModel";
import { TableContext } from "./context/TableContext";
import TableBody from "./subcomponents/TableBody";
import TableHeader from "./subcomponents/TableHeader";
import PaginationTableFooter from "./subcomponents/PaginationTableFooter";
import PaginationControlOptions from "./types/PaginationControlOptions";
import { RowClickAction } from "./types/RowClickAction";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  Updater,
  SortingState,
} from "@tanstack/react-table";

interface SortableTableProps<Content extends ResponseModel> {
  columns: ColumnDef<Content>[];
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
  pageControlOptions,
}: PropsWithChildren<SortableTableProps<Content>>): ReactElement => {
  const handleOnSortingChange = (updaterOrValue: Updater<SortingState>) => {
    let newSortingState;

    if (typeof updaterOrValue === "function") {
      newSortingState = updaterOrValue(
        pageControlOptions?.requestedSortRules ?? []
      );
    } else {
      newSortingState = updaterOrValue;
    }

    pageControlOptions?.setRequestedSortRules(newSortingState);
  };

  const table = useReactTable({
    columns: useMemo(() => columns, [columns]),
    data: useMemo(() => data || [], [data]),
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    state: {
      sorting: pageControlOptions?.requestedSortRules,
    },
    onSortingChange: handleOnSortingChange,
  });

  return (
    <TableContext.Provider
      value={{
        loading,
        table: table,
        tableOptions: {
          onRowClickAction: options.onRowClickAction,
          nonIdealState: options.nonIdealState,
        },
        pageOptions: pageControlOptions,
      }}
    >
      <HTMLTable
        striped={!loading}
        interactive={options?.onRowClickAction && !loading}
      >
        <TableHeader />
        <TableBody />
        <PaginationTableFooter />
      </HTMLTable>
    </TableContext.Provider>
  );
};

export default SortableTable;
