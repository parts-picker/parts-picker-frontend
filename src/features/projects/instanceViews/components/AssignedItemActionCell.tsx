import { Button } from "@blueprintjs/core";
import { CellContext } from "@tanstack/react-table";
import { SortableTableFeatures } from "../../../common/tables/TableFeatures";
import { FC } from "react";
import { KeyedMutator } from "swr";
import { AssignedItemModel } from "../../../inventory/models/AssignedItemModel";
import { ReadAssignedItemsResponse } from "../../../inventory/models/ReadAssignedItemsResponse";
import LinkUtil from "../../../links/LinkUtil";
import { LinkName } from "../../../links/types/LinkModel";
import { AuthedFetch } from "../../../common/utils/swr/DefaultFetcher";
import { useAuthedFetch } from "../../../common/security/hooks/useAuthedFetch";

const AssignedItemActionCell: FC<
  CellContext<SortableTableFeatures, AssignedItemModel, unknown>
> = (props) => {
  const authedFetch = useAuthedFetch();
  const itemPatchLink = LinkUtil.findLink(
    props.row.original,
    "assignedTo",
    LinkName.UPDATE
  );

  const columnMeta = props.column.columnDef.meta as AssignedItemActionCellMeta;

  return itemPatchLink ? (
    <Button
      variant="minimal"
      icon={"chevron-left"}
      onClick={() =>
        onClick(
          itemPatchLink.href,
          columnMeta.mutate,
          columnMeta.invalidateData,
          authedFetch
        )
      }
    />
  ) : null;
};

export default AssignedItemActionCell;

export type AssignedItemActionCellMeta = {
  invalidateData: () => void;
  mutate: KeyedMutator<ReadAssignedItemsResponse>;
};

const onClick = (
  patchLink: string,
  mutate: KeyedMutator<ReadAssignedItemsResponse>,
  invalidateData: () => void,
  authedFetch: AuthedFetch
) => {
  mutate(
    async () => {
      await authedFetch(patchLink, { method: "PATCH" });
      invalidateData();

      return undefined;
    },
    { populateCache: false, revalidate: true }
  );
};
