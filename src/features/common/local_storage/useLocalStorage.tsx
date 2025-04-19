"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = <Type,>(
  key: string,
  fallbackValue: Type
): [Type, Dispatch<SetStateAction<Type>>] => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key) ?? "" + fallbackValue) as Type
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue, key]);

  return [value, setValue];
};
