import { Button, Divider, H1, Text } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/utils/swr/DefaultFetcher";
import ProjectModel from "../../features/projects/models/ProjectModel";
import { IconNames } from "@blueprintjs/icons";
import DefaultLoadingSpinner from "../../features/common/loading/DefaultLoadingSpinner";
import InstanceStatusBar from "../../features/workflow/InstanceStatusBar";
import { InstanceInfoModel } from "../../features/workflow/models/InstanceInfoModel";
import LinkUtil from "../../features/links/LinkUtil";
import { LinkNames } from "../../features/links/types/LinkModel";

const ProjectDetails: FC = () => {
  const router = useRouter();

  const { projectLink } = router.query as { projectLink: string };
  const decodedLink = projectLink ? window.atob(projectLink) : undefined;
  const { data: project } = useSWR<ProjectModel>(decodedLink, defaultFetcher);

  const instanceInfoLink = LinkUtil.findLink(
    project,
    "status",
    LinkNames.READ
  )?.href;
  const { data: instanceInfo, mutate } = useSWR<InstanceInfoModel>(
    instanceInfoLink,
    defaultFetcher,
    { refreshInterval: 5000 }
  );

  const backButtonOnClick = useCallback(() => {
    router.push({ pathname: "/projects" });
  }, [router]);

  if (!project) {
    return <DefaultLoadingSpinner />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <H1>Project - {project.name} </H1>
      <div>
        <Button icon={IconNames.CHEVRON_LEFT} onClick={backButtonOnClick} />
      </div>
      <Divider />
      <span>Description</span>
      <Text title="Description">
        {project.description || "No description yet"}
      </Text>
      <Divider />
      <InstanceStatusBar instanceInfo={instanceInfo} mutate={mutate} />
    </div>
  );
};

export default ProjectDetails;
