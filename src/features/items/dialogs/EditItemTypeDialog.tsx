import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";
import { FieldValues } from "react-hook-form";
import { AppToaster } from "../../common/utils/Toaster";
import ItemTypeModel from "../models/ItemTypeModel";
import { useOrgUnit } from "../../orgUnits/hooks/useOrgUnit";
import { LinkName } from "../../links/types/LinkModel";
import LinkUtil from "../../links/LinkUtil";
import { useMatchMutate } from "../../common/utils/swr/useMutateMatch";
import ItemTypeDialog from "./ItemTypeDialog";
import { useAuthedFetch } from "../../common/security/hooks/useAuthedFetch";

const formId = "editItemTypeForm";

interface EditItemTypeDialogProps {
  editableData?: ItemTypeModel;
  handleClose: () => void;
}

const EditItemTypeDialog: FC<EditItemTypeDialogProps> = ({
  handleClose,
  editableData,
}) => {
  const { orgUnit } = useOrgUnit();
  const mutateMatch = useMatchMutate();
  const authedFetch = useAuthedFetch();

  const onSubmit = (data: FieldValues) => {
    const selfUpdateLink = LinkUtil.findLink(
      editableData,
      "self",
      LinkName.UPDATE
    );

    if (selfUpdateLink) {
      authedFetch<ItemTypeModel>(selfUpdateLink.href, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }).then(async (updatedItemType) => {
        const itemTypesReadLink = LinkUtil.findLink(
          orgUnit,
          "itemTypes",
          LinkName.READ
        );
        mutateMatch(itemTypesReadLink);

        if (updatedItemType) {
          (await AppToaster)?.show?.({
            message: "Item type " + updatedItemType.name + " was updated",
            intent: "success",
            icon: IconNames.CONFIRM,
          });
        }
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
