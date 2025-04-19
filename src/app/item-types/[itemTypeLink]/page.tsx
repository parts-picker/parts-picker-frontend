import { FC } from "react";
import ItemTypesDetailClient from "./ItemTypesDetailClient";
import { PageQueryParams } from "../../../features/common/types/PageQueryParams";
import { redirect } from "next/navigation";
import { parsePageQueryParams } from "../../../features/common/utils/pageQueries/ParsePageQueryParams";

interface ItemTypesDetailClientProps {
  searchParams: Promise<PageQueryParams>;
  params: Promise<{ itemTypeLink?: string }>;
}

const ItemTypesDetailPage: FC<ItemTypesDetailClientProps> = async ({
  searchParams,
  params,
}) => {
  const { size: sizeParam, page: pageParam } = await searchParams;

  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    sizeParam,
    pageParam
  );

  if (!valid) {
    redirect(
      `/item-types/${(await params).itemTypeLink}?page=${parsedPage}&size=${parsedSize}`
    );
  }

  return <ItemTypesDetailClient />;
};

export default ItemTypesDetailPage;
