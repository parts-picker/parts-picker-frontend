import { H2, NonIdealState } from "@blueprintjs/core";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { FC } from "react";
import SortableTable from "../../common/tables/SortableTable";
import {
  requestedSortRulesToQueryParam,
  usePageQueryParams,
} from "../../common/utils/pageQueries/usePageQueryParams";
import { useSWRWithURILike } from "../../common/utils/swr/useSWRWithURILike";
import LinkUtil from "../../links/LinkUtil";
import { LinkNames } from "../../links/types/LinkModel";
import { ReadRequiredItemTypesResponse } from "../../workflow/models/ReadRequiredItemTypesResponse";
import { RequiredItemType } from "../../workflow/models/RequiredItemTypeModel";
import ProjectModel from "../models/ProjectModel";
import { IconNames } from "@blueprintjs/icons";
import RequiredItemDialog from "../dialogs/RequiredItemDialog";
import DeleteButton from "../../common/tables/subcomponents/DeleteButton";
import { useDeleteRowFunction } from "../../common/tables/hooks/useDeleteRowFunction";
import { KeyedMutator } from "swr";
import { ResponseModel } from "../../links/types/ResponseModel";
import ResponseUtil from "../../links/ResponseUtil";
import { ALLOWED_PAGE_SIZES } from "../../common/utils/ConfigReaderUtils";
import { usePageQueryValidator } from "../../common/utils/pageQueries/usePageQueryValidator";
import DebouncedNumberInput from "./components/DebouncedNumberInput";

interface ProjectPlanningViewProps {
  project: ProjectModel;
}

const ProjectPlanningView: FC<ProjectPlanningViewProps> = ({ project }) => {
  // prepare page query options & validate params
  const pageQueryOptions = {
    ...usePageQueryParams(),
    allowedPageSizes: ALLOWED_PAGE_SIZES,
  };
  usePageQueryValidator();

  const requiredItemTypeLinkTemplate = LinkUtil.findTemplatedLink(
    project,
    "assigned",
    LinkNames.READ
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
  const requiredItemTypes = data?._embedded?.requiredItemTypes || [];

  const deleteRowAction = useDeleteRowFunction({ mutate });

  const columnHelper = createColumnHelper<RequiredItemType>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<RequiredItemType, any>[] = [
    columnHelper.accessor("itemTypeName", { header: () => "Item Type Name" }),
    columnHelper.accessor("requiredAmount", {
      header: () => "Required Amount",
      cell: (value) => (
        <DebouncedNumberInput
          action={updateRequiredAmount}
          actionAttributes={{
            requiredItemTypeToUpdate: value.row.original,
            mutate: mutate,
          }}
          initialValue={value.getValue<number>()}
          inputNumberProps={{
            minorStepSize: null,
            min: 1,
          }}
        />
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => (
        <DeleteButton
          deleteAction={() =>
            deleteRowAction(
              props.row.original,
              <span>
                Item type <b>{props.row.original.itemTypeName}</b> is no longer
                required
              </span>
            )
          }
          confirmDescription={
            <span>
              Remove item type <b>{props.row.original.itemTypeName}</b> from the
              parts list?
            </span>
          }
        />
      ),
    }),
  ];

  return (
    <div>
      <H2>Parts List</H2>
      <RequiredItemDialog project={project} requiredItemTypesMutate={mutate} />
      <SortableTable
        columns={columns}
        data={requiredItemTypes}
        loading={loading}
        options={{ nonIdealState: nonIdealState }}
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

export default ProjectPlanningView;

// util
interface UpdateRequiredAmountAttributes {
  requiredItemTypeToUpdate: RequiredItemType;
  mutate: KeyedMutator<ReadRequiredItemTypesResponse>;
}

const updateRequiredAmount = (
  updateAmount: number,
  attributes: UpdateRequiredAmountAttributes
) => {
  const selfPatchLink = LinkUtil.findLink(
    attributes.requiredItemTypeToUpdate,
    "self",
    LinkNames.UPDATE
  );

  if (selfPatchLink) {
    attributes.mutate(
      async () => {
        await fetch(selfPatchLink.href, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            requiredAmount: updateAmount,
          }),
        });

        return undefined;
      },
      {
        populateCache: false,
        revalidate: true,
        optimisticData: (currentData) => {
          if (!currentData) {
            throw Error("currentData cannot be undefined");
          }

          const rows = currentData._embedded.requiredItemTypes;

          const index = rows.findIndex((row: ResponseModel) =>
            ResponseUtil.equal(
              row,
              attributes.requiredItemTypeToUpdate,
              LinkNames.UPDATE,
              "self"
            )
          );

          const updatedList = [...rows];
          const typeToUpdate = updatedList[index];
          typeToUpdate.requiredAmount = updateAmount;

          return {
            ...currentData,
            _embedded: { requiredItemTypes: updatedList },
          };
        },
      }
    );
  }
};

const nonIdealState = (
  <NonIdealState icon={IconNames.CROSS} title={"No required item types yet"} />
);
