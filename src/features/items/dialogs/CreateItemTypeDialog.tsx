"use client";

import { IconNames } from "@blueprintjs/icons";
import { FC } from "react";
import { FieldValues } from "react-hook-form";
import { useMatchMutate } from "../../common/utils/swr/useMutateMatch";
import { AppToaster } from "../../common/utils/Toaster";
import { useEntryLinks } from "../../links/hooks/useEntryLinks";
import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
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
  const mutateMatch = useMatchMutate();

  const onSubmit = (data: FieldValues) => {
    const itemTypeCreateLink = LinkUtil.findLink(
      entryLinks,
      "itemTypes",
      LinkName.CREATE
    );

    if (itemTypeCreateLink) {
      fetch(itemTypeCreateLink.href, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json() as Promise<ItemTypeModel>)
        .then(async (newItemType) => {
          // invalidate all pages
          const itemTypesREADLink = LinkUtil.findLink(
            entryLinks,
            "itemTypes",
            LinkName.READ
          );
          mutateMatch(itemTypesREADLink);

          (await AppToaster)?.show?.({
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
      formId={formId}
      onSubmit={onSubmit}
    />
  );
};

export default CreateItemTypeDialog;
