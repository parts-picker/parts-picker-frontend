import { Button, Classes, H5, Popover } from "@blueprintjs/core";
import { FC, ReactNode } from "react";
import { ClickMouseEvent } from "../types/ClickMouseEvent";

interface ConfirmPopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionName?: string;
  action: (event: ClickMouseEvent) => void;
  heading: string;
  description?: ReactNode;
}

const ConfirmPopover: FC<ConfirmPopoverProps> = ({
  children,
  isOpen,
  setIsOpen,
  actionName = "Confirm",
  action,
  heading,
  description,
}) => {
  const handleClose = () => setIsOpen(false);

  const handleAction = (event: ClickMouseEvent) => {
    action(event);
    handleClose();
  };

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <Popover
        isOpen={isOpen}
        onClose={handleClose}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        placement={"top-end"}
        content={
          <>
            <H5>{heading}</H5>
            {description}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 15,
              }}
            >
              <Button
                style={{ marginRight: 10 }}
                className={Classes.POPOVER_DISMISS}
                text="Cancel"
                onClick={handleClose}
              />
              <Button
                className={Classes.POPOVER_DISMISS}
                intent={"danger"}
                text={actionName}
                onClick={handleAction}
              />
            </div>
          </>
        }
      >
        {children}
      </Popover>
    </div>
  );
};

export default ConfirmPopover;
