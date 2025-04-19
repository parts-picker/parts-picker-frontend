import { OverlayToaster, Position } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";

export const AppToaster =
  typeof window !== "undefined"
    ? OverlayToaster.createAsync(
        {
          position: Position.BOTTOM_LEFT,
          maxToasts: 3,
        },
        {
          // needed because of react 18
          // see https://blueprintjs.com/docs/#core/components/toast.react-component-usage
          domRenderer: (toaster, containerElement) =>
            createRoot(containerElement).render(toaster),
        }
      )
    : null;
