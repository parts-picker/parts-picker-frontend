import { H1 } from "@blueprintjs/core";
import ProjectIndexClient from "./ProjectIndexClient";
import { FC } from "react";
import { redirect } from "next/navigation";
import { parsePageQueryParams } from "../../features/common/utils/pageQueries/ParsePageQueryParams";
import { PageQueryParams } from "../../features/common/types/PageQueryParams";

interface ProjectIndexPageProps {
  searchParams: Promise<PageQueryParams>;
}

const ProjectIndexPage: FC<ProjectIndexPageProps> = async ({
  searchParams,
}) => {
  const { size: sizeParam, page: pageParam } = await searchParams;

  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    sizeParam,
    pageParam
  );

  if (!valid) {
    redirect(`/projects?page=${parsedPage}&size=${parsedSize}`);
  }

  return (
    <>
      <H1>Project Overview</H1>
      <ProjectIndexClient />
    </>
  );
};

export default ProjectIndexPage;
