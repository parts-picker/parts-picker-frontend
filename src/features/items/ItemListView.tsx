import { NonIdealState } from "@blueprintjs/core";
import React, { useState } from "react";
import { FC } from "react";
import { Column } from "react-table";
import SortableTable from "../common/tables/SortableTable";
import ItemModel from "./models/ItemModel";
import { IconNames } from "@blueprintjs/icons";
import PaginationQueryOptions from "../common/tables/types/PaginationQueryOptions";
import URITemplate from "urijs/src/URITemplate";
import { LinkNames } from "../links/types/LinkModel";
import { useSWRWithURILike } from "../common/utils/swr/useSWRWithURILike";
import { EmbeddedItems } from "./models/EmbeddedTypes";
import LinkUtil from "../links/LinkUtil";
import ListResponse from "../common/models/ListResponse";
import DeleteButton from "../common/tables/subcomponents/DeleteButton";
import { AppToaster } from "../common/utils/Toaster";
import EditButton from "../common/tables/subcomponents/EditButton";
import EditItemDialog from "./dialogs/EditItemDialog";
import ItemTypeModel from "./models/ItemTypeModel";

interface ItemListViewProps {
  itemType: ItemTypeModel;
  pageQueryOptions: PaginationQueryOptions;
}

const ItemListView: FC<ItemListViewProps> = ({
  itemType,
  pageQueryOptions,
}) => {
  const itemsReadLink = LinkUtil.findLink(
    itemType,
    "describes",
    LinkNames.READ
  );
  const itemsReadLinkTemplate = itemsReadLink
    ? new URITemplate(itemsReadLink.href)
    : undefined;

  const { data, loading, mutate } = useSWRWithURILike<EmbeddedItems>(
    itemsReadLinkTemplate,
    {
      size: pageQueryOptions.requestedPageSize.toString(),
      page: pageQueryOptions.requestedPageNumber.toString(),
    }
  );
  const items = data?._embedded?.items || new Array<ItemModel>();

  const [editableData, setEditableData] = useState<ItemModel | undefined>(
    undefined
  );

  const handleClose = () => {
    setEditableData(undefined);
  };

  const columns: Column<ItemModel>[] = [
    { Header: "Condition", accessor: "condition" },
    { Header: "Status", accessor: "status" },
    { Header: "Note", accessor: "note" },
    {
      Header: "Actions",
      accessor: "_links",
      disableSortBy: true,
      Cell: (cell) => {
        const selfLink = LinkUtil.findLink(
          cell.row.original,
          "self",
          LinkNames.DELETE
        );

        const deleteRow = () => {
          if (!selfLink) {
            return;
          }

          mutate(
            async () => {
              await fetch(selfLink.href, {
                method: "DELETE",
              });

              return undefined;
            },
            {
              populateCache: false,
              revalidate: true,
              optimisticData: (currentData) => {
                if (!currentData) {
                  return new ListResponse();
                }

                const updatedList = currentData._embedded.items.filter(
                  (item) =>
                    LinkUtil.findLink(item, "self", LinkNames.READ)?.href !=
                    selfLink.href
                );

                const updatedData = { ...currentData };
                updatedData._embedded.items = updatedList;
                return updatedData;
              },
            }
          );

          AppToaster?.show?.({
            message: "Item was deleted",
            intent: "success",
            icon: IconNames.CONFIRM,
          });
        };

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <EditButton
              current={cell.row.original}
              setEditData={setEditableData}
            />
            <DeleteButton
              deleteAction={deleteRow}
              confirmDescription={<>Delete item?</>}
            />
          </div>
        );
      },
    },
  ];

  const nonIdealState = (
    <NonIdealState icon={IconNames.CROSS} title={"No items were found"} />
  );

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
    </>
  );
};

export default ItemListView;
