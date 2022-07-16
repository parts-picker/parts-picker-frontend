import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC } from "react";
import { ClickMouseEvent } from "../../common/types/ClickMouseEvent";
import LinkUtil from "../../links/LinkUtil";
import { LinkNames } from "../../links/types/LinkModel";
import ItemTypeModel from "../models/ItemTypeModel";

interface EditItemTypeButtonProps {
  currentItemType: ItemTypeModel;
  setEditData: (editData: ItemTypeModel) => void;
}

const EditItemTypeButton: FC<EditItemTypeButtonProps> = ({
  currentItemType,
  setEditData,
}) => {
  const selfLink = LinkUtil.findLink(currentItemType, "self", LinkNames.UPDATE);

  if (!selfLink) {
    return null;
  }

  const onClick = (event: ClickMouseEvent) => {
    event.stopPropagation();

    setEditData(currentItemType);
  };
  return <Button minimal icon={IconNames.EDIT} onClick={onClick} />;
};

export default EditItemTypeButton;
