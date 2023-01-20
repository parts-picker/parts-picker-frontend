import { H1 } from "@blueprintjs/core";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { ALLOWED_PAGE_SIZES } from "../../features/common/utils/ConfigReaderUtils";
import { parsePageQueryParams } from "../../features/common/utils/pageQueries/ParsePageQueryParams";
import { usePageQueryParams } from "../../features/common/utils/pageQueries/usePageQueryParams";
import ProjectView from "../../features/projects/ProjectListView";

const ProjectsIndex: FC = () => {
  const pageQueryOptions = usePageQueryParams();

  return (
    <div>
      <H1> Project Overview </H1>
      <ProjectView
        pageQueryOptions={{
          ...pageQueryOptions,
          allowedPageSizes: ALLOWED_PAGE_SIZES,
        }}
      />
    </div>
  );
};

export default ProjectsIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    query.size,
    query.page
  );

  if (!valid) {
    return {
      redirect: {
        permanent: false,
        destination: `/projects?page=${parsedPage}&size=${parsedSize}`,
      },
    };
  }

  return { props: {} };
};
