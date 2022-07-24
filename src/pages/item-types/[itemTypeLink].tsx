import { Button, Divider, H1 } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { FC } from "react";
import useSWR from "swr";
import defaultFetcher from "../../features/common/DefaultFetcher";
import ItemListView from "../../features/items/ItemListView";
import ItemTypeModel from "../../features/items/models/ItemTypeModel";
import { IconNames } from "@blueprintjs/icons";
import DefaultLoadingSpinner from "../../features/common/loading/DefaultLoadingSpinner";
import React from "react";
import LinkUtil from "../../features/links/LinkUtil";
import { LinkNames } from "../../features/links/types/LinkModel";
import { GetServerSideProps } from "next";
import { parsePageQueryParams } from "../../features/common/utils/pageQueries/ParsePageQueryParams";
import { usePageQueryParams } from "../../features/common/utils/pageQueries/usePageQueryParams";
import { ALLOWED_PAGE_SIZES } from "../../features/common/utils/ConfigReaderUtils";

const ItemTypeDetails: FC = () => {
  const router = useRouter();
  const pageQueryOptions = usePageQueryParams();

  const { itemTypeLink } = router.query as { itemTypeLink: string };

  const decodedLink = itemTypeLink ? window.atob(itemTypeLink) : undefined;

  const { data: itemType } = useSWR<ItemTypeModel>(decodedLink, defaultFetcher);

  const itemLink = LinkUtil.findLink(itemType, "describes", LinkNames.READ);

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
      <ItemListView
        itemsReadLink={itemLink}
        pageQueryOptions={{
          ...pageQueryOptions,
          allowedPageSizes: ALLOWED_PAGE_SIZES,
        }}
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
