import { useEffect, useState } from "react";

interface UseDebounceReturn<Type> {
  debouncedValue: Type;
  value: Type;
  setValue: (value: Type) => void;
}

export const useDebounce = <Type>(
  initialValue: Type,
  debounceTime = 700
): UseDebounceReturn<Type> => {
  const [value, setValue] = useState<Type>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<Type>(initialValue);

  useEffect(() => {
    if (value != debouncedValue) {
      const timer = setTimeout(() => setDebouncedValue(value), debounceTime);

      return () => clearTimeout(timer);
    }
  }, [value, debounceTime, debouncedValue]);

  return { debouncedValue, value, setValue };
};
