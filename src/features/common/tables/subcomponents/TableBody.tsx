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
          <td colSpan={table.visibleColumns.length}>
            <DefaultLoadingSpinner />
          </td>
        </tr>
      );
    }

    if (table.rows.length > 0) {
      return table.rows.map((row) => {
        table.prepareRow(row);

        return (
          // eslint-disable-next-line react/jsx-key
          <tr
            {...row.getRowProps()}
            onClick={() => {
              tableOptions?.onRowClickAction?.(row, router);
            }}
          >
            {row.cells.map((cell) => (
              // eslint-disable-next-line react/jsx-key
              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
            ))}
          </tr>
        );
      });
    }

    if (tableOptions?.nonIdealState) {
      return (
        <tr>
          <td colSpan={table.visibleColumns.length}>
            {tableOptions?.nonIdealState}
          </td>
        </tr>
      );
    }
  };

  return <tbody {...table.getTableBodyProps()}>{getTableBody()}</tbody>;
};

export default TableBody;
