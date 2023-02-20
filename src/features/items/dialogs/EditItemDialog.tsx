import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";
import { FieldValues } from "react-hook-form";
import { useMatchMutate } from "../../common/utils/swr/useMutateMatch";
import { AppToaster } from "../../common/utils/Toaster";
import { useEntryLinks } from "../../links/hooks/useEntryLinks";
import LinkUtil from "../../links/LinkUtil";
import { LinkNames } from "../../links/types/LinkModel";
import ItemModel from "../models/ItemModel";
import ItemDialog from "./ItemDialog";
import ItemTypeModel from "../models/ItemTypeModel";
import { ItemFormMode } from "../forms/ItemFormMode";

const formId = "editItemForm";

interface EditItemDialogProps {
  editableData?: ItemModel;
  handleClose: () => void;
  targetItemType?: ItemTypeModel;
}

const EditItemDialog: FC<EditItemDialogProps> = ({
  editableData,
  handleClose,
  targetItemType,
}) => {
  const entryLinks = useEntryLinks();
  const mutateMatch = useMatchMutate();

  const onSubmit = (data: FieldValues) => {
    const selfUpdateLink = LinkUtil.findLink(
      editableData,
      "self",
      LinkNames.UPDATE
    );

    if (selfUpdateLink) {
      fetch(selfUpdateLink.href, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json() as Promise<ItemModel>)
        .then(() => {
          const itemReadLink = LinkUtil.findLink(
            entryLinks,
            "itemTypes",
            LinkNames.READ
          );

          mutateMatch(itemReadLink);

          AppToaster?.show?.({
            message: "Item of type " + targetItemType?.name + " was updated",
            intent: "success",
            icon: IconNames.CONFIRM,
          });
        });
    }
    handleClose();
  };

  const title = "Edit item of type " + targetItemType?.name;

  return (
    <ItemDialog
      title={title}
      isOpen={Boolean(editableData)}
      handleClose={handleClose}
      onSubmit={onSubmit}
      formId={formId}
      formMode={ItemFormMode.UPDATE}
      targetItemType={targetItemType}
      initialData={editableData}
    />
  );
};

export default EditItemDialog;
