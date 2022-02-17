import { NonIdealState } from "@blueprintjs/core";
import React from "react";
import { FC } from "react";
import { Column } from "react-table";
import SortableTable from "../common/tables/SortableTable";
import ItemModel from "./models/ItemModel";
import { IconNames } from "@blueprintjs/icons";

interface ItemListViewProps {
  items: ItemModel[] | undefined;
  loading?: boolean;
}

const ItemListView: FC<ItemListViewProps> = ({ items, loading = false }) => {
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
    />
  );
};

export default ItemListView;
