import { Button, H4, H5 } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";
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
      <Popover2
        isOpen={isOpen}
        onClose={handleClose}
        popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
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
                className={Classes.POPOVER2_DISMISS}
                text="Cancel"
                onClick={handleClose}
              />
              <Button
                className={Classes.POPOVER2_DISMISS}
                intent={"danger"}
                text={actionName}
                onClick={handleAction}
              />
            </div>
          </>
        }
      >
        {children}
      </Popover2>
    </div>
  );
};

export default ConfirmPopover;
