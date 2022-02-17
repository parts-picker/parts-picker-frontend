import { Icon, IconName } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC } from "react";

interface SortIndicatorProps {
  sorted: boolean;
  sortDesc: boolean | undefined;
  ascIcon?: IconName;
  descIcon?: IconName;
}

const SortIndicator: FC<SortIndicatorProps> = ({
  sorted,
  sortDesc,
  ascIcon = IconNames.ARROW_DOWN,
  descIcon = IconNames.ARROW_UP,
}: SortIndicatorProps) => {
  if (!sorted) {
    return null;
  }

  return sortDesc ? <Icon icon={descIcon} /> : <Icon icon={ascIcon} />;
};

export default SortIndicator;
