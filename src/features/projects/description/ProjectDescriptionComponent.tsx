import { FC, useEffect, useState } from "react";
import ReactMarkdownWrapper from "./ReactMarkdownWrapper";
import { Button, ButtonGroup, TextArea } from "@blueprintjs/core";
import ProjectModel from "../models/ProjectModel";
import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
import { AppToaster } from "../../common/utils/Toaster";
import { IconNames } from "@blueprintjs/icons";
import { KeyedMutator } from "swr";

interface ProjectDescriptionComponentProps {
  project: ProjectModel;
  projectMutate: KeyedMutator<ProjectModel>;
}

const ProjectDescriptionComponent: FC<ProjectDescriptionComponentProps> = ({
  project,
  projectMutate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(project.description);

  useEffect(() => {
    if (!isEditing) {
      setDescription(project.description);
    }
  }, [isEditing, project.description]);

  const selfUpdateLink = LinkUtil.findLink(project, "self", LinkName.UPDATE);

  const updateDescription = () => {
    setIsEditing(false);

    if (selfUpdateLink) {
      projectMutate(
        async () =>
          fetch(selfUpdateLink.href, {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ description: description }),
          }).then((response) => {
            AppToaster?.show?.({
              message:
                "Description of project " + project.name + " was updated",
              intent: "success",
              icon: IconNames.CONFIRM,
            });

            return response.json() as Promise<ProjectModel>;
          }),
        {
          optimisticData: (currentData) => {
            const optimisticProjectData = new ProjectModel();
            Object.assign(optimisticProjectData, currentData);
            optimisticProjectData.description = description;

            return optimisticProjectData;
          },
          revalidate: false,
        }
      );
    }
  };

  const abortEditing = () => {
    setIsEditing(false);
    setDescription(project.description);
  };

  if (!isEditing || !selfUpdateLink) {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "1" }}>
          <ReactMarkdownWrapper
            text={description}
            placeHolder="No description yet 😕"
          />
        </div>
        {selfUpdateLink ? (
          <div style={{ marginLeft: "1em" }}>
            <Button
              style={{ top: 0, position: "sticky" }}
              icon={IconNames.EDIT}
              large
              onClick={() => setIsEditing(true)}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: "1" }}>
        <TextArea
          value={description ?? ""}
          placeholder="Write a description with markdown.."
          onChange={(event) => setDescription(event.target.value)}
          fill
          autoFocus
          growVertically
        />
      </div>

      <div>
        <ButtonGroup
          vertical
          style={{
            marginLeft: "1em",
            top: 0,
            position: "sticky",
          }}
        >
          <Button icon={IconNames.CROSS} size="large" onClick={abortEditing} />
          <Button
            icon={IconNames.CONFIRM}
            size="large"
            intent="success"
            onClick={updateDescription}
            disabled={project.description == description}
          />
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProjectDescriptionComponent;
