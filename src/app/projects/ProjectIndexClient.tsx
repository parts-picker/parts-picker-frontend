"use client";

import { FC } from "react";
import ProjectListView from "../../features/projects/ProjectListView";
import { ALLOWED_PAGE_SIZES } from "../../features/common/utils/ConfigReaderUtils";
import { usePageQueryParamsV2 } from "../../features/common/utils/pageQueries/usePageQueryParamsV2";

const ProjectIndexClient: FC = () => {
  const pageQueryOptions = usePageQueryParamsV2();

  return (
    <ProjectListView
      pageQueryOptions={{
        ...pageQueryOptions,
        allowedPageSizes: ALLOWED_PAGE_SIZES,
      }}
    />
  );
};

export default ProjectIndexClient;
