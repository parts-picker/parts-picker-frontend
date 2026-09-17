import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC } from "react";

const OrgUnitFetchFailed: FC = () => (
  <NonIdealState
    icon={IconNames.ERROR}
    title={"Org unit could not be loaded"}
    description={"Please try again later."}
  />
);

export default OrgUnitFetchFailed;
