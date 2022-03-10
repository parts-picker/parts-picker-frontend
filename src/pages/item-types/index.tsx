import { Button, H1 } from "@blueprintjs/core";
import React, { useState } from "react";
import { FC } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/DefaultFetcher";
import ItemTypeListView from "../../features/items/ItemTypeListView";
import ItemTypeModel from "../../features/items/models/ItemTypeModel";
import { useEntryLinks } from "../../features/links/EntryLinksContext";
import { IconNames } from "@blueprintjs/icons";
import CreateItemTypeDialog from "../../features/items/dialogs/CreateItemTypeDialog";
import ListResponse from "../../features/common/models/ListResponse";
import EmbeddedItemTypeModel from "../../features/items/models/EmbeddedItemTypeModel";
import HttpMethods from "../../features/links/types/HttpMethods";

const ItemTypesIndex: FC = () => {
  const entryLinks = useEntryLinks();

  const { data } = useSWR<ListResponse<EmbeddedItemTypeModel>>(
    entryLinks?.itemTypes.href,
    defaultFetcher
  );
  const loading = !data;

  const itemTypes = React.useMemo(
    () => data?._embedded?.itemTypes || [],
    [data?._embedded]
  ) as ItemTypeModel[];

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  return (
    <div>
      <H1> Item Inventory </H1>
      {entryLinks?.itemTypes &&
      entryLinks?.itemTypes.methods.includes(HttpMethods.POST) ? (
        <Button icon={IconNames.ADD} onClick={handleOpenCreateDialog} />
      ) : null}
      <CreateItemTypeDialog
        isOpen={createDialogOpen}
        handleClose={handleCloseCreateDialog}
      />
      <ItemTypeListView itemTypes={itemTypes} loading={loading} />
    </div>
  );
};

export default ItemTypesIndex;
