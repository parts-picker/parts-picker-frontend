import { NonIdealState } from "@blueprintjs/core";
import { NextRouter } from "next/router";
import React, { useState } from "react";
import { FC } from "react";
import { Column, Row } from "react-table";
import SortableTable from "../common/tables/SortableTable";
import ItemTypeModel from "./models/ItemTypeModel";
import { IconNames } from "@blueprintjs/icons";
import DeleteButton from "../common/tables/subcomponents/DeleteButton";
import EditButton from "../common/tables/subcomponents/EditButton";
import EditItemTypeDialog from "./dialogs/EditItemTypeDialog";
import LinkUtil from "../links/LinkUtil";
import { LinkNames } from "../links/types/LinkModel";
import { AppToaster } from "../common/utils/Toaster";
import PaginationQueryOptions from "../common/tables/types/PaginationQueryOptions";
import { useEntryLinkFor } from "../links/EntryLinksContext";
import { useSWRWithURILike } from "../common/utils/swr/useSWRWithURILike";
import ListResponse from "../common/models/ListResponse";
import URITemplate from "urijs/src/URITemplate";
import { EmbeddedItemTypes } from "./models/EmbeddedTypes";

interface ItemTypeViewProps {
  pageQueryOptions: PaginationQueryOptions;
}

const ItemTypeListView: FC<ItemTypeViewProps> = ({ pageQueryOptions }) => {
  const itemTypesReadLink = useEntryLinkFor(LinkNames.READ, "itemTypes");
  const itemTypesReadLinkTemplate = itemTypesReadLink
    ? new URITemplate(itemTypesReadLink.href)
    : undefined;

  const { data, loading, mutate } = useSWRWithURILike<EmbeddedItemTypes>(
    itemTypesReadLinkTemplate,
    {
      size: pageQueryOptions.requestedPageSize.toString(),
      page: pageQueryOptions.requestedPageNumber.toString(),
    }
  );
  const itemTypes = data?._embedded?.itemTypes || new Array<ItemTypeModel>();

  const [editableData, setEditableData] = useState<ItemTypeModel | undefined>(
    undefined
  );

  const handleClose = () => {
    setEditableData(undefined);
  };

  const columns: Column<ItemTypeModel>[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
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
        const name = cell.row.original.name;

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
                const updatedList = itemTypes.filter(
                  (itemType) =>
                    LinkUtil.findLink(itemType, "self", LinkNames.READ)?.href !=
                    selfLink.href
                );

                if (!currentData) {
                  return new ListResponse();
                }

                const updatedData = { ...currentData };
                updatedData._embedded.itemTypes = updatedList;
                return updatedData;
              },
            }
          );

          AppToaster?.show?.({
            message: "Item type " + name + " was deleted",
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
              confirmDescription={
                <>
                  Delete item type <b>{cell.row.original.name}</b> ?
                </>
              }
            />
          </div>
        );
      },
    },
  ];

  const rowClickAction = (row: Row<ItemTypeModel>, router: NextRouter) => {
    const link = LinkUtil.findLink(row.original, "self", LinkNames.READ);
    if (!link) {
      return;
    }

    const encodedLink = window.btoa(link.href);

    router.push({
      pathname: "item-types/[link]",
      query: { link: encodedLink },
    });
  };

  const nonIdealState = (
    <NonIdealState icon={IconNames.CROSS} title={"No item types were found"} />
  );

  return (
    <>
      <EditItemTypeDialog
        handleClose={handleClose}
        editableData={editableData}
      />
      <SortableTable
        columns={columns}
        data={itemTypes}
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
                allowedPageSizes: pageQueryOptions.allowedPageSizes,
              }
            : undefined
        }
      />
    </>
  );
};

export default ItemTypeListView;
