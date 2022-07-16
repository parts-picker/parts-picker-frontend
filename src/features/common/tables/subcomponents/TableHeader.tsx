import { ReactElement } from "react";
import { useTableContext } from "../context/TableContext";
import SortIndicator from "../util/SortIndicator";

const TableHeader = (): ReactElement => {
  const { table } = useTableContext();

  return (
    <thead>
      {table.headerGroups.map((headerGroup) => (
        // eslint-disable-next-line react/jsx-key
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((cell) => (
            // eslint-disable-next-line react/jsx-key
            <th {...cell.getHeaderProps(cell.getSortByToggleProps())}>
              {cell.render("Header")}
              {cell.canSort ? (
                <SortIndicator
                  sorted={cell.isSorted}
                  sortDesc={cell.isSortedDesc}
                />
              ) : null}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
