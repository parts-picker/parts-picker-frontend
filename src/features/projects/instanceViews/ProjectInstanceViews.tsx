import { FC } from "react";
import DefaultLoadingSpinner from "../../common/loading/DefaultLoadingSpinner";
import { NullableInstanceInfo } from "../../workflow/models/InstanceInfoModel";
import ProjectModel, { NullableProjectModel } from "../models/ProjectModel";
import PartsListView from "./PartsListView";

interface ProjectInstanceStateProps {
  project: NullableProjectModel;
  instanceInfo: NullableInstanceInfo;
}

const getComponentForNode = (
  project: ProjectModel,
  instanceInfo: NullableInstanceInfo
) => {
  switch (instanceInfo?.name) {
    case "planning":
      return <PartsListView project={project} />;
    default:
      return null;
  }
};

const ProjectInstanceViews: FC<ProjectInstanceStateProps> = ({
  project,
  instanceInfo,
}) => {
  if (!project) {
    return <DefaultLoadingSpinner />;
  }

  return <>{getComponentForNode(project, instanceInfo)}</>;
};

export default ProjectInstanceViews;
