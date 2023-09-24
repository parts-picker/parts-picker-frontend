import { FC, useEffect, useMemo } from "react";
import SubmitDialog from "../../common/components/SubmitDialog";
import ProjectCopyForm from "./ProjectCopyForm";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { UL } from "@blueprintjs/core";

const formId = "copyProjectForm";

interface ProjectCopyDialogProps {
  open: boolean;
  close: () => void;
  onSubmit: SubmitHandler<FieldValues>;
  sourceProjectName?: string;
}

const ProjectCopyDialog: FC<ProjectCopyDialogProps> = ({
  open,
  close,
  onSubmit,
  sourceProjectName,
}) => {
  const initialData = useMemo(
    () => ({
      name: sourceProjectName + " - Copy",
    }),
    [sourceProjectName]
  );
  const methods = useForm({
    mode: "onChange",
    defaultValues: initialData,
  });

  useEffect(() => {
    methods.reset(initialData);
  }, [initialData, open, methods]);

  return (
    <SubmitDialog
      title={"Duplicate project '" + sourceProjectName + "'"}
      isOpen={open}
      handleClose={close}
      formId={formId}
      isValid={methods.formState.isValid}
    >
      <div style={{ marginBottom: "2em" }}>
        This will create a new project based on the source project with the
        same:
        <UL>
          <li>short description</li>
          <li>description</li>
          <li>required item types</li>
        </UL>
      </div>
      <ProjectCopyForm formId={formId} methods={methods} onSubmit={onSubmit} />
    </SubmitDialog>
  );
};

export default ProjectCopyDialog;
