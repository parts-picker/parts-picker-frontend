import { FC } from "react";
import {
  NullableRequiredItemType,
  RequiredItemType,
} from "../../workflow/models/RequiredItemTypeModel";
import { Button, H2 } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import ProjectItemAssigner from "./components/ProjectItemAssigner";

interface PartsListItemTypeViewProps {
  requiredItemType: RequiredItemType;
  setDetailedRequiredItemType: (
    requiredItemType: NullableRequiredItemType
  ) => void;
}

const PartsListItemTypeView: FC<PartsListItemTypeViewProps> = ({
  requiredItemType,
  setDetailedRequiredItemType,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "1em" }}>
          <Button
            icon={IconNames.CHEVRON_LEFT}
            onClick={() => setDetailedRequiredItemType(null)}
          />
        </div>
        <H2>Assign parts for type {requiredItemType.itemTypeName}</H2>
      </div>
      <ProjectItemAssigner requiredItemType={requiredItemType} />
    </div>
  );
};

export default PartsListItemTypeView;
