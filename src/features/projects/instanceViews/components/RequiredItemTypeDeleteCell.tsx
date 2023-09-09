import { CellContext } from "@tanstack/react-table";
import { FC } from "react";
import { RequiredItemType } from "../../../workflow/models/RequiredItemTypeModel";
import DeleteButton from "../../../common/tables/subcomponents/DeleteButton";
import { DeleteRowFunction } from "../../../common/tables/hooks/useDeleteRowFunction";
import LinkUtil from "../../../links/LinkUtil";
import { LinkName } from "../../../links/types/LinkModel";

const RequiredItemTypeDeleteCell: FC<CellContext<RequiredItemType, unknown>> = (
  props
) => {
  const deleteRowAction = props.column.columnDef.meta as DeleteRowFunction;
  const deleteSelfLink = LinkUtil.findLink(
    props.row.original,
    "self",
    LinkName.DELETE
  );

  if (!deleteSelfLink) {
    return null;
  }

  return (
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
  );
};

export default RequiredItemTypeDeleteCell;
