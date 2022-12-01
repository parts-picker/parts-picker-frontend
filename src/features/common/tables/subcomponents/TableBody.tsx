import { flexRender } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import DefaultLoadingSpinner from "../../loading/DefaultLoadingSpinner";
import { useTableContext } from "../context/TableContext";

const TableBody = (): ReactElement => {
  const { loading, table, tableOptions } = useTableContext();

  const router = useRouter();

  const getTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={table.getAllColumns().length}>
            <DefaultLoadingSpinner />
          </td>
        </tr>
      );
    }

    if (table.getRowModel().rows.length > 0) {
      return table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          onClick={() => {
            tableOptions?.onRowClickAction?.(row, router);
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ));
    }

    if (tableOptions?.nonIdealState) {
      return (
        <tr>
          <td colSpan={table.getAllColumns().length}>
            {tableOptions?.nonIdealState}
          </td>
        </tr>
      );
    }

    return null;
  };

  return <tbody>{getTableBody()}</tbody>;
};

export default TableBody;
