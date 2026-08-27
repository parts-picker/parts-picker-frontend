import { CellContext } from "@tanstack/react-table";
import { SortableTableFeatures } from "../../../common/tables/TableFeatures";
import { FC } from "react";
import { AssignableItemModel } from "../../../inventory/models/AssignableItemModel";
import { Button } from "@blueprintjs/core";
import { KeyedMutator } from "swr";
import { ReadAssignableItemsResponse } from "../../../inventory/models/ReadAssignableItemsResponse";
import LinkUtil from "../../../links/LinkUtil";
import { LinkName } from "../../../links/types/LinkModel";
import { AuthedFetch } from "../../../common/utils/swr/DefaultFetcher";
import { useAuthedFetch } from "../../../common/security/hooks/useAuthedFetch";

const AssignableItemActionCell: FC<
  CellContext<SortableTableFeatures, AssignableItemModel, unknown>
> = (props) => {
  const authedFetch = useAuthedFetch();
  const itemPatchLink = LinkUtil.findLink(
    props.row.original,
    "assignedTo",
    LinkName.UPDATE
  );

  const columnMeta = props.column.columnDef
    .meta as AssignableItemActionCellMeta;

  return itemPatchLink ? (
    <Button
      minimal
      icon={"chevron-right"}
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

export default AssignableItemActionCell;

export type AssignableItemActionCellMeta = {
  invalidateData: () => void;
  mutate: KeyedMutator<ReadAssignableItemsResponse>;
};

const onClick = (
  patchLink: string,
  mutate: KeyedMutator<ReadAssignableItemsResponse>,
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
