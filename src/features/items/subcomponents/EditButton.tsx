import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC } from "react";
import { ClickMouseEvent } from "../../common/types/ClickMouseEvent";
import HttpMethods from "../../links/types/HttpMethods";
import ItemTypeModel from "../models/ItemTypeModel";

interface EditButtonProps {
  currentItemType: ItemTypeModel;
  setEditData: (editData: ItemTypeModel) => void;
}

const EditButton: FC<EditButtonProps> = ({ currentItemType, setEditData }) => {
  if (!currentItemType._links.self.methods.includes(HttpMethods.PUT)) {
    return null;
  }

  const onClick = (event: ClickMouseEvent) => {
    event.stopPropagation();
    setEditData(currentItemType);
  };
  return <Button minimal icon={IconNames.EDIT} onClick={onClick} />;
};

export default EditButton;
