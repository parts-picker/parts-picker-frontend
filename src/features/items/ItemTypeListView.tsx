import { NonIdealState } from "@blueprintjs/core";
import { NextRouter } from "next/router";
import React from "react";
import { FC } from "react";
import { Column, Row } from "react-table";
import SortableTable from "../common/tables/SortableTable";
import ItemTypeModel from "./models/ItemTypeModel";
import { IconNames } from "@blueprintjs/icons";
import DeleteButton from "./subcomponents/DeleteButton";

interface ItemTypeViewProps {
  loading?: boolean;
  itemTypes: ItemTypeModel[];
}

const ItemTypeListView: FC<ItemTypeViewProps> = ({ loading, itemTypes }) => {
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
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DeleteButton name={cell.row.values["name"]} links={cell.value} />
          </div>
        );
      },
    },
  ];

  const rowClickAction = (row: Row<ItemTypeModel>, router: NextRouter) => {
    const link = window.btoa(row.original._links.self.href);

    router.push({
      pathname: "item-types/[link]",
      query: { link: link },
    });
  };

  const nonIdealState = (
    <NonIdealState icon={IconNames.CROSS} title={"No item types were found"} />
  );

  return (
    <SortableTable
      columns={columns}
      data={itemTypes}
      loading={loading}
      options={{
        nonIdealState: nonIdealState,
        onRowClickAction: rowClickAction,
      }}
    />
  );
};

export default ItemTypeListView;
