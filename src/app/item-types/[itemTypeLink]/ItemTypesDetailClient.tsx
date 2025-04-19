"use client";

import { Button, Divider, H1 } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
import useSWR from "swr";
import DefaultLoadingSpinner from "../../../features/common/loading/DefaultLoadingSpinner";
import { ALLOWED_PAGE_SIZES } from "../../../features/common/utils/ConfigReaderUtils";
import defaultFetcher from "../../../features/common/utils/swr/DefaultFetcher";
import CreateItemDialog from "../../../features/items/dialogs/CreateItemDialog";
import ItemListView from "../../../features/items/ItemListView";
import ItemTypeModel from "../../../features/items/models/ItemTypeModel";
import LinkUtil from "../../../features/links/LinkUtil";
import { LinkName } from "../../../features/links/types/LinkModel";
import { usePageQueryParamsV2 } from "../../../features/common/utils/pageQueries/usePageQueryParamsV2";

type Params = { itemTypeLink?: string };

const ItemTypeDetails: FC = () => {
  const router = useRouter();
  const pageQueryOptions = usePageQueryParamsV2();
  const params = useParams<Params>();

  const itemTypeLink = params?.itemTypeLink;
  const decodedLink = itemTypeLink
    ? window.atob(decodeURIComponent(itemTypeLink))
    : undefined;
  const { data: itemType } = useSWR<ItemTypeModel>(decodedLink, defaultFetcher);

  const itemCreateLink = LinkUtil.findLink(
    itemType,
    "describes",
    LinkName.CREATE
  );

  const backButtonOnClick = () => {
    router.push("/item-types");
  };

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  if (!itemType) {
    return <DefaultLoadingSpinner />;
  }

  return (
    <>
      <H1>ItemType - {itemType?.name}</H1>
      <div>
        <Button icon={IconNames.CHEVRON_LEFT} onClick={backButtonOnClick} />
        {itemCreateLink ? (
          <Button icon={IconNames.ADD} onClick={handleOpenCreateDialog} />
        ) : null}
      </div>
      <Divider />
      <ItemListView
        itemType={itemType}
        pageQueryOptions={{
          ...pageQueryOptions,
          allowedPageSizes: ALLOWED_PAGE_SIZES,
        }}
      />
      <CreateItemDialog
        isOpen={createDialogOpen}
        handleClose={handleCloseCreateDialog}
        targetItemType={itemType}
      />
    </>
  );
};

export default ItemTypeDetails;
