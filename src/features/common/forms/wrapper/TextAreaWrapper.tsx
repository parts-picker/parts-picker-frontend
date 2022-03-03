import { FormGroup, Intent, TextArea } from "@blueprintjs/core";
import { FC } from "react";
import { useController } from "react-hook-form";

interface TextAreaWrapperProps {
  name: string;
  defaultValue?: unknown;
  label?: string;
  formGroupProps?: { [key: string]: unknown };
  intent?: Intent;
  [key: string]: unknown;
}

const TextAreaWrapper: FC<TextAreaWrapperProps> = ({
  name,
  defaultValue,
  label,
  formGroupProps,
  intent = "none",
  ...inputGroupProps
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    defaultValue: defaultValue || "",
  });

  return (
    <FormGroup
      {...formGroupProps}
      label={label}
      helperText={error?.message || ""}
      intent={invalid ? "danger" : intent}
    >
      <TextArea
        fill={true}
        {...inputGroupProps}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        inputRef={ref}
        intent={invalid ? "danger" : intent}
      />
    </FormGroup>
  );
};

export default TextAreaWrapper;
