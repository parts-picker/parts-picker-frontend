import { Button } from "@blueprintjs/core";
import { CellContext } from "@tanstack/react-table";
import { FC } from "react";
import { KeyedMutator } from "swr";
import { AssignedItemModel } from "../../../inventory/models/AssignedItemModel";
import { ReadAssignedItemsResponse } from "../../../inventory/models/ReadAssignedItemsResponse";
import LinkUtil from "../../../links/LinkUtil";
import { LinkName } from "../../../links/types/LinkModel";

const AssignedItemActionCell: FC<CellContext<AssignedItemModel, unknown>> = (
  props
) => {
  const itemPatchLink = LinkUtil.findLink(
    props.row.original,
    "assignedTo",
    LinkName.UPDATE
  );

  const columnMeta = props.column.columnDef.meta as AssignedItemActionCellMeta;

  return itemPatchLink ? (
    <Button
      minimal
      icon={"chevron-left"}
      onClick={() =>
        onClick(
          itemPatchLink.href,
          columnMeta.mutate,
          columnMeta.invalidateData
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
  invalidateData: () => void
) => {
  mutate(
    async () => {
      await fetch(patchLink, { method: "PATCH" });
      invalidateData();

      return undefined;
    },
    { populateCache: false, revalidate: true }
  );
};
