import { ReactElement, useContext } from "react";
import { ResponseModel } from "../../links/types/ResponseModel";
import {
  GenericTableContextModel,
  TableContext,
} from "./context/GenericTableContext";
import SortIndicator from "./util/SortIndicator";

const GenericTableHeader = <Content extends ResponseModel>(): ReactElement => {
  const { table } = useContext<GenericTableContextModel<Content>>(TableContext);

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

export default GenericTableHeader;
