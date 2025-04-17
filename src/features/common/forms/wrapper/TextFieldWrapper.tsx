import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { FC } from "react";
import { useController } from "react-hook-form";

interface TextFieldWrapperProps {
  name: string;
  defaultValue?: unknown;
  label?: string;
  formGroupProps?: { [key: string]: unknown };
  intent?: Intent;
  [key: string]: unknown;
}

const TextFieldWrapper: FC<TextFieldWrapperProps> = ({
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
    defaultValue: defaultValue ?? "",
  });

  return (
    <FormGroup
      {...formGroupProps}
      label={label}
      helperText={error?.message ?? ""}
      intent={invalid ? "danger" : intent}
    >
      <InputGroup
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

export default TextFieldWrapper;
