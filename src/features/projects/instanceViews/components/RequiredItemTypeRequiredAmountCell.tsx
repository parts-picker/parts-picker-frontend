import { FC, useCallback } from "react";
import { RequiredItemType } from "../../../workflow/models/RequiredItemTypeModel";
import { CellContext } from "@tanstack/react-table";
import { KeyedMutator } from "swr";
import DebouncedNumberInput from "./DebouncedNumberInput";
import ResponseUtil from "../../../links/ResponseUtil";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { LinkName } from "../../../links/types/LinkModel";
import LinkUtil from "../../../links/LinkUtil";
import { ReadRequiredItemTypesResponse } from "../../../workflow/models/ReadRequiredItemTypesResponse";
import { Classes } from "@blueprintjs/core";

const RequiredItemTypeRequiredAmountCell: FC<
  CellContext<RequiredItemType, unknown>
> = (props) => {
  const mutate = props.column.columnDef
    .meta as KeyedMutator<ReadRequiredItemTypesResponse>;

  const memoizedUpdateRequiredAmount = useCallback(
    (updateAmount: number) => {
      const selfPatchLink = LinkUtil.findLink(
        props.row.original,
        "self",
        LinkName.UPDATE
      );

      if (selfPatchLink) {
        mutate(
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
                  props.row.original,
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
    },
    [props.row.original, mutate]
  );

  const selfPatchLink = LinkUtil.findLink(
    props.row.original,
    "self",
    LinkName.UPDATE
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "0.75ch" }} className={Classes.TEXT_LARGE}>
        {props.row.original.assignedAmount +
          " / " +
          (selfPatchLink ? "" : props.row.original.requiredAmount)}
      </div>

      {selfPatchLink ? (
        <DebouncedNumberInput
          action={memoizedUpdateRequiredAmount}
          initialValue={props.row.original.requiredAmount}
          min={Math.max(1, props.row.original.assignedAmount)}
        />
      ) : null}
    </div>
  );
};

export default RequiredItemTypeRequiredAmountCell;
