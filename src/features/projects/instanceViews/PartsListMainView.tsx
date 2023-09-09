import { NonIdealState } from "@blueprintjs/core";
import { ColumnDef, Row, createColumnHelper } from "@tanstack/react-table";
import { FC } from "react";
import SortableTable from "../../common/tables/SortableTable";
import {
  requestedSortRulesToQueryParam,
  usePageQueryParams,
} from "../../common/utils/pageQueries/usePageQueryParams";
import { useSWRWithURILike } from "../../common/utils/swr/useSWRWithURILike";
import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
import { ReadRequiredItemTypesResponse } from "../../workflow/models/ReadRequiredItemTypesResponse";
import {
  NullableRequiredItemType,
  RequiredItemType,
} from "../../workflow/models/RequiredItemTypeModel";
import ProjectModel from "../models/ProjectModel";
import { IconNames } from "@blueprintjs/icons";
import RequiredItemDialog from "../dialogs/RequiredItemDialog";
import { useDeleteRowFunction } from "../../common/tables/hooks/useDeleteRowFunction";
import { ALLOWED_PAGE_SIZES } from "../../common/utils/ConfigReaderUtils";
import { usePageQueryValidator } from "../../common/utils/pageQueries/usePageQueryValidator";
import RequiredItemTypeCell from "./components/RequiredItemTypeCell";
import RequiredItemTypeDeleteCell from "./components/RequiredItemTypeDeleteCell";
import { useDidUpdate } from "../../common/hooks/useDidUpdate";

interface PartsListMainViewProps {
  project: ProjectModel;
  setDetailedRequiredItemType: (
    requiredItemType: NullableRequiredItemType
  ) => void;
}

const PartsListMainView: FC<PartsListMainViewProps> = ({
  project,
  setDetailedRequiredItemType,
}) => {
  // prepare page query options & validate params
  const pageQueryOptions = {
    ...usePageQueryParams(),
    allowedPageSizes: ALLOWED_PAGE_SIZES,
  };
  usePageQueryValidator();

  const requiredItemTypeLinkTemplate = LinkUtil.findTemplatedLink(
    project,
    "assigned",
    LinkName.READ
  );

  const { data, loading, mutate } =
    useSWRWithURILike<ReadRequiredItemTypesResponse>(
      requiredItemTypeLinkTemplate,
      {
        size: pageQueryOptions.requestedPageSize.toString(),
        page: pageQueryOptions.requestedPageNumber.toString(),
        sort: requestedSortRulesToQueryParam(
          pageQueryOptions.requestedSortRules
        ),
      }
    );
  const requiredItemTypes = data?._embedded?.requiredItemTypes ?? [];

  // reload data if project changed
  useDidUpdate(() => {
    mutate();
  }, [project]);

  const deleteRowAction = useDeleteRowFunction({ mutate });

  const columnHelper = createColumnHelper<RequiredItemType>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<RequiredItemType, any>[] = [
    columnHelper.accessor("itemTypeName", { header: () => "Item Type Name" }),
    columnHelper.display({
      id: "amount",
      header: "Amount (Assigned/Required)",
      cell: RequiredItemTypeCell,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      meta: deleteRowAction,
      cell: RequiredItemTypeDeleteCell,
    }),
  ];

  const onRowClick = (row: Row<RequiredItemType>) => {
    setDetailedRequiredItemType(row.original);
  };

  return (
    <div>
      <RequiredItemDialog project={project} requiredItemTypesMutate={mutate} />
      <SortableTable
        columns={columns}
        data={requiredItemTypes}
        loading={loading}
        options={{ nonIdealState: nonIdealState, onRowClickAction: onRowClick }}
        pageControlOptions={
          !loading && data && data.page
            ? {
                ...data.page,
                setRequestedPageSize: pageQueryOptions.setRequestedPageSize,
                setRequestedPageNumber: pageQueryOptions.setRequestedPageNumber,
                setRequestedSortRules: pageQueryOptions.setRequestedSortRules,
                requestedSortRules: pageQueryOptions.requestedSortRules,
                allowedPageSizes: pageQueryOptions.allowedPageSizes,
              }
            : undefined
        }
      />
    </div>
  );
};

export default PartsListMainView;

const nonIdealState = (
  <NonIdealState icon={IconNames.CROSS} title={"No required item types yet"} />
);
