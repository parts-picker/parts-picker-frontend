import { NextRouter } from "next/router";
import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
import ProjectModel from "../models/ProjectModel";

export const routeToProject = (project: ProjectModel, router: NextRouter) => {
  const link = LinkUtil.findLink(project, "self", LinkName.READ);
  if (!link) {
    return;
  }

  const encodedLink = window.btoa(link.href);

  router.push({
    pathname: "/projects/[projectLink]",
    query: { projectLink: encodedLink },
  });
};
