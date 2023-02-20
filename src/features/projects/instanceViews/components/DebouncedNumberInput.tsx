import { NumericInput } from "@blueprintjs/core";
import { PropsWithChildren, ReactElement } from "react";
import { useDebounce } from "../../../common/forms/hooks/useDebounce";

interface DebouncedNumberInputProps<ActionAttributes> {
  action: (value: number, attributes: ActionAttributes) => void;
  actionAttributes: ActionAttributes;
  initialValue: number;
  debounceTime?: number;
  inputNumberProps?: { [key: string]: unknown };
}

const DebouncedNumberInput = <ActionAttributes,>({
  action,
  actionAttributes,
  initialValue,
  debounceTime,
  inputNumberProps,
}: PropsWithChildren<
  DebouncedNumberInputProps<ActionAttributes>
>): ReactElement => {
  const { value, setValue } = useDebounce<number, ActionAttributes>(
    action,
    actionAttributes,
    initialValue,
    debounceTime
  );

  return (
    <NumericInput
      {...inputNumberProps}
      value={value}
      onValueChange={(updatedAmount) => setValue(updatedAmount)}
    />
  );
};

export default DebouncedNumberInput;
