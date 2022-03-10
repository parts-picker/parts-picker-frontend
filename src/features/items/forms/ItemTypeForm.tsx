import { FC } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextFieldWrapper from "../../common/forms/wrapper/TextFieldWrapper";
import TextAreaWrapper from "../../common/forms/wrapper/TextAreaWrapper";
import ItemTypeModel from "../models/ItemTypeModel";

interface ItemTypeFormProps {
  formId: string;
  onSubmit: SubmitHandler<FieldValues>;
  initialData?: ItemTypeModel;
}

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

const ItemTypeForm: FC<ItemTypeFormProps> = ({
  formId,
  onSubmit,
  initialData,
}) => {
  const methods = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

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
