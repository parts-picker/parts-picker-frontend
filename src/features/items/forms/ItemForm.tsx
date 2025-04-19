import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { ItemCondition } from "../models/ItemConditionEnum";
import { ItemStatus, ItemStatusForCreate } from "../models/ItemStatusEnum";
import EnumHtmlSelectWrapper from "../../common/forms/wrapper/EnumHtmlSelectWrapper";
import TextAreaWrapper from "../../common/forms/wrapper/TextAreaWrapper";
import { ItemFormMode } from "./ItemFormMode";

interface ItemFormProps<T extends FieldValues> {
  formMode: ItemFormMode;
  formId: string;
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
}

const ItemForm = <T extends FieldValues>({
  formMode,
  formId,
  onSubmit,
  methods,
}: ItemFormProps<T>) => {
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
