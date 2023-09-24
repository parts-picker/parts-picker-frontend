import { NonIdealState } from "@blueprintjs/core";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table";
import { FC } from "react";
import URITemplate from "urijs/src/URITemplate";
import PaginationQueryOptions from "../common/tables/types/PaginationQueryOptions";
import { requestedSortRulesToQueryParam } from "../common/utils/pageQueries/usePageQueryParams";
import { useSWRWithURILike } from "../common/utils/swr/useSWRWithURILike";
import { useEntryLinkFor } from "../links/hooks/useEntryLinkFor";
import { LinkName } from "../links/types/LinkModel";
import ProjectModel from "./models/ProjectModel";
import { ReadProjectsResponse } from "./models/ReadProjectsResponse";
import { IconNames } from "@blueprintjs/icons";
import SortableTable from "../common/tables/SortableTable";
import { NextRouter } from "next/router";
import DeleteButton from "../common/tables/subcomponents/DeleteButton";
import ProjectCopyButton from "./copy/ProjectCopyButton";
import { routeToProject } from "./util/ProjectRoutingUtil";

interface ProjectViewProps {
  pageQueryOptions: PaginationQueryOptions;
}

const ProjectListView: FC<ProjectViewProps> = ({ pageQueryOptions }) => {
  const projectReadLink = useEntryLinkFor(LinkName.READ, "projects");
  const projectReadLinkTemplate = projectReadLink
    ? new URITemplate(projectReadLink.href)
    : undefined;

  const { data, loading, mutate } = useSWRWithURILike<ReadProjectsResponse>(
    projectReadLinkTemplate,
    {
      size: pageQueryOptions.requestedPageSize.toString(),
      page: pageQueryOptions.requestedPageNumber.toString(),
      sort: requestedSortRulesToQueryParam(pageQueryOptions.requestedSortRules),
    }
  );
  const projects = data?._embedded?.projects ?? new Array<ProjectModel>();

  const projectsColumnHelper = createColumnHelper<ProjectModel>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<ProjectModel, any>[] = [
    projectsColumnHelper.accessor("name", { header: () => "Name" }),
    projectsColumnHelper.accessor((row) => row.displayStatus, {
      id: "workflowInstance.currentNode.displayName",
      header: () => "Status",
    }),
    projectsColumnHelper.accessor("shortDescription", {
      header: () => "Short description",
    }),
    projectsColumnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => (
        <div style={{ display: "flex", columnGap: "0.25em" }}>
          <ProjectCopyButton
            sourceProject={props.row.original}
            mutate={mutate}
          />
          <DeleteButton
            objectToDelete={props.row.original}
            objectListMutate={mutate}
            confirmDescription={
              <span>
                Delete project <b>{props.row.original.name}</b>?
              </span>
            }
          />
        </div>
      ),
    }),
  ];

  const rowClickAction = (row: Row<ProjectModel>, router: NextRouter) => {
    routeToProject(row.original, router);
  };

  const nonIdealState = (
    <NonIdealState icon={IconNames.CROSS} title={"No projects were found"} />
  );

  return (
    <>
      <SortableTable
        columns={columns}
        data={projects}
        loading={loading}
        options={{
          nonIdealState: nonIdealState,
          onRowClickAction: rowClickAction,
        }}
        pageControlOptions={
          !loading && data && data.page
            ? {
                ...data.page,
                setRequestedPageSize: pageQueryOptions.setRequestedPageSize,
                setRequestedPageNumber: pageQueryOptions.setRequestedPageNumber,
                requestedSortRules: pageQueryOptions.requestedSortRules,
                setRequestedSortRules: pageQueryOptions.setRequestedSortRules,
                allowedPageSizes: pageQueryOptions.allowedPageSizes,
              }
            : undefined
        }
      />
    </>
  );
};

export default ProjectListView;
