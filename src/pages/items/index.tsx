import { H1 } from "@blueprintjs/core";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { ALLOWED_PAGE_SIZES } from "../../features/common/utils/ConfigReaderUtils";
import { parsePageQueryParams } from "../../features/common/utils/pageQueries/ParsePageQueryParams";
import { usePageQueryParams } from "../../features/common/utils/pageQueries/usePageQueryParams";
import ItemListView from "../../features/items/ItemListView";
import ItemsModel from "../../features/items/models/ItemsModel";
import { useEntryLinkFor } from "../../features/links/EntryLinksContext";
import { LinkNames } from "../../features/links/types/LinkModel";

interface ItemsIndexProps {
  items: ItemsModel;
}

const ItemsIndex: FC<ItemsIndexProps> = () => {
  const itemsReadLink = useEntryLinkFor(LinkNames.READ, "items");
  const pageQueryOptions = usePageQueryParams();

  return (
    <div>
      <H1> Item Inventory </H1>
      <ItemListView
        itemsReadLink={itemsReadLink}
        pageQueryOptions={{
          ...pageQueryOptions,
          allowedPageSizes: ALLOWED_PAGE_SIZES,
        }}
      />
    </div>
  );
};

export default ItemsIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    query.size,
    query.page
  );

  if (!valid) {
    return {
      redirect: {
        permanent: false,
        destination: `/items?page=${parsedPage}&size=${parsedSize}`,
      },
    };
  }

  return { props: {} };
};
