import { FC } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import TextFieldWrapper from "../../common/forms/wrapper/TextFieldWrapper";
import TextAreaWrapper from "../../common/forms/wrapper/TextAreaWrapper";
import ItemTypeModel from "../models/ItemTypeModel";

interface ItemTypeFormProps {
  formId: string;
  onSubmit: SubmitHandler<FieldValues>;
  methods: UseFormReturn<ItemTypeModel>;
}

const ItemTypeForm: FC<ItemTypeFormProps> = ({ formId, onSubmit, methods }) => {
  const onFormSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={onFormSubmit}>
        <TextFieldWrapper name="name" label="Name" />
        <TextAreaWrapper name="description" label="Description" />
      </form>
    </FormProvider>
  );
};

export default ItemTypeForm;
