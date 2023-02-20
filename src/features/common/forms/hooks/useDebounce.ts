import { useEffect, useState } from "react";

interface UseDebounceReturn<Type> {
  value: Type | undefined;
  setValue: (value: Type) => void;
}

export const useDebounce = <Type, ActionAttributes>(
  action: (value: Type, attributes: ActionAttributes) => void,
  actionAttributes: ActionAttributes,
  initialValue: Type,
  debounceTime = 700
): UseDebounceReturn<Type> => {
  const [value, setValue] = useState<Type>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<Type>(value);

  useEffect(() => {
    if (value != initialValue) {
      const timer = setTimeout(() => setDebouncedValue(value), debounceTime);

      return () => clearTimeout(timer);
    }
  }, [value, debounceTime, initialValue]);

  useEffect(() => {
    if (debouncedValue && debouncedValue != initialValue) {
      action(value, actionAttributes);
    }
  }, [debouncedValue, initialValue, value, action, actionAttributes]);

  return { value, setValue };
};
