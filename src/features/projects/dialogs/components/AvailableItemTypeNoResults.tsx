import { Icon, MenuItem } from "@blueprintjs/core";
import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";
import Link from "next/link";

interface AvailableItemTypeNoResultsProps {
  searchQueryName: string;
}

const AvailableItemNoResults: FC<AvailableItemTypeNoResultsProps> = ({
  searchQueryName,
}) => {
  let text;
  if (searchQueryName) {
    text = "No available item types found with name '" + searchQueryName + "'";
  } else {
    text = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>All available item types are already assigned</span>
        <Link href="/item-types" legacyBehavior>
          <a>
            You may create new ones in the item inventory{" "}
            <Icon icon={IconNames.BOX} />
          </a>
        </Link>
      </div>
    );
  }

  return <MenuItem text={text} key={"no-items"} disabled />;
};

export default AvailableItemNoResults;
