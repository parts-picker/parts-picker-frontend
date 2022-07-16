import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC, ReactNode, useState } from "react";
import ConfirmPopover from "../../components/ConfirmPopover";
import { ClickMouseEvent } from "../../types/ClickMouseEvent";

interface DeleteButtonProps {
  deleteAction: () => void;
  confirmDescription?: ReactNode;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  deleteAction,
  confirmDescription = <>Confirm delete</>,
}) => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = (event: ClickMouseEvent) => {
    event.stopPropagation();

    deleteAction();
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
      <Button minimal icon={IconNames.DELETE} onClick={handleOpen} />
    </ConfirmPopover>
  );
};

export default DeleteButton;
