import { FC } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { ItemCondition } from "../models/ItemConditionEnum";
import ItemModel from "../models/ItemModel";
import { ItemStatus, ItemStatusForCreate } from "../models/ItemStatusEnum";
import EnumHtmlSelectWrapper from "../../common/forms/wrapper/EnumHtmlSelectWrapper";
import TextAreaWrapper from "../../common/forms/wrapper/TextAreaWrapper";
import { ItemFormMode } from "./ItemFormMode";

interface ItemFormProps {
  formMode: ItemFormMode;
  formId: string;
  onSubmit: SubmitHandler<FieldValues>;
  methods: UseFormReturn<ItemModel>;
}

const ItemForm: FC<ItemFormProps> = ({
  formMode,
  formId,
  onSubmit,
  methods,
}) => {
  const onFormSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={onFormSubmit}>
        <EnumHtmlSelectWrapper
          name="status"
          label="Status"
          valueEnum={
            formMode == ItemFormMode.CREATE ? ItemStatusForCreate : ItemStatus
          }
          disabled={formMode != ItemFormMode.CREATE}
          defaultValue={ItemStatusForCreate.IN_STOCK}
        />
        <EnumHtmlSelectWrapper
          name="condition"
          label="Condition"
          valueEnum={ItemCondition}
          defaultValue={ItemCondition.NEW}
        />
        <TextAreaWrapper name="note" label="Note" />
      </form>
    </FormProvider>
  );
};

export default ItemForm;
