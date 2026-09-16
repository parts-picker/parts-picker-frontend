import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
import ProjectModel from "../models/ProjectModel";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { encodeLinkBase64Url } from "../../links/LinkEncoding";

export const routeToProject = (
  project: ProjectModel,
  orgUnitPath: string,
  router: AppRouterInstance
) => {
  const link = LinkUtil.findLink(project, "self", LinkName.READ);
  if (!link) {
    return;
  }

  router.push(`${orgUnitPath}/projects/${encodeLinkBase64Url(link.href)}`);
};
