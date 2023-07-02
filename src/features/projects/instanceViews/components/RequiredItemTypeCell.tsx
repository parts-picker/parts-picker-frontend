import { FC } from "react";
import { RequiredItemType } from "../../../workflow/models/RequiredItemTypeModel";
import { CellContext } from "@tanstack/react-table";
import { KeyedMutator, mutate } from "swr";
import DebouncedNumberInput from "./DebouncedNumberInput";
import ResponseUtil from "../../../links/ResponseUtil";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { LinkName } from "../../../links/types/LinkModel";
import LinkUtil from "../../../links/LinkUtil";
import { ReadRequiredItemTypesResponse } from "../../../workflow/models/ReadRequiredItemTypesResponse";

const RequiredItemTypeCell: FC<CellContext<RequiredItemType, unknown>> = (
  props
) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "0.75ch" }} className="bp4-text-large">
        {props.row.original.assignedAmount + " /"}
      </div>
      <DebouncedNumberInput
        action={updateRequiredAmount}
        actionAttributes={{
          requiredItemTypeToUpdate: props.row.original,
          mutate: mutate,
        }}
        initialValue={props.row.original.requiredAmount}
        min={Math.max(1, props.row.original.assignedAmount)}
      />
    </div>
  );
};

export default RequiredItemTypeCell;

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
    LinkName.UPDATE
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
              LinkName.UPDATE,
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
