import { Button, Divider, H1 } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/utils/swr/DefaultFetcher";
import ProjectModel from "../../features/projects/models/ProjectModel";
import { IconNames } from "@blueprintjs/icons";
import DefaultLoadingSpinner from "../../features/common/loading/DefaultLoadingSpinner";

const ProjectDetails: FC = () => {
  const router = useRouter();

  const { projectLink } = router.query as { projectLink: string };
  const decodedLink = projectLink ? window.atob(projectLink) : undefined;
  const { data: project } = useSWR<ProjectModel>(decodedLink, defaultFetcher);

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
      {project.description || ""}
    </div>
  );
};

export default ProjectDetails;
