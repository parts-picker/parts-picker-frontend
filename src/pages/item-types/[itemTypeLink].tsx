import { Button, Divider, H1 } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { FC } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/DefaultFetcher";
import ItemListView from "../../features/items/ItemListView";
import ItemsModel from "../../features/items/models/ItemsModel";
import ItemTypeModel from "../../features/items/models/ItemTypeModel";
import { IconNames } from "@blueprintjs/icons";
import DefaultLoadingSpinner from "../../features/common/loading/DefaultLoadingSpinner";
import React from "react";
import LinkUtil from "../../features/links/LinkUtil";
import { LinkNames } from "../../features/links/types/LinkModel";

const ItemTypeDetails: FC = () => {
  const router = useRouter();

  const { itemTypeLink } = router.query as { itemTypeLink: string };

  const decodedLink = itemTypeLink ? window.atob(itemTypeLink) : undefined;
  const { data: itemType } = useSWR<ItemTypeModel>(decodedLink, defaultFetcher);

  const itemLink = LinkUtil.findLink(itemType, "describes", LinkNames.READ);
  const { data: itemsResponse } = useSWR<ItemsModel>(
    itemLink?.href,
    defaultFetcher
  );
  const items = itemsResponse?._embedded?.items;

  const backButtonOnClick = () => {
    router.push({ pathname: "/item-types" });
  };

  return !itemType ? (
    <DefaultLoadingSpinner />
  ) : (
    <div>
      <H1>ItemType - {itemType?.name}</H1>
      <Button icon={IconNames.CHEVRON_LEFT} onClick={backButtonOnClick} />
      <Divider />
      <ItemListView items={items} loading={!itemsResponse} />
    </div>
  );
};

export default ItemTypeDetails;
