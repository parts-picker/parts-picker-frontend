import { FC } from "react";
import { FieldValues } from "react-hook-form";
import { useMatchMutate } from "../../common/utils/swr/useMutateMatch";
import { AppToaster } from "../../common/utils/Toaster";
import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
import { IconNames } from "@blueprintjs/icons";
import ItemModel from "../models/ItemModel";
import ItemTypeModel from "../models/ItemTypeModel";
import ItemDialog from "./ItemDialog";
import { ItemFormMode } from "../forms/ItemFormMode";
import { ItemStatus } from "../models/ItemStatusEnum";
import { ItemCondition } from "../models/ItemConditionEnum";
import { useAuthedFetch } from "../../common/security/hooks/useAuthedFetch";

const formId = "createItemForm";

const defaultItemModel: ItemModel = {
  status: ItemStatus.IN_STOCK,
  condition: ItemCondition.WRAPPED,
  note: "",
  _links: {},
};

interface CreateItemDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  targetItemType?: ItemTypeModel;
}

const CreateItemDialog: FC<CreateItemDialogProps> = ({
  isOpen,
  handleClose,
  targetItemType,
}) => {
  const mutateMatch = useMatchMutate();
  const authedFetch = useAuthedFetch();

  const onSubmit = (data: FieldValues) => {
    const itemCreateLink = LinkUtil.findLink(
      targetItemType,
      "describes",
      LinkName.CREATE
    );

    if (itemCreateLink) {
      authedFetch<ItemModel>(itemCreateLink.href, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }).then(async () => {
        // invalidate all pages
        const itemReadLink = LinkUtil.findLink(
          targetItemType,
          "describes",
          LinkName.READ
        );
        mutateMatch(itemReadLink);

        (await AppToaster)?.show?.({
          message: "Item for type " + targetItemType?.name + " was created",
          intent: "success",
          icon: IconNames.CONFIRM,
        });
      });
    }
    handleClose();
  };

  const title = "Create item of type " + targetItemType?.name;

  return (
    <ItemDialog
      title={title}
      isOpen={isOpen}
      handleClose={handleClose}
      formId={formId}
      formMode={ItemFormMode.CREATE}
      onSubmit={onSubmit}
      targetItemType={targetItemType}
      initialData={defaultItemModel}
    />
  );
};

export default CreateItemDialog;
