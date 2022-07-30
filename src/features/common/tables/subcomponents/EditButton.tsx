import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { PropsWithChildren, ReactElement } from "react";
import { ClickMouseEvent } from "../../types/ClickMouseEvent";
import LinkUtil from "../../../links/LinkUtil";
import { LinkNames } from "../../../links/types/LinkModel";
import { ResponseModel } from "../../../links/types/ResponseModel";

interface EditButtonProps<Content extends ResponseModel> {
  current: Content;
  setEditData: (editData: Content | undefined) => void;
}

const EditButton = <Content extends ResponseModel>({
  current,
  setEditData,
}: PropsWithChildren<EditButtonProps<Content>>): ReactElement | null => {
  const selfLink = LinkUtil.findLink(current, "self", LinkNames.UPDATE);

  if (!selfLink) {
    return null;
  }

  const onClick = (event: ClickMouseEvent) => {
    event.stopPropagation();

    setEditData(current);
  };
  return <Button minimal icon={IconNames.EDIT} onClick={onClick} />;
};

export default EditButton;
