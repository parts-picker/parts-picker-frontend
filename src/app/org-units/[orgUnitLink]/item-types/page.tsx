import { redirect } from "next/navigation";
import { FC } from "react";
import { parsePageQueryParams } from "@/features/common/utils/pageQueries/ParsePageQueryParams";
import { H1 } from "@blueprintjs/core";
import ItemTypesIndexClient from "./ItemTypesIndexClient";
import { PageQueryParams } from "@/features/common/types/PageQueryParams";
import { buildOrgUnitPath } from "@/features/orgUnits/util/OrgUnitRoutingUtil";
import { OrgUnitLinkParam } from "@/features/orgUnits/types/OrgUnitLinkParam";

interface ItemTypesIndexPageProps {
  searchParams: Promise<PageQueryParams>;
  params: Promise<OrgUnitLinkParam>;
}

const ItemTypesIndexPage: FC<ItemTypesIndexPageProps> = async ({
  searchParams,
  params,
}) => {
  const { size: sizeParam, page: pageParam } = await searchParams;

  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    sizeParam,
    pageParam
  );

  if (!valid) {
    const { orgUnitLink } = await params;
    redirect(
      `${buildOrgUnitPath(orgUnitLink)}/item-types?page=${parsedPage}&size=${parsedSize}`
    );
  }

  return (
    <>
      <H1> Item Inventory </H1>
      <ItemTypesIndexClient />
    </>
  );
};

export default ItemTypesIndexPage;
