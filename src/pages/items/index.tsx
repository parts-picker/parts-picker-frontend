import { H1 } from "@blueprintjs/core";
import { FC } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/DefaultFetcher";
import ItemListView from "../../features/items/ItemListView";
import ItemsModel from "../../features/items/models/ItemsModel";
import { useEntryLinkFor } from "../../features/links/EntryLinksContext";
import { LinkNames } from "../../features/links/types/LinkModel";

interface ItemsIndexProps {
  items: ItemsModel;
}

const ItemsIndex: FC<ItemsIndexProps> = () => {
  const itemsReadLink = useEntryLinkFor(LinkNames.READ, "items");

  const { data } = useSWR(itemsReadLink?.href, defaultFetcher);

  return (
    <div>
      <H1> Item Inventory </H1>
      <ItemListView
        items={data && data._embedded ? data._embedded.items : []}
      />
    </div>
  );
};

export default ItemsIndex;
