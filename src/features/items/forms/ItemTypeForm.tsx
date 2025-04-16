import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import TextFieldWrapper from "../../common/forms/wrapper/TextFieldWrapper";
import TextAreaWrapper from "../../common/forms/wrapper/TextAreaWrapper";

interface ItemTypeFormProps<T extends FieldValues> {
  formId: string;
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
}

const ItemTypeForm = <T extends FieldValues>({
  formId,
  onSubmit,
  methods,
}: ItemTypeFormProps<T>) => {
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
