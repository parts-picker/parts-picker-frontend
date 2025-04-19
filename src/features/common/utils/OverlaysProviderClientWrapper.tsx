"use client";

import { OverlaysProvider } from "@blueprintjs/core";
import { FC, ReactNode } from "react";

interface OverlaysProviderClientWrapperProps {
  children: ReactNode;
}

const OverlaysProviderClientWrapper: FC<OverlaysProviderClientWrapperProps> = ({
  children,
}) => {
  return <OverlaysProvider>{children}</OverlaysProvider>;
};

export default OverlaysProviderClientWrapper;
