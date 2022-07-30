import { Button, Classes, Dialog } from "@blueprintjs/core";
import { FC, ReactNode } from "react";

interface SubmitDialogProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  formId: string;
  isValid: boolean;
  children?: ReactNode;
}

const SubmitDialog: FC<SubmitDialogProps> = ({
  title,
  isOpen,
  handleClose,
  formId,
  isValid,
  children,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      canOutsideClickClose={false}
    >
      <div className={Classes.DIALOG_BODY}>{children}</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleClose}>Close</Button>
          <Button
            form={formId}
            type="submit"
            intent="primary"
            disabled={!isValid}
          >
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default SubmitDialog;
