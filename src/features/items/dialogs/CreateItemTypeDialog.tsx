import { IconNames } from "@blueprintjs/icons";
import { FC } from "react";
import { FieldValues } from "react-hook-form";
import { useSWRConfig } from "swr";
import ListResponse from "../../common/models/ListResponse";
import { AppToaster } from "../../common/utils/Toaster";
import { useEntryLinks } from "../../links/EntryLinksContext";
import HttpMethods from "../../links/types/HttpMethods";
import EmbeddedItemTypeModel from "../models/EmbeddedItemTypeModel";
import ItemTypeModel from "../models/ItemTypeModel";
import ItemTypeDialog from "./ItemTypeDialog";

const formId = "createItemTypeForm";

interface CreateItemTypeDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CreateItemTypeDialog: FC<CreateItemTypeDialogProps> = ({
  isOpen,
  handleClose,
}) => {
  const entryLinks = useEntryLinks();
  const { mutate } = useSWRConfig();

  const onSubmit = (data: FieldValues) => {
    const itemTypeLink = entryLinks?.itemTypes?.href;

    if (
      itemTypeLink &&
      entryLinks?.itemTypes?.methods.includes(HttpMethods.POST)
    ) {
      fetch(itemTypeLink, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json() as Promise<ItemTypeModel>)
        .then((newItemType) => {
          mutate<ListResponse<EmbeddedItemTypeModel>>(
            itemTypeLink,
            async (embeddedData) => {
              return {
                _embedded: {
                  itemTypes: [
                    ...(embeddedData?._embedded?.itemTypes || []),
                    newItemType,
                  ],
                },
                _links: embeddedData?._links || {},
              };
            },
            false
          );

          AppToaster?.show?.({
            message: "Item type " + newItemType.name + " was created",
            intent: "success",
            icon: IconNames.CONFIRM,
          });
        });
    }
    handleClose();
  };

  return (
    <ItemTypeDialog
      title="Create item type"
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={onSubmit}
      formId={formId}
    />
  );
};

export default CreateItemTypeDialog;
