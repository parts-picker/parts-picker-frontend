import { FC } from "react";
import ItemTypesDetailClient from "./ItemTypesDetailClient";
import { PageQueryParams } from "@/features/common/types/PageQueryParams";
import { redirect } from "next/navigation";
import { parsePageQueryParams } from "@/features/common/utils/pageQueries/ParsePageQueryParams";
import { buildOrgUnitPath } from "@/features/orgUnits/util/OrgUnitRoutingUtil";
import { OrgUnitLinkParam } from "@/features/orgUnits/types/OrgUnitLinkParam";

interface ItemTypesDetailClientProps {
  searchParams: Promise<PageQueryParams>;
  params: Promise<OrgUnitLinkParam & { itemTypeLink: string }>;
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
    const { orgUnitLink, itemTypeLink } = await params;
    redirect(
      `${buildOrgUnitPath(orgUnitLink)}/item-types/${itemTypeLink}?page=${parsedPage}&size=${parsedSize}`
    );
  }

  return <ItemTypesDetailClient />;
};

export default ItemTypesDetailPage;
