import { CellContext } from "@tanstack/react-table";
import { FC } from "react";
import { RequiredItemType } from "../../../workflow/models/RequiredItemTypeModel";
import DeleteButton from "../../../common/tables/subcomponents/DeleteButton";
import { KeyedMutator } from "swr";
import { ReadRequiredItemTypesResponse } from "../../../workflow/models/ReadRequiredItemTypesResponse";

const RequiredItemTypeDeleteCell: FC<CellContext<RequiredItemType, unknown>> = (
  props
) => {
  const mutate = props.column.columnDef
    .meta as KeyedMutator<ReadRequiredItemTypesResponse>;

  return (
    <DeleteButton
      objectToDelete={props.row.original}
      objectListMutate={mutate}
      deleteNotification={
        <span>
          Item type <b>{props.row.original.itemTypeName}</b> is no longer
          required
        </span>
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
