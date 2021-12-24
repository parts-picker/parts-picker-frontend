import { H1 } from "@blueprintjs/core";
import { FC } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/DefaultFetcher";
import ItemListView from "../../features/items/ItemListView";
import ItemsModel from "../../features/items/models/ItemsModel";
import { useEntryLinks } from "../../features/links/EntryLinksContext";

interface ItemsIndexProps {
  items: ItemsModel;
}

const ItemsIndex: FC<ItemsIndexProps> = () => {
  const entryLinks = useEntryLinks();

  const { data } = useSWR(entryLinks?.items.href, defaultFetcher);

  return (
    <div>
      <H1> Item Inventory </H1>
      {JSON.stringify(entryLinks)}
      <ItemListView items={data ? data._embedded.items : []} />
    </div>
  );
};

export default ItemsIndex;
