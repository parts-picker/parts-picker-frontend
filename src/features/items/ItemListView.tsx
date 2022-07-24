import { NonIdealState } from "@blueprintjs/core";
import React from "react";
import { FC } from "react";
import { Column } from "react-table";
import SortableTable from "../common/tables/SortableTable";
import ItemModel from "./models/ItemModel";
import { IconNames } from "@blueprintjs/icons";
import PaginationQueryOptions from "../common/tables/types/PaginationQueryOptions";
import URITemplate from "urijs/src/URITemplate";
import { LinkModel } from "../links/types/LinkModel";
import { useSWRWithURILike } from "../common/utils/swr/useSWRWithURILike";
import { EmbeddedItems } from "./models/EmbeddedTypes";

interface ItemListViewProps {
  itemsReadLink?: LinkModel;
  pageQueryOptions: PaginationQueryOptions;
}

const ItemListView: FC<ItemListViewProps> = ({
  itemsReadLink,
  pageQueryOptions,
}) => {
  const itemsReadLinkTemplate = itemsReadLink
    ? new URITemplate(itemsReadLink.href)
    : undefined;

  const { data, loading } = useSWRWithURILike<EmbeddedItems>(
    itemsReadLinkTemplate,
    {
      size: pageQueryOptions.requestedPageSize.toString(),
      page: pageQueryOptions.requestedPageNumber.toString(),
    }
  );
  const items = data?._embedded?.items || new Array<ItemModel>();

  const columns: Column<ItemModel>[] = [
    { Header: "Condition", accessor: "condition" },
    { Header: "Status", accessor: "status" },
    { Header: "Note", accessor: "note" },
  ];

  const nonIdealState = (
    <NonIdealState icon={IconNames.CROSS} title={"No items were found"} />
  );

  return (
    <SortableTable
      columns={columns}
      data={items}
      loading={loading}
      options={{ nonIdealState: nonIdealState }}
      pageControlOptions={
        !loading && data && data.page
          ? {
              ...data.page,
              setRequestedPageSize: pageQueryOptions.setRequestedPageSize,
              setRequestedPageNumber: pageQueryOptions.setRequestedPageNumber,
              allowedPageSizes: pageQueryOptions.allowedPageSizes,
            }
          : undefined
      }
    />
  );
};

export default ItemListView;
