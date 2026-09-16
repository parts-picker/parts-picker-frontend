"use client";

import { Button, Divider, H1, Text } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useOrgUnit } from "@/features/orgUnits/hooks/useOrgUnit";
import { ORG_UNITS_PATH } from "@/features/orgUnits/OrgUnitConstants";

const OrgUnitDashboard: FC = () => {
  const router = useRouter();
  const { orgUnit } = useOrgUnit();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "1em", paddingBottom: "0.2em" }}>
          <Button
            icon={IconNames.CHEVRON_LEFT}
            onClick={() => router.push(ORG_UNITS_PATH)}
            size="large"
          />
        </div>
        <H1>{orgUnit.name}</H1>
      </div>
      <Divider />
      {orgUnit.shortDescription ? (
        <Text style={{ marginBottom: "1.5em" }}>
          {orgUnit.shortDescription}
        </Text>
      ) : null}
    </div>
  );
};

export default OrgUnitDashboard;
