import { NumericInput } from "@blueprintjs/core";
import { PropsWithChildren, ReactElement, useEffect, useRef } from "react";
import { useDebounce } from "../../../common/forms/hooks/useDebounce";

interface DebouncedNumberInputProps<ActionAttributes> {
  action: (value: number, attributes: ActionAttributes) => void;
  actionAttributes: ActionAttributes;
  initialValue: number;
  debounceTime?: number;
  min?: number;
  max?: number;
}
/**
 * Does currently only support full numbers.
 * Min must be smaller than max.
 */
const DebouncedNumberInput = <ActionAttributes,>({
  action,
  actionAttributes,
  initialValue,
  debounceTime,
  min,
  max,
}: PropsWithChildren<
  DebouncedNumberInputProps<ActionAttributes>
>): ReactElement => {
  const { debouncedValue, value, setValue } = useDebounce<number | null>(
    initialValue,
    debounceTime
  );

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!debouncedValue || isNaN(debouncedValue)) {
      return;
    }

    // clamp values
    let clampedValue = Math.floor(debouncedValue);
    if (min != null) {
      clampedValue = Math.max(min, clampedValue);
    }

    if (max != null) {
      clampedValue = Math.min(max, clampedValue);
    }

    if (debouncedValue != clampedValue) {
      setValue(clampedValue);
    }

    action(clampedValue, actionAttributes);
  }, [debouncedValue, setValue, action, actionAttributes, min, max]);

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <NumericInput
        value={value ?? ""}
        onValueChange={(_, inputString) =>
          setValue(cleanAndParseToNumber(inputString))
        }
        selectAllOnFocus
        intent={debouncedValue != null ? "none" : "danger"}
        minorStepSize={null}
        min={min}
        max={max}
        large
      />
    </div>
  );
};

export default DebouncedNumberInput;

const cleanAndParseToNumber = (input: string) => {
  const parsedNumber = Number(input);

  if (!input || isNaN(parsedNumber)) {
    return null;
  }

  return Math.floor(parsedNumber);
};
