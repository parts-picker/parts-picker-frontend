import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import SubmitDialog from "../../common/components/SubmitDialog";
import ItemForm from "../forms/ItemForm";
import { ItemCondition } from "../models/ItemConditionEnum";
import ItemModel from "../models/ItemModel";
import { ItemStatusForCreate } from "../models/ItemStatusEnum";
import ItemTypeModel from "../models/ItemTypeModel";
import { ItemFormMode } from "../forms/ItemFormMode";

interface ItemDialogProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  formId: string;
  formMode: ItemFormMode;
  onSubmit: SubmitHandler<FieldValues>;
  targetItemType?: ItemTypeModel;
  initialData?: ItemModel;
}

const fullSchema = z.object({
  status: z.nativeEnum(ItemStatusForCreate),
  condition: z.nativeEnum(ItemCondition),
  note: z.string().nullable(),
});

const updateSchema = fullSchema.omit({ status: true });

const ItemDialog: FC<ItemDialogProps> = ({
  title,
  isOpen,
  handleClose,
  formId,
  formMode,
  onSubmit,
  targetItemType,
  initialData,
}) => {
  const schema = formMode == ItemFormMode.CREATE ? fullSchema : updateSchema;

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    methods.reset(initialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, isOpen]);

  if (!targetItemType) {
    return null;
  }

  return (
    <SubmitDialog
      title={title}
      isOpen={isOpen}
      handleClose={handleClose}
      formId={formId}
      isValid={methods.formState.isValid}
    >
      <ItemForm
        formId={formId}
        formMode={formMode}
        onSubmit={onSubmit}
        methods={methods}
      />
    </SubmitDialog>
  );
};

export default ItemDialog;
