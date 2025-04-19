import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
import ProjectModel from "../models/ProjectModel";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const routeToProject = (
  project: ProjectModel,
  router: AppRouterInstance
) => {
  const link = LinkUtil.findLink(project, "self", LinkName.READ);
  if (!link) {
    return;
  }

  const encodedLink = window.btoa(link.href);

  router.push(`/projects/${encodedLink}`);
};
