import { FC } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import TextFieldWrapper from "../../common/forms/wrapper/TextFieldWrapper";

interface ProjectCopyFormProps {
  formId: string;
  onSubmit: SubmitHandler<FieldValues>;
  methods: UseFormReturn<ProjectCopyValues>;
}

const ProjectCopyForm: FC<ProjectCopyFormProps> = ({
  formId,
  methods,
  onSubmit,
}) => {
  const onFormSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={onFormSubmit}>
        <TextFieldWrapper name="name" label="Copied project name" />
      </form>
    </FormProvider>
  );
};

export default ProjectCopyForm;

type ProjectCopyValues = {
  name: string;
};
