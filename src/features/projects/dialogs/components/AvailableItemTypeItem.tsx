import { MenuItem } from "@blueprintjs/core";
import { ItemRendererProps } from "@blueprintjs/select";
import { FC } from "react";
import { AvailableItemType } from "../../../workflow/models/AvailableItemTypeModel";

interface AvailableItemTypeItemProps {
  availableItemType: AvailableItemType;
  itemRendererProps: ItemRendererProps;
}

const AvailableItemTypeItem: FC<AvailableItemTypeItemProps> = ({
  availableItemType,
  itemRendererProps,
}) => {
  const { handleClick, handleFocus, modifiers } = itemRendererProps;

  return (
    <MenuItem
      text={availableItemType.name}
      onClick={handleClick}
      onFocus={handleFocus}
      active={modifiers.active}
      disabled={modifiers.disabled}
    />
  );
};

export default AvailableItemTypeItem;
