import { useRouter } from "next/router";
import { ReactElement, useContext } from "react";
import { ResponseModel } from "../../links/types/ResponseModel";
import DefaultLoadingSpinner from "../loading/DefaultLoadingSpinner";
import {
  GenericTableContextModel,
  TableContext,
} from "./context/GenericTableContext";

const GenericTableBody = <Content extends ResponseModel>(): ReactElement => {
  const { loading, table, tableOptions } =
    useContext<GenericTableContextModel<Content>>(TableContext);

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

export default GenericTableBody;
