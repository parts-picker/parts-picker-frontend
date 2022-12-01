import { Icon, IconName } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { SortDirection } from "@tanstack/react-table";
import { FC } from "react";

interface SortIndicatorProps {
  sorted: false | SortDirection;
  ascIcon?: IconName;
  descIcon?: IconName;
}

const SortIndicator: FC<SortIndicatorProps> = ({
  sorted,
  ascIcon = IconNames.SORT_ASC,
  descIcon = IconNames.SORT_DESC,
}: SortIndicatorProps) => {
  switch (sorted) {
    case "desc":
      return <Icon icon={descIcon} />;
    case "asc":
      return <Icon icon={ascIcon} />;
    default:
      return null;
  }
};

export default SortIndicator;
