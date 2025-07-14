"use client";

import { KeyedMutator } from "swr";
import ProjectModel from "../../models/ProjectModel";
import { FC } from "react";
import { EditableText, H1, Icon, Tooltip } from "@blueprintjs/core";
import LinkUtil from "../../../links/LinkUtil";
import { LinkModel, LinkName } from "../../../links/types/LinkModel";
import { AppToaster } from "../../../common/utils/Toaster";
import { IconNames } from "@blueprintjs/icons";

interface ProjectNameComponentProps {
  project: ProjectModel;
  projectMutate: KeyedMutator<ProjectModel>;
}

const ProjectNameComponent: FC<ProjectNameComponentProps> = ({
  project,
  projectMutate,
}) => {
  const selfUpdateLink = LinkUtil.findLink(project, "self", LinkName.UPDATE);

  return (
    <H1 style={{ lineHeight: "1.4" }}>
      {"Project - "}
      <EditableText
        disabled={!selfUpdateLink}
        selectAllOnFocus
        defaultValue={project.name}
        onConfirm={(value) =>
          updateProjectName(value, project.name, selfUpdateLink, projectMutate)
        }
      />
      {selfUpdateLink ? (
        <Tooltip
          content={"Project is editable."}
          placement={"right"}
          intent="success"
        >
          <Icon
            icon="edit"
            size={28}
            style={{
              paddingLeft: "0.1em",
              paddingBottom: "0.23em",
              outline: "none",
            }}
          />
        </Tooltip>
      ) : null}
    </H1>
  );
};

export default ProjectNameComponent;

// helpers
const updateProjectName = (
  updatedProjectName: string,
  currentProjectName: string,
  selfUpdateLink: LinkModel | undefined,
  projectMutate: KeyedMutator<ProjectModel>
) => {
  if (selfUpdateLink && updatedProjectName != currentProjectName) {
    projectMutate(
      async () =>
        fetch(selfUpdateLink.href, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name: updatedProjectName }),
        }).then(async (response) => {
          (await AppToaster)?.show?.({
            message: "Name of project was updated to " + updatedProjectName,
            intent: "success",
            icon: IconNames.CONFIRM,
          });

          return response.json() as Promise<ProjectModel>;
        }),
      {
        optimisticData: (currentData) => {
          const optimisticProjectData = new ProjectModel();
          Object.assign(optimisticProjectData, currentData);
          optimisticProjectData.name = updatedProjectName;

          return optimisticProjectData;
        },
        revalidate: false,
      }
    );
  }
};
