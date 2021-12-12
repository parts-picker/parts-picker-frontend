import { H1 } from "@blueprintjs/core";
import { FC } from "react";
import useSWR from "swr";
import ItemListView from "../../features/items/ItemListView";
import ItemsModel from "../../features/items/models/ItemsModel";

interface ItemsIndexProps {
  items: ItemsModel;
}

const ItemsIndex: FC<ItemsIndexProps> = () => {
  const itemsFetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR("http://localhost:8080/api/v1/items", itemsFetcher);

  return (
    <div>
      <H1> Item Inventory </H1>
      {data ? JSON.stringify(data._embedded.itemResourceList) : "Loading..."}
      <ItemListView items={data ? data._embedded.itemResourceList : []} />
    </div>
  );
};

export default ItemsIndex;
