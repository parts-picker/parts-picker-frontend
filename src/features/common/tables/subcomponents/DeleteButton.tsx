import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { PropsWithChildren, ReactElement, ReactNode, useState } from "react";
import ConfirmPopover from "../../components/ConfirmPopover";
import { ClickMouseEvent } from "../../types/ClickMouseEvent";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { useDeleteRowFunction } from "../hooks/useDeleteRowFunction";
import { KeyedMutator } from "swr";
import { EmbeddedModels } from "../../models/EmbeddedModels";
import LinkUtil from "../../../links/LinkUtil";
import { LinkName } from "../../../links/types/LinkModel";

interface DeleteButtonProps<ListResponse extends EmbeddedModels> {
  objectToDelete: ResponseModel;
  objectListMutate: KeyedMutator<ListResponse>;
  deleteNotification?: ReactNode;
  confirmDescription?: ReactNode;
}

const DeleteButton = <ListResponse extends EmbeddedModels>({
  objectToDelete,
  objectListMutate,
  deleteNotification,
  confirmDescription = <>Confirm delete</>,
}: PropsWithChildren<DeleteButtonProps<ListResponse>>): ReactElement | null => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const deleteRow = useDeleteRowFunction({ mutate: objectListMutate });

  const deleteSelfLink = LinkUtil.findLink(
    objectToDelete,
    "self",
    LinkName.DELETE
  );

  if (!deleteSelfLink) {
    return null;
  }

  const handleDelete = (event: ClickMouseEvent) => {
    event.stopPropagation();

    deleteRow(objectToDelete, deleteNotification);
    setConfirmOpen(false);
  };

  const handleOpen = (event: ClickMouseEvent) => {
    event.stopPropagation();

    setConfirmOpen(true);
  };

  return (
    <ConfirmPopover
      isOpen={isConfirmOpen}
      setIsOpen={setConfirmOpen}
      actionName={"Delete"}
      action={handleDelete}
      heading={"Confirm delete"}
      description={confirmDescription}
    >
      <Button variant="minimal" icon={IconNames.DELETE} onClick={handleOpen} />
    </ConfirmPopover>
  );
};

export default DeleteButton;
