import { Button, Classes, Popover } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC, useState } from "react";
import PageButton from "./PageButton";

interface PageButtonOverflowProps {
  targetPageNumbers: number[];
}

const PageButtonOverflow: FC<PageButtonOverflowProps> = ({
  targetPageNumbers,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!targetPageNumbers || targetPageNumbers.length === 0) {
    return null;
  }

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      placement={"bottom"}
      content={
        <div
          className={Classes.POPOVER_CONTENT}
          style={{ marginLeft: "0.25em", marginRight: "0.25em" }}
        >
          {targetPageNumbers.map((targetNumber) => (
            <PageButton
              key={`overflow-button-for-${targetNumber}`}
              targetPageNumber={targetNumber}
            />
          ))}
        </div>
      }
    >
      <Button minimal icon={IconNames.MORE} onClick={handleOpen} />
    </Popover>
  );
};

export default PageButtonOverflow;
