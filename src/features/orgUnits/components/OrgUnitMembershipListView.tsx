"use client";

import { NonIdealState } from "@blueprintjs/core";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FC } from "react";
import URITemplate from "urijs/src/URITemplate";
import SortableTable from "@/features/common/tables/SortableTable";
import { SortableTableFeatures } from "@/features/common/tables/TableFeatures";
import PaginationQueryOptions from "@/features/common/tables/types/PaginationQueryOptions";
import { requestedSortRulesToQueryParam } from "@/features/common/utils/pageQueries/usePageQueryParamsV2";
import { useSWRWithURILike } from "@/features/common/utils/swr/useSWRWithURILike";
import { useEntryLinkFor } from "@/features/links/hooks/useEntryLinkFor";
import { LinkName } from "@/features/links/types/LinkModel";
import OrgUnitMembershipModel from "@/features/orgUnits/models/OrgUnitMembershipModel";
import { ReadOrgUnitMembershipsResponse } from "@/features/orgUnits/models/ReadOrgUnitMembershipsResponse";
import { ORG_UNIT_ICON } from "@/features/orgUnits/OrgUnitConstants";
import { routeToOrgUnit } from "@/features/orgUnits/util/OrgUnitRoutingUtil";

interface OrgUnitMembershipListViewProps {
  pageQueryOptions: PaginationQueryOptions;
}

const OrgUnitMembershipListView: FC<OrgUnitMembershipListViewProps> = ({
  pageQueryOptions,
}) => {
  const membershipsReadLink = useEntryLinkFor(
    LinkName.READ,
    "orgUnitMemberships"
  );
  const membershipsReadLinkTemplate = membershipsReadLink
    ? new URITemplate(membershipsReadLink.href)
    : undefined;

  const { data, isLoading: loading } =
    useSWRWithURILike<ReadOrgUnitMembershipsResponse>(
      membershipsReadLinkTemplate,
      {
        size: pageQueryOptions.requestedPageSize.toString(),
        page: pageQueryOptions.requestedPageNumber.toString(),
        sort: requestedSortRulesToQueryParam(
          pageQueryOptions.requestedSortRules
        ),
      }
    );
  const memberships = data?._embedded?.orgUnitMemberships ?? [];

  const columnHelper = createColumnHelper<
    SortableTableFeatures,
    OrgUnitMembershipModel
  >();

  // column ids double as the sort keys sent to the backend
  const columns: ColumnDef<
    SortableTableFeatures,
    OrgUnitMembershipModel,
    any
  >[] = [
    columnHelper.accessor((row) => row.orgUnit.name, {
      id: "orgUnit.name",
      header: () => "Name",
    }),
    columnHelper.accessor((row) => row.orgUnit.shortDescription, {
      id: "orgUnit.shortDescription",
      header: () => "Short description",
    }),
    columnHelper.accessor("accessLevel", { header: () => "Access level" }),
    columnHelper.accessor("joinedOn", {
      header: () => "Joined on",
      cell: (props) => new Date(props.getValue()).toLocaleDateString(),
    }),
  ];

  const rowClickAction = (
    row: Row<SortableTableFeatures, OrgUnitMembershipModel>,
    router: AppRouterInstance
  ) => {
    routeToOrgUnit(row.original, router);
  };

  const nonIdealState = (
    <NonIdealState
      icon={ORG_UNIT_ICON}
      title={"You are not part of any org unit yet"}
      description={
        "Everything in parts picker belongs to an org unit. Ask an org unit owner to add you."
      }
    />
  );

  return (
    <SortableTable
      columns={columns}
      data={memberships}
      loading={loading}
      options={{
        nonIdealState: nonIdealState,
        onRowClickAction: rowClickAction,
      }}
      pageControlOptions={
        !loading && data?.page
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
  );
};

export default OrgUnitMembershipListView;
