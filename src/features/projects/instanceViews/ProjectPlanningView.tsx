import { FC, useState } from "react";
import ProjectModel from "../models/ProjectModel";
import ProjectPlanningMainView from "./ProjectPlanningMainView";
import { NullableRequiredItemType } from "../../workflow/models/RequiredItemTypeModel";
import ProjectPlanningItemTypeView from "./ProjectPlanningItemTypeView";

interface ProjectPlanningViewProps {
  project: ProjectModel;
}

const ProjectPlanningView: FC<ProjectPlanningViewProps> = ({ project }) => {
  const [detailedRequiredItemType, setDetailedRequiredItemType] =
    useState<NullableRequiredItemType>(null);
  return (
    <>
      {detailedRequiredItemType ? (
        <ProjectPlanningItemTypeView
          requiredItemType={detailedRequiredItemType}
          setDetailedRequiredItemType={setDetailedRequiredItemType}
        />
      ) : (
        <ProjectPlanningMainView
          project={project}
          setDetailedRequiredItemType={setDetailedRequiredItemType}
        />
      )}
    </>
  );
};

export default ProjectPlanningView;
