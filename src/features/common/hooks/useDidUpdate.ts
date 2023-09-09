import { useRef, useEffect, EffectCallback } from "react";

export const useDidUpdate = (
  callback: EffectCallback,
  inputs: Array<unknown>
) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return callback();
    }
    didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...inputs]);
};
