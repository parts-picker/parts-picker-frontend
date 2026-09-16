import { H1 } from "@blueprintjs/core";
import ProjectIndexClient from "./ProjectIndexClient";
import { FC } from "react";
import { redirect } from "next/navigation";
import { parsePageQueryParams } from "@/features/common/utils/pageQueries/ParsePageQueryParams";
import { PageQueryParams } from "@/features/common/types/PageQueryParams";
import { buildOrgUnitPath } from "@/features/orgUnits/util/OrgUnitRoutingUtil";
import { OrgUnitLinkParam } from "@/features/orgUnits/types/OrgUnitLinkParam";

interface ProjectIndexPageProps {
  searchParams: Promise<PageQueryParams>;
  params: Promise<OrgUnitLinkParam>;
}

const ProjectIndexPage: FC<ProjectIndexPageProps> = async ({
  searchParams,
  params,
}) => {
  const { size: sizeParam, page: pageParam } = await searchParams;

  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    sizeParam,
    pageParam
  );

  if (!valid) {
    const { orgUnitLink } = await params;
    redirect(
      `${buildOrgUnitPath(orgUnitLink)}/projects?page=${parsedPage}&size=${parsedSize}`
    );
  }

  return (
    <>
      <H1>Project Overview</H1>
      <ProjectIndexClient />
    </>
  );
};

export default ProjectIndexPage;
