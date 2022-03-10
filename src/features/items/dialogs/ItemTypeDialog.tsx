import { Button, Classes, Dialog } from "@blueprintjs/core";
import { FC } from "react";
import { FieldValues } from "react-hook-form";
import ItemTypeForm from "../forms/ItemTypeForm";
import ItemTypeModel from "../models/ItemTypeModel";

interface ItemTypeDialogProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (data: FieldValues) => void;
  formId: string;
  initialData?: ItemTypeModel;
}

const ItemTypeDialog: FC<ItemTypeDialogProps> = ({
  title,
  isOpen,
  handleClose,
  onSubmit,
  formId,
  initialData,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      canOutsideClickClose={false}
    >
      <div className={Classes.DIALOG_BODY}>
        <ItemTypeForm
          formId={formId}
          initialData={initialData}
          onSubmit={onSubmit}
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleClose}>Close</Button>
          <Button form={formId} type="submit" intent="primary">
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ItemTypeDialog;
