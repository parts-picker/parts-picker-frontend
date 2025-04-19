"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import SubmitDialog from "../../common/components/SubmitDialog";
import ItemTypeForm from "../forms/ItemTypeForm";
import ItemTypeModel from "../models/ItemTypeModel";

interface ItemTypeDialogProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  formId: string;
  onSubmit: (data: FieldValues) => void;
  initialData?: ItemTypeModel;
}

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

const ItemTypeDialog: FC<ItemTypeDialogProps> = ({
  title,
  isOpen,
  handleClose,
  formId,
  onSubmit,
  initialData,
}) => {
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    methods.reset(initialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, isOpen]);

  return (
    <SubmitDialog
      title={title}
      isOpen={isOpen}
      handleClose={handleClose}
      formId={formId}
      isValid={methods.formState.isValid}
    >
      <ItemTypeForm formId={formId} onSubmit={onSubmit} methods={methods} />
    </SubmitDialog>
  );
};

export default ItemTypeDialog;
