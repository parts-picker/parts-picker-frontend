import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";
import { FieldValues } from "react-hook-form";
import { AppToaster } from "../../common/utils/Toaster";
import ItemTypeModel from "../models/ItemTypeModel";
import { useEntryLinks } from "../../links/hooks/useEntryLinks";
import { LinkName } from "../../links/types/LinkModel";
import LinkUtil from "../../links/LinkUtil";
import { useMatchMutate } from "../../common/utils/swr/useMutateMatch";
import ItemTypeDialog from "./ItemTypeDialog";

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
  const mutateMatch = useMatchMutate();

  const onSubmit = (data: FieldValues) => {
    const selfUpdateLink = LinkUtil.findLink(
      editableData,
      "self",
      LinkName.UPDATE
    );

    if (selfUpdateLink) {
      fetch(selfUpdateLink.href, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json() as Promise<ItemTypeModel>)
        .then(async (updatedItemType) => {
          const itemTypesReadLink = LinkUtil.findLink(
            entryLinks,
            "itemTypes",
            LinkName.READ
          );
          mutateMatch(itemTypesReadLink);

          (await AppToaster)?.show?.({
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
