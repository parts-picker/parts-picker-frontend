import LinkUtil from "../../../links/LinkUtil";
import { LinkName } from "../../../links/types/LinkModel";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { AppToaster } from "../../utils/Toaster";
import { IconNames } from "@blueprintjs/icons";
import { KeyedMutator } from "swr";
import { EmbeddedModels } from "../../models/EmbeddedModels";
import { ReactNode } from "react";

interface UseDeleteRowFunctionProps<DataList extends EmbeddedModels> {
  mutate: KeyedMutator<DataList>;
}

export const useDeleteRowFunction = <DataList extends EmbeddedModels>({
  mutate,
}: UseDeleteRowFunctionProps<DataList>) => {
  const deleteRow: DeleteRowFunction = (
    rowToDelete: ResponseModel,
    deleteNotification: ReactNode
  ) => {
    const deleteSelfLink = LinkUtil.findLink(
      rowToDelete,
      "self",
      LinkName.DELETE
    );

    if (!deleteSelfLink) {
      return;
    }

    const readSelfLink = LinkUtil.findLink(rowToDelete, "self", LinkName.READ);
    const createOptimisticData = readSelfLink
      ? (currentData: DataList | undefined) => {
          if (!currentData) {
            throw Error("currentData cannot be undefined");
          }

          const rows = Object.values(
            currentData._embedded
          )[0] as ResponseModel[];

          const updatedList = rows?.filter(
            (row: ResponseModel) =>
              LinkUtil.findLink(row, "self", LinkName.READ)?.href !=
              readSelfLink?.href
          );

          const embeddedPropertyName = Object.keys(currentData._embedded)[0];

          const updatedData = {
            ...currentData,
            _embedded: { [embeddedPropertyName]: updatedList },
          } as DataList;

          return updatedData;
        }
      : undefined;

    mutate(
      async () => {
        await fetch(deleteSelfLink.href, {
          method: "DELETE",
        });

        return undefined;
      },
      {
        populateCache: false,
        revalidate: true,
        optimisticData: createOptimisticData,
      }
    );

    if (deleteNotification) {
      AppToaster?.show?.({
        message: deleteNotification,
        intent: "success",
        icon: IconNames.CONFIRM,
      });
    }
  };

  return deleteRow;
};

export type DeleteRowFunction = (
  rowToDelete: ResponseModel,
  deleteNotification: ReactNode
) => void;
