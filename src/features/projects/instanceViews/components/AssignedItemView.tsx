import { FC } from "react";
import { AssignedItemModel } from "../../../inventory/models/AssignedItemModel";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import SortableTable from "../../../common/tables/SortableTable";
import { ALLOWED_PAGE_SIZES } from "../../../common/utils/ConfigReaderUtils";
import AssignedItemActionCell from "./AssignedItemActionCell";
import { KeyedMutator } from "swr";
import { ReadAssignedItemsResponse } from "../../../inventory/models/ReadAssignedItemsResponse";
import { PaginationParamState } from "../../../common/utils/pageQueries/usePaginationParamsState";

interface AssignedItemViewProps {
  data: ReadAssignedItemsResponse | undefined;
  loading: boolean;
  mutate: KeyedMutator<ReadAssignedItemsResponse>;
  params: PaginationParamState;
  invalidateData: () => void;
}

const AssignedItemView: FC<AssignedItemViewProps> = ({
  data,
  loading,
  mutate,
  params,
  invalidateData,
}) => {
  const assignedItems = data?._embedded?.assignedItems ?? [];

  const columnHelper = createColumnHelper<AssignedItemModel>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<AssignedItemModel, any>[] = [
    columnHelper.display({
      id: "actions",
      cell: AssignedItemActionCell,
      meta: { invalidateData: invalidateData, mutate: mutate },
    }),
    columnHelper.accessor("condition", {
      header: () => "Condition",
    }),
  ];
  return (
    <SortableTable
      columns={columns}
      data={assignedItems}
      loading={loading}
      pageControlOptions={
        !loading && data && data.page
          ? {
              ...data.page,
              setRequestedPageSize: params.setSize,
              setRequestedPageNumber: params.setPage,
              requestedSortRules: params.sort,
              setRequestedSortRules: params.setSort,
              allowedPageSizes: ALLOWED_PAGE_SIZES,
            }
          : undefined
      }
    />
  );
};

export default AssignedItemView;
