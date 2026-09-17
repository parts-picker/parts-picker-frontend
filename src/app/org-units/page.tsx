import { H1 } from "@blueprintjs/core";
import { redirect } from "next/navigation";
import { FC } from "react";
import OrgUnitsIndexClient from "./OrgUnitsIndexClient";
import { PageQueryParams } from "@/features/common/types/PageQueryParams";
import { parsePageQueryParams } from "@/features/common/utils/pageQueries/ParsePageQueryParams";
import { ORG_UNITS_PATH } from "@/features/orgUnits/OrgUnitConstants";

interface OrgUnitsIndexPageProps {
  searchParams: Promise<PageQueryParams>;
}

const OrgUnitsIndexPage: FC<OrgUnitsIndexPageProps> = async ({
  searchParams,
}) => {
  const { size: sizeParam, page: pageParam } = await searchParams;

  const { valid, parsedPage, parsedSize } = parsePageQueryParams(
    sizeParam,
    pageParam
  );

  if (!valid) {
    redirect(`${ORG_UNITS_PATH}?page=${parsedPage}&size=${parsedSize}`);
  }

  return (
    <>
      <H1>Org Unit Memberships</H1>
      <OrgUnitsIndexClient />
    </>
  );
};

export default OrgUnitsIndexPage;
