import { ClickMouseEvent } from "../types/ClickMouseEvent";

export const stopPropagation = (event: ClickMouseEvent) => {
  event.stopPropagation();
};
