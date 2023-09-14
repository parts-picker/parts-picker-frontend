import { FormGroup, HTMLSelect, Intent } from "@blueprintjs/core";
import { FC } from "react";
import { useController } from "react-hook-form";

interface HtmlSelectWrapperProps {
  name: string;
  values: string[];
  defaultValue?: string;
  label?: string;
  formGroupProps?: { [key: string]: unknown };
  intent?: Intent;
  disabled?: boolean;
  [key: string]: unknown;
}

const HtmlSelectWrapper: FC<HtmlSelectWrapperProps> = ({
  name,
  values,
  defaultValue,
  label,
  formGroupProps,
  intent,
  disabled = false,
  ...inputGroupProps
}) => {
  if (values.length < 1) {
    throw new Error("Values cannot be empty but was " + values.toString());
  }

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    defaultValue: defaultValue || values[0],
  });

  return (
    <FormGroup
      {...formGroupProps}
      label={label}
      helperText={error?.message || ""}
      intent={invalid ? "danger" : intent}
    >
      <HTMLSelect
        {...inputGroupProps}
        options={values}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        disabled={disabled}
      />
    </FormGroup>
  );
};

export default HtmlSelectWrapper;
