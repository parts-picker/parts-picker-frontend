import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { PropsWithChildren, ReactElement } from "react";
import { ClickMouseEvent } from "../../types/ClickMouseEvent";
import LinkUtil from "../../../links/LinkUtil";
import { LinkName } from "../../../links/types/LinkModel";
import { ResponseModel } from "../../../links/types/ResponseModel";

interface EditButtonProps<Content extends ResponseModel> {
  currentData: Content;
  setEditData: (editData: Content | undefined) => void;
}

const EditButton = <Content extends ResponseModel>({
  currentData,
  setEditData,
}: PropsWithChildren<EditButtonProps<Content>>): ReactElement | null => {
  const selfLink = LinkUtil.findLink(currentData, "self", LinkName.UPDATE);

  if (!selfLink) {
    return null;
  }

  const onClick = (event: ClickMouseEvent) => {
    event.stopPropagation();

    setEditData(currentData);
  };
  return <Button minimal icon={IconNames.EDIT} onClick={onClick} />;
};

export default EditButton;
