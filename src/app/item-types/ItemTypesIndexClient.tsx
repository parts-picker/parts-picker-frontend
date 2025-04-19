"use client";

import { Button } from "@blueprintjs/core";
import React, { useState, FC } from "react";
import ItemTypeListView from "../../features/items/ItemTypeListView";
import { IconNames } from "@blueprintjs/icons";
import CreateItemTypeDialog from "../../features/items/dialogs/CreateItemTypeDialog";
import { LinkName } from "../../features/links/types/LinkModel";
import { ALLOWED_PAGE_SIZES } from "../../features/common/utils/ConfigReaderUtils";
import { useEntryLinkFor } from "../../features/links/hooks/useEntryLinkFor";
import { usePageQueryParamsV2 } from "../../features/common/utils/pageQueries/usePageQueryParamsV2";

const ItemTypesIndexClient: FC = () => {
  const itemTypeCreateLink = useEntryLinkFor(LinkName.CREATE, "itemTypes");
  const pageQueryOptions = usePageQueryParamsV2();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  return (
    <>
      {itemTypeCreateLink ? (
        <Button icon={IconNames.ADD} onClick={handleOpenCreateDialog} />
      ) : null}
      <CreateItemTypeDialog
        isOpen={createDialogOpen}
        handleClose={handleCloseCreateDialog}
      />
      <ItemTypeListView
        pageQueryOptions={{
          ...pageQueryOptions,
          allowedPageSizes: ALLOWED_PAGE_SIZES,
        }}
      />
    </>
  );
};

export default ItemTypesIndexClient;
