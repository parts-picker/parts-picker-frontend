import { FC } from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import SortableTable from "../../../common/tables/SortableTable";
import { ALLOWED_PAGE_SIZES } from "../../../common/utils/ConfigReaderUtils";
import { PaginationParamState } from "../../../common/utils/pageQueries/usePaginationParamsState";
import { AssignableItemModel } from "../../../inventory/models/AssignableItemModel";
import { ReadAssignableItemsResponse } from "../../../inventory/models/ReadAssignableItemsResponse";
import AssignableItemActionCell from "./AssignableItemActionCell";
import { KeyedMutator } from "swr";

interface AssignableItemViewProps {
  data: ReadAssignableItemsResponse | undefined;
  loading: boolean;
  mutate: KeyedMutator<ReadAssignableItemsResponse>;
  params: PaginationParamState;
  invalidateData: () => void;
}

const AssignableItemView: FC<AssignableItemViewProps> = ({
  data,
  loading,
  mutate,
  params,
  invalidateData,
}) => {
  const assignableItems = data?._embedded?.assignableItems ?? [];

  const columnHelper = createColumnHelper<AssignableItemModel>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<AssignableItemModel, any>[] = [
    columnHelper.accessor("condition", {
      header: () => "Condition",
    }),
    columnHelper.display({
      id: "actions",
      cell: AssignableItemActionCell,
      meta: { invalidateData: invalidateData, mutate: mutate },
    }),
  ];

  return (
    <SortableTable
      columns={columns}
      data={assignableItems}
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

export default AssignableItemView;
