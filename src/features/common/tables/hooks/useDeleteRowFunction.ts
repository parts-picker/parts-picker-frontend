import LinkUtil from "../../../links/LinkUtil";
import { LinkNames } from "../../../links/types/LinkModel";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { AppToaster } from "../../utils/Toaster";
import { IconNames } from "@blueprintjs/icons";
import { KeyedMutator } from "swr";
import { ListEmbeddedModels } from "../../../items/models/EmbeddedTypes";
import { ReactNode } from "react";

interface UseDeleteRowFunctionProps<Data extends ListEmbeddedModels> {
  mutate: KeyedMutator<Data>;
}

export const useDeleteRowFunction = <Data extends ListEmbeddedModels>({
  mutate,
}: UseDeleteRowFunctionProps<Data>) => {
  const deleteRow: DeleteRowFunction = (
    rowToDelete: ResponseModel,
    deleteNotification: ReactNode
  ) => {
    const deleteSelfLink = LinkUtil.findLink(
      rowToDelete,
      "self",
      LinkNames.DELETE
    );

    const readSelfLink = LinkUtil.findLink(rowToDelete, "self", LinkNames.READ);

    if (!deleteSelfLink) {
      return;
    }

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
        optimisticData: (currentData) => {
          if (!currentData) {
            throw Error("currentData cannot be undefined");
          }

          const rows = Object.values(
            currentData._embedded
          )[0] as ResponseModel[];

          const updatedList = rows?.filter(
            (row: ResponseModel) =>
              LinkUtil.findLink(row, "self", LinkNames.READ)?.href !=
              readSelfLink?.href
          );

          const embeddedPropertyName = Object.keys(currentData._embedded)[0];

          const updatedData = {
            ...currentData,
            _embedded: { [embeddedPropertyName]: updatedList },
          } as Data;

          return updatedData;
        },
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
