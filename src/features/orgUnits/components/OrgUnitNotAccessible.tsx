"use client";

import { Button, NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  ORG_UNIT_ICON,
  ORG_UNITS_PATH,
} from "@/features/orgUnits/OrgUnitConstants";

const OrgUnitNotAccessible: FC = () => {
  const router = useRouter();

  return (
    <NonIdealState
      icon={IconNames.LOCK}
      title={"No access to this org unit"}
      description={
        "The org unit does not exist or you are not a member of it anymore."
      }
      action={
        <Button
          icon={ORG_UNIT_ICON}
          text={"Show my org units"}
          onClick={() => router.push(ORG_UNITS_PATH)}
        />
      }
    />
  );
};

export default OrgUnitNotAccessible;
