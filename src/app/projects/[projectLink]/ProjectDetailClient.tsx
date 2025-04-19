"use client";

import { Button, Divider, H1, Tab, Tabs, Text } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC, useCallback } from "react";
import useSWR, { KeyedMutator } from "swr";
import DefaultLoadingSpinner from "../../../features/common/loading/DefaultLoadingSpinner";
import defaultFetcher from "../../../features/common/utils/swr/DefaultFetcher";
import LinkUtil from "../../../features/links/LinkUtil";
import { LinkName } from "../../../features/links/types/LinkModel";
import ProjectDescriptionComponent from "../../../features/projects/description/ProjectDescriptionComponent";
import PartsListView from "../../../features/projects/instanceViews/PartsListView";
import ProjectModel from "../../../features/projects/models/ProjectModel";
import InstanceStatusBar from "../../../features/workflow/InstanceStatusBar";
import { InstanceInfo } from "../../../features/workflow/models/InstanceInfoModel";
import { useParams, useRouter } from "next/navigation";

type Params = { projectLink?: string };

const ProjectDetailsClient: FC = () => {
  const router = useRouter();
  const params = useParams<Params>();
  const projectLink = params?.projectLink;

  const decodedLink = projectLink
    ? window.atob(decodeURIComponent(projectLink))
    : undefined;
  const { data: project, mutate: projectMutate } = useSWR<ProjectModel>(
    decodedLink,
    defaultFetcher
  );
  const instanceInfoLink = LinkUtil.findLink(
    project,
    "status",
    LinkName.READ
  )?.href;

  const { data: instanceInfo, mutate: instanceMutate } = useSWR<InstanceInfo>(
    instanceInfoLink,
    defaultFetcher,
    {
      refreshInterval: 5000,
      onSuccess: () => {
        projectMutate();
      },
    }
  );

  const backButtonOnClick = useCallback(() => {
    router.push("/projects");
  }, [router]);

  if (!project) {
    return <DefaultLoadingSpinner />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "1em" }}>
          <Button
            icon={IconNames.CHEVRON_LEFT}
            onClick={backButtonOnClick}
            size="large"
          />
        </div>
        <H1>Project - {project.name} </H1>
      </div>
      <Divider />

      <Text style={{ marginBottom: "1.5em" }}>
        {project.shortDescription ?? "No short description yet"}
      </Text>
      <div style={{ marginBottom: "1.5em" }}>
        <InstanceStatusBar
          instanceInfo={instanceInfo}
          instanceMutate={instanceMutate}
          optionalMutates={[projectMutate as KeyedMutator<unknown>]}
        />
      </div>
      <Tabs id="project_tabs" size="large">
        <Tab
          id={"parts_list"}
          title={"Parts List"}
          panel={<PartsListView project={project} />}
        />
        <Tab
          id={"description"}
          title={"Description"}
          panel={
            <ProjectDescriptionComponent
              project={project}
              projectMutate={projectMutate}
            />
          }
        />
      </Tabs>
    </div>
  );
};

export default ProjectDetailsClient;
