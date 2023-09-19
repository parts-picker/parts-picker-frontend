import { NumericInput } from "@blueprintjs/core";
import { FC } from "react";
import { useDebounce } from "../../../common/forms/hooks/useDebounce";
import { useDidUpdate } from "../../../common/hooks/useDidUpdate";

interface DebouncedNumberInputProps {
  action: (value: number) => void;
  initialValue: number;
  debounceTime?: number;
  min?: number;
  max?: number;
}

/**
 * Does currently only support full numbers.
 * Min must be smaller than max.
 */
const DebouncedNumberInput: FC<DebouncedNumberInputProps> = ({
  action,
  initialValue,
  debounceTime,
  min,
  max,
}) => {
  const { debouncedValue, value, setValue } = useDebounce<number | null>(
    initialValue,
    debounceTime
  );

  useDidUpdate(() => {
    if (!debouncedValue || isNaN(debouncedValue)) {
      return;
    }

    action(debouncedValue);
  }, [debouncedValue, action]);

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <NumericInput
        value={value ?? ""}
        onValueChange={(_, inputString) =>
          setValue(cleanAndParseToNumber(inputString, min ?? null, max ?? null))
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

const cleanAndParseToNumber = (
  input: string,
  min: number | null,
  max: number | null
) => {
  const parsedNumber = Number(input);

  if (!input || isNaN(parsedNumber)) {
    return null;
  }

  // clamp values
  let clampedValue = Math.floor(parsedNumber);
  if (min != null) {
    clampedValue = Math.max(min, clampedValue);
  }

  if (max != null) {
    clampedValue = Math.min(max, clampedValue);
  }

  return clampedValue;
};
