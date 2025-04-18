import { Button, Divider, H1 } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/utils/swr/DefaultFetcher";
import ItemListView from "../../features/items/ItemListView";
import ItemTypeModel from "../../features/items/models/ItemTypeModel";
import { IconNames } from "@blueprintjs/icons";
import DefaultLoadingSpinner from "../../features/common/loading/DefaultLoadingSpinner";
import LinkUtil from "../../features/links/LinkUtil";
import { LinkName } from "../../features/links/types/LinkModel";
import { GetServerSideProps } from "next";
import { parsePageQueryParams } from "../../features/common/utils/pageQueries/ParsePageQueryParams";
import { usePageQueryParams } from "../../features/common/utils/pageQueries/usePageQueryParams";
import { ALLOWED_PAGE_SIZES } from "../../features/common/utils/ConfigReaderUtils";
import CreateItemDialog from "../../features/items/dialogs/CreateItemDialog";

const ItemTypeDetails: FC = () => {
  const router = useRouter();
  const pageQueryOptions = usePageQueryParams();

  const { itemTypeLink } = router.query as { itemTypeLink: string };
  const decodedLink = itemTypeLink ? window.atob(itemTypeLink) : undefined;
  const { data: itemType } = useSWR<ItemTypeModel>(decodedLink, defaultFetcher);

  const itemCreateLink = LinkUtil.findLink(
    itemType,
    "describes",
    LinkName.CREATE
  );

  const backButtonOnClick = () => {
    router.push({ pathname: "/item-types" });
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
    <div>
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
    </div>
  );
};

export default ItemTypeDetails;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const {
    valid,
    parsedPage: correctedPage,
    parsedSize: correctedSize,
  } = parsePageQueryParams(query.size, query.page);

  if (!valid) {
    return {
      redirect: {
        permanent: false,
        destination: `?page=${correctedPage}&size=${correctedSize}`,
      },
    };
  }

  return { props: {} };
};
