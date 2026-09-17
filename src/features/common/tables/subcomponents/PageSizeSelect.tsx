import { Button, MenuItem } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ItemRenderer, Select } from "@blueprintjs/select";
import { FC } from "react";

interface PageSizeSelectProps {
  allowedPageSizes: number[];
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

const PageSizeSelect: FC<PageSizeSelectProps> = ({
  allowedPageSizes,
  pageSize,
  onPageSizeChange,
}) => {
  const renderPageSize: ItemRenderer<number> = (
    size,
    { handleClick, handleFocus, modifiers }
  ) => (
    <MenuItem
      key={size}
      text={size}
      roleStructure="listoption"
      active={modifiers.active}
      selected={size === pageSize}
      onClick={handleClick}
      onFocus={handleFocus}
    />
  );

  return (
    <Select<number>
      items={allowedPageSizes}
      activeItem={pageSize}
      itemRenderer={renderPageSize}
      onItemSelect={onPageSizeChange}
      filterable={false}
      popoverProps={{ minimal: true, placement: "bottom" }}
    >
      <Button
        text={pageSize}
        endIcon={IconNames.CARET_DOWN}
        variant="minimal"
        aria-label={"Elements per page"}
      />
    </Select>
  );
};

export default PageSizeSelect;
