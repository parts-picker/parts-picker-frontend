import { Button, IconName } from "@blueprintjs/core";
import { FC } from "react";
import { useTableContext } from "../context/TableContext";

interface PageButtonProps {
  targetPageNumber: number;
  visible?: boolean;
  icon?: IconName;
  buttonProps?: { [key: string]: string };
}

const PageButton: FC<PageButtonProps> = ({
  targetPageNumber,
  visible = true,
  icon,
  buttonProps,
}) => {
  const { pageOptions } = useTableContext();

  if (!visible || !pageOptions) {
    return null;
  }

  if (targetPageNumber < 0) {
    throw Error("targetPageNumber must be positive");
  }

  if (targetPageNumber >= pageOptions.totalPages) {
    return null;
  }

  const isPrimary = targetPageNumber === pageOptions?.number;

  const handleClick = () => {
    pageOptions?.setRequestedPageNumber?.(targetPageNumber);
  };

  return (
    <Button
      {...buttonProps}
      text={!icon ? targetPageNumber + 1 : undefined}
      small
      intent={isPrimary ? "primary" : undefined}
      icon={icon}
      minimal
      onClick={!isPrimary ? handleClick : undefined}
      style={isPrimary ? { pointerEvents: "none" } : undefined}
    />
  );
};

export default PageButton;
