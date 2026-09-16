"use client";

import { FocusStyleManager } from "@blueprintjs/core";
import { FC, ReactNode, useEffect } from "react";

interface FocusStyleClientWrapperProps {
  children: ReactNode;
}

// configures focus rings to only be shown for keyboard navigation, not after mouse clicks
const FocusStyleClientWrapper: FC<FocusStyleClientWrapperProps> = ({
  children,
}) => {
  useEffect(() => {
    FocusStyleManager.onlyShowFocusOnTabs();
  }, []);

  return children;
};

export default FocusStyleClientWrapper;
