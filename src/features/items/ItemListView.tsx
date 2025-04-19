"use client";

import { NonIdealState } from "@blueprintjs/core";
import React, { useState, FC } from "react";
import SortableTable from "../common/tables/SortableTable";
import ItemModel from "./models/ItemModel";
import { IconNames } from "@blueprintjs/icons";
import PaginationQueryOptions from "../common/tables/types/PaginationQueryOptions";
import URITemplate from "urijs/src/URITemplate";
import { LinkName } from "../links/types/LinkModel";
import { useSWRWithURILike } from "../common/utils/swr/useSWRWithURILike";
import { EmbeddedItems } from "./models/ItemEmbeddedTypes";
import LinkUtil from "../links/LinkUtil";
import EditItemDialog from "./dialogs/EditItemDialog";
import ItemTypeModel from "./models/ItemTypeModel";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import ActionButtons from "../common/tables/subcomponents/ActionButtons";
import { requestedSortRulesToQueryParam } from "../common/utils/pageQueries/usePageQueryParamsV2";

interface ItemListViewProps {
  itemType: ItemTypeModel;
  pageQueryOptions: PaginationQueryOptions;
}

const ItemListView: FC<ItemListViewProps> = ({
  itemType,
  pageQueryOptions,
}) => {
  const itemsReadLink = LinkUtil.findLink(itemType, "describes", LinkName.READ);
  const itemsReadLinkTemplate = itemsReadLink
    ? new URITemplate(itemsReadLink.href)
    : undefined;

  const {
    data,
    isLoading: loading,
    mutate,
  } = useSWRWithURILike<EmbeddedItems>(itemsReadLinkTemplate, {
    size: pageQueryOptions.requestedPageSize.toString(),
    page: pageQueryOptions.requestedPageNumber.toString(),
    sort: requestedSortRulesToQueryParam(pageQueryOptions.requestedSortRules),
  });
  const items = data?._embedded?.items ?? new Array<ItemModel>();

  const [editableData, setEditData] = useState<ItemModel | undefined>(
    undefined
  );

  const handleClose = () => {
    setEditData(undefined);
  };

  const itemColumnHelper = createColumnHelper<ItemModel>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<ItemModel, any>[] = [
    itemColumnHelper.accessor("condition", { header: () => "Condition" }),
    itemColumnHelper.accessor("status", { header: () => "Status" }),
    itemColumnHelper.accessor("note", { header: () => "Note" }),
    itemColumnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => (
        <ActionButtons
          object={props.row.original}
          setEditData={setEditData}
          objectListMutate={mutate}
          deleteNotification={
            <span>
              Item of item type <b>{itemType.name}</b> was deleted
            </span>
          }
          deleteConfirmDescription={
            <span>
              Delete item of item type <b>{itemType.name}</b>?
            </span>
          }
        />
      ),
    }),
  ];

  return (
    <>
      <EditItemDialog
        editableData={editableData}
        handleClose={handleClose}
        targetItemType={itemType}
      />
      <SortableTable
        columns={columns}
        data={items}
        loading={loading}
        options={{ nonIdealState: nonIdealState }}
        pageControlOptions={
          !loading && data?.page
            ? {
                ...data.page,
                setRequestedPageSize: pageQueryOptions.setRequestedPageSize,
                setRequestedPageNumber: pageQueryOptions.setRequestedPageNumber,
                setRequestedSortRules: pageQueryOptions.setRequestedSortRules,
                requestedSortRules: pageQueryOptions.requestedSortRules,
                allowedPageSizes: pageQueryOptions.allowedPageSizes,
              }
            : undefined
        }
      />
    </>
  );
};

export default ItemListView;

// utils
const nonIdealState = (
  <NonIdealState icon={IconNames.CROSS} title={"No items were found"} />
);
