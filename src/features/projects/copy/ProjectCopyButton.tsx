"use client";

import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC, useCallback, useMemo, useState } from "react";
import ProjectCopyDialog from "./ProjectCopyDialog";
import ProjectModel from "../models/ProjectModel";
import { ClickMouseEvent } from "../../common/types/ClickMouseEvent";
import { stopPropagation } from "../../common/utils/PropagationUtils";
import { KeyedMutator } from "swr";
import { ReadProjectsResponse } from "../models/ReadProjectsResponse";
import { FieldValues } from "react-hook-form";
import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
import { AppToaster } from "../../common/utils/Toaster";
import { routeToProject } from "../util/ProjectRoutingUtil";
import { useRouter } from "next/navigation";
import { useAuthedFetch } from "../../common/security/hooks/useAuthedFetch";
import { useOrgUnit } from "../../orgUnits/hooks/useOrgUnit";

interface ProjectCopyButtonProps {
  sourceProject: ProjectModel;
  mutate: KeyedMutator<ReadProjectsResponse>;
}

const ProjectCopyButton: FC<ProjectCopyButtonProps> = ({
  sourceProject,
  mutate,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { orgUnitPath } = useOrgUnit();
  const authedFetch = useAuthedFetch();

  const handleOnClick = (event: ClickMouseEvent) => {
    event.stopPropagation();

    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const copyLink = useMemo(
    () => LinkUtil.findLink(sourceProject, "copies", LinkName.CREATE),
    [sourceProject]
  );

  const onSubmit = useCallback(
    (data: FieldValues) => {
      if (copyLink) {
        authedFetch<ProjectModel>(copyLink.href, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        }).then(async (project) => {
          mutate();

          if (project) {
            routeToProject(project, orgUnitPath, router);

            (await AppToaster)?.show?.({
              message:
                "Project '" +
                sourceProject.name +
                "' was successfully duplicated",
              intent: "success",
              icon: IconNames.CONFIRM,
            });
          }
        });
      }

      closeDialog();
    },
    [mutate, sourceProject.name, copyLink, router, authedFetch, orgUnitPath]
  );

  if (!copyLink) {
    return null;
  }

  return (
    <div onClick={stopPropagation}>
      <Button
        variant="minimal"
        icon={IconNames.DUPLICATE}
        onClick={handleOnClick}
      />
      <ProjectCopyDialog
        open={open}
        close={closeDialog}
        onSubmit={onSubmit}
        sourceProjectName={sourceProject.name}
      />
    </div>
  );
};

export default ProjectCopyButton;
