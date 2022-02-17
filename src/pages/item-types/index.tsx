import { H1 } from "@blueprintjs/core";
import React from "react";
import { FC } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/DefaultFetcher";
import ItemTypeListView from "../../features/items/ItemTypeListView";
import ItemTypeModel from "../../features/items/models/ItemTypeModel";
import { useEntryLinks } from "../../features/links/EntryLinksContext";

const ItemTypesIndex: FC = () => {
  const entryLinks = useEntryLinks();

  const { data } = useSWR(entryLinks?.itemTypes.href, defaultFetcher);
  const loading = !data;

  const itemTypes = React.useMemo(
    () => data?._embedded?.itemTypes || [],
    [data?._embedded]
  ) as ItemTypeModel[];

  return (
    <div>
      <H1> Item Inventory </H1>
      <ItemTypeListView itemTypes={itemTypes} loading={loading} />
    </div>
  );
};

export default ItemTypesIndex;
