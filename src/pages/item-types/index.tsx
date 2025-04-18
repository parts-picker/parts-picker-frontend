import { Button, H1 } from "@blueprintjs/core";
import React, { useState, FC } from "react";
import ItemTypeListView from "../../features/items/ItemTypeListView";
import { IconNames } from "@blueprintjs/icons";
import CreateItemTypeDialog from "../../features/items/dialogs/CreateItemTypeDialog";
import { LinkName } from "../../features/links/types/LinkModel";
import { GetServerSideProps } from "next";
import { ALLOWED_PAGE_SIZES } from "../../features/common/utils/ConfigReaderUtils";
import { parsePageQueryParams } from "../../features/common/utils/pageQueries/ParsePageQueryParams";
import { usePageQueryParams } from "../../features/common/utils/pageQueries/usePageQueryParams";
import { useEntryLinkFor } from "../../features/links/hooks/useEntryLinkFor";

const ItemTypesIndex: FC = () => {
  const itemTypeCreateLink = useEntryLinkFor(LinkName.CREATE, "itemTypes");
  const pageQueryOptions = usePageQueryParams();

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
    </div>
  );
};

export default ItemTypesIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    query.size,
    query.page
  );

  if (!valid) {
    return {
      redirect: {
        permanent: false,
        destination: `/item-types?page=${parsedPage}&size=${parsedSize}`,
      },
    };
  }

  return { props: {} };
};
