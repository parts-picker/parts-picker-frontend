import { FC, useCallback } from "react";
import { RequiredItemType } from "../../../workflow/models/RequiredItemTypeModel";
import AssignableItemView from "./AssignableItemView";
import AssignedItemView from "./AssignedItemView";
import { requestedSortRulesToQueryParam } from "../../../common/utils/pageQueries/usePageQueryParams";
import { usePaginationParamState } from "../../../common/utils/pageQueries/usePaginationParamsState";
import { useSWRWithURILike } from "../../../common/utils/swr/useSWRWithURILike";
import { ReadAssignedItemsResponse } from "../../../inventory/models/ReadAssignedItemsResponse";
import LinkUtil from "../../../links/LinkUtil";
import { LinkName } from "../../../links/types/LinkModel";
import { ReadAssignableItemsResponse } from "../../../inventory/models/ReadAssignableItemsResponse";

interface ProjectItemAssignerProps {
  requiredItemType: RequiredItemType;
}

const ProjectItemAssigner: FC<ProjectItemAssignerProps> = ({
  requiredItemType,
}) => {
  // assignableItems
  const assignableItemsParams = usePaginationParamState();

  const readAllAssignableLink = LinkUtil.findTemplatedLink(
    requiredItemType,
    "assignable",
    LinkName.READ
  );
  const {
    data: assignableItemsResponse,
    isLoading: assignableItemsLoading,
    mutate: assignableItemsMutate,
  } = useSWRWithURILike<ReadAssignableItemsResponse>(readAllAssignableLink, {
    size: assignableItemsParams.size.toString(),
    page: assignableItemsParams.page.toString(),
    sort: requestedSortRulesToQueryParam(assignableItemsParams.sort),
  });

  // assignedItems
  const assignedItemsParams = usePaginationParamState();
  const readAllAssignedLink = LinkUtil.findTemplatedLink(
    requiredItemType,
    "assigned",
    LinkName.READ
  );
  const {
    data: assignedItemsResponse,
    isLoading: assignedItemsLoading,
    mutate: assignedItemsMutate,
  } = useSWRWithURILike<ReadAssignedItemsResponse>(readAllAssignedLink, {
    size: assignedItemsParams.size.toString(),
    page: assignedItemsParams.page.toString(),
    sort: requestedSortRulesToQueryParam(assignedItemsParams.sort),
  });

  const assignedItemsMutateCallback = useCallback(
    () => assignedItemsMutate(),
    [assignedItemsMutate]
  );
  const assignableItemsMutateCallback = useCallback(
    () => assignableItemsMutate(),
    [assignableItemsMutate]
  );

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div>
        <b>Assignable items</b>
        <AssignableItemView
          data={assignableItemsResponse}
          loading={assignableItemsLoading}
          mutate={assignableItemsMutate}
          params={assignableItemsParams}
          invalidateData={assignedItemsMutateCallback}
        />
      </div>

      <div>
        <b>Assigned items</b>
        <AssignedItemView
          data={assignedItemsResponse}
          loading={assignedItemsLoading}
          mutate={assignedItemsMutate}
          params={assignedItemsParams}
          invalidateData={assignableItemsMutateCallback}
        />
      </div>
    </div>
  );
};

export default ProjectItemAssigner;
