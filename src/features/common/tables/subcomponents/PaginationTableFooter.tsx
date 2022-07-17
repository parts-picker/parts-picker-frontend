import { HTMLSelect } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC, useMemo } from "react";
import { range } from "../../utils/ArrayUtils";
import { useTableContext } from "../context/TableContext";
import PageButton from "./PageButton";
import PageButtonOverflow from "./PageButtonOverflow";

const PaginationTableFooter: FC = () => {
  const { table, pageOptions } = useTableContext();

  const pageNumbers = useMemo(
    () =>
      generatePageNumbersToShow(pageOptions?.number, pageOptions?.totalPages),
    [pageOptions?.number, pageOptions?.totalPages]
  );

  if (!pageOptions) {
    return null;
  }

  const handleSetSize = (valueAsNumber: number) => {
    pageOptions.setRequestedPageSize(valueAsNumber);
  };

  const pageSizeValues = pageOptions.allowedPageSizes;

  return (
    <tfoot>
      <tr>
        <td colSpan={table.visibleColumns.length}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PageButton
              targetPageNumber={pageOptions.number - 1}
              icon={IconNames.CHEVRON_LEFT}
              visible={pageOptions.number > 0}
            />
            {pageNumbers.map((targetNumber) => {
              if (Array.isArray(targetNumber)) {
                if (targetNumber.length === 0) {
                  return undefined;
                }

                return (
                  <PageButtonOverflow
                    key={`overflow-for-${targetNumber}`}
                    targetPageNumbers={targetNumber}
                  />
                );
              } else {
                return (
                  <PageButton
                    key={`page-button-for-${targetNumber}`}
                    targetPageNumber={targetNumber}
                  />
                );
              }
            })}
            <PageButton
              targetPageNumber={pageOptions.number + 1}
              icon={IconNames.CHEVRON_RIGHT}
              visible={pageOptions.number < pageOptions.totalPages - 1}
            />
            Elements per page:
            <HTMLSelect
              options={pageSizeValues}
              value={pageOptions.size}
              onChange={(event) => handleSetSize(Number(event.target.value))}
            />
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default PaginationTableFooter;

// helper function
const generatePageNumbersToShow = (
  currentPageNumber?: number,
  totalPages?: number,
  siblings = 2
): (number | number[])[] => {
  if ((!currentPageNumber && currentPageNumber !== 0) || !totalPages) {
    return [];
  }

  const maxAountOfButtons = 2 * siblings + 1;

  // case: less pages than max amount of page buttons
  if (maxAountOfButtons >= totalPages) {
    return range(0, totalPages);
  }

  const leftSiblingIndex = Math.max(1, currentPageNumber - siblings);
  const rightSiblingIndex = Math.min(
    totalPages - 2,
    currentPageNumber + siblings
  );

  return [
    0,
    range(1, leftSiblingIndex),
    ...range(leftSiblingIndex, rightSiblingIndex + 1),
    range(rightSiblingIndex + 1, totalPages - 1),
    totalPages - 1,
  ];
};
