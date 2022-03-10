import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";
import { FieldValues } from "react-hook-form";
import { AppToaster } from "../../common/utils/Toaster";
import HttpMethods from "../../links/types/HttpMethods";
import ItemTypeModel from "../models/ItemTypeModel";
import ItemTypeDialog from "./ItemTypeDialog";
import { useSWRConfig } from "swr";
import ListResponse from "../../common/models/ListResponse";
import EmbeddedItemTypeModel from "../models/EmbeddedItemTypeModel";
import { useEntryLinks } from "../../links/EntryLinksContext";

const formId = "editItemTypeForm";

interface EditItemTypeDialogProps {
  editableData?: ItemTypeModel;
  handleClose: () => void;
}

const EditItemTypeDialog: FC<EditItemTypeDialogProps> = ({
  handleClose,
  editableData,
}) => {
  const entryLinks = useEntryLinks();
  const { mutate } = useSWRConfig();

  const onSubmit = (data: FieldValues) => {
    const selfLink = editableData?._links?.self?.href;

    if (
      selfLink &&
      editableData?._links?.self.methods.includes(HttpMethods.PUT)
    ) {
      fetch(selfLink, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json() as Promise<ItemTypeModel>)
        .then((updatedItemType) => {
          mutate<ListResponse<EmbeddedItemTypeModel>>(
            entryLinks?.itemTypes?.href,
            async (embeddedData) => {
              const itemTypes = [...(embeddedData?._embedded.itemTypes || [])];

              const indexOfItemTypeToUpdate = itemTypes.findIndex(
                (type) => type._links.self.href === selfLink
              );
              itemTypes[indexOfItemTypeToUpdate] = updatedItemType;

              return {
                _embedded: {
                  itemTypes: itemTypes,
                },
                _links: embeddedData?._links || {},
              };
            },
            false
          );

          AppToaster?.show?.({
            message: "Item type " + updatedItemType.name + " was updated",
            intent: "success",
            icon: IconNames.CONFIRM,
          });
        });
    }
    handleClose();
  };

  return (
    <ItemTypeDialog
      title="Edit item type"
      isOpen={Boolean(editableData)}
      handleClose={handleClose}
      onSubmit={onSubmit}
      formId={formId}
      initialData={editableData}
    />
  );
};

export default EditItemTypeDialog;
