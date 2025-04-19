"use client";

import { NonIdealState } from "@blueprintjs/core";
import React, { useState, FC } from "react";
import SortableTable from "../common/tables/SortableTable";
import ItemTypeModel from "./models/ItemTypeModel";
import { IconNames } from "@blueprintjs/icons";
import EditItemTypeDialog from "./dialogs/EditItemTypeDialog";
import LinkUtil from "../links/LinkUtil";
import { LinkName } from "../links/types/LinkModel";
import PaginationQueryOptions from "../common/tables/types/PaginationQueryOptions";
import { useSWRWithURILike } from "../common/utils/swr/useSWRWithURILike";
import URITemplate from "urijs/src/URITemplate";
import { EmbeddedItemTypes } from "./models/ItemEmbeddedTypes";
import { useEntryLinkFor } from "../links/hooks/useEntryLinkFor";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table";
import ActionButtons from "../common/tables/subcomponents/ActionButtons";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { requestedSortRulesToQueryParam } from "../common/utils/pageQueries/usePageQueryParamsV2";

interface ItemTypeViewProps {
  pageQueryOptions: PaginationQueryOptions;
}

const ItemTypeListView: FC<ItemTypeViewProps> = ({ pageQueryOptions }) => {
  const itemTypesReadLink = useEntryLinkFor(LinkName.READ, "itemTypes");
  const itemTypesReadLinkTemplate = itemTypesReadLink
    ? new URITemplate(itemTypesReadLink.href)
    : undefined;

  const {
    data,
    isLoading: loading,
    mutate,
  } = useSWRWithURILike<EmbeddedItemTypes>(itemTypesReadLinkTemplate, {
    size: pageQueryOptions.requestedPageSize.toString(),
    page: pageQueryOptions.requestedPageNumber.toString(),
    sort: requestedSortRulesToQueryParam(pageQueryOptions.requestedSortRules),
  });
  const itemTypes = data?._embedded?.itemTypes ?? new Array<ItemTypeModel>();

  const [editData, setEditData] = useState<ItemTypeModel | undefined>(
    undefined
  );

  const handleClose = () => {
    setEditData(undefined);
  };

  const itemTypeColumnHelper = createColumnHelper<ItemTypeModel>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<ItemTypeModel, any>[] = [
    itemTypeColumnHelper.accessor("name", { header: () => "Name" }),
    itemTypeColumnHelper.accessor("description", {
      header: () => "Description",
    }),
    itemTypeColumnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => (
        <ActionButtons
          object={props.row.original}
          setEditData={setEditData}
          objectListMutate={mutate}
          deleteNotification={
            <span>
              Item type <b>{props.row.original.name}</b> was deleted
            </span>
          }
          deleteConfirmDescription={
            <span>
              Delete item type <b>{props.row.original.name}</b>?
            </span>
          }
        />
      ),
    }),
  ];

  const rowClickAction = (
    row: Row<ItemTypeModel>,
    router: AppRouterInstance
  ) => {
    const link = LinkUtil.findLink(row.original, "self", LinkName.READ);
    if (!link) {
      return;
    }

    const encodedLink = window.btoa(link.href);
    router.push(`/item-types/${encodedLink}`);
  };

  const nonIdealState = (
    <NonIdealState icon={IconNames.CROSS} title={"No item types were found"} />
  );

  return (
    <>
      <EditItemTypeDialog handleClose={handleClose} editableData={editData} />
      <SortableTable
        columns={columns}
        data={itemTypes}
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
    </>
  );
};

export default ItemTypeListView;
