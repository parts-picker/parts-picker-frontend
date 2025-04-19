import { redirect } from "next/navigation";
import { FC } from "react";
import { parsePageQueryParams } from "../../features/common/utils/pageQueries/ParsePageQueryParams";
import { H1 } from "@blueprintjs/core";
import ItemTypesIndexClient from "./ItemTypesIndexClient";
import { PageQueryParams } from "../../features/common/types/PageQueryParams";

interface ItemTypesIndexPageProps {
  searchParams: Promise<PageQueryParams>;
}

const ItemTypesIndexPage: FC<ItemTypesIndexPageProps> = async ({
  searchParams,
}) => {
  const { size: sizeParam, page: pageParam } = await searchParams;

  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    sizeParam,
    pageParam
  );

  if (!valid) {
    redirect(`/item-types?page=${parsedPage}&size=${parsedSize}`);
  }

  return (
    <>
      <H1> Item Inventory </H1>
      <ItemTypesIndexClient />
    </>
  );
};

export default ItemTypesIndexPage;
