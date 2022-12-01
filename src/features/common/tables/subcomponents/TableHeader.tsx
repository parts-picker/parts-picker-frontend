import { ReactElement } from "react";
import { useTableContext } from "../context/TableContext";
import SortIndicator from "../util/SortIndicator";
import { flexRender } from "@tanstack/react-table";

const TableHeader = (): ReactElement => {
  const { table } = useTableContext();

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder ? null : (
                <div
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ userSelect: "none" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <SortIndicator sorted={header.column.getIsSorted()} />
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
