import { Position, Toaster } from "@blueprintjs/core";

export const AppToaster =
  typeof window !== "undefined"
    ? Toaster.create({
        position: Position.BOTTOM_LEFT,
        maxToasts: 3,
      })
    : null;
