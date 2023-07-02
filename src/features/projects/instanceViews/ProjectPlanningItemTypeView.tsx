import { FC } from "react";
import {
  NullableRequiredItemType,
  RequiredItemType,
} from "../../workflow/models/RequiredItemTypeModel";
import { Button, H2 } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import ProjectItemAssigner from "./components/ProjectItemAssigner";

interface ProjectPlanningItemTypeViewProps {
  requiredItemType: RequiredItemType;
  setDetailedRequiredItemType: (link: NullableRequiredItemType) => void;
}

const ProjectPlanningItemTypeView: FC<ProjectPlanningItemTypeViewProps> = ({
  requiredItemType,
  setDetailedRequiredItemType,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <H2>Assign parts for type {requiredItemType.itemTypeName}</H2>
      <div>
        <Button
          icon={IconNames.CHEVRON_LEFT}
          onClick={() => setDetailedRequiredItemType(null)}
        />
      </div>
      <ProjectItemAssigner requiredItemType={requiredItemType} />
    </div>
  );
};

export default ProjectPlanningItemTypeView;
