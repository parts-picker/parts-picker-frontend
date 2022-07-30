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

interface ItemDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  formId: string;
  onSubmit: SubmitHandler<FieldValues>;
  targetItemType?: ItemTypeModel;
  initialData?: ItemModel;
}

const schema = z.object({
  status: z.nativeEnum(ItemStatusForCreate),
  condition: z.nativeEnum(ItemCondition),
  note: z.string().nullable(),
});

const ItemDialog: FC<ItemDialogProps> = ({
  isOpen,
  handleClose,
  formId,
  onSubmit,
  targetItemType,
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

  if (!targetItemType) {
    return null;
  }

  return (
    <SubmitDialog
      title={
        "Create item" +
        (targetItemType?.name ? " for type " + targetItemType?.name : "")
      }
      isOpen={isOpen}
      handleClose={handleClose}
      formId={formId}
      isValid={methods.formState.isValid}
    >
      <ItemForm formId={formId} onSubmit={onSubmit} methods={methods} />
    </SubmitDialog>
  );
};

export default ItemDialog;
